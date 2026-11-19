import type { Place } from "@/data/places";

// Line icons (24×24, stroke). Same paths as in the design mockup.
export const ICONS = {
  fire: "M12 3c2 3 5 5 5 9a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-8z",
  bath: "M7 4c-1 2 1 3 0 5M12 4c-1 2 1 3 0 5M17 4c-1 2 1 3 0 5M3 13h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z",
  signal: "M4 20v-3M9 20v-7M14 20v-11M19 20V4",
  nosignal: "M4 20v-3M9 20v-7M14 20v-4M3 4l18 16",
  car: "M3 15h18v3H3zM6 15l2-5h8l2 5M7 18v2M17 18v2",
  jeep: "M3 14h18v4H3zM5 14l1-5h12l1 5M7 18a2 2 0 1 0 0 .01M17 18a2 2 0 1 0 0 .01M9 9V6h6v3",
  toilet: "M6 3h12v7H6zM8 10v4a4 4 0 0 0 8 0v-4M10 21h4M12 18v3",
  shower: "M4 20V8a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4M11 8h6M12 12v1M15 12v1M18 12v1M13 15v1M16 15v1",
  mount: "M3 20l6-10 4 6 3-4 5 8z",
  food: "M3 12h18a9 9 0 0 1-18 0zM12 4v4M8 6v2M16 6v2",
  horse: "M6 21v-6l-2-3 3-5 4-1 2-3 1 3 4 2 2 4-2 1-3-1-1 3v6M10 21v-5",
  wool: "M4 12c2-4 6-4 8 0s6 4 8 0M4 17c2-4 6-4 8 0s6 4 8 0M4 7c2-4 6-4 8 0s6 4 8 0",
  ball: "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M3 12h18M12 3c3 3 3 15 0 18",
  camera: "M4 8h4l2-3h4l2 3h4v11H4zM12 17a4 4 0 1 0 0-8a4 4 0 1 0 0 8",
  chat: "M4 5h16v11H9l-5 4z",
  coin: "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M9 9h4a2 2 0 0 1 0 4H9v-4zM9 13h5",
  book: "M4 5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2zM8 7h8M8 11h6",
  shield: "M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z M8 12l3 3 5-6",
  bed: "M3 18V8M3 14h18v4M21 18v-6a3 3 0 0 0-3-3h-7v5",
  check: "M5 12l4 4L19 6",
  back: "M15 5l-7 7 7 7",
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({ name, size = 20, className = "", strokeWidth = 1.8 }: { name: IconName; size?: number; className?: string; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d={ICONS[name]} />
    </svg>
  );
}

/** Logo: tunduk, the crown of the yurt (as on the flag). */
export function Tunduk({ size = 44, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden="true" className={className}>
      <circle cx="60" cy="60" r="56" fill="#8B1E1E" />
      <circle cx="60" cy="60" r="30" fill="none" stroke="#E9B949" strokeWidth="5" />
      <path d="M38 46 L82 74 M38 60 L82 60 M38 74 L82 46 M44 38 L76 82 M76 38 L44 82" stroke="#E9B949" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/** Ornament band "kochkor muyuz" (ram's horns). */
export function Ornament({ id, color = "#E9B949", bg = "#8B1E1E" }: { id: string; color?: string; bg?: string }) {
  return (
    <div style={{ background: bg, lineHeight: 0 }}>
      <svg width="100%" height="30" aria-hidden="true">
        <defs>
          <pattern id={id} width="60" height="30" patternUnits="userSpaceOnUse">
            <path d="M30 28 V16 M30 16 C30 5 17 3 15 11 C13 18 21 20 22 14 M30 16 C30 5 43 3 45 11 C47 18 39 20 38 14" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
          </pattern>
        </defs>
        <rect width="100%" height="30" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}

function Yurt({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 60 Q0 20 60 6 Q120 20 120 60Z" fill="#F3E9D7" />
      <rect x="0" y="58" width="120" height="50" fill="#EADCC2" />
      <path d="M0 72 H120" stroke="#8B1E1E" strokeWidth="5" />
      <rect x="48" y="74" width="24" height="34" fill="#8B1E1E" />
      <circle cx="60" cy="8" r="7" fill="#C8962E" />
    </g>
  );
}

function House({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 50 L80 0 L160 50Z" fill="#8B1E1E" />
      <rect x="12" y="48" width="136" height="70" fill="#F3E9D7" />
      <rect x="32" y="66" width="26" height="22" fill="#1F4E79" />
      <rect x="102" y="66" width="26" height="22" fill="#1F4E79" />
      <rect x="68" y="76" width="24" height="42" fill="#3B2A1E" />
    </g>
  );
}

/** Illustration used until real photos are uploaded. */
export function PlaceArt({ place, wide = false, className = "" }: { place: Place; wide?: boolean; className?: string }) {
  const { sky, mountains, hills } = place.palette;
  const label = (place.type === "yurt" ? "Рисунок: юрта в горах — " : "Рисунок: гостевой дом в горах — ") + place.place;
  if (wide) {
    return (
      <svg viewBox="0 0 1200 340" preserveAspectRatio="xMidYMid slice" className={className} role="img" aria-label={label}>
        <rect width="1200" height="340" fill={sky} />
        <circle cx="980" cy="80" r="36" fill="#F6D58E" opacity=".9" />
        <polygon points="0,230 200,90 360,190 560,50 760,180 940,90 1200,210 1200,340 0,340" fill={mountains} />
        <polygon points="540,70 560,50 580,70 570,66 560,74 550,66" fill="#fff" />
        <polygon points="925,105 940,90 955,105 948,102 940,108 932,102" fill="#fff" />
        <path d="M0 270 Q300 210 600 255 T1200 245 V340 H0Z" fill={hills} />
        {place.type === "yurt" ? (<><Yurt x={470} y={210} /><Yurt x={640} y={240} s={0.6} /></>) : <House x={500} y={200} />}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" className={className} role="img" aria-label={label}>
      <rect width="400" height="220" fill={sky} />
      <circle cx="320" cy="58" r="22" fill="#F6D58E" opacity=".9" />
      <polygon points="0,150 70,70 130,120 200,40 270,110 330,62 400,130 400,220 0,220" fill={mountains} />
      <polygon points="186,56 200,40 214,56 207,52 200,59 193,52" fill="#fff" />
      <polygon points="320,72 330,62 340,72 335,70 330,75 325,70" fill="#fff" />
      <path d="M0 172 Q100 132 200 166 T400 160 V220 H0Z" fill={hills} />
      {place.type === "yurt" ? <Yurt x={148} y={134} s={0.5} /> : <House x={142} y={137} s={0.45} />}
    </svg>
  );
}
