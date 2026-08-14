import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import Image from './Image';
import { color } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

// Local data: URIs instead of remote fetches (picsum.photos) to avoid real-network flakiness in browser-mode tests.
const DEFAULT_SRC =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';
const FALLBACK_SRC =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
// Same-origin, guaranteed-404 paths for "broken image" tests — no DNS lookup, fails fast and deterministically.
const BROKEN_SRC = '/__fixtures__/does-not-exist.png';
const BROKEN_FALLBACK_SRC = '/__fixtures__/also-does-not-exist.png';

/** Wraps a raw HTMLElement into a Locator so jest-dom matchers can be used. */
const locatorFor = (element: HTMLElement) => page.elementLocator(element);

/** The image is rendered as a single <img> that is the root of the component. */
const getImage = (container: HTMLElement) =>
  container.querySelector('img') as HTMLImageElement;

describe('Image', () => {
  /* -----------------------------------------------------------------------
   * Rendering basics (6)
   * -------------------------------------------------------------------- */

  it('renders an img element with the provided src', async () => {
    const screen = await render(
      <Image src={DEFAULT_SRC} alt="Sample" width={200} height={150} />
    );
    const img = getImage(screen.container);
    expect(img.tagName).toBe('IMG');
    expect(img.getAttribute('src')).toBe(DEFAULT_SRC);
    await takeSnapshot(`Image - renders an img element with the provided src`);
  });

  it('renders the provided alt text', async () => {
    const screen = await render(
      <Image src={DEFAULT_SRC} alt="Accessible alt" width={200} height={150} />
    );
    await expect
      .element(screen.getByAltText('Accessible alt'))
      .toBeInTheDocument();
    await takeSnapshot(`Image - renders the provided alt text`);
  });

  it('applies numeric width and height as inline styles', async () => {
    const screen = await render(
      <Image src={DEFAULT_SRC} alt="Dims" width={250} height={150} />
    );
    const img = getImage(screen.container);
    await expect
      .element(locatorFor(img))
      .toHaveStyle({ width: '250px', height: '150px' });
    await takeSnapshot(`Image - applies numeric width and height as inline styles`);
  });

  it('applies string width and height as inline styles', async () => {
    const screen = await render(
      <Image
        src={DEFAULT_SRC}
        alt="String dims"
        width="100%"
        height="180px"
      />
    );
    const img = getImage(screen.container);
    await expect
      .element(locatorFor(img))
      .toHaveStyle({ width: '100%', height: '180px' });
    await takeSnapshot(`Image - applies string width and height as inline styles`);
  });

  it('defaults width and height to auto when omitted', async () => {
    const screen = await render(<Image src={DEFAULT_SRC} alt="Auto" />);
    const img = getImage(screen.container);
    await expect
      .element(locatorFor(img))
      .toHaveStyle({ width: 'auto', height: 'auto' });
    await takeSnapshot(`Image - defaults width and height to auto when omitted`);
  });

  it('uses block display and max-width 100%', async () => {
    const screen = await render(
      <Image src={DEFAULT_SRC} alt="Block" width={200} height={150} />
    );
    const img = getImage(screen.container);
    await expect
      .element(locatorFor(img))
      .toHaveStyle({ display: 'block', maxWidth: '100%' });
    await takeSnapshot(`Image - uses block display and max-width 100%`);
  });

  /* -----------------------------------------------------------------------
   * Object-fit modes (5)
   * -------------------------------------------------------------------- */

  it('defaults objectFit to cover', async () => {
    const screen = await render(
      <Image src={DEFAULT_SRC} alt="Default fit" width={200} height={150} />
    );
    const img = getImage(screen.container);
    await expect.element(locatorFor(img)).toHaveStyle({ objectFit: 'cover' });
    await takeSnapshot(`Image - defaults objectFit to cover`);
  });

  it('applies objectFit cover when specified', async () => {
    const screen = await render(
      <Image
        src={DEFAULT_SRC}
        alt="Cover"
        width={200}
        height={150}
        objectFit="cover"
      />
    );
    const img = getImage(screen.container);
    await expect.element(locatorFor(img)).toHaveStyle({ objectFit: 'cover' });
    await takeSnapshot(`Image - applies objectFit cover when specified`);
  });

  it('applies objectFit contain when specified', async () => {
    const screen = await render(
      <Image
        src={DEFAULT_SRC}
        alt="Contain"
        width={200}
        height={150}
        objectFit="contain"
      />
    );
    const img = getImage(screen.container);
    await expect.element(locatorFor(img)).toHaveStyle({ objectFit: 'contain' });
    await takeSnapshot(`Image - applies objectFit contain when specified`);
  });

  it('applies objectFit fill when specified', async () => {
    const screen = await render(
      <Image
        src={DEFAULT_SRC}
        alt="Fill"
        width={200}
        height={150}
        objectFit="fill"
      />
    );
    const img = getImage(screen.container);
    await expect.element(locatorFor(img)).toHaveStyle({ objectFit: 'fill' });
    await takeSnapshot(`Image - applies objectFit fill when specified`);
  });

  it('applies objectFit none when specified', async () => {
    const screen = await render(
      <Image
        src={DEFAULT_SRC}
        alt="None"
        width={200}
        height={150}
        objectFit="none"
      />
    );
    const img = getImage(screen.container);
    await expect.element(locatorFor(img)).toHaveStyle({ objectFit: 'none' });
    await takeSnapshot(`Image - applies objectFit none when specified`);
  });

  /* -----------------------------------------------------------------------
   * Rounded & borderRadius (6)
   * -------------------------------------------------------------------- */

  it('applies fully rounded corners when rounded is true', async () => {
    const screen = await render(
      <Image
        src={DEFAULT_SRC}
        alt="Rounded"
        width={100}
        height={100}
        rounded
      />
    );
    const img = getImage(screen.container);
    await expect
      .element(locatorFor(img))
      .toHaveStyle({ borderRadius: '9999px' });
    await takeSnapshot(`Image - applies fully rounded corners when rounded is true`);
  });

  it('applies default spacing border radius when rounded is false', async () => {
    const screen = await render(
      <Image
        src={DEFAULT_SRC}
        alt="Not rounded"
        width={200}
        height={150}
        rounded={false}
      />
    );
    const img = getImage(screen.container);
    await expect
      .element(locatorFor(img))
      .toHaveStyle({ borderRadius: '0.5rem' });
    await takeSnapshot(`Image - applies default spacing border radius when rounded is false`);
  });

  it('defaults rounded to false', async () => {
    const screen = await render(
      <Image src={DEFAULT_SRC} alt="Default radius" width={200} height={150} />
    );
    const img = getImage(screen.container);
    await expect
      .element(locatorFor(img))
      .toHaveStyle({ borderRadius: '0.5rem' });
    await takeSnapshot(`Image - defaults rounded to false`);
  });

  it('applies a custom borderRadius when provided', async () => {
    const screen = await render(
      <Image
        src={DEFAULT_SRC}
        alt="Custom radius"
        width={200}
        height={150}
        borderRadius="16px"
      />
    );
    const img = getImage(screen.container);
    await expect
      .element(locatorFor(img))
      .toHaveStyle({ borderRadius: '16px' });
    await takeSnapshot(`Image - applies a custom borderRadius when provided`);
  });

  it('lets borderRadius override the rounded prop', async () => {
    const screen = await render(
      <Image
        src={DEFAULT_SRC}
        alt="Override"
        width={100}
        height={100}
        rounded
        borderRadius="4px"
      />
    );
    const img = getImage(screen.container);
    await expect.element(locatorFor(img)).toHaveStyle({ borderRadius: '4px' });
    await takeSnapshot(`Image - lets borderRadius override the rounded prop`);
  });

  it('applies zero border radius when borderRadius is 0px', async () => {
    const screen = await render(
      <Image
        src={DEFAULT_SRC}
        alt="Zero radius"
        width={200}
        height={150}
        borderRadius="0px"
      />
    );
    const img = getImage(screen.container);
    await expect.element(locatorFor(img)).toHaveStyle({ borderRadius: '0px' });
    await takeSnapshot(`Image - applies zero border radius when borderRadius is 0px`);
  });

  /* -----------------------------------------------------------------------
   * Fallback / onError (4)
   * -------------------------------------------------------------------- */

  it('keeps the original src when the image loads successfully with a fallback configured', async () => {
    const screen = await render(
      <Image
        src={DEFAULT_SRC}
        alt="With fallback"
        width={200}
        height={150}
        fallbackSrc={FALLBACK_SRC}
      />
    );
    const img = getImage(screen.container);
    expect(img.getAttribute('src')).toBe(DEFAULT_SRC);
    await takeSnapshot(`Image - keeps the original src when the image loads successfully with a fallback configured`);
  });

  it('switches to fallbackSrc when the primary src fails to load', async () => {
    const screen = await render(
      <Image
        src={BROKEN_SRC}
        alt="Broken with fallback"
        width={200}
        height={150}
        fallbackSrc={FALLBACK_SRC}
      />
    );
    const img = getImage(screen.container);

    // Trigger error manually in case network timing varies
    img.dispatchEvent(new Event('error'));

    // Allow React state update
    await expect
      .poll(() => getImage(screen.container).getAttribute('src'))
      .toBe(FALLBACK_SRC);
    await takeSnapshot(`Image - switches to fallbackSrc when the primary src fails to load`);
  });

  it('does not change src on error when no fallbackSrc is provided', async () => {
    const broken = BROKEN_SRC;
    const screen = await render(
      <Image src={broken} alt="Broken no fallback" width={200} height={150} />
    );
    const img = getImage(screen.container);
    img.dispatchEvent(new Event('error'));
    expect(getImage(screen.container).getAttribute('src')).toBe(broken);
    await takeSnapshot(`Image - does not change src on error when no fallbackSrc is provided`);
  });

  it('only applies fallbackSrc once even if fallback also errors', async () => {
    const screen = await render(
      <Image
        src={BROKEN_SRC}
        alt="Double error"
        width={200}
        height={150}
        fallbackSrc={BROKEN_FALLBACK_SRC}
      />
    );
    const img = getImage(screen.container);
    img.dispatchEvent(new Event('error'));
    await expect
      .poll(() => getImage(screen.container).getAttribute('src'))
      .toBe(BROKEN_FALLBACK_SRC);

    getImage(screen.container).dispatchEvent(new Event('error'));
    expect(getImage(screen.container).getAttribute('src')).toBe(
      BROKEN_FALLBACK_SRC
    );
    await takeSnapshot(`Image - only applies fallbackSrc once even if fallback also errors`);
  });

  /* -----------------------------------------------------------------------
   * Background & layout styles (3)
   * -------------------------------------------------------------------- */

  it('applies a slate100 background color behind the image', async () => {
    const screen = await render(
      <Image src={DEFAULT_SRC} alt="Bg" width={200} height={150} />
    );
    const img = getImage(screen.container);
    await expect
      .element(locatorFor(img))
      .toHaveStyle({ backgroundColor: color.slate100 });
    await takeSnapshot(`Image - applies a slate100 background color behind the image`);
  });

  it('renders a wide landscape crop with cover', async () => {
    const screen = await render(
      <Image
        src={DEFAULT_SRC}
        alt="Wide"
        width={480}
        height={200}
        objectFit="cover"
      />
    );
    const img = getImage(screen.container);
    await expect
      .element(locatorFor(img))
      .toHaveStyle({ width: '480px', height: '200px', objectFit: 'cover' });
    await takeSnapshot(`Image - renders a wide landscape crop with cover`);
  });

  it('renders a tall portrait crop with cover', async () => {
    const screen = await render(
      <Image
        src={DEFAULT_SRC}
        alt="Tall"
        width={200}
        height={320}
        objectFit="cover"
      />
    );
    const img = getImage(screen.container);
    await expect
      .element(locatorFor(img))
      .toHaveStyle({ width: '200px', height: '320px', objectFit: 'cover' });
    await takeSnapshot(`Image - renders a tall portrait crop with cover`);
  });

  /* -----------------------------------------------------------------------
   * Size variants / thumbnails (5)
   * -------------------------------------------------------------------- */

  it('renders a small rounded thumbnail correctly', async () => {
    const screen = await render(
      <Image
        src={DEFAULT_SRC}
        alt="Thumb"
        width={64}
        height={64}
        objectFit="cover"
        rounded
      />
    );
    const img = getImage(screen.container);
    await expect.element(locatorFor(img)).toHaveStyle({
      width: '64px',
      height: '64px',
      borderRadius: '9999px',
      objectFit: 'cover',
    });
    await takeSnapshot(`Image - renders a small rounded thumbnail correctly`);
  });

  it('renders a tiny 32px rounded image', async () => {
    const screen = await render(
      <Image
        src={DEFAULT_SRC}
        alt="Tiny"
        width={32}
        height={32}
        rounded
        objectFit="cover"
      />
    );
    const img = getImage(screen.container);
    await expect.element(locatorFor(img)).toHaveStyle({
      width: '32px',
      height: '32px',
      borderRadius: '9999px',
    });
    await takeSnapshot(`Image - renders a tiny 32px rounded image`);
  });

  it('renders a large hero-style image', async () => {
    const screen = await render(
      <Image
        src={DEFAULT_SRC}
        alt="Hero"
        width={560}
        height={280}
        objectFit="cover"
      />
    );
    const img = getImage(screen.container);
    await expect
      .element(locatorFor(img))
      .toHaveStyle({ width: '560px', height: '280px' });
    await takeSnapshot(`Image - renders a large hero-style image`);
  });

  it('applies rem-based string dimensions', async () => {
    const screen = await render(
      <Image
        src={DEFAULT_SRC}
        alt="Rem"
        width="18rem"
        height="12rem"
        objectFit="cover"
      />
    );
    const img = getImage(screen.container);
    await expect
      .element(locatorFor(img))
      .toHaveStyle({ width: '18rem', height: '12rem' });
    await takeSnapshot(`Image - applies rem-based string dimensions`);
  });

  it('renders an avatar-style circular image', async () => {
    const screen = await render(
      <Image
        src={DEFAULT_SRC}
        alt="Avatar"
        width={96}
        height={96}
        rounded
        objectFit="cover"
      />
    );
    const img = getImage(screen.container);
    await expect.element(locatorFor(img)).toHaveStyle({
      width: '96px',
      height: '96px',
      borderRadius: '9999px',
    });
    await takeSnapshot(`Image - renders an avatar-style circular image`);
  });

  /* -----------------------------------------------------------------------
   * Kitchen-sink combos (5)
   * -------------------------------------------------------------------- */

  it('renders kitchen-sink combo: rounded cover thumbnail with fallback', async () => {
    const screen = await render(
      <Image
        src={DEFAULT_SRC}
        alt="Kitchen sink rounded"
        width={120}
        height={120}
        objectFit="cover"
        rounded
        fallbackSrc={FALLBACK_SRC}
      />
    );
    const img = getImage(screen.container);
    await expect.element(locatorFor(img)).toHaveStyle({
      width: '120px',
      height: '120px',
      objectFit: 'cover',
      borderRadius: '9999px',
    });
    expect(img.getAttribute('src')).toBe(DEFAULT_SRC);
    await takeSnapshot(`Image - renders kitchen-sink combo: rounded cover thumbnail with fallback`);
  });

  it('renders kitchen-sink combo: custom radius fill with string dims', async () => {
    const screen = await render(
      <Image
        src={DEFAULT_SRC}
        alt="Kitchen sink fill"
        width="240px"
        height="160px"
        objectFit="fill"
        borderRadius="12px"
      />
    );
    const img = getImage(screen.container);
    await expect.element(locatorFor(img)).toHaveStyle({
      width: '240px',
      height: '160px',
      objectFit: 'fill',
      borderRadius: '12px',
    });
    await takeSnapshot(`Image - renders kitchen-sink combo: custom radius fill with string dims`);
  });

  it('renders kitchen-sink combo: wide contain with fallback', async () => {
    const screen = await render(
      <Image
        src={DEFAULT_SRC}
        alt="Kitchen sink wide"
        width={400}
        height={160}
        objectFit="contain"
        fallbackSrc={FALLBACK_SRC}
      />
    );
    const img = getImage(screen.container);
    await expect.element(locatorFor(img)).toHaveStyle({
      width: '400px',
      height: '160px',
      objectFit: 'contain',
    });
    await takeSnapshot(`Image - renders kitchen-sink combo: wide contain with fallback`);
  });

  it('renders kitchen-sink combo: fill with rounded corners', async () => {
    const screen = await render(
      <Image
        src={DEFAULT_SRC}
        alt="Fill rounded"
        width={200}
        height={200}
        objectFit="fill"
        rounded
      />
    );
    const img = getImage(screen.container);
    await expect.element(locatorFor(img)).toHaveStyle({
      objectFit: 'fill',
      borderRadius: '9999px',
    });
    await takeSnapshot(`Image - renders kitchen-sink combo: fill with rounded corners`);
  });

  it('renders kitchen-sink combo: cover with zero radius and fallback', async () => {
    const screen = await render(
      <Image
        src={DEFAULT_SRC}
        alt="Cover zero fallback"
        width={300}
        height={200}
        objectFit="cover"
        borderRadius="0px"
        fallbackSrc={FALLBACK_SRC}
      />
    );
    const img = getImage(screen.container);
    await expect.element(locatorFor(img)).toHaveStyle({
      objectFit: 'cover',
      borderRadius: '0px',
    });
    await takeSnapshot(`Image - renders kitchen-sink combo: cover with zero radius and fallback`);
  });

  /* -----------------------------------------------------------------------
   * Multi-instance & re-render (5)
   * -------------------------------------------------------------------- */

  it('renders multiple images each maintaining independent styles', async () => {
    const screen = await render(
      <div>
        <Image
          src={DEFAULT_SRC}
          alt="rounded"
          width={80}
          height={80}
          rounded
        />
        <Image
          src={DEFAULT_SRC}
          alt="square"
          width={80}
          height={80}
          rounded={false}
        />
      </div>
    );
    await expect
      .element(screen.getByAltText('rounded'))
      .toHaveStyle({ borderRadius: '9999px' });
    await expect
      .element(screen.getByAltText('square'))
      .toHaveStyle({ borderRadius: '0.5rem' });
    await takeSnapshot(`Image - renders multiple images each maintaining independent styles`);
  });

  it('updates objectFit when re-rendered with new props', async () => {
    const screen = await render(
      <Image
        src={DEFAULT_SRC}
        alt="Rerender"
        width={200}
        height={150}
        objectFit="cover"
      />
    );
    await expect
      .element(locatorFor(getImage(screen.container)))
      .toHaveStyle({ objectFit: 'cover' });

    await screen.rerender(
      <Image
        src={DEFAULT_SRC}
        alt="Rerender"
        width={200}
        height={150}
        objectFit="contain"
      />
    );

    await expect
      .element(locatorFor(getImage(screen.container)))
      .toHaveStyle({ objectFit: 'contain' });
    await takeSnapshot(`Image - updates objectFit when re-rendered with new props`);
  });

  it('updates rounded styling when re-rendered with rounded true', async () => {
    const screen = await render(
      <Image
        src={DEFAULT_SRC}
        alt="Corners"
        width={100}
        height={100}
        rounded={false}
      />
    );
    await expect
      .element(locatorFor(getImage(screen.container)))
      .toHaveStyle({ borderRadius: '0.5rem' });

    await screen.rerender(
      <Image
        src={DEFAULT_SRC}
        alt="Corners"
        width={100}
        height={100}
        rounded
      />
    );

    await expect
      .element(locatorFor(getImage(screen.container)))
      .toHaveStyle({ borderRadius: '9999px' });
    await takeSnapshot(`Image - updates rounded styling when re-rendered with rounded true`);
  });

  it('renders a gallery of three images without sharing state', async () => {
    const screen = await render(
      <div>
        <Image src={DEFAULT_SRC} alt="One" width={140} height={100} />
        <Image src={DEFAULT_SRC} alt="Two" width={140} height={100} />
        <Image src={DEFAULT_SRC} alt="Three" width={140} height={100} />
      </div>
    );
    await expect.element(screen.getByAltText('One')).toBeInTheDocument();
    await expect.element(screen.getByAltText('Two')).toBeInTheDocument();
    await expect.element(screen.getByAltText('Three')).toBeInTheDocument();
    await takeSnapshot(`Image - renders a gallery of three images without sharing state`);
  });

  it('renders a descriptive long alt text correctly', async () => {
    const alt =
      'A scenic mountain landscape at sunset with orange clouds';
    const screen = await render(
      <Image src={DEFAULT_SRC} alt={alt} width={400} height={300} />
    );
    await expect.element(screen.getByAltText(alt)).toBeInTheDocument();
    await takeSnapshot(`Image - renders a descriptive long alt text correctly`);
  });

  /* -----------------------------------------------------------------------
   * Profile / banner styles (3)
   * -------------------------------------------------------------------- */

  it('renders a profile banner style wide image', async () => {
    const screen = await render(
      <Image
        src={DEFAULT_SRC}
        alt="Profile banner"
        width={520}
        height={140}
        objectFit="cover"
        borderRadius="12px"
      />
    );
    const img = getImage(screen.container);
    await expect.element(locatorFor(img)).toHaveStyle({
      width: '520px',
      height: '140px',
      borderRadius: '12px',
      objectFit: 'cover',
    });
    await takeSnapshot(`Image - renders a profile banner style wide image`);
  });

  it('renders a card thumbnail with 8px radius', async () => {
    const screen = await render(
      <Image
        src={DEFAULT_SRC}
        alt="Card thumb"
        width={320}
        height={180}
        objectFit="cover"
        borderRadius="8px"
      />
    );
    const img = getImage(screen.container);
    await expect.element(locatorFor(img)).toHaveStyle({
      width: '320px',
      height: '180px',
      borderRadius: '8px',
    });
    await takeSnapshot(`Image - renders a card thumbnail with 8px radius`);
  });

  it('renders none object-fit with custom radius', async () => {
    const screen = await render(
      <Image
        src={DEFAULT_SRC}
        alt="None custom radius"
        width={250}
        height={180}
        objectFit="none"
        borderRadius="8px"
      />
    );
    const img = getImage(screen.container);
    await expect.element(locatorFor(img)).toHaveStyle({
      objectFit: 'none',
      borderRadius: '8px',
    });
    await takeSnapshot(`Image - renders none object-fit with custom radius`);
  });

  /* -----------------------------------------------------------------------
   * Extra coverage to reach ~50 (8)
   * -------------------------------------------------------------------- */

  it('renders a square crop with fill object-fit', async () => {
    const screen = await render(
      <Image
        src={DEFAULT_SRC}
        alt="Square fill"
        width={220}
        height={220}
        objectFit="fill"
      />
    );
    const img = getImage(screen.container);
    await expect.element(locatorFor(img)).toHaveStyle({
      width: '220px',
      height: '220px',
      objectFit: 'fill',
    });
    await takeSnapshot(`Image - renders a square crop with fill object-fit`);
  });

  it('renders a pill-shaped image via custom borderRadius', async () => {
    const screen = await render(
      <Image
        src={DEFAULT_SRC}
        alt="Pill shaped"
        width={280}
        height={100}
        objectFit="cover"
        borderRadius="9999px"
      />
    );
    const img = getImage(screen.container);
    await expect.element(locatorFor(img)).toHaveStyle({
      borderRadius: '9999px',
      objectFit: 'cover',
    });
    await takeSnapshot(`Image - renders a pill-shaped image via custom borderRadius`);
  });

  it('renders contain with rounded corners', async () => {
    const screen = await render(
      <Image
        src={DEFAULT_SRC}
        alt="Contain rounded"
        width={200}
        height={200}
        objectFit="contain"
        rounded
      />
    );
    const img = getImage(screen.container);
    await expect.element(locatorFor(img)).toHaveStyle({
      objectFit: 'contain',
      borderRadius: '9999px',
    });
    await takeSnapshot(`Image - renders contain with rounded corners`);
  });

  it('renders a large contain image with explicit dimensions', async () => {
    const screen = await render(
      <Image
        src={DEFAULT_SRC}
        alt="Large contain"
        width={480}
        height={320}
        objectFit="contain"
      />
    );
    const img = getImage(screen.container);
    await expect.element(locatorFor(img)).toHaveStyle({
      width: '480px',
      height: '320px',
      objectFit: 'contain',
    });
    await takeSnapshot(`Image - renders a large contain image with explicit dimensions`);
  });

  it('renders a large custom border radius of 32px', async () => {
    const screen = await render(
      <Image
        src={DEFAULT_SRC}
        alt="Large radius"
        width={300}
        height={200}
        borderRadius="32px"
      />
    );
    const img = getImage(screen.container);
    await expect
      .element(locatorFor(img))
      .toHaveStyle({ borderRadius: '32px' });
    await takeSnapshot(`Image - renders a large custom border radius of 32px`);
  });

  it('renders percentage width correctly', async () => {
    const screen = await render(
      <div style={{ width: '400px' }}>
        <Image
          src={DEFAULT_SRC}
          alt="Percent width"
          width="80%"
          height={200}
          objectFit="cover"
        />
      </div>
    );
    const img = getImage(screen.container);
    await expect.element(locatorFor(img)).toHaveStyle({ width: '80%' });
    await takeSnapshot(`Image - renders percentage width correctly`);
  });

  it('renders mixed rounded thumbnail sizes independently', async () => {
    const screen = await render(
      <div>
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
          alt="lg"
          width={96}
          height={96}
          rounded
          objectFit="cover"
        />
      </div>
    );
    await expect.element(screen.getByAltText('sm')).toHaveStyle({
      width: '48px',
      borderRadius: '9999px',
    });
    await expect.element(screen.getByAltText('lg')).toHaveStyle({
      width: '96px',
      borderRadius: '9999px',
    });
    await takeSnapshot(`Image - renders mixed rounded thumbnail sizes independently`);
  });

  it('updates src attribute when re-rendered with a new src prop after remount via key change', async () => {
    const screen = await render(
      <Image key="a" src={DEFAULT_SRC} alt="Src swap" width={200} height={150} />
    );
    expect(getImage(screen.container).getAttribute('src')).toBe(DEFAULT_SRC);

    await screen.rerender(
      <Image
        key="b"
        src={FALLBACK_SRC}
        alt="Src swap"
        width={200}
        height={150}
      />
    );

    expect(getImage(screen.container).getAttribute('src')).toBe(FALLBACK_SRC);
    await takeSnapshot(`Image - updates src attribute when re-rendered with a new src prop after remount via key change`);
  });
});
