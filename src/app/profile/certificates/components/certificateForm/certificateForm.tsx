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
import Form from '@/shared/form/Form';
import FormInput from '@/shared/formInput/FormInput';

registerPlugin(FilePondPluginImagePreview);

const httpInstance = axios.create();

type CertificateFormInputs = {
  type: string;
  validTill: Date;
  key: string;
};

const CertificateForm = () => {
  const form = useForm<CertificateFormInputs>({
    defaultValues: {
      key: '',
      type: '',
      validTill: new Date(),
    },
  });

  const onSubmit: SubmitHandler<CertificateFormInputs> = (data) =>
    console.log(data);

  return (
    <Form form={form} onSubmit={onSubmit}>
      <FormInput id="type" label="Tip*" {...form.register('type')} />
      <FormInput
        id="validTill"
        label="Važi do*"
        type="date"
        {...form.register('validTill')}
      />
      <Controller
        name="key"
        control={form.control}
        render={({ field }) => (
          <>
            <label htmlFor={field.name}>Datoteka*</label>
            <FilePond
              name={field.name}
              labelIdle="Povuci i pusti datoteku ovdje ili klikni"
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
          </>
        )}
      />
      <Button type="submit">Prenesi</Button>
    </Form>
  );
};

export default CertificateForm;
