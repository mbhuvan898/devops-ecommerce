const express = require("express");
const Product = require("../models/productModel");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");

const router = express.Router();

/**
 * Service-to-service endpoint, called by order-service when an order is
 * shipped. In the monolith this was a direct `Product.findById()` inside
 * orderController — now stock changes stay inside the service that owns
 * the products database.
 *
 * /internal/* paths are NOT routed by the gateway, so they are only
 * reachable from inside the Docker network / Kubernetes cluster.
 */
router.put(
    "/internal/stock/decrement",
    asyncErrorHandler(async (req, res) => {
        const { items } = req.body; // [{ product: <id>, quantity: <n> }]

        for (const item of items || []) {
            const product = await Product.findById(item.product);
            if (product) {
                product.stock -= item.quantity;
                await product.save({ validateBeforeSave: false });
            }
        }

        res.status(200).json({ success: true });
    })
);

module.exports = router;
