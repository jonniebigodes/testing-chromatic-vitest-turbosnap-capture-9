import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect } from "storybook/test";
import Breadcrumbs from "./Breadcrumbs";
import type { BreadcrumbItem } from "./Breadcrumbs";
import { color } from "../../tokens/tokens";

const basicItems: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Shoes", current: true },
];

const deepItems: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Catalog", href: "/catalog" },
  { label: "Men", href: "/catalog/men" },
  { label: "Footwear", href: "/catalog/men/footwear" },
  { label: "Running", current: true },
];

const twoItems: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Settings", current: true },
];

const meta = {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Size of the breadcrumbs",
    },
    separator: {
      control: "text",
      description: "Separator between items",
    },
    items: {
      control: "object",
      description: "Breadcrumb trail items",
    },
  },
  args: {
    items: basicItems,
    size: "medium",
    separator: "/",
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { items: basicItems },
};

export const Small: Story = {
  args: { items: basicItems, size: "small" },
};

export const Medium: Story = {
  args: { items: basicItems, size: "medium" },
};

export const Large: Story = {
  args: { items: basicItems, size: "large" },
};

export const TwoItems: Story = {
  args: { items: twoItems },
};

export const DeepTrail: Story = {
  args: { items: deepItems },
};

export const ChevronSeparator: Story = {
  args: { items: basicItems, separator: ">" },
};

export const DotSeparator: Story = {
  args: { items: basicItems, separator: "·" },
};

export const PipeSeparator: Story = {
  args: { items: basicItems, separator: "|" },
};

export const ArrowSeparator: Story = {
  args: { items: basicItems, separator: "→" },
};

export const SlashSeparator: Story = {
  args: { items: basicItems, separator: "/" },
};

export const SingleCurrent: Story = {
  args: { items: [{ label: "Dashboard", current: true }] },
};

export const SingleWithHref: Story = {
  args: { items: [{ label: "Home", href: "/" }] },
};

export const WithoutHrefs: Story = {
  args: {
    items: [
      { label: "Section" },
      { label: "Subsection" },
      { label: "Current", current: true },
    ],
  },
};

export const ExplicitCurrentMiddle: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Archive", href: "/archive", current: true },
      { label: "Ignored", href: "/ignored" },
    ],
  },
};

export const LongLabels: Story = {
  args: {
    items: [
      { label: "Organization Settings Console", href: "/" },
      { label: "Workspace Access Management", href: "/access" },
      { label: "Role Permissions Overview", current: true },
    ],
  },
};

export const EmojiLabels: Story = {
  args: {
    items: [
      { label: "🏠 Home", href: "/" },
      { label: "📦 Orders", href: "/orders" },
      { label: "✨ Details", current: true },
    ],
  },
};

export const RTLContent: Story = {
  args: {
    items: [
      { label: "الرئيسية", href: "/" },
      { label: "المنتجات", href: "/products" },
      { label: "التفاصيل", current: true },
    ],
  },
};

export const NumericLabels: Story = {
  args: {
    items: [
      { label: "2024", href: "/2024" },
      { label: "Q1", href: "/2024/q1" },
      { label: "42", current: true },
    ],
  },
};

export const AllSizes: Story = {
  args: { items: basicItems },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Breadcrumbs items={basicItems} size="small" />
      <Breadcrumbs items={basicItems} size="medium" />
      <Breadcrumbs items={basicItems} size="large" />
    </div>
  ),
};

export const SmallWithChevron: Story = {
  args: { items: basicItems, size: "small", separator: ">" },
};

export const LargeWithArrow: Story = {
  args: { items: basicItems, size: "large", separator: "→" },
};

export const DeepWithDots: Story = {
  args: { items: deepItems, separator: "·" },
};

export const TwoItemsPipe: Story = {
  args: { items: twoItems, separator: "|" },
};

export const EmptyItems: Story = {
  args: { items: [] },
};

export const FourItems: Story = {
  args: {
    items: [
      { label: "A", href: "/a" },
      { label: "B", href: "/b" },
      { label: "C", href: "/c" },
      { label: "D", current: true },
    ],
  },
};

export const FiveItems: Story = {
  args: { items: deepItems },
};

export const OnDarkBackground: Story = {
  args: { items: basicItems },
  render: (args) => (
    <div style={{ background: color.slate900, padding: 24, borderRadius: 8 }}>
      <Breadcrumbs {...args} />
    </div>
  ),
};

