import React from "react"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"

type Props = {
  currentPage: number
  totalPages: number
  onPrev: () => void
  onNext: () => void
  disabled: boolean
}

const Pagination = ({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  disabled,
}: Props) => {
  return (
    <div className="flex justify-center items-center gap-4 m-3 text-sm text-gray-600">
      <Button
        onClick={onPrev}
        disabled={disabled || currentPage === 1}
        className="p-0 bg-transparent text-gray-800 hover:bg-gray-100 m-0"
      >
        <ChevronLeft />
      </Button>
      <span>
        Pagina {currentPage} van {totalPages}
      </span>
      <Button
        onClick={onNext}
        disabled={disabled || currentPage === totalPages}
        className="p-0 bg-transparent text-gray-800 hover:bg-gray-100 m-0"
      >
        <ChevronRight />
      </Button>
    </div>
  )
}

export default Pagination
