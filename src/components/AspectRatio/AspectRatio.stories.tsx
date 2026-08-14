import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import AspectRatio from './AspectRatio';

const meta = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ratio: {
      control: { type: 'number', min: 0.1, max: 5, step: 0.1 },
      description: 'The aspect ratio of the container (e.g., 16/9, 4/3, 1)',
    },
    children: {
      control: false,
      description: 'Content to be rendered inside the aspect ratio container',
    },
  },
  args: {
    ratio: 1,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;
/* type RenderStory = Omit<Story, 'args'> & { args?: Partial<Story['args']> }; */ // Intesting concept

/**
 * Default AspectRatio with a 16:9 ratio and an image
 */
export const Default: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
        alt="Landscape"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </AspectRatio>
  ),
  args: {
    ratio: 16 / 9,
  },
};

/**
 * AspectRatio with 16:9 ratio (widescreen)
 */
export const Ratio16x9: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        16:9
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 16 / 9,
  },
};

/**
 * AspectRatio with 4:3 ratio (classic TV)
 */
export const Ratio4x3: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        4:3
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 4 / 3,
  },
};

/**
 * AspectRatio with 1:1 ratio (square)
 */
export const Ratio1x1: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        1:1
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 1,
  },
};

/**
 * AspectRatio with 21:9 ratio (ultra-wide)
 */
export const Ratio21x9: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        21:9
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 21 / 9,
  },
};

/**
 * AspectRatio with 9:16 ratio (vertical/portrait)
 */
export const Ratio9x16: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#333',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        9:16
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 9 / 16,
  },
};

/**
 * AspectRatio with an image that fills the container
 */
export const WithImage: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <img
        src="https://images.unsplash.com/photo-1469474968028-56623f02e42e"
        alt="Nature"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </AspectRatio>
  ),
  args: {
    ratio: 16 / 9,
  },
};

/**
 * AspectRatio with an image that contains (letterboxed)
 */
export const WithImageContain: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
        alt="Landscape"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          background: '#f0f0f0',
        }}
      />
    </AspectRatio>
  ),
  args: {
    ratio: 16 / 9,
  },
};

/**
 * AspectRatio with text content
 */
export const WithText: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#1f2937',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ margin: '0 0 16px 0', fontSize: '28px' }}>
          Aspect Ratio Container
        </h2>
        <p style={{ margin: 0, fontSize: '16px', opacity: 0.8 }}>
          This content maintains a 16:9 aspect ratio regardless of the container
          width.
        </p>
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 16 / 9,
  },
};

/**
 * AspectRatio with video element
 */
export const WithVideo: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <video
        controls
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        poster="https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
      >
        <source
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </AspectRatio>
  ),
  args: {
    ratio: 16 / 9,
  },
};

/**
 * Responsive AspectRatio that works at different container sizes
 */
export const Responsive: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 'clamp(16px, 4vw, 24px)',
          fontWeight: 'bold',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        Resize the window to see the responsive behavior
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 16 / 9,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Multiple AspectRatios in a grid layout
 */
export const MultipleRatios: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        width: '100%',
        maxWidth: '800px',
      }}
    >
      <AspectRatio ratio={1}>
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          1:1
        </div>
      </AspectRatio>
      <AspectRatio ratio={4 / 3}>
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#f59e0b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          4:3
        </div>
      </AspectRatio>
      <AspectRatio ratio={16 / 9}>
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          16:9
        </div>
      </AspectRatio>
      <AspectRatio ratio={21 / 9}>
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#3b82f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          21:9
        </div>
      </AspectRatio>
    </div>
  ),
};

/* -------------------------------------------------------------------------
 * Additional common ratios (5)
 * ---------------------------------------------------------------------- */

/**
 * AspectRatio with 2:3 ratio (portrait photo print)
 */
export const Ratio2x3: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#333',
          fontSize: '20px',
          fontWeight: 'bold',
        }}
      >
        2:3
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 2 / 3,
  },
};

/**
 * AspectRatio with 3:2 ratio (classic 35mm photo)
 */
export const Ratio3x2: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#333',
          fontSize: '20px',
          fontWeight: 'bold',
        }}
      >
        3:2
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 3 / 2,
  },
};

/**
 * AspectRatio with 5:4 ratio (large format photography)
 */
export const Ratio5x4: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#333',
          fontSize: '20px',
          fontWeight: 'bold',
        }}
      >
        5:4
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 5 / 4,
  },
};

/**
 * AspectRatio with 2:1 ratio (double-wide banner)
 */
export const Ratio2x1: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#333',
          fontSize: '20px',
          fontWeight: 'bold',
        }}
      >
        2:1
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 2,
  },
};

/**
 * AspectRatio using the golden ratio (~1.618:1)
 */
