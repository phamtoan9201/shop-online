const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// ✅ Tạo đơn hàng mới
router.post("/", orderController.createOrder);

// ✅ Lấy danh sách đơn hàng của 1 người dùng
router.get("/user/:userId", orderController.getOrdersByUser);

// ✅ Lấy chi tiết 1 đơn hàng cụ thể
router.get("/:orderId", orderController.getOrderById);

// ✅ Cập nhật trạng thái đơn hàng (admin)
router.put("/:orderId/status", orderController.updateOrderStatus);

// ✅ Xóa đơn hàng (nếu cần)
router.delete("/:orderId", orderController.deleteOrder);

module.exports = router;
