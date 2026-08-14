import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent, page } from 'vitest/browser';
import Carousel from './Carousel';
import { color } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

// Local data: URIs instead of remote fetches (picsum.photos) to avoid real-network flakiness
// in browser-mode tests. Each seed gets a distinct color so slides remain visually distinguishable.
const fixtureImage = (seed: string | number) => {
  const hue = Math.abs(
    String(seed)
      .split('')
      .reduce((acc, ch) => acc * 31 + ch.charCodeAt(0), 7)
  ) % 360;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="300"><rect width="500" height="300" fill="hsl(${hue},70%,60%)"/></svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

const threeImages = [fixtureImage(1), fixtureImage(2), fixtureImage(3)];

const fiveImages = [
  fixtureImage(1),
  fixtureImage(2),
  fixtureImage(3),
  fixtureImage(4),
  fixtureImage(5),
];

const textSlides = [
  { id: 'a', content: 'Slide A' },
  { id: 'b', content: 'Slide B' },
  { id: 'c', content: 'Slide C' },
];

const locatorFor = (element: HTMLElement) => page.elementLocator(element);

const getRoot = (container: HTMLElement) =>
  container.querySelector('[data-part="root"]') as HTMLElement;

const getItems = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('[data-part="item"]')) as HTMLElement[];

const getIndicators = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('[data-part="indicator"]')) as HTMLElement[];

const getPrev = (container: HTMLElement) =>
  container.querySelector('[data-part="prev-trigger"]') as HTMLElement;

const getNext = (container: HTMLElement) =>
  container.querySelector('[data-part="next-trigger"]') as HTMLElement;

const getItemGroup = (container: HTMLElement) =>
  container.querySelector('[data-part="item-group"]') as HTMLElement;

const getIndicatorGroup = (container: HTMLElement) =>
  container.querySelector('[data-part="indicator-group"]') as HTMLElement;

const getControl = (container: HTMLElement) =>
  container.querySelector('[data-part="control"]') as HTMLElement;

