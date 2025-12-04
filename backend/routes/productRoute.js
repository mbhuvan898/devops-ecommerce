const express = require('express');
const { 
    getAllProducts, 
    getProductDetails, 
    updateProduct, 
    deleteProduct, 
    getProductReviews, 
    deleteReview, 
    createProductReview, 
    createProduct, 
    getAdminProducts, 
    getProducts,
    getProductsByCategory,
    getProductsBySubcategory
} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

// Public Routes
router.route('/products').get(getAllProducts);
router.route('/products/all').get(getProducts);
router.route('/products/category/:category').get(getProductsByCategory);
router.route('/products/category/:category/subcategory/:subcategory').get(getProductsBySubcategory);
router.route('/product/:id').get(getProductDetails);

// Review Routes
router.route('/review').put(isAuthenticatedUser, createProductReview);
router.route('/reviews').get(getProductReviews);

// Admin Routes
router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

// ❗ REMOVED MULTER — Now createProduct must work WITHOUT images
router.route('/admin/product/new')
    .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route('/admin/reviews')
    .get(getProductReviews)
    .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
