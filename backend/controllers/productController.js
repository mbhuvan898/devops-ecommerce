const Product = require("../models/productModel");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const SearchFeatures = require("../utils/searchFeatures");
const ErrorHandler = require("../utils/errorHandler");
const { uploadToS3 } = require("../utils/s3Upload");

/* ======================================================
   USER ROUTES
====================================================== */

// Get all products with search, filter & pagination
exports.getAllProducts = asyncErrorHandler(async (req, res, next) => {
    const resultPerPage = 12;
    const productsCount = await Product.countDocuments();

    const searchFeature = new SearchFeatures(Product.find(), req.query)
        .search()
        .filter()
        .subcategoryFilter();

    let products = await searchFeature.query;
    const filteredProductsCount = products.length;

    searchFeature.pagination(resultPerPage);
    products = await searchFeature.query.clone();

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    });
});

// Get all products (for sliders / home)
exports.getProducts = asyncErrorHandler(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
});

// Get product details
exports.getProductDetails = asyncErrorHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    res.status(200).json({
        success: true,
        product,
    });
});

// Get products by category
exports.getProductsByCategory = asyncErrorHandler(async (req, res, next) => {
    const products = await Product.find({ category: req.params.category });

    res.status(200).json({
        success: true,
        products,
        count: products.length,
    });
});

// Get products by subcategory
exports.getProductsBySubcategory = asyncErrorHandler(async (req, res, next) => {
    const query = {
        category: req.params.category,
        subcategory: req.params.subcategory,
    };

    const products = await Product.find(query);

    res.status(200).json({
        success: true,
        products,
        count: products.length,
    });
});

/* ======================================================
   ADMIN ROUTES
====================================================== */

// Admin – Get all products
exports.getAdminProducts = asyncErrorHandler(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
});

// Admin – Create product (S3 upload)
exports.createProduct = asyncErrorHandler(async (req, res, next) => {

    if (!req.files || req.files.length === 0) {
        return next(new ErrorHandler("Please upload at least one image", 400));
    }

    let images = [];
    for (const file of req.files) {
        const uploaded = await uploadToS3(file, "products");
        images.push(uploaded);
    }

    const productData = {
        ...req.body,
        price: Number(req.body.price),
        cuttedPrice: Number(req.body.cuttedPrice),
        stock: Number(req.body.stock),
        warranty: Number(req.body.warranty),
        images,
        user: req.user.id,
    };

    const product = await Product.create(productData);

    res.status(201).json({
        success: true,
        product,
    });
});

// Admin – Update product (replace images if provided)
exports.updateProduct = asyncErrorHandler(async (req, res, next) => {

    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    let images = product.images;

    if (req.files && req.files.length > 0) {
        images = [];
        for (const file of req.files) {
            const uploaded = await uploadToS3(file, "products");
            images.push(uploaded);
        }
    }

    const updatedData = {
        ...req.body,
        price: Number(req.body.price),
        cuttedPrice: Number(req.body.cuttedPrice),
        stock: Number(req.body.stock),
        warranty: Number(req.body.warranty),
        images,
    };

    product = await Product.findByIdAndUpdate(
        req.params.id,
        updatedData,
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json({
        success: true,
        product,
    });
});

// Admin – Delete product
exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Product deleted successfully",
    });
});

/* ======================================================
   REVIEWS
====================================================== */

// Create or update review
exports.createProductReview = asyncErrorHandler(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating;
                rev.comment = comment;
            }
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    product.ratings =
        product.reviews.reduce((acc, item) => acc + item.rating, 0) /
        product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Review added successfully",
    });
});

// Get all reviews
exports.getProductReviews = asyncErrorHandler(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

// Admin – Delete review
exports.deleteReview = asyncErrorHandler(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    const numOfReviews = reviews.length;
    const ratings =
        numOfReviews === 0
            ? 0
            : reviews.reduce((acc, item) => acc + item.rating, 0) / numOfReviews;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json({
        success: true,
        message: "Review deleted successfully",
    });
});
