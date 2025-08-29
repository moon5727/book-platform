const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

//中介層
app.use(cors());
app.use(express.json());

//基本路由
app.get("/", (req, res) => {
  res.json({ message: "電子書平台API伺服器運行中" });
});

//API路由
app.use("/api/auth", require("./routes/auth"));
app.use("/api/books", require("./routes/books"));
app.use("/api/orders", require("./routes/orders"));

app.listen(PORT, () => {
  console.log(`伺服器運行在http://localhost:${PORT}`);
});
