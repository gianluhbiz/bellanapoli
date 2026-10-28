// ATTENZIONE: il menu online del locale (Qodeup) non è più attivo e non esiste un listino pubblico.
// Piatti e prezzi qui sotto sono indicativi: vanno confermati con la pizzeria prima della messa online.

export type Tag = "veg" | "piccante" | "firma" | "locale";

export type Dish = {
  name: string;
  desc: string;
  price: number;
  tags?: Tag[];
};

export type Category = {
  id: string;
  title: string;
  kicker: string;
  note?: string;
  image: string;
  items: Dish[];
};

export const MENU: Category[] = [
  {
    id: "fritti",
    title: "Fritti & antipasti",
    kicker: "Si comincia all'ascolana",
    note: "Olive e cremini li friggiamo al momento, a ordine.",
    image: "/img/bancone.webp",
    items: [
      { name: "Olive all'ascolana", desc: "Dieci olive tenere ripiene di carne, impanate e fritte", price: 6, tags: ["locale", "firma"] },
      { name: "Cremini fritti", desc: "Crema pasticcera in panatura dorata, come da tradizione", price: 5, tags: ["locale", "veg"] },
      { name: "Fritto misto ascolano", desc: "Olive, cremini, zucchine, carciofi e costolette d'agnello", price: 13, tags: ["locale", "firma"] },
      { name: "Crocchette di patate", desc: "Sei pezzi, cuore filante di mozzarella", price: 4.5, tags: ["veg"] },
      { name: "Patatine fritte", desc: "Porzione abbondante", price: 4, tags: ["veg"] },
      { name: "Bruschette miste", desc: "Pomodorino e basilico, lardo e pepe, crema di olive", price: 5.5 },
      { name: "Tagliere della casa", desc: "Salumi e formaggi marchigiani, ciauscolo, pecorino, miele", price: 13, tags: ["locale"] },
    ],
  },
  {
    id: "classiche",
    title: "Le classiche",
    kicker: "Pomodoro italiano, mozzarella Sabelli",
    image: "/img/margherita-basilico.webp",
    items: [
      { name: "Marinara", desc: "Pomodoro, aglio, origano, olio extravergine", price: 5, tags: ["veg"] },
      { name: "Margherita", desc: "Pomodoro, mozzarella fiordilatte, basilico", price: 6, tags: ["veg"] },
      { name: "Napoli", desc: "Pomodoro, mozzarella, acciughe, capperi, origano", price: 7 },
      { name: "Diavola", desc: "Pomodoro, mozzarella, salame piccante", price: 7.5, tags: ["piccante"] },
      { name: "Prosciutto e funghi", desc: "Pomodoro, mozzarella, cotto, funghi champignon", price: 8 },
      { name: "Capricciosa", desc: "Pomodoro, mozzarella, cotto, funghi, carciofini, olive", price: 8.5 },
      { name: "Quattro stagioni", desc: "Le quattro anime della capricciosa, divise a spicchi", price: 8.5 },
      { name: "Wurstel e patatine", desc: "Pomodoro, mozzarella, wurstel, patatine fritte", price: 7.5 },
      { name: "Ortolana", desc: "Pomodoro, mozzarella, zucchine, melanzane, peperoni, cipolla rossa", price: 8, tags: ["veg"] },
      { name: "Caprese", desc: "Pomodorini, mozzarella di bufala, basilico, olio a crudo", price: 9, tags: ["veg"] },
    ],
  },
  {
    id: "bianche",
    title: "Le bianche",
    kicker: "Senza pomodoro, tutta sostanza",
    image: "/img/bianca-zucchine.webp",
    items: [
      { name: "Focaccia", desc: "Olio, sale grosso, rosmarino", price: 4, tags: ["veg"] },
      { name: "Quattro formaggi", desc: "Mozzarella, gorgonzola, fontina, pecorino", price: 8.5, tags: ["veg"] },
      { name: "Zucchine e provola", desc: "Mozzarella, zucchine a rondelle, provola affumicata", price: 8, tags: ["veg"] },
      { name: "Patate e salsiccia", desc: "Mozzarella, patate al forno, salsiccia, rosmarino", price: 8.5 },
      { name: "Salsiccia e friarielli", desc: "Provola, salsiccia sbriciolata, friarielli saltati", price: 9, tags: ["piccante"] },
      { name: "Crudo e rucola", desc: "Mozzarella, prosciutto crudo, rucola, scaglie di grana", price: 9 },
    ],
  },
  {
    id: "speciali",
    title: "Le nostre speciali",
    kicker: "Quelle che ordinano gli habitué",
    image: "/img/pizza-burrata.webp",
    items: [
      { name: "Bella Napoli", desc: "Pomodoro, bufala campana, pomodorini, basilico, olio a crudo", price: 10, tags: ["firma", "veg"] },
      { name: "Ascolana", desc: "Mozzarella, olive all'ascolana e cremini fritti sulla pizza", price: 10.5, tags: ["firma", "locale"] },
      { name: "Burrata", desc: "Pomodoro, burrata intera, pomodorini, capperi, basilico", price: 10, tags: ["veg"] },
      { name: "Picena", desc: "Mozzarella, ciauscolo, pecorino dei Sibillini, miele", price: 10, tags: ["locale"] },
      { name: "Tartufata", desc: "Crema di tartufo, mozzarella, funghi porcini, salsiccia", price: 11 },
      { name: "Calzone napoletano", desc: "Ricotta, salame, mozzarella, pomodoro sopra", price: 8.5 },
    ],
  },
  {
    id: "senza-glutine",
    title: "Senza glutine & integrale",
    kicker: "Stessa pizza, altra farina",
    note: "Ogni pizza del menu esiste anche senza glutine (+2 €). Impasto integrale dal martedì al venerdì (+1 €).",
    image: "/img/margherita-sottile.webp",
    items: [
      { name: "Margherita senza glutine", desc: "Base senza glutine, pomodoro, mozzarella, basilico", price: 8, tags: ["veg"] },
      { name: "Ortolana senza glutine", desc: "Base senza glutine, verdure grigliate, mozzarella", price: 10, tags: ["veg"] },
      { name: "Margherita integrale", desc: "Impasto con farina integrale, dal martedì al venerdì", price: 7, tags: ["veg"] },
    ],
  },
  {
    id: "dolci",
    title: "Dolci",
    kicker: "C'è sempre posto",
    image: "/img/dolce-nutella.webp",
    items: [
      { name: "Pizza Nutella e pistacchio", desc: "Impasto cotto a legna, Nutella, granella di pistacchio", price: 7, tags: ["firma", "veg"] },
      { name: "Tiramisù della casa", desc: "Savoiardi, mascarpone, caffè", price: 5, tags: ["veg"] },
      { name: "Panna cotta", desc: "Ai frutti di bosco o al caramello", price: 4.5, tags: ["veg"] },
      { name: "Sorbetto al limone", desc: "Per chiudere leggeri", price: 3.5, tags: ["veg"] },
    ],
  },
  {
    id: "bevande",
    title: "Da bere",
    kicker: "Birra fresca e vini del Piceno",
    image: "/img/birra.webp",
    items: [
      { name: "Birra alla spina", desc: "Piccola 0,2 l / media 0,4 l", price: 3 },
      { name: "Forst in bottiglia", desc: "Bionda, 0,66 l", price: 4.5 },
      { name: "Rosso Piceno, calice", desc: "Rosso delle colline ascolane", price: 4.5, tags: ["locale"] },
      { name: "Vino della casa", desc: "Rosso o bianco, mezzo litro", price: 6 },
      { name: "Bibite in lattina", desc: "Coca-Cola, Fanta, tè freddo", price: 3 },
      { name: "Acqua", desc: "Naturale o frizzante, 0,75 l", price: 2 },
    ],
  },
];

export const TAG_LABEL: Record<Tag, { label: string; icon: string }> = {
  veg: { label: "Vegetariana", icon: "ri-leaf-line" },
  piccante: { label: "Piccante", icon: "ri-fire-line" },
  firma: { label: "Della casa", icon: "ri-award-line" },
  locale: { label: "Tipico ascolano", icon: "ri-map-pin-2-line" },
};

export const formatPrice = (n: number) =>
  n.toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
