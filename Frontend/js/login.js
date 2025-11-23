const form = document.getElementById('loginForm');
const messageElement = document.getElementById('message');
const BASE_URL = 'http://localhost:5000/api'; // Thay bằng port Backend của bạn

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Ngăn chặn form submit truyền thống

    const email = document.getElementById('email').value;
    const mat_khau = document.getElementById('password').value;

    try {
        const response = await axios.post(`${BASE_URL}/users/login`, {
            email,
            mat_khau
        });

        // 1. Lấy token
        const token = response.data.token; 
        
        // 2. Lưu token vào Local Storage
        localStorage.setItem('authToken', token); 
        
        // 3. Chuyển hướng
        window.location.href = 'index.html'; 

    } catch (error) {
        // Xử lý lỗi từ server (401/403)
        const errorMessage = error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại.';
        messageElement.textContent = errorMessage;
    }
    // js/login.js
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    // ... lấy email, password từ form
    try {
        const response = await apiClient.post('/users/login', { email, password });
        const token = response.data.token;

        saveToken(token); // Lưu token

        window.location.href = 'index.html'; // Chuyển về trang chủ
    } catch (error) {
        // ... xử lý lỗi
    }
});

});