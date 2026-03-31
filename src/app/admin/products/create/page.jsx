"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createProduct } from "@/services/productService";
import CreateProduct from "@/components/admin/product/CreateProduct";
import BackButton from "@/components/common/BackButton";

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (form) => {
    try {
      setLoading(true);

      await createProduct({
        ...form,
        price: Number(form.price),
        sale_price: Number(form.sale_price),
        cat_id: Number(form.cat_id),
        brand_id: Number(form.brand_id),
        view: Number(form.view),
      });

      alert("Thêm thành công");
      router.push("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow">
        <div className="flex items-center justify-between mb-6">
          <BackButton />
          <h1 className="text-xl font-bold">Thêm sản phẩm</h1>
        </div>

        <CreateProduct onSubmit={handleCreate} loading={loading} />
      </div>
    </div>
  );
}
