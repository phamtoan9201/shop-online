const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// ✅ Lấy giỏ hàng của người dùng (ID lấy từ token)
router.get("/", cartController.getCart);

// ✅ Thêm sản phẩm vào giỏ hàng
router.post("/add", cartController.addToCart);

// ✅ Cập nhật số lượng sản phẩm trong giỏ
router.put("/update", cartController.updateCartItem);

// ✅ Xóa sản phẩm khỏi giỏ hàng
router.delete("/remove/:productId", cartController.removeFromCart);

// ✅ Xóa toàn bộ giỏ hàng
router.delete("/clear", cartController.clearCart);

module.exports = router;
