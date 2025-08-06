import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import { isSameDay, format } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { nl } from "date-fns/locale"
import { DateTime } from "luxon"

type Props = {
  date: Date | null
  onDateChange: (value: Date) => void
  onNext: () => void
  onBack: () => void
}

export const Step3_Date = ({ date, onDateChange, onNext, onBack }: Props) => {
  const [error, setError] = useState("")
  const [showTopShadow, setShowTopShadow] = useState(false)
  const [showBottomShadow, setShowBottomShadow] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const availableDates = Array.from({ length: 21 }, (_, i) =>
    DateTime.now().setZone("Europe/Amsterdam").plus({ days: i }).toJSDate()
  )

  const handleNext = () => {
    if (!date) {
      setError("Kies een datum om verder te gaan.")
      return
    }
    setError("")
    onNext()
  }

  const handleScroll = () => {
    const container = scrollRef.current
    if (!container) return

    const { scrollTop, scrollHeight, clientHeight } = container
    setShowTopShadow(scrollTop > 0)
    setShowBottomShadow(scrollTop + clientHeight < scrollHeight - 1)
  }

  useEffect(() => {
    handleScroll()
  }, [])

  function groupDatesByWeek(dates: Date[]) {
    const now = DateTime.now().setZone("Europe/Amsterdam")

    const dezeWeekStart = now.set({ weekday: 1 }).startOf("day") // maandag 00:00
    const dezeWeekEnd = dezeWeekStart.plus({ days: 6 }).endOf("day") // zondag 23:59:59

    const komendeWeekStart = dezeWeekStart.plus({ weeks: 1 }).startOf("day")
    const komendeWeekEnd = komendeWeekStart.plus({ days: 6 }).endOf("day")

    const overTweeWeekStart = dezeWeekStart.plus({ weeks: 2 }).startOf("day")
    const overTweeWeekEnd = overTweeWeekStart.plus({ days: 6 }).endOf("day")

    return {
      dezeWeek: dates.filter((d) => {
        const dt = DateTime.fromJSDate(d).setZone("Europe/Amsterdam")
        return dt >= dezeWeekStart && dt <= dezeWeekEnd
      }),
      komendeWeek: dates.filter((d) => {
        const dt = DateTime.fromJSDate(d).setZone("Europe/Amsterdam")
        return dt >= komendeWeekStart && dt <= komendeWeekEnd
      }),
      overTweeWeek: dates.filter((d) => {
        const dt = DateTime.fromJSDate(d).setZone("Europe/Amsterdam")
        return dt >= overTweeWeekStart && dt <= overTweeWeekEnd
      }),
    }
  }

  const groupedDates = groupDatesByWeek(availableDates)

  return (
    <div>
      <h3 className="m-2 text-sm font-light">Wanneer wilt u langskomen?</h3>
      <div className="relative rounded-xl  overflow-hidden">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex flex-col max-h-96 overflow-y-auto space-y-5 bg-white text-sm font-semibold relative border rounded-xl"
        >
          <div>
            <h4 className="px-4 py-2 font-light mt-3 border-b border-gray-200 flex justify-center">
              DEZE WEEK
            </h4>

            <div className="overflow-hidden">
              {groupedDates.dezeWeek.length === 0 && (
                <p className="text-gray-800">Geen beschikbare dagen</p>
              )}
              {groupedDates.dezeWeek.map((d) => (
                <div
                  key={d.toDateString()}
                  className={`w-full border-b pl-4 py-3 cursor-pointer transition ${
                    date && isSameDay(date, d)
                      ? "bg-[#e9207e] text-white"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => onDateChange(d)}
                >
                  {format(d, "EEEE dd MMMM", { locale: nl })}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="px-4 py-2 mt-3 font-light border-b border-gray-200 flex justify-center">
              VOLGENDE WEEK
            </h4>
            <div className="overflow-hidden">
              {groupedDates.komendeWeek.length === 0 && (
                <p className="text-gray-800">Geen beschikbare dagen</p>
              )}
              {groupedDates.komendeWeek.map((d) => (
                <div
                  key={d.toDateString()}
                  className={`w-full pl-4 border-b py-3 cursor-pointer transition ${
                    date && isSameDay(date, d)
                      ? "bg-[#e9207e] text-white"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => onDateChange(d)}
                >
                  {format(d, "EEEE dd MMMM", { locale: nl })}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="px-4 py-2 mt-3 font-light border-b border-gray-200 flex justify-center">
              OVER TWEE WEKEN
            </h4>
            {groupedDates.overTweeWeek.length === 0 && (
              <p className="text-gray-800">Geen beschikbare dagen</p>
            )}
            <div className="overflow-hidden">
              {groupedDates.overTweeWeek.map((d) => (
                <div
                  key={d.toDateString()}
                  className={`w-full pl-4 border-b py-3 cursor-pointer transition ${
                    date && isSameDay(date, d)
                      ? "bg-[#e9207e] text-white"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => onDateChange(d)}
                >
                  {format(d, "EEEE dd MMMM", { locale: nl })}
                </div>
              ))}
            </div>
          </div>
        </div>
        {showTopShadow && (
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-gray-300 to-transparent pointer-events-none z-10" />
        )}
        {showBottomShadow && (
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-gray-300 to-transparent pointer-events-none z-10" />
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {/* Buttons */}
      <div className="mt-6 flex justify-between">
        <Button
          variant="secondary"
          onClick={onBack}
          className="bg-white border hover:bg-gray-200 hover:border-gray-300 rounded cursor-pointer"
        >
          <ChevronLeft />
          Terug
        </Button>
        <Button
          onClick={handleNext}
          disabled={!date}
          className="hover:bg-pink-600 bg-[#e9207e] text-white rounded cursor-pointer"
        >
          Volgende
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}
