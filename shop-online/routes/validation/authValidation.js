// userValidation.js hoặc trong userRoutes.js

const { check, validationResult } = require('express-validator');

// Middleware kiểm tra kết quả validation
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Trả về lỗi 400 và danh sách lỗi cho client
        return res.status(400).json({ 
            success: false, 
            message: 'Dữ liệu đầu vào không hợp lệ',
            errors: errors.array() 
        });
    }
    next(); // Chuyển sang Controller nếu không có lỗi
};

// Định nghĩa chuỗi validation cho việc đăng ký
const registerValidation = [
    // Kiểm tra email
    check('email', 'Email không hợp lệ').isEmail(),
    // Kiểm tra mật khẩu
    check('password', 'Mật khẩu phải dài ít nhất 6 ký tự').isLength({ min: 6 }),
    // Kiểm tra tên
    check('name', 'Tên không được để trống').not().isEmpty(),
    // Áp dụng middleware kiểm tra kết quả
    validateRequest
];

// Định nghĩa chuỗi validation cho việc thêm sản phẩm
const productValidation = [
    check('name', 'Tên sản phẩm không được để trống').not().isEmpty(),
    check('price', 'Giá phải là số dương').isFloat({ gt: 0 }),
    validateRequest
];

module.exports = { 
    registerValidation, 
    productValidation 
};