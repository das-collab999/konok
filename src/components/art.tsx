/**
 * Рисунки к блюдам, дорогам, жилью и условиям.
 *
 * Нарисованы кодом: объём даётся градиентами, тенью под предметом и
 * бликами. Градиенты объявлены один раз в <ArtDefs /> (в layout.tsx),
 * поэтому страница не тащит их копии для каждой картинки.
 */

/** Общие градиенты. Вставляется один раз на страницу. */
export function ArtDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
      <defs>
        <radialGradient id="knk-plate" cx="50%" cy="36%" r="64%">
          <stop offset="0%" stopColor="#FFFDF7" /><stop offset="100%" stopColor="#E7DFCE" />
        </radialGradient>
        <linearGradient id="knk-bowl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3E648C" /><stop offset="100%" stopColor="#22405F" />
        </linearGradient>
        <radialGradient id="knk-broth" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#E7B463" /><stop offset="100%" stopColor="#C2833A" />
        </radialGradient>
        <linearGradient id="knk-meat" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A8482F" /><stop offset="100%" stopColor="#7A2A1C" />
        </linearGradient>
        <linearGradient id="knk-noodle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F6EBCF" /><stop offset="100%" stopColor="#DFCB9E" />
        </linearGradient>
        <linearGradient id="knk-fried" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8A94B" /><stop offset="100%" stopColor="#C87B23" />
        </linearGradient>
        <linearGradient id="knk-leather" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8A6540" /><stop offset="55%" stopColor="#6B4A2E" /><stop offset="100%" stopColor="#4E3520" />
        </linearGradient>
        <radialGradient id="knk-milk" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" /><stop offset="100%" stopColor="#EDE6D6" />
        </radialGradient>
        <linearGradient id="knk-wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8A6540" /><stop offset="100%" stopColor="#5C3F26" />
        </linearGradient>
        <linearGradient id="knk-iron" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4A423C" /><stop offset="100%" stopColor="#241F1B" />
        </linearGradient>
        <linearGradient id="knk-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#CBDAE6" /><stop offset="100%" stopColor="#EDE6D9" />
        </linearGradient>
        <linearGradient id="knk-rock" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A49C8C" /><stop offset="100%" stopColor="#726A5D" />
        </linearGradient>
        <linearGradient id="knk-redrock" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C06148" /><stop offset="100%" stopColor="#8E2420" />
        </linearGradient>
        <linearGradient id="knk-grass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5C7D5C" /><stop offset="100%" stopColor="#3B5540" />
        </linearGradient>
        <linearGradient id="knk-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4D7BA3" /><stop offset="100%" stopColor="#24415F" />
        </linearGradient>
        <linearGradient id="knk-felt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFDF7" /><stop offset="100%" stopColor="#E6DAC2" />
        </linearGradient>
        <linearGradient id="knk-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A93029" /><stop offset="100%" stopColor="#7A1C18" />
        </linearGradient>
        <radialGradient id="knk-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F6D98A" /><stop offset="100%" stopColor="#DDAE52" />
        </radialGradient>
      </defs>
    </svg>
  );
}

const SH = "#000";

/** Тень под предметом. */
const shadow = (cx: number, cy: number, rx: number, ry = rx * 0.17, o = 0.1) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={SH} opacity={o} />
);

/** Пар над горячим. */
const steam = (xs: number[], y = 90) => (
  <g stroke="#C3BAA8" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.8">
    {xs.map((x, i) => <path key={i} d={`M${x} ${y - (i === 1 ? 10 : 0)} q10 -16 0 -28`} />)}
  </g>
);

/** Тарелка: тень, борт, поле. */
const plate = (cy = 150) => (
  <>
    {shadow(150, cy + 28, 116, 20, 0.08)}
    <ellipse cx="150" cy={cy} rx="122" ry="46" fill="#D9CEB8" />
    <ellipse cx="150" cy={cy - 8} rx="118" ry="43" fill="url(#knk-plate)" />
    <ellipse cx="150" cy={cy - 10} rx="100" ry="34" fill="#F3EBD9" />
  </>
);

/** Пиала: тень, корпус, борт. */
const bowl = (fill = "url(#knk-bowl)", rim = "#4A7199") => (
  <>
    {shadow(150, 186, 92, 16, 0.08)}
    <path d="M62 118 h176 a88 70 0 0 1 -176 0 z" fill={fill} />
    <ellipse cx="150" cy="118" rx="88" ry="24" fill={rim} />
  </>
);

export type ArtName =
  | "beshbarmak" | "lagman" | "kuurdak" | "plov" | "manty" | "boorsok" | "kaymak"
  | "shorpo" | "kurut" | "talkan" | "kumys" | "maksym" | "chai"
  | "yurt" | "house" | "lake" | "jailoo" | "redrocks" | "walnut"
  | "felt" | "cooking" | "horse" | "games"
  | "transfer" | "bus" | "taxi" | "plane"
  | "altitude" | "weather" | "power" | "water" | "toilet" | "nosignal" | "money" | "family";

