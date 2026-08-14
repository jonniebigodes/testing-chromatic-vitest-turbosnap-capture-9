import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, within, userEvent, expect } from "storybook/test";
import { useState } from "react";
import Card from "./Card";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Optional title displayed at the top of the card",
    },
    subtitle: {
      control: "text",
      description: "Optional subtitle displayed below the title",
    },
    elevated: {
      control: "boolean",
      description: "Whether the card has an elevated shadow",
    },
    bordered: {
      control: "boolean",
      description: "Whether the card has a border",
    },
    padding: {
      control: "select",
      options: ["none", "small", "medium", "large"],
      description: "Padding size of the card",
    },
    children: {
      control: "text",
      description: "Main content of the card",
    },
    onClick: {
      description: "Click event handler",
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default card with title, subtitle, and body content
 */
export const Default: Story = {
  args: {
    title: "Card Title",
    subtitle: "Card subtitle",
    children: "This is the card body content.",
    elevated: false,
    bordered: true,
    padding: "medium",
  },
};

/**
 * Card with only body content and no title
 */
export const BodyOnly: Story = {
  args: {
    children: "A card with just body content and no header.",
  },
};

/**
 * Card with title only
 */
export const TitleOnly: Story = {
  args: {
    title: "Title Only",
    children: "Body under a title with no subtitle.",
  },
};

/**
 * Card with title and subtitle
 */
export const WithTitleAndSubtitle: Story = {
  args: {
    title: "Welcome",
    subtitle: "Get started with your dashboard",
    children: "Explore the features available in this panel.",
  },
};

/**
 * Card with a footer
 */
export const WithFooter: Story = {
  args: {
    title: "Invoice",
    children: "Amount due: $120.00",
    footer: "Due in 7 days",
  },
};

/**
 * Elevated card with shadow
 */
export const Elevated: Story = {
  args: {
    title: "Elevated Card",
    subtitle: "Has a soft shadow",
    children: "This card uses the elevated prop for depth.",
    elevated: true,
  },
};

/**
 * Card without a border
 */
export const Unbordered: Story = {
  args: {
    title: "Unbordered",
    children: "This card has bordered set to false.",
    bordered: false,
  },
};

/**
 * Elevated and unbordered card
 */
export const ElevatedUnbordered: Story = {
  args: {
    title: "Elevated Unbordered",
    children: "Shadow without a border.",
    elevated: true,
    bordered: false,
  },
};

/**
 * Card with no padding
 */
export const PaddingNone: Story = {
  args: {
    title: "No Padding",
    children: "Padding is set to none.",
    padding: "none",
  },
};

/**
 * Card with small padding
 */
export const PaddingSmall: Story = {
  args: {
    title: "Small Padding",
    children: "Padding is set to small.",
    padding: "small",
  },
};

/**
 * Card with medium padding (default)
 */
export const PaddingMedium: Story = {
  args: {
    title: "Medium Padding",
    children: "Padding is set to medium.",
    padding: "medium",
  },
};

/**
 * Card with large padding
 */
export const PaddingLarge: Story = {
  args: {
    title: "Large Padding",
    children: "Padding is set to large.",
    padding: "large",
  },
};

/**
 * Clickable card with handler
 */
export const Clickable: Story = {
  args: {
    title: "Clickable Card",
    children: "Click me to fire onClick.",
    onClick: fn(() => alert("Card clicked!")),
  },
};

/**
 * Non-clickable card (no onClick)
 */
export const NonClickable: Story = {
  args: {
    title: "Non-clickable",
    children: "No onClick handler is provided.",
    onClick: undefined,
  },
};

/**
 * Long body text content
 */
export const LongBodyContent: Story = {
  args: {
    title: "Long Content",
    children:
      "This card contains a fairly long body of text to exercise wrapping and layout behavior within the constrained card width. It should remain readable and well spaced.",
  },
};

/**
 * Long title text
 */
export const LongTitle: Story = {
  args: {
    title:
      "This is a very long card title that might wrap onto multiple lines within the card",
    children: "Body content under a long title.",
  },
};

/**
 * Card with emoji in title and body
 */
export const EmojiContent: Story = {
  args: {
    title: "🎉 Celebration",
    subtitle: "🎊 Party time",
    children: "You unlocked a new achievement! 🏆",
  },
};

/**
 * Card with RTL content
 */
export const RTLContent: Story = {
  args: {
    title: "مرحبا بالعالم",
    subtitle: "عنوان فرعي",
    children: "هذا محتوى البطاقة باللغة العربية.",
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
 * Card with numeric-looking children
 */
export const NumericContent: Story = {
  args: {
    title: "Stats",
    children: "42",
  },
};

/**
 * All padding sizes side by side
 */
export const AllPaddingSizes: Story = {
  args: { children: "Card" },
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <Card title="None" padding="none">
        Body
      </Card>
      <Card title="Small" padding="small">
        Body
      </Card>
      <Card title="Medium" padding="medium">
        Body
      </Card>
      <Card title="Large" padding="large">
        Body
      </Card>
    </div>
  ),
};

/**
 * Elevated vs flat comparison
 */
export const ElevatedVsFlat: Story = {
  args: { children: "Card" },
  render: () => (
    <div style={{ display: "flex", gap: "16px" }}>
      <Card title="Flat" elevated={false}>
        No shadow
      </Card>
      <Card title="Elevated" elevated>
        With shadow
      </Card>
    </div>
  ),
};

/**
 * Bordered vs unbordered comparison
 */
export const BorderedVsUnbordered: Story = {
  args: { children: "Card" },
  render: () => (
    <div style={{ display: "flex", gap: "16px" }}>
      <Card title="Bordered" bordered>
        Has border
      </Card>
      <Card title="Unbordered" bordered={false}>
        No border
      </Card>
    </div>
  ),
};

/**
 * Cards with various footers
 */
export const FooterVariations: Story = {
  args: { children: "Card" },
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <Card title="Text footer" footer="Updated 2 hours ago">
        Body
      </Card>
      <Card
        title="Action footer"
        footer={
          <button type="button" style={{ cursor: "pointer" }}>
            Learn more
          </button>
        }
      >
        Body
      </Card>
    </div>
  ),
};

/**
 * Card on a dark background
 */
export const OnDarkBackground: Story = {
  args: {
    title: "On dark",
    children: "Card standing out against a dark surface.",
    elevated: true,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: "#0f172a",
          padding: "24px",
          borderRadius: "8px",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

/**
 * Kitchen sink: elevated, bordered, large padding, title, subtitle, footer
 */
export const KitchenSinkElevatedLarge: Story = {
  args: {
    title: "Kitchen Sink",
    subtitle: "All the bells and whistles",
    children: "Full featured card with every optional prop enabled.",
    footer: "Footer content here",
    elevated: true,
    bordered: true,
    padding: "large",
  },
};

/**
 * Kitchen sink: unbordered, small padding, clickable
 */
export const KitchenSinkUnborderedSmallClickable: Story = {
  args: {
    title: "Compact clickable",
    children: "Small padding, no border, clickable.",
    bordered: false,
    padding: "small",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByText("Compact clickable");
    await userEvent.click(card);
    expect(args.onClick).toHaveBeenCalled();
  },
};

/**
 * Kitchen sink: none padding with footer
 */
export const KitchenSinkNonePaddingWithFooter: Story = {
  args: {
    title: "Flush",
    children: "No padding card with a footer.",
    footer: "Footer",
    padding: "none",
  },
};

/**
 * Click fires handler once
 */
export const ClickFiresHandlerOnce: Story = {
  args: {
    title: "Click once",
    children: "Single click test",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("Click once"));
    expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/**
 * Multiple clicks fire handler multiple times
 */
export const ClickFiresHandlerMultipleTimes: Story = {
  args: {
    title: "Click thrice",
    children: "Multi click test",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText("Click thrice");
    await userEvent.click(title);
    await userEvent.click(title);
    await userEvent.click(title);
    expect(args.onClick).toHaveBeenCalledTimes(3);
  },
};

/**
 * Clickable card shows pointer cursor
 */
export const ClickablePointerCursor: Story = {
  args: {
    title: "Hover me",
    children: "Should show pointer cursor",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText("Hover me");
    const card = title.closest("div")?.parentElement as HTMLElement;
    await expect(card).toHaveStyle({ cursor: "pointer" });
  },
};

/**
 * Non-clickable card shows default cursor
 */
export const NonClickableDefaultCursor: Story = {
  args: {
    title: "No handler",
    children: "Default cursor",
    onClick: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText("No handler");
    const card = title.closest("div")?.parentElement as HTMLElement;
    await expect(card).toHaveStyle({ cursor: "default" });
  },
};

/**
 * No onClick does not throw on click
 */
export const NoOnClickNoThrowOnClick: Story = {
  args: {
    title: "Safe click",
    children: "Should not throw",
    onClick: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      userEvent.click(canvas.getByText("Safe click"))
    ).resolves.not.toThrow();
  },
};

/**
 * Hover lift on clickable card
 */
export const HoverOpacityAndLift: Story = {
  args: {
    title: "Hover for lift",
    children: "Opacity should drop slightly",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText("Hover for lift");
    const card = title.closest("div")?.parentElement as HTMLElement;
    await userEvent.hover(card);
    await expect(card).toHaveStyle({ opacity: "0.95" });
    await userEvent.unhover(card);
    await expect(card).toHaveStyle({ opacity: "1" });
  },
};

/**
 * Hover does not change opacity without onClick
 */
export const HoverNoChangeWithoutOnClick: Story = {
  args: {
    title: "No hover effect",
    children: "Opacity stays at 1",
    onClick: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText("No hover effect");
    const card = title.closest("div")?.parentElement as HTMLElement;
    await userEvent.hover(card);
    await expect(card).toHaveStyle({ opacity: "1" });
  },
};

/**
 * Two independently clickable cards
 */
export const CardGroupClickTracking: Story = {
  args: { children: "Card" },
  render: () => {
    const ClickTracker = () => {
      const [clicks, setClicks] = useState({ first: 0, second: 0 });

      return (
        <div style={{ display: "flex", gap: "16px" }}>
          <Card
            title={`First (${clicks.first})`}
            onClick={() => setClicks((c) => ({ ...c, first: c.first + 1 }))}
          >
            First card
          </Card>
          <Card
            title={`Second (${clicks.second})`}
            onClick={() => setClicks((c) => ({ ...c, second: c.second + 1 }))}
          >
            Second card
          </Card>
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

/**
 * Subtitle only without title
 */
export const SubtitleOnly: Story = {
  args: {
    subtitle: "Subtitle without a title",
    children: "Body still renders below.",
  },
};

/**
 * Empty string children
 */
export const EmptyStringChildren: Story = {
  args: {
    title: "Empty body",
    children: "",
  },
};

/**
 * Whitespace-only children
 */
export const WhitespaceOnlyChildren: Story = {
  args: {
    title: "Whitespace body",
    children: "   ",
  },
};

/**
 * Zero as children
 */
export const ZeroAsNumericChildren: Story = {
  args: {
    title: "Zero",
    children: 0,
  },
};

/**
 * Product-style card with footer action
 */
export const ProductCard: Story = {
  args: {
    title: "Wireless Headphones",
    subtitle: "Audio · Electronics",
    children: "Premium noise-cancelling headphones with 30-hour battery life.",
    footer: "$299.00",
    elevated: true,
  },
};

/**
 * Profile-style card
 */
export const ProfileCard: Story = {
  args: {
    title: "Jane Doe",
    subtitle: "Product Designer",
    children: "Building delightful interfaces and design systems.",
    footer: "San Francisco, CA",
    bordered: true,
  },
};

/**
 * Alert-style card with error-ish content
 */
export const AlertCard: Story = {
  args: {
    title: "Payment failed",
    subtitle: "Action required",
    children: "Your last payment could not be processed. Please update your card.",
    footer: "Retry payment",
    elevated: true,
  },
};

/**
 * Minimal compact card
 */
export const CompactMinimal: Story = {
  args: {
    children: "Compact note",
    padding: "small",
    bordered: true,
    elevated: false,
    onClick: undefined,
  },
};

/**
 * Large padding elevated product teaser
 */
export const LargeElevatedTeaser: Story = {
  args: {
    title: "New release",
    subtitle: "Version 2.0 is here",
    children: "Discover redesigned workflows and faster performance.",
    footer: "Read the changelog",
    padding: "large",
    elevated: true,
  },
};

/**
 * Card with ReactNode footer containing multiple elements
 */
export const ComplexFooter: Story = {
  args: {
    title: "Team invite",
    children: "You have been invited to join the Design team.",
    footer: (
      <div style={{ display: "flex", gap: "8px" }}>
        <span>Accept</span>
        <span>Decline</span>
      </div>
    ),
  },
};

/**
 * Grid of three cards
 */
export const ThreeCardGrid: Story = {
  args: { children: "Card" },
  render: () => (
    <div style={{ display: "flex", gap: "16px" }}>
      <Card title="One" elevated>
        First
      </Card>
      <Card title="Two" elevated>
        Second
      </Card>
      <Card title="Three" elevated>
        Third
      </Card>
    </div>
  ),
};

/**
 * Mixed elevated and flat cards in a group
 */
export const MixedElevatedGroup: Story = {
  args: { children: "Card" },
  render: () => (
    <div style={{ display: "flex", gap: "16px" }}>
      <Card title="Elevated" elevated>
        Shadow
      </Card>
      <Card title="Flat" elevated={false}>
        Flat
      </Card>
      <Card title="Elevated again" elevated bordered={false}>
        Shadow no border
      </Card>
    </div>
  ),
};

/**
 * Card with short single character body
 */
export const ShortSingleCharacter: Story = {
  args: {
    title: "Single char",
    children: "A",
  },
};

/**
 * Card verifying large padding via play
 */
export const LargePaddingStyleAssertion: Story = {
  args: {
    title: "Large padding check",
    children: "Body",
    padding: "large",
    onClick: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText("Large padding check");
    const card = title.closest("div")?.parentElement as HTMLElement;
    await expect(card).toHaveStyle({ padding: "1.5rem" });
  },
};

/**
 * Card verifying small padding via play
 */
export const SmallPaddingStyleAssertion: Story = {
  args: {
    title: "Small padding check",
    children: "Body",
    padding: "small",
    onClick: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText("Small padding check");
    const card = title.closest("div")?.parentElement as HTMLElement;
    await expect(card).toHaveStyle({ padding: "0.5rem" });
  },
};
