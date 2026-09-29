import { Link } from 'react-router-dom';
import { DOCS, docPath } from '../content';

const TOOLS = [
  { name: 'ZO_LP', kind: 'Indicator', what: 'Dựng LP từ ZOS trên từng khung, chia sẻ dữ liệu giữa 5 chart, cảnh báo retest / break / SETUP, gợi ý BE, kiểm tra lệnh.' },
  { name: 'ZO_View', kind: 'Indicator', what: 'Hộp LP khung đang mở (G xanh, R đỏ), đánh dấu nến break / clear / Main / build 1 đầu / thu nến, bảng phân tích W1→M15 không nhấp nháy.' },
  { name: 'ZO_DrawLP', kind: 'Script', what: 'Vẽ 1 lần các LP quan trọng W1 / D1 / H4 bằng cặp đường có nhãn (H-RLP-W1 …), màu theo khung, đánh dấu Main.' },
  { name: 'ZO_Analyst', kind: 'EA', what: 'Viết phân tích khi gắn và khi cấu trúc đổi (Main mới, đổi xu thế, chạm LP lớn), gửi Telegram / Discord; chuyển tiếp cảnh báo của ZO_LP.' },
  { name: 'ZO_Notifier', kind: 'EA', what: 'Bản cũ chỉ chuyển cảnh báo — không cần nếu dùng ZO_Analyst.' },
  { name: 'ZOS_Probe', kind: 'Script', what: 'Xuất dữ liệu ZOS ra CSV (dùng cho backtest).' },
];

export default function ToolsPage() {
  const base = import.meta.env.BASE_URL;
  return (
    <div className="page">
      <h1>Công cụ MT4</h1>
      <p>Không công cụ nào tự đặt, sửa hay đóng lệnh. Luôn chạy thử trên tài khoản demo trước.</p>

      <div className="download">
        <div>
          <h3>ZO-Tool.zip</h3>
          <p>File .ex4 đã compile + mã nguồn .mq4 + hướng dẫn. Cần ZOS đã cài và chạy được trên MT4.</p>
        </div>
        <a className="button" href={`${base}downloads/ZO-Tool.zip`} download>
          Tải về
        </a>
      </div>

      <h2>Trong gói có gì</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Tên</th>
              <th>Loại</th>
              <th>Làm gì</th>
            </tr>
          </thead>
          <tbody>
            {TOOLS.map((t) => (
              <tr key={t.name}>
                <td>
                  <code>{t.name}</code>
                </td>
                <td>{t.kind}</td>
                <td>{t.what}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Cài nhanh</h2>
      <ol className="steps">
        <li>
          MT4 → <b>File → Open Data Folder</b> → copy thư mục <code>MQL4</code> trong gói đè vào (gộp thư mục). Navigator →
          chuột phải → <b>Refresh</b>.
        </li>
        <li>
          Mở 5 chart EURUSD <b>W1, D1, H4, H1, M15</b> có ZOS → kéo <b>ZO_LP</b> vào cả 5 chart (ZOS chỉ đúng trên chart của
          chính khung đó, nên mỗi khung phải có chart riêng).
        </li>
        <li>
          Kéo <b>ZO_View</b> vào chart bạn hay nhìn.
        </li>
        <li>
          <b>Tools → Options → Expert Advisors</b> → tick <b>Allow WebRequest</b> → thêm <code>https://api.telegram.org</code>.
        </li>
        <li>
          Kéo <b>ZO_Analyst</b> vào 1 chart → tab Inputs điền <code>InpTelegramToken</code> và <code>InpTelegramChatId</code>{' '}
          (bản tải về để trống — tạo bot theo{' '}
          <Link to="/cong-cu/02-huong-dan-telegram-discord">hướng dẫn Telegram</Link>) → OK.
        </li>
      </ol>

      <h2>Hướng dẫn chi tiết</h2>
      <div className="cards">
        {DOCS.filter((d) => d.section === 'cong-cu').map((d) => (
          <Link key={d.slug} to={docPath(d)} className="card">
            <h3>{d.title}</h3>
            <p>{d.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
