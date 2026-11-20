// Справочник для туриста на трёх языках: еда, дорога, условия, безопасность, слова.
// В базе этому соответствуют таблицы meals, transport_options и contacts.

import type { L } from "@/lib/i18n";

export type MealKind = "dinner" | "breakfast" | "snack" | "drink";

export type Meal = { title: L; kind: MealKind; text: L; vegetarian?: boolean; note?: L };

export const MEALS: Meal[] = [
  {
    kind: "dinner", title: { ru: "Бешбармак", en: "Beshbarmak", zh: "别什巴尔马克" },
    text: {
      ru: "Главное блюдо кочевников: тонко раскатанное тесто, варёная баранина и бульон-шорпо. Едят руками из общего блюда — это знак того, что вы за столом свои.",
      en: "The main nomad dish: thin rolled dough, boiled mutton and shorpo broth. Eaten with your hands from a shared plate — a sign that you belong at this table.",
      zh: "游牧民族的主菜：擀得极薄的面片、煮羊肉和肉汤。大家用手从同一个盘子里吃——这表示你已是自家人。",
    },
  },
  {
    kind: "dinner", title: { ru: "Лагман", en: "Lagman", zh: "拉条子" }, vegetarian: true,
    note: { ru: "Бывает вегетарианским", en: "Can be meat-free", zh: "可做素食" },
    text: {
      ru: "Лапшу тянут руками при вас. С мясом и овощами; вегетарианский вариант сделают, если предупредить с утра.",
      en: "The noodles are pulled by hand in front of you. With meat and vegetables; a meat-free version is made if you ask in the morning.",
      zh: "面条当面手工拉制，配肉和蔬菜；早上提前说一声可做素的。",
    },
  },
  {
    kind: "dinner", title: { ru: "Куурдак", en: "Kuurdak", zh: "库尔达克炒肉" },
    text: {
      ru: "Мясо, лук и картошка, обжаренные в казане на костре. Готовится быстро — его подают, если вы приехали поздно.",
      en: "Meat, onion and potato fried in a cauldron over the fire. Quick to make — served if you arrive late.",
      zh: "肉、洋葱和土豆在柴火锅里爆炒。做得快，晚到的客人常吃这道。",
    },
  },
  {
    kind: "dinner", title: { ru: "Плов", en: "Plov", zh: "手抓饭" },
    text: {
      ru: "Рис с морковью и мясом. На юге, в Арсланбобе, в плов добавляют грецкий орех из местного леса.",
      en: "Rice with carrot and meat. In the south, in Arslanbob, walnuts from the local forest go into it.",
      zh: "米饭配胡萝卜和肉。在南部的阿尔斯兰博布，还会加当地核桃。",
    },
  },
  {
    kind: "dinner", title: { ru: "Манты", en: "Manty", zh: "蒸包" }, vegetarian: true,
    note: { ru: "Тыквенные — без мяса", en: "Pumpkin ones are meat-free", zh: "南瓜馅为素" },
    text: {
      ru: "Паровые пельмени с мясом и луком. Тыквенные манты — полностью вегетарианские.",
      en: "Steamed dumplings with meat and onion. Pumpkin manty are fully vegetarian.",
      zh: "肉馅洋葱蒸包。南瓜馅则是全素。",
    },
  },
  {
    kind: "breakfast", title: { ru: "Боорсок", en: "Boorsok", zh: "油馃" }, vegetarian: true,
    text: {
      ru: "Румяные кусочки жареного теста. Подают к каждому чаю вместе с каймаком и вареньем.",
      en: "Golden pieces of fried dough. Served with every tea alongside kaymak and jam.",
      zh: "金黄的油炸面块。每次喝茶都会配上，佐以奶皮和果酱。",
    },
  },
  {
    kind: "breakfast", title: { ru: "Каймак с мёдом", en: "Kaymak with honey", zh: "奶皮配蜂蜜" }, vegetarian: true,
    text: {
      ru: "Густые сливки с горным мёдом и свежим хлебом. Молоко — от коров, которые паслись в двухстах метрах от юрты.",
      en: "Thick cream with mountain honey and fresh bread. The milk comes from cows grazing two hundred metres from the yurt.",
      zh: "浓厚奶皮配山蜂蜜和新鲜面包。牛奶来自毡房两百米外吃草的牛。",
    },
  },
  {
    kind: "breakfast", title: { ru: "Шорпо", en: "Shorpo", zh: "羊肉汤" },
    text: {
      ru: "Наваристый суп на баранине с картошкой и зеленью. Утром в горах согревает лучше кофе.",
      en: "A rich mutton soup with potato and herbs. In the mountains it warms you better than coffee.",
      zh: "浓郁的羊肉土豆汤，撒上香草。山里的早晨比咖啡更暖身。",
    },
  },
  {
    kind: "snack", title: { ru: "Курут", en: "Kurut", zh: "奶疙瘩" }, vegetarian: true,
    text: {
      ru: "Солёные сухие шарики из кислого молока. Берут в дорогу: хранятся месяцами и утоляют жажду.",
      en: "Salty dried balls of sour milk. Taken on the road: they keep for months and quench thirst.",
      zh: "酸奶做的咸味干球。路上常带，可存几个月，还能解渴。",
    },
  },
  {
    kind: "snack", title: { ru: "Талкан", en: "Talkan", zh: "炒麦粉" }, vegetarian: true,
    text: {
      ru: "Молотое жареное зерно с сахаром или маслом. Дают детям и берут в долгие переходы.",
      en: "Ground roasted grain with sugar or butter. Given to children and taken on long rides.",
      zh: "炒熟磨碎的谷物，加糖或黄油。给孩子吃，也带着长途赶路。",
    },
  },
  {
    kind: "drink", title: { ru: "Кумыс", en: "Kumys", zh: "马奶酒" }, vegetarian: true,
    note: { ru: "Начните с половины пиалы", en: "Start with half a bowl", zh: "先喝半碗" },
    text: {
      ru: "Кобылье молоко особого брожения, слегка газированное и кисловатое. Пьют всё лето на джайлоо.",
      en: "Fermented mare's milk, slightly fizzy and sour. Drunk all summer on the pastures.",
      zh: "发酵的马奶，微带气泡和酸味。整个夏天牧场上都在喝。",
    },
  },
  {
    kind: "drink", title: { ru: "Максым и чалап", en: "Maksym and chalap", zh: "马克西姆与恰拉普" }, vegetarian: true,
    text: {
      ru: "Прохладные зерновой и кисломолочный напитки. В жару их продают на каждом перекрёстке.",
      en: "Cool grain and sour-milk drinks. In the heat they are sold at every crossroads.",
      zh: "清凉的谷物饮料与酸奶饮料。天热时街口随处有卖。",
    },
  },
  {
    kind: "drink", title: { ru: "Чай с горными травами", en: "Mountain herb tea", zh: "山草茶" }, vegetarian: true,
    text: {
      ru: "Чабрец, мята, облепиха. Чай на столе весь вечер, пока идут разговоры: пиалу наливают наполовину — это вежливость, а не жадность.",
      en: "Thyme, mint, sea buckthorn. Tea stays on the table all evening: the bowl is filled halfway — that is politeness, not meanness.",
      zh: "百里香、薄荷、沙棘。茶整晚都在桌上：碗只倒半满——这是礼貌，不是小气。",
    },
  },
];

