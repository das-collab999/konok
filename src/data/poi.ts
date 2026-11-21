// Точки на карте: города, достопримечательности, музеи, природа.
// Координаты приблизительные — карта показывает, где что находится,
// это не навигатор.

import type { L } from "@/lib/i18n";

export type PoiKind = "capital" | "city" | "sight" | "museum" | "nature";

export type Poi = {
  id: string;
  kind: PoiKind;
  lat: number;
  lng: number;
  name: L;
  note?: L;
  /** Ссылка на подробный рассказ, если он есть. */
  story?: string;
};

export const POI: Poi[] = [
  // ───────────────────────── города
  { id: "bishkek", kind: "capital", lat: 42.874, lng: 74.592,
    name: { ru: "Бишкек", en: "Bishkek", zh: "比什凯克" },
    note: { ru: "Столица, главный аэропорт Манас", en: "The capital, Manas airport", zh: "首都，玛纳斯机场" } },
  { id: "osh", kind: "city", lat: 40.528, lng: 72.796,
    name: { ru: "Ош", en: "Osh", zh: "奥什" },
    note: { ru: "Второй город страны, юг", en: "The country's second city, in the south", zh: "全国第二大城市，位于南部" } },
  { id: "karakol", kind: "city", lat: 42.490, lng: 78.393,
    name: { ru: "Каракол", en: "Karakol", zh: "卡拉科尔" },
    note: { ru: "База для трекинга и горных лыж", en: "Base for trekking and skiing", zh: "徒步与滑雪的大本营" } },
  { id: "naryn", kind: "city", lat: 41.428, lng: 75.991,
    name: { ru: "Нарын", en: "Naryn", zh: "纳伦" },
    note: { ru: "Ворота на Сон-Куль и Таш-Рабат", en: "Gateway to Son-Kul and Tash-Rabat", zh: "前往松湖与塔什拉巴特的门户" } },
  { id: "talas", kind: "city", lat: 42.522, lng: 72.242,
    name: { ru: "Талас", en: "Talas", zh: "塔拉斯" },
    note: { ru: "Долина Манаса", en: "The valley of Manas", zh: "玛纳斯河谷" } },
  { id: "jalalabad", kind: "city", lat: 40.933, lng: 72.996,
    name: { ru: "Джалал-Абад", en: "Jalal-Abad", zh: "贾拉拉巴德" } },
  { id: "batken", kind: "city", lat: 40.063, lng: 70.819,
    name: { ru: "Баткен", en: "Batken", zh: "巴特肯" } },
  { id: "cholpon-ata", kind: "city", lat: 42.650, lng: 77.083,
    name: { ru: "Чолпон-Ата", en: "Cholpon-Ata", zh: "乔尔蓬阿塔" },
    note: { ru: "Курортный берег Иссык-Куля", en: "The resort shore of Issyk-Kul", zh: "伊塞克湖度假海岸" } },
  { id: "balykchy", kind: "city", lat: 42.460, lng: 76.188,
    name: { ru: "Балыкчы", en: "Balykchy", zh: "巴雷克奇" } },
  { id: "tokmok", kind: "city", lat: 42.841, lng: 75.300,
    name: { ru: "Токмок", en: "Tokmok", zh: "托克马克" } },
  { id: "kochkor", kind: "city", lat: 42.216, lng: 75.752,
    name: { ru: "Кочкор", en: "Kochkor", zh: "科奇科尔" },
    note: { ru: "Село мастериц шырдака", en: "The village of shyrdak makers", zh: "什尔达克毡毯之乡" } },
  { id: "uzgen", kind: "city", lat: 40.769, lng: 73.300,
    name: { ru: "Узген", en: "Uzgen", zh: "乌兹根" },
    note: { ru: "Минарет и мавзолеи XI–XII веков", en: "Minaret and mausoleums of the 11th–12th centuries", zh: "11—12 世纪的宣礼塔与陵墓" } },

  // ───────────────────────── достопримечательности
  { id: "burana", kind: "sight", lat: 42.746, lng: 75.249, story: "burana",
    name: { ru: "Башня Бурана", en: "Burana Tower", zh: "布拉纳塔" },
    note: { ru: "Минарет X века и каменные балбалы", en: "A 10th-century minaret and stone balbals", zh: "10 世纪宣礼塔与石人像" } },
  { id: "tash-rabat", kind: "sight", lat: 40.820, lng: 75.310, story: "tash-rabat",
    name: { ru: "Таш-Рабат", en: "Tash-Rabat", zh: "塔什拉巴特" },
    note: { ru: "Каменный караван-сарай Шёлкового пути", en: "A stone caravanserai of the Silk Road", zh: "丝绸之路的石砌驿站" } },
  { id: "sulaiman", kind: "sight", lat: 40.523, lng: 72.790, story: "sulaiman",
    name: { ru: "Сулайман-Тоо", en: "Sulaiman-Too", zh: "苏莱曼圣山" },
    note: { ru: "Священная гора в Оше, наследие ЮНЕСКО", en: "The sacred mountain in Osh, UNESCO site", zh: "奥什圣山，世界遗产" } },
  { id: "jety-oguz", kind: "sight", lat: 42.333, lng: 78.233, story: "jety-oguz",
    name: { ru: "Джети-Огуз", en: "Jeti-Oguz", zh: "杰提奥古兹" },
    note: { ru: "Красные скалы «Семь быков»", en: "The red «Seven Bulls» cliffs", zh: "「七头牛」红色岩壁" } },
  { id: "skazka", kind: "sight", lat: 42.130, lng: 77.370,
    name: { ru: "Каньон Сказка", en: "Skazka canyon", zh: "童话峡谷" },
    note: { ru: "Глиняные башни у южного берега", en: "Clay towers near the south shore", zh: "南岸的黏土石林" } },
  { id: "petroglyphs", kind: "sight", lat: 42.657, lng: 77.100,
    name: { ru: "Петроглифы Чолпон-Аты", en: "Cholpon-Ata petroglyphs", zh: "乔尔蓬阿塔岩画" },
    note: { ru: "Наскальные рисунки под открытым небом", en: "Rock carvings in an open-air field", zh: "露天岩画群" } },
  { id: "manas-ordo", kind: "museum", lat: 42.631, lng: 72.070,
    name: { ru: "Манас-Ордо", en: "Manas-Ordo", zh: "玛纳斯陵园" },
    note: { ru: "Комплекс и музей эпоса «Манас»", en: "Complex and museum of the Manas epic", zh: "《玛纳斯》史诗纪念地与博物馆" } },
  { id: "history-museum", kind: "museum", lat: 42.876, lng: 74.604,
    name: { ru: "Исторический музей", en: "State History Museum", zh: "国家历史博物馆" },
    note: { ru: "Главный музей страны на площади Ала-Тоо", en: "The country's main museum on Ala-Too square", zh: "阿拉图广场上的国家博物馆" } },
  { id: "osh-museum", kind: "museum", lat: 40.521, lng: 72.788,
    name: { ru: "Музей в Сулайман-Тоо", en: "Sulaiman-Too museum", zh: "苏莱曼山博物馆" },
    note: { ru: "Музей в пещере внутри священной горы", en: "A museum inside a cave in the sacred mountain", zh: "圣山洞窟中的博物馆" } },

  // ───────────────────────── природа
  { id: "issyk-kul", kind: "nature", lat: 42.420, lng: 77.250, story: "issyk-kul",
    name: { ru: "Иссык-Куль", en: "Issyk-Kul", zh: "伊塞克湖" },
    note: { ru: "Второе по величине горное озеро мира", en: "The world's second-largest alpine lake", zh: "世界第二大高山湖" } },
  { id: "son-kul", kind: "nature", lat: 41.840, lng: 75.140, story: "son-kul",
    name: { ru: "Сон-Куль", en: "Son-Kul", zh: "松湖" },
    note: { ru: "Озеро на высоте 3016 м, летние джайлоо", en: "A lake at 3016 m with summer pastures", zh: "海拔 3016 米的湖泊与夏牧场" } },
  { id: "ala-archa", kind: "nature", lat: 42.566, lng: 74.483, story: "ala-archa",
    name: { ru: "Ала-Арча", en: "Ala-Archa", zh: "阿拉阿恰" },
    note: { ru: "Горный парк в часе от Бишкека", en: "A mountain park an hour from Bishkek", zh: "距比什凯克一小时的山地公园" } },
  { id: "arslanbob", kind: "nature", lat: 41.340, lng: 72.940, story: "arslanbob",
    name: { ru: "Арсланбоб", en: "Arslanbob", zh: "阿尔斯兰博布" },
    note: { ru: "Самый большой ореховый лес в мире", en: "The largest walnut forest in the world", zh: "世界最大的核桃林" } },
  { id: "sary-chelek", kind: "nature", lat: 41.858, lng: 71.955,
    name: { ru: "Сары-Челек", en: "Sary-Chelek", zh: "萨雷切列克" },
    note: { ru: "Биосферный заповедник и озеро", en: "A biosphere reserve and lake", zh: "生物圈保护区与湖泊" } },
  { id: "altyn-arashan", kind: "nature", lat: 42.380, lng: 78.630,
    name: { ru: "Алтын-Арашан", en: "Altyn-Arashan", zh: "阿尔金阿拉善" },
    note: { ru: "Горячие источники в ущелье над Караколом", en: "Hot springs in a gorge above Karakol", zh: "卡拉科尔上方峡谷中的温泉" } },
  { id: "kel-suu", kind: "nature", lat: 40.383, lng: 76.520,
    name: { ru: "Кёль-Суу", en: "Kel-Suu", zh: "科尔苏湖" },
    note: { ru: "Озеро у китайской границы, нужен пропуск", en: "A lake by the Chinese border; a permit is required", zh: "中吉边境附近的湖泊，需要通行证" } },
  { id: "lenin-peak", kind: "nature", lat: 39.420, lng: 72.880,
    name: { ru: "Пик Ленина", en: "Lenin Peak", zh: "列宁峰" },
    note: { ru: "7134 м, базовый лагерь в Алайской долине", en: "7134 m, base camp in the Alay valley", zh: "海拔 7134 米，大本营在阿赖谷" } },
  { id: "barskoon", kind: "nature", lat: 42.150, lng: 77.600,
    name: { ru: "Барскоон", en: "Barskoon", zh: "巴尔斯昆" },
    note: { ru: "Водопады и дорога на высокогорье", en: "Waterfalls and the road to the high plateau", zh: "瀑布与通往高原的道路" } },
  { id: "chon-kemin", kind: "nature", lat: 42.760, lng: 76.080,
    name: { ru: "Чон-Кемин", en: "Chon-Kemin", zh: "琼克明" },
    note: { ru: "Долина и национальный парк рядом с Бишкеком", en: "A valley and national park near Bishkek", zh: "比什凯克附近的河谷与国家公园" } },
];

export const POI_KINDS: { kind: PoiKind; color: string; label: L }[] = [
  { kind: "capital", color: "#16130F", label: { ru: "Столица", en: "Capital", zh: "首都" } },
  { kind: "city", color: "#6B6253", label: { ru: "Города и сёла", en: "Cities and towns", zh: "城市与村镇" } },
  { kind: "sight", color: "#B57F2A", label: { ru: "Достопримечательности", en: "Landmarks", zh: "名胜古迹" } },
  { kind: "museum", color: "#2B4664", label: { ru: "Музеи", en: "Museums", zh: "博物馆" } },
  { kind: "nature", color: "#45614A", label: { ru: "Природа", en: "Nature", zh: "自然景观" } },
];
