import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, within, userEvent, expect } from "storybook/test";
import { useState } from "react";
import Checkbox from "./Checkbox";

const meta = {
  title: "Components/Form/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "The controlled checked state of the checkbox",
    },
    onCheckedChange: {
      description: "Callback invoked when the checked state changes",
    },
    disabled: {
      control: "boolean",
      description: "Whether the checkbox is disabled",
    },
    required: {
      control: "boolean",
      description: "Whether the checkbox is required",
    },
    name: {
      control: "text",
      description: "The name attribute for form submission",
    },
    value: {
      control: "text",
      description: "The value attribute for form submission",
    },
    readOnly: {
      control: "boolean",
      description: "Whether the checkbox is read-only",
    },
    children: {
      control: "text",
      description: "Content to be rendered as the checkbox label",
    },
  },
  args: {
    onCheckedChange: fn(),
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default checkbox with a label
 */
export const Default: Story = {
  args: {
    children: "Accept terms and conditions",
  },
};

/**
 * Checkbox in checked state
 */
export const Checked: Story = {
  args: {
    checked: true,
    children: "I agree to the terms",
  },
};

/**
 * Disabled checkbox
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: "This option is disabled",
  },
};

/**
 * Disabled and checked checkbox
 */
export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
    children: "This option is disabled and checked",
  },
};

/**
 * Required checkbox
 */
export const Required: Story = {
  args: {
    required: true,
    children: "I agree to the terms (required)",
  },
};

/**
 * Checkbox with name and value attributes for form submission
 */
export const WithNameAndValue: Story = {
  args: {
    name: "terms",
    value: "accepted",
    children: "Accept terms (check the DOM for name and value)",
  },
};

/**
 * Read-only checkbox
 */
export const ReadOnly: Story = {
  args: {
    readOnly: true,
    checked: true,
    children: "This checkbox is read-only",
  },
};

/**
 * Checkbox without label
 */
export const WithoutLabel: Story = {
  args: {},
};

/**
 * Checkbox with custom label content
 */
export const CustomLabelContent: Story = {
  render: (args) => (
    <Checkbox {...args}>
      <span>
        I agree to the{" "}
        <a
          href="#"
          style={{ color: "#3b82f6", textDecoration: "underline" }}
          onClick={(e) => e.preventDefault()}
        >
          terms and conditions
        </a>
      </span>
    </Checkbox>
  ),
};

/**
 * Checkbox with long label text
 */
export const LongLabel: Story = {
  args: {
    children:
      "I agree to receive marketing communications, promotional offers, and newsletters from the company. I understand I can unsubscribe at any time.",
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Controlled checkbox with state management
 */
export const Controlled: Story = {
  render: () => {
    const ControlledCheckbox = () => {
      const [checked, setChecked] = useState(false);

      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Checkbox
            checked={checked}
            onCheckedChange={(details) => {
              const checkedValue = typeof details.checked === "boolean" ? details.checked : details.checked === "on";
              setChecked(checkedValue);
            }}
          >
            Controlled checkbox (currently: {checked ? "checked" : "unchecked"})
          </Checkbox>
          <button
            onClick={() => setChecked(!checked)}
            style={{
              padding: "8px 16px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Toggle from outside
          </button>
        </div>
      );
    };

    return <ControlledCheckbox />;
  },
};

/**
 * Multiple checkboxes in a form
 */
export const MultipleCheckboxes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Checkbox name="newsletter" value="yes">
        Subscribe to newsletter
      </Checkbox>
      <Checkbox name="marketing" value="yes">
        Receive marketing emails
      </Checkbox>
      <Checkbox name="updates" value="yes" checked>
        Get product updates
      </Checkbox>
      <Checkbox name="notifications" value="yes" disabled>
        Push notifications (coming soon)
      </Checkbox>
    </div>
  ),
};

/**
 * Checkbox with onCheckedChange handler
 */
export const WithChangeHandler: Story = {
  render: () => {
    const CheckboxWithHandler = () => {
      const [message, setMessage] = useState("");

      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Checkbox
            onCheckedChange={(details) => {
              setMessage(
                `Checkbox is now ${details.checked ? "checked" : "unchecked"}`
              );
            }}
          >
            Click me to trigger the handler
          </Checkbox>
          {message && (
            <div
              style={{
                padding: "8px 12px",
                backgroundColor: "#e0f2fe",
                color: "#0c4a6e",
                borderRadius: "4px",
                fontSize: "14px",
              }}
            >
              {message}
            </div>
          )}
        </div>
      );
    };

    return <CheckboxWithHandler />;
  },
};

