import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, within, userEvent, expect } from "storybook/test";
import { useState } from "react";
import Pill from "./Pill";

const meta = {
  title: "Components/Pill",
  component: Pill,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "inverted", "warning", "success"],
      description: "Variant style of the pill",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Size of the pill",
    },
    children: {
      control: "text",
      description: "Content displayed in the pill",
    },
    onClick: {
      description: "Click event handler",
    },
    disabled: {
      control: "boolean",
      description: "Whether the pill is disabled",
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Pill>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default pill with medium size and default variant
 */
export const Default: Story = {
  args: {
    children: "Default Pill",
    variant: "default",
    size: "medium",
  },
};

/**
 * Pill with inverted colors
 */
export const Inverted: Story = {
  args: {
    children: "Inverted Pill",
    variant: "inverted",
    size: "medium",
  },
};

/**
 * Pill with warning variant
 */
export const Warning: Story = {
  args: {
    children: "Warning",
    variant: "warning",
    size: "medium",
  },
};

/**
 * Pill with success variant
 */
export const Success: Story = {
  args: {
    children: "Success",
    variant: "success",
    size: "medium",
  },
};

/**
 * Small sized pill
 */
export const Small: Story = {
  args: {
    children: "Small Pill",
    variant: "default",
    size: "small",
  },
};

/**
 * Medium sized pill (default)
 */
export const Medium: Story = {
  args: {
    children: "Medium Pill",
    variant: "default",
    size: "medium",
  },
};

/**
 * Large sized pill
 */
export const Large: Story = {
  args: {
    children: "Large Pill",
    variant: "default",
    size: "large",
  },
};

/**
 * Disabled pill
 */
export const Disabled: Story = {
  args: {
    children: "Disabled",
    variant: "default",
    size: "medium",
    disabled: true,
  },
};

/**
 * Clickable pill with handler
 */
export const Clickable: Story = {
  args: {
    children: "Click me",
    variant: "default",
    size: "medium",
    onClick: fn(() => alert("Pill clicked!")),
  },
};

/**
 * Pills showcasing all variants side by side
 */
export const AllVariants: Story = {
  args: { children: "Pill" },
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Pill variant="default">Default</Pill>
      <Pill variant="inverted">Inverted</Pill>
      <Pill variant="warning">Warning</Pill>
      <Pill variant="success">Success</Pill>
    </div>
  ),
};

/**
 * Pills showcasing all sizes side by side
 */
export const AllSizes: Story = {
  args: { children: "Pill" },
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Pill size="small" variant="default">
        Small
      </Pill>
      <Pill size="medium" variant="default">
        Medium
      </Pill>
      <Pill size="large" variant="default">
        Large
      </Pill>
    </div>
  ),
};

/**
 * Multiple pills displayed together as tags
 */
export const MultiplePills: Story = {
  args: { children: "Pill" },
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Pill variant="default" size="small">
        React
      </Pill>
      <Pill variant="success" size="small">
        TypeScript
      </Pill>
      <Pill variant="warning" size="small">
        JavaScript
      </Pill>
      <Pill variant="inverted" size="small">
        HTML
      </Pill>
      <Pill variant="default" size="small">
        CSS
      </Pill>
      <Pill variant="success" size="small">
        Storybook
      </Pill>
      <Pill variant="warning" size="small">
        Vitest
      </Pill>
      <Pill variant="inverted" size="small">
        Ark UI
      </Pill>
    </div>
  ),
};

/**
 * Pills with different sizes and variants combined
 */
export const MixedSizesAndVariants: Story = {
  args: { children: "Pill" },
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "12px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Pill variant="default" size="small">
        Small Default
      </Pill>
      <Pill variant="success" size="medium">
        Medium Success
      </Pill>
      <Pill variant="warning" size="large">
        Large Warning
      </Pill>
      <Pill variant="inverted" size="medium">
        Medium Inverted
      </Pill>
    </div>
  ),
};

/**
 * Disabled pills in different variants
 */
