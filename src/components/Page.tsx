import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { useLocation } from "react-router";

const EASE = [0.77, 0, 0.175, 1] as const;

/**
 * Wraps every route. Two arch-shaped curtains handle the route change:
 * the "cover" one rises when the page leaves, the "reveal" one lifts off when the next page mounts.
 */
export default function Page({ children, label }: { children: ReactNode; label: string }) {
  const { hash } = useLocation();

  useLayoutEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Deep link on arrival: jump instantly while the curtain still covers the page. Later hash changes: smooth.
  const arrived = useRef(false);
  useEffect(() => {
    if (!hash) return;
    const first = !arrived.current;
    const t = window.setTimeout(() => {
      arrived.current = true;
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: first ? "instant" : "smooth", block: "start" });
    }, first ? 60 : 0);
    return () => window.clearTimeout(t);
  }, [hash]);

  return (
    <>
      {children}

      {/* Cover: rises from the bottom on exit */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 -top-[30vh] z-[100] h-[160vh] rounded-tl-[50%_22vh] rounded-tr-[50%_22vh] bg-tomato"
        initial={{ y: "100%" }}
        animate={{ y: "100%" }}
        exit={{ y: "0%" }}
        transition={{ duration: 0.6, ease: EASE }}
      />

      {/* Reveal: lifts away on enter */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 -top-[30vh] z-[100] flex h-[160vh] items-center justify-center rounded-bl-[50%_22vh] rounded-br-[50%_22vh] bg-tomato"
        initial={{ y: "0%" }}
        animate={{ y: "-100%" }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.75, ease: EASE, delay: 0.1 }}
      >
        <motion.span
          className="font-display text-[clamp(2.5rem,9vw,7rem)] leading-none text-flour"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {label}
        </motion.span>
      </motion.div>
    </>
  );
}
