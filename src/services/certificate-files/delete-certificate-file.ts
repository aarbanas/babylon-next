import { APIs, deleteRequest } from '@/shared/http-service/httpService';

const deleteCertificateFileFromStorage = async (
  certificateKey: string
): Promise<void> => {
  await deleteRequest(
    `${APIs.CERTIFICATE_FILES}/${encodeURIComponent(certificateKey)}`
  );
};

export default deleteCertificateFileFromStorage;
