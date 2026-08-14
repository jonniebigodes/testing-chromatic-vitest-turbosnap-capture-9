import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect } from "storybook/test";
import EmptyState from "./EmptyState";
import Button from "../Button/Button";
import { color } from "../../tokens/tokens";

const InboxIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M4 6h16v12H4V6zm0 0l8 6 8-6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SearchIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M16 16l4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const meta = {
  title: "Components/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Primary title text",
    },
    description: {
      control: "text",
      description: "Optional supporting description",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Size of the empty state",
    },
  },
  args: {
    title: "No results found",
    description: "Try adjusting your filters or search terms.",
    size: "medium",
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default empty state with title and description
 */
export const Default: Story = {
  args: {
    title: "No results found",
    description: "Try adjusting your filters or search terms.",
  },
};

/**
 * Title only, no description
 */
export const TitleOnly: Story = {
  args: {
    title: "Nothing here yet",
    description: undefined,
  },
};

/**
 * Small sized empty state
 */
export const Small: Story = {
  args: {
    title: "No items",
    description: "Add something to get started.",
    size: "small",
  },
};

/**
 * Medium sized empty state (default)
 */
export const Medium: Story = {
  args: {
    title: "No items",
    description: "Add something to get started.",
    size: "medium",
  },
};

/**
 * Large sized empty state
 */
export const Large: Story = {
  args: {
    title: "No items",
    description: "Add something to get started.",
    size: "large",
  },
};

/**
 * Empty state with an icon
 */
export const WithIcon: Story = {
  args: {
    title: "Inbox zero",
    description: "You are all caught up.",
    icon: <InboxIcon />,
  },
};

/**
 * Empty state with a search icon
 */
export const WithSearchIcon: Story = {
  args: {
    title: "No matches",
    description: "We could not find anything for that query.",
    icon: <SearchIcon />,
  },
};

/**
 * Empty state with an action button
 */
export const WithAction: Story = {
  args: {
    title: "No projects",
    description: "Create your first project to begin.",
    action: <Button label="Create project" size="small" />,
  },
};

/**
 * Empty state with icon and action
 */
export const WithIconAndAction: Story = {
  args: {
    title: "No messages",
    description: "Start a conversation with your team.",
    icon: <InboxIcon />,
    action: <Button label="Compose" size="small" />,
  },
};

/**
 * All sizes side by side
 */
export const AllSizes: Story = {
  args: { title: "Empty" },
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
      <EmptyState
        title="Small"
        description="Compact empty state"
        size="small"
      />
      <EmptyState
        title="Medium"
        description="Default empty state"
        size="medium"
      />
      <EmptyState
        title="Large"
        description="Spacious empty state"
        size="large"
      />
    </div>
  ),
};

/**
 * Long title text
 */
export const LongTitle: Story = {
  args: {
    title:
      "We could not find any matching results for the filters you selected across this workspace",
    description: "Try clearing filters.",
  },
};

/**
 * Long description text
 */
export const LongDescription: Story = {
  args: {
    title: "No activity",
    description:
      "There has been no recent activity in this space. Once teammates start collaborating, updates will appear here automatically.",
  },
};

/**
 * Emoji in title
 */
export const EmojiTitle: Story = {
  args: {
    title: "🎉 All done",
    description: "Nothing left in the queue.",
  },
};

/**
 * RTL content
 */
