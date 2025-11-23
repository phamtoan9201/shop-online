const bcrypt = require("bcryptjs"); // Dùng để mã hóa mật khẩu
const jwt = require("jsonwebtoken"); // Dùng để tạo token xác thực
const userModel = require("../models/userModel");
require("dotenv").config();

// ✅ Đăng ký tài khoản mới
exports.registerUser = async (req, res) => {
    try {
        const { ten_dang_nhap, email, mat_khau } = req.body;

        // Kiểm tra xem user đã tồn tại chưa
        const existingUser = await userModel.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Email đã được sử dụng!" });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(mat_khau, 10);

        // Thêm user mới
        const newUser = await userModel.createUser({
            ten_dang_nhap,
            email,
            mat_khau: hashedPassword,
        });

        res.status(201).json({ message: "Đăng ký thành công!", user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Đăng nhập tài khoản
exports.loginUser = async (req, res) => {
    try {
        const { email, mat_khau } = req.body;

        const user = await userModel.findByEmail(email);
        if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng!" });

        // So sánh mật khẩu
        const isMatch = await bcrypt.compare(mat_khau, user.mat_khau);
        if (!isMatch) return res.status(400).json({ message: "Mật khẩu không đúng!" });

        // Tạo token JWT
        const token = jwt.sign(
            { id: user.id, vai_tro: user.vai_tro },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ message: "Đăng nhập thành công!", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Lấy thông tin người dùng theo ID
exports.getUserProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng!" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Cập nhật thông tin cá nhân
exports.updateUserProfile = async (req, res) => {
    try {
        const { ten_dang_nhap, email } = req.body;
        const updated = await userModel.updateUser(req.params.id, { ten_dang_nhap, email });
        res.json({ message: "Cập nhật thành công!", updated });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Xóa tài khoản người dùng
exports.deleteUser = async (req, res) => {
    try {
        await userModel.deleteUser(req.params.id);
        res.json({ message: "Xóa tài khoản thành công!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
