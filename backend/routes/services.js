const express = require("express");
const router = express.Router();
const Service = require("../models/Service");

// fetching all services
router.get("/", async (req, res) => {
  try {
    console.log("Fetching all services..."); // Debugging line
    const services = await Service.find({});
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
