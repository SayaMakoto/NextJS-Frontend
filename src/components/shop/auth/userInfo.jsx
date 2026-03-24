"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthProvider";
import { logout } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function Userinfo() {
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();
  const handleLogout = () => {
    logout();
    setUser(null);
    router.push("/login");
  };

  return (
    <div className="flex items-center space-x-4">
      {!user ? (
        <Link
          href="/login"
          className="bg-white text-green-600 px-4 py-1 rounded font-semibold"
        >
          Login
        </Link>
      ) : (
        <>
          <Link
            href="/profile"
            className="bg-white text-green-600 px-4 py-1 rounded font-semibold"
          >
            Profile
          </Link>

          <button
            onClick={handleLogout}
            className="bg-white text-green-600 px-4 py-1 rounded font-semibold"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}
