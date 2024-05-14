import { UserDto } from '@/services/user/dto/user.dto';
import { UserRound } from 'lucide-react';
import React from 'react';
import Image from 'next/image';

type Props = {
  user: UserDto;
};

const UserProfilePhoto: React.FC<Props> = ({ user }) => {
  return (
    <>
      {user.profilePhoto ? (
        <Image
          src={user.profilePhoto}
          alt="User profile picture"
          width={24}
          height={24}
        />
      ) : (
        <UserRound />
      )}
    </>
  );
};

export default UserProfilePhoto;
