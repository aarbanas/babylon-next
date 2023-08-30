'use client';
import { NextPage } from 'next';
import { PropsWithChildren } from 'react';
import Header from '../header/Header';
import BabylonNavbar from '@/shared/navbar/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useUserSession } from '@/services/auth/useUserSession';

const DashboardLayout: NextPage<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const user = useUserSession();

  return (
    <>
      <div className="flex">
        <div className="w-1/5">
          <BabylonNavbar />
        </div>
        <div className="flex flex-col w-4/5">
          {user && (
            <Header
              username={user.email}
              photo={user.profilePhoto || '/user-icon.png'}
            />
          )}
          {children}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default DashboardLayout;
