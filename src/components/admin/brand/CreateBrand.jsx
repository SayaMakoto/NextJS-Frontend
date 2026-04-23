"use client";

import { useState } from "react";

export default function CreateBrand({ onSubmit, loading }) {
  const [formData, setForm] = useState({
    brand_name: "",
    alias: "",
    status: 1,
    trash: 0,
  });

  const [isAliasEdited, setIsAliasEdited] = useState(false);

  // Tạo slug
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "brand_name") {
      const slug = generateSlug(value);

      setForm((prev) => ({
        ...prev,
        brand_name: value,
        alias: isAliasEdited ? prev.alias : slug,
      }));
    } else if (name === "alias") {
      setIsAliasEdited(true);
      setForm((prev) => ({
        ...prev,
        alias: value,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-1 font-medium">Tên thương hiệu</label>
        <input
          name="brand_name"
          value={formData.brand_name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Nhập tên thương hiệu"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Alias</label>
        <input
          name="alias"
          value={formData.alias}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Alias tự động sinh..."
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Trạng thái</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value={1}>Hiển thị</option>
          <option value={0}>Ẩn</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-lg font-semibold"
      >
        {loading ? "Đang thêm..." : "Thêm thương hiệu"}
      </button>
    </form>
  );
}
