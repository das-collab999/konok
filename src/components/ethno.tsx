/**
 * Кыргызская графика сайта.
 *
 * Узоры не нарисованы линией «от руки», а построены так же, как их режут
 * из войлока: каждый завиток — заливная фигура, широкая у основания и
 * сходящая на остриё. Из этих завитков собираются кочкор мүйүз, розетка
 * ала-кийиза, кайма ковра и сам шырдак.
 */

/* ────────────────────────────── из чего строится узор */

type HornOpts = {
  cx?: number; cy?: number;
  r0?: number;      // откуда начинается завиток
  rEnd?: number;    // куда закручивается остриё
  th0?: number;     // начальный угол, градусы
  th1?: number;     // конечный угол
  w0?: number;      // ширина у основания
  taper?: number;   // насколько резко сходит на нет
  n?: number;       // точность
};

/** Рог: спираль, сужающаяся к острию. */
function horn({ cx = 0, cy = 0, r0 = 60, rEnd = 7, th0 = -90, th1 = 250, w0 = 20, taper = 0.8, n = 56 }: HornOpts) {
  const rad = (d: number) => (d * Math.PI) / 180;
  const pts: [number, number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const R = r0 * Math.pow(rEnd / r0, t);
    const th = rad(th0 + (th1 - th0) * t);
    pts.push([cx + R * Math.cos(th), cy + R * Math.sin(th), w0 * Math.pow(1 - t, taper)]);
  }
  const left: string[] = [];
  const right: string[] = [];
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i];
    const q = pts[Math.min(i + 1, pts.length - 1)];
    const o = pts[Math.max(i - 1, 0)];
    let dx = q[0] - o[0];
    let dy = q[1] - o[1];
    const len = Math.hypot(dx, dy) || 1;
    dx /= len; dy /= len;
    const h = p[2] / 2;
    left.push(`${(p[0] - dy * h).toFixed(1)},${(p[1] + dx * h).toFixed(1)}`);
    right.push(`${(p[0] + dy * h).toFixed(1)},${(p[1] - dx * h).toFixed(1)}`);
  }
  return `M${left.join(" L")} L${right.reverse().join(" L")} Z`;
}

/** Остроконечный лист между завитками. */
function leaf({ cx = 0, cy = 0, len = 46, w = 16, angle = -90, bend = 0.3 }: { cx?: number; cy?: number; len?: number; w?: number; angle?: number; bend?: number }) {
  const a = (angle * Math.PI) / 180;
  const ux = Math.cos(a);
  const uy = Math.sin(a);
  const nx = -uy;
  const ny = ux;
  const f = (v: number) => v.toFixed(1);
  return [
    `M${f(cx)},${f(cy)}`,
    `C${f(cx + ux * len * 0.35 + nx * w)},${f(cy + uy * len * 0.35 + ny * w)}`,
    `${f(cx + ux * len * 0.8 + nx * w * bend)},${f(cy + uy * len * 0.8 + ny * w * bend)}`,
    `${f(cx + ux * len)},${f(cy + uy * len)}`,
    `C${f(cx + ux * len * 0.8 - nx * w * bend)},${f(cy + uy * len * 0.8 - ny * w * bend)}`,
    `${f(cx + ux * len * 0.35 - nx * w)},${f(cy + uy * len * 0.35 - ny * w)}`,
    `${f(cx)},${f(cy)} Z`,
  ].join(" ");
}

type Part = { d: string; x?: number; y?: number; rot?: number; flip?: boolean };

function Parts({ parts }: { parts: Part[] }) {
  return (
    <>
      {parts.map((p, i) => (
        <g key={i} transform={`translate(${p.x ?? 0},${p.y ?? 0}) rotate(${p.rot ?? 0})${p.flip ? " scale(-1,1)" : ""}`}>
          <path d={p.d} />
        </g>
      ))}
    </>
  );
}

/* ────────────────────────────── сами узоры */

