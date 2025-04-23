"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import { TshirtModel } from "@/components/tshirt-model"
import { formatCurrency } from "@/lib/utils"

export function FeaturedProduct({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showModel, setShowModel] = useState(false)
  const [canvasError, setCanvasError] = useState(false)

  const toggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  const calculateDiscountedPrice = (price, discount) => {
    if (!discount) return price
    return price * (1 - discount / 100)
  }

  // Error handler for Canvas
  const handleCanvasError = (error) => {
    console.error("Canvas error:", error)
    setCanvasError(true)
  }

  const renderProductLabels = () => {
    const labels = []

    if (product.isNew) {
      labels.push(
        <div
          key="new"
          className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded z-10"
        >
          NEW
        </div>,
      )
    }

    if (product.isTrending) {
      labels.push(
        <div
          key="trending"
          className="absolute top-4 left-4 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded z-10"
          style={{ top: product.isNew ? "2.5rem" : "1rem" }}
        >
          TRENDING
        </div>,
      )
    }

    if (product.isBestseller) {
      labels.push(
        <div
          key="bestseller"
          className="absolute top-4 left-4 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded z-10"
          style={{
            top: product.isNew && product.isTrending ? "4rem" : product.isNew || product.isTrending ? "2.5rem" : "1rem",
          }}
        >
          BESTSELLER
        </div>,
      )
    }

    if (product.discount > 0) {
      labels.push(
        <div
          key="discount"
          className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded z-10"
        >
          {product.discount}% OFF
        </div>,
      )
    }

    return labels
  }

  return (
    <motion.div
      className="group relative overflow-hidden rounded-lg bg-gradient-to-b from-zinc-900 to-purple-900/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <div className="relative aspect-square mb-6">
          {showModel && !canvasError && typeof window !== "undefined" ? (
            <div className="h-full w-full">
              <Canvas
                onError={(e) => {
                  console.error("Canvas error:", e)
                  setCanvasError(true)
                }}
              >
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <TshirtModel
                  color={product.color || "#000000"}
                  design={product.design || "default"}
                  universe={product.themeCategory || "Marvel Universe"}
                />
                <OrbitControls enableZoom={false} />
                <Environment preset="city" />
              </Canvas>
            </div>
          ) : (
            <Image
              src={product.images?.[0] || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover rounded-lg"
            />
          )}

          {renderProductLabels()}

          <button
            onClick={toggleWishlist}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center z-10"
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? "fill-purple-400 text-purple-400" : "text-white"}`} />
          </button>

          <div className="absolute bottom-4 left-4 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
            FEATURED
          </div>

          <button
            onClick={() => setShowModel(!showModel)}
            className="absolute bottom-4 right-4 bg-black/70 text-white text-xs font-medium px-3 py-1.5 rounded-full"
          >
            {showModel ? "View Image" : "View 3D"}
          </button>
        </div>

        <div className="mb-2 flex items-center gap-2">
          <span className="text-xs bg-zinc-800 px-2 py-1 rounded">{product.tshirtType}</span>
          <span className="text-xs bg-zinc-800 px-2 py-1 rounded">{product.themeCategory}</span>
        </div>

        <Link href={`/product/${product.id}`}>
          <h3 className="text-xl font-bold mb-2 hover:text-purple-400 transition-colors">{product.title}</h3>
        </Link>

        <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{product.description}</p>

        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-zinc-600"}`}
            />
          ))}
          <span className="text-zinc-400 text-xs ml-2">({product.rating.toFixed(1)})</span>
        </div>

        <div className="flex justify-between items-center mb-4">
          {product.discount > 0 ? (
            <div className="flex items-center gap-2">
              <span className="text-zinc-500 line-through">{formatCurrency(product.price)}</span>
              <span className="text-purple-400 font-bold text-xl">
                {formatCurrency(calculateDiscountedPrice(product.price, product.discount))}
              </span>
            </div>
          ) : (
            <span className="font-bold text-xl">{formatCurrency(product.price)}</span>
          )}

          {product.stock <= 0 ? (
            <span className="text-red-500 text-sm font-medium">Out of Stock</span>
          ) : product.stock < 5 ? (
            <span className="text-yellow-500 text-sm font-medium">Only {product.stock} left!</span>
          ) : (
            <span className="text-green-500 text-sm font-medium">In Stock</span>
          )}
        </div>

        <div className="flex gap-2">
          <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-full flex items-center justify-center gap-2 transition-colors">
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
          <Link
            href={`/product/${product.id}`}
            className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-2 rounded-full flex items-center justify-center transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Comic-style decorative elements */}
      <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-purple-500/20 blur-xl"></div>
      <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-yellow-500/20 blur-xl"></div>
    </motion.div>
  )
}
