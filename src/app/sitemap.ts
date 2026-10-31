import type { MetadataRoute } from "next";

import { SITE_URL as SITE } from "@/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["es", "en"].map(l => ({
    url: `${SITE}/${l}`,
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages: { es: `${SITE}/es`, en: `${SITE}/en` } },
  }));
}
