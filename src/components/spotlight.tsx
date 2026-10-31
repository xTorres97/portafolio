"use client";

import type { PointerEvent, ReactNode } from "react";

/** Contenedor con una luz suave que sigue al cursor (solo con mouse). */
export function Spotlight({ className, children }: { className?: string; children: ReactNode }) {
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return <div onPointerMove={onMove} className={`spotlight ${className ?? ""}`}>{children}</div>;
}
