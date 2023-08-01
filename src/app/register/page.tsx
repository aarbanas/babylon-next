'use client';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import registerUser from '@/services/user/register';
import { RegisterUserData, Role, Type } from '@/app/register/types';

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
    if (values.password !== values.repeatPassword) {
      setError('Lozinke se ne podudaraju');
      return;
    }

    router.push('/login');
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { repeatPassword, ...rest } = values;
      await registerUser(rest);
    } catch (e) {
      setError('Pogrešni podatci');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md sm:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-teal-500 underline">
          Registriraj se
        </h1>

        <form className="mt-6" onSubmit={handleSubmit(submit)}>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Tip računa*
            </label>

            <div className="relative">
              <select
                {...register('role', { required: true })}
                className="block appearance-none w-full bg-white border rounded-md border-gray-200 text-gray-700 py-3 px-4 pr-8 leading-tight focus:outline-none focus:ring focus:ring-opacity-40 focus:border-teal-400 focus:ring-teal-300"
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

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700" />
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Email*
            </label>
            <input
              {...register('email', { required: true })}
              type="email"
              className="block w-full px-4 py-2 mt-2 text-teal-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Lozinka*
            </label>
            <input
              {...register('password', { required: true })}
              type="password"
              className="block w-full px-4 py-2 mt-2 text-teal-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Ponovi lozinku*
            </label>
            <input
              {...register('repeatPassword', { required: true })}
              type="password"
              className="block w-full px-4 py-2 mt-2 text-teal-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          {role && (
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Grad*
              </label>
              <input
                {...register('city', { required: true })}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-teal-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          )}

          {role === Role.USER && (
            <div>
              <div className="mb-2">
                <label className="block text-sm font-semibold text-gray-800">
                  Vrsta korisnika*
                </label>

                <div className="relative">
                  <select
                    {...register('type')}
                    className="block appearance-none w-full bg-white border rounded-md border-gray-200 text-gray-700 py-3 px-4 pr-8 leading-tight focus:outline-none focus:ring focus:ring-opacity-40 focus:border-teal-400 focus:ring-teal-300"
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

          {role === Role.ORGANISATION && (
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
              Registracija
            </button>
          </div>
        </form>

        {error && <span className="text-rose-600">{error}</span>}

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {' '}
          Već imaš račun?{' '}
          <a
            href="/login"
            className="font-medium text-teal-500 hover:underline">
            Prijavi se
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
