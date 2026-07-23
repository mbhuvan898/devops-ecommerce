const express = require('express');
const { 
    registerUser, 
    loginUser, 
    logoutUser, 
    getUserDetails, 
    forgotPassword, 
    resetPassword, 
    updatePassword, 
    updateProfile, 
    getAllUsers, 
    getSingleUser, 
    updateUserRole, 
    deleteUser 
} = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

// ============================================
// PUBLIC ROUTES (No Authentication Required)
// ============================================

// Register new user
router.route('/register').post(registerUser);

// Login user
router.route('/login').post(loginUser);

// Logout user
router.route('/logout').get(logoutUser);

// Forgot password - Send reset email
router.route('/password/forgot').post(forgotPassword);

// Reset password - Using token from email
router.route('/password/reset/:token').put(resetPassword);

// ============================================
// PROTECTED ROUTES (Authentication Required)
// ============================================

// Get logged in user details
router.route('/me').get(isAuthenticatedUser, getUserDetails);

// Update user password (when logged in)
router.route('/password/update').put(isAuthenticatedUser, updatePassword);

// Update user profile (name, email)
router.route('/me/update').put(isAuthenticatedUser, updateProfile);

// ============================================
// ADMIN ROUTES (Admin Access Only)
// ============================================

// Get all users - ADMIN
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);

// Get, Update, Delete single user - ADMIN
router.route("/admin/user/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;