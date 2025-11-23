const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { registerValidation } = require('./validation/authValidation'); // Import validation 

// ✅ Đăng ký tài khoản mới
router.post("/register", userController.registerUser);

// ✅ Đăng nhập tài khoản
router.post("/login", userController.loginUser);

// ✅ Lấy thông tin cá nhân theo ID
router.get("/profile/:id", userController.getUserProfile);

// ✅ Cập nhật thông tin cá nhân
router.put("/profile/:id", userController.updateUserProfile);

// ✅ Xóa tài khoản
router.delete("/profile/:id", userController.deleteUser);

module.exports = router;
