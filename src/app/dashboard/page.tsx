'use client';
import React, { useEffect, useState } from 'react';
import Layout from '@/shared/layout/layout';
import style from './Dashboard.module.scss';
import findUsers from '@/services/user/find';
import Image from 'next/image';
import { UserDto, UserType } from '@/services/user/dto/user.dto';
import { PaginationMetadata } from '@/services/user/dto/findUsers.dto';

const Dashboard: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [users, setUsers] = useState<UserDto[] | null>(null);
  const [metadata, setMetadata] = useState<PaginationMetadata | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    findUsers({ page })
      .then((data) => {
        setUsers((prevState) => {
          if (prevState?.length) return [...prevState, ...data.data];

          return data.data;
        });
        setMetadata(data.meta);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page]);

  if (isLoading) return <Layout>Loading...</Layout>;

  function translateUserType(type: UserType) {
    if (type === 'DOCTOR') return 'Liječnik';
    if (type === 'NURSE') return 'Tehničar';
    if (type === 'LIFEGUARD') return 'Spasioc';
  }

  function changePage() {
    setPage((prevState) => prevState + 1);
  }

  return (
    <>
      <Layout>
        <div className={style.container}>
          {users?.length && metadata?.count ? (
            <>
              <div className={style.header}>
                <div className={style.users}>
                  <span>{metadata.count}</span>
                  <span>{metadata.count !== 1 ? 'Korisnika' : 'Korisnik'}</span>
                </div>
                <span className={style.filter}>Filter</span>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Profilna slika</th>
                    <th>Korisničko ime</th>
                    <th>Lokacija</th>
                    <th>Pogledaj profil</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <Image
                          src={user.profilePhoto || '/user-icon.png'}
                          style={{ borderRadius: '100000px' }}
                          alt="User profile picture"
                          width={48}
                          height={48}
                        />
                      </td>
                      <td>
                        <div className={style.usernameCell}>
                          <span className={style.userName}>
                            {user.userAttributes.firstname +
                              ' ' +
                              user.userAttributes.lastname}{' '}
                          </span>
                          <span className={style.userTitle}>
                            {translateUserType(user.userAttributes.type)}
                          </span>
                        </div>
                      </td>
                      <td className={style.userCity}>
                        {user.userAttributes.city}
                      </td>
                      <td>Pregledaj profil</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {users.length < metadata.count && (
                <button onClick={changePage}>Učitaj još</button>
              )}
            </>
          ) : (
            <span>No usersFound</span>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
