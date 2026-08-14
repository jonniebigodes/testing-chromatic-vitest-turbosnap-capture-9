import { ark } from '@ark-ui/react/factory';
import type { CSSProperties } from 'react';
import { color, spacing } from '../../tokens/tokens';

export interface VideoProps {
  /**
   * Video source URL
   */
  src: string;

  /**
   * Poster image shown before playback
   */
  poster?: string;

  /**
   * Whether native controls are shown
   * @default true
   */
  controls?: boolean;

  /**
   * Whether the video should autoplay
   * @default false
   */
  autoPlay?: boolean;

  /**
   * Whether the video is muted
   * @default false
   */
  muted?: boolean;

  /**
   * Whether the video should loop
   * @default false
   */
  loop?: boolean;

  /**
   * Width of the video element
   */
  width?: string | number;

  /**
   * Height of the video element
   */
  height?: string | number;

  /**
   * Whether corners are rounded
   * @default false
   */
  rounded?: boolean;
}

const Video = ({
  src,
  poster,
  controls = true,
  autoPlay = false,
  muted = false,
  loop = false,
  width = 480,
  height = 270,
  rounded = false,
}: VideoProps) => {
  const style: CSSProperties = {
    display: 'block',
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    maxWidth: '100%',
    backgroundColor: color.slate900,
    borderRadius: rounded ? spacing[3] : 0,
    objectFit: 'cover',
    outline: 'none',
  };

  return (
    <ark.video
      src={src || undefined}
      poster={poster}
      controls={controls}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline
      style={style}
    />
  );
};

export default Video;
