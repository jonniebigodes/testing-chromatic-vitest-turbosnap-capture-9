import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, within, userEvent, expect } from 'storybook/test';
import { useState } from 'react';
import PinInput from './PinInput';

/** Returns the visible pin input fields (excludes the visually-hidden form input). */
const getPinInputs = (canvasElement: HTMLElement): HTMLInputElement[] =>
  Array.from(canvasElement.querySelectorAll<HTMLInputElement>('input[data-part="input"]'));

const meta = {
  title: 'Components/Form/PinInput',
  component: PinInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'object',
      description: 'The controlled value of the pin input',
    },
    onValueChange: {
      description: 'Function called on input change',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the inputs are disabled',
    },
    maxLength: {
      control: 'number',
      description: 'The number of input fields to render',
    },
    required: {
      control: 'boolean',
      description: 'Whether the pin input is required',
    },
    name: {
      control: 'text',
      description: 'The name of the input element for form submission',
    },
    type: {
      control: 'select',
      options: ['numeric', 'alphanumeric', 'alphabetic'],
      description: 'The type of value the pin-input should allow',
    },
    mask: {
      control: 'boolean',
      description: 'If true, the input value will be masked',
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder text for the inputs',
    },
    otp: {
      control: 'boolean',
      description: 'If true, enables OTP autocomplete',
    },
    children: {
      control: 'text',
      description: 'Custom label content',
    },
  },
  args: {
    onValueChange: fn(),
  },
} satisfies Meta<typeof PinInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default pin input with 4 numeric fields.
 */
export const Default: Story = {
  args: {
    children: 'Enter PIN',
    maxLength: 4,
  },
};

/**
 * Pin input in disabled state.
 */
export const Disabled: Story = {
  args: {
    children: 'Disabled PIN',
    maxLength: 4,
    disabled: true,
  },
};

/**
 * Pin input with required attribute.
 */
export const Required: Story = {
  args: {
    children: 'Required PIN',
    maxLength: 4,
    required: true,
  },
};

/**
 * Pin input with name attribute for form submission.
 */
export const WithName: Story = {
  args: {
    children: 'PIN with Name',
    maxLength: 4,
    name: 'verification-code',
  },
};

/**
 * Pin input with custom label content.
 */
export const CustomChildren: Story = {
  args: {
    children: 'Enter your security code',
    maxLength: 6,
  },
};

/**
 * Pin input with 6 fields for longer codes.
 */
export const SixDigits: Story = {
  args: {
    children: '6-Digit Code',
    maxLength: 6,
  },
};

/**
 * Pin input with masked values (password-style).
 */
export const Masked: Story = {
  args: {
    children: 'Secret PIN',
    maxLength: 4,
    mask: true,
  },
};

/**
 * Pin input allowing alphanumeric values.
 */
export const Alphanumeric: Story = {
  args: {
    children: 'Alphanumeric Code',
    maxLength: 5,
    type: 'alphanumeric',
  },
};

/**
 * Pin input allowing only alphabetic values.
 */
export const Alphabetic: Story = {
  args: {
    children: 'Letter Code',
    maxLength: 4,
    type: 'alphabetic',
  },
};

/**
 * Pin input with custom placeholder.
 */
export const CustomPlaceholder: Story = {
  args: {
    children: 'Enter Code',
    maxLength: 4,
    placeholder: '0',
  },
};

/**
 * Pin input in OTP mode with autocomplete.
 */
export const OTPMode: Story = {
  args: {
    children: 'One-Time Password',
    maxLength: 6,
    otp: true,
  },
};

/**
 * Controlled pin input with state management.
 */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <PinInput
          value={value}
          onValueChange={(details) => setValue(details.value)}
          maxLength={4}
          children="Controlled PIN"
        />
        <div style={{ fontSize: '14px', color: '#6b7280' }}>
          Current value: {value.join('') || '(empty)'}
        </div>
        <button
          onClick={() => setValue([])}
          style={{
            padding: '8px 16px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Clear
        </button>
      </div>
    );
  },
};

/**
 * Pin input with completion handler.
 */
