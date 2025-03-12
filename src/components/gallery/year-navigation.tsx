"use client"

import { cn } from "@/lib/utils"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

interface YearNavigationProps {
  currentYear?: number
}

export function YearNavigation({ currentYear }: YearNavigationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // Get the current year
  const today = new Date()
  const currentCalendarYear = today.getFullYear()
  
  // Generate years array from 2024 up to current year
  const years = Array.from(
    { length: currentCalendarYear - 2024 + 1 },
    (_, i) => 2024 + i
  )

  const handleYearClick = (year: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("year", year.toString())
    if (params.has("month")) {
      params.delete("month")
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex justify-center space-x-1 mb-8 overflow-x-auto py-2">
      {years.map((year) => (
        <Button
          key={year}
          variant={currentYear === year ? "default" : "outline"}
          className={cn(
            "min-w-[60px]",
            currentYear === year
              ? "bg-white text-black hover:bg-gray-200 hover:text-black"
              : "text-gray-400 hover:text-white",
          )}
          onClick={() => handleYearClick(year)}
        >
          {year}
        </Button>
      ))}
    </div>
  )
}