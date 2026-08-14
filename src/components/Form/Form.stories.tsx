import type { Meta, StoryObj } from "@storybook/react-vite";
import Form from "./Form";
import { Label, Input, TextArea, SearchBar, Chip, ChipInput } from "./index";
import Checkbox from "./Checkbox";
import { expect, within, userEvent } from "storybook/test";
import { ark } from "@ark-ui/react/factory";
import { useState } from "react";

const meta = {
  title: "Components/Form/Form",
  component: Form,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    inverted: {
      control: "boolean",
      description: "Renders the form in inverted colors",
    },
    gap: {
      control: "text",
      description: "Sets the gap between form elements",
    },
    children: {
      description: "Form content (typically form fields)",
    },
  },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

const submitButtonStyle = {
  padding: "10px 16px",
  backgroundColor: "#3b82f6",
  color: "#ffffff",
  border: "none",
  borderRadius: "6px",
  fontSize: "14px",
  fontWeight: "500",
  cursor: "pointer",
} as const;

const invertedSubmitButtonStyle = {
  ...submitButtonStyle,
  backgroundColor: "#60a5fa",
} as const;

/**
 * Default form with standard gap (16px)
 */
export const Default: Story = {
  args: {
    inverted: false,
    gap: "16px",
  },
  render: (args) => (
    <Form {...args}>
      <ark.div>
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" type="text" placeholder="John Doe" />
      </ark.div>
      <ark.div>
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" placeholder="john@example.com" />
      </ark.div>
      <ark.button type="submit" style={submitButtonStyle}>
        Submit
      </ark.button>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const name = c.getByLabelText(/full name/i) as HTMLInputElement;
    await userEvent.type(name, "John Doe");
    expect(name.value).toBe("John Doe");

    const email = c.getByLabelText(/email address/i) as HTMLInputElement;
    await userEvent.type(email, "john@example.com");
    expect(email.value).toBe("john@example.com");
  },
};

/**
 * Form with custom gap (small - 8px)
 */
export const SmallGap: Story = {
  args: {
    inverted: false,
    gap: "8px",
  },
  render: (args) => (
    <Form {...args}>
      <ark.div>
        <Label htmlFor="name-small">Full Name</Label>
        <Input id="name-small" type="text" placeholder="John Doe" />
      </ark.div>
      <ark.div>
        <Label htmlFor="email-small">Email Address</Label>
        <Input id="email-small" type="email" placeholder="john@example.com" />
      </ark.div>
      <ark.div>
        <Label htmlFor="phone-small">Phone Number</Label>
        <Input id="phone-small" type="tel" placeholder="+1 (555) 000-0000" />
      </ark.div>
      <ark.button type="submit" style={submitButtonStyle}>
        Submit
      </ark.button>
    </Form>
  ),
};

/**
 * Form with custom gap (large - 24px)
 */
export const LargeGap: Story = {
  args: {
    inverted: false,
    gap: "24px",
  },
  render: (args) => (
    <Form {...args}>
      <ark.div>
        <Label htmlFor="name-large">Full Name</Label>
        <Input id="name-large" type="text" placeholder="John Doe" />
      </ark.div>
      <ark.div>
        <Label htmlFor="email-large">Email Address</Label>
        <Input id="email-large" type="email" placeholder="john@example.com" />
      </ark.div>
      <ark.div>
        <Label htmlFor="message">Message</Label>
        <ark.textarea
          id="message"
          placeholder="Enter your message"
          rows={4}
          style={{
            width: "100%",
            padding: "10px 12px",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            fontSize: "14px",
            outline: "none",
            resize: "vertical",
          }}
        />
      </ark.div>
      <ark.button type="submit" style={submitButtonStyle}>
        Submit
      </ark.button>
    </Form>
  ),
};

/**
 * Form with inverted colors (dark mode)
 */
export const Inverted: Story = {
  args: {
    inverted: true,
    gap: "16px",
  },
  render: (args) => (
    <Form {...args}>
      <ark.div>
        <Label htmlFor="name-inverted" inverted>
          Full Name
        </Label>
        <Input id="name-inverted" type="text" placeholder="John Doe" inverted />
      </ark.div>
      <ark.div>
        <Label htmlFor="email-inverted" inverted>
          Email Address
        </Label>
        <Input
          id="email-inverted"
          type="email"
          placeholder="john@example.com"
          inverted
        />
      </ark.div>
      <ark.button type="submit" style={invertedSubmitButtonStyle}>
        Submit
      </ark.button>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const name = c.getByLabelText(/full name/i) as HTMLInputElement;
    await userEvent.type(name, "Alice");
    expect(name.value).toBe("Alice");

    const email = c.getByLabelText(/email address/i) as HTMLInputElement;
    await userEvent.type(email, "alice@example.com");
    expect(email.value).toBe("alice@example.com");
  },
};

/**
 * Inverted form with custom gap
 */
export const InvertedWithLargeGap: Story = {
  args: {
    inverted: true,
    gap: "24px",
  },
  render: (args) => (
    <Form {...args}>
      <ark.div>
        <Label htmlFor="username" inverted>
          Username
        </Label>
        <Input id="username" type="text" placeholder="username" inverted />
      </ark.div>
      <ark.div>
        <Label htmlFor="password-inverted" inverted>
          Password
        </Label>
        <Input
          id="password-inverted"
          type="password"
          placeholder="••••••••"
          inverted
        />
      </ark.div>
      <ark.div>
        <Label htmlFor="confirm-password" inverted>
          Confirm Password
        </Label>
        <Input
          id="confirm-password"
          type="password"
          placeholder="••••••••"
          inverted
        />
      </ark.div>
      <ark.button type="submit" style={invertedSubmitButtonStyle}>
        Create Account
      </ark.button>
    </Form>
  ),
};

/**
 * Registration form with multiple fields
 */