export const WithCompletion: Story = {
  render: () => {
    const [isComplete, setIsComplete] = useState(false);
    const [pin, setPin] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <PinInput
          maxLength={4}
          onValueChange={(details) => {
            setPin(details.valueAsString);
            setIsComplete(details.valueAsString.length === 4);
          }}
          children="Enter 4-Digit PIN"
        />
        {isComplete && (
          <div
            style={{
              padding: '12px',
              backgroundColor: '#d1fae5',
              color: '#065f46',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            ✓ PIN Complete: {pin}
          </div>
        )}
      </div>
    );
  },
};

/**
 * Form submission example with pin input.
 */
export const FormSubmission: Story = {
  render: () => {
    const [submittedValue, setSubmittedValue] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const pinValue = formData.get('security-pin') as string;
      setSubmittedValue(pinValue);
    };

    return (
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
        }}
      >
        <PinInput
          name="security-pin"
          maxLength={4}
          required
          children="Security PIN"
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Submit
        </button>
        {submittedValue && (
          <div
            style={{
              padding: '12px',
              backgroundColor: '#f3f4f6',
              borderRadius: '6px',
              fontSize: '14px',
            }}
          >
            Submitted PIN: <strong>{submittedValue}</strong>
          </div>
        )}
      </form>
    );
  },
};

/**
 * Two-factor authentication example.
 */
export const TwoFactorAuth: Story = {
  render: () => {
    const [code, setCode] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const handleVerify = () => {
      if (code.length === 6) {
        setIsVerifying(true);
        setTimeout(() => {
          setIsVerifying(false);
          setIsVerified(true);
        }, 1500);
      }
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '32px',
          backgroundColor: '#f9fafb',
          borderRadius: '12px',
          maxWidth: '400px',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h3
            style={{
              margin: 0,
              fontSize: '20px',
              fontWeight: 600,
              color: '#111827',
            }}
          >
            Two-Factor Authentication
          </h3>
          <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#6b7280' }}>
            Enter the 6-digit code sent to your device
          </p>
        </div>

        <PinInput
          maxLength={6}
          onValueChange={(details) => setCode(details.valueAsString)}
          disabled={isVerified}
          otp
        />

        <button
          onClick={handleVerify}
          disabled={code.length !== 6 || isVerifying || isVerified}
          style={{
            padding: '12px',
            backgroundColor: isVerified
              ? '#10b981'
              : code.length === 6
                ? '#3b82f6'
                : '#9ca3af',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor:
              code.length === 6 && !isVerifying && !isVerified
                ? 'pointer'
                : 'not-allowed',
            fontSize: '15px',
            fontWeight: 600,
          }}
        >
          {isVerified
            ? '✓ Verified'
            : isVerifying
              ? 'Verifying...'
              : 'Verify Code'}
        </button>

        {isVerified && (
          <div
            style={{
              padding: '12px',
              backgroundColor: '#d1fae5',
              color: '#065f46',
              borderRadius: '8px',
              fontSize: '14px',
              textAlign: 'center',
              fontWeight: 500,
            }}
          >
            Authentication successful!
          </div>
        )}
      </div>
    );
  },
};

/**
 * Multiple pin inputs with different configurations.
 */
export const Variations: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        padding: '16px',
      }}
    >
      <div>
        <PinInput maxLength={4} children="4-Digit PIN" type="numeric" />
      </div>
      <div>
        <PinInput maxLength={6} children="6-Digit OTP" type="numeric" otp />
      </div>
      <div>
        <PinInput maxLength={4} children="Masked PIN" type="numeric" mask />
      </div>
      <div>
        <PinInput maxLength={5} children="Alphanumeric" type="alphanumeric" />
      </div>
      <div>
        <PinInput maxLength={4} children="Disabled" type="numeric" disabled />
      </div>
    </div>
  ),
};

/* -------------------------------------------------------------------------
 * maxLength variations (4)
 * ---------------------------------------------------------------------- */

/**
 * A single-field pin input, the smallest valid maxLength.
 */
export const SingleDigitPin: Story = {
  args: {
    children: 'Single-Digit PIN',
    maxLength: 1,
  },
};

/**
 * A two-field pin input.
 */
export const TwoDigitPin: Story = {
  args: {
    children: 'Two-Digit PIN',
    maxLength: 2,
  },
};

/**
 * An eight-field pin input for longer codes.
 */
export const EightDigitPin: Story = {
  args: {
    children: 'Eight-Digit PIN',
    maxLength: 8,
  },
};

