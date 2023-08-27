import { FC, PropsWithChildren, Children } from 'react';
import styles from './NavigationTabs.module.scss';

const NavigationTabs: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.items}>
          {Children.map(children, (child) => {
            return <button className={styles.item}>{child}</button>;
          })}
        </div>
        <div className={styles.divider}>
          <></>
        </div>
      </div>
    </>
  );
};

export default NavigationTabs;
