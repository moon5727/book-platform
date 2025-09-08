const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'bookstore',
  timezone: '+08:00'
};

const pool = mysql.createPool(dbConfig);

const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL 資料庫連接成功');
    connection.release();
  } catch (error) {
    console.error('❌ MySQL 資料庫連接失敗:', error.message);
  }
};

module.exports = { pool, testConnection };
