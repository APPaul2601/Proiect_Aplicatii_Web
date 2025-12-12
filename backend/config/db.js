// ============================================
// DATABASE CONNECTION - MongoDB Setup
// ============================================
// Connects backend to MongoDB database
// Called when server starts (in server.js)
// Uses MONGO_URI from .env file

const mongoose = require("mongoose"); // MongoDB connection library

// ===== CONNECT TO MONGODB =====
const connectDB = async () => {
  try {
    // STEP 1: Connect to MongoDB using URI from .env
    // Example: mongodb://localhost:27017/game
    await mongoose.connect(process.env.MONGO_URI);

    // STEP 2: If successful, print message
    console.log("MongoDB conectat!"); // Database connected
  } catch (err) {
    // STEP 3: If connection fails, print error and stop
    console.error(err.message); // Print error message
    process.exit(1); // Stop the server
  }
};

// Export function to be called in server.js
module.exports = connectDB;
