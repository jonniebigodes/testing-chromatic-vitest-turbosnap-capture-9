import { ark } from '@ark-ui/react/factory';
import type { ReactNode } from 'react';

/**
 * Props for the AspectRatio component
 */
export interface AspectRatioProps {
  /**
   * The aspect ratio of the container (e.g., 16/9, 4/3, 1)
   * Can be specified as a number directly (1.777 for 16:9) or as a division (16/9)
   */
  ratio: number;
  /**
   * Content to be rendered inside the aspect ratio container
   */
  children?: ReactNode;
}

/**
 * AspectRatio component that maintains a specific aspect ratio for its content.
 * Built using Ark UI's factory component.
 *
 * @example
 * ```tsx
 * // 16:9 aspect ratio
 * <AspectRatio ratio={16/9}>
 *   <img src="image.jpg" alt="Example" />
 * </AspectRatio>
 *
 * // Square aspect ratio
 * <AspectRatio ratio={1}>
 *   <div>Square content</div>
 * </AspectRatio>
 * ```
 */
const AspectRatio = ({ ratio, children }: AspectRatioProps) => {
  return (
    <ark.div
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: `${(1 / ratio) * 100}%`,
        overflow: 'hidden',
      }}
    >
      <ark.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </ark.div>
    </ark.div>
  );
};

export default AspectRatio;
