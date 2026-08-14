import { ark } from '@ark-ui/react/factory';
import type { ReactNode, CSSProperties } from 'react';
import { color, spacing } from '../../tokens/tokens';

/**
 * Props for the Toolbar component
 */
export interface ToolbarProps {
  /**
   * The orientation of the toolbar
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Content to be rendered inside the toolbar
   */
  children?: ReactNode;
}

/**
 * Toolbar component for grouping related actions.
 * Built using Ark UI's factory component.
 *
 * @example
 * ```tsx
 * <Toolbar orientation="horizontal">
 *   <Button label="Save" />
 *   <Button label="Cancel" />
 * </Toolbar>
 * ```
 */
const Toolbar = ({ orientation = 'horizontal', children }: ToolbarProps) => {
  const isHorizontal = orientation === 'horizontal';

  const toolbarStyles: CSSProperties = {
    display: 'flex',
    flexDirection: isHorizontal ? 'row' : 'column',
    alignItems: 'center',
    gap: spacing[2],
    padding: spacing[2],
    backgroundColor: color.slate50,
    border: `1px solid ${color.slate200}`,
    borderRadius: spacing[2],
    width: isHorizontal ? 'auto' : 'fit-content',
  };

  return (
    <ark.div
      role="toolbar"
      aria-orientation={orientation}
      style={toolbarStyles}
    >
      {children}
    </ark.div>
  );
};

export default Toolbar;
