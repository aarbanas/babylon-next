'use client';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';

const Dashboard: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col justify-center items-center h-full">
        <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-teal-400 text-center">
          Dobrodošli na stranice Babylon!
        </span>
        <div className="flex w-5/6 sm:w-2/4 mt-10 sm:mt-14 lg:mt-20">
          <button
            onClick={() => router.push('/login')}
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700
                             border-teal-500 hover:border-teal-700 text-sm sm:text-lg md:text-xl
                             lg:text-2xl border-4 text-white py-1 px-2 rounded">
            Prijava
          </button>
          <button
            onClick={() => router.push('/register')}
            className="ml-auto flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500
                             hover:border-teal-700 text-sm sm:text-lg md:text-xl
                             lg:text-2xl border-4 text-white py-1 px-2 rounded">
            Registracija
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
