import { ark } from '@ark-ui/react/factory';
import type { CSSProperties } from 'react';
import { color, spacing } from '../../tokens/tokens';

export interface SkeletonProps {
  /**
   * Width of the skeleton. Number values are treated as pixels.
   */
  width?: string | number;

  /**
   * Height of the skeleton. Number values are treated as pixels.
   */
  height?: string | number;

  /**
   * Visual shape variant
   */
  variant?: 'text' | 'circular' | 'rectangular';

  /**
   * Number of text lines to render when variant is 'text'
   */
  lines?: number;

  /**
   * Whether to play a pulse animation
   */
  animated?: boolean;

  /**
   * Custom border radius override
   */
  borderRadius?: string;
}

const toCssSize = (value: string | number | undefined, fallback: string) => {
  if (value === undefined) return fallback;
  return typeof value === 'number' ? `${value}px` : value;
};

const getVariantDefaults = (
  variant: 'text' | 'circular' | 'rectangular'
): { width: string; height: string; borderRadius: string } => {
  const defaults = {
    text: {
      width: '100%',
      height: spacing[4],
      borderRadius: spacing[1],
    },
    circular: {
      width: spacing[10],
      height: spacing[10],
      borderRadius: '50%',
    },
    rectangular: {
      width: '100%',
      height: spacing[20],
      borderRadius: spacing[2],
    },
  };

  return defaults[variant];
};

const Skeleton = ({
  width,
  height,
  variant = 'text',
  lines = 1,
  animated = true,
  borderRadius,
}: SkeletonProps) => {
  const defaults = getVariantDefaults(variant);
  const resolvedWidth = toCssSize(width, defaults.width);
  const resolvedHeight = toCssSize(height, defaults.height);
  const resolvedRadius = borderRadius ?? defaults.borderRadius;

  const baseStyles: CSSProperties = {
    backgroundColor: color.slate200,
    display: 'block',
    boxSizing: 'border-box',
    ...(animated
      ? {
          animation: 'skeleton-pulse 1.5s ease-in-out infinite',
        }
      : {}),
  };

  if (variant === 'text' && lines > 1) {
    return (
      <ark.div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing[2],
          width: resolvedWidth,
        }}
      >
        {Array.from({ length: lines }).map((_, index) => {
          const isLast = index === lines - 1;
          return (
            <ark.div
              key={index}
              style={{
                ...baseStyles,
                width: isLast ? '60%' : '100%',
                height: resolvedHeight,
                borderRadius: resolvedRadius,
              }}
            />
          );
        })}
      </ark.div>
    );
  }

  return (
    <ark.div
      style={{
        ...baseStyles,
        width: resolvedWidth,
        height: resolvedHeight,
        borderRadius: resolvedRadius,
      }}
    />
  );
};

export default Skeleton;
