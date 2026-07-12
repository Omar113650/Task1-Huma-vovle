const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

let isConnected = false;

const connectDB = async () => {
  try {
    if (!isConnected) {
      await mongoose.connect(process.env.MONGO_URI);
      isConnected = true;
      console.log("MongoDB connected");
    }
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
};

app.use(async (req, res, next) => {
  if (!isConnected) {
    await connectDB();
  }
  next();
});

module.exports = connectDB;