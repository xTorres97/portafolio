import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Code2, Mail } from "lucide-react";
import { DICTS, EMAIL, GITHUB, isLocale, type Project } from "@/content";
import { CopyEmail } from "@/components/copy-email";
import { Gallery } from "@/components/gallery";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = DICTS[lang];
  const other = lang === "es" ? "en" : "es";

  return (
    <>
      <a href="#proyectos" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        {t.hero.ctaWork}
      </a>

      <header className="sticky top-0 z-30 border-b border-line/70 bg-paper/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5">
          <Link href={`/${lang}`} className="text-[17px] font-bold tracking-tight">Jose Torres</Link>
          <nav aria-label="Principal" className="ml-auto hidden gap-1 text-[15px] md:flex">
            {([["#sobre-mi", t.nav.about], ["#proyectos", t.nav.work], ["#servicios", t.nav.services], ["#contacto", t.nav.contact]] as const).map(([h, l]) => (
              <a key={h} href={h} className="rounded-full px-3.5 py-2 text-muted hover:bg-black/5 hover:text-ink">{l}</a>
            ))}
          </nav>
          <Link href={`/${other}`} hrefLang={other} lang={other} className="ml-auto rounded-full border border-line px-3 py-1.5 text-sm font-semibold uppercase hover:border-ink/40 md:ml-0"
            aria-label={lang === "es" ? "Read in English" : "Leer en español"}>
            {other}
          </Link>
        </div>
      </header>

      <main>
        {/* Presentación */}
        <section className="mx-auto max-w-6xl px-5 pb-14 pt-16 md:pb-20 md:pt-24">
          <p className="inline-flex items-center gap-2 rounded-full bg-surface px-3.5 py-1.5 text-sm font-medium ring-1 ring-line">
            <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" /><span className="relative inline-flex size-2 rounded-full bg-emerald-500" /></span>
            {t.hero.available}
          </p>
          <h1 className="mt-7 max-w-4xl text-[clamp(2.6rem,7vw,5.6rem)] font-bold leading-[0.98] tracking-[-0.035em] animate-[rise_.6s_ease-out_both]">
            {t.hero.title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{t.hero.lead}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#proyectos" className="inline-flex h-12 items-center rounded-full bg-ink px-6 font-semibold text-white hover:bg-ink/85">{t.hero.ctaWork}</a>
            <a href="#contacto" className="inline-flex h-12 items-center rounded-full px-6 font-semibold ring-1 ring-line hover:ring-ink/40">{t.hero.ctaContact}</a>
            <span className="ml-1 text-sm text-muted">{t.hero.location}</span>
          </div>

          {/* Índice de proyectos: cada uno con su color */}
          <ol className="mt-16 grid gap-3 sm:grid-cols-3" aria-label={t.work.title}>
            {t.projects.map(p => (
              <li key={p.slug}>
                <a href={`#${p.slug}`} className="group flex h-full flex-col justify-between rounded-2xl p-5 transition-transform hover:-translate-y-1"
                  style={{ background: p.color.base, color: "#fff" }}>
                  <span className="text-sm opacity-80">{p.kind}</span>
                  <span className="mt-10 flex items-end justify-between gap-2">
                    <span className="text-2xl font-bold tracking-tight">{p.name}</span>
                    <ArrowUpRight className="size-5 shrink-0 rotate-90 opacity-70 transition-transform group-hover:translate-y-0.5" aria-hidden />
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </section>

        {/* Sobre mí */}
        <section id="sobre-mi" aria-labelledby="about-title" className="mx-auto max-w-6xl scroll-mt-16 px-5 pb-24">
          <div className="grid gap-10 border-t border-ink/15 pt-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <h2 id="about-title" className="text-4xl font-bold tracking-tight md:text-5xl">{t.about.title}</h2>
              <dl className="mt-8 space-y-5">
                {t.about.facts.map(f => (
                  <div key={f.label} className="flex flex-col">
                    <dt className="order-2 text-[15px] text-muted">{f.label}</dt>
                    <dd className="order-1 text-2xl font-bold tracking-tight">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="space-y-5 text-lg leading-relaxed md:text-xl md:leading-relaxed">
              {t.about.paragraphs.map(p => <p key={p.slice(0, 20)}>{p}</p>)}
            </div>
          </div>
        </section>

        {/* Proyectos */}
        <section id="proyectos" aria-labelledby="work-title" className="scroll-mt-16">
          <div className="mx-auto max-w-6xl px-5 pb-10">
            <h2 id="work-title" className="text-4xl font-bold tracking-tight md:text-5xl">{t.work.title}</h2>
            <p className="mt-3 max-w-xl text-lg text-muted">{t.work.intro}</p>
          </div>
          {t.projects.map((p, i) => <ProjectSection key={p.slug} p={p} t={t.work} flip={i % 2 === 1} />)}
        </section>

        {/* Servicios */}
        <section id="servicios" className="mx-auto max-w-6xl scroll-mt-16 px-5 pt-24">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">{t.services.title}</h2>
          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {t.services.items.map(s => (
              <div key={s.title} className="border-t border-ink/15 pt-5">
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="mt-2 max-w-md leading-relaxed text-muted">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Proceso: es una secuencia, por eso va numerado */}
        <section id="proceso" className="mx-auto max-w-6xl scroll-mt-16 px-5 pt-24">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">{t.process.title}</h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-4">
            {t.process.steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl bg-surface p-6 ring-1 ring-line">
                <span className="text-sm font-bold tabular-nums text-muted">{i + 1}</span>
                <h3 className="mt-6 text-lg font-bold leading-snug">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Herramientas */}
        <section className="mx-auto max-w-6xl px-5 pt-24" aria-labelledby="stack-title">
          <h2 id="stack-title" className="text-2xl font-bold tracking-tight">{t.stack.title}</h2>
          <dl className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.stack.groups.map(g => (
              <div key={g.label}>
                <dt className="text-sm text-muted">{g.label}</dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {g.items.map(x => <span key={x} className="rounded-full bg-surface px-3 py-1 text-sm font-medium ring-1 ring-line">{x}</span>)}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Contacto */}
        <section id="contacto" className="scroll-mt-16 px-5 pt-24">
          <div className="mx-auto max-w-6xl rounded-[28px] bg-ink px-6 py-14 text-white md:px-14 md:py-20">
            <h2 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">{t.contact.title}</h2>
            <p className="mt-5 max-w-lg text-lg text-white/70">{t.contact.text}</p>
            <a href={`mailto:${EMAIL}`} className="mt-10 block break-all text-2xl font-bold underline decoration-white/30 underline-offset-[6px] hover:decoration-white md:text-4xl">
              {EMAIL}
            </a>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${EMAIL}`} className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 font-semibold text-ink hover:bg-white/90"><Mail className="size-4" />{t.contact.write}</a>
              <CopyEmail email={EMAIL} label={t.contact.copy} done={t.contact.copied} />
              <a href={GITHUB} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2 rounded-full border border-white/25 px-6 font-semibold hover:border-white/60"><Code2 className="size-4" />GitHub</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto mt-12 flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 pb-10 text-sm text-muted">
        <span>{t.footer}</span>
        <Link href={`/${other}`} hrefLang={other} className="hover:text-ink">{lang === "es" ? "English version" : "Versión en español"}</Link>
      </footer>
    </>
  );
}

function ProjectSection({ p, t, flip }: { p: Project; t: (typeof DICTS)["es"]["work"]; flip: boolean }) {
  return (
    <article id={p.slug} aria-labelledby={`${p.slug}-title`} className="scroll-mt-16 py-16 md:py-24" style={{ background: p.color.soft, color: p.color.ink }}>
      <div className="mx-auto max-w-6xl px-5">
        <div className={`grid items-start gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
          <Gallery images={p.images} accent={p.color.base} />

          <div>
            <p className="text-sm font-semibold" style={{ color: p.color.base }}>{p.kind}</p>
            <h3 id={`${p.slug}-title`} className="mt-1 text-4xl font-bold tracking-tight md:text-5xl">{p.name}</h3>
            <p className="mt-4 text-lg leading-relaxed">{p.summary}</p>

            <dl className="mt-7 grid grid-cols-3 gap-3">
              {p.stats.map(s => (
                <div key={s.label} className="rounded-xl bg-white/70 p-3">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block text-2xl font-bold tabular-nums tracking-tight">{s.value}</span>
                    <span className="mt-0.5 block text-xs leading-snug opacity-75">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2 rounded-full px-6 font-semibold text-white hover:brightness-110" style={{ background: p.color.base }}>
                {t.demo}<ArrowUpRight className="size-4" />
              </a>
              <a href={p.code} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2 rounded-full bg-white/60 px-6 font-semibold ring-1 ring-black/10 hover:bg-white">
                <Code2 className="size-4" />{t.code}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          <div>
            <h4 className="font-bold">{t.problem}</h4>
            <p className="mt-2 leading-relaxed opacity-85">{p.problem}</p>
          </div>
          <div>
            <h4 className="font-bold">{t.built}</h4>
            <ul className="mt-2 space-y-2">
              {p.built.map(b => (
                <li key={b} className="flex gap-2.5 leading-relaxed opacity-85">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full" style={{ background: p.color.base }} aria-hidden />{b}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-white/75 p-6">
            <h4 className="font-bold">{t.detail}: {p.detail.title}</h4>
            <p className="mt-2 leading-relaxed opacity-85">{p.detail.text}</p>
            <p className="mt-5 text-sm font-semibold">{t.stack}</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {p.stack.map(s => <li key={s} className="rounded-full px-2.5 py-1 text-xs font-semibold" style={{ background: p.color.soft }}>{s}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
