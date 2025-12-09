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
// 🔓 Enable CORS for production frontend
// =============================
// Allow EC2 frontend: http://18.61.24.131
// Allow localhost for development
const allowedOrigins = [
  "http://18.61.24.131",
  "http://localhost:3000",
  "http://best2buy.excomeco.dpdns.org",
  "https://best2buy.excomeco.dpdns.org",  // <<< THIS WAS MISSING
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman / curl

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

// =============================
// ⚠️ Global Error Middleware
// =============================
app.use(errorMiddleware);

module.exports = app;
