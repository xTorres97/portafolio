"use client";

import { useEffect } from "react";

/**
 * Cambia el fondo de la página al color del proyecto que cruza el centro de la pantalla.
 * Usa IntersectionObserver con una "línea" en el medio del viewport: no escucha el scroll.
 */
export function ScrollTint() {
  useEffect(() => {
    const root = document.documentElement;
    const targets = [...document.querySelectorAll<HTMLElement>("[data-tint]")];
    const active = new Set<HTMLElement>();

    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) active.add(e.target as HTMLElement);
          else active.delete(e.target as HTMLElement);
        }
        const current = [...active].at(-1);
        if (current) root.style.setProperty("--page-bg", current.dataset.tint!);
        else root.style.removeProperty("--page-bg");
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    targets.forEach(t => io.observe(t));
    return () => { io.disconnect(); root.style.removeProperty("--page-bg"); };
  }, []);
  return null;
}
