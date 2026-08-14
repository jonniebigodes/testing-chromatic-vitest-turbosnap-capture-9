import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect } from "storybook/test";
import Image from "./Image";

const DEFAULT_SRC = "https://picsum.photos/400/300";
const FALLBACK_SRC = "https://picsum.photos/200/200";

const meta = {
  title: "Components/Image",
  component: Image,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "text",
      description: "Source URL of the image",
    },
    alt: {
      control: "text",
      description: "Alternative text for the image",
    },
    width: {
      control: "text",
      description: "Width of the image",
    },
    height: {
      control: "text",
      description: "Height of the image",
    },
    objectFit: {
      control: "select",
      options: ["cover", "contain", "fill", "none"],
      description: "How the image should be resized to fit its container",
    },
    rounded: {
      control: "boolean",
      description: "Whether the image should have fully rounded corners",
    },
    borderRadius: {
      control: "text",
      description: "Custom border radius override",
    },
    fallbackSrc: {
      control: "text",
      description: "Fallback image source used when the primary src fails",
    },
  },
  args: {
    src: DEFAULT_SRC,
    alt: "Sample image",
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default image with picsum source
 */
export const Default: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Default landscape",
    width: 400,
    height: 300,
  },
};

/**
 * Image with cover object-fit
 */
export const ObjectFitCover: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Cover fit",
    width: 300,
    height: 200,
    objectFit: "cover",
  },
};

/**
 * Image with contain object-fit
 */
export const ObjectFitContain: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Contain fit",
    width: 300,
    height: 200,
    objectFit: "contain",
  },
};

/**
 * Image with fill object-fit
 */
export const ObjectFitFill: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Fill fit",
    width: 300,
    height: 200,
    objectFit: "fill",
  },
};

/**
 * Image with none object-fit
 */
export const ObjectFitNone: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "None fit",
    width: 300,
    height: 200,
    objectFit: "none",
  },
};

/**
 * Fully rounded image
 */
export const Rounded: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Rounded image",
    width: 200,
    height: 200,
    rounded: true,
  },
};

/**
 * Non-rounded image (default corners)
 */
export const NotRounded: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Square corners",
    width: 300,
    height: 200,
    rounded: false,
  },
};

/**
 * Custom border radius
 */
export const CustomBorderRadius: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Custom radius",
    width: 300,
    height: 200,
    borderRadius: "16px",
  },
};

/**
 * Custom border radius overrides rounded
 */
export const BorderRadiusOverridesRounded: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Override radius",
    width: 200,
    height: 200,
    rounded: true,
    borderRadius: "4px",
  },
};

/**
 * Image with numeric width and height
 */
export const NumericDimensions: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Numeric dims",
    width: 250,
    height: 150,
  },
};

/**
 * Image with string width and height
 */
export const StringDimensions: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "String dims",
    width: "100%",
    height: "180px",
  },
};

/**
 * Wide landscape image
 */
export const WideLandscape: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Wide landscape",
    width: 480,
    height: 200,
    objectFit: "cover",
  },
};

/**
 * Tall portrait crop
 */
export const TallPortrait: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Tall portrait",
    width: 200,
    height: 320,
    objectFit: "cover",
  },
};

/**
 * Small thumbnail
 */
export const Thumbnail: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Thumbnail",
    width: 64,
    height: 64,
    objectFit: "cover",
    rounded: true,
  },
};

/**
 * Large hero-style image
 */
export const LargeHero: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Large hero",
    width: 560,
    height: 280,
    objectFit: "cover",
  },
};

/**
 * Image with fallbackSrc configured
 */
export const WithFallbackSrc: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "With fallback",
    width: 300,
    height: 200,
    fallbackSrc: FALLBACK_SRC,
  },
};

/**
 * Broken src that falls back to fallbackSrc
 */
export const BrokenSrcUsesFallback: Story = {
  args: {
    src: "https://invalid.example.com/broken-image.jpg",
    alt: "Broken with fallback",
    width: 200,
    height: 200,
    fallbackSrc: FALLBACK_SRC,
  },
};

/**
 * Broken src without fallback remains broken
 */
export const BrokenSrcWithoutFallback: Story = {
  args: {
    src: "https://invalid.example.com/broken-image.jpg",
    alt: "Broken no fallback",
    width: 200,
    height: 200,
  },
};

