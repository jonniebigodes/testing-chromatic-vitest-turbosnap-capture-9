import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ark } from "@ark-ui/react/factory";
import { within, userEvent, expect } from "storybook/test";
import TextArea from "./TextArea";
import Form from "./Form";
import { color } from "../../tokens/tokens";

const meta = {
  title: "Components/Form/TextArea",
  component: TextArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Visible label content, rendered above the textarea",
    },
    validationMessage: {
      control: "text",
      description: "Visible validation feedback rendered below the textarea",
    },
    validationStatus: {
      control: "select",
      options: ["error", "warning", "success", "info"],
      description:
        "Status of validationMessage. Defaults to 'error' when invalid is true.",
    },
    invalid: {
      control: "boolean",
      description: "Whether the textarea has failed validation",
    },
    disabled: {
      control: "boolean",
      description: "Whether the textarea is disabled",
    },
    required: {
      control: "boolean",
      description: "Whether the textarea is required",
    },
    readOnly: {
      control: "boolean",
      description: "Whether the textarea is read-only",
    },
    autoresize: {
      control: "boolean",
      description: "Whether the textarea automatically grows with content",
    },
    inverted: {
      control: "boolean",
      description: "Renders the textarea in inverted colors",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Controls padding, font size and minimum height",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    rows: {
      control: "number",
      description: "Number of visible text lines",
    },
    maxLength: {
      control: "number",
      description: "Maximum number of characters allowed",
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const wrapperStyle = { minWidth: "360px", padding: "16px" };
const invertedWrapperStyle = {
  minWidth: "360px",
  padding: "32px",
  backgroundColor: color.slate800,
  borderRadius: "8px",
};

const shortParagraph =
  "Line one of the message.\nLine two adds a bit more detail.\nLine three pushes the content further down.\nLine four should force the textarea to grow when autoresize is enabled.";

const longParagraph = Array.from(
  { length: 8 },
  (_, i) => `Paragraph ${i + 1}: this is a long line of pre-filled content used to test rows and overflow behavior.`
).join("\n");

/* ------------------------------------------------------------------------ */
/* Size variants (3)                                                        */
/* ------------------------------------------------------------------------ */

export const SizeSmall: Story = {
  args: {
    id: "size-small",
    label: "Small textarea",
    size: "small",
    placeholder: "Small size",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

export const SizeMedium: Story = {
  args: {
    id: "size-medium",
    label: "Medium textarea",
    size: "medium",
    placeholder: "Medium size (default)",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

export const SizeLarge: Story = {
  args: {
    id: "size-large",
    label: "Large textarea",
    size: "large",
    placeholder: "Large size",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

/* ------------------------------------------------------------------------ */
/* Validation status (4)                                                    */
/* ------------------------------------------------------------------------ */

export const StatusError: Story = {
  args: {
    id: "status-error",
    label: "Comments",
    invalid: true,
    validationStatus: "error",
    validationMessage: "Comments are required",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

export const StatusWarning: Story = {
  args: {
    id: "status-warning",
    label: "Feedback",
    validationStatus: "warning",
    validationMessage: "Your feedback is quite short - consider adding more detail",
    defaultValue: "It was fine.",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

export const StatusSuccess: Story = {
  args: {
    id: "status-success",
    label: "Bio",
    validationStatus: "success",
    validationMessage: "Looks great!",
    defaultValue: "I build things for the web and enjoy hiking on weekends.",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

export const StatusInfo: Story = {
  args: {
    id: "status-info",
    label: "Notes",
    validationStatus: "info",
    validationMessage: "Notes are visible only to your team",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

/* ------------------------------------------------------------------------ */
/* invalid alone / message alone / both (3)                                 */
/* ------------------------------------------------------------------------ */

export const InvalidWithoutMessage: Story = {
  args: {
    id: "invalid-no-message",
    label: "Description",
    invalid: true,
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

export const MessageWithoutInvalid: Story = {
  args: {
    id: "message-no-invalid",
    label: "Description",
    validationStatus: "info",
    validationMessage: "Markdown is supported",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

export const InvalidWithMessage: Story = {
  args: {
    id: "invalid-with-message",
    label: "Description",
    invalid: true,
    validationMessage: "Description must be at least 20 characters",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

/* ------------------------------------------------------------------------ */
/* Disabled / ReadOnly / Required (3)                                       */
/* ------------------------------------------------------------------------ */

export const Disabled: Story = {
  args: {
    id: "disabled-textarea",
    label: "Disabled field",
    disabled: true,
    defaultValue: "This content cannot be edited",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

export const ReadOnly: Story = {
  args: {
    id: "readonly-textarea",
    label: "Read-only field",
    readOnly: true,
    defaultValue: "This content can be focused but not edited",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

export const Required: Story = {
  args: {
    id: "required-textarea",
    label: "Required field",
    required: true,
    placeholder: "This field must be filled in",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

/* ------------------------------------------------------------------------ */
/* Autoresize on vs off (2)                                                 */
/* ------------------------------------------------------------------------ */

export const AutoresizeOn: Story = {
  args: {
    id: "autoresize-on",
    label: "Autoresize enabled",
    autoresize: true,
    defaultValue: shortParagraph,
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

export const AutoresizeOff: Story = {
  args: {
    id: "autoresize-off",
    label: "Autoresize disabled",
    autoresize: false,
    defaultValue: shortParagraph,
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

/* ------------------------------------------------------------------------ */
/* Controlled vs uncontrolled (2)                                           */
/* ------------------------------------------------------------------------ */

export const Controlled: Story = {
  render: () => {
    const ControlledDemo = () => {
      const [value, setValue] = useState("Controlled content");
      return (
        <TextArea
          id="controlled-textarea"
          label="Controlled textarea"
          value={value}
          onValueChange={setValue}
        />
      );
    };
    return (
      <ark.div style={wrapperStyle}>
        <ControlledDemo />
      </ark.div>
    );
  },
};

export const Uncontrolled: Story = {
  args: {
    id: "uncontrolled-textarea",
    label: "Uncontrolled textarea",
    defaultValue: "Initial uncontrolled content",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

/* ------------------------------------------------------------------------ */
/* Inverted crossed with default/disabled/invalid/required (4)              */
/* ------------------------------------------------------------------------ */

export const InvertedDefault: Story = {
  args: {
    id: "inverted-default",
    label: "Inverted textarea",
    inverted: true,
    placeholder: "Type something...",
  },
  render: (args) => (
    <ark.div style={invertedWrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

export const InvertedDisabled: Story = {
  args: {
    id: "inverted-disabled",
    label: "Inverted disabled",
    inverted: true,
    disabled: true,
    defaultValue: "Disabled inverted content",
  },
  render: (args) => (
    <ark.div style={invertedWrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

export const InvertedInvalid: Story = {
  args: {
    id: "inverted-invalid",
    label: "Inverted invalid",
    inverted: true,
    invalid: true,
    validationMessage: "This field has an error",
  },
  render: (args) => (
    <ark.div style={invertedWrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

export const InvertedRequired: Story = {
  args: {
    id: "inverted-required",
    label: "Inverted required",
    inverted: true,
    required: true,
    placeholder: "Required in dark mode",
  },
  render: (args) => (
    <ark.div style={invertedWrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

/* ------------------------------------------------------------------------ */
/* Placeholder-only empty state (1)                                        */
/* ------------------------------------------------------------------------ */

export const PlaceholderOnly: Story = {
  args: {
    id: "placeholder-only",
    placeholder: "Nothing has been typed yet",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

/* ------------------------------------------------------------------------ */
/* Pre-filled long content with custom rows override (2)                    */
/* ------------------------------------------------------------------------ */

export const LongContentFewRows: Story = {
  args: {
    id: "long-content-few-rows",
    label: "Long content, 3 rows",
    rows: 3,
    defaultValue: longParagraph,
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

export const LongContentManyRows: Story = {
  args: {
    id: "long-content-many-rows",
    label: "Long content, 12 rows",
    rows: 12,
    defaultValue: longParagraph,
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

/* ------------------------------------------------------------------------ */
/* maxLength enforcement (2)                                                */
/* ------------------------------------------------------------------------ */

export const MaxLengthNearLimit: Story = {
  args: {
    id: "maxlength-near",
    label: "Tweet-style note (max 20)",
    maxLength: 20,
    defaultValue: "Almost at the limit",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

export const MaxLengthAtLimit: Story = {
  args: {
    id: "maxlength-at",
    label: "Tweet-style note (max 20)",
    maxLength: 20,
    defaultValue: "Exactly twenty chars",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

/* ------------------------------------------------------------------------ */
/* No label vs label without htmlFor/id (2)                                 */
/* ------------------------------------------------------------------------ */

export const NoLabel: Story = {
  args: {
    placeholder: "No visible label rendered",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

export const LabelWithoutId: Story = {
  args: {
    label: "Label present, but no id given",
    placeholder: "htmlFor won't be wired up here",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

/* ------------------------------------------------------------------------ */
/* Composition inside Form (2)                                              */
/* ------------------------------------------------------------------------ */

export const InFormBasic: Story = {
  render: () => (
    <Form>
      <TextArea id="form-message" label="Message" placeholder="Write your message" />
    </Form>
  ),
};

export const InFormWithValidation: Story = {
  render: () => (
    <Form>
      <TextArea
        id="form-bio"
        label="Bio"
        required
        invalid
        validationMessage="Bio is required"
        placeholder="Tell us about yourself"
      />
      <TextArea
        id="form-notes"
        label="Notes"
        validationStatus="info"
        validationMessage="Optional field"
        placeholder="Anything else?"
      />
    </Form>
  ),
};

/* ------------------------------------------------------------------------ */
/* Long no-space word forcing overflow handling (1)                        */
/* ------------------------------------------------------------------------ */

export const LongUnbrokenWord: Story = {
  args: {
    id: "long-unbroken-word",
    label: "Overflow test",
    defaultValue:
      "Supercalifragilisticexpialidocioussupercalifragilisticexpialidocioussupercalifragilisticexpialidocious",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

/* ------------------------------------------------------------------------ */
/* RTL / unicode / emoji content (2)                                       */
/* ------------------------------------------------------------------------ */

export const RTLContent: Story = {
  args: {
    id: "rtl-content",
    label: "نص عربي",
    dir: "rtl",
    defaultValue: "هذا نص تجريبي باللغة العربية للتحقق من الاتجاه من اليمين إلى اليسار",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

export const UnicodeEmojiContent: Story = {
  args: {
    id: "unicode-emoji-content",
    label: "Unicode & emoji",
    defaultValue: "🎉 Héllo Wörld 日本語 中文 Ñandú 😀💬✨",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

/* ------------------------------------------------------------------------ */
/* Empty value vs whitespace-only value (2)                                */
/* ------------------------------------------------------------------------ */

export const EmptyValue: Story = {
  args: {
    id: "empty-value",
    label: "Empty value",
    defaultValue: "",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

export const WhitespaceOnlyValue: Story = {
  args: {
    id: "whitespace-only-value",
    label: "Whitespace-only value",
    defaultValue: "   ",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

/* ------------------------------------------------------------------------ */
/* rows variations (2)                                                      */
/* ------------------------------------------------------------------------ */

export const RowsTwo: Story = {
  args: {
    id: "rows-two",
    label: "Rows: 2",
    rows: 2,
    placeholder: "Short textarea",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

export const RowsEight: Story = {
  args: {
    id: "rows-eight",
    label: "Rows: 8",
    rows: 8,
    placeholder: "Tall textarea",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

/* ------------------------------------------------------------------------ */
/* Focus/blur visual demo (1)                                              */
/* ------------------------------------------------------------------------ */

export const FocusBlurDemo: Story = {
  args: {
    id: "focus-blur-demo",
    label: "Focus me",
    placeholder: "Click in and out to see the border change",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByPlaceholderText(
      "Click in and out to see the border change"
    ) as HTMLTextAreaElement;

    await userEvent.click(textarea);
    await expect(textarea.style.borderColor).not.toBe("");

    await userEvent.tab();
    await expect(textarea.style.boxShadow).toBe("none");
  },
};

/* ------------------------------------------------------------------------ */
/* aria-describedby wiring demo (1)                                        */
/* ------------------------------------------------------------------------ */

export const AriaDescribedByWiring: Story = {
  args: {
    id: "aria-describedby-demo",
    label: "Aria wiring demo",
    invalid: true,
    validationMessage: "This value is invalid",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByLabelText("Aria wiring demo");
    const describedBy = textarea.getAttribute("aria-describedby");
    await expect(describedBy).toBe("aria-describedby-demo-validation");
    const message = canvasElement.querySelector(`#${describedBy}`);
    await expect(message).not.toBeNull();
  },
};

/* ------------------------------------------------------------------------ */
/* Size crossed with status (2)                                            */
/* ------------------------------------------------------------------------ */

export const SmallError: Story = {
  args: {
    id: "small-error",
    label: "Small + error",
    size: "small",
    invalid: true,
    validationMessage: "This field is required",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

export const LargeSuccess: Story = {
  args: {
    id: "large-success",
    label: "Large + success",
    size: "large",
    validationStatus: "success",
    validationMessage: "Looks good!",
    defaultValue: "A nicely detailed response that fills a large textarea.",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

/* ------------------------------------------------------------------------ */
/* Custom labelProps (1)                                                   */
/* ------------------------------------------------------------------------ */

export const CustomLabelProps: Story = {
  args: {
    id: "custom-label-props",
    label: "Small label, large field",
    size: "large",
    labelProps: { size: "small" },
    placeholder: "The label above uses a smaller font than usual",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

/* ------------------------------------------------------------------------ */
/* Long label text wrapping (1)                                            */
/* ------------------------------------------------------------------------ */

export const LongLabelText: Story = {
  args: {
    id: "long-label-text",
    label:
      "This is a deliberately long label that should wrap across multiple lines to verify the FieldLabel handles long content gracefully without breaking the layout",
    placeholder: "Field with a very long label",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

/* ------------------------------------------------------------------------ */
/* Live typing preview (1)                                                 */
/* ------------------------------------------------------------------------ */

export const LiveTypingPreview: Story = {
  render: () => {
    const LiveTypingDemo = () => {
      const [value, setValue] = useState("");
      return (
        <ark.div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <TextArea
            id="live-typing-preview"
            label="Type here"
            value={value}
            onValueChange={setValue}
            placeholder="Start typing..."
          />
          <ark.span style={{ fontSize: "12px", color: color.slate500 }}>
            {value.length} characters
          </ark.span>
        </ark.div>
      );
    };
    return (
      <ark.div style={wrapperStyle}>
        <LiveTypingDemo />
      </ark.div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByPlaceholderText("Start typing...");
    await userEvent.type(textarea, "Hello!");
    await expect(textarea).toHaveValue("Hello!");
    await expect(canvas.getByText("6 characters")).toBeInTheDocument();
  },
};

/* ------------------------------------------------------------------------ */
/* Kitchen-sink (1)                                                         */
/* ------------------------------------------------------------------------ */

export const KitchenSink: Story = {
  args: {
    id: "kitchen-sink",
    label: "Detailed feedback",
    required: true,
    size: "large",
    autoresize: true,
    maxLength: 240,
    validationStatus: "warning",
    validationMessage: "You're approaching the character limit",
    defaultValue: shortParagraph,
    placeholder: "Share as much detail as you can",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

/* ------------------------------------------------------------------------ */
/* Size crossed with disabled (2)                                          */
/* ------------------------------------------------------------------------ */

export const SmallDisabled: Story = {
  args: {
    id: "small-disabled",
    label: "Small + disabled",
    size: "small",
    disabled: true,
    defaultValue: "Cannot edit this",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

export const LargeDisabled: Story = {
  args: {
    id: "large-disabled",
    label: "Large + disabled",
    size: "large",
    disabled: true,
    defaultValue: "Cannot edit this either",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

/* ------------------------------------------------------------------------ */
/* Size crossed with inverted (2)                                          */
/* ------------------------------------------------------------------------ */

export const SmallInverted: Story = {
  args: {
    id: "small-inverted",
    label: "Small + inverted",
    size: "small",
    inverted: true,
    placeholder: "Small on dark background",
  },
  render: (args) => (
    <ark.div style={invertedWrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

export const LargeInverted: Story = {
  args: {
    id: "large-inverted",
    label: "Large + inverted",
    size: "large",
    inverted: true,
    placeholder: "Large on dark background",
  },
  render: (args) => (
    <ark.div style={invertedWrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};

/* ------------------------------------------------------------------------ */
/* Autoresize + maxLength combined (1)                                     */
/* ------------------------------------------------------------------------ */

export const AutoresizeWithMaxLength: Story = {
  args: {
    id: "autoresize-maxlength",
    label: "Autoresize capped by maxLength",
    autoresize: true,
    maxLength: 80,
    defaultValue: "This textarea grows as you type, but stops once it hits the character cap.",
  },
  render: (args) => (
    <ark.div style={wrapperStyle}>
      <TextArea {...args} />
    </ark.div>
  ),
};
