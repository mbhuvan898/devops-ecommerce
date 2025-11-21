const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  resultInfo: {
    resultStatus: {
      type: String,
      required: false, // changed
      default: "UNKNOWN",
    },
    resultCode: {
      type: String,
      required: false, // changed
      default: "0",
    },
    resultMsg: {
      type: String,
      required: false, // changed
      default: "No message provided",
    },
  },
  txnId: { type: String, required: false },
  bankTxnId: { type: String, required: false },
  orderId: { type: String, required: true }, // this one is always sent
  txnAmount: { type: String, required: false },
  txnType: { type: String, required: false },
  gatewayName: { type: String, required: false },
  bankName: { type: String, required: false },
  mid: { type: String, required: false },
  paymentMode: { type: String, required: false },
  refundAmt: { type: String, required: false, default: "0.00" },
  txnDate: { type: String, required: false, default: new Date().toISOString() },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", paymentSchema);
