import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useState } from 'react';
import Popover from './Popover';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    open: { control: 'boolean' },
    portalled: { control: 'boolean' },
  },
  args: {
    onOpenChange: fn(),
    children: 'Open popover',
    title: 'Popover title',
    description: 'Supporting description',
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Open', title: 'Details', description: 'More info here.' },
};

export const Open: Story = {
  args: {
    children: 'Open',
    title: 'Open popover',
    description: 'Visible by default',
    open: true,
  },
};

export const Closed: Story = {
  args: {
    children: 'Closed',
    title: 'Hidden',
    description: 'Not visible',
    open: false,
  },
};

export const TitleOnly: Story = {
  args: { children: 'Title only', title: 'Title only', open: true },
};

export const DescriptionOnly: Story = {
  args: {
    children: 'Description only',
    description: 'Just a description',
    open: true,
  },
};

export const WithCustomContent: Story = {
  args: {
    children: 'Custom',
    title: 'Custom body',
    content: <button type="button">Action</button>,
    open: true,
  },
};

export const WithFormContent: Story = {
  args: {
    children: 'Form',
    title: 'Edit name',
    content: <input defaultValue="Ada" aria-label="Name" />,
    open: true,
  },
};

export const Portalled: Story = {
  args: {
    children: 'Portalled',
    title: 'Portalled',
    description: 'Rendered in portal',
    portalled: true,
    open: true,
  },
};

export const NotPortalled: Story = {
  args: {
    children: 'Inline',
    title: 'Not portalled',
    description: 'Inline in tree',
    portalled: false,
    open: true,
  },
};

export const LongTitle: Story = {
  args: {
    children: 'Long title',
    title:
      'This is an intentionally long popover title that should wrap gracefully',
    description: 'Short description',
    open: true,
  },
};

export const LongDescription: Story = {
  args: {
    children: 'Long description',
    title: 'Notes',
    description:
      'A longer description that explains the context in more detail and may wrap onto multiple lines inside the card.',
    open: true,
  },
};

export const EmptyBody: Story = {
  args: { children: 'Empty', title: 'Empty body', open: true },
};

export const ListContent: Story = {
  args: {
    children: 'List',
    title: 'Items',
    content: (
      <ul>
        <li>Alpha</li>
        <li>Beta</li>
        <li>Gamma</li>
      </ul>
    ),
    open: true,
  },
};

export const LinkContent: Story = {
  args: {
    children: 'Links',
    title: 'Resources',
    content: <a href="#docs">Read the docs</a>,
    open: true,
  },
};

export const NestedButtons: Story = {
  args: {
    children: 'Actions',
    title: 'Choose',
    content: (
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="button">Yes</button>
        <button type="button">No</button>
      </div>
    ),
    open: true,
  },
};

export const InfoTone: Story = {
  args: {
    children: 'Info',
    title: 'Information',
    description: 'Informational popover content',
    open: true,
  },
};

export const WarningTone: Story = {
  args: {
    children: 'Warning',
    title: 'Warning',
    description: 'Please review before continuing',
    open: true,
  },
};

export const ConfirmTone: Story = {
  args: {
    children: 'Confirm',
    title: 'Confirm action',
    description: 'Are you sure you want to proceed?',
    content: <button type="button">Confirm</button>,
    open: true,
  },
};

export const ProfileCard: Story = {
  args: {
    children: 'Profile',
    title: 'Ada Lovelace',
    description: 'Mathematician',
    content: <span>London, UK</span>,
    open: true,
  },
};

export const SettingsCard: Story = {
  args: {
    children: 'Settings',
    title: 'Preferences',
    description: 'Manage your account settings',
    open: true,
  },
};

export const HelpCard: Story = {
  args: {
    children: 'Help',
    title: 'Need help?',
    description: 'Visit our help center for guides',
    open: true,
  },
};

export const ShareCard: Story = {
  args: {
    children: 'Share',
    title: 'Share link',
    content: <code>https://example.com/share</code>,
    open: true,
  },
};

export const FilterCard: Story = {
  args: {
    children: 'Filters',
    title: 'Filters',
    content: (
      <label>
        <input type="checkbox" defaultChecked /> Active only
      </label>
    ),
    open: true,
  },
};

export const DateCard: Story = {
  args: {
    children: 'Date',
    title: 'Pick a date',
    description: 'Select a date range',
    open: true,
  },
};

export const ColorCard: Story = {
  args: {
    children: 'Color',
    title: 'Accent color',
    content: <span style={{ color: '#2563eb' }}>Blue 500</span>,
    open: true,
  },
};

