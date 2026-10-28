import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Btn from "../components/Btn";
import Ornament from "../components/Ornament";
import { SITE } from "../data/site";
import { useOpenStatus } from "../hooks/useOpenStatus";

const BG = ["/img/pizza-funghi-salame.webp", "/img/pizza-salame.webp", "/img/margherita-sottile.webp", "/img/pizza-vino.webp"];
const STEP_MS = 4000;

export default function Giropizza() {
  const status = useOpenStatus();
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = window.setTimeout(() => setI((n) => (n + 1) % BG.length), STEP_MS);
    return () => window.clearTimeout(id);
  }, [i]);

  return (
    <section id="giropizza" className="relative overflow-hidden bg-ink px-5 py-32 text-flour sm:px-8 md:py-44" aria-labelledby="giro-title">
      <AnimatePresence initial={false}>
        <motion.img
          key={BG[i]}
          src={BG[i]}
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover"
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.4 }, scale: { duration: STEP_MS / 1000 + 1.4, ease: "linear" } }}
          loading="lazy"
        />
      </AnimatePresence>
      <div aria-hidden className="absolute inset-0 bg-ink/70" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="text-[13px] font-semibold tracking-[0.3em] uppercase">
          {status.isMonday ? <span className="bg-tomato px-3 py-1.5">È stasera</span> : "Ogni lunedì sera"}
        </p>
        <h2 id="giro-title" className="mt-6 font-display text-[clamp(4rem,14vw,10rem)] leading-[0.85]">
          <span className="sr-only">Giropizza</span>
          <span aria-hidden>
            {"Giropizza".split("").map((ch, k) => (
              <motion.span
                key={k}
                className="inline-block"
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 0.6, delay: 1 + k * 0.07, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
              >
                {ch}
              </motion.span>
            ))}
          </span>
        </h2>
        <Ornament className="mt-8 text-tomato" />
        <p className="mt-8 max-w-lg text-xl leading-relaxed text-flour/85">
          Le pizze escono dal forno una dopo l'altra e girano per i tavoli. Prendi lo spicchio che vuoi, finché non dici
          basta.
        </p>
        <p className="mt-10 font-display text-7xl">
          {SITE.giropizzaPrice} €<span className="ml-3 align-middle font-sans text-base text-flour/60">a persona</span>
        </p>
        <Btn href={SITE.phoneHref} icon="ri-calendar-check-line" className="mt-10">Prenota per lunedì</Btn>
      </div>
    </section>
  );
}
