import Btn from "../components/Btn";
import Ornament from "../components/Ornament";
import { SITE } from "../data/site";
import { useOpenStatus } from "../hooks/useOpenStatus";

const SERVICES = ["Asporto", "Consegna in centro storico", "Senza glutine", "Wi-Fi", "Accesso disabili", "Seggioloni", "Carte di credito"];

export default function Visit() {
  const status = useOpenStatus();

  return (
    <section id="dove" className="bg-flour px-5 pt-24 sm:px-8 md:pt-36" aria-labelledby="dove-title">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-[13px] font-semibold tracking-[0.2em] text-tomato uppercase">Dove siamo</p>
        <h2 id="dove-title" className="mt-5 font-display text-[clamp(2.8rem,6vw,5rem)] leading-none">Vieni a trovarci</h2>
        <Ornament className="mt-8 text-tomato" />

        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-0 md:divide-x md:divide-ink/15">
          <div className="px-6">
            <i className="ri-map-pin-2-line text-3xl text-tomato" aria-hidden />
            <h3 className="mt-3 font-display text-2xl">Indirizzo</h3>
            <p className="mt-3 text-lg text-smoke">
              {SITE.address}
              <br />
              {SITE.city}
            </p>
            <a href={SITE.mapsDirections} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 font-semibold underline decoration-tomato decoration-2 underline-offset-4 hover:text-tomato">
              Indicazioni stradali <i className="ri-arrow-right-up-line" aria-hidden />
            </a>
          </div>
          <div className="px-6">
            <i className="ri-time-line text-3xl text-tomato" aria-hidden />
            <h3 className="mt-3 font-display text-2xl">Orari</h3>
            <p className="mt-3 text-lg text-smoke">
              Tutti i giorni
              <br />
              dalle 19:00 a mezzanotte
            </p>
            <p className="mt-4 inline-flex items-center gap-2 font-semibold">
              <span className={`size-2 rounded-full ${status.open ? "bg-basil" : "bg-tomato"}`} />
              {status.label} <span className="font-normal text-smoke">· {status.detail}</span>
            </p>
          </div>
          <div className="px-6">
            <i className="ri-phone-line text-3xl text-tomato" aria-hidden />
            <h3 className="mt-3 font-display text-2xl">Prenotazioni</h3>
            <p className="mt-3 text-lg text-smoke">
              <a href={SITE.phoneHref} className="hover:text-tomato">{SITE.phone}</a>
              <br />
              <a href={SITE.mobileHref} className="hover:text-tomato">{SITE.mobile}</a>
            </p>
            <a href={`mailto:${SITE.email}`} className="mt-4 inline-block font-semibold break-all underline decoration-tomato decoration-2 underline-offset-4 hover:text-tomato">
              {SITE.email}
            </a>
          </div>
        </div>

        <p className="mx-auto mt-14 max-w-3xl text-smoke">
          {SERVICES.map((s, k) => (
            <span key={s}>
              {s}
              {k < SERVICES.length - 1 && <span className="mx-3 text-tomato" aria-hidden>·</span>}
            </span>
          ))}
        </p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Btn href={SITE.phoneHref} icon="ri-phone-fill">Prenota un tavolo</Btn>
          <Btn href={SITE.mapsDirections} external variant="outline-dark" icon="ri-direction-line">Portami lì</Btn>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-7xl">
        <iframe
          title="Mappa: Pizzeria Bella Napoli, Via dei Bonaparte 18, Ascoli Piceno"
          src={SITE.mapsEmbed}
          className="h-[26rem] w-full border-0 grayscale-[0.5] sepia-[0.2]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
