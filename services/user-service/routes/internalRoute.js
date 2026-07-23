const express = require("express");
const User = require("../models/userModel");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");

const router = express.Router();

/**
 * Service-to-service endpoint, called by order-service to show the
 * customer's name/email on an order (replaces the Mongoose
 * populate("user") that only worked when everything shared one DB).
 *
 * /internal/* paths are NOT routed by the gateway, so they are only
 * reachable from inside the Docker network / Kubernetes cluster.
 */
router.get(
    "/internal/users/:id",
    asyncErrorHandler(async (req, res) => {
        const user = await User.findById(req.params.id).select("name email");
        res.status(200).json({ success: true, user });
    })
);

module.exports = router;
