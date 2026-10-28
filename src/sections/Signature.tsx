import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Btn from "../components/Btn";
import { MENU, formatPrice, type Dish } from "../data/menu";

const PICKS: { name: string; img: string }[] = [
  { name: "Bella Napoli", img: "/img/margherita-bufala.webp" },
  { name: "Burrata", img: "/img/pizza-burrata.webp" },
  { name: "Diavola", img: "/img/pizza-salame.webp" },
  { name: "Capricciosa", img: "/img/pizza-funghi-salame.webp" },
  { name: "Ortolana", img: "/img/ortolana.webp" },
  { name: "Zucchine e provola", img: "/img/bianca-zucchine.webp" },
];

const ALL: Dish[] = MENU.flatMap((c) => c.items);
const DISHES = PICKS.map((p) => ({ ...ALL.find((d) => d.name === p.name)!, img: p.img }));

const STEP_MS = 4500;
const EASE = [0.23, 1, 0.32, 1] as const;

export default function Signature() {
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    if (hold) return;
    const id = window.setTimeout(() => {
      setDir(1);
      setI((n) => (n + 1) % DISHES.length);
    }, STEP_MS);
    return () => window.clearTimeout(id);
  }, [i, hold]);

  const pick = (k: number) => {
    setDir(k > i ? 1 : -1);
    setI(k);
  };

  const d = DISHES[i];

  return (
    <section id="pizze" className="relative overflow-hidden bg-ink px-5 py-24 text-flour sm:px-8 md:py-36" aria-labelledby="pizze-title">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-[13px] font-semibold tracking-[0.2em] text-tomato uppercase">Dal forno a legna</p>
          <h2 id="pizze-title" className="mt-5 font-display text-[clamp(2.8rem,6vw,5rem)] leading-none">Le pizze della casa</h2>
        </div>

        <div
          className="mt-16 grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20"
          onMouseEnter={() => setHold(true)}
          onMouseLeave={() => setHold(false)}
        >
          {/* Plate */}
          <div className="relative mx-auto aspect-square w-full max-w-[34rem] lg:order-2">
            <div aria-hidden className="absolute inset-[4%] rounded-full border border-flour/10" />
            <div aria-hidden className="absolute inset-[-3%] rounded-full border border-dashed border-flour/10" />
            <AnimatePresence initial={false} custom={dir}>
              <motion.img
                key={d.img}
                src={d.img}
                alt={`Pizza ${d.name}`}
                custom={dir}
                className="absolute inset-[9%] size-[82%] rounded-full object-cover shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
                variants={{
                  enter: (s: number) => ({ x: `${60 * s}%`, rotate: 90 * s, opacity: 0, scale: 0.85 }),
                  center: { x: "0%", rotate: 0, opacity: 1, scale: 1 },
                  exit: (s: number) => ({ x: `${-60 * s}%`, rotate: -90 * s, opacity: 0, scale: 0.85 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", duration: 1, bounce: 0.12 }}
                loading="lazy"
              />
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.span
                key={d.name}
                className="absolute right-[4%] bottom-[6%] grid size-24 place-items-center rounded-full bg-tomato text-center font-display text-2xl leading-none shadow-xl md:size-28 md:text-3xl"
                initial={{ scale: 0.6, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: -8 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.35, delay: 0.25 }}
              >
                € {formatPrice(d.price)}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* List */}
          <ol className="lg:order-1">
            {DISHES.map((dish, k) => {
              const on = k === i;
              return (
                <li key={dish.name}>
                  <button
                    type="button"
                    onClick={() => pick(k)}
                    aria-pressed={on}
                    className="group relative block w-full border-b border-flour/10 py-5 text-left"
                  >
                    {on && (
                      <motion.span
                        layoutId="pizza-line"
                        className="absolute bottom-[-1px] left-0 h-px w-full bg-tomato"
                        transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
                      />
                    )}
                    <span className="flex items-baseline gap-4">
                      <span className={`text-sm tabular-nums transition-colors duration-300 ${on ? "text-tomato" : "text-flour/30"}`}>0{k + 1}</span>
                      <span
                        className={`font-display text-3xl transition-[color,transform] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] md:text-4xl ${
                          on ? "translate-x-2 text-flour" : "text-flour/45 group-hover:text-flour/80"
                        }`}
                      >
                        {dish.name}
                      </span>
                    </span>
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.span
                          className="block overflow-hidden pl-10"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: EASE }}
                        >
                          <span className="block pt-2 text-flour/60">{dish.desc}</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-16 flex justify-center">
          <Btn to="/menu" variant="light" arrow>Tutto il menu</Btn>
        </div>
      </div>
    </section>
  );
}
