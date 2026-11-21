import { PhotoCredits } from "./PhotoCredits";

export const metadata = {
  title: "Фотографии и авторы — Конок",
  description: "Снимки на сайте взяты с Викисклада. Здесь указан автор и лицензия каждого.",
};

export default function PhotosPage() {
  return <PhotoCredits />;
}
