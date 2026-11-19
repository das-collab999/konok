// Test data for the MVP. These places, families and prices are EXAMPLES.
// Later this moves to the database (see README, section 4).

export type Region = "issyk" | "naryn" | "chui" | "jalal";

export type Place = {
  slug: string;
  type: "yurt" | "house";
  region: Region;
  place: string;
  title: string;
  short: string;
  pricePerPersonUsd: number;
  altitudeM: number;
  hasStove: boolean;
  hasBath: boolean;
  hasSignal: boolean;
  carAccess: "car" | "4x4";
  toilet: string;
  wash: string;
  net: string;
  roadType: string;
  road: string;
  host: string;
  story: string;
  palette: { sky: string; mountains: string; hills: string };
};

export const REGIONS: { key: Region | "all"; label: string }[] = [
  { key: "all", label: "Все регионы" },
  { key: "issyk", label: "Иссык-Куль" },
  { key: "naryn", label: "Нарын" },
  { key: "chui", label: "Чуй" },
  { key: "jalal", label: "Джалал-Абад" },
];

export const PLACES: Place[] = [
  {
    slug: "sonkul-aseke", type: "yurt", region: "naryn", place: "Сон-Куль, Нарын",
    title: "Юрты семьи Асеке на берегу Сон-Куля",
    short: "Три юрты у самого озера, кумыс по утрам и табун лошадей вокруг.",
    pricePerPersonUsd: 25, altitudeM: 3016, hasStove: true, hasBath: true, hasSignal: false, carAccess: "4x4",
    toilet: "Снаружи, 30 м", wash: "Баня по вечерам", net: "Нет связи", roadType: "Только внедорожник",
    road: "От Бишкека около 6 часов через Кочкор и перевал Калмак-Ашуу. Дорога на перевал грунтовая — нужен внедорожник, трансфер можно добавить к брони.",
    host: "Семья Асеке",
    story: "Асеке-апа и её сын Нурлан каждое лето уже 20 лет поднимаются на джайлоо со своими лошадьми и овцами. Вечером — бешбармак, по утрам — свежий кумыс и боорсоки. Нурлан покажет, как седлать коня.",
    palette: { sky: "#7FB3D5", mountains: "#5B7F9E", hills: "#6E9A4F" },
  },
  {
    slug: "tash-rabat", type: "yurt", region: "naryn", place: "Таш-Рабат, Нарын",
    title: "Юртовый лагерь у караван-сарая Таш-Рабат",
    short: "Ночлег рядом с каменным караван-сараем Великого шёлкового пути.",
    pricePerPersonUsd: 30, altitudeM: 3200, hasStove: true, hasBath: false, hasSignal: false, carAccess: "car",
    toilet: "Снаружи, 20 м", wash: "Умывальник", net: "Нет связи", roadType: "Обычная машина летом",
    road: "От Нарына около 2,5 часа по асфальту и хорошей грунтовке. Летом проезжает обычная машина.",
    host: "Семья Жумабека",
    story: "Жумабек родился в этой долине и знает о караван-сарае больше любого путеводителя. Его жена Айгуль готовит лагман на костре и учит гостей делать курут.",
    palette: { sky: "#9CC3DE", mountains: "#7A8F99", hills: "#8DA65A" },
  },
  {
    slug: "jety-oguz", type: "yurt", region: "issyk", place: "Джети-Огуз, Иссык-Куль",
    title: "Юрты в ущелье Джети-Огуз",
    short: "Красные скалы «Семь быков», ели и горная река рядом с юртой.",
    pricePerPersonUsd: 22, altitudeM: 2200, hasStove: true, hasBath: true, hasSignal: true, carAccess: "car",
    toilet: "Внутри лагеря", wash: "Душ и баня", net: "Есть 4G", roadType: "Обычная машина",
    road: "От Каракола 40 минут по асфальту. Можно доехать на такси.",
    host: "Семья Бакыта",
    story: "Бакыт — бывший чабан, теперь водит конные маршруты к водопаду. Дети помогают в лагере и с удовольствием учат гостей кыргызским словам.",
    palette: { sky: "#8CC0E0", mountains: "#B35A3C", hills: "#4E7F45" },
  },
  {
    slug: "tamga", type: "yurt", region: "issyk", place: "Тамга, южный берег Иссык-Куля",
    title: "Юрты у воды на южном берегу",
    short: "Тихий пляж, вид на снежные горы и купание в Иссык-Куле.",
    pricePerPersonUsd: 28, altitudeM: 1610, hasStove: false, hasBath: true, hasSignal: true, carAccess: "car",
    toilet: "Внутри лагеря", wash: "Душ", net: "Есть 4G", roadType: "Обычная машина",
    road: "От Бишкека около 5 часов по асфальту вдоль южного берега.",
    host: "Семья Гульнары",
    story: "Гульнара открыла лагерь вместе с сестрой. Рыба с озера, свежие абрикосы из сада и долгие разговоры у костра.",
    palette: { sky: "#9ED0EA", mountains: "#6C8CA6", hills: "#D9C38E" },
  },
  {
    slug: "karakol-archa", type: "house", region: "issyk", place: "Каракол, Иссык-Куль",
    title: "Гостевой дом «Арча» в Караколе",
    short: "Уютный дом с садом, рядом трекинги и зимой — горнолыжная база.",
    pricePerPersonUsd: 18, altitudeM: 1770, hasStove: true, hasBath: false, hasSignal: true, carAccess: "car",
    toilet: "В доме", wash: "Горячий душ", net: "Wi-Fi", roadType: "Обычная машина",
    road: "Центр Каракола, 10 минут пешком от автовокзала.",
    host: "Семья Эрмека",
    story: "Эрмек — горный гид, его жена Чолпон печёт лучшие боорсоки на улице. Помогут с маршрутом в Алтын-Арашан и арендой снаряжения.",
    palette: { sky: "#A8CBE3", mountains: "#68839A", hills: "#5F8B4A" },
  },
  {
    slug: "chon-kemin", type: "house", region: "chui", place: "Чон-Кемин, Чуй",
    title: "Дом у реки в долине Чон-Кемин",
    short: "Рафтинг, конные прогулки и национальный парк в 2,5 часах от Бишкека.",
    pricePerPersonUsd: 20, altitudeM: 1500, hasStove: true, hasBath: true, hasSignal: true, carAccess: "car",
    toilet: "В доме", wash: "Душ и баня", net: "Есть 4G", roadType: "Обычная машина",
    road: "От Бишкека около 2,5 часа по асфальту.",
    host: "Семья Айбека",
    story: "Айбек построил дом своими руками из местного дерева. Вечером — баня и чай из горных трав.",
    palette: { sky: "#93C2DD", mountains: "#7393A8", hills: "#5D9150" },
  },
  {
    slug: "arslanbob", type: "house", region: "jalal", place: "Арсланбоб, Джалал-Абад",
    title: "Гостевой дом в ореховом лесу",
    short: "Самый большой ореховый лес в мире, водопады и южное гостеприимство.",
    pricePerPersonUsd: 15, altitudeM: 1600, hasStove: false, hasBath: false, hasSignal: true, carAccess: "car",
    toilet: "Во дворе", wash: "Душ", net: "Есть 3G", roadType: "Обычная машина",
    road: "От Джалал-Абада около 1,5 часа. Из Бишкека удобнее лететь в Ош или Джалал-Абад.",
    host: "Семья Ибрагима",
    story: "Семья Ибрагима собирает грецкие орехи уже несколько поколений. Гостей кормят пловом и угощают мёдом с орехами.",
    palette: { sky: "#A5CFE6", mountains: "#7C9A86", hills: "#4E7A3A" },
  },
];

