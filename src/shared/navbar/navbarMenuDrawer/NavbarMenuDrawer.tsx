import MenuIcon from '@/shared/icons/menu/Menu';
import styles from './NavbarMenuDrawer.module.scss';
import { useState } from 'react';
import Close from '@/shared/icons/close/Close';
import HomeIcon from '@/shared/icons/home/Home';
import { useRouter } from 'next/navigation';
import ProfileIcon from '@/shared/icons/profile/Profile';
import LogoutIcon from '@/shared/icons/logout/Logout';
import { NextPage } from 'next';

type Props = {
  logout: VoidFunction;
};
const NavbarMenuDrawer: NextPage<Props> = ({ logout }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const router = useRouter();

  return !showMenu ? (
    <button
      className={styles.burgerButton}
      aria-label="Open menu"
      onClick={() => setShowMenu(true)}>
      <MenuIcon />
    </button>
  ) : (
    <div className={styles.menu}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <span className={styles.title}>Dobrodošli</span>
          <div
            onClick={() => {
              setShowMenu(false);
            }}>
            <Close />
          </div>
        </div>
      </div>

      <div className={styles.navigation}>
        <div
          className={styles.menuItem}
          onClick={() => {
            router.push('/dashboard');
          }}>
          <HomeIcon />
          <span className="ml-2">Početna</span>
        </div>
      </div>

      <div className={styles.bottomNavigation}>
        <div
          className={styles.menuItem}
          onClick={() => {
            router.push('/profile');
          }}>
          <ProfileIcon />
          <span className="ml-2">Profil</span>
        </div>

        <div className={styles.menuItem} onClick={logout}>
          <LogoutIcon />
          <span className="ml-2">Odjavi se</span>
        </div>
      </div>
    </div>
  );
};

export default NavbarMenuDrawer;
