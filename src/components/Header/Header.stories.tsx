import type { Meta, StoryObj } from "@storybook/react-vite";
import Header from "./Header";
import type { HeaderLink } from "./Header";
import { ark } from "@ark-ui/react/factory";
import { fn, within, userEvent, expect } from "storybook/test";

const meta = {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Header title text",
    },
    links: {
      control: "object",
      description: "Array of {label, href} for navigation links",
    },
    isSticky: {
      control: "boolean",
      description: "Makes header sticky at top",
    },
    inverted: {
      control: "boolean",
      description: "Use inverted (dark) theme",
    },
    logo: {
      control: "text",
      description: "Logo image URL",
    },
    fullWidth: {
      control: "boolean",
      description: "Span full viewport width",
    },
    onLinkClick: {
      description: "Callback when a link is clicked",
    },
  },
  args: {
    onLinkClick: fn(),
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

const withContent = (args: Record<string, unknown>, bg = "#f9fafb") => (
  <ark.div style={{ minHeight: "200px", backgroundColor: bg }}>
    <Header {...args} />
    <ark.div style={{ padding: "16px" }}>
      <ark.p style={{ color: "#374151" }}>Main content below header…</ark.p>
    </ark.div>
  </ark.div>
);

const fourLinks: HeaderLink[] = [
  { label: "Home", href: "#" },
  { label: "Features", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "About", href: "#" },
];

const logoUrl =
  "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";

/** Default header */
export const Default: Story = {
  args: {
    title: "My App",
    links: [],
    isSticky: false,
    inverted: false,
    logo: undefined,
    fullWidth: false,
  },
  render: (args) => withContent(args),
};

/** Header with navigation links */
export const WithLinks: Story = {
  args: {
    title: "My App",
    links: fourLinks,
    isSticky: false,
    inverted: false,
    logo: logoUrl,
    fullWidth: false,
  },
  render: (args) => withContent(args),
};

/** Inverted (dark) header */
export const Inverted: Story = {
  args: {
    title: "Dark App",
    links: [
      { label: "Docs", href: "#" },
      { label: "API", href: "#" },
      { label: "Community", href: "#" },
    ],
    isSticky: true,
    inverted: true,
    logo: undefined,
    fullWidth: true,
  },
  render: (args) => withContent(args, "#111827"),
};

/* -------------------------------------------------------------------------
 * Title variations (6)
 * ---------------------------------------------------------------------- */

/** Header with a custom, short title */
export const CustomTitle: Story = {
  args: {
    title: "Acme Dashboard",
  },
};

/** Header rendered without a title prop, falling back to the default */
export const DefaultTitleFallback: Story = {
  args: {
    title: undefined,
  },
};

/** Header with a very long title that must not overflow awkwardly */
export const LongTitle: Story = {
  args: {
    title:
      "The Complete Enterprise Resource Planning and Customer Relationship Management Platform",
    links: fourLinks,
  },
};

/** Header with an empty string title */
export const EmptyTitleString: Story = {
  args: {
    title: "",
  },
};

/** Header title rendered with emoji alongside text */
export const TitleWithEmoji: Story = {
  args: {
    title: "🚀 Launchpad",
  },
};

/** Header title rendered right-to-left with Arabic unicode text */
export const TitleRTL: Story = {
  args: {
    title: "لوحة التحكم",
    links: [
      { label: "الرئيسية", href: "#" },
      { label: "الميزات", href: "#" },
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
 * Link count variations (5)
 * ---------------------------------------------------------------------- */

/** Header with an explicit empty links array (no nav rendered) */
export const NoLinksExplicitEmptyArray: Story = {
  args: {
    links: [],
  },
};

/** Header with a single navigation link */
export const SingleLink: Story = {
  args: {
    links: [{ label: "Home", href: "#" }],
  },
};

/** Header with exactly two navigation links */
export const TwoLinks: Story = {
  args: {
    links: [
      { label: "Home", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
};

/** Header with a large number of navigation links */
export const ManyLinks: Story = {
  args: {
    links: [
      { label: "Home", href: "#" },
      { label: "Products", href: "#" },
      { label: "Solutions", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Docs", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Support", href: "#" },
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
};

/** Header with links that have unusually long label text */
export const LinksWithLongLabels: Story = {
  args: {
    links: [
      { label: "Enterprise Solutions Overview", href: "#" },
      { label: "Frequently Asked Questions and Support", href: "#" },
    ],
  },
};

/* -------------------------------------------------------------------------
 * isSticky variations (2)
 * ---------------------------------------------------------------------- */

/** Sticky header pinned to the top while scrolling */
export const StickyEnabled: Story = {
  args: {
    title: "Sticky App",
    links: fourLinks,
    isSticky: true,
  },
  render: (args) => (
    <ark.div style={{ minHeight: "1200px", backgroundColor: "#f9fafb" }}>
      <Header {...args} />
      <ark.div style={{ padding: "16px" }}>
        <ark.p style={{ color: "#374151" }}>
          Scroll down to see the header remain pinned to the top.
        </ark.p>
      </ark.div>
    </ark.div>
  ),
};

/** Header with isSticky explicitly set to false */
export const StickyDisabledExplicit: Story = {
  args: {
    title: "Static App",
    links: fourLinks,
    isSticky: false,
  },
};

/* -------------------------------------------------------------------------
 * inverted variations (2)
 * ---------------------------------------------------------------------- */

/** Inverted header rendered without any navigation links */
export const InvertedWithoutLinks: Story = {
  args: {
    title: "Dark Minimal",
    links: [],
    inverted: true,
  },
  render: (args) => withContent(args, "#111827"),
};

/** Inverted header rendered with both a logo and links */
export const InvertedWithLogoAndLinks: Story = {
  args: {
    title: "Dark Brand",
    links: fourLinks,
    inverted: true,
    logo: logoUrl,
  },
  render: (args) => withContent(args, "#111827"),
};

/* -------------------------------------------------------------------------
 * Logo variations (4)
 * ---------------------------------------------------------------------- */

/** Header with a valid logo image url */
export const WithLogo: Story = {
  args: {
    title: "Branded App",
    logo: logoUrl,
  },
};

/** Header with logo explicitly left undefined */
export const WithoutLogoExplicitUndefined: Story = {
  args: {
    title: "No Logo App",
    logo: undefined,
  },
};

/** Header with a broken/unreachable logo url */
export const BrokenLogoUrl: Story = {
  args: {
    title: "Broken Logo",
    logo: "https://example.invalid/does-not-exist.png",
  },
};

/** Header with a logo but an empty title string */
export const LogoWithoutTitle: Story = {
  args: {
    title: "",
    logo: logoUrl,
  },
};

/* -------------------------------------------------------------------------
 * fullWidth variations (2)
 * ---------------------------------------------------------------------- */

/** Header spanning the full available width */
export const FullWidthEnabled: Story = {
  args: {
    title: "Full Width App",
    links: fourLinks,
    fullWidth: true,
  },
};

/** Header constrained to the default max width, centered */
export const FullWidthDisabledConstrained: Story = {
  args: {
    title: "Constrained App",
    links: fourLinks,
    fullWidth: false,
  },
};

/* -------------------------------------------------------------------------
 * onLinkClick interactions (6)
 * ---------------------------------------------------------------------- */

/** Clicking the first link invokes onLinkClick with that link's data */
export const ClickFirstLink: Story = {
  args: {
    links: fourLinks,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: "Home" });
    await userEvent.click(link);
    expect(args.onLinkClick).toHaveBeenCalledWith({ label: "Home", href: "#" });
  },
};

/** Clicking the second link invokes onLinkClick with that link's data */
export const ClickSecondLink: Story = {
  args: {
    links: fourLinks,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: "Features" });
    await userEvent.click(link);
    expect(args.onLinkClick).toHaveBeenCalledWith({
      label: "Features",
      href: "#",
    });
  },
};

/** Clicking the last of many links invokes onLinkClick with that link's data */
export const ClickLastLinkOfMany: Story = {
  args: {
    links: [
      { label: "Home", href: "#" },
      { label: "Products", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: "Contact" });
    await userEvent.click(link);
    expect(args.onLinkClick).toHaveBeenCalledWith({
      label: "Contact",
      href: "#",
    });
  },
};

/** Clicking each link in sequence calls onLinkClick once per click, in order */
export const ClickEachLinkSequentially: Story = {
  args: {
    links: [
      { label: "One", href: "#" },
      { label: "Two", href: "#" },
      { label: "Three", href: "#" },
    ],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("link", { name: "One" }));
    await userEvent.click(canvas.getByRole("link", { name: "Two" }));
    await userEvent.click(canvas.getByRole("link", { name: "Three" }));
    expect(args.onLinkClick).toHaveBeenCalledTimes(3);
    expect(args.onLinkClick).toHaveBeenNthCalledWith(1, {
      label: "One",
      href: "#",
    });
    expect(args.onLinkClick).toHaveBeenNthCalledWith(3, {
      label: "Three",
      href: "#",
    });
  },
};

/** A focused link can be activated with the Enter key */
export const KeyboardActivateLinkWithEnter: Story = {
  args: {
    links: fourLinks,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: "Pricing" });
    link.focus();
    await userEvent.keyboard("{Enter}");
    expect(args.onLinkClick).toHaveBeenCalledWith({
      label: "Pricing",
      href: "#",
    });
  },
};

/** Clicking a link does not throw when no onLinkClick handler is provided */
export const NoOnLinkClickHandlerProvided: Story = {
  args: {
    links: [{ label: "Home", href: "#" }],
    onLinkClick: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: "Home" });
    await expect(userEvent.click(link)).resolves.not.toThrow();
  },
};

