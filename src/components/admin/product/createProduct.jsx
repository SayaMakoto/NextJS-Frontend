"use client";

import { useState } from "react";

export default function createProduct({ onSubmit, loading }) {
  const [form, setForm] = useState({
    product_name: "",
    alias: "",
    cat_id: "",
    brand_id: "",
    detail: "",
    price: "",
    image: "",
    sale_price: "",
    summary: "",
    tag: "",
    launch_date: "",
    status: 1,
    trash: 0,
    view: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="product_name"
        placeholder="Tên sản phẩm"
        value={form.product_name}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        name="alias"
        placeholder="Alias"
        value={form.alias}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      {/* SELECT dùng value ✅ */}
      <select
        name="cat_id"
        value={form.cat_id}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="">-- Chọn danh mục --</option>
        <option value="1">Điện thoại</option>
        <option value="2">Laptop</option>
      </select>

      <select
        name="brand_id"
        value={form.brand_id}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="">-- Chọn thương hiệu --</option>
        <option value="1">Apple</option>
        <option value="2">Samsung</option>
      </select>

      <textarea
        name="detail"
        placeholder="Chi tiết"
        value={form.detail}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        name="price"
        placeholder="Giá"
        value={form.price}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        name="sale_price"
        placeholder="Giá giảm"
        value={form.sale_price}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      {/* Image = input text ✅ */}
      <input
        name="image"
        placeholder="Link ảnh"
        value={form.image}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        name="summary"
        placeholder="Mô tả ngắn"
        value={form.summary}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        name="tag"
        placeholder="Tag"
        value={form.tag}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="datetime-local"
        name="launch_date"
        value={form.launch_date}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value={1}>Hiển thị</option>
        <option value={0}>Ẩn</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        {loading ? "Đang thêm..." : "Thêm sản phẩm"}
      </button>
    </form>
  );
}
