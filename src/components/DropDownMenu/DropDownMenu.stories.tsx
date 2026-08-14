import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, within, userEvent, expect, waitFor } from "storybook/test";
import DropDownMenu from "./DropDownMenu";
import { ark } from "@ark-ui/react/factory";

const meta = {
  title: "Components/DropDownMenu",
  component: DropDownMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "color",
      description: "Background color of the dropdown button",
    },
    label: {
      control: "text",
      description: "Label text displayed on the dropdown button",
    },
    children: {
      control: "object",
      description: "Array of strings to populate the dropdown options",
    },
    inverted: {
      control: "boolean",
      description: "Renders the dropdown menu in inverted colors",
    },
    onSelect: {
      description: "Callback when an option is selected",
    },
  },
  args: {
    onSelect: fn(),
    label: "Menu",
    children: [],
  },
} satisfies Meta<typeof DropDownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The menu content is always mounted in the DOM; Ark toggles a native
 * `hidden` attribute rather than unmounting/remounting it, so it must be
 * queried directly instead of through role-based queries which exclude
 * hidden elements.
 */
const getMenuContent = (canvasElement: HTMLElement) =>
  canvasElement.querySelector('[role="menu"]') as HTMLElement;

/** All menu item elements currently rendered, in document order. */
const getMenuItems = (canvasElement: HTMLElement) =>
  Array.from(canvasElement.querySelectorAll('[role="menuitem"]')) as HTMLElement[];

/** Finds a menu item element by its exact visible text. */
const getMenuItemByText = (canvasElement: HTMLElement, text: string) =>
  getMenuItems(canvasElement).find((item) => item.textContent === text) as HTMLElement;

/* -------------------------------------------------------------------------
 * Baseline scenarios (8)
 * ---------------------------------------------------------------------- */

/**
 * Default dropdown menu with blue button and sample options
 */
export const Default: Story = {
  args: {
    label: "Options",
    color: "#3b82f6",
    children: ["Option 1", "Option 2", "Option 3", "Option 4"],
    inverted: false,
  },
};

/**
 * Dropdown menu with custom red color
 */
export const CustomColor: Story = {
  args: {
    label: "Actions",
    color: "#ef4444",
    children: ["Edit", "Delete", "Archive", "Share"],
    inverted: false,
  },
};

/**
 * Dropdown menu with custom green color
 */
export const GreenColor: Story = {
  args: {
    label: "Choose",
    color: "#10b981",
    children: ["Accept", "Decline", "Pending", "Review"],
    inverted: false,
  },
};

/**
 * Dropdown menu with inverted colors (dark mode)
 */
export const Inverted: Story = {
  args: {
    label: "Settings",
    color: "#1f2937",
    children: ["Profile", "Preferences", "Security", "Logout"],
    inverted: true,
  },
  render: (args) => (
    <ark.div
      style={{
        backgroundColor: "#1f2937",
        padding: "32px",
        borderRadius: "8px",
        minHeight: "300px",
      }}
    >
      <DropDownMenu {...args} />
    </ark.div>
  ),
};

/**
 * Dropdown menu with many options
 */
export const ManyOptions: Story = {
  args: {
    label: "Countries",
    color: "#8b5cf6",
    children: [
      "United States",
      "United Kingdom",
      "Canada",
      "Australia",
      "Germany",
      "France",
      "Japan",
      "Brazil",
      "India",
      "Mexico",
    ],
    inverted: false,
  },
};

/**
 * Dropdown menu with short options
 */
export const ShortOptions: Story = {
  args: {
    label: "Priority",
    color: "#f59e0b",
    children: ["High", "Medium", "Low"],
    inverted: false,
  },
};

/**
 * Dropdown menu with selected item callback
 */
export const WithCallback: Story = {
  args: {
    label: "File",
    color: "#3b82f6",
    children: ["New", "Open", "Save", "Save As", "Exit"],
    inverted: false,
    onSelect: fn((item) => {
      alert(`Selected: ${item}`);
    }),
  },
};

/**
 * Multiple dropdown menus side by side
 */
