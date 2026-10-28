import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Ornament from "../components/Ornament";
import { REVIEWS, SITE } from "../data/site";

const STEP_MS = 6000;

export default function Reviews() {
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);

  useEffect(() => {
    if (hold) return;
    const id = window.setTimeout(() => setI((n) => (n + 1) % REVIEWS.length), STEP_MS);
    return () => window.clearTimeout(id);
  }, [i, hold]);

  const r = REVIEWS[i];

  return (
    <section
      className="bg-flour-2 px-5 py-24 sm:px-8 md:py-32"
      aria-labelledby="reviews-title"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <h2 id="reviews-title" className="text-[13px] font-semibold tracking-[0.2em] text-tomato uppercase">
          Dicono di noi
        </h2>
        <p className="mt-4 flex flex-wrap items-center justify-center gap-2 text-smoke">
          <span className="flex text-tomato" aria-hidden>
            {[0, 1, 2, 3].map((k) => <i key={k} className="ri-star-fill" />)}
            <i className="ri-star-line" />
          </span>
          <span>
            <strong className="text-ink">{SITE.google.rating}</strong> su Google · {SITE.google.count} recensioni
          </span>
        </p>

        <div className="relative mt-12 grid min-h-[14rem] w-full place-items-center md:min-h-[11rem]" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.figure
              key={r.text}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <blockquote className="font-display text-[clamp(1.8rem,4vw,3rem)] leading-[1.15] text-balance">“{r.text}”</blockquote>
              <figcaption className="mt-6 text-smoke">
                {r.author} · {r.source}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <Ornament className="mt-10 text-tomato" />
        <div className="mt-6 flex gap-1">
          {REVIEWS.map((rv, k) => (
            <button key={rv.text} type="button" onClick={() => setI(k)} aria-label={`Recensione ${k + 1}`} className="group grid size-8 place-items-center">
              <span
                className={`block h-1.5 rounded-full transition-[width,background-color] duration-500 ${
                  k === i ? "w-6 bg-tomato" : "w-1.5 bg-ink/25 group-hover:bg-ink/50"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