export const DisabledVariants: Story = {
  args: { children: "Pill" },
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Pill variant="default" disabled>
        Default
      </Pill>
      <Pill variant="inverted" disabled>
        Inverted
      </Pill>
      <Pill variant="warning" disabled>
        Warning
      </Pill>
      <Pill variant="success" disabled>
        Success
      </Pill>
    </div>
  ),
};

/* -------------------------------------------------------------------------
 * Full variant x size matrix (6) - remaining combinations not already
 * covered by the stories above
 * ---------------------------------------------------------------------- */

/**
 * Small inverted pill
 */
export const SmallInverted: Story = {
  args: {
    children: "Small Inverted",
    variant: "inverted",
    size: "small",
  },
};

/**
 * Large inverted pill
 */
export const LargeInverted: Story = {
  args: {
    children: "Large Inverted",
    variant: "inverted",
    size: "large",
  },
};

/**
 * Small warning pill
 */
export const SmallWarning: Story = {
  args: {
    children: "Small Warning",
    variant: "warning",
    size: "small",
  },
};

/**
 * Large warning pill
 */
export const LargeWarning: Story = {
  args: {
    children: "Large Warning",
    variant: "warning",
    size: "large",
  },
};

/**
 * Small success pill
 */
export const SmallSuccess: Story = {
  args: {
    children: "Small Success",
    variant: "success",
    size: "small",
  },
};

/**
 * Large success pill
 */
export const LargeSuccess: Story = {
  args: {
    children: "Large Success",
    variant: "success",
    size: "large",
  },
};

/* -------------------------------------------------------------------------
 * Disabled combinations (4)
 * ---------------------------------------------------------------------- */

/**
 * Disabled pill with an onClick handler explicitly wired up; clicking must
 * not invoke the handler
 */
export const DisabledWithOnClickHandler: Story = {
  args: {
    children: "Disabled with handler",
    disabled: true,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const pill = canvas.getByText("Disabled with handler");
    await userEvent.click(pill);
    expect(args.onClick).not.toHaveBeenCalled();
  },
};

/**
 * Disabled pill with no onClick handler at all
 */
export const DisabledWithoutOnClickHandler: Story = {
  args: {
    children: "Disabled no handler",
    disabled: true,
    onClick: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pill = canvas.getByText("Disabled no handler");
    await expect(userEvent.click(pill)).resolves.not.toThrow();
  },
};

/**
 * Disabled pill at the small size
 */
export const DisabledSmallSize: Story = {
  args: {
    children: "Disabled Small",
    size: "small",
    disabled: true,
  },
};

/**
 * Disabled pill at the large size
 */
export const DisabledLargeSize: Story = {
  args: {
    children: "Disabled Large",
    size: "large",
    disabled: true,
  },
};

/* -------------------------------------------------------------------------
 * Children content variations (5)
 * ---------------------------------------------------------------------- */

/**
 * Pill with a long text label
 */
export const LongTextContent: Story = {
  args: {
    children:
      "This is a very long pill label that contains a lot of text to test wrapping and overflow behavior",
  },
};

/**
 * Pill with a single short character as content
 */
export const ShortSingleCharacter: Story = {
  args: {
    children: "A",
  },
};

/**
 * Pill with emoji content
 */
export const EmojiContent: Story = {
  args: {
    children: "🎉 New 🚀",
  },
};

/**
 * Pill with right-to-left unicode content
 */