/**
 * All object-fit modes side by side
 */
export const AllObjectFitModes: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Object fit gallery",
  },
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <Image
        src={DEFAULT_SRC}
        alt="cover"
        width={120}
        height={120}
        objectFit="cover"
      />
      <Image
        src={DEFAULT_SRC}
        alt="contain"
        width={120}
        height={120}
        objectFit="contain"
      />
      <Image
        src={DEFAULT_SRC}
        alt="fill"
        width={120}
        height={120}
        objectFit="fill"
      />
      <Image
        src={DEFAULT_SRC}
        alt="none"
        width={120}
        height={120}
        objectFit="none"
      />
    </div>
  ),
};

/**
 * Rounded vs square comparison
 */
export const RoundedVsSquare: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Rounded vs square",
  },
  render: () => (
    <div style={{ display: "flex", gap: "16px" }}>
      <Image
        src={DEFAULT_SRC}
        alt="rounded"
        width={150}
        height={150}
        rounded
      />
      <Image
        src={DEFAULT_SRC}
        alt="square"
        width={150}
        height={150}
        rounded={false}
      />
    </div>
  ),
};

/**
 * Avatar-style circular image
 */
export const AvatarStyle: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Avatar",
    width: 96,
    height: 96,
    rounded: true,
    objectFit: "cover",
  },
};

/**
 * Card thumbnail style
 */
export const CardThumbnail: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Card thumb",
    width: 320,
    height: 180,
    objectFit: "cover",
    borderRadius: "8px",
  },
};

/**
 * Image on a dark background
 */
export const OnDarkBackground: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "On dark",
    width: 280,
    height: 180,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: "#0f172a",
          padding: "24px",
          borderRadius: "8px",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

/**
 * Decorative image with empty-ish descriptive alt
 */
export const DescriptiveAlt: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "A scenic mountain landscape at sunset with orange clouds",
    width: 400,
    height: 300,
  },
};

/**
 * Square crop with cover
 */
export const SquareCropCover: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Square crop",
    width: 220,
    height: 220,
    objectFit: "cover",
  },
};

/**
 * Square crop with contain
 */
export const SquareCropContain: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Square contain",
    width: 220,
    height: 220,
    objectFit: "contain",
  },
};

/**
 * Custom large border radius
 */
export const LargeBorderRadius: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Large radius",
    width: 300,
    height: 200,
    borderRadius: "32px",
  },
};

/**
 * Zero border radius
 */
export const ZeroBorderRadius: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Zero radius",
    width: 300,
    height: 200,
    borderRadius: "0px",
  },
};

/**
 * Percentage width only
 */
export const PercentageWidth: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Percent width",
    width: "80%",
    height: 200,
    objectFit: "cover",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Auto dimensions (natural size constrained by max-width)
 */
export const AutoDimensions: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Auto dims",
  },
};

/**
 * Kitchen sink: rounded cover thumbnail with fallback
 */
export const KitchenSinkRoundedCoverFallback: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Kitchen sink rounded",
    width: 120,
    height: 120,
    objectFit: "cover",
    rounded: true,
    fallbackSrc: FALLBACK_SRC,
  },
};

/**
 * Kitchen sink: custom radius fill with string dims
 */
export const KitchenSinkCustomRadiusFill: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Kitchen sink fill",
    width: "240px",
    height: "160px",
    objectFit: "fill",
    borderRadius: "12px",
  },
};

/**
 * Kitchen sink: wide contain with fallback
 */
export const KitchenSinkWideContainFallback: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Kitchen sink wide",
    width: 400,
    height: 160,
    objectFit: "contain",
    fallbackSrc: FALLBACK_SRC,
  },
};

/**
 * Gallery of three images
 */
export const ThreeImageGallery: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Gallery",
  },
  render: () => (
    <div style={{ display: "flex", gap: "8px" }}>
      <Image src={DEFAULT_SRC} alt="One" width={140} height={100} />
      <Image src={DEFAULT_SRC} alt="Two" width={140} height={100} />
      <Image src={DEFAULT_SRC} alt="Three" width={140} height={100} />
    </div>
  ),
};

/**
 * Mixed rounded thumbnails
 */
