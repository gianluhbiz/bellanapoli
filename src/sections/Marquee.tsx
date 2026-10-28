const ITEMS = [
  { text: "Due forni a legna", img: "/img/forno-bocca.webp" },
  { text: "Olive all'ascolana", img: "/img/pizza-olive.webp" },
  { text: "Senza glutine", img: "/img/margherita-sottile.webp" },
  { text: "Integrale dal martedì al venerdì", img: "/img/pizza-bianca.webp" },
  { text: "Giropizza il lunedì", img: "/img/pizza-salame.webp" },
  { text: "Asporto e domicilio", img: "/img/pizza-tonda.webp" },
];

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {ITEMS.map((it) => (
        <span key={it.text} className="flex items-center gap-8 pr-8">
          <span className="font-display text-[clamp(2rem,4vw,3.4rem)] whitespace-nowrap">{it.text}</span>
          <img src={it.img} alt="" className="h-14 w-24 rounded-full object-cover md:h-16 md:w-28" loading="lazy" />
        </span>
      ))}
    </div>
  );
}

/** Endless band of what makes the place, pauses on hover. */
export default function Marquee() {
  return (
    <div className="group overflow-hidden border-y border-tomato-deep bg-tomato py-6 text-flour" aria-label="In breve">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        <Row />
        <Row />
      </div>
    </div>
  );
}
