import { APIs, post } from '@/shared/http-service/httpService';

const uploadProfilePhoto = async (formData: FormData) => {
  return post<{ profilePhoto: string }>(`${APIs.USER}/upload-avatar`, formData);
};

export default uploadProfilePhoto;
