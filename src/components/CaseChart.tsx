import { useEffect, useRef } from 'react';
import { formatPrice, formatTime, type Candles, type Overlays } from '../lib/cases';

export interface Layers {
  lp: boolean;
  structure: boolean;
  range: boolean;
  swing: boolean;
  build: boolean;
  marks: boolean;
}

export interface ChartPoint {
  t: number;
  p: number;
  text: string;
  color: string;
}

interface Props {
  title: string;
  candles: Candles;
  overlays: Overlays;
  layers: Layers;
  /** Index of the last candle known at the cut; later candles are the revealed future. */
  cut: number;
  /** Index of the last candle that was closed at the cut. */
  closed: number;
  /** Candle `cut` is still forming. */
  forming: boolean;
  /** LPs of this timeframe are drawn as boxes, the others as High / Low lines. */
  boxTf?: string;
  tipLine?: number | null;
  points?: ChartPoint[];
  hoverTime: number | null;
  onHover: (time: number | null) => void;
}

// The chart keeps the dark MT4 look of the NEO indicators in both site themes.
const BACKGROUND = '#0d0f14';
const GRID = '#1c2029';
const AXIS_TEXT = '#8b94a1';
const WICK = '#6A6A75';
const BUILD = '#FFFF00';
const FAMILY = [
  ['#00FF00', '#008000'],
  ['#00BFFF', '#4169E1'],
  ['#FA8072', '#FD2600'],
  ['#F29FF2', '#891289'],
];
const TF_COLOR: Record<string, string> = { H4: '#1E90FF', D1: '#FFD700', W1: '#FF6347', M15: '#FFD700' };
const STATE_COLOR: Record<string, string> = { '1': '#3fb950', '-1': '#f85149', '2': '#9aa3ad', '-2': '#9aa3ad' };
const SWING_HIGH = 'rgb(205,95,95)';
const SWING_LOW = 'rgb(95,175,115)';
const AXIS_WIDTH = 62;
const AXIS_HEIGHT = 20;
const TOP = 20;
const MIN_SCALE = 1.5;
const MAX_SCALE = 40;
const STEPS = [2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000, 2500, 5000, 10000];

interface View {
  scale: number;
  offset: number;
  width: number;
  height: number;
  cross: { x: number; y: number } | null;
  count: number;
}

function clamp(value: number, low: number, high: number): number {
  return Math.min(Math.max(value, low), high);
}

/** Index of the last candle that opened at or before `time`, or -1. */
function indexAt(times: number[], time: number): number {
  let low = 0;
  let high = times.length - 1;
  let found = -1;
  while (low <= high) {
    const middle = (low + high) >> 1;
    if (times[middle] <= time) {
      found = middle;
      low = middle + 1;
    } else high = middle - 1;
  }
  return found;
}

