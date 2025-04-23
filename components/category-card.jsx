"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export function CategoryCard({ title, description, image, count, link, variant = "image" }) {
  if (variant === "simple") {
    return (
      <Link href={link} className="block">
        <div className="bg-zinc-900/50 rounded-lg overflow-hidden h-full border border-zinc-800 hover:border-purple-500 transition-colors group">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{title}</h3>
            <p className="text-zinc-400 text-sm mb-4">{description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-purple-400">{count} products</span>
              <span className="text-sm text-zinc-400 group-hover:text-purple-400 transition-colors">
                View Collection →
              </span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={link} className="block">
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl font-bold mb-1 group-hover:text-purple-400 transition-colors">{title}</h3>
          <p className="text-zinc-300 text-sm mb-3">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-purple-400">{count} products</span>
            <motion.span
              className="text-sm text-white"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              View Collection →
            </motion.span>
          </div>
        </div>
      </div>
    </Link>
  )
}
