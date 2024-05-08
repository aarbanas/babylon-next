import { post } from '@/shared/http-service/httpService';
import Cookies from 'js-cookie';

const login = async (
  username: string,
  password: string,
  isAdmin = false
): Promise<boolean> => {
  const login = await post<{ accessToken: string; expiredAt: number }>(
    '/auth/login',
    {
      username,
      password,
      isAdmin,
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