/* -------------------------------------------------------------------------
 * Boolean flag combinations (8)
 * ---------------------------------------------------------------------- */

/** Sticky, inverted, and full width all enabled together */
export const StickyInvertedFullWidth: Story = {
  args: {
    title: "Combo App",
    links: fourLinks,
    isSticky: true,
    inverted: true,
    fullWidth: true,
  },
  render: (args) => withContent(args, "#111827"),
};

/** Sticky and inverted, but constrained (not full width) */
export const StickyInvertedConstrained: Story = {
  args: {
    title: "Combo App",
    links: fourLinks,
    isSticky: true,
    inverted: true,
    fullWidth: false,
  },
  render: (args) => withContent(args, "#111827"),
};

/** Sticky and full width, but light (not inverted) */
export const StickyNormalFullWidth: Story = {
  args: {
    title: "Combo App",
    links: fourLinks,
    isSticky: true,
    inverted: false,
    fullWidth: true,
  },
};

/** Sticky only, light theme, constrained width */
export const StickyNormalConstrained: Story = {
  args: {
    title: "Combo App",
    links: fourLinks,
    isSticky: true,
    inverted: false,
    fullWidth: false,
  },
};

/** Inverted and full width, but not sticky */
export const StaticInvertedFullWidth: Story = {
  args: {
    title: "Combo App",
    links: fourLinks,
    isSticky: false,
    inverted: true,
    fullWidth: true,
  },
  render: (args) => withContent(args, "#111827"),
};