export const RTLContent: Story = {
  args: {
    children: "مرحبا بالعالم",
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
 * Pill with numeric-looking string content
 */
export const NumericContent: Story = {
  args: {
    children: "42",
  },
};

/* -------------------------------------------------------------------------
 * Clickable vs non-clickable cursor behavior (3)
 * ---------------------------------------------------------------------- */

/**
 * Clickable pill shows a pointer cursor
 */
export const ClickablePointerCursor: Story = {
  args: {
    children: "Hover me",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pill = canvas.getByText("Hover me");
    await expect(pill).toHaveStyle({ cursor: "pointer" });
  },
};

/**
 * Non-clickable pill (no onClick) shows a default cursor
 */
export const NonClickableDefaultCursor: Story = {
  args: {
    children: "No handler",
    onClick: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pill = canvas.getByText("No handler");
    await expect(pill).toHaveStyle({ cursor: "default" });
  },
};

/**
 * A disabled pill always shows a not-allowed cursor, even with an onClick
 * handler wired up
 */
export const DisabledOverridesClickableCursor: Story = {
  args: {
    children: "Disabled cursor",
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pill = canvas.getByText("Disabled cursor");
    await expect(pill).toHaveStyle({ cursor: "not-allowed" });
  },
};

/* -------------------------------------------------------------------------
 * Click interaction behavior (5)
 * ---------------------------------------------------------------------- */

/**
 * A single click fires the onClick handler exactly once
 */
export const ClickFiresHandlerOnce: Story = {
  args: {
    children: "Click once",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const pill = canvas.getByText("Click once");
    await userEvent.click(pill);
    expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/**
 * Multiple clicks fire the onClick handler once per click
 */
export const ClickFiresHandlerMultipleTimes: Story = {
  args: {
    children: "Click thrice",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const pill = canvas.getByText("Click thrice");
    await userEvent.click(pill);
    await userEvent.click(pill);
    await userEvent.click(pill);
    expect(args.onClick).toHaveBeenCalledTimes(3);
  },
};

/**
 * Clicking a pill without an onClick handler does not throw
 */
export const NoOnClickNoThrowOnClick: Story = {
  args: {
    children: "Safe click",
    onClick: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pill = canvas.getByText("Safe click");
    await expect(userEvent.click(pill)).resolves.not.toThrow();
  },
};

/**
 * Pressing Enter while the pill is focused does not trigger onClick, since
 * the pill is a plain span and not a native interactive element
 */
export const KeyboardEnterDoesNotTriggerClick: Story = {
  args: {
    children: "Focus and press Enter",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const pill = canvas.getByText("Focus and press Enter") as HTMLElement;
    pill.focus();
    await userEvent.keyboard("{Enter}");
    expect(args.onClick).not.toHaveBeenCalled();
  },
};

/**
 * Tabbing does not move focus onto the pill, since it has no tabIndex
 */
export const TabDoesNotFocusPill: Story = {
  args: {
    children: "Not focusable",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pill = canvas.getByText("Not focusable");
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    expect(document.activeElement).not.toBe(pill);
  },
};

/* -------------------------------------------------------------------------
 * Hover cosmetics (2)
 * ---------------------------------------------------------------------- */

/**
 * Hovering a clickable pill lifts it slightly and reduces its opacity, then
 * reverts when the pointer leaves
 */
export const HoverOpacityAndLift: Story = {
  args: {
    children: "Hover for lift",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pill = canvas.getByText("Hover for lift");
    await userEvent.hover(pill);
    await expect(pill).toHaveStyle({ opacity: "0.85" });
    await userEvent.unhover(pill);
    await expect(pill).toHaveStyle({ opacity: "1" });
  },
};

/**
 * Hovering a pill with no onClick handler does not change its opacity
 */
export const HoverNoChangeWithoutOnClick: Story = {
  args: {
    children: "No hover effect",
    onClick: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pill = canvas.getByText("No hover effect");
    await userEvent.hover(pill);
    await expect(pill).toHaveStyle({ opacity: "1" });
  },
};

/* -------------------------------------------------------------------------
 * Kitchen-sink combinations (4)
 * ---------------------------------------------------------------------- */

/**
 * Kitchen sink: inverted variant, large size, disabled
 */
export const KitchenSinkInvertedLargeDisabled: Story = {
  args: {
    children: "Kitchen sink: inverted, large, disabled",
    variant: "inverted",
    size: "large",
    disabled: true,
  },
};

/**
 * Kitchen sink: warning variant, small size, clickable
 */
export const KitchenSinkWarningSmallClickable: Story = {
  args: {
    children: "Kitchen sink: warning, small, clickable",
    variant: "warning",
    size: "small",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const pill = canvas.getByText("Kitchen sink: warning, small, clickable");
    await userEvent.click(pill);
    expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/**
 * Kitchen sink: success variant, large size, with long text content
 */
export const KitchenSinkSuccessLongTextClickable: Story = {
  args: {
    children:
      "Kitchen sink: success variant with a fairly long clickable label to test wrapping",
    variant: "success",
    size: "large",
  },
};

/**
 * Kitchen sink: all variants rendered disabled with longer text at once
 */
export const KitchenSinkAllVariantsDisabledLongText: Story = {
  args: { children: "Pill" },
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <Pill variant="default" disabled>
        Default disabled with longer text
      </Pill>
      <Pill variant="inverted" disabled>
        Inverted disabled with longer text
      </Pill>
      <Pill variant="warning" disabled>
        Warning disabled with longer text
      </Pill>
      <Pill variant="success" disabled>
        Success disabled with longer text
      </Pill>
    </div>
  ),
};

/* -------------------------------------------------------------------------
 * Grouped / multi-pill display (3)
 * ---------------------------------------------------------------------- */

/**
 * Pill rendered on a dark background
 */
export const PillsOnDarkBackground: Story = {
  args: {
    children: "On dark background",
  },
  decorators: [
    (Story) => (
      <div
        style={{ backgroundColor: "#0f172a", padding: "24px", borderRadius: "8px" }}
      >
        <Story />
      </div>
    ),
  ],
};

/**
 * A group of pills where only some are disabled
 */
export const PillGroupWithMixedDisabled: Story = {
  args: { children: "Pill" },
  render: () => (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <Pill variant="default">Active</Pill>
      <Pill variant="default" disabled>
        Disabled
      </Pill>
      <Pill variant="success">Active</Pill>
      <Pill variant="warning" disabled>
        Disabled
      </Pill>
    </div>
  ),
};

/**
 * Two independently clickable pills, each tracking its own click count,
 * demonstrating that handlers do not leak between instances
 */
export const PillGroupClickTracking: Story = {
  args: { children: "Pill" },
  render: () => {
    const ClickTracker = () => {
      const [clicks, setClicks] = useState({ first: 0, second: 0 });

      return (
        <div style={{ display: "flex", gap: "8px" }}>
          <Pill onClick={() => setClicks((c) => ({ ...c, first: c.first + 1 }))}>
            First ({clicks.first})
          </Pill>
          <Pill onClick={() => setClicks((c) => ({ ...c, second: c.second + 1 }))}>
            Second ({clicks.second})
          </Pill>
        </div>
      );
    };

    return <ClickTracker />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("First (0)"));
    await expect(canvas.getByText("First (1)")).toBeInTheDocument();
    await expect(canvas.getByText("Second (0)")).toBeInTheDocument();
  },
};

/* -------------------------------------------------------------------------
 * Content edge cases (2)
 * ---------------------------------------------------------------------- */

/**
 * Pill with a whitespace-only string as content
 */
export const WhitespaceOnlyChildren: Story = {
  args: {
    children: "   ",
  },
};

/**
 * Pill with the number 0 as content, exercising a falsy-but-valid
 * ReactNode edge case
 */
export const ZeroAsNumericChildren: Story = {
  args: {
    children: 0,
  },
};

/* -------------------------------------------------------------------------
 * Size style assertions via play functions (2)
 * ---------------------------------------------------------------------- */

/**
 * Verifies the small size applies its expected height
 */
export const SmallSizeStyleAssertions: Story = {
  args: {
    children: "Small styles",
    size: "small",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pill = canvas.getByText("Small styles");
    await expect(pill).toHaveStyle({ height: "1.25rem" });
  },
};

/**
 * Verifies the large size applies its expected height
 */
export const LargeSizeStyleAssertions: Story = {
  args: {
    children: "Large styles",
    size: "large",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pill = canvas.getByText("Large styles");
    await expect(pill).toHaveStyle({ height: "2rem" });
  },
};
