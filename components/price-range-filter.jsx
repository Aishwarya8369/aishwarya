"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { formatCurrency } from "@/lib/utils"

export function PriceRangeFilter({ value, onChange }) {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleChange = (newValue) => {
    setLocalValue(newValue)
  }

  const handleChangeEnd = (newValue) => {
    onChange(newValue)
  }

  return (
    <div className="space-y-4">
      <h4 className="font-medium">Price Range</h4>
      <div className="px-2">
        <Slider
          defaultValue={localValue}
          value={localValue}
          max={10000}
          step={100}
          onValueChange={handleChange}
          onValueCommit={handleChangeEnd}
          className="my-6"
        />
        <div className="flex justify-between">
          <span>{formatCurrency(localValue[0])}</span>
          <span>{formatCurrency(localValue[1])}</span>
        </div>
      </div>
    </div>
  )
}
