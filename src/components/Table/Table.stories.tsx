import type { Meta, StoryObj } from "@storybook/react-vite";
import Table from "./Table";
import { color } from "../../tokens/tokens";

const basicColumns = [
  { key: "name", header: "Name" },
  { key: "role", header: "Role" },
  { key: "status", header: "Status" },
];

const basicData = [
  { name: "Alice", role: "Engineer", status: "Active" },
  { name: "Bob", role: "Designer", status: "Away" },
  { name: "Carol", role: "PM", status: "Active" },
];

const wideColumns = [
  { key: "id", header: "ID", width: "60px" },
  { key: "name", header: "Full Name", width: "180px" },
  { key: "email", header: "Email" },
  { key: "team", header: "Team", width: "120px" },
];

const wideData = [
  { id: "1", name: "Ada Lovelace", email: "ada@example.com", team: "Core" },
  { id: "2", name: "Alan Turing", email: "alan@example.com", team: "Research" },
  { id: "3", name: "Grace Hopper", email: "grace@example.com", team: "Platform" },
  { id: "4", name: "Katherine Johnson", email: "kj@example.com", team: "Analytics" },
];

const meta = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    striped: { control: "boolean" },
    bordered: { control: "boolean" },
    compact: { control: "boolean" },
    caption: { control: "text" },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { columns: basicColumns, data: basicData },
};

export const Striped: Story = {
  args: { columns: basicColumns, data: basicData, striped: true },
};

export const Bordered: Story = {
  args: { columns: basicColumns, data: basicData, bordered: true },
};

export const Compact: Story = {
  args: { columns: basicColumns, data: basicData, compact: true },
};

export const WithCaption: Story = {
  args: { columns: basicColumns, data: basicData, caption: "Team roster" },
};

export const StripedBordered: Story = {
  args: { columns: basicColumns, data: basicData, striped: true, bordered: true },
};

export const StripedCompact: Story = {
  args: { columns: basicColumns, data: basicData, striped: true, compact: true },
};

export const BorderedCompact: Story = {
  args: { columns: basicColumns, data: basicData, bordered: true, compact: true },
};

export const AllFlags: Story = {
  args: {
    columns: basicColumns,
    data: basicData,
    striped: true,
    bordered: true,
    compact: true,
    caption: "Compact striped bordered",
  },
};

export const WideTable: Story = {
  args: { columns: wideColumns, data: wideData },
};

export const WideStriped: Story = {
  args: { columns: wideColumns, data: wideData, striped: true },
};

export const WideBordered: Story = {
  args: { columns: wideColumns, data: wideData, bordered: true },
};

export const WideWithCaption: Story = {
  args: { columns: wideColumns, data: wideData, caption: "Engineering directory" },
};

export const SingleRow: Story = {
  args: {
    columns: basicColumns,
    data: [{ name: "Solo", role: "Founder", status: "Active" }],
  },
};

export const EmptyData: Story = {
  args: { columns: basicColumns, data: [] },
};

export const TwoColumns: Story = {
  args: {
    columns: [
      { key: "key", header: "Key" },
      { key: "value", header: "Value" },
    ],
    data: [
      { key: "theme", value: "dark" },
      { key: "locale", value: "en-US" },
    ],
  },
};

export const ManyColumns: Story = {
  args: {
    columns: [
      { key: "a", header: "A" },
      { key: "b", header: "B" },
      { key: "c", header: "C" },
      { key: "d", header: "D" },
      { key: "e", header: "E" },
    ],
    data: [
      { a: "1", b: "2", c: "3", d: "4", e: "5" },
      { a: "6", b: "7", c: "8", d: "9", e: "10" },
    ],
  },
};

export const ManyRows: Story = {
  args: {
    columns: basicColumns,
    data: Array.from({ length: 12 }, (_, i) => ({
      name: `User ${i + 1}`,
      role: i % 2 === 0 ? "Engineer" : "Designer",
      status: i % 3 === 0 ? "Away" : "Active",
    })),
    striped: true,
  },
};

export const NumericCells: Story = {
  args: {
    columns: [
      { key: "metric", header: "Metric" },
      { key: "value", header: "Value" },
    ],
    data: [
      { metric: "Users", value: 1280 },
      { metric: "Sessions", value: 9044 },
      { metric: "Conversion", value: "3.2%" },
    ],
  },
};