export type MotifName = "kochkor" | "bugu" | "itkuyruk" | "kyial" | "gul" | "tumar";

const kochkorHorn = horn({ r0: 58, rEnd: 6, th0: -95, th1: 205, w0: 20 });
const buguHorn = horn({ r0: 64, rEnd: 5, th0: -100, th1: 240, w0: 17, taper: 0.9 });
const buguBranch = horn({ r0: 28, rEnd: 4, th0: -70, th1: 210, w0: 10 });
const chainHook = horn({ r0: 34, rEnd: 5, th0: -150, th1: 160, w0: 14 });
const kyialBig = horn({ r0: 60, rEnd: 5, th0: -120, th1: 230, w0: 20, taper: 0.9 });
const kyialTop = horn({ r0: 34, rEnd: 4, th0: -60, th1: 230, w0: 12 });

export const MOTIFS: Record<MotifName, { label: string; meaning: string; view: string; parts: Part[] }> = {
  kochkor: {
    label: "Кочкор мүйүз",
    meaning: "Рога барана — достаток и сила. Самый частый узор на шырдаке.",
    view: "-92 -72 184 150",
    parts: [
      { d: kochkorHorn, x: -34, y: 6 },
      { d: kochkorHorn, x: 34, y: 6, flip: true },
      { d: leaf({ cx: 0, cy: 18, len: 72, w: 16 }) },
    ],
  },
  bugu: {
    label: "Бугу мүйүз",
    meaning: "Рога оленя — долгая жизнь и связь с горами.",
    view: "-98 -100 196 190",
    parts: [
      { d: buguHorn, x: -26, y: 12 },
      { d: buguHorn, x: 26, y: 12, flip: true },
      { d: buguBranch, x: -56, y: -20 },
      { d: buguBranch, x: 56, y: -20, flip: true },
      { d: leaf({ cx: 0, cy: 28, len: 84, w: 14 }) },
    ],
  },
  itkuyruk: {
    label: "Ит куйрук",
    meaning: "Собачий хвост — оберег стада и дома, бежит по краю ковра.",
    view: "-105 -52 210 110",
    parts: [
      { d: chainHook, x: -64, y: 6 },
      { d: chainHook, x: 0, y: 6 },
      { d: chainHook, x: 64, y: 6 },
      { d: leaf({ cx: -32, cy: 12, len: 30, w: 9 }) },
      { d: leaf({ cx: 32, cy: 12, len: 30, w: 9 }) },
    ],
  },
  kyial: {
    label: "Кыял",
    meaning: "Свободный завиток — мечта мастерицы, в двух коврах не повторяется.",
    view: "-100 -90 200 180",
    parts: [
      { d: kyialBig, x: -28, y: 4 },
      { d: kyialBig, x: 28, y: 4, flip: true },
      { d: leaf({ cx: 0, cy: 28, len: 58, w: 14 }) },
      { d: kyialTop, x: 0, y: -54 },
    ],
  },
  gul: {
    label: "Гүл",
    meaning: "Цветок джайлоо — короткое горное лето.",
    view: "-86 -86 172 172",
    parts: [
      { d: leaf({ len: 60, w: 26, bend: 0.75, angle: -90 }) },
      { d: leaf({ len: 60, w: 26, bend: 0.75, angle: 0 }) },
      { d: leaf({ len: 60, w: 26, bend: 0.75, angle: 90 }) },
      { d: leaf({ len: 60, w: 26, bend: 0.75, angle: 180 }) },
      { d: leaf({ len: 40, w: 15, bend: 0.7, angle: -45 }) },
      { d: leaf({ len: 40, w: 15, bend: 0.7, angle: 45 }) },
      { d: leaf({ len: 40, w: 15, bend: 0.7, angle: 135 }) },
      { d: leaf({ len: 40, w: 15, bend: 0.7, angle: -135 }) },
      { d: "M0 -11 A11 11 0 1 1 0 11 A11 11 0 1 1 0 -11 Z" },
    ],
  },
  tumar: {
    label: "Тумарча",
    meaning: "Треугольный оберег — его зашивают в одежду детям.",
    view: "-86 -78 172 150",
    parts: [
      { d: "M0 -66 L64 56 H-64 Z M0 -28 L34 36 H-34 Z" },
      { d: leaf({ cx: 0, cy: 10, len: 30, w: 10 }) },
    ],
  },
};

