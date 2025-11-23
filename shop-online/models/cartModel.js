const db = require("../config/db");

// ✅ Lấy giỏ hàng theo ID người dùng
exports.getCartByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT ghct.id, sp.ten_san_pham, ghct.so_luong, ghct.gia
            FROM gio_hang gh
            JOIN gio_hang_chi_tiet ghct ON gh.id = ghct.id_gio_hang
            JOIN san_pham sp ON ghct.id_san_pham = sp.id
            WHERE gh.id_nguoi_dung = ?
        `;
        db.query(sql, [userId], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

// ✅ Thêm sản phẩm vào giỏ
exports.addToCart = (userId, productId, so_luong) => {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO gio_hang_chi_tiet (id_gio_hang, id_san_pham, so_luong, gia)
            VALUES ((SELECT id FROM gio_hang WHERE id_nguoi_dung = ?), ?, ?, 
            (SELECT gia FROM san_pham WHERE id = ?))
        `;
        db.query(sql, [userId, productId, so_luong, productId], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

// ✅ Cập nhật số lượng sản phẩm trong giỏ
exports.updateCartItem = (userId, productId, so_luong) => {
    return new Promise((resolve, reject) => {
        const sql = `
            UPDATE gio_hang_chi_tiet 
            SET so_luong = ? 
            WHERE id_gio_hang = (SELECT id FROM gio_hang WHERE id_nguoi_dung = ?) 
            AND id_san_pham = ?
        `;
        db.query(sql, [so_luong, userId, productId], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

// ✅ Xóa sản phẩm khỏi giỏ
exports.removeFromCart = (userId, productId) => {
    return new Promise((resolve, reject) => {
        const sql = `
            DELETE FROM gio_hang_chi_tiet 
            WHERE id_gio_hang = (SELECT id FROM gio_hang WHERE id_nguoi_dung = ?)
            AND id_san_pham = ?
        `;
        db.query(sql, [userId, productId], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

// ✅ Xóa toàn bộ giỏ hàng
exports.clearCart = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = `
            DELETE FROM gio_hang_chi_tiet 
            WHERE id_gio_hang = (SELECT id FROM gio_hang WHERE id_nguoi_dung = ?)
        `;
        db.query(sql, [userId], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};
