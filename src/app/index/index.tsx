'use client';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import login from '@/services/auth/login';
import FormInput from '@/shared/formInput/FormInput';
import Form from '@/shared/form/Form';

const Index: NextPage = () => {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Head>
        <title>Your Page Title</title>
        <meta name="description" content="Your page description" />
        <meta property="og:title" content="Your Page Title" />
        <meta property="og:description" content="Your page description" />
        <meta property="og:url" content="https://yourwebsite.com/your-page" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://yourwebsite.com/your-page" />
      </Head>
      <div className="flex h-full justify-center border-t bg-gray-50/90 bg-secondary-color">
        <div className="container grid items-center justify-center gap-4 px-4 py-12 md:grid-cols-[1fr_400px] md:px-6 lg:gap-10 lg:py-24 xl:grid-cols-[1fr_600px]">
          <div className="space-y-3 text-center md:items-start md:text-left">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Dobrodošli na stranice Dežurstva.hr
            </h1>
            <p className="max-w-[400px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Aplikacija za medicinske usluge na sportskim natjecanjima
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3 min-[400px]:flex-row">
            {showLogin ? (
              <Login showLogin={() => setShowLogin(false)} />
            ) : (
              <>
                {' '}
                <Button
                  className="inline-flex h-10 cursor-pointer items-center justify-center rounded-md border border-gray-800 bg-gray-950 px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-800 hover:text-gray-50 focus-visible:ring-gray-300"
                  onClick={() => setShowLogin(true)}>
                  Prijava
                </Button>
                <Button
                  className="inline-flex h-10 cursor-pointer items-center justify-center rounded-md bg-gray-50 px-8 text-sm font-medium text-gray-900 shadow transition-colors hover:bg-gray-50/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300 disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => router.push('/register')}>
                  Registracija
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

type FormData = {
  username: string;
  password: string;
};

type LoginProps = {
  showLogin: VoidFunction;
};
const Login: React.FC<Readonly<LoginProps>> = ({ showLogin }) => {
  const form = useForm<FormData>();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function onSubmit() {
    setSubmitting(true);
    const { username, password } = form.getValues();

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
    <Form form={form} onSubmit={onSubmit}>
      <FormInput
        id="username"
        label="Email"
        className="text-black"
        {...form.register('username', {
          required: 'Email je obavezno polje',
        })}
      />
      <FormInput
        id="password"
        label="Lozinka"
        type="password"
        className="text-black"
        {...form.register('password', {
          required: 'Lozinka je obavezno polje',
        })}
      />

      <a
        href="#"
        className="mt-3 text-gray-600 underline hover:text-gray-950 md:mt-0">
        Zaboravljena Lozinka?
      </a>

      <div className="mt-4 flex md:mt-0">
        <Button disabled={submitting} type="submit" size="lg">
          Prijava
        </Button>
        <Button
          onClick={() => showLogin()}
          size="lg"
          className="ml-auto bg-gray-50 text-gray-900 hover:bg-gray-50/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300">
          Odustani
        </Button>
      </div>

      <p className="mt-4 text-center font-light text-gray-700 md:mt-0">
        {' '}
        Nemaš račun?{' '}
        <a
          href="/register"
          className="font-medium text-primary-color hover:underline">
          Registracija
        </a>
      </p>
      {error && <span>{error}</span>}
    </Form>
  );
};

export default Index;
