import {
  Combobox as ArkCombobox,
  createListCollection,
} from '@ark-ui/react/combobox';
import { Portal } from '@ark-ui/react/portal';
import { useMemo, useState } from 'react';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';

/**
 * Props for the Combobox component
 */
export interface ComboboxProps {
  /**
   * The type of combobox - single or multiple selection
   */
  type?: 'single' | 'multiple';
  /**
   * The controlled value of the combobox
   */
  value?: string[];
  /**
   * Callback invoked when the value changes
   */
  onValueChange?: (details: { value: string[] }) => void;
  /**
   * The controlled open state of the combobox
   */
  open?: boolean;
  /**
   * Callback invoked when the open state changes
   */
  onOpenChange?: (details: { open: boolean }) => void;
  /**
   * Whether the combobox is disabled
   */
  disabled?: boolean;
  /**
   * Placeholder text for the input
   */
  placeholder?: string;
  /**
   * Name attribute for form submission
   */
  name?: string;
  /**
   * Whether the combobox is required
   */
  required?: boolean;
  /**
   * Array of items for the combobox
   */
  items?: string[];
  /**
   * Label for the combobox
   */
  label?: string;
}

/**
 * Combobox component for autocomplete and selection.
 * Built using Ark UI's Combobox component.
 *
 * @example
 * ```tsx
 * <Combobox
 *   label="Select a framework"
 *   items={['React', 'Vue', 'Svelte']}
 *   placeholder="Choose one..."
 * />
 * ```
 */
const Combobox = ({
  type = 'single',
  value,
  onValueChange,
  open,
  onOpenChange,
  disabled = false,
  placeholder = 'Select an option',
  name,
  required = false,
  items = [],
  label,
}: ComboboxProps) => {
  const [inputValue, setInputValue] = useState('');

  const filteredItems = useMemo(() => {
    const query = inputValue.trim().toLowerCase();
    if (!query) return items;
    return items.filter((item) => item.toLowerCase().includes(query));
  }, [items, inputValue]);

  const collection = createListCollection({
    items: filteredItems,
  });

  return (
    <ArkCombobox.Root
      collection={collection}
      value={value}
      onValueChange={onValueChange}
      open={open}
      onOpenChange={onOpenChange}
      onInputValueChange={(details) => setInputValue(details.inputValue)}
      disabled={disabled}
      name={name}
      required={required}
      multiple={type === 'multiple'}
      style={{
        width: '100%',
        position: 'relative',
      }}
    >
      {label && (
        <ArkCombobox.Label
          style={{
            display: 'block',
            fontSize: fontSize[14],
            fontWeight: fontWeight.medium,
            color: color.slate700,
            marginBottom: spacing[2],
          }}
        >
          {label}
        </ArkCombobox.Label>
      )}
      <ArkCombobox.Control
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <ArkCombobox.Input
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: `${spacing[2]} ${spacing[20]} ${spacing[2]} ${spacing[3]}`,
            backgroundColor: disabled ? color.slate50 : color.white,
            color: disabled ? color.slate400 : color.slate800,
            border: `1px solid ${color.slate300}`,
            borderRadius: spacing[2],
            fontSize: fontSize[14],
            outline: 'none',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
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
        <div
          style={{
            position: 'absolute',
            right: spacing[2],
            display: 'flex',
            alignItems: 'center',
            gap: spacing[1],
          }}
        >
          <ArkCombobox.ClearTrigger
            style={{
              padding: spacing[1],
              backgroundColor: 'transparent',
              border: 'none',
              cursor: disabled ? 'not-allowed' : 'pointer',
              color: color.slate500,
              borderRadius: spacing[1],
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!disabled) {
                e.currentTarget.style.backgroundColor = color.slate100;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
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
                d="M12 4L4 12M4 4L12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </ArkCombobox.ClearTrigger>
          <ArkCombobox.Trigger
            style={{
              padding: spacing[1],
              backgroundColor: 'transparent',
              border: 'none',
              cursor: disabled ? 'not-allowed' : 'pointer',
              color: color.slate500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: spacing[1],
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!disabled) {
                e.currentTarget.style.backgroundColor = color.slate100;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
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
          </ArkCombobox.Trigger>
        </div>
      </ArkCombobox.Control>
      <Portal>
        <ArkCombobox.Positioner
          style={{
            zIndex: 1000,
          }}
        >
          <ArkCombobox.Content
            style={{
              backgroundColor: color.white,
              border: `1px solid ${color.slate200}`,
              borderRadius: spacing[2],
              boxShadow:
                '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              marginTop: spacing[1],
              maxHeight: '300px',
              overflowY: 'auto',
              minWidth: '200px',
            }}
          >
            <ArkCombobox.ItemGroup>
              {collection.items.map((item) => (
                <ArkCombobox.Item
                  key={item}
                  item={item}
                  style={{
                    padding: `${spacing[2]} ${spacing[3]}`,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: fontSize[14],
                    color: color.slate700,
                    transition: 'background-color 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = color.slate100;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <ArkCombobox.ItemText>{item}</ArkCombobox.ItemText>
                  <ArkCombobox.ItemIndicator
                    style={{
                      color: color.blue500,
                      fontWeight: fontWeight.bold,
                    }}
                  >
                    ✓
                  </ArkCombobox.ItemIndicator>
                </ArkCombobox.Item>
              ))}
            </ArkCombobox.ItemGroup>
            <ArkCombobox.Empty
              style={{
                padding: spacing[5],
                textAlign: 'center',
                color: color.slate400,
                fontSize: fontSize[14],
              }}
            >
              No results found
            </ArkCombobox.Empty>
          </ArkCombobox.Content>
        </ArkCombobox.Positioner>
      </Portal>
    </ArkCombobox.Root>
  );
};

export default Combobox;
