import type { Meta, StoryObj } from "@storybook/react-vite";
import Label from "./Label";
import Input from "./Input";
import Checkbox from "./Checkbox";
import { ark } from "@ark-ui/react/factory";

const meta = {
  title: "Components/Form/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    htmlFor: {
      control: "text",
      description: "Links the label to a form element by ID",
    },
    inverted: {
      control: "boolean",
      description: "Renders the label in inverted colors",
    },
    children: {
      control: "text",
      description: "Content to display inside the label",
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default label with text content
 */
export const Default: Story = {
  args: {
    children: "Email Address",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <Label {...args} />
    </ark.div>
  ),
};

/**
 * Label linked to an input field using htmlFor
 */
export const WithHtmlFor: Story = {
  args: {
    htmlFor: "email-input",
    children: "Email Address",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <Label {...args} />
      <ark.input
        id="email-input"
        type="email"
        placeholder="Enter your email"
        style={{
          display: "block",
          width: "100%",
          padding: "10px 12px",
          border: "1px solid #d1d5db",
          borderRadius: "6px",
          fontSize: "14px",
          outline: "none",
        }}
      />
    </ark.div>
  ),
};

/**
 * Label with inverted colors (dark background)
 */
export const Inverted: Story = {
  args: {
    children: "Username",
    inverted: true,
  },
  render: (args) => (
    <ark.div
      style={{
        padding: "32px",
        backgroundColor: "#f9fafb",
        borderRadius: "8px",
      }}
    >
      <Label {...args} />
    </ark.div>
  ),
};

/**
 * Inverted label with linked input field
 */
export const InvertedWithInput: Story = {
  args: {
    htmlFor: "username-input",
    children: "Username",
    inverted: true,
  },
  render: (args) => (
    <ark.div
      style={{
        padding: "32px",
        backgroundColor: "#111827",
        borderRadius: "8px",
        minWidth: "300px",
      }}
    >
      <Label {...args} />
      <ark.input
        id="username-input"
        type="text"
        placeholder="Enter your username"
        style={{
          display: "block",
          width: "100%",
          padding: "10px 12px",
          border: "1px solid #374151",
          borderRadius: "6px",
          fontSize: "14px",
          outline: "none",
          backgroundColor: "#1f2937",
          color: "#ffffff",
        }}
      />
    </ark.div>
  ),
};

/**
 * Form with multiple labels
 */
/* export const FormExample: Story = {
  render: () => (
    <ark.form
      style={{
        padding: "24px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        border: "1px solid #e5e7eb",
        minWidth: "400px",
      }}
    >
      <ark.div style={{ marginBottom: "16px" }}>
        <Label htmlFor="name">Full Name</Label>
        <ark.input
          id="name"
          type="text"
          placeholder="John Doe"
          style={{
            display: "block",
            width: "100%",
            padding: "10px 12px",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            fontSize: "14px",
            outline: "none",
          }}
        />
      </ark.div>

      <ark.div style={{ marginBottom: "16px" }}>
        <Label htmlFor="email">Email Address</Label>
        <ark.input
          id="email"
          type="email"
          placeholder="john@example.com"
          style={{
            display: "block",
            width: "100%",
            padding: "10px 12px",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            fontSize: "14px",
            outline: "none",
          }}
        />
      </ark.div>

      <ark.div style={{ marginBottom: "16px" }}>
        <Label htmlFor="password">Password</Label>
        <ark.input
          id="password"
          type="password"
          placeholder="••••••••"
          style={{
            display: "block",
            width: "100%",
            padding: "10px 12px",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            fontSize: "14px",
            outline: "none",
          }}
        />
      </ark.div>

      <ark.button
        type="submit"
        style={{
          width: "100%",
          padding: "10px 16px",
          backgroundColor: "#3b82f6",
          color: "#ffffff",
          border: "none",
          borderRadius: "6px",
          fontSize: "14px",
          fontWeight: "500",
          cursor: "pointer",
        }}
      >
        Submit
      </ark.button>
    </ark.form>
  ),
}; */

/**
 * Label with custom styling (using children as ReactNode)
 */
export const WithCustomContent: Story = {
  render: () => (
    <ark.div style={{ padding: "16px" }}>
      <Label htmlFor="terms">
        <ark.span>
          I agree to the{" "}
          <ark.a
            href="#"
            style={{ color: "#3b82f6", textDecoration: "underline" }}
          >
            Terms and Conditions
          </ark.a>
        </ark.span>
      </Label>
      <ark.input
        id="terms"
        type="checkbox"
        style={{
          marginLeft: "8px",
          cursor: "pointer",
        }}
      />
    </ark.div>
  ),
};

/**
 * Required field label with asterisk
 */
export const RequiredField: Story = {
  render: () => (
    <ark.div style={{ padding: "16px" }}>
      <Label htmlFor="required-email">
        Email Address <ark.span style={{ color: "#ef4444" }}>*</ark.span>
      </Label>
      <ark.input
        id="required-email"
        type="email"
        placeholder="Enter your email"
        required
        style={{
          display: "block",
          width: "100%",
          padding: "10px 12px",
          border: "1px solid #d1d5db",
          borderRadius: "6px",
          fontSize: "14px",
          outline: "none",
        }}
      />
    </ark.div>
  ),
};

/**
 * Label with no htmlFor at all - cursor stays default, no association
 */
export const WithoutHtmlFor: Story = {
  args: {
    children: "Standalone Label",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <Label {...args} />
    </ark.div>
  ),
};

/**
 * Inverted label with no htmlFor - dark pill, default cursor
 */
export const InvertedWithoutHtmlFor: Story = {
  args: {
    children: "Standalone Inverted Label",
    inverted: true,
  },
  render: (args) => (
    <ark.div style={{ padding: "32px", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
      <Label {...args} />
    </ark.div>
  ),
};

/**
 * Label paired with the real Input component via matching htmlFor/id
 */
export const PairedWithInputComponent: Story = {
  render: () => (
    <ark.div style={{ padding: "16px", minWidth: "280px" }}>
      <Label htmlFor="paired-input">Display Name</Label>
      <Input id="paired-input" placeholder="Jane Doe" />
    </ark.div>
  ),
};

/**
 * Inverted label paired with an inverted Input component
 */
export const InvertedPairedWithInputComponent: Story = {
  render: () => (
    <ark.div
      style={{
        padding: "32px",
        backgroundColor: "#111827",
        borderRadius: "8px",
        minWidth: "280px",
      }}
    >
      <Label htmlFor="paired-inverted-input" inverted>
        Display Name
      </Label>
      <Input id="paired-inverted-input" inverted placeholder="Jane Doe" />
    </ark.div>
  ),
};

/**
 * Label used as a section heading above the real Checkbox component
 */
export const PairedWithCheckboxComponent: Story = {
  render: () => (
    <ark.div style={{ padding: "16px", minWidth: "280px" }}>
      <Label>Notification preferences</Label>
      <Checkbox name="marketing" value="yes">
        Receive marketing emails
      </Checkbox>
    </ark.div>
  ),
};

/**
 * Label with long text that wraps across multiple lines
 */
export const LongTextWrapping: Story = {
  args: {
    children:
      "This is an intentionally long label used to verify that the text wraps correctly across multiple lines instead of overflowing its container",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ padding: "16px", maxWidth: "220px" }}>
      <Label {...args} />
    </ark.div>
  ),
};

/**
 * Inverted label with long text that wraps across multiple lines
 */
export const LongTextWrappingInverted: Story = {
  args: {
    children:
      "This is an intentionally long inverted label used to verify that the padded pill background wraps correctly across multiple lines",
    inverted: true,
  },
  render: (args) => (
    <ark.div style={{ padding: "32px", maxWidth: "220px", backgroundColor: "#f9fafb" }}>
      <Label {...args} />
    </ark.div>
  ),
};

/**
 * Label with right-to-left Arabic content
 */
export const RTLContent: Story = {
  render: () => (
    <ark.div style={{ padding: "16px" }} dir="rtl">
      <Label htmlFor="rtl-input">الاسم الكامل</Label>
      <ark.input
        id="rtl-input"
        type="text"
        dir="rtl"
        style={{
          display: "block",
          width: "100%",
          padding: "10px 12px",
          border: "1px solid #d1d5db",
          borderRadius: "6px",
          fontSize: "14px",
          outline: "none",
        }}
      />
    </ark.div>
  ),
};

/**
 * Inverted label with right-to-left Arabic content
 */
export const RTLContentInverted: Story = {
  render: () => (
    <ark.div
      style={{ padding: "32px", backgroundColor: "#111827", borderRadius: "8px" }}
      dir="rtl"
    >
      <Label inverted>مرحبا بالعالم</Label>
    </ark.div>
  ),
};

/**
 * Label with mixed unicode/accented content
 */
export const UnicodeContent: Story = {
  args: {
    children: "名前 🎌 ünïcödé Ñame",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <Label {...args} />
    </ark.div>
  ),
};

/**
 * Label with emoji-only content
 */
export const EmojiContent: Story = {
  args: {
    children: "🔥 Trending Now 🚀",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <Label {...args} />
    </ark.div>
  ),
};

/**
 * Label with empty string children (renders an empty but present element)
 */
export const EmptyStringContent: Story = {
  render: () => (
    <ark.div style={{ padding: "16px" }}>
      <Label htmlFor="empty-content-input">{""}</Label>
      <ark.input id="empty-content-input" type="text" />
    </ark.div>
  ),
};

/**
 * Label with whitespace-only children
 */
export const WhitespaceOnlyContent: Story = {
  render: () => (
    <ark.div style={{ padding: "16px", border: "1px dashed #d1d5db" }}>
      <Label>{"   "}</Label>
    </ark.div>
  ),
};

/**
 * Label with a single character as content
 */
export const SingleCharacterContent: Story = {
  args: {
    children: "X",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <Label {...args} />
    </ark.div>
  ),
};

/**
 * Multiple labels stacked in a typical form layout
 */
export const FormWithMultipleLabels: Story = {
  render: () => (
    <ark.form
      style={{
        padding: "24px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        border: "1px solid #e5e7eb",
        minWidth: "320px",
      }}
    >
      <ark.div style={{ marginBottom: "16px" }}>
        <Label htmlFor="form-name">Full Name</Label>
        <Input id="form-name" placeholder="John Doe" />
      </ark.div>
      <ark.div style={{ marginBottom: "16px" }}>
        <Label htmlFor="form-email">Email Address</Label>
        <Input id="form-email" type="email" placeholder="john@example.com" />
      </ark.div>
      <ark.div>
        <Label htmlFor="form-password">Password</Label>
        <Input id="form-password" type="password" placeholder="••••••••" />
      </ark.div>
    </ark.form>
  ),
};

/**
 * Multiple inverted labels stacked in a dark form layout
 */
export const InvertedFormWithMultipleLabels: Story = {
  render: () => (
    <ark.form
      style={{
        padding: "24px",
        backgroundColor: "#111827",
        borderRadius: "8px",
        minWidth: "320px",
      }}
    >
      <ark.div style={{ marginBottom: "16px" }}>
        <Label htmlFor="dark-form-name" inverted>
          Full Name
        </Label>
        <Input id="dark-form-name" inverted placeholder="John Doe" />
      </ark.div>
      <ark.div>
        <Label htmlFor="dark-form-email" inverted>
          Email Address
        </Label>
        <Input id="dark-form-email" inverted type="email" placeholder="john@example.com" />
      </ark.div>
    </ark.form>
  ),
};

/**
 * Kitchen sink: inverted, htmlFor and long text combined
 */
export const KitchenSinkInvertedHtmlForLongText: Story = {
  render: () => (
    <ark.div
      style={{
        padding: "32px",
        backgroundColor: "#111827",
        borderRadius: "8px",
        maxWidth: "260px",
      }}
    >
      <Label htmlFor="kitchen-sink-1" inverted>
        A fairly long inverted label demonstrating wrapping alongside a linked
        input field
      </Label>
      <Input id="kitchen-sink-1" inverted placeholder="Type here" />
    </ark.div>
  ),
};

/**
 * Kitchen sink: required marker, inverted, and emoji content combined
 */
export const KitchenSinkRequiredInvertedEmoji: Story = {
  render: () => (
    <ark.div
      style={{ padding: "32px", backgroundColor: "#111827", borderRadius: "8px" }}
    >
      <Label htmlFor="kitchen-sink-2" inverted>
        🚀 Launch Codename <ark.span style={{ color: "#f87171" }}>*</ark.span>
      </Label>
      <Input id="kitchen-sink-2" inverted placeholder="Enter codename" />
    </ark.div>
  ),
};

/**
 * Kitchen sink: every notable combination in one place for visual regression
 */
export const KitchenSinkAllPropsCombined: Story = {
  render: () => (
    <ark.div
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "300px",
      }}
    >
      <Label htmlFor="ks-a">Plain label with htmlFor</Label>
      <Input id="ks-a" placeholder="Plain" />

      <Label inverted htmlFor="ks-b">
        Inverted label with htmlFor and a long line of wrapping text content
      </Label>
      <Input id="ks-b" inverted placeholder="Inverted" />

      <Label>
        Nested <strong>strong</strong> and <span>span</span> children 🎉
      </Label>
    </ark.div>
  ),
};