export type Transport = { title: L; text: L; price: L; time: L; best: L };

export const TRANSPORT: Transport[] = [
  {
    title: { ru: "Трансфер от Конок", en: "Konok transfer", zh: "Konok 接送" },
    text: {
      ru: "Водитель встречает в аэропорту или у гостиницы и везёт прямо до юрты. Говорит по-русски, часто и по-английски.",
      en: "A driver meets you at the airport or hotel and takes you straight to the yurt. Speaks Russian, often English too.",
      zh: "司机在机场或酒店接你，直接送到毡房。会说俄语，通常也会英语。",
    },
    price: { ru: "от $120 за машину", en: "from $120 per car", zh: "每车 $120 起" },
    time: { ru: "по маршруту", en: "depends on route", zh: "视路线而定" },
    best: { ru: "Сон-Куль, Таш-Рабат, поздний прилёт", en: "Son-Kul, Tash-Rabat, late arrivals", zh: "松湖、塔什拉巴特、夜间抵达" },
  },
  {
    title: { ru: "Маршрутка", en: "Marshrutka minibus", zh: "小巴" },
    text: {
      ru: "Самый дешёвый способ: от Западного автовокзала Бишкека до райцентра. Отправляются по мере заполнения.",
      en: "The cheapest way: from the West bus station in Bishkek to the district centre. They leave when full.",
      zh: "最便宜的方式：从比什凯克西站到区中心，坐满即发车。",
    },
    price: { ru: "$3–8 с человека", en: "$3–8 per person", zh: "每人 $3–8" },
    time: { ru: "4–8 часов", en: "4–8 hours", zh: "4–8 小时" },
    best: { ru: "Каракол, Чолпон-Ата, Нарын", en: "Karakol, Cholpon-Ata, Naryn", zh: "卡拉科尔、乔尔蓬阿塔、纳伦" },
  },
  {
    title: { ru: "Общее такси", en: "Shared taxi", zh: "拼车出租" },
    text: {
      ru: "Машина на четверых, уезжает, когда собираются все места. Договариваются на автовокзале, торг уместен.",
      en: "A car for four that leaves once all seats are taken. Arranged at the bus station; haggling is normal.",
      zh: "四人一车，坐满出发。在汽车站谈价，可以还价。",
    },
    price: { ru: "$40–70 за машину", en: "$40–70 per car", zh: "每车 $40–70" },
    time: { ru: "3–6 часов", en: "3–6 hours", zh: "3–6 小时" },
    best: { ru: "Иссык-Куль, Чон-Кемин", en: "Issyk-Kul, Chon-Kemin", zh: "伊塞克湖、琼克明" },
  },
  {
    title: { ru: "Аренда машины", en: "Car rental", zh: "租车" },
    text: {
      ru: "Обычная легковая подойдёт для Иссык-Куля, Каракола и Чон-Кемина. Для Сон-Куля нужен внедорожник: грунтовка, камни, броды.",
      en: "An ordinary car is fine for Issyk-Kul, Karakol and Chon-Kemin. Son-Kul needs a 4×4: gravel, rocks and fords.",
      zh: "普通轿车可去伊塞克湖、卡拉科尔和琼克明。去松湖需要越野车：砂石路、碎石和涉水。",
    },
    price: { ru: "$45 легковая, $80 внедорожник", en: "$45 car, $80 4×4 per day", zh: "轿车 $45，越野车 $80／天" },
    time: { ru: "свободно", en: "your own schedule", zh: "时间自由" },
    best: { ru: "Поездка по кругу озера", en: "A loop around the lake", zh: "环湖自驾" },
  },
  {
    title: { ru: "Самолёт Бишкек — Ош", en: "Bishkek — Osh flight", zh: "比什凯克—奥什航班" },
    text: {
      ru: "Час вместо двенадцати часов по горной трассе. Дальше до Арсланбоба — такси или маршрутка.",
      en: "One hour instead of twelve on the mountain highway. From there a taxi or minibus to Arslanbob.",
      zh: "一小时，省去十二小时山路。之后换出租或小巴到阿尔斯兰博布。",
    },
    price: { ru: "от $60", en: "from $60", zh: "$60 起" },
    time: { ru: "1 час", en: "1 hour", zh: "1 小时" },
    best: { ru: "Юг страны, Арсланбоб", en: "The south, Arslanbob", zh: "南部、阿尔斯兰博布" },
  },
  {
    title: { ru: "Верхом", en: "On horseback", zh: "骑马" },
    text: {
      ru: "Последние километры до дальних юрт иногда проходят на лошади — вещи везёт вьючная лошадь.",
      en: "The last kilometres to remote yurts are sometimes ridden — a pack horse carries the luggage.",
      zh: "通往偏远毡房的最后几公里有时要骑马，行李由驮马运送。",
    },
    price: { ru: "$15 за 3 часа", en: "$15 for 3 hours", zh: "3 小时 $15" },
    time: { ru: "зависит от места", en: "depends on the place", zh: "视地点而定" },
    best: { ru: "Джайлоо без дороги", en: "Pastures with no road", zh: "没有公路的牧场" },
  },
];

