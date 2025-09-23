"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/common/store/hooks";
import { resetPassword } from "@/features/auth/authThunks";
import { resetPasswordSchema } from "@/features/auth/schemas";
import { z } from "zod";

interface ForgotPasswordResetFormProps {
  email: string;
  otp: string;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
}

export default function ForgotPasswordResetForm({
  email,
  otp,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}: ForgotPasswordResetFormProps) {
  const [validationErrors, setValidationErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  // Validate password confirmation in real-time
  const validatePasswordMatch = (
    newPassword: string,
    newConfirmPassword: string
  ) => {
    if (newConfirmPassword && newPassword !== newConfirmPassword) {
      setValidationErrors((prev) => ({
        ...prev,
        confirmPassword: "Mật khẩu xác nhận không khớp",
      }));
    } else if (newConfirmPassword && newPassword === newConfirmPassword) {
      setValidationErrors((prev) => ({
        ...prev,
        confirmPassword: undefined,
      }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Clear password validation error when user starts typing
    if (validationErrors.password) {
      setValidationErrors((prev) => ({ ...prev, password: undefined }));
    }

    // Validate password match if confirm password is already entered
    if (confirmPassword) {
      validatePasswordMatch(newPassword, confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    // Validate password match
    validatePasswordMatch(password, newConfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset validation errors
    setValidationErrors({});

    // Validate password requirements
    if (password.length < 6) {
      setValidationErrors({ password: "Mật khẩu phải có ít nhất 6 ký tự" });
      return;
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      setValidationErrors({ confirmPassword: "Mật khẩu xác nhận không khớp" });
      return;
    }

    try {
      // Additional validation with schema
      resetPasswordSchema.parse({ email, otp, password });

      await dispatch(resetPassword({ email, otp, password })).unwrap();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: { password?: string } = {};
        error.issues.forEach((err) => {
          if (err.path[0] === "password") errors.password = err.message;
        });
        setValidationErrors(errors);
      }
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email: {email}
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Mật khẩu mới"
            value={password}
            onChange={handlePasswordChange}
            className="h-12 rounded-lg"
          />
          {validationErrors.password && (
            <p className="text-red-600 text-sm mt-1">
              {validationErrors.password}
            </p>
          )}
        </div>
        <div>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            placeholder="Xác nhận mật khẩu mới"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="h-12 rounded-lg"
          />
          {validationErrors.confirmPassword && (
            <p className="text-red-600 text-sm mt-1">
              {validationErrors.confirmPassword}
            </p>
          )}
        </div>
      </div>
      {error && <div className="text-red-600 text-sm text-center">{error}</div>}
      <div>
        <Button
          type="submit"
          className="w-full h-12 rounded-lg"
          disabled={isLoading}
        >
          {isLoading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
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
  );
}
