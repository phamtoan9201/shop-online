const orderModel = require("../models/orderModel");

// ✅ Tạo đơn hàng mới
exports.createOrder = async (req, res) => {
    try {
        const data = req.body;
        const newOrder = await orderModel.createOrder(data);
        res.status(201).json({ message: "Tạo đơn hàng thành công!", order: newOrder });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Lấy đơn hàng của người dùng
exports.getOrdersByUser = async (req, res) => {
    try {
        const orders = await orderModel.getOrdersByUser(req.params.userId);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Lấy chi tiết đơn hàng
exports.getOrderById = async (req, res) => {
    try {
        const order = await orderModel.getOrderById(req.params.orderId);
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Cập nhật trạng thái đơn hàng
exports.updateOrderStatus = async (req, res) => {
    try {
        await orderModel.updateOrderStatus(req.params.orderId, req.body.trang_thai);
        res.json({ message: "Cập nhật trạng thái đơn hàng thành công!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Xóa đơn hàng
exports.deleteOrder = async (req, res) => {
    try {
        await orderModel.deleteOrder(req.params.orderId);
        res.json({ message: "Xóa đơn hàng thành công!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
