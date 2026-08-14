import { Popover as ArkPopover } from '@ark-ui/react/popover';
import { Portal } from '@ark-ui/react/portal';
import type { CSSProperties, ReactNode } from 'react';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';

export interface PopoverProps {
  /**
   * Optional title shown in the popover
   */
  title?: string;
  /**
   * Optional description shown in the popover
   */
  description?: string;
  /**
   * Trigger element
   */
  children: ReactNode;
  /**
   * Custom content rendered inside the popover body
   */
  content?: ReactNode;
  /**
   * Controlled open state
   */
  open?: boolean;
  /**
   * Called when open state changes
   */
  onOpenChange?: (details: { open: boolean }) => void;
  /**
   * Whether content is rendered in a portal (default true)
   */
  portalled?: boolean;
}

const triggerStyles: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: `${spacing[2]} ${spacing[4]}`,
  fontSize: fontSize[14],
  fontWeight: fontWeight.medium,
  color: color.slate700,
  backgroundColor: color.white,
  border: `1px solid ${color.slate300}`,
  borderRadius: spacing[2],
  cursor: 'pointer',
};

const contentStyles: CSSProperties = {
  backgroundColor: color.white,
  border: `1px solid ${color.slate300}`,
  borderRadius: spacing[2],
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  padding: spacing[4],
  minWidth: '240px',
  maxWidth: '320px',
  position: 'relative',
  zIndex: 50,
};

const titleStyles: CSSProperties = {
  margin: 0,
  fontSize: fontSize[16],
  fontWeight: fontWeight.semibold,
  color: color.slate800,
};

const descriptionStyles: CSSProperties = {
  margin: `${spacing[1]} 0 0`,
  fontSize: fontSize[14],
  color: color.slate500,
};

const closeStyles: CSSProperties = {
  position: 'absolute',
  top: spacing[2],
  right: spacing[2],
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: spacing[6],
  height: spacing[6],
  padding: 0,
  border: 'none',
  borderRadius: spacing[1],
  backgroundColor: 'transparent',
  color: color.slate500,
  cursor: 'pointer',
  fontSize: fontSize[14],
};

/**
 * Popover component built with Ark UI Popover.
 */
const Popover = ({
  title,
  description,
  children,
  content,
  open,
  onOpenChange,
  portalled = true,
}: PopoverProps) => {
  const positioned = (
    <ArkPopover.Positioner style={{ zIndex: 50 }}>
      <ArkPopover.Content style={contentStyles}>
        <ArkPopover.Arrow
          style={
            {
              '--arrow-size': '10px',
              '--arrow-background': color.white,
            } as CSSProperties
          }
        >
          <ArkPopover.ArrowTip />
        </ArkPopover.Arrow>
        <ArkPopover.CloseTrigger style={closeStyles} aria-label="Close">
          ×
        </ArkPopover.CloseTrigger>
        {title ? (
          <ArkPopover.Title style={titleStyles}>{title}</ArkPopover.Title>
        ) : null}
        {description ? (
          <ArkPopover.Description style={descriptionStyles}>
            {description}
          </ArkPopover.Description>
        ) : null}
        {content ? (
          <div style={{ marginTop: spacing[3], fontSize: fontSize[14] }}>
            {content}
          </div>
        ) : null}
      </ArkPopover.Content>
    </ArkPopover.Positioner>
  );

  return (
    <ArkPopover.Root open={open} onOpenChange={onOpenChange}>
      <ArkPopover.Trigger style={triggerStyles}>{children}</ArkPopover.Trigger>
      {portalled ? <Portal>{positioned}</Portal> : positioned}
    </ArkPopover.Root>
  );
};

export default Popover;
