import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://api.pulselive.motogp.com/motogp/v1/events?seasonYear=2026",
    {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
      // evita cache raro
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch MotoGP events" },
      { status: 500 }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
