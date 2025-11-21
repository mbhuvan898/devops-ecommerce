// =============================
// 🌍 Load Environment Variables (from root .env)
// =============================
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

// =============================
// 📦 Import Dependencies
// =============================
const express = require("express");
const mongoose = require("mongoose");
const app = require("./backend/app");
const connectDatabase = require("./backend/config/database");

// =============================
// ⚙️ Basic Configurations
// =============================
mongoose.set("strictQuery", true);
const PORT = process.env.PORT || 4000;

// =============================
// 🚨 Handle Uncaught Exceptions
// =============================
process.on("uncaughtException", (err) => {
  console.error(`❌ Uncaught Exception: ${err.message}`);
  process.exit(1);
});

// =============================
// 🧩 Connect MongoDB
// =============================
connectDatabase();

// =============================
// 🌐 Deployment Settings
// =============================
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("🚀 Server running successfully!");
  });
}

// =============================
// 🚀 Start Server
// =============================
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔑 Razorpay Key: ${process.env.RAZORPAY_KEY_ID ? "Loaded" : "❌ Missing!"}`);
});

// =============================
// ⚠️ Handle Unhandled Rejections
// =============================
process.on("unhandledRejection", (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  console.log("💥 Shutting down the server...");
  server.close(() => process.exit(1));
});
