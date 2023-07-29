import axios from 'axios';
import Cookies from 'js-cookie';

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const generateUrl = (path: string) => `${baseUrl}${path}`;

export enum APIs {
  USER = '/users',
  CERTIFICATE = '/certificates',
}

const http = axios.create();

export const get = async (path: string, signal?: AbortSignal) => {
  const { data } = await http.get(generateUrl(path), { signal });
  return data;
};

export const post = async <T>(
  path: string,
  postData: { [p: string | number]: unknown }
) => {
  const { data } = await http.post<T>(generateUrl(path), postData);
  return data;
};

http.interceptors.request.use((config) => {
  const currentUser = Cookies.get('currentUser');
  if (currentUser)
    config.headers.Authorization = `Bearer ${
      JSON.parse(currentUser || '')?.accessToken || ''
    }`;

  return config;
});
