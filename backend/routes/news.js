const express = require("express");
const router = express.Router();

const news = [
  { id: "n1", title: "Local health camp scheduled this Saturday" },
  { id: "n2", title: "Government announces subsidy for small farmers" },
  { id: "n3", title: "New cold-storage facility coming to the block" }
];

router.get("/", (req, res) => res.json(news.slice(0,3)));
module.exports = router;
