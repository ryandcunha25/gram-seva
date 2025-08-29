const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  console.log("Fetching all products..."); // Debugging line
  const products = await Product.find({});
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
