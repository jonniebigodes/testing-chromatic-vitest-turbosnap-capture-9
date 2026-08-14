import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, within, userEvent, expect } from "storybook/test";
import { useState } from "react";
import ChipInput from "./ChipInput";
import Form from "./Form";

const meta = {
  title: "Components/Form/ChipInput",
  component: ChipInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: false,
      description: "The controlled tag values",
    },
    defaultValue: {
      control: false,
      description: "The initial tag values when uncontrolled",
    },
    onValueChange: {
      description: "Callback fired whenever the tag values change",
    },
    label: {
      control: "text",
      description: "Content rendered as the field's label",
    },
    labelProps: {
      control: false,
      description: "Additional props forwarded to the underlying FieldLabel",
    },
    validationMessage: {
      control: "text",
      description: "Content rendered inside the ValidationMessage below the input",
    },
    validationStatus: {
      control: "select",
      options: ["error", "warning", "success", "info"],
      description: "The semantic status of the validation message",
    },
    invalid: {
      control: "boolean",
      description: "Whether the tags input is invalid",
    },
    disabled: {
      control: "boolean",
      description: "Whether the tags input is disabled",
    },
    readOnly: {
      control: "boolean",
      description: "Whether the tags input is read-only",
    },
    required: {
      control: "boolean",
      description: "Whether the tags input is required",
    },
    max: {
      control: "number",
      description: "The maximum number of tags allowed",
    },
    maxLength: {
      control: "number",
      description: "The maximum length of a single tag's text",
    },
    delimiter: {
      control: false,
      description: "The character (or pattern) that triggers a new tag",
    },
    editable: {
      control: "boolean",
      description: "Whether a tag can be edited in place after creation",
    },
    validate: {
      control: false,
      description: "Returns a boolean determining whether a tag can be added",
    },
    onValueInvalid: {
      description: "Callback fired when a tag is rejected (max or validate)",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text shown in the free-text entry input",
    },
    name: {
      control: "text",
      description: "The name attribute for the hidden input",
    },
    form: {
      control: "text",
      description: "The id of the form the hidden input is associated with",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Controls the control/tag padding and font size",
    },
    inverted: {
      control: "boolean",
      description: "Renders the input in inverted colors",
    },
    id: {
      control: "text",
      description: "The id of the root element",
    },
  },
  args: {
    onValueChange: fn(),
    onValueInvalid: fn(),
  },
} satisfies Meta<typeof ChipInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------
 * Size variants (3)
 * ---------------------------------------------------------------------- */

/**
 * Small size - tighter control/tag padding and smaller font
 */
export const SmallSize: Story = {
  args: {
    size: "small",
    label: "Tags",
    placeholder: "Add a tag",
    defaultValue: ["React", "Vitest"],
  },
};

/**
 * Medium size - the default control/tag padding and font
 */
export const MediumSize: Story = {
  args: {
    size: "medium",
    label: "Tags",
    placeholder: "Add a tag",
    defaultValue: ["React", "Vitest"],
  },
};

/**
 * Large size - roomier control/tag padding and larger font
 */
export const LargeSize: Story = {
  args: {
    size: "large",
    label: "Tags",
    placeholder: "Add a tag",
    defaultValue: ["React", "Vitest"],
  },
};

/* -------------------------------------------------------------------------
 * Validation status paired with label (4)
 * ---------------------------------------------------------------------- */

/**
 * Error validation status with a paired message
 */
export const ErrorStatus: Story = {
  args: {
    label: "Skills",
    defaultValue: ["JavaScript"],
    invalid: true,
    validationStatus: "error",
    validationMessage: "At least two skills are required",
  },
};

/**
 * Warning validation status with a paired message
 */
export const WarningStatus: Story = {
  args: {
    label: "Skills",
    defaultValue: ["JavaScript", "TypeScript"],
    validationStatus: "warning",
    validationMessage: "Consider adding a design skill too",
  },
};

/**
 * Success validation status with a paired message
 */
export const SuccessStatus: Story = {
  args: {
    label: "Skills",
    defaultValue: ["JavaScript", "TypeScript", "React"],
    validationStatus: "success",
    validationMessage: "Great, that's a well-rounded skill set",
  },
};

/**
 * Info validation status with a paired message
 */
export const InfoStatus: Story = {
  args: {
    label: "Skills",
    defaultValue: ["JavaScript"],
    validationStatus: "info",
    validationMessage: "Press Enter or comma to add a skill",
  },
};

/* -------------------------------------------------------------------------
 * invalid alone, without a message (1)
 * ---------------------------------------------------------------------- */

