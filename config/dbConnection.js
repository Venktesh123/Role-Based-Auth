const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

const mongoURI = process.env.MONGO_URL; // Use the corrected key from .env

const connectDB = async () => {
  try {
    if (!mongoURI) {
      throw new Error("MONGO_URL is not defined in the environment variables");
    }

    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
