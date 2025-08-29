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

// Routes
const userRoutes = require("./routes/user");
app.use("/user", userRoutes);

const productsRoutes = require("./routes/products");
app.use("/products", productsRoutes);

const servicesRoutes = require("./routes/services");
app.use("/services", servicesRoutes);

const contactRoutes = require("./routes/contact");
app.use("/contact", contactRoutes);

const bookingRoutes = require("./routes/bookings");
app.use("/bookings", bookingRoutes);

// const newsRoutes = require("./routes/news");
// app.use("/api/news", newsRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`\n🚀 Server running on port ${PORT}`));
