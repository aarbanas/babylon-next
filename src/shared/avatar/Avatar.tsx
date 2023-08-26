import Image from 'next/image';

import styles from './Avatar.module.scss';
import { classNames } from '@/utils/classNames';

interface AvatarProps {
  image: string;
  size: number;
  hasBorder?: boolean;
  alt?: string;
  className?: string;
}

const Avatar = ({
  image,
  alt,
  size,
  className,
  hasBorder = false,
}: AvatarProps) => {
  return (
    <div
      className={classNames(
        styles.wrapper,
        hasBorder && styles['wrapper--bordered'],
        className
      )}
      style={{ width: size, height: size }}>
      <Image
        src={image}
        layout="fill"
        objectFit="cover"
        alt={alt || 'Avatar'}
      />
    </div>
  );
};

export default Avatar;
