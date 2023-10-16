'use client';
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/shared/layouts/dashboardLayout';
import { UserDto } from '@/services/user/dto/user.dto';
import findOne from '@/services/user/findOne';
import style from './UserProfile.module.scss';
import Image from 'next/image';
import { translateUserTypes } from '@/utils/translateUserTypes';
import Button from '@/shared/button/Button';

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
        <div className={style.container}>
          <div className={style.userCard}>
            <Image
              src={user.profilePhoto || '/user-icon.png'}
              style={{ borderRadius: '100000px' }}
              alt="User profile picture"
              width={250}
              height={250}
            />
            <span className={style.userTitle}>
              {user.userAttributes.firstname} {user.userAttributes.lastname}
            </span>
            <span className={style.userInfo}>
              {translateUserTypes(user.userAttributes.type)}
            </span>
            <span className={style.userInfo}>{user.userAttributes.city}</span>
            <Button
              color={'primary'}
              full
              onClick={() => (window.location.href = `mailto:${user.email}`)}>
              Kontakt
            </Button>
          </div>
          <div className={style.userDetails}>
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
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default UserProfilePage;