/**
 * Label rendered from a plain string child (baseline children type)
 */
export const PlainStringChild: Story = {
  args: {
    children: "Plain string label",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <Label {...args} />
    </ark.div>
  ),
};

/**
 * Label containing a nested span element as part of its children
 */
export const NestedSpanChild: Story = {
  render: () => (
    <ark.div style={{ padding: "16px" }}>
      <Label>
        Shipping <ark.span style={{ color: "#3b82f6" }}>Address</ark.span>
      </Label>
    </ark.div>
  ),
};

/**
 * Label containing a nested strong element as part of its children
 */
export const NestedStrongChild: Story = {
  render: () => (
    <ark.div style={{ padding: "16px" }}>
      <Label>
        This field is <strong>mandatory</strong>
      </Label>
    </ark.div>
  ),
};

/**
 * Label combining nested span and strong elements in the same children tree
 */
export const NestedSpanAndStrongCombined: Story = {
  render: () => (
    <ark.div style={{ padding: "16px" }}>
      <Label>
        <ark.span>Billing</ark.span> <strong>Address</strong>{" "}
        <ark.span style={{ color: "#6b7280" }}>(optional)</ark.span>
      </Label>
    </ark.div>
  ),
};

/**
 * Label whose children is a numeric-looking string
 */
export const NumericStringChild: Story = {
  args: {
    children: "42",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <Label {...args} />
    </ark.div>
  ),
};

