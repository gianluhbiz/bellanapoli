import { Link } from "react-router";
import { SITE } from "../data/site";
import Ornament from "./Ornament";

export default function Footer() {
  return (
    <footer className="bg-ink px-5 pt-20 pb-28 text-flour sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
        <span className="grid size-24 place-items-center rounded-full bg-flour">
          <img src="/img/logo.png" alt="Logo Pizzeria Bella Napoli" className="w-[78%]" width={75} height={62} loading="lazy" />
        </span>
        <p className="mt-6 font-display text-4xl">Pizzeria Bella Napoli</p>
        <p className="mt-2 text-flour/60">Ascoli Piceno, dal 1968</p>
        <Ornament className="mt-8 text-tomato" />

        <div className="mt-10 grid w-full max-w-3xl gap-8 text-flour/80 sm:grid-cols-3">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.18em] text-flour/40 uppercase">Indirizzo</p>
            <p className="mt-3">{SITE.address}<br />{SITE.city}</p>
          </div>
          <div>
            <p className="text-[12px] font-semibold tracking-[0.18em] text-flour/40 uppercase">Orari</p>
            <p className="mt-3">Tutti i giorni<br />19:00 – 24:00</p>
          </div>
          <div>
            <p className="text-[12px] font-semibold tracking-[0.18em] text-flour/40 uppercase">Prenotazioni</p>
            <p className="mt-3">
              <a className="hover:text-flour" href={SITE.phoneHref}>{SITE.phone}</a>
              <br />
              <a className="hover:text-flour" href={SITE.mobileHref}>{SITE.mobile}</a>
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-[13px] font-semibold tracking-[0.16em] uppercase">
          <Link to="/menu" className="hover:text-tomato">Menu</Link>
          <a href={SITE.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-tomato">
            <i className="ri-instagram-line text-base" aria-hidden /> Instagram
          </a>
          <a href={SITE.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-tomato">
            <i className="ri-facebook-circle-line text-base" aria-hidden /> Facebook
          </a>
          <a href={`mailto:${SITE.email}`} className="hover:text-tomato">Email</a>
        </div>

        <div className="mt-14 flex w-full flex-col gap-3 border-t border-flour/10 pt-6 text-xs text-flour/50 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {SITE.legal}</p>
          <p>
            Developed and Designed by{" "}
            <a href="https://gianluh.dev" target="_blank" rel="noreferrer" className="font-bold text-flour underline">
              Gianluca De Maio<i className="ri-external-link-line ml-0.5" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
