/**
 * Кыргызская графика сайта.
 *
 * Узоры нарисованы кодом: ничего не весят и остаются чёткими на любом экране.
 * Названия — настоящие: так эти мотивы зовут мастерицы, которые валяют шырдак.
 */

export type MotifName = "kochkor" | "bugu" | "itkuyruk" | "kyial" | "gul" | "tumar";

export const MOTIFS: Record<MotifName, { label: string; meaning: string; d: string[] }> = {
  kochkor: {
    label: "Кочкор мүйүз",
    meaning: "Рога барана — достаток и сила. Самый частый узор на шырдаке.",
    d: [
      "M60 66 V34",
      "M60 34 C60 12 40 5 28 16 C17 26 26 44 38 37 C46 32 44 21 36 21",
      "M60 34 C60 12 80 5 92 16 C103 26 94 44 82 37 C74 32 76 21 84 21",
    ],
  },
  bugu: {
    label: "Бугу мүйүз",
    meaning: "Рога оленя — долгая жизнь и связь с горами.",
    d: [
      "M60 66 V26",
      "M60 48 C48 48 40 40 40 30 C40 24 46 22 50 26 C53 29 51 34 47 33",
      "M60 48 C72 48 80 40 80 30 C80 24 74 22 70 26 C67 29 69 34 73 33",
      "M60 30 C52 30 46 24 46 16 C46 11 51 9 55 13",
      "M60 30 C68 30 74 24 74 16 C74 11 69 9 65 13",
    ],
  },
  itkuyruk: {
    label: "Ит куйрук",
    meaning: "Собачий хвост — оберег стада и дома, бежит по краю ковра.",
    d: ["M10 50 C10 28 30 24 36 38 C40 48 28 54 24 46 M36 38 C42 22 62 18 68 34 C72 46 60 52 56 44 M68 34 C74 18 94 14 100 30 C104 42 92 48 88 40"],
  },
  kyial: {
    label: "Кыял",
    meaning: "Свободный завиток — мечта мастерицы, в двух коврах не повторяется.",
    d: [
      "M60 64 V40",
      "M60 40 C44 40 32 30 30 14 M60 40 C60 24 54 12 42 4 M60 40 C76 40 88 30 90 14 M60 40 C60 24 66 12 78 4",
      "M30 14 C26 20 28 26 34 26 M90 14 C94 20 92 26 86 26 M42 4 C36 6 34 12 38 16 M78 4 C84 6 86 12 82 16",
    ],
  },
  gul: {
    label: "Гүл",
    meaning: "Цветок джайлоо — короткое горное лето.",
    d: [
      "M60 14 V56",
      "M44 56 H76",
      "M60 24 C48 24 40 18 38 8 C44 10 50 10 54 14",
      "M60 24 C72 24 80 18 82 8 C76 10 70 10 66 14",
      "M60 44 C50 44 44 50 42 60 C48 58 54 56 58 52",
      "M60 44 C70 44 76 50 78 60 C72 58 66 56 62 52",
    ],
  },
  tumar: {
    label: "Тумарча",
    meaning: "Треугольный оберег — его зашивают в одежду детям.",
    d: ["M60 8 L100 62 H20 Z", "M60 26 L82 56 H38 Z"],
  },
};

/** Один узор. Цвет берётся из текста, размер — в пикселях по ширине. */
export function Motif({ name, size = 56, className = "", strokeWidth = 3 }: { name: MotifName; size?: number; className?: string; strokeWidth?: number }) {
  const m = MOTIFS[name];
  return (
    <svg viewBox="0 0 120 70" width={size} height={(size * 70) / 120} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {m.d.map((d, i) => <path key={i} d={d} pathLength={1} />)}
    </svg>
  );
}

