const express = require("express");
const router = express.Router();

//GET/api/books-取得所有商品列表
router.get("/", (req, res) => {
  res.json({ message: "商品列表:第1階段開發", books: [] });
});

//GET/api/books/:id-取得特定商品詳細資料
router.get("/:id", (req, res) => {
  const bookId = req.patams.id;
  res.json({
    message: "商品詳細資料:第1階段開發",
    bookId: bookId,
  });
});

//POST/api/books-新增商品(管理員功能，第4階段實作)
router.post("/", (req, res) => {
  res.json({ message: "新增商品功能:第4階段開發" });
});

module.exports = router;
