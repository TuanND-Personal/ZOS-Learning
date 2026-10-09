import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatTime, isCorrect, readAllProgress, useCaseIndex } from '../lib/cases';

type Filter = 'all' | 'open' | 'done';
const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'Tất cả' },
  { key: 'open', label: 'Chưa mở' },
  { key: 'done', label: 'Đã mở' },
];
const MONTHS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

export default function CasesPage() {
  const { index, error } = useCaseIndex();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>('all');
  const progress = useMemo(readAllProgress, []);

  const summary = useMemo(() => {
    const revealed = Object.values(progress).filter((item) => item.revealed);
    const judged = revealed.map(isCorrect).filter((value) => value !== null);
    return { revealed: revealed.length, judged: judged.length, right: judged.filter(Boolean).length };
  }, [progress]);

  const months = useMemo(() => {
    if (!index) return [];
    const groups = new Map<string, { id: string; t: number; score: number; number: number }[]>();
    index.cases.forEach((item, i) => {
      const done = Boolean(progress[item.id]?.revealed);
      if ((filter === 'open' && done) || (filter === 'done' && !done)) return;
      const date = new Date(item.t * 1000);
      const key = `${MONTHS[date.getUTCMonth()]}/${date.getUTCFullYear()}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push({ ...item, number: i + 1 });
    });
    return [...groups.entries()];
  }, [index, filter, progress]);

  if (error) return <p className="error">Không tải được danh sách case: {error}</p>;
  if (!index) return <p className="muted">Đang tải danh sách case…</p>;

  const openRandom = () => {
    const open = index.cases.filter((item) => !progress[item.id]?.revealed);
    const pool = open.length ? open : index.cases;
    navigate(`/luyen-case/${pool[Math.floor(Math.random() * pool.length)].id}`);
  };

  return (
    <div className="page cases-page">
      <h1>Luyện case thực tế</h1>
      <p>
        {index.cases.length} thời điểm thật trên {index.symbol}, mỗi case cắt tại một đỉnh / đáy swing M15. Bạn xem ba chart D1, H4,
        M15 vẽ theo bộ NEO (nến NC, LP, cấu trúc, range, swing), tự nhận định, đối chiếu checklist, rồi mới mở xem giá đã làm gì.
      </p>
      <ul className="plain-list">
        <li>Khoảng hai phần ba là các cú chạy từ {index.runPips} pip; phần còn lại là setup điểm cao nhưng đỉnh / đáy bị phá trước {index.failPips} pip.</li>
        <li>Case được chọn bằng quy tắc máy, không chọn tay. Điểm cắt là đúng nến tạo đỉnh / đáy, thứ chỉ biết được sau này.</li>
        <li>Nhận định và ghi chú chỉ lưu trên trình duyệt này.</li>
      </ul>

      <div className="summary-row">
        <div className="stat"><b>{summary.revealed}</b><span>/ {index.cases.length} case đã mở</span></div>
        <div className="stat">
          <b>{summary.judged ? `${Math.round((100 * summary.right) / summary.judged)}%` : '–'}</b>
          <span>nhận định đúng ({summary.right} / {summary.judged})</span>
        </div>
        <button type="button" onClick={openRandom}>Mở một case ngẫu nhiên</button>
      </div>

      <h2>Điểm checklist nói được gì</h2>
      <p>
        Tính trên toàn bộ {index.stats.tips} đỉnh / đáy swing M15 của cùng dữ liệu (không chỉ các case ở đây). Điểm cao hơn gần như
        không làm tăng tỉ lệ chạy mạnh, vì vậy điểm checklist là <b>số tiêu chí sách vở đạt được, không phải xác suất thắng</b>. Xem thêm{' '}
        <Link to="/hoc/11-ket-qua-nghien-cuu-backtest">tổng kết nghiên cứu backtest</Link>.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Điểm checklist</th>
              <th>Số đỉnh / đáy</th>
              <th>Chạy từ {index.runPips} pip</th>
              <th>Bị phá trước {index.failPips} pip</th>
            </tr>
          </thead>
          <tbody>
            {index.stats.bands.map((band) => (
              <tr key={band.label}>
                <td>{band.label} / {index.total}</td>
                <td>{band.n}</td>
                <td>{band.run.toFixed(0)}%</td>
                <td>{band.fail.toFixed(0)}%</td>
              </tr>
            ))}
            <tr>
              <td><b>Tất cả</b></td>
              <td>{index.stats.tips}</td>
              <td>{index.stats.run.toFixed(0)}%</td>
              <td>{index.stats.fail.toFixed(0)}%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="filter-row">
        <h2>Danh sách case</h2>
        <div>
          {FILTERS.map((item) => (
            <button key={item.key} type="button" className={`chip ${filter === item.key ? 'on' : ''}`} onClick={() => setFilter(item.key)}>
              {item.label}
            </button>
          ))}
        </div>
      </div>
      {months.length === 0 && <p className="muted">Không có case nào trong bộ lọc này.</p>}
      {months.map(([month, items]) => (
        <section key={month}>
          <h3 className="month">Tháng {month}</h3>
          <div className="case-list">
            {items.map((item) => {
              const saved = progress[item.id];
              const verdict = saved ? isCorrect(saved) : null;
              return (
                <Link key={item.id} to={`/luyen-case/${item.id}`} className={`case-card ${saved?.revealed ? 'done' : ''}`}>
                  <span className="case-no">#{item.number}</span>
                  <span className="case-time">{formatTime(item.t)}</span>
                  {saved?.revealed ? (
                    <span className="case-state">
                      <span className={saved.result === 'run' ? 'right' : 'wrong'}>
                        {saved.result === 'run' ? `Chạy ${saved.travel?.toFixed(0)} pip` : 'Thất bại'}
                      </span>
                      {' · '}{item.score}/{index.total}
                      {verdict !== null && <span className={verdict ? 'right' : 'wrong'}> · {verdict ? 'đoán đúng' : 'đoán sai'}</span>}
                    </span>
                  ) : (
                    <span className="case-state muted">{saved?.pred ? 'Đã nhận định, chưa mở' : 'Chưa làm'}</span>
                  )}
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
