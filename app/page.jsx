"use client"

import { useState, useEffect, useRef } from "react"
import { Heart, Search, ShoppingBag, User, Menu, Filter, Grid, List } from "lucide-react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ProductCard } from "@/components/product-card"
import { FilterSidebar } from "@/components/filter-sidebar"
import { SearchBar } from "@/components/search-bar"
import { getProducts, searchProducts } from "@/lib/api"
import { FeaturedProduct } from "@/components/featured-product"
import { CategoryChip } from "@/components/category-chip"
import { CategoryAccordion } from "@/components/category-accordion"
import { CategoryGrid } from "@/components/category-grid"

export default function Home() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState([])
  const [filters, setFilters] = useState({
    tshirtTypes: [],
    themes: [],
    priceRange: [0, 10000],
    inStock: false,
    sortBy: "newest",
  })

  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 1.1])
  const y = useTransform(scrollY, [0, 300], [0, 100])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await getProducts()
        setProducts(data)
        setFilteredProducts(data)
        setFeaturedProducts(data.filter((product) => product.isFeatured).slice(0, 3))

        // Extract unique categories
        const tshirtTypes = [...new Set(data.map((product) => product.tshirtType))]
        const themes = [...new Set(data.map((product) => product.themeCategory))]

        setCategories([
          {
            id: "tshirt-types",
            name: "T-Shirt Types",
            subcategories: tshirtTypes.map((type) => ({
              id: type.toLowerCase().replace(/\s+/g, "-"),
              name: type,
              count: data.filter((p) => p.tshirtType === type).length,
            })),
          },
          {
            id: "themes",
            name: "Comic-Based Themes",
            subcategories: themes.map((theme) => ({
              id: theme.toLowerCase().replace(/\s+/g, "-"),
              name: theme,
              count: data.filter((p) => p.themeCategory === theme).length,
            })),
          },
        ])

        setLoading(false)
      } catch (error) {
        console.error("Error fetching products:", error)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const applyFilters = () => {
      let result = [...products]
      let activeFiltersList = []

      // Filter by T-shirt types
      if (filters.tshirtTypes.length > 0) {
        result = result.filter((product) => filters.tshirtTypes.includes(product.tshirtType))
        activeFiltersList = [...activeFiltersList, ...filters.tshirtTypes]
      }

      // Filter by themes
      if (filters.themes.length > 0) {
        result = result.filter((product) => filters.themes.includes(product.themeCategory))
        activeFiltersList = [...activeFiltersList, ...filters.themes]
      }

      // Filter by price range
      result = result.filter((product) => {
        const finalPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price
        return finalPrice >= filters.priceRange[0] && finalPrice <= filters.priceRange[1]
      })

      if (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000) {
        activeFiltersList.push(`₹${filters.priceRange[0]} - ₹${filters.priceRange[1]}`)
      }

      // Filter by stock
      if (filters.inStock) {
        result = result.filter((product) => product.stock > 0)
        activeFiltersList.push("In Stock Only")
      }

      // Sort products
      switch (filters.sortBy) {
        case "priceAsc":
          result.sort((a, b) => {
            const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price
            const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price
            return priceA - priceB
          })
          break
        case "priceDesc":
          result.sort((a, b) => {
            const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price
            const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price
            return priceB - priceA
          })
          break
        case "popularity":
          result.sort((a, b) => b.rating - a.rating)
          break
        case "newest":
          // Assuming products have a createdAt field
          result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          break
        default:
          break
      }

      setActiveFilters(activeFiltersList)
      setFilteredProducts(result)
    }

    applyFilters()
  }, [filters, products])

  const handleSearch = async (query) => {
    setSearchQuery(query)

    if (query.trim() === "") {
      setFilteredProducts(products)
      return
    }

    try {
      const results = await searchProducts(query)
      setFilteredProducts(results)
    } catch (error) {
      console.error("Error searching products:", error)
    }
  }

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  const toggleFilterSidebar = () => {
    setFilterOpen(!filterOpen)
  }

  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid")
  }

  const removeFilter = (filter) => {
    // Check if it's a price range filter
    if (filter.includes("₹")) {
      handleFilterChange({ priceRange: [0, 10000] })
      return
    }

    // Check if it's the "In Stock Only" filter
    if (filter === "In Stock Only") {
      handleFilterChange({ inStock: false })
      return
    }

    // Check if it's a t-shirt type
    const tshirtTypeIndex = filters.tshirtTypes.findIndex((type) => type === filter)
    if (tshirtTypeIndex !== -1) {
      const newTshirtTypes = [...filters.tshirtTypes]
      newTshirtTypes.splice(tshirtTypeIndex, 1)
      handleFilterChange({ tshirtTypes: newTshirtTypes })
      return
    }

    // Check if it's a theme
    const themeIndex = filters.themes.findIndex((theme) => theme === filter)
    if (themeIndex !== -1) {
      const newThemes = [...filters.themes]
      newThemes.splice(themeIndex, 1)
      handleFilterChange({ themes: newThemes })
      return
    }
  }

  const clearAllFilters = () => {
    setFilters({
      tshirtTypes: [],
      themes: [],
      priceRange: [0, 10000],
      inStock: false,
      sortBy: "newest",
    })
    setSearchQuery("")
    handleSearch("")
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-zinc-800 sticky top-0 z-50 bg-black/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium hover:text-purple-400 transition-colors">
              SHOP
            </Link>
            <Link href="/category" className="text-sm font-medium hover:text-purple-400 transition-colors">
              T-SHIRT TYPES
            </Link>
            <Link href="/collection" className="text-sm font-medium hover:text-purple-400 transition-colors">
              UNIVERSES
            </Link>
            <Link href="/track" className="text-sm font-medium hover:text-purple-400 transition-colors">
              NEW ARRIVALS
            </Link>
            <Link href="/account" className="text-sm font-medium hover:text-purple-400 transition-colors">
              SALE
            </Link>
          </div>

          <div className="flex-1 md:flex-none flex justify-center">
            <Link href="/" className="text-2xl font-bold tracking-wider relative">
              <span className="text-purple-400">POWER</span>
              <span className="text-yellow-400">STITCH</span>
              <span className="absolute -top-2 -right-6 text-xs bg-purple-500 text-white px-1 py-0.5 rounded transform rotate-12">
                HERO
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="hover:text-purple-400 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="hover:text-purple-400 transition-colors relative">
              <Heart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-purple-400 text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </button>
            <button className="hover:text-purple-400 transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-purple-400 text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </button>
            <button className="hover:text-purple-400 transition-colors hidden md:block">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-zinc-900 py-4">
            <div className="container mx-auto px-4 flex flex-col space-y-4">
              <Link href="/" className="text-sm font-medium hover:text-purple-400 transition-colors">
                SHOP
              </Link>
              <Link href="/category" className="text-sm font-medium hover:text-purple-400 transition-colors">
                T-SHIRT TYPES
              </Link>
              <Link href="/collection" className="text-sm font-medium hover:text-purple-400 transition-colors">
                UNIVERSES
              </Link>
              <Link href="/track" className="text-sm font-medium hover:text-purple-400 transition-colors">
                NEW ARRIVALS
              </Link>
              <Link href="/account" className="text-sm font-medium hover:text-purple-400 transition-colors">
                SALE
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Starry Night Background */}
      <section ref={heroRef} className="relative h-[70vh] md:h-[90vh] overflow-hidden">
        {/* Starry Night Background */}
        <div className="absolute inset-0 bg-[#0f172a] starry-swirl">
          {/* Stars */}
          {typeof window !== "undefined" &&
            [...Array(100)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white animate-twinkle"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 5 + 3}s`,
                }}
              ></div>
            ))}

          {/* Nebula Effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl"></div>
          <div className="absolute top-2/3 left-1/2 w-64 h-64 rounded-full bg-yellow-500/10 blur-3xl"></div>
        </div>

        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-900/70 via-blue-900/70 to-indigo-900/70 z-10"
          style={{ opacity }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20">
          <motion.div
            className="max-w-4xl px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
              <span className="block">UNLEASH YOUR</span>
              <span className="block text-yellow-400">INNER HERO</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Discover our premium collection of superhero-inspired t-shirts. From Marvel to DC, anime to video games –
              find your perfect power fit.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg mr-4">
                EXPLORE THE HEROVERSE
              </button>
              <button className="bg-transparent border-2 border-white hover:border-purple-400 text-white hover:text-purple-400 px-8 py-3 rounded-full font-bold transition-all">
                VIEW COLLECTIONS
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Comic-style elements */}
        <div className="absolute bottom-10 left-10 z-20 hidden md:block">
          <div className="speech-bubble">
            <p className="text-sm">New arrivals every week!</p>
          </div>
        </div>

        <div className="absolute top-20 right-10 z-20 hidden md:block">
          <div className="speech-bubble bg-yellow-500">
            <p className="text-sm">20% OFF on first order!</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-black to-purple-900/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-center mb-4">FEATURED HEROES</h2>
              <p className="text-center text-zinc-400 mb-12 max-w-2xl mx-auto">
                Our most powerful designs, handpicked for true superhero fans. Limited editions that sell out fast!
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <FeaturedProduct product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className="py-16 bg-gradient-to-b from-purple-900/20 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-4">SHOP BY CATEGORY</h2>
            <p className="text-center text-zinc-400 mb-12 max-w-2xl mx-auto">
              Browse our extensive collection of superhero t-shirts by category or universe
            </p>
          </motion.div>

          <CategoryGrid categories={categories} products={products} />

          <div className="mt-8 text-center">
            <Link
              href="/categories"
              className="inline-block bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-full transition-colors"
            >
              View All Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Product Catalog */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-4">EXPLORE OUR COLLECTION</h2>
            <p className="text-center text-zinc-400 mb-12 max-w-2xl mx-auto">
              Discover our wide range of superhero t-shirts and find your perfect match
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            {/* Filter Sidebar - Desktop */}
            <div className="hidden md:block w-64 sticky top-24">
              <CategoryAccordion categories={categories} />
              <div className="mt-6">
                <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
              </div>
            </div>

            {/* Mobile Filter Button */}
            <div className="md:hidden w-full flex justify-between items-center mb-6">
              <button
                onClick={toggleFilterSidebar}
                className="flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-lg"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>

              <button onClick={toggleViewMode} className="flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-lg">
                {viewMode === "grid" ? (
                  <>
                    <List className="w-4 h-4" />
                    <span>List</span>
                  </>
                ) : (
                  <>
                    <Grid className="w-4 h-4" />
                    <span>Grid</span>
                  </>
                )}
              </button>
            </div>

            {/* Mobile Filter Sidebar */}
            {filterOpen && (
              <div className="fixed inset-0 bg-black/80 z-50 md:hidden">
                <div className="h-full w-4/5 max-w-xs bg-zinc-900 p-4 overflow-y-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Filters</h3>
                    <button onClick={toggleFilterSidebar} className="text-zinc-400 hover:text-white">
                      &times;
                    </button>
                  </div>
                  <CategoryAccordion categories={categories} />
                  <div className="mt-6">
                    <FilterSidebar
                      filters={filters}
                      onFilterChange={handleFilterChange}
                      onClose={toggleFilterSidebar}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Product Grid */}
            <div className="flex-1">
              <div className="mb-8">
                <SearchBar onSearch={handleSearch} initialValue={searchQuery} />
              </div>

              {/* View Mode & Sort - Desktop */}
              <div className="hidden md:flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-zinc-400">View:</span>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${viewMode === "grid" ? "bg-purple-600" : "bg-zinc-800"}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${viewMode === "list" ? "bg-purple-600" : "bg-zinc-800"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-zinc-400">Sort by:</span>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange({ sortBy: e.target.value })}
                    className="bg-zinc-800 border-none rounded p-2 text-sm"
                  >
                    <option value="newest">Newest</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                    <option value="popularity">Popularity</option>
                  </select>
                </div>
              </div>

              {/* Active Filters */}
              {activeFilters.length > 0 && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-zinc-400">Active Filters:</span>
                    {activeFilters.map((filter, index) => (
                      <CategoryChip key={index} label={filter} onRemove={() => removeFilter(filter)} />
                    ))}
                    <button onClick={clearAllFilters} className="text-xs text-purple-400 hover:text-purple-300 ml-2">
                      Clear All
                    </button>
                  </div>
                </div>
              )}

              {/* Results Count */}
              <div className="mb-6">
                <p className="text-zinc-400">
                  Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-zinc-900/50 rounded-lg overflow-hidden animate-pulse">
                      <div className="aspect-square bg-zinc-800"></div>
                      <div className="p-4 space-y-3">
                        <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
                        <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
                        <div className="h-4 bg-zinc-800 rounded w-1/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-16 bg-zinc-900/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">No products found</h3>
                  <p className="text-zinc-400 mb-6">Try adjusting your filters or search query</p>
                  <button
                    onClick={clearAllFilters}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div
                  className={
                    viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"
                  }
                >
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <ProductCard key={product.id} product={product} viewMode={viewMode} />
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {filteredProducts.length > 0 && (
                <div className="mt-12 flex justify-center">
                  <div className="flex space-x-2">
                    <button className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                      &lt;
                    </button>
                    <button className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">1</button>
                    <button className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">2</button>
                    <button className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">3</button>
                    <button className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                      &gt;
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-b from-purple-900/20 to-black relative overflow-hidden">
        {/* Comic-style background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-yellow-500/20 blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-purple-500/20 blur-xl"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-blue-500/20 blur-xl"></div>
        </div>

        <div className="container mx-auto px-4 max-w-xl text-center relative z-10">
          <motion.div
            className="bg-zinc-900/80 backdrop-blur-sm p-8 rounded-lg border border-purple-500/30 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">JOIN THE HERO LEAGUE</h2>
            <p className="text-zinc-400 mb-8">
              Subscribe to our newsletter and be the first to know about new collections, exclusive offers, and limited
              edition superhero designs.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-black border border-zinc-700 px-4 py-3 rounded-full focus:outline-none focus:border-purple-400"
              />
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors sm:whitespace-nowrap"
              >
                POWER UP
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