const ART: Record<ArtName, React.ReactNode> = {
  /* ───────────────────────────────── еда */
  beshbarmak: (
    <>
      {plate()}
      <g fill="url(#knk-noodle)">
        <path d="M60 142 q26 -18 56 -8 q30 10 56 -2 q28 -12 54 2 q-20 16 -54 12 q-32 -4 -56 4 q-26 8 -56 -8 z" />
        <path d="M68 122 q28 -16 58 -4 q28 10 54 0 q24 -8 48 2 q-20 14 -48 10 q-30 -4 -54 4 q-28 8 -58 -12 z" opacity="0.9" />
      </g>
      <g stroke="#CDB582" strokeWidth="2" fill="none" opacity="0.7">
        <path d="M78 130 q30 -12 60 -2 q30 10 58 -2" /><path d="M74 146 q32 -10 62 0 q30 10 58 -4" />
      </g>
      <ellipse cx="118" cy="126" rx="27" ry="15" fill="url(#knk-meat)" />
      <ellipse cx="111" cy="121" rx="12" ry="6" fill="#C2664A" opacity="0.65" />
      <ellipse cx="172" cy="138" rx="23" ry="13" fill="url(#knk-meat)" />
      <ellipse cx="167" cy="133" rx="10" ry="5" fill="#C2664A" opacity="0.6" />
      <ellipse cx="146" cy="152" rx="19" ry="10" fill="#8E2420" />
      <g stroke="#FFFDF7" strokeWidth="3.4" fill="none" opacity="0.95" strokeLinecap="round">
        <path d="M92 150 q16 -7 32 0" /><path d="M186 144 q14 -6 28 2" /><path d="M136 116 q12 -6 24 1" />
      </g>
      <g fill="#45614A"><circle cx="134" cy="116" r="3.4" /><circle cx="198" cy="132" r="3.4" /><circle cx="92" cy="134" r="3" /></g>
      {steam([112, 150, 188])}
    </>
  ),
  lagman: (
    <>
      {bowl()}
      <ellipse cx="150" cy="117" rx="80" ry="20" fill="url(#knk-broth)" />
      <g fill="none" stroke="#F2E3BE" strokeWidth="7" strokeLinecap="round">
        <path d="M106 116 q22 -14 44 -2 q22 12 44 -4" />
        <path d="M100 124 q26 10 50 0 q24 -10 48 2" opacity="0.9" />
      </g>
      <ellipse cx="124" cy="110" rx="13" ry="7" fill="url(#knk-meat)" />
      <ellipse cx="178" cy="120" rx="11" ry="6" fill="#A8482F" />
      <g fill="#45614A"><ellipse cx="150" cy="106" rx="9" ry="5" /><circle cx="196" cy="112" r="4" /><circle cx="108" cy="122" r="4" /></g>
      <rect x="56" y="162" width="188" height="9" rx="4" fill="#CFC3AC" />
      {steam([118, 152, 186], 76)}
    </>
  ),
  kuurdak: (
    <>
      {shadow(150, 182, 86, 15, 0.1)}
      <path d="M58 92 h184 a92 72 0 0 1 -184 0 z" fill="url(#knk-iron)" />
      <ellipse cx="150" cy="92" rx="92" ry="22" fill="#554C45" />
      <ellipse cx="150" cy="90" rx="80" ry="17" fill="#2F2924" />
      <g>
        <ellipse cx="124" cy="88" rx="22" ry="11" fill="url(#knk-meat)" />
        <ellipse cx="166" cy="92" rx="19" ry="10" fill="#8E2420" />
        <ellipse cx="146" cy="84" rx="16" ry="8" fill="#C87B23" />
        <ellipse cx="118" cy="84" rx="9" ry="4" fill="#C2664A" opacity="0.7" />
      </g>
      <path d="M48 92 q-20 8 -8 24 M252 92 q20 8 8 24" stroke="#241F1B" strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M108 180 q12 -28 34 -40 q-6 22 12 28 q16 -12 12 -32 q22 22 10 44 z" fill="#C87B23" />
      <path d="M124 180 q8 -18 22 -26 q-4 14 10 18 q10 -8 8 -22 q14 16 4 30 z" fill="#F0C277" />
    </>
  ),
  plov: (
    <>
      {plate(156)}
      <path d="M58 146 q92 -62 184 0 q-92 26 -184 0 z" fill="#E9D9A6" />
      <path d="M58 146 q92 -62 184 0" fill="none" stroke="#D8C38A" strokeWidth="3" />
      <g stroke="#C87B23" strokeWidth="6" strokeLinecap="round">
        <path d="M86 132 h34" /><path d="M104 118 h32" /><path d="M150 124 h30" /><path d="M178 136 h30" />
      </g>
      <ellipse cx="150" cy="104" rx="20" ry="11" fill="url(#knk-meat)" />
      <ellipse cx="145" cy="100" rx="9" ry="4" fill="#C2664A" opacity="0.6" />
      <g fill="#45614A"><circle cx="106" cy="140" r="4" /><circle cx="196" cy="128" r="4" /></g>
      <g fill="#7A5E36"><circle cx="124" cy="140" r="3" /><circle cx="170" cy="142" r="3" /></g>
    </>
  ),
  manty: (
    <>
      {shadow(150, 182, 96, 16, 0.09)}
      <rect x="44" y="140" width="212" height="34" rx="10" fill="#C7B795" />
      <rect x="52" y="86" width="196" height="58" rx="12" fill="#DCCBA4" />
      <rect x="60" y="94" width="180" height="44" rx="10" fill="#EFE2C2" />
      <g>
        <path d="M86 136 q0 -36 26 -36 t26 36 z" fill="url(#knk-felt)" />
        <path d="M146 136 q0 -40 28 -40 t28 40 z" fill="url(#knk-felt)" />
        <path d="M206 136 q0 -30 20 -30 t20 30 z" fill="#F4ECD8" />
      </g>
      <g stroke="#D7C7A4" strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M96 116 q16 -14 32 0" /><path d="M156 110 q18 -16 36 0" />
        <path d="M104 126 q8 -8 16 0" /><path d="M166 122 q8 -8 16 0" />
      </g>
      {steam([106, 150, 196], 70)}
    </>
  ),
  boorsok: (
    <>
      {shadow(150, 188, 104, 17, 0.08)}
      <ellipse cx="150" cy="166" rx="108" ry="34" fill="#D9CEB8" />
      <ellipse cx="150" cy="160" rx="104" ry="31" fill="#FBF6EA" />
      <g>
        <g transform="translate(94 126) rotate(-14)"><rect width="48" height="35" rx="13" fill="url(#knk-fried)" /><rect x="8" y="7" width="20" height="9" rx="4" fill="#F3CE8A" opacity="0.85" /></g>
        <g transform="translate(140 116) rotate(9)"><rect width="50" height="35" rx="13" fill="url(#knk-fried)" /><rect x="9" y="7" width="20" height="9" rx="4" fill="#F3CE8A" opacity="0.85" /></g>
        <g transform="translate(72 148) rotate(6)"><rect width="46" height="33" rx="12" fill="url(#knk-fried)" /><rect x="8" y="6" width="18" height="8" rx="4" fill="#F3CE8A" opacity="0.7" /></g>
        <g transform="translate(118 146) rotate(-6)"><rect width="48" height="34" rx="12" fill="url(#knk-fried)" /><rect x="9" y="6" width="19" height="8" rx="4" fill="#F3CE8A" opacity="0.7" /></g>
        <g transform="translate(168 142) rotate(16)"><rect width="46" height="33" rx="12" fill="url(#knk-fried)" /><rect x="8" y="6" width="18" height="8" rx="4" fill="#F3CE8A" opacity="0.7" /></g>
        <g transform="translate(190 118) rotate(-10)"><rect width="44" height="31" rx="12" fill="#D68C2E" /></g>
      </g>
    </>
  ),
  kaymak: (
    <>
      {shadow(104, 168, 56, 10, 0.09)}
      <path d="M48 112 h112 a56 46 0 0 1 -112 0 z" fill="#F7F2E6" />
      <ellipse cx="104" cy="112" rx="56" ry="15" fill="url(#knk-milk)" />
      <ellipse cx="104" cy="110" rx="46" ry="11" fill="#FFFFFF" />
      <path d="M72 116 q32 10 64 0" stroke="#E6DCC8" strokeWidth="3" fill="none" />
      {shadow(226, 176, 40, 8, 0.1)}
      <rect x="192" y="96" width="68" height="76" rx="12" fill="#C98B2A" />
      <rect x="200" y="106" width="52" height="56" rx="8" fill="#E2A63F" />
      <rect x="198" y="84" width="56" height="16" rx="5" fill="#8E6420" />
      <path d="M226 172 q0 18 -14 24" stroke="#E2A63F" strokeWidth="7" fill="none" strokeLinecap="round" />
      <ellipse cx="226" cy="124" rx="14" ry="18" fill="#F6D58E" opacity="0.6" />
    </>
  ),
  shorpo: (
    <>
      {bowl("url(#knk-felt)", "#EFE6D2")}
      <ellipse cx="150" cy="117" rx="80" ry="20" fill="url(#knk-broth)" />
      <ellipse cx="124" cy="112" rx="15" ry="8" fill="url(#knk-meat)" />
      <ellipse cx="176" cy="120" rx="13" ry="7" fill="#C87B23" />
      <ellipse cx="150" cy="108" rx="12" ry="6" fill="#E9D9A6" />
      <g fill="#45614A"><circle cx="196" cy="112" r="4" /><circle cx="106" cy="120" r="4" /><circle cx="152" cy="126" r="3.4" /></g>
      <g stroke="#F6D58E" strokeWidth="2.6" fill="none" opacity="0.8"><path d="M104 114 q46 14 92 -2" /></g>
      {steam([118, 152, 186], 76)}
    </>
  ),
  kurut: (
    <>
      {shadow(150, 168, 96, 14, 0.09)}
      <path d="M44 150 q106 -34 212 0 q-106 24 -212 0 z" fill="#D9CEB8" />
      <g>
        <circle cx="106" cy="122" r="24" fill="url(#knk-milk)" />
        <circle cx="156" cy="112" r="27" fill="url(#knk-milk)" />
        <circle cx="196" cy="132" r="20" fill="url(#knk-milk)" />
        <circle cx="128" cy="142" r="19" fill="url(#knk-milk)" />
        <circle cx="172" cy="146" r="16" fill="#F4EEE0" />
      </g>
      <g fill="#FFFFFF" opacity="0.9">
        <circle cx="98" cy="114" r="6" /><circle cx="147" cy="102" r="7" /><circle cx="190" cy="126" r="5" />
      </g>
    </>
  ),
  talkan: (
    <>
      {shadow(142, 170, 70, 12, 0.09)}
      <path d="M72 112 h140 a70 56 0 0 1 -140 0 z" fill="#F7F2E6" />
      <ellipse cx="142" cy="112" rx="70" ry="18" fill="#C9A86A" />
      <ellipse cx="142" cy="109" rx="58" ry="13" fill="#D9BC86" />
      <g fill="#B08F58" opacity="0.6"><circle cx="120" cy="110" r="4" /><circle cx="158" cy="114" r="4" /><circle cx="142" cy="104" r="3" /></g>
      <path d="M186 86 q34 -8 42 -34" stroke="url(#knk-wood)" strokeWidth="11" fill="none" strokeLinecap="round" />
      <ellipse cx="192" cy="88" rx="18" ry="11" fill="#7C5A38" transform="rotate(-22 192 88)" />
    </>
  ),
  kumys: (
    <>
      {shadow(128, 192, 74, 14, 0.1)}
      <path d="M104 56 h44 v22 q34 14 34 56 t-56 48 t-56 -48 t34 -56 z" fill="url(#knk-leather)" />
      <rect x="110" y="40" width="32" height="20" rx="6" fill="#3F2A18" />
      <path d="M92 118 q34 -16 68 0" stroke="#A07A4E" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.8" />
      <path d="M96 140 q30 14 60 0" stroke="#4A3220" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.7" />
      <g opacity="0.5" stroke="#C49A66" strokeWidth="3" fill="none">
        <path d="M112 92 q14 -10 28 0" /><path d="M106 160 q24 10 46 0" />
      </g>
      {shadow(236, 168, 40, 9, 0.08)}
      <path d="M200 140 h72 a36 30 0 0 1 -72 0 z" fill="#F7F2E6" />
      <ellipse cx="236" cy="140" rx="36" ry="10" fill="url(#knk-milk)" />
      <path d="M204 142 q32 10 64 0" stroke="#E2D9C6" strokeWidth="3" fill="none" />
    </>
  ),
  maksym: (
    <>
      {shadow(150, 190, 44, 9, 0.1)}
      <path d="M112 50 h76 l-10 130 h-56 z" fill="#F7F2E6" opacity="0.95" />
      <path d="M116 80 h68 l-8 100 h-52 z" fill="url(#knk-broth)" />
      <ellipse cx="150" cy="50" rx="38" ry="9" fill="#FFFDF7" />
      <ellipse cx="150" cy="80" rx="34" ry="8" fill="#F0D7A2" />
      <rect x="126" y="182" width="48" height="10" rx="4" fill="#CFC3AC" />
      <path d="M124 92 q6 60 6 84" stroke="#FFFFFF" strokeWidth="5" fill="none" opacity="0.45" strokeLinecap="round" />
    </>
  ),
  chai: (
    <>
      {shadow(104, 150, 60, 11, 0.09)}
      <path d="M46 96 h116 a58 44 0 0 1 -116 0 z" fill="url(#knk-red)" />
      <ellipse cx="104" cy="96" rx="58" ry="14" fill="#B4473C" />
      <ellipse cx="104" cy="94" rx="46" ry="10" fill="#8E2420" />
      <rect x="88" y="70" width="32" height="14" rx="5" fill="#8E2420" />
      <circle cx="104" cy="68" r="8" fill="#C08A2E" />
      <path d="M162 104 q40 4 36 34" stroke="url(#knk-red)" strokeWidth="12" fill="none" strokeLinecap="round" />
      {shadow(224, 158, 36, 7, 0.08)}
      <path d="M190 128 h68 a34 28 0 0 1 -68 0 z" fill="#F7F2E6" />
      <ellipse cx="224" cy="128" rx="34" ry="9" fill="#C58A3A" />
      <path d="M58 56 q10 -16 0 -28" stroke="#C3BAA8" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.8" />
    </>
  ),

  /* ───────────────────────────────── жильё и природа */
  yurt: (
    <>
      <rect width="300" height="220" fill="url(#knk-sky)" />
      <path d="M0 150 l60 -42 l44 30 l40 -34 l54 46 l50 -28 l52 28 v70 h-300 z" fill="#B9B3A4" opacity="0.5" />
      <path d="M0 176 h300 v44 h-300 z" fill="url(#knk-grass)" />
      {shadow(150, 182, 96, 12, 0.14)}
      <path d="M46 176 q0 -82 104 -82 t104 82 z" fill="url(#knk-felt)" />
      <path d="M46 176 h208 v8 h-208 z" fill="#CFC3AC" />
      <path d="M52 140 q98 -24 196 0" stroke="#8E2420" strokeWidth="10" fill="none" />
      <path d="M52 152 q98 -20 196 0" stroke="#C08A2E" strokeWidth="4" fill="none" opacity="0.8" />
      <rect x="128" y="136" width="44" height="40" rx="3" fill="#8E2420" />
      <rect x="134" y="142" width="32" height="34" rx="2" fill="#6E1A17" />
      <circle cx="150" cy="96" r="13" fill="#C08A2E" />
      <path d="M150 96 v-14 M138 88 l-10 -10 M162 88 l10 -10" stroke="#C08A2E" strokeWidth="4" strokeLinecap="round" />
      <circle cx="252" cy="44" r="18" fill="url(#knk-sun)" />
    </>
  ),
  house: (
    <>
      <rect width="300" height="220" fill="url(#knk-sky)" />
      <path d="M0 176 h300 v44 h-300 z" fill="url(#knk-grass)" />
      {shadow(150, 182, 84, 11, 0.14)}
      <path d="M52 112 l98 -56 l98 56 z" fill="url(#knk-red)" />
      <path d="M52 112 h196 v8 h-196 z" fill="#6E1A17" />
      <rect x="68" y="120" width="164" height="58" fill="#F7F2E6" />
      <rect x="68" y="120" width="164" height="58" fill="none" stroke="#E0D6C2" strokeWidth="3" />
      <rect x="86" y="134" width="34" height="28" fill="url(#knk-water)" />
      <rect x="180" y="134" width="34" height="28" fill="url(#knk-water)" />
      <path d="M86 148 h34 M103 134 v28 M180 148 h34 M197 134 v28" stroke="#F7F2E6" strokeWidth="3" />
      <rect x="136" y="140" width="30" height="38" fill="url(#knk-wood)" />
      <circle cx="262" cy="140" r="26" fill="#4C6B4E" />
      <rect x="258" y="156" width="8" height="24" fill="#6B4A2E" />
      <circle cx="46" cy="46" r="18" fill="url(#knk-sun)" />
    </>
  ),
  lake: (
    <>
      <rect width="300" height="220" fill="url(#knk-sky)" />
      <circle cx="238" cy="44" r="20" fill="url(#knk-sun)" />
      <path d="M0 118 l58 -58 l42 42 l40 -48 l50 64 l44 -30 l66 30 v26 h-300 z" fill="url(#knk-rock)" />
      <path d="M44 88 l14 -16 l12 14 z M130 84 l10 -14 l14 20 z M232 100 l12 -14 l14 16 z" fill="#F4F0E6" />
      <path d="M0 144 h300 v12 h-300 z" fill="#4C6B4E" />
      <path d="M0 156 h300 v64 h-300 z" fill="url(#knk-water)" />
      <g stroke="#6A94BA" strokeWidth="5" strokeLinecap="round" opacity="0.7">
        <path d="M26 176 h66" /><path d="M140 170 h80" /><path d="M58 196 h92" /><path d="M186 196 h74" />
      </g>
    </>
  ),
  jailoo: (
    <>
      <rect width="300" height="220" fill="url(#knk-sky)" />
      <path d="M0 106 l56 -40 l40 28 l44 -34 l52 42 l46 -22 l62 26 v34 h-300 z" fill="#A9A294" opacity="0.65" />
      <path d="M0 148 q74 -46 150 -10 q76 -36 150 10 v72 h-300 z" fill="url(#knk-grass)" />
      <path d="M0 176 q86 -28 160 -6 q72 -22 140 6 v44 h-300 z" fill="#3B5540" />
      {shadow(150, 170, 42, 7, 0.16)}
      <path d="M112 166 q0 -38 38 -38 t38 38 z" fill="url(#knk-felt)" />
      <path d="M118 150 q32 -10 64 0" stroke="#8E2420" strokeWidth="6" fill="none" />
      <rect x="140" y="150" width="20" height="16" fill="#8E2420" />
      <g fill="#FFFDF7">
        <ellipse cx="56" cy="180" rx="13" ry="9" /><circle cx="46" cy="174" r="6" />
        <ellipse cx="86" cy="192" rx="11" ry="8" /><circle cx="77" cy="187" r="5" />
        <ellipse cx="236" cy="184" rx="12" ry="8" /><circle cx="227" cy="179" r="5" />
      </g>
      <circle cx="252" cy="46" r="18" fill="url(#knk-sun)" />
    </>
  ),
  redrocks: (
    <>
      <rect width="300" height="220" fill="url(#knk-sky)" />
      <path d="M0 184 l64 -100 l42 54 l36 -42 l56 88 z" fill="url(#knk-redrock)" />
      <path d="M78 184 l54 -72 l48 72 z" fill="#8E2420" />
      <path d="M186 184 l50 -66 l64 66 z" fill="#A5422F" />
      <g stroke="#6E1A17" strokeWidth="3" opacity="0.5">
        <path d="M60 180 l16 -40" /><path d="M120 178 l12 -34" /><path d="M230 180 l10 -32" />
      </g>
      <path d="M0 184 h300 v36 h-300 z" fill="url(#knk-grass)" />
      <g fill="#3B5540"><circle cx="40" cy="196" r="12" /><circle cx="268" cy="200" r="14" /></g>
    </>
  ),
  walnut: (
    <>
      <rect width="300" height="220" fill="url(#knk-sky)" />
      <path d="M0 176 h300 v44 h-300 z" fill="url(#knk-grass)" />
      <rect x="140" y="116" width="22" height="64" fill="url(#knk-wood)" />
      <path d="M150 150 l-26 -18 M150 134 l24 -16" stroke="#6B4A2E" strokeWidth="7" strokeLinecap="round" />
      <circle cx="150" cy="96" r="56" fill="#4C6B4E" />
      <circle cx="100" cy="116" r="34" fill="#3B5540" />
      <circle cx="200" cy="116" r="34" fill="#3B5540" />
      <circle cx="150" cy="78" r="30" fill="#5C7D5C" opacity="0.8" />
      <g fill="#C9A86A">
        <circle cx="118" cy="104" r="9" /><circle cx="176" cy="86" r="9" /><circle cx="148" cy="126" r="8" /><circle cx="196" cy="128" r="7" />
      </g>
      <g fill="#8A6540" opacity="0.8"><circle cx="118" cy="104" r="3" /><circle cx="176" cy="86" r="3" /></g>
    </>
  ),

  /* ───────────────────────────────── впечатления */
  felt: (
    <>
      <rect width="300" height="220" fill="#EFE8DA" />
      {shadow(150, 196, 86, 12, 0.12)}
      <path d="M66 24 h168 v156 l-84 -22 l-84 22 z" fill="url(#knk-red)" />
      <path d="M80 38 h140 v124 l-70 -18 l-70 18 z" fill="#2B4664" />
      <g fill="#EDE2C8">
        <path d="M92 50 h116 v10 h-116 z" />
        <path d="M150 76 l34 30 l-34 30 l-34 -30 z" />
        <path d="M92 146 h116 v8 h-116 z" />
      </g>
      <g fill="#C08A2E"><circle cx="110" cy="106" r="8" /><circle cx="190" cy="106" r="8" /></g>
      <g fill="none" stroke="#C08A2E" strokeWidth="3" opacity="0.8"><path d="M150 60 v12 M150 140 v8" /></g>
    </>
  ),
  cooking: (
    <>
      {shadow(150, 190, 104, 16, 0.09)}
      <ellipse cx="150" cy="156" rx="112" ry="40" fill="#D9CEB8" />
      <ellipse cx="150" cy="150" rx="106" ry="36" fill="url(#knk-plate)" />
      <ellipse cx="150" cy="148" rx="90" ry="28" fill="#EFE2C2" />
      <g stroke="#DCCBA4" strokeWidth="3" fill="none" opacity="0.9">
        <path d="M80 148 q70 -20 140 0" /><path d="M86 158 q64 16 128 0" />
      </g>
      <rect x="54" y="74" width="192" height="18" rx="9" fill="url(#knk-wood)" />
      <rect x="38" y="76" width="22" height="14" rx="7" fill="#4E3520" />
      <rect x="240" y="76" width="22" height="14" rx="7" fill="#4E3520" />
      <path d="M58 80 h184" stroke="#A07A4E" strokeWidth="3" opacity="0.6" />
      <g fill="#E4D6B4"><circle cx="106" cy="142" r="7" /><circle cx="150" cy="156" r="7" /><circle cx="194" cy="140" r="7" /></g>
    </>
  ),
  horse: (
    <>
      <rect width="300" height="220" fill="url(#knk-sky)" />
      <path d="M0 176 h300 v44 h-300 z" fill="url(#knk-grass)" />
      {shadow(150, 182, 76, 10, 0.15)}
      <g fill="url(#knk-wood)">
        <path d="M70 124 q0 -28 34 -30 h62 q14 -34 40 -48 q14 -8 20 3 q6 11 -8 19 q-17 11 -20 31 q20 14 20 40 v26 h-17 l-6 -31 q-20 8 -43 8 l-6 43 h-17 l3 -43 h-26 l-9 43 h-17 l6 -46 q-17 -8 -17 -28 z" />
        <path d="M70 122 q-26 -3 -40 -23 q6 26 29 37 z" />
      </g>
      <path d="M166 66 q20 -23 40 -14 q-20 11 -26 26 z" fill="#4E3520" />
      <circle cx="212" cy="58" r="4" fill="#F4F0E6" />
      <path d="M118 122 h54 q10 0 10 10 t-10 10 h-54 q-10 0 -10 -10 t10 -10 z" fill="#8E2420" opacity="0.9" />
      <path d="M112 132 h66" stroke="#C08A2E" strokeWidth="3" />
    </>
  ),
  games: (
    <>
      <rect width="300" height="220" fill="#EFE8DA" />
      <circle cx="150" cy="112" r="72" fill="none" stroke="url(#knk-red)" strokeWidth="9" />
      <circle cx="150" cy="112" r="56" fill="#E7DFCE" opacity="0.6" />
      <g fill="#FFFDF7" stroke="#DCCFB4" strokeWidth="2">
        <rect x="118" y="80" width="16" height="28" rx="7" /><rect x="142" y="72" width="16" height="28" rx="7" />
        <rect x="166" y="84" width="16" height="28" rx="7" /><rect x="128" y="116" width="16" height="28" rx="7" />
        <rect x="156" y="122" width="16" height="28" rx="7" />
      </g>
      <g fill="#C08A2E"><circle cx="232" cy="56" r="12" /></g>
      {shadow(150, 196, 70, 10, 0.08)}
    </>
  ),

  /* ───────────────────────────────── дорога */
  transfer: (
    <>
      {shadow(150, 182, 104, 14, 0.12)}
      <path d="M36 92 h186 l34 36 v38 h-220 z" fill="url(#knk-bowl)" />
      <path d="M48 102 h58 v30 h-58 z" fill="#CFE0EC" />
      <path d="M114 102 h50 v30 h-50 z" fill="#CFE0EC" />
      <path d="M172 102 h42 l24 26 h-66 z" fill="#CFE0EC" />
      <rect x="36" y="150" width="220" height="16" rx="6" fill="#1B3148" />
      <g><circle cx="86" cy="168" r="20" fill="#16130F" /><circle cx="86" cy="168" r="8" fill="#B9B3A4" /></g>
      <g><circle cx="216" cy="168" r="20" fill="#16130F" /><circle cx="216" cy="168" r="8" fill="#B9B3A4" /></g>
      <rect x="240" y="116" width="18" height="12" rx="4" fill="#F6D58E" />
    </>
  ),
  bus: (
    <>
      {shadow(150, 184, 100, 14, 0.12)}
      <path d="M44 98 h178 l30 34 v36 h-208 z" fill="#E2A63F" />
      <path d="M56 108 h50 v28 h-50 z" fill="#CFE0EC" />
      <path d="M114 108 h46 v28 h-46 z" fill="#CFE0EC" />
      <path d="M168 108 h42 l22 24 h-64 z" fill="#CFE0EC" />
      <rect x="44" y="152" width="208" height="16" rx="6" fill="#C98B2A" />
      <rect x="120" y="80" width="60" height="16" rx="5" fill="#8E2420" />
      <g><circle cx="92" cy="170" r="20" fill="#16130F" /><circle cx="92" cy="170" r="8" fill="#B9B3A4" /></g>
      <g><circle cx="210" cy="170" r="20" fill="#16130F" /><circle cx="210" cy="170" r="8" fill="#B9B3A4" /></g>
    </>
  ),
  taxi: (
    <>
      {shadow(150, 182, 98, 13, 0.12)}
      <path d="M46 148 l26 -46 h156 l26 46 z" fill="#F7F2E6" />
      <path d="M86 108 h50 v32 h-56 z" fill="#CFE0EC" />
      <path d="M146 108 h48 l16 32 h-64 z" fill="#CFE0EC" />
      <rect x="40" y="144" width="220" height="22" rx="10" fill="#E0D6C2" />
      <rect x="126" y="82" width="48" height="16" rx="5" fill="#DDAE52" />
      <g><circle cx="92" cy="168" r="19" fill="#16130F" /><circle cx="92" cy="168" r="7" fill="#B9B3A4" /></g>
      <g><circle cx="210" cy="168" r="19" fill="#16130F" /><circle cx="210" cy="168" r="7" fill="#B9B3A4" /></g>
    </>
  ),
  plane: (
    <>
      <rect width="300" height="220" fill="url(#knk-sky)" />
      <g opacity="0.5" fill="#FFFFFF">
        <ellipse cx="60" cy="56" rx="30" ry="14" /><ellipse cx="82" cy="50" rx="22" ry="12" />
        <ellipse cx="238" cy="166" rx="34" ry="14" /><ellipse cx="214" cy="172" rx="22" ry="11" />
      </g>
      <g transform="translate(150 110) rotate(-18) translate(-150 -110)">
        <path d="M146 40 q14 0 14 22 v42 l78 36 v20 l-78 -20 v36 l26 20 v14 l-40 -11 l-40 11 v-14 l26 -20 v-36 l-78 20 v-20 l78 -36 v-42 q0 -22 14 -22 z" fill="url(#knk-red)" />
        <path d="M146 44 q10 0 10 18 v40 l-10 4 z" fill="#C2664A" opacity="0.5" />
      </g>
    </>
  ),

  /* ───────────────────────────────── условия */
  altitude: (
    <>
      <rect width="300" height="220" fill="url(#knk-sky)" />
      <path d="M0 160 l72 -92 l48 60 l42 -48 l66 80 l72 -40 v40 z" fill="url(#knk-rock)" />
      <path d="M52 108 l20 -26 l18 22 z M156 102 l12 -18 l18 24 z" fill="#F4F0E6" />
      <path d="M0 160 h300 v60 h-300 z" fill="url(#knk-grass)" />
      <rect x="206" y="42" width="8" height="76" rx="3" fill="#6B4A2E" />
      <path d="M214 44 h52 l-12 16 l12 16 h-52 z" fill="url(#knk-red)" />
      <g fill="#F4F0E6" opacity="0.8"><circle cx="40" cy="44" r="4" /><circle cx="64" cy="34" r="3" /></g>
    </>
  ),
  weather: (
    <>
      <rect width="300" height="220" fill="url(#knk-sky)" />
      <circle cx="92" cy="74" r="34" fill="url(#knk-sun)" />
      <g stroke="#DDAE52" strokeWidth="5" strokeLinecap="round" opacity="0.8">
        <path d="M92 24 v-12 M92 136 v12 M42 74 h-12 M142 74 h12 M56 38 l-9 -9 M128 110 l9 9 M128 38 l9 -9 M56 110 l-9 9" />
      </g>
      <g fill="#FFFFFF">
        <ellipse cx="186" cy="110" rx="52" ry="30" /><ellipse cx="144" cy="122" rx="32" ry="22" />
        <ellipse cx="226" cy="124" rx="34" ry="20" />
      </g>
      <g stroke="#4D7BA3" strokeWidth="6" strokeLinecap="round">
        <path d="M152 156 v22 M186 150 v28 M220 156 v22" />
      </g>
      <g fill="#FFFFFF"><circle cx="134" cy="172" r="5" /><circle cx="240" cy="166" r="5" /></g>
    </>
  ),
  power: (
    <>
      <rect width="300" height="220" fill="url(#knk-sky)" />
      <circle cx="244" cy="50" r="24" fill="url(#knk-sun)" />
      <path d="M0 176 h300 v44 h-300 z" fill="url(#knk-grass)" />
      {shadow(150, 182, 74, 10, 0.14)}
      <g transform="rotate(-10 150 120)">
        <rect x="60" y="86" width="180" height="76" rx="6" fill="#2B4664" />
        <g stroke="#6A94BA" strokeWidth="3"><path d="M90 86 v76 M120 86 v76 M150 86 v76 M180 86 v76 M210 86 v76 M60 124 h180" /></g>
        <path d="M60 86 h180 l-14 12 h-152 z" fill="#4D7BA3" opacity="0.5" />
      </g>
      <rect x="142" y="158" width="16" height="26" fill="#8F8878" />
      <rect x="126" y="180" width="48" height="8" rx="3" fill="#6E675C" />
    </>
  ),
  water: (
    <>
      {shadow(104, 186, 46, 9, 0.1)}
      <rect x="86" y="46" width="36" height="18" rx="6" fill="#4C6B4E" />
      <path d="M80 64 h48 q16 0 16 22 v74 q0 16 -16 16 h-48 q-16 0 -16 -16 v-74 q0 -22 16 -22 z" fill="#CFE0EC" />
      <path d="M64 112 h80 v48 q0 16 -16 16 h-48 q-16 0 -16 -16 z" fill="url(#knk-water)" />
      <path d="M72 96 q32 -10 64 0" stroke="#FFFFFF" strokeWidth="4" fill="none" opacity="0.6" />
      {shadow(216, 182, 48, 9, 0.09)}
      <path d="M172 128 h88 a44 36 0 0 1 -88 0 z" fill="#F7F2E6" />
      <ellipse cx="216" cy="128" rx="44" ry="11" fill="url(#knk-milk)" />
      <path d="M260 134 q22 6 18 26" stroke="#E0D6C2" strokeWidth="8" fill="none" strokeLinecap="round" />
    </>
  ),
  toilet: (
    <>
      <rect width="300" height="220" fill="url(#knk-sky)" />
      <path d="M0 184 h300 v36 h-300 z" fill="url(#knk-grass)" />
      {shadow(150, 188, 66, 9, 0.14)}
      <path d="M72 88 l78 -40 l78 40 z" fill="url(#knk-red)" />
      <rect x="82" y="88" width="136" height="96" fill="#C9A86A" />
      <g stroke="#A98A52" strokeWidth="3"><path d="M82 112 h136 M82 140 h136 M82 164 h136" /></g>
      <rect x="124" y="118" width="52" height="66" rx="3" fill="url(#knk-wood)" />
      <circle cx="166" cy="152" r="4" fill="#C9A86A" />
      <path d="M136 100 h28 v14 h-28 z" fill="#F7F2E6" />
      <path d="M143 100 v14 M136 107 h28" stroke="#C9A86A" strokeWidth="2" />
    </>
  ),
  nosignal: (
    <>
      <rect width="300" height="220" fill="url(#knk-sky)" />
      <path d="M0 176 h300 v44 h-300 z" fill="url(#knk-grass)" />
      <path d="M142 86 h16 v90 h-16 z" fill="#8F8878" />
      <path d="M150 86 l-34 -34 h68 z" fill="#6E675C" />
      <g stroke="#4C6B4E" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.9">
        <path d="M188 66 q26 24 0 48" /><path d="M112 66 q-26 24 0 48" />
        <path d="M212 48 q40 36 0 72" opacity="0.6" /><path d="M88 48 q-40 36 0 72" opacity="0.6" />
      </g>
      <path d="M72 44 l156 136" stroke="url(#knk-red)" strokeWidth="14" strokeLinecap="round" />
    </>
  ),
  money: (
    <>
      {shadow(140, 176, 86, 12, 0.1)}
      <rect x="48" y="76" width="184" height="86" rx="10" fill="#4C6B4E" transform="rotate(-6 140 119)" />
      <rect x="62" y="90" width="156" height="58" rx="6" fill="#5C7D5C" transform="rotate(-6 140 119)" />
      <circle cx="140" cy="118" r="24" fill="#DDAE52" />
      <circle cx="140" cy="118" r="16" fill="#C08A2E" />
      <circle cx="226" cy="150" r="32" fill="#C08A2E" />
      <circle cx="226" cy="150" r="22" fill="#DDAE52" />
      <path d="M218 150 h16 M226 142 v16" stroke="#8E6420" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  family: (
    <>
      <rect width="300" height="220" fill="url(#knk-sky)" />
      <path d="M0 184 h300 v36 h-300 z" fill="url(#knk-grass)" />
      <circle cx="112" cy="70" r="26" fill="url(#knk-red)" />
      <path d="M68 184 q0 -54 44 -54 t44 54 z" fill="url(#knk-red)" />
      <circle cx="190" cy="104" r="20" fill="#2B4664" />
      <path d="M158 184 q0 -42 32 -42 t32 42 z" fill="#2B4664" />
      <path d="M148 150 q14 -12 28 -2" stroke="#8E2420" strokeWidth="7" fill="none" strokeLinecap="round" />
      <circle cx="252" cy="48" r="18" fill="url(#knk-sun)" />
    </>
  ),
};

/** Рисунок. `label` читают только программы чтения с экрана. */
export function Art({
  name,
  label,
  width = 200,
  className = "",
  bg = true,
}: { name: ArtName; label?: string; width?: number; className?: string; bg?: boolean }) {
  return (
    <svg
      viewBox="0 0 300 220"
      width={width}
      height={(width * 220) / 300}
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {bg && <rect width="300" height="220" fill="#EAE3D5" />}
      {ART[name]}
    </svg>
  );
}
