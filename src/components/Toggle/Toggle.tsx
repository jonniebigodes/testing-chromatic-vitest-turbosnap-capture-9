import { Toggle as ArkToggle } from '@ark-ui/react/toggle';
import type { ReactNode } from 'react';
import { color, fontSize, spacing } from '../../tokens/tokens';

/**
 * Props for the Toggle component
 */
export interface ToggleProps {
  /**
   * Event handler called when the pressed state changes
   */
  onPressedChange?: (pressed: boolean) => void;
  /**
   * The controlled pressed state of the toggle
   */
  pressed?: boolean;
  /**
   * Whether the toggle is disabled
   */
  disabled?: boolean;
  /**
   * Whether the toggle is required
   */
  required?: boolean;
  /**
   * The name attribute for form submission
   */
  name?: string;
  /**
   * Content to be rendered inside the toggle
   */
  children?: ReactNode;
}

/**
 * Toggle component for on/off states.
 * Built using Ark UI's Toggle component with a switch-like appearance.
 *
 * @example
 * ```tsx
 * <Toggle pressed={true} onPressedChange={(pressed) => console.log(pressed)} />
 * ```
 */
const Toggle = ({
  onPressedChange,
  pressed,
  disabled = false,
  required = false,
  name,
  children,
}: ToggleProps) => {
  return (
    <div
      style={{ display: 'inline-flex', alignItems: 'center', gap: spacing[3] }}
    >
      <ArkToggle.Root
        pressed={pressed}
        onPressedChange={onPressedChange}
        disabled={disabled}
        name={name}
        style={{
          position: 'relative',
          width: spacing[10],
          height: spacing[6],
          backgroundColor: pressed ? color.blue500 : color.slate300,
          borderRadius: spacing[3],
          border: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          transition: 'background-color 0.2s ease',
          outline: 'none',
          flexShrink: 0,
        }}
        onFocus={(e) => {
          if (!disabled) {
            e.currentTarget.style.boxShadow = `0 0 0 3px ${color.blueTr10}`;
          }
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <ArkToggle.Indicator
          fallback={
            <div
              style={{
                position: 'absolute',
                top: spacing[0.5],
                left: spacing[0.5],
                width: spacing[5],
                height: spacing[5],
                backgroundColor: color.white,
                borderRadius: '50%',
                transition: 'transform 0.2s ease',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              }}
            />
          }
        >
          <div
            style={{
              position: 'absolute',
              top: spacing[0.5],
              left: '22px',
              width: spacing[5],
              height: spacing[5],
              backgroundColor: color.white,
              borderRadius: '50%',
              transition: 'transform 0.2s ease',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          />
        </ArkToggle.Indicator>
      </ArkToggle.Root>
      {children && (
        <span
          style={{
            fontSize: fontSize[14],
            color: disabled ? color.slate400 : color.slate700,
            userSelect: 'none',
          }}
        >
          {children}
        </span>
      )}
    </div>
  );
};

export default Toggle;
