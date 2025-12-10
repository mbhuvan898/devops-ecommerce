const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error");

const app = express();

// =============================
// 🧾 Stripe raw body parser (must be before JSON parser)
// =============================
app.use("/api/v1/stripe/webhook", express.raw({ type: "application/json" }));

// =============================
// 🔓 CORS CONFIG (IMPORTANT)
// =============================

const mainFrontend = process.env.FRONTEND_URL || "http://localhost:3000";

const allowedOrigins = [
  mainFrontend,
  "http://localhost:3000",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allows Postman/curl/server-side

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// =============================
// 📦 Body parsers & cookies
// =============================
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// =============================
// 📁 Static uploads folder
// =============================
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// =============================
// 🚦 Import Routes
// =============================
const user = require("./routes/userRoute");
const product = require("./routes/productRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

// API Routes
app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// Health check route for ALB
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Health check route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Best2Buy API Server",
    env: process.env.NODE_ENV || "development",
  });
});

// =============================
// ⚠️ Global Error Middleware
// =============================
app.use(errorMiddleware);

module.exports = app;
