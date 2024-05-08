import { FC } from 'react';

const Close: FC<{ size?: number }> = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <rect width={size} height={size} />
    <path d="M18.7266 6L5.99864 18.7279" stroke="white" strokeWidth="2.5" />
    <path
      d="M18.7266 18.7266L5.99864 5.99864"
      stroke="white"
      strokeWidth="2.5"
    />
  </svg>
);

export default Close;
