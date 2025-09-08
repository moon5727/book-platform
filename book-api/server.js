const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { testConnection } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// 中介層
app.use(cors());
app.use(express.json());

// 基本路由
app.get('/', (req, res) => {
  res.json({ message: '電子書平台 API 伺服器運行中' });
});

// API 路由
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));
app.use('/api/orders', require('./routes/orders'));

// 啟動伺服器並測試資料庫連接
app.listen(PORT, () => {
  console.log(`伺服器運行在 http://localhost:${PORT}`);
  testConnection(); // 取消註解，恢復測試
});