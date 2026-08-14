import { ark } from '@ark-ui/react/factory';
import { ReactNode, CSSProperties } from 'react';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';

export interface FieldLabelProps {
  /**
   * Links the label to a form element by ID
   */
  htmlFor?: string;

  /**
   * Whether the associated field is required. When true, renders the
   * `requiredIndicator` next to the label content.
   */
  required?: boolean;

  /**
   * Custom content rendered as the "required" indicator, replacing the
   * default pink asterisk (`*`). Only rendered when `required` is true.
   */
  requiredIndicator?: ReactNode;

  /**
   * Whether the associated field is disabled. Takes visual precedence over
   * `invalid` - dims the label and shows a not-allowed cursor regardless of
   * the invalid state.
   */
  disabled?: boolean;

  /**
   * Whether the associated field has failed validation. Tints the label
   * text color, but only when `disabled` is false.
   */
  invalid?: boolean;

  /**
   * Renders the label in inverted colors
   */
  inverted?: boolean;

  /**
   * Controls the label's font size
   */
  size?: 'small' | 'medium';

  /**
   * Content to display inside the label
   */
  children: ReactNode;
}

const FieldLabel = ({
  htmlFor,
  required = false,
  requiredIndicator,
  disabled = false,
  invalid = false,
  inverted = false,
  size = 'medium',
  children,
}: FieldLabelProps) => {
  // `disabled` always wins visually - an invalid tint never shows through a
  // disabled label.
  const showInvalid = invalid && !disabled;

  const baseTextColor = inverted ? color.white : color.slate700;
  // Same pink family used for both surfaces - the inverted variant just
  // picks a lighter step for contrast against the dark pill background.
  const invalidTextColor = inverted ? color.pink300 : color.pink600;
  const textColor = showInvalid ? invalidTextColor : baseTextColor;

  const backgroundColor = inverted ? color.slate800 : 'transparent';

  const labelStyles: CSSProperties = {
    display: 'inline-block',
    fontSize: size === 'small' ? fontSize[12] : fontSize[14],
    fontWeight: fontWeight.medium,
    color: textColor,
    backgroundColor,
    padding: inverted ? `${spacing[1]} ${spacing[2]}` : '0',
    borderRadius: inverted ? spacing[1] : '0',
    marginBottom: spacing[2],
    cursor: disabled ? 'not-allowed' : htmlFor ? 'pointer' : 'default',
    opacity: disabled ? 0.5 : 1,
    transition: 'color 0.2s ease, opacity 0.2s ease',
  };

  const indicatorContent = requiredIndicator ?? '*';

  return (
    <ark.label htmlFor={htmlFor} style={labelStyles}>
      {children}
      {required && (
        <ark.span
          style={{
            color: color.pink600,
            marginLeft: spacing[1],
          }}
        >
          {indicatorContent}
        </ark.span>
      )}
    </ark.label>
  );
};

export default FieldLabel;
