import type { Meta, StoryObj } from "@storybook/react-vite";
import Divider from "./Divider";
import { ark } from "@ark-ui/react/factory";

const meta = {
  title: "Components/Divider",
  component: Divider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "color",
      description: "Color of the divider line",
    },
    inverted: {
      control: "boolean",
      description: "Renders the divider in inverted colors",
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default divider with gray color
 */
export const Default: Story = {
  args: {
    color: "#d1d5db",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ width: "400px" }}>
      <ark.p style={{ margin: "0 0 16px 0", color: "#374151" }}>
        Content above the divider
      </ark.p>
      <Divider {...args} />
      <ark.p style={{ margin: "16px 0 0 0", color: "#374151" }}>
        Content below the divider
      </ark.p>
    </ark.div>
  ),
};

/**
 * Divider with custom red color
 */
export const CustomColor: Story = {
  args: {
    color: "#ef4444",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ width: "400px" }}>
      <ark.p style={{ margin: "0 0 16px 0", color: "#374151" }}>
        Content above the divider
      </ark.p>
      <Divider {...args} />
      <ark.p style={{ margin: "16px 0 0 0", color: "#374151" }}>
        Content below the divider
      </ark.p>
    </ark.div>
  ),
};

/**
 * Divider with custom blue color
 */
export const BlueColor: Story = {
  args: {
    color: "#3b82f6",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ width: "400px" }}>
      <ark.p style={{ margin: "0 0 16px 0", color: "#374151" }}>
        Content above the divider
      </ark.p>
      <Divider {...args} />
      <ark.p style={{ margin: "16px 0 0 0", color: "#374151" }}>
        Content below the divider
      </ark.p>
    </ark.div>
  ),
};

/**
 * Divider with inverted colors (white divider on dark background)
 */
export const Inverted: Story = {
  args: {
    color: "#ffffff",
    inverted: true,
  },
  render: (args) => (
    <ark.div style={{ width: "400px" }}>
      <ark.p
        style={{
          margin: "0 0 16px 0",
          color: "#ffffff",
          padding: "16px 0 0 0",
        }}
      >
        Content above the divider
      </ark.p>
      <Divider {...args} />
      <ark.p
        style={{
          margin: "16px 0 0 0",
          color: "#ffffff",
          paddingBottom: "16px",
        }}
      >
        Content below the divider
      </ark.p>
    </ark.div>
  ),
};

/**
 * Divider with thick green line
 */
export const ThickGreen: Story = {
  args: {
    color: "#10b981",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ width: "400px" }}>
      <ark.div
        style={{
          height: "2px",
          backgroundColor: "#10b981",
          margin: "16px 0",
        }}
      >
        <Divider {...args} />
      </ark.div>
    </ark.div>
  ),
};

/**
 * Multiple dividers showcasing different colors
 */
