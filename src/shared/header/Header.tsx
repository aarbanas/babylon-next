import Image from 'next/image';
import { NextPage } from 'next';
import styles from './Header.module.scss';
import { usePathname } from 'next/navigation';
import { resolvePageTitle } from '@/utils/resolvePageTitle';

type Props = {
  username: string;
  photo: string;
};

const Header: NextPage<Props> = ({ username, photo }) => {
  const pathname = usePathname();
  const title = resolvePageTitle(pathname);

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
