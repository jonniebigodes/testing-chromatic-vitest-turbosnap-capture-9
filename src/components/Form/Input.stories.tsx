import type { Meta, StoryObj } from "@storybook/react-vite";
import Input from "./Input";
import { ark } from "@ark-ui/react/factory";
import { Label } from "./index";
import { within, userEvent, expect } from "storybook/test";
import { useState } from "react";
import type { ChangeEvent } from "react";

const meta = {
  title: "Components/Form/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    inverted: {
      control: "boolean",
      description: "Renders the input in inverted colors",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url"],
      description: "Input type",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default input with no placeholder
 */
export const Default: Story = {
  args: {
    inverted: false,
    type: "text",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "300px", padding: "16px" }}>
      <Input {...args} />
    </ark.div>
  ),
};

/**
 * Input with placeholder text
 */
export const WithPlaceholder: Story = {
  args: {
    placeholder: "Enter your email",
    type: "email",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ minWidth: "300px", padding: "16px" }}>
      <Input {...args} />
    </ark.div>
  ),
};

/**
 * Input with inverted colors (dark mode)
 */
export const Inverted: Story = {
  args: {
    placeholder: "Enter text",
    inverted: true,
    type: "text",
  },
  render: (args) => (
    <ark.div
      style={{
        minWidth: "300px",
        padding: "32px",
        backgroundColor: "#111827",
        borderRadius: "8px",
      }}
    >
      <Input {...args} />
    </ark.div>
  ),
};

/**
 * Password input with placeholder
 */
export const PasswordInput: Story = {
  args: {
    placeholder: "Enter your password",
    type: "password",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ minWidth: "300px", padding: "16px" }}>
      <Input {...args} />
    </ark.div>
  ),
};

/**
 * Number input with placeholder
 */
export const NumberInput: Story = {
  args: {
    placeholder: "Enter a number",
    type: "number",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ minWidth: "300px", padding: "16px" }}>
      <Input {...args} />
    </ark.div>
  ),
};

/**
 * Input with label
 */
export const WithLabel: Story = {
  args: {
    placeholder: "john@example.com",
    type: "email",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ minWidth: "300px", padding: "16px" }}>
      <Label htmlFor="email-input">Email Address</Label>
      <Input id="email-input" {...args} />
    </ark.div>
  ),
};

/**
 * Inverted input with label
 */
export const InvertedWithLabel: Story = {
  args: {
    placeholder: "Enter your username",
    type: "text",
    inverted: true,
  },
  render: (args) => (
    <ark.div
      style={{
        minWidth: "300px",
        padding: "32px",
        backgroundColor: "#111827",
        borderRadius: "8px",
      }}
    >
      <Label htmlFor="username-input" inverted>
        Username
      </Label>
      <Input id="username-input" {...args} />
    </ark.div>
  ),
};

/**
 * Multiple inputs in a form
 */
export const FormExample: Story = {
  render: () => (
    <ark.form
      style={{
        minWidth: "400px",
        padding: "24px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        border: "1px solid #e5e7eb",
      }}
    >
      <ark.div style={{ marginBottom: "16px" }}>
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" type="text" placeholder="John Doe" />
      </ark.div>

      <ark.div style={{ marginBottom: "16px" }}>
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" placeholder="john@example.com" />
      </ark.div>

      <ark.div style={{ marginBottom: "16px" }}>
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
      </ark.div>

      <ark.div style={{ marginBottom: "16px" }}>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="••••••••" />
      </ark.div>

      <ark.button
        type="submit"
        style={{
          width: "100%",
          padding: "10px 16px",
          backgroundColor: "#3b82f6",
          color: "#ffffff",
          border: "none",
          borderRadius: "6px",
          fontSize: "14px",
          fontWeight: "500",
          cursor: "pointer",
        }}
      >
        Submit
      </ark.button>
    </ark.form>
  ),
};

/**
 * Disabled input
 */
export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    type: "text",
    disabled: true,
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ minWidth: "300px", padding: "16px" }}>
      <Label htmlFor="disabled-input">Disabled Field</Label>
      <Input id="disabled-input" {...args} />
    </ark.div>
  ),
};

/**
 * Input with default value
 */
