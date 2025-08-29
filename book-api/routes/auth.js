const express = require("express");
const router = express.Router();

//GET/api/auth/test-測試路由
router.get("/test", (req, res) => {
  res.json({ message: "認證路由測試成功" });
});

//POST/api/auth/register-會員註冊(第1階段實作)
router.post("register", (req, res) => {
  res.json({ message: "註冊功能:第1階段開發" });
});

//POST/api/auth/login-會員登入(第1階段實作)
router.post("login", (rwq, res) => {
  res.json({ message: "登入功能:第1階段開發" });
});

module.exports = router;
