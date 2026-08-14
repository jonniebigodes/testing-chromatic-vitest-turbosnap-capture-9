import { ark } from '@ark-ui/react/factory';
import { ReactNode, CSSProperties, FormHTMLAttributes } from 'react';
import { color, spacing } from '../../tokens/tokens';

export interface FormProps
  extends Omit<FormHTMLAttributes<HTMLFormElement>, 'children'> {
  /**
   * Renders the form in inverted colors
   */
  inverted?: boolean;

  /**
   * Sets the gap between form elements
   */
  gap?: string | number;

  /**
   * Form content (typically form fields)
   */
  children: ReactNode;
}

const Form = ({
  inverted = false,
  gap = spacing[4],
  children,
  ...rest
}: FormProps) => {
  const backgroundColor = inverted ? color.slate800 : color.white;
  const borderColor = inverted ? color.slate700 : color.slate200;

  const formStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: typeof gap === 'number' ? `${gap}px` : gap,
    padding: spacing[6],
    backgroundColor,
    border: `1px solid ${borderColor}`,
    borderRadius: spacing[2],
    minWidth: '300px',
  };

  return (
    <ark.form style={formStyles} {...rest}>
      {children}
    </ark.form>
  );
};

export default Form;
