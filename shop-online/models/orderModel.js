const db = require("../config/db");
exports.updateStock = async (orderItems) => {
    // orderItems là một mảng các đối tượng { productId: id, quantity: so_luong }
    const promises = orderItems.map(item => {
        const sql = `
            UPDATE san_pham 
            SET so_luong_ton = so_luong_ton - ? 
            WHERE id = ? AND so_luong_ton >= ? 
        `; // Thêm điều kiện so_luong_ton >= ? để tránh trừ kho âm
        
        // item.productId là id của sản phẩm, item.quantity là số lượng đặt
        return db.query(sql, [item.quantity, item.productId, item.quantity]);
    });
        
    // Chờ tất cả các truy vấn trừ kho hoàn thành
    await Promise.all(promises);

    return true;
};
// ✅ Tạo đơn hàng mới
exports.createOrder = (data) => {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO don_hang (id_nguoi_dung, id_dia_chi, tong_tien, trang_thai)
            VALUES (?, ?, ?, 'cho_xu_ly')
        `;
        db.query(sql, [data.id_nguoi_dung, data.id_dia_chi, data.tong_tien], (err, result) => {
            if (err) reject(err);
            else resolve({ id: result.insertId, ...data });
        });
    });
};

// ✅ Lấy đơn hàng của người dùng
exports.getOrdersByUser = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT * FROM don_hang WHERE id_nguoi_dung = ? ORDER BY ngay_dat DESC
        `;
        db.query(sql, [userId], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

// ✅ Lấy chi tiết đơn hàng
exports.getOrderById = (orderId) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT * FROM don_hang WHERE id = ?
        `;
        db.query(sql, [orderId], (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};

// ✅ Cập nhật trạng thái đơn hàng
exports.updateOrderStatus = (orderId, status) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE don_hang SET trang_thai = ? WHERE id = ?";
        db.query(sql, [status, orderId], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

// ✅ Xóa đơn hàng
exports.deleteOrder = (orderId) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM don_hang WHERE id = ?";
        db.query(sql, [orderId], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};
