"use client"

import { useState, useEffect } from "react"
import { PriceRangeFilter } from "@/components/price-range-filter"

export function FilterSidebar({ filters, onFilterChange, onClose }) {
  const [localFilters, setLocalFilters] = useState(filters)

  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  const handleTshirtTypeToggle = (type) => {
    const updatedTypes = localFilters.tshirtTypes.includes(type)
      ? localFilters.tshirtTypes.filter((t) => t !== type)
      : [...localFilters.tshirtTypes, type]

    const newFilters = { ...localFilters, tshirtTypes: updatedTypes }
    setLocalFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleThemeToggle = (theme) => {
    const updatedThemes = localFilters.themes.includes(theme)
      ? localFilters.themes.filter((t) => t !== theme)
      : [...localFilters.themes, theme]

    const newFilters = { ...localFilters, themes: updatedThemes }
    setLocalFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handlePriceChange = (value) => {
    const newFilters = { ...localFilters, priceRange: value }
    setLocalFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleInStockToggle = () => {
    const newFilters = { ...localFilters, inStock: !localFilters.inStock }
    setLocalFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleClearFilters = () => {
    const newFilters = {
      tshirtTypes: [],
      themes: [],
      priceRange: [0, 10000],
      inStock: false,
      sortBy: "newest",
    }
    setLocalFilters(newFilters)
    onFilterChange(newFilters)

    if (onClose) {
      onClose()
    }
  }

  const tshirtTypes = [
    "Oversized",
    "Acid Wash",
    "Graphic Printed",
    "Solid Color",
    "Polo T-Shirts",
    "Sleeveless",
    "Long Sleeve",
    "Henley",
    "Hooded",
    "Crop Tops",
  ]

  const themes = [
    "Marvel Universe",
    "DC Comics",
    "Anime Superheroes",
    "Classic Comics",
    "Sci-Fi & Fantasy",
    "Video Game Characters",
    "Custom Fan Art",
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Filters</h3>
        <button onClick={handleClearFilters} className="text-sm text-purple-400 hover:text-purple-300">
          Clear All
        </button>
      </div>

      {/* Price Range */}
      <PriceRangeFilter value={localFilters.priceRange} onChange={handlePriceChange} />

      {/* Availability */}
      <div className="space-y-4">
        <h4 className="font-medium">Availability</h4>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={localFilters.inStock}
            onChange={handleInStockToggle}
            className="w-4 h-4 accent-purple-600"
          />
          <span>In Stock Only</span>
        </label>
      </div>

      {/* T-Shirt Types */}
      <div className="space-y-4">
        <h4 className="font-medium">T-Shirt Types</h4>
        <div className="space-y-2">
          {tshirtTypes.map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={localFilters.tshirtTypes.includes(type)}
                onChange={() => handleTshirtTypeToggle(type)}
                className="w-4 h-4 accent-purple-600"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Themes */}
      <div className="space-y-4">
        <h4 className="font-medium">Themes</h4>
        <div className="space-y-2">
          {themes.map((theme) => (
            <label key={theme} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={localFilters.themes.includes(theme)}
                onChange={() => handleThemeToggle(theme)}
                className="w-4 h-4 accent-purple-600"
              />
              <span>{theme}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Apply Button - Mobile Only */}
      {onClose && (
        <button
          onClick={onClose}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          Apply Filters
        </button>
      )}
    </div>
  )
}
