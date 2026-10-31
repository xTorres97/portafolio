import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export default function sitemap(): MetadataRoute.Sitemap {
  return ["es", "en"].map(l => ({
    url: `${SITE}/${l}`,
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages: { es: `${SITE}/es`, en: `${SITE}/en` } },
  }));
}
