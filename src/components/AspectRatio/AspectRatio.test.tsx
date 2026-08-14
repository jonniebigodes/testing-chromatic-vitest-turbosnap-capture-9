import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import AspectRatio from './AspectRatio';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

/** The outer ark.div - the element carrying position/width/paddingBottom/overflow. */
const getOuter = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement;

/** The inner ark.div - the absolutely positioned, flex-centered content wrapper. */
const getInner = (container: HTMLElement) =>
  getOuter(container).firstElementChild as HTMLElement;

/**
 * Parses the numeric percentage out of an element's inline `paddingBottom`.
 * The browser round-trips percentage lengths through a reduced-precision
 * float when serializing `style.paddingBottom`, so non-terminating ratios
 * (e.g. 16/9) come back rounded to ~6 significant digits rather than full
 * JS float precision. Comparing the parsed number with `toBeCloseTo` keeps
 * these assertions robust to that rounding.
 */
const paddingBottomPercent = (el: HTMLElement) => parseFloat(el.style.paddingBottom);

describe('AspectRatio', () => {
  /* -----------------------------------------------------------------------
   * Outer wrapper structure & styling (4)
   * -------------------------------------------------------------------- */

  it('renders the outer wrapper with position relative', async () => {
    const screen = await render(<AspectRatio ratio={16 / 9} />);
    const outer = getOuter(screen.container);
    expect(outer.style.position).toBe('relative');
    await takeSnapshot(`AspectRatio - renders the outer wrapper with position relative`);
  });

  it('renders the outer wrapper with width 100%', async () => {
    const screen = await render(<AspectRatio ratio={16 / 9} />);
    const outer = getOuter(screen.container);
    expect(outer.style.width).toBe('100%');
    await takeSnapshot(`AspectRatio - renders the outer wrapper with width 100%`);
  });

  it('renders the outer wrapper with overflow hidden', async () => {
    const screen = await render(<AspectRatio ratio={16 / 9} />);
    const outer = getOuter(screen.container);
    expect(outer.style.overflow).toBe('hidden');
    await takeSnapshot(`AspectRatio - renders the outer wrapper with overflow hidden`);
  });

  it('renders the outer wrapper as a div element via the ark.div factory', async () => {
    const screen = await render(<AspectRatio ratio={16 / 9} />);
    const outer = getOuter(screen.container);
    expect(outer.tagName).toBe('DIV');
    await takeSnapshot(`AspectRatio - renders the outer wrapper as a div element via the ark.div factory`);
  });

  /* -----------------------------------------------------------------------
   * paddingBottom computation for common ratios (6)
   * -------------------------------------------------------------------- */

  it('computes a paddingBottom of 56.25% for a 16:9 ratio', async () => {
    const screen = await render(<AspectRatio ratio={16 / 9} />);
    const outer = getOuter(screen.container);
    expect(outer.style.paddingBottom).toBe(`${(1 / (16 / 9)) * 100}%`);
    await takeSnapshot(`AspectRatio - computes a paddingBottom of 56.25% for a 16:9 ratio`);
  });

  it('computes a paddingBottom of 75% for a 4:3 ratio', async () => {
    const screen = await render(<AspectRatio ratio={4 / 3} />);
    const outer = getOuter(screen.container);
    expect(outer.style.paddingBottom).toBe('75%');
    await takeSnapshot(`AspectRatio - computes a paddingBottom of 75% for a 4:3 ratio`);
  });

  it('computes a paddingBottom of 100% for a 1:1 ratio', async () => {
    const screen = await render(<AspectRatio ratio={1} />);
    const outer = getOuter(screen.container);
    expect(outer.style.paddingBottom).toBe('100%');
    await takeSnapshot(`AspectRatio - computes a paddingBottom of 100% for a 1:1 ratio`);
  });

  it('computes the expected paddingBottom for a 21:9 ratio', async () => {
    const screen = await render(<AspectRatio ratio={21 / 9} />);
    const outer = getOuter(screen.container);
    expect(paddingBottomPercent(outer)).toBeCloseTo((1 / (21 / 9)) * 100, 2);
    await takeSnapshot(`AspectRatio - computes the expected paddingBottom for a 21:9 ratio`);
  });

  it('computes the expected paddingBottom for a 9:16 (portrait) ratio', async () => {
    const screen = await render(<AspectRatio ratio={9 / 16} />);
    const outer = getOuter(screen.container);
    expect(paddingBottomPercent(outer)).toBeCloseTo((1 / (9 / 16)) * 100, 2);
    await takeSnapshot(`AspectRatio - computes the expected paddingBottom for a 9:16 (portrait) ratio`);
  });

  it('computes a paddingBottom of 50% for a 2:1 ratio', async () => {
    const screen = await render(<AspectRatio ratio={2} />);
    const outer = getOuter(screen.container);
    expect(outer.style.paddingBottom).toBe('50%');
    await takeSnapshot(`AspectRatio - computes a paddingBottom of 50% for a 2:1 ratio`);
  });

  /* -----------------------------------------------------------------------
   * paddingBottom computation for extreme ratios (4)
   * -------------------------------------------------------------------- */

  it('computes a paddingBottom of 0.1% for an extremely large ratio of 1000', async () => {
    const screen = await render(<AspectRatio ratio={1000} />);
    const outer = getOuter(screen.container);
    expect(outer.style.paddingBottom).toBe('0.1%');
    await takeSnapshot(`AspectRatio - computes a paddingBottom of 0.1% for an extremely large ratio of 1000`);
  });

  it('computes a paddingBottom of 5000% for a near-zero ratio of 0.02', async () => {
    const screen = await render(<AspectRatio ratio={0.02} />);
    const outer = getOuter(screen.container);
    expect(outer.style.paddingBottom).toBe('5000%');
    await takeSnapshot(`AspectRatio - computes a paddingBottom of 5000% for a near-zero ratio of 0.02`);
  });

  it('computes a paddingBottom of 1% for an ultra-wide ratio of 100:1', async () => {
    const screen = await render(<AspectRatio ratio={100} />);
    const outer = getOuter(screen.container);
    expect(outer.style.paddingBottom).toBe('1%');
    await takeSnapshot(`AspectRatio - computes a paddingBottom of 1% for an ultra-wide ratio of 100:1`);
  });

  it('computes a paddingBottom of 10000% for an ultra-tall ratio of 1:100', async () => {
    const screen = await render(<AspectRatio ratio={1 / 100} />);
    const outer = getOuter(screen.container);
    expect(outer.style.paddingBottom).toBe('10000%');
    await takeSnapshot(`AspectRatio - computes a paddingBottom of 10000% for an ultra-tall ratio of 1:100`);
  });

  /* -----------------------------------------------------------------------
   * Inner content wrapper positioning & centering (4)
   * -------------------------------------------------------------------- */

  it('renders the inner content wrapper absolutely positioned', async () => {
    const screen = await render(<AspectRatio ratio={16 / 9} />);
    const inner = getInner(screen.container);
    expect(inner.style.position).toBe('absolute');
    await takeSnapshot(`AspectRatio - renders the inner content wrapper absolutely positioned`);
  });

  it('pins the inner content wrapper to all four edges', async () => {
    const screen = await render(<AspectRatio ratio={16 / 9} />);
    const inner = getInner(screen.container);
    expect(inner.style.top).toBe('0px');
    expect(inner.style.left).toBe('0px');
    expect(inner.style.right).toBe('0px');
    expect(inner.style.bottom).toBe('0px');
    await takeSnapshot(`AspectRatio - pins the inner content wrapper to all four edges`);
  });

  it('centers content with display flex on the inner wrapper', async () => {
    const screen = await render(<AspectRatio ratio={16 / 9} />);
    const inner = getInner(screen.container);
    expect(inner.style.display).toBe('flex');
    expect(inner.style.alignItems).toBe('center');
    expect(inner.style.justifyContent).toBe('center');
    await takeSnapshot(`AspectRatio - centers content with display flex on the inner wrapper`);
  });

  it('renders the inner content wrapper as a div element', async () => {
    const screen = await render(<AspectRatio ratio={16 / 9} />);
    const inner = getInner(screen.container);
    expect(inner.tagName).toBe('DIV');
    await takeSnapshot(`AspectRatio - renders the inner content wrapper as a div element`);
  });

  /* -----------------------------------------------------------------------
   * Children rendering variations (6)
   * -------------------------------------------------------------------- */

  it('renders plain text children directly inside the inner wrapper', async () => {
    const screen = await render(<AspectRatio ratio={16 / 9}>Plain text</AspectRatio>);
    const inner = getInner(screen.container);
    expect(inner.textContent).toBe('Plain text');
    await takeSnapshot(`AspectRatio - renders plain text children directly inside the inner wrapper`);
  });

  it('renders an image child unmodified', async () => {
    const screen = await render(
      <AspectRatio ratio={16 / 9}>
        <img src="test.jpg" alt="Test image" />
      </AspectRatio>
    );
    const img = screen.container.querySelector('img');
    expect(img).not.toBeNull();
    expect(img?.getAttribute('src')).toBe('test.jpg');
    expect(img?.getAttribute('alt')).toBe('Test image');
    await takeSnapshot(`AspectRatio - renders an image child unmodified`);
  });

  it('renders multiple sibling children', async () => {
    const screen = await render(
      <AspectRatio ratio={16 / 9}>
        <span>First</span>
        <span>Second</span>
      </AspectRatio>
    );
    const spans = screen.container.querySelectorAll('span');
    expect(spans.length).toBe(2);
    await takeSnapshot(`AspectRatio - renders multiple sibling children`);
  });

  it('renders a custom nested component as children', async () => {
    const Card = () => (
      <div>
        <h4>Title</h4>
        <p>Body</p>
      </div>
    );
    const screen = await render(
      <AspectRatio ratio={4 / 3}>
        <Card />
      </AspectRatio>
    );
    await expect.element(screen.getByText('Title')).toBeInTheDocument();
    await expect.element(screen.getByText('Body')).toBeInTheDocument();
    await takeSnapshot(`AspectRatio - renders a custom nested component as children`);
  });

  it('renders a button element as children', async () => {
    const screen = await render(
      <AspectRatio ratio={2}>
        <button type="button">Click me</button>
      </AspectRatio>
    );
    await expect
      .element(screen.getByRole('button', { name: 'Click me' }))
      .toBeInTheDocument();
    await takeSnapshot(`AspectRatio - renders a button element as children`);
  });

  it('preserves children order when multiple elements are passed', async () => {
    const screen = await render(
      <AspectRatio ratio={16 / 9}>
        <span>Alpha</span>
        <span>Beta</span>
        <span>Gamma</span>
      </AspectRatio>
    );
    const spans = Array.from(screen.container.querySelectorAll('span'));
    expect(spans.map((s) => s.textContent)).toEqual(['Alpha', 'Beta', 'Gamma']);
    await takeSnapshot(`AspectRatio - preserves children order when multiple elements are passed`);
  });

  /* -----------------------------------------------------------------------
   * Dynamic ratio updates via rerender (3)
   * -------------------------------------------------------------------- */

  it('updates paddingBottom when the ratio prop changes after rerender', async () => {
    const screen = await render(<AspectRatio ratio={16 / 9} />);
    const outer = getOuter(screen.container);
    expect(outer.style.paddingBottom).toBe(`${(1 / (16 / 9)) * 100}%`);

    await screen.rerender(<AspectRatio ratio={1} />);
    expect(outer.style.paddingBottom).toBe('100%');
    await takeSnapshot(`AspectRatio - updates paddingBottom when the ratio prop changes after rerender`);
  });

  it('keeps children stable across a ratio change', async () => {
    const screen = await render(
      <AspectRatio ratio={16 / 9}>
        <span>Stable content</span>
      </AspectRatio>
    );
    await screen.rerender(
      <AspectRatio ratio={4 / 3}>
        <span>Stable content</span>
      </AspectRatio>
    );
    await expect.element(screen.getByText('Stable content')).toBeInTheDocument();
    await takeSnapshot(`AspectRatio - keeps children stable across a ratio change`);
  });

  it('supports switching between several preset ratios in sequence', async () => {
    const screen = await render(<AspectRatio ratio={16 / 9} />);
    const outer = getOuter(screen.container);

    await screen.rerender(<AspectRatio ratio={4 / 3} />);
    expect(outer.style.paddingBottom).toBe('75%');

    await screen.rerender(<AspectRatio ratio={9 / 16} />);
    expect(paddingBottomPercent(outer)).toBeCloseTo((1 / (9 / 16)) * 100, 2);

    await screen.rerender(<AspectRatio ratio={1} />);
    expect(outer.style.paddingBottom).toBe('100%');
    await takeSnapshot(`AspectRatio - supports switching between several preset ratios in sequence`);
  });

  /* -----------------------------------------------------------------------
   * Zero & negative ratio edge cases (3)
   *
   * The component performs no guard against ratio <= 0. `paddingBottom` is
   * computed as `${(1 / ratio) * 100}%`, so ratio 0 produces the literal
   * string "Infinity%" and a negative ratio produces a negative percentage
   * string. Neither is a valid CSS `<length-percentage>` for
   * `padding-bottom` (which must be non-negative and finite), so the browser
   * silently drops the declaration instead of throwing - the inline style
   * property reads back as an empty string.
   * -------------------------------------------------------------------- */

  it('does not throw when ratio is 0, and drops the resulting invalid "Infinity%" paddingBottom', async () => {
    const screen = await render(<AspectRatio ratio={0} />);
    const outer = getOuter(screen.container);
    expect(outer.style.paddingBottom).toBe('');
    await takeSnapshot(`AspectRatio - does not throw when ratio is 0, and drops the resulting invalid "Infinity%" paddingBottom`);
  });

  it('does not throw when ratio is negative, and drops the resulting invalid negative paddingBottom', async () => {
    const screen = await render(<AspectRatio ratio={-1} />);
    const outer = getOuter(screen.container);
    expect(outer.style.paddingBottom).toBe('');
    await takeSnapshot(`AspectRatio - does not throw when ratio is negative, and drops the resulting invalid negative paddingBottom`);
  });

  it('still renders children when ratio is 0 or negative', async () => {
    const zeroScreen = await render(
      <AspectRatio ratio={0}>
        <span>Zero ratio content</span>
      </AspectRatio>
    );
    await expect
      .element(zeroScreen.getByText('Zero ratio content'))
      .toBeInTheDocument();

    const negativeScreen = await render(
      <AspectRatio ratio={-2}>
        <span>Negative ratio content</span>
      </AspectRatio>
    );
    await expect
      .element(negativeScreen.getByText('Negative ratio content'))
      .toBeInTheDocument();
    await takeSnapshot(`AspectRatio - still renders children when ratio is 0 or negative`);
  });

  /* -----------------------------------------------------------------------
   * Multiple instances independence (2)
   * -------------------------------------------------------------------- */

  it('renders two AspectRatio instances with independent paddingBottom values', async () => {
    const screen = await render(
      <div>
        <AspectRatio ratio={16 / 9}>
          <span>First</span>
        </AspectRatio>
        <AspectRatio ratio={1}>
          <span>Second</span>
        </AspectRatio>
      </div>
    );
    const outers = screen.container.querySelectorAll(':scope > div > div');
    const first = outers[0] as HTMLElement;
    const second = outers[1] as HTMLElement;
    expect(first.style.paddingBottom).toBe(`${(1 / (16 / 9)) * 100}%`);
    expect(second.style.paddingBottom).toBe('100%');
    await takeSnapshot(`AspectRatio - renders two AspectRatio instances with independent paddingBottom values`);
  });

  it('does not leak children between sibling AspectRatio instances', async () => {
    const screen = await render(
      <div>
        <AspectRatio ratio={16 / 9}>
          <span>Only in first</span>
        </AspectRatio>
        <AspectRatio ratio={1}>
          <span>Only in second</span>
        </AspectRatio>
      </div>
    );
    await expect.element(screen.getByText('Only in first')).toBeInTheDocument();
    await expect.element(screen.getByText('Only in second')).toBeInTheDocument();
    expect(screen.container.textContent).not.toContain('Only in firstOnly in second Only in first');
    await takeSnapshot(`AspectRatio - does not leak children between sibling AspectRatio instances`);
  });

  /* -----------------------------------------------------------------------
   * Decimal ratio precision (2)
   * -------------------------------------------------------------------- */

  it('computes the exact paddingBottom for a repeating-decimal 4:3 ratio', async () => {
    const ratio = 4 / 3;
    const screen = await render(<AspectRatio ratio={ratio} />);
    const outer = getOuter(screen.container);
    expect(outer.style.paddingBottom).toBe(`${(1 / ratio) * 100}%`);
    await takeSnapshot(`AspectRatio - computes the exact paddingBottom for a repeating-decimal 4:3 ratio`);
  });

  it('computes the exact paddingBottom for the golden ratio (1.618)', async () => {
    const ratio = 1.618;
    const screen = await render(<AspectRatio ratio={ratio} />);
    const outer = getOuter(screen.container);
    expect(paddingBottomPercent(outer)).toBeCloseTo((1 / ratio) * 100, 2);
    await takeSnapshot(`AspectRatio - computes the exact paddingBottom for the golden ratio (1.618)`);
  });

  /* -----------------------------------------------------------------------
   * Nested AspectRatio composition (1)
   * -------------------------------------------------------------------- */

  it('renders a nested AspectRatio inside another AspectRatio without errors', async () => {
    const screen = await render(
      <AspectRatio ratio={21 / 9}>
        <div>
          <AspectRatio ratio={1}>
            <span>Inner thumbnail</span>
          </AspectRatio>
        </div>
      </AspectRatio>
    );
    await expect.element(screen.getByText('Inner thumbnail')).toBeInTheDocument();
    const outerOuter = getOuter(screen.container);
    expect(paddingBottomPercent(outerOuter)).toBeCloseTo((1 / (21 / 9)) * 100, 2);
    await takeSnapshot(`AspectRatio - renders a nested AspectRatio inside another AspectRatio without errors`);
  });

  /* -----------------------------------------------------------------------
   * Kitchen-sink combinations (2)
   * -------------------------------------------------------------------- */

  it('renders correctly with a non-standard ratio, styled children, and nested elements together', async () => {
    const screen = await render(
      <AspectRatio ratio={2.35}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <img src="banner.jpg" alt="Banner" />
          <span>Caption</span>
        </div>
      </AspectRatio>
    );
    const outer = getOuter(screen.container);
    expect(paddingBottomPercent(outer)).toBeCloseTo((1 / 2.35) * 100, 2);
    await expect.element(screen.getByText('Caption')).toBeInTheDocument();
    expect(screen.container.querySelector('img')?.getAttribute('alt')).toBe('Banner');
    await takeSnapshot(`AspectRatio - renders correctly with a non-standard ratio, styled children, and nested elements together`);
  });

  it('renders correctly when combined with an outer container that constrains width', async () => {
    const screen = await render(
      <div style={{ width: '200px' }}>
        <AspectRatio ratio={16 / 9}>
          <span>Constrained</span>
        </AspectRatio>
      </div>
    );
    const wrapperDiv = screen.container.firstElementChild as HTMLElement;
    const outer = wrapperDiv.firstElementChild as HTMLElement;
    expect(outer.style.width).toBe('100%');
    await expect.element(screen.getByText('Constrained')).toBeInTheDocument();
    await takeSnapshot(`AspectRatio - renders correctly when combined with an outer container that constrains width`);
  });

  /* -----------------------------------------------------------------------
   * Empty/whitespace/falsy children edge cases (3)
   * -------------------------------------------------------------------- */

  it('renders without error when children is an empty string', async () => {
    const screen = await render(<AspectRatio ratio={16 / 9}>{''}</AspectRatio>);
    const inner = getInner(screen.container);
    expect(inner.textContent).toBe('');
    await takeSnapshot(`AspectRatio - renders without error when children is an empty string`);
  });

  it('renders without error when no children prop is passed at all', async () => {
    const screen = await render(<AspectRatio ratio={16 / 9} />);
    const inner = getInner(screen.container);
    expect(inner.textContent).toBe('');
    await takeSnapshot(`AspectRatio - renders without error when no children prop is passed at all`);
  });

  it('renders without error when children is explicitly null', async () => {
    const screen = await render(<AspectRatio ratio={16 / 9}>{null}</AspectRatio>);
    const inner = getInner(screen.container);
    expect(inner.textContent).toBe('');
    await takeSnapshot(`AspectRatio - renders without error when children is explicitly null`);
  });

  /* -----------------------------------------------------------------------
   * DOM depth / element structure (2)
   * -------------------------------------------------------------------- */

  it('renders exactly two nested div elements for the outer and inner wrappers', async () => {
    const screen = await render(<AspectRatio ratio={16 / 9} />);
    const divs = screen.container.querySelectorAll('div');
    expect(divs.length).toBe(2);
    await takeSnapshot(`AspectRatio - renders exactly two nested div elements for the outer and inner wrappers`);
  });

  it('does not add any extra wrapping elements beyond the two ark.div layers', async () => {
    const screen = await render(
      <AspectRatio ratio={16 / 9}>
        <span>Leaf content</span>
      </AspectRatio>
    );
    const outer = getOuter(screen.container);
    const inner = getInner(screen.container);
    expect(outer.children.length).toBe(1);
    expect(inner.children.length).toBe(1);
    expect(inner.firstElementChild?.tagName).toBe('SPAN');
    await takeSnapshot(`AspectRatio - does not add any extra wrapping elements beyond the two ark.div layers`);
  });

  /* -----------------------------------------------------------------------
   * Responsiveness regardless of ratio (2)
   * -------------------------------------------------------------------- */

  it('maintains width:100% on the outer wrapper across different ratios', async () => {
    const ratios = [16 / 9, 1, 4 / 3, 21 / 9, 0.5, 5];
    for (const ratio of ratios) {
      const screen = await render(<AspectRatio ratio={ratio} />);
      const outer = getOuter(screen.container);
      expect(outer.style.width).toBe('100%');
    }
    await takeSnapshot(`AspectRatio - maintains width:100% on the outer wrapper across different ratios`);
  });

  it('maintains width:100% on the outer wrapper when rendered inside a narrow parent container', async () => {
    const screen = await render(
      <div style={{ width: '80px' }}>
        <AspectRatio ratio={1}>
          <span>Narrow</span>
        </AspectRatio>
      </div>
    );
    const wrapperDiv = screen.container.firstElementChild as HTMLElement;
    const outer = wrapperDiv.firstElementChild as HTMLElement;
    expect(outer.style.width).toBe('100%');
    await takeSnapshot(`AspectRatio - maintains width:100% on the outer wrapper when rendered inside a narrow parent container`);
  });

  /* -----------------------------------------------------------------------
   * Ratio prop variety (2)
   * -------------------------------------------------------------------- */

  it('accepts a ratio expressed as a whole number rather than a fraction', async () => {
    const screen = await render(<AspectRatio ratio={3} />);
    const outer = getOuter(screen.container);
    expect(paddingBottomPercent(outer)).toBeCloseTo((1 / 3) * 100, 2);
    await takeSnapshot(`AspectRatio - accepts a ratio expressed as a whole number rather than a fraction`);
  });

  it('accepts a ratio expressed as a division expression', async () => {
    const screen = await render(<AspectRatio ratio={5 / 4} />);
    const outer = getOuter(screen.container);
    expect(outer.style.paddingBottom).toBe('80%');
    await takeSnapshot(`AspectRatio - accepts a ratio expressed as a division expression`);
  });

  /* -----------------------------------------------------------------------
   * Overflow behavior with oversized content (2)
   * -------------------------------------------------------------------- */

  it('clips oversized content via overflow hidden declared on the outer wrapper', async () => {
    const screen = await render(
      <AspectRatio ratio={16 / 9}>
        <div style={{ width: '3000px', height: '3000px' }} data-testid="oversized" />
      </AspectRatio>
    );
    const outer = getOuter(screen.container);
    expect(outer.style.overflow).toBe('hidden');
    expect(screen.container.querySelector('[data-testid="oversized"]')).not.toBeNull();
    await takeSnapshot(`AspectRatio - clips oversized content via overflow hidden declared on the outer wrapper`);
  });

  it('does not declare an overflow style on the inner content wrapper itself', async () => {
    const screen = await render(<AspectRatio ratio={16 / 9} />);
    const inner = getInner(screen.container);
    expect(inner.style.overflow).toBe('');
    await takeSnapshot(`AspectRatio - does not declare an overflow style on the inner content wrapper itself`);
  });

  /* -----------------------------------------------------------------------
   * Fragment / conditional children (2)
   * -------------------------------------------------------------------- */

  it('renders an array of children passed via a React Fragment', async () => {
    const screen = await render(
      <AspectRatio ratio={16 / 9}>
        <>
          <span>One</span>
          <span>Two</span>
        </>
      </AspectRatio>
    );
    const spans = screen.container.querySelectorAll('span');
    expect(spans.length).toBe(2);
    await takeSnapshot(`AspectRatio - renders an array of children passed via a React Fragment`);
  });

  it('renders conditional children based on a boolean expression', async () => {
    const showContent = true;
    const screen = await render(
      <AspectRatio ratio={16 / 9}>{showContent && <span>Conditionally shown</span>}</AspectRatio>
    );
    await expect
      .element(screen.getByText('Conditionally shown'))
      .toBeInTheDocument();
    await takeSnapshot(`AspectRatio - renders conditional children based on a boolean expression`);
  });
});
