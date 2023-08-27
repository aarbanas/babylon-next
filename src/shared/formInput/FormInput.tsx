import React, { ComponentProps, forwardRef } from 'react';

import styles from './FormInput.module.scss';
import { FieldError } from '../form';

interface FormInputProps extends ComponentProps<'input'> {
  id: string;
  label: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ id, label, type = 'text', ...props }, ref) => {
    return (
      <div className={styles.container}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          type={type}
          className={styles.input}
          {...props}
        />
        <FieldError name={props.name} />
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
