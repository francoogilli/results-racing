import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://api.openf1.org/v1/meetings?year=2026",
    {
      // evita cache en dev
      cache: "no-store",
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}
