"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/logo";
import { verifyEmail, confirmOtp } from "@/features/auth/authThunks";
import { useAppDispatch, useAppSelector } from "@/common/store/hooks";
import AuthErrorAlert from "@/features/auth/components/AuthErrorAlert";
import { clearError } from "@/features/auth/authSlice";

export default function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const [validationErrors, setValidationErrors] = useState<{ otp?: string }>(
    {}
  );
  const [sendCodeLoading, setSendCodeLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const { isLoading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
    if (!email) {
      router.push("/sign-up");
    }
  }, [dispatch, email, router]);

  const handleSendCode = async () => {
    setSendCodeLoading(true);
    try {
      await dispatch(verifyEmail({ email })).unwrap();
    } catch {
    } finally {
      setSendCodeLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      setValidationErrors({ otp: "Vui lòng nhập mã OTP" });
      return;
    }
    setValidationErrors({});
    try {
      await dispatch(confirmOtp({ email, otp })).unwrap();
      router.push("/");
    } catch {}
  };

  if (!email) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <Logo />
        <div className="mt-8 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Xác nhận email</h2>
            <p className="mt-2 text-sm text-gray-600">
              Chúng tôi đã gửi mã OTP đến email: <strong>{email}</strong>
            </p>
          </div>
          <div className="space-y-4">
            <div>
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
          </div>
          {error && <AuthErrorAlert error={error} feature="verify-otp" />}
          <div className="flex justify-between space-x-2">
            <div className="flex-1">
              <Button
                type="button"
                variant="ghost"
                className="w-full h-12 rounded-lg"
                onClick={handleSendCode}
                disabled={sendCodeLoading}
              >
                {sendCodeLoading ? "Đang gửi..." : "Gửi lại mã"}
              </Button>
            </div>
            <Button
              type="button"
              onClick={handleVerifyOtp}
              disabled={isLoading}
              className="flex-1 h-12 rounded-lg"
            >
              {isLoading ? "Đang xác nhận..." : "Xác nhận"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
