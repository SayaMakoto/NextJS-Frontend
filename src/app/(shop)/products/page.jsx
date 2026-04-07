"use client";

import { useEffect, useState } from "react";
import ProductList from "@/components/shop/product/ProductList";
import CategoryMenu from "@/components/shop/CategoryMenu";
import Pagination from "@/components/common/Pagination";
import { getProducts } from "@/services/productService";
import { getCategories } from "@/services/categoryService";
import Search from "@/components/shop/Search";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const [params, setParams] = useState({
    page: 1,
    limit: 8,
  });

  // 🌿 Load categories 1 lần
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data || res);
      } catch (err) {
        console.error("Lỗi load categories:", err);
      }
    };

    fetchCategories();
  }, []);

  // 🥬 Load products mỗi khi params đổi
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await getProducts(params);

        setProducts(res.data);
        setTotalPages(res.totalPage);
      } catch (err) {
        console.error("Lỗi load products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [params]);

  return (
    <div className="container mx-auto px-6 py-8 grid grid-cols-4 gap-6">
      {/* Cột trái */}
      <div className="col-span-1 bg-white p-4 rounded shadow">
        <h3 className="font-bold mb-4">Danh mục</h3>

        <CategoryMenu
          categories={categories}
          params={params}
          setParams={setParams}
        />
      </div>

      {/* Cột phải */}
      <div className="col-span-3">
        <Search setParams={setParams} />

        {loading && <p>Đang tải...</p>}

        <ProductList products={products} />

        <div className="mt-6">
          <Pagination
            totalPages={totalPages}
            params={params}
            onChangeParams={setParams}
          />
        </div>
      </div>
    </div>
  );
}
