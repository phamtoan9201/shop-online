// middleware/errorMiddleware.js

// 1. Xử lý lỗi cho các route không tồn tại (404 Not Found)
const notFound = (req, res, next) => {
    const error = new Error(`Route không tồn tại - ${req.originalUrl}`);
    res.status(404);
    next(error); // Chuyển lỗi này đến middleware xử lý lỗi chung
};

// 2. Xử lý lỗi chung (Catch-all)
const errorHandler = (err, req, res, next) => {
    // Nếu status code là 200 (OK), chuyển nó thành 500 (Internal Server Error)
    // Nếu không, giữ nguyên status code đã đặt trước đó (ví dụ: 401, 403, 404)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode);
    res.json({
        success: false,
        message: err.message,
        // Chỉ hiển thị stack trace (dấu vết lỗi) trong môi trường Development (dev)
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = { notFound, errorHandler };