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
    additional_name: event.additional_name || "",
  };
};
