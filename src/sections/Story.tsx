import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Btn from "../components/Btn";
import Ornament from "../components/Ornament";

const DETAILS = [
  { src: "/img/forno-bocca.webp", alt: "La bocca del forno a legna" },
  { src: "/img/stesura.webp", alt: "Il pomodoro steso sulla pasta" },
  { src: "/img/bancone.webp", alt: "Il bancone del locale" },
  { src: "/img/murale-ascoli.webp", alt: "Il murale con lo skyline di Ascoli" },
];

export default function Story() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = window.setTimeout(() => setI((n) => (n + 1) % DETAILS.length), 4200);
    return () => window.clearTimeout(id);
  }, [i]);

  return (
    <section id="storia" className="bg-flour px-5 py-24 sm:px-8 md:py-36" aria-labelledby="storia-title">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-24">
        {/* Photo composition */}
        <div className="relative mx-auto w-full max-w-lg pb-24 lg:pb-16">
          <div className="group overflow-hidden">
            <img
              src="/img/stampa-piazza.webp"
              alt="Stampa d'epoca di Piazza del Popolo appesa in sala"
              className="aspect-[3/4] w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="absolute right-[-6%] bottom-0 w-[58%] border-[10px] border-flour bg-flour shadow-[0_30px_60px_-25px_rgba(29,23,20,0.5)] sm:right-[-12%]">
            <div className="relative aspect-square overflow-hidden">
              <AnimatePresence initial={false}>
                <motion.img
                  key={DETAILS[i].src}
                  src={DETAILS[i].src}
                  alt={DETAILS[i].alt}
                  className="absolute inset-0 size-full object-cover"
                  initial={{ clipPath: "inset(0 0 0 100%)" }}
                  animate={{ clipPath: "inset(0 0 0 0%)" }}
                  exit={{ opacity: 1 }}
                  transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
                  loading="lazy"
                />
              </AnimatePresence>
            </div>
          </div>
          <span className="absolute top-6 -left-3 bg-tomato px-4 py-2 font-display text-xl text-flour sm:-left-6">Dal 1968</span>
        </div>

        {/* Text */}
        <div className="max-w-xl">
          <p className="text-[13px] font-semibold tracking-[0.2em] text-tomato uppercase">La nostra storia</p>
          <h2 id="storia-title" className="mt-5 font-display text-[clamp(2.6rem,5.2vw,4.4rem)] leading-[0.98]">
            La pizza di Via dei Bonaparte, da più di cinquant'anni.
          </h2>
          <Ornament className="mt-8 justify-start text-tomato" />
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-smoke">
            <p>
              Abbiamo aperto nel 1968 in un locale storico di Ascoli Piceno, a pochi passi da Piazza del Popolo. Da
              allora facciamo una cosa sola, la pizza, e la facciamo in tutti i modi: classica, bianca, senza glutine,
              con farina integrale dal martedì al venerdì.
            </p>
            <p>
              Usiamo pomodori italiani e mozzarella Sabelli. Cuociamo in due forni a legna, gli unici in città. E nel
              menu trovi le specialità di qui: olive all'ascolana e fritto misto.
            </p>
          </div>
          <dl className="mt-10 grid grid-cols-3 border-y border-ink/15 py-6 text-center">
            <div className="flex flex-col-reverse">
              <dt className="mt-1 text-sm text-smoke">forni a legna</dt>
              <dd className="font-display text-4xl">2</dd>
            </div>
            <div className="flex flex-col-reverse border-x border-ink/15">
              <dt className="mt-1 text-sm text-smoke">sale</dt>
              <dd className="font-display text-4xl">4</dd>
            </div>
            <div className="flex flex-col-reverse">
              <dt className="mt-1 text-sm text-smoke">posti</dt>
              <dd className="font-display text-4xl">180</dd>
            </div>
          </dl>
          <Btn to="/menu" variant="outline-dark" arrow className="mt-10">Sfoglia il menu</Btn>
        </div>
      </div>
    </section>
  );
}
