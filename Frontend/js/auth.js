// js/auth.js
function saveToken(token) {
    localStorage.setItem('authToken', token);
}

function getToken() {
    return localStorage.getItem('authToken');
}

function logout() {
    localStorage.removeItem('authToken');
    window.location.href = 'login.html'; // Chuyển về trang đăng nhập
}
