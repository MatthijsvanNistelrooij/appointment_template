import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import clsx from "clsx"
import { ChevronRight } from "lucide-react"
import { services } from "@/constants"

type Props = {
  value: string
  onChange: (value: string) => void
  onNext: (category: string) => void
}

export const Step1_Service = ({ value, onChange, onNext }: Props) => {
  const [error, setError] = useState("")
  const [atTop, setAtTop] = useState(true)
  const [atBottom, setAtBottom] = useState(false)
  const listRef = useRef<HTMLDivElement | null>(null)

  const handleScroll = () => {
    const el = listRef.current
    if (!el) return
    setAtTop(el.scrollTop === 0)
    setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 1)
  }

  useEffect(() => {
    const el = listRef.current
    if (!el) return
    handleScroll()
    el.addEventListener("scroll", handleScroll)
    return () => el.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNext = () => {
    if (!value) {
      setError("Selecteer een dienst om verder te gaan.")
      return
    }
    setError("")
    const selectedService = services.find((s) => s.name === value)
    const category = selectedService?.category || ""
    onNext(category)
  }

  const groupedServices: Record<string, typeof services> = services.reduce(
    (acc, service) => {
      if (!acc[service.category]) {
        acc[service.category] = []
      }
      acc[service.category].push(service)
      return acc
    },
    {} as Record<string, typeof services>
  )

  const formatCategoryLabel = (category: string) => {
    return (
      category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ")
    )
  }

  return (
    <div>
      <h3 className="m-2 text-sm font-light">Welke behandeling wenst u?</h3>

      <div className="relative overflow-y-auto rounded-xl bg-white border">
        <div ref={listRef} className="overflow-y-auto max-h-96">
          {Object.entries(groupedServices).map(([category, items]) => (
            <div key={category}>
              <h4 className="px-4 py-2 font-semibold mt-5 border-b border-gray-200 flex justify-center">
                {formatCategoryLabel(category)}
              </h4>
              {items.map((service) => (
                <div
                  key={service.name}
                  onClick={() => onChange(service.name)}
                  className={clsx(
                    "w-full border-b border-gray-200 px-4 py-3 flex justify-between items-center cursor-pointer transition text-sm font-medium",
                    value === service.name
                      ? "bg-[#e9207e] text-white"
                      : "hover:bg-gray-100"
                  )}
                >
                  <span className="max-w-[70%]">{service.name}</span>
                  <div className="flex flex-col items-end text-right">
                    <span className="text-lg font-light flex">
                      {service.price}
                    </span>
                    {service.time && (
                      <span
                        className={clsx(
                          "text-xs -mt-1",
                          value === service.name
                            ? "text-white"
                            : "text-gray-400"
                        )}
                      >
                        {service.time}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {!atTop && (
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-gray-300 to-transparent pointer-events-none z-10" />
        )}
        {!atBottom && (
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-gray-300 to-transparent pointer-events-none z-10" />
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

      <div className="mt-6 flex justify-end">
        <Button
          onClick={handleNext}
          disabled={!value}
          className="hover:bg-pink-600 bg-[#e9207e] text-white rounded cursor-pointer"
        >
          Volgende
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}
