import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, within, userEvent, expect } from "storybook/test";
import { useState } from "react";
import Chip from "./Chip";

const meta = {
  title: "Components/Form/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "Content displayed inside the chip",
    },
    status: {
      control: "select",
      options: ["default", "info", "success", "warning", "error"],
      description: "Semantic status/color variant of the chip",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Size of the chip",
    },
    disabled: {
      control: "boolean",
      description: "Whether the chip is disabled",
    },
    selected: {
      control: "boolean",
      description: "Filter-chip toggle state, exposed as aria-pressed",
    },
    removable: {
      control: "boolean",
      description: "Whether the chip renders a dismiss trigger",
    },
    onRemove: {
      description: "Callback invoked when the dismiss trigger is activated",
    },
    onClick: {
      description: "Callback invoked when the chip body is clicked",
    },
    icon: {
      description: "Leading icon/avatar slot",
    },
    inverted: {
      control: "boolean",
      description: "Renders the chip using its inverted color treatment",
    },
  },
  args: {
    onClick: fn(),
    onRemove: fn(),
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------
 * Decorative helpers used only inside stories
 * ---------------------------------------------------------------------- */

const TagIcon = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.5 1.5H2.5C1.94772 1.5 1.5 1.94772 1.5 2.5V7.5C1.5 7.76522 1.60536 8.01957 1.79289 8.20711L8.29289 14.7071C8.68342 15.0976 9.31658 15.0976 9.70711 14.7071L14.7071 9.70711C15.0976 9.31658 15.0976 8.68342 14.7071 8.29289L8.20711 1.79289C8.01957 1.60536 7.76522 1.5 7.5 1.5Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <circle cx="5" cy="5" r="1" fill="currentColor" />
  </svg>
);

const AvatarIcon = ({ initials = "JD" }: { initials?: string }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      backgroundColor: "#6f2cac",
      color: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "8px",
      fontWeight: 700,
      lineHeight: 1,
    }}
  >
    {initials}
  </div>
);

/* -------------------------------------------------------------------------
 * Status variants (5)
 * ---------------------------------------------------------------------- */

export const Default: Story = {
  args: {
    children: "Default",
    status: "default",
  },
};

export const InfoStatus: Story = {
  args: {
    children: "Info",
    status: "info",
  },
};

export const SuccessStatus: Story = {
  args: {
    children: "Success",
    status: "success",
  },
};

export const WarningStatus: Story = {
  args: {
    children: "Warning",
    status: "warning",
  },
};

export const ErrorStatus: Story = {
  args: {
    children: "Error",
    status: "error",
  },
};

/* -------------------------------------------------------------------------
 * Size variants (3)
 * ---------------------------------------------------------------------- */

export const SmallSize: Story = {
  args: {
    children: "Small chip",
    size: "small",
  },
};

export const MediumSize: Story = {
  args: {
    children: "Medium chip",
    size: "medium",
  },
};

export const LargeSize: Story = {
  args: {
    children: "Large chip",
    size: "large",
  },
};

/* -------------------------------------------------------------------------
 * Removable crossed with each status (5)
 * ---------------------------------------------------------------------- */

export const RemovableDefault: Story = {
  args: {
    children: "Removable default",
    status: "default",
    removable: true,
  },
};

export const RemovableInfo: Story = {
  args: {
    children: "Removable info",
    status: "info",
    removable: true,
  },
};

export const RemovableSuccess: Story = {
  args: {
    children: "Removable success",
    status: "success",
    removable: true,
  },
};

export const RemovableWarning: Story = {
  args: {
    children: "Removable warning",
    status: "warning",
    removable: true,
  },
};

export const RemovableError: Story = {
  args: {
    children: "Removable error",
    status: "error",
    removable: true,
  },
};

/* -------------------------------------------------------------------------
 * Selected on/off (2)
 * ---------------------------------------------------------------------- */

export const SelectedOn: Story = {
  args: {
    children: "Selected",
    selected: true,
    onClick: fn(),
  },
};

export const SelectedOff: Story = {
  args: {
    children: "Not selected",
    selected: false,
    onClick: fn(),
  },
};

/* -------------------------------------------------------------------------
 * Disabled (3)
 * ---------------------------------------------------------------------- */

export const Disabled: Story = {
  args: {
    children: "Disabled chip",
    disabled: true,
  },
};

export const DisabledRemovable: Story = {
  args: {
    children: "Disabled removable",
    disabled: true,
    removable: true,
  },
};

export const DisabledSelected: Story = {
  args: {
    children: "Disabled selected",
    disabled: true,
    selected: true,
    onClick: fn(),
  },
};

/* -------------------------------------------------------------------------
 * Leading icon crossed with size (3)
 * ---------------------------------------------------------------------- */

export const IconSmall: Story = {
  args: {
    children: "Small with icon",
    size: "small",
    icon: <TagIcon />,
  },
};

export const IconMedium: Story = {
  args: {
    children: "Medium with icon",
    size: "medium",
    icon: <TagIcon />,
  },
};

