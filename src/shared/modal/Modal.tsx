import { FC, PropsWithChildren, MouseEvent, useRef } from 'react';
import styles from './Modal.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const Modal: FC<PropsWithChildren<Props>> = ({ children, onClose, isOpen }) => {
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
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Modal;
