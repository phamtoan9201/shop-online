const db = require("../config/db");

// ✅ Lấy tất cả sản phẩm (kèm danh mục)
exports.getAllProducts = () => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT sp.*, dm.ten_danh_muc 
            FROM san_pham sp
            LEFT JOIN danh_muc dm ON sp.id_danh_muc = dm.id
            ORDER BY sp.ngay_tao DESC
        `;
        db.query(sql, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

// ✅ Lấy sản phẩm theo ID
exports.getProductById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM san_pham WHERE id = ?";
        db.query(sql, [id], (err, results) => {
            if (err) reject(err);
            else resolve(results[0]);
        });
    });
};

// ✅ Thêm sản phẩm mới
exports.createProduct = (product) => {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO san_pham (ten_san_pham, mo_ta, gia, so_luong, mau_sac, id_danh_muc, hinh_anh)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        db.query(
            sql,
            [product.ten_san_pham, product.mo_ta, product.gia, product.so_luong, product.mau_sac, product.id_danh_muc, product.hinh_anh],
            (err, result) => {
                if (err) reject(err);
                else resolve({ id: result.insertId, ...product });
            }
        );
    });
};

// ✅ Cập nhật sản phẩm
exports.updateProduct = (id, product) => {
    return new Promise((resolve, reject) => {
        const sql = `
            UPDATE san_pham
            SET ten_san_pham=?, mo_ta=?, gia=?, so_luong=?, mau_sac=?, id_danh_muc=?
            WHERE id=?
        `;
        db.query(
            sql,
            [product.ten_san_pham, product.mo_ta, product.gia, product.so_luong, product.mau_sac, product.id_danh_muc, id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }
        );
    });
};

// ✅ Xóa sản phẩm
exports.deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM san_pham WHERE id = ?";
        db.query(sql, [id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};
