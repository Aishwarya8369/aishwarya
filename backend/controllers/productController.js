const Product = require("../models/Product")

// Controller functions for handling product-related requests
const productController = {
  // Get all products
  getAllProducts: (req, res) => {
    try {
      const products = Product.getAll()
      res.json({
        success: true,
        count: products.length,
        data: products,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching products",
        error: error.message,
      })
    }
  },

  // Get single product by ID
  getProductById: (req, res) => {
    try {
      const product = Product.getById(req.params.id)

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        })
      }

      res.json({
        success: true,
        data: product,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching product",
        error: error.message,
      })
    }
  },

  // Search products
  searchProducts: (req, res) => {
    try {
      const query = req.query.q || ""

      if (query.trim() === "") {
        return res.json({
          success: true,
          count: 0,
          data: [],
        })
      }

      const products = Product.search(query)

      res.json({
        success: true,
        count: products.length,
        data: products,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error searching products",
        error: error.message,
      })
    }
  },

  // Filter products by category
  filterByCategory: (req, res) => {
    try {
      const { category, type } = req.params
      const products = Product.filterByCategory(category, type)

      res.json({
        success: true,
        count: products.length,
        data: products,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error filtering products",
        error: error.message,
      })
    }
  },

  // Create new product
  createProduct: (req, res) => {
    try {
      const newProduct = Product.create(req.body)

      res.status(201).json({
        success: true,
        data: newProduct,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error creating product",
        error: error.message,
      })
    }
  },
}

module.exports = productController
