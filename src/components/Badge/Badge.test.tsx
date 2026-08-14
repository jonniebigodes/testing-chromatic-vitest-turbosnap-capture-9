import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import Badge from './Badge';
import { color } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

/** Wraps a raw HTMLElement into a Locator so jest-dom matchers can be used. */
const locatorFor = (element: HTMLElement) => page.elementLocator(element);

/** The badge is rendered as a single <span> that is the root of the component. */
const getBadge = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement;

describe('Badge', () => {
  /* -----------------------------------------------------------------------
   * Variant color styles (5)
   * -------------------------------------------------------------------- */

  it('renders the default variant with a blue background and white text', async () => {
    const screen = await render(<Badge variant="default">Default</Badge>);
    const badge = getBadge(screen.container);
    await expect
      .element(locatorFor(badge))
      .toHaveStyle({ backgroundColor: color.blue500, color: color.white });
    await takeSnapshot(`Badge - renders the default variant with a blue background and white text`);
  });

  it('renders the success variant with a green background and white text', async () => {
    const screen = await render(<Badge variant="success">Success</Badge>);
    const badge = getBadge(screen.container);
    await expect
      .element(locatorFor(badge))
      .toHaveStyle({ backgroundColor: color.green500, color: color.white });
    await takeSnapshot(`Badge - renders the success variant with a green background and white text`);
  });

  it('renders the warning variant with a yellow background and white text', async () => {
    const screen = await render(<Badge variant="warning">Warning</Badge>);
    const badge = getBadge(screen.container);
    await expect
      .element(locatorFor(badge))
      .toHaveStyle({ backgroundColor: color.yellow500, color: color.white });
    await takeSnapshot(`Badge - renders the warning variant with a yellow background and white text`);
  });

  it('renders the error variant with an orange background and white text', async () => {
    const screen = await render(<Badge variant="error">Error</Badge>);
    const badge = getBadge(screen.container);
    await expect
      .element(locatorFor(badge))
      .toHaveStyle({ backgroundColor: color.orange500, color: color.white });
    await takeSnapshot(`Badge - renders the error variant with an orange background and white text`);
  });

  it('renders the info variant with a cyan background and white text', async () => {
    const screen = await render(<Badge variant="info">Info</Badge>);
    const badge = getBadge(screen.container);
    await expect
      .element(locatorFor(badge))
      .toHaveStyle({ backgroundColor: color.cyan500, color: color.white });
    await takeSnapshot(`Badge - renders the info variant with a cyan background and white text`);
  });

  /* -----------------------------------------------------------------------
   * Size styles (3)
   * -------------------------------------------------------------------- */

  it('applies small size padding, height, and font size', async () => {
    const screen = await render(<Badge size="small">Small</Badge>);
    const badge = getBadge(screen.container);
    await expect
      .element(locatorFor(badge))
      .toHaveStyle({ height: '1rem', fontSize: '0.6875rem' });
    await takeSnapshot(`Badge - applies small size padding, height, and font size`);
  });

  it('applies medium size padding, height, and font size by default', async () => {
    const screen = await render(<Badge>Medium</Badge>);
    const badge = getBadge(screen.container);
    await expect
      .element(locatorFor(badge))
      .toHaveStyle({ height: '1.25rem', fontSize: '0.75rem' });
    await takeSnapshot(`Badge - applies medium size padding, height, and font size by default`);
  });

  it('applies large size padding, height, and font size', async () => {
    const screen = await render(<Badge size="large">Large</Badge>);
    const badge = getBadge(screen.container);
    await expect
      .element(locatorFor(badge))
      .toHaveStyle({ height: '1.5rem', fontSize: '0.875rem' });
    await takeSnapshot(`Badge - applies large size padding, height, and font size`);
  });

  /* -----------------------------------------------------------------------
   * Rounded prop (4)
   * -------------------------------------------------------------------- */

  it('applies fully rounded corners when rounded is true', async () => {
    const screen = await render(<Badge rounded>Rounded</Badge>);
    const badge = getBadge(screen.container);
    await expect
      .element(locatorFor(badge))
      .toHaveStyle({ borderRadius: '9999px' });
    await takeSnapshot(`Badge - applies fully rounded corners when rounded is true`);
  });

  it('applies square-ish corners when rounded is false', async () => {
    const screen = await render(<Badge rounded={false}>Square</Badge>);
    const badge = getBadge(screen.container);
    await expect
      .element(locatorFor(badge))
      .toHaveStyle({ borderRadius: '0.25rem' });
    await takeSnapshot(`Badge - applies square-ish corners when rounded is false`);
  });

  it('defaults rounded to false', async () => {
    const screen = await render(<Badge>Default corners</Badge>);
    const badge = getBadge(screen.container);
    await expect
      .element(locatorFor(badge))
      .toHaveStyle({ borderRadius: '0.25rem' });
    await takeSnapshot(`Badge - defaults rounded to false`);
  });

  it('applies rounded corners for the error variant when rounded is true', async () => {
    const screen = await render(
      <Badge variant="error" rounded>
        Error rounded
      </Badge>
    );
    const badge = getBadge(screen.container);
    await expect
      .element(locatorFor(badge))
      .toHaveStyle({ borderRadius: '9999px', backgroundColor: color.orange500 });
    await takeSnapshot(`Badge - applies rounded corners for the error variant when rounded is true`);
  });

  /* -----------------------------------------------------------------------
   * Children content rendering (7)
   * -------------------------------------------------------------------- */

  it('renders the provided children content inside the badge', async () => {
    const screen = await render(<Badge>Hello Badge</Badge>);
    await expect.element(screen.getByText('Hello Badge')).toBeInTheDocument();
    await takeSnapshot(`Badge - renders the provided children content inside the badge`);
  });

  it('renders long text content in full without truncating the DOM text content', async () => {
    const longText =
      'This is a very long badge label that contains a lot of text to test wrapping';
    const screen = await render(<Badge>{longText}</Badge>);
    await expect.element(screen.getByText(longText)).toHaveTextContent(longText);
    await takeSnapshot(`Badge - renders long text content in full without truncating the DOM text content`);
  });

  it('renders a single short character as content', async () => {
    const screen = await render(<Badge>A</Badge>);
    await expect.element(screen.getByText('A')).toBeInTheDocument();
    await takeSnapshot(`Badge - renders a single short character as content`);
  });

  it('preserves emoji content exactly', async () => {
    const screen = await render(<Badge>🎉 New</Badge>);
    await expect.element(screen.getByText('🎉 New')).toHaveTextContent('🎉 New');
    await takeSnapshot(`Badge - preserves emoji content exactly`);
  });

  it('preserves RTL unicode content exactly', async () => {
    const screen = await render(<Badge>مرحبا</Badge>);
    await expect.element(screen.getByText('مرحبا')).toHaveTextContent('مرحبا');
    await takeSnapshot(`Badge - preserves RTL unicode content exactly`);
  });

  it('renders numeric-looking string content correctly', async () => {
    const screen = await render(<Badge>42</Badge>);
    await expect.element(screen.getByText('42')).toBeInTheDocument();
    await takeSnapshot(`Badge - renders numeric-looking string content correctly`);
  });

  it('renders whitespace-only content as a truthy node without throwing', async () => {
    const screen = await render(<Badge>{'   '}</Badge>);
    const badge = getBadge(screen.container);
    expect(badge).not.toBeNull();
    await takeSnapshot(`Badge - renders whitespace-only content as a truthy node without throwing`);
  });

  /* -----------------------------------------------------------------------
   * DOM structure (3)
   * -------------------------------------------------------------------- */

  it('renders as a single span element', async () => {
    const screen = await render(<Badge>Span check</Badge>);
    const badge = getBadge(screen.container);
    expect(badge.tagName).toBe('SPAN');
    await takeSnapshot(`Badge - renders as a single span element`);
  });

  it('does not set an explicit ARIA role by default', async () => {
    const screen = await render(<Badge>No role</Badge>);
    const badge = getBadge(screen.container);
    expect(badge.hasAttribute('role')).toBe(false);
    await takeSnapshot(`Badge - does not set an explicit ARIA role by default`);
  });

  it('renders correctly with an empty string as children', async () => {
    const screen = await render(<Badge>{''}</Badge>);
    const badge = getBadge(screen.container);
    expect(badge).not.toBeNull();
    expect(badge.textContent).toBe('');
    await takeSnapshot(`Badge - renders correctly with an empty string as children`);
  });

  /* -----------------------------------------------------------------------
   * Default prop values (2)
   * -------------------------------------------------------------------- */

  it('defaults to the "default" variant and "medium" size when not specified', async () => {
    const screen = await render(<Badge>Defaults</Badge>);
    const badge = getBadge(screen.container);
    await expect
      .element(locatorFor(badge))
      .toHaveStyle({ backgroundColor: color.blue500, height: '1.25rem' });
    await takeSnapshot(`Badge - defaults to the "default" variant and "medium" size when not specified`);
  });

  it('keeps font-weight medium across all variants', async () => {
    const variants = ['default', 'success', 'warning', 'error', 'info'] as const;
    for (const variant of variants) {
      const screen = await render(<Badge variant={variant}>{variant}</Badge>);
      const badge = getBadge(screen.container);
      await expect.element(locatorFor(badge)).toHaveStyle({ fontWeight: '500' });
    }
    await takeSnapshot(`Badge - keeps font-weight medium across all variants`);
  });

  /* -----------------------------------------------------------------------
   * Size x variant matrix (8)
   * -------------------------------------------------------------------- */

  it('renders small success badge correctly', async () => {
    const screen = await render(
      <Badge variant="success" size="small">
        Small Success
      </Badge>
    );
    const badge = getBadge(screen.container);
    await expect
      .element(locatorFor(badge))
      .toHaveStyle({ backgroundColor: color.green500, height: '1rem' });
    await takeSnapshot(`Badge - renders small success badge correctly`);
  });

  it('renders large success badge correctly', async () => {
    const screen = await render(
      <Badge variant="success" size="large">
        Large Success
      </Badge>
    );
    const badge = getBadge(screen.container);
    await expect
      .element(locatorFor(badge))
      .toHaveStyle({ backgroundColor: color.green500, height: '1.5rem' });
    await takeSnapshot(`Badge - renders large success badge correctly`);
  });

  it('renders small warning badge correctly', async () => {
    const screen = await render(
      <Badge variant="warning" size="small">
        Small Warning
      </Badge>
    );
    const badge = getBadge(screen.container);
    await expect
      .element(locatorFor(badge))
      .toHaveStyle({ backgroundColor: color.yellow500, height: '1rem' });
    await takeSnapshot(`Badge - renders small warning badge correctly`);
  });

  it('renders large warning badge correctly', async () => {
    const screen = await render(
      <Badge variant="warning" size="large">
        Large Warning
      </Badge>
    );
    const badge = getBadge(screen.container);
    await expect
      .element(locatorFor(badge))
      .toHaveStyle({ backgroundColor: color.yellow500, height: '1.5rem' });
    await takeSnapshot(`Badge - renders large warning badge correctly`);
  });

  it('renders small error badge correctly', async () => {
    const screen = await render(
      <Badge variant="error" size="small">
        Small Error
      </Badge>
    );
    const badge = getBadge(screen.container);
    await expect
      .element(locatorFor(badge))
      .toHaveStyle({ backgroundColor: color.orange500, height: '1rem' });
    await takeSnapshot(`Badge - renders small error badge correctly`);
  });

  it('renders large error badge correctly', async () => {
    const screen = await render(
      <Badge variant="error" size="large">
        Large Error
      </Badge>
    );
    const badge = getBadge(screen.container);
    await expect
      .element(locatorFor(badge))
      .toHaveStyle({ backgroundColor: color.orange500, height: '1.5rem' });
    await takeSnapshot(`Badge - renders large error badge correctly`);
  });

  it('renders small info badge correctly', async () => {
    const screen = await render(
      <Badge variant="info" size="small">
        Small Info
      </Badge>
    );
    const badge = getBadge(screen.container);
    await expect
      .element(locatorFor(badge))
      .toHaveStyle({ backgroundColor: color.cyan500, height: '1rem' });
    await takeSnapshot(`Badge - renders small info badge correctly`);
  });

  it('renders large info badge correctly', async () => {
    const screen = await render(
      <Badge variant="info" size="large">
        Large Info
      </Badge>
    );
    const badge = getBadge(screen.container);
    await expect
      .element(locatorFor(badge))
      .toHaveStyle({ backgroundColor: color.cyan500, height: '1.5rem' });
    await takeSnapshot(`Badge - renders large info badge correctly`);
  });

  /* -----------------------------------------------------------------------
   * Kitchen-sink combos (5)
   * -------------------------------------------------------------------- */

  it('renders kitchen-sink combo: error + large + rounded correctly', async () => {
    const screen = await render(
      <Badge variant="error" size="large" rounded>
        Kitchen sink error large rounded
      </Badge>
    );
    const badge = getBadge(screen.container);
    await expect.element(locatorFor(badge)).toHaveStyle({
      backgroundColor: color.orange500,
      height: '1.5rem',
      borderRadius: '9999px',
    });
    await takeSnapshot(`Badge - renders kitchen-sink combo: error + large + rounded correctly`);
  });

  it('renders kitchen-sink combo: info + small + square correctly', async () => {
    const screen = await render(
      <Badge variant="info" size="small" rounded={false}>
        Kitchen sink info small square
      </Badge>
    );
    const badge = getBadge(screen.container);
    await expect.element(locatorFor(badge)).toHaveStyle({
      backgroundColor: color.cyan500,
      height: '1rem',
      borderRadius: '0.25rem',
    });
    await takeSnapshot(`Badge - renders kitchen-sink combo: info + small + square correctly`);
  });

  it('renders kitchen-sink combo: success + medium + rounded with long text', async () => {
    const longText = 'Kitchen sink success rounded with longer label text';
    const screen = await render(
      <Badge variant="success" size="medium" rounded>
        {longText}
      </Badge>
    );
    const badge = getBadge(screen.container);
    await expect
      .element(locatorFor(badge))
      .toHaveStyle({ backgroundColor: color.green500, borderRadius: '9999px' });
    await expect.element(screen.getByText(longText)).toHaveTextContent(longText);
    await takeSnapshot(`Badge - renders kitchen-sink combo: success + medium + rounded with long text`);
  });

  it('renders kitchen-sink combo: warning + large + rounded with emoji', async () => {
    const screen = await render(
      <Badge variant="warning" size="large" rounded>
        ⚠️ Caution
      </Badge>
    );
    const badge = getBadge(screen.container);
    await expect.element(locatorFor(badge)).toHaveStyle({
      backgroundColor: color.yellow500,
      height: '1.5rem',
      borderRadius: '9999px',
    });
    await takeSnapshot(`Badge - renders kitchen-sink combo: warning + large + rounded with emoji`);
  });

  it('renders kitchen-sink combo: default + large + rounded correctly', async () => {
    const screen = await render(
      <Badge variant="default" size="large" rounded>
        Featured
      </Badge>
    );
    const badge = getBadge(screen.container);
    await expect.element(locatorFor(badge)).toHaveStyle({
      backgroundColor: color.blue500,
      height: '1.5rem',
      borderRadius: '9999px',
    });
    await takeSnapshot(`Badge - renders kitchen-sink combo: default + large + rounded correctly`);
  });

  /* -----------------------------------------------------------------------
   * Multi-instance & groups (4)
   * -------------------------------------------------------------------- */

  it('renders multiple badges each maintaining independent variant styles', async () => {
    const screen = await render(
      <div>
        <Badge variant="default">Default</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="error">Error</Badge>
      </div>
    );
    await expect.element(screen.getByText('Default')).toHaveStyle({
      backgroundColor: color.blue500,
    });
    await expect.element(screen.getByText('Success')).toHaveStyle({
      backgroundColor: color.green500,
    });
    await expect.element(screen.getByText('Error')).toHaveStyle({
      backgroundColor: color.orange500,
    });
    await takeSnapshot(`Badge - renders multiple badges each maintaining independent variant styles`);
  });

  it('renders a mixed group of rounded and square badges independently', async () => {
    const screen = await render(
      <div>
        <Badge rounded>Rounded</Badge>
        <Badge rounded={false}>Square</Badge>
      </div>
    );
    await expect
      .element(screen.getByText('Rounded'))
      .toHaveStyle({ borderRadius: '9999px' });
    await expect
      .element(screen.getByText('Square'))
      .toHaveStyle({ borderRadius: '0.25rem' });
    await takeSnapshot(`Badge - renders a mixed group of rounded and square badges independently`);
  });

  it('renders notification-style count badges correctly', async () => {
    const screen = await render(
      <div>
        <Badge variant="error" size="small" rounded>
          1
        </Badge>
        <Badge variant="error" size="small" rounded>
          99+
        </Badge>
      </div>
    );
    await expect.element(screen.getByText('1')).toBeInTheDocument();
    await expect.element(screen.getByText('99+')).toBeInTheDocument();
    await takeSnapshot(`Badge - renders notification-style count badges correctly`);
  });

  it('renders zero as numeric children correctly', async () => {
    const screen = await render(<Badge>{0}</Badge>);
    const badge = getBadge(screen.container);
    expect(badge.textContent).toBe('0');
    await takeSnapshot(`Badge - renders zero as numeric children correctly`);
  });

  /* -----------------------------------------------------------------------
   * Re-render behavior (2)
   * -------------------------------------------------------------------- */

  it('updates the displayed content and variant styling when re-rendered with new props', async () => {
    const screen = await render(<Badge variant="default">Before</Badge>);
    const badge = getBadge(screen.container);
    await expect.element(screen.getByText('Before')).toBeInTheDocument();
    await expect
      .element(locatorFor(badge))
      .toHaveStyle({ backgroundColor: color.blue500 });

    await screen.rerender(<Badge variant="success">After</Badge>);

    await expect.element(screen.getByText('After')).toBeInTheDocument();
    await expect
      .element(locatorFor(getBadge(screen.container)))
      .toHaveStyle({ backgroundColor: color.green500 });
    await takeSnapshot(`Badge - updates the displayed content and variant styling when re-rendered with new props`);
  });

  it('updates rounded styling when re-rendered with rounded true', async () => {
    const screen = await render(<Badge rounded={false}>Corners</Badge>);
    await expect
      .element(locatorFor(getBadge(screen.container)))
      .toHaveStyle({ borderRadius: '0.25rem' });

    await screen.rerender(<Badge rounded>Corners</Badge>);

    await expect
      .element(locatorFor(getBadge(screen.container)))
      .toHaveStyle({ borderRadius: '9999px' });
    await takeSnapshot(`Badge - updates rounded styling when re-rendered with rounded true`);
  });

  /* -----------------------------------------------------------------------
   * Display & layout styles (3)
   * -------------------------------------------------------------------- */

  it('uses inline-flex display with centered alignment', async () => {
    const screen = await render(<Badge>Layout</Badge>);
    const badge = getBadge(screen.container);
    await expect.element(locatorFor(badge)).toHaveStyle({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    });
    await takeSnapshot(`Badge - uses inline-flex display with centered alignment`);
  });

  it('applies nowrap white-space to keep content on one line', async () => {
    const screen = await render(<Badge>No wrap</Badge>);
    const badge = getBadge(screen.container);
    await expect.element(locatorFor(badge)).toHaveStyle({ whiteSpace: 'nowrap' });
    await takeSnapshot(`Badge - applies nowrap white-space to keep content on one line`);
  });

  it('applies user-select none to prevent text selection', async () => {
    const screen = await render(<Badge>No select</Badge>);
    const badge = getBadge(screen.container);
    await expect.element(locatorFor(badge)).toHaveStyle({ userSelect: 'none' });
    await takeSnapshot(`Badge - applies user-select none to prevent text selection`);
  });

  /* -----------------------------------------------------------------------
   * Extra coverage to reach ~50 (4)
   * -------------------------------------------------------------------- */

  it('renders a count-style 99+ error badge as small and rounded', async () => {
    const screen = await render(
      <Badge variant="error" size="small" rounded>
        99+
      </Badge>
    );
    const badge = getBadge(screen.container);
    await expect.element(locatorFor(badge)).toHaveStyle({
      backgroundColor: color.orange500,
      height: '1rem',
      borderRadius: '9999px',
    });
    await expect.element(screen.getByText('99+')).toBeInTheDocument();
    await takeSnapshot(`Badge - renders a count-style 99+ error badge as small and rounded`);
  });

  it('renders medium success rounded badge correctly', async () => {
    const screen = await render(
      <Badge variant="success" size="medium" rounded>
        Medium Success Rounded
      </Badge>
    );
    const badge = getBadge(screen.container);
    await expect.element(locatorFor(badge)).toHaveStyle({
      backgroundColor: color.green500,
      height: '1.25rem',
      borderRadius: '9999px',
    });
    await takeSnapshot(`Badge - renders medium success rounded badge correctly`);
  });

  it('renders medium error square badge correctly', async () => {
    const screen = await render(
      <Badge variant="error" size="medium" rounded={false}>
        Medium Error Square
      </Badge>
    );
    const badge = getBadge(screen.container);
    await expect.element(locatorFor(badge)).toHaveStyle({
      backgroundColor: color.orange500,
      height: '1.25rem',
      borderRadius: '0.25rem',
    });
    await takeSnapshot(`Badge - renders medium error square badge correctly`);
  });

  it('renders rounded small warning badge correctly', async () => {
    const screen = await render(
      <Badge variant="warning" size="small" rounded>
        Rounded Small Warning
      </Badge>
    );
    const badge = getBadge(screen.container);
    await expect.element(locatorFor(badge)).toHaveStyle({
      backgroundColor: color.yellow500,
      height: '1rem',
      borderRadius: '9999px',
    });
    await takeSnapshot(`Badge - renders rounded small warning badge correctly`);
  });
});
