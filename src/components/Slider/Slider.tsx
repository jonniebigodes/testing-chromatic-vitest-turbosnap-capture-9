import { Slider as ArkSlider } from '@ark-ui/react/slider';
import type { ReactNode } from 'react';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';

/**
 * Props for the Slider component
 */
export interface SliderProps {
  /**
   * The current value of the slider
   */
  value?: number[];
  /**
   * Event handler called when the slider value changes
   */
  onValueChange?: (details: { value: number[] }) => void;
  /**
   * Whether the slider is disabled
   */
  disabled?: boolean;
  /**
   * The minimum value of the slider
   */
  min?: number;
  /**
   * The maximum value of the slider
   */
  max?: number;
  /**
   * The increment step of the slider
   */
  step?: number;
  /**
   * The orientation of the slider
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Label content to be rendered for the slider
   */
  children?: ReactNode;
}

/**
 * Slider component for selecting a value from a range.
 * Built using Ark UI's Slider component.
 *
 * @example
 * ```tsx
 * <Slider value={[50]} onValueChange={(details) => console.log(details.value)} />
 * ```
 */
const Slider = ({
  value,
  onValueChange,
  disabled = false,
  min = 0,
  max = 100,
  step = 1,
  orientation = 'horizontal',
  children,
}: SliderProps) => {
  const isVertical = orientation === 'vertical';

  return (
    <ArkSlider.Root
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      min={min}
      max={max}
      step={step}
      orientation={orientation}
      style={{
        display: 'flex',
        flexDirection: isVertical ? 'row' : 'column',
        gap: isVertical ? spacing[4] : spacing[2],
        width: isVertical ? 'auto' : '300px',
        height: isVertical ? '300px' : 'auto',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {children && (
        <ArkSlider.Label
          style={{
            fontSize: fontSize[14],
            fontWeight: fontWeight.medium,
            color: color.slate700,
            userSelect: 'none',
          }}
        >
          {children}
        </ArkSlider.Label>
      )}
      <ArkSlider.ValueText
        style={{
          fontSize: fontSize[14],
          color: color.slate500,
          userSelect: 'none',
        }}
      />
      <ArkSlider.Control
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          flexGrow: 1,
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      >
        <ArkSlider.Track
          style={{
            position: 'relative',
            flexGrow: 1,
            backgroundColor: color.slate200,
            borderRadius: spacing[1],
            width: isVertical ? spacing[2] : '100%',
            height: isVertical ? '100%' : spacing[2],
          }}
        >
          <ArkSlider.Range
            style={{
              position: 'absolute',
              backgroundColor: disabled ? color.slate400 : color.blue500,
              borderRadius: spacing[1],
              width: isVertical ? '100%' : 'auto',
              height: isVertical ? 'auto' : '100%',
            }}
          />
        </ArkSlider.Track>
        <ArkSlider.Thumb
          index={0}
          style={{
            position: 'absolute',
            width: spacing[5],
            height: spacing[5],
            backgroundColor: color.white,
            border: '2px solid',
            borderColor: disabled ? color.slate400 : color.blue500,
            borderRadius: '50%',
            cursor: disabled ? 'not-allowed' : 'grab',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.1s ease',
            outline: 'none',
          }}
          onMouseDown={(e) => {
            if (!disabled) {
              e.currentTarget.style.cursor = 'grabbing';
              e.currentTarget.style.transform = 'scale(1.1)';
            }
          }}
          onMouseUp={(e) => {
            if (!disabled) {
              e.currentTarget.style.cursor = 'grab';
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
          onFocus={(e) => {
            if (!disabled) {
              e.currentTarget.style.boxShadow = `0 0 0 3px ${color.blueTr10}, 0 1px 3px rgba(0, 0, 0, 0.1)`;
            }
          }}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <ArkSlider.HiddenInput />
        </ArkSlider.Thumb>
      </ArkSlider.Control>
    </ArkSlider.Root>
  );
};

export default Slider;