export const WithValue: Story = {
  args: {
    placeholder: "Enter text",
    type: "text",
    defaultValue: "Pre-filled value",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ minWidth: "300px", padding: "16px" }}>
      <Label htmlFor="value-input">Pre-filled Input</Label>
      <Input id="value-input" {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * Every supported `type` (8)
 * ---------------------------------------------------------------------- */

/**
 * Tel input for phone numbers
 */
export const TelInput: Story = {
  args: {
    placeholder: "+1 (555) 000-0000",
    type: "tel",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ minWidth: "300px", padding: "16px" }}>
      <Input {...args} />
    </ark.div>
  ),
};

/**
 * Url input for website addresses
 */
export const UrlInput: Story = {
  args: {
    placeholder: "https://example.com",
    type: "url",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ minWidth: "300px", padding: "16px" }}>
      <Input {...args} />
    </ark.div>
  ),
};

/**
 * Search input with search-specific affordances
 */
export const SearchInput: Story = {
  args: {
    placeholder: "Search…",
    type: "search",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ minWidth: "300px", padding: "16px" }}>
      <Input {...args} />
    </ark.div>
  ),
};

/**
 * Date input rendering the native date picker
 */
export const DateInput: Story = {
  args: {
    type: "date",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ minWidth: "300px", padding: "16px" }}>
      <Input {...args} />
    </ark.div>
  ),
};

/**
 * Time input rendering the native time picker
 */
export const TimeInput: Story = {
  args: {
    type: "time",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ minWidth: "300px", padding: "16px" }}>
      <Input {...args} />
    </ark.div>
  ),
};

/**
 * Inverted date input
 */
export const DateInputInverted: Story = {
  args: {
    type: "date",
    inverted: true,
  },
  render: (args) => (
    <ark.div
      style={{
        minWidth: "300px",
        padding: "32px",
        backgroundColor: "#111827",
        borderRadius: "8px",
      }}
    >
      <Input {...args} />
    </ark.div>
  ),
};

/**
 * Inverted number input
 */
export const InvertedNumberInput: Story = {
  args: {
    placeholder: "Enter a number",
    type: "number",
    inverted: true,
  },
  render: (args) => (
    <ark.div
      style={{
        minWidth: "300px",
        padding: "32px",
        backgroundColor: "#111827",
        borderRadius: "8px",
      }}
    >
      <Input {...args} />
    </ark.div>
  ),
};

/**
 * Number input constrained with min, max and step
 */
export const NumberInputWithMinMaxStep: Story = {
  args: {
    type: "number",
    placeholder: "0-100, step 5",
    inverted: false,
    min: 0,
    max: 100,
    step: 5,
  },
  render: (args) => (
    <ark.div style={{ minWidth: "300px", padding: "16px" }}>
      <Input {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * Placeholder / inverted permutations (2)
 * ---------------------------------------------------------------------- */

/**
 * Empty placeholder relying on the default empty string
 */
export const EmptyPlaceholderDefault: Story = {
  args: {
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ minWidth: "300px", padding: "16px" }}>
      <Input {...args} />
    </ark.div>
  ),
};

/**
 * Inverted input with placeholder text visible
 */
export const InvertedWithPlaceholder: Story = {
  args: {
    placeholder: "Search the dark side",
    type: "search",
    inverted: true,
  },
  render: (args) => (
    <ark.div
      style={{
        minWidth: "300px",
        padding: "32px",
        backgroundColor: "#111827",
        borderRadius: "8px",
      }}
    >
      <Input {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * Disabled / required / readOnly (5)
 * ---------------------------------------------------------------------- */

/**
 * Disabled input in inverted colors
 */
export const DisabledInverted: Story = {
  args: {
    placeholder: "Disabled inverted input",
    type: "text",
    disabled: true,
    inverted: true,
  },
  render: (args) => (
    <ark.div
      style={{
        minWidth: "300px",
        padding: "32px",
        backgroundColor: "#111827",
        borderRadius: "8px",
      }}
    >
      <Input {...args} />
    </ark.div>
  ),
};

/**
 * Required field, marked with an asterisk on the label
 */
export const RequiredField: Story = {
  args: {
    placeholder: "This field is required",
    type: "text",
    required: true,
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ minWidth: "300px", padding: "16px" }}>
      <Label htmlFor="required-input">Full Name *</Label>
      <Input id="required-input" {...args} />
    </ark.div>
  ),
};

/**
 * Required inverted field
 */
export const RequiredInvertedField: Story = {
  args: {
    placeholder: "This field is required",
    type: "email",
    required: true,
    inverted: true,
  },
  render: (args) => (
    <ark.div
      style={{
        minWidth: "300px",
        padding: "32px",
        backgroundColor: "#111827",
        borderRadius: "8px",
      }}
    >
      <Label htmlFor="required-inverted-input" inverted>
        Email *
      </Label>
      <Input id="required-inverted-input" {...args} />
    </ark.div>
  ),
};

/**
 * Read-only input displaying a fixed value
 */
export const ReadOnlyWithValue: Story = {
  args: {
    type: "text",
    defaultValue: "read-only-value",
    readOnly: true,
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ minWidth: "300px", padding: "16px" }}>
      <Input {...args} />
    </ark.div>
  ),
};

