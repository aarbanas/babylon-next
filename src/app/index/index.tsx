'use client';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/shared/button/Button';

const Index: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex h-full flex-col items-center justify-center sm:p-0  md:flex-row md:p-6 lg:p-8">
        <div className="flex w-1/2">
          <Image
            src="/home_page.png"
            alt="Main image"
            objectFit={'cover'}
            layout={'responsive'}
            width={100}
            height={100}
          />
        </div>
        <div className="mt-6 flex w-1/2 flex-col items-center justify-center md:mt-0">
          <Image
            className="hidden md:block"
            src="/home_page_thumbnail.png"
            alt="Thumbnail image"
            sizes="100vw"
            width={96}
            height={96}
            style={{
              width: '96px',
              height: 'auto',
            }}
          />
          <div className="flex flex-col items-center">
            <span className="font-sans text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl">
              Babylon
            </span>
            <span className="mt-3 font-sans text-sm sm:text-lg md:text-xl lg:text-2xl">
              Aplikacija za medicinske usluge na sportskim natjecanjima
            </span>
          </div>
          <div className="mt-6 flex w-full flex-col items-center md:flex-row md:justify-around">
            <Button color="primary" onClick={() => router.push('/login')}>
              Prijava
            </Button>
            <Button
              className="mt-4 md:mt-0"
              color="primary"
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
