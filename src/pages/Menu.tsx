import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import BookButton from "../components/BookButton";
import Btn from "../components/Btn";
import Footer from "../components/Footer";
import MobileBar from "../components/MobileBar";
import Nav from "../components/Nav";
import Ornament from "../components/Ornament";
import Page from "../components/Page";
import { MENU, TAG_LABEL, formatPrice, type Tag } from "../data/menu";
import { SITE } from "../data/site";

const EASE = [0.23, 1, 0.32, 1] as const;
const FILTERS: Tag[] = ["veg", "piccante", "firma", "locale"];
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

const norm = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

export default function Menu() {
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [active, setActive] = useState(MENU[0].id);
  const barRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = norm(query.trim());
    return MENU.map((c) => ({
      ...c,
      items: c.items.filter(
        (d) => (!q || norm(d.name + " " + d.desc).includes(q)) && tags.every((t) => d.tags?.includes(t)),
      ),
    })).filter((c) => c.items.length > 0);
  }, [query, tags]);

  const total = filtered.reduce((n, c) => n + c.items.length, 0);

  // Highlight the category currently on screen (no animation tied to scroll, only the active label)
  useEffect(() => {
    const els = filtered.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-30% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [filtered]);

  useEffect(() => {
    const bar = barRef.current;
    const link = bar?.querySelector<HTMLElement>(`[data-cat="${active}"]`);
    // Instant on purpose: a second smooth scroll would cancel the page's smooth scroll in Chrome.
    if (bar && link) bar.scrollLeft = link.offsetLeft - bar.clientWidth / 2 + link.clientWidth / 2;
  }, [active]);

  const toggleTag = (t: Tag) => setTags((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  return (
    <Page label="Il menu">
      <Nav />
      <main className="bg-flour">
        {/* Header */}
        <header className="relative flex h-[72svh] min-h-[32rem] items-center justify-center overflow-hidden bg-ink px-5 text-center text-flour">
          <motion.img
            src="/img/tavola.webp"
            alt=""
            aria-hidden
            className="absolute inset-0 size-full object-cover"
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: "easeOut" }}
          />
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(29,23,20,0.7),rgba(29,23,20,0.45)_50%,rgba(29,23,20,0.8))]" />
          <div className="relative pt-16">
            <motion.p
              className="text-[13px] font-semibold tracking-[0.4em] uppercase"
              initial={{ opacity: 0, letterSpacing: "0.8em" }}
              animate={{ opacity: 1, letterSpacing: "0.4em" }}
              transition={{ delay: 0.6, duration: 1.1, ease: EASE }}
            >
              La carta
            </motion.p>
            <h1 className="mt-4 font-display text-[clamp(4.5rem,15vw,10rem)] leading-[0.85] whitespace-nowrap">
              {"Il menu".split("").map((ch, k) => (
                <span key={k} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ delay: 0.7 + k * 0.05, duration: 0.9, ease: EASE }}
                  >
                    {ch === " " ? " " : ch}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8, ease: EASE }}>
              <Ornament className="mt-8 text-tomato" />
              <p className="mx-auto mt-6 max-w-md text-lg text-flour/85">
                Cotte nei nostri due forni a legna, con pomodoro italiano e mozzarella Sabelli.
              </p>
            </motion.div>
          </div>
        </header>

        {/* Sticky category bar */}
        <div className="sticky top-0 z-30 border-b border-ink/10 bg-flour/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-2 sm:px-8 lg:flex-row lg:items-center lg:gap-8">
            <div ref={barRef} className="-mx-5 flex gap-6 overflow-x-auto px-5 [scrollbar-width:none] lg:mx-0 lg:flex-1 lg:gap-5 lg:px-0">
              {MENU.map((c) => {
                const disabled = !filtered.some((f) => f.id === c.id);
                const on = active === c.id && !disabled;
                return (
                  <a
                    key={c.id}
                    data-cat={c.id}
                    href={`#${c.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(c.id)?.scrollIntoView({ behavior: "smooth" });
                      history.replaceState(null, "", `#${c.id}`);
                    }}
                    aria-disabled={disabled}
                    className={`relative flex min-h-12 shrink-0 items-center text-[12px] font-semibold tracking-[0.16em] whitespace-nowrap uppercase transition-colors duration-200 ${
                      on ? "text-tomato" : disabled ? "pointer-events-none text-ink/25" : "text-ink/70 hover:text-ink"
                    }`}
                  >
                    {c.title}
                    {on && (
                      <motion.span layoutId="cat-line" className="absolute inset-x-0 bottom-1.5 h-0.5 bg-tomato" transition={{ type: "spring", duration: 0.45, bounce: 0.1 }} />
                    )}
                  </a>
                );
              })}
            </div>
            <label className="relative mb-2 flex items-center lg:mb-0 lg:w-52">
              <span className="sr-only">Cerca nel menu</span>
              <i className="ri-search-line pointer-events-none absolute left-0 text-smoke" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cerca un piatto o un ingrediente"
                className="min-h-11 w-full border-b border-ink/20 bg-transparent pl-7 text-base outline-none transition-colors duration-200 placeholder:text-smoke/70 focus:border-tomato md:text-sm"
              />
            </label>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-10 pb-4" role="group" aria-label="Filtri">
            {FILTERS.map((t) => {
              const on = tags.includes(t);
              return (
                <button
                  key={t}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleTag(t)}
                  className={`flex min-h-11 items-center gap-2 text-sm transition-colors duration-200 ${on ? "text-tomato" : "text-smoke hover:text-ink"}`}
                >
                  <span className={`grid size-4 place-items-center border transition-colors duration-200 ${on ? "border-tomato bg-tomato text-flour" : "border-ink/30"}`}>
                    {on && <i className="ri-check-line text-[11px]" aria-hidden />}
                  </span>
                  <i className={TAG_LABEL[t].icon} aria-hidden /> {TAG_LABEL[t].label}
                </button>
              );
            })}
            <span className="w-full text-center text-sm text-smoke/80" aria-live="polite">
              {total} {total === 1 ? "piatto" : "piatti"}
            </span>
          </div>

          <AnimatePresence>
            {filtered.length === 0 && (
              <motion.div key="empty" className="py-24 text-center" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <p className="font-display text-3xl">Nessun piatto con questi filtri.</p>
                <p className="mt-2 text-smoke">Chiedi al pizzaiolo: spesso la facciamo su richiesta.</p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setTags([]);
                  }}
                  className="mt-6 text-sm font-semibold tracking-[0.14em] uppercase underline decoration-tomato decoration-2 underline-offset-4"
                >
                  Azzera i filtri
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {filtered.map((cat) => {
            const n = MENU.findIndex((c) => c.id === cat.id);
            return (
              <section key={cat.id} id={cat.id} className="scroll-mt-32 py-16 lg:scroll-mt-20" aria-labelledby={`${cat.id}-title`}>
                <div className="text-center">
                  <p className="font-display text-xl text-tomato">{ROMAN[n]}</p>
                  <h2 id={`${cat.id}-title`} className="mt-2 font-display text-[clamp(2.6rem,6vw,4.2rem)] leading-none">{cat.title}</h2>
                  <p className="mt-3 text-smoke italic">{cat.kicker}</p>
                  <Ornament className="mt-6 text-tomato" />
                </div>

                <div className="group mt-10 overflow-hidden">
                  <img
                    src={cat.image}
                    alt=""
                    className="aspect-[16/7] w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04] md:aspect-[21/7]"
                    loading="lazy"
                  />
                </div>

                {cat.note && <p className="mx-auto mt-8 max-w-2xl text-center text-smoke italic">{cat.note}</p>}

                <ul className="mt-10 grid gap-x-16 lg:grid-cols-2">
                  {cat.items.map((d) => (
                    <li key={d.name} className="border-b border-dashed border-ink/15 py-5">
                      <div className="flex items-baseline gap-3">
                        <h3 className="font-display text-2xl leading-tight">{d.name}</h3>
                        <span className="flex gap-1.5 text-sm text-tomato">
                          {d.tags?.map((t) => (
                            <i key={t} className={TAG_LABEL[t].icon} title={TAG_LABEL[t].label} aria-label={TAG_LABEL[t].label} />
                          ))}
                        </span>
                        <span aria-hidden className="mb-1.5 min-w-6 flex-1 border-b border-dotted border-ink/30" />
                        <span className="shrink-0 font-display text-xl tabular-nums">{formatPrice(d.price)}</span>
                      </div>
                      <p className="mt-1.5 text-smoke">{d.desc}</p>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}

          <div className="border-t border-ink/15 py-10 text-center text-sm text-smoke">
            <p>Prezzi in euro. Allergie o intolleranze? Dillo al personale prima di ordinare.</p>
            <p className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-1">
              {FILTERS.map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <i className={`${TAG_LABEL[t].icon} text-tomato`} aria-hidden /> {TAG_LABEL[t].label}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* Giropizza + takeaway */}
        <section className="grid md:grid-cols-2">
          <div className="relative overflow-hidden bg-ink px-8 py-16 text-flour md:px-14 md:py-20">
            <img src="/img/pizza-salame.webp" alt="" aria-hidden className="absolute inset-0 size-full object-cover opacity-30" loading="lazy" />
            <div className="relative">
              <p className="text-[13px] font-semibold tracking-[0.2em] text-tomato uppercase">Ogni lunedì</p>
              <h2 className="mt-4 font-display text-5xl leading-none">Giropizza a {SITE.giropizzaPrice} €</h2>
              <p className="mt-4 max-w-sm text-flour/75">Pizze a volontà, servite a giro dal forno.</p>
              <Btn href={SITE.phoneHref} variant="light" className="mt-8" icon="ri-calendar-check-line">Prenota lunedì</Btn>
            </div>
          </div>
          <div className="bg-tomato px-8 py-16 text-flour md:px-14 md:py-20">
            <p className="text-[13px] font-semibold tracking-[0.2em] text-flour/70 uppercase">Asporto e domicilio</p>
            <h2 className="mt-4 font-display text-5xl leading-none">La vuoi a casa?</h2>
            <p className="mt-4 max-w-sm text-flour/85">Chiama e passa a ritirarla. Consegniamo anche in centro storico.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Btn href={SITE.phoneHref} variant="dark" icon="ri-phone-fill">{SITE.phone}</Btn>
              <Btn href={SITE.mobileHref} variant="outline-light" icon="ri-smartphone-line">{SITE.mobile}</Btn>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BookButton />
      <MobileBar menuLink={false} />
    </Page>
  );
}