export const LongCellContent: Story = {
  args: {
    columns: [
      { key: "title", header: "Title" },
      { key: "description", header: "Description" },
    ],
    data: [
      {
        title: "Long row",
        description:
          "This is a very long description that exercises wrapping and layout of wide cell content inside the table body.",
      },
    ],
  },
};

export const EmojiCells: Story = {
  args: {
    columns: [
      { key: "item", header: "Item" },
      { key: "mood", header: "Mood" },
    ],
    data: [
      { item: "Launch", mood: "🚀" },
      { item: "Review", mood: "👀" },
    ],
  },
};

export const RtlCells: Story = {
  args: {
    columns: [
      { key: "name", header: "الاسم" },
      { key: "city", header: "المدينة" },
    ],
    data: [
      { name: "أحمد", city: "القاهرة" },
      { name: "فاطمة", city: "دبي" },
    ],
  },
};

export const CustomWidths: Story = {
  args: {
    columns: [
      { key: "code", header: "Code", width: "80px" },
      { key: "label", header: "Label", width: "240px" },
      { key: "qty", header: "Qty", width: "60px" },
    ],
    data: [
      { code: "SKU-1", label: "Widget", qty: 10 },
      { code: "SKU-2", label: "Gadget", qty: 4 },
    ],
    bordered: true,
  },
};

export const CompactCaption: Story = {
  args: {
    columns: basicColumns,
    data: basicData,
    compact: true,
    caption: "Compact team table",
  },
};

export const StripedCaption: Story = {
  args: {
    columns: basicColumns,
    data: basicData,
    striped: true,
    caption: "Striped roster",
  },
};

export const BorderedCaption: Story = {
  args: {
    columns: basicColumns,
    data: basicData,
    bordered: true,
    caption: "Bordered roster",
  },
};

export const KitchenSink: Story = {
  args: {
    columns: wideColumns,
    data: wideData,
    striped: true,
    bordered: true,
    compact: true,
    caption: "Kitchen sink directory",
  },
};

export const MissingCellKeys: Story = {
  args: {
    columns: basicColumns,
    data: [{ name: "Partial" }],
  },
};

export const ReactNodeCells: Story = {
  args: { columns: basicColumns, data: basicData },
  render: () => (
    <Table
      columns={[
        { key: "name", header: "Name" },
        { key: "badge", header: "Badge" },
      ]}
      data={[
        {
          name: "Alice",
          badge: (
            <span style={{ color: color.green600, fontWeight: 600 }}>OK</span>
          ),
        },
        {
          name: "Bob",
          badge: (
            <span style={{ color: color.orange600, fontWeight: 600 }}>Warn</span>
          ),
        },
      ]}
    />
  ),
};

export const NestedInCard: Story = {
  args: { columns: basicColumns, data: basicData },
  render: () => (
    <div
      style={{
        border: `1px solid ${color.slate300}`,
        borderRadius: 8,
        padding: 16,
        width: 480,
      }}
    >
      <Table columns={basicColumns} data={basicData} striped caption="Card table" />
    </div>
  ),
};

export const OnDarkBackground: Story = {
  args: { columns: basicColumns, data: basicData },
  render: () => (
    <div style={{ backgroundColor: color.slate900, padding: 24, borderRadius: 8 }}>
      <Table columns={basicColumns} data={basicData} bordered />
    </div>
  ),
};

export const TwoTablesStacked: Story = {
  args: { columns: basicColumns, data: basicData },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 480 }}>
      <Table columns={basicColumns} data={basicData} caption="First" />
      <Table columns={basicColumns} data={basicData} striped caption="Second" />
    </div>
  ),
};

export const SideBySideTables: Story = {
  args: { columns: basicColumns, data: basicData },
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <Table
        columns={[
          { key: "a", header: "A" },
          { key: "b", header: "B" },
        ]}
        data={[{ a: "1", b: "2" }]}
        compact
      />
      <Table
        columns={[
          { key: "x", header: "X" },
          { key: "y", header: "Y" },
        ]}
        data={[{ x: "3", y: "4" }]}
        bordered
      />
    </div>
  ),
};

