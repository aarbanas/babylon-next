'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  BookUser,
  CheckCircle2,
  CrossIcon,
  UniversityIcon,
  XCircle,
} from 'lucide-react';
import React, { FC, useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  deleteCertificate,
  downloadCertificate,
  updateStatus,
} from '../../services/certificates-service';
import { type CertificateDto } from '../../models/certificate.model';
import { CertificateTypeEnum } from '../../enums/certificate-types.enum';
import { CERTIFICATE_TRANSLATION } from '../../constants/certificate-translation';
import Modal from '@/shared/modal/Modal';
import { useForm } from 'react-hook-form';
import styles from '@/app/profile/certificates/components/certificateForm/CertificateForm.module.css';
import Form from '@/shared/form/Form';
import { Label } from '@/components/ui/label';
import * as Switch from '@radix-ui/react-switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'react-toastify';
import { useCurrentUser } from '@/services/auth/currentUser';
import { Role } from '@/app/register/types';

type AllowedTableActions = 'delete' | 'download' | 'update';
type Columns = 'type' | 'validTill' | 'status' | 'actions';

type CertificateTableProps = {
  certificates: CertificateDto[];
  onCertificateDelete?: (certificate: CertificateDto) => void;
  allowedActions?: AllowedTableActions[];
  hiddenColumns?: Columns[];
};

export const resolveIcon = (type: CertificateTypeEnum) => {
  if (type === CertificateTypeEnum.REDCROSS) {
    return <CrossIcon color="red" />;
  }

  if (type === CertificateTypeEnum.UNIVERSITY) {
    return <UniversityIcon color="gray" />;
  }

  if (type === CertificateTypeEnum.ID) {
    return <BookUser color="gray" />;
  }

  return <></>;
};

const UpdateCertificateStatusModal: React.FC<{
  id: number;
  status: boolean;
  onClose: VoidFunction;
}> = ({ id, status, onClose }) => {
  const form = useForm();
  const [active, setActive] = useState(status);

  const onSubmit = async () => {
    try {
      await updateStatus(id, active);

      toast('User certificate updated', { type: 'success' });
    } catch (error) {
      toast('Something went wrong. Please try again', { type: 'error' });
    } finally {
      onClose();
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Update certificate status</CardTitle>
        </CardHeader>
        <CardContent className="flex space-y-4">
          <Form form={form} onSubmit={onSubmit} className={styles.form}>
            <div className="grid gap-2">
              <Label htmlFor="active">Active</Label>
              <Switch.Root
                className="bg-blackA6 shadow-blackA4 relative h-[25px] w-[42px] cursor-pointer rounded-full shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black"
                id="active"
                checked={active}
                onCheckedChange={setActive}>
                <Switch.Thumb className="shadow-blackA4 block h-[21px] w-[21px] translate-x-0.5 rounded-full bg-white shadow-[0_2px_2px] transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
              </Switch.Root>
            </div>
            <Button className="mt-3" type="submit">
              Update
            </Button>
          </Form>
        </CardContent>
      </Card>
    </Modal>
  );
};

const CertificateTable: FC<CertificateTableProps> = ({
  certificates,
  onCertificateDelete,
  allowedActions = [],
  hiddenColumns = [],
}) => {
  const currentUser = useCurrentUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateInfo, setUpdateInfo] = useState<{
    id: number;
    status: boolean;
  } | null>(null);
  const handleDownload = useCallback(async (certificate: CertificateDto) => {
    await downloadCertificate(certificate.id);
  }, []);

  const handleDelete = async (certificate: CertificateDto) => {
    if (!confirm('Da li ste sigurni da želite izbrisati ovaj certifikat?'))
      return;

    await deleteCertificate(certificate.id);
    if (onCertificateDelete) {
      onCertificateDelete(certificate);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {!hiddenColumns.includes('type') && <TableHead>Tip</TableHead>}
            {!hiddenColumns.includes('validTill') && (
              <TableHead>Važi do</TableHead>
            )}
            {!hiddenColumns.includes('status') && <TableHead>Status</TableHead>}
            {!hiddenColumns.includes('actions') && (
              <TableHead>Akcije</TableHead>
            )}
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
                {!hiddenColumns.includes('type') && (
                  <TableCell className="flex items-center gap-3">
                    {resolveIcon(certificate.type)}
                    <span>{CERTIFICATE_TRANSLATION[certificate.type]}</span>
                  </TableCell>
                )}
                {!hiddenColumns.includes('validTill') && (
                  <TableCell>
                    {/*If there is no validTill just show '-' in the table*/}
                    {certificate.validTill
                      ? currentUser?.role === Role.ADMIN // Admins can always see the validTill date
                        ? new Date(certificate.validTill).toDateString()
                        : certificate.type === CertificateTypeEnum.REDCROSS // Rest can only see the validTill date from the red cross.
                          ? new Date(certificate.validTill).toDateString() // It is prohibited to show diploma or ID card validTill date
                          : '-'
                      : '-'}
                  </TableCell>
                )}
                {!hiddenColumns.includes('status') && (
                  <TableCell>
                    {certificate.active ? (
                      <CheckCircle2 color="#00ff04" />
                    ) : (
                      <XCircle color="#ff0000" />
                    )}
                  </TableCell>
                )}
                {!hiddenColumns.includes('actions') && (
                  <TableCell className="flex gap-3">
                    {allowedActions.includes('download') && (
                      <Button
                        onClick={() => handleDownload(certificate)}
                        className="flex gap-1"
                        variant="default">
                        <span>Preuzmi</span>
                      </Button>
                    )}
                    {allowedActions.includes('update') && (
                      <Button
                        onClick={() => {
                          setUpdateInfo({
                            status: certificate.active,
                            id: certificate.id,
                          });
                          setIsModalOpen(true);
                        }}
                        className="flex gap-1"
                        variant="outline">
                        <span>Uredi</span>
                      </Button>
                    )}
                    {allowedActions.includes('delete') && (
                      <Button
                        onClick={() => handleDelete(certificate)}
                        className="flex gap-1"
                        variant="destructive">
                        <span>Izbriši</span>
                      </Button>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {isModalOpen && updateInfo && (
        <UpdateCertificateStatusModal
          status={updateInfo.status}
          id={updateInfo.id}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default CertificateTable;
