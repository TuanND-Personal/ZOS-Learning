import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useVault } from '../lib/vault';
import { loadGoogleId } from '../lib/google';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

export default function UnlockPanel() {
  const vault = useVault();
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const googleBox = useRef<HTMLDivElement>(null);
  const rememberRef = useRef(remember);
  rememberRef.current = remember;

  useEffect(() => {
    if (!CLIENT_ID || !googleBox.current) return;
    let cancelled = false;
    loadGoogleId()
      .then((gid) => {
        if (cancelled || !googleBox.current) return;
        gid.initialize({
          client_id: CLIENT_ID,
          callback: async ({ credential }) => {
            setBusy(true);
            setError('');
            try {
              const r = await fetch('/api/unlock', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ credential }),
              });
              const data = await r.json().catch(() => ({}));
              if (!r.ok || !data.key) {
                throw new Error(
                  r.status === 403
                    ? 'Tài khoản Google này không được phép xem.'
                    : r.status === 404
                      ? 'Máy chủ chưa có /api/unlock (trang tĩnh) — dùng mật khẩu.'
                      : data.error || 'Không mở khoá được.',
                );
              }
              await vault.unlockWithKey(data.key, rememberRef.current);
            } catch (e) {
              setError(e instanceof Error ? e.message : 'Không mở khoá được.');
            } finally {
              setBusy(false);
            }
          },
        });
        gid.renderButton(googleBox.current, { theme: 'filled_black', size: 'large', text: 'signin_with', locale: 'vi' });
      })
      .catch(() => setError('Không tải được nút đăng nhập Google — dùng mật khẩu.'));
    return () => {
      cancelled = true;
    };
  }, [vault]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await vault.unlockWithPassword(password, remember);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không mở khoá được.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="unlock">
      <h2>🔒 Nội dung riêng tư</h2>
      <p>
        Các trang trích tin nhắn Discord được mã hoá. Nhập mật khẩu hoặc đăng nhập Google bằng tài khoản được phép để
        xem.
      </p>
      <form onSubmit={submit} className="unlock-form">
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={busy || !password}>
          {busy ? 'Đang mở…' : 'Mở khoá'}
        </button>
      </form>
      {CLIENT_ID && (
        <>
          <div className="or">hoặc</div>
          <div ref={googleBox} className="google-btn" />
        </>
      )}
      <label className="remember">
        <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Ghi nhớ trên thiết
        bị này
      </label>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