/**
 * Read-only inverted input displaying a fixed value
 */
export const ReadOnlyInvertedWithValue: Story = {
  args: {
    type: "text",
    defaultValue: "read-only-value",
    readOnly: true,
    inverted: true,
  },
  render: (args) => (
    <ark.div
      style={{
        minWidth: "300px",
        padding: "32px",
        backgroundColor: "#111827",
        borderRadius: "8px",
      }}
    >
      <Input {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * Controlled value + onChange (2)
 * ---------------------------------------------------------------------- */

/**
 * Controlled input driven entirely by React state
 */
export const ControlledValue: Story = {
  render: () => {
    const ControlledExample = () => {
      const [value, setValue] = useState("Hello");

      return (
        <ark.div style={{ minWidth: "300px", padding: "16px" }}>
          <Label htmlFor="controlled-input">Controlled value</Label>
          <Input
            id="controlled-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type something"
          />
          <ark.p style={{ marginTop: "8px", fontSize: "12px" }}>
            Current value: {value}
          </ark.p>
        </ark.div>
      );
    };

    return <ControlledExample />;
  },
};

/**
 * Controlled inverted input driven entirely by React state
 */
export const ControlledValueInverted: Story = {
  render: () => {
    const ControlledExample = () => {
      const [value, setValue] = useState("Dark mode");

      return (
        <ark.div
          style={{
            minWidth: "300px",
            padding: "32px",
            backgroundColor: "#111827",
            borderRadius: "8px",
          }}
        >
          <Label htmlFor="controlled-inverted-input" inverted>
            Controlled inverted value
          </Label>
          <Input
            id="controlled-inverted-input"
            inverted
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type something"
          />
        </ark.div>
      );
    };

    return <ControlledExample />;
  },
};

/* -------------------------------------------------------------------------
 * maxLength (2)
 * ---------------------------------------------------------------------- */

/**
 * Input constrained to a maximum length
 */
export const MaxLengthInput: Story = {
  args: {
    placeholder: "Max 10 characters",
    type: "text",
    maxLength: 10,
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ minWidth: "300px", padding: "16px" }}>
      <Input {...args} />
    </ark.div>
  ),
};

/**
 * Input already near its maxLength limit
 */
export const MaxLengthNearLimit: Story = {
  args: {
    type: "text",
    maxLength: 12,
    defaultValue: "Almost full",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ minWidth: "300px", padding: "16px" }}>
      <Input {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * autoComplete (2)
 * ---------------------------------------------------------------------- */

/**
 * Input hinting the browser to autofill an email address
 */
export const AutoCompleteEmail: Story = {
  args: {
    placeholder: "you@example.com",
    type: "email",
    autoComplete: "email",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ minWidth: "300px", padding: "16px" }}>
      <Input {...args} />
    </ark.div>
  ),
};

/**
 * Input explicitly opting out of browser autofill
 */
export const AutoCompleteOff: Story = {
  args: {
    placeholder: "One-time code",
    type: "text",
    autoComplete: "off",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ minWidth: "300px", padding: "16px" }}>
      <Input {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * Native attribute passthrough (4)
 * ---------------------------------------------------------------------- */

/**
 * Input passing through the native name attribute
 */
export const NameAttributePassthrough: Story = {
  args: {
    placeholder: "Username",
    type: "text",
    name: "username",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ minWidth: "300px", padding: "16px" }}>
      <Input {...args} />
    </ark.div>
  ),
};

