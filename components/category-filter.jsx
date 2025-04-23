"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

export function CategoryFilter({ onCategoryChange, selectedCategory }) {
  const [expandedCategories, setExpandedCategories] = useState({
    "T-Shirt Types": true,
    "Comic-Based Themes": true,
  })

  const tShirtTypes = [
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

  const comicThemes = [
    "Marvel Universe",
    "DC Comics",
    "Anime Superheroes",
    "Classic Comics",
    "Sci-Fi & Fantasy",
    "Video Game Characters",
    "Custom Fan Art",
  ]

  const toggleCategory = (category) => {
    setExpandedCategories({
      ...expandedCategories,
      [category]: !expandedCategories[category],
    })
  }

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6">
      <h2 className="text-xl font-bold text-yellow-300 mb-4">Categories</h2>

      <div className="space-y-4">
        <button
          className={`w-full text-left py-2 px-3 rounded-lg transition-colors ${
            selectedCategory === "All" ? "bg-yellow-500 text-blue-900 font-bold" : "text-blue-200 hover:bg-blue-800/50"
          }`}
          onClick={() => onCategoryChange("All")}
        >
          All Products
        </button>

        {/* T-Shirt Types */}
        <div className="border-t border-blue-800 pt-4">
          <button
            className="flex items-center justify-between w-full text-left font-semibold text-yellow-200 mb-2"
            onClick={() => toggleCategory("T-Shirt Types")}
          >
            <span>T-Shirt Types</span>
            {expandedCategories["T-Shirt Types"] ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>

          {expandedCategories["T-Shirt Types"] && (
            <div className="ml-2 space-y-1">
              {tShirtTypes.map((type) => (
                <button
                  key={type}
                  className={`w-full text-left py-1.5 px-3 rounded-lg text-sm transition-colors ${
                    selectedCategory === `T-Shirt Types-${type}`
                      ? "bg-yellow-500 text-blue-900 font-bold"
                      : "text-blue-200 hover:bg-blue-800/50"
                  }`}
                  onClick={() => onCategoryChange(`T-Shirt Types-${type}`)}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Comic-Based Themes */}
        <div className="border-t border-blue-800 pt-4">
          <button
            className="flex items-center justify-between w-full text-left font-semibold text-yellow-200 mb-2"
            onClick={() => toggleCategory("Comic-Based Themes")}
          >
            <span>Comic-Based Themes</span>
            {expandedCategories["Comic-Based Themes"] ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>

          {expandedCategories["Comic-Based Themes"] && (
            <div className="ml-2 space-y-1">
              {comicThemes.map((theme) => (
                <button
                  key={theme}
                  className={`w-full text-left py-1.5 px-3 rounded-lg text-sm transition-colors ${
                    selectedCategory === theme
                      ? "bg-yellow-500 text-blue-900 font-bold"
                      : "text-blue-200 hover:bg-blue-800/50"
                  }`}
                  onClick={() => onCategoryChange(theme)}
                >
                  {theme}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
