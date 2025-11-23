const cartModel = require("../models/cartModel");

// ✅ Lấy giỏ hàng của người dùng
exports.getCart = async (req, res) => {
    try {
        const cart = await cartModel.getCartByUserId(req.user.id); // Lấy ID từ token
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Thêm sản phẩm vào giỏ hàng
exports.addToCart = async (req, res) => {
    try {
        const { productId, so_luong } = req.body;
        await cartModel.addToCart(req.user.id, productId, so_luong); // Lấy ID từ token
        res.json({ message: "Đã thêm sản phẩm vào giỏ hàng!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Cập nhật số lượng sản phẩm trong giỏ
exports.updateCartItem = async (req, res) => {
    try {
        const { productId, so_luong } = req.body;
        await cartModel.updateCartItem(req.user.id, productId, so_luong); // Lấy ID từ token
        res.json({ message: "Cập nhật số lượng thành công!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Xóa sản phẩm khỏi giỏ
exports.removeFromCart = async (req, res) => {
    try {
        await cartModel.removeFromCart(req.user.id, req.params.productId); // Lấy ID từ token
        res.json({ message: "Đã xóa sản phẩm khỏi giỏ hàng!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Xóa toàn bộ giỏ hàng
exports.clearCart = async (req, res) => {
    try {
        await cartModel.clearCart(req.user.id); // Lấy ID từ token
        res.json({ message: "Đã xóa toàn bộ giỏ hàng!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
