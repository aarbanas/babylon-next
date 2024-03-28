import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import Form from '@/shared/form/Form';
import { Type } from '@/app/register/types';
import Button from '@/shared/button/Button';
import FormInput from '@/shared/formInput/FormInput';
import updateUser from '@/services/user/update';
import FormSelect from '@/shared/formSelect/FormSelect';
import { UserDto } from '@/services/user/dto/user.dto';

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
        <div className="flex flex-wrap sm:flex-nowrap sm:gap-10">
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
        <div className="flex flex-wrap sm:flex-nowrap sm:gap-10">
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
          <FormSelect
            id="type"
            label="Tip korisnika*"
            placeholder="Odaberi vrstu"
            {...form.register('type', {
              required: 'Vrsta korisnika je obavezno polje',
            })}>
            <option value={Type.DOCTOR}>Liječnik</option>
            <option value={Type.NURSE}>Tehničar</option>
            <option value={Type.LIFEGUARD}>Spasioc</option>
          </FormSelect>
        </div>
        <div className="flex">
          <div className="mt-6 w-full sm:mt-0">
            <Button
              color="primary"
              showLoader={isSubmitting}
              className="bg-black !text-base text-white"
              type="submit"
              full>
              <span>Spremi promjene</span>
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default UserProfileForm;
