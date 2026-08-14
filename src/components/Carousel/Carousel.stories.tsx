import type { Meta, StoryObj } from '@storybook/react-vite';
import Carousel from './Carousel';

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    autoplay: { control: 'boolean' },
    loop: { control: 'boolean' },
    showIndicators: { control: 'boolean' },
    showControls: { control: 'boolean' },
    images: { control: 'object' },
  },
  args: {
    images: [
      'https://picsum.photos/seed/1/500/300',
      'https://picsum.photos/seed/2/500/300',
      'https://picsum.photos/seed/3/500/300',
    ],
    showIndicators: true,
    showControls: true,
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const threeImages = [
  'https://picsum.photos/seed/1/500/300',
  'https://picsum.photos/seed/2/500/300',
  'https://picsum.photos/seed/3/500/300',
];

const fiveImages = [
  'https://picsum.photos/seed/1/500/300',
  'https://picsum.photos/seed/2/500/300',
  'https://picsum.photos/seed/3/500/300',
  'https://picsum.photos/seed/4/500/300',
  'https://picsum.photos/seed/5/500/300',
];

const textSlides = [
  { id: 'a', content: 'Slide A' },
  { id: 'b', content: 'Slide B' },
  { id: 'c', content: 'Slide C' },
];

export const Default: Story = {};

export const ThreeImages: Story = {
  args: { images: threeImages },
};

export const FiveImages: Story = {
  args: { images: fiveImages },
};

export const SingleImage: Story = {
  args: { images: ['https://picsum.photos/seed/10/500/300'] },
};

export const TwoImages: Story = {
  args: { images: ['https://picsum.photos/seed/11/500/300', 'https://picsum.photos/seed/12/500/300'] },
};

export const SixImages: Story = {
  args: {
    images: Array.from({ length: 6 }, (_, i) => `https://picsum.photos/seed/s${i}/500/300`),
  },
};

export const WithAutoplay: Story = {
  args: { images: threeImages, autoplay: true, loop: true },
};

export const WithLoop: Story = {
  args: { images: threeImages, loop: true },
};

export const AutoplayWithoutLoop: Story = {
  args: { images: threeImages, autoplay: true, loop: false },
};

export const WithoutIndicators: Story = {
  args: { images: threeImages, showIndicators: false },
};

export const WithoutControls: Story = {
  args: { images: threeImages, showControls: false },
};

export const IndicatorsOnly: Story = {
  args: { images: threeImages, showControls: false, showIndicators: true },
};

export const ControlsOnly: Story = {
  args: { images: threeImages, showControls: true, showIndicators: false },
};

export const MinimalChrome: Story = {
  args: { images: threeImages, showControls: false, showIndicators: false },
};

export const TextSlides: Story = {
  args: { slides: textSlides, images: undefined },
};

export const MixedTextSlides: Story = {
  args: {
    slides: [
      { id: '1', content: 'Welcome' },
      { id: '2', content: 'Features' },
      { id: '3', content: 'Pricing' },
      { id: '4', content: 'Contact' },
    ],
  },
};

export const RichContentSlides: Story = {
  args: {
    slides: [
      {
        id: 'hero',
        content: (
          <div>
            <strong>Hero</strong>
            <p>Explore the gallery</p>
          </div>
        ),
      },
      {
        id: 'cta',
        content: <button type="button">Get started</button>,
      },
      {
        id: 'stats',
        content: <span>42 products</span>,
      },
    ],
  },
};

export const ImageAsSlidesContent: Story = {
  args: {
    slides: [
      {
        id: 'img-1',
        content: <img src="https://picsum.photos/seed/21/500/300" alt="One" style={{ width: '100%', borderRadius: 8 }} />,
      },
      {
        id: 'img-2',
        content: <img src="https://picsum.photos/seed/22/500/300" alt="Two" style={{ width: '100%', borderRadius: 8 }} />,
      },
    ],
  },
};

export const SlidesTakesPrecedence: Story = {
  args: {
    slides: textSlides,
    images: fiveImages,
  },
};

export const NatureTheme: Story = {
  args: {
    images: ['https://picsum.photos/seed/nature1/500/300', 'https://picsum.photos/seed/nature2/500/300', 'https://picsum.photos/seed/nature3/500/300'],
  },
};

export const CityTheme: Story = {
  args: {
    images: ['https://picsum.photos/seed/city1/500/300', 'https://picsum.photos/seed/city2/500/300', 'https://picsum.photos/seed/city3/500/300'],
  },
};

export const OceanTheme: Story = {
  args: {
    images: ['https://picsum.photos/seed/ocean1/500/300', 'https://picsum.photos/seed/ocean2/500/300', 'https://picsum.photos/seed/ocean3/500/300'],
  },
};

export const MountainTheme: Story = {
  args: {
    images: ['https://picsum.photos/seed/mtn1/500/300', 'https://picsum.photos/seed/mtn2/500/300', 'https://picsum.photos/seed/mtn3/500/300'],
  },
};

export const ForestTheme: Story = {
  args: {
    images: ['https://picsum.photos/seed/forest1/500/300', 'https://picsum.photos/seed/forest2/500/300', 'https://picsum.photos/seed/forest3/500/300'],
  },
};

export const DesertTheme: Story = {
  args: {
    images: ['https://picsum.photos/seed/desert1/500/300', 'https://picsum.photos/seed/desert2/500/300'],
  },
};

export const LoopFiveImages: Story = {
  args: { images: fiveImages, loop: true },
};

export const AutoplayFiveImages: Story = {
  args: { images: fiveImages, autoplay: true, loop: true },
};

export const ManyIndicators: Story = {
  args: {
    images: Array.from({ length: 8 }, (_, i) => `https://picsum.photos/seed/many${i}/500/300`),
  },
};

export const EmptyImages: Story = {
  args: { images: [] },
};

export const EmptySlides: Story = {
  args: { slides: [] },
};

export const NumericLabels: Story = {
  args: {
    slides: [
      { id: '1', content: '1' },
      { id: '2', content: '2' },
      { id: '3', content: '3' },
    ],
  },
};

export const EmojiSlides: Story = {
  args: {
    slides: [
      { id: 'sun', content: '☀️ Sunny' },
      { id: 'rain', content: '🌧️ Rainy' },
      { id: 'snow', content: '❄️ Snowy' },
    ],
  },
};

export const LongLabelSlides: Story = {
  args: {
    slides: [
      {
        id: 'long',
        content:
          'This is a particularly long slide label meant to exercise wrapping and layout resilience in the carousel viewport.',
      },
      { id: 'short', content: 'Short' },
    ],
  },
};

export const RtlContent: Story = {
  args: {
    slides: [
      { id: 'he', content: 'שלום עולם' },
      { id: 'ar', content: 'مرحبا بالعالم' },
    ],
  },
};

export const KitchenSinkLoopAutoplay: Story = {
  args: {
    images: fiveImages,
    autoplay: true,
    loop: true,
    showControls: true,
    showIndicators: true,
  },
};

export const KitchenSinkMinimal: Story = {
  args: {
    slides: textSlides,
    autoplay: false,
    loop: false,
    showControls: false,
    showIndicators: false,
  },
};

export const FourTextSlidesWithLoop: Story = {
  args: {
    slides: [
      { id: 'w', content: 'Winter' },
      { id: 'sp', content: 'Spring' },
      { id: 'su', content: 'Summer' },
      { id: 'f', content: 'Fall' },
    ],
    loop: true,
  },
};

export const ProductGallery: Story = {
  args: {
    images: [
      'https://picsum.photos/seed/product1/500/300',
      'https://picsum.photos/seed/product2/500/300',
      'https://picsum.photos/seed/product3/500/300',
      'https://picsum.photos/seed/product4/500/300',
    ],
    showIndicators: true,
  },
};

export const OnboardingSlides: Story = {
  args: {
    slides: [
      { id: 'step1', content: 'Step 1 — Create account' },
      { id: 'step2', content: 'Step 2 — Verify email' },
      { id: 'step3', content: 'Step 3 — Start building' },
    ],
    showControls: true,
  },
};

export const WideAspectImages: Story = {
  args: {
    images: [
      'https://picsum.photos/seed/wide1/800/300',
      'https://picsum.photos/seed/wide2/800/300',
      'https://picsum.photos/seed/wide3/800/300',
    ],
  },
};

export const SquareAspectImages: Story = {
  args: {
    images: [
      'https://picsum.photos/seed/sq1/400/400',
      'https://picsum.photos/seed/sq2/400/400',
      'https://picsum.photos/seed/sq3/400/400',
    ],
  },
};

export const ColoredTextSlides: Story = {
  args: {
    slides: [
      { id: 'blue', content: <span style={{ color: 'hsl(212 100% 46%)' }}>Blue</span> },
      { id: 'green', content: <span style={{ color: '#66BF3C' }}>Green</span> },
      { id: 'orange', content: <span style={{ color: '#FF4400' }}>Orange</span> },
    ],
  },
};

export const ControlsHiddenLoop: Story = {
  args: { images: threeImages, showControls: false, loop: true },
};

export const IndicatorsHiddenAutoplay: Story = {
  args: { images: threeImages, showIndicators: false, autoplay: true, loop: true },
};

export const SingleTextSlide: Story = {
  args: { slides: [{ id: 'only', content: 'Only slide' }] },
};

export const DualSlidesNoIndicators: Story = {
  args: {
    slides: [
      { id: 'left', content: 'Left' },
      { id: 'right', content: 'Right' },
    ],
    showIndicators: false,
  },
};

export const GallerySeedBatch: Story = {
  args: {
    images: Array.from({ length: 4 }, (_, i) => `https://picsum.photos/seed/gallery${i}/500/300`),
    loop: true,
  },
};

export const PortfolioImages: Story = {
  args: {
    images: [
      'https://picsum.photos/seed/port1/500/300',
      'https://picsum.photos/seed/port2/500/300',
      'https://picsum.photos/seed/port3/500/300',
      'https://picsum.photos/seed/port4/500/300',
      'https://picsum.photos/seed/port5/500/300',
    ],
    showControls: true,
    showIndicators: true,
  },
};

export const FaqStyleSlides: Story = {
  args: {
    slides: [
      { id: 'q1', content: 'What is a carousel?' },
      { id: 'q2', content: 'How do indicators work?' },
      { id: 'q3', content: 'Can it autoplay?' },
    ],
  },
};

export const CompactTwoSlide: Story = {
  args: {
    images: ['https://picsum.photos/seed/c1/500/300', 'https://picsum.photos/seed/c2/500/300'],
    showIndicators: true,
    showControls: true,
  },
};
