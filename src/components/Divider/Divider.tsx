import { ark } from '@ark-ui/react/factory';
import { CSSProperties } from 'react';
import { color, spacing } from '../../tokens/tokens';

export interface DividerProps {
  /**
   * Color of the divider line
   */
  color?: string;

  /**
   * Renders the divider in inverted colors
   */
  inverted?: boolean;
}

const Divider = ({
  color: customColor = color.slate300,
  inverted = false,
}: DividerProps) => {
  const dividerColor = inverted ? color.white : customColor;
  const backgroundColor = inverted ? color.slate800 : color.white;

  const styles: CSSProperties = {
    width: '100%',
    height: '1px',
    backgroundColor: dividerColor,
    border: 'none',
    margin: `${spacing[4]} 0`,
  };

  return (
    <ark.div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        backgroundColor: inverted ? backgroundColor : 'transparent',
        padding: inverted ? `${spacing[4]} 0` : '0',
      }}
    >
      <ark.hr style={styles} />
    </ark.div>
  );
};

export default Divider;