export const RegistrationForm: Story = {
  args: {
    inverted: false,
    gap: "16px",
  },
  render: (args) => (
    <Form {...args} style={{ minWidth: "400px" }}>
      <ark.h2
        style={{
          margin: "0 0 8px 0",
          fontSize: "20px",
          fontWeight: "600",
          color: "#1f2937",
        }}
      >
        Create Account
      </ark.h2>
      <ark.div>
        <Label htmlFor="reg-name">Full Name</Label>
        <Input id="reg-name" type="text" placeholder="John Doe" />
      </ark.div>
      <ark.div>
        <Label htmlFor="reg-email">Email Address</Label>
        <Input id="reg-email" type="email" placeholder="john@example.com" />
      </ark.div>
      <ark.div>
        <Label htmlFor="reg-password">Password</Label>
        <Input id="reg-password" type="password" placeholder="••••••••" />
      </ark.div>
      <ark.div>
        <Label htmlFor="reg-confirm">Confirm Password</Label>
        <Input id="reg-confirm" type="password" placeholder="••••••••" />
      </ark.div>
      <ark.div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <ark.input id="terms" type="checkbox" style={{ cursor: "pointer" }} />
        <Label htmlFor="terms" style={{ marginBottom: 0, cursor: "pointer" }}>
          I agree to the Terms and Conditions
        </Label>
      </ark.div>
      <ark.button type="submit" style={submitButtonStyle}>
        Sign Up
      </ark.button>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    expect(c.getByRole("heading", { name: /create account/i })).toBeTruthy();

    const name = c.getByLabelText(/full name/i) as HTMLInputElement;
    await userEvent.type(name, "John Doe");
    expect(name.value).toBe("John Doe");

    const email = c.getByLabelText(/email address/i) as HTMLInputElement;
    await userEvent.type(email, "john@example.com");
    expect(email.value).toBe("john@example.com");

    const password = c.getByLabelText(/^password$/i) as HTMLInputElement;
    await userEvent.type(password, "hunter2");
    expect(password.value).toBe("hunter2");

    const confirm = c.getByLabelText(/confirm password/i) as HTMLInputElement;
    await userEvent.type(confirm, "hunter2");
    expect(confirm.value).toBe("hunter2");

    const terms = c.getByLabelText(/terms and conditions/i) as HTMLInputElement;
    await userEvent.click(terms);
    expect(terms.checked).toBe(true);
  },
};

/**
 * Login form (minimal)
 */
export const LoginForm: Story = {
  args: {
    inverted: false,
    gap: "16px",
  },
  render: (args) => (
    <Form {...args}>
      <ark.h2
        style={{
          margin: "0 0 8px 0",
          fontSize: "20px",
          fontWeight: "600",
          color: "#1f2937",
        }}
      >
        Login
      </ark.h2>
      <ark.div>
        <Label htmlFor="login-email">Email</Label>
        <Input id="login-email" type="email" placeholder="your@email.com" />
      </ark.div>
      <ark.div>
        <Label htmlFor="login-password">Password</Label>
        <Input id="login-password" type="password" placeholder="••••••••" />
      </ark.div>
      <ark.button type="submit" style={submitButtonStyle}>
        Sign In
      </ark.button>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const email = c.getByLabelText(/email/i) as HTMLInputElement;
    await userEvent.type(email, "user@example.com");
    expect(email.value).toBe("user@example.com");

    const password = c.getByLabelText(/password/i) as HTMLInputElement;
    await userEvent.type(password, "p@ssw0rd");
    expect(password.value).toBe("p@ssw0rd");
  },
};

/**
 * Contact form with numeric gap
 */
export const ContactForm: Story = {
  args: {
    inverted: false,
    gap: 20,
  },
  render: (args) => (
    <Form {...args} style={{ minWidth: "400px" }}>
      <ark.h2
        style={{
          margin: "0 0 8px 0",
          fontSize: "20px",
          fontWeight: "600",
          color: "#1f2937",
        }}
      >
        Contact Us
      </ark.h2>
      <ark.div>
        <Label htmlFor="contact-name">Name</Label>
        <Input id="contact-name" type="text" placeholder="Your name" />
      </ark.div>
      <ark.div>
        <Label htmlFor="contact-email">Email</Label>
        <Input id="contact-email" type="email" placeholder="your@email.com" />
      </ark.div>
      <ark.div>
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" type="text" placeholder="How can we help?" />
      </ark.div>
      <ark.div>
        <Label htmlFor="contact-message">Message</Label>
        <ark.textarea
          id="contact-message"
          placeholder="Your message"
          rows={5}
          style={{
            width: "100%",
            padding: "10px 12px",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            fontSize: "14px",
            outline: "none",
            resize: "vertical",
          }}
        />
      </ark.div>
      <ark.button type="submit" style={{ ...submitButtonStyle, backgroundColor: "#10b981" }}>
        Send Message
      </ark.button>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const name = c.getByLabelText(/name/i) as HTMLInputElement;
    await userEvent.type(name, "Jane");
    expect(name.value).toBe("Jane");

    const email = c.getByLabelText(/^email$/i) as HTMLInputElement;
    await userEvent.type(email, "jane@example.com");
    expect(email.value).toBe("jane@example.com");

    const subject = c.getByLabelText(/subject/i) as HTMLInputElement;
    await userEvent.type(subject, "Question");
    expect(subject.value).toBe("Question");

    const message = c.getByLabelText(/message/i) as HTMLTextAreaElement;
    await userEvent.type(message, "Hello Team");
    expect(message.value).toBe("Hello Team");
  },
};

/* -------------------------------------------------------------------------
 * Gap variants: numeric vs string values
 * ---------------------------------------------------------------------- */

/**
 * Gap supplied as a raw number - the component appends 'px' automatically
 */
export const GapAsNumber: Story = {
  args: {
    inverted: false,
    gap: 32,
  },
  render: (args) => (
    <Form {...args}>
      <ark.div>
        <Label htmlFor="gap-number-a">First Field</Label>
        <Input id="gap-number-a" type="text" placeholder="First" />
      </ark.div>
      <ark.div>
        <Label htmlFor="gap-number-b">Second Field</Label>
        <Input id="gap-number-b" type="text" placeholder="Second" />
      </ark.div>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const form = canvasElement.querySelector("form") as HTMLFormElement;
    expect(form.style.gap).toBe("32px");
  },
};

