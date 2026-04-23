"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCategories, delCategory } from "@/services/categoryService";
import AdminTable from "@/components/admin/table/AdminTable";
import Pagination from "@/components/common/Pagination";

export default function Page() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const [totalPages, setTotalPages] = useState(1);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories({ trash: 0 });
        setCategories(res);
        setTotalPages(1);
      } catch (err) {
        console.error("Lỗi load danh mục:", err);
      }
    };

    fetchCategories();
  }, [params]);

  const handleEdit = (category) => {
    router.push(`/admin/categories/${category.cat_id}`);
  };

  const handleDelete = async (category) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc muốn xóa "${category.cat_name}" không?`,
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      setErrors({});
      setSuccess("");

      await delCategory(category.cat_id);

      if (categories.length === 1 && params.page > 1) {
        setParams((prev) => ({
          ...prev,
          page: prev.page - 1,
        }));
      } else {
        setParams((prev) => ({ ...prev }));
      }

      setSuccess("Xóa danh mục thành công!");
    } catch (error) {
      setErrors({
        message: "Xóa thất bại!",
      });
    } finally {
      setLoading(false);
    }
  };
  console.log(params);
  const columns = [
    { key: "cat_id", label: "ID" },
    { key: "cat_name", label: "Tên danh mục" },
    { key: "parent_id", label: "Danh mục cha" },
    {
      key: "status",
      label: "Trạng thái",
      render: (item) => (item.status === 1 ? "Hiển thị" : "Ẩn"),
    },
  ];

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">📦 Danh sách danh mục</h2>

        <Link
          href="/admin/categories/create"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Thêm danh mục
        </Link>
      </div>

      {success && <div className="mb-3 text-green-600">{success}</div>}
      {errors.message && (
        <div className="mb-3 text-red-600">{errors.message}</div>
      )}

      <AdminTable
        columns={columns}
        data={categories}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        rowKey="cat_id"
      />
      <Pagination
        totalPages={totalPages}
        params={params}
        onChangeParams={setParams}
      />
    </div>
  );
}
