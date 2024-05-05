'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CrossIcon, UniversityIcon } from 'lucide-react';
import { FC, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import {
  deleteCertificate,
  downloadCertificate,
} from '../../services/certificates-service';
import { type CertificateDto } from '../../models/certificate.model';
import { CertificateTypeEnum } from '../../enums/certificate-types.enum';
import { CERTIFICATE_TRANSLATION } from '../../constants/certificate-translation';

type CertificateTableProps = {
  certificates: CertificateDto[];
  onCertificateDelete: (certificate: CertificateDto) => void;
};

export const resolveIcon = (type: CertificateTypeEnum) => {
  if (type === CertificateTypeEnum.REDCROSS) {
    return <CrossIcon color="red" />;
  }

  if (type === CertificateTypeEnum.UNIVERSITY) {
    return <UniversityIcon color="gray" />;
  }

  return <></>;
};

// TODO: Look into passing certificates as a prop
const CertificateTable: FC<CertificateTableProps> = ({
  certificates,
  onCertificateDelete,
}) => {
  const handleDownload = useCallback(async (certificate: CertificateDto) => {
    await downloadCertificate(certificate.id);
  }, []);

  const handleDelete = async (certificate: CertificateDto) => {
    if (!confirm('Da li ste sigurni da želite izbrisati ovaj certifikat?'))
      return;

    await deleteCertificate(certificate.id);
    onCertificateDelete(certificate);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tip</TableHead>
          <TableHead>Važi do</TableHead>
          <TableHead>Akcije</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {certificates.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3}>Nema certifikata</TableCell>
          </TableRow>
        ) : (
          certificates.map((certificate) => (
            <TableRow key={certificate.id}>
              <TableCell className="flex items-center gap-3">
                {resolveIcon(certificate.type)}
                <span>{CERTIFICATE_TRANSLATION[certificate.type]}</span>
              </TableCell>
              <TableCell>
                {new Date(certificate.validTill).toDateString()}
              </TableCell>
              <TableCell className="flex gap-3">
                <Button
                  onClick={() => handleDownload(certificate)}
                  className="flex gap-1"
                  variant="default">
                  <span>Preuzmi</span>
                </Button>
                <Button
                  onClick={() => handleDelete(certificate)}
                  className="flex gap-1"
                  variant="destructive">
                  <span>Izbriši</span>
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default CertificateTable;