/**
 * Small numeric gap value
 */
export const GapAsNumberSmall: Story = {
  args: {
    inverted: false,
    gap: 4,
  },
  render: (args) => (
    <Form {...args}>
      <ark.div>
        <Label htmlFor="gap-num-small-a">First Field</Label>
        <Input id="gap-num-small-a" type="text" placeholder="First" />
      </ark.div>
      <ark.div>
        <Label htmlFor="gap-num-small-b">Second Field</Label>
        <Input id="gap-num-small-b" type="text" placeholder="Second" />
      </ark.div>
    </Form>
  ),
};

/**
 * Gap supplied as a string using rem units (not just px)
 */
export const GapAsStringRem: Story = {
  args: {
    inverted: false,
    gap: "2rem",
  },
  render: (args) => (
    <Form {...args}>
      <ark.div>
        <Label htmlFor="gap-rem-a">First Field</Label>
        <Input id="gap-rem-a" type="text" placeholder="First" />
      </ark.div>
      <ark.div>
        <Label htmlFor="gap-rem-b">Second Field</Label>
        <Input id="gap-rem-b" type="text" placeholder="Second" />
      </ark.div>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const form = canvasElement.querySelector("form") as HTMLFormElement;
    expect(form.style.gap).toBe("2rem");
  },
};

/**
 * Gap set to zero (edge case for both numeric and string coercion)
 */
export const GapZero: Story = {
  args: {
    inverted: false,
    gap: 0,
  },
  render: (args) => (
    <Form {...args}>
      <ark.div>
        <Label htmlFor="gap-zero-a">First Field</Label>
        <Input id="gap-zero-a" type="text" placeholder="First" />
      </ark.div>
      <ark.div>
        <Label htmlFor="gap-zero-b">Second Field</Label>
        <Input id="gap-zero-b" type="text" placeholder="Second" />
      </ark.div>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const form = canvasElement.querySelector("form") as HTMLFormElement;
    expect(form.style.gap).toBe("0px");
  },
};

/* -------------------------------------------------------------------------
 * Content shape: empty, single field, many fields
 * ---------------------------------------------------------------------- */

/**
 * Form with no fields at all, just the empty shell
 */
export const EmptyForm: Story = {
  args: {
    inverted: false,
  },
  render: (args) => <Form {...args}>{null}</Form>,
  play: async ({ canvasElement }) => {
    const form = canvasElement.querySelector("form") as HTMLFormElement;
    expect(form.children.length).toBe(0);
  },
};

/**
 * Form containing a single field and no submit button
 */
export const SingleField: Story = {
  args: {
    inverted: false,
    gap: "16px",
  },
  render: (args) => (
    <Form {...args}>
      <ark.div>
        <Label htmlFor="single-field">Nickname</Label>
        <Input id="single-field" type="text" placeholder="Nickname" />
      </ark.div>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const field = c.getByLabelText(/nickname/i) as HTMLInputElement;
    await userEvent.type(field, "Ace");
    expect(field.value).toBe("Ace");
  },
};

/**
 * Form containing a large number of fields
 */
export const ManyFields: Story = {
  args: {
    inverted: false,
    gap: "12px",
  },
  render: (args) => (
    <Form {...args} style={{ minWidth: "360px" }}>
      {[
        "First Name",
        "Last Name",
        "Email",
        "Phone",
        "Address Line 1",
        "Address Line 2",
        "City",
        "State",
        "Postal Code",
        "Country",
      ].map((label) => {
        const id = `many-${label.toLowerCase().replace(/\s+/g, "-")}`;
        return (
          <ark.div key={id}>
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} type="text" placeholder={label} />
          </ark.div>
        );
      })}
      <ark.button type="submit" style={submitButtonStyle}>
        Submit
      </ark.button>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const form = canvasElement.querySelector("form") as HTMLFormElement;
    expect(form.querySelectorAll("input").length).toBe(10);
  },
};

/* -------------------------------------------------------------------------
 * Nested / grouped fieldsets
 * ---------------------------------------------------------------------- */

/**
 * Form using a fieldset/legend to group related fields, with a nested
 * fieldset inside it
 */
export const NestedFieldsets: Story = {
  args: {
    inverted: false,
    gap: "16px",
  },
  render: (args) => (
    <Form {...args} style={{ minWidth: "380px" }}>
      <ark.fieldset
        style={{ border: "1px solid #d1d5db", borderRadius: "6px", padding: "12px" }}
      >
        <ark.legend style={{ fontSize: "14px", fontWeight: 600, padding: "0 4px" }}>
          Personal Information
        </ark.legend>
        <ark.div>
          <Label htmlFor="nested-name">Full Name</Label>
          <Input id="nested-name" type="text" placeholder="Full name" />
        </ark.div>
        <ark.fieldset
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "6px",
            padding: "12px",
            marginTop: "12px",
          }}
        >
          <ark.legend style={{ fontSize: "12px", fontWeight: 600, padding: "0 4px" }}>
            Emergency Contact
          </ark.legend>
          <ark.div>
            <Label htmlFor="nested-emergency-name">Contact Name</Label>
            <Input id="nested-emergency-name" type="text" placeholder="Contact name" />
          </ark.div>
        </ark.fieldset>
      </ark.fieldset>
      <ark.button type="submit" style={submitButtonStyle}>
        Save
      </ark.button>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const form = canvasElement.querySelector("form") as HTMLFormElement;
    expect(form.querySelectorAll("fieldset").length).toBe(2);
  },
};

/* -------------------------------------------------------------------------
 * onSubmit wiring: preventDefault + state capture
 * ---------------------------------------------------------------------- */

/**
 * Wires a real onSubmit handler that calls preventDefault and captures the
 * submitted form data into component state, rendering it back out
 */
