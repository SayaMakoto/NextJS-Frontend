"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthProvider";
import AdminHeader from "@/components/admin/AdminHeader";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      router.push("/");
      return;
    }

    const parsedUser = JSON.parse(savedUser);

    if (parsedUser.user_type !== "admin") {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="h-screen flex flex-col">
      <div className="shrink-0">
        <AdminHeader />
      </div>

      <div className="flex flex-1">
        <aside className="w-64 bg-gray-900 text-white">
          <Sidebar />
        </aside>

        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
