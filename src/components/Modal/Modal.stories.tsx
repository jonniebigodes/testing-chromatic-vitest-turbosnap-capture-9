import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useState } from 'react';
import Modal from './Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    triggerLabel: { control: 'text' },
    open: { control: 'boolean' },
    closeOnInteractOutside: { control: 'boolean' },
  },
  args: {
    onOpenChange: fn(),
    title: 'Modal title',
    description: 'Modal description',
    triggerLabel: 'Open modal',
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: 'Welcome', description: 'Get started with your account.' },
};

export const Open: Story = {
  args: {
    title: 'Open modal',
    description: 'Visible by default',
    open: true,
  },
};

export const Closed: Story = {
  args: {
    title: 'Closed modal',
    description: 'Not visible',
    open: false,
  },
};

export const TitleOnly: Story = {
  args: { title: 'Title only', open: true },
};

export const WithDescription: Story = {
  args: {
    title: 'Confirm',
    description: 'Please confirm this action.',
    open: true,
  },
};

export const WithBody: Story = {
  args: {
    title: 'Details',
    description: 'Additional context',
    children: <p>Body content goes here.</p>,
    open: true,
  },
};

export const CustomTriggerLabel: Story = {
  args: {
    title: 'Launch',
    triggerLabel: 'Launch wizard',
    open: true,
  },
};

export const ShortTrigger: Story = {
  args: { title: 'Info', triggerLabel: 'i', open: true },
};

export const LongTrigger: Story = {
  args: {
    title: 'Settings',
    triggerLabel: 'Open the advanced settings dialog',
    open: true,
  },
};

export const CloseOnOutsideTrue: Story = {
  args: {
    title: 'Dismissible',
    description: 'Closes on outside click',
    closeOnInteractOutside: true,
    open: true,
  },
};

export const CloseOnOutsideFalse: Story = {
  args: {
    title: 'Locked',
    description: 'Does not close on outside click',
    closeOnInteractOutside: false,
    open: true,
  },
};

export const LongTitle: Story = {
  args: {
    title:
      'This is a very long modal title that should wrap within the dialog content area',
    description: 'Supporting text',
    open: true,
  },
};

export const LongDescription: Story = {
  args: {
    title: 'Notes',
    description:
      'A longer description that explains the dialog purpose in more detail and may wrap onto several lines.',
    open: true,
  },
};

export const FormBody: Story = {
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

export const ListBody: Story = {
  args: {
    title: 'Checklist',
    children: (
      <ul>
        <li>Review changes</li>
        <li>Notify team</li>
        <li>Deploy</li>
      </ul>
    ),
    open: true,
  },
};

export const ActionsBody: Story = {
  args: {
    title: 'Delete item',
    description: 'This cannot be undone.',
    children: (
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button type="button">Cancel</button>
        <button type="button">Delete</button>
      </div>
    ),
    open: true,
  },
};

export const AlertStyle: Story = {
  args: {
    title: 'Attention required',
    description: 'Your session will expire soon.',
    open: true,
  },
};

export const SuccessStyle: Story = {
  args: {
    title: 'Success',
    description: 'Your changes have been saved.',
    open: true,
  },
};

export const ErrorStyle: Story = {
  args: {
    title: 'Error',
    description: 'Something went wrong. Please try again.',
    open: true,
  },
};

export const WarningStyle: Story = {
  args: {
    title: 'Warning',
    description: 'Disk space is running low.',
    open: true,
  },
};

export const LoginModal: Story = {
  args: {
    title: 'Sign in',
    description: 'Enter your credentials to continue.',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <input placeholder="Email" aria-label="Email" />
        <input placeholder="Password" type="password" aria-label="Password" />
      </div>
    ),
    open: true,
  },
};

export const SignupModal: Story = {
  args: {
    title: 'Create account',
    description: 'Start your free trial today.',
    triggerLabel: 'Sign up',
    open: true,
  },
};

export const InviteModal: Story = {
  args: {
    title: 'Invite teammate',
    children: <input placeholder="email@example.com" aria-label="Invite email" />,
    open: true,
  },
};

export const ShareModal: Story = {
  args: {
    title: 'Share document',
    children: <code>https://example.com/doc/123</code>,
    open: true,
  },
};

export const SettingsModal: Story = {
  args: {
    title: 'Settings',
    description: 'Manage preferences',
    children: (
      <label>
        <input type="checkbox" defaultChecked /> Email notifications
      </label>
    ),
    open: true,
  },
};

export const BillingModal: Story = {
  args: {
    title: 'Upgrade plan',
    description: 'Unlock more features with Pro.',
    children: <button type="button">Upgrade</button>,
    open: true,
  },
};

