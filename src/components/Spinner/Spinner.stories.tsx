import type { Meta, StoryObj } from "@storybook/react-vite";
import Spinner from "./Spinner";
import { color } from "../../tokens/tokens";

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large", 24, 40, 64],
      description: "Size of the spinner",
    },
    color: {
      control: "color",
      description: "Color of the spinner accent",
    },
    thickness: {
      control: "number",
      description: "Border thickness in pixels",
    },
    label: {
      control: "text",
      description: "Accessible aria-label",
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "medium",
  },
};

export const Small: Story = {
  args: {
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    size: "large",
  },
};

export const NumericSize24: Story = {
  args: {
    size: 24,
  },
};

export const NumericSize40: Story = {
  args: {
    size: 40,
  },
};

export const NumericSize64: Story = {
  args: {
    size: 64,
  },
};

export const NumericSize8: Story = {
  args: {
    size: 8,
  },
};

export const NumericSize96: Story = {
  args: {
    size: 96,
  },
};

export const BlueColor: Story = {
  args: {
    color: color.blue500,
  },
};

export const GreenColor: Story = {
  args: {
    color: color.green500,
  },
};

export const OrangeColor: Story = {
  args: {
    color: color.orange500,
  },
};

export const PinkColor: Story = {
  args: {
    color: color.pink500,
  },
};

export const PurpleColor: Story = {
  args: {
    color: color.purple500,
  },
};

export const CyanColor: Story = {
  args: {
    color: color.cyan500,
  },
};

export const YellowColor: Story = {
  args: {
    color: color.yellow500,
  },
};

export const SlateColor: Story = {
  args: {
    color: color.slate600,
  },
};

export const ThinBorder: Story = {
  args: {
    thickness: 1,
    size: "large",
  },
};

export const ThickBorder: Story = {
  args: {
    thickness: 6,
    size: "large",
  },
};

export const ExtraThickBorder: Story = {
  args: {
    thickness: 10,
    size: 64,
  },
};

export const CustomLabel: Story = {
  args: {
    label: "Please wait",
  },
};

export const FetchingLabel: Story = {
  args: {
    label: "Fetching data",
  },
};

export const SavingLabel: Story = {
  args: {
    label: "Saving changes",
  },
};

export const EmptyLabel: Story = {
  args: {
    label: "",
  },
};

export const SmallGreen: Story = {
  args: {
    size: "small",
    color: color.green500,
  },
};

export const LargePinkThick: Story = {
  args: {
    size: "large",
    color: color.pink500,
    thickness: 5,
  },
};

export const MediumOrangeThin: Story = {
  args: {
    size: "medium",
    color: color.orange500,
    thickness: 2,
  },
};

export const NumericCyan: Story = {
  args: {
    size: 56,
    color: color.cyan500,
    thickness: 4,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <Spinner size="small" />
      <Spinner size="medium" />
      <Spinner size="large" />
      <Spinner size={64} />
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
      <Spinner color={color.blue500} />
      <Spinner color={color.green500} />
      <Spinner color={color.orange500} />
      <Spinner color={color.pink500} />
      <Spinner color={color.purple500} />
      <Spinner color={color.cyan500} />
      <Spinner color={color.yellow500} />
    </div>
  ),
};

export const ThicknessScale: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
      <Spinner size="large" thickness={1} />
      <Spinner size="large" thickness={2} />
      <Spinner size="large" thickness={3} />
      <Spinner size="large" thickness={5} />
      <Spinner size="large" thickness={8} />
    </div>
  ),
};

export const OnDarkBackground: Story = {
  render: () => (
    <div
      style={{
        backgroundColor: color.slate900,
        padding: "32px",
        borderRadius: "8px",
        display: "flex",
        gap: "16px",
      }}
    >
      <Spinner color={color.white} />
      <Spinner color={color.cyan300} />
      <Spinner color={color.blue300} />
    </div>
  ),
};

export const OnBlueBackground: Story = {
  render: () => (
    <div
      style={{
        backgroundColor: color.blue500,
        padding: "32px",
        borderRadius: "8px",
      }}
    >
      <Spinner color={color.white} thickness={4} size="large" />
    </div>
  ),
};

export const InlineWithText: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <Spinner size="small" />
      <span>Loading content…</span>
    </div>
  ),
};

export const CenteredInCard: Story = {
  render: () => (
    <div
      style={{
        width: 200,
        height: 120,
        border: `1px solid ${color.slate300}`,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner />
    </div>
  ),
};

export const StackedSpinners: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
      <Spinner size="small" color={color.blue500} />
      <Spinner size="medium" color={color.green500} />
      <Spinner size="large" color={color.orange500} />
    </div>
  ),
};

export const KitchenSinkLargePurpleThick: Story = {
  args: {
    size: "large",
    color: color.purple500,
    thickness: 6,
    label: "Almost done",
  },
};

export const KitchenSinkTinyBlue: Story = {
  args: {
    size: 12,
    color: color.blue500,
    thickness: 2,
    label: "Tiny loader",
  },
};

export const KitchenSinkHugeCyan: Story = {
  args: {
    size: 80,
    color: color.cyan500,
    thickness: 8,
    label: "Huge loader",
  },
};

export const DefaultLabelAssert: Story = {
  args: {
    size: "medium",
  },
};

export const ThicknessDefault: Story = {
  args: {
    size: "medium",
  },
};

export const ColorDefault: Story = {
  args: {
    size: "medium",
  },
};

export const SizeDefault: Story = {
  args: {},
};

export const MixedNumericAndNamed: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "flex-end" }}>
      <Spinner size="small" color={color.pink500} />
      <Spinner size={28} color={color.green500} thickness={2} />
      <Spinner size="large" color={color.orange500} thickness={4} />
    </div>
  ),
};

export const GridOfSpinners: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      {[color.blue500, color.green500, color.orange500, color.pink500].map((c) => (
        <Spinner key={c} color={c} size="medium" />
      ))}
      {[color.purple500, color.cyan500, color.yellow500, color.slate600].map((c) => (
        <Spinner key={c} color={c} size="small" />
      ))}
    </div>
  ),
};

export const VeryThinSmall: Story = {
  args: {
    size: "small",
    thickness: 1,
    color: color.blue500,
  },
};

export const VeryThickSmall: Story = {
  args: {
    size: 32,
    thickness: 8,
    color: color.green500,
  },
};

export const CustomHexColor: Story = {
  args: {
    color: "#FF00AA",
    size: "large",
  },
};

export const CustomRgbColor: Story = {
  args: {
    color: "rgb(20, 180, 90)",
    size: "large",
  },
};

export const LongAriaLabel: Story = {
  args: {
    label: "Loading your personalized dashboard, please wait a moment",
    size: "medium",
  },
};

export const RtlLabel: Story = {
  args: {
    label: "جاري التحميل",
    size: "medium",
  },
};

export const EmojiLabel: Story = {
  args: {
    label: "⏳ Loading",
    size: "medium",
  },
};
