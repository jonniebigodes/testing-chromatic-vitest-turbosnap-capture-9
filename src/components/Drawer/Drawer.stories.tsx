import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useState } from 'react';
import Drawer from './Drawer';

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    triggerLabel: { control: 'text' },
    side: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
    },
    open: { control: 'boolean' },
  },
  args: {
    onOpenChange: fn(),
    title: 'Drawer title',
    triggerLabel: 'Open drawer',
    side: 'right',
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: 'Menu', children: <p>Drawer body</p> },
};

export const Open: Story = {
  args: { title: 'Open drawer', children: <p>Visible</p>, open: true },
};

export const Closed: Story = {
  args: { title: 'Closed', children: <p>Hidden</p>, open: false },
};

export const SideRight: Story = {
  args: { title: 'Right', side: 'right', children: <p>From right</p>, open: true },
};

export const SideLeft: Story = {
  args: { title: 'Left', side: 'left', children: <p>From left</p>, open: true },
};

export const SideTop: Story = {
  args: { title: 'Top', side: 'top', children: <p>From top</p>, open: true },
};

export const SideBottom: Story = {
  args: {
    title: 'Bottom',
    side: 'bottom',
    children: <p>From bottom</p>,
    open: true,
  },
};

export const CustomTrigger: Story = {
  args: {
    title: 'Custom',
    triggerLabel: 'Show panel',
    children: <p>Body</p>,
    open: true,
  },
};

export const ShortTrigger: Story = {
  args: { title: 'Info', triggerLabel: 'i', open: true },
};

export const LongTrigger: Story = {
  args: {
    title: 'Settings',
    triggerLabel: 'Open the navigation drawer',
    open: true,
  },
};

export const TitleOnly: Story = {
  args: { title: 'Title only', open: true },
};

export const LongTitle: Story = {
  args: {
    title: 'This is a long drawer title that should wrap inside the panel',
    children: <p>Content</p>,
    open: true,
  },
};

export const Navigation: Story = {
  args: {
    title: 'Navigation',
    side: 'left',
    children: (
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button type="button">Home</button>
        <button type="button">Projects</button>
        <button type="button">Settings</button>
      </nav>
    ),
    open: true,
  },
};

export const Filters: Story = {
  args: {
    title: 'Filters',
    children: (
      <label>
        <input type="checkbox" defaultChecked /> Active only
      </label>
    ),
    open: true,
  },
};

export const FormDrawer: Story = {
  args: {
    title: 'Edit profile',
    children: (
      <form style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <input defaultValue="Ada" aria-label="Name" />
        <button type="submit">Save</button>
      </form>
    ),
    open: true,
  },
};

export const Cart: Story = {
  args: {
    title: 'Cart',
    children: (
      <ul>
        <li>Item A — $12</li>
        <li>Item B — $8</li>
      </ul>
    ),
    open: true,
  },
};

export const Notifications: Story = {
  args: {
    title: 'Notifications',
    children: <p>You have 3 unread notifications.</p>,
    open: true,
  },
};

export const Help: Story = {
  args: {
    title: 'Help',
    children: <p>Browse articles and contact support.</p>,
    open: true,
  },
};

export const Settings: Story = {
  args: {
    title: 'Settings',
    side: 'right',
    children: <p>Account preferences</p>,
    open: true,
  },
};

export const Inbox: Story = {
  args: {
    title: 'Inbox',
    side: 'left',
    children: <p>No new messages</p>,
    open: true,
  },
};

export const Details: Story = {
  args: {
    title: 'Details',
    children: (
      <div>
        <p>Status: Active</p>
        <p>Owner: Ada</p>
      </div>
    ),
    open: true,
  },
};

export const Scrollable: Story = {
  args: {
    title: 'Scrollable',
    children: (
      <div>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i}>Row {i + 1}</p>
        ))}
      </div>
    ),
    open: true,
  },
};

export const ActionsFooter: Story = {
  args: {
    title: 'Confirm',
    children: (
      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <button type="button">Cancel</button>
        <button type="button">Confirm</button>
      </div>
    ),
    open: true,
  },
};

export const EmojiTitle: Story = {
  args: { title: '📦 Packages', children: <p>Manage packages</p>, open: true },
};

export const RtlContent: Story = {
  args: { title: 'القائمة', children: <p>محتوى الدرج</p>, open: true },
};

export const NumericTitle: Story = {
  args: { title: '404', children: <p>Not found</p>, open: true },
};

export const SpecialChars: Story = {
  args: { title: 'A & B <C>', children: <p>"quoted"</p>, open: true },
};

export const EmptyBody: Story = {
  args: { title: 'Empty', open: true },
};

