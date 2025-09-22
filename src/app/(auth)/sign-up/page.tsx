"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUp } from "@/features/auth/authThunks";
import { useAppDispatch, useAppSelector } from "@/common/store/hooks";
import Logo from "@/components/logo";
import Link from "next/link";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous form errors
    setFormError("");
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setFormError("Mật khẩu xác nhận không khớp");
      return;
    }
    
    try {
      await dispatch(signUp({ email, password })).unwrap();
      router.push("/");
    } catch {
      // Error is handled in the slice
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <Logo />
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Địa chỉ email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 h-12 rounded-lg"
              />
            </div>
            <div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 h-12 rounded-lg"
              />
            </div>
            <div>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                placeholder="Xác nhận mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 h-12 rounded-lg"
              />
            </div>
          </div>
          {(error || formError) && (
            <div className="text-red-600 text-sm text-center">
              {formError || error}
            </div>
          )}
          <div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-lg"
            >
              {isLoading ? "Đang tạo tài khoản..." : "Đăng ký"}
            </Button>
          </div>
          <div className="text-center">
            <Link
              href="/sign-in"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Đã có tài khoản? Đăng nhập
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
