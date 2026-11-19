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
      {m.d.map((d, i) => <path key={i} d={d} />)}
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
 * Шырдак — кусок войлочного ковра: цветное поле, рамка, узор и фактура войлока.
 * Используется как декоративная колонка рядом с заголовком.
 */
export function Shyrdak({
  id,
  className = "",
  base = "#8E2420",
  motif = "#E7D3AE",
  frame = "#C08A2E",
}: { id: string; className?: string; base?: string; motif?: string; frame?: string }) {
  return (
    <svg viewBox="0 0 120 600" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <defs>
        <pattern id={`${id}-p`} width="120" height="160" patternUnits="userSpaceOnUse">
          <rect width="120" height="160" fill={base} />
          <g fill="none" stroke={motif} strokeWidth="3.6" strokeLinecap="round" transform="translate(0 40)">
            <path d="M60 70 V34" />
            <path d="M60 34 C60 12 40 5 28 16 C17 26 26 44 38 37 C46 32 44 21 36 21" />
            <path d="M60 34 C60 12 80 5 92 16 C103 26 94 44 82 37 C74 32 76 21 84 21" />
          </g>
          <circle cx="60" cy="140" r="4.5" fill={frame} />
        </pattern>
        <filter id={`${id}-felt`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.92" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>
      <rect width="120" height="600" fill={`url(#${id}-p)`} />
      <rect x="6" y="6" width="108" height="588" fill="none" stroke={frame} strokeWidth="4" />
      <rect x="15" y="15" width="90" height="570" fill="none" stroke={motif} strokeWidth="1.4" strokeDasharray="8 8" opacity="0.7" />
      <rect width="120" height="600" filter={`url(#${id}-felt)`} opacity="0.16" style={{ mixBlendMode: "multiply" }} />
    </svg>
  );
}
