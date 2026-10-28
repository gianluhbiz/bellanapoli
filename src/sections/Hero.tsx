import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Btn from "../components/Btn";
import { SITE } from "../data/site";

const SLIDES = [
  { src: "/img/forno-pala.webp", caption: "Il forno a legna", alt: "Pizza sulla pala davanti al forno a legna acceso" },
  { src: "/img/sala2-a.webp", caption: "La sala delle volte", alt: "Sala con volte in mattoni e tavoli apparecchiati" },
  { src: "/img/margherita-bufala.webp", caption: "Margherita con bufala", alt: "Margherita con mozzarella di bufala" },
  { src: "/img/veranda-a.webp", caption: "La veranda", alt: "Veranda coperta con tavoli e piante" },
  { src: "/img/tavola.webp", caption: "In tavola", alt: "Pizze appena servite in sala" },
];

const SLIDE_MS = 6000;
const EASE = [0.23, 1, 0.32, 1] as const;
const TITLE = "Bella Napoli";

export default function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = window.setTimeout(() => setI((n) => (n + 1) % SLIDES.length), SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [i]);

  const slide = SLIDES[i];

  return (
    <section className="relative h-svh min-h-[36rem] overflow-hidden bg-ink text-flour" aria-label="Benvenuti">
      {/* Slideshow with slow zoom */}
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.src}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        >
          <motion.img
            src={slide.src}
            alt={slide.alt}
            className="size-full object-cover"
            initial={{ scale: 1.14 }}
            animate={{ scale: 1 }}
            transition={{ duration: SLIDE_MS / 1000 + 1.6, ease: "linear" }}
            fetchPriority={i === 0 ? "high" : "auto"}
          />
        </motion.div>
      </AnimatePresence>
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(29,23,20,0.65)_0%,rgba(29,23,20,0.25)_35%,rgba(29,23,20,0.35)_60%,rgba(29,23,20,0.85)_100%)]" />

      {/* Title */}
      <div className="relative flex h-full flex-col items-center justify-center px-5 text-center">
        <motion.p
          className="text-[12px] font-semibold tracking-[0.4em] uppercase md:text-[13px]"
          initial={{ opacity: 0, letterSpacing: "0.8em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ delay: 0.6, duration: 1.2, ease: EASE }}
        >
          Pizzeria · dal 1968
        </motion.p>

        <h1 className="mt-5 font-display text-[clamp(3.6rem,15vw,11.5rem)] leading-[0.85] tracking-[-0.02em]">
          <span className="sr-only">Pizzeria Bella Napoli, Ascoli Piceno</span>
          <span aria-hidden className="inline-block overflow-hidden pb-[0.08em]">
            {TITLE.split("").map((ch, k) => (
              <motion.span
                key={k}
                className="inline-block"
                initial={{ y: "110%", rotate: 8 }}
                animate={{ y: "0%", rotate: 0 }}
                transition={{ delay: 0.7 + k * 0.045, duration: 1, ease: EASE }}
              >
                {ch === " " ? " " : ch}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          className="mt-6 max-w-xl text-lg text-balance text-flour/85 md:text-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8, ease: EASE }}
        >
          Due forni a legna nel cuore di Ascoli Piceno. Pizza, olive all'ascolana e fritti, ogni sera dalle 19.
        </motion.p>

        <motion.div
          className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8, ease: EASE }}
        >
          <Btn href={SITE.phoneHref} icon="ri-phone-fill" className="w-full sm:w-auto">Prenota un tavolo</Btn>
          <Btn to="/menu" variant="outline-light" arrow className="w-full sm:w-auto">Scopri il menu</Btn>
        </motion.div>
      </div>

      {/* Bottom bar: slide caption + status */}
      <motion.div
        className="absolute inset-x-0 bottom-0 mx-auto flex max-w-7xl items-end justify-between gap-6 px-5 pb-24 sm:px-8 md:pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <div className="flex items-end gap-4">
          <span className="font-display text-3xl leading-none tabular-nums">0{i + 1}</span>
          <div>
            <div className="relative h-6 w-48 overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  key={slide.caption}
                  className="absolute inset-0 text-sm text-flour/85"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  {slide.caption}
                </motion.p>
              </AnimatePresence>
            </div>
            <div className="mt-2 flex gap-1.5">
              {SLIDES.map((s, k) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => setI(k)}
                  aria-label={`Mostra foto: ${s.caption}`}
                  className="group py-2"
                >
                  <span className="block h-0.5 w-7 overflow-hidden bg-flour/30 transition-colors group-hover:bg-flour/60">
                    {k === i && (
                      <motion.span
                        key={i}
                        className="block h-full origin-left bg-flour"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
