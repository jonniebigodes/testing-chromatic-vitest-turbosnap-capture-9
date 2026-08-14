import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import Skeleton from "./Skeleton";
import { color, spacing } from "../../tokens/tokens";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    width: {
      control: "text",
      description: "Width of the skeleton",
    },
    height: {
      control: "text",
      description: "Height of the skeleton",
    },
    variant: {
      control: "select",
      options: ["text", "circular", "rectangular"],
      description: "Visual shape variant",
    },
    lines: {
      control: "number",
      description: "Number of text lines when variant is text",
    },
    animated: {
      control: "boolean",
      description: "Whether to play a pulse animation",
    },
    borderRadius: {
      control: "text",
      description: "Custom border radius override",
    },
  },
  args: {
    variant: "text",
    animated: true,
    lines: 1,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "280px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default text skeleton
 */
export const Default: Story = {
  args: {
    variant: "text",
  },
};

/**
 * Text variant skeleton
 */
export const Text: Story = {
  args: {
    variant: "text",
  },
};

/**
 * Circular variant skeleton
 */
export const Circular: Story = {
  args: {
    variant: "circular",
  },
};

/**
 * Rectangular variant skeleton
 */
export const Rectangular: Story = {
  args: {
    variant: "rectangular",
  },
};

/**
 * Animated skeleton (default)
 */
export const Animated: Story = {
  args: {
    variant: "text",
    animated: true,
  },
};

/**
 * Static skeleton without animation
 */
export const NotAnimated: Story = {
  args: {
    variant: "text",
    animated: false,
  },
};

/**
 * Multiple text lines
 */
export const ThreeLines: Story = {
  args: {
    variant: "text",
    lines: 3,
  },
};

/**
 * Five text lines
 */
export const FiveLines: Story = {
  args: {
    variant: "text",
    lines: 5,
  },
};

/**
 * Custom numeric width and height
 */
export const CustomNumericSize: Story = {
  args: {
    variant: "rectangular",
    width: 200,
    height: 80,
  },
};

/**
 * Custom string width and height
 */
export const CustomStringSize: Story = {
  args: {
    variant: "rectangular",
    width: "100%",
    height: "120px",
  },
};

/**
 * Custom border radius
 */
export const CustomBorderRadius: Story = {
  args: {
    variant: "rectangular",
    height: 64,
    borderRadius: spacing[4],
  },
};

/**
 * Circular avatar-sized skeleton
 */
export const CircularAvatar: Story = {
  args: {
    variant: "circular",
    width: 48,
    height: 48,
  },
};

/**
 * Large circular skeleton
 */
export const CircularLarge: Story = {
  args: {
    variant: "circular",
    width: 96,
    height: 96,
  },
};

/**
 * All variants side by side
 */
export const AllVariants: Story = {
  args: { variant: "text" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Skeleton variant="text" />
      <Skeleton variant="circular" />
      <Skeleton variant="rectangular" height={80} />
    </div>
  ),
};

/**
 * Animated vs static comparison
 */
export const AnimatedVsStatic: Story = {
  args: { variant: "text" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Skeleton variant="text" lines={2} animated />
      <Skeleton variant="text" lines={2} animated={false} />
    </div>
  ),
};

/**
 * Card-like loading layout
 */
export const CardLayout: Story = {
  args: { variant: "text" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Skeleton variant="rectangular" height={140} />
      <Skeleton variant="text" lines={3} />
    </div>
  ),
};

/**
 * Profile row loading layout
 */
export const ProfileRow: Story = {
  args: { variant: "text" },
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Skeleton variant="circular" width={40} height={40} />
      <div style={{ flex: 1 }}>
        <Skeleton variant="text" lines={2} />
      </div>
    </div>
  ),
};

/**
 * Thin text line
 */
export const ThinText: Story = {
  args: {
    variant: "text",
    height: 8,
  },
};

/**
 * Thick text line
 */
export const ThickText: Story = {
  args: {
    variant: "text",
    height: 24,
  },
};

/**
 * Half width text
 */
export const HalfWidth: Story = {
  args: {
    variant: "text",
    width: "50%",
  },
};

/**
 * Fixed pixel width text
 */
export const FixedWidth: Story = {
  args: {
    variant: "text",
    width: 160,
  },
};

/**
 * Zero border radius rectangular
 */
export const SharpCorners: Story = {
  args: {
    variant: "rectangular",
    height: 60,
    borderRadius: "0px",
  },
};

/**
 * Fully rounded rectangular bar
 */
export const PillShape: Story = {
  args: {
    variant: "rectangular",
    height: 16,
    borderRadius: "9999px",
  },
};

/**
 * Two-line text skeleton
 */
export const TwoLines: Story = {
  args: {
    variant: "text",
    lines: 2,
  },
};

/**
 * Four-line text skeleton
 */
export const FourLines: Story = {
  args: {
    variant: "text",
    lines: 4,
  },
};

/**
 * Static circular skeleton
 */
export const StaticCircular: Story = {
  args: {
    variant: "circular",
    animated: false,
  },
};

/**
 * Static rectangular skeleton
 */
export const StaticRectangular: Story = {
  args: {
    variant: "rectangular",
    height: 100,
    animated: false,
  },
};

/**
 * Tall rectangular skeleton
 */
export const TallRectangular: Story = {
  args: {
    variant: "rectangular",
    height: 200,
  },
};

/**
 * Short rectangular skeleton
 */
export const ShortRectangular: Story = {
  args: {
    variant: "rectangular",
    height: 40,
  },
};

