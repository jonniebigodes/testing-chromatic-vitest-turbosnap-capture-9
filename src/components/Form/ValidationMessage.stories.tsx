import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ark } from "@ark-ui/react/factory";
import ValidationMessage from "./ValidationMessage";
import type { ValidationStatus } from "./ValidationMessage";

const meta = {
  title: "Components/Form/ValidationMessage",
  component: ValidationMessage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["error", "warning", "success", "info"],
      description: "The semantic status of the message",
    },
    message: {
      control: "text",
      description: "The message content to display",
    },
    children: {
      control: "text",
      description: "Content to display instead of message (wins if both given)",
    },
    id: {
      control: "text",
      description: "Id for the message element, for aria-describedby wiring",
    },
    showIcon: {
      control: "boolean",
      description: "Whether to show the status icon",
    },
    inverted: {
      control: "boolean",
      description: "Renders using a lighter variant for dark backgrounds",
    },
    size: {
      control: "select",
      options: ["small", "medium"],
      description: "The size of the message text",
    },
  },
} satisfies Meta<typeof ValidationMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

const darkWrapperStyle = {
  padding: "24px",
  backgroundColor: "#111827",
  borderRadius: "8px",
  minWidth: "260px",
};

const fieldWrapperStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "6px",
  minWidth: "240px",
};

const plainInputStyle = {
  padding: "8px 12px",
  fontSize: "14px",
  borderRadius: "6px",
  border: "1px solid hsl(212 49% 90%)",
};

// ---------------------------------------------------------------------------
// Status variants (4)
// ---------------------------------------------------------------------------

export const Error: Story = {
  args: {
    status: "error",
    message: "This field is required",
  },
};

export const Warning: Story = {
  args: {
    status: "warning",
    message: "This value looks unusual, please double-check it",
  },
};

export const Success: Story = {
  args: {
    status: "success",
    message: "Looks good!",
  },
};

export const Info: Story = {
  args: {
    status: "info",
    message: "Password must be at least 8 characters",
  },
};

// ---------------------------------------------------------------------------
// Icon hidden per status (4)
// ---------------------------------------------------------------------------

export const ErrorNoIcon: Story = {
  args: {
    status: "error",
    message: "This field is required",
    showIcon: false,
  },
};

export const WarningNoIcon: Story = {
  args: {
    status: "warning",
    message: "This value looks unusual",
    showIcon: false,
  },
};

export const SuccessNoIcon: Story = {
  args: {
    status: "success",
    message: "Looks good!",
    showIcon: false,
  },
};

export const InfoNoIcon: Story = {
  args: {
    status: "info",
    message: "Password must be at least 8 characters",
    showIcon: false,
  },
};

// ---------------------------------------------------------------------------
// Inverted per status (4)
// ---------------------------------------------------------------------------

export const ErrorInverted: Story = {
  args: {
    status: "error",
    message: "This field is required",
    inverted: true,
  },
  render: (args) => (
    <ark.div style={darkWrapperStyle}>
      <ValidationMessage {...args} />
    </ark.div>
  ),
};

export const WarningInverted: Story = {
  args: {
    status: "warning",
    message: "This value looks unusual",
    inverted: true,
  },
  render: (args) => (
    <ark.div style={darkWrapperStyle}>
      <ValidationMessage {...args} />
    </ark.div>
  ),
};

export const SuccessInverted: Story = {
  args: {
    status: "success",
    message: "Looks good!",
    inverted: true,
  },
  render: (args) => (
    <ark.div style={darkWrapperStyle}>
      <ValidationMessage {...args} />
    </ark.div>
  ),
};

export const InfoInverted: Story = {
  args: {
    status: "info",
    message: "Password must be at least 8 characters",
    inverted: true,
  },
  render: (args) => (
    <ark.div style={darkWrapperStyle}>
      <ValidationMessage {...args} />
    </ark.div>
  ),
};