describe('Carousel', () => {
  it('renders a carousel root', async () => {
    const screen = await render(<Carousel images={threeImages} />);
    expect(getRoot(screen.container)).not.toBeNull();
    await takeSnapshot('Carousel - renders a carousel root');
  });

  it('renders three items for three images', async () => {
    const screen = await render(<Carousel images={threeImages} />);
    expect(getItems(screen.container)).toHaveLength(3);
    await takeSnapshot('Carousel - renders three items for three images');
  });

  it('renders five items for five images', async () => {
    const screen = await render(<Carousel images={fiveImages} />);
    expect(getItems(screen.container)).toHaveLength(5);
    await takeSnapshot('Carousel - renders five items for five images');
  });

  it('renders a single item for one image', async () => {
    const screen = await render(<Carousel images={[threeImages[0]]} />);
    expect(getItems(screen.container)).toHaveLength(1);
    await takeSnapshot('Carousel - renders a single item for one image');
  });

  it('renders two items for two images', async () => {
    const screen = await render(<Carousel images={threeImages.slice(0, 2)} />);
    expect(getItems(screen.container)).toHaveLength(2);
    await takeSnapshot('Carousel - renders two items for two images');
  });

  it('renders img elements when using images prop', async () => {
    const screen = await render(<Carousel images={threeImages} />);
    expect(screen.container.querySelectorAll('img')).toHaveLength(3);
    await takeSnapshot('Carousel - renders img elements when using images prop');
  });

  it('sets img src from images prop', async () => {
    const screen = await render(<Carousel images={[threeImages[0]]} />);
    expect(screen.container.querySelector('img')?.getAttribute('src')).toBe(threeImages[0]);
    await takeSnapshot('Carousel - sets img src from images prop');
  });

  it('renders text slide content', async () => {
    await render(<Carousel slides={textSlides} />);
    await expect.element(page.getByText('Slide A')).toBeInTheDocument();
    await takeSnapshot('Carousel - renders text slide content');
  });

  it('renders three text slides', async () => {
    const screen = await render(<Carousel slides={textSlides} />);
    expect(getItems(screen.container)).toHaveLength(3);
    await takeSnapshot('Carousel - renders three text slides');
  });

  it('prefers slides over images when both provided', async () => {
    const screen = await render(<Carousel slides={textSlides} images={fiveImages} />);
    expect(getItems(screen.container)).toHaveLength(3);
    expect(screen.container.querySelectorAll('img')).toHaveLength(0);
    await takeSnapshot('Carousel - prefers slides over images when both provided');
  });

  it('shows prev and next controls by default', async () => {
    const screen = await render(<Carousel images={threeImages} />);
    expect(getPrev(screen.container)).not.toBeNull();
    expect(getNext(screen.container)).not.toBeNull();
    await takeSnapshot('Carousel - shows prev and next controls by default');
  });

  it('hides controls when showControls is false', async () => {
    const screen = await render(<Carousel images={threeImages} showControls={false} />);
    expect(getPrev(screen.container)).toBeNull();
    expect(getNext(screen.container)).toBeNull();
    await takeSnapshot('Carousel - hides controls when showControls is false');
  });

  it('shows indicators by default', async () => {
    const screen = await render(<Carousel images={threeImages} />);
    expect(getIndicators(screen.container)).toHaveLength(3);
    await takeSnapshot('Carousel - shows indicators by default');
  });

  it('hides indicators when showIndicators is false', async () => {
    const screen = await render(<Carousel images={threeImages} showIndicators={false} />);
    expect(getIndicators(screen.container)).toHaveLength(0);
    expect(getIndicatorGroup(screen.container)).toBeNull();
    await takeSnapshot('Carousel - hides indicators when showIndicators is false');
  });

  it('renders five indicators for five images', async () => {
    const screen = await render(<Carousel images={fiveImages} />);
    expect(getIndicators(screen.container)).toHaveLength(5);
    await takeSnapshot('Carousel - renders five indicators for five images');
  });

  it('renders a control region', async () => {
    const screen = await render(<Carousel images={threeImages} />);
    expect(getControl(screen.container)).not.toBeNull();
    await takeSnapshot('Carousel - renders a control region');
  });

  it('renders an item group', async () => {
    const screen = await render(<Carousel images={threeImages} />);
    expect(getItemGroup(screen.container)).not.toBeNull();
    await takeSnapshot('Carousel - renders an item group');
  });

  it('marks the first indicator as current by default', async () => {
    const screen = await render(<Carousel images={threeImages} />);
    expect(getIndicators(screen.container)[0].hasAttribute('data-current')).toBe(true);
    await takeSnapshot('Carousel - marks the first indicator as current by default');
  });

  it('advances when next trigger is clicked', async () => {
    const screen = await render(<Carousel images={threeImages} loop />);
    await userEvent.click(locatorFor(getNext(screen.container)));
    expect(getIndicators(screen.container)[1].hasAttribute('data-current')).toBe(true);
    await takeSnapshot('Carousel - advances when next trigger is clicked');
  });

  it('goes back when prev trigger is clicked with loop', async () => {
    const screen = await render(<Carousel images={threeImages} loop />);
    await userEvent.click(locatorFor(getPrev(screen.container)));
    expect(getIndicators(screen.container)[2].hasAttribute('data-current')).toBe(true);
    await takeSnapshot('Carousel - goes back when prev trigger is clicked with loop');
  });

  it('jumps when an indicator is clicked', async () => {
    const screen = await render(<Carousel images={threeImages} />);
    await userEvent.click(locatorFor(getIndicators(screen.container)[2]));
    expect(getIndicators(screen.container)[2].hasAttribute('data-current')).toBe(true);
    await takeSnapshot('Carousel - jumps when an indicator is clicked');
  });

  it('renders empty without items when images is empty', async () => {
    const screen = await render(<Carousel images={[]} />);
    expect(getItems(screen.container)).toHaveLength(0);
    await takeSnapshot('Carousel - renders empty without items when images is empty');
  });

  it('renders empty without items when slides is empty', async () => {
    const screen = await render(<Carousel slides={[]} />);
    expect(getItems(screen.container)).toHaveLength(0);
    await takeSnapshot('Carousel - renders empty without items when slides is empty');
  });

  it('renders emoji slide content', async () => {
    await render(
      <Carousel
        slides={[
          { id: 'sun', content: '☀️ Sunny' },
          { id: 'rain', content: '🌧️ Rainy' },
        ]}
      />
    );
    await expect.element(page.getByText('☀️ Sunny')).toBeInTheDocument();
    await takeSnapshot('Carousel - renders emoji slide content');
  });

  it('renders RTL unicode content', async () => {
    await render(
      <Carousel slides={[{ id: 'he', content: 'שלום עולם' }, { id: 'ar', content: 'مرحبا' }]} />
    );
    await expect.element(page.getByText('שלום עולם')).toBeInTheDocument();
    await takeSnapshot('Carousel - renders RTL unicode content');
  });

  it('renders long label slides in full', async () => {
    const long =
      'This is a particularly long slide label meant to exercise wrapping and layout resilience.';
    await render(
      <Carousel slides={[{ id: 'long', content: long }, { id: 'short', content: 'Short' }]} />
    );
    await expect.element(page.getByText(long)).toBeInTheDocument();
    await takeSnapshot('Carousel - renders long label slides in full');
  });

  it('applies max-width style on root', async () => {
    const screen = await render(<Carousel images={threeImages} />);
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({ maxWidth: '32rem' });
    await takeSnapshot('Carousel - applies max-width style on root');
  });

  it('styles prev trigger with slate border', async () => {
    const screen = await render(<Carousel images={threeImages} />);
    await expect
      .element(locatorFor(getPrev(screen.container)))
      .toHaveStyle({ border: `1px solid ${color.slate300}` });
    await takeSnapshot('Carousel - styles prev trigger with slate border');
  });

  it('styles next trigger as a button-like control', async () => {
    const screen = await render(<Carousel images={threeImages} />);
    await expect.element(locatorFor(getNext(screen.container))).toHaveStyle({ cursor: 'pointer' });
    await takeSnapshot('Carousel - styles next trigger as a button-like control');
  });

  it('labels prev trigger for accessibility', async () => {
    const screen = await render(<Carousel images={threeImages} />);
    expect(getPrev(screen.container).getAttribute('aria-label')).toBe('Previous');
    await takeSnapshot('Carousel - labels prev trigger for accessibility');
  });

  it('labels next trigger for accessibility', async () => {
    const screen = await render(<Carousel images={threeImages} />);
    expect(getNext(screen.container).getAttribute('aria-label')).toBe('Next');
    await takeSnapshot('Carousel - labels next trigger for accessibility');
  });

  it('renders six image slides', async () => {
    const images = Array.from({ length: 6 }, (_, i) => fixtureImage(`s${i}`));
    const screen = await render(<Carousel images={images} />);
    expect(getItems(screen.container)).toHaveLength(6);
    await takeSnapshot('Carousel - renders six image slides');
  });

  it('renders four text season slides', async () => {
    const screen = await render(
      <Carousel
        slides={[
          { id: 'w', content: 'Winter' },
          { id: 'sp', content: 'Spring' },
          { id: 'su', content: 'Summer' },
          { id: 'f', content: 'Fall' },
        ]}
        loop
      />
    );
    expect(getItems(screen.container)).toHaveLength(4);
    await takeSnapshot('Carousel - renders four text season slides');
  });

  it('renders rich content with a button', async () => {
    await render(
      <Carousel
        slides={[
          { id: 'cta', content: <button type="button">Get started</button> },
          { id: 'other', content: 'Other' },
        ]}
      />
    );
    await expect.element(page.getByRole('button', { name: 'Get started' })).toBeInTheDocument();
    await takeSnapshot('Carousel - renders rich content with a button');
  });

  it('renders with autoplay enabled without crashing', async () => {
    const screen = await render(<Carousel images={threeImages} autoplay loop />);
    expect(getRoot(screen.container)).not.toBeNull();
    await takeSnapshot('Carousel - renders with autoplay enabled without crashing');
  });

  it('renders with loop enabled without crashing', async () => {
    const screen = await render(<Carousel images={threeImages} loop />);
    expect(getRoot(screen.container)).not.toBeNull();
    await takeSnapshot('Carousel - renders with loop enabled without crashing');
  });

  it('keeps indicators when controls are hidden', async () => {
    const screen = await render(
      <Carousel images={threeImages} showControls={false} showIndicators />
    );
    expect(getIndicators(screen.container)).toHaveLength(3);
    expect(getPrev(screen.container)).toBeNull();
    await takeSnapshot('Carousel - keeps indicators when controls are hidden');
  });

  it('keeps controls when indicators are hidden', async () => {
    const screen = await render(
      <Carousel images={threeImages} showControls showIndicators={false} />
    );
    expect(getNext(screen.container)).not.toBeNull();
    expect(getIndicators(screen.container)).toHaveLength(0);
    await takeSnapshot('Carousel - keeps controls when indicators are hidden');
  });

  it('renders minimal chrome without controls or indicators', async () => {
    const screen = await render(
      <Carousel images={threeImages} showControls={false} showIndicators={false} />
    );
    expect(getItems(screen.container)).toHaveLength(3);
    expect(getPrev(screen.container)).toBeNull();
    expect(getIndicators(screen.container)).toHaveLength(0);
    await takeSnapshot('Carousel - renders minimal chrome without controls or indicators');
  });

  it('renders numeric label slides', async () => {
    await render(
      <Carousel
        slides={[
          { id: '1', content: '1' },
          { id: '2', content: '2' },
          { id: '3', content: '3' },
        ]}
      />
    );
    await expect.element(page.getByText('1')).toBeInTheDocument();
    await takeSnapshot('Carousel - renders numeric label slides');
  });

  it('renders product gallery of four images', async () => {
    const images = Array.from({ length: 4 }, (_, i) => fixtureImage(`product${i}`));
    const screen = await render(<Carousel images={images} />);
    expect(getItems(screen.container)).toHaveLength(4);
    await takeSnapshot('Carousel - renders product gallery of four images');
  });

  it('renders onboarding style slides', async () => {
    await render(
      <Carousel
        slides={[
          { id: 'step1', content: 'Step 1 — Create account' },
          { id: 'step2', content: 'Step 2 — Verify email' },
          { id: 'step3', content: 'Step 3 — Start building' },
        ]}
      />
    );
    await expect.element(page.getByText('Step 1 — Create account')).toBeInTheDocument();
    await takeSnapshot('Carousel - renders onboarding style slides');
  });

  it('renders nature theme images', async () => {
    const images = [
      fixtureImage('nature1'),
      fixtureImage('nature2'),
      fixtureImage('nature3'),
    ];
    const screen = await render(<Carousel images={images} />);
    expect(screen.container.querySelectorAll('img')).toHaveLength(3);
    await takeSnapshot('Carousel - renders nature theme images');
  });

  it('renders city theme images', async () => {
    const images = [
      fixtureImage('city1'),
      fixtureImage('city2'),
      fixtureImage('city3'),
    ];
    const screen = await render(<Carousel images={images} />);
    expect(getItems(screen.container)).toHaveLength(3);
    await takeSnapshot('Carousel - renders city theme images');
  });

  it('renders eight indicators for eight images', async () => {
    const images = Array.from({ length: 8 }, (_, i) => fixtureImage(`many${i}`));
    const screen = await render(<Carousel images={images} />);
    expect(getIndicators(screen.container)).toHaveLength(8);
    await takeSnapshot('Carousel - renders eight indicators for eight images');
  });

  it('renders colored text slides', async () => {
    await render(
      <Carousel
        slides={[
          { id: 'blue', content: <span>Blue</span> },
          { id: 'green', content: <span>Green</span> },
        ]}
      />
    );
    await expect.element(page.getByText('Blue')).toBeInTheDocument();
    await takeSnapshot('Carousel - renders colored text slides');
  });

  it('renders a single text slide without separators needed', async () => {
    const screen = await render(<Carousel slides={[{ id: 'only', content: 'Only slide' }]} />);
    expect(getItems(screen.container)).toHaveLength(1);
    await expect.element(page.getByText('Only slide')).toBeInTheDocument();
    await takeSnapshot('Carousel - renders a single text slide without separators needed');
  });

  it('renders dual slides without indicators', async () => {
    const screen = await render(
      <Carousel
        slides={[
          { id: 'left', content: 'Left' },
          { id: 'right', content: 'Right' },
        ]}
        showIndicators={false}
      />
    );
    expect(getItems(screen.container)).toHaveLength(2);
    expect(getIndicators(screen.container)).toHaveLength(0);
    await takeSnapshot('Carousel - renders dual slides without indicators');
  });

  it('renders portfolio of five images with chrome', async () => {
    const images = Array.from({ length: 5 }, (_, i) => fixtureImage(`port${i}`));
    const screen = await render(
      <Carousel images={images} showControls showIndicators />
    );
    expect(getItems(screen.container)).toHaveLength(5);
    expect(getIndicators(screen.container)).toHaveLength(5);
    expect(getNext(screen.container)).not.toBeNull();
    await takeSnapshot('Carousel - renders portfolio of five images with chrome');
  });

  it('renders FAQ style question slides', async () => {
    await render(
      <Carousel
        slides={[
          { id: 'q1', content: 'What is a carousel?' },
          { id: 'q2', content: 'How do indicators work?' },
        ]}
      />
    );
    await expect.element(page.getByText('What is a carousel?')).toBeInTheDocument();
    await takeSnapshot('Carousel - renders FAQ style question slides');
  });
});
