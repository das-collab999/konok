import type { L } from "@/lib/i18n";

/**
 * Кыргызская графика сайта.
 *
 * Узоры не нарисованы линией «от руки», а построены так же, как их режут
 * из войлока: каждый завиток — заливная фигура, широкая у основания и
 * сходящая на остриё. Из этих завитков собираются кочкор мүйүз, розетка
 * ала-кийиза, кайма ковра и сам шырдак.
 */

/* ────────────────────────────── из чего строится узор */

type CurlOpts = {
  cx?: number; cy?: number;
  r0?: number;      // откуда начинается завиток
  rEnd?: number;    // радиус глазка на конце
  th0?: number;     // начальный угол, градусы
  th1?: number;     // конечный угол: 330–340 даёт полный оборот с глазком
  w0?: number;      // ширина у основания
  wEnd?: number;    // доля ширины у кончика (кончик скруглён, не игла)
  power?: number;   // как долго завиток держит толщину
  n?: number;
};

/**
 * Завиток: толстый почти до конца, закручивается в тугой глазок
 * и заканчивается скруглённым кончиком — как вырезанный из войлока.
 */
function curl({ cx = 0, cy = 0, r0 = 56, rEnd = 7, th0 = -90, th1 = 335, w0 = 22, wEnd = 0.3, power = 2, n = 72 }: CurlOpts) {
  const rad = (d: number) => (d * Math.PI) / 180;
  const we = w0 * wEnd;
  const pts: [number, number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const R = r0 * Math.pow(rEnd / r0, t);
    const th = rad(th0 + (th1 - th0) * t);
    pts.push([cx + R * Math.cos(th), cy + R * Math.sin(th), we + (w0 - we) * (1 - Math.pow(t, power))]);
  }
  const left: string[] = [];
  const right: [number, number][] = [];
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
    right.push([p[0] + dy * h, p[1] - dx * h]);
  }
  const tip = (we / 2).toFixed(1);
  const lastRight = right[right.length - 1];
  const back = right.slice(0, -1).reverse().map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" L");
  return `M${left.join(" L")} A${tip},${tip} 0 0 1 ${lastRight[0].toFixed(1)},${lastRight[1].toFixed(1)} L${back} Z`;
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

const curlBig = curl({ r0: 56, rEnd: 7, th0: -90, th1: 335, w0: 22 });
const curlMid = curl({ r0: 40, rEnd: 5.5, th0: -90, th1: 330, w0: 16 });