export default function CaseChart(props: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const view = useRef<View>({ scale: 6, offset: 0, width: 0, height: 0, cross: null, count: 0 });
  const latest = useRef(props);
  latest.current = props;
  const frame = useRef(0);

  const plotWidth = () => Math.max(view.current.width - AXIS_WIDTH, 50);

  const limitOffset = () => {
    const v = view.current;
    const n = latest.current.candles.t.length;
    v.offset = clamp(v.offset, Math.min(n - 1, 8), n - 1 + (plotWidth() / v.scale) * 0.8);
  };

  const reset = () => {
    const v = view.current;
    v.scale = clamp(plotWidth() / 130, 3.5, 9);
    v.offset = latest.current.candles.t.length - 1 + 4;
  };

  const zoom = (factor: number, anchorX: number) => {
    const v = view.current;
    const width = plotWidth();
    const anchor = v.offset - (width - anchorX) / v.scale;
    v.scale = clamp(v.scale * factor, MIN_SCALE, MAX_SCALE);
    v.offset = anchor + (width - anchorX) / v.scale;
    limitOffset();
  };

  const draw = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    const v = view.current;
    const { candles, overlays, layers, cut, closed, forming, boxTf, tipLine, points, hoverTime, title } = latest.current;
    const n = candles.t.length;
    const ratio = window.devicePixelRatio || 1;
    if (canvas.width !== Math.round(v.width * ratio) || canvas.height !== Math.round(v.height * ratio)) {
      canvas.width = Math.round(v.width * ratio);
      canvas.height = Math.round(v.height * ratio);
    }
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.fillStyle = BACKGROUND;
    context.fillRect(0, 0, v.width, v.height);
    if (n === 0 || v.width < 80) return;

    const width = plotWidth();
    const height = v.height - AXIS_HEIGHT - TOP;
    const x = (index: number) => width - (v.offset - index + 0.5) * v.scale;
    const first = clamp(Math.floor(v.offset - width / v.scale), 0, n - 1);
    const last = clamp(Math.ceil(v.offset), 0, n - 1);
    let low = Infinity;
    let high = -Infinity;
    for (let i = first; i <= last; i++) {
      low = Math.min(low, candles.l[i]);
      high = Math.max(high, candles.h[i]);
    }
    const padding = Math.max((high - low) * 0.08, 5);
    low -= padding;
    high += padding;
    const y = (price: number) => TOP + ((high - price) / (high - low)) * height;
    const half = v.scale / 2;

    context.save();
    context.beginPath();
    context.rect(0, TOP, width, height);
    context.clip();
    context.lineWidth = 1;
    context.font = '10px ui-monospace, Menlo, Consolas, monospace';
    context.textBaseline = 'middle';

    // Grid
    const step = STEPS.find((value) => ((high - low) / value) * 14 < height) ?? STEPS[STEPS.length - 1];
    context.strokeStyle = GRID;
    for (let price = Math.ceil(low / step) * step; price < high; price += step) {
      context.beginPath();
      context.moveTo(0, Math.round(y(price)) + 0.5);
      context.lineTo(width, Math.round(y(price)) + 0.5);
      context.stroke();
    }
    const spacing = n > 1 ? candles.t[1] - candles.t[0] : 900;
    const bucket = (time: number) => {
      const date = new Date(time * 1000);
      if (spacing < 3600) return Math.floor(time / 86400);
      if (spacing < 86400) return Math.floor((time / 86400 + 3) / 7);
      return date.getUTCFullYear() * 12 + date.getUTCMonth();
    };
    const timeLabels: { at: number; text: string }[] = [];
    for (let i = Math.max(first, 1); i <= last; i++) {
      if (bucket(candles.t[i]) === bucket(candles.t[i - 1])) continue;
      const at = Math.round(x(i) - half) + 0.5;
      context.beginPath();
      context.moveTo(at, TOP);
      context.lineTo(at, TOP + height);
      context.stroke();
      const iso = new Date(candles.t[i] * 1000).toISOString();
      timeLabels.push({ at, text: spacing < 86400 ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}` : `${iso.slice(5, 7)}/${iso.slice(2, 4)}` });
    }

    // The revealed future is tinted so the cut stays visible.
    if (n - 1 > cut) {
      context.fillStyle = 'rgba(120,140,190,0.07)';
      context.fillRect(x(cut) + half, TOP, width, height);
    }

    if (layers.range) {
      for (const [from, to, bottom, top] of overlays.ranges) {
        context.fillStyle = 'rgba(150,150,175,0.07)';
        context.strokeStyle = 'rgba(150,150,175,0.55)';
        const left = x(from) - half;
        context.fillRect(left, y(top), x(to) + half - left, y(bottom) - y(top));
        context.strokeRect(Math.round(left) + 0.5, Math.round(y(top)) + 0.5, x(to) + half - left, y(bottom) - y(top));
      }
    }

    if (layers.lp) {
      for (const zone of overlays.lp) {
        const left = Math.max(x(zone.x) - half, 0);
        const name = `${zone.d === 1 ? 'GLP' : zone.d === -1 ? 'RLP' : 'LP'} ${zone.tf}${zone.m ? ' Main' : ''}`;
        if (zone.tf === boxTf) {
          if (zone.d !== 0) {
            context.fillStyle = zone.d === 1 ? 'rgba(0,110,0,0.38)' : 'rgba(150,0,0,0.38)';
            context.fillRect(left, y(zone.hi), width - left, y(zone.lo) - y(zone.hi));
          }
          context.strokeStyle = zone.d === 0 ? '#FFD700' : zone.d === 1 ? '#0a8a0a' : '#b01818';
          context.lineWidth = zone.m ? 2 : 1;
          context.strokeRect(Math.round(left) + 0.5, Math.round(y(zone.hi)) + 0.5, width - left + 2, y(zone.lo) - y(zone.hi));
        } else {
          context.strokeStyle = TF_COLOR[zone.tf];
          context.lineWidth = zone.m ? 2.5 : 1;
          context.setLineDash(zone.d === 1 ? [] : zone.d === -1 ? [7, 4] : [2, 3]);
          for (const price of [zone.hi, zone.lo]) {
            context.beginPath();
            context.moveTo(left, Math.round(y(price)) + 0.5);
            context.lineTo(width, Math.round(y(price)) + 0.5);
            context.stroke();
          }
          context.setLineDash([]);
          context.fillStyle = TF_COLOR[zone.tf];
          context.textAlign = 'right';
          context.fillText(name, width - 4, y(zone.hi) - 7);
        }
        context.lineWidth = 1;
      }
    }

    if (layers.swing) {
      context.textAlign = 'right';
      for (const swing of overlays.swings) {
        const at = Math.round(y(swing.p)) + 0.5;
        context.strokeStyle = context.fillStyle = swing.k === 1 ? SWING_HIGH : SWING_LOW;
        context.beginPath();
        context.moveTo(Math.max(x(swing.x), 0), at);
        context.lineTo(width, at);
        context.stroke();
        context.fillText(`${swing.k === 1 ? 'SH' : 'SL'} ${swing.tf}`, width - 4, at + (swing.k === 1 ? -6 : 7));
      }
    }

    if (layers.structure) {
      for (const level of overlays.levels) {
        const at = Math.round(y(level.p)) + 0.5;
        context.strokeStyle = context.fillStyle = STATE_COLOR[String(level.s)] ?? '#9aa3ad';
        context.setLineDash([10, 5]);
        context.beginPath();
        context.moveTo(0, at);
        context.lineTo(width, at);
        context.stroke();
        context.setLineDash([]);
        context.textAlign = 'left';
        context.fillText(`Bảo vệ ${level.tf}`, 6, at - 6);
      }
      context.lineWidth = 1.6;
      overlays.prot.forEach(([from, to, price, state], i) => {
        const next = overlays.prot[i + 1];
        const right = to >= closed ? width : x(to) + half;
        context.strokeStyle = STATE_COLOR[String(state)] ?? '#9aa3ad';
        context.beginPath();
        context.moveTo(x(from) - half, y(price));
        context.lineTo(right, y(price));
        if (next && next[0] === to + 1) context.lineTo(right, y(next[2]));
        context.stroke();
      });
      context.lineWidth = 1;
    }

    // Candles
    const body = Math.max(1, Math.floor(v.scale * 0.72));
    for (let i = first; i <= last; i++) {
      const center = Math.round(x(i));
      const rising = candles.c[i] >= candles.o[i];
      const family = candles.k[i] & 3;
      context.globalAlpha = forming && i === cut ? 0.55 : 1;
      context.fillStyle = WICK;
      context.fillRect(center, y(candles.h[i]), 1, Math.max(y(candles.l[i]) - y(candles.h[i]), 1));
      context.fillStyle = layers.build && candles.k[i] >= 4 ? BUILD : FAMILY[family][rising ? 0 : 1];
      const top = y(Math.max(candles.o[i], candles.c[i]));
      const bottom = y(Math.min(candles.o[i], candles.c[i]));
      context.fillRect(center - Math.floor(body / 2), top, body, Math.max(bottom - top, 1));
    }
    context.globalAlpha = 1;

    if (layers.marks) {
      context.textAlign = 'center';
      context.font = 'bold 11px ui-monospace, Menlo, Consolas, monospace';
      for (const [index, direction] of overlays.marks) {
        if (index < first || index > last) continue;
        context.fillStyle = direction === 1 ? '#3fb950' : '#f85149';
        context.fillText('S', x(index), direction === 1 ? y(candles.l[index]) + 9 : y(candles.h[index]) - 9);
      }
      context.font = '10px ui-monospace, Menlo, Consolas, monospace';
    }

    // Cut line
    const cutX = Math.round(x(cut) + half) + 0.5;
    context.strokeStyle = 'rgba(230,230,230,0.55)';
    context.setLineDash([4, 4]);
    context.beginPath();
    context.moveTo(cutX, TOP);
    context.lineTo(cutX, TOP + height);
    context.stroke();
    if (tipLine != null) {
      context.strokeStyle = 'rgba(255,255,255,0.75)';
      context.beginPath();
      context.moveTo(x(cut) - half, Math.round(y(tipLine)) + 0.5);
      context.lineTo(width, Math.round(y(tipLine)) + 0.5);
      context.stroke();
    }
    context.setLineDash([]);

    for (const point of points ?? []) {
      const index = indexAt(candles.t, point.t);
      if (index < 0 || index > n - 1 || point.t > candles.t[n - 1] + spacing) continue;
      context.fillStyle = point.color;
      context.beginPath();
      context.arc(x(index), y(point.p), 4, 0, Math.PI * 2);
      context.fill();
      context.textAlign = 'right';
      context.font = 'bold 11px ui-monospace, Menlo, Consolas, monospace';
      context.fillText(point.text, x(index) - 8, y(point.p));
      context.font = '10px ui-monospace, Menlo, Consolas, monospace';
    }

    // Linked position from the chart being hovered
    let hovered = -1;
    if (v.cross) hovered = clamp(Math.round(v.offset - (width - v.cross.x) / v.scale + 0.5), 0, n - 1);
    else if (hoverTime != null) hovered = indexAt(candles.t, hoverTime);
    if (hovered >= 0) {
      context.strokeStyle = 'rgba(200,205,215,0.45)';
      context.beginPath();
      context.moveTo(Math.round(x(hovered)) + 0.5, TOP);
      context.lineTo(Math.round(x(hovered)) + 0.5, TOP + height);
      if (v.cross && v.cross.y > TOP && v.cross.y < TOP + height) {
        context.moveTo(0, Math.round(v.cross.y) + 0.5);
        context.lineTo(width, Math.round(v.cross.y) + 0.5);
      }
      context.stroke();
    }
    context.restore();

    // Axes
    context.font = '10px ui-monospace, Menlo, Consolas, monospace';
    context.textBaseline = 'middle';
    context.fillStyle = AXIS_TEXT;
    context.textAlign = 'left';
    for (let price = Math.ceil(low / step) * step; price < high; price += step) {
      context.fillText(formatPrice(price), width + 6, y(price));
    }
    let previous = -100;
    for (const label of timeLabels) {
      if (label.at - previous < 44 || label.at > width - 16) continue;
      context.textAlign = 'center';
      context.fillText(label.text, label.at, v.height - AXIS_HEIGHT / 2);
      previous = label.at;
    }
    const tag = (price: number, fill: string, text: string) => {
      const at = clamp(y(price), TOP + 7, TOP + height - 7);
      context.fillStyle = fill;
      context.fillRect(width + 1, at - 7, AXIS_WIDTH - 2, 14);
      context.fillStyle = text;
      context.textAlign = 'left';
      context.fillText(formatPrice(price), width + 6, at);
    };
    tag(candles.c[n - 1], '#2a303a', '#e6e6e6');
    if (v.cross && v.cross.y > TOP && v.cross.y < TOP + height) {
      tag(Math.round(high - ((v.cross.y - TOP) / height) * (high - low)), '#4b5563', '#ffffff');
    }

    // Readout
    const shown = hovered >= 0 ? hovered : n - 1;
    context.textAlign = 'left';
    context.font = 'bold 12px system-ui, sans-serif';
    context.fillStyle = '#e6e6e6';
    context.fillText(title, 8, 10);
    const titleWidth = context.measureText(title).width;
    context.font = '10px ui-monospace, Menlo, Consolas, monospace';
    context.fillStyle = AXIS_TEXT;
    const values = v.width > 520
      ? `  O ${formatPrice(candles.o[shown])}  H ${formatPrice(candles.h[shown])}  L ${formatPrice(candles.l[shown])}  C ${formatPrice(candles.c[shown])}`
      : `  C ${formatPrice(candles.c[shown])}`;
    const state = candles.k[shown] >= 4 ? '  Build' : '';
    context.fillText(`${formatTime(candles.t[shown])}${values}${state}${forming && shown === cut ? '  (đang hình thành)' : ''}`, 16 + titleWidth, 10);
  };

  const schedule = () => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(draw);
  };

  // Size, pointer and wheel handling live outside React state: only the canvas is repainted.
  useEffect(() => {
    const canvas = canvasRef.current!;
    const v = view.current;
    const observer = new ResizeObserver(() => {
      const fresh = v.width === 0;
      v.width = canvas.clientWidth;
      v.height = canvas.clientHeight;
      if (fresh) reset();
      limitOffset();
      schedule();
    });
    observer.observe(canvas);

    const pointers = new Map<number, { x: number; y: number }>();
    let drag: { x: number; offset: number; moved: boolean } | null = null;
    let pinch: { distance: number; scale: number } | null = null;
    const local = (event: PointerEvent | WheelEvent) => {
      const box = canvas.getBoundingClientRect();
      return { x: event.clientX - box.left, y: event.clientY - box.top };
    };
    const hover = (position: { x: number; y: number } | null) => {
      v.cross = position;
      const { candles, onHover } = latest.current;
      if (!position) return onHover(null);
      const index = clamp(Math.round(v.offset - (plotWidth() - position.x) / v.scale + 0.5), 0, candles.t.length - 1);
      onHover(candles.t[index]);
    };

    const down = (event: PointerEvent) => {
      canvas.setPointerCapture(event.pointerId);
      pointers.set(event.pointerId, local(event));
      if (pointers.size === 1) drag = { x: event.clientX, offset: v.offset, moved: false };
      if (pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        pinch = { distance: Math.hypot(a.x - b.x, a.y - b.y) || 1, scale: v.scale };
        drag = null;
      }
    };
    const move = (event: PointerEvent) => {
      const position = local(event);
      if (pointers.has(event.pointerId)) pointers.set(event.pointerId, position);
      if (pinch && pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        const target = clamp((pinch.scale * Math.hypot(a.x - b.x, a.y - b.y)) / pinch.distance, MIN_SCALE, MAX_SCALE);
        zoom(target / v.scale, (a.x + b.x) / 2);
      } else if (drag && pointers.size === 1) {
        const shift = event.clientX - drag.x;
        if (Math.abs(shift) > 3) drag.moved = true;
        if (drag.moved) {
          v.offset = drag.offset - shift / v.scale;
          limitOffset();
        }
        if (event.pointerType === 'mouse') hover(position);
      } else if (event.pointerType === 'mouse') hover(position);
      schedule();
    };
    const up = (event: PointerEvent) => {
      // A cancelled touch means the browser took the gesture to scroll the page: not a tap.
      const tapped = drag && !drag.moved && event.pointerType !== 'mouse' && event.type === 'pointerup';
      pointers.delete(event.pointerId);
      if (pointers.size < 2) pinch = null;
      if (pointers.size === 0) drag = null;
      // A tap on a touch screen places (or clears) the crosshair.
      if (tapped) hover(v.cross ? null : local(event));
      schedule();
    };
    const leave = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || pointers.size) return;
      hover(null);
      schedule();
    };
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
        zoom(event.deltaY < 0 ? 1.15 : 1 / 1.15, local(event).x);
      } else if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        event.preventDefault();
        v.offset += event.deltaX / v.scale;
        limitOffset();
      } else return;
      schedule();
    };
    const again = () => {
      reset();
      schedule();
    };
    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);
    canvas.addEventListener('pointerleave', leave);
    canvas.addEventListener('wheel', wheel, { passive: false });
    canvas.addEventListener('dblclick', again);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame.current);
      canvas.removeEventListener('pointerdown', down);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', up);
      canvas.removeEventListener('pointercancel', up);
      canvas.removeEventListener('pointerleave', leave);
      canvas.removeEventListener('wheel', wheel);
      canvas.removeEventListener('dblclick', again);
    };
  }, []);

  // Keep the view sensible when candles are added (reveal, replay) or removed (hide again).
  const count = props.candles.t.length;
  useEffect(() => {
    const v = view.current;
    const before = v.count;
    v.count = count;
    if (v.width === 0 || before === 0 || before === count) return;
    const visible = plotWidth() / v.scale;
    if (count < before) v.offset = count - 1 + 4;
    else if (count - before <= 2) {
      if (v.offset >= before - 1) v.offset += count - before;
    } else v.offset = Math.min(count - 1 + 4, props.cut + visible * 0.7);
    limitOffset();
  }, [count]);

  useEffect(schedule);

  const button = (label: string, name: string, act: () => void) => (
    <button type="button" className="chart-btn" aria-label={name} title={name} onClick={() => { act(); schedule(); }}>
      {label}
    </button>
  );

  return (
    <div className="case-chart">
      <canvas ref={canvasRef} />
      <div className="chart-tools">
        {button('−', 'Thu nhỏ', () => zoom(1 / 1.3, plotWidth()))}
        {button('+', 'Phóng to', () => zoom(1.3, plotWidth()))}
        {button('⟲', 'Về mặc định', reset)}
      </div>
    </div>
  );
}
