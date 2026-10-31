"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "./cn";

/** Captura grande con miniaturas para cambiarla. */
export function Gallery({ images, accent }: { images: { src: string; alt: string }[]; accent: string }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="overflow-hidden rounded-2xl bg-surface shadow-[0_30px_60px_-30px_rgba(20,23,28,.35)] ring-1 ring-black/5">
        <Image key={images[active].src} src={images[active].src} alt={images[active].alt} width={1600} height={1000}
          sizes="(min-width: 1024px) 720px, 100vw" className="h-auto w-full animate-[rise_.35s_ease-out]" priority={false} />
      </div>
      <div className="mt-3 flex gap-2" role="tablist" aria-label="Capturas">
        {images.map((img, i) => (
          <button key={img.src} role="tab" aria-selected={i === active} aria-label={img.alt} onClick={() => setActive(i)}
            className={cn("relative h-14 w-20 overflow-hidden rounded-lg ring-2 transition-opacity sm:h-16 sm:w-24", i === active ? "opacity-100" : "opacity-55 ring-transparent hover:opacity-90")}
            style={i === active ? { ["--tw-ring-color" as string]: accent } : undefined}>
            <Image src={img.src} alt="" fill sizes="96px" className="object-cover object-top" />
          </button>
        ))}
      </div>
    </div>
  );
}
