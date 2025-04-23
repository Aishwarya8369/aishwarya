"use client"

import { useState, useEffect, Suspense } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import { Heart, ChevronLeft, ChevronRight, ShoppingCart, Star, StarHalf, Share2 } from "lucide-react"
import { TshirtModel } from "@/components/tshirt-model"
import { getProductById, getRelatedProducts } from "@/lib/api"
import { ProductCard } from "@/components/product-card"
import { formatCurrency } from "@/lib/utils"

// Create a fallback component for 3D content
function ModelFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#333333" />
    </mesh>
  )
}

export default function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState("M")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [canvasError, setCanvasError] = useState(false)
  const [showModel, setShowModel] = useState(false)
  const [activeTab, setActiveTab] = useState("description")

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const data = await getProductById(params.id)
        setProduct(data)

        // Fetch related products
        const related = await getRelatedProducts(data.id, data.themeCategory)
        setRelatedProducts(related)
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  const handleSizeSelect = (size) => {
    setSelectedSize(size)
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  const nextImage = () => {
    if (product?.images?.length) {
      setActiveImageIndex((prev) => (prev + 1) % product.images.length)
    }
  }

  const prevImage = () => {
    if (product?.images?.length) {
      setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
    }
  }

  // Error handler for Canvas
  const handleCanvasError = (error) => {
    console.error("Canvas error:", error)
    setCanvasError(true)
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
      stars.push(<Star key={`star-${i}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="w-5 h-5 fill-yellow-400 text-yellow-400" />)
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="w-5 h-5 text-zinc-600" />)
    }

    return stars
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-zinc-900 rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-zinc-400 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <a
            href="/"
            className="inline-block bg-purple-600 text-white px-6 py-3 font-medium hover:bg-purple-700 transition-colors rounded-full"
          >
            Back to Home
          </a>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white pt-8 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <nav className="flex items-center text-sm text-zinc-400">
            <a href="/" className="hover:text-purple-400 transition-colors">
              Home
            </a>
            <span className="mx-2">/</span>
            <a href="/shop" className="hover:text-purple-400 transition-colors">
              Shop
            </a>
            <span className="mx-2">/</span>
            <a href={`/category/${product.themeCategory}`} className="hover:text-purple-400 transition-colors">
              {product.themeCategory}
            </a>
            <span className="mx-2">/</span>
            <span className="text-purple-400">{product.title}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            <div className="relative aspect-square bg-zinc-900 overflow-hidden rounded-lg">
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
                    <Suspense fallback={<ModelFallback />}>
                      <TshirtModel
                        color={product.color || "#000000"}
                        design={product.design || "default"}
                        universe={product.themeCategory}
                      />
                    </Suspense>
                    <OrbitControls enableZoom={false} />
                    <Environment preset="city" />
                  </Canvas>
                </div>
              ) : (
                <>
                  <Image
                    src={product.images?.[activeImageIndex] || "/placeholder.svg"}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              <button
                onClick={() => setShowModel(!showModel)}
                className="absolute bottom-4 right-4 bg-black/70 text-white text-sm font-medium px-4 py-2 rounded-full"
              >
                {showModel ? "View Images" : "View 3D Model"}
              </button>

              {product.discount > 0 && (
                <div className="absolute top-4 left-4 bg-purple-600 text-white text-sm font-bold px-3 py-1 rounded">
                  {product.discount}% OFF
                </div>
              )}
            </div>

            {product.images && product.images.length > 0 && (
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveImageIndex(index)
                      setShowModel(false)
                    }}
                    className={`relative w-24 h-24 flex-shrink-0 rounded-md ${
                      activeImageIndex === index && !showModel ? "ring-2 ring-purple-500" : "opacity-70"
                    }`}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${product.title} view ${index + 1}`}
                      fill
                      className="object-cover rounded-md"
                    />
                  </button>
                ))}
                <button
                  onClick={() => setShowModel(true)}
                  className={`relative w-24 h-24 flex-shrink-0 bg-zinc-800 rounded-md flex items-center justify-center ${
                    showModel ? "ring-2 ring-purple-500" : "opacity-70"
                  }`}
                >
                  <span className="text-xs font-medium">3D View</span>
                </button>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">{product.title}</h1>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleWishlist}
                    className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? "fill-purple-400 text-purple-400" : "text-white"}`} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {renderRatingStars(product.rating)}
                  <span className="text-zinc-400 text-sm ml-2">({product.rating.toFixed(1)})</span>
                </div>

                {product.isFeatured && (
                  <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded">FEATURED</span>
                )}
              </div>

              <div className="mt-4">
                {product.discount > 0 ? (
                  <div className="flex items-center gap-3">
                    <span className="text-zinc-500 line-through text-lg">{formatCurrency(product.price)}</span>
                    <span className="text-purple-400 text-3xl font-bold">
                      {formatCurrency(calculateDiscountedPrice(product.price, product.discount))}
                    </span>
                    <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded">SAVE {product.discount}%</span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold">{formatCurrency(product.price)}</span>
                )}
              </div>

              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm bg-zinc-800 px-2 py-1 rounded">{product.tshirtType}</span>
                <span className="text-sm bg-zinc-800 px-2 py-1 rounded">{product.themeCategory}</span>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-zinc-300">{product.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-900 p-4 rounded-lg">
                  <span className="text-zinc-500 text-sm">Universe</span>
                  <p className="font-medium">{product.themeCategory}</p>
                </div>
                <div className="bg-zinc-900 p-4 rounded-lg">
                  <span className="text-zinc-500 text-sm">T-Shirt Type</span>
                  <p className="font-medium">{product.tshirtType}</p>
                </div>
                <div className="bg-zinc-900 p-4 rounded-lg">
                  <span className="text-zinc-500 text-sm">Availability</span>
                  <p className={`font-medium ${product.stock > 0 ? "text-green-500" : "text-red-500"}`}>
                    {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
                  </p>
                </div>
                <div className="bg-zinc-900 p-4 rounded-lg">
                  <span className="text-zinc-500 text-sm">SKU</span>
                  <p className="font-medium">PS-{product.id.toString().padStart(6, "0")}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Size</h3>
                <div className="flex flex-wrap gap-3">
                  {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeSelect(size)}
                      className={`w-12 h-12 flex items-center justify-center border ${
                        selectedSize === size
                          ? "border-purple-500 text-purple-500"
                          : "border-zinc-700 text-zinc-400 hover:border-zinc-500"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Quantity</h3>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="w-10 h-10 flex items-center justify-center border border-zinc-700 text-zinc-400 hover:border-zinc-500"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <div className="w-16 h-10 flex items-center justify-center border-t border-b border-zinc-700">
                    {quantity}
                  </div>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center border border-zinc-700 text-zinc-400 hover:border-zinc-500"
                    disabled={quantity >= 10 || quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-4">
              <button
                className={`w-full py-4 font-bold rounded-full flex items-center justify-center gap-2 ${
                  product.stock > 0
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "bg-zinc-700 text-zinc-300 cursor-not-allowed"
                } transition-colors`}
                disabled={product.stock <= 0}
              >
                <ShoppingCart className="w-5 h-5" />
                {product.stock > 0 ? "ADD TO CART" : "OUT OF STOCK"}
              </button>

              <button className="w-full bg-transparent border border-purple-500 text-purple-500 py-4 font-bold rounded-full hover:bg-purple-500/10 transition-colors">
                BUY NOW
              </button>
            </div>

            {/* Product Tabs */}
            <div className="pt-8 border-t border-zinc-800">
              <div className="flex border-b border-zinc-800">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`px-4 py-2 font-medium ${
                    activeTab === "description"
                      ? "text-purple-500 border-b-2 border-purple-500"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("details")}
                  className={`px-4 py-2 font-medium ${
                    activeTab === "details"
                      ? "text-purple-500 border-b-2 border-purple-500"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`px-4 py-2 font-medium ${
                    activeTab === "reviews"
                      ? "text-purple-500 border-b-2 border-purple-500"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Reviews
                </button>
              </div>

              <div className="py-6">
                {activeTab === "description" && (
                  <div>
                    <p className="text-zinc-300 mb-4">{product.description}</p>
                    <p className="text-zinc-300">
                      Unleash your inner hero with our premium {product.tshirtType.toLowerCase()} t-shirt featuring
                      iconic
                      {product.themeCategory} designs. Made with high-quality materials for comfort and durability, this
                      t-shirt is perfect for casual wear or showing off your fandom.
                    </p>
                  </div>
                )}

                {activeTab === "details" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Product Details</h3>
                    <ul className="space-y-2 text-zinc-300">
                      <li>• {product.tshirtType} fit</li>
                      <li>• 100% premium cotton</li>
                      <li>• Machine washable (cold)</li>
                      <li>• Officially licensed {product.themeCategory} merchandise</li>
                      <li>• Vibrant, long-lasting print</li>
                      <li>• Available in sizes XS to XXL</li>
                    </ul>

                    <h3 className="text-lg font-medium mt-6">Care Instructions</h3>
                    <ul className="space-y-2 text-zinc-300">
                      <li>• Machine wash cold with like colors</li>
                      <li>• Do not bleach</li>
                      <li>• Tumble dry low</li>
                      <li>• Iron on low heat if needed</li>
                      <li>• Do not dry clean</li>
                    </ul>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">Customer Reviews</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center">{renderRatingStars(product.rating)}</div>
                          <span className="text-zinc-400">Based on 24 reviews</span>
                        </div>
                      </div>
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-700 transition-colors">
                        Write a Review
                      </button>
                    </div>

                    {/* Sample reviews */}
                    <div className="space-y-6">
                      <div className="border-b border-zinc-800 pb-6">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">Amazing quality!</h4>
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <span className="text-zinc-400 text-sm">2 days ago</span>
                        </div>
                        <p className="text-zinc-300 text-sm mt-2">
                          The quality of this t-shirt is amazing! The design is vibrant and hasn't faded after washing.
                          Fits perfectly and the material is super comfortable. Highly recommend!
                        </p>
                        <div className="mt-2 text-sm text-zinc-400">
                          <span className="font-medium">John D.</span> - Verified Buyer
                        </div>
                      </div>

                      <div className="border-b border-zinc-800 pb-6">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">Great design, runs small</h4>
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(4)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                              {[...Array(1)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-zinc-600" />
                              ))}
                            </div>
                          </div>
                          <span className="text-zinc-400 text-sm">1 week ago</span>
                        </div>
                        <p className="text-zinc-300 text-sm mt-2">
                          Love the design and the quality is good, but it runs a bit small. I would recommend sizing up
                          if you're between sizes.
                        </p>
                        <div className="mt-2 text-sm text-zinc-400">
                          <span className="font-medium">Sarah M.</span> - Verified Buyer
                        </div>
                      </div>
                    </div>

                    <button className="w-full border border-zinc-700 py-2 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors">
                      Load More Reviews
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-16 border-t border-zinc-800">
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
