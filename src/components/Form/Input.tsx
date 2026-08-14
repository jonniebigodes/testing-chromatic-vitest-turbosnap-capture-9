import { ark } from '@ark-ui/react/factory';
import type { CSSProperties, InputHTMLAttributes } from 'react';
import { color, fontSize, spacing } from '../../tokens/tokens';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  /**
   * Renders the input in inverted colors
   */
  inverted?: boolean;

  /**
   * Placeholder text for the input
   */
  placeholder?: string;

  /**
   * Input type (text, email, password, etc.)
   */
  type?: string;
}

const Input = ({
  inverted = false,
  placeholder = '',
  type = 'text',
  ...rest
}: InputProps) => {
  const backgroundColor = inverted ? color.slate800 : color.white;
  const textColor = inverted ? color.white : color.slate800;
  const borderColor = inverted ? color.slate700 : color.slate300;
  const focusBorderColor = inverted ? color.blue400 : color.blue500;
  const placeholderColor = inverted ? color.slate400 : color.slate500;

  const inputStyles: CSSProperties = {
    display: 'block',
    width: '100%',
    padding: `${spacing[2]} ${spacing[3]}`,
    backgroundColor,
    color: textColor,
    border: `1px solid ${borderColor}`,
    borderRadius: spacing[2],
    fontSize: fontSize[14],
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    // @ts-ignore - CSS custom property for placeholder
    '--placeholder-color': placeholderColor,
  };

  return (
    <ark.input
      type={type}
      placeholder={placeholder}
      style={inputStyles}
      onFocus={(e) => {
        const target = e.currentTarget as HTMLInputElement;
        target.style.borderColor = focusBorderColor;
        target.style.boxShadow = `0 0 0 3px ${
          inverted ? color.blueTr50 : color.blueTr10
        }`;
      }}
      onBlur={(e) => {
        const target = e.currentTarget as HTMLInputElement;
        target.style.borderColor = borderColor;
        target.style.boxShadow = 'none';
      }}
      {...rest}
    />
  );
};

export default Input;
