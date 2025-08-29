const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");
require("dotenv").config();

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  console.log("Registering a new user..."); // Debugging line
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });
    if (await User.findOne({ email })) return res.status(400).json({ message: "Email already registered" });

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hash, phone });
    await user.save();

    console.log("User registered:", user); // Debugging line
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: user.toJSON() });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  console.log("Login attempt..."); // Debugging line
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing email or password" });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });
    console.log("User logged in:", user); // Debugging line

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: user.toJSON() });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET current user
router.get("/me", auth, (req, res) => {
  res.json({ user: req.user });
});

// Update profile
router.put("/update", auth, async (req, res) => {
  console.log("Updating user profile..."); // Debugging line
  try {
    const { name, phone } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { name, phone }, { new: true }).select("-password");
    console.log("User profile updated:", user); // Debugging line
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