/**
 * Input passing through an aria-label instead of a visible label
 */
export const AriaLabelPassthrough: Story = {
  args: {
    placeholder: "Search",
    type: "search",
    "aria-label": "Site search",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ minWidth: "300px", padding: "16px" }}>
      <Input {...args} />
    </ark.div>
  ),
};

/**
 * Input passing through a data-testid attribute
 */
export const DataTestIdPassthrough: Story = {
  args: {
    placeholder: "Has a data-testid",
    type: "text",
    "data-testid": "custom-input",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ minWidth: "300px", padding: "16px" }}>
      <Input {...args} />
    </ark.div>
  ),
};

/**
 * Input with a pattern attribute for native validation
 */
export const PatternValidation: Story = {
  args: {
    placeholder: "AAA-1234",
    type: "text",
    pattern: "[A-Z]{3}-[0-9]{4}",
    title: "Three letters, a dash, then four digits",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ minWidth: "300px", padding: "16px" }}>
      <Input {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * onChange handler (1)
 * ---------------------------------------------------------------------- */

/**
 * Uncontrolled input that logs every change via onChange
 */
export const OnChangeHandler: Story = {
  args: {
    placeholder: "Type to see console logs",
    type: "text",
    inverted: false,
    onChange: (e: ChangeEvent<HTMLInputElement>) =>
      console.log("Input changed:", e.target.value),
  },
  render: (args) => (
    <ark.div style={{ minWidth: "300px", padding: "16px" }}>
      <Input {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * Focus / blur visual states via play function (4)
 * ---------------------------------------------------------------------- */

/**
 * Focuses the normal input and leaves it focused to capture the focus ring
 */
export const FocusStateNormal: Story = {
  args: {
    placeholder: "Click elsewhere then tab back",
    type: "text",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ minWidth: "300px", padding: "16px" }}>
      <Input id="focus-normal-input" {...args} />
    </ark.div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText(
      "Click elsewhere then tab back"
    ) as HTMLInputElement;
    await userEvent.click(input);
    await expect(document.activeElement).toBe(input);
  },
};

/**
 * Focuses the inverted input and leaves it focused to capture the focus ring
 */
export const FocusStateInverted: Story = {
  args: {
    placeholder: "Click elsewhere then tab back",
    type: "text",
    inverted: true,
  },
  render: (args) => (
    <ark.div
      style={{
        minWidth: "300px",
        padding: "32px",
        backgroundColor: "#111827",
        borderRadius: "8px",
      }}
    >
      <Input id="focus-inverted-input" {...args} />
    </ark.div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText(
      "Click elsewhere then tab back"
    ) as HTMLInputElement;
    await userEvent.click(input);
    await expect(document.activeElement).toBe(input);
  },
};

/**
 * Focuses then blurs the normal input to capture the reverted style
 */
export const BlurStateNormal: Story = {
  args: {
    placeholder: "Focus then blur",
    type: "text",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ minWidth: "300px", padding: "16px" }}>
      <Input {...args} />
      <button style={{ marginTop: "8px" }}>Blur target</button>
    </ark.div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Focus then blur");
    const button = canvas.getByText("Blur target");
    await userEvent.click(input);
    await userEvent.click(button);
    await expect(document.activeElement).toBe(button.ownerDocument.activeElement);
  },
};

/**
 * Focuses then blurs the inverted input to capture the reverted style
 */
export const BlurStateInverted: Story = {
  args: {
    placeholder: "Focus then blur",
    type: "text",
    inverted: true,
  },
  render: (args) => (
    <ark.div
      style={{
        minWidth: "300px",
        padding: "32px",
        backgroundColor: "#111827",
        borderRadius: "8px",
      }}
    >
      <Input {...args} />
      <button style={{ marginTop: "8px" }}>Blur target</button>
    </ark.div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Focus then blur");
    const button = canvas.getByText("Blur target");
    await userEvent.click(input);
    await userEvent.click(button);
    await expect(document.activeElement).toBe(button.ownerDocument.activeElement);
  },
};

/* -------------------------------------------------------------------------
 * Overflow (2)
 * ---------------------------------------------------------------------- */

/**
 * Long default value overflowing a narrow container
 */
