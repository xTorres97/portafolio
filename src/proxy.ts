import { NextResponse, type NextRequest } from "next/server";

/** "/" redirige a /es o /en según el idioma preferido del navegador. */
export function proxy(req: NextRequest) {
  const first = (req.headers.get("accept-language") ?? "").split(",")[0]?.trim().toLowerCase() ?? "";
  const lang = first.startsWith("es") ? "es" : "en";
  return NextResponse.redirect(new URL(`/${lang}`, req.url));
}

export const config = { matcher: ["/"] };