/**
 * Invalid styling applied without an accompanying validation message
 */
export const InvalidWithoutMessage: Story = {
  args: {
    label: "Tags",
    defaultValue: ["broken-tag"],
    invalid: true,
  },
};

/* -------------------------------------------------------------------------
 * Disabled / ReadOnly / Required (3)
 * ---------------------------------------------------------------------- */

/**
 * Disabled - cannot be focused, typed into, or edited
 */
export const Disabled: Story = {
  args: {
    label: "Tags",
    defaultValue: ["Locked", "Cannot edit"],
    disabled: true,
  },
};

/**
 * Read-only - focusable but new tags cannot be added or removed
 */
export const ReadOnly: Story = {
  args: {
    label: "Tags",
    defaultValue: ["Read-only", "Tag"],
    readOnly: true,
  },
};

/**
 * Required - reflected on the hidden input for native form validation
 */
export const Required: Story = {
  args: {
    label: "Tags",
    placeholder: "Add at least one tag",
    required: true,
  },
};

/* -------------------------------------------------------------------------
 * Controlled vs uncontrolled (2)
 * ---------------------------------------------------------------------- */

/**
 * Controlled usage via useState, mirroring value/onValueChange externally
 */
export const ControlledState: Story = {
  render: (args) => {
    const ControlledDemo = () => {
      const [value, setValue] = useState<string[]>(["Controlled"]);

      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "320px" }}>
          <ChipInput
            {...args}
            value={value}
            onValueChange={(details) => {
              setValue(details.value);
              args.onValueChange?.(details);
            }}
          />
          <span style={{ fontSize: "12px", color: "#64748b" }}>
            Current value: {value.join(", ") || "(empty)"}
          </span>
        </div>
      );
    };

    return <ControlledDemo />;
  },
  args: {
    label: "Controlled tags",
    placeholder: "Add a tag",
  },
};

/**
 * Uncontrolled usage seeded via defaultValue
 */
export const UncontrolledDefaultValue: Story = {
  args: {
    label: "Uncontrolled tags",
    defaultValue: ["Seeded", "From", "defaultValue"],
    placeholder: "Add a tag",
  },
};

/* -------------------------------------------------------------------------
 * Prefilled with multiple default tags (1)
 * ---------------------------------------------------------------------- */

/**
 * Prefilled with several default tags rendered as distinct chips
 */
export const PrefilledTags: Story = {
  args: {
    label: "Frameworks",
    defaultValue: ["React", "Vue", "Svelte", "Solid"],
  },
};

/* -------------------------------------------------------------------------
 * Empty placeholder-only state (1)
 * ---------------------------------------------------------------------- */

/**
 * Empty state showing only the placeholder, no tags rendered
 */
export const EmptyPlaceholder: Story = {
  args: {
    label: "Tags",
    placeholder: "Type and press Enter",
  },
};

/* -------------------------------------------------------------------------
 * Add tag via Enter (play) (1)
 * ---------------------------------------------------------------------- */

/**
 * Typing text and pressing Enter creates a new tag
 */
export const AddTagOnEnter: Story = {
  args: {
    label: "Add via Enter",
    placeholder: "Add a tag",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Add a tag");

    await userEvent.type(input, "Storybook");
    await userEvent.keyboard("{Enter}");

    expect(canvas.getByText("Storybook")).toBeTruthy();
  },
};

/* -------------------------------------------------------------------------
 * Add tag via comma delimiter (play) (1)
 * ---------------------------------------------------------------------- */

/**
 * Typing a comma-separated value creates a new tag at the delimiter
 */
export const AddTagOnComma: Story = {
  args: {
    label: "Add via comma",
    placeholder: "Add a tag",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Add a tag");

    await userEvent.type(input, "Vitest,");

    expect(canvas.getByText("Vitest")).toBeTruthy();
  },
};

/* -------------------------------------------------------------------------
 * Custom delimiter demo (1)
 * ---------------------------------------------------------------------- */

/**
 * Using a semicolon as the delimiter instead of the default comma
 */
export const CustomDelimiter: Story = {
  args: {
    label: "Semicolon separated",
    placeholder: "Add a tag, then press ;",
    delimiter: ";",
  },
};

/* -------------------------------------------------------------------------
 * Remove tag via ItemDeleteTrigger (play) (1)
 * ---------------------------------------------------------------------- */

/**
 * Clicking a tag's delete trigger removes only that tag
 */