/**
 * On dark background
 */
export const OnDarkBackground: Story = {
  args: {
    variant: "text",
    lines: 3,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: color.slate900,
          padding: "24px",
          borderRadius: "8px",
          width: "280px",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

/**
 * Narrow container
 */
export const NarrowContainer: Story = {
  args: {
    variant: "text",
    lines: 3,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "160px" }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Wide container
 */
export const WideContainer: Story = {
  args: {
    variant: "rectangular",
    height: 80,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "480px" }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Verifies slate200 background via play
 */
export const SlateBackgroundAssertion: Story = {
  args: {
    variant: "text",
    animated: false,
  },
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector("div") as HTMLElement;
    // nested decorator wraps; find the skeleton leaf
    const skeleton = canvasElement.querySelectorAll("div")[
      canvasElement.querySelectorAll("div").length - 1
    ] as HTMLElement;
    await expect(skeleton).toHaveStyle({ backgroundColor: color.slate200 });
    expect(el).not.toBeNull();
  },
};

/**
 * Verifies circular border radius via play
 */
export const CircularRadiusAssertion: Story = {
  args: {
    variant: "circular",
    animated: false,
  },
  play: async ({ canvasElement }) => {
    const skeletons = canvasElement.querySelectorAll("div");
    const skeleton = skeletons[skeletons.length - 1] as HTMLElement;
    await expect(skeleton).toHaveStyle({ borderRadius: "50%" });
  },
};

/**
 * Verifies animation style when animated
 */
export const AnimationStyleAssertion: Story = {
  args: {
    variant: "text",
    animated: true,
  },
  play: async ({ canvasElement }) => {
    const skeletons = canvasElement.querySelectorAll("div");
    const skeleton = skeletons[skeletons.length - 1] as HTMLElement;
    expect(skeleton.style.animation).toContain("skeleton-pulse");
  },
};

/**
 * Verifies no animation when animated is false
 */
export const NoAnimationAssertion: Story = {
  args: {
    variant: "text",
    animated: false,
  },
  play: async ({ canvasElement }) => {
    const skeletons = canvasElement.querySelectorAll("div");
    const skeleton = skeletons[skeletons.length - 1] as HTMLElement;
    expect(skeleton.style.animation).toBe("");
  },
};

/**
 * Kitchen sink: rectangular custom size animated
 */
export const KitchenSinkRectangularCustom: Story = {
  args: {
    variant: "rectangular",
    width: 240,
    height: 120,
    animated: true,
    borderRadius: spacing[3],
  },
};

/**
 * Kitchen sink: multi-line text static
 */
export const KitchenSinkTextLinesStatic: Story = {
  args: {
    variant: "text",
    lines: 4,
    animated: false,
    height: 12,
  },
};

/**
 * Kitchen sink: circular custom radius override ignored by shape still 50%
 * unless borderRadius prop overrides
 */
export const KitchenSinkCircularOverrideRadius: Story = {
  args: {
    variant: "circular",
    width: 64,
    height: 64,
    borderRadius: "12px",
  },
};

/**
 * Media + text composite
 */
export const MediaAndTextComposite: Story = {
  args: { variant: "text" },
  render: () => (
    <div style={{ display: "flex", gap: "16px" }}>
      <Skeleton variant="rectangular" width={96} height={96} />
      <div style={{ flex: 1 }}>
        <Skeleton variant="text" lines={4} />
      </div>
    </div>
  ),
};

/**
 * List of profile rows
 */
export const ProfileList: Story = {
  args: { variant: "text" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{ display: "flex", gap: "12px", alignItems: "center" }}
        >
          <Skeleton variant="circular" width={36} height={36} />
          <div style={{ flex: 1 }}>
            <Skeleton variant="text" lines={2} />
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Single line with explicit 100% width
 */
export const FullWidthText: Story = {
  args: {
    variant: "text",
    width: "100%",
  },
};

/**
 * Lines set to 1 explicitly
 */
export const ExplicitSingleLine: Story = {
  args: {
    variant: "text",
    lines: 1,
  },
};

/**
 * Rectangular with percentage height-like string width
 */
export const PercentageWidthRectangular: Story = {
  args: {
    variant: "rectangular",
    width: "75%",
    height: 72,
  },
};

/**
 * Text skeleton with custom border radius
 */
export const TextCustomRadius: Story = {
  args: {
    variant: "text",
    borderRadius: "0px",
  },
};

/**
 * Compact dashboard tiles
 */
export const DashboardTiles: Story = {
  args: { variant: "rectangular" },
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "12px",
        width: "280px",
      }}
    >
      <Skeleton variant="rectangular" height={64} />
      <Skeleton variant="rectangular" height={64} />
      <Skeleton variant="rectangular" height={64} />
      <Skeleton variant="rectangular" height={64} />
    </div>
  ),
};

/**
 * Extra small circular
 */
export const CircularTiny: Story = {
  args: {
    variant: "circular",
    width: 16,
    height: 16,
  },
};

/**
 * Extra large rectangular banner
 */
export const BannerRectangular: Story = {
  args: {
    variant: "rectangular",
    width: "100%",
    height: 160,
    borderRadius: spacing[2],
  },
};

/**
 * Six text lines
 */
export const SixLines: Story = {
  args: {
    variant: "text",
    lines: 6,
  },
};

/**
 * Animated rectangular with sharp corners
 */
export const AnimatedSharpRectangular: Story = {
  args: {
    variant: "rectangular",
    height: 90,
    animated: true,
    borderRadius: "0px",
  },
};
