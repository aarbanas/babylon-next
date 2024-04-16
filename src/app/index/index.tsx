'use client';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Head from 'next/head';

const Index: NextPage = () => {
  const router = useRouter();

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
            <Button
              className="inline-flex h-10 cursor-pointer items-center justify-center rounded-md border border-gray-800 bg-gray-950 px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-800 hover:text-gray-50 focus-visible:ring-gray-300"
              onClick={() => router.push('/login')}>
              Prijava
            </Button>
            <Button
              className="inline-flex h-10 cursor-pointer items-center justify-center rounded-md bg-gray-50 px-8 text-sm font-medium text-gray-900 shadow transition-colors hover:bg-gray-50/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300 disabled:pointer-events-none disabled:opacity-50"
              onClick={() => router.push('/register')}>
              Registracija
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