// ---------------------------------------------------------------------------
// Small size per status (4)
// ---------------------------------------------------------------------------

export const ErrorSmall: Story = {
  args: {
    status: "error",
    message: "This field is required",
    size: "small",
  },
};

export const WarningSmall: Story = {
  args: {
    status: "warning",
    message: "This value looks unusual",
    size: "small",
  },
};

export const SuccessSmall: Story = {
  args: {
    status: "success",
    message: "Looks good!",
    size: "small",
  },
};

export const InfoSmall: Story = {
  args: {
    status: "info",
    message: "Password must be at least 8 characters",
    size: "small",
  },
};

// ---------------------------------------------------------------------------
// Content via message prop vs children prop (2)
// ---------------------------------------------------------------------------

export const ContentViaMessageProp: Story = {
  args: {
    status: "info",
    message: "Provided via the message prop",
  },
};

export const ContentViaChildrenProp: Story = {
  args: {
    status: "info",
  },
  render: (args) => (
    <ValidationMessage {...args}>Provided via children</ValidationMessage>
  ),
};

// ---------------------------------------------------------------------------
// Long/wrapping text per status in a constrained ~240px container (4)
// ---------------------------------------------------------------------------

const longText =
  "This is a much longer validation message intended to demonstrate how the text wraps across multiple lines when the container is narrow.";

export const ErrorLongTextConstrained: Story = {
  args: {
    status: "error",
    message: longText,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "240px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WarningLongTextConstrained: Story = {
  args: {
    status: "warning",
    message: longText,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "240px" }}>
        <Story />
      </div>
    ),
  ],
};

export const SuccessLongTextConstrained: Story = {
  args: {
    status: "success",
    message: longText,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "240px" }}>
        <Story />
      </div>
    ),
  ],
};

export const InfoLongTextConstrained: Story = {
  args: {
    status: "info",
    message: longText,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "240px" }}>
        <Story />
      </div>
    ),
  ],
};

// ---------------------------------------------------------------------------
// Edge-case content (4)
// ---------------------------------------------------------------------------

export const EmptyStringMessage: Story = {
  args: {
    status: "info",
    message: "",
  },
};

export const WhitespaceOnlyMessage: Story = {
  args: {
    status: "warning",
    message: "   ",
  },
};

export const VeryLongNoSpaceToken: Story = {
  args: {
    status: "error",
    message:
      "Supercalifragilisticexpialidocioussupercalifragilisticexpialidocioussupercalifragilisticexpialidocious",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "240px" }}>
        <Story />
      </div>
    ),
  ],
};

export const EmojiAndUnicodeMessage: Story = {
  args: {
    status: "success",
    message: "✅ Saved successfully — 保存しました 🎉 café",
  },
};

// ---------------------------------------------------------------------------
// Rich content (3)
// ---------------------------------------------------------------------------

export const RichContentWithLink: Story = {
  args: {
    status: "error",
  },
  render: (args) => (
    <ValidationMessage {...args}>
      This field is required.{" "}
      <a
        href="#"
        style={{ color: "inherit", textDecoration: "underline" }}
        onClick={(e) => e.preventDefault()}
      >
        Learn more
      </a>
    </ValidationMessage>
  ),
};

export const RichContentWithBoldText: Story = {
  args: {
    status: "warning",
  },
  render: (args) => (
    <ValidationMessage {...args}>
      <strong>Warning:</strong> this action cannot be undone
    </ValidationMessage>
  ),
};

export const RichContentWithInlineCode: Story = {
  args: {
    status: "info",
  },
  render: (args) => (
    <ValidationMessage {...args}>
      Value must match the pattern <code>^[a-z0-9-]+$</code>
    </ValidationMessage>
  ),
};

// ---------------------------------------------------------------------------
// Paired-with-field composition per status (4)
// ---------------------------------------------------------------------------

