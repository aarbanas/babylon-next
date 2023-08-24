'use client';

import logout from '@/services/auth/logout';
import styles from './Navbar.module.scss';
import LogoutIcon from '@/shared/icons/logout/Logout';
import { useRouter } from 'next/navigation';
import ProfileIcon from '@/shared/icons/profile/Profile';
import HomeIcon from '@/shared/icons/home/Home';
import NavbarMenuDrawer from '@/shared/navbar/navbarMenuDrawer/NavbarMenuDrawer';

const BabylonNavbar = () => {
  const router = useRouter();

  function onLogoutClick() {
    logout();
    router.push('/');
  }

  return (
    <>
      <nav className={styles.card}>
        <span className={styles.title}>Dobrodošli</span>

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

          <div className={styles.menuItem} onClick={onLogoutClick}>
            <LogoutIcon />
            <span className="ml-2">Odjavi se</span>
          </div>
        </div>
      </nav>

      <div className={styles.menuDrawer}>
        <NavbarMenuDrawer logout={onLogoutClick} />
      </div>
    </>
  );
};

export default BabylonNavbar;