export const ConfirmDelete: Story = {
  args: {
    title: 'Delete project?',
    description: 'All data will be permanently removed.',
    triggerLabel: 'Delete',
    open: true,
  },
};

export const ConfirmLeave: Story = {
  args: {
    title: 'Leave page?',
    description: 'You have unsaved changes.',
    open: true,
  },
};

export const RichTextBody: Story = {
  args: {
    title: 'Release notes',
    children: (
      <div>
        <p>
          Version <strong>2.0</strong> includes performance improvements.
        </p>
      </div>
    ),
    open: true,
  },
};

export const EmojiTitle: Story = {
  args: { title: '🎉 Congrats', description: 'You did it!', open: true },
};

export const RtlContent: Story = {
  args: { title: 'عنوان', description: 'وصف الحوار', open: true },
};

export const NumericTitle: Story = {
  args: { title: '404', description: 'Page not found', open: true },
};

export const SpecialChars: Story = {
  args: { title: 'A & B <C>', description: '"quoted"', open: true },
};

export const NestedModalTrigger: Story = {
  args: {
    title: 'Primary',
    description: 'Outer modal',
    triggerLabel: 'Open primary',
    open: true,
  },
};

export const ScrollableBody: Story = {
  args: {
    title: 'Terms',
    children: (
      <div style={{ maxHeight: 160, overflow: 'auto' }}>
        {Array.from({ length: 12 }, (_, i) => (
          <p key={i}>Paragraph {i + 1} of the terms and conditions.</p>
        ))}
      </div>
    ),
    open: true,
  },
};

export const ImagePlaceholder: Story = {
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

export const TableBody: Story = {
  args: {
    title: 'Usage',
    children: (
      <table>
        <tbody>
          <tr>
            <td>API calls</td>
            <td>1,200</td>
          </tr>
          <tr>
            <td>Storage</td>
            <td>4 GB</td>
          </tr>
        </tbody>
      </table>
    ),
    open: true,
  },
};

export const CodeSnippet: Story = {
  args: {
    title: 'Install',
    children: <pre>npm install @ark-ui/react</pre>,
    open: true,
  },
};

export const EmptyBody: Story = {
  args: { title: 'Empty', open: true },
};

export const ControlledToggle: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button type="button" onClick={() => setOpen((v) => !v)}>
          Toggle
        </button>
        <Modal
          title="Controlled"
          description="External state"
          open={open}
          onOpenChange={(d) => setOpen(d.open)}
        />
      </div>
    );
  },
};

export const OpenWithCallback: Story = {
  args: {
    title: 'Callback',
    description: 'Tracks open changes',
    open: true,
    onOpenChange: fn(),
  },
};

export const FeedbackModal: Story = {
  args: {
    title: 'Send feedback',
    children: <textarea aria-label="Feedback" rows={4} />,
    open: true,
  },
};

export const Onboarding: Story = {
  args: {
    title: 'Welcome aboard',
    description: 'Take a quick tour of the product.',
    children: <button type="button">Start tour</button>,
    open: true,
  },
};

export const Permissions: Story = {
  args: {
    title: 'Allow notifications?',
    description: 'We will only send important updates.',
    children: (
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="button">Allow</button>
        <button type="button">Not now</button>
      </div>
    ),
    open: true,
  },
};

export const ExportModal: Story = {
  args: {
    title: 'Export data',
    description: 'Choose a format',
    children: (
      <select aria-label="Format" defaultValue="csv">
        <option value="csv">CSV</option>
        <option value="json">JSON</option>
      </select>
    ),
    open: true,
  },
};

export const ImportModal: Story = {
  args: {
    title: 'Import file',
    children: <input type="file" aria-label="File" />,
    open: true,
  },
};

export const SideBySideTriggers: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Modal title="First" open={false} triggerLabel="First" />
      <Modal title="Second" open={false} triggerLabel="Second" />
    </div>
  ),
};

export const KitchenSink: Story = {
  args: {
    title: 'Kitchen sink',
    description: 'All pieces together',
    triggerLabel: 'Open kitchen sink',
    closeOnInteractOutside: true,
    children: <button type="button">Primary</button>,
    open: true,
  },
};

export const PrivacyModal: Story = {
  args: {
    title: 'Privacy',
    description: 'Review our privacy policy before continuing.',
    open: true,
  },
};

export const CookieConsent: Story = {
  args: {
    title: 'Cookies',
    description: 'We use cookies to improve your experience.',
    children: <button type="button">Accept</button>,
    open: true,
  },
};
