'use client';
import { NextPage } from 'next';
import React, { PropsWithChildren } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useUserSession } from '@/services/auth/useUserSession';
import NewNavbar from '@/components/ui/navbar/navbar';
import Link from 'next/link';
import { HomeIcon, UserRoundCog } from 'lucide-react';
import { fontColors } from '@/utils';
import Header from '@/components/ui/header/Header';
import Image from 'next/image';

const DashboardLayout: NextPage<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const user = useUserSession();

  return (
    <>
      <div className="flex">
        <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
          <NewNavbar title="Dobrodošli" color="secondary">
            <DashboardNavigation />
          </NewNavbar>
        </div>

        <div className="flex w-full flex-col">
          <Header color="secondary">
            {user && (
              <div className="flex align-middle sm:ml-auto">
                <Image
                  src={user.profilePhoto || '/user-icon.png'}
                  alt="User profile picture"
                  width={40}
                  height={40}
                />
                <span className="content-center">Pozdrav, {user.email}</span>
              </div>
            )}
          </Header>
          {children}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

const DashboardNavigation = () => {
  return (
    <nav className="grid items-start text-sm font-medium lg:px-4">
      <Link
        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 ${fontColors.secondary}`}
        href="dashboard">
        <HomeIcon />
        Početna
      </Link>
      <Link
        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 ${fontColors.secondary}`}
        href="profile">
        <UserRoundCog />
        Profil
      </Link>
    </nav>
  );
};

export default DashboardLayout;
