import { Progress as ArkProgress } from '@ark-ui/react/progress';
import { ReactNode } from 'react';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';

/**
 * Props for the Progress component
 */
export interface ProgressProps {
  /**
   * The minimum allowed value of the progress bar.
   * @default 0
   */
  min?: number;

  /**
   * The maximum allowed value of the progress bar.
   * @default 100
   */
  max?: number;

  /**
   * The current value of the progress bar.
   */
  value?: number;

  /**
   * Whether the progress bar is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the progress bar is read-only.
   * @default false
   */
  readonly?: boolean;

  /**
   * The orientation of the progress bar.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * Custom content to render inside the progress component.
   */
  children?: ReactNode;
}

/**
 * Progress component that shows the completion status of a task.
 * Built using the @ark-ui/react library.
 *
 * @example
 * ```tsx
 * <Progress value={75} min={0} max={100} />
 * ```
 */
export default function Progress({
  min = 0,
  max = 100,
  value,
  disabled = false,
  readonly = false,
  orientation = 'horizontal',
  children,
}: ProgressProps) {
  const isVertical = orientation === 'vertical';

  // Calculate percentage for visual representation
  const currentValue = value ?? min;
  const percentage = ((currentValue - min) / (max - min)) * 100;
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  return (
    <ArkProgress.Root
      value={value}
      min={min}
      max={max}
      orientation={orientation}
      style={{
        display: 'flex',
        flexDirection: isVertical ? 'row' : 'column',
        gap: spacing[2],
        width: isVertical ? 'fit-content' : '300px',
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled || readonly ? 'none' : 'auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: spacing[2],
        }}
      >
        <ArkProgress.Label
          style={{
            fontSize: fontSize[14],
            fontWeight: fontWeight.medium,
            color: color.slate700,
          }}
        >
          {children || 'Loading...'}
        </ArkProgress.Label>

        <ArkProgress.ValueText
          style={{
            fontSize: fontSize[12],
            color: color.slate500,
            fontWeight: fontWeight.semibold,
            minWidth: '45px',
            textAlign: 'right',
          }}
        />
      </div>

      <ArkProgress.Track
        style={{
          position: 'relative',
          width: isVertical ? spacing[2] : '100%',
          height: isVertical ? '200px' : spacing[2],
          backgroundColor: color.slate200,
          borderRadius: '9999px',
          overflow: 'hidden',
        }}
      >
        <ArkProgress.Range
          style={{
            position: 'absolute',
            top: isVertical ? 'auto' : 0,
            bottom: isVertical ? 0 : 'auto',
            left: 0,
            width: isVertical ? '100%' : `${clampedPercentage}%`,
            height: isVertical ? `${clampedPercentage}%` : '100%',
            backgroundColor: readonly ? color.slate400 : color.blue500,
            transition: 'all 0.3s ease',
            borderRadius: '9999px',
          }}
        />
      </ArkProgress.Track>
    </ArkProgress.Root>
  );
}