export const GoldenRatio: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#333',
          fontSize: '20px',
          fontWeight: 'bold',
        }}
      >
        Golden ratio (1.618:1)
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 1.618,
  },
};

/* -------------------------------------------------------------------------
 * Extreme ratios (5)
 * ---------------------------------------------------------------------- */

/**
 * Extremely wide ratio (100:1) that collapses the box to a thin strip
 */
export const UltraWide100x1: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#111827',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '10px',
        }}
      >
        100:1
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 100,
  },
};

/**
 * Extremely tall ratio (1:100) that produces a very large paddingBottom
 */
export const UltraTall1x100: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#111827',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '14px',
        }}
      >
        1:100
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 1 / 100,
  },
};

/**
 * Near-zero positive ratio, exercising very large paddingBottom percentages
 */
export const NearZeroRatio: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#312e81',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '14px',
        }}
      >
        ratio = 0.02
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 0.02,
  },
};

/**
 * Very large ratio number, exercising a paddingBottom close to zero
 */
export const VeryLargeRatioNumber: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#065f46',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '10px',
        }}
      >
        ratio = 1000
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 1000,
  },
};

/**
 * Tiny fractional ratio just above zero
 */
export const TinyFractionalRatio: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#7c2d12',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '14px',
        }}
      >
        ratio = 0.05
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 0.05,
  },
};

/* -------------------------------------------------------------------------
 * Children content variations (6)
 * ---------------------------------------------------------------------- */

/**
 * A plain solid-color div with no additional layout of its own
 */
export const SolidColorDiv: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div style={{ width: '100%', height: '100%', background: '#e81c61' }} />
    </AspectRatio>
  ),
  args: {
    ratio: 16 / 9,
  },
};

/**
 * A nested "card" component composed of multiple child elements
 */
export const NestedCardComponent: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div style={{ flex: 1, background: '#f1f5f9' }} />
        <div style={{ padding: '12px' }}>
          <h4 style={{ margin: '0 0 4px 0', fontSize: '14px' }}>Card title</h4>
          <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
            Nested card content inside an AspectRatio
          </p>
        </div>
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 4 / 3,
  },
};

/**
 * Plain text content with no wrapping container styling
 */
export const TextOnlyContent: Story = {
  render: (args) => (
    <AspectRatio {...args}>Plain text content, no wrapper div</AspectRatio>
  ),
  args: {
    ratio: 16 / 9,
  },
};

/**
 * AspectRatio rendered with no children at all
 */
export const NoChildren: Story = {
  args: {
    ratio: 16 / 9,
  },
};

/**
 * AspectRatio containing a list of items
 */
export const ListContent: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <ul
        style={{
          margin: 0,
          padding: '16px 16px 16px 32px',
          background: '#fef9c3',
          width: '100%',
          height: '100%',
          overflow: 'auto',
          boxSizing: 'border-box',
        }}
      >
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
      </ul>
    </AspectRatio>
  ),
  args: {
    ratio: 4 / 3,
  },
};

/**
 * AspectRatio containing an interactive button element
 */
export const ButtonContent: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <button
        type="button"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          background: '#3b82f6',
          color: 'white',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Click me
      </button>
    </AspectRatio>
  ),
  args: {
    ratio: 2,
  },
};

/* -------------------------------------------------------------------------
 * Container width constraints (5)
 * ---------------------------------------------------------------------- */

/**
 * AspectRatio inside a very narrow (100px) container
 */
export const NarrowContainer100px: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0ea5e9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '10px',
        }}
      >
        Narrow
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 1,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100px' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * AspectRatio inside a very wide (1200px) container
 */
export const WideContainer1200px: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#9333ea',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        Wide (1200px container)
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 21 / 9,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '1200px', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * AspectRatio inside a percentage-width (50%) parent container
 */
export const PercentageWidthContainer: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#16a34a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '16px',
        }}
      >
        50% width parent
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 16 / 9,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '800px', maxWidth: '100%' }}>
        <div style={{ width: '50%' }}>
          <Story />
        </div>
      </div>
    ),
  ],
};

/**
 * AspectRatio placed inside a flex row alongside another element, exercising
 * flex-basis/shrink behavior
 */
export const FlexRowContainer: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#dc2626',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '14px',
        }}
      >
        In a flex row
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 1,
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', gap: '12px', width: '500px' }}>
        <div style={{ flex: 1 }}>
          <Story />
        </div>
        <div
          style={{
            flex: 1,
            background: '#f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
          }}
        >
          Sibling flex item
        </div>
      </div>
    ),
  ],
};

/**
 * AspectRatio constrained to a typical mobile viewport width (320px)
 */
export const MobileSizedContainer: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#f97316',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '14px',
        }}
      >
        Mobile (320px)
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 16 / 9,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

