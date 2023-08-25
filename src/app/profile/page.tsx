'use client';
import { NextPage } from 'next';
import DashboardLayout from '@/shared/layouts/dashboardLayout';
import { useUserSession } from '@/services/auth/useUserSession';
import { Role } from '../register/types';
import { UserProfileForm } from './components/userProfileForm';
import { OrganisationProfileForm } from './components/organisationProfileForm';

const Profile: NextPage = () => {
  const userSession = useUserSession();

  if (!userSession) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <DashboardLayout>
        {userSession.role === Role.USER ? (
          <UserProfileForm userData={userSession} />
        ) : (
          <OrganisationProfileForm />
        )}
      </DashboardLayout>
    </>
  );
};

export default Profile;
