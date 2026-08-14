import { ark } from '@ark-ui/react/factory';
import type { CSSProperties } from 'react';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';

export interface LoadingProps {
  /**
   * Text label shown next to / below the indicator
   * @default "Loading..."
   */
  label?: string;

  /**
   * Size of the loading indicator
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Visual variant of the loading indicator
   */
  variant?: 'spinner' | 'dots' | 'bar';

  /**
   * Accent color for the indicator
   */
  color?: string;

  /**
   * When true, covers the full viewport as an overlay
   */
  fullPage?: boolean;
}

const sizePx: Record<'small' | 'medium' | 'large', number> = {
  small: 16,
  medium: 32,
  large: 48,
};

const labelFont: Record<'small' | 'medium' | 'large', string> = {
  small: fontSize[12],
  medium: fontSize[14],
  large: fontSize[16],
};

const LOADING_KEYFRAMES_ID = 'ark-loading-keyframes';

const ensureKeyframes = () => {
  if (typeof document === 'undefined') return;
  if (document.getElementById(LOADING_KEYFRAMES_ID)) return;
  const style = document.createElement('style');
  style.id = LOADING_KEYFRAMES_ID;
  style.textContent = `
    @keyframes ark-loading-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes ark-loading-bounce {
      0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
      40% { transform: scale(1); opacity: 1; }
    }
    @keyframes ark-loading-bar {
      0% { left: -40%; width: 40%; }
      50% { left: 20%; width: 60%; }
      100% { left: 100%; width: 40%; }
    }
  `;
  document.head.appendChild(style);
};

const SpinnerVariant = ({
  size,
  accent,
}: {
  size: number;
  accent: string;
}) => (
  <ark.div
    aria-hidden="true"
    style={{
      display: 'inline-block',
      boxSizing: 'border-box',
      width: size,
      height: size,
      borderRadius: '50%',
      border: `3px solid ${color.slate200}`,
      borderTopColor: accent,
      animation: 'ark-loading-spin 0.8s linear infinite',
      flexShrink: 0,
    }}
  />
);

const DotsVariant = ({
  size,
  accent,
}: {
  size: number;
  accent: string;
}) => {
  const dot = Math.max(6, Math.round(size / 3));
  return (
    <ark.div
      aria-hidden="true"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: spacing[1],
        height: size,
      }}
    >
      {[0, 1, 2].map((i) => (
        <ark.div
          key={i}
          style={{
            width: dot,
            height: dot,
            borderRadius: '50%',
            backgroundColor: accent,
            animation: `ark-loading-bounce 1.2s ease-in-out ${i * 0.16}s infinite`,
          }}
        />
      ))}
    </ark.div>
  );
};

const BarVariant = ({
  size,
  accent,
}: {
  size: number;
  accent: string;
}) => {
  const height = Math.max(4, Math.round(size / 6));
  const width = size * 4;
  return (
    <ark.div
      aria-hidden="true"
      style={{
        position: 'relative',
        overflow: 'hidden',
        width,
        height,
        borderRadius: height,
        backgroundColor: color.slate200,
      }}
    >
      <ark.div
        style={{
          position: 'absolute',
          top: 0,
          height: '100%',
          borderRadius: height,
          backgroundColor: accent,
          animation: 'ark-loading-bar 1.4s ease-in-out infinite',
        }}
      />
    </ark.div>
  );
};

const Loading = ({
  label = 'Loading...',
  size = 'medium',
  variant = 'spinner',
  color: accent = color.blue500,
  fullPage = false,
}: LoadingProps) => {
  ensureKeyframes();

  const px = sizePx[size];

  const indicator =
    variant === 'dots' ? (
      <DotsVariant size={px} accent={accent} />
    ) : variant === 'bar' ? (
      <BarVariant size={px} accent={accent} />
    ) : (
      <SpinnerVariant size={px} accent={accent} />
    );

  const contentStyle: CSSProperties = {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[3],
  };

  const labelStyle: CSSProperties = {
    fontSize: labelFont[size],
    fontWeight: fontWeight.medium,
    color: color.slate700,
    margin: 0,
  };

  const inner = (
    <ark.div role="status" aria-label={label} style={contentStyle}>
      {indicator}
      <ark.span style={labelStyle}>{label}</ark.span>
    </ark.div>
  );

  if (!fullPage) return inner;

  return (
    <ark.div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255, 255, 255, 0.85)',
        zIndex: 9999,
      }}
    >
      {inner}
    </ark.div>
  );
};

export default Loading;