export const OnSubmitCapturesFormData: Story = {
  render: (args) => {
    const OnSubmitFixture = () => {
      const [submitted, setSubmitted] = useState<string | null>(null);

      return (
        <Form
          {...args}
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            setSubmitted(String(data.get("captured-name") ?? ""));
          }}
        >
          <ark.div>
            <Label htmlFor="captured-name">Name</Label>
            <Input id="captured-name" name="captured-name" type="text" placeholder="Name" />
          </ark.div>
          <ark.button type="submit" style={submitButtonStyle}>
            Submit
          </ark.button>
          {submitted !== null && (
            <ark.p data-testid="submitted-value" style={{ margin: 0, fontSize: "13px" }}>
              Submitted: {submitted}
            </ark.p>
          )}
        </Form>
      );
    };

    return <OnSubmitFixture />;
  },
  args: {
    inverted: false,
    gap: "16px",
  },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const name = c.getByLabelText(/name/i) as HTMLInputElement;
    await userEvent.type(name, "Grace Hopper");

    const submit = c.getByRole("button", { name: /submit/i });
    await userEvent.click(submit);

    expect(c.getByTestId("submitted-value").textContent).toContain("Grace Hopper");
  },
};

/**
 * onSubmit handler that prevents the native navigation/reload and toggles a
 * "submitted" confirmation message
 */
export const OnSubmitPreventsDefaultNavigation: Story = {
  render: (args) => {
    const PreventDefaultFixture = () => {
      const [wasSubmitted, setWasSubmitted] = useState(false);

      return (
        <Form
          {...args}
          onSubmit={(e) => {
            e.preventDefault();
            setWasSubmitted(true);
          }}
        >
          <ark.div>
            <Label htmlFor="prevent-default-email">Email</Label>
            <Input id="prevent-default-email" type="email" placeholder="you@example.com" />
          </ark.div>
          <ark.button type="submit" style={submitButtonStyle}>
            Subscribe
          </ark.button>
          <ark.p data-testid="submission-status" style={{ margin: 0, fontSize: "13px" }}>
            {wasSubmitted ? "Thanks for subscribing!" : "Not submitted yet"}
          </ark.p>
        </Form>
      );
    };

    return <PreventDefaultFixture />;
  },
  args: {
    inverted: false,
    gap: "16px",
  },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    expect(c.getByTestId("submission-status").textContent).toBe("Not submitted yet");

    const submit = c.getByRole("button", { name: /subscribe/i });
    await userEvent.click(submit);

    expect(c.getByTestId("submission-status").textContent).toBe(
      "Thanks for subscribing!"
    );
  },
};

/* -------------------------------------------------------------------------
 * Composing sibling Form-directory components as children
 * ---------------------------------------------------------------------- */

/**
 * Form combining an Input/Label pair with a Checkbox field
 */
export const WithCheckboxField: Story = {
  args: {
    inverted: false,
    gap: "16px",
  },
  render: (args) => (
    <Form {...args}>
      <ark.div>
        <Label htmlFor="checkbox-form-email">Email</Label>
        <Input id="checkbox-form-email" type="email" placeholder="you@example.com" />
      </ark.div>
      <Checkbox name="newsletter">Subscribe to the newsletter</Checkbox>
      <ark.button type="submit" style={submitButtonStyle}>
        Save Preferences
      </ark.button>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const checkbox = c.getByText(/subscribe to the newsletter/i);
    expect(checkbox).toBeTruthy();
  },
};

/**
 * Form combining an Input field with a TextArea field
 */
export const WithTextAreaField: Story = {
  args: {
    inverted: false,
    gap: "16px",
  },
  render: (args) => (
    <Form {...args} style={{ minWidth: "380px" }}>
      <ark.div>
        <Label htmlFor="textarea-form-subject">Subject</Label>
        <Input id="textarea-form-subject" type="text" placeholder="Subject" />
      </ark.div>
      <TextArea id="textarea-form-body" label="Message" placeholder="Write your message" rows={4} />
      <ark.button type="submit" style={submitButtonStyle}>
        Send
      </ark.button>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const body = c.getByLabelText(/message/i) as HTMLTextAreaElement;
    await userEvent.type(body, "Hello there");
    expect(body.value).toBe("Hello there");
  },
};

/**
 * Form combining a SearchBar with a regular Input
 */
export const WithSearchBarField: Story = {
  args: {
    inverted: false,
    gap: "16px",
  },
  render: (args) => (
    <Form {...args} style={{ minWidth: "380px" }}>
      <SearchBar id="searchbar-form-query" label="Search" placeholder="Search products" />
      <ark.div>
        <Label htmlFor="searchbar-form-category">Category</Label>
        <Input id="searchbar-form-category" type="text" placeholder="Category" />
      </ark.div>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const search = c.getByRole("searchbox") as HTMLInputElement;
    await userEvent.type(search, "keyboard");
    expect(search.value).toBe("keyboard");
  },
};

/**
 * Form displaying a read-only summary of selected Chips
 */
export const WithChipDisplay: Story = {
  args: {
    inverted: false,
    gap: "16px",
  },
  render: (args) => (
    <Form {...args}>
      <ark.div>
        <Label htmlFor="chip-display-title">Ticket Title</Label>
        <Input id="chip-display-title" type="text" placeholder="Ticket title" />
      </ark.div>
      <ark.div style={{ display: "flex", gap: "8px" }}>
        <Chip status="info">Bug</Chip>
        <Chip status="warning">Needs Review</Chip>
        <Chip status="success">Approved</Chip>
      </ark.div>
      <ark.button type="submit" style={submitButtonStyle}>
        Create Ticket
      </ark.button>
    </Form>
  ),
};

/**
 * Form using ChipInput for free-text tag entry
 */
export const WithChipInputField: Story = {
  args: {
    inverted: false,
    gap: "16px",
  },
  render: (args) => (
    <Form {...args} style={{ minWidth: "380px" }}>
      <ark.div>
        <Label htmlFor="chipinput-form-title">Title</Label>
        <Input id="chipinput-form-title" type="text" placeholder="Article title" />
      </ark.div>
      <ChipInput id="chipinput-form-tags" label="Tags" placeholder="Add a tag" defaultValue={["react"]} />
      <ark.button type="submit" style={submitButtonStyle}>
        Publish
      </ark.button>
    </Form>
  ),
};

/**
 * Kitchen-sink form combining every sibling Form-directory component
 */
