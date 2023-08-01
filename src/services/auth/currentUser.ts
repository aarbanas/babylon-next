import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

type TokenPayload = {
  username: string;
  sub: string;
  role: string;
  iat: number;
  exp: number;
};

type SessionUser = {
  username: string;
  accessToken: string;
  expiredAt: number;
} & TokenPayload;

export const useCurrentUser = () => {
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const currentUser = Cookies.get('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      const decodedToken: TokenPayload = jwt_decode(user.accessToken);

      setUser({ ...user, ...decodedToken });
    }
  }, []);

  return user;
};
