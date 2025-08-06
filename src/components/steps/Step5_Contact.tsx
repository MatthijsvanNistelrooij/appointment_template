import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "../ui/input"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Checkbox } from "../ui/checkbox"

type Props = {
  name: string
  email: string
  phone: string
  rememberData: boolean
  setRememberData: (val: boolean) => void
  onNameChange: (value: string) => void
  onEmailChange: (value: string) => void
  onPhoneChange: (value: string) => void
  onNext: () => void
  onBack: () => void
}

export const Step5_Contact = ({
  name,
  email,
  phone,
  rememberData,
  setRememberData,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  onNext,
  onBack,
}: Props) => {
  const [error, setError] = useState("")

  const handleNext = () => {
    if (!name || !email) {
      setError("Vul minimaal je naam en e-mail in.")
      return
    }
    setError("")
    onNext()
  }

  return (
    <div className="">
      <h3 className="m-2 text-sm font-light">
        Uw contactgegevens
      </h3>
      <div className="flex flex-col p-5 gap-1 bg-white border rounded-xl">
        <label className="font-bold text-gray-700 text-sm ml-1">Naam</label>
        <Input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="input input-bordered rounded border-gray-200 text-black"
        />
        <label className="font-bold text-gray-700 text-sm ml-1 mt-2">
          E-mail
        </label>
        <Input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="input input-bordered rounded border-gray-200 text-black"
        />
        <label className="font-bold text-gray-700 text-sm ml-1 mt-2">
          Tel.
        </label>
        <Input
          type="tel"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          className="input input-bordered rounded border-gray-200 text-black"
        />
        <label className="text-xs text-gray-700 mt-8 flex items-center gap-2 cursor-pointer">
          <Checkbox
            className="border border-gray-300"
            checked={rememberData}
            onCheckedChange={(checked) => setRememberData(checked === true)}
          />
          Bewaar Gegevens
        </label>

        <div className="text-xs text-gray-700 mt-4">
          Door uw gegevens hier boven in te vullen en door te gaan naar de
          volgende stap gaat u akkoord met de{" "}
          <a href="/privacy" className="text-blue-600 hover:text-blue-800">
            privacy verklaring
          </a>
          . Ben je jonger dan 16 jaar? Vraag dan aan een ouder of voogd om de
          afspraak voor je in te plannen.
        </div>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="mt-10 flex justify-between">
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
          disabled={!name || !email}
          className="hover:bg-pink-600 bg-[#e9207e] text-white rounded cursor-pointer"
        >
          Volgende
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}
