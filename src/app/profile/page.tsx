'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { HiPencil, HiDocumentAdd } from 'react-icons/hi';

import { Role } from '../register/types';
import { UserDto } from '@/services/user/dto/user.dto';
import DashboardLayout from '@/shared/layouts/dashboardLayout';
import { useUserSession } from '@/services/auth/useUserSession';
import LoadingSpinner from '@/shared/loadingSpinner/LoadingSpinner';
import NavigationTabs from './components/navigationTabs/NavigationTabs';
import UserProfileForm from './components/userProfileForm/userProfileForm';
import ProfilePhotoForm from './components/profilePhotoForm/ProfilePhotoForm';
import OrganisationProfileForm from './components/organisationProfileForm/organisationProfileForm';

const profileUpdateFormFactory = (role: Role, userSession: UserDto) => {
  if (role === Role.ORGANISATION) {
    return <OrganisationProfileForm userData={userSession} />;
  }

  return <UserProfileForm userData={userSession} />;
};

const Profile: NextPage = () => {
  const userSession = useUserSession();

  return (
    <>
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

          {!userSession ? (
            <LoadingSpinner size={64} color="#de3333" />
          ) : (
            <>
              <ProfilePhotoForm
                profilePhoto={userSession?.profilePhoto || '/user-icon.png'}
              />
              {profileUpdateFormFactory(userSession.role, userSession)}
            </>
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export default Profile;
