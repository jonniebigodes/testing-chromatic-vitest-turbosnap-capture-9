import { ark } from '@ark-ui/react/factory';
import type { CSSProperties } from 'react';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';

export interface ButtonProps {
  /**
   * Background color of the button
   */
  backgroundColor?: string;

  /**
   * Size of the button: 'small', 'medium', or 'large'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Label text displayed on the button
   */
  label: string;

  /**
   * Click event handler
   */
  onClick?: () => void;
}

const getSizeStyles = (size: 'small' | 'medium' | 'large'): CSSProperties => {
  const sizeMap = {
    small: {
      padding: `${spacing[1]} ${spacing[3]}`,
      fontSize: fontSize[12],
      height: spacing[6],
    },
    medium: {
      padding: `${spacing[2]} ${spacing[4]}`,
      fontSize: fontSize[14],
      height: spacing[8],
    },
    large: {
      padding: `${spacing[3]} ${spacing[5]}`,
      fontSize: fontSize[16],
      height: spacing[10],
    },
  };

  return sizeMap[size];
};

const Button = ({
  backgroundColor = color.blue500,
  size = 'medium',
  label,
  onClick,
}: ButtonProps) => {
  const sizeStyles = getSizeStyles(size);

  return (
    <ark.button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor,
        color: color.white,
        border: 'none',
        borderRadius: spacing[2],
        fontWeight: fontWeight.medium,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        outline: 'none',
        ...sizeStyles,
      }}
      onMouseEnter={(e) => {
        const target = e.currentTarget as HTMLButtonElement;
        target.style.opacity = '0.9';
        target.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget as HTMLButtonElement;
        target.style.opacity = '1';
        target.style.transform = 'translateY(0)';
      }}
    >
      {label}
    </ark.button>
  );
};

export default Button;
