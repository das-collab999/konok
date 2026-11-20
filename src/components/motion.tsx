"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Движение на сайте.
 *
 * Всё сделано средствами браузера, без тяжёлых библиотек: блоки проявляются
 * при прокрутке, узоры «прорисовываются» линией, горы чуть отстают от
 * страницы. Если в телефоне включено «уменьшение движения», всё замирает —
 * за это отвечает правило в globals.css.
 */

function useInView<T extends HTMLElement>(once = true) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setInView(true); return; }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setInView(true); return; }

    // Страховка: что бы ни случилось со скриптом, через 1,2 с блок виден.
    const safety = setTimeout(() => setInView(true), 1200);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin: "-10% 0px -10% 0px", threshold: 0.01 },
    );
    io.observe(el);
    return () => { clearTimeout(safety); io.disconnect(); };
  }, [once]);

  return { ref, inView };
}

/** Блок проявляется снизу вверх, когда до него доходит прокрутка. */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${inView ? "reveal-in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/** То же самое, но пунктом списка — чтобы не ломать сетку. */
export function RevealItem({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView<HTMLLIElement>();
  return (
    <li ref={ref} className={`reveal ${inView ? "reveal-in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </li>
  );
}

/** Узор рисуется линией, как будто его ведут рукой. */
export function DrawIn({ children, duration = 1600, className = "" }: { children: ReactNode; duration?: number; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`draw ${inView ? "draw-in" : ""} ${className}`}
      style={{ ["--draw-time" as string]: `${duration}ms` }}
    >
      {children}
    </div>
  );
}

/** Горы чуть отстают от прокрутки — глубина без тяжёлых библиотек. */
export function Parallax({ children, strength = 0.08, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = el.getBoundingClientRect();
        const shift = (r.top + r.height / 2 - window.innerHeight / 2) * -strength;
        el.style.setProperty("--shift", `${shift.toFixed(1)}px`);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [strength]);

  return <div ref={ref} className={`parallax ${className}`}>{children}</div>;
}

/** Бесконечная лента орнамента: едет медленно, как будто разматывают ковёр. */
export function Marquee({ children, seconds = 60, className = "" }: { children: ReactNode; seconds?: number; className?: string }) {
  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div className="marquee-track" style={{ ["--marquee-time" as string]: `${seconds}s` }}>
        <div className="marquee-part">{children}</div>
        <div className="marquee-part">{children}</div>
      </div>
    </div>
  );
}

/**
 * Заставка при первом открытии: узор прорисовывается и занавес уходит вверх.
 * Показывается один раз за визит, пропускается по нажатию и при
 * «уменьшении движения».
 */
export function Intro({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let skip = false;
    try { skip = sessionStorage.getItem("konok-intro") === "1"; } catch {}
    if (skip) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setShow(true);
    try { sessionStorage.setItem("konok-intro", "1"); } catch {}

    const a = setTimeout(() => setLeaving(true), 1700);
    const b = setTimeout(() => setShow(false), 2600);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`intro ${leaving ? "intro-out" : ""}`}
      onClick={() => setLeaving(true)}
      role="presentation"
    >
      <div className="draw draw-in intro-mark">{children}</div>
    </div>
  );
}
