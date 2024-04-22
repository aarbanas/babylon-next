import Link from 'next/link';
import { HiDocumentAdd, HiPencil } from 'react-icons/hi';

import NavigationTabs from './components/navigationTabs/NavigationTabs';
import DashboardLayout from '@/shared/layouts/dashboardLayout';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout>
      <div className="relative px-20">
        <NavigationTabs>
          <Link href="/profile" className="flex items-center">
            <HiPencil className="mr-2" size={24} />
            <span>Osnovni podatci</span>
          </Link>
          <Link href="/profile/certificates" className="flex items-center">
            <HiDocumentAdd className="mr-2" size={24} />
            <span>Certifikati</span>
          </Link>
        </NavigationTabs>

        {children}
      </div>
    </DashboardLayout>
  );
}
