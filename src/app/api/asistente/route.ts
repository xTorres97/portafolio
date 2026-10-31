import { NextResponse } from "next/server";
import { isLocale } from "@/content";
import { buildSystemPrompt } from "@/lib/knowledge";


const MAX_TURNS = 8;          // preguntas por conversación
const MAX_CHARS = 500;        // largo de cada pregunta
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 20;    // pedidos por IP cada 10 minutos

// Límite en memoria por instancia: suficiente para frenar abusos en un portafolio
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(t => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const body = (await req.json().catch(() => null)) as { lang?: string; messages?: Msg[] } | null;
  const lang = body?.lang && isLocale(body.lang) ? body.lang : "es";
  const messages = Array.isArray(body?.messages) ? body!.messages : [];
  const valid = messages.every(m => (m.role === "user" || m.role === "assistant") && typeof m.content === "string");
  if (!valid || messages.length === 0 || messages.at(-1)?.role !== "user") {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  if (messages.filter(m => m.role === "user").length > MAX_TURNS) {
    return NextResponse.json({ error: "limit" }, { status: 429 });
  }

  const contents = messages.slice(-12).map(m => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content.slice(0, m.role === "user" ? MAX_CHARS : 2000) }],
  }));

  // Modo de prueba local sin clave (tests e2e)
  if (process.env.ASSISTANT_MOCK === "1") {
    const q = contents.at(-1)!.parts[0].text;
    return NextResponse.json({ reply: lang === "es" ? `Respuesta de prueba a: "${q}". Escríbele a Jose para más detalles.` : `Test reply to: "${q}". Contact Jose for details.` });
  }

  const key = process.env.GEMINI_API_KEY;
  if (!key) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  try {
    const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: buildSystemPrompt(lang) }] },
        contents,
        generationConfig: { temperature: 0.4, maxOutputTokens: 450, thinkingConfig: { thinkingBudget: 0 } },
      }),
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) {
      console.error("gemini error", res.status, (await res.text()).slice(0, 300));
      return NextResponse.json({ error: "upstream" }, { status: 502 });
    }
    const data = await res.json();
    const reply: string = data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("").trim() ?? "";
    if (!reply) return NextResponse.json({ error: "empty" }, { status: 502 });
    return NextResponse.json({ reply });
  } catch (e) {
    console.error("assistant error", e);
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }
}
