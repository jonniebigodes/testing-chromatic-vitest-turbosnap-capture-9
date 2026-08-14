import { Carousel as ArkCarousel } from '@ark-ui/react/carousel';
import type { CSSProperties, ReactNode } from 'react';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';

export interface CarouselSlide {
  id: string;
  content: ReactNode;
}

export interface CarouselProps {
  /**
   * Custom slides with id and content. Takes precedence over `images`.
   */
  slides?: CarouselSlide[];
  /**
   * Image URLs rendered as slides when `slides` is not provided.
   */
  images?: string[];
  /**
   * Whether to autoplay the carousel
   */
  autoplay?: boolean;
  /**
   * Whether the carousel should loop
   */
  loop?: boolean;
  /**
   * Whether to show page indicators
   * @default true
   */
  showIndicators?: boolean;
  /**
   * Whether to show prev/next controls
   * @default true
   */
  showControls?: boolean;
}

const INDICATOR_STYLE_ID = 'ark-carousel-indicator-current';

const ensureIndicatorStyles = () => {
  if (typeof document === 'undefined') return;
  if (document.getElementById(INDICATOR_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = INDICATOR_STYLE_ID;
  style.textContent = `
    [data-scope="carousel"][data-part="indicator"][data-current] {
      background-color: ${color.blue500} !important;
    }
  `;
  document.head.appendChild(style);
};

const rootStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[4],
  position: 'relative',
  width: '100%',
  maxWidth: '32rem',
  fontFamily: 'inherit',
};

const controlStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: spacing[2],
};

const itemGroupStyles: CSSProperties = {
  display: 'flex',
  flex: 1,
  minWidth: 0,
  overflow: 'hidden',
  borderRadius: spacing[2],
};

const itemStyles: CSSProperties = {
  flex: '0 0 100%',
  minWidth: 0,
};

const slideContentStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  minHeight: '12rem',
  backgroundColor: color.slate100,
  border: `1px solid ${color.slate300}`,
  borderRadius: spacing[2],
  fontSize: fontSize[18],
  fontWeight: fontWeight.medium,
  color: color.slate800,
  boxSizing: 'border-box',
};

const imageStyles: CSSProperties = {
  display: 'block',
  width: '100%',
  height: '100%',
  minHeight: '12rem',
  objectFit: 'cover',
  borderRadius: spacing[2],
  backgroundColor: color.slate100,
};

const triggerStyles: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: spacing[8],
  height: spacing[8],
  padding: 0,
  fontSize: fontSize[16],
  fontWeight: fontWeight.medium,
  fontFamily: 'inherit',
  borderRadius: spacing[2],
  backgroundColor: color.white,
  border: `1px solid ${color.slate300}`,
  color: color.slate700,
  cursor: 'pointer',
  flexShrink: 0,
};

const indicatorGroupStyles: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: spacing[2],
};

const indicatorStyles: CSSProperties = {
  width: '0.625rem',
  height: '0.625rem',
  backgroundColor: color.slate300,
  borderRadius: '9999px',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
};

const resolveSlides = (
  slides?: CarouselSlide[],
  images?: string[]
): CarouselSlide[] => {
  if (slides && slides.length > 0) return slides;
  if (images && images.length > 0) {
    return images.map((src, index) => ({
      id: `image-${index}`,
      content: (
        <img src={src} alt={`Slide ${index + 1}`} style={imageStyles} />
      ),
    }));
  }
  return [];
};

/**
 * Carousel component built with Ark UI Carousel.
 */
const Carousel = ({
  slides,
  images,
  autoplay = false,
  loop = false,
  showIndicators = true,
  showControls = true,
}: CarouselProps) => {
  ensureIndicatorStyles();
  const resolved = resolveSlides(slides, images);
  const slideCount = resolved.length;

  return (
    <ArkCarousel.Root
      style={rootStyles}
      slideCount={slideCount}
      autoplay={autoplay}
      loop={loop}
    >
      <ArkCarousel.Control style={controlStyles}>
        {showControls ? (
          <ArkCarousel.PrevTrigger style={triggerStyles} aria-label="Previous">
            ‹
          </ArkCarousel.PrevTrigger>
        ) : null}
        <ArkCarousel.ItemGroup style={itemGroupStyles}>
          {resolved.map((slide, index) => (
            <ArkCarousel.Item key={slide.id} index={index} style={itemStyles}>
              <div style={slideContentStyles}>{slide.content}</div>
            </ArkCarousel.Item>
          ))}
        </ArkCarousel.ItemGroup>
        {showControls ? (
          <ArkCarousel.NextTrigger style={triggerStyles} aria-label="Next">
            ›
          </ArkCarousel.NextTrigger>
        ) : null}
      </ArkCarousel.Control>
      {showIndicators ? (
        <ArkCarousel.IndicatorGroup style={indicatorGroupStyles}>
          {resolved.map((slide, index) => (
            <ArkCarousel.Indicator
              key={slide.id}
              index={index}
              style={indicatorStyles}
            />
          ))}
        </ArkCarousel.IndicatorGroup>
      ) : null}
    </ArkCarousel.Root>
  );
};

export default Carousel;
