import { ReactNode, useRef, ChangeEvent } from 'react';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';

/**
 * Time type representing a time value
 */
export interface TimeValue {
  hour: number;
  minute: number;
  second?: number;
}

/**
 * Props for the TimeField component
 */
export interface TimeFieldProps {
  /**
   * The controlled value of the time field in HH:MM or HH:MM:SS format.
   */
  value?: string;

  /**
   * Function called when the value changes.
   */
  onValueChange?: (details: { value: string; valueAsTime: TimeValue }) => void;

  /**
   * The placeholder time, used to determine what time to start the segments from when no value exists.
   */
  placeholder?: string;

  /**
   * Whether the time field is required.
   * @default false
   */
  required?: boolean;

  /**
   * Function called when the time field becomes invalid.
   */
  onInvalid?: () => void;

  /**
   * The ID of an error message element for accessibility.
   */
  errorMessageId?: string;

  /**
   * The hour cycle to use (12 or 24 hour format).
   * Note: This is for display purposes only as HTML time input uses 24-hour format.
   * @default 24
   */
  hourCycle?: 12 | 24;

  /**
   * Whether to hide the time zone segment.
   * @default false
   */
  hideTimeZone?: boolean;

  /**
   * The minimum time that can be selected in HH:MM format.
   */
  minValue?: string;

  /**
   * The maximum time that can be selected in HH:MM format.
   */
  maxValue?: string;

  /**
   * Whether the time field is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the time field is read-only.
   * @default false
   */
  readOnly?: boolean;

  /**
   * Custom label content to render.
   */
  children?: ReactNode;

  /**
   * The name attribute for form submission.
   */
  name?: string;

  /**
   * Whether to show seconds in the time field.
   * @default false
   */
  allowSeconds?: boolean;
}

/**
 * Parse time string to TimeValue object
 */
function parseTimeString(timeString: string): TimeValue {
  const parts = timeString.split(':');
  return {
    hour: parseInt(parts[0] || '0', 10),
    minute: parseInt(parts[1] || '0', 10),
    second: parts[2] ? parseInt(parts[2], 10) : undefined,
  };
}

/**
 * TimeField component that's an alternative to <input type="time" /> element.
 * Built using the @ark-ui/react library styling patterns.
 *
 * @example
 * ```tsx
 * <TimeField value="14:30" onValueChange={(details) => console.log(details.value)} />
 * ```
 */
export default function TimeField({
  value,
  onValueChange,
  placeholder,
  required = false,
  onInvalid,
  errorMessageId,
  hourCycle = 24,
  hideTimeZone = true,
  minValue,
  maxValue,
  disabled = false,
  readOnly = false,
  children,
  name,
  allowSeconds = false,
}: TimeFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (onValueChange) {
      onValueChange({
        value: newValue,
        valueAsTime: parseTimeString(newValue),
      });
    }
  };

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      if (onValueChange) {
        onValueChange({
          value: '',
          valueAsTime: { hour: 0, minute: 0 },
        });
      }
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: spacing[2],
      }}
    >
      {children && (
        <label
          style={{
            fontSize: fontSize[14],
            fontWeight: fontWeight.medium,
            color: color.slate700,
          }}
        >
          {children}
          {required && (
            <span style={{ color: color.pink600, marginLeft: spacing[1] }}>
              *
            </span>
          )}
        </label>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing[2],
          padding: `${spacing[2]} ${spacing[3]}`,
          border: `2px solid ${color.slate300}`,
          borderRadius: spacing[2],
          backgroundColor: disabled ? color.slate100 : color.white,
          transition: 'all 0.2s ease',
        }}
      >
        <input
          ref={inputRef}
          type="time"
          value={value}
          onChange={handleChange}
          name={name}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          min={minValue}
          max={maxValue}
          step={allowSeconds ? 1 : undefined}
          placeholder={placeholder}
          aria-describedby={errorMessageId}
          onInvalid={onInvalid}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: fontSize[14],
            fontFamily: 'inherit',
            color: disabled ? color.slate400 : color.slate800,
            backgroundColor: 'transparent',
            cursor: disabled ? 'not-allowed' : 'text',
          }}
        />

        {value && !disabled && !readOnly && (
          <button
            type="button"
            onClick={handleClear}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: spacing[5],
              height: spacing[5],
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: color.slate500,
              fontSize: fontSize[18],
              padding: 0,
              lineHeight: 1,
            }}
            aria-label="Clear time"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
