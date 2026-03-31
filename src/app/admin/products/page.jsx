"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProducts, delProduct } from "@/services/productService";
import AdminTable from "@/components/admin/table/AdminTable";

export default function Page() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts({ trash: 0 });
        setProducts(res.data || res);
      } catch (err) {
        console.error("Lỗi load sản phẩm:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    router.push(`/admin/products/${product.product_id}`);
  };

  const handleDelete = async (product) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc muốn xóa "${product.product_name}" không?`,
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      setErrors({});
      setSuccess("");

      await delProduct(product.product_id);

      setProducts((prev) =>
        prev.filter((item) => item.product_id !== product.product_id),
      );

      setSuccess("Xóa sản phẩm thành công!");
    } catch (error) {
      setErrors({
        message: "Xóa thất bại!",
      });
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: "product_id", label: "ID" },
    { key: "product_name", label: "Tên sản phẩm" },
    {
      key: "price",
      label: "Giá",
      render: (item) => Number(item.price).toLocaleString() + " đ",
    },
    { key: "cat_name", label: "Danh mục" },
    {
      key: "status",
      label: "Trạng thái",
      render: (item) => (item.status === 1 ? "Hiển thị" : "Ẩn"),
    },
  ];

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">📦 Danh sách sản phẩm</h2>

        <Link
          href="/admin/products/create"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Thêm sản phẩm
        </Link>
      </div>

      {success && <div className="mb-3 text-green-600">{success}</div>}
      {errors.message && (
        <div className="mb-3 text-red-600">{errors.message}</div>
      )}

      <AdminTable
        columns={columns}
        data={products}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
