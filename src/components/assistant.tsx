"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { ArrowUp, MessageCircle, Sparkles, X } from "lucide-react";
import { DICTS, whatsappLink, type Locale } from "@/content";
import { cn } from "./cn";

type Msg = { role: "user" | "assistant"; content: string };
const MAX_TURNS = 8;

/** Convierte **negritas**, listas y enlaces en elementos React (nunca HTML crudo). */
function RichText({ text }: { text: string }) {
  const inline = (line: string, key: string) =>
    line.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.]+)/g).filter(Boolean).map((part, i) => {
      const k = `${key}-${i}`;
      if (part.startsWith("**") && part.endsWith("**")) return <strong key={k}>{part.slice(2, -2)}</strong>;
      if (/^https?:\/\//.test(part)) return <a key={k} href={part} target="_blank" rel="noreferrer" className="break-all underline underline-offset-2">{part.replace(/^https?:\/\//, "")}</a>;
      if (/@/.test(part) && /^[\w.+-]+@/.test(part)) return <a key={k} href={`mailto:${part}`} className="underline underline-offset-2">{part}</a>;
      return <Fragment key={k}>{part}</Fragment>;
    });

  const lines = text.split("\n").filter((l, i, a) => l.trim() || (i > 0 && a[i - 1].trim()));
  return (
    <>
      {lines.map((l, i) => {
        const bullet = l.match(/^\s*[-*•]\s+(.*)$/);
        if (bullet) return <p key={i} className="flex gap-2 pl-1"><span aria-hidden>·</span><span>{inline(bullet[1], String(i))}</span></p>;
        if (!l.trim()) return <div key={i} className="h-2" />;
        return <p key={i}>{inline(l, String(i))}</p>;
      })}
    </>
  );
}

export function Assistant({ lang }: { lang: Locale }) {
  const t = DICTS[lang].assistant;
  const wa = whatsappLink(DICTS[lang].contact.whatsappMessage);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const turns = messages.filter(m => m.role === "user").length;
  const atLimit = turns >= MAX_TURNS;

  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);
  useEffect(() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" }); }, [messages, pending]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); triggerRef.current?.focus(); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function ask(question: string) {
    const q = question.trim().slice(0, 500);
    if (!q || pending || atLimit) return;
    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages(next);
    setInput("");
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/asistente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang, messages: next }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.reply) throw new Error(data.error === "limit" ? "limit" : "error");
      setMessages(m => [...m, { role: "assistant", content: data.reply }]);
    } catch (e) {
      setError(e instanceof Error && e.message === "limit" ? t.limit : t.error);
    } finally {
      setPending(false);
      inputRef.current?.focus();
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls="asistente"
        className={cn(
          "fixed bottom-5 right-5 z-40 flex h-12 items-center gap-2 rounded-full bg-ink pl-4 pr-5 font-semibold text-white shadow-[0_14px_34px_-12px_rgba(20,23,28,.6)] transition-[transform,opacity] hover:-translate-y-0.5",
          open && "pointer-events-none translate-y-2 opacity-0"
        )}
      >
        <Sparkles className="size-4 text-amber-300" aria-hidden />
        <span>{t.open}</span>
      </button>

      <section
        id="asistente"
        role="dialog"
        aria-label={t.title}
        aria-modal="false"
        hidden={!open}
        className="fixed inset-x-3 bottom-3 z-50 flex max-h-[min(640px,calc(100dvh-1.5rem))] flex-col overflow-hidden rounded-3xl bg-surface shadow-[0_30px_80px_-24px_rgba(20,23,28,.55)] ring-1 ring-black/10 animate-[assistant-in_.28s_cubic-bezier(.2,.8,.2,1)] sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[400px]"
      >
        <header className="flex items-start gap-3 border-b border-line px-5 py-4">
          <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-ink text-amber-300"><Sparkles className="size-4" aria-hidden /></span>
          <div className="min-w-0 flex-1">
            <h2 className="font-bold leading-tight">{t.title}</h2>
            <p className="mt-0.5 text-xs leading-snug text-muted">{t.subtitle}</p>
          </div>
          <button onClick={() => { setOpen(false); triggerRef.current?.focus(); }} className="flex size-9 items-center justify-center rounded-full hover:bg-black/5" aria-label={t.close}>
            <X className="size-4" />
          </button>
        </header>

        <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4" aria-live="polite">
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2">
              {t.suggestions.map(s => (
                <button key={s} onClick={() => ask(s)} className="rounded-full bg-paper px-3.5 py-2 text-left text-sm font-medium ring-1 ring-line hover:ring-ink/30">{s}</button>
              ))}
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={cn("max-w-[88%] space-y-1 rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed animate-[fade-up_.25s_ease-out]",
              m.role === "user" ? "ml-auto rounded-br-md bg-ink text-white" : "rounded-bl-md bg-paper")}>
              {m.role === "assistant" ? <RichText text={m.content} /> : m.content}
            </div>
          ))}
          {pending && (
            <div className="flex w-fit items-center gap-1.5 rounded-2xl rounded-bl-md bg-paper px-4 py-3" aria-label={t.thinking}>
              {[0, 1, 2].map(i => <span key={i} className="size-1.5 animate-bounce rounded-full bg-muted" style={{ animationDelay: `${i * 120}ms` }} />)}
            </div>
          )}
          {error && <p role="alert" className="rounded-2xl bg-red-50 px-4 py-2.5 text-sm text-red-800">{error}</p>}
        </div>

        <div className="border-t border-line px-4 pb-3 pt-3">
          <form onSubmit={e => { e.preventDefault(); ask(input); }} className="flex items-end gap-2">
            <label htmlFor="asistente-input" className="sr-only">{t.placeholder}</label>
            <textarea
              id="asistente-input"
              ref={inputRef}
              rows={1}
              maxLength={500}
              value={input}
              disabled={atLimit}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); ask(input); } }}
              placeholder={atLimit ? t.limit : t.placeholder}
              className="max-h-28 min-h-11 flex-1 resize-none rounded-2xl bg-paper px-4 py-2.5 text-[15px] outline-none ring-1 ring-line placeholder:text-muted/70 focus:ring-ink/40 disabled:opacity-60"
            />
            <button type="submit" disabled={!input.trim() || pending || atLimit} aria-label={t.send}
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-ink text-white disabled:opacity-30">
              <ArrowUp className="size-4" />
            </button>
          </form>
          <div className="mt-2.5 flex items-center justify-between gap-3 px-1 text-xs text-muted">
            <span>{t.disclaimer}</span>
            <a href={wa} target="_blank" rel="noreferrer" className="flex shrink-0 items-center gap-1 font-semibold text-emerald-700 hover:underline">
              <MessageCircle className="size-3.5" aria-hidden />{t.talkToMe}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
