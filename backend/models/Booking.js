const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      category: { type: String }
    }
  ],
  totalAmount: { type: Number, required: true },
  totalItems: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now },
  status: { type: String, default: "Pending" } 
}, { timestamps: true }); 

module.exports = mongoose.model("Booking", bookingSchema);
