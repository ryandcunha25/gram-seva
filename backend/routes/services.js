const express = require("express");
const router = express.Router();

const services = [
  { id: "s1", name: "Grocery Delivery", icon: "🛒" },
  { id: "s2", name: "Medical Support", icon: "💊" },
  { id: "s3", name: "Farming Tools", icon: "🌾" },
  { id: "s4", name: "Govt Schemes Help", icon: "📑" },
  { id: "s5", name: "Transport Support", icon: "🚚" }
];

router.get("/", (req, res) => res.json(services));
module.exports = router;
