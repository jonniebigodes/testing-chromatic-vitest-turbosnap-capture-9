import { TagsInput } from '@ark-ui/react/tags-input';
import type { CSSProperties, ReactNode } from 'react';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';
import FieldLabel, { type FieldLabelProps } from './FieldLabel';
import ValidationMessage, { type ValidationStatus } from './ValidationMessage';

/**
 * The reason a tag was rejected, surfaced by the `onValueInvalid` callback.
 * Maps 1:1 onto Ark UI's underlying `rangeOverflow` / `invalidTag` reasons.
 */
export type ChipInputInvalidReason = 'max' | 'validate';

export interface ChipInputProps {
  /**
   * The controlled tag values
   */
  value?: string[];

  /**
   * The initial tag values when uncontrolled
   */
  defaultValue?: string[];

  /**
   * Callback fired whenever the tag values change (add, remove, edit, clear)
   */
  onValueChange?: (details: { value: string[] }) => void;

  /**
   * Content rendered as the field's label, above the input control
   */
  label?: ReactNode;

  /**
   * Additional props forwarded to the underlying `FieldLabel`, excluding
   * `children` and `htmlFor` which are managed internally
   */
  labelProps?: Omit<FieldLabelProps, 'children' | 'htmlFor'>;

  /**
   * Content rendered inside the `ValidationMessage` shown below the input
   */
  validationMessage?: ReactNode;

  /**
   * The semantic status of the validation message
   */
  validationStatus?: ValidationStatus;

  /**
   * Whether the tags input is invalid
   */
  invalid?: boolean;

  /**
   * Whether the tags input is disabled
   */
  disabled?: boolean;

  /**
   * Whether the tags input is read-only - focusable, but new tags cannot be
   * added and existing tags cannot be removed or edited
   */
  readOnly?: boolean;

  /**
   * Whether the tags input is required
   */
  required?: boolean;

  /**
   * The maximum number of tags allowed
   */
  max?: number;

  /**
   * The maximum length of a single tag's text
   */
  maxLength?: number;

  /**
   * The character (or pattern) that triggers a new tag to be created.
   * Also used to split pasted or typed text into multiple tags.
   */
  delimiter?: string | RegExp;

  /**
   * Whether a tag can be edited in place after creation, by pressing `Enter`
   * or double-clicking it
   */
  editable?: boolean;

  /**
   * Returns a boolean that determines whether a tag can be added. Useful for
   * preventing duplicates or enforcing custom validation rules.
   */
  validate?: (details: { value: string[]; inputValue: string }) => boolean;

  /**
   * Callback fired when a tag is rejected, either because the `max` count
   * was reached or because `validate` returned false
   */
  onValueInvalid?: (details: { reason: ChipInputInvalidReason }) => void;

  /**
   * Placeholder text shown in the free-text entry input
   */
  placeholder?: string;

  /**
   * The name attribute for the hidden input, useful for native form submission
   */
  name?: string;

  /**
   * The id of the form the hidden input is associated with
   */
  form?: string;

  /**
   * Controls the control/tag padding and font size
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Renders the input in inverted colors
   */
  inverted?: boolean;

  /**
   * The id of the root element. Also used to derive the validation message id.
   */
  id?: string;
}

const sizeStyles: Record<
  NonNullable<ChipInputProps['size']>,
  {
    fontSize: string;
    controlPadding: string;
    controlMinHeight: string;
    itemPadding: string;
    itemGap: string;
    inputHeight: string;
  }