/** Полоса орнамента вместо обычной линии-разделителя. */
export function OrnamentBand({
  id,
  color = "currentColor",
  height = 26,
  className = "",
  opacity = 1,
}: { id: string; color?: string; height?: number; className?: string; opacity?: number }) {
  const k = height / 70;
  return (
    <svg width="100%" height={height} className={className} aria-hidden="true" style={{ display: "block" }}>
      <defs>
        <pattern id={id} width={120 * k} height={height} patternUnits="userSpaceOnUse">
          <g transform={`scale(${k})`} fill="none" stroke={color} strokeWidth={3.4} strokeLinecap="round" opacity={opacity}>
            <path d="M60 70 V34" />
            <path d="M60 34 C60 12 40 5 28 16 C17 26 26 44 38 37 C46 32 44 21 36 21" />
            <path d="M60 34 C60 12 80 5 92 16 C103 26 94 44 82 37 C74 32 76 21 84 21" />
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

/** Уголок ковра — ставится в угол карточки или блока. */
export function CornerCurl({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className} aria-hidden="true">
      <path d="M4 34 C22 34 34 22 34 4" />
      <path d="M4 20 C13 20 20 13 20 4" />
      <circle cx="9" cy="9" r="2.2" />
    </svg>
  );
}

/**
 * Медальон ала-кийиза: одна четверть узора, отражённая четыре раза.
 * Симметрия настоящая, как у мастериц, — поэтому и выглядит как ковёр.
 */
export function Medallion({
  id,
  size = 320,
  color = "currentColor",
  className = "",
  strokeWidth = 9,
}: { id: string; size?: number; color?: string; className?: string; strokeWidth?: number }) {
  const q = `${id}-q`;
  return (
    <svg viewBox="-115 -115 230 230" width={size} height={size} className={className} aria-hidden="true">
      <defs>
        <g id={q} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
          <path d="M0 -14 C0 -40 14 -58 34 -62 C52 -66 64 -54 60 -40 C56 -28 42 -26 38 -36 C35 -44 44 -50 50 -44" pathLength={1} />
          <path d="M8 -20 C22 -34 44 -36 58 -26 C70 -17 68 -2 56 2 C46 5 38 -4 44 -12" pathLength={1} />
          <path d="M0 -14 C0 -6 6 0 14 0 C24 0 30 8 30 18 C30 30 20 36 12 32" pathLength={1} />
          <path d="M76 -72 C90 -76 100 -68 98 -58 C96 -49 86 -46 82 -54" strokeWidth={strokeWidth - 1} pathLength={1} />
        </g>
      </defs>
      <use href={`#${q}`} />
      <use href={`#${q}`} transform="scale(-1,1)" />
      <use href={`#${q}`} transform="scale(1,-1)" />
      <use href={`#${q}`} transform="scale(-1,-1)" />
      <circle r={strokeWidth} fill={color} />
    </svg>
  );
}

/** Полоса «зубчики» — кайма ковра. */
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

/**
 * Шырдак — войлочная дорожка: кайма-зубчики, поле, ромбы с узором.
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
  const step = 150;
  const h = 120 + rows * step;
  const q = `${id}-dq`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <defs>
        <pattern id={`${id}-zig`} width="26" height="26" patternUnits="userSpaceOnUse">
          <rect width="26" height="26" fill={base} />
          <path d="M0 26 L13 3 L26 26 Z" fill={motif} />
        </pattern>
        <g id={q} fill="none" stroke={motif} strokeWidth="7" strokeLinecap="round">
          <path d="M0 -12 C0 -34 13 -48 30 -50 C43 -52 51 -41 47 -31 C44 -24 33 -23 31 -30" />
          <path d="M0 -12 C0 -3 7 4 16 6" />
          <path d="M34 -56 C44 -59 51 -53 49 -46 C47 -40 40 -38 37 -44" strokeWidth="5.5" />
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
        const cy = 100 + i * step;
        return (
          <g key={i}>
            <path d={`M150 ${cy - 62} L222 ${cy} L150 ${cy + 62} L78 ${cy} Z`} fill="none" stroke={frame} strokeWidth="4" />
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
