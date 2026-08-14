import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, within, expect } from "storybook/test";
import { Avatar } from "./Avatar";

import { ark } from "@ark-ui/react/factory";

/**
 * A tiny (1x1) transparent PNG encoded as a data: URI. Used instead of an
 * external network image so image-load stories are deterministic and work
 * offline / in CI without depending on a third-party host being reachable.
 */
const VALID_IMAGE_SRC =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";

/**
 * A malformed data: URI that the browser's image decoder will always reject,
 * regardless of network conditions - a deterministic stand-in for a broken /
 * 404 image URL.
 */
const BROKEN_IMAGE_SRC = "data:image/png;base64,not-a-real-image-payload";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "text",
      description: "The source URL of the avatar image",
    },
    alt: {
      control: "text",
      description: "Alternative text for the avatar image",
    },
    fallback: {
      control: "text",
      description: "Fallback text to display (typically initials)",
    },
    onStatusChange: {
      description: "Callback when image status changes",
    },
  },
  args: {
    onStatusChange: fn(),
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------
 * Default & fallback basics (4)
 * ---------------------------------------------------------------------- */

/**
 * Default avatar with a valid image URL
 */
export const Default: Story = {
  args: {
    src: "https://i.pravatar.cc/300",
    alt: "John Doe",
    fallback: "JD",
  },
};

/**
 * Avatar with initials fallback when image fails to load
 */
export const WithFallback: Story = {
  args: {
    src: "https://invalid-url-that-will-fail.com/avatar.jpg",
    alt: "Jane Smith",
    fallback: "JS",
  },
};

/**
 * Avatar with single letter fallback
 */
export const SingleLetter: Story = {
  args: {
    /* src: 'https://i.pravatar.cc/300?img=1', */
    alt: "Alice",
    fallback: "A",
  },
};

/**
 * Avatar with three letter initials
 */
export const ThreeLetters: Story = {
  args: {
    /* src: "https://i.pravatar.cc/300?img=2", */
    alt: "Bob Anderson Brown",
    fallback: "BAB",
  },
};

/* -------------------------------------------------------------------------
 * Custom styling & sizing (4)
 * ---------------------------------------------------------------------- */

/**
 * Avatar with custom styling via rootProps
 */
export const CustomStyled: Story = {
  args: {
    src: "https://i.pravatar.cc/300?img=3",
    alt: "Sarah Johnson",
    fallback: "SJ",
    rootProps: {
      style: {
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        border: "3px solid #4F46E5",
        overflow: "hidden",
      },
    },
  },
};

/**
 * Avatar with status change callback
 */
export const WithStatusCallback: Story = {
  args: {
    src: "https://i.pravatar.cc/300?img=4",
    alt: "Michael Chen",
    fallback: "MC",
    onStatusChange: fn((details) => {
      console.log("Avatar status changed:", details.status);
    }),
  },
};

/**
 * Small avatar example
 */
export const Small: Story = {
  args: {
    src: "https://i.pravatar.cc/300?img=5",
    alt: "Emma Wilson",
    fallback: "EW",
    rootProps: {
      style: {
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        overflow: "hidden",
        fontSize: "12px",
      },
    },
  },
};

/**
 * Large avatar example
 */
export const Large: Story = {
  args: {
    src: "https://i.pravatar.cc/300?img=6",
    alt: "David Miller",
    fallback: "DM",
    rootProps: {
      style: {
        width: "150px",
        height: "150px",
        borderRadius: "50%",
        overflow: "hidden",
        fontSize: "48px",
      },
    },
  },
};

/* -------------------------------------------------------------------------
 * Avatar groups & overlap layouts (2)
 * ---------------------------------------------------------------------- */

export const AvatarGroup: Story = {
  args: {
    alt: "Avatar Group",
    fallback: "AG",
  },
  decorators: [
    (Story) => (
      <ark.div style={{ display: "flex", gap: "8px", flexDirection: "column" }}>
        <ark.h1> Built with Ark UI </ark.h1>
        <Story />
      </ark.div>
    ),
  ],
  render: (args) => (
    <ark.div style={{ display: "flex", gap: "8px" }}>
      <Avatar {...args} />
      <Avatar {...args} />
      <Avatar {...args} />
    </ark.div>
  ),
};

export const OverlappingAvatars: Story = {
  args: {
    alt: "Overlapping Avatar",
    fallback: "OA",
  },
  decorators: [
    (Story) => (
      <ark.div style={{ display: "flex", flexDirection: "column" }}>
        <ark.h1> Overlapping Avatars built with Ark UI </ark.h1>
        <Story />
      </ark.div>
    ),
  ],
  render: () => (
    <ark.div
      style={{
        display: "grid",
        gridTemplateRows: "repeat(4, 50px)",
        gridAutoFlow: "column",
        gap: "0px",
      }}
    >
      <Avatar
        alt="User 1"
        fallback="U1"
        rootProps={{
          style: {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid red",
            overflow: "hidden",
            boxSizing: "border-box",
          },
        }}
      />
      <Avatar
        alt="User 2"
        fallback="U2"
        rootProps={{
          style: {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid pink",
            overflow: "hidden",
            boxSizing: "border-box",
          },
        }}
      />
      <Avatar
        alt="User 3"
        fallback="U3"
        rootProps={{
          style: {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid blue",
            overflow: "hidden",
            boxSizing: "border-box",
          },
        }}
      />
      <Avatar
        alt="User 4"
        fallback="U4"
        rootProps={{
          style: {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid magenta",
            overflow: "hidden",
            boxSizing: "border-box",
          },
        }}
      />
      <Avatar
        alt="User 5"
        fallback="U5"
        rootProps={{
          style: {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid green",
            overflow: "hidden",
            boxSizing: "border-box",
          },
        }}
      />
      <Avatar
        alt="User 6"
        fallback="U6"
        rootProps={{
          style: {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid #22c55e",
            overflow: "hidden",
            boxSizing: "border-box",
          },
        }}
      />
      <Avatar
        alt="User 7"
        fallback="U7"
        rootProps={{
          style: {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid #a855f7",
            overflow: "hidden",
            boxSizing: "border-box",
          },
        }}
      />
      <Avatar
        alt="User 8"
        fallback="U8"
        rootProps={{
          style: {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid #06b6d4",
            overflow: "hidden",
            boxSizing: "border-box",
          },
        }}
      />
      <Avatar
        alt="User 9"
        fallback="U9"
        rootProps={{
          style: {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid #f59e0b",
            overflow: "hidden",
            boxSizing: "border-box",
          },
        }}
      />
      <Avatar
        alt="User 10"
        fallback="U10"
        rootProps={{
          style: {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid black",
            overflow: "hidden",
            boxSizing: "border-box",
          },
        }}
      />
      <Avatar
        alt="User 11"
        fallback="U11"
        rootProps={{
          style: {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid purple",
            overflow: "hidden",
            boxSizing: "border-box",
          },
        }}
      />
      <Avatar
        alt="User 12"
        fallback="U12"
        rootProps={{
          style: {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid cyan",
            overflow: "hidden",
            boxSizing: "border-box",
          },
        }}
      />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * Valid image loading (5)
 * ---------------------------------------------------------------------- */

/**
 * A deterministic, offline-friendly valid image (a data: URI) that always
 * resolves to the "loaded" status.
 */
export const ValidDataUriImage: Story = {
  args: {
    src: VALID_IMAGE_SRC,
    alt: "Valid data URI avatar",
    fallback: "DU",
  },
};

/**
 * Valid image rendered inside a square (non-circular) container
 */
export const ValidImageSquareContainer: Story = {
  args: {
    src: VALID_IMAGE_SRC,
    alt: "Square container avatar",
    fallback: "SQ",
    rootProps: {
      style: {
        width: "80px",
        height: "80px",
        borderRadius: "8px",
        overflow: "hidden",
      },
    },
  },
};

/**
 * Valid image with a decorative colored border once loaded
 */
export const ValidImageWithBorder: Story = {
  args: {
    src: VALID_IMAGE_SRC,
    alt: "Bordered avatar",
    fallback: "BD",
    rootProps: {
      style: {
        width: "72px",
        height: "72px",
        borderRadius: "50%",
        border: "4px solid #66bf3c",
        overflow: "hidden",
      },
    },
  },
};

/**
 * Valid image with a CSS grayscale filter applied via rootProps
 */
export const ValidImageGrayscaleFilter: Story = {
  args: {
    src: VALID_IMAGE_SRC,
    alt: "Grayscale filtered avatar",
    fallback: "GS",
    rootProps: {
      style: {
        width: "64px",
        height: "64px",
        borderRadius: "50%",
        overflow: "hidden",
        filter: "grayscale(1)",
      },
    },
  },
};

/**
 * Valid image whose status transitions are observed via onStatusChange
 */
export const ValidImageStatusLogged: Story = {
  args: {
    src: VALID_IMAGE_SRC,
    alt: "Status logged avatar",
    fallback: "SL",
    onStatusChange: fn((details) => {
      console.log("status ->", details.status);
    }),
  },
};

/* -------------------------------------------------------------------------
 * Broken / failing image loading (5)
 * ---------------------------------------------------------------------- */

/**
 * A non-existent local path standing in for a 404 image response
 */
export const BrokenSrcNonExistentPath: Story = {
  args: {
    src: "/this-image-does-not-exist-404.png",
    alt: "Broken path avatar",
    fallback: "404",
  },
};

/**
 * A malformed data: URI that the browser cannot decode as an image -
 * deterministic regardless of network conditions
 */
export const BrokenSrcInvalidDataUri: Story = {
  args: {
    src: BROKEN_IMAGE_SRC,
    alt: "Invalid data URI avatar",
    fallback: "ID",
  },
};

/**
 * An empty string src, which never resolves to a real image request
 */
export const BrokenSrcEmptyString: Story = {
  args: {
    src: "",
    alt: "Empty src avatar",
    fallback: "ES",
  },
};

/**
 * Broken image whose visible fallback is styled distinctly (warning colors)
 */
export const BrokenSrcThenFallbackStyled: Story = {
  args: {
    src: BROKEN_IMAGE_SRC,
    alt: "Styled fallback avatar",
    fallback: "!",
    rootProps: {
      style: {
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        backgroundColor: "#ff4400",
        overflow: "hidden",
      },
    },
  },
};

/**
 * Broken image paired with a longer fallback string to check truncation
 */
export const BrokenSrcWithLongFallbackText: Story = {
  args: {
    src: BROKEN_IMAGE_SRC,
    alt: "Long fallback avatar",
    fallback: "N/A",
  },
};

/* -------------------------------------------------------------------------
 * No src supplied - fallback only (4)
 * ---------------------------------------------------------------------- */

/**
 * No src prop at all: the fallback is the only thing that can ever render
 */
export const NoSrcUndefined: Story = {
  args: {
    alt: "No image avatar",
    fallback: "NI",
  },
};

/**
 * No src, uppercase initials fallback
 */
export const NoSrcInitialsUppercase: Story = {
  args: {
    alt: "Uppercase initials avatar",
    fallback: "UP",
  },
};

/**
 * No src, lowercase initials fallback
 */
export const NoSrcInitialsLowercase: Story = {
  args: {
    alt: "Lowercase initials avatar",
    fallback: "lc",
  },
};

/**
 * No src, numeric fallback content (e.g. representing an overflow count)
 */
export const NoSrcNumericFallback: Story = {
  args: {
    alt: "Numeric fallback avatar",
    fallback: "99+",
  },
};

/* -------------------------------------------------------------------------
 * Fallback text variations (5)
 * ---------------------------------------------------------------------- */

/**
 * Fallback content rendered as an emoji instead of initials
 */
export const FallbackEmoji: Story = {
  args: {
    alt: "Emoji fallback avatar",
    fallback: "🦊",
  },
};

/**
 * A single emoji character used as the entire fallback
 */
export const FallbackSingleEmojiOnly: Story = {
  args: {
    alt: "Single emoji avatar",
    fallback: "😀",
  },
};

/**
 * A long fallback string inside the default fixed-size circular container,
 * exercising overflow handling
 */
export const FallbackLongTextOverflow: Story = {
  args: {
    alt: "Long fallback text avatar",
    fallback: "TOOLONG",
  },
};

/**
 * Fallback content containing punctuation / special characters
 */
export const FallbackSpecialCharacters: Story = {
  args: {
    alt: "Special characters fallback avatar",
    fallback: "@#",
  },
};

/**
 * Fallback content using unicode/RTL characters
 */
export const FallbackUnicodeRTL: Story = {
  args: {
    alt: "Unicode RTL fallback avatar",
    fallback: "أح",
  },
};

/* -------------------------------------------------------------------------
 * Custom ids (3)
 * ---------------------------------------------------------------------- */

/**
 * Custom ids applied to all three parts (root, image, fallback)
 */
export const CustomIdsBasic: Story = {
  args: {
    src: VALID_IMAGE_SRC,
    alt: "Custom ids avatar",
    fallback: "CI",
    ids: {
      root: "custom-avatar-root",
      image: "custom-avatar-image",
      fallback: "custom-avatar-fallback",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByAltText("Custom ids avatar")).toHaveAttribute(
      "id",
      "custom-avatar-image"
    );
  },
};

/**
 * Only the root id is customized; image/fallback keep their generated ids
 */
export const CustomIdsPartialRootOnly: Story = {
  args: {
    alt: "Partial custom id avatar",
    fallback: "PC",
    ids: {
      root: "partial-custom-root",
    },
  },
};

/**
 * Two independently custom-id'd avatars rendered side by side, demonstrating
 * that custom ids do not collide across sibling instances
 */
export const CustomIdsMultipleInstances: Story = {
  args: {
    alt: "Multiple custom id avatars",
    fallback: "MC",
  },
  render: (args) => (
    <ark.div style={{ display: "flex", gap: "8px" }}>
      <Avatar
        {...args}
        alt="First"
        fallback="F1"
        ids={{ root: "instance-one-root" }}
      />
      <Avatar
        {...args}
        alt="Second"
        fallback="F2"
        ids={{ root: "instance-two-root" }}
      />
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * rootProps style overrides (5)
 * ---------------------------------------------------------------------- */

/**
 * A perfectly square avatar (no border radius)
 */
export const SquareShape: Story = {
  args: {
    alt: "Square shape avatar",
    fallback: "SQ",
    rootProps: {
      style: {
        borderRadius: "0",
      },
    },
  },
};

/**
 * A rounded-square avatar (partial border radius, not fully circular)
 */
export const RoundedSquareShape: Story = {
  args: {
    alt: "Rounded square avatar",
    fallback: "RS",
    rootProps: {
      style: {
        borderRadius: "12px",
      },
    },
  },
};

/**
 * Thick decorative border applied via rootProps
 */
export const ThickBorder: Story = {
  args: {
    alt: "Thick border avatar",
    fallback: "TB",
    rootProps: {
      style: {
        border: "6px solid #6f2cac",
      },
    },
  },
};

/**
 * Box shadow applied via rootProps for a raised/elevated look
 */
export const BoxShadowElevated: Story = {
  args: {
    alt: "Elevated avatar",
    fallback: "EL",
    rootProps: {
      style: {
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.35)",
      },
    },
  },
};

/**
 * Custom background gradient and font size applied via rootProps
 */
export const GradientBackgroundCustomFont: Story = {
  args: {
    alt: "Gradient background avatar",
    fallback: "GB",
    rootProps: {
      style: {
        background: "linear-gradient(135deg, #ff4785 0%, #6f2cac 100%)",
        fontSize: "20px",
        fontWeight: 700,
      },
    },
  },
};

/* -------------------------------------------------------------------------
 * Avatar groups & overlap layouts, additional variants (5)
 * ---------------------------------------------------------------------- */

/**
 * A horizontal row of avatars with a small gap and no overlap
 */
export const HorizontalGroupNoOverlap: Story = {
  args: {
    alt: "Horizontal group avatar",
    fallback: "HG",
  },
  render: (args) => (
    <ark.div style={{ display: "flex", gap: "4px" }}>
      <Avatar {...args} alt="Member 1" fallback="M1" />
      <Avatar {...args} alt="Member 2" fallback="M2" />
      <Avatar {...args} alt="Member 3" fallback="M3" />
      <Avatar {...args} alt="Member 4" fallback="M4" />
    </ark.div>
  ),
};

/**
 * A negatively-margined stack that overlaps avatars, capped with a "+N" count
 */
export const StackedGroupWithOverflowCount: Story = {
  args: {
    alt: "Stacked group avatar",
    fallback: "SG",
  },
  render: () => (
    <ark.div style={{ display: "flex" }}>
      {["A1", "A2", "A3"].map((label, index) => (
        <Avatar
          key={label}
          alt={`Stacked member ${label}`}
          fallback={label}
          rootProps={{
            style: {
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "2px solid white",
              overflow: "hidden",
              marginLeft: index === 0 ? "0" : "-12px",
            },
          }}
        />
      ))}
      <ark.div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "2px solid white",
          backgroundColor: "#212529",
          color: "white",
          fontSize: "12px",
          marginLeft: "-12px",
        }}
      >
        +5
      </ark.div>
    </ark.div>
  ),
};

/**
 * A vertical column layout of avatars, e.g. for a sidebar list
 */
export const VerticalGroupSidebar: Story = {
  args: {
    alt: "Vertical group avatar",
    fallback: "VG",
  },
  render: (args) => (
    <ark.div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Avatar {...args} alt="Row 1" fallback="R1" />
      <Avatar {...args} alt="Row 2" fallback="R2" />
      <Avatar {...args} alt="Row 3" fallback="R3" />
    </ark.div>
  ),
};

/**
 * A responsive grid layout of many avatars of mixed fallback content
 */
export const GridLayoutManyAvatars: Story = {
  args: {
    alt: "Grid layout avatar",
    fallback: "GL",
  },
  render: () => (
    <ark.div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 48px)",
        gap: "8px",
      }}
    >
      {Array.from({ length: 8 }, (_, i) => (
        <Avatar
          key={i}
          alt={`Grid member ${i + 1}`}
          fallback={`G${i + 1}`}
          rootProps={{
            style: {
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              overflow: "hidden",
              fontSize: "12px",
            },
          }}
        />
      ))}
    </ark.div>
  ),
};