export const ListBody: Story = {
  args: {
    title: 'Tasks',
    children: (
      <ol>
        <li>Design</li>
        <li>Build</li>
        <li>Ship</li>
      </ol>
    ),
    open: true,
  },
};

export const CodeBody: Story = {
  args: {
    title: 'Snippet',
    children: <pre>{`export const Drawer`}</pre>,
    open: true,
  },
};

export const MediaBody: Story = {
  args: {
    title: 'Preview',
    children: (
      <div
        style={{
          width: '100%',
          height: 120,
          background: '#e2e8f0',
          borderRadius: 8,
        }}
      />
    ),
    open: true,
  },
};

export const TopShort: Story = {
  args: {
    title: 'Banner',
    side: 'top',
    children: <p>Quick announcement</p>,
    open: true,
  },
};

export const BottomSheet: Story = {
  args: {
    title: 'Actions',
    side: 'bottom',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button type="button">Share</button>
        <button type="button">Copy link</button>
      </div>
    ),
    open: true,
  },
};

export const WideContent: Story = {
  args: {
    title: 'Wide',
    children: <p style={{ whiteSpace: 'nowrap' }}>Wide content that may overflow</p>,
    open: true,
  },
};

export const NestedText: Story = {
  args: {
    title: 'Nested',
    children: (
      <p>
        Nested <strong>emphasis</strong> and <em>italics</em>
      </p>
    ),
    open: true,
  },
};

export const ControlledToggle: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button type="button" onClick={() => setOpen((v) => !v)}>
          Toggle
        </button>
        <Drawer
          title="Controlled"
          open={open}
          onOpenChange={(d) => setOpen(d.open)}
        >
          <p>External state</p>
        </Drawer>
      </div>
    );
  },
};

export const OpenWithCallback: Story = {
  args: {
    title: 'Callback',
    children: <p>Tracks open changes</p>,
    open: true,
    onOpenChange: fn(),
  },
};

export const SearchDrawer: Story = {
  args: {
    title: 'Search',
    children: <input placeholder="Search…" aria-label="Search" />,
    open: true,
  },
};

export const ProfileDrawer: Story = {
  args: {
    title: 'Profile',
    children: <p>Ada Lovelace · Admin</p>,
    open: true,
  },
};

export const BillingDrawer: Story = {
  args: {
    title: 'Billing',
    children: <p>Pro plan · Renews monthly</p>,
    open: true,
  },
};

export const TeamDrawer: Story = {
  args: {
    title: 'Team',
    side: 'left',
    children: (
      <ul>
        <li>Ada</li>
        <li>Grace</li>
        <li>Alan</li>
      </ul>
    ),
    open: true,
  },
};

export const DocsDrawer: Story = {
  args: {
    title: 'Documentation',
    children: <a href="#docs">Open docs</a>,
    open: true,
  },
};

export const SideBySideTriggers: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Drawer title="Left panel" side="left" open={false} triggerLabel="Left" />
      <Drawer title="Right panel" side="right" open={false} triggerLabel="Right" />
    </div>
  ),
};

export const KitchenSink: Story = {
  args: {
    title: 'Kitchen sink',
    side: 'right',
    triggerLabel: 'Open kitchen sink',
    children: (
      <div>
        <p>Full example body</p>
        <button type="button">Action</button>
      </div>
    ),
    open: true,
  },
};

export const ActivityFeed: Story = {
  args: {
    title: 'Activity',
    children: (
      <ul>
        <li>Ada commented</li>
        <li>Grace uploaded a file</li>
      </ul>
    ),
    open: true,
  },
};

export const Comments: Story = {
  args: {
    title: 'Comments',
    children: <textarea aria-label="Comment" rows={4} />,
    open: true,
  },
};

export const Versions: Story = {
  args: {
    title: 'Versions',
    children: (
      <ol>
        <li>v1.0.0</li>
        <li>v1.1.0</li>
        <li>v2.0.0</li>
      </ol>
    ),
    open: true,
  },
};

export const LeftLongNav: Story = {
  args: {
    title: 'Workspace',
    side: 'left',
    children: (
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {['Overview', 'Members', 'Billing', 'Integrations', 'Danger zone'].map(
          (item) => (
            <button key={item} type="button">
              {item}
            </button>
          )
        )}
      </nav>
    ),
    open: true,
  },
};

export const TopAlert: Story = {
  args: {
    title: 'System alert',
    side: 'top',
    children: <p>Maintenance window starts in 10 minutes.</p>,
    open: true,
  },
};

export const BottomConfirm: Story = {
  args: {
    title: 'Discard changes?',
    side: 'bottom',
    children: (
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="button">Keep editing</button>
        <button type="button">Discard</button>
      </div>
    ),
    open: true,
  },
};
