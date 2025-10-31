const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // for JSON body

// ✅ MongoDB Atlas connection
let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }
  
  try {
    await mongoose.connect("mongodb+srv://vigneshwaranmme_db_user:fI0Pz8kqYJbIH3N0@cluster0.2tak3b0.mongodb.net/?appName=Cluster0", { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
};

// ✅ Schema & Model
const locationSchema = new mongoose.Schema({
  userId: String,
  batchReceivedAt: { type: Date, default: Date.now },
  locations: [
    {
      lat: Number,
      lng: Number,
      timestamp: String,
      accuracy: Number,
    },
  ],
});

const LocationBatch = mongoose.model("LocationBatch", locationSchema);

// ✅ Endpoint to receive batch data
app.post("/api/locations/batch", async (req, res) => {
  try {
    await connectToDatabase();
    
    const { userId, locations } = req.body;

    if (!userId || !locations || !Array.isArray(locations)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    const batch = new LocationBatch({ userId, locations });
    await batch.save();

    res.json({ message: "Batch saved successfully", total: locations.length });
  } catch (error) {
    console.error("Error saving batch:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Health check route
app.get("/", (req, res) => res.send("🚀 Location Tracker API running"));
app.get("/api", (req, res) => res.send("🚀 Location Tracker API running"));

// Export the Express API for Vercel
module.exports = app;