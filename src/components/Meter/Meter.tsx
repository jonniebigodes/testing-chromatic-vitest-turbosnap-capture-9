import { Progress as ArkProgress } from '@ark-ui/react/progress';
import { ReactNode } from 'react';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';

/**
 * Props for the Meter component
 */
export interface MeterProps {
  /**
   * The minimum allowed value of the meter.
   * @default 0
   */
  min?: number;

  /**
   * The maximum allowed value of the meter.
   * @default 100
   */
  max?: number;

  /**
   * The current value of the meter.
   */
  value?: number;

  /**
   * Custom label content to render.
   */
  children?: ReactNode;

  /**
   * The optimum value for the meter (affects color coding).
   * Values closer to optimum are shown in green, further away in yellow/red.
   */
  optimum?: number;

  /**
   * Low threshold value. Values below this are considered "low".
   */
  low?: number;

  /**
   * High threshold value. Values above this are considered "high".
   */
  high?: number;
}

/**
 * Meter component that displays a static measurement within a known range.
 * Built using the @ark-ui/react library.
 *
 * @example
 * ```tsx
 * <Meter value={75} min={0} max={100}>Disk Usage</Meter>
 * ```
 */
export default function Meter({
  min = 0,
  max = 100,
  value = 0,
  children,
  optimum,
  low,
  high,
}: MeterProps) {
  // Calculate percentage for visual representation
  const currentValue = value ?? min;
  const percentage = ((currentValue - min) / (max - min)) * 100;
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  // Determine meter color based on value and thresholds
  const getMeterColor = (): string => {
    const val = currentValue;
    const range = max - min;
    const lowThreshold = low ?? min + range * 0.33;
    const highThreshold = high ?? min + range * 0.66;
    const optimumValue = optimum ?? max;

    // If value is in the optimal range
    if (optimumValue >= lowThreshold && optimumValue <= highThreshold) {
      // Optimum is in the middle
      if (val >= lowThreshold && val <= highThreshold) {
        return color.green500; // green
      } else if (val < lowThreshold || val > highThreshold) {
        return color.yellow500; // amber
      }
    } else if (optimumValue > highThreshold) {
      // Optimum is high
      if (val > highThreshold) {
        return color.green500; // green
      } else if (val >= lowThreshold) {
        return color.yellow500; // amber
      } else {
        return color.pink600; // red
      }
    } else {
      // Optimum is low
      if (val < lowThreshold) {
        return color.green500; // green
      } else if (val <= highThreshold) {
        return color.yellow500; // amber
      } else {
        return color.pink600; // red
      }
    }

    return color.blue500; // default blue
  };

  const meterColor = getMeterColor();

  return (
    <ArkProgress.Root
      value={value}
      min={min}
      max={max}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: spacing[2],
        width: '300px',
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
        {children && (
          <ArkProgress.Label
            style={{
              fontSize: fontSize[14],
              fontWeight: fontWeight.medium,
              color: color.slate700,
            }}
          >
            {children}
          </ArkProgress.Label>
        )}

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
          width: '100%',
          height: spacing[3],
          backgroundColor: color.slate200,
          borderRadius: '9999px',
          overflow: 'hidden',
        }}
      >
        <ArkProgress.Range
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${clampedPercentage}%`,
            height: '100%',
            backgroundColor: meterColor,
            transition: 'all 0.3s ease',
            borderRadius: '9999px',
          }}
        />
      </ArkProgress.Track>
    </ArkProgress.Root>
  );
}
