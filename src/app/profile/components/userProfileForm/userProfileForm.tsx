import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Form } from '@/shared/form';
import { UserDto } from '@/services/user/dto/user.dto';
import updateUser from '@/services/user/update';
import { toast } from 'react-toastify';
import { LoadingSpinner } from '@/shared/loadingSpinner';
import { FormInput } from '@/shared/formInput';
import { Type } from '@/app/register/types';

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
  const form = useForm<UpdateUserFields>({
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
      await updateUser(String(userData.id), form.getValues());
      toast('Profil je uspješno ažuriran', { type: 'success' });
    } catch (error) {
      toast('Nešto je prošlo po zlu. Probajte ponoviti', { type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Form form={form} onSubmit={submit}>
        <div className="flex flex-wrap sm:flex-nowrap sm:gap-16">
          <FormInput
            id="firstName"
            label="Ime*"
            placeholder="Ivan"
            {...form.register('firstname', {
              required: 'Ime je obavezno polje',
            })}
          />
          <FormInput
            id="lastName"
            label="Prezime*"
            placeholder="Doe"
            {...form.register('lastname', {
              required: 'Prezime je obavezno polje',
            })}
          />
        </div>
        <div className="flex flex-wrap sm:flex-nowrap sm:gap-16">
          <FormInput
            id="city"
            label="Grad*"
            placeholder="Rijeka"
            {...form.register('city', {
              required: 'Grad je obavezno polje',
            })}
          />
          <FormInput
            id="phone"
            label="Broj mobitela"
            placeholder="+385998885698"
            {...form.register('phone')}
          />
        </div>
        <div className="flex flex-wrap sm:flex-nowrap">
          <div className="w-full mt-6 sm:mt-0">
            <label
              htmlFor="type"
              className="block font-light text-gray-500 mb-2">
              Tip korisnika*
            </label>
            <select
              {...form.register('type', {
                required: 'Vrsta korisnika je obavezno polje',
              })}
              id="type"
              className="w-full px-3 py-4 rounded-full bg-gray-100 shadow-lg border-none focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40">
              <option value="DEFAULT" disabled>
                Odaberi vrstu
              </option>
              <option value={Type.DOCTOR}>Liječnik</option>
              <option value={Type.NURSE}>Tehničar</option>
              <option value={Type.LIFEGUARD}>Spasioc</option>
            </select>
          </div>
        </div>
        <div className="flex">
          <div className="w-full mt-6 sm:mt-0">
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
      </Form>
    </>
  );
};

export default UserProfileForm;
