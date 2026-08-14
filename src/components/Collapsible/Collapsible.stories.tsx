import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, within, userEvent, expect } from 'storybook/test';
import { useState } from 'react';
import Collapsible from './Collapsible';

const meta = {
  title: 'Components/Collapsible',
  component: Collapsible,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'The controlled open state of the collapsible',
    },
    onOpenChange: {
      description: 'Callback invoked when the open state changes',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the collapsible is disabled',
    },
    label: {
      control: 'text',
      description: 'Content to be rendered as the trigger/header',
    },
    children: {
      control: 'text',
      description: 'Content to be rendered inside the collapsible',
    },
  },
  args: {
    onOpenChange: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default collapsible with basic content
 */
export const Default: Story = {
  args: {
    label: 'Click to expand',
    children: 'This is the collapsible content that can be shown or hidden.',
  },
};

/**
 * Collapsible in open state
 */
export const Open: Story = {
  args: {
    open: true,
    label: 'This collapsible is open',
    children:
      'This content is visible by default because the collapsible is in an open state.',
  },
};

/**
 * Collapsible in closed state
 */
export const Closed: Story = {
  args: {
    open: false,
    label: 'This collapsible is closed',
    children: 'This content is hidden by default.',
  },
};

/**
 * Disabled collapsible
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'This collapsible is disabled',
    children:
      'This content cannot be toggled because the collapsible is disabled.',
  },
};

/**
 * Disabled and open collapsible
 */
export const DisabledOpen: Story = {
  args: {
    disabled: true,
    open: true,
    label: 'This is disabled and open',
    children:
      'This content is visible but cannot be toggled because the collapsible is disabled.',
  },
};

/**
 * Collapsible with custom label content
 */
export const CustomLabel: Story = {
  render: (args) => (
    <Collapsible
      {...args}
      label={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
            }}
          />
          <span style={{ fontWeight: '600' }}>Advanced Settings</span>
          <span
            style={{
              marginLeft: 'auto',
              fontSize: '12px',
              color: '#6b7280',
              fontWeight: 'normal',
            }}
          >
            5 options
          </span>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div>Option 1: Enable feature A</div>
        <div>Option 2: Enable feature B</div>
        <div>Option 3: Enable feature C</div>
        <div>Option 4: Enable feature D</div>
        <div>Option 5: Enable feature E</div>
      </div>
    </Collapsible>
  ),
};

/**
 * Collapsible with rich content
 */
export const RichContent: Story = {
  args: {
    label: 'Product Details',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <strong>Name:</strong> Premium Widget
        </div>
        <div>
          <strong>Price:</strong> $99.99
        </div>
        <div>
          <strong>Description:</strong> A high-quality widget with advanced
          features and exceptional durability.
        </div>
        <div>
          <strong>Features:</strong>
          <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
          </ul>
        </div>
      </div>
    ),
  },
};

/**
 * Collapsible with long content
 */
export const LongContent: Story = {
  args: {
    label: 'Terms and Conditions',
    children: (
      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
        <p style={{ margin: '0 0 12px 0' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <p style={{ margin: '0 0 12px 0' }}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
        <p style={{ margin: '0' }}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </p>
      </div>
    ),
  },
};

/**
 * Controlled collapsible with state management
 */
export const Controlled: Story = {
  render: () => {
    const ControlledCollapsible = () => {
      const [open, setOpen] = useState(false);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Collapsible
            open={open}
            onOpenChange={(details) => setOpen(details.open)}
            label={`Controlled Collapsible (${open ? 'Open' : 'Closed'})`}
          >
            <p style={{ margin: 0 }}>
              This collapsible is controlled by external state. The state is
              currently: <strong>{open ? 'open' : 'closed'}</strong>
            </p>
          </Collapsible>
          <button
            onClick={() => setOpen(!open)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            Toggle from outside
          </button>
        </div>
      );
    };

    return <ControlledCollapsible />;
  },
};

/**
 * Collapsible with onOpenChange handler
 */
export const WithChangeHandler: Story = {
  render: () => {
    const CollapsibleWithHandler = () => {
      const [message, setMessage] = useState('');

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Collapsible
            label="Click to trigger the handler"
            onOpenChange={(details) => {
              setMessage(
                `Collapsible is now ${details.open ? 'open' : 'closed'}`
              );
            }}
          >
            <p style={{ margin: 0 }}>
              When you toggle this collapsible, a message will appear below
              showing the current state.
            </p>
          </Collapsible>
          {message && (
            <div
              style={{
                padding: '12px',
                backgroundColor: '#e0f2fe',
                color: '#0c4a6e',
                borderRadius: '4px',
                fontSize: '14px',
              }}
            >
              {message}
            </div>
          )}
        </div>
      );
    };

    return <CollapsibleWithHandler />;
  },
};

/**
 * Multiple collapsibles (accordion-like)
 */
export const MultipleCollapsibles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Collapsible label="Section 1" open>
        <p style={{ margin: 0 }}>Content for section 1</p>
      </Collapsible>
      <Collapsible label="Section 2">
        <p style={{ margin: 0 }}>Content for section 2</p>
      </Collapsible>
      <Collapsible label="Section 3">
        <p style={{ margin: 0 }}>Content for section 3</p>
      </Collapsible>
      <Collapsible label="Section 4 (Disabled)" disabled>
        <p style={{ margin: 0 }}>Content for section 4</p>
      </Collapsible>
    </div>
  ),
};