export const LongValueOverflow: Story = {
  args: {
    type: "text",
    defaultValue:
      "This is an intentionally long value used to verify text overflow behavior inside a narrow input box",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ width: "200px", padding: "16px" }}>
      <Input {...args} />
    </ark.div>
  ),
};

/**
 * Long placeholder text overflowing a narrow container
 */
export const LongPlaceholderOverflow: Story = {
  args: {
    type: "text",
    placeholder:
      "This is an intentionally long placeholder used to verify text overflow behavior",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ width: "200px", padding: "16px" }}>
      <Input {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * RTL / unicode (4)
 * ---------------------------------------------------------------------- */

/**
 * RTL Arabic placeholder text
 */
export const RTLPlaceholder: Story = {
  args: {
    placeholder: "أدخل اسمك هنا",
    type: "text",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ minWidth: "300px", padding: "16px" }} dir="rtl">
      <Input {...args} />
    </ark.div>
  ),
};

/**
 * RTL Arabic default value
 */
export const RTLValue: Story = {
  args: {
    type: "text",
    defaultValue: "مرحبا بالعالم",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ minWidth: "300px", padding: "16px" }} dir="rtl">
      <Input {...args} />
    </ark.div>
  ),
};

/**
 * Unicode emoji default value
 */
export const UnicodeEmojiValue: Story = {
  args: {
    type: "text",
    defaultValue: "🔥 Trending 🚀",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ minWidth: "300px", padding: "16px" }}>
      <Input {...args} />
    </ark.div>
  ),
};

/**
 * Unicode emoji placeholder
 */
export const UnicodeEmojiPlaceholder: Story = {
  args: {
    type: "text",
    placeholder: "😀 Type an emoji reaction",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ minWidth: "300px", padding: "16px" }}>
      <Input {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * autoFocus (1)
 * ---------------------------------------------------------------------- */

/**
 * Input that receives focus automatically on mount
 */
export const AutoFocusInput: Story = {
  args: {
    placeholder: "Focused on mount",
    type: "text",
    autoFocus: true,
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ minWidth: "300px", padding: "16px" }}>
      <Input {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * Multi-instance independence (1)
 * ---------------------------------------------------------------------- */

/**
 * Two independent inputs side by side, one normal and one inverted
 */
export const SideBySideInstances: Story = {
  render: () => (
    <ark.div style={{ display: "flex", gap: "16px" }}>
      <ark.div style={{ minWidth: "220px", padding: "16px" }}>
        <Label htmlFor="side-by-side-normal">Normal</Label>
        <Input id="side-by-side-normal" placeholder="Normal input" />
      </ark.div>
      <ark.div
        style={{
          minWidth: "220px",
          padding: "16px",
          backgroundColor: "#111827",
          borderRadius: "8px",
        }}
      >
        <Label htmlFor="side-by-side-inverted" inverted>
          Inverted
        </Label>
        <Input id="side-by-side-inverted" inverted placeholder="Inverted input" />
      </ark.div>
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * Kitchen sink combos (2)
 * ---------------------------------------------------------------------- */

/**
 * Kitchen-sink normal input combining many props at once
 */
export const KitchenSinkNormal: Story = {
  args: {
    type: "email",
    placeholder: "you@example.com",
    inverted: false,
    required: true,
    maxLength: 60,
    autoComplete: "email",
    name: "kitchen-sink-email",
    "aria-label": "Kitchen sink email",
    defaultValue: "",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <Label htmlFor="kitchen-sink-normal">Work email *</Label>
      <Input id="kitchen-sink-normal" {...args} />
    </ark.div>
  ),
};

/**
 * Kitchen-sink inverted input combining many props at once
 */
export const KitchenSinkInverted: Story = {
  args: {
    type: "password",
    placeholder: "••••••••",
    inverted: true,
    required: true,
    minLength: 8,
    maxLength: 128,
    autoComplete: "new-password",
    name: "kitchen-sink-password",
    "aria-label": "Kitchen sink password",
  },
  render: (args) => (
    <ark.div
      style={{
        minWidth: "320px",
        padding: "32px",
        backgroundColor: "#111827",
        borderRadius: "8px",
      }}
    >
      <Label htmlFor="kitchen-sink-inverted" inverted>
        New password *
      </Label>
      <Input id="kitchen-sink-inverted" {...args} />
    </ark.div>
  ),
};
