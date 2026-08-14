import { ark } from '@ark-ui/react/factory';
import {
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { color, fontSize, spacing } from '../../tokens/tokens';
import FieldLabel, { type FieldLabelProps } from './FieldLabel';
import ValidationMessage, { type ValidationStatus } from './ValidationMessage';

export interface SearchBarProps {
  /**
   * The controlled value of the search input
   */
  value?: string;

  /**
   * The initial value for uncontrolled usage
   */
  defaultValue?: string;

  /**
   * Called with the new value whenever the input changes
   */
  onValueChange?: (value: string) => void;

  /**
   * Called with the current value when a search is triggered - either by
   * pressing Enter while focused, or by clicking the leading search icon
   */
  onSearch?: (value: string) => void;

  /**
   * Placeholder text for the input
   */
  placeholder?: string;

  /**
   * Whether the search bar is disabled. Blocks typing and hides the clear
   * button regardless of value.
   */
  disabled?: boolean;

  /**
   * Whether the search bar is in a loading state. Swaps the leading search
   * icon for a spinner and suppresses the clear button.
   */
  loading?: boolean;

  /**
   * Whether the clear button can be shown when there's a value
   * @default true
   */
  clearable?: boolean;

  /**
   * Controls the search bar's padding, height and font size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Renders the search bar in inverted colors
   */
  inverted?: boolean;

  /**
   * Label content rendered above the search bar via `FieldLabel`
   */
  label?: ReactNode;

  /**
   * Additional props forwarded to the `FieldLabel`, when `label` is provided
   */
  labelProps?: Omit<FieldLabelProps, 'children' | 'htmlFor'>;

  /**
   * Validation message rendered below the search bar via `ValidationMessage`
   */
  validationMessage?: ReactNode;

  /**
   * The semantic status of `validationMessage`
   * @default 'error'
   */
  validationStatus?: ValidationStatus;

  /**
   * Marks the search bar as invalid, independent of `validationMessage`
   */
  invalid?: boolean;

  /**
   * The id of the underlying input, also used to link the label and, when
   * a validation message is shown, to derive its id for `aria-describedby`
   */
  id?: string;

  /**
   * The name attribute of the underlying input, for form association
   */
  name?: string;

  /**
   * Whether the underlying input should receive focus on mount
   */
  autoFocus?: boolean;
}

interface SizeConfig {
  height: string;
  fontSize: string;
  iconSize: number;
  paddingX: string;
}

const sizeConfig: Record<NonNullable<SearchBarProps['size']>, SizeConfig> = {
  small: {
    height: '2rem', // 32px
    fontSize: fontSize[12],
    iconSize: 14,
    paddingX: spacing[2],
  },
  medium: {
    height: '2.5rem', // 40px
    fontSize: fontSize[14],
    iconSize: 16,
    paddingX: spacing[3],
  },
  large: {
    height: '3rem', // 48px
    fontSize: fontSize[16],
    iconSize: 18,
    paddingX: spacing[4],
  },
};

const SearchIcon = ({ size, fill }: { size: number; fill: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Search"
  >
    <circle cx="7" cy="7" r="5" stroke={fill} strokeWidth="1.5" />
    <path d="M11 11L14.5 14.5" stroke={fill} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ClearIcon = ({ size, fill }: { size: number; fill: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M4 4L12 12M12 4L4 12"
      stroke={fill}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// A tiny inline keyframes block powers the spinner's rotation. Repeated
// across instances is harmless (duplicate rules are deduped by the browser)
// and keeps this file free of a dedicated CSS file, per this component
// library's conventions.
const SpinnerIcon = ({ size, fill }: { size: number; fill: string }) => (
  <>
    <style>{'@keyframes searchbar-spin { to { transform: rotate(360deg); } }'}</style>
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Loading"
      style={{ animation: 'searchbar-spin 0.8s linear infinite' }}
    >
      <circle cx="8" cy="8" r="6" stroke={fill} strokeWidth="1.5" opacity="0.25" />
      <path d="M14 8a6 6 0 0 0-6-6" stroke={fill} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </>
);

const SearchBar = ({
  value,
  defaultValue = '',
  onValueChange,
  onSearch,
  placeholder = '',
  disabled = false,
  loading = false,
  clearable = true,
  size = 'medium',
  inverted = false,
  label,
  labelProps,
  validationMessage,
  validationStatus,
  invalid = false,
  id,
  name,
  autoFocus = false,
}: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value ?? '' : internalValue;

  const { height, fontSize: inputFontSize, iconSize, paddingX } = sizeConfig[size];

  const backgroundColor = inverted ? color.slate800 : color.white;
  const textColor = inverted ? color.white : color.slate800;
  const borderColor = inverted ? color.slate700 : color.slate300;
  const focusBorderColor = inverted ? color.blue400 : color.blue500;
  const iconColor = inverted ? color.slate400 : color.slate500;

  const isInvalid = invalid || validationStatus === 'error';
  const showClear = clearable && currentValue !== '' && !loading && !disabled;

  const validationId = validationMessage && id ? `${id}-validation` : undefined;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value;
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.(currentValue);
    }
  };

  const handleIconClick = () => {
    if (disabled || loading) return;
    onSearch?.(currentValue);
  };

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue('');
    }
    onValueChange?.('');
    inputRef.current?.focus();
  };

  // Enough room on each side for the icon/clear button (icon width plus
  // matching horizontal padding on both sides of it).
  const leadingSpace = `calc(${paddingX} * 2 + ${iconSize}px)`;
  const trailingSpace = showClear
    ? `calc(${paddingX} * 2 + ${iconSize}px)`
    : paddingX;

  const wrapperStyles: CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  };

  const inputStyles: CSSProperties = {
    display: 'block',
    width: '100%',
    height,
    paddingLeft: leadingSpace,
    paddingRight: trailingSpace,
    backgroundColor,
    color: textColor,
    border: `1px solid ${isInvalid ? color.pink600 : borderColor}`,
    borderRadius: spacing[2],
    fontSize: inputFontSize,
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    cursor: disabled ? 'not-allowed' : 'text',
    opacity: disabled ? 0.6 : 1,
    // Suppresses the native ::-webkit-search-cancel-button - it can't be
    // targeted from an inline `style` prop since it's a pseudo-element, so
    // this custom clear button replaces it instead.
    WebkitAppearance: 'none',
  };

  const iconButtonStyles: CSSProperties = {
    position: 'absolute',
    left: paddingX,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    padding: 0,
    color: iconColor,
    cursor: disabled || loading ? 'default' : 'pointer',
    opacity: disabled ? 0.6 : 1,
  };

  const clearButtonStyles: CSSProperties = {
    position: 'absolute',
    right: paddingX,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    padding: 0,
    color: iconColor,
    cursor: 'pointer',
  };

  const labelSize = size === 'small' ? 'small' : 'medium';

  return (
    <ark.div style={{ display: 'flex', flexDirection: 'column', gap: spacing[1], width: '100%' }}>
      {label && (
        <FieldLabel
          htmlFor={id}
          disabled={disabled}
          invalid={isInvalid}
          inverted={inverted}
          size={labelSize}
          {...labelProps}
        >
          {label}
        </FieldLabel>
      )}

      <ark.div style={wrapperStyles}>
        <ark.button
          type="button"
          onClick={handleIconClick}
          disabled={disabled || loading}
          aria-label={loading ? 'Loading' : 'Search'}
          style={iconButtonStyles}
        >
          {loading ? (
            <SpinnerIcon size={iconSize} fill={iconColor} />
          ) : (
            <SearchIcon size={iconSize} fill={iconColor} />
          )}
        </ark.button>

        <ark.input
          ref={inputRef}
          type="search"
          id={id}
          name={name}
          value={currentValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          dir="auto"
          aria-invalid={isInvalid || undefined}
          aria-describedby={validationId}
          style={inputStyles}
          onFocus={(e) => {
            const target = e.currentTarget;
            target.style.borderColor = isInvalid ? color.pink600 : focusBorderColor;
            target.style.boxShadow = `0 0 0 3px ${
              inverted ? color.blueTr50 : color.blueTr10
            }`;
          }}
          onBlur={(e) => {
            const target = e.currentTarget;
            target.style.borderColor = isInvalid ? color.pink600 : borderColor;
            target.style.boxShadow = 'none';
          }}
        />

        {showClear && (
          <ark.button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            style={clearButtonStyles}
          >
            <ClearIcon size={iconSize} fill={iconColor} />
          </ark.button>
        )}
      </ark.div>

      {validationMessage && (
        <ValidationMessage
          status={validationStatus ?? 'error'}
          message={validationMessage}
          id={validationId}
          inverted={inverted}
          size={labelSize}
        />
      )}
    </ark.div>
  );
};

export default SearchBar;
