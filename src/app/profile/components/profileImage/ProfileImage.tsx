import { FC } from 'react';
import Image from 'next/image';
import { HiPencil } from 'react-icons/hi';

import styles from './ProfileImage.module.scss';
import { UserDto } from '@/services/user/dto/user.dto';

type Props = {
  user: UserDto;
};

const ProfileImage: FC<Props> = ({ user }) => {
  return (
    <div className={styles.container}>
      <Image
        src={user?.profilePhoto || '/user-icon.png'}
        style={{ borderRadius: '100000px' }}
        alt="Preview profile picture"
        fill
      />
      <button className={styles.changePhotoButton}>
        <HiPencil />
      </button>
    </div>
  );
};

export default ProfileImage;
