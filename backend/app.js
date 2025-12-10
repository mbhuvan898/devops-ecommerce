const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error");

const app = express();

// =============================
// 🧾 Stripe raw body parser
// =============================
app.use("/api/v1/stripe/webhook", express.raw({ type: "application/json" }));

// =============================
// 🔓 FIXED CORS CONFIG
// =============================

// Your frontend URL from EC2
const mainFrontend = process.env.FRONTEND_URL || "http://18.61.35.239";

// Allowed origins list
const allowedOrigins = [
    mainFrontend,
    "http://18.61.35.239",
    "http://18.61.35.239:80",
    "http://localhost:3000",
    "http://localhost:5173",
];

// ⭐ IMPORTANT: THIS IS THE CORRECT WAY
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// =============================
// 📦 Parsers & cookies
// =============================
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// =============================
// 📁 Static uploads
// =============================
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// =============================
// 🚦 Routes
// =============================
const user = require("./routes/userRoute");
const product = require("./routes/productRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// =============================
// ❤️ Health Check
// =============================
app.get("/api/v1/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

// Root
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "🚀 Best2Buy API Server",
        env: process.env.NODE_ENV || "development",
    });
});

// =============================
// ⚠️ Error Middleware
// =============================
app.use(errorMiddleware);

module.exports = app;