/**
 * FAQ-style collapsibles
 */
export const FAQ: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Collapsible label="What is this component?">
        <p style={{ margin: 0 }}>
          This is a Collapsible component built with Ark UI. It allows you to
          show and hide content with smooth animations.
        </p>
      </Collapsible>
      <Collapsible label="How do I use it?">
        <p style={{ margin: 0 }}>
          Simply import the component and pass your content as children. You can
          control the open state and handle state changes with props.
        </p>
      </Collapsible>
      <Collapsible label="Can it be disabled?">
        <p style={{ margin: 0 }}>
          Yes! You can set the <code>disabled</code> prop to true to prevent the
          collapsible from being toggled.
        </p>
      </Collapsible>
      <Collapsible label="Is it accessible?">
        <p style={{ margin: 0 }}>
          Yes! Ark UI components are built with accessibility in mind, including
          proper ARIA attributes and keyboard navigation support.
        </p>
      </Collapsible>
    </div>
  ),
};

/**
 * Nested collapsibles
 */
export const Nested: Story = {
  render: () => (
    <Collapsible label="Parent Collapsible">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p style={{ margin: '0 0 8px 0' }}>
          This is the parent content. Below are nested collapsibles:
        </p>
        <Collapsible label="Child Collapsible 1">
          <p style={{ margin: 0 }}>Content for child 1</p>
        </Collapsible>
        <Collapsible label="Child Collapsible 2">
          <p style={{ margin: 0 }}>Content for child 2</p>
        </Collapsible>
      </div>
    </Collapsible>
  ),
};

/**
 * Collapsible with form inside
 */
export const WithForm: Story = {
  render: () => (
    <Collapsible label="Edit Profile Settings">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert('Form submitted!');
        }}
        style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
      >
        <div>
          <label
            htmlFor="username"
            style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter username"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter email"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          Save Changes
        </button>
      </form>
    </Collapsible>
  ),
};

/* -------------------------------------------------------------------------
 * Controlled vs uncontrolled interaction (4)
 * ---------------------------------------------------------------------- */

/**
 * Uncontrolled collapsible: clicking the trigger freely toggles its own
 * internal open state
 */
export const UncontrolledInteractive: Story = {
  args: {
    label: 'Click toggles freely',
    children: 'Uncontrolled content',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(args.onOpenChange).toHaveBeenCalledTimes(1);
  },
};

/**
 * Controlled collapsible whose `open` prop is fixed to `true` by the parent;
 * clicking still notifies the parent via onOpenChange, but the prop stays
 * locked open because this demo's parent never updates its own state
 */
export const ControlledLockedOpen: Story = {
  args: {
    open: true,
    label: 'Locked open (parent state never updates)',
    children: 'This content stays visible regardless of clicks.',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(trigger);
    expect(args.onOpenChange).toHaveBeenCalledTimes(1);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  },
};

