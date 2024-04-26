'use client';

import { toast } from 'react-toastify';
import { FilePond } from 'react-filepond';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FC, useCallback, useRef, useState } from 'react';

import Form from '@/shared/form/Form';
import { Button } from '@/components/ui/button';
import Modal from '@/shared/modal/Modal';
import styles from './CertificateForm.module.css';
import FormInput from '@/shared/formInput/FormInput';
import FormSelect from '@/shared/formSelect/FormSelect';
import FileUploader from '@/shared/fileUploader/FileUploader';
import { CertificateTypeEnum } from '../../enums/certificate-types.enum';
import createCertificate from '@/services/certificates/createCertificates';
import { CERTIFICATE_TRANSLATION } from '../../constants/certificate-translation';
import processCertificateUploadHandler from '../../handlers/process-certificate-upload.handler';
import deleteCertificateFileFromStorage from '@/services/certificate-files/delete-certificate-file';

type CertificateFormInputs = {
  type: CertificateTypeEnum | '';
  validTill: Date;
  key: string;
};

const CertificateForm: FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const filePondRef = useRef<FilePond | null>(null);
  const form = useForm<CertificateFormInputs>({
    defaultValues: {
      key: '',
      type: '',
      validTill: new Date(),
    },
  });
  const { reset: resetForm } = form;

  // FIXME: filePondRef.current is always null
  // it has to do something with passing the ref to the FilePond component
  const resetFilePond = useCallback((revert = false) => {
    if (filePondRef.current) {
      const files = filePondRef.current.getFiles();
      filePondRef.current.removeFiles(files, {
        revert,
      });
    }
  }, []);

  const onDialogClose = () => {
    resetForm();
    resetFilePond(true);
    setIsDialogOpen(false);
  };

  const onSubmit: SubmitHandler<CertificateFormInputs> = async (data) => {
    try {
      await createCertificate({
        key: data.key,
        type: data.type,
        userId: 1,
        validTill: new Date(data.validTill).toISOString(),
      });


      resetForm();
      resetFilePond();
      setIsDialogOpen(false);

      toast('Certifikat je uspješno dodan', { type: 'success' });
    } catch {
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
            ref={filePondRef}
            allowMultiple={false}
            maxFiles={1}
            control={form.control}
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