/* -------------------------------------------------------------------------
 * Content sizing combinations (4)
 * ---------------------------------------------------------------------- */

/**
 * A fixed-pixel child larger than the container, exercising overflow:hidden
 * clipping on the outer element
 */
export const OversizedFixedPixelChild: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '2000px',
          height: '2000px',
          background:
            'repeating-linear-gradient(45deg, #f43f5e, #f43f5e 20px, #fb7185 20px, #fb7185 40px)',
        }}
      />
    </AspectRatio>
  ),
  args: {
    ratio: 16 / 9,
  },
};

/**
 * Content that adds its own internal padding/box-sizing inside the absolutely
 * positioned wrapper
 */
export const ContentWithInternalPadding: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
          padding: '24px',
          background: '#eef2ff',
          border: '2px dashed #6366f1',
        }}
      >
        Content with 24px internal padding and a dashed border
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 4 / 3,
  },
};

/**
 * An image with a caption overlay pinned to the bottom
 */
export const ImageWithCaptionOverlay: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e"
          alt="Nature"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '8px 12px',
            background: 'rgba(0,0,0,0.6)',
            color: 'white',
            fontSize: '12px',
          }}
        >
          Caption overlay pinned to the bottom
        </div>
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 16 / 9,
  },
};

/**
 * An embed-style placeholder (e.g. for an iframe) filling the container
 */
export const IframePlaceholder: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#1e293b',
          color: '#94a3b8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          fontFamily: 'monospace',
        }}
      >
        {'<iframe> placeholder'}
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 16 / 9,
  },
};

/* -------------------------------------------------------------------------
 * Ratio edge cases: zero and negative (2)
 * ---------------------------------------------------------------------- */

/**
 * A ratio of zero. `paddingBottom` computes to `${1/0 * 100}%`, which
 * evaluates to the string "Infinity%" - an invalid CSS length that browsers
 * ignore, so the box collapses to the height of its content.
 */
export const ZeroRatio: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          background: '#78350f',
          color: 'white',
          padding: '16px',
          fontSize: '14px',
        }}
      >
        ratio = 0 (invalid paddingBottom, box collapses)
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 0,
  },
};

/**
 * A negative ratio. `paddingBottom` computes to a negative percentage, which
 * is an invalid value for the `padding-bottom` CSS property, so it is
 * ignored by the browser and the box collapses to the height of its content.
 */
export const NegativeRatio: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          background: '#7f1d1d',
          color: 'white',
          padding: '16px',
          fontSize: '14px',
        }}
      >
        ratio = -1 (negative paddingBottom is invalid CSS)
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: -1,
  },
};

/* -------------------------------------------------------------------------
 * Background contexts (2)
 * ---------------------------------------------------------------------- */

/**
 * AspectRatio rendered on a dark page background
 */
export const OnDarkBackground: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#334155',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '16px',
        }}
      >
        On dark background
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 16 / 9,
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#0f172a', padding: '24px', borderRadius: '8px' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * AspectRatio rendered against a light, patterned background
 */
export const OnLightBackgroundPattern: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'rgba(255,255,255,0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#1f2937',
          fontSize: '16px',
        }}
      >
        On a light pattern
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 16 / 9,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          background:
            'repeating-linear-gradient(45deg, #f1f5f9, #f1f5f9 10px, #e2e8f0 10px, #e2e8f0 20px)',
          padding: '24px',
          borderRadius: '8px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

/* -------------------------------------------------------------------------
 * Gallery/grid layouts (2)
 * ---------------------------------------------------------------------- */

/**
 * A masonry-like gallery mixing several different ratios in one grid
 */
