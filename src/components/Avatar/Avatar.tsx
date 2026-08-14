import { Avatar as ArkAvatar } from '@ark-ui/react/avatar';
import type { ComponentPropsWithoutRef } from 'react';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';

/**
 * Props for the Avatar component
 */
export interface AvatarProps {
  /**
   * The source URL of the avatar image
   */
  src?: string;
  /**
   * Alternative text for the avatar image
   */
  alt: string;
  /**
   * Fallback text to display when the image fails to load or is loading
   * Typically initials (e.g., "JD" for John Doe)
   */
  fallback: string;
  /**
   * Callback function called when the image loading status changes
   */
  onStatusChange?: (details: {
    status: 'loading' | 'loaded' | 'error';
  }) => void;
  /**
   * Custom IDs for the avatar elements
   */
  ids?: Partial<{ root: string; image: string; fallback: string }>;
  /**
   * Additional props to pass to the root element
   */
  rootProps?: Omit<ComponentPropsWithoutRef<'div'>, 'id'>;
}

/**
 * Avatar component that displays a user's profile picture with a fallback.
 * Built using Ark UI's Avatar component.
 *
 * @example
 * ```tsx
 * <Avatar
 *   src="https://example.com/avatar.jpg"
 *   alt="John Doe"
 *   fallback="JD"
 * />
 * ```
 */
export const Avatar = ({
  src,
  alt,
  fallback,
  onStatusChange,
  ids,
  rootProps,
}: AvatarProps) => {
  const defaultStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: spacing[12],
    height: spacing[12],
    borderRadius: '50%',
    backgroundColor: color.slate500,
    color: color.white,
    fontWeight: fontWeight.medium,
    fontSize: fontSize[16],
    overflow: 'hidden',
  };

  return (
    <ArkAvatar.Root
      ids={ids}
      onStatusChange={onStatusChange}
      {...rootProps}
      style={{ ...defaultStyles, ...rootProps?.style }}
    >
      <ArkAvatar.Fallback>{fallback}</ArkAvatar.Fallback>
      <ArkAvatar.Image src={src} alt={alt} />
    </ArkAvatar.Root>
  );
};
