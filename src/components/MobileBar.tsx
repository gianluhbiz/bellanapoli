import { motion } from "framer-motion";
import { Link } from "react-router";
import { SITE } from "../data/site";

/** Bottom action bar on phones: the three things a hungry visitor wants. */
export default function MobileBar({ menuLink = true }: { menuLink?: boolean }) {
  return (
    <motion.div
      className="fixed inset-x-3 bottom-3 z-40 pb-[env(safe-area-inset-bottom)] md:hidden"
      initial={{ y: "140%" }}
      animate={{ y: "0%" }}
      transition={{ type: "spring", duration: 0.5, bounce: 0.15, delay: 1.2 }}
    >
      <div className="flex items-stretch gap-1.5 rounded-[1.4rem] bg-ink p-1.5 shadow-[0_18px_40px_-12px_rgba(29,23,20,0.6)]">
        <a
          href={SITE.phoneHref}
          className="flex min-h-12 flex-[1.4] items-center justify-center gap-2 rounded-2xl bg-tomato text-sm font-semibold text-flour active:scale-[0.97]"
        >
          <i className="ri-phone-fill" aria-hidden /> Prenota
        </a>
        {menuLink ? (
          <Link
            to="/menu"
            className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl text-sm font-medium text-flour active:scale-[0.97]"
          >
            <i className="ri-restaurant-2-line" aria-hidden /> Menu
          </Link>
        ) : (
          <a
            href={SITE.mobileHref}
            className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl text-sm font-medium text-flour active:scale-[0.97]"
          >
            <i className="ri-takeaway-line" aria-hidden /> Asporto
          </a>
        )}
        <a
          href={SITE.mapsDirections}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl text-sm font-medium text-flour active:scale-[0.97]"
        >
          <i className="ri-map-pin-2-line" aria-hidden /> Vieni
        </a>
      </div>
    </motion.div>
  );
}
