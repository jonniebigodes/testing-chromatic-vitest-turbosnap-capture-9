import { Field } from '@ark-ui/react/field';
import type { ChangeEvent, CSSProperties, ReactNode, TextareaHTMLAttributes } from 'react';
import { color, fontSize, spacing } from '../../tokens/tokens';
import FieldLabel from './FieldLabel';
import type { FieldLabelProps } from './FieldLabel';
import ValidationMessage from './ValidationMessage';
import type { ValidationStatus } from './ValidationMessage';

export interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'id'> {
  /**
   * Visible label content, rendered above the textarea via `FieldLabel`
   */
  label?: ReactNode;

  /**
   * Additional props forwarded to the underlying `FieldLabel`, excluding
   * `children`/`htmlFor` which are controlled by this component
   */
  labelProps?: Omit<FieldLabelProps, 'children' | 'htmlFor'>;

  /**
   * Visible validation feedback content, rendered below the textarea via
   * `ValidationMessage`
   */
  validationMessage?: ReactNode;

  /**
   * The semantic status of `validationMessage`. Defaults to `'error'` when
   * `invalid` is true and no explicit status is given.
   */
  validationStatus?: ValidationStatus;

  /**
   * Whether the textarea has failed validation
   */
  invalid?: boolean;

  /**
   * Whether the textarea is disabled
   */
  disabled?: boolean;

  /**
   * Whether the textarea is required
   */
  required?: boolean;

  /**
   * Whether the textarea is read-only
   */
  readOnly?: boolean;

  /**
   * Whether the textarea automatically grows to fit its content
   */
  autoresize?: boolean;

  /**
   * Renders the textarea in inverted colors
   */
  inverted?: boolean;

  /**
   * Controls the textarea's padding, font size and minimum height
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * The id of the textarea. Also used to derive the label's `htmlFor` and
   * the validation message's `id` (as `${id}-validation`). When omitted, the
   * label won't be linked to the textarea and `aria-describedby` won't be
   * wired up - this is a documented limitation since this component doesn't
   * use `useId`.
   */
  id?: string;

  /**
   * The controlled value of the textarea
   */
  value?: string;

  /**
   * The initial value of the textarea, for uncontrolled usage
   */
  defaultValue?: string;

  /**
   * Called with the new string value on every change event
   */
  onValueChange?: (value: string) => void;

  /**
   * The number of visible text lines
   */
  rows?: number;

  /**
   * The maximum number of characters allowed
   */
  maxLength?: number;

  /**
   * Placeholder text for the textarea
   */
  placeholder?: string;
}

const sizeStyles: Record<
  'small' | 'medium' | 'large',
  { padding: string; fontSize: string; minHeight: string }
> = {
  small: {
    padding: `${spacing[1]} ${spacing[2]}`,
    fontSize: fontSize[12],
    minHeight: spacing[16],
  },
  medium: {
    padding: `${spacing[2]} ${spacing[3]}`,
    fontSize: fontSize[14],
    minHeight: spacing[24],
  },
  large: {
    padding: `${spacing[3]} ${spacing[4]}`,
    fontSize: fontSize[16],
    minHeight: spacing[32],
  },
};

/**
 * TextArea is a multi-line text input built on Ark UI's `Field` primitive.
 * It renders a visible label (via `FieldLabel`) and validation feedback (via
 * `ValidationMessage`) around a `Field.Textarea`, which supplies `autoresize`
 * behavior and automatically reflects `invalid`/`disabled`/`required`/
 * `readOnly` state via data attributes.
 *
 * @example
 * ```tsx
 * <TextArea
 *   id="bio"
 *   label="Bio"
 *   placeholder="Tell us about yourself"
 *   validationMessage="Bio is required"
 *   invalid
 * />
 * ```
 */
const TextArea = ({
  label,
  labelProps,
  validationMessage,
  validationStatus,
  invalid = false,
  disabled = false,
  required = false,
  readOnly = false,
  autoresize = false,
  inverted = false,
  size = 'medium',
  id,
  value,
  defaultValue,
  onValueChange,
  rows,
  maxLength,
  placeholder = '',
  ...rest
}: TextAreaProps) => {
  const backgroundColor = disabled
    ? inverted
      ? color.slate700
      : color.slate100
    : inverted
      ? color.slate800
      : color.white;
  const textColor = disabled
    ? inverted
      ? color.slate500
      : color.slate400
    : inverted
      ? color.white
      : color.slate800;
  const borderColor = invalid
    ? color.pink600
    : inverted
      ? color.slate700
      : color.slate300;
  const focusBorderColor = invalid
    ? color.pink500
    : inverted
      ? color.blue400
      : color.blue500;
  const focusBoxShadowColor = invalid
    ? `${color.pink600}1A`
    : inverted
      ? color.blueTr50
      : color.blueTr10;
  const placeholderColor = inverted ? color.slate400 : color.slate500;

  const { padding, fontSize: textareaFontSize, minHeight } = sizeStyles[size];

  const textareaStyles: CSSProperties = {
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',
    padding,
    minHeight,
    backgroundColor,
    color: textColor,
    border: `1px solid ${borderColor}`,
    borderRadius: spacing[2],
    fontSize: textareaFontSize,
    fontFamily: 'inherit',
    outline: 'none',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    cursor: disabled ? 'not-allowed' : 'text',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    // @ts-expect-error - CSS custom property for placeholder
    '--placeholder-color': placeholderColor,
  };

  const validationId = id ? `${id}-validation` : undefined;
  const describedBy = validationMessage && validationId ? validationId : undefined;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {label && (
        <FieldLabel
          htmlFor={id}
          required={required}
          disabled={disabled}
          invalid={invalid}
          inverted={inverted}
          {...labelProps}
        >
          {label}
        </FieldLabel>
      )}

      <Field.Root
        id={id}
        invalid={invalid}
        disabled={disabled}
        required={required}
        readOnly={readOnly}
      >
        <Field.Textarea
          autoresize={autoresize}
          value={value}
          defaultValue={defaultValue}
          rows={rows}
          maxLength={maxLength}
          placeholder={placeholder}
          aria-describedby={describedBy}
          style={textareaStyles}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            onValueChange?.(e.target.value);
          }}
          onFocus={(e) => {
            const target = e.currentTarget;
            target.style.borderColor = focusBorderColor;
            target.style.boxShadow = `0 0 0 3px ${focusBoxShadowColor}`;
          }}
          onBlur={(e) => {
            const target = e.currentTarget;
            target.style.borderColor = borderColor;
            target.style.boxShadow = 'none';
          }}
          {...rest}
        />
      </Field.Root>

      {validationMessage && (
        <div style={{ marginTop: spacing[2] }}>
          <ValidationMessage
            id={validationId}
            status={validationStatus ?? 'error'}
            message={validationMessage}
            inverted={inverted}
          />
        </div>
      )}
    </div>
  );
};

export default TextArea;
