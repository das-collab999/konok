// Фотографии с Викисклада (Wikimedia Commons).
//
// Этот файл создаётся скриптом после скачивания снимков: он знает размер
// каждого кадра, автора и лицензию. Если фотографии нет, сайт показывает
// рисунок — поэтому карточки не ломаются.

export type PhotoMeta = {
  /** ширина самого большого варианта */
  w: number;
  h: number;
  /** какие ширины лежат в public/photos */
  widths: number[];
  author: string;
  license: string;
  /** откуда снимок: Wikimedia Commons или Openverse */
  source: string;
  page: string;
};

export const PHOTOS: Record<string, PhotoMeta> = {
  "alaarcha-w": { w: 600, h: 400, widths: [320, 600], author: "Gael Varoquaux", license: "CC BY 2.0", source: "Openverse", page: "https://www.flickr.com/photos/66885349@N03/15248931769" },
  "arslanbob": { w: 600, h: 450, widths: [320, 600], author: "surrealpenguin", license: "CC BY-SA 2.0", source: "Openverse", page: "https://www.flickr.com/photos/85254122@N00/4427086501" },
  "arslanbob-w": { w: 600, h: 400, widths: [320, 600], author: "surrealpenguin", license: "CC BY-SA 2.0", source: "Openverse", page: "https://www.flickr.com/photos/85254122@N00/4427088233" },
  "beshbarmak-w": { w: 600, h: 400, widths: [320, 600], author: "upyernoz", license: "CC BY 2.0", source: "Openverse", page: "https://www.flickr.com/photos/48600082269@N01/5605950413" },
  "bishkek-w": { w: 600, h: 400, widths: [320, 600], author: "Francisco Anzola", license: "CC BY 2.0", source: "Openverse", page: "https://www.flickr.com/photos/10345599@N03/48892076451" },
  "burana-w": { w: 600, h: 400, widths: [320, 600], author: "Ninara", license: "CC BY 2.0", source: "Openverse", page: "https://www.flickr.com/photos/37583176@N00/30791687288" },
  "chonkemin": { w: 600, h: 450, widths: [320, 600], author: "yenieksen", license: "CC BY-SA 2.0", source: "Openverse", page: "https://www.flickr.com/photos/127544265@N05/15172389992" },
  "felt-rugs-w": { w: 600, h: 400, widths: [320, 600], author: "kalpaktravel", license: "CC BY 2.0", source: "Openverse", page: "https://www.flickr.com/photos/147403441@N04/48215539647" },
  "hero": { w: 600, h: 750, widths: [320, 600], author: "Ninara", license: "CC BY 2.0", source: "Openverse", page: "https://www.flickr.com/photos/37583176@N00/30709627198" },
  "issykkul-south": { w: 600, h: 450, widths: [320, 600], author: "zhaffsky", license: "CC BY-SA 2.0", source: "Openverse", page: "https://www.flickr.com/photos/94636189@N00/495122092" },
  "issykkul-w": { w: 600, h: 400, widths: [320, 600], author: "Ninara", license: "CC BY 2.0", source: "Openverse", page: "https://www.flickr.com/photos/37583176@N00/43713946455" },
  "jetyoguz-horses-w": { w: 600, h: 400, widths: [320, 600], author: "MrHicks46", license: "CC BY-SA 2.0", source: "Openverse", page: "https://www.flickr.com/photos/14868775@N07/9281673341" },
  "jetyoguz-w": { w: 600, h: 400, widths: [320, 600], author: "Alex Nesher", license: "CC BY 2.0", source: "Openverse", page: "https://www.flickr.com/photos/61460802@N03/6082398395" },
  "jetyoguz-yurt": { w: 600, h: 450, widths: [320, 600], author: "Prof. Mortel", license: "CC BY 2.0", source: "Openverse", page: "https://www.flickr.com/photos/43714545@N06/53182869304" },
  "karakol": { w: 600, h: 450, widths: [320, 600], author: "Dan Lundberg", license: "CC BY-SA 2.0", source: "Openverse", page: "https://www.flickr.com/photos/9508280@N07/16070753670" },
  "karakol-cathedral-w": { w: 600, h: 400, widths: [320, 600], author: "Dan Lundberg", license: "CC BY-SA 2.0", source: "Openverse", page: "https://www.flickr.com/photos/9508280@N07/15638220853" },
  "kumys-w": { w: 600, h: 400, widths: [320, 600], author: "Ninara", license: "CC BY 2.0", source: "Openverse", page: "https://www.flickr.com/photos/37583176@N00/43861331234" },
  "lagman-w": { w: 600, h: 400, widths: [320, 600], author: "amanderson2", license: "CC BY 2.0", source: "Openverse", page: "https://www.flickr.com/photos/49399018@N00/44310736140" },
  "manty-w": { w: 600, h: 400, widths: [320, 600], author: "amanderson2", license: "CC BY 2.0", source: "Openverse", page: "https://www.flickr.com/photos/49399018@N00/11364910594" },
  "museum-w": { w: 600, h: 400, widths: [320, 600], author: "alexjbutler", license: "CC BY 2.0", source: "Openverse", page: "https://www.flickr.com/photos/126089590@N02/14954786367" },
  "petroglyph-w": { w: 600, h: 400, widths: [320, 600], author: "Mr. Theklan", license: "CC BY-SA 2.0", source: "Openverse", page: "https://www.flickr.com/photos/99843959@N00/19746549634" },
  "shyrdak-w": { w: 600, h: 400, widths: [320, 600], author: "surrealpenguin", license: "CC BY-SA 2.0", source: "Openverse", page: "https://www.flickr.com/photos/85254122@N00/4427854878" },
  "sonkul": { w: 600, h: 450, widths: [320, 600], author: "Ninara", license: "CC BY 2.0", source: "Openverse", page: "https://www.flickr.com/photos/37583176@N00/43670184405" },
  "sonkul-night-w": { w: 1200, h: 800, widths: [640, 1200], author: "Benjamin Goetzinger", license: "CC BY-SA 4.0", source: "Wikimedia Commons", page: "https://commons.wikimedia.org/wiki/File%3AMilky_way%2C_Lake_Son_Kol%2C_Kyrgyzstan.jpg" },
  "sonkul-w": { w: 600, h: 400, widths: [320, 600], author: "Ninara", license: "CC BY 2.0", source: "Openverse", page: "https://www.flickr.com/photos/37583176@N00/44580008121" },
  "sulaiman-w": { w: 600, h: 400, widths: [320, 600], author: "xiquinhosilva", license: "CC BY 2.0", source: "Openverse", page: "https://www.flickr.com/photos/7138083@N04/54509639686" },
  "tashrabat": { w: 600, h: 450, widths: [320, 600], author: "Gusjer", license: "CC BY 2.0", source: "Openverse", page: "https://www.flickr.com/photos/20244534@N00/4356418217" },
  "tashrabat-family-w": { w: 640, h: 427, widths: [640], author: "George6996", license: "CC BY-SA 4.0", source: "Wikimedia Commons", page: "https://commons.wikimedia.org/wiki/File%3AKyrgyz_rural_family_at_Tash_Rabat_Caravanserai%2C_TianShan_Mountains.jpg" },
  "tashrabat-w": { w: 600, h: 400, widths: [320, 600], author: "Gusjer", license: "CC BY 2.0", source: "Openverse", page: "https://www.flickr.com/photos/20244534@N00/4357166300" },
  "yurt-inside-w": { w: 600, h: 400, widths: [320, 600], author: "mmmavocado", license: "CC BY 2.0", source: "Openverse", page: "https://www.flickr.com/photos/10239508@N07/4224445892" },
};

