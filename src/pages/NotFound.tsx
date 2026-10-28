import { motion } from "framer-motion";
import Btn from "../components/Btn";
import Ornament from "../components/Ornament";
import Page from "../components/Page";

export default function NotFound() {
  return (
    <Page label="404">
      <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-ink px-5 text-center text-flour">
        <motion.img
          src="/img/forno-bocca.webp"
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover opacity-30"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
        />
        <div className="relative">
          <p className="text-[13px] font-semibold tracking-[0.3em] text-tomato uppercase">Errore 404</p>
          <h1 className="mt-5 max-w-2xl font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.95]">
            Questa pagina non è uscita dal forno.
          </h1>
          <Ornament className="mt-8 text-tomato" />
          <p className="mx-auto mt-6 max-w-md text-flour/70">Il link è sbagliato o la pagina non esiste più. Il menu invece c'è.</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Btn to="/" icon="ri-home-5-line">Torna alla home</Btn>
            <Btn to="/menu" variant="outline-light" arrow>Vai al menu</Btn>
          </div>
        </div>
      </main>
    </Page>
  );
}
