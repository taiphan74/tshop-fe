import React from 'react';
import { AuthError } from '../types';
import { AlertCircle, UserX, Lock, Mail, Key } from 'lucide-react';

interface AuthErrorAlertProps {
  error: AuthError | null;
  feature: 'signin' | 'signup' | 'forgot-password' | 'reset-password' | 'verify-otp';
}

const AuthErrorAlert: React.FC<AuthErrorAlertProps> = ({ error, feature }) => {
  if (!error) return null;

  const getErrorMessage = (statusCode: number, feature: string) => {
    // Sign In errors
    if (feature === 'signin') {
      switch (statusCode) {
        case 404:
        case 401:
          return { message: 'Tài khoản hoặc mật khẩu không chính xác. Vui lòng thử lại.', icon: Lock };
        case 400:
          return { message: 'Thông tin đăng nhập không hợp lệ. Vui lòng kiểm tra lại.', icon: AlertCircle };
        default:
          return { message: error.message || 'Đăng nhập thất bại. Vui lòng thử lại.', icon: AlertCircle };
      }
    }

    // Sign Up errors
    if (feature === 'signup') {
      switch (statusCode) {
        case 409:
          return { message: 'Email đã được sử dụng. Vui lòng sử dụng email khác.', icon: Mail };
        case 400:
          return { message: 'Thông tin đăng ký không hợp lệ. Vui lòng kiểm tra lại.', icon: AlertCircle };
        default:
          return { message: error.message || 'Đăng ký thất bại. Vui lòng thử lại.', icon: AlertCircle };
      }
    }

    // Forgot Password errors
    if (feature === 'forgot-password') {
      switch (statusCode) {
        case 404:
          return { message: 'Email không tồn tại trong hệ thống.', icon: Mail };
        case 400:
          return { message: 'Email không hợp lệ. Vui lòng kiểm tra lại.', icon: AlertCircle };
        default:
          return { message: error.message || 'Gửi yêu cầu đặt lại mật khẩu thất bại.', icon: AlertCircle };
      }
    }

    // Reset Password errors
    if (feature === 'reset-password') {
      switch (statusCode) {
        case 400:
          return { message: 'Thông tin đặt lại mật khẩu không hợp lệ.', icon: AlertCircle };
        case 404:
          return { message: 'Yêu cầu đặt lại mật khẩu không tồn tại hoặc đã hết hạn.', icon: Key };
        default:
          return { message: error.message || 'Đặt lại mật khẩu thất bại.', icon: AlertCircle };
      }
    }

    // Verify OTP errors
    if (feature === 'verify-otp') {
      switch (statusCode) {
        case 400:
          return { message: 'Mã OTP không hợp lệ hoặc đã hết hạn.', icon: Key };
        case 404:
          return { message: 'Yêu cầu xác thực không tồn tại.', icon: AlertCircle };
        default:
          return { message: error.message || 'Xác thực OTP thất bại.', icon: AlertCircle };
      }
    }

    // Default error
    return { message: error.message || 'Có lỗi xảy ra. Vui lòng thử lại.', icon: AlertCircle };
  };

  const { message, icon: IconComponent } = getErrorMessage(error.statusCode, feature);

  return (
    <p className="text-xs text-red-500 font-medium flex items-center mt-2">
      <IconComponent size={14} className="mr-2" />
      {message}
    </p>
  );
};

export default AuthErrorAlert;