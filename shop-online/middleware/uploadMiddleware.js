// middleware/uploadMiddleware.js

const multer = require('multer');
const path = require('path');

// Cấu hình lưu trữ: Nơi lưu và tên file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Chỉ định thư mục để lưu trữ ảnh
        cb(null, 'uploads/products/'); 
    },
    filename: (req, file, cb) => {
        // Đặt tên file là: product-TEN-SAN-PHAM-timestamp.jpg
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Cấu hình giới hạn loại file (chỉ cho phép ảnh)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('Chỉ chấp nhận file ảnh'), false);
    }
};

// Khởi tạo Multer
const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // Giới hạn 5MB
});

// Middleware để upload một file ảnh duy nhất
const uploadProductImage = upload.single('image'); // Tên trường form data là 'image'

module.exports = { uploadProductImage };