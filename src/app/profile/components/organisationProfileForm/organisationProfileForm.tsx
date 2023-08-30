import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import Form from '@/shared/form/Form';
import Button from '@/shared/button/Button';
import FormInput from '@/shared/formInput/FormInput';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<UpdateOrganizationFields>({
    defaultValues: {
      city: userData.organisationAttributes.city ?? '',
      name: userData.organisationAttributes.name ?? '',
      oib: userData.organisationAttributes.oib ?? '',
      street: userData.organisationAttributes.street ?? '',
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
        <div className="flex flex-wrap sm:flex-nowrap">
          <FormInput
            id="name"
            label="Naziv organizacije*"
            placeholder="Crveni križ"
            {...form.register('name', {
              required: 'Naziv organizacije je obavezno polje',
            })}
          />
        </div>
        <div className="flex flex-wrap sm:flex-nowrap">
          <FormInput
            id="oib"
            label="OIB*"
            placeholder="OIB"
            {...form.register('oib', { required: 'OIB je obavezno polje' })}
          />
        </div>
        <div className="flex flex-wrap sm:flex-nowrap sm:gap-10">
          <FormInput
            id="city"
            label="Grad*"
            placeholder="Rijeka"
            {...form.register('city', { required: 'Grad je obavezno polje' })}
          />
          <FormInput
            id="street"
            label="Ulica i broj*"
            placeholder="Vukovarske ulica"
            {...form.register('street', {
              required: 'Ulica i broj je obavezno polje',
            })}
          />
        </div>
        <div className="flex">
          <div className="w-full mt-6 sm:mt-0">
            <Button
              color="primary"
              showLoader={isSubmitting}
              className="bg-black text-white !text-base"
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

export default OrganisationProfileForm;
