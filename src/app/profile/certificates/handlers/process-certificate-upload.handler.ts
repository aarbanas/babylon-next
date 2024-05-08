import axios from 'axios';
import { ProcessServerConfigFunction } from 'filepond';

import generatePresignedURL from '@/services/certificate-files/generate-presigned-url';

const httpInstance = axios.create();

const processCertificateUploadHandler: ProcessServerConfigFunction = async (
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
    const { uploadUrl, key, contentType } = await generatePresignedURL({
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
};

export default processCertificateUploadHandler;
