import { PHOTOS } from "@/data/photos";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Есть ли такой снимок. Если нет — показываем рисунок, как раньше. */
export function hasPhoto(name?: string): boolean {
  return !!name && Object.prototype.hasOwnProperty.call(PHOTOS, name);
}

/**
 * Настоящая фотография с Викисклада.
 *
 * Каждый снимок лежит в public/photos в двух размерах (640 и 1200 px) —
 * браузер берёт нужный сам. Автор и лицензия указаны на странице
 * «Фотографии»; сами данные — в src/data/photos.ts.
 */
export function Photo({
  name,
  alt,
  className = "",
  sizes = "100vw",
  priority = false,
}: {
  name: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const p = PHOTOS[name];
  if (!p) return null;

  const url = (w: number) => `${base}/photos/${name}-${w}.webp`;
  const widest = Math.max(...p.widths);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url(widest)}
      srcSet={p.widths.map((w) => `${url(w)} ${w}w`).join(", ")}
      sizes={sizes}
      width={p.w}
      height={p.h}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}
