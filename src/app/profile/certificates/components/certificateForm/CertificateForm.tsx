'use client';

import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { FilePond, registerPlugin } from 'react-filepond';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FC, useCallback, useRef, useState } from 'react';

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import deleteCertificateFileFromStorage from '@/services/certificate-files/delete-certificate-file';
import Form, { FieldError } from '@/shared/form/Form';
import FormInput from '@/shared/formInput/FormInput';
import FormSelect from '@/shared/formSelect/FormSelect';

import styles from './CertificateForm.module.css';
import createCertificate from '@/services/certificates/createCertificates';
import { CertificateTypeEnum } from '../../enums/certificate-types.enum';
import { CERTIFICATE_TRANSLATION } from '../../constants/certificate-translation';
import Modal from '@/shared/modal/Modal';
import uploadCertificateHandler from '../../handlers/upload-certificate.handler';

registerPlugin(FilePondPluginImagePreview);

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

  const resetFilePond = useCallback(() => {
    filePondRef.current && filePondRef.current.removeFiles();
  }, []);
  const onDialogClose = useCallback(() => {
    setIsDialogOpen(false);
    resetForm();
    resetFilePond();
  }, [resetForm, resetFilePond]);

  const onSubmit: SubmitHandler<CertificateFormInputs> = async (data) => {
    await createCertificate({
      key: data.key,
      type: data.type,
      userId: 1,
      validTill: new Date(data.validTill).toISOString(),
    });

    resetForm();
    resetFilePond();

    toast('Certifikat uspješno prenesen', { type: 'success' });
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

          <Controller
            name="key"
            control={form.control}
            rules={{ required: 'Certifikat je obavezn' }}
            render={({ field }) => (
              <div className={styles.container}>
                <label htmlFor={field.name} className={styles.label}>
                  Certifikat*
                </label>
                <FilePond
                  name={field.name}
                  ref={(ref) => (filePondRef.current = ref)}
                  labelIdle="Povuci i pusti certifikat ovdje ili klikni"
                  maxFiles={1}
                  onupdatefiles={(fileItems) => {
                    if (fileItems.length === 0) {
                      field.onChange('');
                    }
                  }}
                  onprocessfile={(error, file) => {
                    if (error) {
                      toast.error(
                        'Došlo je do greške prilikom prijenosa datoteke'
                      );
                    }

                    field.onChange(file.serverId);
                  }}
                  allowMultiple={false}
                  server={{
                    process: uploadCertificateHandler,
                    revert: async (certificateFileKey, load, error) => {
                      try {
                        await deleteCertificateFileFromStorage(
                          certificateFileKey
                        );
                      } catch (_err) {
                        error('Došlo je do greške prilikom brisanja datoteke');
                      }

                      load();
                    },
                  }}
                />
                <FieldError name={field.name} />
              </div>
            )}
          />
          <Button type="submit">Prenesi</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default CertificateForm;