export const Multiple: Story = {
  render: () => (
    <ark.div style={{ display: "flex", gap: "16px" }}>
      <DropDownMenu
        label="File"
        color="#3b82f6"
        children={["New", "Open", "Save"]}
      />
      <DropDownMenu
        label="Edit"
        color="#ef4444"
        children={["Cut", "Copy", "Paste"]}
      />
      <DropDownMenu
        label="View"
        color="#10b981"
        children={["Zoom In", "Zoom Out", "Reset"]}
      />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * Color variations (4)
 * ---------------------------------------------------------------------- */

/**
 * Dropdown menu using the purple token color for its trigger button
 */
export const PurpleColor: Story = {
  args: {
    label: "Theme",
    color: "#6f2cac",
    children: ["Light", "Dark", "System"],
    inverted: false,
  },
};

/**
 * Dropdown menu using the orange token color for its trigger button
 */
export const OrangeColor: Story = {
  args: {
    label: "Status",
    color: "#ff4400",
    children: ["Open", "In Progress", "Closed"],
    inverted: false,
  },
};

/**
 * Dropdown menu using the pink token color for its trigger button
 */
export const PinkColor: Story = {
  args: {
    label: "Tag",
    color: "#ff4785",
    children: ["Bug", "Feature", "Chore"],
    inverted: false,
  },
};

/**
 * Dropdown menu using the yellow token color for its trigger button
 */
export const YellowColor: Story = {
  args: {
    label: "Warning Level",
    color: "#ffae00",
    children: ["Low", "Medium", "High"],
    inverted: false,
  },
};

/* -------------------------------------------------------------------------
 * Inverted crossed with content variations (3)
 * ---------------------------------------------------------------------- */

/**
 * Inverted dropdown menu rendered with many options on a dark background
 */
export const InvertedManyOptions: Story = {
  args: {
    label: "Region",
    color: "#1f2937",
    children: [
      "North America",
      "South America",
      "Europe",
      "Africa",
      "Asia",
      "Oceania",
      "Antarctica",
    ],
    inverted: true,
  },
  render: (args) => (
    <ark.div
      style={{ backgroundColor: "#1f2937", padding: "32px", borderRadius: "8px" }}
    >
      <DropDownMenu {...args} />
    </ark.div>
  ),
};

/**
 * Inverted dropdown menu with only two short options
 */
export const InvertedShortOptions: Story = {
  args: {
    label: "Mode",
    color: "#1f2937",
    children: ["On", "Off"],
    inverted: true,
  },
  render: (args) => (
    <ark.div
      style={{ backgroundColor: "#1f2937", padding: "32px", borderRadius: "8px" }}
    >
      <DropDownMenu {...args} />
    </ark.div>
  ),
};

/**
 * Inverted dropdown menu whose selection is captured via onSelect
 */
export const InvertedWithCallback: Story = {
  args: {
    label: "Theme",
    color: "#1f2937",
    children: ["Light", "Dark", "System"],
    inverted: true,
  },
  render: (args) => (
    <ark.div
      style={{ backgroundColor: "#1f2937", padding: "32px", borderRadius: "8px" }}
    >
      <DropDownMenu {...args} />
    </ark.div>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    await userEvent.click(trigger);
    const content = getMenuContent(canvasElement);
    await waitFor(() => expect(content).toBeVisible());
    const item = getMenuItemByText(canvasElement, "Dark");
    await userEvent.click(item);
    await expect(args.onSelect).toHaveBeenCalledWith("Dark");
  },
};

/* -------------------------------------------------------------------------
 * Item text length/content edge cases (5)
 * ---------------------------------------------------------------------- */

/**
 * Dropdown menu including an extremely long item label alongside short ones
 */
export const LongItemText: Story = {
  args: {
    label: "Description",
    color: "#3b82f6",
    children: [
      "A short one",
      "An extremely long menu item label used to exercise the ellipsis overflow styling applied to every item in the list",
      "Another short one",
    ],
    inverted: false,
  },
};

/**
 * Dropdown menu with single-character item labels
 */
export const VeryShortSingleCharacterItems: Story = {
  args: {
    label: "Grade",
    color: "#3b82f6",
    children: ["A", "B", "C", "D", "F"],
    inverted: false,
  },
};

/**
 * Dropdown menu with right-to-left Arabic label and item text
 */
export const RTLItems: Story = {
  args: {
    label: "اللغة",
    color: "#3b82f6",
    children: ["العربية", "الإنجليزية", "الفرنسية"],
    inverted: false,
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
 * Dropdown menu whose items contain emoji
 */
export const EmojiItems: Story = {
  args: {
    label: "React 🎉",
    color: "#3b82f6",
    children: ["👍 Like", "❤️ Love", "😂 Laugh", "😮 Wow"],
    inverted: false,
  },
};

/**
 * Dropdown menu mixing very short and moderately long item labels
 */
export const MixedLengthItems: Story = {
  args: {
    label: "Mixed",
    color: "#3b82f6",
    children: [
      "Hi",
      "A medium length option",
      "X",
      "An even longer option label for contrast",
    ],
    inverted: false,
  },
};

/* -------------------------------------------------------------------------
 * Item count edge cases (3)
 * ---------------------------------------------------------------------- */

/**
 * Dropdown menu with a single selectable option
 */
export const SingleOption: Story = {
  args: {
    label: "Confirm",
    color: "#3b82f6",
    children: ["Yes"],
    inverted: false,
  },
};

/**
 * Dropdown menu with exactly two options
 */
export const TwoOptions: Story = {
  args: {
    label: "Answer",
    color: "#3b82f6",
    children: ["Yes", "No"],
    inverted: false,
  },
};

/**
 * Dropdown menu with enough options to require internal scrolling
 */
export const VeryManyOptionsScrollable: Story = {
  args: {
    label: "Number",
    color: "#3b82f6",
    children: Array.from({ length: 25 }, (_, i) => `Item ${i + 1}`),
    inverted: false,
  },
};

/* -------------------------------------------------------------------------
 * Label/prop edge cases (3)
 * ---------------------------------------------------------------------- */

/**
 * Dropdown menu with a very long trigger label
 */
export const LongButtonLabel: Story = {
  args: {
    label:
      "This is a very long trigger button label used to test wrapping and overflow",
    color: "#3b82f6",
    children: ["Option 1", "Option 2"],
    inverted: false,
  },
};

/**
 * Dropdown menu whose trigger label is an empty string
 */
export const EmptyButtonLabel: Story = {
  args: {
    label: "",
    color: "#3b82f6",
    children: ["Option 1", "Option 2"],
    inverted: false,
  },
};

/**
 * Dropdown menu with an emoji embedded in the trigger label
 */
export const EmojiButtonLabel: Story = {
  args: {
    label: "🚀 Launch",
    color: "#3b82f6",
    children: ["Deploy", "Cancel"],
    inverted: false,
  },
};

/* -------------------------------------------------------------------------
 * Open/close interaction (4)
 * ---------------------------------------------------------------------- */

/**
 * Clicking the trigger opens the menu content
 */
export const OpensOnTriggerClick: Story = {
  args: {
    label: "Menu",
    color: "#3b82f6",
    children: ["Alpha", "Beta", "Gamma"],
    inverted: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(trigger);
    const content = getMenuContent(canvasElement);
    await waitFor(() => expect(content).toBeVisible());
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
  },
};

/**
 * Pressing Escape while the menu is open closes it
 */
export const ClosesOnEscapeKey: Story = {
  args: {
    label: "Menu",
    color: "#3b82f6",
    children: ["Alpha", "Beta", "Gamma"],
    inverted: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    await userEvent.click(trigger);
    const content = getMenuContent(canvasElement);
    await waitFor(() => expect(content).toBeVisible());
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(content).not.toBeVisible());
  },
};

/**
 * Clicking outside the open menu closes it
 */
export const ClosesOnOutsideClick: Story = {
  args: {
    label: "Menu",
    color: "#3b82f6",
    children: ["Alpha", "Beta", "Gamma"],
    inverted: false,
  },
  render: (args) => (
    <div>
      <DropDownMenu {...args} />
      <button style={{ marginLeft: "16px" }}>Outside</button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole("button");
    const trigger = buttons[0];
    const outside = buttons[1];
    await userEvent.click(trigger);
    const content = getMenuContent(canvasElement);
    await waitFor(() => expect(content).toBeVisible());
    await userEvent.click(outside);
    await waitFor(() => expect(content).not.toBeVisible());
  },
};

/**
 * A menu can be closed and reopened repeatedly by clicking the trigger
 */
export const ReopensAfterClose: Story = {
  args: {
    label: "Menu",
    color: "#3b82f6",
    children: ["Alpha", "Beta", "Gamma"],
    inverted: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    const content = getMenuContent(canvasElement);
    await userEvent.click(trigger);
    await waitFor(() => expect(content).toBeVisible());
    await userEvent.click(trigger);
    await waitFor(() => expect(content).not.toBeVisible());
    await userEvent.click(trigger);
    await waitFor(() => expect(content).toBeVisible());
  },
};

/* -------------------------------------------------------------------------
 * Keyboard navigation (6)
 * ---------------------------------------------------------------------- */

/**
 * Pressing ArrowDown on the focused, closed trigger opens the menu and
 * highlights the first item
 */
export const ArrowDownOpensAndHighlightsFirst: Story = {
  args: {
    label: "Menu",
    color: "#3b82f6",
    children: ["Alpha", "Beta", "Gamma"],
    inverted: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    trigger.focus();
    await userEvent.keyboard("{ArrowDown}");
    const content = getMenuContent(canvasElement);
    await waitFor(() => expect(content).toBeVisible());
    const items = getMenuItems(canvasElement);
    await waitFor(() => expect(items[0]).toHaveAttribute("data-highlighted"));
  },
};

/**
 * Pressing ArrowUp on the focused, closed trigger opens the menu and
 * highlights the last item
 */
export const ArrowUpOpensAndHighlightsLast: Story = {
  args: {
    label: "Menu",
    color: "#3b82f6",
    children: ["Alpha", "Beta", "Gamma"],
    inverted: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    trigger.focus();
    await userEvent.keyboard("{ArrowUp}");
    const content = getMenuContent(canvasElement);
    await waitFor(() => expect(content).toBeVisible());
    const items = getMenuItems(canvasElement);
    await waitFor(() =>
      expect(items[items.length - 1]).toHaveAttribute("data-highlighted")
    );
  },
};

/**
 * Pressing ArrowDown twice while the menu is open moves the highlight to
 * the second item
 */
export const ArrowDownTwiceHighlightsSecondItem: Story = {
  args: {
    label: "Menu",
    color: "#3b82f6",
    children: ["Alpha", "Beta", "Gamma"],
    inverted: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    trigger.focus();
    await userEvent.keyboard("{ArrowDown}");
    const content = getMenuContent(canvasElement);
    await waitFor(() => expect(content).toHaveFocus());
    await userEvent.keyboard("{ArrowDown}");
    const items = getMenuItems(canvasElement);
    await waitFor(() => expect(items[1]).toHaveAttribute("data-highlighted"));
  },
};

/**
 * Pressing Enter selects the currently highlighted item and closes the menu
 */
export const EnterSelectsHighlightedItem: Story = {
  args: {
    label: "Menu",
    color: "#3b82f6",
    children: ["Alpha", "Beta", "Gamma"],
    inverted: false,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    trigger.focus();
    await userEvent.keyboard("{ArrowDown}");
    const content = getMenuContent(canvasElement);
    await waitFor(() => expect(content).toHaveFocus());
    await userEvent.keyboard("{Enter}");
    await expect(args.onSelect).toHaveBeenCalledWith("Alpha");
    await waitFor(() => expect(content).not.toBeVisible());
  },
};

/**
 * Navigating up to the last item and pressing Enter selects it
 */
export const ArrowUpThenEnterSelectsLastItem: Story = {
  args: {
    label: "Menu",
    color: "#3b82f6",
    children: ["Alpha", "Beta", "Gamma"],
    inverted: false,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    trigger.focus();
    await userEvent.keyboard("{ArrowUp}");
    const content = getMenuContent(canvasElement);
    await waitFor(() => expect(content).toHaveFocus());
    await userEvent.keyboard("{Enter}");
    await expect(args.onSelect).toHaveBeenCalledWith("Gamma");
  },
};

/**
 * Pressing Escape while the menu is open closes it and returns focus to
 * the trigger
 */
export const EscapeReturnsFocusToTrigger: Story = {
  args: {
    label: "Menu",
    color: "#3b82f6",
    children: ["Alpha", "Beta", "Gamma"],
    inverted: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    await userEvent.click(trigger);
    const content = getMenuContent(canvasElement);
    await waitFor(() => expect(content).toBeVisible());
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(trigger).toHaveFocus());
  },
};

/* -------------------------------------------------------------------------
 * onSelect callback correctness (3)
 * ---------------------------------------------------------------------- */

/**
 * Clicking the first item invokes onSelect with its exact text
 */
export const SelectFirstItemViaClick: Story = {
  args: {
    label: "Menu",
    color: "#3b82f6",
    children: ["Alpha", "Beta", "Gamma"],
    inverted: false,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    await userEvent.click(trigger);
    const content = getMenuContent(canvasElement);
    await waitFor(() => expect(content).toBeVisible());
    const item = getMenuItemByText(canvasElement, "Alpha");
    await userEvent.click(item);
    await expect(args.onSelect).toHaveBeenCalledWith("Alpha");
  },
};

/**
 * Clicking a middle item invokes onSelect with its exact text
 */
export const SelectMiddleItemViaClick: Story = {
  args: {
    label: "Menu",
    color: "#3b82f6",
    children: ["Alpha", "Beta", "Gamma"],
    inverted: false,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    await userEvent.click(trigger);
    const content = getMenuContent(canvasElement);
    await waitFor(() => expect(content).toBeVisible());
    const item = getMenuItemByText(canvasElement, "Beta");
    await userEvent.click(item);
    await expect(args.onSelect).toHaveBeenCalledWith("Beta");
  },
};

/**
 * Clicking the last item invokes onSelect with its exact text
 */
export const SelectLastItemViaClick: Story = {
  args: {
    label: "Menu",
    color: "#3b82f6",
    children: ["Alpha", "Beta", "Gamma"],
    inverted: false,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    await userEvent.click(trigger);
    const content = getMenuContent(canvasElement);
    await waitFor(() => expect(content).toBeVisible());
    const item = getMenuItemByText(canvasElement, "Gamma");
    await userEvent.click(item);
    await expect(args.onSelect).toHaveBeenCalledWith("Gamma");
  },
};

/* -------------------------------------------------------------------------
 * Focus management (2)
 * ---------------------------------------------------------------------- */

/**
 * Selecting an item via keyboard returns focus to the trigger button
 */
export const FocusReturnsToTriggerAfterSelection: Story = {
  args: {
    label: "Menu",
    color: "#3b82f6",
    children: ["Alpha", "Beta", "Gamma"],
    inverted: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    trigger.focus();
    await userEvent.keyboard("{ArrowDown}");
    const content = getMenuContent(canvasElement);
    await waitFor(() => expect(content).toHaveFocus());
    await userEvent.keyboard("{Enter}");
    await waitFor(() => expect(trigger).toHaveFocus());
  },
};

/**
 * The trigger button is reachable via the Tab key
 */
export const TriggerFocusableViaTab: Story = {
  args: {
    label: "Menu",
    color: "#3b82f6",
    children: ["Alpha", "Beta", "Gamma"],
    inverted: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    await expect(trigger).toHaveFocus();
  },
};

/* -------------------------------------------------------------------------
 * ARIA / role assertions (3)
 * ---------------------------------------------------------------------- */

/**
 * The trigger exposes the expected ARIA menu-button attributes
 */
export const TriggerHasMenuAriaAttributes: Story = {
  args: {
    label: "Menu",
    color: "#3b82f6",
    children: ["Alpha", "Beta", "Gamma"],
    inverted: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    await expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    await expect(trigger).toHaveAttribute("aria-controls");
  },
};

/**
 * The open menu content exposes the "menu" ARIA role
 */
export const MenuHasMenuRoleWhenOpen: Story = {
  args: {
    label: "Menu",
    color: "#3b82f6",
    children: ["Alpha", "Beta", "Gamma"],
    inverted: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    await userEvent.click(trigger);
    const menu = await canvas.findByRole("menu");
    await expect(menu).toBeVisible();
  },
};

/**
 * Every rendered option exposes the "menuitem" ARIA role
 */
export const ItemsHaveMenuItemRole: Story = {
  args: {
    label: "Menu",
    color: "#3b82f6",
    children: ["Alpha", "Beta", "Gamma"],
    inverted: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    await userEvent.click(trigger);
    const menuItems = await canvas.findAllByRole("menuitem");
    await expect(menuItems).toHaveLength(3);
  },
};

/* -------------------------------------------------------------------------
 * Kitchen-sink combinations (4)
 * ---------------------------------------------------------------------- */

/**
 * Kitchen sink: inverted colors, many items, and a very long item label,
 * selected by clicking a short item among them
 */
export const KitchenSinkInvertedManyLongItems: Story = {
  args: {
    label: "Kitchen Sink",
    color: "#1f2937",
    children: [
      "Short",
      "A moderately long menu item for contrast",
      "An extremely long menu item label meant to exercise overflow and ellipsis handling across the board",
      "X",
      "Another item",
    ],
    inverted: true,
  },
  render: (args) => (
    <ark.div
      style={{ backgroundColor: "#1f2937", padding: "32px", borderRadius: "8px" }}
    >
      <DropDownMenu {...args} />
    </ark.div>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    await userEvent.click(trigger);
    const content = getMenuContent(canvasElement);
    await waitFor(() => expect(content).toBeVisible());
    const item = getMenuItemByText(canvasElement, "X");
    await userEvent.click(item);
    await expect(args.onSelect).toHaveBeenCalledWith("X");
  },
};

/**
 * Kitchen sink: custom color, RTL label/items, and emoji together
 */
export const KitchenSinkCustomColorEmojiRTL: Story = {
  args: {
    label: "🌐 اللغة",
    color: "#6f2cac",
    children: ["✅ العربية", "✅ English", "✅ Français"],
    inverted: false,
  },
  decorators: [
    (Story) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    await userEvent.click(trigger);
    const content = getMenuContent(canvasElement);
    await waitFor(() => expect(content).toBeVisible());
    const item = getMenuItemByText(canvasElement, "✅ English");
    await userEvent.click(item);
    await expect(args.onSelect).toHaveBeenCalledWith("✅ English");
  },
};

/**
 * Kitchen sink: many options selected purely via keyboard navigation
 */
export const KitchenSinkCallbackWithKeyboardSelection: Story = {
  args: {
    label: "Countries",
    color: "#8b5cf6",
    children: [
      "United States",
      "United Kingdom",
      "Canada",
      "Australia",
      "Germany",
      "France",
      "Japan",
      "Brazil",
      "India",
      "Mexico",
    ],
    inverted: false,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    trigger.focus();
    await userEvent.keyboard("{ArrowDown}");
    const content = getMenuContent(canvasElement);
    await waitFor(() => expect(content).toHaveFocus());
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{Enter}");
    await expect(args.onSelect).toHaveBeenCalledWith("Canada");
  },
};

/**
 * Kitchen sink: inverted menu rendered inside a narrow container
 */
export const KitchenSinkNarrowContainerInverted: Story = {
  args: {
    label: "Settings",
    color: "#1f2937",
    children: ["Profile", "Preferences", "Security", "Logout"],
    inverted: true,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          maxWidth: "180px",
          backgroundColor: "#1f2937",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

/* -------------------------------------------------------------------------
 * Layout/context & multiple menus (2)
 * ---------------------------------------------------------------------- */

/**
 * Dropdown menu with a custom color rendered on a dark background
 */
export const OnDarkCustomBackground: Story = {
  args: {
    label: "Actions",
    color: "#37d5d3",
    children: ["Edit", "Delete", "Share"],
    inverted: false,
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: "#0f172a", padding: "24px", borderRadius: "8px" }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Three dropdown menus stacked vertically instead of side by side
 */
export const ThreeMenusStackedVertically: Story = {
  render: () => (
    <ark.div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <DropDownMenu label="File" color="#3b82f6" children={["New", "Open", "Save"]} />
      <DropDownMenu label="Edit" color="#ef4444" children={["Cut", "Copy", "Paste"]} />
      <DropDownMenu
        label="View"
        color="#10b981"
        children={["Zoom In", "Zoom Out", "Reset"]}
      />
    </ark.div>
  ),
};