/**
 * Label mixing plain text nodes with inline elements
 */
export const MixedTextAndElementChildren: Story = {
  render: () => (
    <ark.div style={{ padding: "16px" }}>
      <Label htmlFor="mixed-children-input">
        Step 1 of 3: <em>Personal</em> details{" "}
        <ark.span style={{ color: "#6b7280" }}>(auto-saved)</ark.span>
      </Label>
      <ark.input id="mixed-children-input" type="text" />
    </ark.div>
  ),
};

/**
 * Label with an htmlFor value that does not match any element on the page
 */
export const HtmlForWithoutMatchingInput: Story = {
  args: {
    htmlFor: "no-such-element",
    children: "Dangling association label",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ padding: "16px" }}>
      <Label {...args} />
    </ark.div>
  ),
};

/**
 * Label paired with a textarea element via matching htmlFor/id
 */
export const HtmlForMatchingTextarea: Story = {
  render: () => (
    <ark.div style={{ padding: "16px", minWidth: "280px" }}>
      <Label htmlFor="matching-textarea">Comments</Label>
      <ark.textarea
        id="matching-textarea"
        rows={3}
        style={{
          display: "block",
          width: "100%",
          padding: "10px 12px",
          border: "1px solid #d1d5db",
          borderRadius: "6px",
          fontSize: "14px",
          outline: "none",
        }}
      />
    </ark.div>
  ),
};

