import React from 'react';

interface Props {
  color: 'primary' | 'secondary';
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
}

const Button: React.FC<Props> = ({
  onClick,
  children,
  className,
  color,
  disabled,
  type,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`px-3 md:px-4 lg:px-6 text:lg md:text-xl ${className || ''}`}
      style={{
        width: '162px',
        height: '48px',
        border: color === 'primary' ? '0' : '1px solid #de3333',
        borderRadius: '24px',
        backgroundColor: color === 'primary' ? '#de3333' : '#ffffff',
        color: color === 'primary' ? '#ffffff' : '#de3333',
        fontWeight: '500',
      }}>
      {children}
    </button>
  );
};

export default Button;
