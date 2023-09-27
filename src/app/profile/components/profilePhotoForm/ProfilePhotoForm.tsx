import Image from 'next/image';
import { toast } from 'react-toastify';
import { HiPencil } from 'react-icons/hi';
import { ChangeEventHandler, FC, useRef, useState } from 'react';

import Modal from '@/shared/modal/Modal';
import styles from './ProfilePhotoForm.module.scss';
import ImageEditor from '@/shared/imageEditor/ImageEditor';
import AvatarEditor from 'react-avatar-editor';
import Button from '@/shared/button/Button';
import uploadProfilePhoto from '@/services/user/uploadProfilePhoto';

type Props = {
  profilePhoto: string;
};

const ProfilePhotoForm: FC<Props> = ({ profilePhoto }) => {
  const imageEditor = useRef<AvatarEditor>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(profilePhoto);
  const [isImageEditorOpen, setIsImageEditorOpen] = useState(false);
  const [photoPreview, setPhotoPreviewUrl] = useState<File | null>(null);

  const onFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target?.files?.item(0);

    if (file) {
      setPhotoPreviewUrl(file);
      setIsImageEditorOpen(true);
    }
  };

  const saveProfilePhoto = async () => {
    const image = imageEditor.current?.getImage();

    if (!image) {
      toast('Nešto je prošlo po zlu. Probajte ponoviti.', { type: 'error' });
      return;
    }

    image.toBlob(async (blob) => {
      try {
        setIsLoading(true);

        if (!blob) {
          throw new Error('Blob generation failed.');
        }

        const formData = new FormData();
        formData.append('profilePhoto', blob);

        await uploadProfilePhoto(formData);

        const objectUrl = URL.createObjectURL(blob);
        setCurrentImage(objectUrl);

        toast('Profilna slika je uspješno ažuriran', { type: 'success' });
      } catch (error) {
        toast('Nešto je prošlo po zlu. Probajte ponoviti', { type: 'error' });
      } finally {
        setIsLoading(false);
        setIsImageEditorOpen(false);
      }
    });
  };

  return (
    <div className={styles.container}>
      <Image
        src={currentImage}
        className={styles.profilePhotoPreview}
        alt="Preview profile picture"
        fill
      />
      <label htmlFor="profilePhoto" className={styles.changePhotoButton}>
        <HiPencil />
        <input
          id="profilePhoto"
          type="file"
          className="hidden"
          onChange={onFileChange}
        />
      </label>
      <Modal
        isOpen={isImageEditorOpen}
        onClose={() => setIsImageEditorOpen(false)}>
        <ImageEditor ref={imageEditor} image={photoPreview} />
        <div className={styles.buttonRow}>
          <Button
            color="primary"
            full
            onClick={saveProfilePhoto}
            showLoader={isLoading}>
            <span>Spremi</span>
          </Button>
          <Button
            color="secondary"
            full
            onClick={() => setIsImageEditorOpen(false)}>
            <span>Otkaži</span>
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ProfilePhotoForm;
