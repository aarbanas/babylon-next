import { APIs, post } from '@/shared/http-service/httpService';

export const resetForgottenPassword = async (email: string) => {
  return post(`${APIs.RESET_PASSWORD}/forgot`, { email });
};

export const sendResetPasswordRequest = async (
  token: string,
  newPassword: string
) => {
  return post(`${APIs.RESET_PASSWORD}?token=${token}`, {
    password: newPassword,
  });
};
