"use client";

import CategorySelect from "../select/CategorySelect";
import BrandSelect from "../select/BrandSelect";

export default function UpdateProductForm({
  formData,
  setFormData,
  onSubmit,
  loading,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!formData) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label>Tên sản phẩm</label>
      <input
        name="product_name"
        value={formData.product_name}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <label>Alias</label>
      <input
        name="alias"
        value={formData.alias}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <label>Danh mục</label>
      <CategorySelect
        name="cat_id"
        value={formData.cat_id}
        onChange={handleChange}
      />

      <label>Thương hiệu</label>
      <BrandSelect
        name="brand_id"
        value={formData.brand_id}
        onChange={handleChange}
      />

      <label>Chi tiết sản phẩm</label>
      <textarea
        name="detail"
        value={formData.detail}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <label>Giá</label>
      <input
        name="price"
        value={formData.price}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <label>Giá giảm</label>
      <input
        name="sale_price"
        value={formData.sale_price}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <label>Link ảnh</label>
      <input
        name="image"
        value={formData.image}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <label>Mô tả ngắn</label>
      <input
        name="summary"
        value={formData.summary}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <label>Tag</label>
      <input
        name="tag"
        value={formData.tag}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <label>Ngày ra mắt</label>
      <input
        type="datetime-local"
        name="launch_date"
        value={formData.launch_date}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <label>Trạng thái</label>
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value={1}>Hiển thị</option>
        <option value={0}>Ẩn</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        {loading ? "Đang cập nhật..." : "Cập nhật sản phẩm"}
      </button>
    </form>
  );
}
