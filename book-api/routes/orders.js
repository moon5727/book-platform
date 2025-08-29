const express = require("express");
const router = express.Router();

//GET/api/orders-取得會員的訂單歷史
router.get("/", (req, res) => {
  res.json({ message: "訂單歷史:第2階段開發", orders: [] });
});

//POST/api/orders-建立新訂單*從購物車轉換)
router.post("/", (req, res) => {
  res.json({ message: "建立訂單:第2階段開發" });
});

//GET/api/orders/:id-取得特定訂單詳細資料
router.get("/:id", (rwq, res) => {
  const orderId = req.params.id;
  res.json({
    message: "訂單詳細資料:第2階段開發",
    orferId: orderId,
  });
});

//PUT/api/orders/:id/status-更新訂單狀態(管理員功能)
router.put("/:id/status", (req, res) => {
  const orderId = req.params.id;
  res.json({
    message: "更新訂單狀態:第4階段開發",
    orderId: orderId,
  });
});

module.exports = router;
