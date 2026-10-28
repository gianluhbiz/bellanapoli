import { motion } from "framer-motion";
import { SITE } from "../data/site";
import { useOpenStatus } from "../hooks/useOpenStatus";

/** Desktop-only floating booking button. On phones MobileBar does this job. */
export default function BookButton() {
  const status = useOpenStatus();
  return (
    <motion.a
      href={SITE.phoneHref}
      className="group fixed right-6 bottom-6 z-40 hidden items-center gap-3 rounded-full bg-tomato py-2 pr-6 pl-2 text-flour shadow-[0_18px_40px_-14px_rgba(156,36,21,0.8)] md:flex"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.8, type: "spring", duration: 0.7, bounce: 0.25 }}
      whileTap={{ scale: 0.96 }}
    >
      <span className="relative grid size-11 place-items-center rounded-full bg-flour text-lg text-tomato">
        <span className="absolute inset-0 animate-ping rounded-full bg-flour/40 [animation-duration:2.4s]" />
        <i className="ri-phone-fill relative" aria-hidden />
      </span>
      <span className="leading-tight">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase opacity-85">
          <span className={`size-1.5 rounded-full ${status.open ? "bg-[#9ff0b5]" : "bg-flour/60"}`} />
          {status.open ? "Aperto ora · prenota" : "Prenota un tavolo"}
        </span>
        <span className="block font-display text-lg">{SITE.phone}</span>
      </span>
    </motion.a>
  );
}
