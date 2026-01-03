const express = require("express");
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
  getProductsBySubcategory,
} = require("../controllers/productController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const upload = require("../middlewares/multer");

const router = express.Router();

/* =======================
   PUBLIC ROUTES
======================= */
router.route("/products").get(getAllProducts);
router.route("/products/all").get(getProducts);
router.route("/products/category/:category").get(getProductsByCategory);
router
  .route("/products/category/:category/subcategory/:subcategory")
  .get(getProductsBySubcategory);
router.route("/product/:id").get(getProductDetails);

/* =======================
   REVIEWS
======================= */
router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(getProductReviews);

/* =======================
   ADMIN ROUTES
======================= */
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

/**
 * ✅ IMAGE UPLOAD ENABLED
 * images[] → multer → S3 → MongoDB
 */
router
  .route("/admin/product/new")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    upload.array("images", 5),
    createProduct
  );

router
  .route("/admin/product/:id")
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    upload.array("images", 5),
    updateProduct
  )
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router
  .route("/admin/reviews")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteReview);

module.exports = router;
