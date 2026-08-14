import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import Divider from './Divider';
import { color } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

/** Wraps a raw HTMLElement into a Locator so jest-dom matchers can be used. */
const locatorFor = (element: HTMLElement) => page.elementLocator(element);

/** The root is the outer <div> wrapping the divider line. */
const getRoot = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement;

/** The divider line itself is the <hr> rendered inside the root. */
const getLine = (container: HTMLElement) =>
  container.querySelector('hr') as HTMLElement;

describe('Divider', () => {
  /* -----------------------------------------------------------------------
   * Default rendering structure (5)
   * -------------------------------------------------------------------- */

  it('renders a single hr element for the divider line', async () => {
    const screen = await render(<Divider />);
    const lines = screen.container.querySelectorAll('hr');
    expect(lines.length).toBe(1);
    await takeSnapshot(`Divider - renders a single hr element for the divider line`);
  });

  it('renders a wrapping div as the root element', async () => {
    const screen = await render(<Divider />);
    const root = getRoot(screen.container);
    expect(root.tagName).toBe('DIV');
    await takeSnapshot(`Divider - renders a wrapping div as the root element`);
  });

  it('renders exactly one child element inside the container', async () => {
    const screen = await render(<Divider />);
    expect(screen.container.children.length).toBe(1);
    await takeSnapshot(`Divider - renders exactly one child element inside the container`);
  });

  it('renders the hr as a child of the root div', async () => {
    const screen = await render(<Divider />);
    const root = getRoot(screen.container);
    const line = getLine(screen.container);
    expect(line.parentElement).toBe(root);
    await takeSnapshot(`Divider - renders the hr as a child of the root div`);
  });

  it('renders the hr with no child nodes', async () => {
    const screen = await render(<Divider />);
    const line = getLine(screen.container);
    expect(line.childNodes.length).toBe(0);
    await takeSnapshot(`Divider - renders the hr with no child nodes`);
  });

  /* -----------------------------------------------------------------------
   * Default color & style values (5)
   * -------------------------------------------------------------------- */

  it('applies the default slate300 background color to the hr when no color prop is given', async () => {
    const screen = await render(<Divider />);
    const line = getLine(screen.container);
    await expect
      .element(locatorFor(line))
      .toHaveStyle({ backgroundColor: color.slate300 });
    await takeSnapshot(`Divider - applies the default slate300 background color to the hr when no color prop is given`);
  });

  it('applies a 1px height to the hr by default', async () => {
    const screen = await render(<Divider />);
    const line = getLine(screen.container);
    expect(line.style.height).toBe('1px');
    await takeSnapshot(`Divider - applies a 1px height to the hr by default`);
  });

  it('applies a transparent background to the root when not inverted', async () => {
    const screen = await render(<Divider />);
    const root = getRoot(screen.container);
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ backgroundColor: 'transparent' });
    await takeSnapshot(`Divider - applies a transparent background to the root when not inverted`);
  });

  it('applies no padding to the root when not inverted', async () => {
    const screen = await render(<Divider />);
    const root = getRoot(screen.container);
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ paddingTop: '0px', paddingBottom: '0px' });
    await takeSnapshot(`Divider - applies no padding to the root when not inverted`);
  });

  it('renders the hr with border style none', async () => {
    const screen = await render(<Divider />);
    const line = getLine(screen.container);
    await expect.element(locatorFor(line)).toHaveStyle({ borderStyle: 'none' });
    await takeSnapshot(`Divider - renders the hr with border style none`);
  });

  /* -----------------------------------------------------------------------
   * Custom color prop - various formats (7)
   * -------------------------------------------------------------------- */

  it('applies a custom hex color to the hr', async () => {
    const screen = await render(<Divider color="#ef4444" />);
    const line = getLine(screen.container);
    await expect
      .element(locatorFor(line))
      .toHaveStyle({ backgroundColor: '#ef4444' });
    await takeSnapshot(`Divider - applies a custom hex color to the hr`);
  });

  it('applies a custom short hex color to the hr', async () => {
    const screen = await render(<Divider color="#f00" />);
    const line = getLine(screen.container);
    await expect
      .element(locatorFor(line))
      .toHaveStyle({ backgroundColor: '#ff0000' });
    await takeSnapshot(`Divider - applies a custom short hex color to the hr`);
  });

  it('applies a custom rgb() color to the hr', async () => {
    const screen = await render(<Divider color="rgb(59, 130, 246)" />);
    const line = getLine(screen.container);
    await expect
      .element(locatorFor(line))
      .toHaveStyle({ backgroundColor: 'rgb(59, 130, 246)' });
    await takeSnapshot(`Divider - applies a custom rgb() color to the hr`);
  });

  it('applies a custom rgba() color to the hr', async () => {
    const screen = await render(<Divider color="rgba(16, 185, 129, 0.5)" />);
    const line = getLine(screen.container);
    await expect
      .element(locatorFor(line))
      .toHaveStyle({ backgroundColor: 'rgba(16, 185, 129, 0.5)' });
    await takeSnapshot(`Divider - applies a custom rgba() color to the hr`);
  });

  it('applies a custom hsl() color to the hr', async () => {
    const screen = await render(<Divider color="hsl(200, 100%, 50%)" />);
    const line = getLine(screen.container);
    await expect
      .element(locatorFor(line))
      .toHaveStyle({ backgroundColor: 'hsl(200, 100%, 50%)' });
    await takeSnapshot(`Divider - applies a custom hsl() color to the hr`);
  });

  it('applies a custom named CSS color to the hr', async () => {
    const screen = await render(<Divider color="tomato" />);
    const line = getLine(screen.container);
    await expect
      .element(locatorFor(line))
      .toHaveStyle({ backgroundColor: 'tomato' });
    await takeSnapshot(`Divider - applies a custom named CSS color to the hr`);
  });

  it('applies an 8-digit hex color with alpha to the hr', async () => {
    const screen = await render(<Divider color="#3b82f680" />);
    const line = getLine(screen.container);
    await expect
      .element(locatorFor(line))
      .toHaveStyle({ backgroundColor: '#3b82f680' });
    await takeSnapshot(`Divider - applies an 8-digit hex color with alpha to the hr`);
  });

  /* -----------------------------------------------------------------------
   * Inverted prop (6)
   * -------------------------------------------------------------------- */

  it('renders the hr in white when inverted is true, ignoring the custom color prop', async () => {
    const screen = await render(<Divider inverted color="#ef4444" />);
    const line = getLine(screen.container);
    await expect
      .element(locatorFor(line))
      .toHaveStyle({ backgroundColor: color.white });
    await takeSnapshot(`Divider - renders the hr in white when inverted is true, ignoring the custom color prop`);
  });

  it('applies the slate800 background color to the root div when inverted is true', async () => {
    const screen = await render(<Divider inverted />);
    const root = getRoot(screen.container);
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ backgroundColor: color.slate800 });
    await takeSnapshot(`Divider - applies the slate800 background color to the root div when inverted is true`);
  });

  it('applies vertical padding to the root div when inverted is true', async () => {
    const screen = await render(<Divider inverted />);
    const root = getRoot(screen.container);
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ paddingTop: '16px', paddingBottom: '16px' });
    await takeSnapshot(`Divider - applies vertical padding to the root div when inverted is true`);
  });

  it('keeps the hr white regardless of an explicit custom color while inverted', async () => {
    const screen = await render(<Divider inverted color="rebeccapurple" />);
    const line = getLine(screen.container);
    await expect
      .element(locatorFor(line))
      .toHaveStyle({ backgroundColor: color.white });
    await takeSnapshot(`Divider - keeps the hr white regardless of an explicit custom color while inverted`);
  });

  it('does not apply slate800 background when inverted is explicitly false', async () => {
    const screen = await render(<Divider inverted={false} />);
    const root = getRoot(screen.container);
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ backgroundColor: 'transparent' });
    await takeSnapshot(`Divider - does not apply slate800 background when inverted is explicitly false`);
  });

  it('does not apply padding when inverted is explicitly false', async () => {
    const screen = await render(<Divider inverted={false} />);
    const root = getRoot(screen.container);
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ paddingTop: '0px', paddingBottom: '0px' });
    await takeSnapshot(`Divider - does not apply padding when inverted is explicitly false`);
  });

  /* -----------------------------------------------------------------------
   * Root/hr layout styles (5)
   * -------------------------------------------------------------------- */

  it('applies display flex and alignItems center to the root div', async () => {
    const screen = await render(<Divider />);
    const root = getRoot(screen.container);
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ display: 'flex', alignItems: 'center' });
    await takeSnapshot(`Divider - applies display flex and alignItems center to the root div`);
  });

  it('applies 100% width to the root div', async () => {
    const screen = await render(<Divider />);
    const root = getRoot(screen.container);
    expect(root.style.width).toBe('100%');
    await takeSnapshot(`Divider - applies 100% width to the root div`);
  });

  it('applies 100% width to the hr', async () => {
    const screen = await render(<Divider />);
    const line = getLine(screen.container);
    expect(line.style.width).toBe('100%');
    await takeSnapshot(`Divider - applies 100% width to the hr`);
  });

  it('applies vertical margin to the hr', async () => {
    const screen = await render(<Divider />);
    const line = getLine(screen.container);
    await expect
      .element(locatorFor(line))
      .toHaveStyle({ marginTop: '16px', marginBottom: '16px' });
    await takeSnapshot(`Divider - applies vertical margin to the hr`);
  });

  it('keeps the root width at 100% regardless of inverted state', async () => {
    const screen = await render(<Divider inverted />);
    const root = getRoot(screen.container);
    expect(root.style.width).toBe('100%');
    await takeSnapshot(`Divider - keeps the root width at 100% regardless of inverted state`);
  });

  /* -----------------------------------------------------------------------
   * Structural/snapshot assertions (5)
   * -------------------------------------------------------------------- */

  it('renders only a div and an hr element in total, no other tags', async () => {
    const screen = await render(<Divider />);
    const allElements = screen.container.querySelectorAll('*');
    const tagNames = Array.from(allElements).map((el) => el.tagName);
    expect(tagNames).toEqual(['DIV', 'HR']);
    await takeSnapshot(`Divider - renders only a div and an hr element in total, no other tags`);
  });

  it('does not render any text content', async () => {
    const screen = await render(<Divider />);
    expect(screen.container.textContent).toBe('');
    await takeSnapshot(`Divider - does not render any text content`);
  });

  it('does not render any svg or img elements', async () => {
    const screen = await render(<Divider />);
    expect(screen.container.querySelector('svg')).toBeNull();
    expect(screen.container.querySelector('img')).toBeNull();
    await takeSnapshot(`Divider - does not render any svg or img elements`);
  });

  it('matches the expected DOM shape for default props', async () => {
    const screen = await render(<Divider />);
    const root = getRoot(screen.container);
    const line = getLine(screen.container);
    expect(root.tagName).toBe('DIV');
    expect(line.tagName).toBe('HR');
    expect(root.children.length).toBe(1);
    expect(root.firstElementChild).toBe(line);
    await takeSnapshot(`Divider - matches the expected DOM shape for default props`);
  });

  it('matches the expected DOM shape for inverted props', async () => {
    const screen = await render(<Divider inverted color="#000000" />);
    const root = getRoot(screen.container);
    const line = getLine(screen.container);
    expect(root.tagName).toBe('DIV');
    expect(line.tagName).toBe('HR');
    expect(root.children.length).toBe(1);
    expect(root.firstElementChild).toBe(line);
    await takeSnapshot(`Divider - matches the expected DOM shape for inverted props`);
  });

  /* -----------------------------------------------------------------------
   * Default prop values (3)
   * -------------------------------------------------------------------- */

  it('defaults color to slate300 and inverted to false when no props are given', async () => {
    const screen = await render(<Divider />);
    const root = getRoot(screen.container);
    const line = getLine(screen.container);
    await expect
      .element(locatorFor(line))
      .toHaveStyle({ backgroundColor: color.slate300 });
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ backgroundColor: 'transparent' });
    await takeSnapshot(`Divider - defaults color to slate300 and inverted to false when no props are given`);
  });

  it('defaults inverted to false when only color is provided', async () => {
    const screen = await render(<Divider color="#22c55e" />);
    const root = getRoot(screen.container);
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ backgroundColor: 'transparent' });
    await takeSnapshot(`Divider - defaults inverted to false when only color is provided`);
  });

  it('defaults color to slate300 when only inverted is provided as false', async () => {
    const screen = await render(<Divider inverted={false} />);
    const line = getLine(screen.container);
    await expect
      .element(locatorFor(line))
      .toHaveStyle({ backgroundColor: color.slate300 });
    await takeSnapshot(`Divider - defaults color to slate300 when only inverted is provided as false`);
  });

  /* -----------------------------------------------------------------------
   * Multiple instance independence (3)
   * -------------------------------------------------------------------- */

  it('renders two dividers with different colors independently', async () => {
    const screen = await render(
      <div>
        <Divider color="#ef4444" />
        <Divider color="#3b82f6" />
      </div>
    );
    const lines = screen.container.querySelectorAll('hr');
    expect(lines.length).toBe(2);
    await expect
      .element(locatorFor(lines[0] as HTMLElement))
      .toHaveStyle({ backgroundColor: '#ef4444' });
    await expect
      .element(locatorFor(lines[1] as HTMLElement))
      .toHaveStyle({ backgroundColor: '#3b82f6' });
    await takeSnapshot(`Divider - renders two dividers with different colors independently`);
  });

  it('does not share styles between an inverted and a non-inverted divider rendered together', async () => {
    const screen = await render(
      <div>
        <Divider inverted />
        <Divider />
      </div>
    );
    const wrapper = screen.container.firstElementChild as HTMLElement;
    const roots = wrapper.children;
    await expect
      .element(locatorFor(roots[0] as HTMLElement))
      .toHaveStyle({ backgroundColor: color.slate800 });
    await expect
      .element(locatorFor(roots[1] as HTMLElement))
      .toHaveStyle({ backgroundColor: 'transparent' });
    await takeSnapshot(`Divider - does not share styles between an inverted and a non-inverted divider rendered together`);
  });

  it('renders three stacked dividers each with their own hr element', async () => {
    const screen = await render(
      <div>
        <Divider color="#ef4444" />
        <Divider color="#10b981" />
        <Divider color="#f59e0b" />
      </div>
    );
    const lines = screen.container.querySelectorAll('hr');
    expect(lines.length).toBe(3);
    await takeSnapshot(`Divider - renders three stacked dividers each with their own hr element`);
  });

  /* -----------------------------------------------------------------------
   * Kitchen-sink combinations (4)
   * -------------------------------------------------------------------- */

  it('renders inverted with a custom (ignored) color and confirms hr is still white', async () => {
    const screen = await render(<Divider inverted color="#f59e0b" />);
    const line = getLine(screen.container);
    const root = getRoot(screen.container);
    await expect
      .element(locatorFor(line))
      .toHaveStyle({ backgroundColor: color.white });
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ backgroundColor: color.slate800 });
    await takeSnapshot(`Divider - renders inverted with a custom (ignored) color and confirms hr is still white`);
  });

  it('renders non-inverted with a custom color, confirming hr uses that literal color and root stays transparent', async () => {
    const screen = await render(<Divider color="#8b5cf6" />);
    const line = getLine(screen.container);
    const root = getRoot(screen.container);
    await expect
      .element(locatorFor(line))
      .toHaveStyle({ backgroundColor: '#8b5cf6' });
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ backgroundColor: 'transparent' });
    await takeSnapshot(`Divider - renders non-inverted with a custom color, confirming hr uses that literal color and root stays transparent`);
  });

  it('renders inverted false explicitly combined with an explicit color', async () => {
    const screen = await render(<Divider inverted={false} color="#0ea5e9" />);
    const line = getLine(screen.container);
    await expect
      .element(locatorFor(line))
      .toHaveStyle({ backgroundColor: '#0ea5e9' });
    await takeSnapshot(`Divider - renders inverted false explicitly combined with an explicit color`);
  });

  it('renders inverted true combined with default color left unset', async () => {
    const screen = await render(<Divider inverted />);
    const line = getLine(screen.container);
    const root = getRoot(screen.container);
    await expect
      .element(locatorFor(line))
      .toHaveStyle({ backgroundColor: color.white });
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ backgroundColor: color.slate800 });
    await takeSnapshot(`Divider - renders inverted true combined with default color left unset`);
  });

  /* -----------------------------------------------------------------------
   * Edge-case color values (7)
   * -------------------------------------------------------------------- */

  it('renders without throwing when color is an empty string', async () => {
    const screen = await render(<Divider color="" />);
    const line = getLine(screen.container);
    expect(line).not.toBeNull();
    await takeSnapshot(`Divider - renders without throwing when color is an empty string`);
  });

  it('renders without throwing when color is a whitespace-only string', async () => {
    const screen = await render(<Divider color="   " />);
    const line = getLine(screen.container);
    expect(line).not.toBeNull();
    await takeSnapshot(`Divider - renders without throwing when color is a whitespace-only string`);
  });

  it('accepts a CSS variable reference as the color value', async () => {
    const screen = await render(
      <Divider color="var(--custom-divider-color, #14532d)" />
    );
    const line = getLine(screen.container);
    await expect
      .element(locatorFor(line))
      .toHaveStyle({ backgroundColor: 'rgb(20, 83, 45)' });
    await takeSnapshot(`Divider - accepts a CSS variable reference as the color value`);
  });

  it('accepts a very long/invalid CSS color string without throwing', async () => {
    const screen = await render(<Divider color="not-a-real-color" />);
    const line = getLine(screen.container);
    expect(line).not.toBeNull();
    expect(line.tagName).toBe('HR');
    await takeSnapshot(`Divider - accepts a very long/invalid CSS color string without throwing`);
  });

  it('accepts "transparent" as a literal color value', async () => {
    const screen = await render(<Divider color="transparent" />);
    const line = getLine(screen.container);
    await expect
      .element(locatorFor(line))
      .toHaveStyle({ backgroundColor: 'transparent' });
    await takeSnapshot(`Divider - accepts "transparent" as a literal color value`);
  });

  it('accepts "currentColor" as a literal color value', async () => {
    // The <hr> element carries the browser's own default `color: gray` UA
    // style, which wins over an ancestor's inherited color, so
    // "currentColor" resolves to that UA default rather than the ancestor's
    // authored text color.
    const screen = await render(
      <div style={{ color: '#e81c61' }}>
        <Divider color="currentColor" />
      </div>
    );
    const line = getLine(screen.container);
    await expect
      .element(locatorFor(line))
      .toHaveStyle({ backgroundColor: 'rgb(128, 128, 128)' });
    await takeSnapshot(`Divider - accepts "currentColor" as a literal color value`);
  });

  it('accepts "inherit" as a literal color value', async () => {
    const screen = await render(<Divider color="inherit" />);
    const line = getLine(screen.container);
    expect(line).not.toBeNull();
    expect(line.tagName).toBe('HR');
    await takeSnapshot(`Divider - accepts "inherit" as a literal color value`);
  });
});
