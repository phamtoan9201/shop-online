// js/api.js
const BASE_URL = 'http://localhost:5000/api'; 

// Hàm này sẽ tự động đính kèm token vào header cho mọi request
const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Thêm Interceptor để chèn token
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Bạn có thể sử dụng hàm này trong các file JS khác:
// Ví dụ: apiClient.get('/products')

// Hàm kiểm tra và chuyển hướng nếu chưa đăng nhập
function checkAuthAndRedirect(redirectUrl = 'login.html') {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = redirectUrl;
    }
}