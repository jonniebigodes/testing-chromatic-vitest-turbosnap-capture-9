import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, within, userEvent, expect } from "storybook/test";
import { useState } from "react";
import Footer from "./Footer";
import { ark } from "@ark-ui/react/factory";

const meta = {
  title: "Components/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "color",
      description: "Background color of the footer",
    },
    label: {
      control: "text",
      description: "Label text displayed in the footer",
    },
    children: {
      control: "object",
      description: "Array of link labels to populate the footer",
    },
    inverted: {
      control: "boolean",
      description: "Renders the footer in inverted colors",
    },
    onLinkClick: {
      description: "Callback when a link is clicked",
    },
  },
  args: {
    onLinkClick: fn(),
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default footer with dark background and copyright text
 */
export const Default: Story = {
  args: {
    color: "#1f2937",
    label: "© 2025 Company Name. All rights reserved.",
    children: [],
    inverted: false,
  },
  render: (args) => (
    <ark.div
      style={{ minHeight: "400px", display: "flex", flexDirection: "column" }}
    >
      <ark.div style={{ flex: 1, padding: "32px", backgroundColor: "#f9fafb" }}>
        <ark.h1 style={{ color: "#1f2937" }}>Page Content</ark.h1>
        <ark.p style={{ color: "#6b7280" }}>
          This is sample page content. Scroll down to see the footer.
        </ark.p>
      </ark.div>
      <Footer {...args} />
    </ark.div>
  ),
};

/**
 * Footer with custom blue color
 */
export const CustomColor: Story = {
  args: {
    color: "#1e40af",
    label: "© 2025 Blue Corp. All rights reserved.",
    children: [],
    inverted: false,
  },
  render: (args) => (
    <ark.div
      style={{ minHeight: "400px", display: "flex", flexDirection: "column" }}
    >
      <ark.div style={{ flex: 1, padding: "32px", backgroundColor: "#f9fafb" }}>
        <ark.h1 style={{ color: "#1f2937" }}>Page Content</ark.h1>
        <ark.p style={{ color: "#6b7280" }}>
          Footer with custom blue background.
        </ark.p>
      </ark.div>
      <Footer {...args} />
    </ark.div>
  ),
};

/**
 * Footer with custom green color
 */
export const GreenColor: Story = {
  args: {
    color: "#047857",
    label: "© 2025 Green Solutions. All rights reserved.",
    children: [],
    inverted: false,
  },
  render: (args) => (
    <ark.div
      style={{ minHeight: "400px", display: "flex", flexDirection: "column" }}
    >
      <ark.div style={{ flex: 1, padding: "32px", backgroundColor: "#f9fafb" }}>
        <ark.h1 style={{ color: "#1f2937" }}>Page Content</ark.h1>
        <ark.p style={{ color: "#6b7280" }}>
          Footer with custom green background.
        </ark.p>
      </ark.div>
      <Footer {...args} />
    </ark.div>
  ),
};

/**
 * Footer with inverted colors (light background)
 */
export const Inverted: Story = {
  args: {
    color: "#ffffff",
    label: "© 2025 Light Theme Inc. All rights reserved.",
    children: [],
    inverted: true,
  },
  render: (args) => (
    <ark.div
      style={{ minHeight: "400px", display: "flex", flexDirection: "column" }}
    >
      <ark.div style={{ flex: 1, padding: "32px", backgroundColor: "#1f2937" }}>
        <ark.h1 style={{ color: "#ffffff" }}>Page Content</ark.h1>
        <ark.p style={{ color: "#d1d5db" }}>
          Dark page content with inverted footer (light background).
        </ark.p>
      </ark.div>
      <Footer {...args} />
    </ark.div>
  ),
};

/**
 * Footer with links populated
 */
export const WithLinks: Story = {
  args: {
    color: "#1f2937",
    label: "© 2025 Acme Corporation. All rights reserved.",
    children: [
      "About Us",
      "Contact",
      "Privacy Policy",
      "Terms of Service",
      "Careers",
    ],
    inverted: false,
  },
  render: (args) => (
    <ark.div
      style={{ minHeight: "400px", display: "flex", flexDirection: "column" }}
    >
      <ark.div style={{ flex: 1, padding: "32px", backgroundColor: "#f9fafb" }}>
        <ark.h1 style={{ color: "#1f2937" }}>Page Content</ark.h1>
        <ark.p style={{ color: "#6b7280" }}>
          Footer with navigation links.
        </ark.p>
      </ark.div>
      <Footer {...args} />
    </ark.div>
  ),
};

/**
 * Footer with many links
 */
export const ManyLinks: Story = {
  args: {
    color: "#1f2937",
    label: "© 2025 Global Corp. All rights reserved.",
    children: [
      "Home",
      "About",
      "Services",
      "Products",
      "Blog",
      "Contact",
      "Support",
      "FAQ",
      "Privacy",
      "Terms",
    ],
    inverted: false,
  },
  render: (args) => (
    <ark.div
      style={{ minHeight: "400px", display: "flex", flexDirection: "column" }}
    >
      <ark.div style={{ flex: 1, padding: "32px", backgroundColor: "#f9fafb" }}>
        <ark.h1 style={{ color: "#1f2937" }}>Page Content</ark.h1>
        <ark.p style={{ color: "#6b7280" }}>
          Footer with multiple navigation links.
        </ark.p>
      </ark.div>
      <Footer {...args} />
    </ark.div>
  ),
};

/**
 * Footer with links and custom callback
 */
export const WithCallback: Story = {
  args: {
    color: "#7c3aed",
    label: "© 2025 Interactive Inc. All rights reserved.",
    children: ["Help Center", "Documentation", "API", "Status"],
    inverted: false,
    onLinkClick: fn((link) => {
      alert(`Clicked: ${link}`);
    }),
  },
  render: (args) => (
    <ark.div
      style={{ minHeight: "400px", display: "flex", flexDirection: "column" }}
    >
      <ark.div style={{ flex: 1, padding: "32px", backgroundColor: "#f9fafb" }}>
        <ark.h1 style={{ color: "#1f2937" }}>Page Content</ark.h1>
        <ark.p style={{ color: "#6b7280" }}>
          Click on footer links to trigger callback.
        </ark.p>
      </ark.div>
      <Footer {...args} />
    </ark.div>
  ),
};

/**
 * Inverted footer with links
 */
export const InvertedWithLinks: Story = {
  args: {
    color: "#ffffff",
    label: "© 2025 Modern App. All rights reserved.",
    children: ["Features", "Pricing", "Blog", "Support"],
    inverted: true,
  },
  render: (args) => (
    <ark.div
      style={{ minHeight: "400px", display: "flex", flexDirection: "column" }}
    >
      <ark.div
        style={{
          flex: 1,
          padding: "32px",
          backgroundColor: "#111827",
        }}
      >
        <ark.h1 style={{ color: "#ffffff" }}>Page Content</ark.h1>
        <ark.p style={{ color: "#d1d5db" }}>
          Dark theme with inverted footer and links.
        </ark.p>
      </ark.div>
      <Footer {...args} />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * Individual prop coverage (8)
 * ---------------------------------------------------------------------- */

/**
 * Footer rendered with the `label` prop omitted, falling back to the
 * component's default copyright text
 */
export const DefaultLabelOmitted: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("© 2025 Company Name. All rights reserved.")
    ).toBeInTheDocument();
  },
};