export type Contact = { title: L; phone: string; note?: L };

export const EMERGENCY: Contact[] = [
  {
    title: { ru: "Единый номер экстренных служб", en: "Single emergency number", zh: "紧急服务统一号码" }, phone: "112",
    note: {
      ru: "Работает с любого мобильного, даже без денег на счету и без SIM-карты",
      en: "Works from any mobile, even with no credit and no SIM card",
      zh: "任何手机都能拨打，没有话费和 SIM 卡也可以",
    },
  },
  { title: { ru: "Пожарная служба и МЧС", en: "Fire service and rescue", zh: "消防与救援" }, phone: "101" },
  { title: { ru: "Милиция", en: "Police", zh: "警察" }, phone: "102" },
  { title: { ru: "Скорая помощь", en: "Ambulance", zh: "急救" }, phone: "103" },
  { title: { ru: "Аварийная газовая служба", en: "Gas emergency service", zh: "燃气抢修" }, phone: "104" },
];

export type Tip = { title: L; text: L };

export const CONDITIONS: Tip[] = [
  {
    title: { ru: "Высота", en: "Altitude", zh: "海拔" },
    text: {
      ru: "Сон-Куль и Таш-Рабат — выше 3000 метров. В первый день не поднимайтесь бегом, пейте больше воды и откажитесь от алкоголя.",
      en: "Son-Kul and Tash-Rabat are above 3000 m. On the first day go slowly, drink more water and skip alcohol.",
      zh: "松湖和塔什拉巴特海拔超过 3000 米。第一天慢行、多喝水、不要饮酒。",
    },
  },
  {
    title: { ru: "Погода", en: "Weather", zh: "天气" },
    text: {
      ru: "Летом днём +25, ночью на джайлоо может быть около нуля и выпадать снег. Тёплая куртка и шапка нужны даже в июле.",
      en: "In summer it is +25 by day; on the pastures nights can drop to zero with snow. A warm jacket and hat are needed even in July.",
      zh: "夏季白天 25 度，牧场夜间可能接近零度甚至下雪。七月也要带厚外套和帽子。",
    },
  },
  {
    title: { ru: "Электричество", en: "Electricity", zh: "用电" },
    text: {
      ru: "В юртах чаще всего солнечная панель: хватает на свет и зарядку телефона вечером. Возьмите повербанк. Розетки европейские, 220 В.",
      en: "Yurts usually run on a solar panel: enough for light and charging a phone in the evening. Bring a power bank. Sockets are European, 220 V.",
      zh: "毡房多用太阳能板：够照明和晚上充手机。请带充电宝。插座为欧标 220 V。",
    },
  },
  {
    title: { ru: "Вода", en: "Water", zh: "饮水" },
    text: {
      ru: "Пейте бутилированную или кипячёную. Хозяева кипятят воду для чая весь день, в термос нальют с собой.",
      en: "Drink bottled or boiled water. Hosts boil water for tea all day and will fill your thermos.",
      zh: "喝瓶装水或煮开的水。房东整天烧茶水，也会帮你灌满保温瓶。",
    },
  },
  {
    title: { ru: "Туалет и душ", en: "Toilet and shower", zh: "厕所与淋浴" },
    text: {
      ru: "На джайлоо туалет — отдельная будка в стороне от юрт, душ бывает не везде, зато часто топят баню.",
      en: "On the pastures the toilet is a separate hut away from the yurts; a shower is not always there, but a banya often is.",
      zh: "牧场的厕所是离毡房一段距离的独立小屋；不一定有淋浴，但常有蒸浴。",
    },
  },
  {
    title: { ru: "Связь", en: "Mobile signal", zh: "手机信号" },
    text: {
      ru: "На Сон-Куле и в Таш-Рабате связи нет совсем. Предупредите близких заранее и скачайте карту офлайн.",
      en: "At Son-Kul and Tash-Rabat there is no signal at all. Warn your family in advance and download an offline map.",
      zh: "松湖和塔什拉巴特完全没有信号。请提前告知家人，并下载离线地图。",
    },
  },
  {
    title: { ru: "Деньги", en: "Money", zh: "现金" },
    text: {
      ru: "В горах платят наличными сомами. Банкоматы есть в Кочкоре, Нарыне, Караколе и Бишкеке — снимайте заранее.",
      en: "In the mountains people pay cash in som. ATMs are in Kochkor, Naryn, Karakol and Bishkek — withdraw in advance.",
      zh: "山里用索姆现金。科奇科尔、纳伦、卡拉科尔和比什凯克有取款机，请提前取现。",
    },
  },
  {
    title: { ru: "Дети и пожилые", en: "Children and older travellers", zh: "儿童与长者" },
    text: {
      ru: "Гостевые дома на Иссык-Куле и в Караколе подходят всем. Высокие джайлоо лучше брать с детьми старше шести лет.",
      en: "Guesthouses around Issyk-Kul and in Karakol suit everyone. High pastures are better with children over six.",
      zh: "伊塞克湖和卡拉科尔的民宿适合所有人。高山牧场建议六岁以上的孩子。",
    },
  },
];

