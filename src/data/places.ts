// Тестовые данные. Места, семьи и цены — примеры.
// Тексты хранятся на трёх языках; позже это переедет в таблицу place_translations.

import type { L } from "@/lib/i18n";

export type Region = "issyk" | "naryn" | "chui" | "jalal";

export type Place = {
  slug: string;
  type: "yurt" | "house";
  region: Region;
  place: L;
  title: L;
  short: L;
  pricePerPersonUsd: number;
  altitudeM: number;
  /** Координаты для карты. */
  lat: number;
  lng: number;
  /** Сезон: с какого по какой месяц принимают гостей. */
  seasonFrom: number;
  seasonTo: number;
  /** Сколько ехать от Бишкека, часов. */
  hoursFromBishkek: number;
  hasStove: boolean;
  hasBath: boolean;
  hasSignal: boolean;
  carAccess: "car" | "4x4";
  toilet: L;
  wash: L;
  net: L;
  roadType: L;
  road: L;
  host: L;
  story: L;
  /** Настоящая фотография, когда место отснято. Иначе рисуется пейзаж. */
  photo?: string;
  palette: { sky: string; mountains: string; hills: string };
};

export const REGIONS: { key: Region | "all"; label: L }[] = [
  { key: "all", label: { ru: "Все регионы", en: "All regions", zh: "全部地区" } },
  { key: "issyk", label: { ru: "Иссык-Куль", en: "Issyk-Kul", zh: "伊塞克湖" } },
  { key: "naryn", label: { ru: "Нарын", en: "Naryn", zh: "纳伦" } },
  { key: "chui", label: { ru: "Чуй", en: "Chui", zh: "楚河" } },
  { key: "jalal", label: { ru: "Джалал-Абад", en: "Jalal-Abad", zh: "贾拉拉巴德" } },
];

