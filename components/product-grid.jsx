"use client"

import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { TshirtModel } from "./tshirt-model"

export function ProductGrid({ products, onProductSelect }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl text-yellow-300 font-semibold">No products found</h3>
        <p className="text-blue-200 mt-2">Try adjusting your search or filter criteria</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <motion.div
          key={product.id}
          className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105"
          whileHover={{ y: -5 }}
          onClick={() => onProductSelect(product)}
        >
          <div className="h-[200px] relative">
            <Canvas>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <TshirtModel
                color={product.color}
                design={product.design}
                universe={product.universe}
                scale={0.8}
                position={[0, -0.5, 0]}
                rotation={[0, 0.5, 0]}
              />
              <Environment preset="city" />
            </Canvas>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-bold text-yellow-300 mb-1">{product.name}</h3>
            <p className="text-blue-200 text-sm mb-2 line-clamp-2">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-white font-bold">${product.price.toFixed(2)}</span>
              <span className="bg-blue-800 text-xs text-blue-200 px-2 py-1 rounded-full">{product.universe}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