/**
 * A "team roster" style layout mixing avatar sizes to indicate hierarchy
 * (e.g. a larger lead avatar next to smaller team member avatars)
 */
export const TeamRosterMixedSizes: Story = {
  args: {
    alt: "Team roster avatar",
    fallback: "TR",
  },
  render: () => (
    <ark.div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <Avatar
        alt="Team Lead"
        fallback="TL"
        rootProps={{
          style: {
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            overflow: "hidden",
            fontSize: "24px",
          },
        }}
      />
      <ark.div style={{ display: "flex", gap: "6px" }}>
        <Avatar
          alt="Member A"
          fallback="MA"
          rootProps={{
            style: {
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              overflow: "hidden",
              fontSize: "12px",
            },
          }}
        />
        <Avatar
          alt="Member B"
          fallback="MB"
          rootProps={{
            style: {
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              overflow: "hidden",
              fontSize: "12px",
            },
          }}
        />
      </ark.div>
    </ark.div>
  ),
};

/* -------------------------------------------------------------------------
 * Alt text variations (4)
 * ---------------------------------------------------------------------- */

/**
 * A long, descriptive alt text
 */
export const LongAltText: Story = {
  args: {
    alt: "Profile photo of Alexandra Montgomery-Fitzgerald, Senior Director of Product Engineering",
    fallback: "AM",
  },
};

