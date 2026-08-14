import { Checkbox as ArkCheckbox } from '@ark-ui/react/checkbox';
import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { color, fontSize, spacing } from '../../tokens/tokens';

/**
 * Props for the Checkbox component
 */
export interface CheckboxProps {
  /**
   * The controlled checked state of the checkbox
   */
  checked?: boolean;
  /**
   * The callback invoked when the checked state changes
   */
  onCheckedChange?: (details: { checked: boolean | string }) => void;
  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean;
  /**
   * Whether the checkbox is required
   */
  required?: boolean;
  /**
   * The name of the input field in a checkbox (useful for form submission)
   */
  name?: string;
  /**
   * The value of checkbox input (useful for form submission)
   */
  value?: string;
  /**
   * Whether the checkbox is read-only
   */
  readOnly?: boolean;
  /**
   * Content to be rendered as the checkbox label
   */
  children?: ReactNode;
}

/**
 * Checkbox component for selecting options.
 * Built using Ark UI's Checkbox component.
 *
 * @example
 * ```tsx
 * <Checkbox checked={true} onCheckedChange={(details) => console.log(details.checked)}>
 *   Accept terms and conditions
 * </Checkbox>
 * ```
 */
const Checkbox = ({
  checked,
  onCheckedChange,
  disabled = false,
  required = false,
  name,
  value = 'on',
  readOnly = false,
  children,
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked || false);

  useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked);
    }
  }, [checked]);

  const handleChange = (details: { checked: boolean | string }) => {
    const checkedValue =
      typeof details.checked === 'boolean'
        ? details.checked
        : details.checked === 'on';
    setIsChecked(checkedValue);
    onCheckedChange?.(details);
  };

  return (
    <ArkCheckbox.Root
      checked={checked}
      onCheckedChange={handleChange}
      disabled={disabled}
      required={required}
      name={name}
      value={value}
      readOnly={readOnly}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing[2],
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <ArkCheckbox.Control
        style={{
          width: spacing[5],
          height: spacing[5],
          border: '2px solid',
          borderColor: isChecked ? color.blue500 : color.slate300,
          borderRadius: spacing[1],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isChecked ? color.blue500 : color.white,
          transition: 'all 0.2s ease',
          flexShrink: 0,
        }}
      >
        <ArkCheckbox.Indicator
          style={{
            width: spacing[3],
            height: spacing[3],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 3L4.5 8.5L2 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </ArkCheckbox.Indicator>
      </ArkCheckbox.Control>
      {children && (
        <ArkCheckbox.Label
          style={{
            fontSize: fontSize[14],
            color: color.slate700,
            cursor: disabled ? 'not-allowed' : 'pointer',
            userSelect: 'none',
          }}
        >
          {children}
        </ArkCheckbox.Label>
      )}
      <ArkCheckbox.HiddenInput />
    </ArkCheckbox.Root>
  );
};

export default Checkbox;
