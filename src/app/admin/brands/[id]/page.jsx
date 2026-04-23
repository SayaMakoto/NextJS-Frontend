"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getBrandById, updateBrand } from "@/services/brandService";
import UpdateBrandForm from "@/components/admin/brand/UpdateBrand";
import BackButton from "@/components/common/BackButton";

export default function UpdateBrandPage() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getBrandById(id);

        setFormData({
          brand_name: data.brand_name,
          alias: data.alias,
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

      await updateBrand(id, {
        ...data,
        status: Number(data.status),
        trash: Number(data.trash),
      });

      alert("Cập nhật thương hiệu thành công");
      router.push("/admin/brands");
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
            Chỉnh sửa thương hiệu
          </h1>
        </div>

        <UpdateBrandForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleUpdate}
          loading={loading}
        />
      </div>
    </div>
  );
}
