'use client';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import registerUser from '@/services/user/register';
import { RegisterUserData, Role, Type } from '@/app/register/types';
import Image from 'next/image';
import Button from '@/shared/button/button';
import Back from '@/shared/icons/back/Back';

const Register: NextPage = () => {
  const { watch, getValues, handleSubmit, register } = useForm<
    RegisterUserData & { repeatPassword: string }
  >();
  const [role, setRole] = useState<Role>();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const subscription = watch((value) => {
      setRole(value.role);
      setError('');
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  async function submit() {
    setSubmitting(true);
    const values = getValues();

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { repeatPassword, ...rest } = values;
      await registerUser(rest);
      router.push('/');
    } catch (e) {
      setError('Pogrešni podatci');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="flex flex-col md:flex-row items-center h-full sm:p-0 md:p-6 lg:p-8">
        <div className="flex flex-col items-center w-2/5">
          <Image
            src="/login_page.png"
            alt="Login image"
            objectFit={'cover'}
            layout={'responsive'}
            width={100}
            height={100}
          />
          <div
            className="flex justify-start cursor-pointer"
            onClick={() => router.push('/')}>
            <div className="w-8 h-8">
              <Back />
            </div>
            <span className="ml-2 flex items-center">Povratak</span>
          </div>
        </div>

        <div
          className={
            'flex flex-col w-3/5 h-full items-center flex-wrap ' +
            (role ? '' : 'justify-center')
          }>
          <form
            className="mt-6 w-full md:w-3/5"
            onSubmit={handleSubmit(submit)}>
            <h1 className="text-3xl font-semibold">Registracija</h1>

            <div className="mt-6">
              <label className="block text-sm font-light text-gray-500">
                Vrsta računa*
              </label>

              <div className="relative">
                <select
                  {...register('role', { required: true })}
                  className="block appearance-none w-full bg-white border-gray-300 rounded-xl text-gray-700 py-3 px-4 pr-8 leading-tight focus:outline-none focus:ring focus:ring-opacity-40 focus:border-gray-300-red-400 focus:ring-red-300"
                  id="grid-state"
                  defaultValue={'DEFAULT'}>
                  <option value="DEFAULT" disabled>
                    Odaberi tip
                  </option>
                  <option value={Role.USER}>
                    Korisnik (Liječnik, Tehničar, Spasioc)
                  </option>
                  <option value={Role.ORGANISATION}>
                    Organizacija (Sportska udruga, klub)
                  </option>
                </select>
              </div>
            </div>

            <div className="mb-2">
              <label className="block text-sm font-light text-gray-500">
                Email*
              </label>
              <input
                {...register('email', { required: true })}
                type="email"
                className="block w-full px-4 py-2 mt-2 bg-white border-gray-300 rounded-xl focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-light text-gray-500">
                Lozinka*
              </label>
              <input
                {...register('password', { required: true })}
                type="password"
                className="block w-full px-4 py-2 mt-2 bg-white border-gray-300 rounded-xl focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-light text-gray-500">
                Ponovi lozinku*
              </label>
              <input
                {...register('repeatPassword', {
                  required: true,
                  validate: (val: string) => {
                    if (watch('password') !== val)
                      return 'Lozinke se ne podudaraju';
                  },
                })}
                type="password"
                className="block w-full px-4 py-2 mt-2 bg-white border-gray-300 rounded-xl focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            {role && (
              <div className="mb-2">
                <label className="block text-sm font-light text-gray-500">
                  Grad*
                </label>
                <input
                  {...register('city', { required: true })}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 bg-white border-gray-300 rounded-xl focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            )}

            {role === Role.USER && (
              <div>
                <div className="mb-2">
                  <label className="block text-sm font-light text-gray-500">
                    Vrsta korisnika*
                  </label>

                  <div className="relative">
                    <select
                      {...register('type')}
                      className="block appearance-none w-full bg-white border-gray-300 rounded-xl text-gray-700 py-3 px-4 pr-8 leading-tight focus:outline-none focus:ring focus:ring-opacity-40 focus:border-red-400 focus:ring-red-300"
                      id="grid-state"
                      defaultValue={'DEFAULT'}>
                      <option value="DEFAULT" disabled>
                        Odaberi vrstu
                      </option>
                      <option value={Type.DOCTOR}>Liječnik</option>
                      <option value={Type.NURSE}>Tehničar</option>
                      <option value={Type.LIFEGUARD}>Spasioc</option>
                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700" />
                  </div>
                </div>

                <div className="mb-2">
                  <label className="block text-sm font-light text-gray-500">
                    Ime*
                  </label>
                  <input
                    {...register('firstname')}
                    type="text"
                    className="block w-full px-4 py-2 mt-2 bg-white border-gray-300 rounded-xl focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mb-2">
                  <label className="block text-sm font-light text-gray-500">
                    Prezime*
                  </label>
                  <input
                    {...register('lastname')}
                    type="text"
                    className="block w-full px-4 py-2 mt-2 bg-white border-gray-300 rounded-xl focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mb-2">
                  <label className="block text-sm font-light text-gray-500">
                    Telefon*
                  </label>
                  <input
                    {...register('phone')}
                    type="text"
                    className="block w-full px-4 py-2 mt-2 bg-white border-gray-300 rounded-xl focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
              </div>
            )}

            {role === Role.ORGANISATION && (
              <div>
                <div className="mb-2">
                  <label className="block text-sm font-light text-gray-500">
                    Naziv*
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    className="block w-full px-4 py-2 mt-2 bg-white border-gray-300 rounded-xl focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mb-2">
                  <label className="block text-sm font-light text-gray-500">
                    Ulica i Broj*
                  </label>
                  <input
                    {...register('street')}
                    type="text"
                    className="block w-full px-4 py-2 mt-2 bg-white border-gray-300 rounded-xl focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mb-2">
                  <label className="block text-sm font-light text-gray-500">
                    OIB*
                  </label>
                  <input
                    {...register('oib')}
                    type="text"
                    className="block w-full px-4 py-2 mt-2 bg-white border-gray-300 rounded-xl focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
              </div>
            )}

            <div className="mt-6">
              <Button color="primary" disabled={submitting} type="submit" full>
                Registracija
              </Button>
            </div>

            <p className="mt-6 mb-6 text-xs font-light text-center text-gray-700">
              {' '}
              Već imaš račun?{' '}
              <a
                href="/login"
                className="font-medium text-primary-color hover:underline">
                Prijava
              </a>
            </p>
            {error && <span className="text-rose-600">{error}</span>}
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
