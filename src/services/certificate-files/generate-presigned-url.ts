import { APIs, post } from '@/shared/http-service/httpService';

type GeneratePresignedURLData = {
  filename: string;
  size: number;
};

type GeneratePresignedURLResponse = {
  key: string;
  uploadUrl: string;
  contentType: string;
};

const generatePresignedURL = async (
  data: GeneratePresignedURLData
): Promise<GeneratePresignedURLResponse> => {
  return post(`${APIs.CERTIFICATE_FILES}/upload-url`, data);
};

export default generatePresignedURL;