export const PLACES: Place[] = [
  {
    slug: "sonkul-aseke", type: "yurt", region: "naryn",
    place: { ru: "Сон-Куль, Нарын", en: "Son-Kul, Naryn", zh: "松湖，纳伦" },
    title: {
      ru: "Юрты семьи Асеке на берегу Сон-Куля",
      en: "The Aseke family yurts on the shore of Son-Kul",
      zh: "阿谢克一家在松湖畔的毡房",
    },
    short: {
      ru: "Три юрты у самого озера, кумыс по утрам и табун лошадей вокруг.",
      en: "Three yurts right by the lake, kumys in the mornings and a herd of horses around.",
      zh: "湖边三顶毡房，清晨有马奶酒，四周是马群。",
    },
    pricePerPersonUsd: 25, altitudeM: 3016, lat: 41.84, lng: 75.14, seasonFrom: 6, seasonTo: 9, hoursFromBishkek: 6, hasStove: true, hasBath: true, hasSignal: false, carAccess: "4x4",
    toilet: { ru: "Снаружи, 30 м", en: "Outside, 30 m away", zh: "屋外，30 米" },
    wash: { ru: "Баня по вечерам", en: "Banya in the evenings", zh: "晚上有蒸浴" },
    net: { ru: "Нет связи", en: "No signal", zh: "无信号" },
    roadType: { ru: "Только внедорожник", en: "4×4 only", zh: "仅限越野车" },
    road: {
      ru: "От Бишкека около 6 часов через Кочкор и перевал Калмак-Ашуу. Дорога на перевал грунтовая — нужен внедорожник, трансфер можно добавить к брони.",
      en: "About 6 hours from Bishkek via Kochkor and the Kalmak-Ashuu pass. The pass road is gravel — you need a 4×4, and a transfer can be added to the booking.",
      zh: "从比什凯克经科奇科尔和卡尔马克-阿舒山口约 6 小时。山口路段为砂石路，需要越野车，可在预订时加订接送。",
    },
    host: { ru: "Семья Асеке", en: "The Aseke family", zh: "阿谢克一家" },
    story: {
      ru: "Асеке-апа и её сын Нурлан каждое лето уже 20 лет поднимаются на джайлоо со своими лошадьми и овцами. Вечером — бешбармак, по утрам — свежий кумыс и боорсоки. Нурлан покажет, как седлать коня.",
      en: "Aseke-apa and her son Nurlan have been taking their horses and sheep up to the summer pasture every year for twenty years. Beshbarmak in the evening, fresh kumys and boorsok in the morning. Nurlan will show you how to saddle a horse.",
      zh: "阿谢克大娘和儿子努尔兰二十年来每个夏天都赶着马群和羊群上牧场。晚上吃别什巴尔马克，早上是鲜马奶酒和油馃。努尔兰会教你备马。",
    },
    palette: { sky: "#b9ae9c", mountains: "#bdb3a1", hills: "#938a79" },
  },
  {
    slug: "tash-rabat", type: "yurt", region: "naryn",
    place: { ru: "Таш-Рабат, Нарын", en: "Tash-Rabat, Naryn", zh: "塔什拉巴特，纳伦" },
    title: {
      ru: "Юртовый лагерь у караван-сарая Таш-Рабат",
      en: "Yurt camp by the Tash-Rabat caravanserai",
      zh: "塔什拉巴特商旅驿站旁的毡房营地",
    },
    short: {
      ru: "Ночлег рядом с каменным караван-сараем Великого шёлкового пути.",
      en: "A night beside the stone caravanserai of the Great Silk Road.",
      zh: "夜宿丝绸之路的石砌驿站旁。",
    },
    pricePerPersonUsd: 30, altitudeM: 3200, lat: 40.82, lng: 75.31, seasonFrom: 5, seasonTo: 10, hoursFromBishkek: 7, hasStove: true, hasBath: false, hasSignal: false, carAccess: "car",
    toilet: { ru: "Снаружи, 20 м", en: "Outside, 20 m away", zh: "屋外，20 米" },
    wash: { ru: "Умывальник", en: "Wash basin", zh: "洗手盆" },
    net: { ru: "Нет связи", en: "No signal", zh: "无信号" },
    roadType: { ru: "Обычная машина летом", en: "Ordinary car in summer", zh: "夏季普通轿车可达" },
    road: {
      ru: "От Нарына около 2,5 часа по асфальту и хорошей грунтовке. Летом проезжает обычная машина.",
      en: "About 2.5 hours from Naryn on asphalt and a good gravel road. In summer an ordinary car makes it.",
      zh: "从纳伦出发约 2.5 小时，柏油路加良好砂石路。夏季普通轿车即可到达。",
    },
    host: { ru: "Семья Жумабека", en: "The Jumabek family", zh: "朱马别克一家" },
    story: {
      ru: "Жумабек родился в этой долине и знает о караван-сарае больше любого путеводителя. Его жена Айгуль готовит лагман на костре и учит гостей делать курут.",
      en: "Jumabek was born in this valley and knows more about the caravanserai than any guidebook. His wife Aigul cooks lagman over the fire and teaches guests to make kurut.",
      zh: "朱马别克在这条山谷出生，对驿站的了解胜过任何旅行指南。妻子艾古丽用柴火做拉条子，并教客人做奶疙瘩。",
    },
    palette: { sky: "#b9ae9c", mountains: "#bdb3a1", hills: "#938a79" },
  },
  {
    slug: "jety-oguz", type: "yurt", region: "issyk",
    place: { ru: "Джети-Огуз, Иссык-Куль", en: "Jeti-Oguz, Issyk-Kul", zh: "杰提奥古兹，伊塞克湖" },
    title: { ru: "Юрты в ущелье Джети-Огуз", en: "Yurts in the Jeti-Oguz gorge", zh: "杰提奥古兹峡谷的毡房" },
    short: {
      ru: "Красные скалы «Семь быков», ели и горная река рядом с юртой.",
      en: "The red «Seven Bulls» cliffs, spruce forest and a mountain river by the yurt.",
      zh: "「七头牛」红色岩壁、云杉林，毡房旁就是山溪。",
    },
    pricePerPersonUsd: 22, altitudeM: 2200, lat: 42.33, lng: 78.23, seasonFrom: 5, seasonTo: 10, hoursFromBishkek: 7, hasStove: true, hasBath: true, hasSignal: true, carAccess: "car",
    toilet: { ru: "Внутри лагеря", en: "Inside the camp", zh: "营地内" },
    wash: { ru: "Душ и баня", en: "Shower and banya", zh: "淋浴与蒸浴" },
    net: { ru: "Есть 4G", en: "4G available", zh: "有 4G" },
    roadType: { ru: "Обычная машина", en: "Ordinary car", zh: "普通轿车" },
    road: {
      ru: "От Каракола 40 минут по асфальту. Можно доехать на такси.",
      en: "40 minutes from Karakol on asphalt. A taxi will take you there.",
      zh: "从卡拉科尔出发 40 分钟柏油路，打车即可到达。",
    },
    host: { ru: "Семья Бакыта", en: "The Bakyt family", zh: "巴克特一家" },
    story: {
      ru: "Бакыт — бывший чабан, теперь водит конные маршруты к водопаду. Дети помогают в лагере и с удовольствием учат гостей кыргызским словам.",
      en: "Bakyt used to be a shepherd and now leads horse rides to the waterfall. The children help around the camp and love teaching guests Kyrgyz words.",
      zh: "巴克特曾是牧人，如今带客人骑马去瀑布。孩子们在营地帮忙，喜欢教客人说吉尔吉斯语。",
    },
    palette: { sky: "#b9ae9c", mountains: "#bdb3a1", hills: "#938a79" },
  },
  {
    slug: "tamga", type: "yurt", region: "issyk",
    place: { ru: "Тамга, южный берег Иссык-Куля", en: "Tamga, south shore of Issyk-Kul", zh: "塔姆加，伊塞克湖南岸" },
    title: { ru: "Юрты у воды на южном берегу", en: "Yurts by the water on the south shore", zh: "南岸湖边的毡房" },
    short: {
      ru: "Тихий пляж, вид на снежные горы и купание в Иссык-Куле.",
      en: "A quiet beach, a view of snowy peaks and swimming in Issyk-Kul.",
      zh: "安静的湖滩，雪山在望，可在伊塞克湖游泳。",
    },
    pricePerPersonUsd: 28, altitudeM: 1610, lat: 42.15, lng: 77.56, seasonFrom: 5, seasonTo: 9, hoursFromBishkek: 5, hasStove: false, hasBath: true, hasSignal: true, carAccess: "car",
    toilet: { ru: "Внутри лагеря", en: "Inside the camp", zh: "营地内" },
    wash: { ru: "Душ", en: "Shower", zh: "淋浴" },
    net: { ru: "Есть 4G", en: "4G available", zh: "有 4G" },
    roadType: { ru: "Обычная машина", en: "Ordinary car", zh: "普通轿车" },
    road: {
      ru: "От Бишкека около 5 часов по асфальту вдоль южного берега.",
      en: "About 5 hours from Bishkek on asphalt along the south shore.",
      zh: "从比什凯克沿南岸柏油路约 5 小时。",
    },
    host: { ru: "Семья Гульнары", en: "The Gulnara family", zh: "古尔娜拉一家" },
    story: {
      ru: "Гульнара открыла лагерь вместе с сестрой. Рыба с озера, свежие абрикосы из сада и долгие разговоры у костра.",
      en: "Gulnara opened the camp together with her sister. Fish from the lake, apricots from the garden and long conversations by the fire.",
      zh: "古尔娜拉和姐妹一起经营营地。湖里的鱼、园中的杏子，还有篝火边的长谈。",
    },
    palette: { sky: "#b9ae9c", mountains: "#bdb3a1", hills: "#938a79" },
  },
  {
    slug: "karakol-archa", type: "house", region: "issyk",
    place: { ru: "Каракол, Иссык-Куль", en: "Karakol, Issyk-Kul", zh: "卡拉科尔，伊塞克湖" },
    title: { ru: "Гостевой дом «Арча» в Караколе", en: "Archa guesthouse in Karakol", zh: "卡拉科尔「阿尔恰」民宿" },
    short: {
      ru: "Уютный дом с садом, рядом трекинги и зимой — горнолыжная база.",
      en: "A cosy house with a garden, trekking routes nearby and a ski base in winter.",
      zh: "带花园的舒适小屋，附近有徒步路线，冬天还有滑雪场。",
    },
    pricePerPersonUsd: 18, altitudeM: 1770, lat: 42.49, lng: 78.39, seasonFrom: 1, seasonTo: 12, hoursFromBishkek: 7, hasStove: true, hasBath: false, hasSignal: true, carAccess: "car",
    toilet: { ru: "В доме", en: "Indoors", zh: "屋内" },
    wash: { ru: "Горячий душ", en: "Hot shower", zh: "热水淋浴" },
    net: { ru: "Wi-Fi", en: "Wi-Fi", zh: "Wi-Fi" },
    roadType: { ru: "Обычная машина", en: "Ordinary car", zh: "普通轿车" },
    road: {
      ru: "Центр Каракола, 10 минут пешком от автовокзала.",
      en: "Central Karakol, a 10-minute walk from the bus station.",
      zh: "卡拉科尔市中心，距汽车站步行 10 分钟。",
    },
    host: { ru: "Семья Эрмека", en: "The Ermek family", zh: "埃尔梅克一家" },
    story: {
      ru: "Эрмек — горный гид, его жена Чолпон печёт лучшие боорсоки на улице. Помогут с маршрутом в Алтын-Арашан и арендой снаряжения.",
      en: "Ermek is a mountain guide; his wife Cholpon bakes the best boorsok on the street. They will help plan a trip to Altyn-Arashan and rent gear.",
      zh: "埃尔梅克是山地向导，妻子乔尔蓬烤的油馃是这条街最好的。他们会帮你安排去阿尔金阿拉善的行程和装备租赁。",
    },
    palette: { sky: "#b9ae9c", mountains: "#bdb3a1", hills: "#938a79" },
  },
  {
    slug: "chon-kemin", type: "house", region: "chui",
    place: { ru: "Чон-Кемин, Чуй", en: "Chon-Kemin, Chui", zh: "琼克明，楚河" },
    title: { ru: "Дом у реки в долине Чон-Кемин", en: "A house by the river in the Chon-Kemin valley", zh: "琼克明河谷的河边小屋" },
    short: {
      ru: "Рафтинг, конные прогулки и национальный парк в 2,5 часах от Бишкека.",
      en: "Rafting, horse rides and a national park 2.5 hours from Bishkek.",
      zh: "漂流、骑马与国家公园，距比什凯克 2.5 小时。",
    },
    pricePerPersonUsd: 20, altitudeM: 1500, lat: 42.76, lng: 76.08, seasonFrom: 4, seasonTo: 11, hoursFromBishkek: 3, hasStove: true, hasBath: true, hasSignal: true, carAccess: "car",
    toilet: { ru: "В доме", en: "Indoors", zh: "屋内" },
    wash: { ru: "Душ и баня", en: "Shower and banya", zh: "淋浴与蒸浴" },
    net: { ru: "Есть 4G", en: "4G available", zh: "有 4G" },
    roadType: { ru: "Обычная машина", en: "Ordinary car", zh: "普通轿车" },
    road: {
      ru: "От Бишкека около 2,5 часа по асфальту.",
      en: "About 2.5 hours from Bishkek on asphalt.",
      zh: "从比什凯克走柏油路约 2.5 小时。",
    },
    host: { ru: "Семья Айбека", en: "The Aibek family", zh: "艾别克一家" },
    story: {
      ru: "Айбек построил дом своими руками из местного дерева. Вечером — баня и чай из горных трав.",
      en: "Aibek built the house himself from local timber. In the evening there is a banya and tea from mountain herbs.",
      zh: "艾别克用当地木料亲手盖了这座房子。晚上可以蒸浴，喝山草茶。",
    },
    palette: { sky: "#b9ae9c", mountains: "#bdb3a1", hills: "#938a79" },
  },
  {
    slug: "arslanbob", type: "house", region: "jalal",
    place: { ru: "Арсланбоб, Джалал-Абад", en: "Arslanbob, Jalal-Abad", zh: "阿尔斯兰博布，贾拉拉巴德" },
    title: { ru: "Гостевой дом в ореховом лесу", en: "A guesthouse in the walnut forest", zh: "核桃林中的民宿" },
    short: {
      ru: "Самый большой ореховый лес в мире, водопады и южное гостеприимство.",
      en: "The largest walnut forest in the world, waterfalls and southern hospitality.",
      zh: "世界最大的核桃林、瀑布，以及南方的热情款待。",
    },
    pricePerPersonUsd: 15, altitudeM: 1600, lat: 41.34, lng: 72.94, seasonFrom: 3, seasonTo: 11, hoursFromBishkek: 10, hasStove: false, hasBath: false, hasSignal: true, carAccess: "car",
    toilet: { ru: "Во дворе", en: "In the yard", zh: "院内" },
    wash: { ru: "Душ", en: "Shower", zh: "淋浴" },
    net: { ru: "Есть 3G", en: "3G available", zh: "有 3G" },
    roadType: { ru: "Обычная машина", en: "Ordinary car", zh: "普通轿车" },
    road: {
      ru: "От Джалал-Абада около 1,5 часа. Из Бишкека удобнее лететь в Ош или Джалал-Абад.",
      en: "About 1.5 hours from Jalal-Abad. From Bishkek it is easier to fly to Osh or Jalal-Abad.",
      zh: "从贾拉拉巴德出发约 1.5 小时。从比什凯克建议飞往奥什或贾拉拉巴德。",
    },
    host: { ru: "Семья Ибрагима", en: "The Ibragim family", zh: "易卜拉欣一家" },
    story: {
      ru: "Семья Ибрагима собирает грецкие орехи уже несколько поколений. Гостей кормят пловом и угощают мёдом с орехами.",
      en: "The Ibragim family has been gathering walnuts for generations. Guests are fed plov and treated to honey with nuts.",
      zh: "易卜拉欣一家采收核桃已有几代人。招待客人吃手抓饭，配蜂蜜核桃。",
    },
    palette: { sky: "#b9ae9c", mountains: "#bdb3a1", hills: "#938a79" },
  },
];

