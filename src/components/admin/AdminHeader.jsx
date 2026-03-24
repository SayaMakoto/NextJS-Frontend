"use client";

import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthProvider";

const AdminHeader = () => {
  const { setUser } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <header className="w-full h-14 bg-gray-800 text-white flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold">
        <Link href="/admin">🛠 Admin Dashboard</Link>
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-sm">Xin chào, Admin</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="w-9 h-9 rounded-full border"
        />
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded text-sm hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
