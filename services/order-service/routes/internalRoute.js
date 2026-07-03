const express = require("express");
const Order = require("../models/orderModel");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");

const router = express.Router();

/**
 * Service-to-service endpoint, called by user-service to show the
 * "ordersCount" on the profile page.
 *
 * /internal/* paths are NOT routed by the gateway, so they are only
 * reachable from inside the Docker network / Kubernetes cluster.
 */
router.get(
    "/internal/orders/count/:userId",
    asyncErrorHandler(async (req, res) => {
        const count = await Order.countDocuments({ user: req.params.userId });
        res.status(200).json({ success: true, count });
    })
);

module.exports = router;
