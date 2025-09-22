"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/logo";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No logic implemented
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
                id="otp"
                name="otp"
                type="text"
                required
                placeholder="Mã OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 h-12 rounded-lg"
              />
            </div>
          </div>
          {/* {error && (
        <div className="text-red-600 text-sm text-center">
          {error}
        </div>
        )} */}
          <div>
            <Button type="submit" className="w-full h-12 rounded-lg">
              Gửi
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