/**
 * Alt text containing special / punctuation characters
 */
export const AltWithSpecialCharacters: Story = {
  args: {
    alt: "O'Brien & Associates — Avatar #42",
    fallback: "OB",
  },
};

/**
 * Alt text that exactly matches the fallback text
 */
export const AltMatchingFallback: Story = {
  args: {
    alt: "JD",
    fallback: "JD",
  },
};

/**
 * Alt text containing unicode/emoji characters
 */
export const AltUnicodeEmoji: Story = {
  args: {
    alt: "Célèbre utilisateur 🎉",
    fallback: "CU",
  },
};

/* -------------------------------------------------------------------------
 * Kitchen-sink combinations (4)
 * ---------------------------------------------------------------------- */

/**
 * Kitchen sink: valid image, custom ids, custom styling, and status callback
 * all combined together
 */
export const KitchenSinkValidImageCustomStyleIds: Story = {
  args: {
    src: VALID_IMAGE_SRC,
    alt: "Kitchen sink valid image avatar",
    fallback: "KS",
    ids: {
      root: "kitchen-sink-root",
      image: "kitchen-sink-image",
      fallback: "kitchen-sink-fallback",
    },
    rootProps: {
      style: {
        width: "90px",
        height: "90px",
        borderRadius: "16px",
        border: "3px solid #37d5d3",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      },
    },
    onStatusChange: fn(),
  },
};

