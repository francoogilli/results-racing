export type MotoGpEvent = {
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

export interface F1Meeting {
  meeting_key: number;
  meeting_name: string;
  location: string;
  country_name: string;
  country_code: string;
  date_start: string;
  country_flag?: string;
  circuit_image?: string;
}