/** Один узор. Цвет берётся из текста. */
export function Motif({ name, size = 72, className = "" }: { name: MotifName; size?: number; className?: string }) {
  const m = MOTIFS[name];
  const [, , vw, vh] = m.view.split(" ").map(Number);
  return (
    <svg viewBox={m.view} width={size} height={(size * vh) / vw} className={className} fill="currentColor" fillRule="evenodd" aria-hidden="true">
      <Parts parts={m.parts} />
    </svg>
  );
}

/* ────────────────────────────── розетка ала-кийиза */

const MED_CENTER: Part[] = [
  { d: leaf({ cx: 0, cy: -10, len: 86, w: 22 }) },
  { d: horn({ r0: 78, rEnd: 6, th0: -110, th1: 160, w0: 24 }), x: 26, y: 2 },
  { d: leaf({ cx: 0, cy: 0, len: 40, w: 12, angle: -45 }), x: 58, y: 58 },
];

const MED_CORNER: Part[] = [
  { d: horn({ r0: 46, rEnd: 5, th0: -80, th1: 215, w0: 17 }) },
  { d: horn({ r0: 24, rEnd: 3.4, th0: -60, th1: 230, w0: 10 }), x: 34, y: 24 },
];

/**
 * Розетка ала-кийиза: четверть узора отражается четыре раза,
 * поэтому симметрия настоящая — так и режут войлок.
 */
export function Medallion({ id, size = 320, color = "currentColor", className = "" }: { id: string; size?: number; color?: string; className?: string }) {
  const q = `${id}-q`;
  return (
    <svg viewBox="-170 -170 340 340" width={size} height={size} className={className} fill={color} aria-hidden="true">
      <defs>
        <g id={q}>
          <Parts parts={MED_CENTER} />
          <g transform="translate(78,-78) rotate(-45)">
            <Parts parts={MED_CORNER} />
          </g>
        </g>
      </defs>
      <use href={`#${q}`} />
      <use href={`#${q}`} transform="scale(-1,1)" />
      <use href={`#${q}`} transform="scale(1,-1)" />
      <use href={`#${q}`} transform="scale(-1,-1)" />
    </svg>
  );
}

/* ────────────────────────────── каймы и ковёр */

/** Полоса «зубчики» — внешняя кайма ковра. */
export function ZigzagBand({ id, height = 22, color = "#EDE2C8", bg = "#8E2420", flip = false, className = "" }: { id: string; height?: number; color?: string; bg?: string; flip?: boolean; className?: string }) {
  const w = height * 1.15;
  return (
    <svg width="100%" height={height} className={className} aria-hidden="true" style={{ display: "block", transform: flip ? "scaleY(-1)" : undefined }}>
      <defs>
        <pattern id={id} width={w} height={height} patternUnits="userSpaceOnUse">
          <rect width={w} height={height} fill={bg} />
          <path d={`M0 ${height} L${w / 2} 2 L${w} ${height} Z`} fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height={height} fill={`url(#${id})`} />
    </svg>
  );
}

const BAND_HORN = horn({ r0: 42, rEnd: 5, th0: -95, th1: 205, w0: 15 });

