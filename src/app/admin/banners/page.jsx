"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getBanners, delBanner } from "@/services/bannerService";
import AdminTable from "@/components/admin/table/AdminTable";
import Pagination from "@/components/common/Pagination";

export default function BannerPage() {
  const router = useRouter();
  const [banners, setBanners] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const [totalPages, setTotalPages] = useState(1);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);

        const res = await getBanners({ trash: 0 });

        setBanners(res);
        setTotalPages(1);
      } catch (err) {
        console.error("Lỗi load banner:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, [params]);

  const handleEdit = (banner) => {
    router.push(`/admin/banners/${banner.banner_id}`);
  };

  const handleDelete = async (banner) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc muốn xóa banner "${banner.title}" không?`,
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      setErrors({});
      setSuccess("");

      await delBanner(banner.banner_id);

      setBanners((prev) =>
        prev.filter((item) => item.banner_id !== banner.banner_id),
      );

      setSuccess("Xóa banner thành công!");
    } catch (error) {
      setErrors({
        message: "Xóa thất bại!",
      });
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: "banner_id", label: "ID" },
    { key: "title", label: "Tiêu đề" },
    {
      key: "image_url",
      label: "Hình ảnh",
      render: (item) => (
        <img
          src={item.image_url}
          alt={item.title}
          className="w-24 h-16 object-cover rounded"
        />
      ),
    },
    { key: "link", label: "Link" },
    { key: "position", label: "Vị trí" },
    {
      key: "is_active",
      label: "Kích hoạt",
      render: (item) => (item.is_active ? "Có" : "Không"),
    },
    {
      key: "status",
      label: "Trạng thái",
      render: (item) => (item.status === 1 ? "Hiển thị" : "Ẩn"),
    },
  ];

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">🖼️ Danh sách banner</h2>

        <Link
          href="/admin/banners/create"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Thêm banner
        </Link>
      </div>

      {success && <div className="mb-3 text-green-600">{success}</div>}
      {errors.message && (
        <div className="mb-3 text-red-600">{errors.message}</div>
      )}

      <AdminTable
        columns={columns}
        data={banners}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        rowKey="banner_id"
      />

      <Pagination
        totalPages={totalPages}
        params={params}
        onChangeParams={setParams}
      />
    </div>
  );
}
