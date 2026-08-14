import { ark } from '@ark-ui/react/factory';
import type { CSSProperties, ReactNode } from 'react';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';

export interface CardProps {
  /**
   * Main content of the card
   */
  children: ReactNode;

  /**
   * Optional title displayed at the top of the card
   */
  title?: string;

  /**
   * Optional subtitle displayed below the title
   */
  subtitle?: string;

  /**
   * Optional footer content displayed at the bottom of the card
   */
  footer?: ReactNode;

  /**
   * Whether the card has an elevated shadow
   */
  elevated?: boolean;

  /**
   * Whether the card has a border
   */
  bordered?: boolean;

  /**
   * Padding size of the card
   */
  padding?: 'none' | 'small' | 'medium' | 'large';

  /**
   * Click event handler
   */
  onClick?: () => void;
}

const getPaddingStyles = (
  padding: 'none' | 'small' | 'medium' | 'large'
): CSSProperties => {
  const paddingMap = {
    none: { padding: spacing[0] },
    small: { padding: spacing[2] },
    medium: { padding: spacing[4] },
    large: { padding: spacing[6] },
  };

  return paddingMap[padding];
};

const Card = ({
  children,
  title,
  subtitle,
  footer,
  elevated = false,
  bordered = true,
  padding = 'medium',
  onClick,
}: CardProps) => {
  const paddingStyles = getPaddingStyles(padding);

  return (
    <ark.div
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: color.white,
        borderRadius: spacing[2],
        border: bordered ? `1px solid ${color.slate300}` : 'none',
        boxShadow: elevated ? `0 4px 12px ${color.blackTr10}` : 'none',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        outline: 'none',
        maxWidth: '360px',
        width: '100%',
        ...paddingStyles,
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          const target = e.currentTarget as HTMLDivElement;
          target.style.opacity = '0.95';
          target.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          const target = e.currentTarget as HTMLDivElement;
          target.style.opacity = '1';
          target.style.transform = 'translateY(0)';
        }
      }}
    >
      {(title || subtitle) && (
        <ark.div
          style={{
            marginBottom: spacing[3],
            display: 'flex',
            flexDirection: 'column',
            gap: spacing[1],
          }}
        >
          {title && (
            <ark.div
              style={{
                fontSize: fontSize[18],
                fontWeight: fontWeight.semibold,
                color: color.slate900,
              }}
            >
              {title}
            </ark.div>
          )}
          {subtitle && (
            <ark.div
              style={{
                fontSize: fontSize[14],
                fontWeight: fontWeight.regular,
                color: color.slate500,
              }}
            >
              {subtitle}
            </ark.div>
          )}
        </ark.div>
      )}
      <ark.div
        style={{
          fontSize: fontSize[14],
          color: color.slate700,
          flex: 1,
        }}
      >
        {children}
      </ark.div>
      {footer && (
        <ark.div
          style={{
            marginTop: spacing[4],
            paddingTop: spacing[3],
            borderTop: `1px solid ${color.slate200}`,
            fontSize: fontSize[12],
            color: color.slate500,
          }}
        >
          {footer}
        </ark.div>
      )}
    </ark.div>
  );
};

export default Card;
