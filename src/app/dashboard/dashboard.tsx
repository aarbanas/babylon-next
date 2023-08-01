'use client';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';

const Dashboard: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col justify-center items-center h-full">
        <span
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center font-bold
                     bg-gradient-to-tl from-slate-100 via-teal-500 to-zinc-100 bg-clip-text text-transparent">
          Dobrodošli na stranice Babylon!
        </span>
        <div className="flex w-5/6 sm:w-2/4 mt-10 sm:mt-14 lg:mt-20">
          <button
            onClick={() => router.push('/login')}
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700
                             border-teal-500 hover:border-teal-700 text-lg sm:text-xl md:text-3xl
                             lg:text-4xl border-4 text-white py-1 px-2 rounded">
            Prijava
          </button>
          <button
            onClick={() => router.push('/register')}
            className="ml-auto flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500
                             hover:border-teal-700 text-lg sm:text-xl md:text-3xl
                             lg:text-4xl border-4 text-white py-1 px-2 rounded">
            Registracija
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
