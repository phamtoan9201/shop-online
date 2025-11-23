// js/product.js
document.addEventListener('DOMContentLoaded', async () => {
    const productDetailElement = document.getElementById('product-detail');

    // 1. Lấy ID từ URL
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (!productId) {
        productDetailElement.innerHTML = '<p>Không tìm thấy ID sản phẩm.</p>';
        return;
    }

    try {
        // 2. Gọi API để lấy chi tiết sản phẩm
        const response = await apiClient.get(`/products/${productId}`);
        const product = response.data;

        // 3. Hiển thị ra HTML
        productDetailElement.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <img src="http://localhost:3000/${product.hinh_anh}" class="img-fluid" alt="${product.ten_san_pham}">
                </div>
                <div class="col-md-6">
                    <h2>${product.ten_san_pham}</h2>
                    <p class="text-danger fs-4">${product.gia.toLocaleString('vi-VN')} VNĐ</p>
                    <p>${product.mo_ta}</p>
                    <button class="btn btn-success">Thêm vào giỏ hàng</button>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Lỗi khi tải chi tiết sản phẩm:", error);
        productDetailElement.innerHTML = '<p class="text-danger">Không thể tải dữ liệu sản phẩm.</p>';
    }
});
