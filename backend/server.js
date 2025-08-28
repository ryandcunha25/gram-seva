const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected\n"))
    .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Gram Seva API running...");
});

const authRoutes = require("./routes/auth");
const productsRoutes = require("./routes/products");
const servicesRoutes = require("./routes/services");
const newsRoutes = require("./routes/news");
const contactRoutes = require("./routes/contact");
const bookingRoutes = require("./routes/bookings");


app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`\n🚀 Server running on port ${PORT}`));
