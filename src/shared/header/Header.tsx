import Image from 'next/image';
import { NextPage } from 'next';
import styles from './Header.module.scss';
import { usePathname } from 'next/navigation';

type Props = {
  username: string;
  photo: string;
};

const Header: NextPage<Props> = ({ username, photo }) => {
  const pathname = usePathname();

  let title = '';
  switch (true) {
    case pathname === '/dashboard':
      title = 'Početna';
      break;
    case pathname === '/profile':
      title = 'Profil';
      break;
    case pathname.includes('/user-profile'):
      title = 'Podaci o korisniku';
      break;
  }

  return (
    <>
      <div className={styles.container}>
        <span>{title}</span>
        <div className={styles.avatarContainer}>
          <Image
            src={photo}
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
