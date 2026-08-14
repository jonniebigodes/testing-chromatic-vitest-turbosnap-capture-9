import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, within, userEvent, expect } from "storybook/test";
import Button from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: {
      control: "color",
      description: "Background color of the button",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Size of the button",
    },
    label: {
      control: "text",
      description: "Label text displayed on the button",
    },
    onClick: {
      description: "Click event handler",
    },
  },
  args: {
    onClick: fn(),
    label: "Button",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default button with medium size and blue background
 */
export const Default: Story = {
  args: {
    label: "Click me",
    backgroundColor: "#3b82f6",
    size: "medium",
  },
};

/**
 * Button with custom red background color
 */
export const CustomBackgroundColor: Story = {
  args: {
    label: "Red Button",
    backgroundColor: "#ef4444",
    size: "medium",
  },
};

/**
 * Button with custom green background color
 */
export const GreenButton: Story = {
  args: {
    label: "Green Button",
    backgroundColor: "#10b981",
    size: "medium",
  },
};

/**
 * Small sized button
 */
export const Small: Story = {
  args: {
    label: "Small Button",
    backgroundColor: "#3b82f6",
    size: "small",
  },
};

/**
 * Medium sized button (default)
 */
export const Medium: Story = {
  args: {
    label: "Medium Button",
    backgroundColor: "#3b82f6",
    size: "medium",
  },
};

/**
 * Large sized button
 */
export const Large: Story = {
  args: {
    label: "Large Button",
    backgroundColor: "#3b82f6",
    size: "large",
  },
};

/**
 * Button showcasing all sizes side by side
 */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Button label="Small" size="small" backgroundColor="#3b82f6" />
      <Button label="Medium" size="medium" backgroundColor="#3b82f6" />
      <Button label="Large" size="large" backgroundColor="#3b82f6" />
    </div>
  ),
};

/**
 * Button with click handler
 */
export const WithClickHandler: Story = {
  args: {
    label: "Click to Alert",
    backgroundColor: "#8b5cf6",
    size: "medium",
    onClick: fn(() => alert("Button clicked!")),
  },
};

/* -------------------------------------------------------------------------
 * Custom background color palette (5)
 * ---------------------------------------------------------------------- */

/**
 * Button using the design system's purple token color
 */
export const PurpleButton: Story = {
  args: {
    label: "Purple Button",
    backgroundColor: "#6F2CAC",
    size: "medium",
  },
};

/**
 * Button using the design system's orange token color
 */
export const OrangeButton: Story = {
  args: {
    label: "Orange Button",
    backgroundColor: "#FF4400",
    size: "medium",
  },
};

/**
 * Button using the design system's pink token color
 */
export const PinkButton: Story = {
  args: {
    label: "Pink Button",
    backgroundColor: "#FF4785",
    size: "medium",
  },
};

/**
 * Button using the design system's cyan token color
 */
export const CyanButton: Story = {
  args: {
    label: "Cyan Button",
    backgroundColor: "#37D5D3",
    size: "medium",
  },
};

/**
 * Button using the design system's yellow token color
 */
export const YellowButton: Story = {
  args: {
    label: "Yellow Button",
    backgroundColor: "#FFAE00",
    size: "medium",
  },
};

/* -------------------------------------------------------------------------
 * Size crossed with custom color (3)
 * ---------------------------------------------------------------------- */

/**
 * Small button with a custom purple background
 */
export const SmallPurple: Story = {
  args: {
    label: "Small Purple",
    backgroundColor: "#6F2CAC",
    size: "small",
  },
};

/**
 * Medium button with a custom orange background
 */
export const MediumOrange: Story = {
  args: {
    label: "Medium Orange",
    backgroundColor: "#FF4400",
    size: "medium",
  },
};

/**
 * Large button with a custom pink background
 */
export const LargePink: Story = {
  args: {
    label: "Large Pink",
    backgroundColor: "#FF4785",
    size: "large",
  },
};

/* -------------------------------------------------------------------------
 * Label text content variations (7)
 * ---------------------------------------------------------------------- */

/**
 * Button with a long, wrapping-prone label
 */
export const LongLabelText: Story = {
  args: {
    label: "This is a very long button label that tests text overflow behavior",
    backgroundColor: "#3b82f6",
    size: "medium",
  },
};

/**
 * Button with an extremely short, single-word label
 */
export const ShortLabelText: Story = {
  args: {
    label: "Go",
    backgroundColor: "#3b82f6",
    size: "medium",
  },
};

/**
 * Button label containing emoji alongside text
 */
export const EmojiLabel: Story = {
  args: {
    label: "🚀 Launch",
    backgroundColor: "#3b82f6",
    size: "medium",
  },
};

/**
 * Button label rendered with right-to-left Arabic unicode text
 */
