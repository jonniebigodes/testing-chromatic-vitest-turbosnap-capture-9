import type { Meta, StoryObj } from "@storybook/react-vite";
import Loading from "./Loading";
import { color } from "../../tokens/tokens";

const meta = {
  title: "Components/Loading",
  component: Loading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text", description: "Text label shown with the indicator" },
    size: { control: "select", options: ["small", "medium", "large"], description: "Size of the indicator" },
    variant: { control: "select", options: ["spinner", "dots", "bar"], description: "Visual variant" },
    color: { control: "color", description: "Accent color" },
    fullPage: { control: "boolean", description: "Full-page overlay" },
  },
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };
export const SpinnerVariant: Story = { args: { variant: "spinner" } };
export const DotsVariant: Story = { args: { variant: "dots" } };
export const BarVariant: Story = { args: { variant: "bar" } };
export const Small: Story = { args: { size: "small" } };
export const Medium: Story = { args: { size: "medium" } };
export const Large: Story = { args: { size: "large" } };
export const SmallDots: Story = { args: { size: "small", variant: "dots" } };
export const LargeDots: Story = { args: { size: "large", variant: "dots" } };
export const SmallBar: Story = { args: { size: "small", variant: "bar" } };
export const LargeBar: Story = { args: { size: "large", variant: "bar" } };
export const CustomLabel: Story = { args: { label: "Please wait…" } };
export const FetchingLabel: Story = { args: { label: "Fetching data" } };
export const SavingLabel: Story = { args: { label: "Saving…" } };
export const UploadingLabel: Story = { args: { label: "Uploading files" } };
export const EmptyLabel: Story = { args: { label: "" } };
export const BlueColor: Story = { args: { color: color.blue500 } };
export const GreenColor: Story = { args: { color: color.green500 } };
export const OrangeColor: Story = { args: { color: color.orange500 } };
export const PinkColor: Story = { args: { color: color.pink500 } };
export const PurpleColor: Story = { args: { color: color.purple500 } };
export const CyanColor: Story = { args: { color: color.cyan500 } };
export const YellowColor: Story = { args: { color: color.yellow500 } };
export const GreenDots: Story = { args: { variant: "dots", color: color.green500 } };
export const OrangeBar: Story = { args: { variant: "bar", color: color.orange500 } };
export const PinkSpinnerLarge: Story = { args: { variant: "spinner", color: color.pink500, size: "large" } };
export const PurpleDotsLarge: Story = { args: { variant: "dots", color: color.purple500, size: "large" } };
export const CyanBarMedium: Story = { args: { variant: "bar", color: color.cyan500, size: "medium" } };
export const FullPageSpinner: Story = { args: { fullPage: true, label: "Loading page…" } };
export const FullPageDots: Story = { args: { fullPage: true, variant: "dots", label: "Almost there" } };
export const FullPageBar: Story = { args: { fullPage: true, variant: "bar", label: "Preparing…" } };
export const FullPageGreen: Story = { args: { fullPage: true, color: color.green500, size: "large" } };
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "32px", alignItems: "flex-start" }}>
      <Loading variant="spinner" label="Spinner" />
      <Loading variant="dots" label="Dots" />
      <Loading variant="bar" label="Bar" />
    </div>
  ),
};
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <Loading size="small" label="Small" />
      <Loading size="medium" label="Medium" />
      <Loading size="large" label="Large" />
    </div>
  ),
};
export const AllDotsSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <Loading variant="dots" size="small" label="S" />
      <Loading variant="dots" size="medium" label="M" />
      <Loading variant="dots" size="large" label="L" />
    </div>
  ),
};
export const AllBarSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Loading variant="bar" size="small" label="Small bar" />
      <Loading variant="bar" size="medium" label="Medium bar" />
      <Loading variant="bar" size="large" label="Large bar" />
    </div>
  ),
};
export const ColorRainbow: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <Loading color={color.blue500} label="Blue" />
      <Loading color={color.green500} label="Green" />
      <Loading color={color.orange500} label="Orange" />
      <Loading color={color.pink500} label="Pink" />
    </div>
  ),
};
export const OnDarkBackground: Story = {
  render: () => (
    <div style={{ backgroundColor: color.slate900, padding: 32, borderRadius: 8 }}>
      <Loading color={color.white} label="Loading on dark" />
    </div>
  ),
};
export const OnBlueBackground: Story = {
  render: () => (
    <div style={{ backgroundColor: color.blue500, padding: 32, borderRadius: 8 }}>
      <Loading color={color.white} variant="dots" label="Loading" />
    </div>
  ),
};
export const InCard: Story = {
  render: () => (
    <div style={{ width: 240, height: 160, border: `1px solid ${color.slate300}`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Loading label="Loading card" />
    </div>
  ),
};
export const KitchenSinkLargeDotsPink: Story = {
  args: { size: "large", variant: "dots", color: color.pink500, label: "Processing request" },
};
export const KitchenSinkSmallBarCyan: Story = {
  args: { size: "small", variant: "bar", color: color.cyan500, label: "Syncing" },
};
export const KitchenSinkMediumSpinnerOrange: Story = {
  args: { size: "medium", variant: "spinner", color: color.orange500, label: "Working…" },
};
export const LongLabel: Story = {
  args: { label: "Loading your personalized dashboard content, please wait" },
};
export const RtlLabel: Story = { args: { label: "جاري التحميل" } };
export const EmojiLabel: Story = { args: { label: "⏳ Almost done" } };
export const NumericLookingLabel: Story = { args: { label: "42%" } };
export const StackedLoaders: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Loading variant="spinner" size="small" label="Step 1" />
      <Loading variant="dots" size="medium" label="Step 2" />
      <Loading variant="bar" size="large" label="Step 3" />
    </div>
  ),
};
export const MixedColorsDots: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 20 }}>
      <Loading variant="dots" color={color.blue500} label="A" />
      <Loading variant="dots" color={color.green500} label="B" />
      <Loading variant="dots" color={color.orange500} label="C" />
    </div>
  ),
};
export const DefaultSpinnerAssert: Story = { args: { variant: "spinner", size: "medium" } };
export const DefaultLabelAssert: Story = { args: {} };
