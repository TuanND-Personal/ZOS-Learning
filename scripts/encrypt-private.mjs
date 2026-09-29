// Encrypts content/private/*.md into src/generated/private.enc.json.
//
// Scheme:
//   - one random 256-bit content key encrypts every page (AES-256-GCM, random 96-bit IV per page);
//   - the content key is also stored wrapped with a key derived from ZOS_PASSWORD (PBKDF2-SHA256), so the
//     password unlocks the pages fully in the browser;
//   - the raw content key is kept in .env.local as ZOS_CONTENT_KEY for /api/unlock (Google sign-in path).
//   - images in content/private/media/ are encrypted with the same content key into public/m/*.bin.
// Only the encrypted outputs are committed; content/private/ and .env.local are git-ignored.
import { webcrypto as crypto } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const SRC = join(ROOT, 'content/private');
const OUT = join(ROOT, 'src/generated/private.enc.json');
const ENV = join(ROOT, '.env.local');
const ITERATIONS = 600_000;

const b64 = (buf) => Buffer.from(buf).toString('base64');
const fromB64 = (s) => new Uint8Array(Buffer.from(s, 'base64'));

function readEnv() {
  const env = {};
  if (existsSync(ENV)) {
    for (const line of readFileSync(ENV, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m) env[m[1]] = m[2];
    }
  }
  return { ...env, ...Object.fromEntries(Object.entries(process.env).filter(([k]) => k.startsWith('ZOS_'))) };
}

function saveEnvValue(name, value) {
  let text = existsSync(ENV) ? readFileSync(ENV, 'utf8') : '';
  const re = new RegExp(`^${name}=.*$`, 'm');
  text = re.test(text) ? text.replace(re, `${name}=${value}`) : `${text}${text && !text.endsWith('\n') ? '\n' : ''}${name}=${value}\n`;
  writeFileSync(ENV, text);
}

async function aesKey(raw) {
  return crypto.subtle.importKey('raw', raw, 'AES-GCM', false, ['encrypt']);
}

async function encrypt(key, bytes) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, bytes);
  return { iv: b64(iv), ct: b64(ct) };
}

const env = readEnv();
if (!env.ZOS_PASSWORD) {
  console.error('Set ZOS_PASSWORD in .env.local (or the environment) first.');
  process.exit(1);
}
if (!existsSync(SRC)) {
  console.error(`Missing ${SRC}: nothing to encrypt.`);
  process.exit(1);
}

let contentKeyRaw;
if (env.ZOS_CONTENT_KEY) {
  contentKeyRaw = fromB64(env.ZOS_CONTENT_KEY);
} else {
  contentKeyRaw = crypto.getRandomValues(new Uint8Array(32));
  saveEnvValue('ZOS_CONTENT_KEY', b64(contentKeyRaw));
  console.log('Generated ZOS_CONTENT_KEY in .env.local (also set it in the Vercel project env).');
}
const contentKey = await aesKey(contentKeyRaw);

const salt = crypto.getRandomValues(new Uint8Array(16));
const pwBase = await crypto.subtle.importKey('raw', new TextEncoder().encode(env.ZOS_PASSWORD), 'PBKDF2', false, ['deriveKey']);
const pwKey = await crypto.subtle.deriveKey(
  { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: ITERATIONS },
  pwBase,
  { name: 'AES-GCM', length: 256 },
  false,
  ['encrypt'],
);

// Images of the private pages: content/private/media/<name> -> public/m/<name>.bin (12-byte IV + AES-GCM ciphertext).
const MEDIA_SRC = join(SRC, 'media');
const MEDIA_OUT = join(ROOT, 'public/m');
// Empty the folder instead of deleting it: a running dev server keeps watching the same directory.
mkdirSync(MEDIA_OUT, { recursive: true });
for (const old of readdirSync(MEDIA_OUT)) rmSync(join(MEDIA_OUT, old));
let mediaCount = 0;
if (existsSync(MEDIA_SRC)) {
  for (const file of readdirSync(MEDIA_SRC).sort()) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const ct = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, contentKey, readFileSync(join(MEDIA_SRC, file))));
    writeFileSync(join(MEDIA_OUT, `${file}.bin`), Buffer.concat([iv, ct]));
    mediaCount++;
  }
}

const docs = [];
for (const file of readdirSync(SRC).filter((f) => f.endsWith('.md')).sort()) {
  const text = readFileSync(join(SRC, file), 'utf8');
  docs.push({ slug: file.replace(/\.md$/, ''), ...(await encrypt(contentKey, new TextEncoder().encode(text))) });
}

const out = {
  v: 1,
  kdf: { name: 'PBKDF2-SHA256', salt: b64(salt), iterations: ITERATIONS },
  wrappedKey: await encrypt(pwKey, contentKeyRaw),
  docs,
};
mkdirSync(join(ROOT, 'src/generated'), { recursive: true });
writeFileSync(OUT, JSON.stringify(out, null, 1) + '\n');
console.log(`Encrypted ${docs.length} page(s) -> src/generated/private.enc.json, ${mediaCount} image(s) -> public/m/`);
