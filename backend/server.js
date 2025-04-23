const express = require("express")
const cors = require("cors")
const productsRoutes = require("./routes/products")

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/products", productsRoutes)

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Superhero T-Shirts API" })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
