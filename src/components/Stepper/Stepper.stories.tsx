import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect, userEvent } from "storybook/test";
import Stepper from "./Stepper";
import type { StepperStep } from "./Stepper";
import { color } from "../../tokens/tokens";

const threeSteps: StepperStep[] = [
  { title: "Contact", description: "Your details" },
  { title: "Shipping", description: "Delivery address" },
  { title: "Payment", description: "Billing info" },
];

const fourSteps: StepperStep[] = [
  { title: "Account", description: "Create account" },
  { title: "Profile", description: "Tell us about you" },
  { title: "Preferences", description: "Customize" },
  { title: "Confirm", description: "Review and finish" },
];

const twoSteps: StepperStep[] = [
  { title: "Start", description: "Begin here" },
  { title: "Finish", description: "All done" },
];

const titlesOnly: StepperStep[] = [
  { title: "One" },
  { title: "Two" },
  { title: "Three" },
];

const meta = {
  title: "Components/Stepper",
  component: Stepper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    step: { control: "number" },
    defaultStep: { control: "number" },
  },
  args: {
    steps: threeSteps,
    defaultStep: 0,
    orientation: "horizontal",
    size: "medium",
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { steps: threeSteps },
};

export const Small: Story = {
  args: { steps: threeSteps, size: "small" },
};

export const Medium: Story = {
  args: { steps: threeSteps, size: "medium" },
};

export const Large: Story = {
  args: { steps: threeSteps, size: "large" },
};

export const Horizontal: Story = {
  args: { steps: threeSteps, orientation: "horizontal" },
};

export const Vertical: Story = {
  args: { steps: threeSteps, orientation: "vertical" },
};

export const TwoSteps: Story = {
  args: { steps: twoSteps },
};

export const FourSteps: Story = {
  args: { steps: fourSteps },
};

export const TitlesOnly: Story = {
  args: { steps: titlesOnly },
};

export const DefaultStepOne: Story = {
  args: { steps: threeSteps, defaultStep: 1 },
};

export const DefaultStepTwo: Story = {
  args: { steps: threeSteps, defaultStep: 2 },
};

export const ControlledStep: Story = {
  args: { steps: threeSteps, step: 1 },
};

export const VerticalSmall: Story = {
  args: { steps: threeSteps, orientation: "vertical", size: "small" },
};

export const VerticalLarge: Story = {
  args: { steps: fourSteps, orientation: "vertical", size: "large" },
};

export const VerticalFour: Story = {
  args: { steps: fourSteps, orientation: "vertical" },
};

export const HorizontalFour: Story = {
  args: { steps: fourSteps, orientation: "horizontal" },
};

export const AllSizes: Story = {
  args: { steps: threeSteps },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <Stepper steps={threeSteps} size="small" />
      <Stepper steps={threeSteps} size="medium" />
      <Stepper steps={threeSteps} size="large" />
    </div>
  ),
};

export const HorizontalAndVertical: Story = {
  args: { steps: threeSteps },
  render: () => (
    <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
      <Stepper steps={threeSteps} orientation="horizontal" />
      <Stepper steps={threeSteps} orientation="vertical" />
    </div>
  ),
};

export const LongTitles: Story = {
  args: {
    steps: [
      { title: "Provide contact information", description: "Email and phone" },
      { title: "Choose shipping preference", description: "Standard or express" },
      { title: "Confirm payment method", description: "Card or invoice" },
    ],
  },
};

export const LongDescriptions: Story = {
  args: {
    steps: [
      {
        title: "Contact",
        description:
          "Enter a valid email address and phone number so we can reach you about this order",
      },
      {
        title: "Shipping",
        description:
          "Provide the full delivery address including postal code and any special instructions",
      },
      {
        title: "Payment",
        description:
          "Choose a payment method and review the billing details before placing the order",
      },
    ],
  },
};

export const EmojiTitles: Story = {
  args: {
    steps: [
      { title: "📝 Details", description: "Fill in" },
      { title: "🚚 Ship", description: "Where to" },
      { title: "💳 Pay", description: "Checkout" },
    ],
  },
};

export const RTLContent: Story = {
  args: {
    steps: [
      { title: "التواصل", description: "بياناتك" },
      { title: "الشحن", description: "العنوان" },
      { title: "الدفع", description: "الفوترة" },
    ],
  },
};

export const NumericTitles: Story = {
  args: {
    steps: [
      { title: "01", description: "Start" },
      { title: "02", description: "Middle" },
      { title: "03", description: "End" },
    ],
  },
};

export const OnDarkBackground: Story = {
  args: { steps: threeSteps },
  render: (args) => (
    <div style={{ background: color.slate900, padding: 24, borderRadius: 8 }}>
      <Stepper {...args} />
    </div>
  ),
};

