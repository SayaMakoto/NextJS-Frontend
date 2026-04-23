"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProducts, delProduct } from "@/services/productService";
import AdminTable from "@/components/admin/table/AdminTable";
import Pagination from "@/components/common/Pagination";

export default function Page() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const [totalPages, setTotalPages] = useState(1);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts(params);

        setProducts(res.data);
        setTotalPages(res.totalPage);
      } catch (err) {
        console.error("Lỗi load sản phẩm:", err);
      }
    };

    fetchProducts();
  }, [params]);

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

      if (products.length === 1 && params.page > 1) {
        setParams((prev) => ({
          ...prev,
          page: prev.page - 1,
        }));
      } else {
        setParams((prev) => ({ ...prev }));
      }

      setSuccess("Xóa sản phẩm thành công!");
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
        rowKey="product_id"
      />
      <Pagination
        totalPages={totalPages}
        params={params}
        onChangeParams={setParams}
      />
    </div>
  );
}
