import { ark } from '@ark-ui/react/factory';
import { ReactNode, CSSProperties } from 'react';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';

export interface LabelProps {
  /**
   * Links the label to a form element by ID
   */
  htmlFor?: string;

  /**
   * Renders the label in inverted colors
   */
  inverted?: boolean;

  /**
   * Content to display inside the label
   */
  children: ReactNode;
}

const Label = ({ htmlFor, inverted = false, children }: LabelProps) => {
  const textColor = inverted ? color.white : color.slate700;
  const backgroundColor = inverted ? color.slate800 : 'transparent';

  const labelStyles: CSSProperties = {
    display: 'inline-block',
    fontSize: fontSize[14],
    fontWeight: fontWeight.medium,
    color: textColor,
    backgroundColor,
    padding: inverted ? `${spacing[1]} ${spacing[2]}` : '0',
    borderRadius: inverted ? spacing[1] : '0',
    marginBottom: spacing[2],
    cursor: htmlFor ? 'pointer' : 'default',
    transition: 'color 0.2s ease',
  };

  return (
    <ark.label htmlFor={htmlFor} style={labelStyles}>
      {children}
    </ark.label>
  );
};

export default Label;
