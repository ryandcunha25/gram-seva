const express = require("express");
const router = express.Router();

// // Static list of 15 products
// const products = [
//   { id: "p1", name: "Rice (1kg)", price: 60, category: "Groceries", image: "https://via.placeholder.com/150" },
//   { id: "p2", name: "Wheat (1kg)", price: 45, category: "Groceries", image: "https://via.placeholder.com/150" },
//   { id: "p3", name: "Milk (1L)", price: 30, category: "Dairy", image: "https://via.placeholder.com/150" },
//   { id: "p4", name: "Cooking Oil (1L)", price: 140, category: "Groceries", image: "https://via.placeholder.com/150" },
//   { id: "p5", name: "Salt (1kg)", price: 25, category: "Groceries", image: "https://via.placeholder.com/150" },
//   { id: "p6", name: "Sugar (1kg)", price: 50, category: "Groceries", image: "https://via.placeholder.com/150" },
//   { id: "p7", name: "Eggs (12 pcs)", price: 70, category: "Dairy", image: "https://via.placeholder.com/150" },
//   { id: "p8", name: "Paneer (200g)", price: 90, category: "Dairy", image: "https://via.placeholder.com/150" },
//   { id: "p9", name: "Tomatoes (1kg)", price: 40, category: "Vegetables", image: "https://via.placeholder.com/150" },
//   { id: "p10", name: "Potatoes (1kg)", price: 35, category: "Vegetables", image: "https://via.placeholder.com/150" },
//   { id: "p11", name: "Onions (1kg)", price: 50, category: "Vegetables", image: "https://via.placeholder.com/150" },
//   { id: "p12", name: "Chicken (1kg)", price: 200, category: "Meat", image: "https://via.placeholder.com/150" },
//   { id: "p13", name: "Fish (1kg)", price: 250, category: "Seafood", image: "https://via.placeholder.com/150" },
//   { id: "p14", name: "Soap (1 pc)", price: 25, category: "Household", image: "https://via.placeholder.com/150" },
//   { id: "p15", name: "Toothpaste (100g)", price: 40, category: "Household", image: "https://via.placeholder.com/150" },
// ];

//  returning all products
router.get("/browse", (req, res) => {
  console.log("Fetching all products..."); // Debugging line
  res.json(products);
});

// fetching a single product 
router.get("/:id", (req, res) => {
  console.log(`Fetching product with ID: ${req.params.id}`); // Debugging line
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

module.exports = router;
