import { RatingGroup as ArkRatingGroup } from '@ark-ui/react/rating-group';
import type { ReactNode } from 'react';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';

/**
 * Props for the RatingGroup component
 */
export interface RatingGroupProps {
  /**
   * Event handler called when the rating value changes
   */
  onValueChange?: (details: { value: number }) => void;
  /**
   * Whether the rating group is disabled
   */
  disabled?: boolean;
  /**
   * Whether the rating group is required
   */
  required?: boolean;
  /**
   * The name attribute for form submission
   */
  name?: string;
  /**
   * The minimum value of the rating (starting point)
   * @default 1
   */
  min?: number;
  /**
   * The maximum value of the rating (total count)
   * @default 5
   */
  max?: number;
  /**
   * Whether the rating group is read-only
   */
  readOnly?: boolean;
  /**
   * The orientation of the rating group
   * Note: Ark UI doesn't support vertical orientation natively
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Label content to be rendered for the rating group
   */
  children?: ReactNode;
  /**
   * The controlled value of the rating
   */
  value?: number;
  /**
   * The default value when uncontrolled
   */
  defaultValue?: number;
}

/**
 * Star icon component for rating items
 */
const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      display: 'block',
    }}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

/**
 * RatingGroup component for user ratings.
 * Built using Ark UI's RatingGroup component with customizable stars.
 *
 * @example
 * ```tsx
 * <RatingGroup max={5} defaultValue={3}>
 *   Rate this product
 * </RatingGroup>
 * ```
 */
const RatingGroup = ({
  onValueChange,
  disabled = false,
  required = false,
  name,
  min = 1,
  max = 5,
  readOnly = false,
  orientation = 'horizontal',
  children,
  value,
  defaultValue,
}: RatingGroupProps) => {
  const isVertical = orientation === 'vertical';
  const count = max - min + 1;

  return (
    <ArkRatingGroup.Root
      count={count}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      required={required}
      name={name}
      readOnly={readOnly}
      style={{
        display: 'flex',
        flexDirection: isVertical ? 'row' : 'column',
        gap: isVertical ? spacing[4] : spacing[2],
        alignItems: isVertical ? 'center' : 'flex-start',
      }}
    >
      {children && (
        <ArkRatingGroup.Label
          style={{
            fontSize: fontSize[14],
            fontWeight: fontWeight.medium,
            color: color.slate700,
            userSelect: 'none',
          }}
        >
          {children}
        </ArkRatingGroup.Label>
      )}
      <ArkRatingGroup.Control
        style={{
          display: 'flex',
          flexDirection: isVertical ? 'column' : 'row',
          gap: spacing[1],
        }}
      >
        <ArkRatingGroup.Context>
          {({ items }) =>
            items.map((item) => (
              <ArkRatingGroup.Item
                key={item}
                index={item}
                style={{
                  cursor: disabled || readOnly ? 'default' : 'pointer',
                  color: color.yellow500,
                  opacity: disabled ? 0.5 : 1,
                  transition: 'transform 0.15s ease, opacity 0.15s ease',
                  outline: 'none',
                }}
                onMouseEnter={(e) => {
                  if (!disabled && !readOnly) {
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onFocus={(e) => {
                  if (!disabled && !readOnly) {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.filter =
                      'drop-shadow(0 0 4px rgba(251, 191, 36, 0.4))';
                  }
                }}
                onBlur={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.filter = 'none';
                }}
              >
                <ArkRatingGroup.ItemContext>
                  {({ highlighted }) => <StarIcon filled={highlighted} />}
                </ArkRatingGroup.ItemContext>
              </ArkRatingGroup.Item>
            ))
          }
        </ArkRatingGroup.Context>
        <ArkRatingGroup.HiddenInput />
      </ArkRatingGroup.Control>
    </ArkRatingGroup.Root>
  );
};

export default RatingGroup;