export const RTLLabel: Story = {
  args: {
    label: "انقر هنا",
    backgroundColor: "#3b82f6",
    size: "medium",
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
 * Button label containing non-Latin unicode text
 */
export const UnicodeLabel: Story = {
  args: {
    label: "続ける",
    backgroundColor: "#3b82f6",
    size: "medium",
  },
};

/**
 * Button label that is only whitespace, exercising the truthy-but-blank
 * label edge case
 */
export const WhitespaceOnlyLabel: Story = {
  args: {
    label: "   ",
    backgroundColor: "#3b82f6",
    size: "medium",
  },
};

/**
 * Button rendered with an empty string label
 */
export const EmptyLabel: Story = {
  args: {
    label: "",
    backgroundColor: "#3b82f6",
    size: "medium",
  },
};

/* -------------------------------------------------------------------------
 * Numeric / special character label edge cases (2)
 * ---------------------------------------------------------------------- */

/**
 * Button label composed entirely of digits
 */
export const NumericLabel: Story = {
  args: {
    label: "12345",
    backgroundColor: "#3b82f6",
    size: "medium",
  },
};

/**
 * Button label composed of special/punctuation characters
 */
export const SpecialCharactersLabel: Story = {
  args: {
    label: "!@#$%^&*()_+-=",
    backgroundColor: "#3b82f6",
    size: "medium",
  },
};

/* -------------------------------------------------------------------------
 * Missing onClick handler (2)
 * ---------------------------------------------------------------------- */

/**
 * Button with no onClick handler wired up - clicking should not throw
 */
export const NoClickHandler: Story = {
  args: {
    label: "No handler wired up",
    backgroundColor: "#3b82f6",
    size: "medium",
    onClick: undefined,
  },
};

/**
 * Large button with no onClick handler wired up
 */
export const NoClickHandlerLargeSize: Story = {
  args: {
    label: "Large, no handler",
    backgroundColor: "#3b82f6",
    size: "large",
    onClick: undefined,
  },
};

/* -------------------------------------------------------------------------
 * Click interaction (6)
 * ---------------------------------------------------------------------- */

/**
 * Verifies a single click fires the onClick handler exactly once
 */
export const ClickInteraction: Story = {
  args: {
    label: "Click me once",
    backgroundColor: "#3b82f6",
    size: "medium",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.click(button);
    expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/**
 * Verifies two separate clicks fire the onClick handler exactly twice
 */
export const DoubleClickInteraction: Story = {
  args: {
    label: "Click me twice",
    backgroundColor: "#3b82f6",
    size: "medium",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.click(button);
    await userEvent.click(button);
    expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};

/**
 * Verifies clicking a button with a custom background color still fires
 * onClick correctly
 */
export const ClickWithCustomColor: Story = {
  args: {
    label: "Click the purple button",
    backgroundColor: "#6F2CAC",
    size: "medium",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.click(button);
    expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/**
 * Verifies clicking a small button fires onClick correctly
 */
export const ClickSmallButton: Story = {
  args: {
    label: "Click small",
    backgroundColor: "#3b82f6",
    size: "small",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.click(button);
    expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/**
 * Verifies clicking a large button fires onClick correctly
 */
export const ClickLargeButton: Story = {
  args: {
    label: "Click large",
    backgroundColor: "#3b82f6",
    size: "large",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.click(button);
    expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/**
 * Clicking multiple times in a row accumulates a matching call count
 */
export const RapidClicks: Story = {
  args: {
    label: "Click me three times",
    backgroundColor: "#3b82f6",
    size: "medium",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.click(button);
    await userEvent.click(button);
    await userEvent.click(button);
    expect(args.onClick).toHaveBeenCalledTimes(3);
  },
};

/* -------------------------------------------------------------------------
 * Keyboard interaction (3)
 * ---------------------------------------------------------------------- */

/**
 * Verifies the button is reachable via Tab
 */
export const KeyboardFocusable: Story = {
  args: {
    label: "Tab to focus this button",
    backgroundColor: "#3b82f6",
    size: "medium",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    expect(button).toHaveFocus();
  },
};

/**
 * Verifies pressing Enter activates a focused button
 */
export const KeyboardActivateWithEnter: Story = {
  args: {
    label: "Focus then press Enter",
    backgroundColor: "#3b82f6",
    size: "medium",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    button.focus();
    await userEvent.keyboard("{Enter}");
    expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/**
 * Verifies pressing Space activates a focused button
 */
export const KeyboardActivateWithSpace: Story = {
  args: {
    label: "Focus then press Space",
    backgroundColor: "#3b82f6",
    size: "medium",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    button.focus();
    await userEvent.keyboard(" ");
    expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/* -------------------------------------------------------------------------
 * Hover / focus styling (cosmetic) (2)
 * ---------------------------------------------------------------------- */

/**
 * Button demonstrating the hover lift/opacity styling (cosmetic - hover
 * manually in Storybook to see the effect)
 */
export const HoverStyling: Story = {
  args: {
    label: "Hover over me",
    backgroundColor: "#3b82f6",
    size: "medium",
  },
};

/**
 * Button demonstrating the focus outline behavior (cosmetic - tab to it in
 * Storybook to see the effect)
 */
export const FocusStyling: Story = {
  args: {
    label: "Tab to focus me",
    backgroundColor: "#3b82f6",
    size: "medium",
  },
};

/* -------------------------------------------------------------------------
 * Background / container context (2)
 * ---------------------------------------------------------------------- */

/**
 * Button rendered on a dark background
 */
export const OnDarkBackground: Story = {
  args: {
    label: "Works on dark backgrounds too",
    backgroundColor: "#3b82f6",
    size: "medium",
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: "#0f172a", padding: "24px", borderRadius: "8px" }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Button rendered inside a narrow flex container
 */
export const InNarrowContainer: Story = {
  args: {
    label: "Narrow container",
    backgroundColor: "#3b82f6",
    size: "medium",
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "120px", display: "flex" }}>
        <Story />
      </div>
    ),
  ],
};

/* -------------------------------------------------------------------------
 * Long/short label wrapping edge cases (2)
 * ---------------------------------------------------------------------- */

/**
 * Extremely long label text wrapped inside a narrow container
 */
export const VeryLongLabelWrapping: Story = {
  args: {
    label:
      "This extremely long button label is intended to exercise text wrapping and overflow handling inside a constrained width container",
    backgroundColor: "#3b82f6",
    size: "medium",
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "160px" }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Button with a single-character label
 */
export const SingleCharacterLabel: Story = {
  args: {
    label: "X",
    backgroundColor: "#3b82f6",
    size: "medium",
  },
};

/* -------------------------------------------------------------------------
 * Multiple buttons / groups (2)
 * ---------------------------------------------------------------------- */

/**
 * A row of buttons combining different sizes and custom colors
 */
export const ButtonGroupRow: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Button label="Cancel" size="small" backgroundColor="#64748b" />
      <Button label="Save Draft" size="medium" backgroundColor="#3b82f6" />
      <Button label="Publish" size="large" backgroundColor="#10b981" />
    </div>
  ),
};

/**
 * A toolbar-style arrangement of short-label buttons
 */
export const ButtonToolbar: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "8px",
        padding: "8px",
        backgroundColor: "#f1f5f9",
        borderRadius: "8px",
      }}
    >
      <Button label="Bold" size="small" backgroundColor="#334155" />
      <Button label="Italic" size="small" backgroundColor="#334155" />
      <Button label="Underline" size="small" backgroundColor="#334155" />
    </div>
  ),
};

/* -------------------------------------------------------------------------
 * Kitchen-sink combinations (3)
 * ---------------------------------------------------------------------- */

/**
 * Kitchen sink: small size, custom purple color, and a long label
 */
export const KitchenSinkSmallCustomColorLongLabel: Story = {
  args: {
    label: "Kitchen sink: small, purple, and a fairly long label text",
    backgroundColor: "#6F2CAC",
    size: "small",
  },
};

/**
 * Kitchen sink: large size, custom orange color, and an emoji label
 */
export const KitchenSinkLargeCustomColorEmoji: Story = {
  args: {
    label: "🔥 Kitchen sink large",
    backgroundColor: "#FF4400",
    size: "large",
  },
};

/**
 * Kitchen sink: medium size, custom pink color, and an RTL label
 */
export const KitchenSinkMediumRTLCustomColor: Story = {
  args: {
    label: "مزيج كامل من الخيارات",
    backgroundColor: "#FF4785",
    size: "medium",
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
 * Accessibility (2)
 * ---------------------------------------------------------------------- */

/**
 * Confirms the rendered element exposes an implicit button role with the
 * expected accessible name
 */
export const ButtonRoleCheck: Story = {
  args: {
    label: "Accessible button",
    backgroundColor: "#3b82f6",
    size: "medium",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Accessible button" });
    expect(button).toBeInTheDocument();
  },
};

/**
 * Confirms a button is both focusable and clickable via keyboard after
 * receiving focus through the DOM
 */
export const AccessibleFocusableButton: Story = {
  args: {
    label: "Focus and activate me",
    backgroundColor: "#3b82f6",
    size: "medium",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    button.focus();
    expect(button).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/* -------------------------------------------------------------------------
 * Transparent background edge case (1)
 * ---------------------------------------------------------------------- */

/**
 * Button rendered with a transparent background, shown against a dark
 * decorator so its label remains visible
 */
export const TransparentBackground: Story = {
  args: {
    label: "Transparent background",
    backgroundColor: "transparent",
    size: "medium",
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: "#0f172a", padding: "24px", borderRadius: "8px" }}>
        <Story />
      </div>
    ),
  ],
};
