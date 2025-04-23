"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Star, StarHalf, Eye } from "lucide-react"
import { motion } from "framer-motion"
import { formatCurrency } from "@/lib/utils"

export function ProductCard({ product, viewMode = "grid" }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [showQuickView, setShowQuickView] = useState(false)

  const toggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const calculateDiscountedPrice = (price, discount) => {
    if (!discount) return price
    return price * (1 - discount / 100)
  }

  const renderRatingStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="w-4 h-4 fill-yellow-400 text-yellow-400" />)
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="w-4 h-4 text-zinc-600" />)
    }

    return stars
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

  if (viewMode === "list") {
    return (
      <motion.div
        className="group relative bg-zinc-900/50 rounded-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row">
          <div className="relative md:w-1/3 aspect-square md:aspect-auto">
            <Link href={`/product/${product.id}`}>
              {!imageError ? (
                <Image
                  src={product.images?.[0] || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={handleImageError}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                  <div className="text-center p-4">
                    <p className="text-purple-400 font-bold">{product.title}</p>
                    <p className="text-sm text-zinc-400">{product.themeCategory}</p>
                  </div>
                </div>
              )}
            </Link>

            {renderProductLabels()}

            <button
              onClick={toggleWishlist}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center z-10"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? "fill-purple-400 text-purple-400" : "text-white"}`} />
            </button>
          </div>

          <div className="p-6 flex-1 flex flex-col">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xs bg-zinc-800 px-2 py-1 rounded">{product.tshirtType}</span>
              <span className="text-xs bg-zinc-800 px-2 py-1 rounded">{product.themeCategory}</span>
            </div>

            <Link href={`/product/${product.id}`} className="block">
              <h3 className="font-bold text-xl mb-2">{product.title}</h3>
            </Link>

            <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{product.description}</p>

            <div className="flex items-center gap-1 mb-4">
              {renderRatingStars(product.rating)}
              <span className="text-zinc-400 text-xs ml-2">({product.rating.toFixed(1)})</span>
            </div>

            <div className="mt-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                {product.discount > 0 ? (
                  <>
                    <span className="text-zinc-500 line-through">{formatCurrency(product.price)}</span>
                    <span className="text-purple-400 font-bold text-xl">
                      {formatCurrency(calculateDiscountedPrice(product.price, product.discount))}
                    </span>
                  </>
                ) : (
                  <span className="font-bold text-xl">{formatCurrency(product.price)}</span>
                )}
              </div>

              <div className="flex gap-2">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
                <Link
                  href={`/product/${product.id}`}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-full transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>

            {product.stock <= 0 && <div className="mt-2 text-red-500 text-sm font-medium">Out of Stock</div>}
            {product.stock > 0 && product.stock < 5 && (
              <div className="mt-2 text-yellow-500 text-sm font-medium">Only {product.stock} left!</div>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative aspect-square overflow-hidden bg-zinc-900/50 rounded-lg">
        <Link href={`/product/${product.id}`}>
          {!imageError ? (
            <Image
              src={product.images?.[0] || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-800">
              <div className="text-center p-4">
                <p className="text-purple-400 font-bold">{product.title}</p>
                <p className="text-sm text-zinc-400">{product.themeCategory}</p>
              </div>
            </div>
          )}
        </Link>

        {renderProductLabels()}

        <button
          onClick={toggleWishlist}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center z-10"
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? "fill-purple-400 text-purple-400" : "text-white"}`} />
        </button>

        <div
          className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          onMouseEnter={() => setShowQuickView(true)}
          onMouseLeave={() => setShowQuickView(false)}
        >
          <div className="flex flex-col gap-3">
            <Link
              href={`/product/${product.id}`}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition-colors text-sm font-medium flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Quick View
            </Link>
            <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-full transition-colors text-sm font-medium flex items-center justify-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-xs bg-zinc-800 px-2 py-1 rounded">{product.tshirtType}</span>
          <span className="text-xs bg-zinc-800 px-2 py-1 rounded">{product.themeCategory}</span>
        </div>

        <Link href={`/product/${product.id}`} className="block">
          <h3 className="font-medium text-lg mb-1 group-hover:text-purple-400 transition-colors">{product.title}</h3>
        </Link>

        <div className="flex items-center gap-1 mb-2">
          {renderRatingStars(product.rating)}
          <span className="text-zinc-400 text-xs ml-2">({product.rating.toFixed(1)})</span>
        </div>

        <div className="flex justify-between items-center">
          {product.discount > 0 ? (
            <div className="flex items-center gap-2">
              <span className="text-zinc-500 line-through">{formatCurrency(product.price)}</span>
              <span className="text-purple-400 font-bold">
                {formatCurrency(calculateDiscountedPrice(product.price, product.discount))}
              </span>
            </div>
          ) : (
            <span className="font-bold">{formatCurrency(product.price)}</span>
          )}

          {product.stock <= 0 ? (
            <span className="text-red-500 text-xs font-medium">Out of Stock</span>
          ) : product.stock < 5 ? (
            <span className="text-yellow-500 text-xs font-medium">Only {product.stock} left!</span>
          ) : (
            <span className="text-green-500 text-xs font-medium">In Stock</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
