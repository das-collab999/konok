import type { Place } from "@/data/places";

/* ------------------------------------------------------------------ *
 * Icons — one monoline set, 24×24, drawn in currentColor.
 * ------------------------------------------------------------------ */
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
  arrow: "M5 12h14M13 6l6 6-6 6",
  pin: "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11zM12 12.5a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5",
  calendar: "M4 6h16v15H4zM4 10h16M8 3v4M16 3v4",
  user: "M12 12a4 4 0 1 0 0-8a4 4 0 0 0 0 8M4 21c1.6-4 4.4-6 8-6s6.4 2 8 6",
  search: "M11 19a8 8 0 1 0 0-16a8 8 0 0 0 0 16M21 21l-4.3-4.3",
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({ name, size = 20, className = "", strokeWidth = 1.5 }: { name: IconName; size?: number; className?: string; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d={ICONS[name]} />
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Tunduk — the crown of the yurt. Monoline mark, inherits currentColor.
 * ------------------------------------------------------------------ */
export function Tunduk({ size = 34, className = "", strokeWidth = 1.4 }: { size?: number; className?: string; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="21.2" />
      <circle cx="24" cy="24" r="11.6" />
      <path d="M24 2.8v9.6M24 35.6v9.6M2.8 24h9.6M35.6 24h9.6" />
      <path d="M12.6 12.6 19 19M29 29l6.4 6.4M35.4 12.6 29 19M19 29l-6.4 6.4" />
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Cover art.
 * Until real photographs are uploaded, every place gets a quiet
 * duotone mountain study: layered ridgelines, haze between them,
 * film grain on top. Deterministic — the same place always looks
 * the same. Swap in a photo by adding `photo` to the place record.
 * ------------------------------------------------------------------ */

type Mood = { sky: [string, string]; ridges: [string, string, string, string]; haze: string; glow: string };

const MOODS: Record<string, Mood> = {
  // High and cold — warm grey daylight
  alpine: { sky: ["#b9ae9c", "#efe9dd"], ridges: ["#ddd5c6", "#bdb3a1", "#938a79", "#6a6256"], haze: "#efe9dd", glow: "#fffdf8" },
  // Lake — a shade cooler
  lake: { sky: ["#b2b0a6", "#f0ece2"], ridges: ["#dcd8cc", "#b9b5a8", "#908d82", "#67655d"], haze: "#f0ece2", glow: "#fffdf8" },
  // Valley — faintly green
  valley: { sky: ["#b4b4a2", "#eeeade"], ridges: ["#d9d6c4", "#b4b29d", "#8b8a77", "#636253"], haze: "#eeeade", glow: "#fffdf8" },
  // South — nut forest, warmest
  south: { sky: ["#c3b198", "#f2ebdd"], ridges: ["#e0d3bc", "#c0b196", "#978a73", "#6d6453"], haze: "#f2ebdd", glow: "#fffdf8" },
};

const REGION_MOOD: Record<string, keyof typeof MOODS> = {
  naryn: "alpine",
  issyk: "lake",
  chui: "valley",
  jalal: "south",
};

/** Small deterministic PRNG so a place always draws the same ridge. */
function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Smooth value noise, summed over octaves — gives a natural ridge profile. */
function noise1d(rand: () => number) {
  const lattice = Array.from({ length: 256 }, () => rand());
  const at = (i: number) => lattice[((i % 256) + 256) % 256];
  const smooth = (x: number) => {
    const i = Math.floor(x);
    const f = x - i;
    const u = f * f * (3 - 2 * f);
    return at(i) * (1 - u) + at(i + 1) * u;
  };
  return (x: number) => {
    let v = 0;
    let amp = 0.62;
    let freq = 1;
    for (let o = 0; o < 3; o++) {
      v += smooth(x * freq) * amp;
      amp *= 0.42;
      freq *= 2.3;
    }
    return Math.min(1, v / 0.95);
  };
}

/**
 * One mountain ridge: a noise profile sampled across the frame and filled
 * to the bottom. Peaks come out uneven, the way a real skyline is.
 */
function ridgePath(rand: () => number, w: number, h: number, baseY: number, amp: number, roughness: number) {
  const n = noise1d(rand);
  const offset = rand() * 50;
  const steps = 140;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = (w / steps) * i;
    const t = (i / steps) * roughness + offset;
    // Ridged noise: sharp summits, soft saddles.
    const raw = n(t);
    const ridged = Math.pow(1 - Math.abs(1 - 2 * raw), 1.5);
    const y = baseY - amp * (0.08 + 0.92 * ridged);
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return `${pts.join(" ")} L${w},${h} L0,${h} Z`;
}

export function PlaceArt({ place, wide = false, className = "" }: { place: Place; wide?: boolean; className?: string }) {
  const w = wide ? 1600 : 800;
  const h = wide ? 700 : 600;
  const mood = MOODS[REGION_MOOD[place.region] ?? "alpine"];
  const rand = seeded(place.slug);
  const uid = `art-${place.slug}${wide ? "-w" : ""}`;

  const layers = [0, 1, 2, 3].map((i) => ({
    fill: mood.ridges[i],
    d: ridgePath(rand, w, h, h * (0.58 + i * 0.11), h * (0.52 - i * 0.085), 1.5 + i * 0.7),
    opacity: 1,
  }));

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label={`Горный пейзаж: ${place.place}. Фотографии появятся после съёмки.`}
    >
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={mood.sky[0]} />
          <stop offset="100%" stopColor={mood.sky[1]} />
        </linearGradient>
        <radialGradient id={`${uid}-glow`} cx="68%" cy="52%" r="55%">
          <stop offset="0%" stopColor={mood.glow} stopOpacity="0.5" />
          <stop offset="100%" stopColor={mood.glow} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-haze`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={mood.haze} stopOpacity="0.55" />
          <stop offset="100%" stopColor={mood.haze} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${uid}-vig`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d0b09" stopOpacity="0.1" />
          <stop offset="45%" stopColor="#0d0b09" stopOpacity="0" />
          <stop offset="100%" stopColor="#0d0b09" stopOpacity="0.16" />
        </linearGradient>
        <filter id={`${uid}-grain`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>

      <rect width={w} height={h} fill={`url(#${uid}-sky)`} />
      <rect width={w} height={h} fill={`url(#${uid}-glow)`} />

      {layers.map((l, i) => (
        <g key={i}>
          <path d={l.d} fill={l.fill} />
        </g>
      ))}

      <rect width={w} height={h} fill={`url(#${uid}-vig)`} />
      <rect width={w} height={h} filter={`url(#${uid}-grain)`} opacity="0.1" style={{ mixBlendMode: "overlay" }} />
    </svg>
  );
}

/** Cover: a real photograph when there is one, the study otherwise. */
export function Cover({ place, wide = false, className = "" }: { place: Place; wide?: boolean; className?: string }) {
  if (place.photo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={place.photo} alt={place.title} className={className} loading="lazy" decoding="async" />;
  }
  return <PlaceArt place={place} wide={wide} className={className} />;
}

/* ------------------------------------------------------------------ *
 * Hero backdrop: the same ridge study, drawn dark and wide.
 * ------------------------------------------------------------------ */
export function HeroArt({ className = "" }: { className?: string }) {
  const w = 1920;
  const h = 900;
  const rand = seeded("konok-hero-ridge-02");
  const ridges = ["#d7cfc0", "#c0b7a5", "#a2998a", "#7f776a", "#5d564c"];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a99d88" />
          <stop offset="55%" stopColor="#cdc4b2" />
          <stop offset="100%" stopColor="#ece6d9" />
        </linearGradient>
        <radialGradient id="hero-glow" cx="74%" cy="62%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hero-haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ece6d9" stopOpacity="0.72" />
          <stop offset="100%" stopColor="#ece6d9" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hero-shade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1c1f23" stopOpacity="0.14" />
          <stop offset="60%" stopColor="#1c1f23" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#1c1f23" stopOpacity="0.12" />
        </linearGradient>
        <filter id="hero-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>

      <rect width={w} height={h} fill="url(#hero-sky)" />
      <rect width={w} height={h} fill="url(#hero-glow)" />

      {ridges.map((fill, i) => (
        <g key={fill}>
          <path d={ridgePath(rand, w, h, h * (0.58 + i * 0.1), h * (0.56 - i * 0.08), 1.3 + i * 0.6)} fill={fill} />
        </g>
      ))}

      <rect width={w} height={h} fill="url(#hero-shade)" />
      <rect width={w} height={h} filter="url(#hero-grain)" opacity="0.09" style={{ mixBlendMode: "overlay" }} />
    </svg>
  );
}