export type Extra = { id: string; label: string; priceUsd: number; per: "trip" | "guest" };

export const EXTRAS: Extra[] = [
  { id: "transfer", label: "Трансфер из Бишкека и обратно", priceUsd: 120, per: "trip" },
  { id: "horse", label: "Конная прогулка, 3 часа", priceUsd: 15, per: "guest" },
  { id: "felt", label: "Мастер-класс по войлоку", priceUsd: 10, per: "guest" },
  { id: "beshbarmak", label: "Готовим бешбармак с семьёй", priceUsd: 12, per: "guest" },
];

export function getPlace(slug: string): Place | undefined {
  return PLACES.find((p) => p.slug === slug);
}

/** Price = per person per night × nights × guests + extras. */
export function calcTotal(place: Place, nights: number, guests: number, extraIds: string[]) {
  const base = place.pricePerPersonUsd * nights * guests;
  const lines = [{ label: `$${place.pricePerPersonUsd} × ${nights} ноч. × ${guests} гост.`, usd: base }];
  let total = base;
  for (const x of EXTRAS) {
    if (!extraIds.includes(x.id)) continue;
    const cost = x.per === "trip" ? x.priceUsd : x.priceUsd * guests;
    total += cost;
    lines.push({ label: x.label, usd: cost });
  }
  return { lines, total };
}

/** Demo booking code. In the real app the server creates it. */
export function bookingCode(place: Place, nights: number, guests: number) {
  return "KNK-" + (24800 + place.pricePerPersonUsd * 7 + nights * 13 + guests);
}
