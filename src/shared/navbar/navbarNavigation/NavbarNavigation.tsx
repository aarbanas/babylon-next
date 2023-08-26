import React from 'react';
import styles from './NavbarNavigation.module.scss';
import HomeIcon from '@/shared/icons/home/Home';
import ProfileIcon from '@/shared/icons/profile/Profile';
import LogoutIcon from '@/shared/icons/logout/Logout';

type Props = {
  onRouterClick(url?: string): void;
  onLogoutClick: VoidFunction;
};
const NavbarNavigation: React.FC<Props> = ({
  onRouterClick,
  onLogoutClick,
}) => {
  return (
    <>
      <div className={styles.navigation}>
        <div
          className={styles.menuItem}
          onClick={() => {
            onRouterClick('/dashboard');
          }}>
          <HomeIcon />
          <span className="ml-2">Početna</span>
        </div>
      </div>

      <div className={styles.bottomNavigation}>
        <div
          className={styles.menuItem}
          onClick={() => {
            onRouterClick('/profile');
          }}>
          <ProfileIcon />
          <span className="ml-2">Profil</span>
        </div>

        <div className={styles.menuItem} onClick={onLogoutClick}>
          <LogoutIcon />
          <span className="ml-2">Odjavi se</span>
        </div>
      </div>
    </>
  );
};

export default NavbarNavigation;
