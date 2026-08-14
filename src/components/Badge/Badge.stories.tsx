import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect } from "storybook/test";
import Badge from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "error", "info"],
      description: "Variant style of the badge",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Size of the badge",
    },
    children: {
      control: "text",
      description: "Content displayed in the badge",
    },
    rounded: {
      control: "boolean",
      description: "Whether the badge should have fully rounded corners",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default badge with medium size and default variant
 */
export const Default: Story = {
  args: {
    children: "Default",
    variant: "default",
    size: "medium",
  },
};

/**
 * Badge with success variant
 */
export const Success: Story = {
  args: {
    children: "Success",
    variant: "success",
    size: "medium",
  },
};

/**
 * Badge with warning variant
 */
export const Warning: Story = {
  args: {
    children: "Warning",
    variant: "warning",
    size: "medium",
  },
};

/**
 * Badge with error variant
 */
export const Error: Story = {
  args: {
    children: "Error",
    variant: "error",
    size: "medium",
  },
};

/**
 * Badge with info variant
 */
export const Info: Story = {
  args: {
    children: "Info",
    variant: "info",
    size: "medium",
  },
};

/**
 * Small sized badge
 */
export const Small: Story = {
  args: {
    children: "Small",
    variant: "default",
    size: "small",
  },
};

/**
 * Medium sized badge (default)
 */
export const Medium: Story = {
  args: {
    children: "Medium",
    variant: "default",
    size: "medium",
  },
};

/**
 * Large sized badge
 */
export const Large: Story = {
  args: {
    children: "Large",
    variant: "default",
    size: "large",
  },
};

/**
 * Rounded badge with pill-shaped corners
 */
export const Rounded: Story = {
  args: {
    children: "Rounded",
    variant: "default",
    size: "medium",
    rounded: true,
  },
};

/**
 * Square-cornered badge (rounded false)
 */
export const NotRounded: Story = {
  args: {
    children: "Not Rounded",
    variant: "default",
    size: "medium",
    rounded: false,
  },
};

/**
 * Badges showcasing all variants side by side
 */
export const AllVariants: Story = {
  args: { children: "Badge" },
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

/**
 * Badges showcasing all sizes side by side
 */
export const AllSizes: Story = {
  args: { children: "Badge" },
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Badge size="small">Small</Badge>
      <Badge size="medium">Medium</Badge>
      <Badge size="large">Large</Badge>
    </div>
  ),
};

/**
 * Multiple badges displayed together as status tags
 */
export const MultipleBadges: Story = {
  args: { children: "Badge" },
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Badge variant="default" size="small">
        New
      </Badge>
      <Badge variant="success" size="small">
        Active
      </Badge>
      <Badge variant="warning" size="small">
        Pending
      </Badge>
      <Badge variant="error" size="small">
        Failed
      </Badge>
      <Badge variant="info" size="small">
        Beta
      </Badge>
    </div>
  ),
};

/**
 * Mixed sizes and variants combined
 */
export const MixedSizesAndVariants: Story = {
  args: { children: "Badge" },
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "12px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Badge variant="default" size="small">
        Small Default
      </Badge>
      <Badge variant="success" size="medium">
        Medium Success
      </Badge>
      <Badge variant="warning" size="large">
        Large Warning
      </Badge>
      <Badge variant="error" size="medium" rounded>
        Medium Error Rounded
      </Badge>
    </div>
  ),
};

/**
 * Small success badge
 */
export const SmallSuccess: Story = {
  args: {
    children: "Small Success",
    variant: "success",
    size: "small",
  },
};

/**
 * Large success badge
 */
export const LargeSuccess: Story = {
  args: {
    children: "Large Success",
    variant: "success",
    size: "large",
  },
};

/**
 * Small warning badge
 */
export const SmallWarning: Story = {
  args: {
    children: "Small Warning",
    variant: "warning",
    size: "small",
  },
};