/**
 * Label paired with a native select element via matching htmlFor/id
 */
export const HtmlForMatchingSelect: Story = {
  render: () => (
    <ark.div style={{ padding: "16px", minWidth: "280px" }}>
      <Label htmlFor="matching-select">Country</Label>
      <ark.select
        id="matching-select"
        style={{
          display: "block",
          width: "100%",
          padding: "10px 12px",
          border: "1px solid #d1d5db",
          borderRadius: "6px",
          fontSize: "14px",
        }}
      >
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="pt">Portugal</option>
      </ark.select>
    </ark.div>
  ),
};

/**
 * Non-inverted label placed directly on a light background for contrast reference
 */
export const InvertedOnLightBackground: Story = {
  args: {
    children: "Inverted pill on light background",
    inverted: true,
  },
  render: (args) => (
    <ark.div style={{ padding: "24px", backgroundColor: "#ffffff" }}>
      <Label {...args} />
    </ark.div>
  ),
};

/**
 * Non-inverted label placed on a dark background, showing low-contrast baseline
 */
export const NonInvertedOnDarkBackground: Story = {
  args: {
    children: "Non-inverted label on dark background",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ padding: "24px", backgroundColor: "#111827", borderRadius: "8px" }}>
      <Label {...args} />
    </ark.div>
  ),
};