/**
 * Kitchen sink: broken image, custom fallback styling, custom ids
 */
export const KitchenSinkBrokenImageCustomFallbackStyle: Story = {
  args: {
    src: BROKEN_IMAGE_SRC,
    alt: "Kitchen sink broken image avatar",
    fallback: "!!",
    ids: {
      root: "kitchen-sink-broken-root",
    },
    rootProps: {
      style: {
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        backgroundColor: "#e81c61",
        color: "white",
        fontWeight: 700,
      },
    },
    onStatusChange: fn(),
  },
};

/**
 * Kitchen sink: an avatar group mixing loaded, broken, and no-src avatars
 * together with varied fallback content
 */
export const KitchenSinkGroupMixedStates: Story = {
  args: {
    alt: "Kitchen sink mixed group avatar",
    fallback: "MX",
  },
  render: () => (
    <ark.div style={{ display: "flex", gap: "8px" }}>
      <Avatar src={VALID_IMAGE_SRC} alt="Loaded member" fallback="LD" />
      <Avatar src={BROKEN_IMAGE_SRC} alt="Broken member" fallback="BR" />
      <Avatar alt="No image member" fallback="NI" />
      <Avatar alt="Emoji member" fallback="🙂" />
    </ark.div>
  ),
};

/**
 * Kitchen sink: every configurable prop combined at once - image, alt,
 * fallback, ids, rootProps styling, and a status callback
 */
export const KitchenSinkAllPropsCombined: Story = {
  args: {
    src: VALID_IMAGE_SRC,
    alt: "Every prop combined avatar for Priya Natarajan",
    fallback: "PN",
    ids: {
      root: "all-props-root",
      image: "all-props-image",
      fallback: "all-props-fallback",
    },
    rootProps: {
      style: {
        width: "64px",
        height: "64px",
        borderRadius: "50%",
        border: "2px solid #489524",
        boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
        fontSize: "18px",
      },
    },
    onStatusChange: fn((details) => {
      console.log("Kitchen sink status ->", details.status);
    }),
  },
};
