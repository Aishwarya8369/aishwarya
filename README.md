# Superhero T-Shirts Store

A full-stack e-commerce application for superhero-themed t-shirts built with React.js and Node.js/Express.

## Features

- Browse superhero t-shirts by category
- Search for products
- View product details
- 3D model viewer for products
- Responsive design for all devices

## Tech Stack

### Frontend
- React.js
- React Router
- Framer Motion for animations
- Tailwind CSS for styling
- React Three Fiber & Drei for 3D models

### Backend
- Node.js
- Express
- RESTful API

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
\`\`\`bash
git clone https://github.com/yourusername/superhero-tshirts.git
cd superhero-tshirts
\`\`\`

2. Install frontend dependencies
\`\`\`bash
cd frontend
npm install
\`\`\`

3. Install backend dependencies
\`\`\`bash
cd ../backend
npm install
\`\`\`

### Running the Application

1. Start the backend server
\`\`\`bash
cd backend
npm run dev
\`\`\`

2. Start the frontend development server
\`\`\`bash
cd frontend
npm start
\`\`\`

3. Open your browser and navigate to `http://localhost:3000`

## Project Structure

### Frontend
- `src/components`: React components
- `src/pages`: Page components
- `src/services`: API service functions
- `src/utils`: Utility functions
- `public/images`: Product images

### Backend
- `server.js`: Express server setup
- `routes`: API routes
- `controllers`: Route controllers
- `models`: Data models
- `data`: Mock data

## API Endpoints

- `GET /api/products`: Get all products
- `GET /api/products/:id`: Get a single product by ID
- `GET /api/products/search?q=query`: Search products
- `GET /api/products/category/:type/:category`: Filter products by category
- `POST /api/products`: Create a new product

## Learn More

This project demonstrates:
- How to structure a full-stack application
- How to implement RESTful APIs
- How to use React hooks and components
- How to integrate 3D models in a web application
- How to implement search and filter functionality
