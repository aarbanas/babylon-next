import React, { ReactNode } from 'react';
import NewNavbar from '@/components/ui/navbar/navbar';
import Header from '@/components/ui/header/Header';
import { Building, CornerDownLeft, Users } from 'lucide-react';
import Link from 'next/link';
import { fontColors } from '@/utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  children: ReactNode;
  headerChildren: ReactNode;
};

const AdminLayout: React.FC<Readonly<Props>> = ({
  children,
  headerChildren,
}) => {
  return (
    <>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <NewNavbar title="User Management">
          <AdminUserNavigation />
        </NewNavbar>

        <div className="flex flex-col">
          <Header>{headerChildren}</Header>
          {children}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

const AdminUserNavigation = () => {
  return (
    <nav className="grid items-start text-sm font-medium lg:px-4">
      <Link
        className={`flex items-center gap-3 rounded-lg px-3 py-2 ${fontColors.primary} transition-all hover:text-gray-900`}
        href="/admin/users">
        <Users />
        User List
      </Link>
      <Link
        className={`flex items-center gap-3 rounded-lg px-3 py-2 ${fontColors.primary} transition-all hover:text-gray-900`}
        href="/admin/organisations">
        <Building />
        Organisation list
      </Link>
      <Link
        className={`flex items-center gap-3 rounded-lg px-3 py-2 ${fontColors.primary} transition-all hover:text-gray-900`}
        href="/dashboard">
        <CornerDownLeft />
        Return to Dashboard
      </Link>
    </nav>
  );
};

export default AdminLayout;
