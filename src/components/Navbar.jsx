"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, Search, Heart, ShoppingBag, User } from "lucide-react"

/**
 * Navbar Component
 *
 * Displays the top navigation bar with links and icons
 */
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="border-b border-zinc-800 sticky top-0 z-50 bg-black/90 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium hover:text-purple-400 transition-colors">
            SHOP
          </Link>
          <Link to="/" className="text-sm font-medium hover:text-purple-400 transition-colors">
            T-SHIRT TYPES
          </Link>
          <Link to="/" className="text-sm font-medium hover:text-purple-400 transition-colors">
            UNIVERSES
          </Link>
          <Link to="/" className="text-sm font-medium hover:text-purple-400 transition-colors">
            NEW ARRIVALS
          </Link>
          <Link to="/MenShirtSale.jsx">
          <button className="text-sm font-medium hover:text-purple-400 transition-colors">  SALE
            </button>
           
          </Link>
        </div>

        <div className="flex-1 md:flex-none flex justify-center">
          <Link to="/" className="text-2xl font-bold tracking-wider relative">
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
            <Link to="/" className="text-sm font-medium hover:text-purple-400 transition-colors">
              SHOP
            </Link>
            <Link to="/" className="text-sm font-medium hover:text-purple-400 transition-colors">
              T-SHIRT TYPES
            </Link>
            <Link to="/" className="text-sm font-medium hover:text-purple-400 transition-colors">
              UNIVERSES
            </Link>
            <Link to="/" className="text-sm font-medium hover:text-purple-400 transition-colors">
              NEW ARRIVALS
            </Link>
            <Link to="/" className="text-sm font-medium hover:text-purple-400 transition-colors">
              SALE
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
