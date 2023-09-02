import Image from 'next/image';
import { ChangeEventHandler, FC, useRef, useState } from 'react';
import { HiPencil } from 'react-icons/hi';

import Modal from '@/shared/modal/Modal';
import styles from './ProfileImageForm.module.scss';
import { UserDto } from '@/services/user/dto/user.dto';
import ImageEditor from '@/shared/imageEditor/ImageEditor';
import AvatarEditor from 'react-avatar-editor';
import Button from '@/shared/button/Button';
import uploadProfilePhoto from '@/services/user/uploadProfilePhoto';
import { toast } from 'react-toastify';

type Props = {
  user: UserDto;
};

const ProfileImage: FC<Props> = ({ user }) => {
  const imageEditor = useRef<AvatarEditor>(null);
  const [currentImage, setCurrentImage] = useState(
    user?.profilePhoto || '/user-icon.png'
  );
  const [isProfileImageFormOpen, setIsProfileImageFormOpen] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target?.files?.item(0);

    if (file) {
      const imagePreviewUrl = URL.createObjectURL(file);

      setImagePreviewUrl(imagePreviewUrl);
      setIsProfileImageFormOpen(true);
    }
  };

  const saveImage = async () => {
    imageEditor.current?.getImage().toBlob(async (blob) => {
      try {
        setIsLoading(true);

        if (!blob) {
          throw new Error('Blob generation failed.');
        }

        const formData = new FormData();
        formData.append('avatar', blob);

        const data = await uploadProfilePhoto(formData);

        setCurrentImage(data.profilePhoto);

        toast('Profilna slika je uspješno ažuriran', { type: 'success' });
      } catch (error) {
        toast('Nešto je prošlo po zlu. Probajte ponoviti', { type: 'error' });
      } finally {
        setIsLoading(false);
        setIsProfileImageFormOpen(false);
      }
    });
  };

  return (
    <div className={styles.container}>
      <Image
        src={currentImage}
        style={{ borderRadius: '100000px' }}
        alt="Preview profile picture"
        fill
      />
      <label htmlFor="avatar" className={styles.changePhotoButton}>
        <HiPencil />
        <input id="avatar" type="file" className="hidden" onChange={onChange} />
      </label>
      <Modal
        isOpen={isProfileImageFormOpen}
        onClose={() => setIsProfileImageFormOpen(false)}>
        <ImageEditor ref={imageEditor} imageUrl={imagePreviewUrl ?? ''} />
        <Button color="primary" full onClick={saveImage} showLoader={isLoading}>
          <span>Spremi Sliku</span>
        </Button>
      </Modal>
    </div>
  );
};

export default ProfileImage;
