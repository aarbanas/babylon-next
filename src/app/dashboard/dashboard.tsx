'use client';
import { NextPage } from 'next';
import { useState } from 'react';

const Dashboard: NextPage = () => {
  const [searchSting, setSearchString] = useState('');

  return (
    <>
      <div className="flex flex-col justify-center items-center h-full">
        <div className="flex flex-col items-center mb-5">
          <span className="text-4xl text-teal-400">
            Dobrodošli na stranice Babylon!
          </span>
          <p className="w-96 mt-3">
            Mi smo platforma koja se koristi za pretraživanje i ugovaranje
            poslova medicinskih usluga (npr. osiguranje sportskih natjecanja) za
            različita događanja. Svi naši korisnici su medicinsko osoblje
            (doktori, tehničari) ili licencirani spasioci. Mi jamčimo za svakog
            korisnika da je provjeren od strane naših zaposlenika te da zaista
            ima uvjerenja koja su priložena.
          </p>
        </div>
        <form
          className="w-full max-w-lg"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(searchSting);
          }}>
          <div className="flex items-center border-b border-teal-500 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Upišite pojam koji tražite"
              onChange={(e) => {
                setSearchString(e.target.value);
              }}
              value={searchSting}
              aria-label="Full name"
            />
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="submit">
              Traži
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Dashboard;
