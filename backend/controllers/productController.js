// backend/controllers/productController.js

const Product = require('../models/productModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const SearchFeatures = require('../utils/searchFeatures');
const ErrorHandler = require('../utils/errorHandler');

// Get All Products with Filters (Main product listing with search, filter, pagination)
exports.getAllProducts = asyncErrorHandler(async (req, res, next) => {

    const resultPerPage = 12;
    const productsCount = await Product.countDocuments();

    // Create search feature instance
    const searchFeature = new SearchFeatures(Product.find(), req.query)
        .search()
        .filter()
        .subcategoryFilter();

    // Get filtered products count before pagination
    let products = await searchFeature.query;
    let filteredProductsCount = products.length;

    // Apply pagination
    searchFeature.pagination(resultPerPage);
    
    // Clone query to avoid mongoose error
    products = await searchFeature.query.clone();

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    });
});

// Get All Products (without filters - for sliders/homepage)
exports.getProducts = asyncErrorHandler(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
});

// Get Product Details by ID
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

// Get Products by Category (Direct category filter)
exports.getProductsByCategory = asyncErrorHandler(async (req, res, next) => {
    const { category } = req.params;
    
    const products = await Product.find({ category: category });

    res.status(200).json({
        success: true,
        products,
        count: products.length,
    });
});

// Get Products by Subcategory (Category + Subcategory filter)
exports.getProductsBySubcategory = asyncErrorHandler(async (req, res, next) => {
    const { category, subcategory } = req.params;
    
    const query = {};
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;
    
    const products = await Product.find(query);

    res.status(200).json({
        success: true,
        products,
        count: products.length,
    });
});

// ==================== ADMIN ROUTES ====================

// Get All Products - ADMIN
exports.getAdminProducts = asyncErrorHandler(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
});

// Create Product - ADMIN
exports.createProduct = asyncErrorHandler(async (req, res, next) => {

    const { 
        name, 
        description, 
        price, 
        cuttedPrice, 
        category, 
        subcategory, 
        productType, 
        stock, 
        warranty, 
        brand,
        images,
        highlights, 
        specifications 
    } = req.body;

    // Validate required fields
    if (!name || !description || !price || !cuttedPrice || !category || !stock || !warranty) {
        return next(new ErrorHandler("Please provide all required fields", 400));
    }

    // Validate brand
    if (!brand || !brand.name || !brand.logo || !brand.logo.public_id || !brand.logo.url) {
        return next(new ErrorHandler("Please provide complete brand details (name, logo with public_id and url)", 400));
    }

    // Validate images
    if (!images || !Array.isArray(images) || images.length === 0) {
        return next(new ErrorHandler("Please provide at least one product image", 400));
    }

    // Validate image structure
    for (let img of images) {
        if (!img.public_id || !img.url) {
            return next(new ErrorHandler("Each image must have public_id and url", 400));
        }
    }

    // Validate highlights
    if (!highlights || !Array.isArray(highlights) || highlights.length === 0) {
        return next(new ErrorHandler("Please provide at least one highlight", 400));
    }

    // Validate specifications
    if (!specifications || !Array.isArray(specifications) || specifications.length < 2) {
        return next(new ErrorHandler("Please provide at least 2 specifications", 400));
    }

    // Construct product data
    const productData = {
        name,
        description,
        price: Number(price),
        cuttedPrice: Number(cuttedPrice),
        category,
        subcategory: subcategory || "",
        productType: productType || "",
        stock: Number(stock),
        warranty: Number(warranty),
        brand: {
            name: brand.name,
            logo: {
                public_id: brand.logo.public_id,
                url: brand.logo.url
            }
        },
        images: images,
        highlights: highlights,
        specifications: specifications,
        user: req.user.id,
    };

    const product = await Product.create(productData);

    res.status(201).json({
        success: true,
        product
    });
});

// Update Product - ADMIN
exports.updateProduct = asyncErrorHandler(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    const { 
        name, 
        description, 
        price, 
        cuttedPrice, 
        category, 
        subcategory, 
        productType, 
        stock, 
        warranty, 
        brand,
        images,
        highlights, 
        specifications 
    } = req.body;

    // Validate required fields
    if (!name || !description || !price || !cuttedPrice || !category || !stock || !warranty) {
        return next(new ErrorHandler("Please provide all required fields", 400));
    }

    // Validate brand
    if (!brand || !brand.name || !brand.logo || !brand.logo.public_id || !brand.logo.url) {
        return next(new ErrorHandler("Please provide complete brand details (name, logo with public_id and url)", 400));
    }

    // Validate images
    if (!images || !Array.isArray(images) || images.length === 0) {
        return next(new ErrorHandler("Please provide at least one product image", 400));
    }

    // Validate image structure
    for (let img of images) {
        if (!img.public_id || !img.url) {
            return next(new ErrorHandler("Each image must have public_id and url", 400));
        }
    }

    // Validate highlights
    if (!highlights || !Array.isArray(highlights) || highlights.length === 0) {
        return next(new ErrorHandler("Please provide at least one highlight", 400));
    }

    // Validate specifications
    if (!specifications || !Array.isArray(specifications) || specifications.length < 2) {
        return next(new ErrorHandler("Please provide at least 2 specifications", 400));
    }

    const newProductData = {
        name,
        description,
        price: Number(price),
        cuttedPrice: Number(cuttedPrice),
        category,
        subcategory: subcategory || "",
        productType: productType || "",
        stock: Number(stock),
        warranty: Number(warranty),
        brand: {
            name: brand.name,
            logo: {
                public_id: brand.logo.public_id,
                url: brand.logo.url
            }
        },
        images: images,
        highlights: highlights,
        specifications: specifications,
    };

    product = await Product.findByIdAndUpdate(req.params.id, newProductData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        product
    });
});

// Delete Product - ADMIN
exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });
});

// ==================== REVIEW ROUTES ====================

// Create or Update Product Review
exports.createProductReview = asyncErrorHandler(async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    // Check if user already reviewed this product
    const isReviewed = product.reviews.find(
        review => review.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        // Update existing review
        product.reviews.forEach((rev) => { 
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating;
                rev.comment = comment;
            }
        });
    } else {
        // Add new review
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    // Calculate average rating
    let totalRating = 0;
    product.reviews.forEach((rev) => {
        totalRating += rev.rating;
    });
    product.ratings = totalRating / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Review added successfully"
    });
});

// Get All Reviews of a Product
exports.getProductReviews = asyncErrorHandler(async (req, res, next) => {

    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
});

// Delete Review - ADMIN
exports.deleteReview = asyncErrorHandler(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    // Filter out the review to be deleted
    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    // Recalculate average rating
    let totalRating = 0;
    reviews.forEach((rev) => {
        totalRating += rev.rating;
    });

    let ratings = 0;
    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = totalRating / reviews.length;
    }

    const numOfReviews = reviews.length;

    // Update product with new reviews
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings: Number(ratings),
        numOfReviews,
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        message: "Review deleted successfully"
    });
});