export const ErrorPairedWithField: Story = {
  args: {
    status: "error",
    message: "Email is required",
    id: "email-error",
  },
  render: (args) => (
    <ark.div style={fieldWrapperStyle}>
      <ark.input
        aria-describedby={args.id}
        aria-invalid
        placeholder="Email address"
        style={{ ...plainInputStyle, borderColor: "#E81C61" }}
      />
      <ValidationMessage {...args} />
    </ark.div>
  ),
};

export const WarningPairedWithField: Story = {
  args: {
    status: "warning",
    message: "This username is uncommon, please confirm it's correct",
    id: "username-warning",
  },
  render: (args) => (
    <ark.div style={fieldWrapperStyle}>
      <ark.input
        aria-describedby={args.id}
        placeholder="Username"
        style={plainInputStyle}
      />
      <ValidationMessage {...args} />
    </ark.div>
  ),
};

export const SuccessPairedWithField: Story = {
  args: {
    status: "success",
    message: "Username is available",
    id: "username-success",
  },
  render: (args) => (
    <ark.div style={fieldWrapperStyle}>
      <ark.input
        aria-describedby={args.id}
        placeholder="Username"
        style={{ ...plainInputStyle, borderColor: "#489524" }}
      />
      <ValidationMessage {...args} />
    </ark.div>
  ),
};

export const InfoPairedWithField: Story = {
  args: {
    status: "info",
    message: "Password must be at least 8 characters",
    id: "password-info",
  },
  render: (args) => (
    <ark.div style={fieldWrapperStyle}>
      <ark.input
        aria-describedby={args.id}
        type="password"
        placeholder="Password"
        style={plainInputStyle}
      />
      <ValidationMessage {...args} />
    </ark.div>
  ),
};

// ---------------------------------------------------------------------------
// Multiple stacked messages, mixed statuses (2)
// ---------------------------------------------------------------------------

export const MultipleStackedMessages: Story = {
  args: {
    status: "error",
  },
  render: () => (
    <ark.div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <ValidationMessage status="error" message="Password is required" />
      <ValidationMessage status="warning" message="Password strength: weak" />
      <ValidationMessage status="info" message="Use at least one number and one symbol" />
    </ark.div>
  ),
};

export const MultipleStackedMessagesAllStatuses: Story = {
  args: {
    status: "success",
  },
  render: () => (
    <ark.div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <ValidationMessage status="error" message="Email is invalid" />
      <ValidationMessage status="warning" message="Domain not recognized" />
      <ValidationMessage status="success" message="Format is valid" />
      <ValidationMessage status="info" message="We'll never share your email" />
    </ark.div>
  ),
};

// ---------------------------------------------------------------------------
// RTL content (1)
// ---------------------------------------------------------------------------

