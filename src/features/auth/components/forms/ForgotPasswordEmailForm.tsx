"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/common/store/hooks";
import { forgotPassword, confirmOtp } from "@/features/auth/authThunks";
import {
  forgotPasswordSchema,
  confirmOtpSchema,
} from "@/features/auth/schemas";
import { z } from "zod";
import AuthErrorAlert from "@/features/auth/components/AuthErrorAlert";

interface ForgotPasswordEmailFormProps {
  email: string;
  setEmail: (email: string) => void;
  otp: string;
  setOtp: (otp: string) => void;
  onNext: () => void;
}

export default function ForgotPasswordEmailForm({
  email,
  setEmail,
  otp,
  setOtp,
  onNext,
}: ForgotPasswordEmailFormProps) {
  const [sendCodeLoading, setSendCodeLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    otp?: string;
  }>({});

  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const handleSendCode = async () => {
    try {
      // Validate email
      forgotPasswordSchema.parse({ email });
      setValidationErrors({});

      setSendCodeLoading(true);
      await dispatch(forgotPassword({ email })).unwrap();
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors({ email: error.issues[0].message });
      }
    } finally {
      setSendCodeLoading(false);
    }
  };

  const handleSubmitOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate both email and otp
      confirmOtpSchema.parse({ email, otp });
      setValidationErrors({});

      await dispatch(confirmOtp({ email, otp })).unwrap();
      // Move to password reset step
      onNext();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: { email?: string; otp?: string } = {};
        error.issues.forEach((err) => {
          if (err.path[0] === "email") errors.email = err.message;
          if (err.path[0] === "otp") errors.otp = err.message;
        });
        setValidationErrors(errors);
      }
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmitOtp}>
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
          {validationErrors.email && (
            <p className="text-red-600 text-sm mt-1">
              {validationErrors.email}
            </p>
          )}
        </div>
        <div className="flex justify-between space-x-2">
          <div className="flex-1">
            <Input
              id="otp"
              name="otp"
              type="text"
              required
              placeholder="Mã OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="h-12 rounded-lg"
            />
            {validationErrors.otp && (
              <p className="text-red-600 text-sm mt-1">
                {validationErrors.otp}
              </p>
            )}
          </div>
          <Button
            type="button"
            variant="ghost"
            className="h-12 px-4 rounded-lg"
            onClick={handleSendCode}
            disabled={sendCodeLoading}
          >
            {sendCodeLoading ? "Đang gửi..." : "Gửi mã"}
          </Button>
        </div>
      </div>
      {error && (
        <AuthErrorAlert
          error={error}
          feature={otp ? "verify-otp" : "forgot-password"}
        />
      )}
      <div>
        <Button
          type="submit"
          className="w-full h-12 rounded-lg"
          disabled={isLoading}
        >
          {isLoading ? "Đang xử lý..." : "Xác nhận"}
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
