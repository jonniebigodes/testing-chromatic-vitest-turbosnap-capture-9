import { ark } from '@ark-ui/react/factory';
import type { CSSProperties, ReactNode } from 'react';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';

export interface PillProps {
  /**
   * Variant style of the pill
   */
  variant?: 'default' | 'inverted' | 'warning' | 'success';

  /**
   * Size of the pill: 'small', 'medium', or 'large'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Content displayed in the pill
   */
  children: ReactNode;

  /**
   * Click event handler
   */
  onClick?: () => void;

  /**
   * Whether the pill is disabled
   */
  disabled?: boolean;
}

const getSizeStyles = (size: 'small' | 'medium' | 'large'): CSSProperties => {
  const sizeMap = {
    small: {
      padding: `${spacing[1]} ${spacing[2]}`,
      fontSize: fontSize[11],
      height: spacing[5],
      borderRadius: spacing[3],
    },
    medium: {
      padding: `${spacing[2]} ${spacing[3]}`,
      fontSize: fontSize[14],
      height: spacing[6],
      borderRadius: spacing[3],
    },
    large: {
      padding: `${spacing[2]} ${spacing[4]}`,
      fontSize: fontSize[16],
      height: spacing[8],
      borderRadius: spacing[4],
    },
  };

  return sizeMap[size];
};

const getVariantStyles = (
  variant: 'default' | 'inverted' | 'warning' | 'success',
  disabled: boolean
): CSSProperties => {
  if (disabled) {
    return {
      backgroundColor: color.slate200,
      color: color.slate400,
      cursor: 'not-allowed',
    };
  }

  const variantMap = {
    default: {
      backgroundColor: color.blue500,
      color: color.white,
    },
    inverted: {
      backgroundColor: color.white,
      color: color.blue500,
      border: `1px solid ${color.blue500}`,
    },
    warning: {
      backgroundColor: color.yellow500,
      color: color.white,
    },
    success: {
      backgroundColor: color.green500,
      color: color.white,
    },
  };

  return variantMap[variant];
};

const Pill = ({
  variant = 'default',
  size = 'medium',
  children,
  onClick,
  disabled = false,
}: PillProps) => {
  const sizeStyles = getSizeStyles(size);
  const variantStyles = getVariantStyles(variant, disabled);

  return (
    <ark.span
      onClick={disabled ? undefined : onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: fontWeight.medium,
        cursor: disabled ? 'not-allowed' : onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        outline: 'none',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        ...sizeStyles,
        ...variantStyles,
      }}
      onMouseEnter={(e) => {
        if (!disabled && onClick) {
          const target = e.currentTarget as HTMLSpanElement;
          target.style.opacity = '0.85';
          target.style.transform = 'translateY(-1px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && onClick) {
          const target = e.currentTarget as HTMLSpanElement;
          target.style.opacity = '1';
          target.style.transform = 'translateY(0)';
        }
      }}
    >
      {children}
    </ark.span>
  );
};

export default Pill;