/**
 * Label used for a search input field
 */
export const SearchFieldLabel: Story = {
  render: () => (
    <ark.div style={{ padding: "16px", minWidth: "280px" }}>
      <Label htmlFor="search-field">Search</Label>
      <Input id="search-field" type="search" placeholder="Search products..." />
    </ark.div>
  ),
};

/**
 * Label used as the heading above a newsletter opt-in checkbox
 */
export const NewsletterOptInLabel: Story = {
  render: () => (
    <ark.div style={{ padding: "16px", minWidth: "280px" }}>
      <Label>Stay in the loop</Label>
      <Checkbox name="newsletter" value="yes">
        Subscribe to our newsletter
      </Checkbox>
    </ark.div>
  ),
};

/**
 * Label used for a password field
 */
export const PasswordFieldLabel: Story = {
  render: () => (
    <ark.div style={{ padding: "16px", minWidth: "280px" }}>
      <Label htmlFor="password-field">Password</Label>
      <Input id="password-field" type="password" placeholder="••••••••" />
    </ark.div>
  ),
};

/**
 * Label used for a shipping address field
 */
export const AddressFieldLabel: Story = {
  render: () => (
    <ark.div style={{ padding: "16px", minWidth: "280px" }}>
      <Label htmlFor="address-field">Shipping Address</Label>
      <Input id="address-field" placeholder="123 Main St" />
    </ark.div>
  ),
};

/**
 * Label used for a phone number field
 */
export const PhoneNumberFieldLabel: Story = {
  render: () => (
    <ark.div style={{ padding: "16px", minWidth: "280px" }}>
      <Label htmlFor="phone-field">Phone Number</Label>
      <Input id="phone-field" type="tel" placeholder="+1 (555) 000-0000" />
    </ark.div>
  ),
};

/**
 * Label used for a date field
 */
export const DateFieldLabel: Story = {
  render: () => (
    <ark.div style={{ padding: "16px", minWidth: "280px" }}>
      <Label htmlFor="date-field">Date of Birth</Label>
      <ark.input
        id="date-field"
        type="date"
        style={{
          display: "block",
          width: "100%",
          padding: "10px 12px",
          border: "1px solid #d1d5db",
          borderRadius: "6px",
          fontSize: "14px",
          outline: "none",
        }}
      />
    </ark.div>
  ),
};

/**
 * Label with a rich-content privacy policy agreement, paired with a checkbox
 */
export const PrivacyPolicyAgreementLabel: Story = {
  render: () => (
    <ark.div style={{ padding: "16px" }}>
      <Label htmlFor="privacy-policy">
        <ark.span>
          I have read and accept the{" "}
          <ark.a href="#" style={{ color: "#3b82f6", textDecoration: "underline" }}>
            Privacy Policy
          </ark.a>
        </ark.span>
      </Label>
      <ark.input id="privacy-policy" type="checkbox" style={{ marginLeft: "8px" }} />
    </ark.div>
  ),
};

