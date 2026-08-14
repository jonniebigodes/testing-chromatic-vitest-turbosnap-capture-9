import type { Meta, StoryObj } from "@storybook/react-vite";
import FieldLabel from "./FieldLabel";
import { ark } from "@ark-ui/react/factory";
import { within, userEvent, expect } from "storybook/test";

const meta = {
  title: "Components/Form/FieldLabel",
  component: FieldLabel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    htmlFor: {
      control: "text",
      description: "Links the label to a form element by ID",
    },
    required: {
      control: "boolean",
      description:
        "Whether the associated field is required. Renders requiredIndicator when true.",
    },
    requiredIndicator: {
      control: false,
      description:
        "Custom content rendered as the required indicator, replacing the default pink asterisk",
    },
    disabled: {
      control: "boolean",
      description:
        "Whether the associated field is disabled. Takes visual precedence over invalid.",
    },
    invalid: {
      control: "boolean",
      description:
        "Whether the associated field has failed validation. Only tints the label when not disabled.",
    },
    inverted: {
      control: "boolean",
      description: "Renders the label in inverted colors",
    },
    size: {
      control: "select",
      options: ["small", "medium"],
      description: "Controls the label's font size",
    },
    children: {
      control: "text",
      description: "Content to display inside the label",
    },
  },
} satisfies Meta<typeof FieldLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

// Shared plain style objects used across multiple story renders. These are
// not component code (FieldLabel itself has zero shared style helpers), just
// local render-time convenience for the stories file.
const basicInputStyle = {
  display: "block",
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  fontSize: "14px",
  outline: "none",
};

const invertedInputStyle = {
  ...basicInputStyle,
  border: "1px solid #374151",
  backgroundColor: "#1f2937",
  color: "#ffffff",
};

const invertedContainerStyle = {
  padding: "32px",
  backgroundColor: "#111827",
  borderRadius: "8px",
  minWidth: "300px",
};

const IconStar = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="#E81C61"
    style={{ display: "inline-block", verticalAlign: "middle" }}
  >
    <path d="M12 2l2.9 6.9 7.1.6-5.5 4.7 1.7 7-6.2-4-6.2 4 1.7-7-5.5-4.7 7.1-.6z" />
  </svg>
);

const IconInfo = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#3b82f6"
    strokeWidth="2"
    style={{ display: "inline-block", verticalAlign: "middle", marginRight: 4 }}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

/* ------------------------------------------------------------------------ */
/* Base rendering (2)                                                        */
/* ------------------------------------------------------------------------ */

/**
 * Default label with text content
 */
