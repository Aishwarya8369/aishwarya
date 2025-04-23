const express = require("express")
const router = express.Router()
const productController = require("../controllers/productController")

// GET all products
router.get("/", productController.getAllProducts)

// GET product by ID
router.get("/:id", productController.getProductById)

// GET search products
router.get("/search", productController.searchProducts)

// GET filter products by category
router.get("/category/:type/:category", productController.filterByCategory)

// POST create new product
router.post("/", productController.createProduct)

module.exports = router
