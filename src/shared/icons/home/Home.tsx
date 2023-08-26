import { FC } from 'react';

const HomeIcon: FC<{ size?: number }> = ({ size = 24 }) => {
  return (
    <svg
      fill="rgb(255, 255, 255)"
      width={size}
      height={size}
      viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
};

export default HomeIcon;
