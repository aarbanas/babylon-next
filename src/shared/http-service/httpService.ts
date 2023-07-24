import axios from 'axios';

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const generateUrl = (path: string) => `${baseUrl}${path}`;

const http = axios.create();

export const get = async (path: string, signal?: AbortSignal) => {
  const { data } = await http.get(generateUrl(path), { signal });
  return data.data;
};
