import { ComponentProps } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
  useFormContext,
} from 'react-hook-form';

import styles from './Form.module.scss';

interface FormProps<T extends FieldValues>
  extends Omit<ComponentProps<'form'>, 'onSubmit'> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
}

const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  ...props
}: FormProps<T>) => {
  return (
    <FormProvider {...form}>
      <form
        className={styles.container}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;

export const FieldError = ({ name }: { name?: string }) => {
  const {
    formState: { errors },
  } = useFormContext();

  if (!name) {
    return null;
  }

  const error = errors[name];

  if (!error || !error?.message) {
    return null;
  }

  return (
    <small className={styles.error}>
      <span role="alert">{error.message.toString()}</span>
    </small>
  );
};
