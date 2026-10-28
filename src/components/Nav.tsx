import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { SITE } from "../data/site";

const LEFT = [
  { to: "/#storia", label: "Storia" },
  { to: "/#pizze", label: "Le pizze" },
  { to: "/#locale", label: "Il locale" },
];
const RIGHT = [
  { to: "/#giropizza", label: "Giropizza" },
  { to: "/#dove", label: "Dove siamo" },
];
const ALL = [...LEFT, ...RIGHT, { to: "/menu", label: "Menu" }];

const EASE = [0.23, 1, 0.32, 1] as const;

function NavLink({ to, label }: { to: string; label: string }) {
  return (
    <Link to={to} className="group relative py-2 text-[13px] font-semibold tracking-[0.16em] uppercase">
      {label}
      <span className="absolute inset-x-0 bottom-0.5 h-px origin-right scale-x-0 bg-current transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:origin-left group-hover:scale-x-100" />
    </Link>
  );
}

/** Sits on top of the page header photo (absolute, scrolls away with it). */
export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        className="absolute inset-x-0 top-0 z-40 text-flour"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.7, ease: EASE }}
      >
        <nav aria-label="Principale" className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-6 px-5 py-5 sm:px-8">
          <ul className="hidden items-center gap-8 lg:flex">
            {LEFT.map((l) => (
              <li key={l.to}><NavLink {...l} /></li>
            ))}
          </ul>
          <div className="lg:hidden" />

          <Link to="/" aria-label="Bella Napoli, torna alla home" className="group">
            <span className="grid size-16 place-items-center rounded-full bg-flour shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-[-8deg] md:size-20">
              <img src="/img/logo.png" alt="" className="w-[78%]" width={60} height={50} />
            </span>
          </Link>

          <div className="flex items-center justify-end gap-8">
            <ul className="hidden items-center gap-8 lg:flex">
              {RIGHT.map((l) => (
                <li key={l.to}><NavLink {...l} /></li>
              ))}
            </ul>
            <Link
              to="/menu"
              className="hidden min-h-11 items-center rounded-[3px] border border-flour/50 px-5 text-[13px] font-semibold tracking-[0.16em] uppercase transition-colors duration-200 hover:bg-flour hover:text-ink lg:inline-flex"
            >
              Menu
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid size-12 place-items-center rounded-full bg-ink/40 text-2xl backdrop-blur-sm active:scale-[0.95] lg:hidden"
              aria-expanded={open}
              aria-label="Apri menu di navigazione"
            >
              <i className="ri-menu-line" aria-hidden />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-ink px-6 pt-5 pb-10 text-flour lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.77, 0, 0.175, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigazione"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl">Bella Napoli</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-12 place-items-center rounded-full border border-flour/20 text-2xl active:scale-[0.95]"
                aria-label="Chiudi menu di navigazione"
              >
                <i className="ri-close-line" aria-hidden />
              </button>
            </div>
            <ul className="mt-auto">
              {ALL.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.5, ease: EASE }}
                >
                  <Link to={l.to} onClick={() => setOpen(false)} className="block border-b border-flour/10 py-3 font-display text-[2.6rem] leading-tight">
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <a href={SITE.phoneHref} className="mt-8 text-flour/70">
              Prenota: <span className="text-flour">{SITE.phone}</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
