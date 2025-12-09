const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        sameSite: "lax",   // allow cookies to work over HTTP
        secure: false      // must be false because you are NOT using HTTPS
    };

    res
        .status(statusCode)
        .cookie("token", token, options)
        .json({
            success: true,
            user,
            token,
        });
};

module.exports = sendToken;