export const MultipleColors: Story = {
  render: () => (
    <ark.div style={{ width: "400px" }}>
      <ark.h3 style={{ color: "#374151", margin: "0 0 8px 0" }}>
        Section 1
      </ark.h3>
      <Divider color="#ef4444" />
      <ark.h3 style={{ color: "#374151", margin: "0 0 8px 0" }}>
        Section 2
      </ark.h3>
      <Divider color="#3b82f6" />
      <ark.h3 style={{ color: "#374151", margin: "0 0 8px 0" }}>
        Section 3
      </ark.h3>
      <Divider color="#10b981" />
      <ark.h3 style={{ color: "#374151", margin: "0 0 8px 0" }}>
        Section 4
      </ark.h3>
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * Named design-token colors (8)
 * ---------------------------------------------------------------------- */

/**
 * Divider using the orange design token
 */
export const OrangeColor: Story = {
  args: {
    color: "#FF4400",
  },
};

/**
 * Divider using the green design token
 */
export const GreenColor: Story = {
  args: {
    color: "#66BF3C",
  },
};

/**
 * Divider using the yellow design token
 */
export const YellowColor: Story = {
  args: {
    color: "#FFAE00",
  },
};

/**
 * Divider using the purple design token
 */
export const PurpleColor: Story = {
  args: {
    color: "#6F2CAC",
  },
};

/**
 * Divider using the pink design token
 */
export const PinkColor: Story = {
  args: {
    color: "#FF4785",
  },
};

/**
 * Divider using the cyan design token
 */
export const CyanColor: Story = {
  args: {
    color: "#37D5D3",
  },
};

/**
 * Divider using the slate design token
 */
export const SlateColor: Story = {
  args: {
    color: "hsl(212 10% 50%)",
  },
};

/**
 * Divider using solid black
 */
export const BlackColor: Story = {
  args: {
    color: "#000000",
  },
};

/* -------------------------------------------------------------------------
 * CSS color format variations (7)
 * ---------------------------------------------------------------------- */

/**
 * Divider using a CSS named color keyword
 */
export const NamedCssColor: Story = {
  args: {
    color: "tomato",
  },
};

/**
 * Divider using a 3-digit shorthand hex color
 */
export const ShortHexColor: Story = {
  args: {
    color: "#f00",
  },
};

/**
 * Divider using an 8-digit hex color with an alpha channel
 */
export const EightDigitHexWithAlpha: Story = {
  args: {
    color: "#3b82f680",
  },
};

/**
 * Divider using the rgb() function notation
 */
export const RgbColorFunction: Story = {
  args: {
    color: "rgb(59, 130, 246)",
  },
};

/**
 * Divider using the rgba() function notation with transparency
 */
export const RgbaColorFunction: Story = {
  args: {
    color: "rgba(16, 185, 129, 0.5)",
  },
};

/**
 * Divider using the hsl() function notation
 */
export const HslColorFunction: Story = {
  args: {
    color: "hsl(200, 100%, 50%)",
  },
};

/**
 * Divider using the currentColor keyword, inheriting the surrounding text
 * color from its container
 */
export const CurrentColorValue: Story = {
  args: {
    color: "currentColor",
  },
  decorators: [
    (Story) => (
      <div style={{ color: "#e81c61" }}>
        <Story />
      </div>
    ),
  ],
};

/* -------------------------------------------------------------------------
 * Inverted crossed with color/context combinations (5)
 * ---------------------------------------------------------------------- */

/**
 * When inverted is true, any custom color prop is ignored in favor of white
 */
export const InvertedIgnoresCustomColor: Story = {
  args: {
    color: "#ef4444",
    inverted: true,
  },
};

/**
 * Inverted divider rendered inside a card-like surface
 */
export const InvertedOnCard: Story = {
  args: {
    inverted: true,
  },
  render: (args) => (
    <ark.div
      style={{
        width: "360px",
        backgroundColor: "#1e293b",
        borderRadius: "12px",
        padding: "16px",
      }}
    >
      <ark.p style={{ margin: "0 0 8px 0", color: "#ffffff" }}>
        Card heading
      </ark.p>
      <Divider {...args} />
      <ark.p style={{ margin: "8px 0 0 0", color: "#cbd5e1" }}>
        Card body content
      </ark.p>
    </ark.div>
  ),
};

/**
 * Inverted divider used inside a dark sidebar navigation
 */
export const InvertedInSidebarNav: Story = {
  args: {
    inverted: true,
  },
  render: (args) => (
    <ark.div
      style={{
        width: "220px",
        backgroundColor: "#0f172a",
        padding: "16px",
        borderRadius: "8px",
      }}
    >
      <ark.p style={{ margin: 0, color: "#ffffff", fontSize: "14px" }}>
        Dashboard
      </ark.p>
      <ark.p style={{ margin: 0, color: "#ffffff", fontSize: "14px" }}>
        Reports
      </ark.p>
      <Divider {...args} />
      <ark.p style={{ margin: 0, color: "#ffffff", fontSize: "14px" }}>
        Settings
      </ark.p>
      <ark.p style={{ margin: 0, color: "#ffffff", fontSize: "14px" }}>
        Logout
      </ark.p>
    </ark.div>
  ),
};

/**
 * Inverted divider nested two levels deep inside another dark section
 */
export const InvertedNestedInDarkSection: Story = {
  args: {
    inverted: true,
  },
  render: (args) => (
    <ark.div style={{ backgroundColor: "#111827", padding: "24px" }}>
      <ark.div style={{ backgroundColor: "#1f2937", padding: "16px" }}>
        <ark.p style={{ margin: "0 0 8px 0", color: "#f9fafb" }}>
          Nested dark surface
        </ark.p>
        <Divider {...args} />
        <ark.p style={{ margin: "8px 0 0 0", color: "#f9fafb" }}>
          Still nested
        </ark.p>
      </ark.div>
    </ark.div>
  ),
};

/**
 * Explicitly setting inverted to false alongside a custom color
 */
export const InvertedExplicitFalse: Story = {
  args: {
    color: "#489524",
    inverted: false,
  },
};

/* -------------------------------------------------------------------------
 * Usage-context decorators: real-world placements (12)
 * ---------------------------------------------------------------------- */

/**
 * Divider used as a separator between list items
 */
export const InListItems: Story = {
  render: () => (
    <ark.ul
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        width: "320px",
      }}
    >
      <ark.li style={{ padding: "8px 0", color: "#374151" }}>First item</ark.li>
      <Divider />
      <ark.li style={{ padding: "8px 0", color: "#374151" }}>Second item</ark.li>
      <Divider />
      <ark.li style={{ padding: "8px 0", color: "#374151" }}>Third item</ark.li>
    </ark.ul>
  ),
};

