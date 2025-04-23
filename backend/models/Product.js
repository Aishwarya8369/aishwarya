// Since we're using a mock JSON database for simplicity,
// this file defines the product schema structure

/**
 * Product Schema
 * @typedef {Object} Product
 * @property {number} id - Unique identifier
 * @property {string} title - Product name
 * @property {string} description - Product description
 * @property {number} price - Product price in INR
 * @property {number} stock - Available stock
 * @property {number} discount - Discount percentage
 * @property {string} tshirtType - Type of t-shirt
 * @property {string} themeCategory - Comic theme category
 * @property {string[]} images - Array of image paths
 * @property {string} modelUrl - 3D model URL
 * @property {number} rating - Product rating
 * @property {boolean} isFeatured - Whether product is featured
 * @property {boolean} isNew - Whether product is new
 * @property {boolean} isTrending - Whether product is trending
 * @property {boolean} isBestseller - Whether product is bestseller
 * @property {string} color - Product color
 * @property {string} design - Product design
 * @property {string} createdAt - Creation date
 */

// This would typically be a MongoDB schema, but we're using a mock JSON database
const productData = require("../data/products.json")

module.exports = {
  // Get all products
  getAll: () => {
    return productData
  },

  // Get product by ID
  getById: (id) => {
    return productData.find((product) => product.id === Number.parseInt(id))
  },

  // Search products
  search: (query) => {
    const lowercaseQuery = query.toLowerCase()
    return productData.filter(
      (product) =>
        product.title.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.themeCategory.toLowerCase().includes(lowercaseQuery) ||
        product.tshirtType.toLowerCase().includes(lowercaseQuery),
    )
  },

  // Filter products by category
  filterByCategory: (category, type) => {
    if (type === "tshirtType") {
      return productData.filter((product) => product.tshirtType.toLowerCase() === category.toLowerCase())
    } else {
      return productData.filter(
        (product) => product.themeCategory.toLowerCase().replace(/\s+/g, "-") === category.toLowerCase(),
      )
    }
  },

  // Add new product
  create: (productData) => {
    // In a real app, this would add to database
    // For mock purposes, we'll just return the data
    return {
      id: Math.floor(Math.random() * 1000) + 100,
      ...productData,
      createdAt: new Date().toISOString(),
    }
  },
}
