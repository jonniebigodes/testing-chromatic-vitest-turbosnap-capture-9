import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect } from "storybook/test";
import List from "./List";
import type { ListItem } from "./List";
import { color } from "../../tokens/tokens";

const basicItems: ListItem[] = [
  { id: "1", label: "First item" },
  { id: "2", label: "Second item" },
  { id: "3", label: "Third item" },
];

const itemsWithDescriptions: ListItem[] = [
  {
    id: "1",
    label: "Inbox",
    description: "Messages waiting for a reply",
  },
  {
    id: "2",
    label: "Drafts",
    description: "Unsent messages you started",
  },
  {
    id: "3",
    label: "Archive",
    description: "Older messages you kept",
  },
];

const manyItems: ListItem[] = Array.from({ length: 8 }, (_, i) => ({
  id: String(i + 1),
  label: `Item ${i + 1}`,
  description: i % 2 === 0 ? `Description for item ${i + 1}` : undefined,
}));

const meta = {
  title: "Components/List",
  component: List,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    ordered: {
      control: "boolean",
      description: "Whether to render an ordered list",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Size of the list items",
    },
    divided: {
      control: "boolean",
      description: "Whether to show dividers between items",
    },
    markerColor: {
      control: "color",
      description: "Color of the list markers",
    },
    items: {
      control: "object",
      description: "Items to render in the list",
    },
  },
  args: {
    items: basicItems,
    ordered: false,
    size: "medium",
    divided: false,
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default unordered list with medium size
 */
export const Default: Story = {
  args: {
    items: basicItems,
  },
};

/**
 * Ordered list using ol markers
 */
export const Ordered: Story = {
  args: {
    items: basicItems,
    ordered: true,
  },
};

/**
 * Unordered list explicitly
 */
export const Unordered: Story = {
  args: {
    items: basicItems,
    ordered: false,
  },
};

/**
 * Small sized list
 */
export const Small: Story = {
  args: {
    items: basicItems,
    size: "small",
  },
};

/**
 * Medium sized list (default)
 */
export const Medium: Story = {
  args: {
    items: basicItems,
    size: "medium",
  },
};

/**
 * Large sized list
 */
export const Large: Story = {
  args: {
    items: basicItems,
    size: "large",
  },
};

/**
 * List with dividers between items
 */
export const Divided: Story = {
  args: {
    items: basicItems,
    divided: true,
  },
};

/**
 * List without dividers
 */
export const NotDivided: Story = {
  args: {
    items: basicItems,
    divided: false,
  },
};

/**
 * List items that include descriptions
 */
export const WithDescriptions: Story = {
  args: {
    items: itemsWithDescriptions,
  },
};

/**
 * Ordered list with descriptions
 */
export const OrderedWithDescriptions: Story = {
  args: {
    items: itemsWithDescriptions,
    ordered: true,
  },
};

/**
 * Custom blue marker color
 */
export const BlueMarker: Story = {
  args: {
    items: basicItems,
    markerColor: color.blue500,
  },
};

/**
 * Custom green marker color
 */
export const GreenMarker: Story = {
  args: {
    items: basicItems,
    markerColor: color.green500,
  },
};

/**
 * Custom pink marker color
 */
export const PinkMarker: Story = {
  args: {
    items: basicItems,
    markerColor: color.pink500,
  },
};

/**
 * Custom purple marker color
 */
export const PurpleMarker: Story = {
  args: {
    items: basicItems,
    markerColor: color.purple500,
  },
};

/**
 * All sizes side by side
 */
export const AllSizes: Story = {
  args: { items: basicItems },
  render: () => (
    <div style={{ display: "flex", gap: "32px", alignItems: "flex-start" }}>
      <List items={basicItems} size="small" />
      <List items={basicItems} size="medium" />
      <List items={basicItems} size="large" />
    </div>
  ),
};

/**
 * Ordered and unordered side by side
 */
export const OrderedAndUnordered: Story = {
  args: { items: basicItems },
  render: () => (
    <div style={{ display: "flex", gap: "32px", alignItems: "flex-start" }}>
      <List items={basicItems} ordered={false} />
      <List items={basicItems} ordered />
    </div>
  ),
};

/**
 * Divided ordered list at large size
 */
export const DividedOrderedLarge: Story = {
  args: {
    items: itemsWithDescriptions,
    ordered: true,
    divided: true,
    size: "large",
  },
};

/**
 * Divided unordered list at small size
 */
export const DividedUnorderedSmall: Story = {
  args: {
    items: itemsWithDescriptions,
    ordered: false,
    divided: true,
    size: "small",
  },
};

/**
 * Single item list
 */
export const SingleItem: Story = {
  args: {
    items: [{ id: "only", label: "Only item" }],
  },
};

/**
 * Single item with description
 */
export const SingleItemWithDescription: Story = {
  args: {
    items: [
      {
        id: "only",
        label: "Only item",
        description: "This list has exactly one entry",
      },
    ],
  },
};

/**
 * Empty items array
 */
export const EmptyItems: Story = {
  args: {
    items: [],
  },
};

/**
 * Many items rendered together
 */
export const ManyItems: Story = {
  args: {
    items: manyItems,
  },
};

/**
 * Many items with dividers
 */
export const ManyItemsDivided: Story = {
  args: {
    items: manyItems,
    divided: true,
  },
};

/**
 * Long label text content
 */
export const LongLabels: Story = {
  args: {
    items: [
      {
        id: "1",
        label:
          "This is a very long list item label that should still render correctly without truncating the DOM text content",
      },
      {
        id: "2",
        label:
          "Another extremely long label used to verify wrapping and overflow behavior in the list component",
      },
    ],
  },
};

/**
 * Long description text content
 */
export const LongDescriptions: Story = {
  args: {
    items: [
      {
        id: "1",
        label: "Verbose item",
        description:
          "A long supporting description that elaborates on the list item in more detail than usual to exercise layout",
      },
    ],
  },
};

/**
 * Emoji content in labels
 */
export const EmojiContent: Story = {
  args: {
    items: [
      { id: "1", label: "🎉 Launch" },
      { id: "2", label: "🚀 Ship it", description: "Ready to go" },
    ],
  },
};

/**
 * RTL unicode content
 */
export const RTLContent: Story = {
  args: {
    items: [
      { id: "1", label: "مرحبا", description: "العالم" },
      { id: "2", label: "قائمة" },
    ],
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
 * Numeric-looking labels
 */
export const NumericLabels: Story = {
  args: {
    items: [
      { id: "1", label: "42" },
      { id: "2", label: "100", description: "200" },
    ],
  },
};

/**
 * Small ordered divided list with blue markers
 */
export const SmallOrderedDividedBlue: Story = {
  args: {
    items: itemsWithDescriptions,
    size: "small",
    ordered: true,
    divided: true,
    markerColor: color.blue500,
  },
};

/**
 * Medium unordered divided list with green markers
 */
export const MediumUnorderedDividedGreen: Story = {
  args: {
    items: itemsWithDescriptions,
    size: "medium",
    ordered: false,
    divided: true,
    markerColor: color.green500,
  },
};

/**
 * Large ordered undivided list with orange markers
 */
export const LargeOrderedUndividedOrange: Story = {
  args: {
    items: itemsWithDescriptions,
    size: "large",
    ordered: true,
    divided: false,
    markerColor: color.orange500,
  },
};

/**
 * Mixed description presence across items
 */
export const MixedDescriptions: Story = {
  args: {
    items: [
      { id: "1", label: "Has description", description: "Yes" },
      { id: "2", label: "No description" },
      { id: "3", label: "Also has description", description: "Present" },
    ],
  },
};

/**
 * List on a dark background
 */
export const OnDarkBackground: Story = {
  args: {
    items: basicItems,
    markerColor: color.white,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: color.slate900,
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
 * Narrow container constraining list width
 */
export const NarrowContainer: Story = {
  args: {
    items: itemsWithDescriptions,
    divided: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "200px" }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Wide container with room to spare
 */
export const WideContainer: Story = {
  args: {
    items: itemsWithDescriptions,
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
 * Verifies unordered list renders as a UL
 */
export const UnorderedRendersAsUl: Story = {
  args: {
    items: basicItems,
    ordered: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const list = canvas.getByRole("list");
    expect(list.tagName).toBe("UL");
  },
};

/**
 * Verifies ordered list renders as an OL
 */
export const OrderedRendersAsOl: Story = {
  args: {
    items: basicItems,
    ordered: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const list = canvas.getByRole("list");
    expect(list.tagName).toBe("OL");
  },
};

/**
 * Verifies all item labels are present in the DOM
 */
export const LabelsAreVisible: Story = {
  args: {
    items: basicItems,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("First item")).toBeInTheDocument();
    await expect(canvas.getByText("Second item")).toBeInTheDocument();
    await expect(canvas.getByText("Third item")).toBeInTheDocument();
  },
};

/**
 * Verifies descriptions are visible when provided
 */
export const DescriptionsAreVisible: Story = {
  args: {
    items: itemsWithDescriptions,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("Messages waiting for a reply")
    ).toBeInTheDocument();
  },
};

/**
 * Kitchen sink: large ordered divided green markers with descriptions
 */
export const KitchenSinkLargeOrderedDivided: Story = {
  args: {
    items: itemsWithDescriptions,
    size: "large",
    ordered: true,
    divided: true,
    markerColor: color.green500,
  },
};

/**
 * Kitchen sink: small unordered undivided pink markers
 */
export const KitchenSinkSmallUnorderedPink: Story = {
  args: {
    items: basicItems,
    size: "small",
    ordered: false,
    divided: false,
    markerColor: color.pink500,
  },
};

/**
 * Two independent lists rendered together
 */
export const TwoIndependentLists: Story = {
  args: { items: basicItems },
  render: () => (
    <div style={{ display: "flex", gap: "40px" }}>
      <List items={basicItems} size="small" />
      <List items={itemsWithDescriptions} ordered divided size="large" />
    </div>
  ),
};

/**
 * Items with whitespace-heavy labels
 */
export const WhitespaceLabels: Story = {
  args: {
    items: [
      { id: "1", label: "  padded  " },
      { id: "2", label: "normal" },
    ],
  },
};

/**
 * Cyan marker color variant
 */
export const CyanMarker: Story = {
  args: {
    items: basicItems,
    markerColor: color.cyan500,
  },
};

/**
 * Yellow marker color variant
 */
export const YellowMarker: Story = {
  args: {
    items: basicItems,
    markerColor: color.yellow500,
  },
};

/**
 * Slate marker color (default-like)
 */
export const SlateMarker: Story = {
  args: {
    items: basicItems,
    markerColor: color.slate500,
  },
};

/**
 * Two-item ordered list
 */
export const TwoItemOrdered: Story = {
  args: {
    items: [
      { id: "a", label: "Step one" },
      { id: "b", label: "Step two" },
    ],
    ordered: true,
  },
};

/**
 * Four-item divided list
 */
export const FourItemDivided: Story = {
  args: {
    items: [
      { id: "1", label: "Alpha" },
      { id: "2", label: "Beta" },
      { id: "3", label: "Gamma" },
      { id: "4", label: "Delta" },
    ],
    divided: true,
  },
};

/**
 * Large size with custom purple markers and descriptions
 */
export const LargePurpleWithDescriptions: Story = {
  args: {
    items: itemsWithDescriptions,
    size: "large",
    markerColor: color.purple500,
  },
};

/**
 * Small size ordered list with many items
 */
export const SmallOrderedManyItems: Story = {
  args: {
    items: manyItems,
    size: "small",
    ordered: true,
  },
};