/**
 * Divider separating the header and body of a card component
 */
export const InCard: Story = {
  render: () => (
    <ark.div
      style={{
        width: "320px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "16px",
      }}
    >
      <ark.h3 style={{ margin: 0, color: "#111827" }}>Card title</ark.h3>
      <Divider />
      <ark.p style={{ margin: 0, color: "#4b5563" }}>
        Supporting card description text goes here.
      </ark.p>
    </ark.div>
  ),
};

/**
 * Divider used to visually separate two sections of a longer form
 */
export const BetweenFormSections: Story = {
  render: () => (
    <ark.div style={{ width: "320px" }}>
      <ark.h4 style={{ margin: "0 0 8px 0", color: "#111827" }}>
        Personal information
      </ark.h4>
      <ark.p style={{ margin: 0, color: "#6b7280" }}>Name, email, phone</ark.p>
      <Divider />
      <ark.h4 style={{ margin: "0 0 8px 0", color: "#111827" }}>
        Billing information
      </ark.h4>
      <ark.p style={{ margin: 0, color: "#6b7280" }}>
        Card number, address
      </ark.p>
    </ark.div>
  ),
};

/**
 * Divider used inside a horizontal navigation menu
 */
export const InNavigationMenu: Story = {
  render: () => (
    <ark.div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        width: "320px",
      }}
    >
      <ark.span style={{ color: "#374151" }}>Home</ark.span>
      <ark.span style={{ color: "#374151" }}>About</ark.span>
      <Divider />
      <ark.span style={{ color: "#374151" }}>Contact</ark.span>
    </ark.div>
  ),
};

/**
 * Several dividers stacked directly on top of one another with no other
 * content in between
 */
export const StackedMultipleDividers: Story = {
  render: () => (
    <ark.div style={{ width: "320px" }}>
      <Divider color="#ef4444" />
      <Divider color="#3b82f6" />
      <Divider color="#10b981" />
      <Divider color="#f59e0b" />
    </ark.div>
  ),
};

