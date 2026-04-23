"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCategoryById, updateCategory } from "@/services/categoryService";
import UpdateCategoryForm from "@/components/admin/category/UpdateCategory";
import BackButton from "@/components/common/BackButton";

export default function UpdateCategoryPage() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getCategoryById(id);

        setFormData({
          cat_name: data.cat_name,
          alias: data.alias,
          parent_id: data.parent_id,
          status: data.status,
          trash: data.trash,
        });
      } catch (e) {
        setErrors({ message: "Lỗi tải dữ liệu" });
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      setLoading(true);

      await updateCategory(id, {
        ...data,
        status: Number(data.status),
        trash: Number(data.trash),
      });

      alert("Cập nhật thành công");
      router.push("/admin/categories");
    } catch (e) {
      setErrors({ message: "Cập nhật thất bại" });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData)
    return <p className="text-center mt-10">Đang tải...</p>;

  if (errors.message)
    return <p className="text-center text-red-500">{errors.message}</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <BackButton />
          <h1 className="text-2xl font-bold text-gray-800">
            Chỉnh sửa danh mục
          </h1>
        </div>

        <UpdateCategoryForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleUpdate}
          loading={loading}
        />
      </div>
    </div>
  );
}
