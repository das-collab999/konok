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
  page: string;
};

export const PHOTOS: Record<string, PhotoMeta> = {
  "hero": { w: 1200, h: 675, widths: [640, 1200], author: "Kalpak Travel", license: "CC BY 2.0", page: "https://commons.wikimedia.org/wiki/File%3AKyrgyzstan_yurts_at_Song_Kul_%2848221119097%29.jpg" },
  "sonkul": { w: 1200, h: 1500, widths: [640, 1200], author: "Kalpak Travel", license: "CC BY 2.0", page: "https://commons.wikimedia.org/wiki/File%3AKyrgyzstan_yurts_at_Song_Kul_%2848221119097%29.jpg" },
  "sonkul-night-w": { w: 1200, h: 800, widths: [640, 1200], author: "Benjamin Goetzinger", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File%3AMilky_way%2C_Lake_Son_Kol%2C_Kyrgyzstan.jpg" },
  "sonkul-w": { w: 1200, h: 800, widths: [640, 1200], author: "Kalpak Travel", license: "CC BY 2.0", page: "https://commons.wikimedia.org/wiki/File%3AKyrgyzstan_yurts_at_Song_Kul_%2848221119097%29.jpg" },
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
};

/** Снимок для рассказа (ключ — slug рассказа). */
export const STORY_PHOTO: Record<string, string> = {
  beshbarmak: "beshbarmak-w",
  lagman: "lagman-w",
  manty: "manty-w",
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
  yurt: "yurt-inside-w",
  felt: "shyrdak-w",
  komuz: "komuz-w",
  table: "yurt-breakfast-w",
  kokboru: "jetyoguz-horses-w",
  eagle: "felt-rugs-w",
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
