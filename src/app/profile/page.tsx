'use client';
import { NextPage } from 'next';
import DashboardLayout from '@/shared/layouts/dashboardLayout';
import { RegisterUserData, Role, Type } from '@/app/register/types';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useCurrentUser } from '@/services/auth/currentUser';
import findOne from '@/services/user/findOne';
import { UserAttributesDto, UserDto } from '@/services/user/dto/user.dto';
import updateUser from '@/services/user/update';

const Profile: NextPage = () => {
  const { getValues, handleSubmit, register, setValue } = useForm<
    RegisterUserData & { repeatPassword: string }
  >();
  const sessionUser = useCurrentUser();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<UserDto | null>(null);

  useEffect(() => {
    if (sessionUser) {
      findOne(sessionUser.sub)
        .then((_user) => {
          const fields: (keyof UserAttributesDto)[] = [
            'city',
            'type',
            'firstname',
            'lastname',
            'phone',
          ];
          fields.forEach((field) => {
            setValue(
              field as keyof RegisterUserData,
              _user.userAttributes[field].toString()
            );
          });
          setUser(_user);
        })
        .catch();
    }
  }, [sessionUser, setValue]);

  async function submit() {
    setSubmitting(true);
    const values = getValues();
    if (!sessionUser) {
      setError('Greška prilikom ažuriranja!');
      return;
    }

    try {
      await updateUser(sessionUser.sub, values);
    } catch (e) {
      setError('Pogrešni podatci');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <DashboardLayout>
        <div className="relative flex flex-col sm:flex-row sm:justify-evenly min-h-screen overflow-hidden p-4 bg-gray-200">
          <div className="flex flex-col items-center sm:items-start sm:flex-row w-full h-1/2 justify-between p-6">
            <div className="flex flex-col text-center items-start text-black">
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
                Osnovni podaci
              </span>
              <span className="mt-4 text-start font-semibold">
                Uredi osnovne podatke svojeg računa.
              </span>
            </div>

            <div className="w-8/12 h-1/2 p-6 bg-gray-100 rounded-md shadow-md">
              <form className="mt-6" onSubmit={handleSubmit(submit)}>
                <div className="mb-2">
                  <label className="block text-sm font-semibold text-gray-800">
                    Grad*
                  </label>
                  <input
                    {...register('city')}
                    type="text"
                    className="block w-7/12 px-4 py-2 mt-2 text-teal-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                {user?.role === Role.USER && (
                  <div>
                    <div className="mb-2">
                      <label className="block text-sm font-semibold text-gray-800">
                        Vrsta korisnika*
                      </label>

                      <div className="relative">
                        <select
                          {...register('type')}
                          className="block appearance-none w-7/12 bg-white border rounded-md border-gray-200 text-gray-700 py-3 px-4 pr-8 leading-tight focus:outline-none focus:ring focus:ring-opacity-40 focus:border-teal-400 focus:ring-teal-300"
                          id="grid-state"
                          defaultValue={'DEFAULT'}>
                          <option value="DEFAULT" disabled>
                            Odaberi vrstu
                          </option>
                          <option value={Type.DOCTOR}>Liječnik</option>
                          <option value={Type.NURSE}>Tehničar</option>
                          <option value={Type.LIFEGUARD}>Spasioc</option>
                        </select>
                      </div>

                      <div className="mb-2">
                        <label className="block text-sm font-semibold text-gray-800">
                          Ime*
                        </label>
                        <input
                          {...register('firstname')}
                          type="text"
                          className="block w-7/12 px-4 py-2 mt-2 text-teal-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                      </div>

                      <div className="mb-2">
                        <label className="block text-sm font-semibold text-gray-800">
                          Prezime*
                        </label>
                        <input
                          {...register('lastname')}
                          type="text"
                          className="block w-7/12 px-4 py-2 mt-2 text-teal-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                      </div>
                    </div>

                    <div className="mb-2">
                      <label className="block text-sm font-semibold text-gray-800">
                        Ime*
                      </label>
                      <input
                        {...register('firstname')}
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-teal-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>

                    <div className="mb-2">
                      <label className="block text-sm font-semibold text-gray-800">
                        Prezime*
                      </label>
                      <input
                        {...register('lastname')}
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-teal-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>

                    <div className="mb-2">
                      <label className="block text-sm font-semibold text-gray-800">
                        Telefon*
                      </label>
                      <input
                        {...register('phone')}
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-teal-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>
                  </div>
                )}

                {user?.role === Role.ORGANISATION && (
                  <div>
                    <div className="mb-2">
                      <label className="block text-sm font-semibold text-gray-800">
                        Naziv*
                      </label>
                      <input
                        {...register('name')}
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-teal-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>

                    <div className="mb-2">
                      <label className="block text-sm font-semibold text-gray-800">
                        Ulica i Broj*
                      </label>
                      <input
                        {...register('street')}
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-teal-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>

                    <div className="mb-2">
                      <label className="block text-sm font-semibold text-gray-800">
                        OIB*
                      </label>
                      <input
                        {...register('oib')}
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-teal-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <button
                    disabled={submitting}
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-teal-500 rounded-md hover:bg-teal-600 focus:outline-none focus:bg-teal-600">
                    Ažuriraj
                  </button>
                </div>
              </form>

              {error && <span className="text-rose-600">{error}</span>}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Profile;
