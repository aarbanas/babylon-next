import { FC } from 'react';

type LoadingSpinnerProps = {
  width?: number;
  height?: number;
  color?: string;
  position?: 'relative' | 'absolute';
};

const LoadingSpinner: FC<LoadingSpinnerProps> = ({
  height = 32,
  width = 32,
  color = '#fc0002',
  position = 'absolute',
}) => {
  return (
    <>
      <div
        className={`${position} h-full w-full flex justify-center items-center z-50`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          style={{
            margin: 'auto',
            display: 'block',
            shapeRendering: 'auto',
          }}
          width={width}
          height={height}
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid">
          <g>
            <path
              d="M50 15A35 35 0 1 0 74.74873734152916 25.251262658470843"
              fill="none"
              stroke={color}
              stroke-width="12"
            />
            <path d="M49 3L49 27L61 15L49 3" fill={color} />
            <animateTransform
              attributeName="transform"
              type="rotate"
              repeatCount="indefinite"
              dur="1s"
              values="0 50 50;360 50 50"
              keyTimes="0;1"
            />
          </g>
        </svg>
      </div>
    </>
  );
};

export default LoadingSpinner;
