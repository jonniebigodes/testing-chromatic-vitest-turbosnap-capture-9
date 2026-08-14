import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent, page } from 'vitest/browser';
import Pill from './Pill';
import { color } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

/** Wraps a raw HTMLElement into a Locator so jest-dom matchers can be used. */
const locatorFor = (element: HTMLElement) => page.elementLocator(element);

/** The pill is rendered as a single <span> that is the root of the component. */
const getPill = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement;

describe('Pill', () => {
  /* -----------------------------------------------------------------------
   * Variant color styles (4)
   * -------------------------------------------------------------------- */

  it('renders the default variant with a blue background and white text', async () => {
    const screen = await render(<Pill variant="default">Default</Pill>);
    const pill = getPill(screen.container);
    await expect
      .element(locatorFor(pill))
      .toHaveStyle({ backgroundColor: color.blue500, color: color.white });
    await takeSnapshot(`Pill - renders the default variant with a blue background and white text`);
  });

  it('renders the inverted variant with a white background, blue text, and a border', async () => {
    const screen = await render(<Pill variant="inverted">Inverted</Pill>);
    const pill = getPill(screen.container);
    await expect
      .element(locatorFor(pill))
      .toHaveStyle({ backgroundColor: color.white, color: color.blue500 });
    await expect
      .element(locatorFor(pill))
      .toHaveStyle({ borderStyle: 'solid', borderColor: color.blue500 });
    await takeSnapshot(`Pill - renders the inverted variant with a white background, blue text, and a border`);
  });

  it('renders the warning variant with a yellow background and white text', async () => {
    const screen = await render(<Pill variant="warning">Warning</Pill>);
    const pill = getPill(screen.container);
    await expect
      .element(locatorFor(pill))
      .toHaveStyle({ backgroundColor: color.yellow500, color: color.white });
    await takeSnapshot(`Pill - renders the warning variant with a yellow background and white text`);
  });

  it('renders the success variant with a green background and white text', async () => {
    const screen = await render(<Pill variant="success">Success</Pill>);
    const pill = getPill(screen.container);
    await expect
      .element(locatorFor(pill))
      .toHaveStyle({ backgroundColor: color.green500, color: color.white });
    await takeSnapshot(`Pill - renders the success variant with a green background and white text`);
  });

  /* -----------------------------------------------------------------------
   * Size styles (3)
   * -------------------------------------------------------------------- */

  it('applies small size padding, height, and font size', async () => {
    const screen = await render(<Pill size="small">Small</Pill>);
    const pill = getPill(screen.container);
    await expect
      .element(locatorFor(pill))
      .toHaveStyle({ height: '1.25rem', fontSize: '0.6875rem' });
    await takeSnapshot(`Pill - applies small size padding, height, and font size`);
  });

  it('applies medium size padding, height, and font size by default', async () => {
    const screen = await render(<Pill>Medium</Pill>);
    const pill = getPill(screen.container);
    await expect
      .element(locatorFor(pill))
      .toHaveStyle({ height: '1.5rem', fontSize: '0.875rem' });
    await takeSnapshot(`Pill - applies medium size padding, height, and font size by default`);
  });

  it('applies large size padding, height, and font size', async () => {
    const screen = await render(<Pill size="large">Large</Pill>);
    const pill = getPill(screen.container);
    await expect
      .element(locatorFor(pill))
      .toHaveStyle({ height: '2rem', fontSize: '1rem' });
    await takeSnapshot(`Pill - applies large size padding, height, and font size`);
  });

  /* -----------------------------------------------------------------------
   * Children content rendering (7)
   * -------------------------------------------------------------------- */

  it('renders the provided children content inside the pill', async () => {
    const screen = await render(<Pill>Hello Pill</Pill>);
    await expect.element(screen.getByText('Hello Pill')).toBeInTheDocument();
    await takeSnapshot(`Pill - renders the provided children content inside the pill`);
  });

  it('renders long text content in full without truncating the DOM text content', async () => {
    const longText =
      'This is a very long pill label that contains a lot of text to test wrapping and overflow behavior';
    const screen = await render(<Pill>{longText}</Pill>);
    await expect.element(screen.getByText(longText)).toHaveTextContent(longText);
    await takeSnapshot(`Pill - renders long text content in full without truncating the DOM text content`);
  });

  it('renders a single short character as content', async () => {
    const screen = await render(<Pill>A</Pill>);
    await expect.element(screen.getByText('A')).toBeInTheDocument();
    await takeSnapshot(`Pill - renders a single short character as content`);
  });

  it('preserves emoji content exactly', async () => {
    const screen = await render(<Pill>🎉 New 🚀</Pill>);
    await expect
      .element(screen.getByText('🎉 New 🚀'))
      .toHaveTextContent('🎉 New 🚀');
    await takeSnapshot(`Pill - preserves emoji content exactly`);
  });

  it('preserves RTL unicode content exactly', async () => {
    const screen = await render(<Pill>مرحبا بالعالم</Pill>);
    await expect
      .element(screen.getByText('مرحبا بالعالم'))
      .toHaveTextContent('مرحبا بالعالم');
    await takeSnapshot(`Pill - preserves RTL unicode content exactly`);
  });

  it('renders numeric-looking string content correctly', async () => {
    const screen = await render(<Pill>42</Pill>);
    await expect.element(screen.getByText('42')).toBeInTheDocument();
    await takeSnapshot(`Pill - renders numeric-looking string content correctly`);
  });

  it('renders whitespace-only content as a truthy node without throwing', async () => {
    const screen = await render(<Pill>{'   '}</Pill>);
    const pill = getPill(screen.container);
    expect(pill).not.toBeNull();
    await takeSnapshot(`Pill - renders whitespace-only content as a truthy node without throwing`);
  });

  /* -----------------------------------------------------------------------
   * Cursor behavior (4)
   * -------------------------------------------------------------------- */

  it('applies a pointer cursor when onClick is provided and the pill is not disabled', async () => {
    const screen = await render(<Pill onClick={() => {}}>Clickable</Pill>);
    const pill = getPill(screen.container);
    await expect.element(locatorFor(pill)).toHaveStyle({ cursor: 'pointer' });
    await takeSnapshot(`Pill - applies a pointer cursor when onClick is provided and the pill is not disabled`);
  });

  it('applies a default cursor when no onClick handler is provided', async () => {
    const screen = await render(<Pill>Not clickable</Pill>);
    const pill = getPill(screen.container);
    await expect.element(locatorFor(pill)).toHaveStyle({ cursor: 'default' });
    await takeSnapshot(`Pill - applies a default cursor when no onClick handler is provided`);
  });

  it('applies a not-allowed cursor when disabled, even with an onClick handler', async () => {
    const screen = await render(
      <Pill disabled onClick={() => {}}>
        Disabled clickable
      </Pill>
    );
    const pill = getPill(screen.container);
    await expect.element(locatorFor(pill)).toHaveStyle({ cursor: 'not-allowed' });
    await takeSnapshot(`Pill - applies a not-allowed cursor when disabled, even with an onClick handler`);
  });

  it('applies a not-allowed cursor when disabled and no onClick handler is provided', async () => {
    const screen = await render(<Pill disabled>Disabled</Pill>);
    const pill = getPill(screen.container);
    await expect.element(locatorFor(pill)).toHaveStyle({ cursor: 'not-allowed' });
    await takeSnapshot(`Pill - applies a not-allowed cursor when disabled and no onClick handler is provided`);
  });

  /* -----------------------------------------------------------------------
   * onClick behavior (5)
   * -------------------------------------------------------------------- */

  it('calls onClick exactly once when clicked', async () => {
    const onClick = vi.fn();
    const screen = await render(<Pill onClick={onClick}>Click once</Pill>);
    const pill = getPill(screen.container);
    await userEvent.click(locatorFor(pill));
    await vi.waitFor(() => expect(onClick).toHaveBeenCalledTimes(1));
    await takeSnapshot(`Pill - calls onClick exactly once when clicked`);
  });

  it('calls onClick once per click for multiple clicks', async () => {
    const onClick = vi.fn();
    const screen = await render(<Pill onClick={onClick}>Click thrice</Pill>);
    const pill = getPill(screen.container);
    await userEvent.click(locatorFor(pill));
    await userEvent.click(locatorFor(pill));
    await userEvent.click(locatorFor(pill));
    await vi.waitFor(() => expect(onClick).toHaveBeenCalledTimes(3));
    await takeSnapshot(`Pill - calls onClick once per click for multiple clicks`);
  });

  it('does not call onClick when the pill is disabled', async () => {
    const onClick = vi.fn();
    const screen = await render(
      <Pill disabled onClick={onClick}>
        Disabled
      </Pill>
    );
    const pill = getPill(screen.container);
    await userEvent.click(locatorFor(pill), { force: true });
    await vi.waitFor(() => expect(onClick).not.toHaveBeenCalled());
    await takeSnapshot(`Pill - does not call onClick when the pill is disabled`);
  });

  it('does not throw when clicked without an onClick handler', async () => {
    const screen = await render(<Pill>No handler</Pill>);
    const pill = getPill(screen.container);
    await expect(userEvent.click(locatorFor(pill))).resolves.not.toThrow();
    await takeSnapshot(`Pill - does not throw when clicked without an onClick handler`);
  });

  it('calls onClick normally when disabled is explicitly set to false', async () => {
    const onClick = vi.fn();
    const screen = await render(
      <Pill disabled={false} onClick={onClick}>
        Enabled
      </Pill>
    );
    const pill = getPill(screen.container);
    await userEvent.click(locatorFor(pill));
    await vi.waitFor(() => expect(onClick).toHaveBeenCalledTimes(1));
    await takeSnapshot(`Pill - calls onClick normally when disabled is explicitly set to false`);
  });

  /* -----------------------------------------------------------------------
   * Disabled overrides variant styling (4)
   * -------------------------------------------------------------------- */

  it('overrides the default variant styling with slate tones when disabled', async () => {
    const screen = await render(
      <Pill variant="default" disabled>
        Disabled default
      </Pill>
    );
    const pill = getPill(screen.container);
    await expect
      .element(locatorFor(pill))
      .toHaveStyle({ backgroundColor: color.slate200, color: color.slate400 });
    await takeSnapshot(`Pill - overrides the default variant styling with slate tones when disabled`);
  });

  it('overrides the inverted variant styling with slate tones and no border when disabled', async () => {
    const screen = await render(
      <Pill variant="inverted" disabled>
        Disabled inverted
      </Pill>
    );
    const pill = getPill(screen.container);
    await expect
      .element(locatorFor(pill))
      .toHaveStyle({ backgroundColor: color.slate200, color: color.slate400 });
    await expect.element(locatorFor(pill)).toHaveStyle({ borderStyle: 'none' });
    await takeSnapshot(`Pill - overrides the inverted variant styling with slate tones and no border when disabled`);
  });

  it('overrides the warning variant styling with slate tones when disabled', async () => {
    const screen = await render(
      <Pill variant="warning" disabled>
        Disabled warning
      </Pill>
    );
    const pill = getPill(screen.container);
    await expect
      .element(locatorFor(pill))
      .toHaveStyle({ backgroundColor: color.slate200, color: color.slate400 });
    await takeSnapshot(`Pill - overrides the warning variant styling with slate tones when disabled`);
  });

  it('overrides the success variant styling with slate tones when disabled', async () => {
    const screen = await render(
      <Pill variant="success" disabled>
        Disabled success
      </Pill>
    );
    const pill = getPill(screen.container);
    await expect
      .element(locatorFor(pill))
      .toHaveStyle({ backgroundColor: color.slate200, color: color.slate400 });
    await takeSnapshot(`Pill - overrides the success variant styling with slate tones when disabled`);
  });

  /* -----------------------------------------------------------------------
   * Hover cosmetics (4)
   * -------------------------------------------------------------------- */

  it('reduces opacity and lifts the pill on hover when clickable', async () => {
    const screen = await render(<Pill onClick={() => {}}>Hover me</Pill>);
    const pill = getPill(screen.container);
    await userEvent.hover(locatorFor(pill));
    await expect.element(locatorFor(pill)).toHaveStyle({ opacity: '0.85' });
    await takeSnapshot(`Pill - reduces opacity and lifts the pill on hover when clickable`);
  });

  it('reverts opacity back to 1 when the pointer leaves a clickable pill', async () => {
    const screen = await render(<Pill onClick={() => {}}>Hover me</Pill>);
    const pill = getPill(screen.container);
    await userEvent.hover(locatorFor(pill));
    await expect.element(locatorFor(pill)).toHaveStyle({ opacity: '0.85' });
    await userEvent.unhover(locatorFor(pill));
    await expect.element(locatorFor(pill)).toHaveStyle({ opacity: '1' });
    await takeSnapshot(`Pill - reverts opacity back to 1 when the pointer leaves a clickable pill`);
  });

  it('does not change opacity on hover when disabled', async () => {
    const screen = await render(
      <Pill disabled onClick={() => {}}>
        Disabled hover
      </Pill>
    );
    const pill = getPill(screen.container);
    await userEvent.hover(locatorFor(pill));
    await expect.element(locatorFor(pill)).toHaveStyle({ opacity: '1' });
    await takeSnapshot(`Pill - does not change opacity on hover when disabled`);
  });

  it('does not change opacity on hover when no onClick handler is provided', async () => {
    const screen = await render(<Pill>No hover effect</Pill>);
    const pill = getPill(screen.container);
    await userEvent.hover(locatorFor(pill));
    await expect.element(locatorFor(pill)).toHaveStyle({ opacity: '1' });
    await takeSnapshot(`Pill - does not change opacity on hover when no onClick handler is provided`);
  });

  /* -----------------------------------------------------------------------
   * DOM structure & accessibility (2)
   * -------------------------------------------------------------------- */

  it('renders as a single span element', async () => {
    const screen = await render(<Pill>Span check</Pill>);
    const pill = getPill(screen.container);
    expect(pill.tagName).toBe('SPAN');
    await takeSnapshot(`Pill - renders as a single span element`);
  });

  it('does not set an explicit ARIA role by default', async () => {
    const screen = await render(<Pill>No role</Pill>);
    const pill = getPill(screen.container);
    expect(pill.hasAttribute('role')).toBe(false);
    await takeSnapshot(`Pill - does not set an explicit ARIA role by default`);
  });

  /* -----------------------------------------------------------------------
   * Multi-instance independence (2)
   * -------------------------------------------------------------------- */

  it('does not share click handlers between two independent pill instances', async () => {
    const onFirstClick = vi.fn();
    const onSecondClick = vi.fn();
    const screen = await render(
      <div>
        <Pill onClick={onFirstClick}>First</Pill>
        <Pill onClick={onSecondClick}>Second</Pill>
      </div>
    );
    const firstPill = screen.container.children[0]
      .firstElementChild as HTMLElement;
    await userEvent.click(locatorFor(firstPill));
    await vi.waitFor(() => expect(onFirstClick).toHaveBeenCalledTimes(1));
    await vi.waitFor(() => expect(onSecondClick).not.toHaveBeenCalled());
    await takeSnapshot(`Pill - does not share click handlers between two independent pill instances`);
  });

  it('renders multiple pills each maintaining independent disabled state', async () => {
    const screen = await render(
      <div>
        <Pill>Active</Pill>
        <Pill disabled>Disabled</Pill>
      </div>
    );
    const active = screen.getByText('Active');
    const disabled = screen.getByText('Disabled');
    await expect.element(active).toHaveStyle({ cursor: 'default' });
    await expect.element(disabled).toHaveStyle({ cursor: 'not-allowed' });
    await takeSnapshot(`Pill - renders multiple pills each maintaining independent disabled state`);
  });

  /* -----------------------------------------------------------------------
   * Default prop values (2)
   * -------------------------------------------------------------------- */

  it('defaults to the "default" variant and "medium" size when not specified', async () => {
    const screen = await render(<Pill>Defaults</Pill>);
    const pill = getPill(screen.container);
    await expect
      .element(locatorFor(pill))
      .toHaveStyle({ backgroundColor: color.blue500, height: '1.5rem' });
    await takeSnapshot(`Pill - defaults to the "default" variant and "medium" size when not specified`);
  });

  it('defaults disabled to false, allowing onClick to fire', async () => {
    const onClick = vi.fn();
    const screen = await render(<Pill onClick={onClick}>Enabled by default</Pill>);
    const pill = getPill(screen.container);
    await userEvent.click(locatorFor(pill));
    await vi.waitFor(() => expect(onClick).toHaveBeenCalledTimes(1));
    await takeSnapshot(`Pill - defaults disabled to false, allowing onClick to fire`);
  });

  /* -----------------------------------------------------------------------
   * Kitchen-sink combos (4)
   * -------------------------------------------------------------------- */

  it('renders kitchen-sink combo: inverted + large + disabled correctly', async () => {
    const screen = await render(
      <Pill variant="inverted" size="large" disabled>
        Kitchen sink inverted large disabled
      </Pill>
    );
    const pill = getPill(screen.container);
    await expect
      .element(locatorFor(pill))
      .toHaveStyle({ backgroundColor: color.slate200, height: '2rem', cursor: 'not-allowed' });
    await takeSnapshot(`Pill - renders kitchen-sink combo: inverted + large + disabled correctly`);
  });

  it('renders kitchen-sink combo: warning + small + clickable, firing onClick', async () => {
    const onClick = vi.fn();
    const screen = await render(
      <Pill variant="warning" size="small" onClick={onClick}>
        Kitchen sink warning small clickable
      </Pill>
    );
    const pill = getPill(screen.container);
    await expect
      .element(locatorFor(pill))
      .toHaveStyle({ backgroundColor: color.yellow500, height: '1.25rem' });
    await userEvent.click(locatorFor(pill));
    await vi.waitFor(() => expect(onClick).toHaveBeenCalledTimes(1));
    await takeSnapshot(`Pill - renders kitchen-sink combo: warning + small + clickable, firing onClick`);
  });

  it('renders kitchen-sink combo: success + large + long text content', async () => {
    const longText =
      'Kitchen sink: success variant with a fairly long clickable label to test wrapping';
    const screen = await render(
      <Pill variant="success" size="large">
        {longText}
      </Pill>
    );
    const pill = getPill(screen.container);
    await expect
      .element(locatorFor(pill))
      .toHaveStyle({ backgroundColor: color.green500, height: '2rem' });
    await expect.element(screen.getByText(longText)).toHaveTextContent(longText);
    await takeSnapshot(`Pill - renders kitchen-sink combo: success + large + long text content`);
  });

  it('renders kitchen-sink combo: default + small + disabled, blocking onClick', async () => {
    const onClick = vi.fn();
    const screen = await render(
      <Pill variant="default" size="small" disabled onClick={onClick}>
        Kitchen sink default small disabled
      </Pill>
    );
    const pill = getPill(screen.container);
    await expect
      .element(locatorFor(pill))
      .toHaveStyle({ backgroundColor: color.slate200, height: '1.25rem', cursor: 'not-allowed' });
    await userEvent.click(locatorFor(pill), { force: true });
    await vi.waitFor(() => expect(onClick).not.toHaveBeenCalled());
    await takeSnapshot(`Pill - renders kitchen-sink combo: default + small + disabled, blocking onClick`);
  });

  /* -----------------------------------------------------------------------
   * Mixed group rendering (1)
   * -------------------------------------------------------------------- */

  it('maintains distinct styles per pill within a mixed disabled/enabled group', async () => {
    const screen = await render(
      <div>
        <Pill variant="default">Active</Pill>
        <Pill variant="default" disabled>
          Disabled
        </Pill>
        <Pill variant="success">Active</Pill>
        <Pill variant="warning" disabled>
          Disabled
        </Pill>
      </div>
    );
    const actives = screen.getByText('Active').all();
    const disableds = screen.getByText('Disabled').all();
    expect(actives).toHaveLength(2);
    expect(disableds).toHaveLength(2);
    await takeSnapshot(`Pill - maintains distinct styles per pill within a mixed disabled/enabled group`);
  });

  /* -----------------------------------------------------------------------
   * Edge cases (1)
   * -------------------------------------------------------------------- */

  it('renders correctly with an empty string as children', async () => {
    const screen = await render(<Pill>{''}</Pill>);
    const pill = getPill(screen.container);
    expect(pill).not.toBeNull();
    expect(pill.textContent).toBe('');
    await takeSnapshot(`Pill - renders correctly with an empty string as children`);
  });

  /* -----------------------------------------------------------------------
   * Border presence per variant (4)
   * -------------------------------------------------------------------- */

  it('does not add a border for the default variant', async () => {
    const screen = await render(<Pill variant="default">Default</Pill>);
    const pill = getPill(screen.container);
    await expect.element(locatorFor(pill)).toHaveStyle({ borderStyle: 'none' });
    await takeSnapshot(`Pill - does not add a border for the default variant`);
  });

  it('does not add a border for the warning variant', async () => {
    const screen = await render(<Pill variant="warning">Warning</Pill>);
    const pill = getPill(screen.container);
    await expect.element(locatorFor(pill)).toHaveStyle({ borderStyle: 'none' });
    await takeSnapshot(`Pill - does not add a border for the warning variant`);
  });

  it('does not add a border for the success variant', async () => {
    const screen = await render(<Pill variant="success">Success</Pill>);
    const pill = getPill(screen.container);
    await expect.element(locatorFor(pill)).toHaveStyle({ borderStyle: 'none' });
    await takeSnapshot(`Pill - does not add a border for the success variant`);
  });

  it('applies a border only for the inverted variant', async () => {
    const screen = await render(<Pill variant="inverted">Inverted</Pill>);
    const pill = getPill(screen.container);
    await expect
      .element(locatorFor(pill))
      .toHaveStyle({ borderStyle: 'solid', borderColor: color.blue500 });
    await takeSnapshot(`Pill - applies a border only for the inverted variant`);
  });

  /* -----------------------------------------------------------------------
   * Consistent style application (2)
   * -------------------------------------------------------------------- */

  it('keeps font-weight medium across all variants', async () => {
    const variants = ['default', 'inverted', 'warning', 'success'] as const;
    for (const variant of variants) {
      const screen = await render(<Pill variant={variant}>{variant}</Pill>);
      const pill = getPill(screen.container);
      await expect.element(locatorFor(pill)).toHaveStyle({ fontWeight: '500' });
    }
    await takeSnapshot(`Pill - keeps font-weight medium across all variants`);
  });

  it('applies a consistent transition duration and timing function', async () => {
    const screen = await render(<Pill>Transition</Pill>);
    const pill = getPill(screen.container);
    await expect
      .element(locatorFor(pill))
      .toHaveStyle({ transitionDuration: '0.2s', transitionTimingFunction: 'ease' });
    await takeSnapshot(`Pill - applies a consistent transition duration and timing function`);
  });

  /* -----------------------------------------------------------------------
   * Re-render behavior (1)
   * -------------------------------------------------------------------- */

  it('updates the displayed content and variant styling when re-rendered with new props', async () => {
    const screen = await render(<Pill variant="default">Before</Pill>);
    const pill = getPill(screen.container);
    await expect.element(screen.getByText('Before')).toBeInTheDocument();
    await expect
      .element(locatorFor(pill))
      .toHaveStyle({ backgroundColor: color.blue500 });

    await screen.rerender(<Pill variant="success">After</Pill>);

    await expect.element(screen.getByText('After')).toBeInTheDocument();
    expect(screen.container.querySelector('span')?.textContent).toBe('After');
    await expect
      .element(locatorFor(getPill(screen.container)))
      .toHaveStyle({ backgroundColor: color.green500 });
    await takeSnapshot(`Pill - updates the displayed content and variant styling when re-rendered with new props`);
  });
});
