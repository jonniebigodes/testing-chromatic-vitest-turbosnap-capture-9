import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect, userEvent } from "storybook/test";
import Pagination from "./Pagination";
import { color } from "../../tokens/tokens";

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    count: { control: "number", description: "Total number of data items" },
    pageSize: { control: "number", description: "Items per page" },
    page: { control: "number", description: "Controlled active page" },
    defaultPage: { control: "number", description: "Initial page" },
    siblingCount: { control: "number", description: "Sibling pages around active" },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Size of the pagination controls",
    },
  },
  args: {
    count: 100,
    pageSize: 10,
    defaultPage: 1,
    siblingCount: 1,
    size: "medium",
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { count: 100 },
};

export const Small: Story = {
  args: { count: 100, size: "small" },
};

export const Medium: Story = {
  args: { count: 100, size: "medium" },
};

export const Large: Story = {
  args: { count: 100, size: "large" },
};

export const FewPages: Story = {
  args: { count: 30, pageSize: 10 },
};

export const ManyPages: Story = {
  args: { count: 500, pageSize: 10 },
};

export const HugeCount: Story = {
  args: { count: 5000, pageSize: 10, siblingCount: 2 },
};

export const PageSizeFive: Story = {
  args: { count: 50, pageSize: 5 },
};

export const PageSizeTwenty: Story = {
  args: { count: 200, pageSize: 20 },
};

export const PageSizeFifty: Story = {
  args: { count: 500, pageSize: 50 },
};

export const DefaultPageThree: Story = {
  args: { count: 100, defaultPage: 3 },
};

export const DefaultPageLast: Story = {
  args: { count: 100, pageSize: 10, defaultPage: 10 },
};

export const ControlledPage: Story = {
  args: { count: 100, page: 4 },
};

export const SiblingCountZero: Story = {
  args: { count: 200, siblingCount: 0 },
};

export const SiblingCountOne: Story = {
  args: { count: 200, siblingCount: 1 },
};

export const SiblingCountTwo: Story = {
  args: { count: 200, siblingCount: 2 },
};

export const SiblingCountThree: Story = {
  args: { count: 300, siblingCount: 3 },
};

export const SinglePage: Story = {
  args: { count: 5, pageSize: 10 },
};

export const TwoPages: Story = {
  args: { count: 20, pageSize: 10 },
};

export const ExactTenPages: Story = {
  args: { count: 100, pageSize: 10 },
};

export const AllSizes: Story = {
  args: { count: 100 },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Pagination count={100} size="small" />
      <Pagination count={100} size="medium" />
      <Pagination count={100} size="large" />
    </div>
  ),
};

export const SmallManyPages: Story = {
  args: { count: 500, size: "small", siblingCount: 2 },
};

export const LargeFewPages: Story = {
  args: { count: 40, pageSize: 10, size: "large" },
};

export const MediumSiblingTwo: Story = {
  args: { count: 250, siblingCount: 2, size: "medium" },
};

export const OnDarkBackground: Story = {
  args: { count: 100 },
  render: (args) => (
    <div style={{ background: color.slate900, padding: 24, borderRadius: 8 }}>
      <Pagination {...args} />
    </div>
  ),
};

export const NarrowContainer: Story = {
  args: { count: 200, siblingCount: 0 },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Pagination {...args} />
    </div>
  ),
};

export const WideContainer: Story = {
  args: { count: 200, siblingCount: 2 },
  render: (args) => (
    <div style={{ width: 720 }}>
      <Pagination {...args} />
    </div>
  ),
};

export const PrevNextVisible: Story = {
  args: { count: 100 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: /prev/i })).toBeInTheDocument();
    await expect(canvas.getByRole("button", { name: /next/i })).toBeInTheDocument();
  },
};

export const PageOneSelected: Story = {
  args: { count: 100, defaultPage: 1 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: "1" })).toBeInTheDocument();
  },
};

export const CanClickNext: Story = {
  args: { count: 100, defaultPage: 1 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /next/i }));
  },
};

export const KitchenSinkLargeHuge: Story = {
  args: { count: 5000, pageSize: 25, siblingCount: 2, size: "large", defaultPage: 5 },
};

export const KitchenSinkSmallCompact: Story = {
  args: { count: 80, pageSize: 8, siblingCount: 0, size: "small" },
};

export const TwoIndependentPaginations: Story = {
  args: { count: 100 },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Pagination count={50} pageSize={10} />
      <Pagination count={200} pageSize={20} siblingCount={2} />
    </div>
  ),
};

export const CountOne: Story = {
  args: { count: 1, pageSize: 10 },
};

export const CountZero: Story = {
  args: { count: 0, pageSize: 10 },
};

export const PageSizeOne: Story = {
  args: { count: 15, pageSize: 1, siblingCount: 1 },
};

export const MiddlePage: Story = {
  args: { count: 200, pageSize: 10, defaultPage: 10 },
};

export const NearEndPage: Story = {
  args: { count: 200, pageSize: 10, defaultPage: 18 },
};

export const NearStartPage: Story = {
  args: { count: 200, pageSize: 10, defaultPage: 2 },
};

export const SmallSiblingThree: Story = {
  args: { count: 400, siblingCount: 3, size: "small" },
};

export const LargeSiblingZero: Story = {
  args: { count: 400, siblingCount: 0, size: "large" },
};

export const ControlledPageFive: Story = {
  args: { count: 120, pageSize: 10, page: 5 },
};

export const DefaultPageFive: Story = {
  args: { count: 120, pageSize: 10, defaultPage: 5 },
};

export const OddCount: Story = {
  args: { count: 97, pageSize: 10 },
};

export const EvenCount: Story = {
  args: { count: 100, pageSize: 10 },
};

export const PageSizeFifteen: Story = {
  args: { count: 150, pageSize: 15 },
};

export const CompactEllipsis: Story = {
  args: { count: 1000, pageSize: 10, siblingCount: 0, defaultPage: 50 },
};

export const WideSiblingEllipsis: Story = {
  args: { count: 1000, pageSize: 10, siblingCount: 3, defaultPage: 50 },
};

export const SmallMiddlePage: Story = {
  args: { count: 300, pageSize: 10, defaultPage: 15, size: "small" },
};

export const LargeMiddlePage: Story = {
  args: { count: 300, pageSize: 10, defaultPage: 15, size: "large" },
};

export const MediumNearEnd: Story = {
  args: { count: 250, pageSize: 10, defaultPage: 24, size: "medium" },
};