/**
 * Checkbox in a form context
 */
export const InFormContext: Story = {
  render: () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        alert(JSON.stringify(data, null, 2));
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "20px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        maxWidth: "400px",
      }}
    >
      <div>
        <h3 style={{ margin: "0 0 16px 0", fontSize: "16px" }}>
          Sign Up Form
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Checkbox name="terms" value="accepted" required>
            I accept the terms and conditions *
          </Checkbox>
          <Checkbox name="privacy" value="accepted" required>
            I accept the privacy policy *
          </Checkbox>
          <Checkbox name="newsletter" value="yes">
            Subscribe to newsletter (optional)
          </Checkbox>
        </div>
      </div>
      <button
        type="submit"
        style={{
          padding: "10px 16px",
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "500",
        }}
      >
        Submit Form
      </button>
    </form>
  ),
};

/* -------------------------------------------------------------------------
 * Required crossed with checked/disabled (2)
 * ---------------------------------------------------------------------- */

/**
 * Required checkbox that is already checked
 */
export const RequiredChecked: Story = {
  args: {
    required: true,
    checked: true,
    children: "I agree to the terms (required, pre-checked)",
  },
};

/**
 * Required checkbox that is also disabled
 */
export const RequiredDisabled: Story = {
  args: {
    required: true,
    disabled: true,
    children: "This required option is disabled",
  },
};

/* -------------------------------------------------------------------------
 * Disabled/read-only combinations (3)
 * ---------------------------------------------------------------------- */

/**
 * Disabled and read-only together
 */
export const DisabledReadOnly: Story = {
  args: {
    disabled: true,
    readOnly: true,
    checked: true,
    children: "Disabled and read-only",
  },
};

/**
 * Read-only checkbox that starts unchecked
 */
export const ReadOnlyUnchecked: Story = {
  args: {
    readOnly: true,
    checked: false,
    children: "Read-only, currently unchecked",
  },
};

/**
 * Read-only checkbox that is also required
 */
export const ReadOnlyRequired: Story = {
  args: {
    readOnly: true,
    required: true,
    checked: true,
    children: "Read-only and required",
  },
};

/* -------------------------------------------------------------------------
 * Label presence edge cases (4)
 * ---------------------------------------------------------------------- */

/**
 * Checked checkbox rendered without any label content
 */
export const CheckedWithoutLabel: Story = {
  args: {
    checked: true,
  },
};

/**
 * Explicitly unchecked checkbox rendered without any label content
 */
export const UncheckedExplicitWithoutLabel: Story = {
  args: {
    checked: false,
  },
};

/**
 * Checkbox with an empty string as its label content
 */
export const EmptyStringLabel: Story = {
  args: {
    children: "",
  },
};

/**
 * Checkbox with a whitespace-only label, exercising the truthy-but-blank
 * children edge case
 */
export const WhitespaceOnlyLabel: Story = {
  args: {
    children: "   ",
  },
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
      "By checking this box you acknowledge that you have read, understood, and agree to be bound by the complete terms of service, privacy policy, cookie policy, and any subsequent amendments thereto, including but not limited to data processing agreements and acceptable use policies.",
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "200px" }}>
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
    children: "Subscribe to occasional product update emails",
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "80px" }}>
        <Story />
      </div>
    ),
  ],
};