export const SingleColumn: Story = {
  args: {
    columns: [{ key: "item", header: "Items" }],
    data: [{ item: "One" }, { item: "Two" }, { item: "Three" }],
    striped: true,
  },
};

export const HeaderOnlyNoRows: Story = {
  args: {
    columns: basicColumns,
    data: [],
    caption: "No results",
    bordered: true,
  },
};

export const StatusColumnEmphasis: Story = {
  args: { columns: basicColumns, data: basicData },
  render: () => (
    <Table
      columns={basicColumns}
      data={[
        {
          name: "Alice",
          role: "Engineer",
          status: <strong style={{ color: color.green600 }}>Active</strong>,
        },
        {
          name: "Bob",
          role: "Designer",
          status: <strong style={{ color: color.yellow600 }}>Away</strong>,
        },
      ]}
      striped
    />
  ),
};

export const ProductInventory: Story = {
  args: {
    columns: [
      { key: "sku", header: "SKU", width: "100px" },
      { key: "product", header: "Product" },
      { key: "price", header: "Price", width: "80px" },
      { key: "stock", header: "Stock", width: "70px" },
    ],
    data: [
      { sku: "A-100", product: "Notebook", price: "$12", stock: 40 },
      { sku: "B-200", product: "Stylus", price: "$28", stock: 12 },
      { sku: "C-300", product: "Case", price: "$19", stock: 0 },
    ],
    bordered: true,
    striped: true,
    caption: "Inventory",
  },
};

export const CompactManyRows: Story = {
  args: {
    columns: basicColumns,
    data: Array.from({ length: 8 }, (_, i) => ({
      name: `Person ${i + 1}`,
      role: "Member",
      status: "Active",
    })),
    compact: true,
    striped: true,
  },
};

export const BorderedWide: Story = {
  args: { columns: wideColumns, data: wideData, bordered: true, caption: "Bordered directory" },
};

export const EmptyCaption: Story = {
  args: { columns: basicColumns, data: basicData, caption: "" },
};

export const LongCaption: Story = {
  args: {
    columns: basicColumns,
    data: basicData,
    caption: "A longer caption describing the purpose of this particular data table",
  },
};

export const ZeroAsCellValue: Story = {
  args: {
    columns: [
      { key: "label", header: "Label" },
      { key: "count", header: "Count" },
    ],
    data: [{ label: "Errors", count: 0 }],
  },
};

export const BooleanishStrings: Story = {
  args: {
    columns: [
      { key: "feature", header: "Feature" },
      { key: "enabled", header: "Enabled" },
    ],
    data: [
      { feature: "Dark mode", enabled: "true" },
      { feature: "Beta", enabled: "false" },
    ],
    striped: true,
  },
};

export const DefaultNoFlags: Story = {
  args: {
    columns: basicColumns,
    data: basicData,
    striped: false,
    bordered: false,
    compact: false,
  },
};

export const OnlyStriped: Story = {
  args: { columns: basicColumns, data: basicData, striped: true, bordered: false, compact: false },
};

export const OnlyBordered: Story = {
  args: { columns: basicColumns, data: basicData, striped: false, bordered: true, compact: false },
};

export const OnlyCompact: Story = {
  args: { columns: basicColumns, data: basicData, striped: false, bordered: false, compact: true },
};

export const InventoryCompact: Story = {
  args: {
    columns: [
      { key: "sku", header: "SKU", width: "100px" },
      { key: "product", header: "Product" },
      { key: "price", header: "Price", width: "80px" },
    ],
    data: [
      { sku: "A-100", product: "Notebook", price: "$12" },
      { sku: "B-200", product: "Stylus", price: "$28" },
    ],
    compact: true,
    caption: "Compact inventory",
  },
};

export const StripedBorderedCaption: Story = {
  args: {
    columns: basicColumns,
    data: basicData,
    striped: true,
    bordered: true,
    caption: "Striped bordered caption",
  },
};

export const TwoColumnCompactBordered: Story = {
  args: {
    columns: [
      { key: "key", header: "Key" },
      { key: "value", header: "Value" },
    ],
    data: [
      { key: "theme", value: "dark" },
      { key: "locale", value: "en-US" },
    ],
    compact: true,
    bordered: true,
  },
};