export const StatsCard: Story = {
  args: {
    children: 'Stats',
    title: 'Weekly stats',
    content: <strong>1,248 visits</strong>,
    open: true,
  },
};

export const EmojiTitle: Story = {
  args: {
    children: 'Emoji',
    title: '🚀 Launch',
    description: 'Ship it',
    open: true,
  },
};

export const RtlContent: Story = {
  args: {
    children: 'RTL',
    title: 'عنوان',
    description: 'وصف بالعربية',
    open: true,
  },
};

export const NumericTitle: Story = {
  args: { children: 'Numeric', title: '404', description: 'Not found', open: true },
};

export const SpecialChars: Story = {
  args: {
    children: 'Special',
    title: 'A & B <C>',
    description: '"quoted" text',
    open: true,
  },
};

export const CompactTrigger: Story = {
  args: { children: '…', title: 'More', description: 'Options', open: true },
};

export const LongTrigger: Story = {
  args: {
    children: 'Open the detailed options panel',
    title: 'Options',
    description: 'Configure advanced options',
    open: true,
  },
};

export const WithParagraphContent: Story = {
  args: {
    children: 'Paragraph',
    title: 'Article',
    content: <p>A short paragraph inside the popover body.</p>,
    open: true,
  },
};

export const WithImagePlaceholder: Story = {
  args: {
    children: 'Media',
    title: 'Preview',
    content: (
      <div
        style={{
          width: '100%',
          height: 80,
          background: '#e2e8f0',
          borderRadius: 4,
        }}
      />
    ),
    open: true,
  },
};

export const MultipleActions: Story = {
  args: {
    children: 'Multi',
    title: 'Bulk actions',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button type="button">Archive</button>
        <button type="button">Delete</button>
        <button type="button">Move</button>
      </div>
    ),
    open: true,
  },
};

export const SideBySide: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <Popover title="One" description="First" open>
        One
      </Popover>
      <Popover title="Two" description="Second" open>
        Two
      </Popover>
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
        <Popover
          title="Controlled"
          description="External state"
          open={open}
          onOpenChange={(d) => setOpen(d.open)}
        >
          Controlled
        </Popover>
      </div>
    );
  },
};

export const OpenWithCallback: Story = {
  args: {
    children: 'Callback',
    title: 'Callback',
    description: 'Tracks open changes',
    open: true,
    onOpenChange: fn(),
  },
};

export const MenuLike: Story = {
  args: {
    children: 'Menu',
    title: 'Quick menu',
    content: (
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <button type="button">Home</button>
        <button type="button">Profile</button>
        <button type="button">Logout</button>
      </nav>
    ),
    open: true,
  },
};

export const Notification: Story = {
  args: {
    children: 'Notify',
    title: 'New message',
    description: 'You have 3 unread messages',
    open: true,
  },
};

export const Billing: Story = {
  args: {
    children: 'Billing',
    title: 'Billing plan',
    description: 'You are on the Pro plan',
    content: <button type="button">Upgrade</button>,
    open: true,
  },
};

export const TeamInvite: Story = {
  args: {
    children: 'Invite',
    title: 'Invite teammates',
    description: 'Send invites by email',
    content: <input placeholder="email@example.com" aria-label="Email" />,
    open: true,
  },
};

export const SearchPopover: Story = {
  args: {
    children: 'Search',
    title: 'Search',
    content: <input placeholder="Type to search" aria-label="Search" />,
    open: true,
  },
};

export const TagEditor: Story = {
  args: {
    children: 'Tags',
    title: 'Edit tags',
    content: <span>design, ui, ark</span>,
    open: true,
  },
};

export const VersionInfo: Story = {
  args: {
    children: 'Version',
    title: 'Version 1.2.3',
    description: 'Latest stable release',
    open: true,
  },
};

export const KitchenSink: Story = {
  args: {
    children: 'Kitchen sink',
    title: 'Kitchen sink',
    description: 'All sections together',
    content: <button type="button">Primary action</button>,
    portalled: true,
    open: true,
  },
};

export const MinimalTrigger: Story = {
  args: { children: 'i', title: 'Info', description: 'Minimal trigger', open: true },
};

export const Checklist: Story = {
  args: {
    children: 'Checklist',
    title: 'Tasks',
    content: (
      <ul>
        <li>Setup</li>
        <li>Review</li>
        <li>Ship</li>
      </ul>
    ),
    open: true,
  },
};

export const PasswordHint: Story = {
  args: {
    children: 'Password',
    title: 'Requirements',
    description: 'Use at least 8 characters',
    open: true,
  },
};

export const LocaleCard: Story = {
  args: {
    children: 'Locale',
    title: 'Language',
    description: 'English (US)',
    open: true,
  },
};