/**
 * Controlled collapsible whose `open` prop is fixed to `false` by the
 * parent; clicking still notifies via onOpenChange but the prop stays
 * locked closed
 */
export const ControlledLockedClosed: Story = {
  args: {
    open: false,
    label: 'Locked closed (parent state never updates)',
    children: 'This content stays hidden regardless of clicks.',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    expect(args.onOpenChange).toHaveBeenCalledTimes(1);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  },
};

/**
 * Collapsible with no onOpenChange handler wired up - still toggles its own
 * internal state since it behaves as uncontrolled
 */
export const NoChangeHandlerInteractive: Story = {
  args: {
    onOpenChange: undefined,
    label: 'No change handler wired up',
    children: 'Clicking still toggles internal state.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button');
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  },
};

/* -------------------------------------------------------------------------
 * Keyboard interaction (4)
 * ---------------------------------------------------------------------- */

/**
 * Verifies the trigger is reachable via Tab
 */
export const KeyboardFocusable: Story = {
  args: {
    label: 'Tab to focus this trigger',
    children: 'Focusable content',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button');
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    expect(trigger).toHaveFocus();
  },
};

/**
 * Verifies the Enter key toggles a focused trigger
 */
export const KeyboardToggleWithEnter: Story = {
  args: {
    label: 'Focus then press Enter to toggle',
    children: 'Enter-toggled content',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button');
    trigger.focus();
    await userEvent.keyboard('{Enter}');
    expect(args.onOpenChange).toHaveBeenCalledTimes(1);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  },
};

/**
 * Verifies the Space key toggles a focused trigger
 */
export const KeyboardToggleWithSpace: Story = {
  args: {
    label: 'Focus then press Space to toggle',
    children: 'Space-toggled content',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button');
    trigger.focus();
    await userEvent.keyboard(' ');
    expect(args.onOpenChange).toHaveBeenCalledTimes(1);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  },
};

/**
 * Verifies a disabled, focused trigger does not toggle when Enter is pressed
 */
export const KeyboardDisabledTriggerNoToggle: Story = {
  args: {
    disabled: true,
    label: 'Disabled trigger ignores Enter',
    children: 'Content stays hidden',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button');
    trigger.focus();
    await userEvent.keyboard('{Enter}');
    expect(args.onOpenChange).not.toHaveBeenCalled();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  },
};

/* -------------------------------------------------------------------------
 * Rapid interaction / accessibility (2)
 * ---------------------------------------------------------------------- */

/**
 * Clicking an odd number of times ends in the open state
 */
export const RapidToggleClicks: Story = {
  args: {
    label: 'Click me three times',
    children: 'Rapid toggle content',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button');
    await userEvent.click(trigger);
    await userEvent.click(trigger);
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(args.onOpenChange).toHaveBeenCalledTimes(3);
  },
};

/**
 * Confirms the trigger exposes aria-expanded and aria-controls pointing at
 * the content element
 */
export const AccessibleAriaAttributes: Story = {
  args: {
    label: 'Accessible trigger',
    children: 'Content referenced by aria-controls',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('aria-controls');
  },
};

/* -------------------------------------------------------------------------
 * Disabled edge cases (3)
 * ---------------------------------------------------------------------- */

/**
 * A disabled trigger does not toggle or notify when clicked
 */
export const DisabledClickDoesNotToggle: Story = {
  args: {
    disabled: true,
    label: 'Disabled, click has no effect',
    children: 'This content never opens.',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button');
    await userEvent.click(trigger);
    expect(args.onOpenChange).not.toHaveBeenCalled();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  },
};

/**
 * A disabled and already-open trigger stays open and does not notify when
 * clicked
 */
export const DisabledOpenIgnoresClick: Story = {
  args: {
    disabled: true,
    open: true,
    label: 'Disabled and open, click has no effect',
    children: 'This content stays visible.',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(trigger);
    expect(args.onOpenChange).not.toHaveBeenCalled();
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  },
};

/**
 * A disabled trigger does not toggle when activated with the keyboard
 */
export const DisabledKeyboardDoesNotToggle: Story = {
  args: {
    disabled: true,
    label: 'Disabled, keyboard has no effect',
    children: 'This content never opens via keyboard.',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button');
    trigger.focus();
    await userEvent.keyboard(' ');
    expect(args.onOpenChange).not.toHaveBeenCalled();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  },
};

