const productModel = require("../models/productModel");

// ✅ Lấy tất cả sản phẩm
exports.getAllProducts = async (req, res) => {
    try {
        const products = await productModel.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Lấy sản phẩm theo ID
exports.getProductById = async (req, res) => {
    try {
        const product = await productModel.getProductById(req.params.id);
        if (!product) return res.status(404).json({ message: "Không tìm thấy sản phẩm!" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Thêm sản phẩm mới (admin)
exports.createProduct = async (req, res) => {
    try {
        // Kết hợp dữ liệu từ body và đường dẫn file đã upload
        const data = {
            ...req.body,
            hinh_anh: req.file ? req.file.path : null // Lấy đường dẫn file từ middleware upload
        };

        const newProduct = await productModel.createProduct(data);
        res.status(201).json({ message: "Thêm sản phẩm thành công!", product: newProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
    try {
        const data = req.body;
        await productModel.updateProduct(req.params.id, data);
        res.json({ message: "Cập nhật sản phẩm thành công!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
    try {
        await productModel.deleteProduct(req.params.id);
        res.json({ message: "Xóa sản phẩm thành công!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