export const MixedRoundedThumbnails: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Thumbs",
  },
  render: () => (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <Image
        src={DEFAULT_SRC}
        alt="sm"
        width={48}
        height={48}
        rounded
        objectFit="cover"
      />
      <Image
        src={DEFAULT_SRC}
        alt="md"
        width={72}
        height={72}
        rounded
        objectFit="cover"
      />
      <Image
        src={DEFAULT_SRC}
        alt="lg"
        width={96}
        height={96}
        rounded
        objectFit="cover"
      />
    </div>
  ),
};

/**
 * Verifies object-fit cover via play
 */
export const ObjectFitCoverAssertion: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Cover assertion",
    width: 200,
    height: 150,
    objectFit: "cover",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const img = canvas.getByAltText("Cover assertion");
    await expect(img).toHaveStyle({ objectFit: "cover" });
  },
};

/**
 * Verifies rounded border radius via play
 */
export const RoundedStyleAssertion: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Rounded assertion",
    width: 100,
    height: 100,
    rounded: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const img = canvas.getByAltText("Rounded assertion");
    await expect(img).toHaveStyle({ borderRadius: "9999px" });
  },
};

/**
 * Verifies custom borderRadius via play
 */
export const CustomRadiusStyleAssertion: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Custom radius assertion",
    width: 200,
    height: 120,
    borderRadius: "20px",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const img = canvas.getByAltText("Custom radius assertion");
    await expect(img).toHaveStyle({ borderRadius: "20px" });
  },
};

/**
 * Verifies alt text is present
 */
export const AltTextPresent: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Accessible description",
    width: 200,
    height: 150,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByAltText("Accessible description")
    ).toBeInTheDocument();
  },
};

/**
 * Small fixed pixel dimensions
 */
export const TinyPixelImage: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Tiny",
    width: 32,
    height: 32,
    objectFit: "cover",
    rounded: true,
  },
};

/**
 * Rem-based string dimensions
 */
export const RemDimensions: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Rem dims",
    width: "18rem",
    height: "12rem",
    objectFit: "cover",
  },
};

/**
 * Fill with rounded corners
 */
export const FillRounded: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Fill rounded",
    width: 200,
    height: 200,
    objectFit: "fill",
    rounded: true,
  },
};

/**
 * None object-fit with custom radius
 */
export const NoneWithCustomRadius: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "None custom radius",
    width: 250,
    height: 180,
    objectFit: "none",
    borderRadius: "8px",
  },
};

/**
 * Contain with large dimensions
 */
export const LargeContain: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Large contain",
    width: 480,
    height: 320,
    objectFit: "contain",
  },
};

/**
 * Cover with zero border radius and fallback
 */
export const CoverZeroRadiusFallback: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Cover zero fallback",
    width: 300,
    height: 200,
    objectFit: "cover",
    borderRadius: "0px",
    fallbackSrc: FALLBACK_SRC,
  },
};

/**
 * Profile banner style wide image
 */
export const ProfileBanner: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Profile banner",
    width: 520,
    height: 140,
    objectFit: "cover",
    borderRadius: "12px",
  },
};

/**
 * Grid of rounded avatars
 */
export const AvatarGrid: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Avatar grid",
  },
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 64px)",
        gap: "8px",
      }}
    >
      <Image src={DEFAULT_SRC} alt="a1" width={64} height={64} rounded />
      <Image src={DEFAULT_SRC} alt="a2" width={64} height={64} rounded />
      <Image src={DEFAULT_SRC} alt="a3" width={64} height={64} rounded />
      <Image src={DEFAULT_SRC} alt="a4" width={64} height={64} rounded />
      <Image src={DEFAULT_SRC} alt="a5" width={64} height={64} rounded />
      <Image src={DEFAULT_SRC} alt="a6" width={64} height={64} rounded />
    </div>
  ),
};

/**
 * Square crop with fill
 */
export const SquareCropFill: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Square fill",
    width: 220,
    height: 220,
    objectFit: "fill",
  },
};

/**
 * Large radius rounded override via borderRadius string
 */
export const PillShapedImage: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Pill shaped",
    width: 280,
    height: 100,
    objectFit: "cover",
    borderRadius: "9999px",
  },
};

/**
 * Contain with rounded corners
 */
export const ContainRounded: Story = {
  args: {
    src: DEFAULT_SRC,
    alt: "Contain rounded",
    width: 200,
    height: 200,
    objectFit: "contain",
    rounded: true,
  },
};
