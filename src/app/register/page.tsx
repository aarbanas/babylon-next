'use client';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import registerUser from '@/services/user/register';
import { RegisterUserData, Role, Type } from '@/app/register/types';
import Form from '@/shared/form/Form';
import FormInput from '@/shared/formInput/FormInput';
import FormSelect from '@/shared/formSelect/FormSelect';
import { Button } from '@/components/ui/button';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register: NextPage = () => {
  const form = useForm<
    Omit<RegisterUserData, 'reCaptchaToken'> & { repeatPassword: string }
  >();
  const watch = form.watch;
  const [role, setRole] = useState<Role | undefined>(Role.USER);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    const subscription = watch((value) => {
      setRole(value.role);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const submit = async () => {
    setSubmitting(true);
    if (!recaptchaRef?.current?.getValue()) {
      toast('Molimo vas da potvrdite da niste robot', { type: 'error' });
      setSubmitting(false);
      return;
    }

    const recaptchaValue = recaptchaRef.current.getValue();
    const values = form.getValues();
    recaptchaRef.current.reset();

    setSubmitting(false);

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { repeatPassword, ...rest } = values;
      await registerUser({ reCaptchaToken: recaptchaValue!, ...rest });
      router.push('/');
    } catch (e) {
      toast('Nešto je pošlo po zlu. Pokušajte ponovo.', { type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-secondary-color p-3 md:flex-row md:p-6">
        <Form
          className="mt-6 flex w-full flex-col gap-2 md:w-2/5 md:gap-4"
          form={form}
          onSubmit={submit}>
          <h1 className="text-3xl font-semibold">Registracija</h1>

          <FormSelect
            id="role"
            label="Vrsta računa*"
            placeholder={'Odaberi vrstu računa'}
            labelClassName="mb-2 text-black"
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
            className="mb-2 text-black"
            {...form.register('email', {
              required: 'Email je obavezno polje',
            })}
          />

          <FormInput
            id="password"
            label="Lozinka*"
            type={'password'}
            className="mb-2 text-black"
            {...form.register('password', {
              required: 'Lozinka je obavezno polje',
            })}
          />

          <FormInput
            id={'repeatPassword'}
            label={'Ponovi lozinku*'}
            type={'password'}
            className="mb-2 text-black"
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
              className="mb-2 text-black"
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
                labelClassName="mb-2 text-black"
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
                className="mb-2 text-black"
                {...form.register('firstname', {
                  required: 'Ime je obavezno polje',
                })}
              />

              <FormInput
                id="lastname"
                label="Prezime*"
                className="mb-2 text-black"
                {...form.register('lastname', {
                  required: 'Prezime je obavezno polje',
                })}
              />

              <FormInput
                id="phone"
                label="Telefon*"
                className="mb-2 text-black"
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
                className="mb-2 text-black"
                {...form.register('name', {
                  required: 'Naziv je obavezno polje',
                })}
              />

              <FormInput
                id="street"
                label="Ulica i Broj*"
                className="mb-2 text-black"
                {...form.register('street', {
                  required: 'Ulica i Broj je obavezno polje',
                })}
              />

              <FormInput
                id="oib"
                label="OIB*"
                className="mb-2 text-black"
                {...form.register('oib', {
                  required: 'OIB je obavezno polje',
                })}
              />
            </>
          )}

          <ReCAPTCHA
            className={'mt-6'}
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          />

          <div className="mt-6 flex">
            <Button disabled={submitting} type="submit" size="lg">
              Registracija
            </Button>
            <Button
              onClick={() => router.push('/')}
              size="lg"
              variant={'secondary'}
              className="ml-auto">
              Odustani
            </Button>
          </div>
          {/*{error && <span className="text-rose-600">{error}</span>}*/}
        </Form>
      </div>

      <ToastContainer />
    </>
  );
};

export default Register;
