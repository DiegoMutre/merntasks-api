const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    // Read header token
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).json({ msg: "No token, permission denied" });
    }

    try {
        const validToken = jwt.verify(token, process.env.SECRET);
        console.log(validToken);
        req.user = validToken.user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ msg: "Invalid token" });
    }
};
