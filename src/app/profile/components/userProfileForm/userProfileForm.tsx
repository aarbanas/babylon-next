import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Type } from '@/app/register/types';
import { UserDto } from '@/services/user/dto/user.dto';
import updateUser from '@/services/user/update';
import { toast } from 'react-toastify';
import { LoadingSpinner } from '@/shared/loadingSpinner';

type Props = {
  userData: UserDto;
};

type UpdateUserFields = {
  firstname: string;
  lastname: string;
  city: string;
  phone?: string;
  type: Type;
};

const UserProfileForm: FC<Props> = ({ userData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<UpdateUserFields>({
    defaultValues: {
      city: userData.userAttributes.city ?? '',
      firstname: userData.userAttributes.firstname ?? '',
      lastname: userData.userAttributes.lastname ?? '',
      phone: userData.userAttributes.phone ?? '',
      type: userData.userAttributes.type ?? '',
    },
  });

  const submit = async () => {
    try {
      setIsSubmitting(true);
      await updateUser(String(userData.id), getValues());
      toast('Profil je uspješno ažuriran', { type: 'success' });
    } catch (error) {
      toast('Nešto je prošlo po zlu. Probajte ponoviti', { type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex">
          <div className="w-1/2 mr-10">
            <label htmlFor="firstName" className="block mb-1">
              Ime*
            </label>
            <input
              {...register('firstname', { required: 'Ime je obavezno polje' })}
              type="text"
              placeholder="John"
              id="firstName"
              className="w-full px-3 py-4 rounded-full bg-gray-100 shadow-lg border-none outline-none"
            />
            <small className="block mt-2 text-red-700">
              {errors?.firstname && (
                <span role="alert">{errors.firstname.message}</span>
              )}
            </small>
          </div>
          <div className="w-1/2">
            <label htmlFor="lastName" className="block mb-1">
              Prezime
            </label>
            <input
              {...register('lastname', {
                required: 'Prezime je obavezno polje',
              })}
              type="text"
              placeholder="Doe"
              id="lastName"
              className="w-full px-3 py-4 rounded-full bg-gray-100 shadow-lg border-none outline-none"
            />
            <small className="block mt-2 text-red-700">
              {errors?.lastname && (
                <span role="alert">{errors.lastname.message}</span>
              )}
            </small>
          </div>
        </div>
        <div className="flex mt-10">
          <div className="w-1/2 mr-10">
            <label htmlFor="city" className="block mb-1">
              Grad*
            </label>
            <input
              {...register('city', { required: 'Grad je obavezno polje' })}
              type="text"
              placeholder="New York"
              id="city"
              className="w-full px-3 py-4 rounded-full bg-gray-100 shadow-lg border-none outline-none"
            />
            <small className="block mt-2 text-red-700">
              {errors?.city && <span role="alert">{errors.city.message}</span>}
            </small>
          </div>
          <div className="w-1/2">
            <label htmlFor="phone" className="block mb-1">
              Broj mobitela
            </label>
            <input
              {...register('phone')}
              type="text"
              placeholder="+385998885698"
              id="phone"
              className="w-full px-3 py-4 rounded-full bg-gray-100 shadow-lg border-none outline-none"
            />
          </div>
        </div>
        <div className="flex mt-10">
          <div className="w-full">
            <label htmlFor="type" className="block mb-1">
              Tip korisnika*
            </label>
            <select
              {...register('type', {
                required: 'Vrsta korisnika je obavezno polje',
              })}
              id="type"
              className="w-full px-3 py-4 rounded-full bg-gray-100 shadow-lg border-none outline-none">
              <option value="DEFAULT" disabled>
                Odaberi vrstu
              </option>
              <option value={Type.DOCTOR}>Liječnik</option>
              <option value={Type.NURSE}>Tehničar</option>
              <option value={Type.LIFEGUARD}>Spasioc</option>
            </select>
            <small className="block mt-2 text-red-700">
              {errors?.type && <span role="alert">{errors.type.message}</span>}
            </small>
          </div>
        </div>
        <div className="flex mt-10">
          <div className="w-full">
            <button className="rounded-full text-white bg-black py-4 w-full relative">
              {isSubmitting ? (
                <LoadingSpinner
                  height={24}
                  width={24}
                  color="#ffffff"
                  position="relative"
                />
              ) : (
                <span>Spremi promjene</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UserProfileForm;
