'use client';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import login from '@/services/auth/login';
import { useRouter } from 'next/navigation';

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
      // TODO Redirect to correct page
      router.push('/');
    } catch (e) {
      setError('Pogrešni podaci');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md sm:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-teal-500 underline">
          Prijavi se
        </h1>
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Email
            </label>
            <input
              {...register('username')}
              type="email"
              className="block w-full px-4 py-2 mt-2 text-teal-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Lozinka
            </label>
            <input
              {...register('password')}
              type="password"
              className="block w-full px-4 py-2 mt-2 text-teal-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <a
            href="#"
            className="text-xs text-teal-400 underline hover:text-teal-500">
            Zaboravljena Lozinka?
          </a>
          <div className="mt-6">
            <button
              disabled={submitting}
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-teal-500 rounded-md hover:bg-teal-600 focus:outline-none focus:bg-teal-600">
              Prijava
            </button>
          </div>
        </form>

        {error && <span className="text-rose-600">{error}</span>}

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {' '}
          Nemaš račun?{' '}
          <a
            href="/register"
            className="font-medium text-teal-500 hover:underline">
            Registracija
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
