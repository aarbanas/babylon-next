import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const generateUrl = (path: string) => `${baseUrl}${path}`;

export enum APIs {
  USER = '/users',
  CERTIFICATE = '/certificates',
  CERTIFICATE_FILES = '/certificate-files',
}

export class ApiError {
  constructor(
    public message: string,
    public status: number,
    public code: string
  ) {}
}

const errorResolver = (error: unknown): ApiError => {
  if (!(error instanceof AxiosError)) throw error;

  if (!error.response)
    return new ApiError('Server is not responding', 500, 'unknown_error');

  const { data, status } = error.response;
  let message = 'Nešto je pošlo po zlu';
  let code = 'unknown_error';
  if ('message' in data) message = data.message;
  if ('error' in data) code = data.error;

  return new ApiError(message, status, code);
};

const http = axios.create();

export const get = async <T>(path: string, signal?: AbortSignal) => {
  try {
    const { data } = await http.get<T>(generateUrl(path), { signal });
    return data;
  } catch (error) {
    throw errorResolver(error);
  }
};

export const post = async <T>(
  path: string,
  postData: { [p: string | number]: unknown } | FormData
) => {
  try {
    const { data } = await http.post<T>(generateUrl(path), postData);
    return data;
  } catch (error) {
    throw errorResolver(error);
  }
};

export const patch = async <T>(
  path: string,
  postData: { [p: string | number]: unknown } | FormData
) => {
  try {
    const { data } = await http.patch<T>(generateUrl(path), postData);
    return data;
  } catch (error) {
    throw errorResolver(error);
  }
};

export const deleteRequest = async <T>(path: string) => {
  try {
    const { data } = await http.delete<T>(generateUrl(path));
    return data;
  } catch (error) {
    throw errorResolver(error);
  }
};

http.interceptors.request.use((config) => {
  const currentUser = Cookies.get('currentUser');
  if (currentUser)
    config.headers.Authorization = `Bearer ${
      JSON.parse(currentUser || '')?.accessToken || ''
    }`;

  return config;
});

export default http;
