import { post } from '@/shared/http-service/httpService';
import Cookies from 'js-cookie';

const login = async (username: string, password: string): Promise<boolean> => {
  const login = await post<{ accessToken: string; expiredAt: number }>(
    '/auth/login',
    {
      username,
      password,
    }
  );
  if (!login) return false;

  const user = {
    username,
    accessToken: login.accessToken,
    expiredAt: login.expiredAt,
  };
  Cookies.set('currentUser', JSON.stringify(user));

  return true;
};

export default login;
