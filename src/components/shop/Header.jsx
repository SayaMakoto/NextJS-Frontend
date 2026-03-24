"use client";

import Link from "next/link";
import { shopMenu } from "@/data/menu";
import Userinfo from "@/components/shop/auth/userInfo";

const Header = () => {
  return (
    <header className="w-full bg-green-600 text-white">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <Link href="/">🥬 FreshFood</Link>
        </h1>

        {/* Menu */}
        <nav>
          <ul className="flex gap-8 items-center font-medium">
            {shopMenu.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-yellow-300">
                  {item.label}
                </Link>
              </li>
            ))}
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
