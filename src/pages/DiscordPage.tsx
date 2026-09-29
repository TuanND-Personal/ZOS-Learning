import { Link } from 'react-router-dom';
import { DOCS, docPath } from '../content';
import { useVault } from '../lib/vault';
import UnlockPanel from '../components/UnlockPanel';

export default function DiscordPage() {
  const vault = useVault();
  if (!vault.unlocked) return <UnlockPanel />;
  return (
    <div className="page">
      <h1>Discord — tài liệu riêng tư</h1>
      <p>Tổng hợp từ lịch sử kênh ZO (11/2023 → 09/2026). Chỉ để học cá nhân, không chia sẻ lại.</p>
      <div className="cards">
        {DOCS.filter((d) => d.isPrivate).map((d) => (
          <Link key={d.slug} to={docPath(d)} className="card">
            <h3>{d.title}</h3>
            <p>{d.summary}</p>
          </Link>
        ))}
      </div>
      <button className="secondary" onClick={vault.lock}>
        Khoá lại (xoá ghi nhớ trên máy này)
      </button>
    </div>
  );
}
