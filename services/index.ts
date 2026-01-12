import { MotoGpEvent } from "./types";

const formatDate = (iso: string) => {
  const date = new Date(iso);
  return date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    })
    .toUpperCase();
};

export { formatDate };
const countryNames: Record<string, string> = {
  BR: "BRASIL",
  AR: "ARGENTINA",
  ES: "ESPAÑA",
  IT: "ITALIA",
  FR: "FRANCIA",
  GB: "GRAN BRETAÑA",
  US: "ESTADOS UNIDOS",
  JP: "JAPÓN",
  AU: "AUSTRALIA",
  HU: "HUNGRÍA",
  MY: "MALASIA",
  TH: "TAILANDIA",
  QA: "QATAR",
  PT: "PORTUGAL",
  NL: "PAÍSES BAJOS",
  DE: "ALEMANIA",
  CZ: "REPÚBLICA CHECA",
  AT: "AUSTRIA",
};
export const mapEventToScheduleItem = (event: MotoGpEvent, index: number) => {
  const flag =
    event.assets?.find((a) => a.type === "FLAG")?.path ??
    "/images/flags/flag-Unknown.svg";

  return {
    id: event.id,
    round: String(index + 1).padStart(2, "0"),
    location: event.name,
    flagImage: flag,
    date: formatDate(event.date_start),
    finish: "--",
    fastestLap: "--",
    additional_name: countryNames[event.country] || event.additional_name,
    country: event.country,
  };
};

export const hasEventPassed = (date: string) => {
  const eventDate = new Date(date);
  const now = new Date();

  // Normalizamos para evitar problemas de horas
  eventDate.setHours(23, 59, 59, 999);

  return eventDate < now;
};

