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
        <div className="flex min-h-screen w-full flex-col lg:flex-row">
          <div className="lg:w-1/5">
            <NewNavbar title="Dobrodošli" color="secondary">
              <DashboardNavigation />
            </NewNavbar>
          </div>

          <div className="flex w-full flex-col lg:w-4/5">
            <Header color="secondary">
              {user && (
                <div className="flex align-middle sm:ml-auto">
                  <Image
                    src={user.profilePhoto || '/user-icon.png'}
                    alt="User profile picture"
                    width={24}
                    height={24}
                  />
                  <span className="ml-2 content-center text-xs md:text-base">
                    Pozdrav, {user.email}
                  </span>
                </div>
              )}
            </Header>
            {children}
          </div>
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
        href="/dashboard">
        <HomeIcon />
        Početna
      </Link>
      <Link
        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 ${fontColors.secondary}`}
        href="/profile">
        <UserRoundCog />
        Profil
      </Link>
    </nav>
  );
};

export default DashboardLayout;
