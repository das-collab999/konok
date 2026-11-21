// Общая история Кыргызстана и живая культура — для вкладки «История».

import type { ArtName } from "@/components/art";
import type { L } from "@/lib/i18n";

export type Era = {
  id: string;
  when: L;
  title: L;
  text: L;
  /** Куда съездить, чтобы это увидеть. */
  see?: L;
  /** Ссылка на рассказ или точку. */
  story?: string;
};

export const ERAS: Era[] = [
  {
    id: "petro", when: { ru: "до нашей эры", en: "BCE", zh: "公元前" },
    title: { ru: "Люди на скалах", en: "People on the rocks", zh: "岩壁上的人" },
    text: {
      ru: "Первые следы человека в этих горах — наскальные рисунки. В Саймалуу-Таш на высоте трёх тысяч метров их больше десяти тысяч: охотники, козлы, запряжённые быки. Рядом с Чолпон-Атой такие же рисунки лежат прямо в поле у дороги.",
      en: "The first human traces in these mountains are rock carvings. At Saimaluu-Tash, three thousand metres up, there are more than ten thousand of them: hunters, ibex, oxen in harness. Near Cholpon-Ata the same carvings lie in an open field by the road.",
      zh: "这片山地最早的人类痕迹是岩画。在海拔三千米的赛马陆塔什，岩画超过一万幅：猎人、野山羊、驾辕的公牛。乔尔蓬阿塔附近的田野里也散落着同样的岩画。",
    },
    see: { ru: "Петроглифы Чолпон-Аты", en: "Cholpon-Ata petroglyphs", zh: "乔尔蓬阿塔岩画" },
  },
  {
    id: "silk", when: { ru: "II век до н. э. — XV век", en: "2nd c. BCE — 15th c.", zh: "公元前 2 世纪—15 世纪" },
    title: { ru: "Шёлковый путь", en: "The Silk Road", zh: "丝绸之路" },
    text: {
      ru: "Через долины шли караваны из Китая в Персию и дальше на запад. По дороге стояли караван-сараи — укреплённые гостиницы на день пути друг от друга. Таш-Рабат в Нарынской области сохранился почти целиком.",
      en: "Caravans crossed these valleys from China to Persia and further west. Caravanserais stood along the road — fortified inns a day's travel apart. Tash-Rabat in the Naryn region survives almost whole.",
      zh: "商队经这些河谷从中国前往波斯乃至更西方。沿途设有商旅驿站——相隔一日路程的设防客栈。纳伦州的塔什拉巴特几乎完整保存至今。",
    },
    see: { ru: "Таш-Рабат", en: "Tash-Rabat", zh: "塔什拉巴特" },
    story: "tash-rabat",
  },
  {
    id: "karakhanid", when: { ru: "X — XII века", en: "10th — 12th centuries", zh: "10—12 世纪" },
    title: { ru: "Караханиды и Баласагун", en: "The Karakhanids and Balasagun", zh: "喀喇汗王朝与巴拉萨衮" },
    text: {
      ru: "В Чуйской долине вырос город Баласагун — одна из столиц Караханидского государства. Здесь писали книги, чеканили монеты, строили минареты. От города осталась башня Бурана и поле каменных изваяний.",
      en: "In the Chui valley rose Balasagun, one of the capitals of the Karakhanid state. Books were written here, coins struck, minarets built. What remains is the Burana tower and a field of stone figures.",
      zh: "楚河谷地崛起了巴拉萨衮——喀喇汗王朝的都城之一。这里著书、铸币、建宣礼塔。如今只剩布拉纳塔和一片石人像。",
    },
    see: { ru: "Башня Бурана", en: "Burana Tower", zh: "布拉纳塔" },
    story: "burana",
  },
  {
    id: "manas", when: { ru: "предание", en: "oral tradition", zh: "口传传统" },
    title: { ru: "Эпос «Манас»", en: "The Manas epic", zh: "《玛纳斯》史诗" },
    text: {
      ru: "Самый длинный эпос в мире — около полумиллиона строк, в двадцать раз больше «Одиссеи». Его не читают, а исполняют наизусть: манасчи поёт часами, без инструмента, меняя голос за каждого героя. Эпос внесён в список наследия ЮНЕСКО.",
      en: "The longest epic in the world — about half a million lines, twenty times the Odyssey. It is not read but performed from memory: a manaschi chants for hours, without an instrument, changing voice for every hero. It is on the UNESCO heritage list.",
      zh: "世界上最长的史诗——约五十万行，是《奥德赛》的二十倍。它不是用来读的，而是凭记忆演述：玛纳斯奇不用乐器，连唱数小时，为每个人物变换声音。已列入联合国教科文组织遗产名录。",
    },
    see: { ru: "Манас-Ордо в Таласе", en: "Manas-Ordo in Talas", zh: "塔拉斯的玛纳斯陵园" },
  },
  {
    id: "nomad", when: { ru: "века кочевья", en: "centuries of nomadism", zh: "游牧的岁月" },
    title: { ru: "Жизнь на колёсах", en: "Life on the move", zh: "迁徙的生活" },
    text: {
      ru: "До середины XX века кыргызы кочевали: зимовка в долине, лето на джайлоо. Юрта разбирается за час и везётся на лошадях, вся утварь — кожаная и войлочная, чтобы не билась в дороге. Этот уклад и сегодня жив каждое лето.",
      en: "Until the middle of the 20th century the Kyrgyz were nomads: winter in the valley, summer on the high pasture. A yurt comes apart in an hour and travels on horses; all the vessels are leather and felt so nothing breaks on the road. Every summer this way of life returns.",
      zh: "直到 20 世纪中叶，吉尔吉斯人仍过着游牧生活：冬天在谷地，夏天上高山牧场。毡房一小时就能拆卸，由马匹驮运；器皿皆以皮革和毛毡制成，路上不会摔碎。每年夏天，这种生活方式依旧延续。",
    },
    see: { ru: "Сон-Куль летом", en: "Son-Kul in summer", zh: "夏天的松湖" },
    story: "son-kul",
  },
  {
    id: "kokand", when: { ru: "XVIII — XIX века", en: "18th — 19th centuries", zh: "18—19 世纪" },
    title: { ru: "Кокандское ханство", en: "The Kokand Khanate", zh: "浩罕汗国" },
    text: {
      ru: "Юг и часть севера вошли в Кокандское ханство; в долинах выросли крепости, в том числе Пишпек — на его месте теперь Бишкек. Кочевые роды платили дань, но жили по своим законам.",
      en: "The south and part of the north came under the Kokand Khanate; fortresses rose in the valleys, among them Pishpek, where Bishkek stands today. The nomadic clans paid tribute but lived by their own law.",
      zh: "南部和部分北部并入浩罕汗国；谷地建起要塞，其中包括皮什佩克——今日比什凯克所在地。游牧部族纳贡，但仍按自己的规矩生活。",
    },
  },
  {
    id: "russia", when: { ru: "1855 — 1876", en: "1855 — 1876", zh: "1855—1876" },
    title: { ru: "В составе Российской империи", en: "Into the Russian Empire", zh: "并入俄罗斯帝国" },
    text: {
      ru: "Северные роды приняли российское подданство в 1850-х, юг вошёл позже. Появились почтовые тракты, первые школы и переселенцы, а вместе с ними — земельные споры, которые привели к восстанию 1916 года и тяжёлому исходу части народа в Китай.",
      en: "The northern clans accepted Russian rule in the 1850s, the south followed later. Post roads, the first schools and settlers appeared — and with them land disputes that led to the 1916 uprising and the hard flight of part of the people to China.",
      zh: "北部部族于 1850 年代归附俄国，南部稍后并入。驿道、最早的学校和移民随之而来——也带来土地纠纷，最终引发 1916 年起义和部分民众艰难逃亡中国。",
    },
  },
  {
    id: "soviet", when: { ru: "1936 — 1991", en: "1936 — 1991", zh: "1936—1991" },
    title: { ru: "Советские годы", en: "The Soviet years", zh: "苏联时期" },
    text: {
      ru: "Киргизская ССР: кочевников перевели на осёдлость, построили школы, больницы, заводы и дороги через перевалы. Письменность дважды меняли — с арабской на латиницу, затем на кириллицу. Многие традиции сохранились именно как домашние, семейные.",
      en: "The Kirghiz SSR: nomads were settled, schools, hospitals, factories and mountain roads were built. The script changed twice — Arabic to Latin, then to Cyrillic. Many traditions survived precisely as home and family matters.",
      zh: "吉尔吉斯苏维埃社会主义共和国：游牧民被安置定居，学校、医院、工厂和翻山公路相继建成。文字两度更改——由阿拉伯字母改拉丁字母，再改西里尔字母。许多传统正是在家庭中得以延续。",
    },
  },
  {
    id: "independence", when: { ru: "31 августа 1991", en: "31 August 1991", zh: "1991 年 8 月 31 日" },
    title: { ru: "Независимость", en: "Independence", zh: "独立" },
    text: {
      ru: "Кыргызстан стал независимым государством. На флаге — солнце с сорока лучами по числу родов, объединённых Манасом, а в центре тундук, верхний круг юрты. Столица — Бишкек, второй по величине город — Ош.",
      en: "Kyrgyzstan became an independent state. The flag shows a sun with forty rays for the forty clans united by Manas, and at its centre the tunduk, the crown of the yurt. The capital is Bishkek; the second city is Osh.",
      zh: "吉尔吉斯斯坦成为独立国家。国旗上的太阳有四十道光芒，代表玛纳斯统一的四十个部族，中心是毡房顶圈「тундук」。首都比什凯克，第二大城市奥什。",
    },
  },
  {
    id: "today", when: { ru: "сегодня", en: "today", zh: "今天" },
    title: { ru: "Страна гор и гостей", en: "A country of mountains and guests", zh: "群山与宾客之国" },
    text: {
      ru: "Девяносто процентов территории — горы, четверть страны выше трёх тысяч метров. Больше тысячи семей принимают путешественников в юртах и домах: это и есть сегодняшний способ сохранить уклад — показывая его гостям.",
      en: "Ninety per cent of the land is mountains, a quarter of the country lies above three thousand metres. More than a thousand families host travellers in yurts and houses: showing the old way of life to guests is how it is kept alive today.",
      zh: "全国九成是山地，四分之一的国土海拔在三千米以上。一千多个家庭在毡房和民宿里接待旅客：把旧日生活展示给客人，正是今天延续它的方式。",
    },
  },
];

