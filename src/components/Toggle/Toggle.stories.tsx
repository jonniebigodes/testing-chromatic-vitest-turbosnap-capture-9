import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, within, userEvent, expect } from 'storybook/test';
import { useState } from 'react';
import Toggle from './Toggle';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onPressedChange: {
      description: 'Event handler called when the pressed state changes',
    },
    pressed: {
      control: 'boolean',
      description: 'The controlled pressed state of the toggle',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the toggle is required',
    },
    name: {
      control: 'text',
      description: 'The name attribute for form submission',
    },
    children: {
      control: 'text',
      description: 'Label content to be rendered next to the toggle',
    },
  },
  args: {
    onPressedChange: fn(),
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default toggle switch without a label
 */
export const Default: Story = {
  args: {},
};

/**
 * Toggle in pressed (on) state
 */
export const Pressed: Story = {
  args: {
    pressed: true,
  },
};

/**
 * Toggle in unpressed (off) state
 */
export const Unpressed: Story = {
  args: {
    pressed: false,
  },
};

/**
 * Disabled toggle in off state
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/**
 * Disabled toggle in on state
 */
export const DisabledPressed: Story = {
  args: {
    disabled: true,
    pressed: true,
  },
};

/**
 * Toggle with a label
 */
export const WithLabel: Story = {
  args: {
    children: 'Enable notifications',
  },
};

/**
 * Toggle with required attribute
 */
export const Required: Story = {
  args: {
    required: true,
    children: 'Accept terms and conditions',
  },
};

/**
 * Toggle with name attribute for form submission
 */
export const WithName: Story = {
  args: {
    name: 'notifications-enabled',
    children: 'Email notifications',
  },
};

/**
 * Toggle with custom label content
 */
export const CustomChildren: Story = {
  args: {
    children: (
      <span style={{ fontWeight: 'bold', color: '#1f2937' }}>Dark Mode</span>
    ),
  },
};

/**
 * Controlled toggle with state management
 */
export const Controlled: Story = {
  render: () => {
    const ControlledToggle = () => {
      const [pressed, setPressed] = useState(false);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Toggle pressed={pressed} onPressedChange={setPressed}>
            Feature {pressed ? 'enabled' : 'disabled'}
          </Toggle>
          <div
            style={{
              padding: '12px',
              backgroundColor: '#f3f4f6',
              borderRadius: '6px',
              fontSize: '14px',
            }}
          >
            <strong>State:</strong> {pressed ? 'ON' : 'OFF'}
          </div>
          <button
            onClick={() => setPressed(!pressed)}
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

    return <ControlledToggle />;
  },
};

/**
 * Toggle with onPressedChange handler
 */
export const WithChangeHandler: Story = {
  render: () => {
    const ToggleWithHandler = () => {
      const [message, setMessage] = useState('');

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Toggle
            onPressedChange={(pressed) => {
              setMessage(`Toggle is now ${pressed ? 'ON' : 'OFF'}`);
            }}
          >
            Click to toggle
          </Toggle>
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

    return <ToggleWithHandler />;
  },
};

/**
 * Multiple toggles for different settings
 */
export const MultipleToggles: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '20px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        minWidth: '300px',
      }}
    >
      <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Settings</h3>
      <Toggle>Email notifications</Toggle>
      <Toggle>Push notifications</Toggle>
      <Toggle>SMS notifications</Toggle>
      <Toggle disabled>Marketing emails (unavailable)</Toggle>
    </div>
  ),
};

/**
 * Toggle in a form with submission
 */
export const InForm: Story = {
  render: () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        alert(JSON.stringify(data, null, 2));
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '20px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        maxWidth: '400px',
      }}
    >
      <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>
        Notification Preferences
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Toggle name="email-notifications">Email notifications</Toggle>
        <Toggle name="push-notifications">Push notifications</Toggle>
        <Toggle name="sms-notifications">SMS notifications</Toggle>
        <Toggle name="newsletter" required>
          Subscribe to newsletter (required)
        </Toggle>
      </div>
      <button
        type="submit"
        style={{
          padding: '10px 16px',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
        }}
      >
        Save Preferences
      </button>
    </form>
  ),
};

/**
 * Toggle with long label text
 */
export const LongLabel: Story = {
  args: {
    children:
      'Enable automatic synchronization of data across all your devices',
  },
};

/**
 * Dark mode toggle example
 */