export const MOTIFS: Record<MotifName, { label: string; meaning: L; view: string; parts: Part[] }> = {
  kochkor: {
    label: "Кочкор мүйүз",
    meaning: { ru: "Рога барана — достаток и сила. Самый частый узор на шырдаке.", en: "Ram's horns — plenty and strength. The commonest pattern on a shyrdak.", zh: "公羊角——富足与力量，什尔达克上最常见的纹样。" },
    view: "-120 -96 240 180",
    parts: [
      { d: curlBig, x: -44, y: 8, rot: -135 },
      { d: curlBig, x: 44, y: 8, rot: -135, flip: true },
      { d: leaf({ cx: 0, cy: 30, len: 84, w: 18 }) },
    ],
  },
  bugu: {
    label: "Бугу мүйүз",
    meaning: { ru: "Рога оленя — долгая жизнь и связь с горами.", en: "Deer antlers — long life and a bond with the mountains.", zh: "鹿角——长寿，与群山的联结。" },
    view: "-128 -140 256 230",
    parts: [
      { d: curlBig, x: -46, y: 22, rot: -135 },
      { d: curlBig, x: 46, y: 22, rot: -135, flip: true },
      { d: curlMid, x: -40, y: -54, rot: -150 },
      { d: curlMid, x: 40, y: -54, rot: -150, flip: true },
      { d: leaf({ cx: 0, cy: 44, len: 104, w: 18 }) },
    ],
  },
  itkuyruk: {
    label: "Ит куйрук",
    meaning: { ru: "Собачий хвост — оберег стада и дома, бежит по краю ковра.", en: "Dog's tail — a guard for the herd and the home, it runs along the rug's edge.", zh: "狗尾——守护畜群与家宅，沿毡毯边缘延展。" },
    view: "-160 -86 320 150",
    parts: [
      { d: "M-138 36 H138 V48 H-138 Z" },
      { d: curlMid, x: -102, y: 36, rot: -140 },
      { d: curlMid, x: -34, y: 36, rot: -140 },
      { d: curlMid, x: 34, y: 36, rot: -140 },
      { d: curlMid, x: 102, y: 36, rot: -140 },
    ],
  },
  kyial: {
    label: "Кыял",
    meaning: { ru: "Свободный завиток — мечта мастерицы, в двух коврах не повторяется.", en: "A free curl — the craftswoman's imagination; it never repeats in two rugs.", zh: "自由卷纹——工匠的想象，两张毯子绝不重样。" },
    view: "-118 -112 236 210",
    parts: [
      { d: curlBig, x: -30, y: 30, rot: -25 },
      { d: curlMid, x: 48, y: -28, rot: 150 },
      { d: leaf({ cx: -4, cy: 48, len: 64, w: 16, angle: -100 }) },
    ],
  },
  gul: {
    label: "Гүл",
    meaning: { ru: "Цветок джайлоо — короткое горное лето.", en: "A pasture flower — the short mountain summer.", zh: "牧场之花——短暂的高山夏天。" },
    view: "-116 -116 232 232",
    parts: [
      { d: curlMid, y: -40, rot: 0 },
      { d: curlMid, x: 40, rot: 90 },
      { d: curlMid, y: 40, rot: 180 },
      { d: curlMid, x: -40, rot: 270 },
      { d: "M0 -14 A14 14 0 1 1 0 14 A14 14 0 1 1 0 -14 Z" },
    ],
  },
  tumar: {
    label: "Тумарча",
    meaning: { ru: "Треугольный оберег — его зашивают в одежду детям.", en: "A triangular amulet — sewn into children's clothes.", zh: "三角护符——缝在孩子的衣服里。" },
    view: "-106 -104 212 186",
    parts: [
      { d: "M0 -88 L76 52 H-76 Z M0 -44 L40 28 H-44 Z" },
      { d: leaf({ cx: 0, cy: 2, len: 34, w: 11 }) },
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

const MED_QUADRANT: Part[] = [
  { d: leaf({ cx: 0, cy: -6, len: 84, w: 24 }) },
  { d: curlBig, x: 50, y: 26, rot: -120 },
  { d: curlMid, x: 92, y: -92, rot: -135 },
];

/**
 * Розетка ала-кийиза: четверть узора отражается четыре раза,
 * поэтому симметрия настоящая — так и режут войлок.
 */
export function Medallion({ id, size = 320, color = "currentColor", className = "" }: { id: string; size?: number; color?: string; className?: string }) {
  const q = `${id}-q`;
  return (
    <svg viewBox="-190 -190 380 380" width={size} height={size} className={className} fill={color} aria-hidden="true">
      <defs>
        <g id={q}>
          <Parts parts={MED_QUADRANT} />
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

const BAND_CURL = curl({ r0: 40, rEnd: 5.5, th0: -90, th1: 330, w0: 16 });

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
            <g transform="translate(-34,0) rotate(-135)"><path d={BAND_CURL} /></g>
            <g transform="translate(34,0) rotate(-135) scale(-1,1)"><path d={BAND_CURL} /></g>
            <path d={leaf({ cx: 0, cy: 18, len: 60, w: 14 })} />
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
      <g transform="translate(26,26) rotate(-135)">
        <path d={curl({ r0: 30, rEnd: 4.5, th0: -90, th1: 330, w0: 13 })} />
      </g>
    </svg>
  );
}

const SHYRDAK_QUADRANT: Part[] = [
  { d: leaf({ cx: 0, cy: -4, len: 50, w: 15 }) },
  { d: curl({ r0: 30, rEnd: 4.5, th0: -90, th1: 330, w0: 13 }), x: 30, y: 16, rot: -120 },
  { d: curl({ r0: 18, rEnd: 3, th0: -90, th1: 320, w0: 8 }), x: 56, y: -56, rot: -135 },
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

/* ────────────────────────────── терме боо: тканая лента */

/**
 * Терме боо — узкая тканая лента, которой перевязывают остов юрты.
 * Геометрия строгая: ромбы, треугольники и ступеньки рядами.
 */
export function TermeBand({
  id,
  height = 30,
  bg = "#8E2420",
  a = "#EDE2C8",
  b = "#C08A2E",
  className = "",
}: { id: string; height?: number; bg?: string; a?: string; b?: string; className?: string }) {
  const cell = 60;
  const k = height / 60;
  return (
    <svg width="100%" height={height} className={className} aria-hidden="true" style={{ display: "block" }}>
      <defs>
        <pattern id={id} width={cell * k} height={height} patternUnits="userSpaceOnUse">
          <g transform={`scale(${k})`}>
            <rect width={cell} height="60" fill={bg} />
            {/* верхняя и нижняя кромка — ступеньки */}
            <path d="M0 0 h60 v6 h-60 z M0 54 h60 v6 h-60 z" fill={b} opacity="0.85" />
            {/* ряд ромбов */}
            <path d="M30 10 L50 30 L30 50 L10 30 Z" fill={a} />
            <path d="M30 18 L42 30 L30 42 L18 30 Z" fill={bg} />
            <path d="M30 24 L36 30 L30 36 L24 30 Z" fill={b} />
            {/* треугольники по краям ячейки */}
            <path d="M0 30 L10 20 L10 40 Z M60 30 L50 20 L50 40 Z" fill={a} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height={height} fill={`url(#${id})`} />
    </svg>
  );
}

/**
 * Ала-кийиз — вваленный войлочный ковёр: поле из треугольников,
 * в каждом свой завиток. Служит фоном крупных блоков.
 */
export function AlaKiyiz({
  id,
  className = "",
  bg = "#8E2420",
  cream = "#EDE2C8",
  dark = "#2B4664",
}: { id: string; className?: string; bg?: string; cream?: string; dark?: string }) {
  const curlSmall = curl({ r0: 26, rEnd: 4, th0: -90, th1: 320, w0: 11 });
  return (
    <svg viewBox="0 0 240 240" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <defs>
        <pattern id={`${id}-p`} width="240" height="240" patternUnits="userSpaceOnUse">
          <rect width="240" height="240" fill={bg} />
          {/* сетка треугольников */}
          <path d="M0 0 L120 0 L60 120 Z" fill={cream} />
          <path d="M120 0 L240 0 L180 120 Z" fill={dark} />
          <path d="M60 120 L180 120 L120 240 Z" fill={cream} />
          <path d="M0 120 L60 120 L0 240 Z M180 120 L240 120 L240 240 Z" fill={dark} />
          {/* завитки внутри */}
          <g fill={bg}>
            <g transform="translate(60,36) rotate(-135) scale(0.8)"><path d={curlSmall} /></g>
            <g transform="translate(120,156) rotate(-135) scale(0.8)"><path d={curlSmall} /></g>
          </g>
          <g fill={cream}>
            <g transform="translate(180,36) rotate(-135) scale(0.8)"><path d={curlSmall} /></g>
          </g>
        </pattern>
        <filter id={`${id}-felt`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>
      <rect width="240" height="240" fill={`url(#${id}-p)`} />
      <rect width="240" height="240" filter={`url(#${id}-felt)`} opacity="0.2" style={{ mixBlendMode: "multiply" }} />
    </svg>
  );
}
