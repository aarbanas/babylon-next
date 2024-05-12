'use client';

import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { SubmitHandler, useForm } from 'react-hook-form';

import Form from '@/shared/form/Form';
import { Button } from '@/components/ui/button';
import Modal from '@/shared/modal/Modal';
import styles from './CertificateForm.module.css';
import FormInput from '@/shared/formInput/FormInput';
import FormSelect from '@/shared/formSelect/FormSelect';
import FileUploader from '@/shared/fileUploader/FileUploader';
import { ApiError } from '@/shared/http-service/httpService';
import { createCertificate } from '../../services/certificates-service';
import { CertificateTypeEnum } from '../../enums/certificate-types.enum';
import { CERTIFICATE_TRANSLATION } from '../../constants/certificate-translation';
import processCertificateUploadHandler from '../../handlers/process-certificate-upload.handler';
import deleteCertificateFileFromStorage from '@/services/certificate-files/delete-certificate-file';
import { CertificateDto } from '../../models/certificate.model';

type CertificateFormInputs = {
  type: CertificateTypeEnum | '';
  validTill: Date;
  key: string;
  userId?: number;
};

type CertificateFormProps = {
  onCertificateCreate: (certificate: CertificateDto) => void;
  userId?: number;
};

const CertificateForm: FC<CertificateFormProps> = ({ onCertificateCreate, userId }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const form = useForm<CertificateFormInputs>({
    defaultValues: {
      key: '',
      type: '',
      validTill: new Date(),
    },
  });
  const { reset: resetForm } = form;

  const onDialogClose = () => {
    resetForm();
    setIsDialogOpen(false);
  };

  const onSubmit: SubmitHandler<CertificateFormInputs> = async (data) => {
    try {
      const certificate = await createCertificate({
        key: data.key,
        type: data.type,
        validTill: new Date(data.validTill).toISOString(),
        userId,
      });

      onCertificateCreate(certificate);

      resetForm();
      setIsDialogOpen(false);

      toast('Certifikat je uspješno dodan', { type: 'success' });
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.code === 'certificate_already_exists') {
          toast('Certifikat tog tipa već postoji.', { type: 'error' });
        }
        return;
      }
      toast('Nešto je prošlo po zlu. Probajte ponoviti', { type: 'error' });
    }
  };

  return (
    <div>
      <Button onClick={() => setIsDialogOpen(true)}>Kreiraj certifikat</Button>

      <Modal isOpen={isDialogOpen} onClose={onDialogClose}>
        <Form form={form} onSubmit={onSubmit} className={styles.form}>
          <FormSelect
            id="type"
            label="Tip*"
            {...form.register('type', {
              required: 'Tip je obavezan',
            })}>
            <option value="">Odaberi tip</option>
            <option value={CertificateTypeEnum.UNIVERSITY}>
              {CERTIFICATE_TRANSLATION[CertificateTypeEnum.UNIVERSITY]}
            </option>
            <option value={CertificateTypeEnum.REDCROSS}>
              {CERTIFICATE_TRANSLATION[CertificateTypeEnum.REDCROSS]}
            </option>
          </FormSelect>

          <FormInput
            id="validTill"
            label="Važi do*"
            type="date"
            {...form.register('validTill', {
              required: 'Datum je obavezan',
            })}
          />

          <FileUploader
            allowMultiple={false}
            maxFiles={1}
            control={form.control}
            acceptedFileTypes={['application/pdf', 'image/*']}
            label="Certifikat*"
            labelIdle="Povuci i pusti certifikat ovdje ili klikni"
            rules={{ required: 'Certifikat je obavezan' }}
            name="key"
            onProcessFileError={() => {
              toast.error('Došlo je do greške prilikom prijenosa datoteke');
            }}
            onProcessFileSuccess={(file) => {
              form.setValue('key', file.serverId);
            }}
            processHandler={processCertificateUploadHandler}
            revertHandler={async (certificateFileKey, load, error) => {
              try {
                await deleteCertificateFileFromStorage(certificateFileKey);
              } catch (_err) {
                error('Došlo je do greške prilikom brisanja datoteke');
              }

              load();
            }}
          />

          <Button type="submit">Prenesi</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default CertificateForm;
