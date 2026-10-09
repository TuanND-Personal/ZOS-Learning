import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CaseChart, { type ChartPoint, type Layers } from '../components/CaseChart';
import {
  CHART_ORDER,
  formatPrice,
  formatTime,
  isCorrect,
  joinCandles,
  loadAfter,
  loadCase,
  readAllProgress,
  sliceCandles,
  useCaseIndex,
  writeProgress,
  type CaseAfter,
  type CaseDoc,
  type CheckItem,
  type Prediction,
  type Progress,
  type Tf,
} from '../lib/cases';

const LAYER_NAMES: { key: keyof Layers; label: string }[] = [
  { key: 'lp', label: 'LP' },
  { key: 'structure', label: 'Cấu trúc' },
  { key: 'range', label: 'Range' },
  { key: 'swing', label: 'Swing' },
  { key: 'build', label: 'Build' },
  { key: 'marks', label: 'Nến quét S' },
];
const LAYERS_KEY = 'zos.cases.layers';
const DEFAULT_LAYERS: Layers = { lp: true, structure: true, range: true, swing: true, build: true, marks: false };
const GROUPS: { key: CheckItem['group']; title: string }[] = [
  { key: 'context', title: 'Bối cảnh' },
  { key: 'zone', title: 'Vùng thanh khoản' },
  { key: 'reaction', title: 'Phản ứng giá' },
  { key: 'location', title: 'Vị trí' },
];
const PREDICTIONS: { key: Prediction; label: string }[] = [
  { key: 'buy', label: 'Buy' },
  { key: 'sell', label: 'Sell' },
  { key: 'skip', label: 'Đứng ngoài' },
];
const CONFIDENCE = ['Thấp', 'Vừa', 'Cao'];
const SPEEDS = [1, 4, 12];
const CHART_TITLE: Record<Tf, string> = { D1: 'D1', H4: 'H4', M15: 'M15' };

function readLayers(): Layers {
  try {
    return { ...DEFAULT_LAYERS, ...(JSON.parse(localStorage.getItem(LAYERS_KEY) || '{}') as Partial<Layers>) };
  } catch {
    return DEFAULT_LAYERS;
  }
}