/**
 * Confirms exactly `maxLength` fields are rendered in the DOM.
 */
export const MaxLengthRendersCorrectFieldCount: Story = {
  args: {
    children: 'Field Count Check',
    maxLength: 5,
  },
  play: async ({ canvasElement }) => {
    const inputs = getPinInputs(canvasElement);
    expect(inputs).toHaveLength(5);
  },
};

/* -------------------------------------------------------------------------
 * Masked display (2)
 * ---------------------------------------------------------------------- */

/**
 * A masked 6-digit pin input, hiding entered characters like a password field.
 */
export const MaskedSixDigits: Story = {
  args: {
    children: 'Masked 6-Digit PIN',
    maxLength: 6,
    mask: true,
  },
};

/**
 * Verifies masked fields render with an underlying `type="password"` input.
 */
export const MaskedTypeIsPassword: Story = {
  args: {
    children: 'Masked Type Check',
    maxLength: 4,
    mask: true,
  },
  play: async ({ canvasElement }) => {
    const inputs = getPinInputs(canvasElement);
    inputs.forEach((input) => expect(input).toHaveAttribute('type', 'password'));
  },
};

/* -------------------------------------------------------------------------
 * Type constraints (3)
 * ---------------------------------------------------------------------- */

/**
 * Numeric fields reject alphabetic keystrokes, leaving the field empty.
 */
export const NumericRejectsLetters: Story = {
  args: {
    children: 'Numeric Only',
    maxLength: 4,
    type: 'numeric',
  },
  play: async ({ canvasElement }) => {
    const inputs = getPinInputs(canvasElement);
    await userEvent.type(inputs[0], 'a');
    expect(inputs[0]).toHaveValue('');
  },
};

/**
 * Alphabetic fields reject numeric keystrokes, leaving the field empty.
 */
export const AlphabeticRejectsDigits: Story = {
  args: {
    children: 'Letters Only',
    maxLength: 4,
    type: 'alphabetic',
  },
  play: async ({ canvasElement }) => {
    const inputs = getPinInputs(canvasElement);
    await userEvent.type(inputs[0], '5');
    expect(inputs[0]).toHaveValue('');
  },
};

/**
 * Alphanumeric fields accept both letters and digits.
 */
export const AlphanumericAcceptsLettersAndDigits: Story = {
  args: {
    children: 'Letters and Digits',
    maxLength: 4,
    type: 'alphanumeric',
  },
  play: async ({ canvasElement }) => {
    const inputs = getPinInputs(canvasElement);
    await userEvent.type(inputs[0], 'a');
    expect(inputs[0]).toHaveValue('a');
    await userEvent.type(inputs[1], '5');
    expect(inputs[1]).toHaveValue('5');
  },
};

/* -------------------------------------------------------------------------
 * Controlled value edge cases (2)
 * ---------------------------------------------------------------------- */

/**
 * A controlled pin input pre-filled with an initial value array.
 */
export const ControlledPrefilled: Story = {
  render: () => (
    <PinInput
      value={['1', '2', '3', '4']}
      onValueChange={() => {}}
      maxLength={4}
      children="Prefilled Controlled PIN"
    />
  ),
};

/**
 * A controlled pin input whose value can be reset from outside the component.
 */
