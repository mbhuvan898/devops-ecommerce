// =============================
// 🌍 Load Environment Variables
// =============================
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

// =============================
// 📦 Import Dependencies
// =============================
const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");

// ❗ FIXED → Correct backend paths
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
// 🌐 Deployment Settings
// =============================
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/build");
  
  // Check if frontend build exists (for monolithic deployment)
  if (fs.existsSync(frontendPath)) {
    console.log("📦 Serving frontend from backend (monolithic mode)");
    
    // Serve static files
    app.use(express.static(frontendPath));
    
    // ✅ FIX: Only catch non-API routes
    app.get("*", (req, res, next) => {
      // Skip API routes - let them be handled by your API middleware
      if (req.path.startsWith("/api/")) {
        return next();
      }
      
      // Serve frontend for all other routes
      res.sendFile(path.resolve(frontendPath, "index.html"));
    });
  } else {
    // API-only mode (separate frontend container)
    console.log("📡 Running in API-only mode (separate frontend container)");
    app.get("/", (req, res) => {
      res.json({ 
        success: true, 
        message: "🚀 Best2Buy API Server",
        mode: "production - API only",
        endpoints: {
          products: "/api/v1/products",
          users: "/api/v1/users",
          orders: "/api/v1/orders"
        }
      });
    });
  }
} else {
  app.get("/", (req, res) => {
    res.json({
      success: true,
      message: "🚀 Server running successfully!",
      mode: "development"
    });
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