export const RemoveTag: Story = {
  args: {
    label: "Remove a tag",
    defaultValue: ["Keep", "Remove me", "Also keep"],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const deleteButton = canvas.getByRole("button", {
      name: /remove me/i,
    });

    await userEvent.click(deleteButton);

    expect(canvas.queryByText("Remove me")).toBeNull();
    expect(canvas.getByText("Keep")).toBeTruthy();
    expect(canvas.getByText("Also keep")).toBeTruthy();
  },
};

/* -------------------------------------------------------------------------
 * Editable tag demo (1)
 * ---------------------------------------------------------------------- */

/**
 * Double-clicking a tag enters inline edit mode, pre-filled with its value
 */
export const EditableTag: Story = {
  args: {
    label: "Double-click a tag to edit",
    defaultValue: ["Editable"],
    editable: true,
  },
};

/* -------------------------------------------------------------------------
 * editable=false demo (1)
 * ---------------------------------------------------------------------- */

/**
 * With editable=false, double-clicking a tag does nothing
 */
export const EditableDisabled: Story = {
  args: {
    label: "Tags cannot be edited",
    defaultValue: ["Locked shape"],
    editable: false,
  },
};

/* -------------------------------------------------------------------------
 * max limit reached demo (1)
 * ---------------------------------------------------------------------- */

/**
 * Attempting to add a tag beyond the max count is rejected
 */
export const MaxLimitReached: Story = {
  args: {
    label: "Max 3 tags",
    defaultValue: ["One", "Two", "Three"],
    max: 3,
    placeholder: "Try adding a 4th tag",
  },
};

/* -------------------------------------------------------------------------
 * maxLength demo (1)
 * ---------------------------------------------------------------------- */

/**
 * A tag's text is capped at the configured maxLength
 */
export const MaxLengthPerTag: Story = {
  args: {
    label: "Max 10 characters per tag",
    maxLength: 10,
    placeholder: "Type a long value",
  },
};

/* -------------------------------------------------------------------------
 * Duplicate rejection via validate (1)
 * ---------------------------------------------------------------------- */

/**
 * A validate function rejects values that already exist in the tag list
 */
export const DuplicateRejection: Story = {
  args: {
    label: "No duplicate tags",
    defaultValue: ["Unique"],
    placeholder: "Try adding 'Unique' again",
    validate: ({ value, inputValue }) => !value.includes(inputValue),
  },
};

/* -------------------------------------------------------------------------
 * Custom validate demo, minimum length requirement (1)
 * ---------------------------------------------------------------------- */

/**
 * A custom validate function enforces a minimum tag length of 3 characters
 */
export const CustomValidateMinLength: Story = {
  args: {
    label: "Minimum 3 characters",
    placeholder: "Try a short value like 'ab'",
    validate: ({ inputValue }) => inputValue.trim().length >= 3,
  },
};

/* -------------------------------------------------------------------------
 * Clear all tags via ClearTrigger (play) (1)
 * ---------------------------------------------------------------------- */

/**
 * Clicking the ClearTrigger removes all tags at once
 */
export const ClearAllTags: Story = {
  args: {
    label: "Clear all",
    defaultValue: ["One", "Two", "Three"],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const clearButton = canvas.getByRole("button", { name: /clear/i });

    await userEvent.click(clearButton);

    expect(canvas.queryByText("One")).toBeNull();
    expect(canvas.queryByText("Two")).toBeNull();
    expect(canvas.queryByText("Three")).toBeNull();
  },
};

/* -------------------------------------------------------------------------
 * Many tags (10+), wrapping layout (1)
 * ---------------------------------------------------------------------- */

/**
 * Many tags demonstrate the control wrapping onto multiple lines
 */
export const ManyTags: Story = {
  args: {
    label: "Many tags",
    defaultValue: [
      "Alpha",
      "Bravo",
      "Charlie",
      "Delta",
      "Echo",
      "Foxtrot",
      "Golf",
      "Hotel",
      "India",
      "Juliett",
      "Kilo",
      "Lima",
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ width: "360px" }}>
        <Story />
      </div>
    ),
  ],
};

/* -------------------------------------------------------------------------
 * One very long single tag value (1)
 * ---------------------------------------------------------------------- */

/**
 * A single very long tag value is preserved in full, not silently truncated
 */
export const VeryLongTag: Story = {
  args: {
    label: "Long tag value",
    defaultValue: [
      "this-is-a-very-long-tag-value-that-keeps-going-and-going-to-test-wrapping-and-overflow-behavior",
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ width: "320px" }}>
        <Story />
      </div>
    ),
  ],
};

/* -------------------------------------------------------------------------
 * Inverted crossed with size (3)
 * ---------------------------------------------------------------------- */

