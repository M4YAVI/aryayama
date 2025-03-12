"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface YearMonthPickerProps {
  value: Date
  onChange: (date: Date) => void
}

export function YearMonthPicker({ value, onChange }: YearMonthPickerProps) {
  const [date, setDate] = useState<Date | undefined>(value)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "MMMM yyyy") : <span>Pick a month</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            setDate(newDate)
            if (newDate) {
              onChange(newDate)
            }
          }}
          initialFocus
          captionLayout="dropdown-buttons"
          fromYear={2017}
          toYear={2025}
          showOutsideDays={false}
        />
      </PopoverContent>
    </Popover>
  )
}

