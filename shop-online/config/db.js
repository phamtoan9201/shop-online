// db.js
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

connection.connect(err => {
  if (err) {
    console.error('❌ Kết nối DB thất bại:', err);
  } else {
    console.log('✅ Kết nối DB thành công!');
  }
});

module.exports = connection;
