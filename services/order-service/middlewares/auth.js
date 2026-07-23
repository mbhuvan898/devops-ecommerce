const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/errorHandler');
const asyncErrorHandler = require('./asyncErrorHandler');

/**
 * Stateless JWT authentication.
 *
 * In the monolith this middleware looked the user up in MongoDB on every
 * request. In a microservice world every service would then need access to
 * the users database, which defeats the purpose of splitting.
 *
 * Instead, user-service embeds { id, name, email, role } in the token when
 * it signs it. Any service holding the shared JWT_SECRET can verify the
 * token and trust its payload — no database call, no call to user-service.
 */
exports.isAuthenticatedUser = asyncErrorHandler(async (req, res, next) => {

    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Please Login to Access", 401))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
        _id: decodedData.id,
        id: decodedData.id,
        name: decodedData.name,
        email: decodedData.email,
        role: decodedData.role,
    };

    next();
});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed`, 403));
        }
        next();
    }
}