/** Лента кочкор мүйүз: бежит по краю раздела, как кайма ковра. */
export function OrnamentBand({ id, color = "currentColor", height = 34, className = "", opacity = 1 }: { id: string; color?: string; height?: number; className?: string; opacity?: number }) {
  const cellH = 150;
  const cellW = 210;
  const k = height / cellH;
  return (
    <svg width="100%" height={height} className={className} aria-hidden="true" style={{ display: "block" }}>
      <defs>
        <pattern id={id} width={cellW * k} height={height} patternUnits="userSpaceOnUse">
          <g transform={`scale(${k}) translate(105,98)`} fill={color} opacity={opacity}>
            <g transform="translate(-26,0)"><path d={BAND_HORN} /></g>
            <g transform="translate(26,0) scale(-1,1)"><path d={BAND_HORN} /></g>
            <path d={leaf({ cx: 0, cy: 10, len: 52, w: 11 })} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height={height} fill={`url(#${id})`} />
    </svg>
  );
}

/** Строчка по войлоку — мягкий пунктирный разделитель. */
export function Stitch({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg width="100%" height="2" className={className} aria-hidden="true" style={{ display: "block" }}>
      <line x1="0" y1="1" x2="100%" y2="1" stroke={color} strokeWidth="1.6" strokeDasharray="7 8" strokeLinecap="round" opacity="0.65" />
    </svg>
  );
}

/** Уголок ковра. */
export function CornerCurl({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="-6 -6 100 100" fill="currentColor" className={className} aria-hidden="true">
      <g transform="translate(14,14) rotate(-45)">
        <path d={horn({ r0: 38, rEnd: 5, th0: -80, th1: 215, w0: 14 })} />
      </g>
    </svg>
  );
}

const SHYRDAK_QUADRANT: Part[] = [
  { d: leaf({ cx: 0, cy: -6, len: 46, w: 13 }) },
  { d: horn({ r0: 40, rEnd: 4, th0: -110, th1: 170, w0: 14 }), x: 14, y: 2 },
  { d: horn({ r0: 20, rEnd: 3, th0: -70, th1: 220, w0: 8 }), x: 46, y: -46, rot: -45 },
];

/**
 * Шырдак — войлочная дорожка: кайма-зубчики, поле, ромбы с розеткой.
 * Ставится вертикально рядом с заголовком страницы.
 */
export function Shyrdak({
  id,
  className = "",
  base = "#8E2420",
  field = "#2B4664",
  motif = "#EDE2C8",
  frame = "#C08A2E",
  rows = 4,
}: { id: string; className?: string; base?: string; field?: string; motif?: string; frame?: string; rows?: number }) {
  const w = 300;
  const step = 160;
  const h = 120 + rows * step;
  const q = `${id}-q`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <defs>
        <pattern id={`${id}-zig`} width="26" height="26" patternUnits="userSpaceOnUse">
          <rect width="26" height="26" fill={base} />
          <path d="M0 26 L13 3 L26 26 Z" fill={motif} />
        </pattern>
        <g id={q} fill={motif}>
          <Parts parts={SHYRDAK_QUADRANT} />
        </g>
        <filter id={`${id}-felt`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>

      <rect width={w} height={h} fill={base} />
      <rect width={w} height="26" fill={`url(#${id}-zig)`} />
      <g transform={`translate(0 ${h}) scale(1 -1)`}><rect width={w} height="26" fill={`url(#${id}-zig)`} /></g>
      <rect x="28" y="36" width={w - 56} height={h - 72} fill={motif} />
      <rect x="40" y="48" width={w - 80} height={h - 96} fill={field} />

      {Array.from({ length: rows }).map((_, i) => {
        const cy = 110 + i * step;
        return (
          <g key={i}>
            <path d={`M150 ${cy - 68} L224 ${cy} L150 ${cy + 68} L76 ${cy} Z`} fill="none" stroke={frame} strokeWidth="4" />
            <g transform={`translate(150 ${cy})`}>
              <use href={`#${q}`} />
              <use href={`#${q}`} transform="scale(-1,1)" />
              <use href={`#${q}`} transform="scale(1,-1)" />
              <use href={`#${q}`} transform="scale(-1,-1)" />
            </g>
          </g>
        );
      })}

      <rect width={w} height={h} filter={`url(#${id}-felt)`} opacity="0.17" style={{ mixBlendMode: "multiply" }} />
    </svg>
  );
}
