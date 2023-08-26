'use client';
import { NextPage } from 'next';
import DashboardLayout from '@/shared/layouts/dashboardLayout';
import { useUserSession } from '@/services/auth/useUserSession';
import { Role } from '../register/types';
import { UserProfileForm } from './components/userProfileForm';
import { OrganisationProfileForm } from './components/organisationProfileForm';
import { LoadingSpinner } from '@/shared/loadingSpinner';

const Profile: NextPage = () => {
  const userSession = useUserSession();

  if (!userSession) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <DashboardLayout>
        {userSession.role === Role.USER ? (
          <UserProfileForm userData={userSession} />
        ) : (
          <OrganisationProfileForm userData={userSession} />
        )}
      </DashboardLayout>
    </>
  );
};

export default Profile;
