'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { register } from '@/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/common/store/hooks';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(register({ email, password })).unwrap();
      router.push('/');
    } catch {
      // Error is handled in the slice
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Tạo tài khoản của bạn
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Họ và tên
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Địa chỉ email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}
          <div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Đang tạo tài khoản...' : 'Đăng ký'}
            </Button>
          </div>
          <div className="text-center">
            <a href="/sign-in" className="text-sm text-blue-600 hover:text-blue-500">
              Đã có tài khoản? Đăng nhập
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
