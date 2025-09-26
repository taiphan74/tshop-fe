"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/logo";
import { signIn } from "@/features/auth/authThunks";
import { useAppDispatch, useAppSelector } from "@/common/store/hooks";
import { loginSchema } from "@/features/auth/schemas";
import Link from "next/link";
import AuthErrorAlert from "@/features/auth/components/AuthErrorAlert";
import { clearError } from "@/features/auth/authSlice";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      // Set error to the first validation error
      setFormError(result.error.issues[0].message);
      return;
    }
    
    // Clear form error
    setFormError("");
    
    try {
      await dispatch(signIn({ email, password })).unwrap();
      if (user && !user.is_email_verified) {
        router.push(`/verify-email?email=${encodeURIComponent(user.email)}`);
      } else {
        router.push("/");
      }
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
          </div>
          {error && (
            <AuthErrorAlert
              error={error}
              feature="signin"
            />
          )}
          {formError && (
            <div className="text-red-600 text-sm text-center">{formError}</div>
          )}
          <div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-lg"
            >
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </div>
          <div className="flex justify-between items-center">
            <Link
              href="/sign-up"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Đăng ký
            </Link>
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Quên mật khẩu?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