export const NarrowContainer: Story = {
  args: { items: deepItems },
  render: (args) => (
    <div style={{ width: 220 }}>
      <Breadcrumbs {...args} />
    </div>
  ),
};

export const WideContainer: Story = {
  args: { items: basicItems },
  render: (args) => (
    <div style={{ width: 640 }}>
      <Breadcrumbs {...args} />
    </div>
  ),
};

export const LabelsAreVisible: Story = {
  args: { items: basicItems },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Home")).toBeInTheDocument();
    await expect(canvas.getByText("Products")).toBeInTheDocument();
    await expect(canvas.getByText("Shoes")).toBeInTheDocument();
  },
};

export const CurrentHasAriaCurrent: Story = {
  args: { items: basicItems },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const current = canvas.getByText("Shoes");
    await expect(current).toHaveAttribute("aria-current", "page");
  },
};

export const NavHasAriaLabel: Story = {
  args: { items: basicItems },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText("Breadcrumb")).toBeInTheDocument();
  },
};

export const LinksHaveHrefs: Story = {
  args: { items: basicItems },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
  },
};

export const KitchenSinkLargeDeepChevron: Story = {
  args: { items: deepItems, size: "large", separator: ">" },
};

export const KitchenSinkSmallTwoPipe: Story = {
  args: { items: twoItems, size: "small", separator: "|" },
};

export const TwoIndependentTrails: Story = {
  args: { items: basicItems },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Breadcrumbs items={basicItems} />
      <Breadcrumbs items={twoItems} separator=">" />
    </div>
  ),
};

export const WhitespaceLabels: Story = {
  args: {
    items: [
      { label: "  Home  ", href: "/" },
      { label: " Products ", href: "/products" },
      { label: " Shoes ", current: true },
    ],
  },
};

export const CustomNodeSeparator: Story = {
  args: {
    items: basicItems,
    separator: <span style={{ color: color.blue500 }}>»</span>,
  },
};

export const MediumDeepSlash: Story = {
  args: { items: deepItems, size: "medium", separator: "/" },
};

export const LargeEmojiArrow: Story = {
  args: {
    items: [
      { label: "🏠 Home", href: "/" },
      { label: "📦 Orders", href: "/orders" },
      { label: "✨ Details", current: true },
    ],
    size: "large",
    separator: "→",
  },
};

export const SmallNumericDots: Story = {
  args: {
    items: [
      { label: "2024", href: "/2024" },
      { label: "Q1", href: "/2024/q1" },
      { label: "42", current: true },
    ],
    size: "small",
    separator: "·",
  },
};

export const NoCurrentFlagLastIsCurrent: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Library", href: "/library" },
      { label: "Docs" },
    ],
  },
};

export const MixedHrefPresence: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Section" },
      { label: "Page", href: "/page" },
      { label: "Here", current: true },
    ],
  },
};

export const ShortPunchyLabels: Story = {
  args: {
    items: [
      { label: "App", href: "/" },
      { label: "UI", href: "/ui" },
      { label: "Nav", current: true },
    ],
  },
};

export const AccountSettingsTrail: Story = {
  args: {
    items: [
      { label: "Account", href: "/account" },
      { label: "Security", href: "/account/security" },
      { label: "Sessions", current: true },
    ],
    separator: "/",
  },
};

export const DocsApiTrail: Story = {
  args: {
    items: [
      { label: "Docs", href: "/docs" },
      { label: "API", href: "/docs/api" },
      { label: "Pagination", current: true },
    ],
    size: "medium",
  },
};

export const ProjectFilesTrail: Story = {
  args: {
    items: [
      { label: "src", href: "/src" },
      { label: "components", href: "/src/components" },
      { label: "Breadcrumbs.tsx", current: true },
    ],
    separator: "/",
  },
};

export const LargeRTL: Story = {
  args: {
    items: [
      { label: "الرئيسية", href: "/" },
      { label: "المنتجات", href: "/products" },
      { label: "التفاصيل", current: true },
    ],
    size: "large",
  },
};

export const SmallWithoutHrefs: Story = {
  args: {
    items: [
      { label: "One" },
      { label: "Two" },
      { label: "Three", current: true },
    ],
    size: "small",
  },
};

export const SixItems: Story = {
  args: {
    items: [
      { label: "L1", href: "/1" },
      { label: "L2", href: "/2" },
      { label: "L3", href: "/3" },
      { label: "L4", href: "/4" },
      { label: "L5", href: "/5" },
      { label: "L6", current: true },
    ],
  },
};