/**
 * Divider separating price from feature list in a pricing tier card
 */
export const InPricingTierCard: Story = {
  render: () => (
    <ark.div
      style={{
        width: "260px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <ark.h3 style={{ margin: 0, color: "#111827" }}>Pro plan</ark.h3>
      <ark.p style={{ margin: "8px 0", fontSize: "24px", color: "#111827" }}>
        $29/mo
      </ark.p>
      <Divider />
      <ark.p style={{ margin: "8px 0", color: "#4b5563" }}>
        Unlimited projects
      </ark.p>
      <ark.p style={{ margin: 0, color: "#4b5563" }}>Priority support</ark.p>
    </ark.div>
  ),
};

/**
 * Divider grouping related rows within a settings panel
 */
export const InSettingsPanel: Story = {
  render: () => (
    <ark.div style={{ width: "320px" }}>
      <ark.p style={{ margin: 0, color: "#111827" }}>Email notifications</ark.p>
      <ark.p style={{ margin: 0, color: "#111827" }}>SMS notifications</ark.p>
      <Divider />
      <ark.p style={{ margin: 0, color: "#111827" }}>Two-factor auth</ark.p>
      <ark.p style={{ margin: 0, color: "#111827" }}>Connected devices</ark.p>
    </ark.div>
  ),
};

/**
 * Divider used to separate groups of options inside a dropdown menu
 */
export const InDropdownMenu: Story = {
  render: () => (
    <ark.div
      style={{
        width: "200px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "8px 0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <ark.p style={{ margin: 0, padding: "6px 12px", color: "#111827" }}>
        Profile
      </ark.p>
      <ark.p style={{ margin: 0, padding: "6px 12px", color: "#111827" }}>
        Settings
      </ark.p>
      <Divider />
      <ark.p style={{ margin: 0, padding: "6px 12px", color: "#dc2626" }}>
        Sign out
      </ark.p>
    </ark.div>
  ),
};

/**
 * Divider used between rows in a list of user profiles
 */
export const BetweenUserProfileRows: Story = {
  render: () => (
    <ark.div style={{ width: "320px" }}>
      <ark.div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <ark.div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "9999px",
            backgroundColor: "#93c5fd",
          }}
        />
        <ark.span style={{ color: "#111827" }}>Jane Doe</ark.span>
      </ark.div>
      <Divider />
      <ark.div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <ark.div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "9999px",
            backgroundColor: "#fca5a5",
          }}
        />
        <ark.span style={{ color: "#111827" }}>John Smith</ark.span>
      </ark.div>
    </ark.div>
  ),
};

/**
 * Divider separating consecutive messages in a chat message list
 */
export const InChatMessageList: Story = {
  render: () => (
    <ark.div style={{ width: "320px" }}>
      <ark.p style={{ margin: 0, color: "#111827" }}>
        Hey, are we still on for today?
      </ark.p>
      <Divider color="hsl(212 49% 90%)" />
      <ark.p style={{ margin: 0, color: "#111827" }}>
        Yes, see you at 3pm!
      </ark.p>
    </ark.div>
  ),
};

/**
 * Vertical-style divider usage inside a horizontal toolbar of actions
 */
export const InToolbar: Story = {
  render: () => (
    <ark.div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        width: "280px",
        padding: "8px",
        border: "1px solid #e5e7eb",
        borderRadius: "6px",
      }}
    >
      <ark.span style={{ color: "#374151" }}>Bold</ark.span>
      <ark.span style={{ color: "#374151" }}>Italic</ark.span>
      <Divider />
      <ark.span style={{ color: "#374151" }}>Align</ark.span>
      <ark.span style={{ color: "#374151" }}>Link</ark.span>
    </ark.div>
  ),
};

/**
 * Divider separating consecutive entries in a blog post list
 */