export const IconLarge: Story = {
  args: {
    children: "Large with icon",
    size: "large",
    icon: <TagIcon />,
  },
};

/* -------------------------------------------------------------------------
 * Avatar-style leading icon (1)
 * ---------------------------------------------------------------------- */

export const AvatarLeadingIcon: Story = {
  args: {
    children: "Jane Doe",
    icon: <AvatarIcon initials="JD" />,
  },
};

/* -------------------------------------------------------------------------
 * Inverted crossed with each status (5)
 * ---------------------------------------------------------------------- */

export const InvertedDefault: Story = {
  args: {
    children: "Inverted default",
    status: "default",
    inverted: true,
  },
};

export const InvertedInfo: Story = {
  args: {
    children: "Inverted info",
    status: "info",
    inverted: true,
  },
};

export const InvertedSuccess: Story = {
  args: {
    children: "Inverted success",
    status: "success",
    inverted: true,
  },
};

export const InvertedWarning: Story = {
  args: {
    children: "Inverted warning",
    status: "warning",
    inverted: true,
  },
};

export const InvertedError: Story = {
  args: {
    children: "Inverted error",
    status: "error",
    inverted: true,
  },
};

/* -------------------------------------------------------------------------
 * onClick filter-chip toggle demo (1)
 * ---------------------------------------------------------------------- */

export const FilterChipToggle: Story = {
  args: {
    children: "React",
  },
  render: (args) => {
    const ToggleChip = () => {
      const [selected, setSelected] = useState(false);

      return (
        <Chip
          {...args}
          status="info"
          selected={selected}
          onClick={() => {
            setSelected((current) => !current);
            args.onClick?.();
          }}
        >
          {args.children}
        </Chip>
      );
    };

    return <ToggleChip />;
  },
};

/* -------------------------------------------------------------------------
 * onRemove list-removal demo (1)
 * ---------------------------------------------------------------------- */

export const RemovableListDemo: Story = {
  render: () => {
    const RemovableList = () => {
      const [items, setItems] = useState([
        "JavaScript",
        "TypeScript",
        "React",
        "Vitest",
      ]);

      return (
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {items.length === 0 && (
            <span style={{ fontSize: "14px", color: "#94a3b8" }}>
              No items left
            </span>
          )}
          {items.map((item) => (
            <Chip
              key={item}
              removable
              onRemove={() =>
                setItems((current) => current.filter((i) => i !== item))
              }
            >
              {item}
            </Chip>
          ))}
        </div>
      );
    };

    return <RemovableList />;
  },
};

/* -------------------------------------------------------------------------
 * Chip-group/list composition (1)
 * ---------------------------------------------------------------------- */

export const ChipGroup: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", maxWidth: "360px" }}>
      <Chip status="info">Design</Chip>
      <Chip status="success">Approved</Chip>
      <Chip status="warning">In review</Chip>
      <Chip status="error">Blocked</Chip>
      <Chip status="default">Draft</Chip>
      <Chip status="default">Archived</Chip>
    </div>
  ),
};

/* -------------------------------------------------------------------------
 * Chip-group all-removable live-remove demo (1)
 * ---------------------------------------------------------------------- */

export const ChipGroupAllRemovable: Story = {
  render: () => {
    const AllRemovableGroup = () => {
      const [tags, setTags] = useState([
        "Frontend",
        "Backend",
        "Design",
        "QA",
        "DevOps",
        "Documentation",
      ]);

      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", maxWidth: "400px" }}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                removable
                status="info"
                onRemove={() =>
                  setTags((current) => current.filter((t) => t !== tag))
                }
              >
                {tag}
              </Chip>
            ))}
          </div>
          {tags.length === 0 && (
            <span style={{ fontSize: "14px", color: "#94a3b8" }}>
              All tags removed
            </span>
          )}
        </div>
      );
    };

    return <AllRemovableGroup />;
  },
};

/* -------------------------------------------------------------------------
 * Long text truncation with fixed max-width (1)
 * ---------------------------------------------------------------------- */

export const TruncatedText: Story = {
  args: {
    children:
      "This is an intentionally long chip label used to demonstrate text truncation behavior",
  },
  decorators: [
    (StoryFn) => (
      <div style={{ width: "180px" }}>
        <StoryFn />
      </div>
    ),
  ],
};

/* -------------------------------------------------------------------------
 * Long text without a max-width constraint (1)
 * ---------------------------------------------------------------------- */

export const LongTextNoConstraint: Story = {
  args: {
    children:
      "This is an intentionally long chip label that grows naturally since no max-width is applied",
  },
};

/* -------------------------------------------------------------------------
 * Icon + removable combined (1)
 * ---------------------------------------------------------------------- */

export const IconAndRemovable: Story = {
  args: {
    children: "Tagged item",
    icon: <TagIcon />,
    removable: true,
    status: "info",
  },
};

/* -------------------------------------------------------------------------
 * Selected crossed with status (2)
 * ---------------------------------------------------------------------- */

