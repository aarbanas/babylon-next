'use client';

import axios from 'axios';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { FilePond, registerPlugin } from 'react-filepond';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import deleteCertificateFileFromStorage from '@/services/certificate-files/delete-certificate-file';
import generatePresignedURL from '@/services/certificate-files/generate-presigned-url';
import Form, { FieldError } from '@/shared/form/Form';
import FormInput from '@/shared/formInput/FormInput';
import FormSelect from '@/shared/formSelect/FormSelect';

import styles from './CertificateForm.module.css';
import createCertificate from '@/services/certificates/createCertificates';
import { useRef } from 'react';

registerPlugin(FilePondPluginImagePreview);

const httpInstance = axios.create();

enum CertificateType {
  UNIVERSITY = 'UNIVERSITY',
  REDCROSS = 'REDCROSS',
}

type CertificateFormInputs = {
  type: CertificateType | '';
  validTill: Date;
  key: string;
};

const CertificateForm = () => {
  const filePondRef = useRef<FilePond | null>(null);
  const form = useForm<CertificateFormInputs>({
    defaultValues: {
      key: '',
      type: '',
      validTill: new Date(),
    },
  });

  const onSubmit: SubmitHandler<CertificateFormInputs> = async (data) => {
    await createCertificate({
      key: data.key,
      type: data.type,
      userId: 1,
      validTill: new Date(data.validTill).toISOString(),
    });

    form.reset();
    filePondRef.current && filePondRef.current.removeFiles();

    toast('Certifikat uspješno prenesen', { type: 'success' });
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <FormSelect
        id="type"
        label="Tip*"
        {...form.register('type', {
          required: 'Tip je obavezan',
        })}>
        <option value="">Odaberi tip</option>
        <option value={CertificateType.UNIVERSITY}>Sveučilište</option>
        <option value={CertificateType.REDCROSS}>Crveni križ</option>
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
                  toast.error('Došlo je do greške prilikom prijenosa datoteke');
                }

                field.onChange(file.serverId);
              }}
              allowMultiple={false}
              server={{
                process: async (
                  _fieldName,
                  file,
                  _metadata,
                  load,
                  error,
                  progress,
                  abort
                ) => {
                  const abortController = new AbortController();

                  try {
                    const { uploadUrl, key, contentType } =
                      await generatePresignedURL({
                        filename: file.name,
                        size: file.size,
                      });

                    await httpInstance.put(uploadUrl, file, {
                      onUploadProgress: (e) => {
                        progress(true, e.loaded, e.total ?? 0);
                      },
                      headers: {
                        'Content-Type': contentType,
                      },
                      signal: abortController.signal,
                    });

                    load(key);
                  } catch (err: unknown) {
                    if (err instanceof Error) {
                      error(err.message);
                    }
                  }

                  return {
                    abort: () => {
                      abortController.abort();

                      abort();
                    },
                  };
                },
                revert: async (certificateFileKey, load, error) => {
                  try {
                    await deleteCertificateFileFromStorage(certificateFileKey);
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
  );
};

export default CertificateForm;
