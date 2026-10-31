/** Dominio público del portafolio (se puede sobrescribir con NEXT_PUBLIC_SITE_URL). */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL ? "https://xtorres-dev.vercel.app" : "http://localhost:3000");
