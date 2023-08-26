import { NextPage } from 'next';
import { PropsWithChildren } from 'react';
import Header from '../header/Header';
import BabylonNavbar from '@/shared/navbar/Navbar';

const Layout: NextPage<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  return (
    <>
      <div className="flex w-full h-full">
        <BabylonNavbar />
        <div className="flex flex-col w-full">
          <Header />
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
