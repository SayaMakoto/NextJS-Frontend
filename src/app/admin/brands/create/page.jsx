"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createBrand } from "@/services/brandService";
import CreateBrandForm from "@/components/admin/brand/CreateBrand";
import BackButton from "@/components/common/BackButton";

export default function CreateBrandPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleCreate = async (formData) => {
    try {
      setLoading(true);
      setSuccess("");
      setError("");

      await createBrand(formData);

      setSuccess("Thêm thương hiệu thành công");

      setTimeout(() => {
        router.push("/admin/brands");
      }, 1000);
    } catch (err) {
      console.error(err);
      setError("Có lỗi xảy ra khi thêm thương hiệu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <BackButton />
          <h1 className="text-2xl font-bold text-gray-800">
            Thêm thương hiệu mới
          </h1>
        </div>

        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <CreateBrandForm onSubmit={handleCreate} loading={loading} />
      </div>
    </div>
  );
}
