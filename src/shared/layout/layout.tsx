import { NextPage } from 'next';
import { PropsWithChildren, useEffect, useState } from 'react';
import Header from '../header/Header';
import BabylonNavbar from '@/shared/navbar/Navbar';
import { useCurrentUser } from '@/services/auth/currentUser';
import findOne from '@/services/user/findOne';
import { UserDto } from '@/services/user/dto/user.dto';

const Layout: NextPage<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const sessionUser = useCurrentUser();
  const [user, setUser] = useState<UserDto | null>(null);

  useEffect(() => {
    if (sessionUser) {
      findOne(sessionUser.sub)
        .then((_user) => {
          setUser(_user);
        })
        .catch();
    }
  }, [sessionUser]);

  return (
    <>
      <div className="flex">
        <div className="w-1/5">
          <BabylonNavbar />
        </div>
        <div className="flex flex-col w-4/5">
          {user && (
            <Header
              username={user.email}
              photo={user.profilePhoto || '/user-icon.png'}
            />
          )}
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