/**
 * Large warning badge
 */
export const LargeWarning: Story = {
  args: {
    children: "Large Warning",
    variant: "warning",
    size: "large",
  },
};

/**
 * Small error badge
 */
export const SmallError: Story = {
  args: {
    children: "Small Error",
    variant: "error",
    size: "small",
  },
};

/**
 * Large error badge
 */
export const LargeError: Story = {
  args: {
    children: "Large Error",
    variant: "error",
    size: "large",
  },
};

/**
 * Small info badge
 */
export const SmallInfo: Story = {
  args: {
    children: "Small Info",
    variant: "info",
    size: "small",
  },
};

/**
 * Large info badge
 */
export const LargeInfo: Story = {
  args: {
    children: "Large Info",
    variant: "info",
    size: "large",
  },
};

/**
 * Rounded success badge
 */
export const RoundedSuccess: Story = {
  args: {
    children: "Rounded Success",
    variant: "success",
    rounded: true,
  },
};

/**
 * Rounded error badge
 */
export const RoundedError: Story = {
  args: {
    children: "Rounded Error",
    variant: "error",
    rounded: true,
  },
};

/**
 * Rounded info badge at large size
 */
export const RoundedLargeInfo: Story = {
  args: {
    children: "Rounded Large Info",
    variant: "info",
    size: "large",
    rounded: true,
  },
};

/**
 * Rounded small warning badge
 */
export const RoundedSmallWarning: Story = {
  args: {
    children: "Rounded Small Warning",
    variant: "warning",
    size: "small",
    rounded: true,
  },
};

/**
 * Badge with long text content
 */
export const LongTextContent: Story = {
  args: {
    children:
      "This is a very long badge label that contains a lot of text to test wrapping",
  },
};

/**
 * Badge with a single short character
 */
export const ShortSingleCharacter: Story = {
  args: {
    children: "A",
  },
};

/**
 * Badge with emoji content
 */
export const EmojiContent: Story = {
  args: {
    children: "🎉 New",
  },
};

/**
 * Badge with RTL unicode content
 */
export const RTLContent: Story = {
  args: {
    children: "مرحبا",
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
 * Badge with numeric-looking string content
 */
export const NumericContent: Story = {
  args: {
    children: "42",
  },
};

/**
 * Badge with count-style content
 */
export const CountBadge: Story = {
  args: {
    children: "99+",
    variant: "error",
    size: "small",
    rounded: true,
  },
};

/**
 * Badge rendered on a dark background
 */
export const OnDarkBackground: Story = {
  args: {
    children: "On dark",
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
 * All rounded variants together
 */
export const AllRoundedVariants: Story = {
  args: { children: "Badge" },
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Badge variant="default" rounded>
        Default
      </Badge>
      <Badge variant="success" rounded>
        Success
      </Badge>
      <Badge variant="warning" rounded>
        Warning
      </Badge>
      <Badge variant="error" rounded>
        Error
      </Badge>
      <Badge variant="info" rounded>
        Info
      </Badge>
    </div>
  ),
};

/**
 * Status row of small rounded badges
 */
export const StatusRow: Story = {
  args: { children: "Badge" },
  render: () => (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <Badge variant="success" size="small" rounded>
        Online
      </Badge>
      <Badge variant="warning" size="small" rounded>
        Away
      </Badge>
      <Badge variant="error" size="small" rounded>
        Offline
      </Badge>
      <Badge variant="info" size="small" rounded>
        Idle
      </Badge>
    </div>
  ),
};

/**
 * Kitchen sink: error, large, rounded
 */
export const KitchenSinkErrorLargeRounded: Story = {
  args: {
    children: "Kitchen sink: error, large, rounded",
    variant: "error",
    size: "large",
    rounded: true,
  },
};

/**
 * Kitchen sink: info, small, not rounded
 */
export const KitchenSinkInfoSmallSquare: Story = {
  args: {
    children: "Kitchen sink: info, small, square",
    variant: "info",
    size: "small",
    rounded: false,
  },
};

/**
 * Kitchen sink: success, medium, rounded with long text
 */
export const KitchenSinkSuccessRoundedLongText: Story = {
  args: {
    children: "Kitchen sink success rounded with longer label text",
    variant: "success",
    size: "medium",
    rounded: true,
  },
};

/**
 * Kitchen sink: all variants at large size rounded
 */
export const KitchenSinkAllVariantsLargeRounded: Story = {
  args: { children: "Badge" },
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <Badge variant="default" size="large" rounded>
        Default large
      </Badge>
      <Badge variant="success" size="large" rounded>
        Success large
      </Badge>
      <Badge variant="warning" size="large" rounded>
        Warning large
      </Badge>
      <Badge variant="error" size="large" rounded>
        Error large
      </Badge>
      <Badge variant="info" size="large" rounded>
        Info large
      </Badge>
    </div>
  ),
};

/**
 * Whitespace-only children
 */
export const WhitespaceOnlyChildren: Story = {
  args: {
    children: "   ",
  },
};

/**
 * Zero as numeric children
 */
export const ZeroAsNumericChildren: Story = {
  args: {
    children: 0,
  },
};

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
    const badge = canvas.getByText("Small styles");
    await expect(badge).toHaveStyle({ height: "1rem" });
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
    const badge = canvas.getByText("Large styles");
    await expect(badge).toHaveStyle({ height: "1.5rem" });
  },
};

