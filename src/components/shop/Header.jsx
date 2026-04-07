"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategories } from "@/services/categoryService";
import Userinfo from "@/components/shop/auth/userInfo";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await getCategories();
        setCategories(res.data || res);
      } catch (e) {
        setErrors("Lỗi tải danh mục");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <header className="w-full bg-green-600 text-white">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <Link href="/">🥬 FreshFood</Link>
        </h1>

        {/* Menu */}
        <nav>
          <ul className="flex gap-8 items-center font-medium ">
            {/* Trang chủ */}
            <li>
              <Link href="/" className="hover:text-yellow-300">
                Trang chủ
              </Link>
            </li>

            {/* Dropdown Danh mục */}
            <li className="relative group">
              <span className="cursor-pointer hover:text-yellow-300">
                Danh mục ▾
              </span>

              {/* Dropdown */}
              <ul
                className="absolute top-full left-0 mt-2 w-48 bg-white text-black 
               rounded-lg shadow-lg border border-gray-200
               opacity-0 invisible group-hover:opacity-100 
               group-hover:visible transition-all duration-200"
              >
                {loading && (
                  <li className="px-4 py-2 text-gray-500">Đang tải...</li>
                )}

                {categories.map((item) => (
                  <li key={item.cat_id}>
                    <Link
                      href={`/category/${item.cat_id}`}
                      className="block px-4 py-2 hover:bg-green-100"
                    >
                      {item.cat_name}
                    </Link>
                  </li>
                ))}

                {errors && <li className="px-4 py-2 text-red-500">{errors}</li>}
              </ul>
            </li>

            <li>
              <Link href="/products" className="hover:text-yellow-300">
                Sản phẩm
              </Link>
            </li>

            {/* Liên hệ */}
            <li>
              <Link href="/contact" className="hover:text-yellow-300">
                Liên hệ
              </Link>
            </li>
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Userinfo />
          <Link
            href="/cart"
            className="bg-white text-green-600 px-4 py-1 rounded font-semibold"
          >
            🛒 Giỏ hàng
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
