import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import Btn from "../components/Btn";
import { SITE } from "../data/site";

type Room = { id: string; name: string; note: string; imgs: string[]; cls: string };

const ROOMS: Room[] = [
  {
    id: "murale",
    name: "Sala del murale",
    note: "Travi in legno e lo skyline di Ascoli disegnato a parete",
    imgs: ["/img/sala1-a.webp", "/img/murale-ascoli.webp", "/img/sala1-b.webp", "/img/bancone.webp", "/img/sala1-c.webp"],
    cls: "col-span-2 row-span-2 min-h-72",
  },
  {
    id: "volte",
    name: "Sala delle volte",
    note: "Mattoni a vista, cotto e stampe d'epoca",
    imgs: ["/img/sala2-a.webp", "/img/sala2-b.webp", "/img/sala2-c.webp", "/img/cornici.webp", "/img/sala1-d.webp"],
    cls: "lg:row-span-2 min-h-44 lg:min-h-72",
  },
  {
    id: "veranda",
    name: "La veranda",
    note: "Sotto la pergola, tra bambù e luci calde",
    imgs: ["/img/veranda-a.webp", "/img/veranda-b.webp", "/img/veranda-c.webp"],
    cls: "min-h-44",
  },
  {
    id: "giardino",
    name: "Il giardino",
    note: "Il giardino interno, per cenare all'aperto",
    imgs: ["/img/giardino-a.webp", "/img/giardino-b.webp"],
    cls: "max-lg:col-span-2 min-h-44",
  },
];

const EASE = [0.23, 1, 0.32, 1] as const;

function Tile({ room, index, onOpen }: { room: Room; index: number; onOpen: (img: number) => void }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = window.setTimeout(() => setI((n) => (n + 1) % room.imgs.length), 5200 + index * 1100);
    return () => window.clearTimeout(id);
  }, [i, index, room.imgs.length]);

  return (
    <motion.button
      type="button"
      layoutId={`room-${room.id}`}
      onClick={() => onOpen(i)}
      className={`group relative overflow-hidden bg-ink text-left text-flour ${room.cls}`}
      aria-label={`Apri le foto: ${room.name}`}
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={room.imgs[i]}
          src={room.imgs[i]}
          alt=""
          className="absolute inset-0 size-full object-cover transition-[scale] duration-[1.2s] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          loading="lazy"
        />
      </AnimatePresence>
      <span aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(29,23,20,0.8))]" />
      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
        <span>
          <span className="block font-display text-2xl leading-tight md:text-3xl">{room.name}</span>
          <span className="mt-1 block max-w-xs text-sm text-flour/75 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
            {room.note}
          </span>
        </span>
        <span className="grid size-11 shrink-0 place-items-center rounded-full border border-flour/40 text-lg transition-[background-color,color,transform] duration-300 group-hover:rotate-45 group-hover:bg-flour group-hover:text-ink">
          <i className="ri-add-line" aria-hidden />
        </span>
      </span>
    </motion.button>
  );
}

function Lightbox({ room, start, onClose }: { room: Room; start: number; onClose: () => void }) {
  const [[i, dir], setState] = useState<[number, number]>([start, 0]);
  const n = room.imgs.length;
  const go = useCallback((d: number) => setState(([cur]) => [(cur + d + n) % n, d]), [n]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [go, onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col bg-ink/95 text-flour backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      role="dialog"
      aria-modal="true"
      aria-label={room.name}
    >
      <div className="flex items-center justify-between px-5 py-4 sm:px-8">
        <div>
          <p className="font-display text-2xl">{room.name}</p>
          <p className="text-sm text-flour/60">{room.note}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="grid size-12 place-items-center rounded-full border border-flour/20 text-2xl transition-colors hover:bg-flour hover:text-ink active:scale-[0.95]"
          aria-label="Chiudi galleria"
        >
          <i className="ri-close-line" aria-hidden />
        </button>
      </div>

      <motion.div layoutId={`room-${room.id}`} className="relative mx-5 flex-1 overflow-hidden sm:mx-8" transition={{ duration: 0.6, ease: EASE }}>
        <AnimatePresence initial={false} custom={dir}>
          <motion.img
            key={room.imgs[i]}
            src={room.imgs[i]}
            alt={`${room.name}, foto ${i + 1} di ${n}`}
            custom={dir}
            className="absolute inset-0 size-full cursor-grab object-contain active:cursor-grabbing"
            variants={{
              enter: (d: number) => ({ x: d === 0 ? 0 : `${d * 30}%`, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: `${d * -30}%`, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: EASE }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60 || info.velocity.x < -400) go(1);
              else if (info.offset.x > 60 || info.velocity.x > 400) go(-1);
            }}
          />
        </AnimatePresence>
        <button type="button" onClick={() => go(-1)} aria-label="Foto precedente" className="absolute top-1/2 left-3 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-ink/60 text-2xl transition-colors hover:bg-flour hover:text-ink">
          <i className="ri-arrow-left-line" aria-hidden />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Foto successiva" className="absolute top-1/2 right-3 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-ink/60 text-2xl transition-colors hover:bg-flour hover:text-ink">
          <i className="ri-arrow-right-line" aria-hidden />
        </button>
      </motion.div>

      <div className="flex justify-center gap-2 overflow-x-auto px-5 py-4">
        {room.imgs.map((src, k) => (
          <button
            key={src}
            type="button"
            onClick={() => setState([k, k > i ? 1 : -1])}
            aria-label={`Foto ${k + 1}`}
            className={`h-14 w-20 shrink-0 overflow-hidden transition-opacity duration-300 ${k === i ? "opacity-100 ring-2 ring-flour" : "opacity-40 hover:opacity-80"}`}
          >
            <img src={src} alt="" className="size-full object-cover" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export default function Locale() {
  const [open, setOpen] = useState<{ room: Room; img: number } | null>(null);

  return (
    <section id="locale" className="bg-flour px-5 py-24 sm:px-8 md:py-36" aria-labelledby="locale-title">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <p className="text-[13px] font-semibold tracking-[0.2em] text-tomato uppercase">Il locale</p>
            <h2 id="locale-title" className="mt-5 font-display text-[clamp(2.8rem,6vw,5rem)] leading-none">Quattro sale, un giardino</h2>
          </div>
          <p className="max-w-md text-lg text-smoke md:justify-self-end">
            {SITE.seats} posti in pieno centro storico, con Wi-Fi in tutte le sale. Tocca una sala per vedere le foto.
          </p>
        </div>

        <div className="mt-14 grid auto-rows-[minmax(11rem,1fr)] grid-cols-2 gap-3 lg:h-[40rem] lg:grid-cols-4 lg:auto-rows-auto lg:grid-rows-2 lg:gap-4">
          {ROOMS.map((room, k) => (
            <Tile key={room.id} room={room} index={k} onOpen={(img) => setOpen({ room, img })} />
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-ink/15 pt-10 md:flex-row md:items-center">
          <p className="max-w-xl font-display text-3xl leading-tight md:text-4xl">
            Compleanni, lauree, anniversari: ti teniamo una sala tutta per voi.
          </p>
          <Btn href={SITE.phoneHref} icon="ri-phone-fill" variant="dark">Chiama {SITE.phone}</Btn>
        </div>
      </div>

      <AnimatePresence>
        {open && <Lightbox key={open.room.id} room={open.room} start={open.img} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  );
}
