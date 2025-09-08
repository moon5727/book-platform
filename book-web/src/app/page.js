"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  // ✅ 新增：切換註冊/登入模式
  const [isLogin, setIsLogin] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    phone: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ 修改：處理註冊或登入
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/register";

      const data = isLogin
        ? { username: formData.username, password: formData.password }
        : formData;

      const response = await axios.post(url, data);

      if (isLogin && response.data.token) {
        setMessage(`登入成功！歡迎 ${response.data.user.name}`);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "操作失敗");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        電子書平台 - {isLogin ? "會員登入" : "會員註冊"}
      </h1>

      {/* ✅ 新增：切換按鈕 */}
      <div className="mb-4">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          切換到{isLogin ? "註冊" : "登入"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        {/* ✅ 修改：登入時只顯示帳號密碼 */}
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="姓名"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        )}

        <input
          type="text"
          name="username"
          placeholder="帳號"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="密碼"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {!isLogin && (
          <>
            <input
              type="email"
              name="email"
              placeholder="信箱"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="電話"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {isLogin ? "登入" : "註冊"}
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
