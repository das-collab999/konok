/**
 * Рисунки к блюдам, дорогам, условиям и впечатлениям.
 *
 * Простые плоские формы в палитре сайта: турист видит, как выглядит
 * бешбармак или юрта, не выходя со страницы. Всё нарисовано кодом —
 * не весит ничего и не мутнеет на любом экране.
 */

const C = {
  bg: "#EAE3D5",
  paper: "#F7F2E6",
  white: "#FFFDF7",
  line: "#C9BCA6",
  red: "#8E2420",
  redDark: "#6E1A17",
  redSoft: "#B4563F",
  ochre: "#B57F2A",
  gold: "#DDAE52",
  blue: "#2B4664",
  blueLight: "#CFE0EC",
  blueMid: "#3A5A7E",
  green: "#45614A",
  greenDark: "#3B5540",
  wood: "#6B4A2E",
  woodDark: "#4E3520",
  woodLight: "#8A6540",
  stone: "#8F8878",
  dough: "#E8D9B4",
  broth: "#C58A3A",
  grain: "#C9A86A",
  steam: "#B9AFA0",
  ink: "#16130F",
} as const;

const steam = (xs: number[]) => (
  <g stroke={C.steam} strokeWidth="4" fill="none" strokeLinecap="round">
    {xs.map((x, i) => <path key={i} d={`M${x} ${i === 1 ? 42 : 48} q8 -14 0 -24`} />)}
  </g>
);

export type ArtName =
  | "beshbarmak" | "lagman" | "kuurdak" | "plov" | "manty" | "boorsok" | "kaymak"
  | "shorpo" | "kurut" | "talkan" | "kumys" | "maksym" | "chai"
  | "yurt" | "house" | "lake" | "jailoo" | "redrocks" | "walnut"
  | "felt" | "cooking" | "horse" | "games"
  | "transfer" | "bus" | "taxi" | "plane"
  | "altitude" | "weather" | "power" | "water" | "toilet" | "nosignal" | "money" | "family";

