import { FC, PropsWithChildren, Children } from 'react';
import styles from './NavigationTabs.module.scss';

const NavigationTabs: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className={styles.navigationTabs}>
        <div className={styles.navigationTabsItems}>
          {Children.map(children, (child) => {
            return (
              <button className={styles.navigationTabsItem}>{child}</button>
            );
          })}
        </div>
        <div className={styles.navigationTabsDivider}>
          <></>
        </div>
      </div>
    </>
  );
};

export default NavigationTabs;
