import {
  APIs,
  deleteRequest,
  get,
  post,
} from '@/shared/http-service/httpService';
import {
  CertificateModel,
  CreateCertificateModel,
} from '../models/certificate.model';

const fetchCertificates = async (
  userId: number
): Promise<CertificateModel[]> => {
  return get<CertificateModel[]>(`${APIs.CERTIFICATE}?userId=${userId}`);
};

const createCertificate = async (
  certificate: CreateCertificateModel
): Promise<CertificateModel> => {
  return post(APIs.CERTIFICATE, certificate);
};

const downloadCertificate = async (certificateId: number) => {
  const certificateURL = await get<string>(
    `${APIs.CERTIFICATE}/download/${certificateId}`
  );

  const response = await fetch(certificateURL);
  const certificate = await response.arrayBuffer();

  const contentType = response.headers.get('Content-Type') || '';
  const blob = new Blob([certificate], {
    type: contentType,
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `certificate`;
  a.click();
};

const deleteCertificate = async (certificateId: number) => {
  await deleteRequest(`${APIs.CERTIFICATE}/${certificateId}`);
};

const previewCertificate = async (certificateId: number) => {
  const certificateURL = await get<string>(
    `${APIs.CERTIFICATE}/download/${certificateId}`
  );

  const a = document.createElement('a');
  a.href = certificateURL;
  a.target = '_blank';
  a.click();
};

export {
  fetchCertificates,
  createCertificate,
  downloadCertificate,
  deleteCertificate,
  previewCertificate,
};
