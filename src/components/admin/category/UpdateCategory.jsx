"use client";

import { useState } from "react";

export default function UpdateCategoryForm({
  formData,
  setFormData,
  onSubmit,
  loading,
}) {
  const [aliasTouched, setAliasTouched] = useState(false);

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

    if (name === "cat_name" && !aliasTouched) {
      setFormData((prev) => ({
        ...prev,
        cat_name: value,
        alias: generateSlug(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAliasChange = (e) => {
    setAliasTouched(true);
    setFormData((prev) => ({
      ...prev,
      alias: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!formData) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-1 font-medium">Tên danh mục</label>
        <input
          name="cat_name"
          value={formData.cat_name || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Alias</label>
        <input
          name="alias"
          value={formData.alias || ""}
          onChange={handleAliasChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Danh mục cha</label>
        <input
          name="parent_id"
          value={formData.parent_id || 0}
          onChange={handleChange}
          className="w-full border p-2 rounded"
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
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        {loading ? "Đang cập nhật..." : "Cập nhật danh mục"}
      </button>
    </form>
  );
}