export type Custom = { id: string; art: ArtName; title: L; text: L; story?: string };

export const CUSTOMS: Custom[] = [
  {
    id: "yurt", art: "yurt",
    title: { ru: "Юрта", en: "The yurt", zh: "毡房" },
    text: {
      ru: "Каркас из ивовых жердей, покрытый войлоком. Собирается за час, держит форму в ветер и снег, внутри тепло от одной печки. Верхний круг — тундук — тот самый знак, что стоит на флаге: его передают по наследству от отца к сыну.",
      en: "A frame of willow poles under felt. It goes up in an hour, holds its shape in wind and snow, and one stove keeps it warm. The crown ring — the tunduk — is the very sign on the flag, passed from father to son.",
      zh: "柳木骨架覆以毛毡。一小时搭起，风雪中不变形，一个炉子就能取暖。顶圈「тундук」正是国旗上的图案，父子相传。",
    },
  },
  {
    id: "felt", art: "felt",
    title: { ru: "Войлок: шырдак и ала-кийиз", en: "Felt: shyrdak and ala-kiyiz", zh: "毛毡：什尔达克与阿拉基伊兹" },
    text: {
      ru: "Шырдак сшивают из двух цветных полотен: узор одного становится фоном другого, поэтому ни один кусок не пропадает. Ала-кийиз валяют: узор вкатывают в мокрую шерсть. Хороший шырдак служит полвека, и мастерство ЮНЕСКО признало нуждающимся в охране.",
      en: "A shyrdak is sewn from two coloured sheets: the pattern of one becomes the ground of the other, so nothing is wasted. An ala-kiyiz is rolled: the pattern is pressed into wet wool. A good shyrdak lasts half a century, and UNESCO lists the craft as needing safeguarding.",
      zh: "什尔达克由两块不同颜色的毡拼缝而成：一块的纹样成为另一块的底色，分毫不弃。阿拉基伊兹则是擀制：将纹样压入湿羊毛。好的什尔达克能用半个世纪，这门手艺已被联合国教科文组织列为亟需保护。",
    },
  },
  {
    id: "kokboru", art: "games",
    title: { ru: "Кок-бору и игры", en: "Kok-boru and the games", zh: "叼羊与竞技" },
    text: {
      ru: "Кок-бору — конная игра двух команд с тушей козла; поле, ворота-казан и очень быстрые всадники. Кроме неё есть ордо (выбивание костей из круга), тыйын энмей (поднять монету на скаку) и борьба куреш.",
      en: "Kok-boru is a horseback game between two teams with a goat carcass; a field, cauldron-shaped goals and very fast riders. There is also ordo (knocking bones out of a circle), tyiyn enmei (picking a coin off the ground at a gallop) and kuresh wrestling.",
      zh: "叼羊是两队骑手争夺羊身的马上竞技；有球场、锅形球门和极快的骑手。此外还有「ordo」（把骨头击出圆圈）、「tyiyn enmei」（疾驰中俯身拾币）和摔跤「kuresh」。",
    },
  },
  {
    id: "komuz", art: "cooking",
    title: { ru: "Комуз и акыны", en: "The komuz and the akyns", zh: "库姆兹琴与阿肯" },
    text: {
      ru: "Комуз — трёхструнный инструмент из абрикосового дерева, на нём играют и дома, и на сцене. Акыны состязаются в айтыше: двое поэтов спорят стихами под музыку, придумывая строки на ходу.",
      en: "The komuz is a three-stringed instrument of apricot wood, played at home and on stage alike. Akyns compete in aitysh: two poets argue in verse to music, inventing the lines as they go.",
      zh: "库姆兹是用杏木制成的三弦琴，家中与舞台上都常见。阿肯们以「aitysh」对歌：两位诗人在乐声中即兴赋诗、你来我往。",
    },
  },
  {
    id: "eagle", art: "horse",
    title: { ru: "Беркутчи", en: "The eagle hunters", zh: "驯鹰人" },
    text: {
      ru: "Охота с беркутом — ремесло, которому учатся годами: птицу выхаживают, приучают к руке и выпускают на лису или зайца. Сейчас беркутчи чаще показывают охоту гостям, чем кормятся ею, но навык передаётся по семьям.",
      en: "Hunting with a golden eagle is a craft learned over years: the bird is raised, taught to the hand and flown at fox or hare. Today eagle hunters more often show the hunt to guests than live by it, but the skill passes down through families.",
      zh: "驯金雕狩猎是需要多年磨练的手艺：把雏鹰养大、训练上臂、放飞捕狐或野兔。如今驯鹰人多是演示给客人看，但技艺仍在家族中传承。",
    },
  },
  {
    id: "table", art: "beshbarmak",
    title: { ru: "Дастархан", en: "The dastarkhan", zh: "餐布（дастархан）" },
    text: {
      ru: "Стол — не просто еда, а порядок: кому какой кусок, кто наливает чай, где сидит старший. Гостя сажают на почётное место напротив входа и подают лучшее, что есть в доме. Отсюда и пословица: «Конок келсе — кут келет».",
      en: "The table is not only food but an order: who gets which piece, who pours the tea, where the eldest sits. A guest is seated in the place of honour opposite the door and served the best in the house. Hence the proverb: «Konok kelse — kut kelet».",
      zh: "餐桌不只关乎吃，更是一套秩序：谁分到哪一块、谁来斟茶、长者坐在何处。客人被请到门对面的上座，奉上家中最好的东西。谚语由此而来：「客来福至」。",
    },
    story: "beshbarmak",
  },
];
