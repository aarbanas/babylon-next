'use client';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import registerUser from '@/services/user/register';
import { RegisterUserData, Role, Type } from '@/app/register/types';
import Form from '@/shared/form/Form';
import FormInput from '@/shared/formInput/FormInput';
import FormSelect from '@/shared/formSelect/FormSelect';
import { Button } from '@/components/ui/button';

const Register: NextPage = () => {
  const form = useForm<RegisterUserData & { repeatPassword: string }>();
  const watch = form.watch;
  const [role, setRole] = useState<Role | undefined>(Role.USER);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const subscription = watch((value) => {
      setRole(value.role);
      setError('');
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  async function submit() {
    setSubmitting(true);
    const values = form.getValues();

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { repeatPassword, ...rest } = values;
      await registerUser(rest);
      router.push('/');
    } catch (e) {
      setError('Pogrešni podatci');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center p-3 md:flex-row md:p-6">
        <Form
          className="mt-6 flex w-full flex-col gap-2 md:w-2/5 md:gap-4"
          form={form}
          onSubmit={submit}>
          <h1 className="text-3xl font-semibold">Registracija</h1>

          <FormSelect
            id="role"
            label="Vrsta računa*"
            placeholder={'Odaberi vrstu računa'}
            {...form.register('role', {
              required: 'Vrsta računa je obavezno polje',
            })}>
            <option value={Role.USER}>
              Korisnik (Liječnik, Tehničar, Spasioc)
            </option>
            <option value={Role.ORGANISATION}>
              Organizacija (Sportska udruga, klub)
            </option>
          </FormSelect>

          <FormInput
            id="username"
            label="Email*"
            type={'email'}
            {...form.register('email', {
              required: 'Email je obavezno polje',
            })}
          />

          <FormInput
            id="password"
            label="Lozinka*"
            type={'password'}
            {...form.register('password', {
              required: 'Lozinka je obavezno polje',
            })}
          />

          <FormInput
            id={'repeatPassword'}
            label={'Ponovi lozinku*'}
            type={'password'}
            {...form.register('repeatPassword', {
              required: true,
              validate: (val: string) => {
                if (form.watch('password') !== val)
                  return 'Lozinke se ne podudaraju';
              },
            })}
          />

          {role && (
            <FormInput
              id="city"
              label="Grad*"
              {...form.register('city', {
                required: 'Grad je obavezno polje',
              })}
            />
          )}

          {role === Role.USER && (
            <>
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

              <FormInput
                id="firstname"
                label="Ime*"
                {...form.register('firstname', {
                  required: 'Ime je obavezno polje',
                })}
              />

              <FormInput
                id="lastname"
                label="Prezime*"
                {...form.register('lastname', {
                  required: 'Prezime je obavezno polje',
                })}
              />

              <FormInput
                id="phone"
                label="Telefon*"
                {...form.register('phone', {
                  required: 'Telefon je obavezno polje',
                })}
              />
            </>
          )}

          {role === Role.ORGANISATION && (
            <>
              <FormInput
                id="name"
                label="Naziv*"
                {...form.register('name', {
                  required: 'Naziv je obavezno polje',
                })}
              />

              <FormInput
                id="street"
                label="Ulica i Broj*"
                {...form.register('street', {
                  required: 'Ulica i Broj je obavezno polje',
                })}
              />

              <FormInput
                id="oib"
                label="OIB*"
                {...form.register('oib', {
                  required: 'OIB je obavezno polje',
                })}
              />
            </>
          )}

          <div className="mt-6 flex">
            <Button disabled={submitting} type="submit" size="lg">
              Registracija
            </Button>
            <Button
              onClick={() => router.push('/')}
              size="lg"
              className="ml-auto bg-gray-50 text-gray-900 hover:bg-gray-50/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300">
              Odustani
            </Button>
          </div>
          {error && <span className="text-rose-600">{error}</span>}
        </Form>
      </div>
    </>
  );
};

export default Register;
