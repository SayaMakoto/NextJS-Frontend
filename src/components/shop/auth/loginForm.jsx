"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Link from "next/link";
import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { validateLogin } from "@/utils/validators";
import { login } from "@/services/authService";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validateErrors = validateLogin({ username, pass });
    setErrors(validateErrors);

    if (Object.keys(validateErrors).length > 0) return;

    try {
      setLoading(true);

      const res = await login({ username, pass });

      setUser(res.user);

      console.log("Login success:", res.user);
      console.log("USER:", res.user);
      console.log("TYPE:", res.user.user_type);
      setErrors({});
      if (res.user.user_type === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (e) {
      const msg =
        e?.response?.data?.error ||
        e?.response?.data?.message ||
        "Đăng nhập thất bại";

      setErrors({ message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng nhập</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <Input
            type="text"
            placeholder="Tên tài khoản"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* Password */}
          <Input
            type="password"
            placeholder="Mật khẩu"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>

          {errors.message && (
            <p className="text-red-500 text-sm text-center">{errors.message}</p>
          )}

          <p className="text-center mt-4 text-gray-600">
            Quên mật khẩu?{" "}
            <Link href="#" className="text-green-500 hover:text-green-600">
              Nhấn tại đây
            </Link>
          </p>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Chưa có tài khoản?{" "}
          <Link
            href="/register"
            className="text-green-500 hover:text-green-600"
          >
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
