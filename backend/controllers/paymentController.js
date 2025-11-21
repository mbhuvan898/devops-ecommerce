// =====================================================
// 🧩 Dependencies
// =====================================================
const Razorpay = require("razorpay");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");

// =====================================================
// 💳 Initialize Razorpay Instance
// =====================================================
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET, // must match .env variable name
});

// =====================================================
// 1️⃣ Create Razorpay Order (Card / UPI / Wallet supported)
// =====================================================
exports.processPayment = asyncErrorHandler(async (req, res, next) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return next(new ErrorHandler("Amount is required", 400));
    }

   

    // Create Razorpay order
    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency: "INR",
      receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`,
      payment_capture: 1, // Auto capture payments
    };

    const order = await razorpayInstance.orders.create(options);

    console.log("✅ Razorpay Order Created:", order);

    res.status(200).json({
      success: true,
      order,
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("❌ Razorpay Payment Error (Raw):", error);

    res.status(500).json({
      success: false,
      message: "Razorpay payment creation failed",
      details: error.error || error.message || error,
    });
  }
});

// =====================================================
// 2️⃣ Send Razorpay Public Key (for frontend)
// =====================================================
exports.sendRazorpayKey = asyncErrorHandler(async (req, res, next) => {
  try {
    res.status(200).json({
      razorpayKey: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("❌ Razorpay Key Send Error:", error);
    return next(new ErrorHandler("Unable to send Razorpay API key", 500));
  }
});

// =====================================================
// 3️⃣ (Optional) Verify Payment Signature (for security)
// =====================================================
const crypto = require("crypto");

exports.verifyPayment = asyncErrorHandler(async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return next(new ErrorHandler("Missing payment verification parameters", 400));
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      res.status(200).json({ success: true, message: "Payment verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("❌ Razorpay Verification Error:", error);
    return next(new ErrorHandler("Unable to verify payment", 500));
  }
});