/** Какой снимок показывать для места (ключ — slug места). */
export const PLACE_PHOTO: Record<string, string> = {
  "sonkul-aseke": "sonkul",
  "tash-rabat": "tashrabat",
  "jety-oguz": "jetyoguz-yurt",
  "tamga": "issykkul-south",
  "karakol-archa": "karakol",
  "chon-kemin": "chonkemin",
  "arslanbob": "arslanbob",
};

/** Снимок для блюда или напитка (ключ — русское название). */
export const MEAL_PHOTO: Record<string, string> = {
  "Бешбармак": "beshbarmak-w",
  "Лагман": "lagman-w",
  "Манты": "manty-w",
  "Кумыс": "kumys-w",
};

/** Снимок для рассказа (ключ — slug рассказа). */
export const STORY_PHOTO: Record<string, string> = {
  beshbarmak: "beshbarmak-w",
  lagman: "lagman-w",
  manty: "manty-w",
  kumys: "kumys-w",
  burana: "burana-w",
  "tash-rabat": "tashrabat-w",
  "son-kul": "sonkul-night-w",
  "issyk-kul": "issykkul-w",
  "jety-oguz": "jetyoguz-w",
  arslanbob: "arslanbob-w",
  "ala-archa": "alaarcha-w",
  sulaiman: "sulaiman-w",
};

/** Снимок для обычая со страницы истории. */
export const CUSTOM_PHOTO: Record<string, string> = {
  yurt: "tashrabat-family-w",
  felt: "felt-rugs-w",
  table: "yurt-inside-w",
  kokboru: "jetyoguz-horses-w",
};

/** Снимок для эпохи на ленте времени. */
export const ERA_PHOTO: Record<string, string> = {
  petro: "petroglyph-w",
  silk: "tashrabat-w",
  karakhanid: "burana-w",
  nomad: "jetyoguz-horses-w",
  russia: "karakol-cathedral-w",
  soviet: "bishkek-w",
  today: "museum-w",
};

/** Снимок для впечатления (порядок как в t.home.experiences). */
export const EXPERIENCE_PHOTO: string[] = ["shyrdak-w", "beshbarmak-w", "jetyoguz-horses-w", ""];