export const DarkModeToggle: Story = {
  render: () => {
    const DarkMode = () => {
      const [isDark, setIsDark] = useState(false);

      return (
        <div
          style={{
            padding: '24px',
            backgroundColor: isDark ? '#1f2937' : '#ffffff',
            color: isDark ? '#ffffff' : '#000000',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            minWidth: '300px',
          }}
        >
          <Toggle pressed={isDark} onPressedChange={setIsDark}>
            {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </Toggle>
          <p style={{ marginTop: '16px', fontSize: '14px' }}>
            This is sample content that changes based on the theme.
          </p>
        </div>
      );
    };

    return <DarkMode />;
  },
};

/* -------------------------------------------------------------------------
 * Required crossed with pressed/disabled (2)
 * ---------------------------------------------------------------------- */

/**
 * Required toggle that is already pressed
 */
export const RequiredPressed: Story = {
  args: {
    required: true,
    pressed: true,
    children: 'Accept terms (required, pre-pressed)',
  },
};

/**
 * Required toggle that is also disabled
 */
export const RequiredDisabled: Story = {
  args: {
    required: true,
    disabled: true,
    children: 'This required option is disabled',
  },
};

/* -------------------------------------------------------------------------
 * Name attribute crossed with pressed/disabled (2)
 * ---------------------------------------------------------------------- */

/**
 * Named toggle that starts pressed
 */
export const NamePressed: Story = {
  args: {
    name: 'dark-mode',
    pressed: true,
    children: 'Named and pressed',
  },
};

/**
 * Named toggle that is disabled
 */
export const NameDisabled: Story = {
  args: {
    name: 'archived-flag',
    disabled: true,
    children: 'Named and disabled',
  },
};

/* -------------------------------------------------------------------------
 * Label presence edge cases (2)
 * ---------------------------------------------------------------------- */

/**
 * Toggle with an empty string as its label content
 */
export const EmptyStringLabel: Story = {
  args: {
    children: '',
  },
};

/**
 * Toggle with a whitespace-only label, exercising the truthy-but-blank
 * children edge case
 */
export const WhitespaceOnlyLabel: Story = {
  args: {
    children: '   ',
  },
};

/* -------------------------------------------------------------------------
 * Label composition (2)
 * ---------------------------------------------------------------------- */

/**
 * Label content that includes an inline icon alongside text
 */
export const LabelWithInlineIcon: Story = {
  render: (args) => (
    <Toggle {...args}>
      <span
        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
      >
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
        Starred option
      </span>
    </Toggle>
  ),
};

/**
 * Label content followed by a small "New" badge
 */
export const LabelWithBadgeSuffix: Story = {
  render: (args) => (
    <Toggle {...args}>
      <span
        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
      >
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
    </Toggle>
  ),
};

/* -------------------------------------------------------------------------
 * Long/wrapping label edge cases (2)
 * ---------------------------------------------------------------------- */

/**
 * Extremely long label text wrapped inside a narrow container
 */
export const VeryLongLabelWrapping: Story = {
  args: {
    children:
      'By enabling this option you acknowledge that automatic synchronization will run continuously in the background across all of your connected devices and services.',
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
    children: 'Subscribe to occasional product update emails',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '80px' }}>
        <Story />
      </div>
    ),
  ],
};

/* -------------------------------------------------------------------------
 * RTL/unicode/emoji label content (2)
 * ---------------------------------------------------------------------- */

/**
 * Toggle label rendered right-to-left with Arabic unicode text
 */