/**
 * Label containing a hard line break between two descriptive lines
 */
export const MultilineDescriptionLabel: Story = {
  render: () => (
    <ark.div style={{ padding: "16px" }}>
      <Label htmlFor="multiline-input">
        Promo code
        <br />
        <ark.span style={{ fontSize: "12px", color: "#6b7280" }}>
          Case-sensitive, applied at checkout
        </ark.span>
      </Label>
      <ark.input id="multiline-input" type="text" />
    </ark.div>
  ),
};

/**
 * Label preceded by an inline icon child alongside its text
 */
export const LabelWithIconChild: Story = {
  render: () => (
    <ark.div style={{ padding: "16px" }}>
      <Label htmlFor="icon-child-input">
        <ark.span style={{ marginRight: "4px" }} aria-hidden="true">
          🔒
        </ark.span>
        Secure Field
      </Label>
      <ark.input id="icon-child-input" type="text" />
    </ark.div>
  ),
};

/**
 * Label rendered inside a bordered card container
 */
export const LabelInsideCard: Story = {
  render: () => (
    <ark.div
      style={{
        padding: "20px",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        minWidth: "280px",
      }}
    >
      <Label htmlFor="card-input">Card Number</Label>
      <Input id="card-input" placeholder="4242 4242 4242 4242" />
    </ark.div>
  ),
};

/**
 * Two labels laid out side by side inline rather than stacked
 */
export const LabelGroupSideBySide: Story = {
  render: () => (
    <ark.div style={{ padding: "16px", display: "flex", gap: "24px" }}>
      <ark.div>
        <Label htmlFor="side-by-side-first">First Name</Label>
        <Input id="side-by-side-first" placeholder="Jane" />
      </ark.div>
      <ark.div>
        <Label htmlFor="side-by-side-second">Last Name</Label>
        <Input id="side-by-side-second" placeholder="Doe" />
      </ark.div>
    </ark.div>
  ),
};

/**
 * Label with a very long unbroken token to verify it does not break the layout
 */
export const LongUnbrokenTokenWrapping: Story = {
  args: {
    children:
      "Supercalifragilisticexpialidocious-identifier-field-name-with-no-breaks-1234567890",
    inverted: false,
  },
  render: (args) => (
    <ark.div style={{ padding: "16px", maxWidth: "220px" }}>
      <Label {...args} />
    </ark.div>
  ),
};

/**
 * Label rendered within a narrow, constrained container to check responsive wrapping
 */
export const ResponsiveLabelShowcase: Story = {
  render: () => (
    <ark.div
      style={{
        padding: "16px",
        width: "140px",
        border: "1px dashed #d1d5db",
      }}
    >
      <Label htmlFor="responsive-input">
        Account Verification Reference Number
      </Label>
      <ark.input
        id="responsive-input"
        type="text"
        style={{ display: "block", width: "100%" }}
      />
    </ark.div>
  ),
};

/**
 * A single grid showcasing several default/inverted/htmlFor combinations together
 */
export const AllVariantsGrid: Story = {
  render: () => (
    <ark.div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "24px",
        padding: "24px",
      }}
    >
      <ark.div style={{ padding: "16px", backgroundColor: "#ffffff" }}>
        <Label>Default</Label>
      </ark.div>
      <ark.div style={{ padding: "16px", backgroundColor: "#111827", borderRadius: "8px" }}>
        <Label inverted>Inverted</Label>
      </ark.div>
      <ark.div style={{ padding: "16px", backgroundColor: "#ffffff" }}>
        <Label htmlFor="grid-input-1">With htmlFor</Label>
        <ark.input id="grid-input-1" type="text" />
      </ark.div>
      <ark.div style={{ padding: "16px", backgroundColor: "#111827", borderRadius: "8px" }}>
        <Label htmlFor="grid-input-2" inverted>
          Inverted with htmlFor
        </Label>
        <ark.input id="grid-input-2" type="text" />
      </ark.div>
    </ark.div>
  ),
};