/** Inverted only, constrained width, not sticky */
export const StaticInvertedConstrained: Story = {
  args: {
    title: "Combo App",
    links: fourLinks,
    isSticky: false,
    inverted: true,
    fullWidth: false,
  },
  render: (args) => withContent(args, "#111827"),
};

/** Inverted with no links at all, not sticky, constrained */
export const StaticInvertedNoLinks: Story = {
  args: {
    title: "Combo App",
    links: [],
    isSticky: false,
    inverted: true,
    fullWidth: false,
  },
  render: (args) => withContent(args, "#111827"),
};

/* -------------------------------------------------------------------------
 * Kitchen-sink combinations (3)
 * ---------------------------------------------------------------------- */

/** Kitchen sink: every feature enabled at once */
export const KitchenSinkAllFeatures: Story = {
  args: {
    title: "🚀 Global Enterprise Platform",
    links: [
      { label: "Home", href: "#" },
      { label: "Products", href: "#" },
      { label: "Solutions", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Docs", href: "#" },
    ],
    isSticky: true,
    inverted: true,
    fullWidth: true,
    logo: logoUrl,
  },
  render: (args) => withContent(args, "#111827"),
};

/** Kitchen sink: every feature disabled/absent (minimal configuration) */
export const KitchenSinkMinimal: Story = {
  args: {
    title: undefined,
    links: [],
    isSticky: false,
    inverted: false,
    fullWidth: false,
    logo: undefined,
  },
};

/** Kitchen sink: long title, logo, and many links together */
export const KitchenSinkLongTitleManyLinksLogo: Story = {
  args: {
    title: "The Complete Enterprise Resource Planning Platform",
    logo: logoUrl,
    links: [
      { label: "Home", href: "#" },
      { label: "Products", href: "#" },
      { label: "Solutions", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Docs", href: "#" },
      { label: "Support", href: "#" },
    ],
  },
};

/* -------------------------------------------------------------------------
 * Edge cases (5)
 * ---------------------------------------------------------------------- */

/** Whitespace-only title string */
export const WhitespaceOnlyTitle: Story = {
  args: {
    title: "   ",
  },
};

/** Links containing special/unusual characters in their labels */
export const SpecialCharactersInLinkLabels: Story = {
  args: {
    links: [
      { label: "Q&A", href: "#" },
      { label: "50% Off!", href: "#" },
      { label: "<Beta>", href: "#" },
    ],
  },
};

/** Links whose hrefs are all just a bare hash fragment */
export const LinksWithHashOnlyHref: Story = {
  args: {
    links: [
      { label: "Section 1", href: "#" },
      { label: "Section 2", href: "#" },
    ],
  },
};

/** Links pointing to full external urls rather than in-page anchors */
export const LinksWithExternalUrls: Story = {
  args: {
    links: [
      { label: "Storybook", href: "https://storybook.js.org" },
      { label: "Chromatic", href: "https://www.chromatic.com" },
    ],
  },
};

/** Two links sharing the same label but pointing to different destinations */
export const DuplicateLinkLabels: Story = {
  args: {
    links: [
      { label: "Docs", href: "#v1" },
      { label: "Docs", href: "#v2" },
    ],
  },
};

/* -------------------------------------------------------------------------
 * Miscellaneous edge cases (3)
 * ---------------------------------------------------------------------- */

/** A single-character title */
export const SingleCharacterTitle: Story = {
  args: {
    title: "X",
  },
};

/** Many links wrapped in a narrower viewport-like container to exercise wrapping */
export const ManyLinksOverflowWrapping: Story = {
  args: {
    links: [
      { label: "Home", href: "#" },
      { label: "Products", href: "#" },
      { label: "Solutions", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Docs", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Support", href: "#" },
      { label: "About", href: "#" },
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

/** Header with a logo and no title and no links (logo-only brand) */
export const LogoOnlyNoTitleNoLinks: Story = {
  args: {
    title: "",
    logo: logoUrl,
    links: [],
  },
};

/* -------------------------------------------------------------------------
 * Explicit defaults (1)
 * ---------------------------------------------------------------------- */

/** All boolean flags explicitly passed as false, matching defaults */
export const AllBooleanFlagsFalseExplicit: Story = {
  args: {
    title: "Explicit Defaults",
    links: fourLinks,
    isSticky: false,
    inverted: false,
    fullWidth: false,
    logo: undefined,
  },
};

/* -------------------------------------------------------------------------
 * Hover interactions (1)
 * ---------------------------------------------------------------------- */

/** Hovering over an inverted-theme link changes its computed color */
export const HoverChangesLinkColor: Story = {
  args: {
    inverted: true,
    links: [{ label: "Hover me", href: "#" }],
  },
  render: (args) => withContent(args, "#111827"),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: "Hover me" }) as HTMLElement;
    const before = getComputedStyle(link).color;
    await userEvent.hover(link);
    const after = getComputedStyle(link).color;
    expect(after).not.toBe(before);
  },
};
