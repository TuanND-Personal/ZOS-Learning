import { Link } from 'react-router-dom';
import { DOCS, docPath } from '../content';

const TOOLS = [
  { name: 'ZO_LP', kind: 'Indicator', what: 'Ghi dữ liệu LP của khung chart nó đang chạy (tính từ nến ZOS) cho EA đọc. Không vẽ, không gửi tin. EA tự gắn nó lên chart H4.' },
  { name: 'ZO_Analyst', kind: 'EA', what: 'EA của hệ chính ZO-FLEX: phân tích thị trường, báo Potential EP và tín hiệu vào lệnh (MAIN-AB, PULLBACK, LP-AB, LP-BUILD), quản lý lệnh kể cả lệnh vào tay, cảnh báo tin, gửi Telegram. Trên tài khoản demo tự đặt và quản lý lệnh; trên tài khoản thật mặc định chỉ báo tín hiệu.' },
  { name: 'ZO_View', kind: 'Indicator', what: 'Indicator duy nhất vẽ LP, chỉ cần một chart: LP M15 là hộp, LP H4 / D1 / W1 là hai đường High – Low; chuyển sang khung nào thì LP khung đó được cập nhật và lưu lại. Kèm bảng phân tích W1→M15.' },
  { name: 'ZO_BTView', kind: 'Indicator · backtest', what: 'Thư mục ZO_Backtest. Xem lại lệnh backtest của hệ ZO-FLEX và chỗ báo EP tiềm năng trên chart; bấm vào một lệnh để xem vì sao vào, yếu tố ủng hộ và không ủng hộ.' },
  { name: 'ZO_RunStart', kind: 'Indicator · backtest', what: 'Thư mục ZO_Backtest. Đánh dấu các điểm bắt đầu đợt chạy trong quá khứ; bấm vào để xem giải thích.' },
  { name: 'ZO_Review', kind: 'Indicator · backtest', what: 'Thư mục ZO_Backtest. Chart sạch (LP H4 / D1 / W1 dạng đường, LP M15 dạng hộp) để tự đánh dấu điểm vào bằng mũi tên.' },
  { name: 'ZO_ExportMarks', kind: 'Script · backtest', what: 'Thư mục ZO_Backtest. Xuất các mũi tên bạn tự đánh dấu ra file để so với hệ.' },
  { name: 'ZOS_Probe', kind: 'Script · backtest', what: 'Thư mục ZO_Backtest. Xuất dữ liệu ZOS ra CSV (dùng cho backtest).' },
];

export default function ToolsPage() {
  const base = import.meta.env.BASE_URL;
  return (
    <div className="page">
      <h1>Công cụ MT4</h1>
      <p>
        Chỉ EA <code>ZO_Analyst</code> đặt lệnh: mặc định nó tự đặt và quản lý lệnh trên tài khoản <b>demo</b>, còn trên tài
        khoản thật chỉ báo tín hiệu. Các công cụ khác không đặt, sửa hay đóng lệnh. Luôn chạy thử trên demo trước.
      </p>

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
          <b>Tools → Options → Expert Advisors</b> → tick <b>Allow WebRequest</b> → thêm <code>https://api.telegram.org</code> và{' '}
          <code>https://nfs.faireconomy.media</code> (lịch tin).
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
