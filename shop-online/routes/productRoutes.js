const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { uploadProductImage } = require('../middleware/uploadMiddleware'); // Import Multer
const { verifyAdmin, verifyToken } = require('../middleware/authMiddleware');
// ✅ Lấy danh sách sản phẩm
router.get("/", productController.getAllProducts);

// ✅ Lấy chi tiết sản phẩm theo ID
router.get("/:id", productController.getProductById);

// ✅ Thêm sản phẩm mới (admin)
router.post(
    '/', 
    verifyAdmin, // Yêu cầu quyền Admin
    uploadProductImage, // Xử lý upload ảnh trước
    productController.createProduct // Sau đó là Controller
);

// ✅ Cập nhật thông tin sản phẩm (admin)
router.put("/:id", verifyAdmin, productController.updateProduct);

// ✅ Xóa sản phẩm (admin)
router.delete("/:id", verifyAdmin, productController.deleteProduct);

module.exports = router;