export const RTLContent: Story = {
  args: {
    status: "error",
    message: "هذا الحقل مطلوب",
  },
  render: (args) => (
    <div dir="rtl">
      <ValidationMessage {...args} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Inverted + small combined per status (4)
// ---------------------------------------------------------------------------

export const ErrorInvertedSmall: Story = {
  args: {
    status: "error",
    message: "This field is required",
    inverted: true,
    size: "small",
  },
  render: (args) => (
    <ark.div style={darkWrapperStyle}>
      <ValidationMessage {...args} />
    </ark.div>
  ),
};

export const WarningInvertedSmall: Story = {
  args: {
    status: "warning",
    message: "This value looks unusual",
    inverted: true,
    size: "small",
  },
  render: (args) => (
    <ark.div style={darkWrapperStyle}>
      <ValidationMessage {...args} />
    </ark.div>
  ),
};

export const SuccessInvertedSmall: Story = {
  args: {
    status: "success",
    message: "Looks good!",
    inverted: true,
    size: "small",
  },
  render: (args) => (
    <ark.div style={darkWrapperStyle}>
      <ValidationMessage {...args} />
    </ark.div>
  ),
};

export const InfoInvertedSmall: Story = {
  args: {
    status: "info",
    message: "Password must be at least 8 characters",
    inverted: true,
    size: "small",
  },
  render: (args) => (
    <ark.div style={darkWrapperStyle}>
      <ValidationMessage {...args} />
    </ark.div>
  ),
};

// ---------------------------------------------------------------------------
// Inverted + no-icon combined (2: Error, Info)
// ---------------------------------------------------------------------------

export const ErrorInvertedNoIcon: Story = {
  args: {
    status: "error",
    message: "This field is required",
    inverted: true,
    showIcon: false,
  },
  render: (args) => (
    <ark.div style={darkWrapperStyle}>
      <ValidationMessage {...args} />
    </ark.div>
  ),
};

export const InfoInvertedNoIcon: Story = {
  args: {
    status: "info",
    message: "Password must be at least 8 characters",
    inverted: true,
    showIcon: false,
  },
  render: (args) => (
    <ark.div style={darkWrapperStyle}>
      <ValidationMessage {...args} />
    </ark.div>
  ),
};

export const WarningInvertedNoIcon: Story = {
  args: {
    status: "warning",
    message: "This value looks unusual",
    inverted: true,
    showIcon: false,
  },
  render: (args) => (
    <ark.div style={darkWrapperStyle}>
      <ValidationMessage {...args} />
    </ark.div>
  ),
};

export const SuccessInvertedNoIcon: Story = {
  args: {
    status: "success",
    message: "Looks good!",
    inverted: true,
    showIcon: false,
  },
  render: (args) => (
    <ark.div style={darkWrapperStyle}>
      <ValidationMessage {...args} />
    </ark.div>
  ),
};

// ---------------------------------------------------------------------------
// Long message + small size (all 4 statuses)
// ---------------------------------------------------------------------------

export const ErrorLongMessageSmall: Story = {
  args: {
    status: "error",
    message: longText,
    size: "small",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "240px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WarningLongMessageSmall: Story = {
  args: {
    status: "warning",
    message: longText,
    size: "small",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "240px" }}>
        <Story />
      </div>
    ),
  ],
};

export const SuccessLongMessageSmall: Story = {
  args: {
    status: "success",
    message: longText,
    size: "small",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "240px" }}>
        <Story />
      </div>
    ),
  ],
};

export const InfoLongMessageSmall: Story = {
  args: {
    status: "info",
    message: longText,
    size: "small",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "240px" }}>
        <Story />
      </div>
    ),
  ],
};

// ---------------------------------------------------------------------------
// Literal script string demonstrating safe text rendering (1)
// ---------------------------------------------------------------------------

export const LiteralScriptStringIsEscaped: Story = {
  args: {
    status: "error",
    message: "<script>alert(1)</script>",
  },
};

// ---------------------------------------------------------------------------
// Live status-transition demo (1)
// ---------------------------------------------------------------------------

const cycleStatuses: ValidationStatus[] = ["error", "warning", "success", "info"];

const statusMessages: Record<ValidationStatus, string> = {
  error: "This field has an error",
  warning: "This field has a warning",
  success: "This field is valid",
  info: "Additional information about this field",
};

export const LiveStatusTransitionDemo: Story = {
  args: {
    status: "error",
  },
  render: () => {
    const StatusCycler = () => {
      const [index, setIndex] = useState(0);
      const status = cycleStatuses[index];

      return (
        <ark.div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <ValidationMessage status={status} message={statusMessages[status]} />
          <ark.div style={{ display: "flex", gap: "8px" }}>
            {cycleStatuses.map((s, i) => (
              <button
                key={s}
                onClick={() => setIndex(i)}
                style={{
                  padding: "6px 10px",
                  fontSize: "12px",
                  borderRadius: "4px",
                  border: "1px solid hsl(212 49% 90%)",
                  cursor: "pointer",
                  fontWeight: s === status ? 700 : 400,
                }}
              >
                {s}
              </button>
            ))}
          </ark.div>
        </ark.div>
      );
    };

    return <StatusCycler />;
  },
};
