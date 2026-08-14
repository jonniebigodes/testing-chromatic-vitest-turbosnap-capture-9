import { ark } from '@ark-ui/react/factory';
import type { CSSProperties, ReactNode } from 'react';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';

export interface BadgeProps {
  /**
   * Content displayed in the badge
   */
  children: ReactNode;

  /**
   * Variant style of the badge
   */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';

  /**
   * Size of the badge: 'small', 'medium', or 'large'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Whether the badge should have fully rounded (pill) corners
   */
  rounded?: boolean;
}

const getSizeStyles = (size: 'small' | 'medium' | 'large'): CSSProperties => {
  const sizeMap = {
    small: {
      padding: `${spacing[0.5]} ${spacing[1]}`,
      fontSize: fontSize[11],
      height: spacing[4],
    },
    medium: {
      padding: `${spacing[1]} ${spacing[2]}`,
      fontSize: fontSize[12],
      height: spacing[5],
    },
    large: {
      padding: `${spacing[1]} ${spacing[3]}`,
      fontSize: fontSize[14],
      height: spacing[6],
    },
  };

  return sizeMap[size];
};

const getVariantStyles = (
  variant: 'default' | 'success' | 'warning' | 'error' | 'info'
): CSSProperties => {
  const variantMap = {
    default: {
      backgroundColor: color.blue500,
      color: color.white,
    },
    success: {
      backgroundColor: color.green500,
      color: color.white,
    },
    warning: {
      backgroundColor: color.yellow500,
      color: color.white,
    },
    error: {
      backgroundColor: color.orange500,
      color: color.white,
    },
    info: {
      backgroundColor: color.cyan500,
      color: color.white,
    },
  };

  return variantMap[variant];
};

const Badge = ({
  children,
  variant = 'default',
  size = 'medium',
  rounded = false,
}: BadgeProps) => {
  const sizeStyles = getSizeStyles(size);
  const variantStyles = getVariantStyles(variant);

  return (
    <ark.span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: fontWeight.medium,
        whiteSpace: 'nowrap',
        userSelect: 'none',
        outline: 'none',
        borderRadius: rounded ? '9999px' : spacing[1],
        ...sizeStyles,
        ...variantStyles,
      }}
    >
      {children}
    </ark.span>
  );
};

export default Badge;
