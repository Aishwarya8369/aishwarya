"use client"

import { X } from "lucide-react"

export function CategoryChip({ label, onRemove }) {
  return (
    <div className="inline-flex items-center gap-1 bg-zinc-800 px-3 py-1 rounded-full text-xs">
      <span>{label}</span>
      {onRemove && (
        <button onClick={onRemove} className="text-zinc-400 hover:text-white">
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  )
}
