import {
  Select as ArkSelect,
  createListCollection,
} from '@ark-ui/react/select';
import { Portal } from '@ark-ui/react/portal';
import type { ReactNode } from 'react';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';

/**
 * Item type for Select options
 */
export interface SelectItem {
  label: string;
  value: string;
  disabled?: boolean;
}

/**
 * Props for the Select component
 */
export interface SelectProps {
  /**
   * The type of select - single or multiple selection
   */
  type?: 'single' | 'multiple';
  /**
   * The current value of the select
   */
  value?: string[];
  /**
   * Event handler called when the select value changes
   */
  onValueChange?: (details: { value: string[] }) => void;
  /**
   * Whether the select dropdown is open
   */
  open?: boolean;
  /**
   * Event handler called when the open state changes
   */
  onOpenChange?: (details: { open: boolean }) => void;
  /**
   * Whether the select is disabled
   */
  disabled?: boolean;
  /**
   * Placeholder text when no value is selected
   */
  placeholder?: string;
  /**
   * The name attribute for form submission
   */
  name?: string;
  /**
   * Whether the select is required
   */
  required?: boolean;
  /**
   * Array of items to display in the select
   */
  items: SelectItem[];
  /**
   * Label content to be rendered for the select
   */
  children?: ReactNode;
}

/**
 * Select component for choosing from a list of options.
 * Built using Ark UI's Select component with dropdown.
 *
 * @example
 * ```tsx
 * <Select
 *   items={[
 *     { label: 'Option 1', value: '1' },
 *     { label: 'Option 2', value: '2' }
 *   ]}
 * >
 *   Choose an option
 * </Select>
 * ```
 */
const Select = ({
  type = 'single',
  value,
  onValueChange,
  open,
  onOpenChange,
  disabled = false,
  placeholder = 'Select an option',
  name,
  required = false,
  items,
  children,
}: SelectProps) => {
  const collection = createListCollection({ items });
  const isMultiple = type === 'multiple';

  return (
    <ArkSelect.Root
      collection={collection}
      value={value}
      onValueChange={onValueChange}
      open={open}
      onOpenChange={onOpenChange}
      disabled={disabled}
      name={name}
      required={required}
      multiple={isMultiple}
      positioning={{ sameWidth: true }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: spacing[2],
        width: '300px',
      }}
    >
      {children && (
        <ArkSelect.Label
          style={{
            fontSize: fontSize[14],
            fontWeight: fontWeight.medium,
            color: color.slate700,
            userSelect: 'none',
          }}
        >
          {children}
        </ArkSelect.Label>
      )}
      <ArkSelect.Control>
        <ArkSelect.Trigger
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: `${spacing[2]} ${spacing[3]}`,
            backgroundColor: color.white,
            border: `1px solid ${color.slate300}`,
            borderRadius: spacing[2],
            fontSize: fontSize[14],
            color: color.slate700,
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1,
            outline: 'none',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            if (!disabled) {
              e.currentTarget.style.borderColor = color.slate400;
            }
          }}
          onMouseLeave={(e) => {
            if (!disabled) {
              e.currentTarget.style.borderColor = color.slate300;
            }
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
        >
          <ArkSelect.ValueText
            placeholder={placeholder}
            style={{
              flex: 1,
              textAlign: 'left',
            }}
          />
          <ArkSelect.Indicator
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: spacing[2],
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </ArkSelect.Indicator>
        </ArkSelect.Trigger>
      </ArkSelect.Control>
      <Portal>
        <ArkSelect.Positioner
          style={{
            zIndex: 50,
          }}
        >
          <ArkSelect.Content
            style={{
              backgroundColor: color.white,
              border: `1px solid ${color.slate200}`,
              borderRadius: spacing[2],
              boxShadow:
                '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              maxHeight: '300px',
              overflowY: 'auto',
              padding: spacing[1],
            }}
          >
            <ArkSelect.ItemGroup>
              {items.map((item) => (
                <ArkSelect.Item
                  key={item.value}
                  item={item}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: `${spacing[2]} ${spacing[3]}`,
                    fontSize: fontSize[14],
                    color: item.disabled ? color.slate400 : color.slate700,
                    cursor: item.disabled ? 'not-allowed' : 'pointer',
                    borderRadius: spacing[1],
                    outline: 'none',
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!item.disabled) {
                      e.currentTarget.style.backgroundColor = color.slate100;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <ArkSelect.ItemText>{item.label}</ArkSelect.ItemText>
                  <ArkSelect.ItemIndicator
                    style={{
                      marginLeft: spacing[2],
                      color: color.blue500,
                      fontWeight: fontWeight.bold,
                    }}
                  >
                    ✓
                  </ArkSelect.ItemIndicator>
                </ArkSelect.Item>
              ))}
            </ArkSelect.ItemGroup>
          </ArkSelect.Content>
        </ArkSelect.Positioner>
      </Portal>
      <ArkSelect.HiddenSelect />
    </ArkSelect.Root>
  );
};

export default Select;
