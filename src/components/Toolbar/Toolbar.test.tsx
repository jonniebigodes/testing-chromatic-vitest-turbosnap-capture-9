import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import Toolbar from './Toolbar';
import { color, spacing } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

/** Wraps a raw HTMLElement into a Locator so jest-dom matchers can be used. */
const locatorFor = (element: HTMLElement) => page.elementLocator(element);

/** The toolbar itself is the only top-level element rendered by the component. */
const getToolbar = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement;

describe('Toolbar', () => {
  /* -----------------------------------------------------------------------
   * Basic rendering (5)
   * -------------------------------------------------------------------- */

  it('renders an element with role="toolbar"', async () => {
    const screen = await render(<Toolbar>Content</Toolbar>);
    await expect.element(screen.getByRole('toolbar')).toBeInTheDocument();
    await takeSnapshot(`Toolbar - renders an element with role="toolbar"`);
  });

  it('defaults orientation to horizontal when not specified', async () => {
    const screen = await render(<Toolbar>Content</Toolbar>);
    const toolbar = getToolbar(screen.container);
    expect(toolbar.getAttribute('aria-orientation')).toBe('horizontal');
    await takeSnapshot(`Toolbar - defaults orientation to horizontal when not specified`);
  });

  it('sets aria-orientation="horizontal" by default', async () => {
    const screen = await render(<Toolbar>Content</Toolbar>);
    await expect
      .element(screen.getByRole('toolbar'))
      .toHaveAttribute('aria-orientation', 'horizontal');
    await takeSnapshot(`Toolbar - sets aria-orientation="horizontal" by default`);
  });

  it('applies flex-direction: row by default', async () => {
    const screen = await render(<Toolbar>Content</Toolbar>);
    const toolbar = getToolbar(screen.container);
    await expect
      .element(locatorFor(toolbar))
      .toHaveStyle({ flexDirection: 'row' });
    await takeSnapshot(`Toolbar - applies flex-direction: row by default`);
  });

  it('renders the toolbar as a div element', async () => {
    const screen = await render(<Toolbar>Content</Toolbar>);
    const toolbar = getToolbar(screen.container);
    expect(toolbar.tagName).toBe('DIV');
    await takeSnapshot(`Toolbar - renders the toolbar as a div element`);
  });

  /* -----------------------------------------------------------------------
   * Horizontal orientation (4)
   * -------------------------------------------------------------------- */

  it('sets aria-orientation="horizontal" when explicitly horizontal', async () => {
    const screen = await render(<Toolbar orientation="horizontal">Content</Toolbar>);
    await expect
      .element(screen.getByRole('toolbar'))
      .toHaveAttribute('aria-orientation', 'horizontal');
    await takeSnapshot(`Toolbar - sets aria-orientation="horizontal" when explicitly horizontal`);
  });

  it('applies flex-direction: row when orientation is horizontal', async () => {
    const screen = await render(<Toolbar orientation="horizontal">Content</Toolbar>);
    const toolbar = getToolbar(screen.container);
    await expect
      .element(locatorFor(toolbar))
      .toHaveStyle({ flexDirection: 'row' });
    await takeSnapshot(`Toolbar - applies flex-direction: row when orientation is horizontal`);
  });

  it('applies width: auto when orientation is horizontal', async () => {
    const screen = await render(<Toolbar orientation="horizontal">Content</Toolbar>);
    const toolbar = getToolbar(screen.container);
    await expect.element(locatorFor(toolbar)).toHaveStyle({ width: 'auto' });
    await takeSnapshot(`Toolbar - applies width: auto when orientation is horizontal`);
  });

  it('retains role="toolbar" when horizontal', async () => {
    const screen = await render(<Toolbar orientation="horizontal">Content</Toolbar>);
    const toolbar = getToolbar(screen.container);
    expect(toolbar.getAttribute('role')).toBe('toolbar');
    await takeSnapshot(`Toolbar - retains role="toolbar" when horizontal`);
  });

  /* -----------------------------------------------------------------------
   * Vertical orientation (4)
   * -------------------------------------------------------------------- */

  it('sets aria-orientation="vertical" when orientation is vertical', async () => {
    const screen = await render(<Toolbar orientation="vertical">Content</Toolbar>);
    await expect
      .element(screen.getByRole('toolbar'))
      .toHaveAttribute('aria-orientation', 'vertical');
    await takeSnapshot(`Toolbar - sets aria-orientation="vertical" when orientation is vertical`);
  });

  it('applies flex-direction: column when orientation is vertical', async () => {
    const screen = await render(<Toolbar orientation="vertical">Content</Toolbar>);
    const toolbar = getToolbar(screen.container);
    await expect
      .element(locatorFor(toolbar))
      .toHaveStyle({ flexDirection: 'column' });
    await takeSnapshot(`Toolbar - applies flex-direction: column when orientation is vertical`);
  });

  it('applies width: fit-content when orientation is vertical', async () => {
    const screen = await render(<Toolbar orientation="vertical">Content</Toolbar>);
    const toolbar = getToolbar(screen.container);
    await expect
      .element(locatorFor(toolbar))
      .toHaveStyle({ width: 'fit-content' });
    await takeSnapshot(`Toolbar - applies width: fit-content when orientation is vertical`);
  });

  it('retains role="toolbar" when vertical', async () => {
    const screen = await render(<Toolbar orientation="vertical">Content</Toolbar>);
    const toolbar = getToolbar(screen.container);
    expect(toolbar.getAttribute('role')).toBe('toolbar');
    await takeSnapshot(`Toolbar - retains role="toolbar" when vertical`);
  });

  /* -----------------------------------------------------------------------
   * Orientation switching / re-render (2)
   * -------------------------------------------------------------------- */

  it('updates aria-orientation when the orientation prop changes from horizontal to vertical', async () => {
    const screen = await render(<Toolbar orientation="horizontal">Content</Toolbar>);
    let toolbar = getToolbar(screen.container);
    expect(toolbar.getAttribute('aria-orientation')).toBe('horizontal');

    await screen.rerender(<Toolbar orientation="vertical">Content</Toolbar>);
    toolbar = getToolbar(screen.container);
    expect(toolbar.getAttribute('aria-orientation')).toBe('vertical');
    await takeSnapshot(`Toolbar - updates aria-orientation when the orientation prop changes from horizontal to vertical`);
  });

  it('updates flex-direction style when the orientation prop changes', async () => {
    const screen = await render(<Toolbar orientation="horizontal">Content</Toolbar>);
    let toolbar = getToolbar(screen.container);
    await expect
      .element(locatorFor(toolbar))
      .toHaveStyle({ flexDirection: 'row' });

    await screen.rerender(<Toolbar orientation="vertical">Content</Toolbar>);
    toolbar = getToolbar(screen.container);
    await expect
      .element(locatorFor(toolbar))
      .toHaveStyle({ flexDirection: 'column' });
    await takeSnapshot(`Toolbar - updates flex-direction style when the orientation prop changes`);
  });

  /* -----------------------------------------------------------------------
   * Children rendering (5)
   * -------------------------------------------------------------------- */

  it('renders a single child correctly', async () => {
    const screen = await render(
      <Toolbar>
        <button>Only Action</button>
      </Toolbar>
    );
    await expect
      .element(screen.getByRole('button', { name: 'Only Action' }))
      .toBeInTheDocument();
    await takeSnapshot(`Toolbar - renders a single child correctly`);
  });

  it('renders multiple children in the given order', async () => {
    const screen = await render(
      <Toolbar>
        <button>First</button>
        <button>Second</button>
        <button>Third</button>
      </Toolbar>
    );
    const toolbar = getToolbar(screen.container);
    const labels = Array.from(toolbar.querySelectorAll('button')).map(
      (el) => el.textContent
    );
    expect(labels).toEqual(['First', 'Second', 'Third']);
    await takeSnapshot(`Toolbar - renders multiple children in the given order`);
  });

  it('renders plain text children', async () => {
    const screen = await render(<Toolbar>Just some text</Toolbar>);
    await expect
      .element(screen.getByText('Just some text'))
      .toBeInTheDocument();
    await takeSnapshot(`Toolbar - renders plain text children`);
  });

  it('renders arbitrary custom React elements as children', async () => {
    const screen = await render(
      <Toolbar>
        <div data-testid="custom-child">Custom content</div>
      </Toolbar>
    );
    const toolbar = getToolbar(screen.container);
    const custom = toolbar.querySelector('[data-testid="custom-child"]');
    expect(custom).not.toBeNull();
    expect(custom?.textContent).toBe('Custom content');
    await takeSnapshot(`Toolbar - renders arbitrary custom React elements as children`);
  });

  it('renders a nested Toolbar as a child', async () => {
    const screen = await render(
      <Toolbar orientation="horizontal">
        <button>Outer</button>
        <Toolbar orientation="vertical">
          <button>Inner</button>
        </Toolbar>
      </Toolbar>
    );
    const toolbars = screen.container.querySelectorAll('[role="toolbar"]');
    expect(toolbars.length).toBe(2);
    await expect
      .element(screen.getByRole('button', { name: 'Inner' }))
      .toBeInTheDocument();
    await takeSnapshot(`Toolbar - renders a nested Toolbar as a child`);
  });

  /* -----------------------------------------------------------------------
   * Empty / no-children cases (4)
   * -------------------------------------------------------------------- */

  it('renders without children without throwing', async () => {
    await expect(render(<Toolbar />)).resolves.not.toThrow();
    await takeSnapshot(`Toolbar - renders without children without throwing`);
  });

  it('has no child nodes when children is undefined', async () => {
    const screen = await render(<Toolbar />);
    const toolbar = getToolbar(screen.container);
    expect(toolbar.childNodes.length).toBe(0);
    await takeSnapshot(`Toolbar - has no child nodes when children is undefined`);
  });

  it('still exposes role="toolbar" in the empty case', async () => {
    const screen = await render(<Toolbar />);
    await expect.element(screen.getByRole('toolbar')).toBeInTheDocument();
    await takeSnapshot(`Toolbar - still exposes role="toolbar" in the empty case`);
  });

  it('renders correctly when children is explicitly null', async () => {
    const screen = await render(<Toolbar>{null}</Toolbar>);
    const toolbar = getToolbar(screen.container);
    expect(toolbar.childNodes.length).toBe(0);
    await expect.element(screen.getByRole('toolbar')).toBeInTheDocument();
    await takeSnapshot(`Toolbar - renders correctly when children is explicitly null`);
  });

  /* -----------------------------------------------------------------------
   * Style properties baseline (5)
   * -------------------------------------------------------------------- */

  it('applies the gap spacing token', async () => {
    const screen = await render(<Toolbar>Content</Toolbar>);
    const toolbar = getToolbar(screen.container);
    await expect.element(locatorFor(toolbar)).toHaveStyle({ gap: spacing[2] });
    await takeSnapshot(`Toolbar - applies the gap spacing token`);
  });

  it('applies the padding spacing token', async () => {
    const screen = await render(<Toolbar>Content</Toolbar>);
    const toolbar = getToolbar(screen.container);
    await expect
      .element(locatorFor(toolbar))
      .toHaveStyle({ padding: spacing[2] });
    await takeSnapshot(`Toolbar - applies the padding spacing token`);
  });

  it('applies the slate50 background color', async () => {
    const screen = await render(<Toolbar>Content</Toolbar>);
    const toolbar = getToolbar(screen.container);
    await expect
      .element(locatorFor(toolbar))
      .toHaveStyle({ backgroundColor: color.slate50 });
    await takeSnapshot(`Toolbar - applies the slate50 background color`);
  });

  it('applies a 1px solid slate200 border', async () => {
    const screen = await render(<Toolbar>Content</Toolbar>);
    const toolbar = getToolbar(screen.container);
    await expect
      .element(locatorFor(toolbar))
      .toHaveStyle({ border: `1px solid ${color.slate200}` });
    await takeSnapshot(`Toolbar - applies a 1px solid slate200 border`);
  });

  it('applies a border radius', async () => {
    const screen = await render(<Toolbar>Content</Toolbar>);
    const toolbar = getToolbar(screen.container);
    await expect
      .element(locatorFor(toolbar))
      .toHaveStyle({ borderRadius: spacing[2] });
    await takeSnapshot(`Toolbar - applies a border radius`);
  });

  /* -----------------------------------------------------------------------
   * Style behavior with many children (2)
   * -------------------------------------------------------------------- */

  it('maintains a flex display with many children', async () => {
    const screen = await render(
      <Toolbar>
        {Array.from({ length: 20 }, (_, i) => (
          <button key={i}>{`Item ${i}`}</button>
        ))}
      </Toolbar>
    );
    const toolbar = getToolbar(screen.container);
    await expect.element(locatorFor(toolbar)).toHaveStyle({ display: 'flex' });
    expect(toolbar.querySelectorAll('button').length).toBe(20);
    await takeSnapshot(`Toolbar - maintains a flex display with many children`);
  });

  it('centers items via align-items: center', async () => {
    const screen = await render(<Toolbar>Content</Toolbar>);
    const toolbar = getToolbar(screen.container);
    await expect
      .element(locatorFor(toolbar))
      .toHaveStyle({ alignItems: 'center' });
    await takeSnapshot(`Toolbar - centers items via align-items: center`);
  });

  /* -----------------------------------------------------------------------
   * Dividers / non-interactive children (2)
   * -------------------------------------------------------------------- */

  it('renders divider elements alongside buttons', async () => {
    const screen = await render(
      <Toolbar>
        <button>Before</button>
        <div data-testid="divider" style={{ width: '1px', height: '20px' }} />
        <button>After</button>
      </Toolbar>
    );
    const toolbar = getToolbar(screen.container);
    const divider = toolbar.querySelector('[data-testid="divider"]');
    expect(divider).not.toBeNull();
    await takeSnapshot(`Toolbar - renders divider elements alongside buttons`);
  });

  it('preserves the dimensions of a divider element', async () => {
    const screen = await render(
      <Toolbar>
        <div
          data-testid="divider"
          style={{ width: '1px', height: '20px', backgroundColor: '#d1d5db' }}
        />
      </Toolbar>
    );
    const toolbar = getToolbar(screen.container);
    const divider = toolbar.querySelector(
      '[data-testid="divider"]'
    ) as HTMLElement;
    await expect
      .element(locatorFor(divider))
      .toHaveStyle({ width: '1px', height: '20px' });
    await takeSnapshot(`Toolbar - preserves the dimensions of a divider element`);
  });

  /* -----------------------------------------------------------------------
   * Icon / SVG children (2)
   * -------------------------------------------------------------------- */

  it('renders svg icon children correctly', async () => {
    const screen = await render(
      <Toolbar>
        <svg data-testid="icon" width="20" height="20" />
      </Toolbar>
    );
    const toolbar = getToolbar(screen.container);
    expect(toolbar.querySelector('[data-testid="icon"]')).not.toBeNull();
    await takeSnapshot(`Toolbar - renders svg icon children correctly`);
  });

  it('renders mixed icon and text children together', async () => {
    const screen = await render(
      <Toolbar>
        <svg data-testid="icon" width="20" height="20" />
        <span>Label</span>
      </Toolbar>
    );
    const toolbar = getToolbar(screen.container);
    expect(toolbar.querySelector('[data-testid="icon"]')).not.toBeNull();
    await expect.element(screen.getByText('Label')).toBeInTheDocument();
    await takeSnapshot(`Toolbar - renders mixed icon and text children together`);
  });

  /* -----------------------------------------------------------------------
   * Native element children (3)
   * -------------------------------------------------------------------- */

  it('renders an input element as a child', async () => {
    const screen = await render(
      <Toolbar>
        <input placeholder="Search..." />
      </Toolbar>
    );
    await expect
      .element(screen.getByPlaceholder('Search...'))
      .toBeInTheDocument();
    await takeSnapshot(`Toolbar - renders an input element as a child`);
  });

  it('renders an anchor/link element as a child', async () => {
    const screen = await render(
      <Toolbar>
        <a href="#">Learn more</a>
      </Toolbar>
    );
    await expect
      .element(screen.getByRole('link', { name: 'Learn more' }))
      .toBeInTheDocument();
    await takeSnapshot(`Toolbar - renders an anchor/link element as a child`);
  });

  it('renders a select element as a child', async () => {
    const screen = await render(
      <Toolbar>
        <select>
          <option>Small</option>
          <option>Large</option>
        </select>
      </Toolbar>
    );
    const toolbar = getToolbar(screen.container);
    expect(toolbar.querySelector('select')).not.toBeNull();
    await takeSnapshot(`Toolbar - renders a select element as a child`);
  });

  /* -----------------------------------------------------------------------
   * Accessibility attributes (3)
   * -------------------------------------------------------------------- */

  it('exposes an aria-orientation attribute matching "horizontal"', async () => {
    const screen = await render(<Toolbar orientation="horizontal">Content</Toolbar>);
    const toolbar = getToolbar(screen.container);
    expect(toolbar.hasAttribute('aria-orientation')).toBe(true);
    expect(toolbar.getAttribute('aria-orientation')).toBe('horizontal');
    await takeSnapshot(`Toolbar - exposes an aria-orientation attribute matching "horizontal"`);
  });

  it('exposes an aria-orientation attribute matching "vertical"', async () => {
    const screen = await render(<Toolbar orientation="vertical">Content</Toolbar>);
    const toolbar = getToolbar(screen.container);
    expect(toolbar.hasAttribute('aria-orientation')).toBe(true);
    expect(toolbar.getAttribute('aria-orientation')).toBe('vertical');
    await takeSnapshot(`Toolbar - exposes an aria-orientation attribute matching "vertical"`);
  });

  it('exposes a role attribute that is exactly "toolbar"', async () => {
    const screen = await render(<Toolbar>Content</Toolbar>);
    const toolbar = getToolbar(screen.container);
    expect(toolbar.getAttribute('role')).toBe('toolbar');
    await takeSnapshot(`Toolbar - exposes a role attribute that is exactly "toolbar"`);
  });

  /* -----------------------------------------------------------------------
   * Multiple toolbar instance independence (2)
   * -------------------------------------------------------------------- */

  it('renders two toolbar instances with independent aria-orientation values', async () => {
    const screen = await render(
      <div>
        <Toolbar orientation="horizontal">First</Toolbar>
        <Toolbar orientation="vertical">Second</Toolbar>
      </div>
    );
    const toolbars = screen.container.querySelectorAll('[role="toolbar"]');
    expect(toolbars.length).toBe(2);
    expect(toolbars[0].getAttribute('aria-orientation')).toBe('horizontal');
    expect(toolbars[1].getAttribute('aria-orientation')).toBe('vertical');
    await takeSnapshot(`Toolbar - renders two toolbar instances with independent aria-orientation values`);
  });

  it('renders two toolbar instances with independent children', async () => {
    const screen = await render(
      <div>
        <Toolbar>
          <button>Only In First</button>
        </Toolbar>
        <Toolbar>
          <button>Only In Second</button>
        </Toolbar>
      </div>
    );
    await expect
      .element(screen.getByRole('button', { name: 'Only In First' }))
      .toBeInTheDocument();
    await expect
      .element(screen.getByRole('button', { name: 'Only In Second' }))
      .toBeInTheDocument();
    await takeSnapshot(`Toolbar - renders two toolbar instances with independent children`);
  });

  /* -----------------------------------------------------------------------
   * Kitchen-sink combinations (3)
   * -------------------------------------------------------------------- */

  it('renders a vertical kitchen sink toolbar with dividers, icons, and text using column layout', async () => {
    const screen = await render(
      <Toolbar orientation="vertical">
        <span>Tools</span>
        <button>Cut</button>
        <div data-testid="divider" style={{ width: '100%', height: '1px' }} />
        <svg data-testid="icon" width="18" height="18" />
        <button>Delete</button>
      </Toolbar>
    );
    const toolbar = getToolbar(screen.container);
    await expect
      .element(locatorFor(toolbar))
      .toHaveStyle({ flexDirection: 'column' });
    expect(toolbar.getAttribute('aria-orientation')).toBe('vertical');
    expect(toolbar.querySelector('[data-testid="divider"]')).not.toBeNull();
    expect(toolbar.querySelector('[data-testid="icon"]')).not.toBeNull();
    await takeSnapshot(`Toolbar - renders a vertical kitchen sink toolbar with dividers, icons, and text using column layout`);
  });

  it('renders a horizontal kitchen sink toolbar with all content types using row layout', async () => {
    const screen = await render(
      <Toolbar orientation="horizontal">
        <span>File:</span>
        <button>New</button>
        <div data-testid="divider" style={{ width: '1px', height: '20px' }} />
        <svg data-testid="icon" width="18" height="18" />
        <input placeholder="Filter..." />
        <button>Delete</button>
      </Toolbar>
    );
    const toolbar = getToolbar(screen.container);
    await expect
      .element(locatorFor(toolbar))
      .toHaveStyle({ flexDirection: 'row' });
    expect(toolbar.getAttribute('aria-orientation')).toBe('horizontal');
    await expect
      .element(screen.getByPlaceholder('Filter...'))
      .toBeInTheDocument();
    await takeSnapshot(`Toolbar - renders a horizontal kitchen sink toolbar with all content types using row layout`);
  });

  it('preserves child text content correctly in a kitchen sink toolbar', async () => {
    const screen = await render(
      <Toolbar orientation="horizontal">
        <span>Status:</span>
        <span>Active</span>
        <button>Refresh</button>
      </Toolbar>
    );
    await expect.element(screen.getByText('Status:')).toBeInTheDocument();
    await expect.element(screen.getByText('Active')).toBeInTheDocument();
    await expect
      .element(screen.getByRole('button', { name: 'Refresh' }))
      .toBeInTheDocument();
    await takeSnapshot(`Toolbar - preserves child text content correctly in a kitchen sink toolbar`);
  });

  /* -----------------------------------------------------------------------
   * Width behavior per orientation (2)
   * -------------------------------------------------------------------- */

  it('sets width to "auto" when horizontal', async () => {
    const screen = await render(<Toolbar orientation="horizontal">Content</Toolbar>);
    const toolbar = getToolbar(screen.container);
    await expect.element(locatorFor(toolbar)).toHaveStyle({ width: 'auto' });
    await takeSnapshot(`Toolbar - sets width to "auto" when horizontal`);
  });

  it('sets width to "fit-content" when vertical', async () => {
    const screen = await render(<Toolbar orientation="vertical">Content</Toolbar>);
    const toolbar = getToolbar(screen.container);
    await expect
      .element(locatorFor(toolbar))
      .toHaveStyle({ width: 'fit-content' });
    await takeSnapshot(`Toolbar - sets width to "fit-content" when vertical`);
  });

  /* -----------------------------------------------------------------------
   * RTL / unicode content (2)
   * -------------------------------------------------------------------- */

  it('renders RTL unicode text content correctly', async () => {
    const screen = await render(
      <Toolbar>
        <button>حفظ</button>
      </Toolbar>
    );
    await expect
      .element(screen.getByRole('button', { name: 'حفظ' }))
      .toBeInTheDocument();
    await takeSnapshot(`Toolbar - renders RTL unicode text content correctly`);
  });

  it('renders emoji content correctly within children', async () => {
    const screen = await render(<Toolbar>✅ Done 🎉</Toolbar>);
    await expect
      .element(screen.getByText('✅ Done 🎉'))
      .toBeInTheDocument();
    await takeSnapshot(`Toolbar - renders emoji content correctly within children`);
  });
});
