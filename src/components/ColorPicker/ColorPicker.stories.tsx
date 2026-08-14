import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useState } from 'react';
import ColorPicker from './ColorPicker';

const meta = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'color' },
    defaultValue: { control: 'color' },
    disabled: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    label: { control: 'text' },
  },
  args: {
    onValueChange: fn(),
    defaultValue: '#EB5E41',
    label: 'Color',
  },
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { label: 'Brand color' },
};

export const WithoutLabel: Story = {
  args: { label: undefined },
};

export const Small: Story = {
  args: { size: 'small', label: 'Small' },
};

export const Medium: Story = {
  args: { size: 'medium', label: 'Medium' },
};

export const Large: Story = {
  args: { size: 'large', label: 'Large' },
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Disabled' },
};

export const DisabledSmall: Story = {
  args: { disabled: true, size: 'small', label: 'Disabled small' },
};

export const DisabledLarge: Story = {
  args: { disabled: true, size: 'large', label: 'Disabled large' },
};

export const Red: Story = {
  args: { defaultValue: '#FF0000', label: 'Red' },
};

export const Green: Story = {
  args: { defaultValue: '#66BF3C', label: 'Green' },
};

export const Blue: Story = {
  args: { defaultValue: '#0077FF', label: 'Blue' },
};

export const Orange: Story = {
  args: { defaultValue: '#FF4400', label: 'Orange' },
};

export const Purple: Story = {
  args: { defaultValue: '#6F2CAC', label: 'Purple' },
};

export const Pink: Story = {
  args: { defaultValue: '#FF4785', label: 'Pink' },
};

export const Cyan: Story = {
  args: { defaultValue: '#37D5D3', label: 'Cyan' },
};

export const Yellow: Story = {
  args: { defaultValue: '#FFAE00', label: 'Yellow' },
};

export const Black: Story = {
  args: { defaultValue: '#000000', label: 'Black' },
};

export const White: Story = {
  args: { defaultValue: '#FFFFFF', label: 'White' },
};

export const Slate: Story = {
  args: { defaultValue: '#334155', label: 'Slate' },
};

export const Controlled: Story = {
  render: function ControlledStory(args) {
    const [value, setValue] = useState('#EB5E41');
    return (
      <ColorPicker
        {...args}
        value={value}
        onValueChange={(details) => {
          setValue(details.valueAsString);
          args.onValueChange?.(details);
        }}
        label={`Controlled (${value})`}
      />
    );
  },
};

export const ControlledBlue: Story = {
  render: function ControlledBlueStory(args) {
    const [value, setValue] = useState('#0077FF');
    return (
      <ColorPicker
        {...args}
        value={value}
        onValueChange={(details) => setValue(details.value.toString('hex'))}
        label="Controlled blue"
      />
    );
  },
};

export const OpenByDefault: Story = {
  args: { defaultValue: '#EB5E41', label: 'Pick me' },
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByLabelText('Open color picker');
    await userEvent.click(trigger);
  },
};

export const SmallOpen: Story = {
  args: { size: 'small', defaultValue: '#66BF3C', label: 'Small open' },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByLabelText('Open color picker'));
  },
};

export const LargeOpen: Story = {
  args: { size: 'large', defaultValue: '#6F2CAC', label: 'Large open' },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByLabelText('Open color picker'));
  },
};

export const HexDefaultEb5e41: Story = {
  args: { defaultValue: '#eb5e41', label: 'Ark demo color' },
};

export const HexLowercase: Story = {
  args: { defaultValue: '#ff4400', label: 'Lowercase hex' },
};

export const HexUppercase: Story = {
  args: { defaultValue: '#FF4400', label: 'Uppercase hex' },
};

export const ShortLabel: Story = {
  args: { label: 'C', defaultValue: '#0077FF' },
};

export const LongLabel: Story = {
  args: {
    label: 'Primary brand accent color used across marketing surfaces',
    defaultValue: '#FF4785',
  },
};

export const NoDefaultUsesBlack: Story = {
  args: { defaultValue: undefined, label: 'Falls back' },
};

export const SizeSmallRed: Story = {
  args: { size: 'small', defaultValue: '#FF0000', label: 'Small red' },
};

export const SizeMediumGreen: Story = {
  args: { size: 'medium', defaultValue: '#66BF3C', label: 'Medium green' },
};

export const SizeLargeBlue: Story = {
  args: { size: 'large', defaultValue: '#0077FF', label: 'Large blue' },
};

export const DisabledRed: Story = {
  args: { disabled: true, defaultValue: '#FF0000', label: 'Disabled red' },
};

export const DisabledWithLabel: Story = {
  args: { disabled: true, label: 'Cannot edit', defaultValue: '#334155' },
};

export const BrandOrange: Story = {
  args: { defaultValue: '#FF4400', label: 'Brand orange', size: 'medium' },
};

export const BrandBlue: Story = {
  args: { defaultValue: '#0077FF', label: 'Brand blue', size: 'medium' },
};

export const BrandCyan: Story = {
  args: { defaultValue: '#25C3C1', label: 'Brand cyan', size: 'medium' },
};

export const SuccessGreen: Story = {
  args: { defaultValue: '#489524', label: 'Success', size: 'medium' },
};

export const WarningYellow: Story = {
  args: { defaultValue: '#E39D07', label: 'Warning', size: 'medium' },
};

export const DangerPink: Story = {
  args: { defaultValue: '#E81C61', label: 'Danger', size: 'medium' },
};

export const NeutralSlate: Story = {
  args: { defaultValue: '#64748B', label: 'Neutral', size: 'medium' },
};

export const NearWhite: Story = {
  args: { defaultValue: '#F8FAFC', label: 'Near white' },
};

export const NearBlack: Story = {
  args: { defaultValue: '#0F172A', label: 'Near black' },
};

export const MidGray: Story = {
  args: { defaultValue: '#94A3B8', label: 'Mid gray' },
};

export const KitchenSinkLarge: Story = {
  args: {
    size: 'large',
    label: 'Kitchen sink',
    defaultValue: '#6F2CAC',
    disabled: false,
  },
};

export const KitchenSinkSmallDisabled: Story = {
  args: {
    size: 'small',
    label: 'Locked',
    defaultValue: '#37D5D3',
    disabled: true,
  },
};

export const AccentPurpleLarge: Story = {
  args: { size: 'large', defaultValue: '#5A1897', label: 'Accent' },
};

export const CompactSmallNoLabel: Story = {
  args: { size: 'small', label: undefined, defaultValue: '#FFAE00' },
};