export const KitchenSinkAllFieldTypes: Story = {
  args: {
    inverted: false,
    gap: "16px",
  },
  render: (args) => (
    <Form {...args} style={{ minWidth: "420px" }}>
      <ark.h2 style={{ margin: 0, fontSize: "18px", fontWeight: 600 }}>
        Kitchen Sink
      </ark.h2>
      <ark.div>
        <Label htmlFor="kitchen-sink-name">Full Name</Label>
        <Input id="kitchen-sink-name" type="text" placeholder="Full name" />
      </ark.div>
      <SearchBar id="kitchen-sink-search" label="Search" placeholder="Search" />
      <TextArea id="kitchen-sink-bio" label="Bio" placeholder="Tell us about yourself" rows={3} />
      <ChipInput id="kitchen-sink-tags" label="Skills" placeholder="Add a skill" defaultValue={["TypeScript"]} />
      <ark.div style={{ display: "flex", gap: "8px" }}>
        <Chip status="info">Design</Chip>
        <Chip status="success">Engineering</Chip>
      </ark.div>
      <Checkbox name="kitchen-sink-terms">I agree to the Terms and Conditions</Checkbox>
      <ark.button type="submit" style={submitButtonStyle}>
        Submit Everything
      </ark.button>
    </Form>
  ),
};

/* -------------------------------------------------------------------------
 * Long content / scroll
 * ---------------------------------------------------------------------- */

/**
 * Form whose content overflows a fixed-height scroll container
 */
export const LongContentWithScroll: Story = {
  args: {
    inverted: false,
    gap: "12px",
  },
  render: (args) => (
    <ark.div style={{ maxHeight: "320px", overflowY: "auto" }}>
      <Form {...args} style={{ minWidth: "340px" }}>
        {Array.from({ length: 20 }, (_, index) => index + 1).map((n) => (
          <ark.div key={n}>
            <Label htmlFor={`scroll-field-${n}`}>{`Field ${n}`}</Label>
            <Input id={`scroll-field-${n}`} type="text" placeholder={`Value ${n}`} />
          </ark.div>
        ))}
        <ark.button type="submit" style={submitButtonStyle}>
          Submit
        </ark.button>
      </Form>
    </ark.div>
  ),
  play: async ({ canvasElement }) => {
    const form = canvasElement.querySelector("form") as HTMLFormElement;
    expect(form.querySelectorAll("input").length).toBe(20);
  },
};

/* -------------------------------------------------------------------------
 * RTL / unicode content
 * ---------------------------------------------------------------------- */

/**
 * Form with right-to-left Arabic labels and content
 */
export const RTLArabicLabels: Story = {
  args: {
    inverted: false,
    gap: "16px",
  },
  render: (args) => (
    <ark.div dir="rtl">
      <Form {...args}>
        <ark.div>
          <Label htmlFor="rtl-name">الاسم الكامل</Label>
          <Input id="rtl-name" type="text" placeholder="أدخل اسمك" />
        </ark.div>
        <ark.div>
          <Label htmlFor="rtl-email">البريد الإلكتروني</Label>
          <Input id="rtl-email" type="email" placeholder="example@example.com" />
        </ark.div>
        <ark.button type="submit" style={submitButtonStyle}>
          إرسال
        </ark.button>
      </Form>
    </ark.div>
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    expect(c.getByText("الاسم الكامل")).toBeTruthy();
    expect(c.getByRole("button", { name: "إرسال" })).toBeTruthy();
  },
};

/**
 * Form with emoji and mixed-unicode labels
 */
export const UnicodeEmojiLabels: Story = {
  args: {
    inverted: false,
    gap: "16px",
  },
  render: (args) => (
    <Form {...args}>
      <ark.div>
        <Label htmlFor="emoji-name">👤 Name</Label>
        <Input id="emoji-name" type="text" placeholder="Your name" />
      </ark.div>
      <ark.div>
        <Label htmlFor="emoji-email">📧 Email</Label>
        <Input id="emoji-email" type="email" placeholder="you@example.com" />
      </ark.div>
      <ark.button type="submit" style={submitButtonStyle}>
        🚀 Launch
      </ark.button>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    expect(c.getByText("👤 Name")).toBeTruthy();
    expect(c.getByRole("button", { name: "🚀 Launch" })).toBeTruthy();
  },
};

/* -------------------------------------------------------------------------
 * Disabled fields
 * ---------------------------------------------------------------------- */

/**
 * Form with a mix of enabled and disabled fields
 */
export const DisabledFieldsForm: Story = {
  args: {
    inverted: false,
    gap: "16px",
  },
  render: (args) => (
    <Form {...args}>
      <ark.div>
        <Label htmlFor="disabled-mix-name">Name</Label>
        <Input id="disabled-mix-name" type="text" placeholder="Name" />
      </ark.div>
      <ark.div>
        <Label htmlFor="disabled-mix-plan">Plan (locked)</Label>
        <Input id="disabled-mix-plan" type="text" defaultValue="Pro" disabled />
      </ark.div>
      <Checkbox disabled name="disabled-mix-terms">
        Terms already accepted
      </Checkbox>
      <ark.button type="submit" style={submitButtonStyle}>
        Save
      </ark.button>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const plan = c.getByLabelText(/plan/i) as HTMLInputElement;
    expect(plan.disabled).toBe(true);
  },
};

/**
 * Form where every field, including the submit button, is disabled
 */
export const AllFieldsDisabled: Story = {
  args: {
    inverted: false,
    gap: "16px",
  },
  render: (args) => (
    <Form {...args}>
      <ark.div>
        <Label htmlFor="all-disabled-name">Name</Label>
        <Input id="all-disabled-name" type="text" placeholder="Name" disabled />
      </ark.div>
      <ark.div>
        <Label htmlFor="all-disabled-email">Email</Label>
        <Input id="all-disabled-email" type="email" placeholder="Email" disabled />
      </ark.div>
      <Checkbox disabled name="all-disabled-terms">
        Accept terms
      </Checkbox>
      <ark.button type="submit" style={submitButtonStyle} disabled>
        Submit
      </ark.button>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const form = canvasElement.querySelector("form") as HTMLFormElement;
    const inputs = Array.from(form.querySelectorAll("input"));
    expect(inputs.every((input) => input.disabled)).toBe(true);
  },
};

