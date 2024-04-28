'use client';

import { useEffect, useState } from 'react';

import CertificateForm from './components/certificateForm/CertificateForm';
import CertificateTable from './components/certificateTable/CertificateTable';
import { fetchCertificates } from './services/certificates-service';
import { CertificateModel } from './models/certificate.model';
import { useUserSession } from '@/services/auth/useUserSession';
import LoadingSpinner from '@/shared/loadingSpinner/LoadingSpinner';

export default function CertificatePage() {
  const [isLoading, setIsLoading] = useState(true);
  const userSession = useUserSession();
  const [certificates, setCertificates] = useState<CertificateModel[]>([]);

  const handleFetchCertificates = async (id: number) => {
    const certificates = await fetchCertificates(id);
    setCertificates(certificates);
    setIsLoading(false);
  };

  const handleCertificateCreate = (certificate: CertificateModel) => {
    setCertificates([...certificates, certificate]);
  };

  const handleCertificateDelete = (certificate: CertificateModel) => {
    setCertificates(certificates.filter((c) => c.id !== certificate.id));
  };

  useEffect(() => {
    if (!userSession) return;

    handleFetchCertificates(userSession.id);
  }, [userSession]);

  return (
    <div>
      <div className="mb-5">
        <CertificateForm onCertificateCreate={handleCertificateCreate} />
      </div>
      <div className="relative">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <CertificateTable
            certificates={certificates}
            onCertificateDelete={handleCertificateDelete}
          />
        )}
      </div>
    </div>
  );
}
