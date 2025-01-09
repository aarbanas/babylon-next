'use client';

import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import { sendResetPasswordRequest } from '@/services/user/resetPassword';
import { ApiError } from '@/shared/http-service/httpService';

const PasswordReset: FC<{ token: string }> = ({ token }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError('Lozinke se ne podudaraju');
      return;
    }

    if (newPassword.length < 8) {
      setError('Nova lozinka mora imati najmanje 8 znakova');
      return;
    }

    try {
      await sendResetPasswordRequest(token, newPassword);

      setTimeout(() => router.push('/'), 2000); // Redirect to login page after 2 seconds
    } catch (error) {
      if (error instanceof ApiError) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary-color">
      <div className="w-96 rounded bg-white p-8 shadow-md">
        <h1 className="mb-4 text-center text-2xl font-bold">
          Postavljanje nove lozinke
        </h1>
        <form onSubmit={handlePasswordReset}>
          <div className="mb-4">
            <Label htmlFor="new-password">Nova Lozinka</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="confirm-password">Potvrdi Novu Lozinku</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Spremi
          </Button>
        </form>
        {error && (
          <div className="mt-2 flex items-center space-x-2 text-red-500">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;
