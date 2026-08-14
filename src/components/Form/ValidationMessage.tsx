import { ark } from '@ark-ui/react/factory';
import type { CSSProperties, ReactNode } from 'react';
import { color, fontSize, spacing } from '../../tokens/tokens';

/**
 * The semantic status of a validation message
 */
export type ValidationStatus = 'error' | 'warning' | 'success' | 'info';

export interface ValidationMessageProps {
  /**
   * The semantic status of the message, controls color, icon and ARIA role
   */
  status: ValidationStatus;

  /**
   * The message content to display
   */
  message?: ReactNode;

  /**
   * Content to display instead of `message`. When both are provided, `children` wins.
   */
  children?: ReactNode;

  /**
   * An id for the message element, useful for wiring up `aria-describedby`
   * from a consuming form control
   */
  id?: string;

  /**
   * Whether to show the status icon
   */
  showIcon?: boolean;

  /**
   * Renders the message using a lighter, higher-contrast variant of the
   * status color, suitable for use on dark backgrounds
   */
  inverted?: boolean;

  /**
   * The size of the message text
   */
  size?: 'small' | 'medium';
}

const statusColor: Record<ValidationStatus, string> = {
  error: color.pink600,
  warning: color.yellow600,
  success: color.green600,
  info: color.blue600,
};

const statusInvertedColor: Record<ValidationStatus, string> = {
  error: color.pink300,
  warning: color.yellow300,
  success: color.green300,
  info: color.blue300,
};

const statusRole: Record<ValidationStatus, 'alert' | 'status'> = {
  error: 'alert',
  warning: 'status',
  success: 'status',
  info: 'status',
};

const ErrorIcon = ({ fill }: { fill: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7" fill={fill} />
    <path
      d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5"
      stroke={color.white}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WarningIcon = ({ fill }: { fill: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 1.5L15 13.5H1L8 1.5Z"
      fill={fill}
      stroke={fill}
      strokeWidth="1"
      strokeLinejoin="round"
    />
    <path
      d="M8 6.5V9.5"
      stroke={color.white}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="8" cy="11.5" r="0.9" fill={color.white} />
  </svg>
);

const SuccessIcon = ({ fill }: { fill: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7" fill={fill} />
    <path
      d="M4.75 8.25L6.75 10.25L11.25 5.75"
      stroke={color.white}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const InfoIcon = ({ fill }: { fill: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7" fill={fill} />
    <circle cx="8" cy="5" r="1" fill={color.white} />
    <path
      d="M8 7.5V11.5"
      stroke={color.white}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const statusIcon: Record<ValidationStatus, (props: { fill: string }) => ReactNode> = {
  error: ErrorIcon,
  warning: WarningIcon,
  success: SuccessIcon,
  info: InfoIcon,
};

/**
 * ValidationMessage displays contextual feedback for a form field (error,
 * warning, success or info), with an appropriate icon and ARIA role.
 *
 * @example
 * ```tsx
 * <ValidationMessage status="error" message="This field is required" />
 * ```
 */
const ValidationMessage = ({
  status,
  message,
  children,
  id,
  showIcon = true,
  inverted = false,
  size = 'medium',
}: ValidationMessageProps) => {
  const content = children !== undefined ? children : message;
  const textColor = inverted ? statusInvertedColor[status] : statusColor[status];
  const Icon = statusIcon[status];

  const containerStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: spacing[1],
    color: textColor,
    fontSize: size === 'small' ? fontSize[12] : fontSize[14],
    lineHeight: 1.4,
  };

  const iconWrapperStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    marginTop: '0.1em',
  };

  const textStyles: CSSProperties = {
    wordBreak: 'break-word',
  };

  return (
    <ark.div
      id={id}
      role={statusRole[status]}
      style={containerStyles}
    >
      {showIcon && (
        <ark.span data-testid="validation-message-icon" style={iconWrapperStyles}>
          <Icon fill={textColor} />
        </ark.span>
      )}
      <ark.span data-testid="validation-message-text" style={textStyles}>
        {content}
      </ark.span>
    </ark.div>
  );
};

export default ValidationMessage;
