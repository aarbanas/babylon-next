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
import Footer from '@/components/ui/footer';

const Index: NextPage = () => {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/*TODO Add correct data here*/}
      <Head>
        <title>Your Page Title</title>
        <meta name="description" content="Your page description" />
        <meta property="og:title" content="Your Page Title" />
        <meta property="og:description" content="Your page description" />
        <meta property="og:url" content="https://yourwebsite.com/your-page" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://yourwebsite.com/your-page" />
      </Head>
      <div className="flex h-full flex-col justify-center border-t bg-secondary-color">
        <div className="container grid grow items-center justify-center gap-4 px-4 py-12 md:grid-cols-[1fr_400px] md:px-6 lg:gap-10 lg:py-24 xl:grid-cols-[1fr_600px]">
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
                <Button className="px-8" onClick={() => setShowLogin(true)}>
                  Prijava
                </Button>
                <Button
                  className="px-8"
                  variant="secondary"
                  onClick={() => router.push('/register')}>
                  Registracija
                </Button>
              </>
            )}
          </div>
        </div>
        <Footer />
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
          variant="secondary"
          className="ml-auto">
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