export default function CasePage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { index } = useCaseIndex();
  const [doc, setDoc] = useState<CaseDoc | null>(null);
  const [after, setAfter] = useState<CaseAfter | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showChecklist, setShowChecklist] = useState(false);
  const [progress, setProgress] = useState<Progress>({});
  const [layers, setLayers] = useState<Layers>(readLayers);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(SPEEDS[1]);
  const [hoverTime, setHoverTime] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    const saved = readAllProgress()[id] ?? {};
    setDoc(null);
    setAfter(null);
    setError(null);
    setPlaying(false);
    setProgress(saved);
    setShowChecklist(Boolean(saved.revealed));
    loadCase(id).then(
      (value) => alive && setDoc(value),
      (reason) => alive && setError(String(reason)),
    );
    // A case that was already revealed opens revealed; there is nothing left to hide.
    if (saved.revealed) {
      loadAfter(id).then((value) => {
        if (!alive) return;
        setAfter(value);
        setStep(value.charts.M15.t.length);
      }, () => undefined);
    }
    return () => {
      alive = false;
    };
  }, [id]);

  const total = after ? after.charts.M15.t.length : 0;

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setStep((value) => {
        if (value >= total) {
          setPlaying(false);
          return value;
        }
        return value + 1;
      });
    }, 600 / speed);
    return () => clearInterval(timer);
  }, [playing, speed, total]);

  useEffect(() => {
    if (!after) return;
    const key = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT') return;
      if (event.key === 'ArrowRight') setStep((value) => Math.min(value + 1, total));
      else if (event.key === 'ArrowLeft') setStep((value) => Math.max(value - 1, 0));
      else return;
      setPlaying(false);
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [after, total]);

  const save = (change: Partial<Progress>) => {
    setProgress((current) => {
      const next = { ...current, ...change };
      writeProgress(id, next);
      return next;
    });
  };

  const reveal = async () => {
    if (!doc) return;
    try {
      const value = await loadAfter(id);
      setAfter(value);
      setStep(value.charts.M15.t.length);
      setShowChecklist(true);
      save({ revealed: true, result: value.result, dir: doc.dir, travel: value.travel });
    } catch (reason) {
      setError(String(reason));
    }
  };

  const restart = () => {
    writeProgress(id, null);
    setProgress({});
    setAfter(null);
    setStep(0);
    setPlaying(false);
    setShowChecklist(false);
  };

  const toggleLayer = (key: keyof Layers) => {
    setLayers((current) => {
      const next = { ...current, [key]: !current[key] };
      try {
        localStorage.setItem(LAYERS_KEY, JSON.stringify(next));
      } catch {
        // Not saved; the toggle still works for this visit.
      }
      return next;
    });
  };

  // What each chart shows: everything known at the cut, plus the revealed candles up to the replay position.
  // A higher-timeframe candle appears only once it has closed at the replay time.
  const charts = useMemo(() => {
    if (!doc) return null;
    const replayTime = after && step > 0 ? after.charts.M15.t[step - 1] + 900 : doc.time;
    return CHART_ORDER.map((tf) => {
      const before = doc.charts[tf];
      const cut = before.t.length - 1;
      const closed = before.forming ? cut - 1 : cut;
      if (!after) return { tf, candles: before, cut, closed, forming: before.forming };
      const extra = after.charts[tf];
      let count = step;
      if (tf !== 'M15') {
        count = 0;
        while (count < extra.t.length && (count + 1 < extra.t.length ? extra.t[count + 1] <= replayTime : step >= total)) count++;
      }
      const replaced = before.forming && count > 0;
      const base = replaced ? sliceCandles(before, cut) : before;
      return { tf, candles: joinCandles(base, extra, count), cut, closed, forming: before.forming && !replaced };
    });
  }, [doc, after, step, total]);

  const points = useMemo(() => {
    if (!doc || !after) return [];
    const out: ChartPoint[] = [];
    const { best, out: broken } = after.markers;
    if (best) out.push({ t: best.t, p: best.p, text: `${after.travel.toFixed(0)} pip`, color: '#ffffff' });
    if (broken) out.push({ t: broken.t, p: doc.tip, text: 'bị phá', color: '#f85149' });
    return out;
  }, [doc, after]);

  const position = index ? index.cases.findIndex((item) => item.id === id) : -1;
  const previous = index && position > 0 ? index.cases[position - 1].id : null;
  const next = index && position >= 0 && position < index.cases.length - 1 ? index.cases[position + 1].id : null;

  const openRandom = () => {
    if (!index) return;
    const done = readAllProgress();
    const open = index.cases.filter((item) => item.id !== id && !done[item.id]?.revealed);
    const pool = open.length ? open : index.cases.filter((item) => item.id !== id);
    if (pool.length) navigate(`/luyen-case/${pool[Math.floor(Math.random() * pool.length)].id}`);
  };

  if (error) return <p className="error">Không tải được case: {error}</p>;
  if (!doc || !charts) return <p className="muted">Đang tải case…</p>;

  const side = doc.dir === 1 ? 'BUY' : 'SELL';
  const tipName = doc.dir === 1 ? 'đáy' : 'đỉnh';
  const verdict = isCorrect(progress);
  const locked = Boolean(progress.revealed);

  return (
    <div className="page case-page">
      <div className="case-head">
        <div>
          <Link to="/luyen-case" className="back-link">← Danh sách case</Link>
          <h1>
            Case {position >= 0 ? position + 1 : ''}{index ? ` / ${index.cases.length}` : ''}
          </h1>
          <p className="muted">
            {doc.symbol} · điểm cắt {formatTime(doc.time)} (GMT+0) · giá {formatPrice(doc.price)}
          </p>
        </div>
        <div className="case-nav">
          {previous ? <Link className="button secondary" to={`/luyen-case/${previous}`}>← Trước</Link> : <span />}
          <button type="button" className="secondary" onClick={openRandom}>Ngẫu nhiên</button>
          {next ? <Link className="button secondary" to={`/luyen-case/${next}`}>Sau →</Link> : <span />}
        </div>
      </div>

      <section className="panel">
        <h2><span className="step-no">1</span> Nhận định của bạn</h2>
        <p className="muted">
          Đọc ba chart rồi chọn trước khi mở checklist hay kết quả. Lựa chọn bị khoá sau khi mở kết quả để thống kê trung thực.
        </p>
        <div className="choice-row">
          {PREDICTIONS.map((item) => (
            <button
              key={item.key}
              type="button"
              disabled={locked}
              className={`choice ${item.key} ${progress.pred === item.key ? 'on' : ''}`}
              onClick={() => save({ pred: item.key })}
            >
              {item.label}
            </button>
          ))}
          <span className="choice-gap" />
          <span className="muted">Mức tự tin:</span>
          {CONFIDENCE.map((label, i) => (
            <button
              key={label}
              type="button"
              disabled={locked}
              className={`choice small ${progress.conf === i + 1 ? 'on' : ''}`}
              onClick={() => save({ conf: i + 1 })}
            >
              {label}
            </button>
          ))}
        </div>
        <textarea
          className="note"
          rows={3}
          placeholder="Ghi chú của bạn: pha thị trường, LP nào đang giữ giá, vì sao vào hoặc không vào…"
          value={progress.note ?? ''}
          onChange={(event) => save({ note: event.target.value })}
        />
      </section>

      <div className="layer-bar">
        <span className="muted">Lớp vẽ:</span>
        {LAYER_NAMES.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`chip ${layers[item.key] ? 'on' : ''}`}
            aria-pressed={layers[item.key]}
            onClick={() => toggleLayer(item.key)}
          >
            {item.label}
          </button>
        ))}
        <span className="muted hint">Kéo để cuộn · chụm hai ngón hoặc Ctrl + lăn chuột để phóng · nhấp đúp để về mặc định</span>
      </div>

      <div className="chart-grid">
        {charts.map((chart) => (
          <div key={chart.tf} className={`chart-cell tf-${chart.tf}`}>
            <CaseChart
              title={CHART_TITLE[chart.tf]}
              candles={chart.candles}
              overlays={doc.charts[chart.tf]}
              layers={layers}
              cut={chart.cut}
              closed={chart.closed}
              forming={chart.forming}
              boxTf={chart.tf === 'M15' ? 'M15' : undefined}
              tipLine={after ? doc.tip : null}
              points={after && chart.tf === 'M15' ? points : undefined}
              hoverTime={hoverTime}
              onHover={setHoverTime}
            />
          </div>
        ))}
      </div>
      <p className="muted legend">
        Nến NC: xanh lá / xanh dương = M &gt; 0, đỏ / hồng = M &lt; 0, vàng = Build. LP khung lớn là cặp đường High – Low
        (H4 xanh dương, D1 vàng, W1 đỏ cà chua; liền = GLP, đứt = RLP, chấm = chưa phá, đậm = Main); LP M15 là hộp.
        Đường bậc thang = mức bảo vệ của cấu trúc. Các lớp vẽ giữ nguyên trạng thái tại điểm cắt, kể cả sau khi mở kết quả.
      </p>

      {after && (
        <section className="panel replay">
          <h2>Phát lại từng nến M15</h2>
          <div className="replay-row">
            <button type="button" className="secondary" onClick={() => { setPlaying(false); setStep(0); }} aria-label="Về điểm cắt">⏮</button>
            <button type="button" className="secondary" onClick={() => { setPlaying(false); setStep((value) => Math.max(value - 1, 0)); }} aria-label="Lùi một nến">◀</button>
            <button type="button" onClick={() => { if (step >= total) setStep(0); setPlaying((value) => !value); }}>
              {playing ? 'Dừng' : 'Chạy'}
            </button>
            <button type="button" className="secondary" onClick={() => { setPlaying(false); setStep((value) => Math.min(value + 1, total)); }} aria-label="Tới một nến">▶</button>
            <button type="button" className="secondary" onClick={() => { setPlaying(false); setStep(total); }} aria-label="Tới cuối">⏭</button>
            <input
              type="range"
              min={0}
              max={total}
              value={step}
              aria-label="Vị trí phát lại"
              onChange={(event) => { setPlaying(false); setStep(Number(event.target.value)); }}
            />
            <span className="muted replay-pos">{step} / {total} nến</span>
            {SPEEDS.map((value) => (
              <button key={value} type="button" className={`chip ${speed === value ? 'on' : ''}`} onClick={() => setSpeed(value)}>
                ×{value}
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="panel">
        <h2><span className="step-no">2</span> Checklist và phân tích</h2>
        {!showChecklist ? (
          <>
            <p className="muted">
              Checklist chấm kịch bản tại đúng điểm cắt theo 12 tiêu chí sách vở, tính tự động từ cùng các engine vẽ chart.
              Mở ra sẽ thấy kịch bản đang được chấm là Buy hay Sell.
            </p>
            <button type="button" onClick={() => setShowChecklist(true)}>Hiện checklist và phân tích</button>
          </>
        ) : (
          <>
            <div className="score-line">
              <span className={`side-tag ${doc.dir === 1 ? 'buy' : 'sell'}`}>{side} tại {tipName} {formatPrice(doc.tip)}</span>
              <span className="score">
                <b>{doc.score}</b> / {doc.total} tiêu chí đạt
              </span>
              <span className="score-bar" aria-hidden="true">
                <span style={{ width: `${(100 * doc.score) / doc.total}%` }} />
              </span>
            </div>
            <p className="caveat">
              Điểm này là số tiêu chí sách vở được thoả mãn, <b>không phải xác suất thắng</b>.
            </p>
            <div className="check-grid">
              {GROUPS.map((group) => (
                <div key={group.key} className="check-group">
                  <h3>{group.title}</h3>
                  <ul>
                    {doc.checklist.filter((item) => item.group === group.key).map((item) => (
                      <li key={item.id} className={item.met ? 'met' : item.oppose ? 'oppose' : 'unmet'}>
                        <span className="mark" aria-hidden="true">{item.met ? '✓' : item.oppose ? '✕' : '–'}</span>
                        <span>
                          <b>{item.label}</b>
                          <span className="sr-only">{item.met ? ' (đạt)' : item.oppose ? ' (chống lại)' : ' (không đạt)'}</span>
                          <br />
                          <span className="detail">{item.detail}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {doc.analysis.map((part) => (
              <div key={part.title} className="analysis">
                <h3>{part.title}</h3>
                <p>{part.text}</p>
              </div>
            ))}
          </>
        )}
      </section>

      <section className="panel">
        <h2><span className="step-no">3</span> Kết quả</h2>
        {!after ? (
          <>
            <p className="muted">
              {progress.pred ? 'Mở để xem giá đã làm gì trong 48 giờ sau điểm cắt.' : 'Bạn chưa chọn nhận định ở bước 1. Vẫn mở được, nhưng case này sẽ không được tính vào thống kê đúng / sai.'}
            </p>
            <button type="button" onClick={reveal}>Hiện kết quả</button>
          </>
        ) : (
          <>
            <div className={`result ${after.result}`}>
              <b>{after.result === 'run' ? `Giá chạy ${after.travel.toFixed(0)} pip theo hướng ${side}` : `Thất bại: ${tipName} bị phá sau khi giá chỉ đi ${after.travel.toFixed(0)} pip`}</b>
              {verdict !== null && (
                <span className={verdict ? 'right' : 'wrong'}>
                  {verdict ? 'Nhận định của bạn đúng' : 'Nhận định của bạn sai'} ({PREDICTIONS.find((item) => item.key === progress.pred)?.label})
                </span>
              )}
            </div>
            {after.outcome.map((part) => (
              <div key={part.title} className="analysis">
                <h3>{part.title}</h3>
                <p>{part.text}</p>
              </div>
            ))}
            <button type="button" className="secondary" onClick={restart}>Làm lại case này (xoá nhận định và ghi chú)</button>
          </>
        )}
      </section>

      <div className="case-nav bottom">
        {previous ? <Link className="button secondary" to={`/luyen-case/${previous}`}>← Case trước</Link> : <span />}
        {next ? <Link className="button" to={`/luyen-case/${next}`}>Case sau →</Link> : <span />}
      </div>
    </div>
  );
}
