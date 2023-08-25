import { FC } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import updateUser from '@/services/user/update';
import { UserDto } from '@/services/user/dto/user.dto';

type Props = {
  userData: UserDto;
};

type UpdateOrganizationFields = {
  name: string;
  street: string;
  city: string;
  oib: string;
};

const OrganisationProfileForm: FC<Props> = ({ userData }) => {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<UpdateOrganizationFields>({
    defaultValues: {
      city: userData.organisationAttributes.city ?? '',
      name: userData.organisationAttributes.name ?? '',
      oib: userData.organisationAttributes.oib ?? '',
      street: userData.organisationAttributes.street ?? '',
    },
  });

  const submit = async () => {
    try {
      await updateUser(String(userData.id), getValues());
      toast('Profil je uspješno ažuriran', { type: 'success' });
    } catch (error) {
      toast('Nešto je prošlo po zlu. Probajte ponoviti', { type: 'error' });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} style={{ width: 750, margin: 250 }}>
        <div className="flex">
          <div className="w-full">
            <label
              htmlFor="name"
              className="block font-light text-gray-500 mb-2">
              Naziv organizacije*
            </label>
            <input
              {...register('name', {
                required: 'Naziv organizacije je obavezno polje',
              })}
              type="text"
              placeholder=""
              id="name"
              className="w-full px-3 py-4 rounded-full bg-gray-100 shadow-lg border-none focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <small className="block mt-2 text-red-700">
              {errors?.name && <span role="alert">{errors.name.message}</span>}
            </small>
          </div>
        </div>
        <div className="flex mt-10">
          <div className="w-full">
            <label
              htmlFor="oib"
              className="block font-light text-gray-500 mb-2">
              OIB*
            </label>
            <input
              {...register('oib', { required: 'OIB je obavezno polje' })}
              type="text"
              placeholder="OIB"
              id="oib"
              className="w-full px-3 py-4 rounded-full bg-gray-100 shadow-lg border-none focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <small className="block mt-2 text-red-700">
              {errors?.oib && <span role="alert">{errors.oib.message}</span>}
            </small>
          </div>
        </div>
        <div className="flex mt-10">
          <div className="w-1/2 mr-10">
            <label
              htmlFor="city"
              className="block font-light text-gray-500 mb-2">
              Grad*
            </label>
            <input
              {...register('city', { required: 'Grad je obavezno polje' })}
              type="text"
              placeholder="Rijeka"
              id="city"
              className="w-full px-3 py-4 rounded-full bg-gray-100 shadow-lg border-none focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <small className="block mt-2 text-red-700">
              {errors?.city && <span role="alert">{errors.city.message}</span>}
            </small>
          </div>
          <div className="w-1/2">
            <label
              htmlFor="street"
              className="block font-light text-gray-500 mb-2">
              Ulica i Broj*
            </label>
            <input
              {...register('street', {
                required: 'Ulica i broj je obavezno polje',
              })}
              type="text"
              placeholder="Vukovarske ulica"
              id="street"
              className="w-full px-3 py-4 rounded-full bg-gray-100 shadow-lg border-none focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <small className="block mt-2 text-red-700">
              {errors?.street && (
                <span role="alert">{errors.street.message}</span>
              )}
            </small>
          </div>
        </div>

        <div className="flex mt-10">
          <div className="w-full">
            <button className="rounded-full text-white bg-black py-4 w-full">
              Spremi promjene
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default OrganisationProfileForm;
