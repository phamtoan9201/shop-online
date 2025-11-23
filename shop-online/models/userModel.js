const db = require("../config/db");

// ✅ Tìm user theo email (dùng để đăng nhập hoặc kiểm tra trùng)
exports.findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM nguoi_dung WHERE email = ?";
        db.query(sql, [email], (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};

// ✅ Tìm user theo ID
exports.findById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT id, ten_dang_nhap, email, vai_tro, ngay_tao FROM nguoi_dung WHERE id = ?";
        db.query(sql, [id], (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};

// ✅ Tạo user mới (đăng ký)
exports.createUser = (user) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO nguoi_dung (ten_dang_nhap, email, mat_khau) VALUES (?, ?, ?)";
        db.query(sql, [user.ten_dang_nhap, user.email, user.mat_khau], (err, result) => {
            if (err) reject(err);
            else resolve({ id: result.insertId, ...user });
        });
    });
};

// ✅ Cập nhật thông tin người dùng
exports.updateUser = (id, user) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE nguoi_dung SET ten_dang_nhap = ?, email = ? WHERE id = ?";
        db.query(sql, [user.ten_dang_nhap, user.email, id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

// ✅ Xóa người dùng
exports.deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM nguoi_dung WHERE id = ?";
        db.query(sql, [id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};
