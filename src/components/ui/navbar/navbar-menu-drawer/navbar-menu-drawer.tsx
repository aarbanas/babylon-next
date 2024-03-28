import { PropsWithChildren, useState } from 'react';
import { NextPage } from 'next';
import { Menu, X } from 'lucide-react';
import styles from './navbar-menu-drawer.module.scss';
import { backgroundColors } from '@/utils';

type Props = {
  title: string;
  color?: 'primary' | 'secondary';
} & PropsWithChildren;

const NewNavbarMenuDrawer: NextPage<Props> = ({
  title,
  children,
  color = 'primary',
}) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return !showMenu ? (
    <button aria-label="Open menu" onClick={() => setShowMenu(true)}>
      <Menu />
    </button>
  ) : (
    <div
      className={styles.menu}
      style={{ backgroundColor: backgroundColors[color] }}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <span className={styles.title}>{title}</span>
          <div
            className={'cursor-pointer'}
            onClick={() => {
              setShowMenu(false);
            }}>
            <X />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default NewNavbarMenuDrawer;
