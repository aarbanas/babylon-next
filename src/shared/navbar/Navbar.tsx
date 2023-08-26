'use client';

import logout from '@/services/auth/logout';
import styles from './Navbar.module.scss';
import { useRouter } from 'next/navigation';
import NavbarMenuDrawer from '@/shared/navbar/navbarMenuDrawer/NavbarMenuDrawer';
import NavbarNavigation from '@/shared/navbar/navbarNavigation/NavbarNavigation';

const BabylonNavbar = () => {
  const router = useRouter();

  function onLogoutClick() {
    logout();
    router.push('/');
  }

  function onRouterClick(route: string) {
    router.push(route);
  }

  return (
    <>
      <nav className={styles.card}>
        <span className={styles.title}>Dobrodošli</span>

        <NavbarNavigation
          onRouterClick={onRouterClick}
          onLogoutClick={onLogoutClick}
        />
      </nav>

      <div className={styles.menuDrawer}>
        <NavbarMenuDrawer
          onRouterClick={onRouterClick}
          logout={onLogoutClick}
        />
      </div>
    </>
  );
};

export default BabylonNavbar;
