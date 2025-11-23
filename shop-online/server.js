// server.js
require('dotenv').config();  // Đọc file .env
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
app.use(cors()); 

// Import kết nối DB
const db = require('./config/db');

// Middleware
app.use(express.json());
app.use(cors());

// Test server
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

app.get('/', (req, res) => {
  res.send('🚀 Backend is running successfully!');
});

// Import các route
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Middleware xác thực token (nếu bạn muốn)
const { verifyToken, verifyAdmin } = require('./middleware/authMiddleware');

// Mount routes
app.use('/api/users', userRoutes);       // Đăng ký, login, profile
app.use('/api/products', productRoutes); // CRUD sản phẩm
app.use('/api/cart', verifyToken, cartRoutes);   // Giỏ hàng cần login
app.use('/api/orders', verifyToken, orderRoutes); // Đơn hàng cần login
app.use(notFound);      // Bắt các request không khớp với route nào
app.use(errorHandler);  // Xử lý và format lỗi cuối cùng

// Khởi động server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
