import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import Skeleton from './Skeleton';
import { color, spacing } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

/** Wraps a raw HTMLElement into a Locator so jest-dom matchers can be used. */
const locatorFor = (element: HTMLElement) => page.elementLocator(element);

const getRoot = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement;

describe('Skeleton', () => {
  /* -----------------------------------------------------------------------
   * Defaults (4)
   * -------------------------------------------------------------------- */

  it('renders a single skeleton element by default', async () => {
    const screen = await render(<Skeleton />);
    const root = getRoot(screen.container);
    expect(root).not.toBeNull();
    expect(root.tagName).toBe('DIV');
    await takeSnapshot(
      `Skeleton - renders a single skeleton element by default`
    );
  });

  it('defaults to the text variant height', async () => {
    const screen = await render(<Skeleton />);
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      height: spacing[4],
    });
    await takeSnapshot(`Skeleton - defaults to the text variant height`);
  });

  it('defaults to a slate200 background', async () => {
    const screen = await render(<Skeleton animated={false} />);
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      backgroundColor: color.slate200,
    });
    await takeSnapshot(`Skeleton - defaults to a slate200 background`);
  });

  it('applies pulse animation by default', async () => {
    const screen = await render(<Skeleton />);
    const root = getRoot(screen.container);
    expect(root.style.animation).toContain('skeleton-pulse');
    await takeSnapshot(`Skeleton - applies pulse animation by default`);
  });

  /* -----------------------------------------------------------------------
   * Variants (6)
   * -------------------------------------------------------------------- */

  it('renders the text variant with text border radius', async () => {
    const screen = await render(<Skeleton variant="text" animated={false} />);
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      borderRadius: spacing[1],
    });
    await takeSnapshot(
      `Skeleton - renders the text variant with text border radius`
    );
  });

  it('renders the circular variant with 50% border radius', async () => {
    const screen = await render(
      <Skeleton variant="circular" animated={false} />
    );
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      borderRadius: '50%',
    });
    await takeSnapshot(
      `Skeleton - renders the circular variant with 50% border radius`
    );
  });

  it('renders the circular variant with default circular size', async () => {
    const screen = await render(
      <Skeleton variant="circular" animated={false} />
    );
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      width: spacing[10],
      height: spacing[10],
    });
    await takeSnapshot(
      `Skeleton - renders the circular variant with default circular size`
    );
  });

  it('renders the rectangular variant with rectangular defaults', async () => {
    const screen = await render(
      <Skeleton variant="rectangular" animated={false} />
    );
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      height: spacing[20],
      borderRadius: spacing[2],
    });
    await takeSnapshot(
      `Skeleton - renders the rectangular variant with rectangular defaults`
    );
  });

  it('keeps slate200 background across all variants', async () => {
    for (const variant of ['text', 'circular', 'rectangular'] as const) {
      const screen = await render(
        <Skeleton variant={variant} animated={false} />
      );
      await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
        backgroundColor: color.slate200,
      });
    }
    await takeSnapshot(
      `Skeleton - keeps slate200 background across all variants`
    );
  });

  it('renders rectangular as a block element', async () => {
    const screen = await render(
      <Skeleton variant="rectangular" animated={false} />
    );
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      display: 'block',
    });
    await takeSnapshot(`Skeleton - renders rectangular as a block element`);
  });

  /* -----------------------------------------------------------------------
   * Animation (4)
   * -------------------------------------------------------------------- */

  it('applies animation when animated is true', async () => {
    const screen = await render(<Skeleton animated />);
    expect(getRoot(screen.container).style.animation).toContain(
      'skeleton-pulse'
    );
    await takeSnapshot(`Skeleton - applies animation when animated is true`);
  });

  it('does not apply animation when animated is false', async () => {
    const screen = await render(<Skeleton animated={false} />);
    expect(getRoot(screen.container).style.animation).toBe('');
    await takeSnapshot(
      `Skeleton - does not apply animation when animated is false`
    );
  });

  it('applies animation on circular skeletons when animated', async () => {
    const screen = await render(<Skeleton variant="circular" animated />);
    expect(getRoot(screen.container).style.animation).toContain(
      'skeleton-pulse'
    );
    await takeSnapshot(
      `Skeleton - applies animation on circular skeletons when animated`
    );
  });

  it('omits animation on rectangular skeletons when not animated', async () => {
    const screen = await render(
      <Skeleton variant="rectangular" animated={false} />
    );
    expect(getRoot(screen.container).style.animation).toBe('');
    await takeSnapshot(
      `Skeleton - omits animation on rectangular skeletons when not animated`
    );
  });

  /* -----------------------------------------------------------------------
   * Size props (6)
   * -------------------------------------------------------------------- */

  it('applies numeric width as pixels', async () => {
    const screen = await render(
      <Skeleton width={200} animated={false} />
    );
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      width: '200px',
    });
    await takeSnapshot(`Skeleton - applies numeric width as pixels`);
  });

  it('applies numeric height as pixels', async () => {
    const screen = await render(
      <Skeleton height={80} animated={false} />
    );
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      height: '80px',
    });
    await takeSnapshot(`Skeleton - applies numeric height as pixels`);
  });

  it('applies string width values as-is', async () => {
    const screen = await render(
      <Skeleton width="50%" animated={false} />
    );
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      width: '50%',
    });
    await takeSnapshot(`Skeleton - applies string width values as-is`);
  });

  it('applies string height values as-is', async () => {
    const screen = await render(
      <Skeleton height="120px" animated={false} />
    );
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      height: '120px',
    });
    await takeSnapshot(`Skeleton - applies string height values as-is`);
  });

  it('applies custom circular width and height', async () => {
    const screen = await render(
      <Skeleton variant="circular" width={48} height={48} animated={false} />
    );
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      width: '48px',
      height: '48px',
    });
    await takeSnapshot(
      `Skeleton - applies custom circular width and height`
    );
  });

  it('applies custom rectangular width and height', async () => {
    const screen = await render(
      <Skeleton
        variant="rectangular"
        width={240}
        height={120}
        animated={false}
      />
    );
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      width: '240px',
      height: '120px',
    });
    await takeSnapshot(
      `Skeleton - applies custom rectangular width and height`
    );
  });

  /* -----------------------------------------------------------------------
   * Border radius (4)
   * -------------------------------------------------------------------- */

  it('applies a custom border radius override', async () => {
    const screen = await render(
      <Skeleton borderRadius={spacing[4]} animated={false} />
    );
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      borderRadius: spacing[4],
    });
    await takeSnapshot(`Skeleton - applies a custom border radius override`);
  });

  it('applies zero border radius when requested', async () => {
    const screen = await render(
      <Skeleton
        variant="rectangular"
        borderRadius="0px"
        animated={false}
      />
    );
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      borderRadius: '0px',
    });
    await takeSnapshot(
      `Skeleton - applies zero border radius when requested`
    );
  });

  it('applies pill-like border radius when requested', async () => {
    const screen = await render(
      <Skeleton
        variant="rectangular"
        height={16}
        borderRadius="9999px"
        animated={false}
      />
    );
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      borderRadius: '9999px',
    });
    await takeSnapshot(
      `Skeleton - applies pill-like border radius when requested`
    );
  });

  it('allows borderRadius to override circular defaults', async () => {
    const screen = await render(
      <Skeleton
        variant="circular"
        borderRadius="12px"
        animated={false}
      />
    );
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      borderRadius: '12px',
    });
    await takeSnapshot(
      `Skeleton - allows borderRadius to override circular defaults`
    );
  });

  /* -----------------------------------------------------------------------
   * Multi-line text (7)
   * -------------------------------------------------------------------- */

  it('renders multiple lines when lines is greater than 1', async () => {
    const screen = await render(
      <Skeleton variant="text" lines={3} animated={false} />
    );
    const root = getRoot(screen.container);
    expect(root.children).toHaveLength(3);
    await takeSnapshot(
      `Skeleton - renders multiple lines when lines is greater than 1`
    );
  });

  it('renders five lines when lines is 5', async () => {
    const screen = await render(
      <Skeleton variant="text" lines={5} animated={false} />
    );
    expect(getRoot(screen.container).children).toHaveLength(5);
    await takeSnapshot(`Skeleton - renders five lines when lines is 5`);
  });

  it('renders two lines when lines is 2', async () => {
    const screen = await render(
      <Skeleton variant="text" lines={2} animated={false} />
    );
    expect(getRoot(screen.container).children).toHaveLength(2);
    await takeSnapshot(`Skeleton - renders two lines when lines is 2`);
  });

  it('makes the last multi-line item narrower at 60% width', async () => {
    const screen = await render(
      <Skeleton variant="text" lines={3} animated={false} />
    );
    const last = getRoot(screen.container).lastElementChild as HTMLElement;
    await expect.element(locatorFor(last)).toHaveStyle({ width: '60%' });
    await takeSnapshot(
      `Skeleton - makes the last multi-line item narrower at 60% width`
    );
  });

  it('keeps non-last multi-line items at full width', async () => {
    const screen = await render(
      <Skeleton variant="text" lines={3} animated={false} />
    );
    const first = getRoot(screen.container).firstElementChild as HTMLElement;
    await expect.element(locatorFor(first)).toHaveStyle({ width: '100%' });
    await takeSnapshot(
      `Skeleton - keeps non-last multi-line items at full width`
    );
  });

  it('does not wrap a single line in a flex column container', async () => {
    const screen = await render(
      <Skeleton variant="text" lines={1} animated={false} />
    );
    const root = getRoot(screen.container);
    expect(root.children).toHaveLength(0);
    await expect.element(locatorFor(root)).toHaveStyle({
      backgroundColor: color.slate200,
    });
    await takeSnapshot(
      `Skeleton - does not wrap a single line in a flex column container`
    );
  });

  it('uses a flex column gap for multi-line text skeletons', async () => {
    const screen = await render(
      <Skeleton variant="text" lines={3} animated={false} />
    );
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
      gap: spacing[2],
    });
    await takeSnapshot(
      `Skeleton - uses a flex column gap for multi-line text skeletons`
    );
  });

  /* -----------------------------------------------------------------------
   * Combinations (5)
   * -------------------------------------------------------------------- */

  it('renders kitchen-sink rectangular custom size animated', async () => {
    const screen = await render(
      <Skeleton
        variant="rectangular"
        width={240}
        height={120}
        animated
        borderRadius={spacing[3]}
      />
    );
    const root = getRoot(screen.container);
    await expect.element(locatorFor(root)).toHaveStyle({
      width: '240px',
      height: '120px',
      borderRadius: spacing[3],
    });
    expect(root.style.animation).toContain('skeleton-pulse');
    await takeSnapshot(
      `Skeleton - renders kitchen-sink rectangular custom size animated`
    );
  });

  it('renders kitchen-sink multi-line text static', async () => {
    const screen = await render(
      <Skeleton variant="text" lines={4} animated={false} height={12} />
    );
    const root = getRoot(screen.container);
    expect(root.children).toHaveLength(4);
    expect(root.style.animation).toBe('');
    await takeSnapshot(
      `Skeleton - renders kitchen-sink multi-line text static`
    );
  });

  it('renders thin text height override', async () => {
    const screen = await render(
      <Skeleton variant="text" height={8} animated={false} />
    );
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      height: '8px',
    });
    await takeSnapshot(`Skeleton - renders thin text height override`);
  });

  it('renders thick text height override', async () => {
    const screen = await render(
      <Skeleton variant="text" height={24} animated={false} />
    );
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      height: '24px',
    });
    await takeSnapshot(`Skeleton - renders thick text height override`);
  });

  it('renders percentage width rectangular skeleton', async () => {
    const screen = await render(
      <Skeleton
        variant="rectangular"
        width="75%"
        height={72}
        animated={false}
      />
    );
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      width: '75%',
      height: '72px',
    });
    await takeSnapshot(
      `Skeleton - renders percentage width rectangular skeleton`
    );
  });

  /* -----------------------------------------------------------------------
   * Multi-instance & re-render (5)
   * -------------------------------------------------------------------- */

  it('renders two independent skeletons without sharing state', async () => {
    const screen = await render(
      <div>
        <Skeleton variant="text" animated={false} />
        <Skeleton variant="circular" animated={false} />
      </div>
    );
    const children = Array.from(screen.container.children[0].children);
    expect(children).toHaveLength(2);
    await takeSnapshot(
      `Skeleton - renders two independent skeletons without sharing state`
    );
  });

  it('updates from text to circular when re-rendered', async () => {
    const screen = await render(
      <Skeleton variant="text" animated={false} />
    );
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      borderRadius: spacing[1],
    });
    await screen.rerender(
      <Skeleton variant="circular" animated={false} />
    );
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      borderRadius: '50%',
    });
    await takeSnapshot(
      `Skeleton - updates from text to circular when re-rendered`
    );
  });

  it('updates animation when re-rendered', async () => {
    const screen = await render(<Skeleton animated />);
    expect(getRoot(screen.container).style.animation).toContain(
      'skeleton-pulse'
    );
    await screen.rerender(<Skeleton animated={false} />);
    expect(getRoot(screen.container).style.animation).toBe('');
    await takeSnapshot(`Skeleton - updates animation when re-rendered`);
  });

  it('updates line count when re-rendered', async () => {
    const screen = await render(
      <Skeleton variant="text" lines={2} animated={false} />
    );
    expect(getRoot(screen.container).children).toHaveLength(2);
    await screen.rerender(
      <Skeleton variant="text" lines={4} animated={false} />
    );
    expect(getRoot(screen.container).children).toHaveLength(4);
    await takeSnapshot(`Skeleton - updates line count when re-rendered`);
  });

  it('updates size when re-rendered with new width and height', async () => {
    const screen = await render(
      <Skeleton width={100} height={40} animated={false} />
    );
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      width: '100px',
      height: '40px',
    });
    await screen.rerender(
      <Skeleton width={180} height={60} animated={false} />
    );
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      width: '180px',
      height: '60px',
    });
    await takeSnapshot(
      `Skeleton - updates size when re-rendered with new width and height`
    );
  });

  /* -----------------------------------------------------------------------
   * Extra coverage (5)
   * -------------------------------------------------------------------- */

  it('renders six text lines when requested', async () => {
    const screen = await render(
      <Skeleton variant="text" lines={6} animated={false} />
    );
    expect(getRoot(screen.container).children).toHaveLength(6);
    await takeSnapshot(`Skeleton - renders six text lines when requested`);
  });

  it('renders a tiny circular skeleton', async () => {
    const screen = await render(
      <Skeleton variant="circular" width={16} height={16} animated={false} />
    );
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      width: '16px',
      height: '16px',
      borderRadius: '50%',
    });
    await takeSnapshot(`Skeleton - renders a tiny circular skeleton`);
  });

  it('renders a tall rectangular skeleton', async () => {
    const screen = await render(
      <Skeleton variant="rectangular" height={200} animated={false} />
    );
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      height: '200px',
    });
    await takeSnapshot(`Skeleton - renders a tall rectangular skeleton`);
  });

  it('renders a short rectangular skeleton', async () => {
    const screen = await render(
      <Skeleton variant="rectangular" height={40} animated={false} />
    );
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      height: '40px',
    });
    await takeSnapshot(`Skeleton - renders a short rectangular skeleton`);
  });

  it('applies full-width text when width is 100%', async () => {
    const screen = await render(
      <Skeleton variant="text" width="100%" animated={false} />
    );
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      width: '100%',
    });
    await takeSnapshot(
      `Skeleton - applies full-width text when width is 100%`
    );
  });

  /* -----------------------------------------------------------------------
   * Additional coverage (4)
   * -------------------------------------------------------------------- */

  it('applies animation on each line of a multi-line animated skeleton', async () => {
    const screen = await render(
      <Skeleton variant="text" lines={3} animated />
    );
    const lines = Array.from(getRoot(screen.container).children) as HTMLElement[];
    expect(lines).toHaveLength(3);
    for (const line of lines) {
      expect(line.style.animation).toContain('skeleton-pulse');
    }
    await takeSnapshot(
      `Skeleton - applies animation on each line of a multi-line animated skeleton`
    );
  });

  it('renders fixed pixel width text skeleton', async () => {
    const screen = await render(
      <Skeleton variant="text" width={160} animated={false} />
    );
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      width: '160px',
    });
    await takeSnapshot(`Skeleton - renders fixed pixel width text skeleton`);
  });

  it('renders half-width text skeleton', async () => {
    const screen = await render(
      <Skeleton variant="text" width="50%" animated={false} />
    );
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      width: '50%',
    });
    await takeSnapshot(`Skeleton - renders half-width text skeleton`);
  });

  it('renders large circular skeleton at 96px', async () => {
    const screen = await render(
      <Skeleton variant="circular" width={96} height={96} animated={false} />
    );
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      width: '96px',
      height: '96px',
      borderRadius: '50%',
    });
    await takeSnapshot(`Skeleton - renders large circular skeleton at 96px`);
  });
});
