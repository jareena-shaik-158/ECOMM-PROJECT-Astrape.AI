// middleware.js
const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Access Denied! No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ message: "Access Denied! Invalid token." });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // attach user info to request
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token." });
    }
};

// Optional: Middleware for checking user role (if needed)
const verifyAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Admin access required!" });
    }
};

module.exports = { verifyToken, verifyAdmin };
