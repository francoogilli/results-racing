type MotoGpEvent = {
  id: string;
  sequence: number;
  additional_name: string;
  country: string;
  name: string;
  date_start: string;
  kind: "RACE" | "TEST";
  assets?: {
    type: string;
    path: string;
  }[];
};
