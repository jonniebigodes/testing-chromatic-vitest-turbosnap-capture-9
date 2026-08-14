import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, within, userEvent, expect } from "storybook/test";
import { useState } from "react";
import Accordion from "./Accordion";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    inverted: {
      control: "boolean",
      description: "Whether to render the accordion with inverted (dark) colors",
    },
    items: {
      control: "object",
      description: "The list of accordion items to render",
    },
    value: {
      control: "object",
      description: "The controlled value(s) of the open accordion items",
    },
    defaultValue: {
      control: "object",
      description:
        "The initial value(s) of the open accordion items (uncontrolled)",
    },
    onValueChange: {
      description: "Callback invoked when the open items change",
    },
  },
  args: {
    onValueChange: fn(),
    items: [],
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const twoItems = [
  {
    title: "What is React?",
    content:
      "React is a JavaScript library for building user interfaces. It lets you create reusable components that manage their own state.",
  },
  {
    title: "What is Ark UI?",
    content:
      "Ark UI is a headless UI library that provides accessible and customizable components for React, Vue, and Solid applications.",
  },
];

const threeItems = [
  ...twoItems,
  {
    title: "What is Storybook?",
    content:
      "Storybook is a tool for developing UI components in isolation. It makes building stunning UIs organized and efficient.",
  },
];

const fourItems = [
  ...threeItems,
  {
    title: "What is TypeScript?",
    content:
      "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds optional static typing to the language.",
  },
];

const manyItems = [
  { title: "Section 1", content: "Content for section 1" },
  { title: "Section 2", content: "Content for section 2" },
  { title: "Section 3", content: "Content for section 3" },
  { title: "Section 4", content: "Content for section 4" },
  { title: "Section 5", content: "Content for section 5" },
  { title: "Section 6", content: "Content for section 6" },
  { title: "Section 7", content: "Content for section 7" },
  { title: "Section 8", content: "Content for section 8" },
];

const longContentItems = [
  {
    title: "Getting Started with Accordion",
    content:
      "The accordion component is a vertically stacked set of interactive headings that each reveal a section of content. Users can expand and collapse these sections to show or hide information. This pattern is commonly used in FAQs, documentation, and settings panels where you want to progressively disclose information to avoid overwhelming users with too much content at once.",
  },
  {
    title: "Accessibility Features",
    content:
      "Our accordion implementation follows ARIA best practices, including proper keyboard navigation with arrow keys, home/end key support, and correct ARIA attributes for screen readers. Each accordion item has appropriate aria-expanded states and role attributes.",
  },
];

export const Default: Story = {
  render: (args) => (
    <Accordion
      {...args}
      items={[
        {
          title: "What is React?",
          content:
            "React is a JavaScript library for building user interfaces. It lets you create reusable components that manage their own state.",
        },
      ]}
    />
  ),
};

export const MultipleItems: Story = {
  render: (args) => (
    <Accordion
      {...args}
      items={[
        {
          title: "What is React?",
          content:
            "React is a JavaScript library for building user interfaces. It lets you create reusable components that manage their own state.",
        },
        {
          title: "What is Ark UI?",
          content:
            "Ark UI is a headless UI library that provides accessible and customizable components for React, Vue, and Solid applications.",
        },
        {
          title: "What is Storybook?",
          content:
            "Storybook is a tool for developing UI components in isolation. It makes building stunning UIs organized and efficient.",
        },
        {
          title: "What is TypeScript?",
          content:
            "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds optional static typing to the language.",
        },
      ]}
    />
  ),
};

export const Inverted: Story = {
  args: {
    inverted: true,
  },
  render: (args) => (
    <Accordion
      {...args}
      items={[
        {
          title: "What is React?",
          content:
            "React is a JavaScript library for building user interfaces. It lets you create reusable components that manage their own state.",
        },
        {
          title: "What is Ark UI?",
          content:
            "Ark UI is a headless UI library that provides accessible and customizable components for React, Vue, and Solid applications.",
        },
        {
          title: "What is Storybook?",
          content:
            "Storybook is a tool for developing UI components in isolation. It makes building stunning UIs organized and efficient.",
        },
      ]}
    />
  ),
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const InvertedSingleItem: Story = {
  args: {
    inverted: true,
  },
  render: (args) => (
    <Accordion
      {...args}
      items={[
        {
          title: "Dark Mode Example",
          content:
            "This accordion is displayed with inverted colors suitable for dark backgrounds.",
        },
      ]}
    />
  ),
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const LongContent: Story = {
  render: (args) => (
    <Accordion
      {...args}
      items={[
        {
          title: "Getting Started with Accordion",
          content:
            "The accordion component is a vertically stacked set of interactive headings that each reveal a section of content. Users can expand and collapse these sections to show or hide information. This pattern is commonly used in FAQs, documentation, and settings panels where you want to progressively disclose information to avoid overwhelming users with too much content at once.",
        },
        {
          title: "Accessibility Features",
          content:
            "Our accordion implementation follows ARIA best practices, including proper keyboard navigation with arrow keys, home/end key support, and correct ARIA attributes for screen readers. Each accordion item has appropriate aria-expanded states and role attributes.",
        },
      ]}
    />
  ),
};

export const ManyItems: Story = {
  render: (args) => (
    <Accordion
      {...args}
      items={[
        { title: "Section 1", content: "Content for section 1" },
        { title: "Section 2", content: "Content for section 2" },
        { title: "Section 3", content: "Content for section 3" },
        { title: "Section 4", content: "Content for section 4" },
        { title: "Section 5", content: "Content for section 5" },
        { title: "Section 6", content: "Content for section 6" },
        { title: "Section 7", content: "Content for section 7" },
        { title: "Section 8", content: "Content for section 8" },
      ]}
    />
  ),
};

/* -------------------------------------------------------------------------
 * Controlled `value` prop (4)
 * ---------------------------------------------------------------------- */

/**
 * Controlled accordion with only the first item open, driven entirely by
 * the `value` prop
 */
export const ControlledFirstItemOpen: Story = {
  args: {
    value: ["item-0"],
    items: twoItems,
  },
};

/**
 * Controlled accordion with every item open simultaneously via `value`
 */
export const ControlledAllItemsOpen: Story = {
  args: {
    value: ["item-0", "item-1", "item-2"],
    items: threeItems,
  },
};

/**
 * Controlled accordion with no items open via an empty `value` array
 */
export const ControlledNoItemsOpen: Story = {
  args: {
    value: [],
    items: twoItems,
  },
};

/**
 * Fully controlled accordion whose `value` is owned by external state, with
 * buttons that open/close all items from outside the component
 */
export const ControlledInteractiveToggle: Story = {
  render: (args) => {
    const ControlledAccordion = () => {
      const [value, setValue] = useState<string[]>(["item-0"]);

      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Accordion
            {...args}
            items={threeItems}
            value={value}
            onValueChange={(details) => setValue(details.value)}
          />
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={() => setValue(["item-0", "item-1", "item-2"])}>
              Open all
            </button>
            <button onClick={() => setValue([])}>Close all</button>
          </div>
        </div>
      );
    };

    return <ControlledAccordion />;
  },
};

/* -------------------------------------------------------------------------
 * Uncontrolled `defaultValue` prop (4)
 * ---------------------------------------------------------------------- */

/**
 * Uncontrolled accordion that starts with the second item open via
 * `defaultValue`
 */
export const DefaultValueSecondItemOpen: Story = {
  args: {
    defaultValue: ["item-1"],
    items: threeItems,
  },
};

/**
 * Uncontrolled accordion that starts with two non-adjacent items open
 */
export const DefaultValueMultipleItemsOpen: Story = {
  args: {
    defaultValue: ["item-0", "item-2"],
    items: threeItems,
  },
};

/**
 * Uncontrolled accordion that starts fully closed via an empty
 * `defaultValue` array, overriding the built-in first-item-open fallback
 */
export const DefaultValueNoneOpen: Story = {
  args: {
    defaultValue: [],
    items: twoItems,
  },
};

/**
 * Uncontrolled accordion that starts with every item open
 */
export const DefaultValueAllItemsOpen: Story = {
  args: {
    defaultValue: ["item-0", "item-1", "item-2", "item-3"],
    items: fourItems,
  },
};

/* -------------------------------------------------------------------------
 * Single item & empty items edge cases (4)
 * ---------------------------------------------------------------------- */

/**
 * A single-item accordion that starts closed
 */
export const SingleItemDefaultClosed: Story = {
  args: {
    defaultValue: [],
    items: [twoItems[0]],
  },
};

/**
 * A single-item accordion rendered with inverted colors
 */
export const SingleItemInverted: Story = {
  args: {
    inverted: true,
    items: [
      {
        title: "Dark Mode Example",
        content:
          "This single accordion item is displayed with inverted colors suitable for dark backgrounds.",
      },
    ],
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

/**
 * An accordion rendered with an empty items array, exercising the
 * no-content edge case
 */
export const EmptyItemsArray: Story = {
  args: {
    items: [],
  },
};

/**
 * An accordion rendered with an empty items array and inverted colors
 */
export const EmptyItemsArrayInverted: Story = {
  args: {
    inverted: true,
    items: [],
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

/* -------------------------------------------------------------------------
 * Expand/collapse interaction with multiple items open (4)
 * ---------------------------------------------------------------------- */

/**
 * Clicking a second trigger opens it while the first (default-open) item
 * stays open, proving multiple items can be expanded simultaneously
 */
export const ExpandSecondItemKeepsFirstOpen: Story = {
  args: {
    items: threeItems,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const firstTrigger = canvas.getByRole("button", { name: "What is React?" });
    const secondTrigger = canvas.getByRole("button", {
      name: "What is Ark UI?",
    });
    expect(firstTrigger).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(secondTrigger);
    expect(firstTrigger).toHaveAttribute("aria-expanded", "true");
    expect(secondTrigger).toHaveAttribute("aria-expanded", "true");
    expect(args.onValueChange).toHaveBeenCalled();
  },
};

/**
 * Clicking the default-open first trigger collapses it
 */
export const CollapseFirstItemViaClick: Story = {
  args: {
    items: threeItems,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const firstTrigger = canvas.getByRole("button", { name: "What is React?" });
    expect(firstTrigger).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(firstTrigger);
    expect(firstTrigger).toHaveAttribute("aria-expanded", "false");
  },
};

/**
 * Clicking the remaining closed triggers ends with all three items open
 */
export const ExpandAllItemsViaClicks: Story = {
  args: {
    items: threeItems,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const secondTrigger = canvas.getByRole("button", {
      name: "What is Ark UI?",
    });
    const thirdTrigger = canvas.getByRole("button", {
      name: "What is Storybook?",
    });
    await userEvent.click(secondTrigger);
    await userEvent.click(thirdTrigger);
    const firstTrigger = canvas.getByRole("button", { name: "What is React?" });
    expect(firstTrigger).toHaveAttribute("aria-expanded", "true");
    expect(secondTrigger).toHaveAttribute("aria-expanded", "true");
    expect(thirdTrigger).toHaveAttribute("aria-expanded", "true");
  },
};

/**
 * The `collapsible` behavior allows closing the last remaining open item,
 * unlike accordion implementations that force one item to always stay open
 */
export const CollapsibleAllowsClosingLastOpenItem: Story = {
  args: {
    items: [twoItems[0]],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "What is React?" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  },
};

/* -------------------------------------------------------------------------
 * Keyboard navigation (6)
 * ---------------------------------------------------------------------- */

/**
 * ArrowDown moves focus from one trigger to the next
 */
export const ArrowDownMovesFocusToNextTrigger: Story = {
  args: {
    items: threeItems,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = canvas.getAllByRole("button");
    triggers[0].focus();
    await userEvent.keyboard("{ArrowDown}");
    expect(triggers[1]).toHaveFocus();
  },
};

/**
 * ArrowUp moves focus from one trigger to the previous one
 */
export const ArrowUpMovesFocusToPreviousTrigger: Story = {
  args: {
    items: threeItems,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = canvas.getAllByRole("button");
    triggers[1].focus();
    await userEvent.keyboard("{ArrowUp}");
    expect(triggers[0]).toHaveFocus();
  },
};

/**
 * Home moves focus to the first trigger regardless of current focus
 */
export const HomeKeyMovesFocusToFirstTrigger: Story = {
  args: {
    items: threeItems,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = canvas.getAllByRole("button");
    triggers[2].focus();
    await userEvent.keyboard("{Home}");
    expect(triggers[0]).toHaveFocus();
  },
};

/**
 * End moves focus to the last trigger regardless of current focus
 */
export const EndKeyMovesFocusToLastTrigger: Story = {
  args: {
    items: threeItems,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = canvas.getAllByRole("button");
    triggers[0].focus();
    await userEvent.keyboard("{End}");
    expect(triggers[2]).toHaveFocus();
  },
};

/**
 * Pressing Enter on a focused trigger toggles its expanded state
 */
export const EnterKeyTogglesFocusedItem: Story = {
  args: {
    items: threeItems,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const triggers = canvas.getAllByRole("button");
    triggers[1].focus();
    expect(triggers[1]).toHaveAttribute("aria-expanded", "false");
    await userEvent.keyboard("{Enter}");
    expect(triggers[1]).toHaveAttribute("aria-expanded", "true");
    expect(args.onValueChange).toHaveBeenCalled();
  },
};

/**
 * Pressing Space on a focused trigger toggles its expanded state
 */
export const SpaceKeyTogglesFocusedItem: Story = {
  args: {
    items: threeItems,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const triggers = canvas.getAllByRole("button");
    triggers[2].focus();
    expect(triggers[2]).toHaveAttribute("aria-expanded", "false");
    await userEvent.keyboard(" ");
    expect(triggers[2]).toHaveAttribute("aria-expanded", "true");
    expect(args.onValueChange).toHaveBeenCalled();
  },
};

/* -------------------------------------------------------------------------
 * Indicator rotation via data-state (2)
 * ---------------------------------------------------------------------- */

/**
 * The indicator on an open item carries `data-state="open"`, the signal
 * used to drive its rotated visual state
 */
export const IndicatorReflectsOpenState: Story = {
  args: {
    items: twoItems,
  },
  play: async ({ canvasElement }) => {
    const indicators = canvasElement.querySelectorAll(
      '[data-part="item-indicator"]'
    );
    expect(indicators[0]).toHaveAttribute("data-state", "open");
  },
};

/**
 * The indicator on a closed item carries `data-state="closed"`
 */
export const IndicatorReflectsClosedState: Story = {
  args: {
    items: twoItems,
  },
  play: async ({ canvasElement }) => {
    const indicators = canvasElement.querySelectorAll(
      '[data-part="item-indicator"]'
    );
    expect(indicators[1]).toHaveAttribute("data-state", "closed");
  },
};

/* -------------------------------------------------------------------------
 * Inverted styling variations (3)
 * ---------------------------------------------------------------------- */

/**
 * Inverted colors with a longer list of items
 */
export const InvertedManyItems: Story = {
  args: {
    inverted: true,
    items: manyItems,
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

/**
 * Inverted colors with long-form paragraph content
 */
export const InvertedLongContent: Story = {
  args: {
    inverted: true,
    items: longContentItems,
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

/**
 * Inverted colors combined with a controlled `value`
 */
export const InvertedControlledValue: Story = {
  args: {
    inverted: true,
    value: ["item-1"],
    items: threeItems,
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

/* -------------------------------------------------------------------------
 * Content variations: short/long/RTL/emoji/unicode (5)
 * ---------------------------------------------------------------------- */

/**
 * Minimal, very short title and content
 */
export const ShortContent: Story = {
  args: {
    items: [{ title: "FAQ", content: "Yes." }],
  },
};

/**
 * Right-to-left Arabic unicode title and content
 */
export const RTLContent: Story = {
  args: {
    items: [
      {
        title: "ما هو رياكت؟",
        content: "رياكت هي مكتبة جافا سكريبت لبناء واجهات المستخدم.",
      },
      {
        title: "ما هو Storybook؟",
        content: "Storybook هي أداة لتطوير مكونات واجهة المستخدم بشكل منعزل.",
      },
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
 * Emoji-laden titles and content
 */
export const EmojiContent: Story = {
  args: {
    items: [
      {
        title: "🎉 What's new?",
        content: "✅ Bug fixes and 🚀 performance improvements.",
      },
      {
        title: "💡 Tips",
        content: "🔍 Search faster with keyboard shortcuts.",
      },
    ],
  },
};

/**
 * Mixed unicode content combining accented Latin characters, emoji, and CJK
 * text
 */
export const UnicodeMixedContent: Story = {
  args: {
    items: [
      {
        title: "Café ☕ et Théâtre 🎭",
        content: "Confirmé et terminé ! 中文内容也可以正常显示。",
      },
    ],
  },
};

/**
 * An extremely long title forced to wrap inside a narrow container
 */
export const VeryLongTitleWrapping: Story = {
  args: {
    items: [
      {
        title:
          "This is an extremely long accordion trigger title that should wrap across multiple lines when rendered inside a narrow container to verify layout resilience",
        content: "Short content.",
      },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "240px" }}>
        <Story />
      </div>
    ),
  ],
};

/* -------------------------------------------------------------------------
 * Kitchen-sink combinations (4)
 * ---------------------------------------------------------------------- */

/**
 * Kitchen sink: inverted colors, a controlled `value` with two items open,
 * and long-form content
 */
export const KitchenSinkInvertedControlledLongContent: Story = {
  args: {
    inverted: true,
    value: ["item-0", "item-1"],
    items: longContentItems,
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

/**
 * Kitchen sink: many items with a non-contiguous `defaultValue` subset open
 */
export const KitchenSinkManyItemsDefaultValueSubset: Story = {
  args: {
    defaultValue: ["item-2", "item-5"],
    items: manyItems,
  },
};

/**
 * Kitchen sink: inverted colors combined with the empty-items edge case
 */
export const KitchenSinkEmptyItemsInverted: Story = {
  args: {
    inverted: true,
    items: [],
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

/**
 * Kitchen sink: RTL/emoji/unicode content, a controlled `value`, and three
 * items together
 */
export const KitchenSinkRTLEmojiManyItemsControlled: Story = {
  args: {
    value: ["item-0", "item-2"],
    items: [
      {
        title: "🎉 ما الجديد؟",
        content: "تحسينات في الأداء 🚀 وإصلاح الأخطاء ✅.",
      },
      {
        title: "💡 Astuce",
        content: "Utilisez les raccourcis clavier.",
      },
      {
        title: "中文标题 🀄",
        content: "这是中文内容示例。",
      },
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

/* -------------------------------------------------------------------------
 * onValueChange callback assertions (4)
 * ---------------------------------------------------------------------- */

/**
 * Clicking a trigger invokes onValueChange exactly once
 */
export const CallsOnValueChangeWhenTriggerClicked: Story = {
  args: {
    items: twoItems,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "What is Ark UI?" });
    await userEvent.click(trigger);
    expect(args.onValueChange).toHaveBeenCalledTimes(1);
  },
};

/**
 * Clicking a closed trigger invokes onValueChange with the newly-updated
 * value array that includes both the previously open and newly opened item
 */
export const CallsOnValueChangeWithUpdatedValueArray: Story = {
  args: {
    items: twoItems,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "What is Ark UI?" });
    await userEvent.click(trigger);
    expect(args.onValueChange).toHaveBeenCalledWith(
      expect.objectContaining({
        value: expect.arrayContaining(["item-0", "item-1"]),
      })
    );
  },
};

/**
 * Toggling the same trigger twice invokes onValueChange twice
 */
export const CallsOnValueChangeForEachToggle: Story = {
  args: {
    items: twoItems,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "What is React?" });
    await userEvent.click(trigger);
    await userEvent.click(trigger);
    expect(args.onValueChange).toHaveBeenCalledTimes(2);
  },
};

/**
 * onValueChange is not invoked merely from the initial render
 */
export const DoesNotCallOnValueChangeOnInitialRender: Story = {
  args: {
    items: twoItems,
  },
  play: async ({ args }) => {
    expect(args.onValueChange).not.toHaveBeenCalled();
  },
};

/* -------------------------------------------------------------------------
 * Accessibility / ARIA attributes (4)
 * ---------------------------------------------------------------------- */

/**
 * The trigger for an open item exposes aria-expanded="true"
 */
export const AriaExpandedTrueWhenItemOpen: Story = {
  args: {
    items: twoItems,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "What is React?" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  },
};

/**
 * The trigger for a closed item exposes aria-expanded="false"
 */
export const AriaExpandedFalseWhenItemClosed: Story = {
  args: {
    items: twoItems,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "What is Ark UI?" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  },
};

/**
 * The trigger's aria-controls attribute references the id of its
 * corresponding content region
 */
export const AriaControlsMatchesContentId: Story = {
  args: {
    items: twoItems,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "What is React?" });
    const controlsId = trigger.getAttribute("aria-controls");
    expect(controlsId).toBeTruthy();
    const content = canvasElement.querySelector(`[id="${controlsId}"]`);
    expect(content).not.toBeNull();
  },
};

/**
 * The open item's content area exposes an accessible region role labelled
 * by its trigger
 */
export const ContentHasRegionRole: Story = {
  args: {
    items: twoItems,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const region = canvas.getByRole("region", { name: "What is React?" });
    expect(region).not.toBeNull();
  },
};
