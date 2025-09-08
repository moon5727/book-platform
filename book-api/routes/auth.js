const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

const router = express.Router();

// 測試路由
router.get('/test', (req, res) => {
  res.json({ message: '認證路由測試成功' });
});

// 會員註冊
router.post('/register', async (req, res) => {
  try {
    const { name, username, password, email, phone } = req.body;
    
    const [existing] = await pool.execute(
      'SELECT * FROM members WHERE username = ? OR email = ?',
      [username, email]
    );
    
    if (existing.length > 0) {
      return res.status(400).json({ message: '帳號或信箱已存在' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await pool.execute(
      'INSERT INTO members (name, username, password, email, phone) VALUES (?, ?, ?, ?, ?)',
      [name, username, hashedPassword, email, phone]
    );
    
    res.status(201).json({ message: '註冊成功' });
  } catch (error) {
    console.error('註冊錯誤:', error);
    res.status(500).json({ message: '伺服器錯誤' });
  }
});

// ✅ 新增：會員登入
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const [users] = await pool.execute(
      'SELECT * FROM members WHERE username = ?',
      [username]
    );
    
    if (users.length === 0) {
      return res.status(400).json({ message: '帳號不存在' });
    }
    
    const user = users[0];
    const isValid = await bcrypt.compare(password, user.password);
    
    if (!isValid) {
      return res.status(400).json({ message: '密碼錯誤' });
    }
    
    const token = jwt.sign(
      { userId: user.member_id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      message: '登入成功',
      token,
      user: {
        id: user.member_id,
        name: user.name,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('登入錯誤:', error);
    res.status(500).json({ message: '伺服器錯誤' });
  }
});

module.exports = router;