/* -------------------------------------------------------------------------
 * RTL/unicode/emoji label content (2)
 * ---------------------------------------------------------------------- */

/**
 * Checkbox label rendered right-to-left with Arabic unicode text
 */
export const RTLLabel: Story = {
  args: {
    children: "أوافق على الشروط والأحكام",
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
 * Checkbox label containing emoji alongside unicode text
 */
export const UnicodeEmojiLabel: Story = {
  args: {
    children: "✅ Confirmé et 🎉 terminé !",
  },
};

/* -------------------------------------------------------------------------
 * Name/value form-submission scenarios (3)
 * ---------------------------------------------------------------------- */

/**
 * Only the name attribute is set; value falls back to the default "on"
 */
export const NameOnlyDefaultValue: Story = {
  args: {
    name: "subscribe",
    children: "Name only (value defaults to \"on\")",
  },
};

/**
 * Only the value attribute is set, with no name attribute
 */
export const ValueOnlyNoName: Story = {
  args: {
    value: "custom-value",
    children: "Value without a name",
  },
};

/**
 * Both a very long name and a very long value attribute
 */
export const LongNameLongValueAttributes: Story = {
  args: {
    name: "a_very_long_field_name_used_for_testing_html_attribute_limits",
    value:
      "a-very-long-value-string-used-to-verify-form-submission-with-long-attribute-values",
    children: "Long name/value attributes",
  },
};

/* -------------------------------------------------------------------------
 * Controlled vs uncontrolled usage (2)
 * ---------------------------------------------------------------------- */

/**
 * Uncontrolled checkbox: clicking freely toggles its own internal state
 */
export const UncontrolledInteractive: Story = {
  args: {
    children: "Uncontrolled - click toggles freely",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(args.onCheckedChange).toHaveBeenCalledTimes(1);
  },
};

/**
 * Controlled checkbox whose `checked` prop is fixed to `true` by the parent;
 * clicking still notifies the parent via onCheckedChange, but the parent in
 * this demo chooses not to update its own state, so the prop stays locked
 */
export const ControlledLockedChecked: Story = {
  args: {
    checked: true,
    children: "Locked checked (parent state never updates)",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");
    expect(checkbox).toBeChecked();
    await userEvent.click(checkbox);
    expect(args.onCheckedChange).toHaveBeenCalledTimes(1);
  },
};

/* -------------------------------------------------------------------------
 * Keyboard interaction (2)
 * ---------------------------------------------------------------------- */

/**
 * Verifies the checkbox is reachable via Tab
 */
export const KeyboardFocusable: Story = {
  args: {
    children: "Tab to focus this checkbox",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    expect(checkbox).toHaveFocus();
  },
};

/**
 * Verifies the Space key toggles a focused checkbox
 */
export const KeyboardToggleWithSpace: Story = {
  args: {
    children: "Focus then press Space to toggle",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");
    checkbox.focus();
    await userEvent.keyboard(" ");
    expect(args.onCheckedChange).toHaveBeenCalledTimes(1);
  },
};

/* -------------------------------------------------------------------------
 * Rapid interaction / accessibility (2)
 * ---------------------------------------------------------------------- */

/**
 * Clicking an odd number of times ends in the checked state
 */
export const RapidToggleClicks: Story = {
  args: {
    children: "Click me three times",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");
    await userEvent.click(checkbox);
    await userEvent.click(checkbox);
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(args.onCheckedChange).toHaveBeenCalledTimes(3);
  },
};

/**
 * Confirms the hidden input exposes an implicit checkbox role and is
 * associated with its label for assistive technology
 */
export const AccessibleRoleAndCheckedState: Story = {
  args: {
    checked: true,
    children: "Accessible pre-checked example",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");
    expect(checkbox).toBeChecked();
    expect(checkbox).toHaveAttribute("aria-labelledby");
  },
};

/* -------------------------------------------------------------------------
 * Multiple checkboxes / groups (3)
 * ---------------------------------------------------------------------- */

/**
 * Two independently-controlled checkboxes that do not share state
 */
export const TwoIndependentCheckboxes: Story = {
  render: () => {
    const IndependentPair = () => {
      const [first, setFirst] = useState(false);
      const [second, setSecond] = useState(true);

      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Checkbox
            checked={first}
            onCheckedChange={(details) =>
              setFirst(
                typeof details.checked === "boolean"
                  ? details.checked
                  : details.checked === "on"
              )
            }
          >
            First checkbox ({first ? "checked" : "unchecked"})
          </Checkbox>
          <Checkbox
            checked={second}
            onCheckedChange={(details) =>
              setSecond(
                typeof details.checked === "boolean"
                  ? details.checked
                  : details.checked === "on"
              )
            }
          >
            Second checkbox ({second ? "checked" : "unchecked"})
          </Checkbox>
        </div>
      );
    };

    return <IndependentPair />;
  },
};

/**
 * A "select all" checkbox paired with individually toggleable items,
 * demonstrating a mixed/indeterminate-like controlled state
 */
export const SelectAllGroupPattern: Story = {
  render: () => {
    const SelectAllGroup = () => {
      const [items, setItems] = useState({
        apples: false,
        bananas: true,
        cherries: false,
      });

      const values = Object.values(items);
      const allChecked = values.every(Boolean);
      const someChecked = values.some(Boolean);
      const selectAllLabel = allChecked
        ? "All selected"
        : someChecked
          ? "Some selected"
          : "None selected";

      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Checkbox
            checked={allChecked}
            onCheckedChange={(details) => {
              const next =
                typeof details.checked === "boolean"
                  ? details.checked
                  : details.checked === "on";
              setItems({ apples: next, bananas: next, cherries: next });
            }}
          >
            <strong>{selectAllLabel}</strong>
          </Checkbox>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              paddingLeft: "24px",
            }}
          >
            {(Object.keys(items) as Array<keyof typeof items>).map((key) => (
              <Checkbox
                key={key}
                checked={items[key]}
                onCheckedChange={(details) =>
                  setItems((current) => ({
                    ...current,
                    [key]:
                      typeof details.checked === "boolean"
                        ? details.checked
                        : details.checked === "on",
                  }))
                }
              >
                {key}
              </Checkbox>
            ))}
          </div>
        </div>
      );
    };

    return <SelectAllGroup />;
  },
};

