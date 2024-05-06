'use client';

import { NextPage } from 'next';

import { Role } from '../register/types';
import { UserDto } from '@/services/user/dto/user.dto';
import { useUserSession } from '@/services/auth/useUserSession';
import LoadingSpinner from '@/shared/loadingSpinner/LoadingSpinner';
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
    </>
  );
};

export default Profile;