/**
 * Medium success rounded badge
 */
export const MediumSuccessRounded: Story = {
  args: {
    children: "Medium Success Rounded",
    variant: "success",
    size: "medium",
    rounded: true,
  },
};

/**
 * Medium error not rounded
 */
export const MediumErrorSquare: Story = {
  args: {
    children: "Medium Error Square",
    variant: "error",
    size: "medium",
    rounded: false,
  },
};

/**
 * Notification-style count badges group
 */
export const NotificationCounts: Story = {
  args: { children: "Badge" },
  render: () => (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <Badge variant="error" size="small" rounded>
        1
      </Badge>
      <Badge variant="error" size="small" rounded>
        5
      </Badge>
      <Badge variant="error" size="small" rounded>
        12
      </Badge>
      <Badge variant="error" size="small" rounded>
        99+
      </Badge>
    </div>
  ),
};

/**
 * Badge next to plain text for inline usage
 */
export const InlineWithText: Story = {
  args: { children: "Badge" },
  render: () => (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <span style={{ fontSize: "14px" }}>Notifications</span>
      <Badge variant="error" size="small" rounded>
        3
      </Badge>
    </div>
  ),
};

/**
 * Empty string children edge case
 */
export const EmptyStringChildren: Story = {
  args: {
    children: "",
  },
};

/**
 * Warning rounded large with emoji
 */
export const WarningRoundedLargeEmoji: Story = {
  args: {
    children: "⚠️ Caution",
    variant: "warning",
    size: "large",
    rounded: true,
  },
};

/**
 * Info small square badge
 */
export const InfoSmallSquare: Story = {
  args: {
    children: "Tip",
    variant: "info",
    size: "small",
    rounded: false,
  },
};

/**
 * Default large rounded badge
 */
export const DefaultLargeRounded: Story = {
  args: {
    children: "Featured",
    variant: "default",
    size: "large",
    rounded: true,
  },
};

/**
 * Mixed rounded and square badges in a group
 */
export const MixedRoundedAndSquare: Story = {
  args: { children: "Badge" },
  render: () => (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <Badge variant="default" rounded>
        Rounded
      </Badge>
      <Badge variant="default" rounded={false}>
        Square
      </Badge>
      <Badge variant="success" rounded>
        Rounded
      </Badge>
      <Badge variant="error" rounded={false}>
        Square
      </Badge>
    </div>
  ),
};