export const BetweenBlogPostEntries: Story = {
  render: () => (
    <ark.div style={{ width: "360px" }}>
      <ark.h4 style={{ margin: 0, color: "#111827" }}>
        First post title
      </ark.h4>
      <ark.p style={{ margin: "4px 0 0 0", color: "#6b7280" }}>
        Published on Jan 1
      </ark.p>
      <Divider />
      <ark.h4 style={{ margin: 0, color: "#111827" }}>
        Second post title
      </ark.h4>
      <ark.p style={{ margin: "4px 0 0 0", color: "#6b7280" }}>
        Published on Jan 8
      </ark.p>
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * Background contexts (5)
 * ---------------------------------------------------------------------- */

/**
 * Divider rendered on a plain white background
 */
export const OnWhiteBackground: Story = {
  render: (args) => (
    <ark.div style={{ width: "320px", backgroundColor: "#ffffff", padding: "16px" }}>
      <Divider {...args} />
    </ark.div>
  ),
};

/**
 * Divider rendered on a light gray background
 */
export const OnLightGrayBackground: Story = {
  render: (args) => (
    <ark.div style={{ width: "320px", backgroundColor: "#f3f4f6", padding: "16px" }}>
      <Divider {...args} />
    </ark.div>
  ),
};

/**
 * Divider rendered on a colored (light blue) background
 */
export const OnColoredBackground: Story = {
  args: {
    color: "#1d4ed8",
  },
  render: (args) => (
    <ark.div style={{ width: "320px", backgroundColor: "#dbeafe", padding: "16px" }}>
      <Divider {...args} />
    </ark.div>
  ),
};

/**
 * Non-inverted divider rendered on a dark background - an edge case since the
 * default light divider color becomes very low-contrast without `inverted`
 */
export const OnDarkBackgroundNonInverted: Story = {
  render: (args) => (
    <ark.div style={{ width: "320px", backgroundColor: "#0f172a", padding: "16px" }}>
      <Divider {...args} />
    </ark.div>
  ),
};

/**
 * Divider rendered on a gradient background
 */
export const OnGradientBackground: Story = {
  args: {
    color: "#ffffff",
  },
  render: (args) => (
    <ark.div
      style={{
        width: "320px",
        padding: "16px",
        background: "linear-gradient(90deg, #6366f1, #ec4899)",
      }}
    >
      <Divider {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * Layout/width contexts (4)
 * ---------------------------------------------------------------------- */

/**
 * Divider inside a very narrow container
 */
export const NarrowContainer: Story = {
  render: (args) => (
    <ark.div style={{ width: "120px" }}>
      <Divider {...args} />
    </ark.div>
  ),
};

/**
 * Divider inside a full-width container
 */
export const FullWidthContainer: Story = {
  render: (args) => (
    <ark.div style={{ width: "100%" }}>
      <Divider {...args} />
    </ark.div>
  ),
};

/**
 * Divider rendered without any surrounding wrapper element
 */
export const WithoutWrapperDiv: Story = {
  args: {},
};

/**
 * Divider inside a height-constrained flex container alongside other content
 */
export const InsideConstrainedHeightContainer: Story = {
  render: (args) => (
    <ark.div
      style={{
        width: "320px",
        height: "80px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        border: "1px solid #e5e7eb",
      }}
    >
      <Divider {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * Edge-case color values (3)
 * ---------------------------------------------------------------------- */

/**
 * Divider rendered with an empty string as the color value
 */
export const EmptyStringColor: Story = {
  args: {
    color: "",
  },
};

/**
 * Divider rendered with a CSS custom property reference (with fallback) as
 * the color value
 */
export const CssVariableColor: Story = {
  args: {
    color: "var(--custom-divider-color, #14532d)",
  },
};

/**
 * Divider rendered with an invalid/unrecognized CSS color string, exercising
 * how the component behaves when given a nonsensical value
 */
export const InvalidColorStringFallback: Story = {
  args: {
    color: "not-a-real-color",
  },
};
