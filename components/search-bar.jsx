"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"

export function SearchBar({ onSearch, initialValue = "" }) {
  const [query, setQuery] = useState(initialValue)
  const [debouncedQuery, setDebouncedQuery] = useState(initialValue)

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 500)

    return () => clearTimeout(timer)
  }, [query])

  // Trigger search when debounced query changes
  useEffect(() => {
    if (debouncedQuery !== initialValue) {
      onSearch(debouncedQuery)
    }
  }, [debouncedQuery, onSearch, initialValue])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for superhero t-shirts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-700 rounded-full py-3 pl-12 pr-4 text-white placeholder-zinc-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400" />
      </div>
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white font-medium py-1.5 px-4 rounded-full hover:bg-purple-700 transition-colors"
      >
        Search
      </button>
    </form>
  )
}