export const PACKING: L[] = [
  { ru: "Тёплая куртка и шапка — даже в июле", en: "A warm jacket and hat — even in July", zh: "厚外套和帽子——七月也要" },
  { ru: "Термобельё для ночёвки выше 3000 м", en: "Thermal layers for nights above 3000 m", zh: "3000 米以上过夜用的保暖内衣" },
  { ru: "Удобная обувь с нескользящей подошвой", en: "Comfortable shoes with grippy soles", zh: "防滑的舒适鞋子" },
  { ru: "Повербанк и фонарик", en: "A power bank and a torch", zh: "充电宝和手电" },
  { ru: "Солнцезащитный крем и очки", en: "Sunscreen and sunglasses", zh: "防晒霜和墨镜" },
  { ru: "Личная аптечка: от головы, живота и пластыри", en: "A small first-aid kit: headache, stomach, plasters", zh: "常用药：头痛、肠胃药和创可贴" },
  { ru: "Наличные сомы мелкими купюрами", en: "Cash in som, in small notes", zh: "小面额索姆现金" },
  { ru: "Влажные салфетки и полотенце", en: "Wet wipes and a towel", zh: "湿巾和毛巾" },
];

export type Phrase = { ky: string; ru: L };

export const PHRASES: Phrase[] = [
  { ky: "Салам алейкум", ru: { ru: "Здравствуйте", en: "Hello", zh: "你好" } },
  { ky: "Рахмат", ru: { ru: "Спасибо", en: "Thank you", zh: "谢谢" } },
  { ky: "Кош келиңиз", ru: { ru: "Добро пожаловать", en: "Welcome", zh: "欢迎" } },
  { ky: "Даамдуу!", ru: { ru: "Вкусно!", en: "Delicious!", zh: "真好吃！" } },
  { ky: "Канча турат?", ru: { ru: "Сколько стоит?", en: "How much is it?", zh: "多少钱？" } },
  { ky: "Суу", ru: { ru: "Вода", en: "Water", zh: "水" } },
  { ky: "Жакшы", ru: { ru: "Хорошо", en: "Good", zh: "好" } },
  { ky: "Жардам керек", ru: { ru: "Нужна помощь", en: "I need help", zh: "需要帮助" } },
  { ky: "Кош бол", ru: { ru: "До свидания", en: "Goodbye", zh: "再见" } },
];

