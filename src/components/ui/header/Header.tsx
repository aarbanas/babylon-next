import React, { PropsWithChildren } from 'react';
import { backgroundColors } from '@/utils';

type Props = {
  color?: 'primary' | 'secondary';
} & PropsWithChildren;

const Header: React.FC<Props> = ({ children, color = 'primary' }) => {
  return (
    <>
      <header
        className="flex h-14 items-center gap-4 border-b px-10 lg:h-[60px] lg:bg-gray-100/40 lg:px-6"
        style={{ backgroundColor: `${backgroundColors[color]}` }}>
        {children}
      </header>
    </>
  );
};

export default Header;
