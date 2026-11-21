// Рассказы: откуда блюдо или место, как устроено и что там делать.
// Открываются по ссылке «Изучить больше» из путеводителя и с карты.

import type { ArtName } from "@/components/art";
import type { L } from "@/lib/i18n";

export type Story = {
  slug: string;
  kind: "dish" | "place";
  art: ArtName;
  title: L;
  lead: L;
  /** Короткие факты в строку: «XI век», «3016 м» и так далее. */
  facts: { k: L; v: L }[];
  blocks: { h: L; p: L }[];
  /** Привязка к точке на карте или к блюду в путеводителе. */
  mealTitleRu?: string;
};

export const STORIES: Story[] = [
  /* ─────────────────────────────── блюда */
  {
    slug: "beshbarmak", kind: "dish", art: "beshbarmak", mealTitleRu: "Бешбармак",
    title: { ru: "Бешбармак", en: "Beshbarmak", zh: "别什巴尔马克" },
    lead: {
      ru: "Главное блюдо кыргызского стола: варёное мясо на тонко раскатанном тесте. Его готовят, когда в доме событие — свадьба, рождение ребёнка, приезд дорогого гостя.",
      en: "The centrepiece of the Kyrgyz table: boiled meat over thin sheets of dough. It is cooked when something matters — a wedding, a birth, the arrival of an honoured guest.",
      zh: "吉尔吉斯餐桌上的主角：煮好的肉配上擀得极薄的面片。家里有大事时才做——婚礼、添丁，或贵客登门。",
    },
    facts: [
      { k: { ru: "Название", en: "Name", zh: "名字" }, v: { ru: "«Пять пальцев»", en: "«Five fingers»", zh: "「五根手指」" } },
      { k: { ru: "Мясо", en: "Meat", zh: "用肉" }, v: { ru: "Баранина или конина", en: "Mutton or horse", zh: "羊肉或马肉" } },
      { k: { ru: "Время", en: "Time", zh: "耗时" }, v: { ru: "3–4 часа", en: "3–4 hours", zh: "3—4 小时" } },
    ],
    blocks: [
      {
        h: { ru: "Откуда название", en: "Where the name comes from", zh: "名字的由来" },
        p: {
          ru: "«Беш бармак» по-кыргызски — «пять пальцев»: блюдо едят руками. Это не небрежность, а знак доверия: за общим блюдом сидят только свои. Гостю подвигают лучшие куски, и отказаться нельзя.",
          en: "«Besh barmak» means «five fingers» in Kyrgyz: the dish is eaten with the hands. That is not carelessness but trust — only your own people share one plate. The best pieces are pushed towards the guest, and refusing them is not done.",
          zh: "「Besh barmak」在吉尔吉斯语里是「五根手指」：这道菜用手吃。这并非随意，而是信任——只有自家人才同盘而食。最好的部分会推到客人面前，不可推辞。",
        },
      },
      {
        h: { ru: "Как готовят", en: "How it is made", zh: "怎么做" },
        p: {
          ru: "Мясо варят целыми кусками два-три часа, снимая пену, — получается наваристый бульон шорпо. Тесто из муки, воды и соли раскатывают почти прозрачным и режут ромбами, отваривая прямо в бульоне. Сверху кладут мясо и много лука, томлённого в жире.",
          en: "The meat is boiled in large pieces for two or three hours, the foam skimmed off, which gives the rich shorpo broth. Dough of flour, water and salt is rolled almost see-through, cut into diamonds and boiled in that broth. Meat and a generous amount of onion stewed in fat go on top.",
          zh: "整块肉煮上两三个小时，不断撇去浮沫，得到浓郁的肉汤。面粉、水和盐和成的面擀到近乎透明，切成菱形，直接在肉汤里煮熟。最后铺上肉和大量用油脂煨过的洋葱。",
        },
      },
      {
        h: { ru: "Кто что делает", en: "Who does what", zh: "谁做什么" },
        p: {
          ru: "Мясо разделывает старший мужчина — у каждой части своё назначение и свой адресат. Тесто раскатывают женщины, и по тому, насколько оно тонкое, судят о хозяйке. Почётному гостю подают голову барана: это обряд «баш тартуу», от него не отказываются.",
          en: "The eldest man carves the meat — every part has its purpose and its recipient. The women roll the dough, and a hostess is judged by how thin she gets it. The honoured guest is served the sheep's head: the «bash tartuu» rite, which is not refused.",
          zh: "由家中年长的男性分肉——每一部分都有讲究，分给特定的人。面由女性来擀，擀得多薄关乎主妇的手艺。贵客会被奉上羊头，这是「bash tartuu」礼俗，不可谢绝。",
        },
      },
      {
        h: { ru: "Что заказать рядом", en: "What goes with it", zh: "搭配什么" },
        p: {
          ru: "К бешбармаку всегда подают пиалу шорпо и чай. Если вы не едите мясо, скажите хозяйке заранее: вам сделают лагман без мяса или молочный стол с каймаком, боорсоком и вареньем.",
          en: "A bowl of shorpo and tea always come with it. If you don't eat meat, tell the host in advance: they will make a meat-free lagman or a dairy table with kaymak, boorsok and jam.",
          zh: "总会配上一碗肉汤和茶。若不吃肉，请提前告知主人：可以做无肉的拉条子，或上奶皮、油馃和果酱的奶制品餐。",
        },
      },
    ],
  },
  {
    slug: "lagman", kind: "dish", art: "lagman", mealTitleRu: "Лагман",
    title: { ru: "Лагман", en: "Lagman", zh: "拉条子" },
    lead: {
      ru: "Тянутая вручную лапша с мясом и овощами. Пришла в Кыргызстан от дунган и уйгуров и стала здесь домашней едой на каждый день.",
      en: "Hand-pulled noodles with meat and vegetables. It came to Kyrgyzstan from the Dungan and Uyghur kitchens and turned into everyday home food.",
      zh: "手工拉制的面条配肉和蔬菜。由东干族和维吾尔族传入吉尔吉斯斯坦，如今成了家常饭。",
    },
    facts: [
      { k: { ru: "Лапша", en: "Noodles", zh: "面条" }, v: { ru: "Тянут руками", en: "Pulled by hand", zh: "手工拉制" } },
      { k: { ru: "Виды", en: "Kinds", zh: "种类" }, v: { ru: "Гуйру, босо, суйру", en: "Guiru, boso, suiru", zh: "拌面、炒面、汤面" } },
      { k: { ru: "Без мяса", en: "Meat-free", zh: "素食" }, v: { ru: "Да, если сказать заранее", en: "Yes, if you ask ahead", zh: "可以，提前说明" } },
    ],
    blocks: [
      {
        h: { ru: "Как тянут лапшу", en: "How the noodles are pulled", zh: "面条怎么拉" },
        p: {
          ru: "Тесто вымешивают, смазывают маслом и дают отлежаться, а потом раскатывают жгутом и растягивают, складывая вдвое, — с каждым разом нитей вдвое больше. Хорошая лапша тянется на всю длину рук и не рвётся.",
          en: "The dough is kneaded, oiled and left to rest, then rolled into a rope and stretched, folded in two again and again — each time the strands double. Good noodles stretch to the span of both arms without breaking.",
          zh: "面团揉好后抹油醒发，再搓成长条反复对折拉伸——每拉一次条数翻倍。好面能拉开双臂那么长而不断。",
        },
      },
      {
        h: { ru: "Чем отличается от супа", en: "How it differs from soup", zh: "与汤面的区别" },
        p: {
          ru: "Гуйру-лагман подают с подливой отдельно, босо-лагман жарят с лапшой в казане, суйру — почти суп. В кафе спросите, какой сегодня: от этого зависит, будет ли это густое блюдо или тарелка с бульоном.",
          en: "Guiru lagman comes with the sauce served apart, boso lagman is fried with the noodles in a cauldron, suiru is almost a soup. Ask which one they make today — that decides whether you get a thick dish or a bowl of broth.",
          zh: "拌面的浇头与面分开上，炒面是在锅里与面同炒，汤面则近乎汤。点餐时问一句今天做哪种，决定端上来的是浓稠一盘还是一碗汤。",
        },
      },
      {
        h: { ru: "Вегетарианский вариант", en: "The meat-free version", zh: "素食版本" },
        p: {
          ru: "Основа подливы — лук, морковь, болгарский перец, помидоры, редька и джусай. Мясо добавляют в конце, поэтому сделать лагман без него несложно — предупредите хозяйку с утра.",
          en: "The sauce is built on onion, carrot, pepper, tomato, daikon and garlic chives. Meat goes in at the end, so a meat-free lagman is easy — just tell the host in the morning.",
          zh: "浇头的底子是洋葱、胡萝卜、彩椒、番茄、白萝卜和韭叶。肉是最后才下的，所以做素的并不难——早上说一声即可。",
        },
      },
    ],
  },
  {
    slug: "kumys", kind: "dish", art: "kumys", mealTitleRu: "Кумыс",
    title: { ru: "Кумыс", en: "Kumys", zh: "马奶酒" },
    lead: {
      ru: "Кобылье молоко особого брожения — слегка газированное, кисловатое, с лёгким хмелем. Летний напиток джайлоо, который делают только там, где пасутся кобылы.",
      en: "Fermented mare's milk — slightly fizzy, sour, faintly alcoholic. The summer drink of the high pastures, made only where mares graze.",
      zh: "经特殊发酵的马奶——微带气泡、酸爽，略有酒意。这是夏牧场的饮品，只在有母马放牧的地方才做。",
    },
    facts: [
      { k: { ru: "Сезон", en: "Season", zh: "季节" }, v: { ru: "Май — август", en: "May to August", zh: "五月至八月" } },
      { k: { ru: "Крепость", en: "Alcohol", zh: "酒精度" }, v: { ru: "около 1%", en: "about 1%", zh: "约 1%" } },
      { k: { ru: "Посуда", en: "Vessel", zh: "容器" }, v: { ru: "Саба и чанач из кожи", en: "Leather saba and chanach", zh: "皮制 saba 与 chanach" } },
    ],
    blocks: [
      {
        h: { ru: "Как получается", en: "How it is made", zh: "如何酿成" },
        p: {
          ru: "Кобылу доят каждые два часа — молока она даёт немного. Свежее молоко вливают в кожаный мешок саба с закваской и взбивают деревянной мутовкой сотни раз в день. Через сутки напиток готов, и каждый новый удой продолжает ту же закваску.",
          en: "A mare is milked every couple of hours and gives little at a time. The fresh milk goes into a leather saba with a starter and is churned with a wooden plunger hundreds of times a day. A day later it is ready, and every new milking carries the same starter on.",
          zh: "母马每两小时挤一次奶，产量不多。鲜奶倒进带酵头的皮袋 saba，用木杵一天搅打数百次。一昼夜后即可饮用，新挤的奶继续沿用同一份酵头。",
        },
      },
      {
        h: { ru: "Как пить в первый раз", en: "Drinking it for the first time", zh: "第一次怎么喝" },
        p: {
          ru: "Начните с половины пиалы: напиток живой, и непривычному желудку нужно время. Кумыс не охлаждают до ледяного и не запивают — его пьют медленно, разговаривая.",
          en: "Start with half a bowl: the drink is alive and an unused stomach needs time. Kumys is not served ice-cold and is not washed down with anything — you sip it slowly, talking.",
          zh: "先喝半碗：这是活性饮品，不习惯的肠胃需要适应。马奶酒不冰镇，也不用别的东西送服——边聊边慢慢喝。",
        },
      },
      {
        h: { ru: "Почему это важно", en: "Why it matters", zh: "为何重要" },
        p: {
          ru: "Кумысом лечились и кормились в дорогу, им встречают гостя и провожают его. Отказаться от пиалы можно, но лучше хотя бы пригубить — это знак уважения к дому.",
          en: "Kumys was medicine and road food; it greets a guest and sees them off. You may decline a bowl, but at least touching it to your lips is the polite thing to do.",
          zh: "马奶酒既是药，也是路上的口粮；迎客送客都用它。可以婉拒，但至少沾一下唇，是对主人家的尊重。",
        },
      },
    ],
  },
  {
    slug: "boorsok", kind: "dish", art: "boorsok", mealTitleRu: "Боорсок",
    title: { ru: "Боорсок", en: "Boorsok", zh: "油馃" },
    lead: {
      ru: "Румяные кусочки теста, обжаренные в масле. Простая еда, у которой есть обрядовый смысл: запах масла в кыргызской традиции поднимается к духам предков.",
      en: "Golden pieces of dough fried in oil. Simple food with a ritual meaning: in Kyrgyz tradition the smell of hot oil rises to the spirits of the ancestors.",
      zh: "在油里炸得金黄的面块。看似寻常，却有仪礼意义：在吉尔吉斯传统中，热油的香气会升向祖先的灵魂。",
    },
    facts: [
      { k: { ru: "Форма", en: "Shape", zh: "形状" }, v: { ru: "Ромб или квадрат", en: "Diamond or square", zh: "菱形或方形" } },
      { k: { ru: "Когда", en: "When", zh: "何时" }, v: { ru: "К чаю, на поминки, на той", en: "With tea, at wakes and feasts", zh: "配茶、祭奠与宴席" } },
      { k: { ru: "Без мяса", en: "Meat-free", zh: "素食" }, v: { ru: "Да", en: "Yes", zh: "是" } },
    ],
    blocks: [
      {
        h: { ru: "Когда их жарят", en: "When they are fried", zh: "什么时候炸" },
        p: {
          ru: "Боорсок жарят к приходу гостей, в поминальные дни и на праздники. Масло должно быть горячим, а куски — одинаковыми: по ровному боорсоку судят о хозяйке так же, как по тонкому тесту для бешбармака.",
          en: "Boorsok is fried when guests are coming, on memorial days and at celebrations. The oil must be hot and the pieces even: a tidy boorsok says as much about the hostess as thin beshbarmak dough.",
          zh: "有客来访、祭日和节庆时都要炸油馃。油要够热，块要均匀：油馃炸得齐整，与别什巴尔马克的面擀得薄一样，都是主妇的脸面。",
        },
      },
      {
        h: { ru: "Как подают", en: "How it is served", zh: "怎么上桌" },
        p: {
          ru: "Горку боорсока ставят в центр стола, рядом — каймак, мёд, варенье и сливочное масло. Берут руками, едят с чаем. Хлеб и боорсок кладут верхней стороной вверх и не выбрасывают.",
          en: "A heap of boorsok goes in the middle of the table with kaymak, honey, jam and butter beside it. You take it with your hands and eat it with tea. Bread and boorsok are laid face up and never thrown away.",
          zh: "油馃堆在桌子中央，旁边摆奶皮、蜂蜜、果酱和黄油。用手取食，配茶。面食正面朝上摆放，不可丢弃。",
        },
      },
    ],
  },
  {
    slug: "manty", kind: "dish", art: "manty", mealTitleRu: "Манты",
    title: { ru: "Манты", en: "Manty", zh: "蒸包" },
    lead: {
      ru: "Крупные паровые пельмени из тонкого теста. Начинку рубят ножом, а не крутят через мясорубку — от этого внутри остаётся сок.",
      en: "Large steamed dumplings of thin dough. The filling is chopped with a knife rather than minced, which is what keeps the juice inside.",
      zh: "用薄皮包的大个蒸饺。馅是用刀剁的，而不是绞的——汁水因此留在里面。",
    },
    facts: [
      { k: { ru: "Готовят", en: "Cooked", zh: "做法" }, v: { ru: "На пару, 40 минут", en: "Steamed, 40 minutes", zh: "蒸 40 分钟" } },
      { k: { ru: "Начинка", en: "Filling", zh: "馅料" }, v: { ru: "Мясо с луком или тыква", en: "Meat with onion, or pumpkin", zh: "肉加洋葱，或南瓜" } },
      { k: { ru: "Едят", en: "Eaten", zh: "吃法" }, v: { ru: "Руками, чтобы не потерять сок", en: "With hands, to keep the juice", zh: "用手拿，以免漏汁" } },
    ],
    blocks: [
      {
        h: { ru: "Почему рубят ножом", en: "Why the filling is chopped", zh: "为什么要刀剁" },
        p: {
          ru: "Рубленое мясо сохраняет волокна и сок, перекрученное — нет. К мясу добавляют много лука и кусочки курдючного жира: они тают и делают начинку сочной.",
          en: "Chopped meat keeps its fibres and juice; minced meat does not. Plenty of onion and small cubes of tail fat go in — they melt and make the filling juicy.",
          zh: "刀剁的肉保留纤维和汁水，绞出来的则不然。要加大量洋葱和小块羊尾油——它们化开后让馅更多汁。",
        },
      },
      {
        h: { ru: "Тыквенные манты", en: "Pumpkin manty", zh: "南瓜蒸包" },
        p: {
          ru: "Осенью и зимой делают манты с тыквой: сладковатые, полностью вегетарианские. Если вы не едите мясо, попросите именно их — это не замена, а самостоятельное блюдо.",
          en: "In autumn and winter manty are made with pumpkin: slightly sweet and fully vegetarian. If you don't eat meat, ask for these — they are not a substitute but a dish of their own.",
          zh: "秋冬会做南瓜馅的蒸包：微甜，全素。不吃肉的话就点这个——它不是替代品，而是独立的一道菜。",
        },
      },
    ],
  },
  {
    slug: "plov", kind: "dish", art: "plov", mealTitleRu: "Плов",
    title: { ru: "Плов", en: "Plov", zh: "手抓饭" },
    lead: {
      ru: "Рис, морковь и мясо, томлённые в казане. На юге страны плов — отдельное ремесло: в Оше и Узгене его готовят из местного риса и подают с утра.",
      en: "Rice, carrot and meat simmered in a cauldron. In the south it is a craft of its own: in Osh and Uzgen plov is made from local rice and served from the morning.",
      zh: "米、胡萝卜与肉在大锅中焖成。在南方，这是一门手艺：奥什和乌兹根用当地稻米做饭，从早上就开卖。",
    },
    facts: [
      { k: { ru: "Где лучше", en: "Where it's best", zh: "哪里最好" }, v: { ru: "Ош, Узген, Джалал-Абад", en: "Osh, Uzgen, Jalal-Abad", zh: "奥什、乌兹根、贾拉拉巴德" } },
      { k: { ru: "Рис", en: "Rice", zh: "大米" }, v: { ru: "Узгенский девзира", en: "Uzgen devzira", zh: "乌兹根 devzira 米" } },
      { k: { ru: "Когда едят", en: "When", zh: "何时吃" }, v: { ru: "В первой половине дня", en: "In the first half of the day", zh: "上午为主" } },
    ],
    blocks: [
      {
        h: { ru: "Узгенский рис", en: "Uzgen rice", zh: "乌兹根的米" },
        p: {
          ru: "Девзира растёт в Узгенской долине, у зерна красноватая бороздка и плотная сердцевина. Он впитывает много бульона и не разваривается, поэтому южный плов получается рассыпчатым.",
          en: "Devzira grows in the Uzgen valley; the grain has a reddish groove and a dense core. It drinks in a lot of broth without turning to mush, which is why southern plov stays loose and grainy.",
          zh: "Devzira 米产自乌兹根谷地，米粒带红色沟纹，芯部紧实。它能吸饱汤汁而不烂，所以南方的手抓饭粒粒分明。",
        },
      },
      {
        h: { ru: "Ореховый плов Арсланбоба", en: "The walnut plov of Arslanbob", zh: "阿尔斯兰博布的核桃抓饭" },
        p: {
          ru: "В ореховом лесу в плов добавляют грецкий орех — он даёт плотный, почти маслянистый вкус. Это местная версия, за пределами долины её почти не встретишь.",
          en: "In the walnut forest, walnuts go into the plov and give it a dense, almost buttery taste. It is a local version you will rarely meet outside the valley.",
          zh: "在核桃林一带，抓饭里会加核桃，味道厚实近乎奶香。这是当地做法，出了山谷就很少见到。",
        },
      },
    ],
  },

  /* ─────────────────────────────── места */
  {
    slug: "burana", kind: "place", art: "redrocks",
    title: { ru: "Башня Бурана", en: "Burana Tower", zh: "布拉纳塔" },
    lead: {
      ru: "Минарет XI века на месте города Баласагун — столицы Караханидов. Рядом поле каменных балбалов, а с верхней площадки видно всю Чуйскую долину.",
      en: "An 11th-century minaret on the site of Balasagun, capital of the Karakhanids. A field of stone balbals stands beside it, and the whole Chui valley opens from the top.",
      zh: "11 世纪的宣礼塔，坐落在喀喇汗王朝都城巴拉萨衮遗址上。旁边是石人像阵列，塔顶可俯瞰整个楚河谷地。",
    },
    facts: [
      { k: { ru: "Век", en: "Century", zh: "年代" }, v: { ru: "XI", en: "11th", zh: "11 世纪" } },
      { k: { ru: "Высота", en: "Height", zh: "高度" }, v: { ru: "около 24 м сейчас", en: "about 24 m today", zh: "现高约 24 米" } },
      { k: { ru: "От Бишкека", en: "From Bishkek", zh: "距比什凯克" }, v: { ru: "1 час", en: "1 hour", zh: "1 小时" } },
    ],
    blocks: [
      {
        h: { ru: "Что здесь было", en: "What stood here", zh: "这里曾有什么" },
        p: {
          ru: "Баласагун был большим городом на Шёлковом пути: здесь жили купцы, работали мастерские, сюда приходили караваны. Землетрясения и время разрушили город, минарет уцелел частично — верхняя часть обрушилась, и он стал почти вдвое ниже.",
          en: "Balasagun was a large Silk Road city: merchants lived here, workshops ran, caravans arrived. Earthquakes and time destroyed it; the minaret survived only in part — the upper section collapsed and it lost nearly half its height.",
          zh: "巴拉萨衮曾是丝路大城：商贾云集，作坊林立，商队往来。地震与岁月将其摧毁，宣礼塔仅存下半部——上部坍塌，高度几乎减半。",
        },
      },
      {
        h: { ru: "Балбалы", en: "The balbals", zh: "石人像" },
        p: {
          ru: "Каменные изваяния с лицами и чашами в руках ставили тюрки над погребениями. Их свезли сюда из разных мест долины, и теперь они стоят рядами у башни — это один из самых больших сборов в стране.",
          en: "Turkic peoples set these stone figures, faces carved and a cup in hand, over burials. They were brought here from across the valley and now stand in rows by the tower — one of the largest collections in the country.",
          zh: "突厥人将这些刻有面容、手持杯盏的石像立于墓上。它们从谷地各处搬来，如今成排立在塔旁——是全国最大的石人像群之一。",
        },
      },
      {
        h: { ru: "Что делать на месте", en: "What to do there", zh: "到了做什么" },
        p: {
          ru: "Внутрь башни ведёт узкая винтовая лестница — подниматься стоит, вид наверху того стоит. При комплексе есть маленький музей с находками из городища. Поездку удобно совмещать с Чон-Кемином или дорогой на Иссык-Куль.",
          en: "A narrow spiral staircase runs inside the tower — the climb is worth it for the view. A small museum by the site holds finds from the town. The trip pairs well with Chon-Kemin or the drive to Issyk-Kul.",
          zh: "塔内有狭窄的螺旋梯——值得爬上去看风景。遗址旁有小型博物馆，陈列出土文物。可与琼克明或前往伊塞克湖的行程一并安排。",
        },
      },
    ],
  },
  {
    slug: "tash-rabat", kind: "place", art: "altitude",
    title: { ru: "Таш-Рабат", en: "Tash-Rabat", zh: "塔什拉巴特" },
    lead: {
      ru: "Каменное здание в горах Нарына, где останавливались караваны по дороге в Кашгар. Тридцать одна комната под куполом, толстые стены и тишина на высоте 3200 метров.",
      en: "A stone building in the Naryn mountains where caravans rested on the road to Kashgar. Thirty-one rooms under a dome, thick walls and silence at 3200 metres.",
      zh: "纳伦山中的石砌建筑，昔日前往喀什的商队在此歇脚。穹顶下三十一间屋子，墙厚，海拔 3200 米处一片寂静。",
    },
    facts: [
      { k: { ru: "Высота", en: "Altitude", zh: "海拔" }, v: { ru: "3200 м", en: "3200 m", zh: "3200 米" } },
      { k: { ru: "Комнат", en: "Rooms", zh: "房间" }, v: { ru: "31", en: "31", zh: "31 间" } },
      { k: { ru: "Связь", en: "Signal", zh: "信号" }, v: { ru: "Нет", en: "None", zh: "无" } },
    ],
    blocks: [
      {
        h: { ru: "Караван-сарай", en: "The caravanserai", zh: "商旅驿站" },
        p: {
          ru: "Здание сложено из камня без раствора в стенах метровой толщины. Внутри — центральный зал под куполом и ряды келий; по краям были загоны для животных. Точная дата спорна: называют и X, и XV век.",
          en: "It is built of stone, the walls a metre thick. Inside is a central hall under a dome and rows of cells, with pens for animals along the sides. The exact date is argued over: both the 10th and the 15th century are named.",
          zh: "墙体用石砌成，厚达一米。内部是穹顶大厅与成排的小室，两侧曾是牲畜圈。确切年代仍有争议：10 世纪与 15 世纪的说法都有。",
        },
      },
      {
        h: { ru: "Как доехать", en: "Getting there", zh: "怎么到达" },
        p: {
          ru: "От Нарына около двух с половиной часов: асфальт, затем хорошая грунтовка вдоль реки. Летом доезжает обычная машина. В ущелье стоят юртовые лагеря — ночевать лучше там, чем возвращаться в город затемно.",
          en: "About two and a half hours from Naryn: asphalt, then a good gravel road along the river. In summer an ordinary car makes it. Yurt camps stand in the gorge — better to sleep there than drive back after dark.",
          zh: "从纳伦出发约两个半小时：先柏油路，后沿河的良好砂石路。夏季普通轿车可达。峡谷里有毡房营地——与其摸黑返城，不如就住下。",
        },
      },
      {
        h: { ru: "Что рядом", en: "What is nearby", zh: "附近有什么" },
        p: {
          ru: "Выше по ущелью — перевал и тропы к озеру Чатыр-Куль, но туда нужен пропуск в пограничную зону. Его оформляют заранее, обычно через турфирму или хозяина лагеря.",
          en: "Higher up the gorge are a pass and trails to Lake Chatyr-Kul, but that needs a border-zone permit. It is arranged in advance, usually through an agency or your camp host.",
          zh: "峡谷上游有山口和通往恰特尔湖的小径，但需要边境区通行证。须提前办理，通常由旅行社或营地主人代办。",
        },
      },
    ],
  },
  {
    slug: "son-kul", kind: "place", art: "jailoo",
    title: { ru: "Сон-Куль", en: "Son-Kul", zh: "松湖" },
    lead: {
      ru: "Озеро на высоте 3016 метров и огромное летнее пастбище вокруг. С июня по сентябрь сюда поднимаются семьи со скотом и ставят юрты — остальное время здесь пусто и лежит снег.",
      en: "A lake at 3016 metres with a vast summer pasture around it. From June to September families come up with their herds and pitch yurts; the rest of the year it is empty and under snow.",
      zh: "海拔 3016 米的湖泊，四周是广阔的夏牧场。六月到九月，牧民带着畜群上来扎毡房；其余时间这里空无一人，覆着积雪。",
    },
    facts: [
      { k: { ru: "Высота", en: "Altitude", zh: "海拔" }, v: { ru: "3016 м", en: "3016 m", zh: "3016 米" } },
      { k: { ru: "Сезон", en: "Season", zh: "季节" }, v: { ru: "Июнь — сентябрь", en: "June to September", zh: "六月至九月" } },
      { k: { ru: "Дорога", en: "Road", zh: "道路" }, v: { ru: "Внедорожник", en: "4×4", zh: "越野车" } },
    ],
    blocks: [
      {
        h: { ru: "Жизнь на джайлоо", en: "Life on the pasture", zh: "牧场上的生活" },
        p: {
          ru: "День начинается с дойки и заканчивается, когда отары возвращаются к юртам. Гостю наливают кумыс, кормят бешбармаком и укладывают на кошмы под несколькими одеялами — ночью здесь бывает около нуля даже в июле.",
          en: "The day starts with milking and ends when the flocks come back to the yurts. A guest is poured kumys, fed beshbarmak and bedded on felt mats under several blankets — nights here can touch zero even in July.",
          zh: "一天从挤奶开始，到羊群回到毡房结束。客人会得到马奶酒、别什巴尔马克，睡在毡垫上盖好几层被子——即便七月，夜里也可能接近零度。",
        },
      },
      {
        h: { ru: "Дорога и высота", en: "The road and the altitude", zh: "道路与海拔" },
        p: {
          ru: "Подъём идёт через перевалы Калмак-Ашуу или Молдо-Ашуу: грунтовка с серпантином, нужен внедорожник. Поднимайтесь не спеша, пейте больше воды и не планируйте в первый день долгих прогулок.",
          en: "The climb goes over the Kalmak-Ashuu or Moldo-Ashuu passes: a gravel road with switchbacks, a 4×4 is needed. Go up slowly, drink more water and don't plan long walks on the first day.",
          zh: "上山要翻越卡尔马克-阿舒或莫尔多-阿舒山口：盘山砂石路，需要越野车。上行要慢，多喝水，第一天别安排长途步行。",
        },
      },
      {
        h: { ru: "Что взять", en: "What to bring", zh: "带什么" },
        p: {
          ru: "Тёплую куртку и шапку, повербанк, наличные и фонарик. Связи нет совсем: предупредите близких заранее и скачайте карту офлайн. Бронь на нашем сайте тоже открывается без интернета.",
          en: "A warm jacket and hat, a power bank, cash and a torch. There is no signal at all: warn your family in advance and download an offline map. Your booking on this site also opens without internet.",
          zh: "厚外套和帽子、充电宝、现金和手电。这里完全没有信号：请提前告知家人并下载离线地图。本站的预订没有网络也能打开。",
        },
      },
    ],
  },
  {
    slug: "issyk-kul", kind: "place", art: "lake",
    title: { ru: "Иссык-Куль", en: "Issyk-Kul", zh: "伊塞克湖" },
    lead: {
      ru: "Второе по величине горное озеро мира. Вода слегка солёная, поэтому зимой озеро не замерзает — отсюда и название: «горячее озеро».",
      en: "The world's second-largest alpine lake. The water is slightly salty, so it never freezes in winter — hence the name, «the warm lake».",
      zh: "世界第二大高山湖。湖水略带咸味，冬天不结冰——「热湖」之名由此而来。",
    },
    facts: [
      { k: { ru: "Длина", en: "Length", zh: "长度" }, v: { ru: "около 180 км", en: "about 180 km", zh: "约 180 公里" } },
      { k: { ru: "Высота", en: "Altitude", zh: "海拔" }, v: { ru: "1609 м", en: "1609 m", zh: "1609 米" } },
      { k: { ru: "Берега", en: "Shores", zh: "湖岸" }, v: { ru: "Южный тише северного", en: "The south is quieter than the north", zh: "南岸比北岸安静" } },
    ],
    blocks: [
      {
        h: { ru: "Два берега", en: "Two shores", zh: "两岸" },
        p: {
          ru: "Северный берег — пансионаты, пляжи и Чолпон-Ата; южный — тише: Тамга, Барскоон, каньон Сказка и дорога на высокогорье. Если хотите купаться и гулять по горам в один день, выбирайте юг.",
          en: "The north shore has resorts, beaches and Cholpon-Ata; the south is quieter: Tamga, Barskoon, the Skazka canyon and the road to the high plateau. If you want to swim and walk in the mountains the same day, choose the south.",
          zh: "北岸有度假区、沙滩和乔尔蓬阿塔；南岸更安静：塔姆加、巴尔斯昆、童话峡谷，以及通往高原的道路。想同一天游泳又进山，就选南岸。",
        },
      },
      {
        h: { ru: "Когда ехать", en: "When to come", zh: "何时前来" },
        p: {
          ru: "Купальный сезон — с конца июня по август, вода прогревается до 20–24 градусов. В мае и сентябре тихо и дёшево, но для купания прохладно; зато горы в это время особенно хороши.",
          en: "The swimming season runs from late June to August, with the water at 20–24 degrees. May and September are quiet and cheap but chilly for swimming — though the mountains are at their best then.",
          zh: "泳季从六月底到八月，水温 20—24 度。五月和九月安静又便宜，但下水偏凉——不过那时的山景最好。",
        },
      },
      {
        h: { ru: "Что посмотреть вокруг", en: "What to see around", zh: "周边看什么" },
        p: {
          ru: "Петроглифы под Чолпон-Атой, красные скалы Джети-Огуз, ущелье Алтын-Арашан с горячими источниками и каньон Сказка на южном берегу. До любого из этих мест от берега — не больше часа-двух.",
          en: "The petroglyphs near Cholpon-Ata, the red cliffs of Jeti-Oguz, the Altyn-Arashan gorge with its hot springs and the Skazka canyon on the south shore. None is more than an hour or two from the water.",
          zh: "乔尔蓬阿塔附近的岩画、杰提奥古兹红岩、带温泉的阿尔金阿拉善峡谷，以及南岸的童话峡谷。从湖边出发都不超过一两个小时。",
        },
      },
    ],
  },
  {
    slug: "jety-oguz", kind: "place", art: "redrocks",
    title: { ru: "Джети-Огуз", en: "Jeti-Oguz", zh: "杰提奥古兹" },
    lead: {
      ru: "Гряда красных скал недалеко от Каракола. Название значит «семь быков» — скалы и правда стоят как стадо, развёрнутое к долине.",
      en: "A ridge of red cliffs near Karakol. The name means «seven bulls» — and the rocks really do stand like a herd facing the valley.",
      zh: "卡拉科尔附近的一道红色岩壁。名字意为「七头牛」——岩石确实像一群牛面朝河谷而立。",
    },
    facts: [
      { k: { ru: "От Каракола", en: "From Karakol", zh: "距卡拉科尔" }, v: { ru: "40 минут", en: "40 minutes", zh: "40 分钟" } },
      { k: { ru: "Высота", en: "Altitude", zh: "海拔" }, v: { ru: "около 2200 м", en: "about 2200 m", zh: "约 2200 米" } },
      { k: { ru: "Сезон", en: "Season", zh: "季节" }, v: { ru: "Май — октябрь", en: "May to October", zh: "五月至十月" } },
    ],
    blocks: [
      {
        h: { ru: "Легенда", en: "The legend", zh: "传说" },
        p: {
          ru: "Про скалы рассказывают историю о двух ханах, не поделивших женщину, и о поминальном пире, на котором зарезали семь быков. Скала «Разбитое сердце» стоит чуть ниже по долине — её показывают первой.",
          en: "The rocks carry a story of two khans who could not share a woman and of the funeral feast at which seven bulls were slaughtered. The «Broken Heart» rock stands a little lower in the valley and is shown first.",
          zh: "传说两位可汗为一个女子反目，丧宴上宰了七头牛。谷地稍低处有「破碎的心」岩，通常先带你看它。",
        },
      },
      {
        h: { ru: "Что делать", en: "What to do", zh: "做什么" },
        p: {
          ru: "Выше по ущелью — водопад, еловый лес и Долина цветов, которая краснеет в июне. Летом на поляне стоят юрты, можно взять лошадь и подняться к водопаду за три часа.",
          en: "Higher up the gorge are a waterfall, spruce forest and the Valley of Flowers, which turns red in June. In summer yurts stand on the meadow; you can take a horse and ride up to the waterfall in three hours.",
          zh: "峡谷上游有瀑布、云杉林和六月转红的「花谷」。夏天草甸上支着毡房，可以骑马三小时到瀑布。",
        },
      },
    ],
  },
  {
    slug: "arslanbob", kind: "place", art: "walnut",
    title: { ru: "Арсланбоб", en: "Arslanbob", zh: "阿尔斯兰博布" },
    lead: {
      ru: "Самый большой реликтовый ореховый лес в мире — около одиннадцати тысяч гектаров на южных склонах. Село внизу живёт сбором орехов с конца сентября.",
      en: "The largest relict walnut forest in the world — some eleven thousand hectares on the southern slopes. The village below lives by the nut harvest from late September.",
      zh: "世界最大的原生核桃林——南坡上约一万一千公顷。山下的村子从九月底开始靠采收核桃为生。",
    },
    facts: [
      { k: { ru: "Площадь леса", en: "Forest area", zh: "林地面积" }, v: { ru: "около 11 000 га", en: "about 11,000 ha", zh: "约 1.1 万公顷" } },
      { k: { ru: "Сбор орехов", en: "Harvest", zh: "采收" }, v: { ru: "Конец сентября — октябрь", en: "Late September to October", zh: "九月底至十月" } },
      { k: { ru: "От Оша", en: "From Osh", zh: "距奥什" }, v: { ru: "около 4 часов", en: "about 4 hours", zh: "约 4 小时" } },
    ],
    blocks: [
      {
        h: { ru: "Лес и легенда", en: "The forest and the legend", zh: "林与传说" },
        p: {
          ru: "По преданию садовник по имени Арслан-боб получил от пророка мешок семян и засадил ими эту долину. Деревьям здесь сотни лет, многие семьи из поколения в поколение закреплены за своими участками леса.",
          en: "The story goes that a gardener named Arslan-bob was given a sack of seeds by the prophet and planted this valley with them. The trees are centuries old, and families have been tied to their own patches of forest for generations.",
          zh: "传说一位名叫阿尔斯兰博布的园丁得到先知所赐的一袋种子，栽满了这片山谷。这里的树有数百年历史，许多家族世代守着自己那片林子。",
        },
      },
      {
        h: { ru: "Что смотреть", en: "What to see", zh: "看什么" },
        p: {
          ru: "Два водопада — малый почти у села, большой выше по склону, к нему идти пару часов. Осенью весь лес работает: семьи ставят палатки среди деревьев и сбивают орехи длинными шестами.",
          en: "Two waterfalls — the small one almost in the village, the big one higher up, a couple of hours' walk. In autumn the whole forest is at work: families camp among the trees and knock the nuts down with long poles.",
          zh: "两处瀑布——小的几乎就在村边，大的在高处，要走两小时。秋天整片林子都在劳作：各家在树间搭帐篷，用长杆打落核桃。",
        },
      },
      {
        h: { ru: "Как добраться", en: "Getting there", zh: "怎么到达" },
        p: {
          ru: "Из Бишкека удобнее лететь в Ош или Джалал-Абад, дальше машиной. Дорога по трассе Бишкек — Ош занимает около двенадцати часов и идёт через высокие перевалы.",
          en: "From Bishkek it is easier to fly to Osh or Jalal-Abad and continue by car. The Bishkek — Osh highway takes about twelve hours and crosses high passes.",
          zh: "从比什凯克建议先飞奥什或贾拉拉巴德，再换车。走比什凯克—奥什公路约需十二小时，要翻越高山口。",
        },
      },
    ],
  },
  {
    slug: "ala-archa", kind: "place", art: "altitude",
    title: { ru: "Ала-Арча", en: "Ala-Archa", zh: "阿拉阿恰" },
    lead: {
      ru: "Национальный парк в сорока километрах от Бишкека: ущелье с рекой, арчовый лес и ледники. Сюда едут на день, чтобы увидеть настоящие горы и вернуться к ужину.",
      en: "A national park forty kilometres from Bishkek: a river gorge, juniper forest and glaciers. People come for the day to see real mountains and be back for dinner.",
      zh: "距比什凯克四十公里的国家公园：河谷、刺柏林与冰川。人们当天往返，看看真正的大山，晚饭前回城。",
    },
    facts: [
      { k: { ru: "От Бишкека", en: "From Bishkek", zh: "距比什凯克" }, v: { ru: "около 1 часа", en: "about 1 hour", zh: "约 1 小时" } },
      { k: { ru: "Вход", en: "Entry", zh: "入园" }, v: { ru: "Платный, круглый год", en: "Paid, open all year", zh: "收费，全年开放" } },
      { k: { ru: "Тропы", en: "Trails", zh: "步道" }, v: { ru: "От часа до двух дней", en: "From an hour to two days", zh: "一小时到两天不等" } },
    ],
    blocks: [
      {
        h: { ru: "Короткие маршруты", en: "Short routes", zh: "短途路线" },
        p: {
          ru: "От парковки идёт ровная тропа вдоль реки — час туда и обратно, подходит с детьми. Подъём к водопаду Ак-Сай занимает три-четыре часа в одну сторону и требует обуви с хорошей подошвой.",
          en: "A level trail runs from the car park along the river — an hour there and back, fine with children. The climb to the Ak-Sai waterfall takes three or four hours one way and needs shoes with a proper sole.",
          zh: "从停车场有一条沿河的平缓步道——来回一小时，适合带孩子。上到阿克赛瀑布单程三四小时，需要鞋底抓地好的鞋。",
        },
      },
      {
        h: { ru: "О чём помнить", en: "What to remember", zh: "注意什么" },
        p: {
          ru: "Погода в ущелье меняется быстро: внизу солнце, выше может идти снег даже летом. Воду и еду берите с собой — в парке почти ничего не купить.",
          en: "The weather in the gorge turns fast: sun below, snow higher up even in summer. Bring water and food — there is almost nothing to buy in the park.",
          zh: "峡谷天气变化快：谷底晴朗，高处夏天也可能下雪。自带水和食物——园内几乎买不到东西。",
        },
      },
    ],
  },
  {
    slug: "sulaiman", kind: "place", art: "redrocks",
    title: { ru: "Сулайман-Тоо", en: "Sulaiman-Too", zh: "苏莱曼圣山" },
    lead: {
      ru: "Пятиглавая гора посреди Оша, к которой приходят паломники уже несколько тысяч лет. Первый объект Кыргызстана в списке Всемирного наследия ЮНЕСКО.",
      en: "A five-peaked mountain in the middle of Osh, a place of pilgrimage for thousands of years. The first site in Kyrgyzstan to enter the UNESCO World Heritage list.",
      zh: "矗立在奥什市中心的五峰圣山，数千年来香客不绝。吉尔吉斯斯坦首个列入联合国教科文组织世界遗产的地点。",
    },
    facts: [
      { k: { ru: "Город", en: "City", zh: "城市" }, v: { ru: "Ош", en: "Osh", zh: "奥什" } },
      { k: { ru: "ЮНЕСКО", en: "UNESCO", zh: "世界遗产" }, v: { ru: "С 2009 года", en: "Since 2009", zh: "2009 年起" } },
      { k: { ru: "Подъём", en: "Climb", zh: "登顶" }, v: { ru: "30–40 минут", en: "30–40 minutes", zh: "30—40 分钟" } },
    ],
    blocks: [
      {
        h: { ru: "Священная гора", en: "A sacred mountain", zh: "一座圣山" },
        p: {
          ru: "На склонах — пещеры, петроглифы и места поклонения, которым тысячи лет. Люди приходят сюда просить о здоровье и детях; на камнях видны отполированные спуски, по которым скатываются паломники.",
          en: "The slopes hold caves, petroglyphs and places of worship thousands of years old. People come asking for health and children; the rock bears polished slides worn smooth by pilgrims.",
          zh: "山坡上有洞穴、岩画和数千年的祭拜处。人们来此祈求健康与子嗣；石面上留有被香客磨得光滑的滑道。",
        },
      },
      {
        h: { ru: "Музей в пещере", en: "The museum in the cave", zh: "洞中的博物馆" },
        p: {
          ru: "В склон горы встроен музей: внутри грота собраны находки из Оша и древности Ферганской долины. Сверху открывается весь город — лучше подниматься под вечер, когда спадает жара.",
          en: "A museum is built into the hillside: finds from Osh and antiquities of the Fergana valley are gathered inside the grotto. The whole city opens from the top — go up towards evening, when the heat lets go.",
          zh: "山体里嵌着一座博物馆：洞窟内陈列奥什的出土文物与费尔干纳谷地的古物。登顶可俯瞰全城——傍晚暑气退去时再上去更好。",
        },
      },
    ],
  },
];

export const getStory = (slug: string) => STORIES.find((s) => s.slug === slug);
export const storyForMeal = (titleRu: string) => STORIES.find((s) => s.mealTitleRu === titleRu);