/**
 * Footer with a custom, non-default label string
 */
export const CustomLabelText: Story = {
  args: {
    label: "Made with care by the Platform Team",
  },
};

/**
 * Footer with an empty string label
 */
export const EmptyLabelString: Story = {
  args: {
    label: "",
  },
};

/**
 * Footer with exactly one link
 */
export const SingleLink: Story = {
  args: {
    children: ["Privacy Policy"],
  },
};

/**
 * Footer with exactly two links
 */
export const TwoLinks: Story = {
  args: {
    children: ["About", "Contact"],
  },
};

/**
 * Footer where `onLinkClick` is explicitly not provided
 */
export const NoOnLinkClickHandler: Story = {
  args: {
    onLinkClick: undefined,
    children: ["Terms", "Privacy"],
  },
};

/**
 * Footer with `inverted` explicitly set to false (same as default, but
 * asserted explicitly rather than relying on the default)
 */
export const InvertedFalseExplicit: Story = {
  args: {
    inverted: false,
    children: ["Home"],
  },
};

/**
 * Footer with the `children` prop entirely omitted (as opposed to an
 * explicit empty array), exercising the default-parameter fallback to `[]`
 */
export const ChildrenOmitted: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    expect(canvasElement.querySelector("nav")).toBeNull();
  },
};

