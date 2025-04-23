"use client"
import { motion } from "framer-motion"
import FeaturedProductCard from "./FeaturedProductCard"

/**
 * FeaturedProducts Component
 *
 * Displays a section of featured products
 *
 * @param {Object} props - Component props
 * @param {Array} props.products - Array of featured product objects
 */
function FeaturedProducts({ products }) {
  if (!products || products.length === 0) {
    return null
  }

  return (
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
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <FeaturedProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
