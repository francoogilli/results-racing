"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { mapEventToScheduleItem } from "@/services";

export function InteractiveSchedule() {
  const [scheduleData, setScheduleData] = useState<any[]>([]);
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  useEffect(() => {
    const fetchCalendar = async () => {
      const res = await fetch("/api/motogp/events");
      const data = await res.json();

      const races = data.filter((event: any) => event.kind === "GP");
      const mapped = races.map(mapEventToScheduleItem);
      setScheduleData(mapped);
    };

    fetchCalendar();
  }, []);

  useEffect(() => {
    console.log(scheduleData);
  }, [scheduleData]);

  const getRandomTrophy = (id: number | string) => {
    // Simple hash function to get a consistent number from string/number
    const val =
      typeof id === "string"
        ? Number.parseInt(id.replace(/\D/g, "") || "0")
        : id;
    // Use modulo 9 + 1 to get 1-9
    const trophyNum = (val % 9) + 1;
    return `/images/trofeus/trofeu${trophyNum}.svg`;
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full bg-[#111111] py-32 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <div className="w-full">
          <div className="grid grid-cols-12 gap-4 mb-4 text-[10px] md:text-xs font-bold text-white/30 uppercase tracking-widest px-4">
            <div className="col-span-1">Round</div>
            <div className="col-span-4">Location</div>
            <div className="col-span-3 text-center">When</div>
            <div className="col-span-2 text-center">Finish</div>
            <div className="col-span-2 text-right">Fastest Lap</div>
          </div>

          {scheduleData.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredEvent(item.id)}
              onMouseLeave={() => setHoveredEvent(null)}
              className="group relative transition-all duration-300"
            >
              <div className="grid grid-cols-12 gap-4 py-4 md:py-6 px-4 group-hover:bg-lime-300 hover:cursor-pointer items-center border-t border-white/10 group-hover:bg-lorenzo-accent group-hover:border-transparent transition-colors duration-300">
                <div className="col-span-1 relative">
                  <span className="font-(family-name:--font-oswald) font-bold text-3xl md:text-5xl text-white/40 group-hover:text-black relative z-10 opacity-100">
                    {item.round}
                  </span>

                  <div className="absolute top-1/2 left-0 w-12 md:w-16 h-6 md:h-8 -translate-y-1/2 z-20 pointer-events-none text-lorenzo-accent group-hover:text-black transition-colors">
                    <img
                      src="/images/trass.svg"
                      alt=""
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>
                </div>

                <div className="col-span-4 flex items-center gap-3">
                  <Image
                    src={item.flagImage || "/placeholder.svg"}
                    alt={`${item.location} flag`}
                    width={40}
                    height={30}
                    className="w-8 h-6 md:w-10 md:h-8 object-cover rounded-sm shadow-sm"
                  />
                  <span className="font-(family-name:--font-oswald) font-bold text-3xl text-white uppercase tracking-tighter leading-none group-hover:text-black transition-colors md:text-5xl">
                    {item.additional_name}
                  </span>
                </div>

                <div className="col-span-3 text-center font-(family-name:--font-oswald) font-bold text-xl md:text-4xl text-white/80 group-hover:text-black transition-colors uppercase">
                  {item.date}
                </div>

                <div className="col-span-2 text-center flex justify-center items-center gap-2 md:gap-3">
                  <Image
                    src={
                      getRandomTrophy(item.id + item.location) ||
                      "/placeholder.svg"
                    }
                    alt="Trophy"
                    width={32}
                    height={32}
                    className="size-8 md:w-10 md:h-10 group-hover:brightness-0 transition-all"
                  />
                  <span className="font-(family-name:--font-oswald) font-bold text-2xl md:text-4xl text-white group-hover:text-black italic">
                    {item.finish}
                  </span>
                </div>

                <div className="col-span-2 text-right font-(family-name:--font-oswald) font-bold text-lg md:text-2xl text-white group-hover:text-black">
                  {item.fastestLap}
                  <span className="text-xs align-top ml-1">S</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