export const SelectedInfoStatus: Story = {
  args: {
    children: "Selected info",
    status: "info",
    selected: true,
    onClick: fn(),
  },
};

export const SelectedWarningStatus: Story = {
  args: {
    children: "Selected warning",
    status: "warning",
    selected: true,
    onClick: fn(),
  },
};

/* -------------------------------------------------------------------------
 * Size crossed with removable (2)
 * ---------------------------------------------------------------------- */

export const SmallRemovable: Story = {
  args: {
    children: "Small removable",
    size: "small",
    removable: true,
  },
};

export const LargeRemovable: Story = {
  args: {
    children: "Large removable",
    size: "large",
    removable: true,
  },
};

/* -------------------------------------------------------------------------
 * Size crossed with selected (2)
 * ---------------------------------------------------------------------- */

export const SmallSelected: Story = {
  args: {
    children: "Small selected",
    size: "small",
    selected: true,
    onClick: fn(),
  },
};

export const LargeSelected: Story = {
  args: {
    children: "Large selected",
    size: "large",
    selected: true,
    onClick: fn(),
  },
};

/* -------------------------------------------------------------------------
 * RTL/unicode/emoji label content (2)
 * ---------------------------------------------------------------------- */

export const RTLContent: Story = {
  args: {
    children: "مرحبا بالعالم",
    removable: true,
  },
  decorators: [
    (StoryFn) => (
      <div dir="rtl">
        <StoryFn />
      </div>
    ),
  ],
};

export const EmojiContent: Story = {
  args: {
    children: "🔥 Trending",
    status: "success",
  },
};

/* -------------------------------------------------------------------------
 * Empty children with only an icon (1)
 * ---------------------------------------------------------------------- */

export const IconOnly: Story = {
  args: {
    children: "",
    icon: <TagIcon />,
  },
};

/* -------------------------------------------------------------------------
 * Keyboard focus demo (1)
 * ---------------------------------------------------------------------- */

export const KeyboardAccess: Story = {
  args: {
    children: "Keyboard chip",
    removable: true,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const removeButton = canvas.getByRole("button", {
      name: /remove keyboard chip/i,
    });

    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    await userEvent.tab();
    expect(document.activeElement).toBe(removeButton);

    await userEvent.keyboard("{Enter}");
    expect(args.onRemove).toHaveBeenCalledTimes(1);
  },
};

/* -------------------------------------------------------------------------
 * Accessibility-focused stories (2)
 * ---------------------------------------------------------------------- */

export const AriaPressedDemo: Story = {
  render: (args) => {
    const PressedDemo = () => {
      const [selected, setSelected] = useState(false);

      return (
        <Chip
          {...args}
          selected={selected}
          onClick={() => setSelected((current) => !current)}
        >
          {selected ? "Pressed" : "Not pressed"}
        </Chip>
      );
    };

    return <PressedDemo />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByRole("button");
    expect(chip).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(chip);
    expect(chip).toHaveAttribute("aria-pressed", "true");
  },
};

export const AriaLabelDemo: Story = {
  args: {
    children: "Invoice #4821",
    removable: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const removeButton = canvas.getByRole("button", {
      name: "Remove Invoice #4821",
    });
    expect(removeButton).toBeTruthy();
  },
};

/* -------------------------------------------------------------------------
 * Multiple statuses in a filter-bar-like row (1)
 * ---------------------------------------------------------------------- */

export const StatusFilterBar: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Chip status="default" selected>
        All
      </Chip>
      <Chip status="info">Info</Chip>
      <Chip status="success">Success</Chip>
      <Chip status="warning">Warning</Chip>
      <Chip status="error">Error</Chip>
    </div>
  ),
};

/* -------------------------------------------------------------------------
 * Read-only tag with neither onClick nor onRemove (1)
 * ---------------------------------------------------------------------- */

export const ReadOnlyTag: Story = {
  args: {
    children: "Read-only",
    onClick: undefined,
    onRemove: undefined,
  },
};

/* -------------------------------------------------------------------------
 * Kitchen-sink (1)
 * ---------------------------------------------------------------------- */

export const KitchenSink: Story = {
  args: {
    children: "Kitchen sink chip",
    icon: <TagIcon />,
    removable: true,
    selected: true,
    status: "warning",
    size: "large",
    onClick: fn(),
  },
};

/* -------------------------------------------------------------------------
 * Bonus: all statuses crossed with inverted, shown as a reference grid
 * ---------------------------------------------------------------------- */

export const AllStatusesGrid: Story = {
  render: () => {
    const statuses = ["default", "info", "success", "warning", "error"] as const;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "flex", gap: "8px" }}>
          {statuses.map((status) => (
            <Chip key={status} status={status}>
              {status}
            </Chip>
          ))}
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {statuses.map((status) => (
            <Chip key={status} status={status} inverted>
              {status}
            </Chip>
          ))}
        </div>
      </div>
    );
  },
};
