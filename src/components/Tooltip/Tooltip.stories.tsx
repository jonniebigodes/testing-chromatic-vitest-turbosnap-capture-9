import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useState } from 'react';
import Tooltip from './Tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    open: { control: 'boolean' },
    disabled: { control: 'boolean' },
    openDelay: { control: 'number' },
    closeDelay: { control: 'number' },
  },
  args: {
    onOpenChange: fn(),
    content: 'Tooltip text',
    children: 'Hover me',
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { content: 'Helpful tip', children: 'Hover me' },
};

export const Open: Story = {
  args: { content: 'Always visible', children: 'Trigger', open: true },
};

export const Closed: Story = {
  args: { content: 'Hidden tip', children: 'Closed', open: false },
};

export const Disabled: Story = {
  args: { content: 'Will not show', children: 'Disabled', disabled: true },
};

export const DisabledOpen: Story = {
  args: {
    content: 'Still disabled',
    children: 'Disabled open',
    disabled: true,
    open: true,
  },
};

export const ShortContent: Story = {
  args: { content: 'Hi', children: 'Short', open: true },
};

export const LongContent: Story = {
  args: {
    content:
      'This is a much longer tooltip message that wraps across multiple lines to demonstrate overflow handling.',
    children: 'Long tip',
    open: true,
  },
};

export const PlacementTop: Story = {
  args: {
    content: 'Top placement',
    children: 'Top',
    open: true,
    positioning: { placement: 'top' },
  },
};

export const PlacementBottom: Story = {
  args: {
    content: 'Bottom placement',
    children: 'Bottom',
    open: true,
    positioning: { placement: 'bottom' },
  },
};

export const PlacementLeft: Story = {
  args: {
    content: 'Left placement',
    children: 'Left',
    open: true,
    positioning: { placement: 'left' },
  },
};

export const PlacementRight: Story = {
  args: {
    content: 'Right placement',
    children: 'Right',
    open: true,
    positioning: { placement: 'right' },
  },
};

export const PlacementTopStart: Story = {
  args: {
    content: 'Top start',
    children: 'Top start',
    open: true,
    positioning: { placement: 'top-start' },
  },
};

export const PlacementTopEnd: Story = {
  args: {
    content: 'Top end',
    children: 'Top end',
    open: true,
    positioning: { placement: 'top-end' },
  },
};

export const PlacementBottomStart: Story = {
  args: {
    content: 'Bottom start',
    children: 'Bottom start',
    open: true,
    positioning: { placement: 'bottom-start' },
  },
};

export const PlacementBottomEnd: Story = {
  args: {
    content: 'Bottom end',
    children: 'Bottom end',
    open: true,
    positioning: { placement: 'bottom-end' },
  },
};

export const FastOpenDelay: Story = {
  args: { content: 'Fast open', children: 'Fast open', openDelay: 0, open: true },
};

export const SlowOpenDelay: Story = {
  args: {
    content: 'Slow open',
    children: 'Slow open',
    openDelay: 1000,
    open: true,
  },
};

export const FastCloseDelay: Story = {
  args: {
    content: 'Fast close',
    children: 'Fast close',
    closeDelay: 0,
    open: true,
  },
};

export const SlowCloseDelay: Story = {
  args: {
    content: 'Slow close',
    children: 'Slow close',
    closeDelay: 800,
    open: true,
  },
};

export const ZeroDelays: Story = {
  args: {
    content: 'Instant',
    children: 'Instant',
    openDelay: 0,
    closeDelay: 0,
    open: true,
  },
};

export const IconTrigger: Story = {
  args: { content: 'Settings', children: '⚙', open: true },
};

export const EmojiContent: Story = {
  args: { content: '🎉 Success!', children: 'Celebrate', open: true },
};

export const NumericContent: Story = {
  args: { content: '42', children: 'Answer', open: true },
};

export const RtlContent: Story = {
  args: { content: 'مرحبا بالعالم', children: 'RTL', open: true },
};

export const SpecialChars: Story = {
  args: { content: '<script> & "quotes"', children: 'Special', open: true },
};

export const ButtonLabelLong: Story = {
  args: {
    content: 'Info',
    children: 'A very long trigger label for layout',
    open: true,
  },
};

export const HelpText: Story = {
  args: {
    content: 'More information about this field',
    children: '?',
    open: true,
  },
};

export const StatusTip: Story = {
  args: { content: 'Online', children: 'Status', open: true },
};

export const WarningTip: Story = {
  args: { content: 'This action cannot be undone', children: 'Warn', open: true },
};

export const ErrorTip: Story = {
  args: { content: 'Something went wrong', children: 'Error', open: true },
};

export const SuccessTip: Story = {
  args: { content: 'Saved successfully', children: 'Save', open: true },
};

export const CopyTip: Story = {
  args: { content: 'Copy to clipboard', children: 'Copy', open: true },
};

export const EditTip: Story = {
  args: { content: 'Edit item', children: 'Edit', open: true },
};

export const DeleteTip: Story = {
  args: { content: 'Delete item', children: 'Delete', open: true },
};

export const ShareTip: Story = {
  args: { content: 'Share with team', children: 'Share', open: true },
};

export const DownloadTip: Story = {
  args: { content: 'Download file', children: 'Download', open: true },
};

export const UploadTip: Story = {
  args: { content: 'Upload file', children: 'Upload', open: true },
};

export const FilterTip: Story = {
  args: { content: 'Filter results', children: 'Filter', open: true },
};

export const SortTip: Story = {
  args: { content: 'Sort ascending', children: 'Sort', open: true },
};

export const RefreshTip: Story = {
  args: { content: 'Refresh data', children: 'Refresh', open: true },
};

export const SearchTip: Story = {
  args: { content: 'Search workspace', children: 'Search', open: true },
};

export const NestedLabel: Story = {
  args: {
    content: 'Nested label tip',
    children: (
      <span>
        Nested <strong>label</strong>
      </span>
    ),
    open: true,
  },
};

export const MultipleSideBySide: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Tooltip content="One" open>
        One
      </Tooltip>
      <Tooltip content="Two" open>
        Two
      </Tooltip>
      <Tooltip content="Three" open>
        Three
      </Tooltip>
    </div>
  ),
};

export const ControlledToggle: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button type="button" onClick={() => setOpen((v) => !v)}>
          Toggle
        </button>
        <Tooltip content="Controlled" open={open} onOpenChange={(d) => setOpen(d.open)}>
          Controlled
        </Tooltip>
      </div>
    );
  },
};

export const OpenWithCallback: Story = {
  args: {
    content: 'With callback',
    children: 'Callback',
    open: true,
    onOpenChange: fn(),
  },
};

export const PlacementLeftStart: Story = {
  args: {
    content: 'Left start',
    children: 'Left start',
    open: true,
    positioning: { placement: 'left-start' },
  },
};

export const PlacementRightEnd: Story = {
  args: {
    content: 'Right end',
    children: 'Right end',
    open: true,
    positioning: { placement: 'right-end' },
  },
};

export const EmptyishContent: Story = {
  args: { content: ' ', children: 'Space', open: true },
};

export const MultilineContent: Story = {
  args: {
    content: 'Line one. Line two continues with more detail about the feature.',
    children: 'Multi',
    open: true,
  },
};

export const KitchenSink: Story = {
  args: {
    content: 'Kitchen sink tooltip',
    children: 'Kitchen sink',
    open: true,
    openDelay: 0,
    closeDelay: 0,
    positioning: { placement: 'top' },
  },
};