/* -------------------------------------------------------------------------
 * Custom color value formats (4)
 * ---------------------------------------------------------------------- */

/**
 * Background color supplied as an `rgb()` string
 */
export const RgbColorValue: Story = {
  args: {
    color: "rgb(124, 58, 237)",
    label: "© 2025 RGB Corp.",
  },
};

/**
 * Background color supplied as an `hsl()` string
 */
export const HslColorValue: Story = {
  args: {
    color: "hsl(280, 65%, 60%)",
    label: "© 2025 HSL Corp.",
  },
};

/**
 * Background color supplied as a CSS named color
 */
export const NamedColorValue: Story = {
  args: {
    color: "tomato",
    label: "© 2025 Named Color Corp.",
  },
};

/**
 * Background color supplied as a shorthand 3-digit hex value
 */
export const ShortHexColorValue: Story = {
  args: {
    color: "#123",
    label: "© 2025 Short Hex Corp.",
  },
};

/* -------------------------------------------------------------------------
 * Inverted combinations (3)
 * ---------------------------------------------------------------------- */

/**
 * Inverted footer with no links at all
 */
export const InvertedNoLinks: Story = {
  args: {
    inverted: true,
    children: [],
    label: "© 2025 Minimal Inverted Corp.",
  },
};

/**
 * Inverted footer with a `color` prop set: the background always renders
 * white when inverted, regardless of the `color` value supplied
 */
export const InvertedIgnoresColorProp: Story = {
  args: {
    inverted: true,
    color: "red",
    label: "© 2025 Ignored Color Corp.",
  },
  play: async ({ canvasElement }) => {
    const footer = canvasElement.querySelector("footer") as HTMLElement;
    await expect(footer).toHaveStyle({ backgroundColor: "#ffffff" });
  },
};

/**
 * Inverted footer with a large number of links
 */
export const InvertedManyLinks: Story = {
  args: {
    inverted: true,
    children: [
      "Home",
      "About",
      "Services",
      "Products",
      "Blog",
      "Contact",
      "Support",
      "FAQ",
    ],
    label: "© 2025 Inverted Global Corp.",
  },
};

/* -------------------------------------------------------------------------
 * Label content edge cases (5)
 * ---------------------------------------------------------------------- */

/**
 * Extremely long label text wrapped inside a narrow container
 */