/* -------------------------------------------------------------------------
 * Label content variations (5)
 * ---------------------------------------------------------------------- */

/**
 * Trigger label rendered right-to-left with Arabic unicode text
 */
export const RTLLabel: Story = {
  args: {
    label: 'اضغط للتوسيع',
    children: 'محتوى قابل للطي',
  },
  decorators: [
    (Story) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
};

/**
 * Trigger label containing emoji alongside unicode text
 */
export const UnicodeEmojiLabel: Story = {
  args: {
    label: '✅ Confirmé et 🎉 terminé !',
    children: 'Contenu avec emoji',
  },
};

/**
 * Trigger with a whitespace-only label, exercising the truthy-but-blank
 * label edge case
 */
export const WhitespaceOnlyLabel: Story = {
  args: {
    label: '   ',
    children: 'Content with a blank label above',
  },
};

/**
 * Extremely long label text wrapped inside a narrow container
 */
export const VeryLongLabelWrapping: Story = {
  args: {
    label:
      'This is an extremely long trigger label that should wrap across multiple lines when rendered inside a narrow container',
    children: 'Content beneath a long wrapping label',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Short label forced to wrap by an extremely narrow container
 */
export const NarrowContainerWrap: Story = {
  args: {
    label: 'Subscribe to occasional product updates',
    children: 'Narrow container content',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '100px' }}>
        <Story />
      </div>
    ),
  ],
};

/* -------------------------------------------------------------------------
 * Label composition (2)
 * ---------------------------------------------------------------------- */

/**
 * Label content that includes an inline icon alongside text
 */
export const LabelWithInlineIcon: Story = {
  render: (args) => (
    <Collapsible
      {...args}
      label={
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 1L8.545 4.13L12 4.635L9.5 7.07L10.09 10.5L7 8.885L3.91 10.5L4.5 7.07L2 4.635L5.455 4.13L7 1Z"
              stroke="#ffae00"
              strokeWidth="1"
              strokeLinejoin="round"
            />
          </svg>
          Starred section
        </span>
      }
    >
      Icon-labeled content
    </Collapsible>
  ),
};

/**
 * Label content followed by a small "New" badge
 */
export const LabelWithBadgeSuffix: Story = {
  render: (args) => (
    <Collapsible
      {...args}
      label={
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          Early access features
          <span
            style={{
              fontSize: '10px',
              fontWeight: 700,
              color: 'white',
              backgroundColor: '#66bf3c',
              borderRadius: '9999px',
              padding: '2px 6px',
            }}
          >
            NEW
          </span>
        </span>
      }
    >
      Badge-labeled content
    </Collapsible>
  ),
};

/* -------------------------------------------------------------------------
 * Children content variations (4)
 * ---------------------------------------------------------------------- */

/**
 * Collapsible rendered with no children at all
 */
export const EmptyChildren: Story = {
  args: {
    label: 'No content below',
  },
};

/**
 * Collapsible whose children is a whitespace-only string
 */
export const WhitespaceOnlyChildren: Story = {
  args: {
    label: 'Whitespace-only content',
    children: '   ',
  },
};

/**
 * Collapsible whose content is a single icon with no accompanying text
 */
export const IconOnlyChildren: Story = {
  args: {
    label: 'Icon-only content',
    children: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="2" />
      </svg>
    ),
  },
};

/**
 * Collapsible content composed of a nested unordered list
 */
export const ChildrenWithNestedList: Story = {
  args: {
    label: 'Nested list content',
    children: (
      <ul style={{ margin: 0, paddingLeft: '20px' }}>
        <li>First nested item</li>
        <li>Second nested item</li>
        <li>Third nested item</li>
      </ul>
    ),
  },
};

/* -------------------------------------------------------------------------
 * Background/container context (1)
 * ---------------------------------------------------------------------- */

/**
 * Collapsible rendered on a dark background
 */
export const OnDarkBackground: Story = {
  args: {
    label: 'Works on dark backgrounds too',
    children: 'Dark background content',
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#0f172a', padding: '24px', borderRadius: '8px' }}>
        <Story />
      </div>
    ),
  ],
};

