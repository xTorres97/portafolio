"use client";

import { useEffect, useRef, useState } from "react";

/** Cuenta desde 0 hasta el número del texto ("13k+", "35", "1 clic") cuando aparece en pantalla. */
export function CountUp({ value, duration = 1100 }: { value: string; duration?: number }) {
  const match = value.match(/^(\d+)(.*)$/);
  const suffix = match ? match[2] : "";
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    const m = value.match(/^(\d+)/);
    const goal = m ? Number(m[1]) : 0;
    if (!el || goal === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.round(eased * goal));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      setN(0);
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value, duration]);

  // El texto completo queda para lectores de pantalla y para quien no tiene JavaScript
  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden>{n === null || !match ? value : `${n}${suffix}`}</span>
    </span>
  );
}
