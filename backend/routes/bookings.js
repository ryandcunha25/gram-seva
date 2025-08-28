const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Booking = require("../models/Booking");

// Create booking (auth required)
router.post("/", auth, async (req, res) => {
  try {
    const { items, total } = req.body;
    if (!items || !items.length) return res.status(400).json({ message: "No items" });
    const booking = new Booking({ user: req.user._id, items, total });
    await booking.save();
    res.json({ booking });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get user's bookings
router.get("/", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
