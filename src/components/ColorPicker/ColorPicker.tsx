import {
  ColorPicker as ArkColorPicker,
  parseColor,
  type ColorPickerValueChangeDetails,
} from '@ark-ui/react/color-picker';
import { Portal } from '@ark-ui/react/portal';
import type { CSSProperties } from 'react';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';

export type ColorPickerSize = 'small' | 'medium' | 'large';

export interface ColorPickerProps {
  /**
   * Controlled hex color value (e.g. "#FF4400")
   */
  value?: string;
  /**
   * Uncontrolled initial hex color value
   * @default "#000000"
   */
  defaultValue?: string;
  /**
   * Called when the color value changes
   */
  onValueChange?: (details: ColorPickerValueChangeDetails) => void;
  /**
   * Whether the color picker is disabled
   */
  disabled?: boolean;
  /**
   * Visual size of the control
   * @default "medium"
   */
  size?: ColorPickerSize;
  /**
   * Optional label text
   */
  label?: string;
}

const sizeConfig: Record<
  ColorPickerSize,
  { height: string; fontSize: string; swatch: string; areaHeight: string }
> = {
  small: {
    height: spacing[6],
    fontSize: fontSize[12],
    swatch: spacing[6],
    areaHeight: '8rem',
  },
  medium: {
    height: spacing[8],
    fontSize: fontSize[14],
    swatch: spacing[8],
    areaHeight: '10rem',
  },
  large: {
    height: spacing[10],
    fontSize: fontSize[16],
    swatch: spacing[10],
    areaHeight: '12rem',
  },
};

const toColor = (hex?: string) => {
  if (!hex) return undefined;
  try {
    return parseColor(hex);
  } catch {
    return parseColor('#000000');
  }
};

/**
 * ColorPicker component built with Ark UI ColorPicker.
 */
const ColorPicker = ({
  value,
  defaultValue = '#000000',
  onValueChange,
  disabled = false,
  size = 'medium',
  label,
}: ColorPickerProps) => {
  const cfg = sizeConfig[size];

  const rootStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[2],
    width: '100%',
    maxWidth: '16rem',
    fontFamily: 'inherit',
  };

  const labelStyles: CSSProperties = {
    fontSize: cfg.fontSize,
    fontWeight: fontWeight.medium,
    color: color.slate700,
    userSelect: 'none',
  };

  const controlStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    gap: spacing[2],
    alignItems: 'center',
  };

  const inputStyles: CSSProperties = {
    boxSizing: 'border-box',
    flex: 1,
    minWidth: 0,
    height: cfg.height,
    padding: `0 ${spacing[2]}`,
    fontSize: cfg.fontSize,
    fontFamily: 'inherit',
    backgroundColor: color.white,
    border: `1px solid ${color.slate300}`,
    borderRadius: spacing[2],
    color: color.slate800,
    outline: 'none',
  };

  const triggerStyles: CSSProperties = {
    display: 'grid',
    placeItems: 'center',
    width: cfg.swatch,
    height: cfg.swatch,
    padding: 0,
    minWidth: cfg.swatch,
    backgroundColor: color.white,
    border: `1px solid ${color.slate300}`,
    borderRadius: spacing[2],
    cursor: disabled ? 'not-allowed' : 'pointer',
    overflow: 'hidden',
    flexShrink: 0,
  };

  const swatchWrapStyles: CSSProperties = {
    position: 'relative',
    display: 'grid',
    placeItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 'inherit',
    overflow: 'hidden',
  };

  const contentStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[3],
    padding: spacing[4],
    width: '16rem',
    backgroundColor: color.white,
    border: `1px solid ${color.slate300}`,
    borderRadius: spacing[2],
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    zIndex: 50,
  };

  const areaStyles: CSSProperties = {
    position: 'relative',
    height: cfg.areaHeight,
    borderRadius: spacing[2],
    overflow: 'hidden',
    touchAction: 'none',
  };

  const areaThumbStyles: CSSProperties = {
    width: spacing[3],
    height: spacing[3],
    borderRadius: '9999px',
    boxShadow:
      '0 0 0 2px white, 0 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.15)',
    outline: 'none',
    transform: 'translate(-50%, -50%)',
  };

  const sliderGroupStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[2],
  };

  const channelSliderStyles: CSSProperties = {
    position: 'relative',
    borderRadius: spacing[1],
    height: '0.625rem',
  };

  const channelSliderTrackStyles: CSSProperties = {
    width: '100%',
    height: '0.625rem',
    borderRadius: spacing[1],
  };

  const channelSliderThumbStyles: CSSProperties = {
    width: spacing[3],
    height: spacing[3],
    borderRadius: '9999px',
    boxShadow:
      '0 0 0 2px white, 0 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.15)',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
  };

  const valueTextStyles: CSSProperties = {
    fontSize: cfg.fontSize,
    fontWeight: fontWeight.medium,
    color: color.slate600,
  };

  const transparencyStyles: CSSProperties = {
    width: '100%',
    height: '100%',
    borderRadius: 'inherit',
  };

  const valueSwatchStyles: CSSProperties = {
    gridArea: '1 / 1',
    width: '100%',
    height: '100%',
    borderRadius: 'inherit',
    zIndex: 1,
  };

  return (
    <ArkColorPicker.Root
      style={rootStyles}
      value={toColor(value)}
      defaultValue={value === undefined ? toColor(defaultValue) : undefined}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      {label ? (
        <ArkColorPicker.Label style={labelStyles}>{label}</ArkColorPicker.Label>
      ) : null}

      <ArkColorPicker.Control style={controlStyles}>
        <ArkColorPicker.ChannelInput channel="hex" style={inputStyles} />
        <ArkColorPicker.Trigger style={triggerStyles} aria-label="Open color picker">
          <div style={swatchWrapStyles}>
            <ArkColorPicker.TransparencyGrid style={transparencyStyles} />
            <ArkColorPicker.ValueSwatch style={valueSwatchStyles} />
          </div>
        </ArkColorPicker.Trigger>
      </ArkColorPicker.Control>

      <ArkColorPicker.ValueText style={valueTextStyles} />

      <Portal>
        <ArkColorPicker.Positioner style={{ zIndex: 50 }}>
          <ArkColorPicker.Content style={contentStyles}>
            <ArkColorPicker.Area style={areaStyles}>
              <ArkColorPicker.AreaBackground style={{ width: '100%', height: '100%' }} />
              <ArkColorPicker.AreaThumb style={areaThumbStyles} />
            </ArkColorPicker.Area>

            <div style={sliderGroupStyles}>
              <ArkColorPicker.ChannelSlider channel="hue" style={channelSliderStyles}>
                <ArkColorPicker.ChannelSliderTrack style={channelSliderTrackStyles} />
                <ArkColorPicker.ChannelSliderThumb style={channelSliderThumbStyles} />
              </ArkColorPicker.ChannelSlider>
              <ArkColorPicker.ChannelSlider channel="alpha" style={channelSliderStyles}>
                <ArkColorPicker.TransparencyGrid style={transparencyStyles} />
                <ArkColorPicker.ChannelSliderTrack style={channelSliderTrackStyles} />
                <ArkColorPicker.ChannelSliderThumb style={channelSliderThumbStyles} />
              </ArkColorPicker.ChannelSlider>
            </div>
          </ArkColorPicker.Content>
        </ArkColorPicker.Positioner>
      </Portal>

      <ArkColorPicker.HiddenInput />
    </ArkColorPicker.Root>
  );
};

export default ColorPicker;
