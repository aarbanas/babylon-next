import MenuIcon from '@/shared/icons/menu/Menu';
import styles from './NavbarMenuDrawer.module.scss';
import { useState } from 'react';
import Close from '@/shared/icons/close/Close';
import { NextPage } from 'next';
import NavbarNavigation from '@/shared/navbar/navbarNavigation/NavbarNavigation';

type Props = {
  logout: VoidFunction;
  onRouterClick(url?: string): void;
};
const NavbarMenuDrawer: NextPage<Props> = ({ logout, onRouterClick }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

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

      <NavbarNavigation onRouterClick={onRouterClick} onLogoutClick={logout} />
    </div>
  );
};

export default NavbarMenuDrawer;
