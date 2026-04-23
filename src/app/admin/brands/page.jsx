"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getBrands, delBrand } from "@/services/brandService";
import AdminTable from "@/components/admin/table/AdminTable";
import Pagination from "@/components/common/Pagination";

export default function BrandPage() {
  const router = useRouter();
  const [brands, setBrands] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const [totalPages, setTotalPages] = useState(1);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);

        const res = await getBrands({ trash: 0 });

        setBrands(res);
        setTotalPages(1);
      } catch (err) {
        console.error("Lỗi load thương hiệu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, [params]);

  const handleEdit = (brand) => {
    router.push(`/admin/brands/${brand.brand_id}`);
  };

  const handleDelete = async (brand) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc muốn xóa "${brand.brand_name}" không?`,
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      setErrors({});
      setSuccess("");

      await delBrand(brand.brand_id);

      setBrands((prev) =>
        prev.filter((item) => item.brand_id !== brand.brand_id),
      );

      setSuccess("Xóa thương hiệu thành công!");
    } catch (error) {
      setErrors({
        message: "Xóa thất bại!",
      });
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: "brand_id", label: "ID" },
    { key: "brand_name", label: "Tên thương hiệu" },
    { key: "alias", label: "Alias" },
    {
      key: "status",
      label: "Trạng thái",
      render: (item) => (item.status === 1 ? "Hiển thị" : "Ẩn"),
    },
  ];

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">🏷️ Danh sách thương hiệu</h2>

        <Link
          href="/admin/brands/create"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Thêm thương hiệu
        </Link>
      </div>

      {success && <div className="mb-3 text-green-600">{success}</div>}
      {errors.message && (
        <div className="mb-3 text-red-600">{errors.message}</div>
      )}

      <AdminTable
        columns={columns}
        data={brands}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        rowKey="brand_id"
      />

      <Pagination
        totalPages={totalPages}
        params={params}
        onChangeParams={setParams}
      />
    </div>
  );
}
