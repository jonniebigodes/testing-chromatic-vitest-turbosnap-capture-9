import { ark } from '@ark-ui/react/factory';
import type { CSSProperties } from 'react';
import { color } from '../../tokens/tokens';

export interface SpinnerProps {
  /**
   * Size of the spinner: 'small', 'medium', 'large', or a pixel number
   */
  size?: 'small' | 'medium' | 'large' | number;

  /**
   * Color of the spinner border accent
   */
  color?: string;

  /**
   * Border thickness in pixels
   */
  thickness?: number;

  /**
   * Accessible label for screen readers (aria-label)
   * @default "Loading"
   */
  label?: string;
}

const sizeMap: Record<'small' | 'medium' | 'large', number> = {
  small: 16,
  medium: 32,
  large: 48,
};

const resolveSize = (size: SpinnerProps['size'] = 'medium'): number => {
  if (typeof size === 'number') return size;
  return sizeMap[size];
};

const SPINNER_KEYFRAMES_ID = 'ark-spinner-keyframes';

const ensureKeyframes = () => {
  if (typeof document === 'undefined') return;
  if (document.getElementById(SPINNER_KEYFRAMES_ID)) return;
  const style = document.createElement('style');
  style.id = SPINNER_KEYFRAMES_ID;
  style.textContent = `
    @keyframes ark-spinner-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
};

const Spinner = ({
  size = 'medium',
  color: spinnerColor = color.blue500,
  thickness = 3,
  label = 'Loading',
}: SpinnerProps) => {
  ensureKeyframes();

  const px = resolveSize(size);

  const style: CSSProperties = {
    display: 'inline-block',
    boxSizing: 'border-box',
    width: px,
    height: px,
    borderRadius: '50%',
    border: `${thickness}px solid ${color.slate200}`,
    borderTopColor: spinnerColor,
    animation: 'ark-spinner-spin 0.8s linear infinite',
    flexShrink: 0,
  };

  return (
    <ark.div
      role="status"
      aria-label={label}
      style={style}
    />
  );
};

export default Spinner;
