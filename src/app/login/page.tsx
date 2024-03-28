'use client';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import login from '@/services/auth/login';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/shared/button/Button';
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
      router.push('/dashboard');
    } catch (e) {
      setError('Pogrešni podaci');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="flex h-full flex-col items-center justify-center sm:p-0 md:flex-row md:p-6 lg:p-8">
        <div className="flex w-2/5 flex-col items-center">
          <Image
            src="/login_page.png"
            alt="Login image"
            objectFit={'cover'}
            layout={'responsive'}
            width={100}
            height={100}
          />
          <div
            className="flex cursor-pointer justify-start"
            onClick={() => router.push('/')}>
            <div className="h-8 w-8">
              <Back />
            </div>
            <span className="ml-2 flex items-center">Povratak</span>
          </div>
        </div>

        <div className="flex w-3/5 flex-col items-center">
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
                className="mt-3 block w-full rounded-xl border-gray-300 bg-white px-4 py-2 focus:border-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label className="mt-1 block text-sm font-light text-gray-500">
                Lozinka
              </label>
              <input
                {...register('password', { required: true })}
                type="password"
                className="mt-3 block w-full rounded-xl border-gray-300 bg-white px-4 py-2 focus:border-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40"
              />
            </div>

            <a href="#" className="mt-3 text-xs underline hover:text-red-700">
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

            <p className="mb-6 mt-4 text-center text-xs font-light text-gray-700 md:mb-0 md:mt-8">
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