/**
 * Inverted colors at the small size
 */
export const InvertedSmall: Story = {
  args: {
    label: "Inverted small",
    size: "small",
    inverted: true,
    defaultValue: ["Dark", "Mode"],
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "24px", backgroundColor: "#1a2233" }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Inverted colors at the medium size
 */
export const InvertedMedium: Story = {
  args: {
    label: "Inverted medium",
    size: "medium",
    inverted: true,
    defaultValue: ["Dark", "Mode"],
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "24px", backgroundColor: "#1a2233" }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Inverted colors at the large size
 */
export const InvertedLarge: Story = {
  args: {
    label: "Inverted large",
    size: "large",
    inverted: true,
    defaultValue: ["Dark", "Mode"],
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "24px", backgroundColor: "#1a2233" }}>
        <Story />
      </div>
    ),
  ],
};

/* -------------------------------------------------------------------------
 * Inverted + invalid combined (1)
 * ---------------------------------------------------------------------- */

/**
 * Inverted colors combined with an invalid state and message
 */
export const InvertedInvalid: Story = {
  args: {
    label: "Inverted invalid",
    inverted: true,
    invalid: true,
    defaultValue: ["Broken"],
    validationStatus: "error",
    validationMessage: "This field has an error",
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "24px", backgroundColor: "#1a2233" }}>
        <Story />
      </div>
    ),
  ],
};

/* -------------------------------------------------------------------------
 * RTL / unicode / emoji tag values (2)
 * ---------------------------------------------------------------------- */

/**
 * Right-to-left and unicode tag values render and preserve their text exactly
 */
export const RtlUnicodeValues: Story = {
  args: {
    label: "עברית / العربية",
    defaultValue: ["שלום", "مرحبا", "こんにちは"],
  },
};

/**
 * Emoji tag values are preserved exactly, including multi-codepoint emoji
 */
export const EmojiValues: Story = {
  args: {
    label: "Emoji tags",
    defaultValue: ["🚀 launch", "🎉 party", "👩‍💻 dev"],
  },
};

/* -------------------------------------------------------------------------
 * Special characters within a tag's text (1)
 * ---------------------------------------------------------------------- */

/**
 * A tag containing symbols and punctuation renders as literal text
 */
export const SpecialCharacters: Story = {
  args: {
    label: "Special characters",
    defaultValue: ["C++ & C#", "100% done!", "<script>alert()</script>"],
  },
};

/* -------------------------------------------------------------------------
 * Size crossed with status (2)
 * ---------------------------------------------------------------------- */

/**
 * Small size paired with an error validation status
 */
export const SmallError: Story = {
  args: {
    label: "Small + error",
    size: "small",
    defaultValue: ["Tag"],
    invalid: true,
    validationStatus: "error",
    validationMessage: "Something is wrong",
  },
};

/**
 * Large size paired with a success validation status
 */
export const LargeSuccess: Story = {
  args: {
    label: "Large + success",
    size: "large",
    defaultValue: ["Tag"],
    validationStatus: "success",
    validationMessage: "Looks good",
  },
};

/* -------------------------------------------------------------------------
 * Size crossed with disabled (2)
 * ---------------------------------------------------------------------- */

/**
 * Small size while disabled
 */
export const SmallDisabled: Story = {
  args: {
    label: "Small + disabled",
    size: "small",
    defaultValue: ["Locked"],
    disabled: true,
  },
};

/**
 * Large size while disabled
 */
export const LargeDisabled: Story = {
  args: {
    label: "Large + disabled",
    size: "large",
    defaultValue: ["Locked"],
    disabled: true,
  },
};

/* -------------------------------------------------------------------------
 * name attribute form-submission demo (1)
 * ---------------------------------------------------------------------- */

/**
 * The name attribute wires the hidden input up for native form submission
 */
export const NameAttributeFormSubmission: Story = {
  args: {
    label: "Tags (check the DOM hidden input)",
    name: "tags",
    defaultValue: ["form-ready", "submit-me"],
  },
};

/* -------------------------------------------------------------------------
 * Composition inside the existing Form component (2)
 * ---------------------------------------------------------------------- */

/**
 * ChipInput composed inside the Form component, prefilled with tags
 */
export const InsideForm: Story = {
  render: (args) => (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        alert(JSON.stringify(Object.fromEntries(formData), null, 2));
      }}
    >
      <ChipInput {...args} />
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
        }}
      >
        Submit
      </button>
    </Form>
  ),
  args: {
    label: "Tags",
    name: "tags",
    defaultValue: ["Preset", "Tags"],
  },
};

