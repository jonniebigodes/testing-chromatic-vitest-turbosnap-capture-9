import { Dialog as ArkDialog } from '@ark-ui/react/dialog';
import { Portal } from '@ark-ui/react/portal';
import type { CSSProperties, ReactNode } from 'react';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';

export interface ModalProps {
  /**
   * Dialog title
   */
  title: string;
  /**
   * Optional description
   */
  description?: string;
  /**
   * Dialog body content
   */
  children?: ReactNode;
  /**
   * Label for the trigger button
   */
  triggerLabel?: string;
  /**
   * Controlled open state
   */
  open?: boolean;
  /**
   * Called when open state changes
   */
  onOpenChange?: (details: { open: boolean }) => void;
  /**
   * Whether clicking outside closes the dialog
   */
  closeOnInteractOutside?: boolean;
}

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

const positionerStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  inset: 0,
  zIndex: 50,
};

const contentStyles: CSSProperties = {
  position: 'relative',
  backgroundColor: color.white,
  border: `1px solid ${color.slate300}`,
  borderRadius: spacing[2],
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
  padding: spacing[6],
  width: '24rem',
  maxWidth: 'calc(100vw - 2rem)',
  maxHeight: 'calc(100vh - 2rem)',
  outline: 'none',
};

const titleStyles: CSSProperties = {
  margin: 0,
  fontSize: fontSize[18],
  fontWeight: fontWeight.semibold,
  color: color.slate800,
  paddingRight: spacing[8],
};

const descriptionStyles: CSSProperties = {
  margin: `${spacing[2]} 0 0`,
  fontSize: fontSize[14],
  color: color.slate500,
};

const bodyStyles: CSSProperties = {
  marginTop: spacing[4],
  fontSize: fontSize[14],
  color: color.slate700,
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
 * Modal dialog component built with Ark UI Dialog.
 */
const Modal = ({
  title,
  description,
  children,
  triggerLabel = 'Open',
  open,
  onOpenChange,
  closeOnInteractOutside = true,
}: ModalProps) => {
  return (
    <ArkDialog.Root
      open={open}
      onOpenChange={onOpenChange}
      closeOnInteractOutside={closeOnInteractOutside}
    >
      <ArkDialog.Trigger style={triggerStyles}>{triggerLabel}</ArkDialog.Trigger>
      <Portal>
        <ArkDialog.Backdrop style={backdropStyles} />
        <ArkDialog.Positioner style={positionerStyles}>
          <ArkDialog.Content style={contentStyles}>
            <ArkDialog.CloseTrigger style={closeStyles} aria-label="Close">
              ×
            </ArkDialog.CloseTrigger>
            <ArkDialog.Title style={titleStyles}>{title}</ArkDialog.Title>
            {description ? (
              <ArkDialog.Description style={descriptionStyles}>
                {description}
              </ArkDialog.Description>
            ) : null}
            {children ? <div style={bodyStyles}>{children}</div> : null}
          </ArkDialog.Content>
        </ArkDialog.Positioner>
      </Portal>
    </ArkDialog.Root>
  );
};

export default Modal;
