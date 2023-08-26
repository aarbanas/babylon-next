import { NextPage } from 'next';
import styles from './Header.module.scss';
import Image from 'next/image';

type Props = {
  username: string;
  photo: string;
};

const Header: NextPage<Props> = ({ username, photo }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.avatarContainer}>
          <Image
            src={photo}
            style={{ borderRadius: '100000px' }}
            alt="User profile picture"
            width={40}
            height={40}
          />
          <span className={styles.username}>Pozdrav, {username}</span>
        </div>
      </div>
    </>
  );
};

export default Header;
