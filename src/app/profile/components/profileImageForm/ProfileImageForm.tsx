import { UserDto } from '@/services/user/dto/user.dto';
import styles from './ProfileImageForm.module.scss';
import { FC } from 'react';
import Image from 'next/image';
import { HiPencil } from 'react-icons/hi';

type Props = {
  user: UserDto;
};

const ProfileImageForm: FC<Props> = ({ user }) => {
  return (
    <div className={styles.container}>
      <Image
        src={user?.profilePhoto || '/user-icon.png'}
        style={{ borderRadius: '100000px' }}
        alt="Preview profile picture"
        fill
      />
      <button className={styles.changePhotoIcon}>
        <HiPencil />
      </button>
    </div>
  );
};

export default ProfileImageForm;