export const RTLLabel: Story = {
  args: {
    children: 'تفعيل الوضع الليلي',
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
 * Toggle label containing emoji alongside unicode text
 */
export const UnicodeEmojiLabel: Story = {
  args: {
    children: '✅ Activé et 🎉 prêt !',
  },
};

/* -------------------------------------------------------------------------
 * Controlled vs uncontrolled usage with interaction tests (2)
 * ---------------------------------------------------------------------- */

/**
 * Uncontrolled toggle: clicking freely toggles its own internal state
 */
export const UncontrolledInteractive: Story = {
  args: {
    children: 'Uncontrolled - click toggles freely',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('button');
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    expect(args.onPressedChange).toHaveBeenCalledTimes(1);
  },
};

/**
 * Controlled toggle whose `pressed` prop is fixed to `true` by the parent;
 * clicking still notifies the parent via onPressedChange, but the parent in
 * this demo chooses not to update its own state, so the prop stays locked
 */
export const ControlledLockedPressed: Story = {
  args: {
    pressed: true,
    children: 'Locked pressed (parent state never updates)',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('button');
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(toggle);
    expect(args.onPressedChange).toHaveBeenCalledTimes(1);
  },
};

/* -------------------------------------------------------------------------
 * Keyboard interaction (3)
 * ---------------------------------------------------------------------- */

/**
 * Verifies the toggle is reachable via Tab
 */
export const KeyboardFocusable: Story = {
  args: {
    children: 'Tab to focus this toggle',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('button');
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    await expect(toggle).toHaveFocus();
  },
};

/**
 * Verifies the Space key toggles a focused toggle
 */
export const KeyboardToggleWithSpace: Story = {
  args: {
    children: 'Focus then press Space to toggle',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('button');
    toggle.focus();
    await userEvent.keyboard(' ');
    expect(args.onPressedChange).toHaveBeenCalledTimes(1);
  },
};

/**
 * Verifies the Enter key toggles a focused toggle
 */
export const KeyboardToggleWithEnter: Story = {
  args: {
    children: 'Focus then press Enter to toggle',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('button');
    toggle.focus();
    await userEvent.keyboard('{Enter}');
    expect(args.onPressedChange).toHaveBeenCalledTimes(1);
  },
};

/* -------------------------------------------------------------------------
 * Rapid interaction / accessibility (2)
 * ---------------------------------------------------------------------- */

/**
 * Clicking an odd number of times ends in the pressed state
 */
export const RapidToggleClicks: Story = {
  args: {
    children: 'Click me three times',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('button');
    await userEvent.click(toggle);
    await userEvent.click(toggle);
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    expect(args.onPressedChange).toHaveBeenCalledTimes(3);
  },
};

/**
 * Confirms the toggle exposes an implicit button role with an
 * accessible aria-pressed state for assistive technology
 */
export const AccessibleAriaPressedState: Story = {
  args: {
    pressed: true,
    children: 'Accessible pre-pressed example',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('button');
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    await expect(toggle).toHaveAttribute('data-state', 'on');
  },
};

/* -------------------------------------------------------------------------
 * Multiple toggles / groups (3)
 * ---------------------------------------------------------------------- */

/**
 * Two independently-controlled toggles that do not share state
 */
export const TwoIndependentToggles: Story = {
  render: () => {
    const IndependentPair = () => {
      const [first, setFirst] = useState(false);
      const [second, setSecond] = useState(true);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Toggle pressed={first} onPressedChange={setFirst}>
            First toggle ({first ? 'on' : 'off'})
          </Toggle>
          <Toggle pressed={second} onPressedChange={setSecond}>
            Second toggle ({second ? 'on' : 'off'})
          </Toggle>
        </div>
      );
    };

    return <IndependentPair />;
  },
};

/**
 * A group of toggles where every item is disabled
 */
export const AllDisabledGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Toggle disabled name="optionA">
        Option A (disabled)
      </Toggle>
      <Toggle disabled pressed name="optionB">
        Option B (disabled, pressed)
      </Toggle>
      <Toggle disabled name="optionC">
        Option C (disabled)
      </Toggle>
    </div>
  ),
};

/**
 * A group where only some toggles are disabled
 */
export const MixedDisabledGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Toggle name="planFree">Free plan</Toggle>
      <Toggle name="planPro" disabled>
        Pro plan (unavailable)
      </Toggle>
      <Toggle name="planEnterprise">Enterprise plan</Toggle>
    </div>
  ),
};

/* -------------------------------------------------------------------------
 * Form submission with visible result capture (1)
 * ---------------------------------------------------------------------- */

/**
 * Submits a form and displays the captured FormData inline instead of using
 * a blocking alert()
 */
export const FormSubmissionCapture: Story = {
  render: () => {
    const CapturingForm = () => {
      const [result, setResult] = useState<string | null>(null);

      return (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            setResult(JSON.stringify(Object.fromEntries(formData), null, 2));
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxWidth: '320px',
          }}
        >
          <Toggle name="rememberMe">Remember me</Toggle>
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Submit
          </button>
          {result && (
            <pre
              style={{
                margin: 0,
                padding: '8px',
                backgroundColor: '#f1f5f9',
                borderRadius: '4px',
                fontSize: '12px',
                whiteSpace: 'pre-wrap',
              }}
            >
              {result}
            </pre>
          )}
        </form>
      );
    };

    return <CapturingForm />;
  },
};

/* -------------------------------------------------------------------------
 * Background/container context (1)
 * ---------------------------------------------------------------------- */

/**
 * Toggle rendered on a dark background
 */
export const OnDarkBackground: Story = {
  args: {
    children: 'Works on dark backgrounds too',
  },
  decorators: [
    (Story) => (
      <div
        style={{ backgroundColor: '#0f172a', padding: '24px', borderRadius: '8px' }}
      >
        <Story />
      </div>
    ),
  ],
};