/* -------------------------------------------------------------------------
 * Native attribute passthrough via rest props
 * ---------------------------------------------------------------------- */

/**
 * Passes a native `id` attribute through to the underlying form element
 */
export const NativeAttributeId: Story = {
  args: {
    inverted: false,
    gap: "16px",
    id: "contact-native-form",
  },
  render: (args) => (
    <Form {...args}>
      <ark.div>
        <Label htmlFor="native-id-name">Name</Label>
        <Input id="native-id-name" type="text" placeholder="Name" />
      </ark.div>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const form = canvasElement.querySelector("form") as HTMLFormElement;
    expect(form.id).toBe("contact-native-form");
  },
};

/**
 * Passes a native `name` attribute through to the underlying form element
 */
export const NativeAttributeName: Story = {
  args: {
    inverted: false,
    gap: "16px",
    name: "signup-form",
  },
  render: (args) => (
    <Form {...args}>
      <ark.div>
        <Label htmlFor="native-name-email">Email</Label>
        <Input id="native-name-email" type="email" placeholder="Email" />
      </ark.div>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const form = canvasElement.querySelector("form") as HTMLFormElement;
    expect(form.getAttribute("name")).toBe("signup-form");
  },
};

/**
 * Passes the native `noValidate` attribute through, disabling native
 * browser validation UI
 */
export const NativeAttributeNoValidate: Story = {
  args: {
    inverted: false,
    gap: "16px",
    noValidate: true,
  },
  render: (args) => (
    <Form {...args}>
      <ark.div>
        <Label htmlFor="native-novalidate-email">Email</Label>
        <Input id="native-novalidate-email" type="email" required placeholder="Email" />
      </ark.div>
      <ark.button type="submit" style={submitButtonStyle}>
        Submit
      </ark.button>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const form = canvasElement.querySelector("form") as HTMLFormElement;
    expect(form.noValidate).toBe(true);
  },
};

/**
 * Passes `autoComplete="on"` through to the underlying form element
 */
export const NativeAttributeAutoComplete: Story = {
  args: {
    inverted: false,
    gap: "16px",
    autoComplete: "on",
  },
  render: (args) => (
    <Form {...args}>
      <ark.div>
        <Label htmlFor="native-autocomplete-on-name">Name</Label>
        <Input id="native-autocomplete-on-name" type="text" placeholder="Name" />
      </ark.div>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const form = canvasElement.querySelector("form") as HTMLFormElement;
    expect(form.getAttribute("autocomplete")).toBe("on");
  },
};

/**
 * Passes `autoComplete="off"` through to the underlying form element
 */
export const NativeAttributeAutoCompleteOff: Story = {
  args: {
    inverted: false,
    gap: "16px",
    autoComplete: "off",
  },
  render: (args) => (
    <Form {...args}>
      <ark.div>
        <Label htmlFor="native-autocomplete-off-name">Name</Label>
        <Input id="native-autocomplete-off-name" type="text" placeholder="Name" />
      </ark.div>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const form = canvasElement.querySelector("form") as HTMLFormElement;
    expect(form.getAttribute("autocomplete")).toBe("off");
  },
};

/**
 * Combines several native attributes passed through rest props at once
 */
export const CombinedNativeAttributes: Story = {
  args: {
    inverted: false,
    gap: "16px",
    id: "combined-native-form",
    name: "combined-native",
    noValidate: true,
    autoComplete: "off",
  },
  render: (args) => (
    <Form {...args}>
      <ark.div>
        <Label htmlFor="combined-native-name">Name</Label>
        <Input id="combined-native-name" type="text" required placeholder="Name" />
      </ark.div>
      <ark.button type="submit" style={submitButtonStyle}>
        Submit
      </ark.button>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const form = canvasElement.querySelector("form") as HTMLFormElement;
    expect(form.id).toBe("combined-native-form");
    expect(form.getAttribute("name")).toBe("combined-native");
    expect(form.noValidate).toBe(true);
    expect(form.getAttribute("autocomplete")).toBe("off");
  },
};

/* -------------------------------------------------------------------------
 * Inverted crossed with other scenarios
 * ---------------------------------------------------------------------- */

/**
 * Inverted form with no fields
 */
export const InvertedEmptyForm: Story = {
  args: {
    inverted: true,
  },
  render: (args) => <Form {...args}>{null}</Form>,
};

/**
 * Inverted form with a single field
 */
export const InvertedSingleField: Story = {
  args: {
    inverted: true,
    gap: "16px",
  },
  render: (args) => (
    <Form {...args}>
      <ark.div>
        <Label htmlFor="inverted-single-field" inverted>
          Nickname
        </Label>
        <Input id="inverted-single-field" type="text" placeholder="Nickname" inverted />
      </ark.div>
    </Form>
  ),
};

/**
 * Inverted form with many fields
 */
export const InvertedManyFields: Story = {
  args: {
    inverted: true,
    gap: "12px",
  },
  render: (args) => (
    <Form {...args} style={{ minWidth: "360px" }}>
      {["First Name", "Last Name", "Email", "Phone", "Company"].map((label) => {
        const id = `inverted-many-${label.toLowerCase().replace(/\s+/g, "-")}`;
        return (
          <ark.div key={id}>
            <Label htmlFor={id} inverted>
              {label}
            </Label>
            <Input id={id} type="text" placeholder={label} inverted />
          </ark.div>
        );
      })}
      <ark.button type="submit" style={invertedSubmitButtonStyle}>
        Submit
      </ark.button>
    </Form>
  ),
};

/**
 * Inverted form using nested fieldsets
 */
