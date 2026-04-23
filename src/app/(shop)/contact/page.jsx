"use client";

import { useState } from "react";
import axios from "axios";

export default function Page() {
  const [form, setForm] = useState({
    email: "",
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await axios.post("http://localhost:5000/api/contacts", {
        ...form,
        status: 0, // mặc định chưa xử lý
      });

      setMessage("🎉 Gửi liên hệ thành công! Chúng tôi sẽ phản hồi sớm.");
      setForm({ email: "", title: "", content: "" });
    } catch (err) {
      setError("Gửi thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          📩 Liên hệ với chúng tôi
        </h1>

        {message && (
          <div className="mb-4 text-green-600 font-medium">{message}</div>
        )}
        {error && <div className="mb-4 text-red-600 font-medium">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Tiêu đề</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tiêu đề liên hệ..."
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Nội dung</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              required
              rows={5}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Viết nội dung bạn muốn gửi..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Đang gửi..." : "Gửi liên hệ"}
          </button>
        </form>
      </div>
    </div>
  );
}
