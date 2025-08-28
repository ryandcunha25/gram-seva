const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/submit", async (req, res) => {
  console.log("Received contact form submission:", req.body); // Debugging line
  try {
    const { name, email, phone,  message } = req.body;
    const entry = new Contact({ name, email, phone, message });
    await entry.save();
    res.json({ message: "Saved" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
