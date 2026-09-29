import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import bundle from '../generated/private.enc.json';

// Decrypts the protected pages in the browser (see scripts/encrypt-private.mjs for the scheme).
// The content key comes either from the password (PBKDF2 unwraps it) or from /api/unlock after a
// Google sign-in. "Remember" keeps the raw content key in localStorage on this device only.

interface EncBlob {
  iv: string;
  ct: string;
}

interface Bundle {
  v: number;
  kdf: { salt: string; iterations: number };
  wrappedKey: EncBlob;
  docs: ({ slug: string } & EncBlob)[];
}

const STORAGE_KEY = 'zos.contentKey';

type Bytes = Uint8Array<ArrayBuffer>;

function fromB64(s: string): Bytes {
  const bin = atob(s);
  const out = new Uint8Array(new ArrayBuffer(bin.length));
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
const toB64 = (b: ArrayBuffer) => btoa(String.fromCharCode(...new Uint8Array(b)));

async function decrypt(key: CryptoKey, blob: EncBlob): Promise<ArrayBuffer> {
  return crypto.subtle.decrypt({ name: 'AES-GCM', iv: fromB64(blob.iv) }, key, fromB64(blob.ct));
}

async function openDocs(rawKey: Bytes): Promise<Record<string, string>> {
  const key = await crypto.subtle.importKey('raw', rawKey, 'AES-GCM', false, ['decrypt']);
  const out: Record<string, string> = {};
  for (const d of (bundle as Bundle).docs) {
    out[d.slug] = new TextDecoder().decode(await decrypt(key, d));
  }
  return out;
}

async function rawKeyFromPassword(password: string): Promise<Bytes> {
  const b = bundle as Bundle;
  const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
  const pwKey = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', hash: 'SHA-256', salt: fromB64(b.kdf.salt), iterations: b.kdf.iterations },
    base,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt'],
  );
  return new Uint8Array(await decrypt(pwKey, b.wrappedKey));
}

function storage(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

interface Vault {
  unlocked: boolean;
  docs: Record<string, string>;
  unlockWithPassword(password: string, remember: boolean): Promise<void>;
  unlockWithKey(b64Key: string, remember: boolean): Promise<void>;
  lock(): void;
}

const VaultContext = createContext<Vault | null>(null);

export function VaultProvider({ children }: { children: ReactNode }) {
  const [docs, setDocs] = useState<Record<string, string> | null>(null);

  const open = useCallback(async (raw: Bytes, remember: boolean) => {
    const opened = await openDocs(raw);
    if (remember) {
      try {
        storage()?.setItem(STORAGE_KEY, toB64(raw.buffer));
      } catch {
        /* storage unavailable: stay unlocked for this tab only */
      }
    }
    setDocs(opened);
  }, []);

  useEffect(() => {
    const saved = storage()?.getItem(STORAGE_KEY);
    if (saved) {
      open(fromB64(saved), false).catch(() => storage()?.removeItem(STORAGE_KEY));
    }
  }, [open]);

  const value: Vault = {
    unlocked: docs !== null,
    docs: docs ?? {},
    unlockWithPassword: async (password, remember) => {
      let raw: Bytes;
      try {
        raw = await rawKeyFromPassword(password);
      } catch {
        throw new Error('Sai mật khẩu');
      }
      await open(raw, remember);
    },
    unlockWithKey: (b64Key, remember) => open(fromB64(b64Key), remember),
    lock: () => {
      storage()?.removeItem(STORAGE_KEY);
      setDocs(null);
    },
  };
  return <VaultContext.Provider value={value}>{children}</VaultContext.Provider>;
}

export function useVault(): Vault {
  const v = useContext(VaultContext);
  if (!v) throw new Error('useVault outside VaultProvider');
  return v;
}
