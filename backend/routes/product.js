const express = require("express");
const router = express.Router();

const products = [
  { id: "p1", name: "Rice (1kg)", price: 60 },
  { id: "p2", name: "Wheat (1kg)", price: 45 },
  { id: "p3", name: "Milk (1L)", price: 30 },
  { id: "p4", name: "Cooking Oil (1L)", price: 140 },
  { id: "p5", name: "Salt (1kg)", price: 25 },
  { id: "p6", name: "Sugar (1kg)", price: 50 }
];

router.get("/", (req, res) => res.json(products));
router.get("/:id", (req, res) => {
  const p = products.find(x => x.id === req.params.id);
  if (!p) return res.status(404).json({ message: "Not found" });
  res.json(p);
});

module.exports = router;
