import { RadioGroup as ArkRadioGroup } from '@ark-ui/react/radio-group';
import type { ReactNode } from 'react';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';

/**
 * Radio option item
 */
export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

/**
 * Props for the RadioGroup component
 */
export interface RadioGroupProps {
  /**
   * Event handler called when the selected value changes
   */
  onValueChange?: (details: { value: string | null }) => void;
  /**
   * Whether the radio group is disabled
   */
  disabled?: boolean;
  /**
   * Whether the radio group is required
   */
  required?: boolean;
  /**
   * The name attribute for form submission
   */
  name?: string;
  /**
   * The orientation of the radio group
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Whether the radio group is read-only
   */
  readOnly?: boolean;
  /**
   * Label content to be rendered for the radio group
   */
  children?: ReactNode;
  /**
   * The controlled value of the radio group
   */
  value?: string;
  /**
   * The default value when uncontrolled
   */
  defaultValue?: string;
  /**
   * Array of radio options
   */
  options: RadioOption[];
}

/**
 * RadioGroup component for selecting a single option from multiple choices.
 * Built using Ark UI's RadioGroup component.
 *
 * @example
 * ```tsx
 * <RadioGroup
 *   options={[
 *     { label: 'Option 1', value: '1' },
 *     { label: 'Option 2', value: '2' }
 *   ]}
 * >
 *   Choose an option
 * </RadioGroup>
 * ```
 */
const RadioGroup = ({
  onValueChange,
  disabled = false,
  required = false,
  name,
  orientation = 'vertical',
  readOnly = false,
  children,
  value,
  defaultValue,
  options,
}: RadioGroupProps) => {
  return (
    <ArkRadioGroup.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      required={required}
      name={name}
      orientation={orientation}
      readOnly={readOnly}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: spacing[3],
      }}
    >
      {children && (
        <ArkRadioGroup.Label
          style={{
            fontSize: fontSize[14],
            fontWeight: fontWeight.medium,
            color: color.slate700,
            userSelect: 'none',
          }}
        >
          {children}
          {required && (
            <span style={{ color: color.pink600, marginLeft: spacing[1] }}>
              *
            </span>
          )}
        </ArkRadioGroup.Label>
      )}
      <ArkRadioGroup.Indicator />
      <div
        style={{
          display: 'flex',
          flexDirection: orientation === 'horizontal' ? 'row' : 'column',
          gap: orientation === 'horizontal' ? spacing[4] : spacing[3],
          flexWrap: 'wrap',
        }}
      >
        {options.map((option) => (
          <ArkRadioGroup.Item
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing[2],
              cursor:
                disabled || readOnly || option.disabled
                  ? 'not-allowed'
                  : 'pointer',
              opacity: disabled || option.disabled ? 0.5 : 1,
              userSelect: 'none',
            }}
          >
            <ArkRadioGroup.ItemControl
              style={{
                position: 'relative',
                width: spacing[5],
                height: spacing[5],
                borderRadius: '50%',
                border: '2px solid',
                borderColor: color.slate300,
                backgroundColor: color.white,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}
            />
            <ArkRadioGroup.ItemText
              style={{
                fontSize: fontSize[14],
                color:
                  disabled || option.disabled ? color.slate400 : color.slate700,
              }}
            >
              {option.label}
            </ArkRadioGroup.ItemText>
            <ArkRadioGroup.ItemHiddenInput />
          </ArkRadioGroup.Item>
        ))}
      </div>
      <style>
        {`
          [data-scope="radio-group"][data-part="item-control"][data-state="checked"]::after {
            content: '';
            position: absolute;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: ${color.blue500};
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          [data-scope="radio-group"][data-part="item-control"][data-state="checked"] {
            border-color: ${color.blue500} !important;
          }
          [data-scope="radio-group"][data-part="item-control"]:hover:not([data-disabled]) {
            border-color: ${color.blue500};
          }
          [data-scope="radio-group"][data-part="item-control"]:focus-visible {
            outline: 2px solid ${color.blue500};
            outline-offset: 2px;
          }
        `}
      </style>
    </ArkRadioGroup.Root>
  );
};

export default RadioGroup;