export const RTLContent: Story = {
  args: {
    title: "لا توجد نتائج",
    description: "حاول تعديل البحث",
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
 * Numeric title
 */
export const NumericTitle: Story = {
  args: {
    title: "0",
    description: "Items remaining",
  },
};

/**
 * Small with icon
 */
export const SmallWithIcon: Story = {
  args: {
    title: "Empty",
    description: "Nothing to show",
    size: "small",
    icon: <SearchIcon />,
  },
};

/**
 * Large with icon and action
 */
export const LargeWithIconAndAction: Story = {
  args: {
    title: "Welcome",
    description: "Get started by creating your first entry.",
    size: "large",
    icon: <InboxIcon />,
    action: <Button label="Get started" size="medium" />,
  },
};

/**
 * Custom action node as a link-looking span
 */
export const CustomActionNode: Story = {
  args: {
    title: "Need help?",
    description: "Read the documentation to learn more.",
    action: (
      <span style={{ color: color.blue500, cursor: "pointer" }}>
        View docs
      </span>
    ),
  },
};

/**
 * Icon only with title (no description, no action)
 */
export const IconAndTitleOnly: Story = {
  args: {
    title: "Coming soon",
    icon: <SearchIcon />,
    description: undefined,
  },
};

/**
 * Action only with title
 */
export const ActionAndTitleOnly: Story = {
  args: {
    title: "Ready when you are",
    description: undefined,
    action: <Button label="Continue" size="small" />,
  },
};

/**
 * On a dark surrounding background
 */
export const OnDarkBackground: Story = {
  args: {
    title: "No notifications",
    description: "You are up to date.",
    icon: <InboxIcon />,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: color.slate900,
          padding: "32px",
          borderRadius: "8px",
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
    title: "No data",
    description: "Check back later.",
    size: "small",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "220px" }}>
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
    title: "No data",
    description: "Check back later.",
    size: "large",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "560px" }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Verifies title is visible
 */
export const TitleIsVisible: Story = {
  args: {
    title: "Visible title",
    description: "Supporting text",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Visible title")).toBeInTheDocument();
  },
};

/**
 * Verifies description is visible
 */
export const DescriptionIsVisible: Story = {
  args: {
    title: "Title",
    description: "Visible description",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Visible description")).toBeInTheDocument();
  },
};

/**
 * Verifies action button label is visible
 */
export const ActionIsVisible: Story = {
  args: {
    title: "Empty board",
    action: <Button label="Add card" size="small" />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Add card")).toBeInTheDocument();
  },
};

/**
 * Kitchen sink: large + icon + description + action
 */
export const KitchenSinkLargeFull: Story = {
  args: {
    title: "Nothing to display",
    description: "Create content or adjust your filters to see results here.",
    size: "large",
    icon: <InboxIcon />,
    action: <Button label="Create" size="medium" />,
  },
};

/**
 * Kitchen sink: small + icon + description
 */
export const KitchenSinkSmallWithIcon: Story = {
  args: {
    title: "Quiet here",
    description: "No updates yet.",
    size: "small",
    icon: <SearchIcon />,
  },
};

/**
 * Two empty states side by side
 */
export const TwoSideBySide: Story = {
  args: { title: "Empty" },
  render: () => (
    <div style={{ display: "flex", gap: "16px" }}>
      <EmptyState title="No files" description="Upload to begin." size="small" />
      <EmptyState
        title="No folders"
        description="Create a folder."
        size="small"
        action={<Button label="New folder" size="small" />}
      />
    </div>
  ),
};

/**
 * Whitespace-heavy title
 */
export const WhitespaceTitle: Story = {
  args: {
    title: "  padded title  ",
    description: "normal description",
  },
};

/**
 * Empty-looking description string
 */
export const EmptyStringDescription: Story = {
  args: {
    title: "Title present",
    description: "",
  },
};

/**
 * Medium with green action button
 */
export const GreenActionButton: Story = {
  args: {
    title: "Ready to ship",
    description: "Everything looks good.",
    action: (
      <Button label="Deploy" size="small" backgroundColor={color.green500} />
    ),
  },
};

/**
 * Medium with warning-colored action button
 */
export const WarningActionButton: Story = {
  args: {
    title: "Attention needed",
    description: "Review pending items.",
    action: (
      <Button label="Review" size="small" backgroundColor={color.yellow500} />
    ),
  },
};

/**
 * Small title-only compact layout
 */
export const SmallTitleOnly: Story = {
  args: {
    title: "Empty",
    size: "small",
    description: undefined,
  },
};

/**
 * Large title-only spacious layout
 */
export const LargeTitleOnly: Story = {
  args: {
    title: "Empty",
    size: "large",
    description: undefined,
  },
};

/**
 * Icon with long description
 */
export const IconWithLongDescription: Story = {
  args: {
    title: "No search results",
    description:
      "Your query did not match any records. Try different keywords, broaden the date range, or clear advanced filters.",
    icon: <SearchIcon />,
  },
};

/**
 * Multiple action buttons in the action slot
 */
export const MultipleActions: Story = {
  args: {
    title: "Get started",
    description: "Choose how you want to begin.",
    action: (
      <div style={{ display: "flex", gap: "8px" }}>
        <Button label="Import" size="small" />
        <Button
          label="Create"
          size="small"
          backgroundColor={color.green500}
        />
      </div>
    ),
  },
};

/**
 * Custom emoji icon node
 */
export const EmojiIcon: Story = {
  args: {
    title: "No favorites",
    description: "Star items to see them here.",
    icon: <span style={{ fontSize: "32px" }}>⭐</span>,
  },
};

/**
 * Slate-heavy copy for muted tone
 */
export const MutedCopy: Story = {
  args: {
    title: "Quiet workspace",
    description: "Activity will show up as it happens.",
    size: "medium",
  },
};

/**
 * Short punchy title
 */
export const ShortTitle: Story = {
  args: {
    title: "Empty",
    description: "Add content.",
  },
};

/**
 * Verifies root centers content via play
 */
export const CenteredLayoutAssertion: Story = {
  args: {
    title: "Centered",
    description: "Layout check",
  },
  play: async ({ canvasElement }) => {
    const root = canvasElement.querySelector("div") as HTMLElement;
    await expect(root).toHaveStyle({ textAlign: "center" });
  },
};

/**
 * Verifies small size title font via play
 */
export const SmallSizeTitleAssertion: Story = {
  args: {
    title: "Small title",
    size: "small",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText("Small title");
    await expect(title).toHaveStyle({ fontSize: "0.875rem" });
  },
};

/**
 * Verifies large size title font via play
 */
export const LargeSizeTitleAssertion: Story = {
  args: {
    title: "Large title",
    size: "large",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText("Large title");
    await expect(title).toHaveStyle({ fontSize: "1.5rem" });
  },
};

/**
 * Full small kitchen sink with search icon and dual actions
 */
export const KitchenSinkSmallDualActions: Story = {
  args: {
    title: "No drafts",
    description: "Start writing or import existing work.",
    size: "small",
    icon: <SearchIcon />,
    action: (
      <div style={{ display: "flex", gap: "8px" }}>
        <Button label="Write" size="small" />
        <Button label="Import" size="small" backgroundColor={color.slate600} />
      </div>
    ),
  },
};

/**
 * Medium with inbox icon only
 */
export const MediumInboxIconOnly: Story = {
  args: {
    title: "Inbox empty",
    size: "medium",
    icon: <InboxIcon />,
    description: undefined,
  },
};

/**
 * Large description-only supporting text density
 */
export const LargeWithDenseDescription: Story = {
  args: {
    title: "No timeline events",
    description:
      "Events will appear here as they happen across projects, comments, and deployments.",
    size: "large",
  },
};

/**
 * Small with action only
 */
export const SmallWithActionOnly: Story = {
  args: {
    title: "Start now",
    size: "small",
    description: undefined,
    action: <Button label="Begin" size="small" />,
  },
};

/**
 * Pink accent action button
 */
export const PinkActionButton: Story = {
  args: {
    title: "Invite teammates",
    description: "Collaboration works better together.",
    action: (
      <Button label="Invite" size="small" backgroundColor={color.pink500} />
    ),
  },
};

/**
 * Purple accent action button
 */
export const PurpleActionButton: Story = {
  args: {
    title: "Upgrade plan",
    description: "Unlock additional features for your team.",
    action: (
      <Button label="Upgrade" size="small" backgroundColor={color.purple500} />
    ),
  },
};

/**
 * Compact muted empty state without border emphasis via content
 */
export const CompactMuted: Story = {
  args: {
    title: "No tags",
    description: "Tags you create will show up here.",
    size: "small",
  },
};