export const MasonryGalleryMixedRatios: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        width: '100%',
        maxWidth: '700px',
      }}
    >
      {[1, 4 / 3, 16 / 9, 9 / 16, 2, 3 / 2].map((ratio, index) => (
        <AspectRatio key={index} ratio={ratio}>
          <div
            style={{
              width: '100%',
              height: '100%',
              background: `hsl(${index * 60}, 70%, 60%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            {ratio.toFixed(2)}
          </div>
        </AspectRatio>
      ))}
    </div>
  ),
};

/**
 * A responsive grid repeating a single ratio across many tiles
 */
export const ResponsiveGridRepeatedRatio: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '8px',
        width: '100%',
        maxWidth: '700px',
      }}
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <AspectRatio key={index} ratio={1}>
          <div
            style={{
              width: '100%',
              height: '100%',
              background: '#0ea5e9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
            }}
          >
            {index + 1}
          </div>
        </AspectRatio>
      ))}
    </div>
  ),
};

/* -------------------------------------------------------------------------
 * Kitchen-sink combinations (2)
 * ---------------------------------------------------------------------- */

/**
 * Kitchen sink: non-standard ratio, narrow container, image with a caption
 * overlay
 */
export const KitchenSinkNarrowCaptioned: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
          alt="Landscape"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '6px 8px',
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            fontSize: '10px',
          }}
        >
          Kitchen sink caption
        </div>
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 5 / 7,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '150px' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Kitchen sink: wide container, video element, custom ratio
 */
export const KitchenSinkWideVideoCustomRatio: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <video
        controls
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        poster="https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
      >
        <source
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </AspectRatio>
  ),
  args: {
    ratio: 2.35,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '1000px', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
};

/* -------------------------------------------------------------------------
 * Nested composition (1)
 * ---------------------------------------------------------------------- */

/**
 * An AspectRatio nested inside another AspectRatio, e.g. a square thumbnail
 * pinned inside a wider banner
 */
export const NestedAspectRatio: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#1e293b',
          display: 'flex',
          alignItems: 'center',
          padding: '16px',
          boxSizing: 'border-box',
          gap: '16px',
        }}
      >
        <div style={{ width: '30%' }}>
          <AspectRatio ratio={1}>
            <div
              style={{
                width: '100%',
                height: '100%',
                background: '#f59e0b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
              }}
            >
              Inner 1:1
            </div>
          </AspectRatio>
        </div>
        <div style={{ color: 'white', fontSize: '14px' }}>
          Outer 21:9 banner with an inner 1:1 thumbnail
        </div>
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 21 / 9,
  },
};

/* -------------------------------------------------------------------------
 * Decimal ratio precision (1)
 * ---------------------------------------------------------------------- */

/**
 * A ratio expressed as a long repeating decimal (16/9 = 1.7777...), verifying
 * the computed paddingBottom percentage still renders without visual defects
 */
export const DecimalRatioPrecision: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#7c3aed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '14px',
        }}
      >
        ratio = 1.3333333333333333
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 1.3333333333333333,
  },
};

/* -------------------------------------------------------------------------
 * Dynamic/interactive ratio combinations (2)
 * ---------------------------------------------------------------------- */

/**
 * Buttons swap the `ratio` prop at runtime, demonstrating that the component
 * re-renders its paddingBottom whenever the ratio changes
 */
export const DynamicRatioSwitching: Story = {
  render: () => {
    const RatioSwitcher = () => {
      const ratios: Array<{ label: string; value: number }> = [
        { label: '16:9', value: 16 / 9 },
        { label: '4:3', value: 4 / 3 },
        { label: '1:1', value: 1 },
        { label: '9:16', value: 9 / 16 },
      ];
      const [ratio, setRatio] = useState(ratios[0].value);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {ratios.map((option) => (
              <button
                key={option.label}
                onClick={() => setRatio(option.value)}
                style={{
                  padding: '6px 12px',
                  border: '1px solid #cbd5e1',
                  borderRadius: '4px',
                  background: ratio === option.value ? '#3b82f6' : 'white',
                  color: ratio === option.value ? 'white' : '#1f2937',
                  cursor: 'pointer',
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
          <AspectRatio ratio={ratio}>
            <div
              style={{
                width: '100%',
                height: '100%',
                background: '#0f766e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '16px',
              }}
            >
              Current ratio: {ratio.toFixed(3)}
            </div>
          </AspectRatio>
        </div>
      );
    };

    return <RatioSwitcher />;
  },
};

/**
 * A slider toggles between preset container widths so the same AspectRatio
 * can be seen resizing responsively
 */
export const ResizablePreviewToggle: Story = {
  render: (args) => {
    const ResizablePreview = () => {
      const widths = [240, 480, 720];
      const [width, setWidth] = useState(widths[1]);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {widths.map((w) => (
              <button
                key={w}
                onClick={() => setWidth(w)}
                style={{
                  padding: '6px 12px',
                  border: '1px solid #cbd5e1',
                  borderRadius: '4px',
                  background: width === w ? '#3b82f6' : 'white',
                  color: width === w ? 'white' : '#1f2937',
                  cursor: 'pointer',
                }}
              >
                {w}px
              </button>
            ))}
          </div>
          <div style={{ width: `${width}px`, maxWidth: '100%' }}>
            <AspectRatio {...args}>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: '#be185d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px',
                }}
              >
                Container width: {width}px
              </div>
            </AspectRatio>
          </div>
        </div>
      );
    };

    return <ResizablePreview />;
  },
  args: {
    ratio: 16 / 9,
  },
};

/* -------------------------------------------------------------------------
 * Empty content edge case (1)
 * ---------------------------------------------------------------------- */

/**
 * An empty string is passed as children, exercising the falsy-but-defined
 * children edge case
 */
export const EmptyStringChildContent: Story = {
  args: {
    ratio: 16 / 9,
    children: '',
  },
};
