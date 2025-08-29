const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Booking = require("../models/Booking");

// Create booking (auth required)
router.post("/create", auth, async (req, res) => {
  console.log("Creating a new booking..."); // Debugging line
  try {
    const userId = req.user._id; // get user from auth middleware
    const { items, totalAmount, totalItems, bookingDate } = req.body;

    // Validate required fields
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    if (!totalAmount || !totalItems) {
      return res.status(400).json({ message: "Total amount or total items missing" });
    }

    // Create new booking
    const newBooking = new Booking({
      userId,
      items,
      totalAmount,
      totalItems,
      bookingDate: bookingDate || new Date()
    });

    const savedBooking = await newBooking.save();
    console.log("Booking created:", savedBooking); // Debugging line

    res.status(201).json({ message: "Booking created successfully", booking: savedBooking });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ message: "Booking failed. Please try again." });
  }
});

// Get user's bookings
router.get("/userBookings", auth, async (req, res) => {
  console.log(`Fetching bookings for user: ${req.user._id}`); // Debugging line
  try {
    const bookings = await Booking.find({ userId: req.user._id }).sort({ createdAt: -1 });
    console.log(`Found ${bookings.length} bookings for user ${req.user._id}`); // Debugging line
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
