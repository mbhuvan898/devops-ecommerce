const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error");

const app = express();

// =============================
// 🧾 Stripe raw body parser for webhook (MUST BE BEFORE express.json)
// =============================
app.use("/api/v1/stripe/webhook", express.raw({ type: "application/json" }));

// =============================
// 🔓 Enable CORS (critical for frontend access)
// =============================
app.use(
  cors({
    origin: "http://localhost:3000", // frontend React app
    credentials: true,
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

app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// =============================
// ⚠️ Error Middleware
// =============================
app.use(errorMiddleware);

module.exports = app;