> = {
  small: {
    fontSize: fontSize[12],
    controlPadding: `${spacing[1]} ${spacing[2]}`,
    controlMinHeight: spacing[8],
    itemPadding: `${spacing[0.5]} ${spacing[1]} ${spacing[0.5]} ${spacing[2]}`,
    itemGap: spacing[1],
    inputHeight: spacing[6],
  },
  medium: {
    fontSize: fontSize[14],
    controlPadding: `${spacing[2]} ${spacing[3]}`,
    controlMinHeight: spacing[10],
    itemPadding: `${spacing[1]} ${spacing[2]} ${spacing[1]} ${spacing[3]}`,
    itemGap: spacing[2],
    inputHeight: spacing[8],
  },
  large: {
    fontSize: fontSize[16],
    controlPadding: `${spacing[3]} ${spacing[4]}`,
    controlMinHeight: spacing[12],
    itemPadding: `${spacing[2]} ${spacing[3]} ${spacing[2]} ${spacing[4]}`,
    itemGap: spacing[2],
    inputHeight: spacing[10],
  },
};

const XIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9 3L3 9M3 3L9 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * ChipInput lets a user type free text and press Enter (or a delimiter such
 * as a comma) to turn it into a removable "chip"/tag. Built using Ark UI's
 * TagsInput component.
 *
 * @example
 * ```tsx
 * <ChipInput
 *   label="Skills"
 *   placeholder="Add a skill"
 *   defaultValue={['React', 'TypeScript']}
 * />
 * ```
 */
