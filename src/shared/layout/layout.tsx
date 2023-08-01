import { NextPage } from 'next';
import { PropsWithChildren } from 'react';
import BabylonNavbar from '@/shared/navbar/navbar';

const Layout: NextPage<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  return (
    <>
      <BabylonNavbar />
      {children}
    </>
  );
};

export default Layout;
