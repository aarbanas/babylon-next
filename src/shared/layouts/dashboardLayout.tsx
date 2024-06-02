'use client';
import { NextPage } from 'next';
import React, { PropsWithChildren } from 'react';
import { useUserSession } from '@/services/auth/useUserSession';
import NewNavbar from '@/components/ui/navbar/navbar';
import Link from 'next/link';
import { HomeIcon, ShieldAlert, UserRoundCog } from 'lucide-react';
import { fontColors } from '@/utils';
import Header from '@/components/ui/header/Header';
import { UserDto } from '@/services/user/dto/user.dto';
import { Role } from '@/app/register/types';
import UserProfilePhoto from '@/shared/userProfilePhoto/UserProfilePhoto';
import Footer from '@/components/ui/footer';

const DashboardLayout: NextPage<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const user = useUserSession();
  if (!user) return null;

  return (
    <div className="flex flex-col">
      <div className="flex min-h-screen w-full grow flex-col lg:flex-row">
        <div className="lg:w-1/5">
          <NewNavbar title="Dobrodošli" color="secondary">
            <DashboardNavigation user={user} />
          </NewNavbar>
        </div>

        <div className="flex w-full flex-col lg:w-4/5">
          <Header color="secondary">
            <div className="flex align-middle sm:ml-auto">
              <UserProfilePhoto user={user} />
              <span className="ml-2 content-center text-xs md:text-base">
                Pozdrav, {user.email}
              </span>
            </div>
          </Header>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const DashboardNavigation: React.FC<{ user: UserDto }> = ({ user }) => {
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

      {user.role === Role.ADMIN && (
        <Link
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 ${fontColors.secondary}`}
          href="/admin">
          <ShieldAlert />
          Admin
        </Link>
      )}
    </nav>
  );
};

export default DashboardLayout;
