"use client"

import { motion } from "framer-motion"
import { CategoryCard } from "./category-card"

export function CategoryGrid({ categories, products }) {
  // Get counts for each category
  const getCategoryCount = (categoryName, type = "theme") => {
    if (type === "theme") {
      return products.filter((p) => p.themeCategory === categoryName).length
    } else {
      return products.filter((p) => p.tshirtType === categoryName).length
    }
  }

  // Featured theme categories with images
  const themeCategories = [
    {
      name: "Marvel Universe",
      description: "Iconic heroes and villains from the Marvel multiverse",
      image: "/images/marvel-category.png",
      id: "marvel-universe",
    },
    {
      name: "DC Comics",
      description: "Legendary justice and power from the DC universe",
      image: "/images/dc-category.png",
      id: "dc-comics",
    },
    {
      name: "Anime Superheroes",
      description: "Epic powers and stories from your favorite anime",
      image: "/images/anime-category.png",
      id: "anime-superheroes",
    },
    {
      name: "Classic Comics",
      description: "Timeless characters from the golden age of comics",
      image: "/placeholder.svg?height=300&width=400",
      id: "classic-comics",
    },
    {
      name: "Sci-Fi & Fantasy",
      description: "Out-of-this-world designs from your favorite universes",
      image: "/placeholder.svg?height=300&width=400",
      id: "sci-fi-fantasy",
    },
    {
      name: "Video Game Characters",
      description: "Level up your style with gaming-inspired designs",
      image: "/placeholder.svg?height=300&width=400",
      id: "video-game-characters",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Theme Categories with Images */}
      {themeCategories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <CategoryCard
            title={category.name}
            description={category.description}
            image={category.image}
            count={getCategoryCount(category.name, "theme")}
            link={`/category/${category.id}`}
          />
        </motion.div>
      ))}

      {/* T-Shirt Types with Simple Cards */}
      {categories.length > 0 &&
        categories
          .find((cat) => cat.id === "tshirt-types")
          ?.subcategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <CategoryCard
                title={category.name}
                description={`Explore our ${category.name.toLowerCase()} collection`}
                count={getCategoryCount(category.name, "type")}
                link={`/category/${category.id}`}
                variant="simple"
              />
            </motion.div>
          ))}
    </div>
  )
}
