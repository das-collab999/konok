"use client";

import { Photo, hasPhoto } from "./Photo";
import { Medallion } from "./ethno";

/**
 * Место под фотографию.
 *
 * Если снимок есть — показываем его. Если нет — не подсовываем рисунок,
 * а оставляем спокойную войлочную плашку с узором: так видно, что кадра
 * пока нет, и это не выглядит дешёвой картинкой.
 */
export function PhotoSlot({
  name,
  alt,
  ratio = "3/2",
  sizes = "100vw",
  priority = false,
  className = "",
}: {
  name?: string;
  alt: string;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const box = `block w-full object-cover ${className}`;

  if (hasPhoto(name)) {
    return (
      <Photo
        name={name as string}
        alt={alt}
        sizes={sizes}
        priority={priority}
        className={box}
        // пропорция задаётся снаружи через style, чтобы не плодить классы
      />
    );
  }

  return (
    <div
      className={`felt relative flex items-center justify-center overflow-hidden bg-cream-2 ${className}`}
      style={{ aspectRatio: ratio }}
      aria-hidden="true"
    >
      <Medallion id={`slot-${name ?? alt}`} size={220} color="#8E2420" className="opacity-[0.13]" />
    </div>
  );
}