export const InvertedNestedFieldsets: Story = {
  args: {
    inverted: true,
    gap: "16px",
  },
  render: (args) => (
    <Form {...args} style={{ minWidth: "380px" }}>
      <ark.fieldset
        style={{ border: "1px solid #4b5563", borderRadius: "6px", padding: "12px" }}
      >
        <ark.legend style={{ fontSize: "14px", fontWeight: 600, padding: "0 4px", color: "#f9fafb" }}>
          Account
        </ark.legend>
        <ark.div>
          <Label htmlFor="inverted-nested-username" inverted>
            Username
          </Label>
          <Input id="inverted-nested-username" type="text" placeholder="Username" inverted />
        </ark.div>
        <ark.fieldset
          style={{
            border: "1px solid #374151",
            borderRadius: "6px",
            padding: "12px",
            marginTop: "12px",
          }}
        >
          <ark.legend style={{ fontSize: "12px", fontWeight: 600, padding: "0 4px", color: "#f9fafb" }}>
            Security
          </ark.legend>
          <ark.div>
            <Label htmlFor="inverted-nested-password" inverted>
              Password
            </Label>
            <Input id="inverted-nested-password" type="password" placeholder="Password" inverted />
          </ark.div>
        </ark.fieldset>
      </ark.fieldset>
      <ark.button type="submit" style={invertedSubmitButtonStyle}>
        Save
      </ark.button>
    </Form>
  ),
};

/**
 * Inverted form with disabled fields
 */
export const InvertedDisabledFields: Story = {
  args: {
    inverted: true,
    gap: "16px",
  },
  render: (args) => (
    <Form {...args}>
      <ark.div>
        <Label htmlFor="inverted-disabled-name" inverted>
          Name
        </Label>
        <Input id="inverted-disabled-name" type="text" placeholder="Name" inverted disabled />
      </ark.div>
      <Checkbox disabled name="inverted-disabled-terms">
        Terms already accepted
      </Checkbox>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const name = c.getByLabelText(/name/i) as HTMLInputElement;
    expect(name.disabled).toBe(true);
  },
};

/**
 * Inverted kitchen-sink form combining every sibling component
 */
export const InvertedKitchenSink: Story = {
  args: {
    inverted: true,
    gap: "16px",
  },
  render: (args) => (
    <Form {...args} style={{ minWidth: "420px" }}>
      <ark.div>
        <Label htmlFor="inverted-kitchen-sink-name" inverted>
          Full Name
        </Label>
        <Input id="inverted-kitchen-sink-name" type="text" placeholder="Full name" inverted />
      </ark.div>
      <SearchBar id="inverted-kitchen-sink-search" label="Search" placeholder="Search" inverted />
      <TextArea
        id="inverted-kitchen-sink-bio"
        label="Bio"
        placeholder="Tell us about yourself"
        rows={3}
        inverted
      />
      <ChipInput
        id="inverted-kitchen-sink-tags"
        label="Skills"
        placeholder="Add a skill"
        defaultValue={["TypeScript"]}
        inverted
      />
      <ark.div style={{ display: "flex", gap: "8px" }}>
        <Chip status="info" inverted>
          Design
        </Chip>
        <Chip status="success" inverted>
          Engineering
        </Chip>
      </ark.div>
      <Checkbox name="inverted-kitchen-sink-terms">I agree to the Terms and Conditions</Checkbox>
      <ark.button type="submit" style={invertedSubmitButtonStyle}>
        Submit Everything
      </ark.button>
    </Form>
  ),
};

/**
 * Inverted form wired with an onSubmit handler that prevents default and
 * captures the submitted value
 */
export const InvertedOnSubmit: Story = {
  render: (args) => {
    const InvertedOnSubmitFixture = () => {
      const [submitted, setSubmitted] = useState<string | null>(null);

      return (
        <Form
          {...args}
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            setSubmitted(String(data.get("inverted-captured-name") ?? ""));
          }}
        >
          <ark.div>
            <Label htmlFor="inverted-captured-name" inverted>
              Name
            </Label>
            <Input
              id="inverted-captured-name"
              name="inverted-captured-name"
              type="text"
              placeholder="Name"
              inverted
            />
          </ark.div>
          <ark.button type="submit" style={invertedSubmitButtonStyle}>
            Submit
          </ark.button>
          {submitted !== null && (
            <ark.p
              data-testid="inverted-submitted-value"
              style={{ margin: 0, fontSize: "13px", color: "#f9fafb" }}
            >
              Submitted: {submitted}
            </ark.p>
          )}
        </Form>
      );
    };

    return <InvertedOnSubmitFixture />;
  },
  args: {
    inverted: true,
    gap: "16px",
  },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const name = c.getByLabelText(/name/i) as HTMLInputElement;
    await userEvent.type(name, "Ada Lovelace");

    const submit = c.getByRole("button", { name: /submit/i });
    await userEvent.click(submit);

    expect(c.getByTestId("inverted-submitted-value").textContent).toContain(
      "Ada Lovelace"
    );
  },
};

/**
 * Inverted form with a numeric gap value
 */
export const InvertedNumericGap: Story = {
  args: {
    inverted: true,
    gap: 28,
  },
  render: (args) => (
    <Form {...args}>
      <ark.div>
        <Label htmlFor="inverted-numeric-gap-a" inverted>
          First Field
        </Label>
        <Input id="inverted-numeric-gap-a" type="text" placeholder="First" inverted />
      </ark.div>
      <ark.div>
        <Label htmlFor="inverted-numeric-gap-b" inverted>
          Second Field
        </Label>
        <Input id="inverted-numeric-gap-b" type="text" placeholder="Second" inverted />
      </ark.div>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const form = canvasElement.querySelector("form") as HTMLFormElement;
    expect(form.style.gap).toBe("28px");
  },
};

/* -------------------------------------------------------------------------
 * Additional grouping / realistic composite forms
 * ---------------------------------------------------------------------- */

/**
 * Form with multiple sibling fieldset sections (as opposed to nested ones)
 */
