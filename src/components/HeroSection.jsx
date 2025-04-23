"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

/**
 * HeroSection Component
 *
 * Displays a hero section with parallax scrolling effect
 */
function HeroSection() {
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 1.1])
  const y = useTransform(scrollY, [0, 300], [0, 100])

  return (
    <section ref={heroRef} className="relative h-[70vh] md:h-[90vh] overflow-hidden">
      {/* Starry Night Background */}
      <div className="absolute inset-0 bg-[#0f172a] starry-swirl">
        {/* Stars */}
        {[...Array(100)].map((_, i) => (
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
  )
}

export default HeroSection
