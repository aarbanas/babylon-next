import { FC, PropsWithChildren, MouseEvent, useRef } from 'react';
import styles from './Modal.module.scss';
import { classNames } from '@/utils/classNames';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
};

const Modal: FC<PropsWithChildren<Props>> = ({
  children,
  onClose,
  isOpen,
  className = '',
}) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) {
    return null;
  }

  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    if (overlayRef?.current === e.target) {
      onClose();
    }
  };

  return (
    <div ref={overlayRef} className={styles.overlay} onClick={handleClose}>
      <div className={classNames(styles.content, className)}>{children}</div>
    </div>
  );
};

export default Modal;
