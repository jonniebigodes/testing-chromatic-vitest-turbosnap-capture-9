import { Collapsible as ArkCollapsible } from '@ark-ui/react/collapsible';
import type { ReactNode } from 'react';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';

/**
 * Props for the Collapsible component
 */
export interface CollapsibleProps {
  /**
   * The controlled open state of the collapsible
   */
  open?: boolean;
  /**
   * The callback invoked when the open state changes
   */
  onOpenChange?: (details: { open: boolean }) => void;
  /**
   * Whether the collapsible is disabled
   */
  disabled?: boolean;
  /**
   * Content to be rendered as the trigger/header
   */
  label?: ReactNode;
  /**
   * Content to be rendered inside the collapsible content area
   */
  children?: ReactNode;
}

/**
 * Collapsible component for expandable/collapsible content.
 * Built using Ark UI's Collapsible component.
 *
 * @example
 * ```tsx
 * <Collapsible label="Click to expand" open={true}>
 *   <p>Hidden content goes here</p>
 * </Collapsible>
 * ```
 */
const Collapsible = ({
  open,
  onOpenChange,
  disabled = false,
  label = 'Toggle',
  children,
}: CollapsibleProps) => {
  return (
    <ArkCollapsible.Root
      open={open}
      onOpenChange={onOpenChange}
      disabled={disabled}
      style={{
        width: '100%',
        border: `1px solid ${color.slate200}`,
        borderRadius: spacing[2],
        overflow: 'hidden',
      }}
    >
      <ArkCollapsible.Trigger
        style={{
          width: '100%',
          padding: `${spacing[3]} ${spacing[4]}`,
          backgroundColor: disabled ? color.slate50 : color.white,
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: disabled ? 'not-allowed' : 'pointer',
          fontSize: fontSize[14],
          fontWeight: fontWeight.medium,
          color: disabled ? color.slate400 : color.slate700,
          transition: 'background-color 0.2s ease',
          textAlign: 'left',
        }}
        onMouseEnter={(e) => {
          if (!disabled) {
            e.currentTarget.style.backgroundColor = color.slate50;
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            e.currentTarget.style.backgroundColor = color.white;
          }
        }}
      >
        <span>{label}</span>
        <ArkCollapsible.Indicator
          style={{
            display: 'flex',
            alignItems: 'center',
            transition: 'transform 0.2s ease',
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
            }}
          >
            <path
              d="M6 4L10 8L6 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </ArkCollapsible.Indicator>
      </ArkCollapsible.Trigger>
      <ArkCollapsible.Content
        style={{
          padding: spacing[4],
          backgroundColor: color.white,
          borderTop: `1px solid ${color.slate200}`,
          fontSize: fontSize[14],
          color: color.slate500,
          lineHeight: '1.5',
        }}
      >
        {children}
      </ArkCollapsible.Content>
    </ArkCollapsible.Root>
  );
};

export default Collapsible;
