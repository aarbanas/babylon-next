'use client';
import PasswordReset from '@/components/reset-password';
import { useUserSession } from '@/services/auth/useUserSession';
import { useSearchParams } from 'next/navigation';

const ResetPassword = () => {
  const userSession = useUserSession();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  // If the user is not logged in, we assume they're here with a valid token
  if (!userSession && token) {
    return <PasswordReset token={token} />;
  }

  // If the user is logged in, we don't allow password reset
  return (
    <div>You are already logged in. Please log out to reset your password.</div>
  );
};

export default ResetPassword;