export const ControlledExternalReset: Story = {
  render: () => {
    const ControlledResetDemo = () => {
      const [value, setValue] = useState<string[]>(['9', '9', '9', '9']);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <PinInput
            value={value}
            onValueChange={(details) => setValue(details.value)}
            maxLength={4}
            children="Externally Controlled PIN"
          />
          <button
            onClick={() => setValue(['', '', '', ''])}
            style={{
              padding: '8px 16px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Reset from outside
          </button>
        </div>
      );
    };

    return <ControlledResetDemo />;
  },
};

/* -------------------------------------------------------------------------
 * Disabled combinations (2)
 * ---------------------------------------------------------------------- */

/**
 * A disabled pin input pre-filled with a value.
 */
export const DisabledWithPrefilledValue: Story = {
  args: {
    children: 'Disabled with value',
    maxLength: 4,
    value: ['1', '2', '3', '4'],
    disabled: true,
  },
};

/**
 * A disabled pin input that is also marked required.
 */
export const DisabledRequired: Story = {
  args: {
    children: 'Disabled and required',
    maxLength: 4,
    disabled: true,
    required: true,
  },
};

/* -------------------------------------------------------------------------
 * Required combinations (2)
 * ---------------------------------------------------------------------- */

/**
 * A required pin input with a name attribute for form submission.
 */
export const RequiredWithName: Story = {
  args: {
    children: 'Required with name',
    maxLength: 4,
    required: true,
    name: 'otp-code',
  },
};

/**
 * A required pin input that also masks its values.
 */
export const RequiredMasked: Story = {
  args: {
    children: 'Required masked PIN',
    maxLength: 4,
    required: true,
    mask: true,
  },
};

/* -------------------------------------------------------------------------
 * Name / form-submission scenarios (2)
 * ---------------------------------------------------------------------- */

/**
 * Only the name attribute is set, no required/value constraints.
 */
export const NameOnly: Story = {
  args: {
    children: 'PIN with only name set',
    maxLength: 4,
    name: 'pin-code',
  },
};

/**
 * A very long name attribute used to verify HTML attribute limits.
 */
export const LongNameAttribute: Story = {
  args: {
    children: 'Long name attribute',
    maxLength: 4,
    name: 'a_very_long_field_name_used_for_testing_html_attribute_limits',
  },
};

/* -------------------------------------------------------------------------
 * OTP autocomplete variations (2)
 * ---------------------------------------------------------------------- */

/**
 * A 4-digit OTP-enabled pin input.
 */
export const OTPFourDigits: Story = {
  args: {
    children: 'OTP Four Digits',
    maxLength: 4,
    otp: true,
  },
};

/**
 * An OTP-enabled pin input that is also disabled.
 */
export const OTPDisabled: Story = {
  args: {
    children: 'OTP Disabled',
    maxLength: 6,
    otp: true,
    disabled: true,
  },
};

/* -------------------------------------------------------------------------
 * Placeholder variations (2)
 * ---------------------------------------------------------------------- */

/**
 * A custom placeholder glyph shown in each empty, unfocused field.
 */
export const CustomPlaceholderSymbol: Story = {
  args: {
    children: 'Custom placeholder symbol',
    maxLength: 4,
    placeholder: '•',
  },
};

/**
 * Verifies the placeholder is cleared on the field that currently has focus.
 */
export const PlaceholderHiddenOnFocus: Story = {
  args: {
    children: 'Placeholder hides on focus',
    maxLength: 4,
    placeholder: '*',
  },
  play: async ({ canvasElement }) => {
    const inputs = getPinInputs(canvasElement);
    expect(inputs[0]).toHaveAttribute('placeholder', '*');
    await userEvent.click(inputs[0]);
    expect(inputs[0]).toHaveAttribute('placeholder', '');
  },
};

/* -------------------------------------------------------------------------
 * Completion callback (2)
 * ---------------------------------------------------------------------- */

/**
 * Typing a full sequence invokes onValueChange with the completed value.
 */
export const CompletionFillsAllFields: Story = {
  args: {
    children: 'Fill to complete',
    maxLength: 4,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const firstInput = canvas.getByRole('textbox', { name: 'pin code 1 of 4' });
    await userEvent.type(firstInput, '1234');
    await expect(args.onValueChange).toHaveBeenCalledWith(
      expect.objectContaining({ valueAsString: '1234' })
    );
  },
};

/**
 * Typing only some of the fields keeps the value incomplete.
 */
export const CompletionPartialFill: Story = {
  args: {
    children: 'Partial fill stays incomplete',
    maxLength: 4,
  },
  play: async ({ canvasElement, args }) => {
    const inputs = getPinInputs(canvasElement);
    await userEvent.type(inputs[0], '12');
    expect(args.onValueChange).toHaveBeenCalled();
    expect(inputs[2]).toHaveValue('');
  },
};

/* -------------------------------------------------------------------------
 * Keyboard interaction / focus-advance (4)
 * ---------------------------------------------------------------------- */

/**
 * Typing a character auto-advances focus to the next field.
 */
export const TypingAdvancesFocus: Story = {
  args: {
    children: 'Type to advance focus',
    maxLength: 4,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const firstInput = canvas.getByRole('textbox', { name: 'pin code 1 of 4' });
    const secondInput = canvas.getByRole('textbox', { name: 'pin code 2 of 4' });
    await userEvent.type(firstInput, '1');
    expect(secondInput).toHaveFocus();
  },
};

/**
 * Backspace clears the current value and moves focus back a field.
 */
export const BackspaceNavigatesBack: Story = {
  args: {
    children: 'Backspace navigates back',
    maxLength: 4,
  },
  play: async ({ canvasElement }) => {
    const inputs = getPinInputs(canvasElement);
    await userEvent.type(inputs[0], '12');
    await userEvent.keyboard('{Backspace}');
    expect(inputs[1]).toHaveFocus();
  },
};

/**
 * Tabbing into the control lands focus on the first field.
 */
export const TabFocusableFirstField: Story = {
  args: {
    children: 'Tab into first field',
    maxLength: 4,
  },
  play: async ({ canvasElement }) => {
    const inputs = getPinInputs(canvasElement);
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    expect(inputs[0]).toHaveFocus();
  },
};

/**
 * Arrow keys move focus between already-filled fields.
 */
export const ArrowKeyNavigation: Story = {
  args: {
    children: 'Arrow key navigation',
    maxLength: 4,
  },
  play: async ({ canvasElement }) => {
    const inputs = getPinInputs(canvasElement);
    await userEvent.type(inputs[0], '12');
    await userEvent.keyboard('{ArrowLeft}');
    expect(inputs[1]).toHaveFocus();
    await userEvent.keyboard('{ArrowLeft}');
    expect(inputs[0]).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    expect(inputs[1]).toHaveFocus();
  },
};

/* -------------------------------------------------------------------------
 * Kitchen-sink combinations (3)
 * ---------------------------------------------------------------------- */

/**
 * Kitchen sink: masked, OTP-enabled, required, and named.
 */
export const KitchenSinkMaskedOtpRequired: Story = {
  args: {
    children: 'Kitchen sink: masked, OTP, required',
    maxLength: 6,
    mask: true,
    otp: true,
    required: true,
    name: 'secure-otp',
  },
};

/**
 * Kitchen sink: alphanumeric type, disabled, with a prefilled value.
 */
export const KitchenSinkAlphanumericDisabled: Story = {
  args: {
    children: 'Kitchen sink: alphanumeric, disabled',
    maxLength: 5,
    type: 'alphanumeric',
    disabled: true,
    value: ['A', '1', 'B', '2', 'C'],
  },
};

/**
 * Kitchen sink: controlled state, masked, required, and named together.
 */
export const KitchenSinkControlledMaskedName: Story = {
  render: () => {
    const KitchenSinkDemo = () => {
      const [value, setValue] = useState<string[]>(['', '', '', '']);

      return (
        <PinInput
          value={value}
          onValueChange={(details) => setValue(details.value)}
          maxLength={4}
          mask
          required
          name="kitchen-sink-pin"
          children="Kitchen sink: controlled, masked, named"
        />
      );
    };

    return <KitchenSinkDemo />;
  },
};

/* -------------------------------------------------------------------------
 * Background/container context (1)
 * ---------------------------------------------------------------------- */

/**
 * Pin input rendered on a dark background.
 */
export const OnDarkBackground: Story = {
  args: {
    children: 'Works on dark backgrounds too',
    maxLength: 4,
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
 * RTL/unicode label content (1)
 * ---------------------------------------------------------------------- */

/**
 * Pin input label rendered right-to-left with Arabic unicode text.
 */
export const RTLLabel: Story = {
  args: {
    children: 'أدخل الرمز السري',
    maxLength: 4,
  },
  decorators: [
    (Story) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
};

/* -------------------------------------------------------------------------
 * Long label wrapping edge case (1)
 * ---------------------------------------------------------------------- */

/**
 * A long label wrapped inside a narrow container.
 */
export const LongLabelWrapping: Story = {
  args: {
    children:
      'Please enter the six digit one-time verification code that was sent to your registered mobile device to continue',
    maxLength: 6,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

/* -------------------------------------------------------------------------
 * Narrow container wrapping edge case (1)
 * ---------------------------------------------------------------------- */

/**
 * A short label forced to wrap by an extremely narrow container.
 */
export const NarrowContainerWrap: Story = {
  args: {
    children: 'Verification code required here',
    maxLength: 4,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '90px' }}>
        <Story />
      </div>
    ),
  ],
};
