import { Link } from 'react-router-dom';
import { DOCS, SECTIONS, docPath } from '../content';

export default function Home() {
  return (
    <div className="page">
      <section className="hero">
        <h1>Học ZO System từ bản chất</h1>
        <p>
          Kiến thức PVSRA + ZOS tổng hợp từ toàn bộ kênh Discord ZO (80.928 tin nhắn, 11/2023 → 09/2026) và sách PVSRA —
          giải thích <em>vì sao</em>, không chỉ <em>cái gì</em>. Kèm bộ công cụ MT4 hỗ trợ kỷ luật: vẽ LP, cảnh báo retest,
          phân tích gửi Telegram.
        </p>
        <blockquote>
          “ZO là system dùng để đọc MM… dùng máy móc break lên buy, break xuống sell sẽ mất khả năng suy luận.” — Zerd,
          29/12/2023
        </blockquote>
        <div className="hero-actions">
          <Link to="/hoc/01-nen-tang-trading" className="button">
            Bắt đầu học
          </Link>
          <Link to="/cong-cu" className="button secondary">
            Tải công cụ MT4
          </Link>
        </div>
      </section>
      {SECTIONS.map((s) => (
        <section key={s.id}>
          <h2>
            <Link to={`/${s.id}`}>{s.title}</Link>
          </h2>
          <div className="cards">
            {DOCS.filter((d) => d.section === s.id).map((d) => (
              <Link key={d.slug} to={docPath(d)} className="card">
                <h3>
                  {d.isPrivate && '🔒 '}
                  {d.title}
                </h3>
                <p>{d.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
