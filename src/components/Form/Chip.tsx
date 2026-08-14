import { ark } from '@ark-ui/react/factory';
import type { CSSProperties, KeyboardEvent, MouseEvent, ReactNode } from 'react';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';

/**
 * Status/semantic color variant of the chip
 */
export type ChipStatus = 'default' | 'info' | 'success' | 'warning' | 'error';

/**
 * Size variant of the chip
 */
export type ChipSize = 'small' | 'medium' | 'large';

/**
 * Props for the Chip component
 */
export interface ChipProps {
  /**
   * Content displayed inside the chip
   */
  children: ReactNode;
  /**
   * Semantic status/color variant of the chip
   */
  status?: ChipStatus;
  /**
   * Size of the chip
   */
  size?: ChipSize;
  /**
   * Whether the chip is disabled (non-interactive, dimmed)
   */
  disabled?: boolean;
  /**
   * Filter-chip toggle state, exposed as aria-pressed on the chip root
   */
  selected?: boolean;
  /**
   * Whether the chip renders a dismiss ("x") trigger
   */
  removable?: boolean;
  /**
   * Callback invoked when the dismiss trigger is activated
   */
  onRemove?: () => void;
  /**
   * Callback invoked when the chip body is clicked. When omitted, the chip
   * renders as a static (non-interactive) element.
   */
  onClick?: () => void;
  /**
   * Leading icon/avatar slot, rendered before the text content
   */
  icon?: ReactNode;
  /**
   * Renders the chip using its inverted (light background) color treatment
   */
  inverted?: boolean;
}

interface SizeConfig {
  padding: string;
  height: string;
  borderRadius: string;
  fontSize: string;
  gap: string;
  iconBoxSize: string;
  removeButtonSize: string;
  removeIconSize: number;
}

const sizeConfigMap: Record<ChipSize, SizeConfig> = {
  small: {
    padding: `${spacing[0.5]} ${spacing[2]}`,
    height: spacing[5],
    borderRadius: spacing[3],
    fontSize: fontSize[11],
    gap: spacing[1],
    iconBoxSize: spacing[3],
    removeButtonSize: spacing[4],
    removeIconSize: 10,
  },
  medium: {
    padding: `${spacing[1]} ${spacing[3]}`,
    height: spacing[6],
    borderRadius: spacing[3],
    fontSize: fontSize[14],
    gap: spacing[2],
    iconBoxSize: spacing[4],
    removeButtonSize: spacing[5],
    removeIconSize: 12,
  },
  large: {
    padding: `${spacing[2]} ${spacing[4]}`,
    height: spacing[8],
    borderRadius: spacing[4],
    fontSize: fontSize[16],
    gap: spacing[2],
    iconBoxSize: spacing[5],
    removeButtonSize: spacing[6],
    removeIconSize: 14,
  },
};

interface StatusColors {
  background: string;
  text: string;
  border: string;
}

const statusMainDarkMap: Record<
  Exclude<ChipStatus, 'default'>,
  { main: string; dark: string }
> = {
  info: { main: color.blue500, dark: color.blue600 },
  success: { main: color.green500, dark: color.green600 },
  warning: { main: color.yellow500, dark: color.yellow600 },
  error: { main: color.pink500, dark: color.pink600 },
};

const getStatusColors = (
  status: ChipStatus,
  inverted: boolean,
  disabled: boolean
): StatusColors => {
  if (disabled) {
    return {
      background: color.slate200,
      text: color.slate400,
      border: color.slate300,
    };
  }

  if (status === 'default') {
    return inverted
      ? { background: color.white, text: color.slate700, border: color.slate300 }
      : { background: color.slate200, text: color.slate700, border: color.slate300 };
  }

  const { main, dark } = statusMainDarkMap[status];

  return inverted
    ? { background: color.white, text: main, border: dark }
    : { background: main, text: color.white, border: dark };
};

const RemoveIcon = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 4L12 12M12 4L4 12"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Chip component for tags, filters, and removable labels.
 * Built as a plain composition of Ark UI factory primitives (no dedicated
 * Ark UI chip/tag component exists).
 *
 * @example
 * ```tsx
 * <Chip status="info" removable onRemove={() => {}}>
 *   React
 * </Chip>
 * ```
 */
const Chip = ({
  children,
  status = 'default',
  size = 'medium',
  disabled = false,
  selected,
  removable = false,
  onRemove,
  onClick,
  icon,
  inverted = false,
}: ChipProps) => {
  const sizeConfig = sizeConfigMap[size];
  const statusColors = getStatusColors(status, inverted, disabled);
  const isClickable = Boolean(onClick);

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (!isClickable || disabled) return;
    // Ignore keydown events that bubbled up from a nested interactive
    // element (e.g. the remove button) so this handler doesn't hijack
    // their own native keyboard activation.
    if (event.target !== event.currentTarget) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.();
    }
  };

  const handleRemoveClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (disabled) return;
    onRemove?.();
  };

  const removeLabel =
    typeof children === 'string' && children.trim().length > 0
      ? `Remove ${children}`
      : 'Remove';

  const containerStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    maxWidth: '100%',
    boxSizing: 'border-box',
    gap: sizeConfig.gap,
    padding: sizeConfig.padding,
    height: sizeConfig.height,
    borderRadius: sizeConfig.borderRadius,
    fontSize: sizeConfig.fontSize,
    fontWeight: fontWeight.medium,
    fontFamily: 'inherit',
    backgroundColor: statusColors.background,
    color: statusColors.text,
    border: `1px solid ${statusColors.border}`,
    cursor: disabled ? 'not-allowed' : isClickable ? 'pointer' : 'default',
    opacity: disabled ? 0.5 : 1,
    outline: 'none',
    userSelect: 'none',
    transition: 'all 0.2s ease',
  };

  return (
    <ark.span
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable && !disabled ? 0 : undefined}
      aria-pressed={selected !== undefined ? selected : undefined}
      aria-disabled={disabled || undefined}
      onClick={isClickable ? handleClick : undefined}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      style={containerStyle}
    >
      {icon && (
        <ark.span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: sizeConfig.iconBoxSize,
            height: sizeConfig.iconBoxSize,
            flexShrink: 0,
          }}
        >
          {icon}
        </ark.span>
      )}
      <ark.span
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          minWidth: 0,
        }}
      >
        {children}
      </ark.span>
      {removable && (
        <ark.button
          type="button"
          aria-label={removeLabel}
          disabled={disabled}
          onClick={handleRemoveClick}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: sizeConfig.removeButtonSize,
            height: sizeConfig.removeButtonSize,
            flexShrink: 0,
            padding: 0,
            border: 'none',
            borderRadius: '50%',
            backgroundColor: 'transparent',
            color: 'inherit',
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        >
          <RemoveIcon size={sizeConfig.removeIconSize} />
        </ark.button>
      )}
    </ark.span>
  );
};

export default Chip;
