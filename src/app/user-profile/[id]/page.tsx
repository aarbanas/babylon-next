'use client';
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/shared/layouts/dashboardLayout';
import { UserDto } from '@/services/user/dto/user.dto';
import findOne from '@/services/user/findOne';
import style from './UserProfile.module.scss';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { translateUserTypes } from '@/utils';

interface Props {
  params: { id: string };
}

const UserProfilePage: React.FC<Props> = ({ params }) => {
  const [user, setUser] = useState<UserDto | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await findOne(params.id);
      if (response) setUser(response);
      setLoading(false);
    };

    fetchUser();
  }, [params.id]);

  if (isLoading) return <DashboardLayout>Loading...</DashboardLayout>;

  if (!user) return null;

  return (
    <>
      <DashboardLayout>
        <div className="flex flex-col md:flex-row">
          <Card className="e flex w-full flex-col items-center md:w-1/3">
            <Image
              src={user.profilePhoto || '/user-icon.png'}
              style={{ borderRadius: '100000px' }}
              alt="User profile picture"
              width={250}
              height={250}
            />
            <Button
              color={'primary'}
              className={'mt-auto w-full'}
              onClick={() => (window.location.href = `mailto:${user.email}`)}>
              Kontakt
            </Button>
          </Card>

          <Card className={style.userDetails}>
            <table>
              <thead>
                <tr>
                  <th>Ime</th>
                </tr>
                <tr>
                  <th>Prezime</th>
                </tr>
                <tr>
                  <th>Grad</th>
                </tr>
                <tr>
                  <th>Tip</th>
                </tr>
                <tr>
                  <th>Email</th>
                </tr>
                <tr>
                  <th>Telefon</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Ime">{user.userAttributes.firstname}</td>
                </tr>
                <tr>
                  <td data-label="Prezime">{user.userAttributes.lastname}</td>
                </tr>
                <tr>
                  <td data-label="Grad">{user.userAttributes.city}</td>
                </tr>
                <tr>
                  <td data-label="Tip">
                    {translateUserTypes(user.userAttributes.type)}
                  </td>
                </tr>
                <tr>
                  <td data-label="Email">{user.email}</td>
                </tr>
                <tr>
                  <td data-label="Telefon">{user.userAttributes.phone}</td>
                </tr>
              </tbody>
            </table>

            <div className={style.certificate}>
              <span className={style.title}>Certifikati</span>
            </div>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

export default UserProfilePage;
