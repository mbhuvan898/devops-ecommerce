// File: controllers/orderController.js

const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const sendEmail = require('../utils/sendEmail');

// ========================================================
// 1️⃣ Create New Order (COD + Online)
// ========================================================
exports.newOrder = asyncErrorHandler(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, totalPrice } = req.body;

    if (!shippingInfo || !orderItems || !paymentInfo || !totalPrice) {
        return next(new ErrorHandler("Missing required order details", 400));
    }

    const isCOD = paymentInfo.id === "COD";

    // Avoid duplicate orders only for online payments
    if (!isCOD) {
        const existingOrder = await Order.findOne({ "paymentInfo.id": paymentInfo.id });
        if (existingOrder) {
            return next(new ErrorHandler("Order already placed", 400));
        }
    }

    // Create order
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        totalPrice,
        paidAt: isCOD ? null : Date.now(),
        orderStatus: isCOD ? "Pending" : "Processing",
        user: req.user._id,
    });

    // Send email (optional)
    try {
        await sendEmail({
            email: req.user.email,
            templateId: process.env.SENDGRID_ORDER_TEMPLATEID,
            data: {
                name: req.user.name,
                shippingInfo,
                orderItems,
                totalPrice,
                oid: order._id,
                paymentMode: isCOD ? "Cash on Delivery" : "Online Payment",
            },
        });
    } catch (err) {
        console.error("Email sending failed:", err.message);
    }

    res.status(201).json({
        success: true,
        message: isCOD
            ? "COD order placed successfully!"
            : "Online payment order created successfully!",
        order,
    });
});

// ========================================================
// 2️⃣ Get Single Order Details
// ========================================================
exports.getSingleOrderDetails = asyncErrorHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new ErrorHandler("Order not found", 404));
    }

    res.status(200).json({
        success: true,
        order,
    });
});

// ========================================================
// 3️⃣ Get Logged In User Orders
// ========================================================
exports.myOrders = asyncErrorHandler(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });

    // Return empty array instead of 404 error
    res.status(200).json({
        success: true,
        orders: orders || [],
    });
});

// ========================================================
// 4️⃣ Get All Orders (Admin)
// ========================================================
exports.getAllOrders = asyncErrorHandler(async (req, res, next) => {
    const orders = await Order.find();

    if (!orders || orders.length === 0) {
        return next(new ErrorHandler("No orders found", 404));
    }

    let totalAmount = 0;
    orders.forEach((order) => (totalAmount += order.totalPrice));

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
});

// ========================================================
// 5️⃣ Update Order Status (Admin)
// ========================================================
exports.updateOrder = asyncErrorHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("This order is already delivered", 400));
    }

    // Handle stock reduction when shipping
    if (req.body.status === "Shipped") {
        order.shippedAt = Date.now();
        for (const item of order.orderItems) {
            await updateStock(item.product, item.quantity);
        }
    }

    order.orderStatus = req.body.status;

    // When delivered, mark COD as paid
    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
        if (order.paymentInfo.id === "COD") {
            order.paymentInfo.status = "Paid";
            order.paidAt = Date.now();
        }
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: `Order marked as ${order.orderStatus}`,
    });
});

async function updateStock(productId, quantity) {
    const product = await Product.findById(productId);
    if (product) {
        product.stock -= quantity;
        await product.save({ validateBeforeSave: false });
    }
}

// ========================================================
// 6️⃣ Delete Order (Admin)
// ========================================================
exports.deleteOrder = asyncErrorHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found", 404));
    }

    await order.remove();

    res.status(200).json({
        success: true,
        message: "Order deleted successfully",
    });
});