const ChipInput = ({
  value,
  defaultValue,
  onValueChange,
  label,
  labelProps,
  validationMessage,
  validationStatus,
  invalid = false,
  disabled = false,
  readOnly = false,
  required = false,
  max,
  maxLength,
  delimiter = ',',
  editable = true,
  validate,
  onValueInvalid,
  placeholder,
  name,
  form,
  size = 'medium',
  inverted = false,
  id,
}: ChipInputProps) => {
  const sizing = sizeStyles[size];

  const backgroundColor = inverted ? color.slate800 : color.white;
  const textColor = inverted ? color.white : color.slate800;
  const placeholderColor = inverted ? color.slate400 : color.slate500;
  const borderColorNormal = inverted ? color.slate700 : color.slate300;
  const borderColorInvalid = inverted ? color.pink300 : color.pink600;
  const borderColor = invalid ? borderColorInvalid : borderColorNormal;
  const focusBorderColor = invalid
    ? borderColorInvalid
    : inverted
      ? color.blue400
      : color.blue500;
  const focusShadowColor = invalid
    ? inverted
      ? 'rgba(255, 145, 182, 0.35)'
      : 'rgba(232, 28, 97, 0.15)'
    : inverted
      ? color.blueTr50
      : color.blueTr10;

  const itemBackground = inverted ? color.slate700 : color.slate100;
  const itemTextColor = inverted ? color.white : color.slate800;
  const itemHighlightedBackground = inverted ? color.blue600 : color.blue100;
  const itemHighlightedTextColor = inverted ? color.white : color.blue600;

  const validationMessageId = id ? `${id}-validation` : undefined;

  const controlStyles: CSSProperties = {
    boxSizing: 'border-box',
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: sizing.itemGap,
    minHeight: sizing.controlMinHeight,
    padding: sizing.controlPadding,
    paddingRight: spacing[8],
    backgroundColor,
    border: `1px solid ${borderColor}`,
    borderRadius: spacing[2],
    fontSize: sizing.fontSize,
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'text',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  };

  const inputStyles: CSSProperties = {
    flex: 1,
    boxSizing: 'border-box',
    minWidth: spacing[16],
    height: sizing.inputHeight,
    padding: `0 ${spacing[1]}`,
    fontSize: sizing.fontSize,
    fontFamily: 'inherit',
    background: 'transparent',
    border: 'none',
    color: textColor,
    outline: 'none',
    // @ts-expect-error - CSS custom property for placeholder color, mirrors Input.tsx
    '--placeholder-color': placeholderColor,
  };

  const clearTriggerStyles: CSSProperties = {
    position: 'absolute',
    top: '50%',
    right: spacing[2],
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[1],
    background: 'transparent',
    border: 'none',
    borderRadius: spacing[1],
    color: placeholderColor,
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  const handleValueInvalid = (details: { reason: 'rangeOverflow' | 'invalidTag' }) => {
    onValueInvalid?.({
      reason: details.reason === 'rangeOverflow' ? 'max' : 'validate',
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {label && (
        <FieldLabel
          required={required}
          disabled={disabled}
          invalid={invalid}
          inverted={inverted}
          size={size === 'large' ? 'medium' : size}
          {...labelProps}
        >
          {label}
        </FieldLabel>
      )}
      <TagsInput.Root
        id={id}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        invalid={invalid}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        max={max}
        maxLength={maxLength}
        delimiter={delimiter}
        editable={editable}
        validate={validate}
        onValueInvalid={handleValueInvalid}
        placeholder={placeholder}
        name={name}
        form={form}
        aria-describedby={validationMessageId}
        style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
      >
        <TagsInput.Context>
          {(api) => (
            <TagsInput.Control
              style={controlStyles}
              onFocus={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.borderColor = focusBorderColor;
                target.style.boxShadow = `0 0 0 3px ${focusShadowColor}`;
              }}
              onBlur={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.borderColor = borderColor;
                target.style.boxShadow = 'none';
              }}
            >
              {api.value.map((tagValue, index) => {
                const itemState = api.getItemState({ index, value: tagValue });
                const itemPreviewStyles: CSSProperties = {
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: spacing[1],
                  padding: sizing.itemPadding,
                  fontSize: sizing.fontSize,
                  fontWeight: fontWeight.medium,
                  borderRadius: spacing[4],
                  backgroundColor: itemState.highlighted
                    ? itemHighlightedBackground
                    : itemBackground,
                  color: itemState.highlighted ? itemHighlightedTextColor : itemTextColor,
                  outline: 'none',
                  maxWidth: '100%',
                  transition: 'background-color 0.15s ease, color 0.15s ease',
                };

                const itemInputStyles: CSSProperties = {
                  boxSizing: 'border-box',
                  minWidth: spacing[16],
                  width: 'auto',
                  padding: `${spacing[0.5]} ${spacing[2]}`,
                  fontSize: sizing.fontSize,
                  fontFamily: 'inherit',
                  backgroundColor: itemBackground,
                  border: `1px solid ${borderColorNormal}`,
                  borderRadius: spacing[1],
                  color: itemTextColor,
                  outline: 'none',
                };

                return (
                  <TagsInput.Item key={index} index={index} value={tagValue} style={{ display: 'inline-flex', maxWidth: '100%' }}>
                    <TagsInput.ItemPreview style={itemPreviewStyles}>
                      <TagsInput.ItemText
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {tagValue}
                      </TagsInput.ItemText>
                      <TagsInput.ItemDeleteTrigger
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 0,
                          background: 'transparent',
                          border: 'none',
                          borderRadius: spacing[1],
                          color: 'inherit',
                          cursor: disabled || readOnly ? 'not-allowed' : 'pointer',
                          flexShrink: 0,
                        }}
                      >
                        <XIcon />
                      </TagsInput.ItemDeleteTrigger>
                    </TagsInput.ItemPreview>
                    <TagsInput.ItemInput style={itemInputStyles} />
                  </TagsInput.Item>
                );
              })}
              <TagsInput.Input
                placeholder={api.value.length === 0 ? placeholder : undefined}
                style={inputStyles}
              />
              <TagsInput.ClearTrigger style={clearTriggerStyles}>
                <XIcon />
              </TagsInput.ClearTrigger>
            </TagsInput.Control>
          )}
        </TagsInput.Context>
        <TagsInput.HiddenInput />
      </TagsInput.Root>
      {validationMessage && (
        <div style={{ marginTop: spacing[1] }}>
          <ValidationMessage
            status={validationStatus ?? 'error'}
            message={validationMessage}
            id={validationMessageId}
            inverted={inverted}
            size={size === 'large' ? 'medium' : size}
          />
        </div>
      )}
    </div>
  );
};

export default ChipInput;
