import { ark } from '@ark-ui/react/factory';
import type { CSSProperties, ReactNode } from 'react';
import {
  color,
  fontSize,
  fontWeight,
  lineHeight,
  spacing,
} from '../../tokens/tokens';

export interface EmptyStateProps {
  /**
   * Primary title text
   */
  title: string;

  /**
   * Optional supporting description
   */
  description?: string;

  /**
   * Optional icon or illustration node
   */
  icon?: ReactNode;

  /**
   * Optional action (e.g. a button) rendered below the text
   */
  action?: ReactNode;

  /**
   * Size of the empty state: 'small', 'medium', or 'large'
   */
  size?: 'small' | 'medium' | 'large';
}

const getSizeStyles = (size: 'small' | 'medium' | 'large') => {
  const sizeMap = {
    small: {
      padding: spacing[4],
      gap: spacing[2],
      titleFontSize: fontSize[14],
      titleLineHeight: lineHeight[20],
      descriptionFontSize: fontSize[12],
      descriptionLineHeight: lineHeight[20],
      maxWidth: '240px',
      iconSize: spacing[8],
    },
    medium: {
      padding: spacing[6],
      gap: spacing[3],
      titleFontSize: fontSize[18],
      titleLineHeight: lineHeight[28],
      descriptionFontSize: fontSize[14],
      descriptionLineHeight: lineHeight[24],
      maxWidth: '360px',
      iconSize: spacing[10],
    },
    large: {
      padding: spacing[8],
      gap: spacing[4],
      titleFontSize: fontSize[24],
      titleLineHeight: lineHeight[32],
      descriptionFontSize: fontSize[16],
      descriptionLineHeight: lineHeight[28],
      maxWidth: '480px',
      iconSize: spacing[12],
    },
  };

  return sizeMap[size];
};

const EmptyState = ({
  title,
  description,
  icon,
  action,
  size = 'medium',
}: EmptyStateProps) => {
  const sizeStyles = getSizeStyles(size);

  const containerStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: sizeStyles.padding,
    gap: sizeStyles.gap,
    maxWidth: sizeStyles.maxWidth,
    width: '100%',
    backgroundColor: color.slate50,
    borderRadius: spacing[3],
    border: `1px solid ${color.slate200}`,
    boxSizing: 'border-box',
  };

  return (
    <ark.div style={containerStyles}>
      {icon ? (
        <ark.div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: sizeStyles.iconSize,
            height: sizeStyles.iconSize,
            color: color.slate400,
            flexShrink: 0,
          }}
        >
          {icon}
        </ark.div>
      ) : null}

      <ark.div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: spacing[1],
        }}
      >
        <ark.span
          style={{
            fontSize: sizeStyles.titleFontSize,
            lineHeight: sizeStyles.titleLineHeight,
            fontWeight: fontWeight.semibold,
            color: color.slate800,
          }}
        >
          {title}
        </ark.span>

        {description ? (
          <ark.span
            style={{
              fontSize: sizeStyles.descriptionFontSize,
              lineHeight: sizeStyles.descriptionLineHeight,
              fontWeight: fontWeight.regular,
              color: color.slate500,
            }}
          >
            {description}
          </ark.span>
        ) : null}
      </ark.div>

      {action ? (
        <ark.div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: spacing[1],
          }}
        >
          {action}
        </ark.div>
      ) : null}
    </ark.div>
  );
};

export default EmptyState;
