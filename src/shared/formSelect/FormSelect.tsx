import React, { ComponentProps, ReactElement, forwardRef } from 'react';

import styles from './FormSelect.module.scss';
import { FieldError } from '../form';

const DEFAULT_VALUE = 'none';

interface FormSelectProps extends ComponentProps<'select'> {
  id: string;
  label: string;
  children?: ReactElement<HTMLOptionElement>[];
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ id, label, value = DEFAULT_VALUE, children, ...props }, ref) => {
    return (
      <div className={styles.formSelectContainer}>
        <label htmlFor={id} className={styles.formSelectLabel}>
          {label}
        </label>
        <select id={id} ref={ref} className={styles.formSelect} {...props}>
          <option value={value} disabled>
            {props.placeholder}
          </option>
          {children}
        </select>
        <FieldError name={props.name} />
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';

export default FormSelect;
