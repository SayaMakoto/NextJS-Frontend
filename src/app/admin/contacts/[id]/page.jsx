"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getContactById, updateContact } from "@/services/contactService";
import BackButton from "@/components/common/BackButton";

export default function UpdateContactPage() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getContactById(id);
      setFormData(data);
    };

    if (id) fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await updateContact(id, {
      ...formData,
      status: Number(formData.status),
    });

    alert("Cập nhật thành công");
    router.push("/admin/contacts");
  };

  if (!formData) return <p className="text-center mt-10">Đang tải...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="flex justify-between mb-6">
          <BackButton />
          <h1 className="text-2xl font-bold">Chi tiết liên hệ</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label>Email</label>
            <input
              value={formData.email}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          <div>
            <label>Tiêu đề</label>
            <input
              value={formData.title}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          <div>
            <label>Nội dung</label>
            <textarea
              value={formData.content}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
              rows={5}
            />
          </div>

          <div>
            <label>Trạng thái</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full border p-2 rounded"
            >
              <option value={0}>Chưa xử lý</option>
              <option value={1}>Đã xử lý</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            {loading ? "Đang cập nhật..." : "Cập nhật"}
          </button>
        </form>
      </div>
    </div>
  );
}
