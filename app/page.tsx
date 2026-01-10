import Header from "@/components/header"
import Image from "next/image"
import { RaceDayCountdown } from "@/components/race-day-countdown"
import { InteractiveSchedule } from "@/components/interactive-schedule"

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <div className="relative z-10">
        <RaceDayCountdown />
        <div className="relative w-full h-30 md:h-40 lg:h-50 overflow-hidden bg-[#282C20]">
          <Image
            src="/images/trilhadiee.svg"
            alt="Tire track divider"
            fill
            className="object-cover object-center bg-lorenzo-dark"
            priority={false}
          />
        </div>
        <InteractiveSchedule />
        {/* <HistoricalResultsAccordion /> */}
      </div>
    </main>
  )
}
