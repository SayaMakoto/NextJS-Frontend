"use client";

import { useState } from "react";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { validateRegister } from "@/utils/validators";
import { register } from "@/services/authService";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate
    const validateErrors = validateRegister({
      username,
      fullname,
      email,
      pass,
      confirm_password,
    });

    setErrors(validateErrors);
    if (Object.keys(validateErrors).length > 0) return;

    const data = {
      username,
      fullname,
      email,
      pass,
    };

    try {
      setLoading(true);

      let res = await register(data);
      console.log(res);

      setSuccess("Register success");
      setErrors({});

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (e) {
      setErrors({ message: e.data.error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng ký</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <Input
              type="text"
              placeholder="Tên tài khoản"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

          {/* Fullname */}
          <div>
            <Input
              type="text"
              placeholder="Họ tên đầy đủ"
              value={fullname}
              required
              onChange={(e) => setFullname(e.target.value)}
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm">{errors.fullname}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <Input
              type="password"
              placeholder="Mật khẩu"
              value={pass}
              required
              onChange={(e) => setPass(e.target.value)}
            />
            {errors.pass && (
              <p className="text-red-500 text-sm">{errors.pass}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <Input
              type="password"
              placeholder="Nhập lại mật khẩu"
              value={confirm_password}
              required
              onChange={(e) => setConfirm_password(e.target.value)}
            />
            {errors.confirm_password && (
              <p className="text-red-500 text-sm">{errors.confirm_password}</p>
            )}
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Đang xử lý..." : "Đăng ký"}
          </Button>
          {success && (
            <p className="text-green-500 text-sm text-center">{success}</p>
          )}
          {errors.message && (
            <p className="text-red-500 text-sm text-center">{errors.message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