/**
 * ChipInput composed inside the Form component with a validation message
 */
export const InsideFormWithValidation: Story = {
  render: (args) => (
    <Form>
      <ChipInput {...args} />
    </Form>
  ),
  args: {
    label: "Required tags",
    name: "tags",
    required: true,
    invalid: true,
    validationStatus: "error",
    validationMessage: "Please add at least one tag",
  },
};

/* -------------------------------------------------------------------------
 * No label vs with label (2)
 * ---------------------------------------------------------------------- */

/**
 * ChipInput rendered without a label
 */
export const WithoutLabel: Story = {
  args: {
    placeholder: "No label here",
  },
};

/**
 * ChipInput rendered with a label
 */
export const WithLabel: Story = {
  args: {
    label: "Tags",
    placeholder: "Add a tag",
  },
};

/* -------------------------------------------------------------------------
 * Keyboard arrow-key highlight navigation demo (1)
 * ---------------------------------------------------------------------- */

/**
 * Arrow keys move the highlighted state between existing tags
 */
export const KeyboardArrowNavigation: Story = {
  args: {
    label: "Use arrow keys to navigate tags",
    defaultValue: ["First", "Second", "Third"],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    (input as HTMLElement).focus();
    await userEvent.keyboard("{ArrowLeft}");
    let highlighted = canvasElement.querySelector("[data-highlighted]");
    expect(highlighted?.textContent).toContain("Third");

    await userEvent.keyboard("{ArrowLeft}");
    highlighted = canvasElement.querySelector("[data-highlighted]");
    expect(highlighted?.textContent).toContain("Second");
  },
};

/* -------------------------------------------------------------------------
 * Kitchen-sink (1)
 * ---------------------------------------------------------------------- */

/**
 * Kitchen-sink demo combining a label, validation, custom delimiter and max
 */
export const KitchenSink: Story = {
  args: {
    label: "Kitchen sink",
    labelProps: { requiredIndicator: "(required)" },
    required: true,
    defaultValue: ["one", "two"],
    delimiter: ";",
    max: 5,
    maxLength: 20,
    placeholder: "Add up to 5 tags, separated by ;",
    validationStatus: "info",
    validationMessage: "Separate tags with a semicolon, max 5 tags",
    size: "medium",
  },
};

/* -------------------------------------------------------------------------
 * Prefilled tags reaching exactly the max boundary (1)
 * ---------------------------------------------------------------------- */

/**
 * Prefilled tags exactly at the max boundary, not exceeding it
 */
export const PrefilledAtMaxBoundary: Story = {
  args: {
    label: "Exactly at max (3)",
    defaultValue: ["One", "Two", "Three"],
    max: 3,
    placeholder: "Input disabled once at max",
  },
};

/* -------------------------------------------------------------------------
 * Tag order preservation demo (1)
 * ---------------------------------------------------------------------- */

/**
 * Add, remove, then add again - the final order reflects the operations
 */
export const TagOrderPreservation: Story = {
  render: (args) => {
    const OrderDemo = () => {
      const [value, setValue] = useState<string[]>(["Alpha", "Beta", "Gamma"]);

      return (
        <ChipInput
          {...args}
          value={value}
          onValueChange={(details) => setValue(details.value)}
        />
      );
    };

    return <OrderDemo />;
  },
  args: {
    label: "Order is preserved through add/remove/add",
  },
};

/* -------------------------------------------------------------------------
 * Backspace removes last tag (play) (1)
 * ---------------------------------------------------------------------- */

/**
 * Pressing Backspace with an empty input removes the most recently added tag
 */
export const BackspaceRemovesLast: Story = {
  args: {
    label: "Backspace to remove",
    defaultValue: ["Keep", "Remove via backspace"],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    (input as HTMLElement).focus();
    // The first Backspace highlights the last tag, the second deletes it -
    // this mirrors the familiar "chip" interaction pattern (e.g. Gmail's
    // recipient field).
    await userEvent.keyboard("{Backspace}");
    await userEvent.keyboard("{Backspace}");

    expect(canvas.queryByText("Remove via backspace")).toBeNull();
    expect(canvas.getByText("Keep")).toBeTruthy();
  },
};

/* -------------------------------------------------------------------------
 * Placeholder hidden once at least one tag exists (1)
 * ---------------------------------------------------------------------- */

/**
 * The placeholder is only shown while the tag list is empty
 */
export const PlaceholderHiddenWithTags: Story = {
  args: {
    label: "Placeholder visibility",
    placeholder: "You will not see this once a tag exists",
    defaultValue: ["Already has a tag"],
  },
};
