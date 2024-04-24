import { APIs, post } from '@/shared/http-service/httpService';

type CreateCertificateData = {
  userId: number;
  type: string;
  validTill: string;
  key: string;
};

const createCertificate = async (certificate: CreateCertificateData) => {
  return post(APIs.CERTIFICATE, certificate);
};

export default createCertificate;