export const MultiSectionFieldsets: Story = {
  args: {
    inverted: false,
    gap: "20px",
  },
  render: (args) => (
    <Form {...args} style={{ minWidth: "400px" }}>
      <ark.fieldset style={{ border: "1px solid #d1d5db", borderRadius: "6px", padding: "12px" }}>
        <ark.legend style={{ fontSize: "14px", fontWeight: 600, padding: "0 4px" }}>
          Personal Details
        </ark.legend>
        <ark.div>
          <Label htmlFor="multi-section-name">Full Name</Label>
          <Input id="multi-section-name" type="text" placeholder="Full name" />
        </ark.div>
      </ark.fieldset>
      <ark.fieldset style={{ border: "1px solid #d1d5db", borderRadius: "6px", padding: "12px" }}>
        <ark.legend style={{ fontSize: "14px", fontWeight: 600, padding: "0 4px" }}>
          Shipping Address
        </ark.legend>
        <ark.div>
          <Label htmlFor="multi-section-address">Address</Label>
          <Input id="multi-section-address" type="text" placeholder="Address" />
        </ark.div>
      </ark.fieldset>
      <ark.button type="submit" style={submitButtonStyle}>
        Continue
      </ark.button>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const form = canvasElement.querySelector("form") as HTMLFormElement;
    expect(form.querySelectorAll("fieldset").length).toBe(2);
  },
};

/**
 * A search-and-filter style form combining SearchBar with selectable Chips
 */
export const SearchAndFilterForm: Story = {
  render: (args) => {
    const SearchAndFilterFixture = () => {
      const [selected, setSelected] = useState<string | null>("Newest");

      return (
        <Form {...args} style={{ minWidth: "380px" }}>
          <SearchBar id="search-filter-query" label="Search" placeholder="Search items" />
          <ark.div style={{ display: "flex", gap: "8px" }}>
            {["Newest", "Popular", "Price"].map((filter) => (
              <Chip
                key={filter}
                selected={selected === filter}
                onClick={() => setSelected(filter)}
              >
                {filter}
              </Chip>
            ))}
          </ark.div>
        </Form>
      );
    };

    return <SearchAndFilterFixture />;
  },
  args: {
    inverted: false,
    gap: "16px",
  },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const popular = c.getByRole("button", { name: "Popular" });
    await userEvent.click(popular);
    expect(popular).toHaveAttribute("aria-pressed", "true");
  },
};

/**
 * A profile-editing form combining Input, TextArea and Checkbox
 */
export const ProfileEditForm: Story = {
  args: {
    inverted: false,
    gap: "16px",
  },
  render: (args) => (
    <Form {...args} style={{ minWidth: "400px" }}>
      <ark.div>
        <Label htmlFor="profile-edit-name">Display Name</Label>
        <Input id="profile-edit-name" type="text" placeholder="Display name" />
      </ark.div>
      <TextArea id="profile-edit-bio" label="Bio" placeholder="A short bio" rows={3} />
      <Checkbox name="profile-edit-public">Make my profile public</Checkbox>
      <ark.button type="submit" style={submitButtonStyle}>
        Update Profile
      </ark.button>
    </Form>
  ),
};

/**
 * A subscription-preferences form built from a list of Checkbox fields
 */
export const SubscriptionPreferencesForm: Story = {
  args: {
    inverted: false,
    gap: "12px",
  },
  render: (args) => (
    <Form {...args}>
      <ark.h2 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>
        Email Preferences
      </ark.h2>
      <Checkbox name="pref-product">Product updates</Checkbox>
      <Checkbox name="pref-marketing">Marketing emails</Checkbox>
      <Checkbox name="pref-security">Security alerts</Checkbox>
      <ark.button type="submit" style={submitButtonStyle}>
        Save Preferences
      </ark.button>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const security = c.getByText(/security alerts/i);
    await userEvent.click(security);
  },
};

/**
 * A feedback form combining a TextArea with status Chips representing a
 * category selector
 */
export const FeedbackFormWithStatusChips: Story = {
  args: {
    inverted: false,
    gap: "16px",
  },
  render: (args) => (
    <Form {...args} style={{ minWidth: "380px" }}>
      <ark.div style={{ display: "flex", gap: "8px" }}>
        <Chip status="info">Question</Chip>
        <Chip status="warning">Bug</Chip>
        <Chip status="error">Blocker</Chip>
      </ark.div>
      <TextArea id="feedback-chips-message" label="Feedback" placeholder="Describe the issue" rows={4} />
      <ark.button type="submit" style={submitButtonStyle}>
        Send Feedback
      </ark.button>
    </Form>
  ),
};

/**
 * Form whose style prop overrides the default minWidth
 */
export const WideFormCustomMinWidth: Story = {
  args: {
    inverted: false,
    gap: "16px",
  },
  render: (args) => (
    <Form {...args} style={{ minWidth: "600px" }}>
      <ark.div>
        <Label htmlFor="wide-form-name">Name</Label>
        <Input id="wide-form-name" type="text" placeholder="Name" />
      </ark.div>
      <ark.div>
        <Label htmlFor="wide-form-email">Email</Label>
        <Input id="wide-form-email" type="email" placeholder="Email" />
      </ark.div>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const form = canvasElement.querySelector("form") as HTMLFormElement;
    expect(form.style.minWidth).toBe("600px");
  },
};

/**
 * Accessible fieldset with a legend and a described-by help message
 */
export const AccessibleFieldsetWithLegend: Story = {
  args: {
    inverted: false,
    gap: "16px",
  },
  render: (args) => (
    <Form {...args} style={{ minWidth: "380px" }}>
      <ark.fieldset
        style={{ border: "1px solid #d1d5db", borderRadius: "6px", padding: "12px" }}
      >
        <ark.legend style={{ fontSize: "14px", fontWeight: 600, padding: "0 4px" }}>
          Payment Details
        </ark.legend>
        <ark.div>
          <Label htmlFor="accessible-fieldset-card">Card Number</Label>
          <Input
            id="accessible-fieldset-card"
            type="text"
            placeholder="1234 5678 9012 3456"
            aria-describedby="accessible-fieldset-help"
          />
          <ark.p
            id="accessible-fieldset-help"
            style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#6b7280" }}
          >
            Your card number is 16 digits, usually found on the front of your card.
          </ark.p>
        </ark.div>
      </ark.fieldset>
      <ark.button type="submit" style={submitButtonStyle}>
        Pay Now
      </ark.button>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const card = c.getByLabelText(/card number/i);
    expect(card).toHaveAttribute("aria-describedby", "accessible-fieldset-help");
  },
};