export const ETIQUETTE: Tip[] = [
  {
    title: { ru: "Порог юрты", en: "The threshold", zh: "门槛" },
    text: {
      ru: "На порог не наступают и через него не здороваются — просто перешагните.",
      en: "Do not step on the threshold or greet anyone across it — simply step over.",
      zh: "不要踩门槛，也不要隔着门槛打招呼——直接跨过去。",
    },
  },
  {
    title: { ru: "Почётное место", en: "The place of honour", zh: "上座" },
    text: {
      ru: "Место напротив входа, тёр, оставляют старшим и гостям. Вас могут туда посадить — это уважение.",
      en: "The spot opposite the door, the tör, is kept for elders and guests. You may be seated there — it is a mark of respect.",
      zh: "门对面的位置（tör）留给长者和客人。被请到那里就座是尊重。",
    },
  },
  {
    title: { ru: "Пиала", en: "The tea bowl", zh: "茶碗" },
    text: {
      ru: "Чай наливают до половины: так он остаётся горячим и хозяйка может подливать чаще.",
      en: "Tea is poured halfway: it stays hot and the hostess can refill more often.",
      zh: "茶只倒半碗：这样茶是热的，女主人也能常来添茶。",
    },
  },
  {
    title: { ru: "Хлеб", en: "Bread", zh: "馕与面食" },
    text: {
      ru: "Хлеб и боорсок кладут верхней стороной вверх и не выбрасывают.",
      en: "Bread and boorsok are laid face up and never thrown away.",
      zh: "面包和油馃要正面朝上放，不可丢弃。",
    },
  },
  {
    title: { ru: "Обувь", en: "Shoes", zh: "鞋子" },
    text: {
      ru: "В юрту и в дом заходят без обуви. Возьмите тёплые носки — пол застелен кошмой.",
      en: "Shoes come off at the yurt and the house. Bring warm socks — the floor is covered with felt.",
      zh: "进毡房和屋里要脱鞋。带双厚袜子——地上铺的是毡子。",
    },
  },
  {
    title: { ru: "Фотографии", en: "Photographs", zh: "拍照" },
    text: {
      ru: "Людей, особенно пожилых, фотографируют, спросив разрешения. Почти всегда разрешают и зовут пить чай.",
      en: "Ask before photographing people, especially elders. They almost always agree — and invite you for tea.",
      zh: "拍人（尤其是长者）前先征得同意。几乎都会答应，还会请你喝茶。",
    },
  },
];
