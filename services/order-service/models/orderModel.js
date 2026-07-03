const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  // 🏠 Shipping Information
  shippingInfo: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true, default: "India" },
    pincode: { type: Number, required: true },
    phoneNo: { type: Number, required: true },
  },

  // 📦 Ordered Items
  orderItems: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, required: true },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],

  // 👤 Linked User
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  // 💳 Razorpay Payment Information
  paymentInfo: {
    id: { type: String, required: true }, // Razorpay payment ID
    status: { type: String, required: true }, // paid / failed / pending
  },

  // 🧾 Razorpay-specific fields
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  razorpaySignature: { type: String },

  // 🕒 Payment Timestamps
  paidAt: { type: Date },
  shippedAt: { type: Date },
  deliveredAt: { type: Date },

  // 💰 Pricing
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },

  // 🚚 Order Status
  orderStatus: {
    type: String,
    required: true,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