/* -------------------------------------------------------------------------
 * No change handler wired up (1)
 * ---------------------------------------------------------------------- */

/**
 * Toggle with no onPressedChange handler at all - still toggles its own
 * internal visual state since it behaves as uncontrolled
 */
export const NoChangeHandler: Story = {
  args: {
    onPressedChange: undefined,
    children: 'No change handler wired up',
  },
};

/* -------------------------------------------------------------------------
 * Disabled + pressed without a label (1)
 * ---------------------------------------------------------------------- */

/**
 * Disabled and pressed, with no label content
 */
export const DisabledPressedNoLabel: Story = {
  args: {
    disabled: true,
    pressed: true,
  },
};

/* -------------------------------------------------------------------------
 * Pressed/unpressed without a label (2)
 * ---------------------------------------------------------------------- */

/**
 * Pressed toggle rendered with no label content
 */
export const PressedNoLabel: Story = {
  args: {
    pressed: true,
  },
};

/**
 * Unpressed toggle rendered with no label content
 */
export const UnpressedNoLabel: Story = {
  args: {
    pressed: false,
  },
};

/* -------------------------------------------------------------------------
 * Kitchen-sink combinations (2)
 * ---------------------------------------------------------------------- */

/**
 * Kitchen sink: pressed, required, named, with a label
 */
export const KitchenSinkPressedRequiredNamed: Story = {
  args: {
    pressed: true,
    required: true,
    name: 'agreement',
    children: 'Kitchen sink: pressed, required, named',
  },
};

/**
 * Kitchen sink: disabled, required, and named together
 */
export const KitchenSinkDisabledRequiredNamed: Story = {
  args: {
    disabled: true,
    required: true,
    name: 'kitchenSink',
    children: 'Kitchen sink: disabled + required + named',
  },
};

/* -------------------------------------------------------------------------
 * Unbreakable long word wrapping edge case (1)
 * ---------------------------------------------------------------------- */

/**
 * A single long unbreakable "word" label inside a narrow container, exercising
 * overflow-wrap behavior distinct from the multi-word wrapping stories above
 */
export const LongUnbreakableWordLabel: Story = {
  args: {
    children:
      'Supercalifragilisticexpialidocioussynchronizationtogglelabeltext',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '160px', wordBreak: 'break-word' }}>
        <Story />
      </div>
    ),
  ],
};

/* -------------------------------------------------------------------------
 * Focus ring visibility (1)
 * ---------------------------------------------------------------------- */

/**
 * Focuses the toggle so the blue focus ring is visible for visual review
 */
export const FocusRingVisible: Story = {
  args: {
    children: 'Focus me to see the ring',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('button');
    toggle.focus();
    await expect(toggle).toHaveFocus();
  },
};

/* -------------------------------------------------------------------------
 * Name attribute without a label (1)
 * ---------------------------------------------------------------------- */

/**
 * Only the name attribute is set, with no label content
 */
export const NameOnlyNoLabel: Story = {
  args: {
    name: 'subscribe',
  },
};

/* -------------------------------------------------------------------------
 * Label inside a narrow flex container (1)
 * ---------------------------------------------------------------------- */

/**
 * Toggle and label constrained inside a narrow flex container to verify
 * layout doesn't break when space is tight
 */
export const LabelInNarrowFlexContainer: Story = {
  args: {
    children: 'Narrow flex container',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', maxWidth: '220px' }}>
        <Story />
      </div>
    ),
  ],
};

/* -------------------------------------------------------------------------
 * Settings panel with a controlled group of named toggles (1)
 * ---------------------------------------------------------------------- */

/**
 * A settings panel where each toggle is independently controlled and named,
 * demonstrating a realistic multi-toggle form pattern
 */
export const SettingsPanelControlledGroup: Story = {
  render: () => {
    const SettingsPanel = () => {
      const [settings, setSettings] = useState({
        email: true,
        push: false,
        sms: false,
      });

      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: '20px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            minWidth: '300px',
          }}
        >
          <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>
            Notification Settings
          </h3>
          {(Object.keys(settings) as Array<keyof typeof settings>).map(
            (key) => (
              <Toggle
                key={key}
                name={key}
                pressed={settings[key]}
                onPressedChange={(pressed) =>
                  setSettings((current) => ({ ...current, [key]: pressed }))
                }
              >
                {key} notifications ({settings[key] ? 'on' : 'off'})
              </Toggle>
            )
          )}
        </div>
      );
    };

    return <SettingsPanel />;
  },
};
