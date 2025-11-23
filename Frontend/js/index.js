// js/index.js
const productListElement = document.getElementById('product-list');

// Hàm tạo HTML cho 1 sản phẩm
function createProductCard(product) {
    // Lưu ý: Thay đổi các thuộc tính (ten_sp, gia, hinh_anh) cho phù hợp với response Backend của bạn
    return `
        <div class="col-md-4 mb-4">
            <div class="card">
                <img src="${product.hinh_anh}" class="card-img-top" alt="${product.ten_sp}">
                <div class="card-body">
                    <h5 class="card-title">${product.ten_sp}</h5>
                    <p class="card-text text-danger">${product.gia.toLocaleString('vi-VN')} VNĐ</p>
                    <a href="product.html?id=${product.id}" class="btn btn-primary">Xem Chi Tiết</a>
                    </div>
            </div>
        </div>
    `;
}

async function fetchAndDisplayProducts() {
    try {
        const response = await apiClient.get('/products'); // Dùng apiClient đã tạo ở bước 3
        const products = response.data; // Giả sử Backend trả về mảng sản phẩm trong data

        let html = '';
        products.forEach(product => {
            html += createProductCard(product);
        });

        productListElement.innerHTML = html;

    } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
        productListElement.innerHTML = '<p class="text-danger">Không thể tải dữ liệu sản phẩm.</p>';
    }
}

// Chạy khi trang tải xong
fetchAndDisplayProducts();