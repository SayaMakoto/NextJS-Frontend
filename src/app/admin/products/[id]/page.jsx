"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProductById, updateProduct } from "@/services/productService";
import UpdateProductForm from "@/components/admin/product/UpdateProduct";
import BackButton from "@/components/common/BackButton";

export default function UpdateProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await getProductById(id);

        setFormData({
          product_name: data.product_name,
          alias: data.alias,
          cat_id: data.cat_id,
          brand_id: data.brand_id,
          detail: data.detail,
          price: data.price,
          sale_price: data.sale_price,
          image: data.image,
          launch_date: data.launch_date,
          tag: data.tag,
          summary: data.summary,
          status: data.status,
          trash: data.trash,
          view: data.view,
        });
      } catch (e) {
        setErrors({ message: e?.data?.error || "Lỗi tải dữ liệu" });
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      setLoading(true);

      await updateProduct(id, {
        ...data,
        price: Number(data.price),
        sale_price: Number(data.sale_price),
        cat_id: Number(data.cat_id),
        brand_id: Number(data.brand_id),
        status: Number(data.status),
        trash: Number(data.trash),
        view: Number(data.view),
      });

      alert("Cập nhật thành công");
      router.push("/admin/products");
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
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow">
        <div className="flex items-center justify-between mb-6">
          <BackButton />
          <h1 className="text-xl font-bold">Sửa sản phẩm</h1>
        </div>

        <UpdateProductForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleUpdate}
          loading={loading}
        />
      </div>
    </div>
  );
}
