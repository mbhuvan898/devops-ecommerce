const express = require("express");
const {
  processPayment,
  sendRazorpayKey,
} = require("../controllers/paymentController");

const router = express.Router();

// 💳 Create Razorpay Order (no auth required for now)
router.post("/payment/process", processPayment);

// 🔑 Get Razorpay Public Key
router.get("/razorpaykey", sendRazorpayKey);

module.exports = router;
