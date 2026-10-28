import { useEffect, useState } from "react";
import { SITE } from "../data/site";

const DAYS = ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];

function romeNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Rome",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  const wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { h: Number(get("hour")), m: Number(get("minute")), day: wd };
}

export type OpenStatus = {
  open: boolean;
  label: string;
  detail: string;
  day: number;
  dayName: string;
  isMonday: boolean;
};

function compute(): OpenStatus {
  const { h, m, day } = romeNow();
  const open = h >= SITE.openHour && h < SITE.closeHour;
  const now = h * 60 + m;
  let detail: string;
  if (open) {
    const left = SITE.closeHour * 60 - now;
    detail = left <= 60 ? `chiudiamo tra ${left} min` : "forni accesi fino a mezzanotte";
  } else {
    const until = SITE.openHour * 60 - now;
    const hh = Math.floor(until / 60);
    const mm = until % 60;
    detail = hh > 0 ? `apriamo alle 19, tra ${hh} h ${mm} min` : `apriamo tra ${mm} min`;
  }
  return {
    open,
    label: open ? "Aperto ora" : "Chiuso ora",
    detail,
    day,
    dayName: DAYS[day],
    isMonday: day === 1,
  };
}

export function useOpenStatus() {
  const [status, setStatus] = useState(compute);
  useEffect(() => {
    const id = window.setInterval(() => setStatus(compute()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return status;
}
