import { FC, FormEventHandler, PropsWithChildren } from 'react';
import styles from './Form.module.scss';

type FormProps = {
  id?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
};

const Form: FC<PropsWithChildren<FormProps>> = ({ children, ...formProps }) => {
  return (
    <form className={styles.form} {...formProps}>
      {children}
    </form>
  );
};

export default Form;
