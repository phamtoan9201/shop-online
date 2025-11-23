// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware kiểm tra token
function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ message: "Không có token, truy cập bị từ chối" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token không hợp lệ" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // lưu thông tin user vào req.user
        next();
    } catch (err) {
        return res.status(403).json({ message: "Token không hợp lệ hoặc hết hạn" });
    }
}

// Middleware kiểm tra quyền admin
function verifyAdmin(req, res, next) {
    if (req.user && req.user.vai_tro === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: "Bạn không có quyền admin" });
    }
}

module.exports = { verifyToken, verifyAdmin };
