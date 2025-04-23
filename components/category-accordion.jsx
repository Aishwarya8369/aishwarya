"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import Link from "next/link"

export function CategoryAccordion({ categories }) {
  const [expandedCategories, setExpandedCategories] = useState({
    "T-Shirt Types": true,
    "Comic-Based Themes": true,
  })

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6">
      <h2 className="text-xl font-bold text-yellow-300 mb-6">Categories</h2>

      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.id} className="border-t border-blue-800 pt-4">
            <button
              className="flex items-center justify-between w-full text-left font-semibold text-yellow-200 mb-2"
              onClick={() => toggleCategory(category.name)}
              aria-expanded={expandedCategories[category.name]}
            >
              <span>{category.name}</span>
              {expandedCategories[category.name] ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </button>

            {expandedCategories[category.name] && (
              <div className="ml-2 space-y-1 transition-all duration-300 ease-in-out">
                {category.subcategories.map((subcat) => (
                  <Link
                    key={subcat.id}
                    href={`/category/${subcat.id}`}
                    className="w-full text-left py-1.5 px-3 rounded-lg text-sm transition-colors block text-blue-200 hover:bg-blue-800/50"
                  >
                    {subcat.name}
                    {subcat.count && <span className="ml-2 text-xs text-blue-400">({subcat.count})</span>}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
