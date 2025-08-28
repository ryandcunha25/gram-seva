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

const PORT = 5000;
app.listen(PORT, () => console.log(`\n🚀 Server running on port ${PORT}`));
