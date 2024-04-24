import { FC } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CrossIcon, UniversityIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { type CertificateModel } from '../../models/certificate.model';
import { CertificateTypeEnum } from '../../enums/certificate-types.enum';
import { CERTIFICATE_TRANSLATION } from '../../constants/certificate-translation';

type CertificateTableProps = {
  certificates: CertificateModel[];
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

const CertificateTable: FC<CertificateTableProps> = ({ certificates }) => {
  return (
    <Table>
      <TableHeader>
        <TableHead>Tip</TableHead>
        <TableHead>Važi do</TableHead>
        <TableHead>Akcije</TableHead>
      </TableHeader>
      <TableBody>
        {certificates.map((certificate) => (
          <TableRow key={certificate.id}>
            <TableCell className="flex items-center gap-3">
              {resolveIcon(certificate.type)}
              <span>{CERTIFICATE_TRANSLATION[certificate.type]}</span>
            </TableCell>
            <TableCell>{certificate.validTill.toDateString()}</TableCell>
            <TableCell className="flex gap-3">
              <Button className="flex gap-1">
                <span>Preuzmi</span>
              </Button>
              <Button className="flex gap-1">
                <span>Izbriši</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CertificateTable;
