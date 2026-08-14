import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, within, userEvent, expect } from "storybook/test";
import { useState } from "react";
import { ark } from "@ark-ui/react/factory";
import SearchBar from "./SearchBar";

const meta = {
  title: "Components/Form/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "The controlled value of the search input",
    },
    defaultValue: {
      control: "text",
      description: "The initial value for uncontrolled usage",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input",
    },
    disabled: {
      control: "boolean",
      description: "Blocks typing and hides the clear button",
    },
    loading: {
      control: "boolean",
      description: "Swaps the leading icon for a spinner",
    },
    clearable: {
      control: "boolean",
      description: "Whether the clear button can appear when there's a value",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Controls padding, height and font size",
    },
    inverted: {
      control: "boolean",
      description: "Renders the search bar in inverted colors",
    },
    label: {
      control: "text",
      description: "Label content rendered above the search bar",
    },
    validationMessage: {
      control: "text",
      description: "Message rendered below the search bar",
    },
    validationStatus: {
      control: "select",
      options: ["error", "warning", "success", "info"],
      description: "The semantic status of validationMessage",
    },
    invalid: {
      control: "boolean",
      description: "Marks the search bar as invalid",
    },
    id: {
      control: "text",
      description: "The id of the underlying input",
    },
    name: {
      control: "text",
      description: "The name attribute of the underlying input",
    },
    autoFocus: {
      control: "boolean",
      description: "Whether the input receives focus on mount",
    },
    onValueChange: {
      description: "Called with the new value whenever the input changes",
    },
    onSearch: {
      description: "Called with the current value on Enter or icon click",
    },
  },
  args: {
    onValueChange: fn(),
    onSearch: fn(),
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------
 * Size variants (3)
 * ---------------------------------------------------------------------- */

/**
 * Small size search bar
 */
export const SmallSize: Story = {
  args: {
    size: "small",
    placeholder: "Search...",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/**
 * Medium size search bar (default)
 */
export const MediumSize: Story = {
  args: {
    size: "medium",
    placeholder: "Search...",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/**
 * Large size search bar
 */
export const LargeSize: Story = {
  args: {
    size: "large",
    placeholder: "Search...",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * Loading crossed with size (3)
 * ---------------------------------------------------------------------- */

/**
 * Loading spinner at small size
 */
export const LoadingSmall: Story = {
  args: {
    size: "small",
    loading: true,
    defaultValue: "storybook",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/**
 * Loading spinner at medium size
 */
export const LoadingMedium: Story = {
  args: {
    size: "medium",
    loading: true,
    defaultValue: "storybook",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/**
 * Loading spinner at large size
 */
export const LoadingLarge: Story = {
  args: {
    size: "large",
    loading: true,
    defaultValue: "storybook",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * Disabled combinations (3)
 * ---------------------------------------------------------------------- */

/**
 * Disabled search bar, empty
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Search...",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/**
 * Disabled and loading at the same time - the spinner still renders
 */
export const DisabledLoading: Story = {
  args: {
    disabled: true,
    loading: true,
    defaultValue: "results",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/**
 * Disabled with a value present - the clear button stays hidden
 */
export const DisabledWithValueHidesClear: Story = {
  args: {
    disabled: true,
    defaultValue: "cannot clear me",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * clearable true/false with a value present (2)
 * ---------------------------------------------------------------------- */

/**
 * Clearable (default) with a value - shows the clear button
 */
export const ClearableWithValue: Story = {
  args: {
    clearable: true,
    defaultValue: "clearable text",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/**
 * Not clearable with a value - the clear button never renders
 */
export const NotClearableWithValue: Story = {
  args: {
    clearable: false,
    defaultValue: "cannot be cleared",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * Validation status paired with label (4)
 * ---------------------------------------------------------------------- */

/**
 * Error validation with label
 */
export const ErrorValidation: Story = {
  args: {
    label: "Search products",
    id: "search-error",
    validationStatus: "error",
    validationMessage: "No products match that search",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/**
 * Warning validation with label
 */
export const WarningValidation: Story = {
  args: {
    label: "Search products",
    id: "search-warning",
    validationStatus: "warning",
    validationMessage: "This search term is very broad",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/**
 * Success validation with label
 */
export const SuccessValidation: Story = {
  args: {
    label: "Search products",
    id: "search-success",
    validationStatus: "success",
    validationMessage: "12 results found",
    defaultValue: "sneakers",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/**
 * Info validation with label
 */
export const InfoValidation: Story = {
  args: {
    label: "Search products",
    id: "search-info",
    validationStatus: "info",
    validationMessage: "Try including a brand name for better results",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * invalid alone (1)
 * ---------------------------------------------------------------------- */

/**
 * Invalid styling applied without an accompanying validation message
 */
export const InvalidWithoutMessage: Story = {
  args: {
    label: "Search products",
    id: "search-invalid-only",
    invalid: true,
    defaultValue: "???",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * Controlled vs uncontrolled (2)
 * ---------------------------------------------------------------------- */

/**
 * Controlled usage - value and onValueChange are owned by the parent
 */
export const ControlledExample: Story = {
  render: () => {
    const ControlledDemo = () => {
      const [value, setValue] = useState("controlled");
      return (
        <ark.div style={{ minWidth: "320px", padding: "16px" }}>
          <SearchBar
            label="Controlled search"
            value={value}
            onValueChange={setValue}
            placeholder="Type to update state..."
          />
          <ark.p style={{ marginTop: "8px", fontSize: "12px", color: "#6b7280" }}>
            Current value: {value || "(empty)"}
          </ark.p>
        </ark.div>
      );
    };
    return <ControlledDemo />;
  },
};

/**
 * Uncontrolled usage seeded with a default value
 */
export const UncontrolledWithDefaultValue: Story = {
  args: {
    label: "Uncontrolled search",
    defaultValue: "seeded value",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * onSearch via Enter key (1, play function)
 * ---------------------------------------------------------------------- */

/**
 * Pressing Enter while focused calls onSearch with the current value
 */
export const SearchOnEnterKey: Story = {
  args: {
    label: "Search catalog",
    id: "search-on-enter",
    placeholder: "Search catalog...",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
  play: async ({ canvasElement, args }) => {
    const c = within(canvasElement);
    const input = c.getByLabelText(/search catalog/i) as HTMLInputElement;
    await userEvent.type(input, "hiking boots");
    await userEvent.keyboard("{Enter}");
    expect(args.onSearch).toHaveBeenCalledWith("hiking boots");
  },
};

/* -------------------------------------------------------------------------
 * onSearch via icon click (1, play function)
 * ---------------------------------------------------------------------- */

/**
 * Clicking the leading search icon calls onSearch with the current value
 */
export const SearchOnIconClick: Story = {
  args: {
    label: "Search catalog",
    id: "search-on-icon-click",
    defaultValue: "denim jacket",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
  play: async ({ canvasElement, args }) => {
    const c = within(canvasElement);
    const icon = c.getByRole("button", { name: "Search", exact: true });
    await userEvent.click(icon);
    expect(args.onSearch).toHaveBeenCalledWith("denim jacket");
  },
};

/* -------------------------------------------------------------------------
 * Empty vs pre-filled default value (2)
 * ---------------------------------------------------------------------- */

/**
 * Empty default value - no clear button, no value
 */
export const EmptyDefaultValue: Story = {
  args: {
    defaultValue: "",
    placeholder: "Search...",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/**
 * Pre-filled default value
 */
export const PrefilledDefaultValue: Story = {
  args: {
    defaultValue: "vintage typewriter",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * Long query overflowing a fixed narrow width (1)
 * ---------------------------------------------------------------------- */

/**
 * A long query string inside a fixed, narrow width container
 */
export const LongQueryNarrowWidth: Story = {
  args: {
    defaultValue:
      "a very long search query that should not break the layout of the search bar component",
  },
  render: (args) => (
    <ark.div style={{ width: "220px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * Placeholder only (1)
 * ---------------------------------------------------------------------- */

/**
 * Placeholder text only, no value
 */
export const PlaceholderOnly: Story = {
  args: {
    placeholder: "Search anything...",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * Inverted crossed with size (3)
 * ---------------------------------------------------------------------- */

const invertedWrapperStyles = {
  minWidth: "320px",
  padding: "32px",
  backgroundColor: "#111827",
  borderRadius: "8px",
};

/**
 * Inverted colors at small size
 */
export const InvertedSmall: Story = {
  args: {
    size: "small",
    inverted: true,
    placeholder: "Search...",
  },
  render: (args) => (
    <ark.div style={invertedWrapperStyles}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/**
 * Inverted colors at medium size
 */
export const InvertedMedium: Story = {
  args: {
    size: "medium",
    inverted: true,
    placeholder: "Search...",
  },
  render: (args) => (
    <ark.div style={invertedWrapperStyles}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/**
 * Inverted colors at large size
 */
export const InvertedLarge: Story = {
  args: {
    size: "large",
    inverted: true,
    placeholder: "Search...",
  },
  render: (args) => (
    <ark.div style={invertedWrapperStyles}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * Inverted + loading (1)
 * ---------------------------------------------------------------------- */

/**
 * Inverted colors while loading - the spinner is recolored for the dark surface
 */
export const InvertedLoading: Story = {
  args: {
    inverted: true,
    loading: true,
    defaultValue: "dark mode search",
  },
  render: (args) => (
    <ark.div style={invertedWrapperStyles}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * Autofocus demo (1)
 * ---------------------------------------------------------------------- */

/**
 * Autofocus - the input receives focus as soon as it mounts
 */
export const AutofocusDemo: Story = {
  args: {
    autoFocus: true,
    placeholder: "I'm focused on mount",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * No label vs with label (2)
 * ---------------------------------------------------------------------- */

/**
 * No label rendered
 */
export const WithoutLabel: Story = {
  args: {
    placeholder: "Search...",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/**
 * With a label rendered above the search bar
 */
export const WithLabel: Story = {
  args: {
    label: "Search the site",
    id: "search-with-label",
    placeholder: "Search...",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * Composition: toolbar/header-like layout (1)
 * ---------------------------------------------------------------------- */

/**
 * A search bar composed inside a header/toolbar layout, next to other elements
 */
export const ToolbarComposition: Story = {
  render: () => (
    <ark.div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        minWidth: "560px",
        padding: "12px 16px",
        backgroundColor: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
      }}
    >
      <ark.span style={{ fontSize: "16px", fontWeight: 600, color: "#1f2937" }}>
        Acme Inc.
      </ark.span>
      <ark.div style={{ flex: 1 }}>
        <SearchBar size="small" placeholder="Search Acme..." />
      </ark.div>
      <ark.button
        type="button"
        style={{
          padding: "6px 12px",
          backgroundColor: "#3b82f6",
          color: "#ffffff",
          border: "none",
          borderRadius: "6px",
          fontSize: "13px",
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        Settings
      </ark.button>
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * Composition: live list-filter demo (1)
 * ---------------------------------------------------------------------- */

const fruitList = ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape"];

/**
 * A live filter demo - typing narrows a small hardcoded list below
 */
export const ListFilterComposition: Story = {
  render: () => {
    const ListFilterDemo = () => {
      const [query, setQuery] = useState("");
      const filtered = fruitList.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      return (
        <ark.div style={{ minWidth: "320px", padding: "16px" }}>
          <SearchBar
            label="Filter fruits"
            placeholder="Filter fruits..."
            value={query}
            onValueChange={setQuery}
          />
          <ark.ul style={{ marginTop: "12px", paddingLeft: "20px" }}>
            {filtered.length === 0 ? (
              <ark.li style={{ color: "#6b7280", listStyle: "none", marginLeft: "-20px" }}>
                No matches
              </ark.li>
            ) : (
              filtered.map((item) => <ark.li key={item}>{item}</ark.li>)
            )}
          </ark.ul>
        </ark.div>
      );
    };
    return <ListFilterDemo />;
  },
};

/* -------------------------------------------------------------------------
 * RTL/unicode/emoji query content (2)
 * ---------------------------------------------------------------------- */

/**
 * Right-to-left script query content
 */
export const RTLQuery: Story = {
  args: {
    defaultValue: "مرحبا بالعالم",
    label: "بحث",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/**
 * Unicode and emoji query content
 */
export const UnicodeEmojiQuery: Story = {
  args: {
    defaultValue: "café 🍰 日本語 🎉",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * Special characters triggering onSearch (1, play function)
 * ---------------------------------------------------------------------- */

/**
 * Symbols and punctuation are preserved and passed through to onSearch
 */
export const SpecialCharactersSearch: Story = {
  args: {
    label: "Search",
    id: "search-special-chars",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
  play: async ({ canvasElement, args }) => {
    const c = within(canvasElement);
    const input = c.getByRole("searchbox") as HTMLInputElement;
    const query = "C++ & Rust: 100% #1!?";
    await userEvent.type(input, query);
    await userEvent.keyboard("{Enter}");
    expect(args.onSearch).toHaveBeenCalledWith(query);
  },
};

/* -------------------------------------------------------------------------
 * Rapid type-then-clear demo (1, play function)
 * ---------------------------------------------------------------------- */

/**
 * Typing quickly and then clearing immediately resets to an empty value
 */
export const RapidTypeThenClear: Story = {
  args: {
    label: "Quick search",
    id: "search-rapid-clear",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
  play: async ({ canvasElement, args }) => {
    const c = within(canvasElement);
    const input = c.getByLabelText(/quick search/i) as HTMLInputElement;
    await userEvent.type(input, "temporary query");
    expect(input.value).toBe("temporary query");

    const clearButton = c.getByRole("button", { name: /clear search/i });
    await userEvent.click(clearButton);
    expect(input.value).toBe("");
    expect(args.onValueChange).toHaveBeenLastCalledWith("");
  },
};

/* -------------------------------------------------------------------------
 * Clear button keyboard-focus demo (1, play function)
 * ---------------------------------------------------------------------- */

/**
 * The clear button is reachable via Tab and activatable via Enter
 */
export const ClearButtonKeyboardAccess: Story = {
  args: {
    label: "Search",
    id: "search-clear-keyboard",
    defaultValue: "keyboard test",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const input = c.getByRole("searchbox") as HTMLInputElement;
    input.focus();
    await userEvent.tab();
    const clearButton = c.getByRole("button", { name: /clear search/i });
    expect(clearButton).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expect(input.value).toBe("");
  },
};

/* -------------------------------------------------------------------------
 * Size crossed with status (2)
 * ---------------------------------------------------------------------- */

/**
 * Small size paired with an error status
 */
export const SmallWithErrorStatus: Story = {
  args: {
    size: "small",
    label: "Search",
    id: "search-small-error",
    validationStatus: "error",
    validationMessage: "Invalid search term",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/**
 * Large size paired with a success status
 */
export const LargeWithSuccessStatus: Story = {
  args: {
    size: "large",
    label: "Search",
    id: "search-large-success",
    validationStatus: "success",
    validationMessage: "Great, we found matches",
    defaultValue: "matches",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * name attribute demo (1)
 * ---------------------------------------------------------------------- */

/**
 * The name attribute is applied to the underlying input for form association
 */
export const NameAttribute: Story = {
  args: {
    name: "site-search",
    placeholder: "Search...",
  },
  render: (args) => (
    <ark.form style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.form>
  ),
};

/* -------------------------------------------------------------------------
 * Narrow-container edge case (1)
 * ---------------------------------------------------------------------- */

/**
 * Fits inside a very small width without breaking the layout
 */
export const NarrowContainer: Story = {
  args: {
    placeholder: "Search",
  },
  render: (args) => (
    <ark.div style={{ width: "140px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * Loading suppresses clear button even with a value present (1)
 * ---------------------------------------------------------------------- */

/**
 * Loading hides the clear button even though a value is present
 */
export const LoadingHidesClearWithValue: Story = {
  args: {
    loading: true,
    defaultValue: "in progress",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * Kitchen-sink (1)
 * ---------------------------------------------------------------------- */

/**
 * Kitchen sink - label, validation, loading and a custom size all together
 */
export const KitchenSink: Story = {
  args: {
    label: "Search inventory",
    labelProps: { required: true },
    id: "search-kitchen-sink",
    size: "large",
    loading: true,
    defaultValue: "sku-12345",
    validationStatus: "info",
    validationMessage: "Searching across all warehouses",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "360px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * Size crossed with disabled (2)
 * ---------------------------------------------------------------------- */

/**
 * Small size, disabled
 */
export const SmallDisabled: Story = {
  args: {
    size: "small",
    disabled: true,
    placeholder: "Search...",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/**
 * Large size, disabled
 */
export const LargeDisabled: Story = {
  args: {
    size: "large",
    disabled: true,
    placeholder: "Search...",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * Focus/blur border demo (1)
 * ---------------------------------------------------------------------- */

/**
 * The border color changes on focus and reverts on blur
 */
export const FocusBlurDemo: Story = {
  args: {
    placeholder: "Click to focus me",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const input = c.getByPlaceholderText(/click to focus me/i) as HTMLInputElement;
    await userEvent.click(input);
    expect(input.style.boxShadow).not.toBe("none");
    await userEvent.tab();
    expect(input.style.boxShadow).toBe("none");
  },
};

/* -------------------------------------------------------------------------
 * Clear resets and refocuses demo (1, play function)
 * ---------------------------------------------------------------------- */

/**
 * Clicking clear resets the value and returns focus to the input
 */
export const ClearResetsAndRefocuses: Story = {
  args: {
    label: "Search",
    id: "search-clear-refocus",
    defaultValue: "reset me",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const input = c.getByRole("searchbox") as HTMLInputElement;
    const clearButton = c.getByRole("button", { name: /clear search/i });
    await userEvent.click(clearButton);
    expect(input.value).toBe("");
    expect(input).toHaveFocus();
  },
};

/* -------------------------------------------------------------------------
 * Very long placeholder text (1)
 * ---------------------------------------------------------------------- */

/**
 * A very long placeholder still renders without breaking the layout
 */
export const VeryLongPlaceholder: Story = {
  args: {
    placeholder:
      "Search for anything across products, orders, customers, invoices and more...",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * Loading spinner accessible label (1)
 * ---------------------------------------------------------------------- */

/**
 * The loading spinner exposes its own accessible label, distinguishing it
 * from the plain search icon
 */
export const SpinnerAccessibleLabel: Story = {
  args: {
    loading: true,
    defaultValue: "accessibility check",
  },
  render: (args) => (
    <ark.div style={{ minWidth: "320px", padding: "16px" }}>
      <SearchBar {...args} />
    </ark.div>
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    expect(c.getByRole("img", { name: /loading/i })).toBeTruthy();
  },
};
