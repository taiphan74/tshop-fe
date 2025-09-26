"use client";

import { useState } from "react";
import Logo from "@/components/logo";
import ForgotPasswordEmailForm from "@/features/auth/components/forms/ForgotPasswordEmailForm";
import ForgotPasswordResetForm from "@/features/auth/components/forms/ForgotPasswordResetForm";

type Step = "email-otp" | "reset-password";

export default function ForgotPassword() {
  const [currentStep, setCurrentStep] = useState<Step>("email-otp");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNextStep = () => {
    setCurrentStep("reset-password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <Logo />
        {currentStep === "email-otp" ? (
          <ForgotPasswordEmailForm
            email={email}
            setEmail={setEmail}
            otp={otp}
            setOtp={setOtp}
            onNext={handleNextStep}
          />
        ) : (
          <ForgotPasswordResetForm
            email={email}
            otp={otp}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
          />
        )}
      </div>
    </div>
  );
}
