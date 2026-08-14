import { Tooltip as ArkTooltip } from '@ark-ui/react/tooltip';
import { Portal } from '@ark-ui/react/portal';
import type { CSSProperties, ReactNode } from 'react';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';

export interface TooltipProps {
  /**
   * Tooltip content text
   */
  content: string;
  /**
   * Trigger element
   */
  children: ReactNode;
  /**
   * Positioning options for the tooltip
   */
  positioning?: { placement?: string };
  /**
   * Controlled open state
   */
  open?: boolean;
  /**
   * Called when open state changes
   */
  onOpenChange?: (details: { open: boolean }) => void;
  /**
   * Whether the tooltip is disabled
   */
  disabled?: boolean;
  /**
   * Delay before opening (ms)
   */
  openDelay?: number;
  /**
   * Delay before closing (ms)
   */
  closeDelay?: number;
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
  backgroundColor: color.slate800,
  color: color.white,
  padding: `${spacing[1]} ${spacing[2]}`,
  borderRadius: spacing[1],
  fontSize: fontSize[12],
  fontWeight: fontWeight.medium,
  maxWidth: '20rem',
  zIndex: 50,
};

/**
 * Tooltip component built with Ark UI Tooltip.
 */
const Tooltip = ({
  content,
  children,
  positioning,
  open,
  onOpenChange,
  disabled = false,
  openDelay,
  closeDelay,
}: TooltipProps) => {
  return (
    <ArkTooltip.Root
      open={disabled ? false : open}
      onOpenChange={onOpenChange}
      disabled={disabled}
      openDelay={openDelay}
      closeDelay={closeDelay}
      positioning={
        positioning as {
          placement?:
            | 'top'
            | 'bottom'
            | 'left'
            | 'right'
            | 'top-start'
            | 'top-end'
            | 'bottom-start'
            | 'bottom-end'
            | 'left-start'
            | 'left-end'
            | 'right-start'
            | 'right-end';
        }
      }
    >
      <ArkTooltip.Trigger style={triggerStyles}>{children}</ArkTooltip.Trigger>
      <Portal>
        <ArkTooltip.Positioner style={{ zIndex: 50 }}>
          <ArkTooltip.Content style={contentStyles}>
            <ArkTooltip.Arrow
              style={
                {
                  '--arrow-size': '8px',
                  '--arrow-background': color.slate800,
                } as CSSProperties
              }
            >
              <ArkTooltip.ArrowTip />
            </ArkTooltip.Arrow>
            {content}
          </ArkTooltip.Content>
        </ArkTooltip.Positioner>
      </Portal>
    </ArkTooltip.Root>
  );
};

export default Tooltip;