/**
 * A group of checkboxes where every item is disabled
 */
export const AllDisabledGroup: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Checkbox disabled name="optionA" value="a">
        Option A (disabled)
      </Checkbox>
      <Checkbox disabled checked name="optionB" value="b">
        Option B (disabled, checked)
      </Checkbox>
      <Checkbox disabled name="optionC" value="c">
        Option C (disabled)
      </Checkbox>
    </div>
  ),
};

/* -------------------------------------------------------------------------
 * Mixed disabled/enabled group (1)
 * ---------------------------------------------------------------------- */

/**
 * A group where only some checkboxes are disabled
 */
export const MixedDisabledGroup: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Checkbox name="planFree" value="free">
        Free plan
      </Checkbox>
      <Checkbox name="planPro" value="pro" disabled>
        Pro plan (unavailable)
      </Checkbox>
      <Checkbox name="planEnterprise" value="enterprise">
        Enterprise plan
      </Checkbox>
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
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            maxWidth: "320px",
          }}
        >
          <Checkbox name="rememberMe" value="yes">
            Remember me
          </Checkbox>
          <button
            type="submit"
            style={{
              padding: "8px 16px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
          {result && (
            <pre
              style={{
                margin: 0,
                padding: "8px",
                backgroundColor: "#f1f5f9",
                borderRadius: "4px",
                fontSize: "12px",
                whiteSpace: "pre-wrap",
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
 * Native required validation on submit (1)
 * ---------------------------------------------------------------------- */

/**
 * A required checkbox left unchecked shows the browser's native validation
 * message when the form is submitted
 */
export const RequiredValidationOnSubmit: Story = {
  render: () => {
    const ValidatedForm = () => {
      const [invalidMessage, setInvalidMessage] = useState<string | null>(null);
      const [submittedOk, setSubmittedOk] = useState(false);

      return (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmittedOk(true);
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            maxWidth: "320px",
          }}
        >
          <Checkbox
            name="agree"
            value="yes"
            required
            onCheckedChange={() => {
              setInvalidMessage(null);
              setSubmittedOk(false);
            }}
          >
            I agree to the terms (required)
          </Checkbox>
          <button
            type="submit"
            onInvalidCapture={(e) => {
              e.preventDefault();
              setInvalidMessage("Please check the box before submitting.");
            }}
            style={{
              padding: "8px 16px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
          {invalidMessage && (
            <span style={{ color: "#e81c61", fontSize: "14px" }}>
              {invalidMessage}
            </span>
          )}
          {submittedOk && (
            <span style={{ color: "#489524", fontSize: "14px" }}>
              Form submitted successfully.
            </span>
          )}
        </form>
      );
    };

    return <ValidatedForm />;
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
    <Checkbox {...args}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
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
    </Checkbox>
  ),
};

/**
 * Label content followed by a small "New" badge
 */
export const LabelWithBadgeSuffix: Story = {
  render: (args) => (
    <Checkbox {...args}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
        Early access features
        <span
          style={{
            fontSize: "10px",
            fontWeight: 700,
            color: "white",
            backgroundColor: "#66bf3c",
            borderRadius: "9999px",
            padding: "2px 6px",
          }}
        >
          NEW
        </span>
      </span>
    </Checkbox>
  ),
};

/* -------------------------------------------------------------------------
 * Background/container context (1)
 * ---------------------------------------------------------------------- */

/**
 * Checkbox rendered on a dark background
 */
export const OnDarkBackground: Story = {
  args: {
    children: "Works on dark backgrounds too",
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: "#0f172a", padding: "24px", borderRadius: "8px" }}>
        <Story />
      </div>
    ),
  ],
};

/* -------------------------------------------------------------------------
 * No change handler wired up (1)
 * ---------------------------------------------------------------------- */

/**
 * Checkbox with no onCheckedChange handler at all - still toggles its own
 * internal visual state since it behaves as uncontrolled
 */
export const NoChangeHandler: Story = {
  args: {
    onCheckedChange: undefined,
    children: "No change handler wired up",
  },
};

/* -------------------------------------------------------------------------
 * Disabled + checked without a label (1)
 * ---------------------------------------------------------------------- */

/**
 * Disabled and checked, with no label content
 */
export const DisabledCheckedNoLabel: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

/* -------------------------------------------------------------------------
 * Kitchen-sink combinations (2)
 * ---------------------------------------------------------------------- */

/**
 * Kitchen sink: checked, required, named/valued, with a label
 */
export const KitchenSinkCheckedRequiredNamed: Story = {
  args: {
    checked: true,
    required: true,
    name: "agreement",
    value: "yes",
    children: "Kitchen sink: checked, required, named",
  },
};

/**
 * Kitchen sink: disabled, read-only, and checked together
 */
export const KitchenSinkDisabledReadOnlyChecked: Story = {
  args: {
    disabled: true,
    readOnly: true,
    checked: true,
    required: true,
    name: "kitchenSink",
    value: "sink",
    children: "Kitchen sink: disabled + read-only + checked + required",
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
      "Supercalifragilisticexpialidocioustermsandconditionsacceptancecheckbox",
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "160px", wordBreak: "break-word" }}>
        <Story />
      </div>
    ),
  ],
};