/* -------------------------------------------------------------------------
 * Nested collapsibles (3)
 * ---------------------------------------------------------------------- */

/**
 * Three levels of nested collapsibles
 */
export const NestedThreeLevelsDeep: Story = {
  render: () => (
    <Collapsible label="Level 1" open>
      <Collapsible label="Level 2" open>
        <Collapsible label="Level 3">
          <p style={{ margin: 0 }}>Deepest nested content</p>
        </Collapsible>
      </Collapsible>
    </Collapsible>
  ),
};

/**
 * Two sibling nested collapsibles toggle independently of one another
 */
export const NestedSiblingIndependentToggle: Story = {
  render: () => (
    <Collapsible label="Parent" open>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Collapsible label="Sibling A">
          <p style={{ margin: 0 }}>Sibling A content</p>
        </Collapsible>
        <Collapsible label="Sibling B">
          <p style={{ margin: 0 }}>Sibling B content</p>
        </Collapsible>
      </div>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = canvas.getAllByRole('button');
    const [, siblingA, siblingB] = triggers;
    await userEvent.click(siblingA);
    expect(siblingA).toHaveAttribute('aria-expanded', 'true');
    expect(siblingB).toHaveAttribute('aria-expanded', 'false');
  },
};

/**
 * A parent collapsible with all nested children already open by default
 */
export const NestedAllOpenByDefault: Story = {
  render: () => (
    <Collapsible label="Parent (open)" open>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Collapsible label="Child 1 (open)" open>
          <p style={{ margin: 0 }}>Child 1 content</p>
        </Collapsible>
        <Collapsible label="Child 2 (open)" open>
          <p style={{ margin: 0 }}>Child 2 content</p>
        </Collapsible>
      </div>
    </Collapsible>
  ),
};

/* -------------------------------------------------------------------------
 * Multiple / group collapsibles (3)
 * ---------------------------------------------------------------------- */

/**
 * Two independently-controlled collapsibles that do not share state
 */
export const TwoIndependentControlledCollapsibles: Story = {
  render: () => {
    const IndependentPair = () => {
      const [first, setFirst] = useState(false);
      const [second, setSecond] = useState(true);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Collapsible
            open={first}
            onOpenChange={(details) => setFirst(details.open)}
            label={`First (${first ? 'open' : 'closed'})`}
          >
            <p style={{ margin: 0 }}>First content</p>
          </Collapsible>
          <Collapsible
            open={second}
            onOpenChange={(details) => setSecond(details.open)}
            label={`Second (${second ? 'open' : 'closed'})`}
          >
            <p style={{ margin: 0 }}>Second content</p>
          </Collapsible>
        </div>
      );
    };

    return <IndependentPair />;
  },
};

/**
 * A group of collapsibles where every item is disabled
 */
export const AllDisabledGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Collapsible label="Option A (disabled)" disabled>
        <p style={{ margin: 0 }}>Content A</p>
      </Collapsible>
      <Collapsible label="Option B (disabled, open)" disabled open>
        <p style={{ margin: 0 }}>Content B</p>
      </Collapsible>
      <Collapsible label="Option C (disabled)" disabled>
        <p style={{ margin: 0 }}>Content C</p>
      </Collapsible>
    </div>
  ),
};

/**
 * A group where only some collapsibles are disabled
 */
export const MixedDisabledGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Collapsible label="Free plan details">
        <p style={{ margin: 0 }}>Free plan content</p>
      </Collapsible>
      <Collapsible label="Pro plan details (unavailable)" disabled>
        <p style={{ margin: 0 }}>Pro plan content</p>
      </Collapsible>
      <Collapsible label="Enterprise plan details">
        <p style={{ margin: 0 }}>Enterprise plan content</p>
      </Collapsible>
    </div>
  ),
};

/* -------------------------------------------------------------------------
 * Accordion-style controlled patterns (2)
 * ---------------------------------------------------------------------- */

/**
 * Only one collapsible can be open at a time - opening one closes the
 * previously open one
 */