export type Extra = { id: string; label: L; priceUsd: number; per: "trip" | "guest" };

export const EXTRAS: Extra[] = [
  { id: "transfer", label: { ru: "Трансфер из Бишкека и обратно", en: "Transfer from Bishkek and back", zh: "比什凯克往返接送" }, priceUsd: 120, per: "trip" },
  { id: "horse", label: { ru: "Конная прогулка, 3 часа", en: "Horse ride, 3 hours", zh: "骑马 3 小时" }, priceUsd: 15, per: "guest" },
  { id: "felt", label: { ru: "Мастер-класс по войлоку", en: "Felt-making workshop", zh: "擀毡手作体验" }, priceUsd: 10, per: "guest" },
  { id: "beshbarmak", label: { ru: "Готовим бешбармак с семьёй", en: "Cook beshbarmak with the family", zh: "与主人家一起做别什巴尔马克" }, priceUsd: 12, per: "guest" },
];

export function getPlace(slug: string): Place | undefined {
  return PLACES.find((p) => p.slug === slug);
}

/** Цена = за человека за ночь × ночи × гости + доп. услуги. */
export function calcTotal(place: Place, nights: number, guests: number, extraIds: string[]) {
  const base = place.pricePerPersonUsd * nights * guests;
  const lines: { id: string; usd: number }[] = [{ id: "base", usd: base }];
  let total = base;
  for (const x of EXTRAS) {
    if (!extraIds.includes(x.id)) continue;
    const cost = x.per === "trip" ? x.priceUsd : x.priceUsd * guests;
    total += cost;
    lines.push({ id: x.id, usd: cost });
  }
  return { lines, total };
}

/** Примерный курс: цены в долларах, но платят в сомах. */
export const KGS_PER_USD = 89;

export const toSom = (usd: number) => Math.round((usd * KGS_PER_USD) / 10) * 10;

/** Демонстрационный номер брони. В рабочем сайте его выдаёт сервер. */
export function bookingCode(place: Place, nights: number, guests: number) {
  return "KNK-" + (24800 + place.pricePerPersonUsd * 7 + nights * 13 + guests);
}
