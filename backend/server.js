// =============================
// 🌍 Load Environment Variables
// =============================
require("dotenv").config();

// =============================
// 📦 Import Dependencies
// =============================
const mongoose = require("mongoose");
const app = require("./app");
const connectDatabase = require("./config/database");

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
// 🚀 Start Server (API-only)
// =============================
const server = app.listen(PORT, () => {
  console.log(`✅ API Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || "development"}`);
});

// =============================
// ⚠️ Handle Unhandled Rejections
// =============================
process.on("unhandledRejection", (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  console.log("💥 Shutting down the server...");
  server.close(() => process.exit(1));
});
