import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import {
  FilePondErrorDescription,
  FilePondFile,
  ProcessServerConfigFunction,
  RevertServerConfigFunction,
} from 'filepond';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import 'filepond/dist/filepond.min.css';

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import { FieldError } from '../form/Form';
import styles from './FileUploader.module.css';

registerPlugin(FilePondPluginImagePreview);

interface FileUploaderProps<T extends FieldValues, R> {
  name: Path<T>;
  control: Control<T, R>;
  rules: RegisterOptions;
  label: string;
  labelIdle: string;
  maxFiles: number;
  acceptedFileTypes?: string[];
  allowMultiple: boolean;
  onProcessFileError: (error: FilePondErrorDescription) => void;
  onProcessFileSuccess: (file: FilePondFile) => void;
  processHandler: ProcessServerConfigFunction;
  revertHandler: RevertServerConfigFunction;
}

const FileUploader = <T extends FieldValues, R>({
  name,
  control,
  rules,
  label,
  labelIdle,
  maxFiles,
  acceptedFileTypes,
  allowMultiple,
  onProcessFileError,
  onProcessFileSuccess,
  processHandler,
  revertHandler,
}: FileUploaderProps<T, R>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <div className={styles.container}>
          <label htmlFor={field.name} className={styles.label}>
            {label}
          </label>
          <FilePond
            name={field.name}
            labelIdle={labelIdle}
            maxFiles={maxFiles}
            acceptedFileTypes={acceptedFileTypes}
            onupdatefiles={(fileItems) => {
              if (fileItems.length === 0) {
                field.onChange('');
              }
            }}
            onprocessfile={(error, file) => {
              if (error) {
                onProcessFileError(error);
              } else {
                field.onChange(file.serverId);
                onProcessFileSuccess(file);
              }
            }}
            allowMultiple={allowMultiple}
            server={{
              process: processHandler,
              revert: revertHandler,
            }}
          />
          <FieldError name={field.name} />
        </div>
      )}
    />
  );
};

export default FileUploader;