export const VeryLongLabelText: Story = {
  args: {
    label:
      "© 2025 Global Enterprise Holdings International Corporation Limited. All rights reserved worldwide. Unauthorized reproduction or distribution of this content is strictly prohibited.",
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "360px" }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Extremely short label text
 */
export const VeryShortLabelText: Story = {
  args: {
    label: "© 25",
  },
};

/**
 * Footer label rendered right-to-left with Arabic unicode text
 */
export const RTLLabelText: Story = {
  args: {
    label: "© 2025 جميع الحقوق محفوظة",
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
 * Footer label containing emoji alongside unicode text
 */
export const EmojiLabelText: Story = {
  args: {
    label: "🎉 Merci de votre visite ! 🚀 © 2025",
  },
};

/**
 * Footer links rendered with RTL Arabic and emoji text together
 */
export const RTLEmojiLinks: Story = {
  args: {
    label: "© 2025 شركة عالمية",
    children: ["الرئيسية 🏠", "من نحن ℹ️", "اتصل بنا 📞"],
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
 * Link list content variations (5)
 * ---------------------------------------------------------------------- */

/**
 * A large number of links inside a narrow container, exercising the
 * flex-wrap layout of the links row
 */
export const ManyLinksOverflowWrap: Story = {
  args: {
    children: [
      "Home",
      "About",
      "Services",
      "Products",
      "Blog",
      "Contact",
      "Support",
      "FAQ",
      "Privacy",
      "Terms",
      "Careers",
      "Press",
      "Partners",
      "Investors",
      "Sitemap",
      "Accessibility",
      "Cookies",
      "Security",
      "Status",
      "Community",
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "480px" }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * A single link with an unusually long label
 */
export const SingleVeryLongLinkText: Story = {
  args: {
    children: [
      "Read our complete and comprehensive terms of service and privacy policy document",
    ],
  },
};

/**
 * Links whose labels include emoji
 */
export const LinksWithEmoji: Story = {
  args: {
    children: ["🏠 Home", "ℹ️ About", "📞 Contact"],
  },
};

/**
 * Links whose labels are Arabic RTL text (no directional wrapper)
 */
export const LinksWithRTLText: Story = {
  args: {
    children: ["الرئيسية", "من نحن", "اتصل بنا"],
  },
};

/**
 * Two links sharing the exact same label text, verifying each rendered
 * instance can still be targeted and clicked independently
 */
export const DuplicateLinkLabels: Story = {
  args: {
    children: ["Home", "Home", "Contact"],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const homeLinks = canvas.getAllByText("Home");
    expect(homeLinks).toHaveLength(2);
    await userEvent.click(homeLinks[1]);
    expect(args.onLinkClick).toHaveBeenCalledWith("Home");
  },
};

/* -------------------------------------------------------------------------
 * onLinkClick interaction behavior (6)
 * ---------------------------------------------------------------------- */

/**
 * Clicking the first link calls `onLinkClick` with that link's label
 */
export const ClickFirstLinkCallsHandler: Story = {
  args: {
    children: ["About", "Contact", "Careers"],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("About"));
    expect(args.onLinkClick).toHaveBeenCalledWith("About");
  },
};

/**
 * Clicking multiple links in sequence calls `onLinkClick` once per click,
 * each time with the corresponding link's label, in order
 */
export const ClickEachLinkInOrder: Story = {
  args: {
    children: ["Home", "Blog", "Support"],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("Home"));
    await userEvent.click(canvas.getByText("Blog"));
    await userEvent.click(canvas.getByText("Support"));
    expect(args.onLinkClick).toHaveBeenNthCalledWith(1, "Home");
    expect(args.onLinkClick).toHaveBeenNthCalledWith(2, "Blog");
    expect(args.onLinkClick).toHaveBeenNthCalledWith(3, "Support");
    expect(args.onLinkClick).toHaveBeenCalledTimes(3);
  },
};

/**
 * Clicking a link still fires `onLinkClick` correctly when the footer is
 * inverted
 */
export const ClickLinkInInvertedMode: Story = {
  args: {
    inverted: true,
    children: ["Privacy"],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("Privacy"));
    expect(args.onLinkClick).toHaveBeenCalledWith("Privacy");
  },
};

/**
 * Clicking a link when no `onLinkClick` handler is provided does not throw
 */
export const ClickWithoutHandlerDoesNotThrow: Story = {
  args: {
    onLinkClick: undefined,
    children: ["Terms"],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByText("Terms");
    await expect(userEvent.click(link)).resolves.not.toThrow();
  },
};

/**
 * Hovering over a link applies the hover text-decoration and color styles
 */
export const HoverChangesLinkColor: Story = {
  args: {
    children: ["Docs"],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByText("Docs");
    await userEvent.hover(link);
    await expect(link).toHaveStyle({ textDecoration: "underline" });
  },
};

/**
 * Footer links render as anchor elements without an `href` attribute
 */
export const LinkRendersAsAnchorWithoutHref: Story = {
  args: {
    children: ["Learn More"],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByText("Learn More");
    expect(link.tagName).toBe("A");
    expect(link).not.toHaveAttribute("href");
  },
};

/* -------------------------------------------------------------------------
 * Kitchen-sink combinations (4)
 * ---------------------------------------------------------------------- */

/**
 * Kitchen sink: inverted, custom color (ignored while inverted), many
 * links, and a very long label
 */
export const KitchenSinkInvertedManyLinksLongLabel: Story = {
  args: {
    inverted: true,
    color: "#7c3aed",
    label:
      "© 2025 Kitchen Sink Global Enterprises Limited. All rights reserved across every jurisdiction in which we operate.",
    children: [
      "Home",
      "About",
      "Services",
      "Products",
      "Blog",
      "Contact",
      "Support",
      "FAQ",
    ],
  },
};

/**
 * Kitchen sink: default (non-inverted) color, a small number of links, and
 * an emoji label
 */
export const KitchenSinkDefaultFewLinksEmojiLabel: Story = {
  args: {
    children: ["Home", "About"],
    label: "🎉 © 2025 Kitchen Sink Inc. 🚀",
  },
};

/**
 * Kitchen sink: no links, inverted, and a custom label
 */
export const KitchenSinkNoLinksInvertedCustomLabel: Story = {
  args: {
    inverted: true,
    children: [],
    label: "Kitchen sink: inverted, no links, custom label",
  },
};

/**
 * Kitchen sink: RTL links combined with inverted styling and a custom color
 */
export const KitchenSinkRTLInvertedLinks: Story = {
  args: {
    inverted: true,
    color: "#059669",
    label: "© 2025 شركة عالمية",
    children: ["الرئيسية", "من نحن", "اتصل بنا"],
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
 * Default prop values (2)
 * ---------------------------------------------------------------------- */

/**
 * Every prop left at its default value
 */
export const AllPropsDefaulted: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("© 2025 Company Name. All rights reserved.")
    ).toBeInTheDocument();
    expect(canvasElement.querySelector("nav")).toBeNull();
  },
};

/**
 * Only `onLinkClick` and `children` are supplied; `color`, `label`, and
 * `inverted` remain at their defaults
 */
export const OnlyOnLinkClickProvided: Story = {
  args: {
    children: ["Contact"],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("Contact"));
    expect(args.onLinkClick).toHaveBeenCalledWith("Contact");
  },
};

/* -------------------------------------------------------------------------
 * Background/container context (3)
 * ---------------------------------------------------------------------- */

/**
 * Inverted footer rendered on a light page background
 */
export const OnLightPageBackground: Story = {
  args: {
    inverted: true,
    children: ["Docs", "Support"],
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: "#f9fafb", padding: "24px" }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Default (non-inverted) footer rendered on a dark page background
 */
export const OnDarkPageBackground: Story = {
  args: {
    children: ["Docs", "Support"],
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: "#0f172a", padding: "24px" }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Links forced to wrap onto multiple lines inside a narrow container
 */
export const NarrowContainerLinkWrap: Story = {
  args: {
    children: ["About", "Contact", "Privacy Policy", "Terms of Service"],
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "220px" }}>
        <Story />
      </div>
    ),
  ],
};

/* -------------------------------------------------------------------------
 * Miscellaneous edge cases (2)
 * ---------------------------------------------------------------------- */

/**
 * A whitespace-only label string
 */
export const WhitespaceOnlyLabel: Story = {
  args: {
    label: "   ",
  },
};

/**
 * Stateful fixture that tracks and displays the most recently clicked link,
 * mirroring a real consumer wiring `onLinkClick` up to local state
 */
export const LinkClickTrackerState: Story = {
  render: () => {
    const ClickTracker = () => {
      const [lastClicked, setLastClicked] = useState<string | null>(null);

      return (
        <div>
          <Footer
            color="#111827"
            label="© 2025 Tracker Inc."
            children={["Home", "About", "Contact"]}
            onLinkClick={(link) => setLastClicked(link)}
          />
          {lastClicked && (
            <p
              style={{
                textAlign: "center",
                padding: "8px",
                margin: 0,
                color: "#111827",
              }}
            >
              Last clicked: {lastClicked}
            </p>
          )}
        </div>
      );
    };

    return <ClickTracker />;
  },
};
