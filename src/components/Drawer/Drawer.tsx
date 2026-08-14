import { Drawer as ArkDrawer } from '@ark-ui/react/drawer';
import { Portal } from '@ark-ui/react/portal';
import type { CSSProperties, ReactNode } from 'react';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerProps {
  /**
   * Drawer title
   */
  title: string;
  /**
   * Drawer body content
   */
  children?: ReactNode;
  /**
   * Edge the drawer slides from
   */
  side?: DrawerSide;
  /**
   * Controlled open state
   */
  open?: boolean;
  /**
   * Called when open state changes
   */
  onOpenChange?: (details: { open: boolean }) => void;
  /**
   * Label for the trigger button
   */
  triggerLabel?: string;
}

const sideToSwipe = {
  left: 'start',
  right: 'end',
  top: 'up',
  bottom: 'down',
} as const;

const triggerStyles: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: `${spacing[2]} ${spacing[4]}`,
  fontSize: fontSize[14],
  fontWeight: fontWeight.medium,
  color: color.white,
  backgroundColor: color.blue500,
  border: 'none',
  borderRadius: spacing[2],
  cursor: 'pointer',
};

const backdropStyles: CSSProperties = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  zIndex: 40,
};

const getPositionerStyles = (side: DrawerSide): CSSProperties => {
  const base: CSSProperties = {
    position: 'fixed',
    inset: 0,
    display: 'flex',
    zIndex: 50,
  };
  if (side === 'left') {
    return { ...base, justifyContent: 'flex-start', alignItems: 'stretch' };
  }
  if (side === 'right') {
    return { ...base, justifyContent: 'flex-end', alignItems: 'stretch' };
  }
  if (side === 'top') {
    return { ...base, justifyContent: 'center', alignItems: 'flex-start' };
  }
  return { ...base, justifyContent: 'center', alignItems: 'flex-end' };
};

const getContentStyles = (side: DrawerSide): CSSProperties => {
  const base: CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: color.white,
    border: `1px solid ${color.slate300}`,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
    padding: spacing[6],
    outline: 'none',
  };

  if (side === 'left' || side === 'right') {
    return {
      ...base,
      width: '320px',
      maxWidth: '90vw',
      height: '100%',
      borderRadius: 0,
    };
  }

  return {
    ...base,
    width: '100%',
    maxHeight: '70vh',
    borderRadius:
      side === 'top'
        ? `0 0 ${spacing[2]} ${spacing[2]}`
        : `${spacing[2]} ${spacing[2]} 0 0`,
  };
};

const titleStyles: CSSProperties = {
  margin: 0,
  fontSize: fontSize[18],
  fontWeight: fontWeight.semibold,
  color: color.slate800,
  paddingRight: spacing[8],
};

const bodyStyles: CSSProperties = {
  marginTop: spacing[4],
  fontSize: fontSize[14],
  color: color.slate700,
  flex: 1,
  overflowY: 'auto',
};

const closeStyles: CSSProperties = {
  position: 'absolute',
  top: spacing[3],
  right: spacing[3],
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
  fontSize: fontSize[16],
};

/**
 * Drawer component built with Ark UI Drawer.
 */
const Drawer = ({
  title,
  children,
  side = 'right',
  open,
  onOpenChange,
  triggerLabel = 'Open',
}: DrawerProps) => {
  return (
    <ArkDrawer.Root
      open={open}
      onOpenChange={onOpenChange}
      swipeDirection={sideToSwipe[side]}
      lazyMount
      unmountOnExit
    >
      <ArkDrawer.Trigger style={triggerStyles}>{triggerLabel}</ArkDrawer.Trigger>
      <Portal>
        <ArkDrawer.Backdrop style={backdropStyles} />
        <ArkDrawer.Positioner style={getPositionerStyles(side)}>
          <ArkDrawer.Content style={getContentStyles(side)}>
            <ArkDrawer.CloseTrigger style={closeStyles} aria-label="Close">
              ×
            </ArkDrawer.CloseTrigger>
            <ArkDrawer.Title style={titleStyles}>{title}</ArkDrawer.Title>
            {children ? <div style={bodyStyles}>{children}</div> : null}
          </ArkDrawer.Content>
        </ArkDrawer.Positioner>
      </Portal>
    </ArkDrawer.Root>
  );
};

export default Drawer;
