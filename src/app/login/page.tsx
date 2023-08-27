'use client';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import login from '@/services/auth/login';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/shared/button';
import Back from '@/shared/icons/back/Back';

type FormData = {
  username: string;
  password: string;
};

const Login: NextPage = () => {
  const { watch, getValues, handleSubmit, register } = useForm<FormData>();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const subscription = watch(() => setError(''));
    return () => subscription.unsubscribe();
  }, [watch]);

  async function onSubmit() {
    setSubmitting(true);
    const { username, password } = getValues();

    try {
      await login(username, password);
      router.push('/profile');
    } catch (e) {
      setError('Pogrešni podaci');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center h-full sm:p-0 md:p-6 lg:p-8">
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

        <div className="flex flex-col w-3/5 items-center">
          <form
            className="mt-6 w-full md:w-3/5"
            onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-3xl font-semibold">Prijava</h1>

            <div className="mt-6">
              <label className="block text-sm font-light text-gray-500">
                Email
              </label>
              <input
                {...register('username', { required: true })}
                type="email"
                className="block w-full px-4 py-2 mt-3 bg-white border-gray-300 rounded-xl focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-light text-gray-500 mt-1">
                Lozinka
              </label>
              <input
                {...register('password', { required: true })}
                type="password"
                className="block w-full px-4 py-2 mt-3 bg-white border-gray-300 rounded-xl focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <a href="#" className="text-xs underline hover:text-red-700 mt-3">
              Zaboravljena Lozinka?
            </a>

            <div className="mt-4 md:mt-8">
              <Button
                color="primary"
                disabled={submitting}
                type="submit"
                full
                showLoader={submitting}>
                Prijava
              </Button>
            </div>

            <p className="mt-4 md:mt-8 mb-6 md:mb-0 text-xs font-light text-center text-gray-700">
              {' '}
              Nemaš račun?{' '}
              <a
                href="/register"
                className="font-medium text-primary-color hover:underline">
                Registracija
              </a>
            </p>
            {error && <span className="text-rose-600">{error}</span>}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