const ART: Record<ArtName, React.ReactNode> = {
  /* ───────────────────────────── еда */
  beshbarmak: (
    <>
      <ellipse cx="100" cy="100" rx="74" ry="34" fill={C.line} />
      <ellipse cx="100" cy="94" rx="70" ry="31" fill={C.paper} />
      <path d="M40 92 q16 -10 32 0 t32 0 t32 0" stroke={C.dough} strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M44 104 q16 -10 32 0 t32 0 t28 0" stroke="#F0E4C6" strokeWidth="9" fill="none" strokeLinecap="round" />
      <ellipse cx="86" cy="88" rx="20" ry="11" fill={C.red} />
      <ellipse cx="118" cy="95" rx="14" ry="8" fill={C.redDark} />
      {steam([74, 100, 126])}
    </>
  ),
  lagman: (
    <>
      <path d="M46 78 h108 a54 54 0 0 1 -108 0 z" fill={C.blue} />
      <ellipse cx="100" cy="78" rx="54" ry="16" fill={C.blueMid} />
      <ellipse cx="100" cy="76" rx="46" ry="12" fill={C.dough} />
      <circle cx="84" cy="74" r="6" fill={C.red} />
      <circle cx="110" cy="78" r="5" fill={C.green} />
      <circle cx="98" cy="70" r="4" fill={C.ochre} />
      <rect x="44" y="118" width="112" height="7" rx="3" fill={C.line} />
      {steam([70, 100, 130])}
    </>
  ),
  kuurdak: (
    <>
      <path d="M52 62 h96 a48 44 0 0 1 -96 0 z" fill="#2A2420" />
      <ellipse cx="100" cy="62" rx="48" ry="13" fill="#3C3430" />
      <ellipse cx="100" cy="60" rx="38" ry="9" fill={C.red} />
      <circle cx="88" cy="59" r="5" fill={C.redSoft} />
      <circle cx="108" cy="62" r="4" fill={C.ochre} />
      <path d="M44 62 q-14 6 -4 16 M156 62 q14 6 4 16" stroke="#2A2420" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M78 122 q8 -18 22 -26 q-4 14 8 18 q10 -8 8 -20 q14 14 6 28 z" fill={C.ochre} />
      <path d="M88 122 q6 -12 14 -18 q-2 10 6 12 q6 -6 4 -14 q10 10 2 20 z" fill={C.gold} />
    </>
  ),
  plov: (
    <>
      <ellipse cx="100" cy="106" rx="72" ry="30" fill={C.line} />
      <ellipse cx="100" cy="100" rx="68" ry="27" fill={C.paper} />
      <path d="M46 100 q54 -46 108 0 z" fill="#E8D9A8" />
      <path d="M60 92 h26 M70 82 h26 M96 88 h24 M112 96 h26" stroke={C.ochre} strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="100" cy="74" rx="14" ry="8" fill={C.redDark} />
      <circle cx="78" cy="96" r="4" fill={C.green} />
      <circle cx="126" cy="92" r="4" fill={C.green} />
    </>
  ),
  manty: (
    <>
      <rect x="40" y="96" width="120" height="30" rx="8" fill={C.line} />
      <rect x="46" y="60" width="108" height="40" rx="10" fill={C.dough} />
      <g fill={C.paper}>
        <path d="M60 94 q0 -24 18 -24 t18 24 z" />
        <path d="M96 94 q0 -26 20 -26 t20 26 z" />
      </g>
      <path d="M68 78 q10 -10 20 0 M104 74 q12 -10 24 0" stroke="#D8C9A8" strokeWidth="4" fill="none" strokeLinecap="round" />
      {steam([68, 100, 132])}
    </>
  ),
  boorsok: (
    <>
      <ellipse cx="100" cy="112" rx="68" ry="26" fill={C.line} />
      <ellipse cx="100" cy="107" rx="64" ry="23" fill={C.paper} />
      <g fill="#D79B3C">
        <rect x="66" y="84" width="26" height="22" rx="6" transform="rotate(-12 79 95)" />
        <rect x="94" y="80" width="26" height="22" rx="6" transform="rotate(8 107 91)" />
        <rect x="80" y="96" width="26" height="22" rx="6" transform="rotate(-4 93 107)" />
        <rect x="110" y="94" width="24" height="20" rx="6" transform="rotate(16 122 104)" />
        <rect x="56" y="96" width="24" height="20" rx="6" transform="rotate(10 68 106)" />
      </g>
    </>
  ),
  kaymak: (
    <>
      <path d="M50 86 h62 a31 28 0 0 1 -62 0 z" fill={C.paper} />
      <ellipse cx="81" cy="86" rx="31" ry="9" fill={C.white} />
      <rect x="126" y="62" width="32" height="44" rx="8" fill={C.ochre} />
      <rect x="129" y="55" width="26" height="9" rx="3" fill="#8E6420" />
      <path d="M142 106 q0 14 -8 18" stroke={C.gold} strokeWidth="5" fill="none" strokeLinecap="round" />
    </>
  ),
  shorpo: (
    <>
      <path d="M50 80 h100 a50 44 0 0 1 -100 0 z" fill={C.paper} />
      <ellipse cx="100" cy="80" rx="50" ry="14" fill={C.broth} />
      <circle cx="84" cy="78" r="6" fill={C.red} />
      <circle cx="112" cy="82" r="5" fill="#E8D9A8" />
      <circle cx="100" cy="74" r="4" fill={C.green} />
      {steam([70, 100, 130])}
    </>
  ),
  kurut: (
    <>
      <path d="M40 112 q60 -24 120 0 q-60 16 -120 0 z" fill={C.line} />
      <g fill={C.white}>
        <circle cx="76" cy="92" r="16" /><circle cx="108" cy="86" r="18" />
        <circle cx="130" cy="100" r="13" /><circle cx="92" cy="106" r="12" />
      </g>
      <g fill="#E6DDCB"><circle cx="72" cy="88" r="4" /><circle cx="104" cy="82" r="4" /></g>
    </>
  ),
  talkan: (
    <>
      <path d="M56 84 h88 a44 38 0 0 1 -88 0 z" fill={C.paper} />
      <ellipse cx="100" cy="84" rx="44" ry="12" fill={C.grain} />
      <path d="M120 60 q22 -6 26 -22" stroke={C.woodLight} strokeWidth="8" fill="none" strokeLinecap="round" />
      <ellipse cx="124" cy="62" rx="12" ry="8" fill={C.woodLight} transform="rotate(-20 124 62)" />
    </>
  ),
  kumys: (
    <>
      <path d="M74 44 h24 v16 q22 10 22 38 t-34 32 t-34 -32 t22 -38 z" fill={C.wood} />
      <rect x="78" y="34" width="16" height="14" rx="4" fill={C.woodDark} />
      <path d="M70 92 q16 -10 32 0" stroke={C.woodLight} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M134 92 h34 a17 16 0 0 1 -34 0 z" fill={C.paper} />
      <ellipse cx="151" cy="92" rx="17" ry="5" fill={C.white} />
    </>
  ),
  maksym: (
    <>
      <path d="M78 46 h44 l-6 72 h-32 z" fill={C.paper} />
      <path d="M80 66 h40 l-4 52 h-32 z" fill={C.broth} />
      <ellipse cx="100" cy="46" rx="22" ry="6" fill={C.white} />
      <rect x="86" y="120" width="28" height="8" rx="3" fill={C.line} />
    </>
  ),
  chai: (
    <>
      <path d="M46 72 h56 a28 30 0 0 1 -56 0 z" fill={C.red} />
      <ellipse cx="74" cy="72" rx="28" ry="8" fill="#A93029" />
      <rect x="66" y="56" width="16" height="8" rx="3" fill={C.red} />
      <path d="M102 76 q22 2 20 18" stroke={C.red} strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M120 92 h32 a16 15 0 0 1 -32 0 z" fill={C.paper} />
      <ellipse cx="136" cy="92" rx="16" ry="5" fill={C.broth} />
      <path d="M60 40 q8 -14 0 -24" stroke={C.steam} strokeWidth="4" fill="none" strokeLinecap="round" />
    </>
  ),

  /* ───────────────────────────── где жить и что вокруг */
  yurt: (
    <>
      <path d="M40 118 q0 -58 60 -58 t60 58 z" fill={C.paper} />
      <path d="M40 118 h120 v6 h-120 z" fill={C.line} />
      <path d="M44 96 q56 -16 112 0" stroke={C.red} strokeWidth="7" fill="none" />
      <rect x="86" y="92" width="28" height="26" fill={C.red} />
      <circle cx="100" cy="62" r="9" fill={C.ochre} />
      <path d="M100 62 v-10 M92 56 l-6 -6 M108 56 l6 -6" stroke={C.ochre} strokeWidth="3" />
    </>
  ),
  house: (
    <>
      <path d="M44 84 l56 -34 l56 34 z" fill={C.red} />
      <rect x="54" y="84" width="92" height="40" fill={C.paper} />
      <rect x="66" y="94" width="20" height="18" fill={C.blue} />
      <rect x="114" y="94" width="20" height="18" fill={C.blue} />
      <rect x="92" y="100" width="18" height="24" fill={C.wood} />
      <circle cx="166" cy="96" r="14" fill={C.green} />
      <rect x="163" y="104" width="6" height="20" fill={C.wood} />
    </>
  ),
  lake: (
    <>
      <circle cx="150" cy="44" r="16" fill={C.gold} />
      <path d="M0 96 l44 -44 l30 30 l28 -34 l36 48 z" fill={C.stone} />
      <path d="M30 88 l14 -14 l10 10 z M96 82 l10 -12 l12 16 z" fill={C.paper} />
      <path d="M0 96 h200 v16 h-200 z" fill={C.green} />
      <path d="M0 112 h200 v48 h-200 z" fill={C.blue} />
      <path d="M20 126 h50 M100 122 h60 M40 140 h70" stroke={C.blueMid} strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  jailoo: (
    <>
      <path d="M0 120 q50 -46 100 -8 q50 -38 100 8 z" fill={C.green} />
      <path d="M0 136 q60 -22 110 -4 q50 -16 90 4 v24 h-200 z" fill={C.greenDark} />
      <path d="M70 120 q0 -26 26 -26 t26 26 z" fill={C.paper} />
      <rect x="88" y="110" width="14" height="10" fill={C.red} />
      <g fill={C.white}>
        <ellipse cx="40" cy="126" rx="9" ry="6" /><ellipse cx="58" cy="132" rx="7" ry="5" />
        <ellipse cx="150" cy="128" rx="8" ry="6" />
      </g>
    </>
  ),
  redrocks: (
    <>
      <path d="M0 140 l46 -74 l30 40 l26 -30 l40 64 z" fill={C.redSoft} />
      <path d="M58 140 l38 -52 l34 52 z" fill={C.red} />
      <path d="M0 140 h200 v20 h-200 z" fill={C.green} />
    </>
  ),
  walnut: (
    <>
      <rect x="94" y="88" width="14" height="48" fill={C.wood} />
      <circle cx="100" cy="72" r="40" fill={C.green} />
      <circle cx="68" cy="86" r="24" fill={C.greenDark} />
      <circle cx="132" cy="86" r="24" fill={C.greenDark} />
      <g fill={C.grain}><circle cx="84" cy="78" r="7" /><circle cx="114" cy="64" r="7" /><circle cx="104" cy="92" r="6" /></g>
      <path d="M0 136 h200 v24 h-200 z" fill={C.stone} />
    </>
  ),

  /* ───────────────────────────── впечатления */
  felt: (
    <>
      <path d="M44 30 h112 v104 l-56 -14 l-56 14 z" fill={C.red} />
      <path d="M54 42 h92 v80 l-46 -11 l-46 11 z" fill={C.blue} />
      <g fill="#EDE2C8">
        <path d="M62 50 h76 v8 h-76 z" />
        <path d="M100 66 l26 22 l-26 22 l-26 -22 z" />
      </g>
      <g fill="#C08A2E"><circle cx="76" cy="92" r="6" /><circle cx="124" cy="92" r="6" /></g>
    </>
  ),
  cooking: (
    <>
      <ellipse cx="100" cy="104" rx="66" ry="26" fill={C.paper} />
      <ellipse cx="100" cy="100" rx="60" ry="22" fill={C.dough} />
      <rect x="46" y="58" width="108" height="12" rx="6" fill={C.woodLight} />
      <rect x="36" y="60" width="16" height="8" rx="4" fill={C.wood} />
      <rect x="148" y="60" width="16" height="8" rx="4" fill={C.wood} />
      <g fill={C.line}><circle cx="78" cy="98" r="5" /><circle cx="104" cy="104" r="5" /><circle cx="126" cy="96" r="5" /></g>
    </>
  ),
  horse: (
    <>
      <g fill={C.wood}>
        <path d="M46 84 q0 -20 24 -22 h44 q10 -24 28 -34 q10 -6 14 2 q4 8 -6 14 q-12 8 -14 22 q14 10 14 28 v18 h-12 l-4 -22 q-14 6 -30 6 l-4 30 h-12 l2 -30 h-18 l-6 30 h-12 l4 -32 q-12 -6 -12 -20 z" />
        <path d="M46 82 q-18 -2 -28 -16 q4 18 20 26 z" />
      </g>
      <path d="M116 46 q14 -16 28 -10 q-14 8 -18 18 z" fill={C.woodDark} />
      <circle cx="152" cy="40" r="3" fill={C.bg} />
    </>
  ),
  games: (
    <>
      <circle cx="100" cy="86" r="52" fill="none" stroke={C.red} strokeWidth="6" />
      <g fill={C.paper}>
        <rect x="78" y="64" width="12" height="20" rx="5" /><rect x="96" y="60" width="12" height="20" rx="5" />
        <rect x="114" y="68" width="12" height="20" rx="5" /><rect x="86" y="92" width="12" height="20" rx="5" />
        <rect x="106" y="96" width="12" height="20" rx="5" />
      </g>
      <circle cx="152" cy="46" r="9" fill={C.ochre} />
    </>
  ),

  /* ───────────────────────────── дорога */
  transfer: (
    <>
      <rect x="30" y="72" width="140" height="42" rx="10" fill={C.blue} />
      <rect x="44" y="80" width="40" height="22" rx="5" fill={C.blueLight} />
      <rect x="92" y="80" width="30" height="22" rx="5" fill={C.blueLight} />
      <circle cx="62" cy="118" r="13" fill={C.ink} /><circle cx="140" cy="118" r="13" fill={C.ink} />
      <circle cx="62" cy="118" r="5" fill={C.line} /><circle cx="140" cy="118" r="5" fill={C.line} />
    </>
  ),
  bus: (
    <>
      <path d="M34 110 l14 -34 h104 l14 34 z" fill={C.gold} />
      <rect x="56" y="82" width="34" height="20" rx="4" fill={C.blueLight} />
      <rect x="100" y="82" width="34" height="20" rx="4" fill={C.blueLight} />
      <rect x="28" y="110" width="144" height="10" rx="5" fill={C.ochre} />
      <circle cx="62" cy="124" r="12" fill={C.ink} /><circle cx="138" cy="124" r="12" fill={C.ink} />
    </>
  ),
  taxi: (
    <>
      <path d="M40 104 l18 -28 h84 l18 28 z" fill={C.paper} />
      <rect x="64" y="82" width="30" height="18" rx="4" fill={C.blueLight} />
      <rect x="104" y="82" width="30" height="18" rx="4" fill={C.blueLight} />
      <rect x="34" y="104" width="132" height="12" rx="6" fill={C.line} />
      <rect x="86" y="60" width="28" height="12" rx="3" fill={C.gold} />
      <circle cx="64" cy="120" r="12" fill={C.ink} /><circle cx="136" cy="120" r="12" fill={C.ink} />
    </>
  ),
  plane: (
    <path d="M96 34 q10 0 10 16 v30 l56 26 v14 l-56 -14 v26 l18 14 v10 l-28 -8 l-28 8 v-10 l18 -14 v-26 l-56 14 v-14 l56 -26 v-30 q0 -16 10 -16 z" fill={C.red} />
  ),

  /* ───────────────────────────── условия */
  altitude: (
    <>
      <path d="M0 124 l52 -62 l34 42 l30 -34 l50 54 z" fill={C.stone} />
      <path d="M36 96 l16 -18 l12 14 z M106 94 l10 -12 l12 16 z" fill={C.paper} />
      <path d="M0 124 h200 v36 h-200 z" fill={C.green} />
      <rect x="138" y="36" width="6" height="52" fill={C.wood} />
      <path d="M144 38 h34 l-8 11 l8 11 h-34 z" fill={C.red} />
    </>
  ),
  weather: (
    <>
      <circle cx="72" cy="62" r="22" fill={C.gold} />
      <path d="M96 100 q-4 -24 18 -26 q6 -18 26 -12 q20 -2 20 20 q16 4 12 18 z" fill={C.paper} />
      <g stroke={C.blue} strokeWidth="5" strokeLinecap="round">
        <path d="M104 116 v12 M124 112 v16 M144 116 v12" />
      </g>
    </>
  ),
  power: (
    <>
      <circle cx="152" cy="44" r="16" fill={C.gold} />
      <rect x="52" y="72" width="96" height="46" rx="4" fill={C.blue} transform="skewX(-8)" />
      <g stroke={C.blueLight} strokeWidth="3">
        <path d="M64 72 v46 M96 70 v48 M128 68 v50 M46 92 h100" />
      </g>
      <rect x="92" y="118" width="12" height="22" fill={C.stone} />
    </>
  ),
  water: (
    <>
      <rect x="72" y="56" width="26" height="12" rx="4" fill={C.green} />
      <path d="M68 68 h34 q10 0 10 14 v44 q0 10 -10 10 h-34 q-10 0 -10 -10 v-44 q0 -14 10 -14 z" fill={C.blueLight} />
      <path d="M58 100 h54 v26 q0 10 -10 10 h-34 q-10 0 -10 -10 z" fill={C.blueMid} />
      <path d="M126 92 h30 a15 14 0 0 1 -30 0 z" fill={C.paper} />
      <ellipse cx="141" cy="92" rx="15" ry="4" fill={C.white} />
    </>
  ),
  toilet: (
    <>
      <path d="M56 64 l44 -24 l44 24 z" fill={C.red} />
      <rect x="62" y="64" width="76" height="64" fill={C.grain} />
      <rect x="86" y="86" width="28" height="42" fill={C.wood} />
      <circle cx="108" cy="108" r="3" fill={C.grain} />
      <path d="M72 76 h18 v10 h-18 z" fill={C.paper} />
    </>
  ),
  nosignal: (
    <>
      <rect x="94" y="70" width="12" height="58" fill={C.stone} />
      <path d="M100 70 l-22 -22 h44 z" fill={C.stone} />
      <g stroke={C.green} strokeWidth="6" fill="none" strokeLinecap="round">
        <path d="M126 60 q16 16 0 32" /><path d="M74 60 q-16 16 0 32" />
      </g>
      <path d="M58 44 l84 84" stroke={C.red} strokeWidth="8" strokeLinecap="round" />
    </>
  ),
  money: (
    <>
      <rect x="42" y="66" width="104" height="54" rx="6" fill={C.green} />
      <rect x="54" y="78" width="80" height="30" rx="4" fill="#5E7A62" />
      <circle cx="94" cy="93" r="13" fill={C.gold} />
      <circle cx="146" cy="110" r="18" fill={C.ochre} />
      <circle cx="146" cy="110" r="11" fill={C.gold} />
    </>
  ),
  family: (
    <>
      <circle cx="76" cy="58" r="18" fill={C.red} />
      <path d="M48 128 q0 -36 28 -36 t28 36 z" fill={C.red} />
      <circle cx="126" cy="76" r="13" fill={C.blue} />
      <path d="M106 128 q0 -26 20 -26 t20 26 z" fill={C.blue} />
    </>
  ),
};

/** Рисунок в рамке. `label` читают только программы чтения с экрана. */
export function Art({
  name,
  label,
  width = 200,
  className = "",
  bg = true,
}: { name: ArtName; label?: string; width?: number; className?: string; bg?: boolean }) {
  return (
    <svg
      viewBox="0 0 200 160"
      width={width}
      height={(width * 160) / 200}
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {bg && <rect width="200" height="160" fill={C.bg} />}
      {ART[name]}
    </svg>
  );
}
