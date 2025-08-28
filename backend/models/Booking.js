const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      qty: { type: Number, default: 1 }
    }
  ],
  total: { type: Number, required: true },
  status: { type: String, default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
