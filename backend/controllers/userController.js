const User = require('../models/userModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const sendToken = require('../utils/sendToken');
const ErrorHandler = require('../utils/errorHandler');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

// Register User
exports.registerUser = asyncErrorHandler(async (req, res, next) => {

    const { name, email, gender, password } = req.body;

    const user = await User.create({
        name,
        email,
        gender,
        password,
    });

    sendToken(user, 201, res);
});

// Login User
exports.loginUser = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return next(new ErrorHandler("Please Enter Email And Password", 400));
    }

    const user = await User.findOne({ email}).select("+password");

    if(!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    sendToken(user, 201, res);
});

// Logout User
exports.logoutUser = asyncErrorHandler(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

// Get User Details
// Get User Details (with orders, wishlist, reviews)
exports.getUserDetails = asyncErrorHandler(async (req, res, next) => {
  // Fetch user basic data
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Fetch related data
  const Order = require("../models/orderModel");
  const Product = require("../models/productModel");

  // Count user orders
  const orders = await Order.find({ user: req.user.id });

  // If you have a wishlist model or stored inside User
  // example if you save in user.wishlist: [productId, ...]
  let wishlistItems = [];
  if (user.wishlist && user.wishlist.length > 0) {
    wishlistItems = await Product.find({ _id: { $in: user.wishlist } });
  }

  res.status(200).json({
    success: true,
    user: {
      ...user.toObject(),
      ordersCount: orders.length,
      wishlistCount: wishlistItems.length,
    },
  });
});


// Forgot Password - UPDATED VERSION
exports.forgotPassword = asyncErrorHandler(async (req, res, next) => {
    
    console.log('📧 Forgot password request for:', req.body.email); // Debug log
    
    const user = await User.findOne({email: req.body.email});

    if(!user) {
        return next(new ErrorHandler("User Not Found", 404));
    }

    // Generate reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // Create reset URL for frontend
    // Use environment variable for frontend URL, fallback to localhost
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const resetPasswordUrl = `${frontendUrl}/password/reset/${resetToken}`;

    console.log('🔗 Reset URL generated:', resetPasswordUrl); // Debug log

    try {
        // Send email using SendGrid template
        await sendEmail({
            email: user.email,
            templateId: process.env.SENDGRID_RESET_TEMPLATEID,
            data: {
                reset_url: resetPasswordUrl,
                user_name: user.name,
                user_email: user.email
            }
        });

        console.log('✅ Password reset email sent successfully'); // Debug log

        res.status(200).json({
            success: true,
            message: `Password reset email sent to ${user.email} successfully`,
        });

    } catch (error) {
        // If email fails, clear the reset token
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        
        console.error('❌ Email sending failed:', error); // Debug log
        return next(new ErrorHandler('Email could not be sent. Please try again later.', 500));
    }
});

// Reset Password
exports.resetPassword = asyncErrorHandler(async (req, res, next) => {

    // Create hash token from URL token
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({ 
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if(!user) {
        return next(new ErrorHandler("Reset password token is invalid or has expired", 400));
    }

    // Check if passwords match
    if(req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Passwords do not match", 400));
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    
    // Log user in automatically after password reset
    sendToken(user, 200, res);
});

// Update Password
exports.updatePassword = asyncErrorHandler(async (req, res, next) => {

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched) {
        return next(new ErrorHandler("Old Password is Invalid", 400));
    }

    if(req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Passwords do not match", 400));
    }

    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 201, res);
});

// Update User Profile
exports.updateProfile = asyncErrorHandler(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }

    await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    });

    res.status(200).json({
        success: true,
    });
});

// ADMIN DASHBOARD

// Get All Users --ADMIN
exports.getAllUsers = asyncErrorHandler(async (req, res, next) => {

    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});

// Get Single User Details --ADMIN
exports.getSingleUser = asyncErrorHandler(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if(!user) {
        return next(new ErrorHandler(`User doesn't exist with id: ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        user,
    });
});

// Update User Role --ADMIN
exports.updateUserRole = asyncErrorHandler(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        role: req.body.role,
    }

    await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

// Delete User --ADMIN
exports.deleteUser = asyncErrorHandler(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if(!user) {
        return next(new ErrorHandler(`User doesn't exist with id: ${req.params.id}`, 404));
    }

    await user.remove();

    res.status(200).json({
        success: true
    });
});