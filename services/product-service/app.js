const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error");

const app = express();

const allowedOrigins = [
    process.env.FRONTEND_URL || "http://localhost:3000",
    "http://localhost:3000",
    "http://localhost:5173",
];

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Larger limit: product creation uploads base64/image payloads
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

const product = require("./routes/productRoute");
const internal = require("./routes/internalRoute");

app.use("/api/v1", product);
app.use(internal); // /internal/* — service-to-service only, not exposed by gateway

// Health check for Docker/Kubernetes probes
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", service: "product-service" });
});

app.get("/", (req, res) => {
    res.json({ success: true, message: "📦 product-service" });
});

app.use(errorMiddleware);

module.exports = app;
