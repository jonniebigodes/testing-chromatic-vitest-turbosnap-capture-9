import { PinInput as ArkPinInput } from '@ark-ui/react/pin-input';
import { ReactNode } from 'react';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';

/**
 * Props for the PinInput component
 */
export interface PinInputProps {
  /**
   * The controlled value of the pin input as an array of strings.
   */
  value?: string[];

  /**
   * Function called on input change.
   */
  onValueChange?: (details: { value: string[]; valueAsString: string }) => void;

  /**
   * Whether the inputs are disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * The number of input fields to render.
   * @default 4
   */
  maxLength?: number;

  /**
   * Custom label content to render.
   */
  children?: ReactNode;

  /**
   * Whether the pin input is required.
   * @default false
   */
  required?: boolean;

  /**
   * The name of the input element for form submission.
   */
  name?: string;

  /**
   * The type of value the pin-input should allow.
   * @default 'numeric'
   */
  type?: 'numeric' | 'alphanumeric' | 'alphabetic';

  /**
   * If true, the input's value will be masked like a password.
   * @default false
   */
  mask?: boolean;

  /**
   * The placeholder text for the inputs.
   * @default '○'
   */
  placeholder?: string;

  /**
   * If true, the pin input component uses OTP autocomplete.
   * @default false
   */
  otp?: boolean;
}

/**
 * PinInput component that enables users to input a sequence of one-character inputs.
 * Built using the @ark-ui/react library.
 *
 * @example
 * ```tsx
 * <PinInput maxLength={4} onValueChange={(details) => console.log(details.valueAsString)} />
 * ```
 */
export default function PinInput({
  value,
  onValueChange,
  disabled = false,
  maxLength = 4,
  children,
  required = false,
  name,
  type = 'numeric',
  mask = false,
  placeholder = '○',
  otp = false,
}: PinInputProps) {
  return (
    <ArkPinInput.Root
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      required={required}
      name={name}
      type={type}
      mask={mask}
      placeholder={placeholder}
      otp={otp}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: spacing[2],
      }}
    >
      {children && (
        <ArkPinInput.Label
          style={{
            fontSize: fontSize[14],
            fontWeight: fontWeight.medium,
            color: color.slate700,
          }}
        >
          {children}
        </ArkPinInput.Label>
      )}

      <ArkPinInput.Control
        style={{
          display: 'flex',
          gap: spacing[2],
        }}
      >
        {Array.from({ length: maxLength }, (_, index) => (
          <ArkPinInput.Input
            key={index}
            index={index}
            style={{
              width: spacing[12],
              height: spacing[12],
              textAlign: 'center',
              fontSize: fontSize[18],
              fontWeight: fontWeight.semibold,
              border: `2px solid ${color.slate300}`,
              borderRadius: spacing[2],
              outline: 'none',
              transition: 'all 0.2s ease',
              backgroundColor: disabled ? color.slate100 : color.white,
              color: disabled ? color.slate400 : color.slate800,
              cursor: disabled ? 'not-allowed' : 'text',
            }}
            onFocus={(e) => {
              if (!disabled) {
                e.currentTarget.style.borderColor = color.blue500;
                e.currentTarget.style.boxShadow = `0 0 0 3px ${color.blueTr10}`;
              }
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = color.slate300;
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        ))}
      </ArkPinInput.Control>

      <ArkPinInput.HiddenInput />
    </ArkPinInput.Root>
  );
}