export const NarrowContainer: Story = {
  args: { steps: threeSteps },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Stepper {...args} />
    </div>
  ),
};

export const WideContainer: Story = {
  args: { steps: fourSteps },
  render: (args) => (
    <div style={{ width: 720 }}>
      <Stepper {...args} />
    </div>
  ),
};

export const TitlesVisible: Story = {
  args: { steps: threeSteps },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Contact")).toBeInTheDocument();
    await expect(canvas.getByText("Shipping")).toBeInTheDocument();
    await expect(canvas.getByText("Payment")).toBeInTheDocument();
  },
};

export const BackAndNextVisible: Story = {
  args: { steps: threeSteps },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: /back/i })).toBeInTheDocument();
    await expect(canvas.getByRole("button", { name: /next/i })).toBeInTheDocument();
  },
};

export const CanClickNext: Story = {
  args: { steps: threeSteps, defaultStep: 0 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /next/i }));
  },
};

export const KitchenSinkVerticalLarge: Story = {
  args: {
    steps: fourSteps,
    orientation: "vertical",
    size: "large",
    defaultStep: 1,
  },
};

export const KitchenSinkHorizontalSmall: Story = {
  args: {
    steps: twoSteps,
    orientation: "horizontal",
    size: "small",
    defaultStep: 0,
  },
};

export const TwoIndependentSteppers: Story = {
  args: { steps: threeSteps },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Stepper steps={twoSteps} />
      <Stepper steps={fourSteps} defaultStep={2} />
    </div>
  ),
};

export const SingleStep: Story = {
  args: { steps: [{ title: "Only", description: "One step" }] },
};

export const FiveSteps: Story = {
  args: {
    steps: [
      { title: "A", description: "One" },
      { title: "B", description: "Two" },
      { title: "C", description: "Three" },
      { title: "D", description: "Four" },
      { title: "E", description: "Five" },
    ],
  },
};

export const VerticalTitlesOnly: Story = {
  args: { steps: titlesOnly, orientation: "vertical" },
};

export const SmallDefaultStepTwo: Story = {
  args: { steps: threeSteps, size: "small", defaultStep: 2 },
};

export const LargeDefaultStepZero: Story = {
  args: { steps: fourSteps, size: "large", defaultStep: 0 },
};

export const MediumVerticalStepOne: Story = {
  args: {
    steps: threeSteps,
    size: "medium",
    orientation: "vertical",
    defaultStep: 1,
  },
};

export const ShortPunchyTitles: Story = {
  args: {
    steps: [
      { title: "Go", description: "Begin" },
      { title: "Do", description: "Work" },
      { title: "Done", description: "Finish" },
    ],
  },
};

export const CheckoutFlow: Story = {
  args: {
    steps: [
      { title: "Cart", description: "Review items" },
      { title: "Address", description: "Ship to" },
      { title: "Pay", description: "Checkout" },
      { title: "Done", description: "Confirmation" },
    ],
    defaultStep: 0,
  },
};

export const OnboardingFlow: Story = {
  args: {
    steps: [
      { title: "Welcome", description: "Say hello" },
      { title: "Setup", description: "Configure" },
      { title: "Invite", description: "Add teammates" },
    ],
    size: "large",
  },
};

export const WizardVertical: Story = {
  args: {
    steps: fourSteps,
    orientation: "vertical",
    defaultStep: 2,
    size: "medium",
  },
};

export const ControlledStepZero: Story = {
  args: { steps: threeSteps, step: 0 },
};

export const ControlledStepTwo: Story = {
  args: { steps: threeSteps, step: 2 },
};

export const EmptyDescriptionsMix: Story = {
  args: {
    steps: [
      { title: "With", description: "Has text" },
      { title: "Without" },
      { title: "Also with", description: "More text" },
    ],
  },
};

export const SmallVerticalTwo: Story = {
  args: { steps: twoSteps, size: "small", orientation: "vertical" },
};

export const LargeHorizontalFive: Story = {
  args: {
    steps: [
      { title: "A", description: "One" },
      { title: "B", description: "Two" },
      { title: "C", description: "Three" },
      { title: "D", description: "Four" },
      { title: "E", description: "Five" },
    ],
    size: "large",
    orientation: "horizontal",
  },
};

export const CompletedLooking: Story = {
  args: { steps: threeSteps, defaultStep: 2 },
};

export const VerticalControlled: Story = {
  args: { steps: fourSteps, orientation: "vertical", step: 1 },
};

export const SmallTitlesOnly: Story = {
  args: { steps: titlesOnly, size: "small" },
};