export const Default: Story = {
  args: {
    children: "Email Address",
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

/**
 * Label with no htmlFor - not associated with any control
 */
export const NoHtmlFor: Story = {
  args: {
    children: "Standalone Label",
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

/* ------------------------------------------------------------------------ */
/* Full boolean matrix: required x invalid x disabled (8)                    */
/* ------------------------------------------------------------------------ */

export const Matrix_Default: Story = {
  args: {
    htmlFor: "matrix-1",
    children: "Field Label",
    required: false,
    invalid: false,
    disabled: false,
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

export const Matrix_RequiredOnly: Story = {
  args: {
    htmlFor: "matrix-2",
    children: "Field Label",
    required: true,
    invalid: false,
    disabled: false,
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

export const Matrix_InvalidOnly: Story = {
  args: {
    htmlFor: "matrix-3",
    children: "Field Label",
    required: false,
    invalid: true,
    disabled: false,
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

export const Matrix_DisabledOnly: Story = {
  args: {
    htmlFor: "matrix-4",
    children: "Field Label",
    required: false,
    invalid: false,
    disabled: true,
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

export const Matrix_RequiredInvalid: Story = {
  args: {
    htmlFor: "matrix-5",
    children: "Field Label",
    required: true,
    invalid: true,
    disabled: false,
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

export const Matrix_RequiredDisabled: Story = {
  args: {
    htmlFor: "matrix-6",
    children: "Field Label",
    required: true,
    invalid: false,
    disabled: true,
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

export const Matrix_InvalidDisabled: Story = {
  args: {
    htmlFor: "matrix-7",
    children: "Field Label",
    required: false,
    invalid: true,
    disabled: true,
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

/**
 * Disabled takes visual precedence over invalid: dim opacity + not-allowed
 * cursor apply regardless of the invalid state.
 */
export const Matrix_RequiredInvalidDisabled: Story = {
  args: {
    htmlFor: "matrix-8",
    children: "Field Label",
    required: true,
    invalid: true,
    disabled: true,
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

/* ------------------------------------------------------------------------ */
/* Same 8-combination matrix again, with inverted=true (8)                   */
/* ------------------------------------------------------------------------ */

export const InvertedMatrix_Default: Story = {
  args: {
    htmlFor: "inv-matrix-1",
    children: "Field Label",
    required: false,
    invalid: false,
    disabled: false,
    inverted: true,
  },
  render: (args) => (
    <ark.div style={invertedContainerStyle}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

export const InvertedMatrix_RequiredOnly: Story = {
  args: {
    htmlFor: "inv-matrix-2",
    children: "Field Label",
    required: true,
    invalid: false,
    disabled: false,
    inverted: true,
  },
  render: (args) => (
    <ark.div style={invertedContainerStyle}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

export const InvertedMatrix_InvalidOnly: Story = {
  args: {
    htmlFor: "inv-matrix-3",
    children: "Field Label",
    required: false,
    invalid: true,
    disabled: false,
    inverted: true,
  },
  render: (args) => (
    <ark.div style={invertedContainerStyle}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

export const InvertedMatrix_DisabledOnly: Story = {
  args: {
    htmlFor: "inv-matrix-4",
    children: "Field Label",
    required: false,
    invalid: false,
    disabled: true,
    inverted: true,
  },
  render: (args) => (
    <ark.div style={invertedContainerStyle}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

export const InvertedMatrix_RequiredInvalid: Story = {
  args: {
    htmlFor: "inv-matrix-5",
    children: "Field Label",
    required: true,
    invalid: true,
    disabled: false,
    inverted: true,
  },
  render: (args) => (
    <ark.div style={invertedContainerStyle}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

export const InvertedMatrix_RequiredDisabled: Story = {
  args: {
    htmlFor: "inv-matrix-6",
    children: "Field Label",
    required: true,
    invalid: false,
    disabled: true,
    inverted: true,
  },
  render: (args) => (
    <ark.div style={invertedContainerStyle}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

export const InvertedMatrix_InvalidDisabled: Story = {
  args: {
    htmlFor: "inv-matrix-7",
    children: "Field Label",
    required: false,
    invalid: true,
    disabled: true,
    inverted: true,
  },
  render: (args) => (
    <ark.div style={invertedContainerStyle}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

export const InvertedMatrix_RequiredInvalidDisabled: Story = {
  args: {
    htmlFor: "inv-matrix-8",
    children: "Field Label",
    required: true,
    invalid: true,
    disabled: true,
    inverted: true,
  },
  render: (args) => (
    <ark.div style={invertedContainerStyle}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

/* ------------------------------------------------------------------------ */
/* Size crossed with default/required/invalid/disabled (2x4 = 8)             */
/* ------------------------------------------------------------------------ */

export const SizeSmall_Default: Story = {
  args: {
    htmlFor: "size-small-1",
    children: "Small Label",
    size: "small",
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

export const SizeSmall_Required: Story = {
  args: {
    htmlFor: "size-small-2",
    children: "Small Label",
    size: "small",
    required: true,
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

export const SizeSmall_Invalid: Story = {
  args: {
    htmlFor: "size-small-3",
    children: "Small Label",
    size: "small",
    invalid: true,
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

export const SizeSmall_Disabled: Story = {
  args: {
    htmlFor: "size-small-4",
    children: "Small Label",
    size: "small",
    disabled: true,
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

export const SizeMedium_Default: Story = {
  args: {
    htmlFor: "size-medium-1",
    children: "Medium Label",
    size: "medium",
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

export const SizeMedium_Required: Story = {
  args: {
    htmlFor: "size-medium-2",
    children: "Medium Label",
    size: "medium",
    required: true,
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

export const SizeMedium_Invalid: Story = {
  args: {
    htmlFor: "size-medium-3",
    children: "Medium Label",
    size: "medium",
    invalid: true,
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

export const SizeMedium_Disabled: Story = {
  args: {
    htmlFor: "size-medium-4",
    children: "Medium Label",
    size: "medium",
    disabled: true,
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

/* ------------------------------------------------------------------------ */
/* Custom requiredIndicator (3)                                              */
/* ------------------------------------------------------------------------ */

/**
 * Custom text indicator instead of the default asterisk
 */
export const CustomIndicatorText: Story = {
  args: {
    htmlFor: "custom-indicator-text",
    children: "Full Name",
    required: true,
    requiredIndicator: "(required)",
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

/**
 * Custom emoji indicator
 */
export const CustomIndicatorEmoji: Story = {
  args: {
    htmlFor: "custom-indicator-emoji",
    children: "Phone Number",
    required: true,
    requiredIndicator: "❗",
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

/**
 * Custom icon element indicator
 */
export const CustomIndicatorIcon: Story = {
  args: {
    htmlFor: "custom-indicator-icon",
    children: "Company",
    required: true,
    requiredIndicator: <IconStar />,
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

/* ------------------------------------------------------------------------ */
/* Text length / wrapping (3)                                                */
/* ------------------------------------------------------------------------ */

/**
 * A single short word as label content
 */
export const OneWordLabel: Story = {
  args: {
    htmlFor: "one-word",
    children: "Name",
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

/**
 * A long sentence wrapping inside a narrow ~200px container
 */
export const LongSentenceWrapped: Story = {
  args: {
    htmlFor: "long-sentence",
    children:
      "Please provide your complete legal name exactly as it appears on your government-issued identification document",
  },
  render: (args) => (
    <ark.div style={{ padding: "16px", width: "200px" }}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

/**
 * A very long token with no spaces, verifying layout doesn't break
 * catastrophically
 */
export const LongNoSpaceToken: Story = {
  args: {
    htmlFor: "long-token",
    children:
      "Supercalifragilisticexpialidocious-identifier-field-name-with-no-breaks-whatsoever-1234567890",
  },
  render: (args) => (
    <ark.div style={{ padding: "16px", width: "200px" }}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

/* ------------------------------------------------------------------------ */
/* Rich children (3)                                                         */
/* ------------------------------------------------------------------------ */

/**
 * Icon and text rendered together inside the label
 */
export const IconAndText: Story = {
  args: {
    htmlFor: "icon-and-text",
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args}>
        <IconInfo />
        Account Details
      </FieldLabel>
    </ark.div>
  ),
};

/**
 * A nested span inside the label content
 */
export const NestedSpanContent: Story = {
  args: {
    htmlFor: "nested-span",
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args}>
        Shipping <ark.span style={{ fontStyle: "italic" }}>Address</ark.span>
      </FieldLabel>
    </ark.div>
  ),
};

/**
 * A clickable link nested inside the label text
 */
export const ClickableLinkInside: Story = {
  args: {
    htmlFor: "link-inside",
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args}>
        I agree to the{" "}
        <ark.a
          href="#terms"
          style={{ color: "#3b82f6", textDecoration: "underline" }}
        >
          Terms and Conditions
        </ark.a>
      </FieldLabel>
    </ark.div>
  ),
};

/* ------------------------------------------------------------------------ */
/* RTL + unicode (2)                                                         */
/* ------------------------------------------------------------------------ */

/**
 * Label rendered within a right-to-left ancestor
 */
export const RTLContent: Story = {
  args: {
    htmlFor: "rtl-label",
    children: "الاسم الكامل",
    required: true,
  },
  render: (args) => (
    <ark.div dir="rtl" style={{ padding: "16px" }}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

/**
 * Label with unicode/emoji content
 */
export const UnicodeContent: Story = {
  args: {
    htmlFor: "unicode-label",
    children: "名前 🎌 ünïcödé Ñame",
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

/* ------------------------------------------------------------------------ */
/* Composition demos (4)                                                     */
/* ------------------------------------------------------------------------ */

/**
 * Paired with a plain text input - clicking the label focuses the input
 */
export const ComposedWithInput: Story = {
  args: {
    htmlFor: "composed-input",
    children: "Email Address",
    required: true,
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
      <ark.input
        id="composed-input"
        type="email"
        placeholder="you@example.com"
        style={basicInputStyle}
      />
    </ark.div>
  ),
};

/**
 * Paired with a textarea-like control - clicking the label focuses it
 */
export const ComposedWithTextarea: Story = {
  args: {
    htmlFor: "composed-textarea",
    children: "Message",
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
      <ark.textarea
        id="composed-textarea"
        placeholder="Enter your message"
        rows={4}
        style={{ ...basicInputStyle, resize: "vertical" as const }}
      />
    </ark.div>
  ),
};

/**
 * Paired with a search-input-like control - clicking the label focuses it
 */
export const ComposedWithSearchInput: Story = {
  args: {
    htmlFor: "composed-search",
    children: "Search",
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
      <ark.input
        id="composed-search"
        type="search"
        placeholder="Search..."
        style={basicInputStyle}
      />
    </ark.div>
  ),
};

/**
 * Inverted label paired with an inverted-styled input
 */
export const ComposedInvertedWithInput: Story = {
  args: {
    htmlFor: "composed-inverted-input",
    children: "Username",
    inverted: true,
  },
  render: (args) => (
    <ark.div style={invertedContainerStyle}>
      <FieldLabel {...args} />
      <ark.input
        id="composed-inverted-input"
        type="text"
        placeholder="Enter your username"
        style={invertedInputStyle}
      />
    </ark.div>
  ),
};

/* ------------------------------------------------------------------------ */
/* A11y-addon-focused stories (2)                                            */
/* ------------------------------------------------------------------------ */

/**
 * Properly associated label - accessible name is derived from htmlFor
 */
export const AccessibleWithHtmlFor: Story = {
  args: {
    htmlFor: "a11y-input",
    children: "Date of Birth",
    required: true,
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
      <ark.input id="a11y-input" type="date" style={basicInputStyle} />
    </ark.div>
  ),
};

/**
 * Label rendered with no associated control at all
 */
export const NoAssociatedControl: Story = {
  args: {
    children: "Section Heading Label",
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

/* ------------------------------------------------------------------------ */
/* Empty / edge content (2)                                                  */
/* ------------------------------------------------------------------------ */

/**
 * Empty string children
 */
export const EmptyChildren: Story = {
  args: {
    htmlFor: "empty-children",
    children: "",
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

/**
 * All props explicitly set to their documented default values
 */
export const AllDefaultsExplicit: Story = {
  args: {
    htmlFor: undefined,
    required: false,
    requiredIndicator: undefined,
    disabled: false,
    invalid: false,
    inverted: false,
    size: "medium",
    children: "Default Field Label",
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};

/* ------------------------------------------------------------------------ */
/* Interaction stories using play functions (4)                              */
/* ------------------------------------------------------------------------ */

/**
 * Clicking the label moves focus to its paired input (native <label> click
 * behavior via matching htmlFor/id).
 */
export const ClickLabelFocusesInput: Story = {
  args: {
    htmlFor: "play-input",
    children: "Click Me",
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
      <ark.input id="play-input" type="text" style={basicInputStyle} />
    </ark.div>
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const label = c.getByText("Click Me");
    const input = canvasElement.querySelector(
      "#play-input"
    ) as HTMLInputElement;

    await userEvent.click(label);
    expect(document.activeElement).toBe(input);
  },
};

/**
 * A visually disabled label's paired input still receives focus on click.
 * Native <label> elements have no "disabled" attribute of their own, so the
 * browser's built-in label-click-to-focus behavior cannot be suppressed by
 * this component - `disabled` here is purely a visual/semantic hint.
 */
export const ClickDisabledLabelStillFocusesInput: Story = {
  args: {
    htmlFor: "play-disabled-input",
    children: "Disabled Label",
    disabled: true,
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
      <ark.input
        id="play-disabled-input"
        type="text"
        style={basicInputStyle}
      />
    </ark.div>
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const label = c.getByText("Disabled Label");
    const input = canvasElement.querySelector(
      "#play-disabled-input"
    ) as HTMLInputElement;

    await userEvent.click(label);
    expect(document.activeElement).toBe(input);
  },
};

/**
 * Tab order skips the label itself (labels aren't natively focusable) and
 * lands on the paired input instead.
 */
export const TabOrderSkipsLabel: Story = {
  args: {
    htmlFor: "play-tab-input",
    children: "Tabbed Label",
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <ark.button type="button" id="play-tab-before">
        Before
      </ark.button>
      <FieldLabel {...args} />
      <ark.input id="play-tab-input" type="text" style={basicInputStyle} />
    </ark.div>
  ),
  play: async ({ canvasElement }) => {
    const before = canvasElement.querySelector(
      "#play-tab-before"
    ) as HTMLButtonElement;
    const input = canvasElement.querySelector(
      "#play-tab-input"
    ) as HTMLInputElement;

    before.focus();
    expect(document.activeElement).toBe(before);

    await userEvent.tab();
    expect(document.activeElement).toBe(input);
  },
};

/**
 * Clicking the label also focuses a paired textarea-like control.
 */
export const ClickLabelFocusesTextarea: Story = {
  args: {
    htmlFor: "play-textarea",
    children: "Comments",
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
      <ark.textarea
        id="play-textarea"
        rows={3}
        style={{ ...basicInputStyle, resize: "vertical" as const }}
      />
    </ark.div>
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const label = c.getByText("Comments");
    const textarea = canvasElement.querySelector(
      "#play-textarea"
    ) as HTMLTextAreaElement;

    await userEvent.click(label);
    expect(document.activeElement).toBe(textarea);
  },
};

/* ------------------------------------------------------------------------ */
/* Baseline documentation story (1)                                         */
/* ------------------------------------------------------------------------ */

/**
 * Baseline typography documentation - default color, weight, and size for
 * autodocs reference.
 */
export const TypographyBaseline: Story = {
  args: {
    children: "Baseline Field Label",
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <FieldLabel {...args} />
    </ark.div>
  ),
};
