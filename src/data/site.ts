// Dati reali presi da sito ufficiale, TripAdvisor, Google Maps e Facebook (ottobre 2026).

export const SITE = {
  name: "Pizzeria Bella Napoli",
  since: 1968,
  phone: "+39 0736 257030",
  phoneHref: "tel:+390736257030",
  mobile: "+39 379 173 3878",
  mobileHref: "tel:+393791733878",
  email: "info@pizzeriabellanapoliascoli.it",
  address: "Via dei Bonaparte 18/20",
  city: "63100 Ascoli Piceno",
  mapsDirections:
    "https://www.google.com/maps/dir/?api=1&destination=Pizzeria+Bella+Napoli+Dal+1968,+Via+dei+Bonaparte+18,+Ascoli+Piceno",
  mapsEmbed:
    "https://www.google.com/maps?q=Pizzeria+Bella+Napoli+Dal+1968,+Via+dei+Bonaparte+18,+Ascoli+Piceno&z=17&output=embed",
  facebook: "https://www.facebook.com/pizzeriabellanapoliAP/",
  instagram: "https://www.instagram.com/pizzeria_bella_napoli_ap/",
  openHour: 19,
  closeHour: 24,
  seats: 180,
  rooms: 4,
  ovens: 2,
  google: { rating: "4,1", count: 979 },
  tripadvisor: { rating: "3,8", count: 485 },
  giropizzaPrice: 12,
  legal:
    "Pizzeria Bella Napoli di Brandimarti & Tosti snc · P.IVA 00436130447 · REA AP-90134",
} as const;

export const REVIEWS = [
  {
    text: "Pizza buonissima accompagnata da un buon piatto di olive ascolane.",
    author: "Recensione Google",
    source: "Google",
  },
  {
    text: "Ottima pizza, sottile, croccante, molto varia. Veloci e gentili.",
    author: "Recensione Google",
    source: "Google",
  },
  {
    text: "Pizza buonissima, leggera e con prodotti di ottima qualità. Da sempre una garanzia!",
    author: "Elena M.",
    source: "TripAdvisor",
  },
  {
    text: "Pizza migliore della città, ci vengo da anni. Complimenti.",
    author: "angiolino34",
    source: "TripAdvisor",
  },
  {
    text: "Locale storico in pieno centro, personale gentile e pizze buone. Da provare i fritti tipici ascolani.",
    author: "Alfio Z.",
    source: "TripAdvisor",
  },
  {
    text: "Il lunedì c'è il giropizza: tutte le pizze che vuoi. Un'occasione da non perdere!",
    author: "Giada D.C.",
    source: "TripAdvisor",
  },
] as const;