export const AccordionSingleOpenPattern: Story = {
  render: () => {
    const Accordion = () => {
      const [openKey, setOpenKey] = useState<string | null>('one');
      const sections = [
        { key: 'one', label: 'Section One', content: 'Content for section one' },
        { key: 'two', label: 'Section Two', content: 'Content for section two' },
        { key: 'three', label: 'Section Three', content: 'Content for section three' },
      ];

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {sections.map((section) => (
            <Collapsible
              key={section.key}
              label={section.label}
              open={openKey === section.key}
              onOpenChange={(details) =>
                setOpenKey(details.open ? section.key : null)
              }
            >
              <p style={{ margin: 0 }}>{section.content}</p>
            </Collapsible>
          ))}
        </div>
      );
    };

    return <Accordion />;
  },
};

/**
 * A pattern where an "expand all"/"collapse all" control drives every
 * collapsible in the group at once
 */
export const ExpandCollapseAllPattern: Story = {
  render: () => {
    const ExpandCollapseAll = () => {
      const [allOpen, setAllOpen] = useState(false);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            onClick={() => setAllOpen((current) => !current)}
            style={{
              alignSelf: 'flex-start',
              padding: '8px 16px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            {allOpen ? 'Collapse all' : 'Expand all'}
          </button>
          <Collapsible label="Group item 1" open={allOpen}>
            <p style={{ margin: 0 }}>Item 1 content</p>
          </Collapsible>
          <Collapsible label="Group item 2" open={allOpen}>
            <p style={{ margin: 0 }}>Item 2 content</p>
          </Collapsible>
        </div>
      );
    };

    return <ExpandCollapseAll />;
  },
};

/* -------------------------------------------------------------------------
 * Kitchen-sink combinations (2)
 * ---------------------------------------------------------------------- */

/**
 * Kitchen sink: open, disabled, and a custom composed label together
 */
export const KitchenSinkOpenDisabledCustomLabel: Story = {
  render: (args) => (
    <Collapsible
      {...args}
      open
      disabled
      label={
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <strong>Kitchen sink</strong>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>(locked open)</span>
        </span>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div>Disabled and open at the same time.</div>
        <div>Custom composed label above.</div>
      </div>
    </Collapsible>
  ),
};

/**
 * Kitchen sink: controlled state, nested children, and rich content combined
 */
export const KitchenSinkControlledNestedRich: Story = {
  render: () => {
    const KitchenSink = () => {
      const [open, setOpen] = useState(true);

      return (
        <Collapsible
          open={open}
          onOpenChange={(details) => setOpen(details.open)}
          label={`Kitchen sink (${open ? 'Open' : 'Closed'})`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <strong>Summary:</strong> Combines controlled state with nested
              content.
            </div>
            <Collapsible label="Nested details">
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                <li>Nested detail one</li>
                <li>Nested detail two</li>
              </ul>
            </Collapsible>
          </div>
        </Collapsible>
      );
    };

    return <KitchenSink />;
  },
};

/* -------------------------------------------------------------------------
 * Form integration (1)
 * ---------------------------------------------------------------------- */

/**
 * A collapsible section that reveals a required field, with inline
 * validation feedback captured instead of a blocking alert()
 */
export const WithFormValidation: Story = {
  render: () => {
    const ValidatedForm = () => {
      const [invalidMessage, setInvalidMessage] = useState<string | null>(null);
      const [submittedOk, setSubmittedOk] = useState(false);

      return (
        <Collapsible label="Additional details (expand to fill in)">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmittedOk(true);
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <div>
              <label
                htmlFor="reason"
                style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}
              >
                Reason (required)
              </label>
              <input
                id="reason"
                name="reason"
                type="text"
                required
                onChange={() => {
                  setInvalidMessage(null);
                  setSubmittedOk(false);
                }}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
              />
            </div>
            <button
              type="submit"
              onInvalidCapture={(e) => {
                e.preventDefault();
                setInvalidMessage('Please provide a reason before submitting.');
              }}
              style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              Submit
            </button>
            {invalidMessage && (
              <span style={{ color: '#e81c61', fontSize: '14px' }}>
                {invalidMessage}
              </span>
            )}
            {submittedOk && (
              <span style={{ color: '#489524', fontSize: '14px' }}>
                Form submitted successfully.
              </span>
            )}
          </form>
        </Collapsible>
      );
    };

    return <ValidatedForm />;
  },
};
