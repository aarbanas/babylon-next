'use client';
import React, { useEffect, useRef, useState } from 'react';
import style from './Dashboard.module.scss';
import findUsers from '@/services/user/find';
import Image from 'next/image';
import { UserDto } from '@/services/user/dto/user.dto';
import { PaginationMetadata } from '@/services/user/dto/findUsers.dto';
import { debounce } from 'lodash';
import { Type } from '@/app/register/types';
import DashboardLayout from '@/shared/layouts/dashboardLayout';

enum FilterKey {
  FIRSTNAME = 'firstname',
  LASTNAME = 'lastname',
  CITY = 'city',
}

const Dashboard: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [filter, setFilter] = useState<string>('');
  const [filterKey, setFilterKey] = useState<string | null>(null);
  const [users, setUsers] = useState<UserDto[] | null>(null);
  const [metadata, setMetadata] = useState<PaginationMetadata | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await findUsers({
          page,
          filter: filter && filterKey ? { [filterKey]: filter } : undefined,
        });
        setUsers((prevState) => {
          if (filter || !prevState?.length) return data.data;

          data.data.forEach((user) => {
            const userIndex = prevState.findIndex(({ id }) => id === user.id);
            if (userIndex < 0) prevState.push(user);
          });

          return prevState;
        });
        setMetadata(data.meta);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, filter, filterKey]);

  const debounceSearch = useRef(
    debounce((criteria) => {
      setFilter(criteria);
    }, 500)
  ).current;

  function searchText(e: React.ChangeEvent<HTMLInputElement>) {
    debounceSearch(e.target.value);
  }

  if (isLoading) return <DashboardLayout>Loading...</DashboardLayout>;

  function translateUserType(type: Type) {
    if (type === Type.DOCTOR) return 'Liječnik';
    if (type === Type.NURSE) return 'Tehničar';
    if (type === Type.LIFEGUARD) return 'Spasioc';
  }

  function changePage() {
    setPage((prevState) => prevState + 1);
  }

  return (
    <>
      <DashboardLayout>
        <div className={style.container}>
          <>
            <div className={style.header}>
              <div className={style.users}>
                <span>{metadata?.count ?? 0}</span>
                <span>{metadata?.count !== 1 ? 'Korisnika' : 'Korisnik'}</span>
              </div>
              <div className={style.filter}>
                <select
                  id="grid-state"
                  defaultValue={'DEFAULT'}
                  onChange={(choice) => {
                    setFilterKey(choice.target.value);
                    setPage(0);
                  }}>
                  <option value="DEFAULT" disabled>
                    Pretraži po
                  </option>
                  <option value={FilterKey.FIRSTNAME}>Ime</option>
                  <option value={FilterKey.LASTNAME}>Prezime</option>
                  <option value={FilterKey.CITY}>Grad</option>
                </select>
                <input
                  type="text"
                  placeholder={
                    filterKey ? 'Pretraga korisnika' : 'Odaberi iz izbornika'
                  }
                  onChange={searchText}
                  disabled={!filterKey}
                />
              </div>
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
                {users?.map((user) => (
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
                    <td>
                      <button color={'secondary'}>Pregledaj profil</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users && metadata && (
              <>
                {users.length < metadata.count && (
                  <div className={style.loadMore}>
                    <button onClick={changePage}>Učitaj još</button>
                  </div>
                )}
              </>
            )}
          </>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
