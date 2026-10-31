import { ImageResponse } from "next/og";
import { DICTS, LOCALES, isLocale } from "@/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Jose Torres";

export function generateStaticParams() {
  return LOCALES.map(lang => ({ lang }));
}

/** Imagen para compartir en redes: nombre, título y los colores de los tres proyectos. */
export default async function OG({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = DICTS[isLocale(lang) ? lang : "es"];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f6f7f8", padding: 72, color: "#15171c" }}>
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>Jose Torres</div>
        <div style={{ display: "flex", fontSize: 78, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3, maxWidth: 980 }}>{t.hero.title}</div>
        <div style={{ display: "flex", gap: 16 }}>
          {t.projects.map(p => (
            <div key={p.slug} style={{ display: "flex", flex: 1, height: 96, borderRadius: 22, background: p.color.base, color: "#fff", fontSize: 30, fontWeight: 700, alignItems: "flex-end", padding: 22 }}>{p.name}</div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
