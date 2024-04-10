import React, { PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';
import logout from '@/services/auth/logout';
import { LogOut } from 'lucide-react';
import { backgroundColors, fontColors } from '@/utils';
import NewNavbarMenuDrawer from '@/components/ui/navbar/navbar-menu-drawer/navbar-menu-drawer';
import styles from './navbar.module.scss';

type Props = {
  title: string;
  color?: 'primary' | 'secondary';
} & PropsWithChildren;

const NewNavbar: React.FC<Props> = ({ title, children, color = 'primary' }) => {
  const router = useRouter();

  function onLogoutClick() {
    logout();
    router.push('/');
  }

  return (
    <>
      <div
        className="hidden h-full border-r lg:block"
        style={{ backgroundColor: `${backgroundColors[color]}` }}>
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <span className="flex items-center gap-2 font-semibold">
              <span style={{ color: fontColors[color] }}>{title}</span>
            </span>
          </div>

          <NavbarNavigation
            onLogoutClick={onLogoutClick}
            color={fontColors[color]}>
            {children}
          </NavbarNavigation>
        </div>
      </div>

      <div className={styles.menuDrawer}>
        <NewNavbarMenuDrawer title={title} color={color}>
          <NavbarNavigation
            onLogoutClick={onLogoutClick}
            color={fontColors[color]}>
            {children}
          </NavbarNavigation>
        </NewNavbarMenuDrawer>
      </div>
    </>
  );
};

type NavbarNavigationProps = {
  onLogoutClick: () => void;
  color?: string;
} & PropsWithChildren;

const NavbarNavigation: React.FC<NavbarNavigationProps> = ({
  onLogoutClick,
  color,
  children,
}) => {
  return (
    <div className="flex flex-1 flex-col overflow-auto py-2">
      {children}
      <div
        className={`mt-auto flex items-center gap-3 rounded-lg px-6 py-2 transition-all ${color} cursor-pointer hover:text-gray-950`}
        onClick={onLogoutClick}>
        <LogOut /> Logout
      </div>
    </div>
  );
};

export default NewNavbar;
