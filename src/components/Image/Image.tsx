import { ark } from '@ark-ui/react/factory';
import { useEffect, useState, type CSSProperties } from 'react';
import { color, spacing } from '../../tokens/tokens';

export interface ImageProps {
  /**
   * Source URL of the image
   */
  src: string;

  /**
   * Alternative text for the image
   */
  alt: string;

  /**
   * Width of the image
   */
  width?: number | string;

  /**
   * Height of the image
   */
  height?: number | string;

  /**
   * How the image should be resized to fit its container
   */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';

  /**
   * Whether the image should have fully rounded corners
   */
  rounded?: boolean;

  /**
   * Custom border radius override
   */
  borderRadius?: string;

  /**
   * Fallback image source used when the primary src fails to load
   */
  fallbackSrc?: string;
}

const Image = ({
  src,
  alt,
  width,
  height,
  objectFit = 'cover',
  rounded = false,
  borderRadius,
  fallbackSrc,
}: ImageProps) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasErrored, setHasErrored] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setHasErrored(false);
  }, [src]);

  const resolvedBorderRadius = borderRadius
    ? borderRadius
    : rounded
      ? '9999px'
      : spacing[2];

  const style: CSSProperties = {
    display: 'block',
    maxWidth: '100%',
    width: width ?? 'auto',
    height: height ?? 'auto',
    objectFit,
    borderRadius: resolvedBorderRadius,
    backgroundColor: color.slate100,
  };

  return (
    <ark.img
      src={currentSrc}
      alt={alt}
      style={style}
      onError={() => {
        if (!hasErrored && fallbackSrc) {
          setHasErrored(true);
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
};

export default Image;
