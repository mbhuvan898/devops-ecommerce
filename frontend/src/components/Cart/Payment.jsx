// ===============================================
// 💳 Modern Razorpay + COD Payment Page (Final Version)
// ===============================================
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";

import { clearErrors, newOrder } from "../../actions/orderAction";
import { emptyCart } from "../../actions/cartAction";

import Stepper from "./Stepper";
import PriceSidebar from "./PriceSidebar";
import MetaData from "../Layouts/MetaData";

import { motion } from "framer-motion";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = { shippingInfo, orderItems: cartItems, totalPrice };

  // 🧾 Handle Errors
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
  }, [dispatch, error, enqueueSnackbar]);

  // ⚙️ Load Razorpay Checkout Script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      console.log("✅ Razorpay script loaded successfully");
      setRazorpayLoaded(true);
    };
    script.onerror = () => {
      enqueueSnackbar("Failed to load Razorpay. Check your connection.", { variant: "error" });
    };
    document.body.appendChild(script);
  }, [enqueueSnackbar]);

  // 💵 Cash on Delivery
  const handleCOD = () => {
    order.paymentInfo = { id: "COD", status: "Pending", method: "COD" };
    dispatch(newOrder(order));
    dispatch(emptyCart());
    enqueueSnackbar("Order placed with Cash on Delivery!", { variant: "success" });
    navigate("/order/success?status=success&method=cod");
  };

  // 💳 Razorpay Payment Flow
  const handleRazorpayPayment = async () => {
    try {
      if (!razorpayLoaded) {
        enqueueSnackbar("Razorpay is still loading... please wait.", { variant: "warning" });
        return;
      }

      // 1️⃣ Create Razorpay Order via Backend
      const { data } = await axios.post(
  `${process.env.REACT_APP_API_URL}/api/v1/payment/process`,
  {
    amount: Math.round(totalPrice),
    email: user.email,
    orderId: "OID_" + Date.now(),
    name: user.name,
    address: shippingInfo.address,
    city: shippingInfo.city,
    state: shippingInfo.state,
    pincode: shippingInfo.pincode,
  }
);


      if (!data.success) throw new Error("Razorpay order creation failed");

      // 2️⃣ Razorpay Checkout Options
      const options = {
        key: data.key_id,
        amount: data.order.amount,
        currency: "INR",
        name: "Best2Buy",
        description: "Order Payment",
        image: "https://cdn.razorpay.com/static/assets/logo/payment.svg",
        order_id: data.order.id,
        handler: async function (response) {
          try {
            order.paymentInfo = {
              id: response.razorpay_payment_id,
              status: "succeeded",
              method: "razorpay",
            };
            await dispatch(newOrder(order));
            await dispatch(emptyCart());
            enqueueSnackbar("Payment successful!", { variant: "success" });

            setTimeout(() => {
              navigate("/order/success?status=success&method=razorpay");
            }, 700);
          } catch (err) {
            enqueueSnackbar("Error saving order!", { variant: "error" });
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: shippingInfo.phoneNo || "9999999999",
        },
        notes: { address: shippingInfo.address },
        theme: { color: "#2563EB" },
        modal: {
          ondismiss: function () {
            enqueueSnackbar("Payment cancelled!", { variant: "warning" });
            navigate("/order/success?status=failed&method=razorpay");
          },
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (err) {
      console.error("❌ Razorpay Init Error:", err.response?.data || err.message);
      enqueueSnackbar("Payment initialization failed!", { variant: "error" });
    }
  };

  return (
    <>
      <MetaData title="Best2Buy | Secure Payment" />
      <main className="w-full mt-20 min-h-screen bg-gray-50 pb-10">
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-11/12 m-auto">
          {/* Payment Section */}
          <div className="flex-1">
            <Stepper activeStep={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl shadow-xl p-8 mt-3"
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
                  💳 Choose Payment Method
                </h2>

                <RadioGroup
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="space-y-6"
                >
                  {/* Razorpay Option */}
                  <FormControlLabel
                    value="razorpay"
                    control={<Radio sx={{ color: "#2563EB" }} />}
                    label={
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className={`flex items-center justify-between px-4 py-4 rounded-lg border-2 transition ${
                          paymentMethod === "razorpay"
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src="https://cdn.razorpay.com/static/assets/logo/payment.svg"
                            alt="Razorpay"
                            className="h-8 object-contain"
                          />
                          <div>
                            <h4 className="font-semibold text-gray-800">Pay with Razorpay</h4>
                            <p className="text-sm text-gray-500">
                              Credit / Debit / UPI / Wallets — Secure
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">Secure 🔒</span>
                      </motion.div>
                    }
                  />

                  {/* Cash on Delivery */}
                  <FormControlLabel
                    value="cod"
                    control={<Radio sx={{ color: "#16A34A" }} />}
                    label={
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className={`flex items-center justify-between px-4 py-4 rounded-lg border-2 transition ${
                          paymentMethod === "cod"
                            ? "border-green-600 bg-green-50"
                            : "border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/639/639365.png"
                            alt="COD"
                            className="h-8 w-8 object-contain"
                          />
                          <div>
                            <h4 className="font-semibold text-gray-800">Cash on Delivery</h4>
                            <p className="text-sm text-gray-500">
                              Pay when you receive the order
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">No Card Needed 💵</span>
                      </motion.div>
                    }
                  />
                </RadioGroup>

                {/* Button */}
                <div className="mt-8">
                  {paymentMethod === "cod" ? (
                    <button
                      onClick={handleCOD}
                      className="bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-xl shadow-md font-semibold uppercase transition-all duration-300"
                    >
                      Place COD Order
                    </button>
                  ) : (
                    <button
                      onClick={handleRazorpayPayment}
                      disabled={!razorpayLoaded}
                      className={`${
                        razorpayLoaded
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-gray-400 cursor-not-allowed"
                      } text-white w-full py-3 rounded-xl shadow-md font-semibold uppercase transition-all duration-300`}
                    >
                      {razorpayLoaded
                        ? `Pay ₹${totalPrice.toLocaleString()}`
                        : "Loading Razorpay..."}
                    </button>
                  )}
                </div>
              </motion.div>
            </Stepper>
          </div>

          {/* Sidebar */}
          <div className="sm:w-1/3">
            <PriceSidebar cartItems={cartItems} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Payment;
