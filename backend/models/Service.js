const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String },   // Could be an emoji or URL for image
});

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
