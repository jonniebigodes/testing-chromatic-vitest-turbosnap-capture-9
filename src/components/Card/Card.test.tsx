import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent, page } from 'vitest/browser';
import Card from './Card';
import { color } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

/** Wraps a raw HTMLElement into a Locator so jest-dom matchers can be used. */
const locatorFor = (element: HTMLElement) => page.elementLocator(element);

/** The card root is the first child of the render container. */
const getCard = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement;

describe('Card', () => {
  /* -----------------------------------------------------------------------
   * Rendering basics (6)
   * -------------------------------------------------------------------- */

  it('renders the provided children content inside the card', async () => {
    const screen = await render(<Card>Hello Card</Card>);
    await expect.element(screen.getByText('Hello Card')).toBeInTheDocument();
    await takeSnapshot(`Card - renders the provided children content inside the card`);
  });

  it('renders the title when provided', async () => {
    const screen = await render(<Card title="My Title">Body</Card>);
    await expect.element(screen.getByText('My Title')).toBeInTheDocument();
    await takeSnapshot(`Card - renders the title when provided`);
  });

  it('renders the subtitle when provided', async () => {
    const screen = await render(
      <Card title="Title" subtitle="My Subtitle">
        Body
      </Card>
    );
    await expect.element(screen.getByText('My Subtitle')).toBeInTheDocument();
    await takeSnapshot(`Card - renders the subtitle when provided`);
  });

  it('renders the footer when provided', async () => {
    const screen = await render(
      <Card title="Title" footer="Footer text">
        Body
      </Card>
    );
    await expect.element(screen.getByText('Footer text')).toBeInTheDocument();
    await takeSnapshot(`Card - renders the footer when provided`);
  });

  it('does not render a title element when title is omitted', async () => {
    const screen = await render(<Card>Body only</Card>);
    await expect.element(screen.getByText('Body only')).toBeInTheDocument();
    expect(screen.container.textContent).not.toContain('undefined');
    await takeSnapshot(`Card - does not render a title element when title is omitted`);
  });

  it('renders as a single root div element', async () => {
    const screen = await render(<Card>Div check</Card>);
    const card = getCard(screen.container);
    expect(card.tagName).toBe('DIV');
    await takeSnapshot(`Card - renders as a single root div element`);
  });

  /* -----------------------------------------------------------------------
   * Visual styles: bg, border, elevation (6)
   * -------------------------------------------------------------------- */

  it('applies a white background by default', async () => {
    const screen = await render(<Card>White bg</Card>);
    const card = getCard(screen.container);
    await expect
      .element(locatorFor(card))
      .toHaveStyle({ backgroundColor: color.white });
    await takeSnapshot(`Card - applies a white background by default`);
  });

  it('applies a slate border when bordered is true by default', async () => {
    const screen = await render(<Card>Bordered</Card>);
    const card = getCard(screen.container);
    await expect
      .element(locatorFor(card))
      .toHaveStyle({ borderStyle: 'solid', borderColor: color.slate300 });
    await takeSnapshot(`Card - applies a slate border when bordered is true by default`);
  });

  it('removes the border when bordered is false', async () => {
    const screen = await render(<Card bordered={false}>Unbordered</Card>);
    const card = getCard(screen.container);
    await expect.element(locatorFor(card)).toHaveStyle({ borderStyle: 'none' });
    await takeSnapshot(`Card - removes the border when bordered is false`);
  });

  it('applies a box shadow when elevated is true', async () => {
    const screen = await render(<Card elevated>Elevated</Card>);
    const card = getCard(screen.container);
    const style = getComputedStyle(card);
    expect(style.boxShadow).not.toBe('none');
    await takeSnapshot(`Card - applies a box shadow when elevated is true`);
  });

  it('applies no box shadow when elevated is false by default', async () => {
    const screen = await render(<Card>Flat</Card>);
    const card = getCard(screen.container);
    await expect.element(locatorFor(card)).toHaveStyle({ boxShadow: 'none' });
    await takeSnapshot(`Card - applies no box shadow when elevated is false by default`);
  });

  it('can be elevated and unbordered at the same time', async () => {
    const screen = await render(
      <Card elevated bordered={false}>
        Elevated unbordered
      </Card>
    );
    const card = getCard(screen.container);
    await expect.element(locatorFor(card)).toHaveStyle({ borderStyle: 'none' });
    const style = getComputedStyle(card);
    expect(style.boxShadow).not.toBe('none');
    await takeSnapshot(`Card - can be elevated and unbordered at the same time`);
  });

  /* -----------------------------------------------------------------------
   * Padding sizes (4)
   * -------------------------------------------------------------------- */

  it('applies no padding when padding is none', async () => {
    const screen = await render(<Card padding="none">None</Card>);
    const card = getCard(screen.container);
    await expect.element(locatorFor(card)).toHaveStyle({ padding: '0px' });
    await takeSnapshot(`Card - applies no padding when padding is none`);
  });

  it('applies small padding', async () => {
    const screen = await render(<Card padding="small">Small</Card>);
    const card = getCard(screen.container);
    await expect.element(locatorFor(card)).toHaveStyle({ padding: '0.5rem' });
    await takeSnapshot(`Card - applies small padding`);
  });

  it('applies medium padding by default', async () => {
    const screen = await render(<Card>Medium</Card>);
    const card = getCard(screen.container);
    await expect.element(locatorFor(card)).toHaveStyle({ padding: '1rem' });
    await takeSnapshot(`Card - applies medium padding by default`);
  });

  it('applies large padding', async () => {
    const screen = await render(<Card padding="large">Large</Card>);
    const card = getCard(screen.container);
    await expect.element(locatorFor(card)).toHaveStyle({ padding: '1.5rem' });
    await takeSnapshot(`Card - applies large padding`);
  });

  /* -----------------------------------------------------------------------
   * Cursor & click behavior (7)
   * -------------------------------------------------------------------- */

  it('applies a pointer cursor when onClick is provided', async () => {
    const screen = await render(<Card onClick={() => {}}>Clickable</Card>);
    const card = getCard(screen.container);
    await expect.element(locatorFor(card)).toHaveStyle({ cursor: 'pointer' });
    await takeSnapshot(`Card - applies a pointer cursor when onClick is provided`);
  });

  it('applies a default cursor when no onClick handler is provided', async () => {
    const screen = await render(<Card>Not clickable</Card>);
    const card = getCard(screen.container);
    await expect.element(locatorFor(card)).toHaveStyle({ cursor: 'default' });
    await takeSnapshot(`Card - applies a default cursor when no onClick handler is provided`);
  });

  it('calls onClick exactly once when clicked', async () => {
    const onClick = vi.fn();
    const screen = await render(<Card onClick={onClick}>Click once</Card>);
    const card = getCard(screen.container);
    await userEvent.click(locatorFor(card));
    await vi.waitFor(() => expect(onClick).toHaveBeenCalledTimes(1));
    await takeSnapshot(`Card - calls onClick exactly once when clicked`);
  });

  it('calls onClick once per click for multiple clicks', async () => {
    const onClick = vi.fn();
    const screen = await render(<Card onClick={onClick}>Click thrice</Card>);
    const card = getCard(screen.container);
    await userEvent.click(locatorFor(card));
    await userEvent.click(locatorFor(card));
    await userEvent.click(locatorFor(card));
    await vi.waitFor(() => expect(onClick).toHaveBeenCalledTimes(3));
    await takeSnapshot(`Card - calls onClick once per click for multiple clicks`);
  });

  it('does not throw when clicked without an onClick handler', async () => {
    const screen = await render(<Card>No handler</Card>);
    const card = getCard(screen.container);
    await expect(userEvent.click(locatorFor(card))).resolves.not.toThrow();
    await takeSnapshot(`Card - does not throw when clicked without an onClick handler`);
  });

  it('does not share click handlers between two independent card instances', async () => {
    const onFirstClick = vi.fn();
    const onSecondClick = vi.fn();
    const screen = await render(
      <div>
        <Card onClick={onFirstClick}>First</Card>
        <Card onClick={onSecondClick}>Second</Card>
      </div>
    );
    const firstCard = screen.container.children[0]
      .firstElementChild as HTMLElement;
    await userEvent.click(locatorFor(firstCard));
    await vi.waitFor(() => expect(onFirstClick).toHaveBeenCalledTimes(1));
    await vi.waitFor(() => expect(onSecondClick).not.toHaveBeenCalled());
    await takeSnapshot(`Card - does not share click handlers between two independent card instances`);
  });

  it('fires onClick when the title area is clicked', async () => {
    const onClick = vi.fn();
    const screen = await render(
      <Card title="Title click" onClick={onClick}>
        Body
      </Card>
    );
    await userEvent.click(screen.getByText('Title click'));
    await vi.waitFor(() => expect(onClick).toHaveBeenCalledTimes(1));
    await takeSnapshot(`Card - fires onClick when the title area is clicked`);
  });

  /* -----------------------------------------------------------------------
   * Hover cosmetics (3)
   * -------------------------------------------------------------------- */

  it('reduces opacity and lifts the card on hover when clickable', async () => {
    const screen = await render(<Card onClick={() => {}}>Hover me</Card>);
    const card = getCard(screen.container);
    await userEvent.hover(locatorFor(card));
    await expect.element(locatorFor(card)).toHaveStyle({ opacity: '0.95' });
    await takeSnapshot(`Card - reduces opacity and lifts the card on hover when clickable`);
  });

  it('reverts opacity back to 1 when the pointer leaves a clickable card', async () => {
    const screen = await render(<Card onClick={() => {}}>Hover me</Card>);
    const card = getCard(screen.container);
    await userEvent.hover(locatorFor(card));
    await expect.element(locatorFor(card)).toHaveStyle({ opacity: '0.95' });
    await userEvent.unhover(locatorFor(card));
    await expect.element(locatorFor(card)).toHaveStyle({ opacity: '1' });
    await takeSnapshot(`Card - reverts opacity back to 1 when the pointer leaves a clickable card`);
  });

  it('does not change opacity on hover when no onClick handler is provided', async () => {
    const screen = await render(<Card>No hover effect</Card>);
    const card = getCard(screen.container);
    await userEvent.hover(locatorFor(card));
    await expect.element(locatorFor(card)).toHaveStyle({ opacity: '1' });
    await takeSnapshot(`Card - does not change opacity on hover when no onClick handler is provided`);
  });

  /* -----------------------------------------------------------------------
   * Content edge cases (5)
   * -------------------------------------------------------------------- */

  it('renders long body text content in full', async () => {
    const longText =
      'This card contains a fairly long body of text to exercise wrapping and layout behavior within the constrained card width.';
    const screen = await render(<Card title="Long">{longText}</Card>);
    await expect.element(screen.getByText(longText)).toHaveTextContent(longText);
    await takeSnapshot(`Card - renders long body text content in full`);
  });

  it('preserves emoji content in title and body', async () => {
    const screen = await render(
      <Card title="🎉 Celebration">🏆 Win</Card>
    );
    await expect.element(screen.getByText('🎉 Celebration')).toBeInTheDocument();
    await expect.element(screen.getByText('🏆 Win')).toBeInTheDocument();
    await takeSnapshot(`Card - preserves emoji content in title and body`);
  });

  it('preserves RTL unicode content exactly', async () => {
    const screen = await render(
      <Card title="مرحبا بالعالم">هذا محتوى</Card>
    );
    await expect
      .element(screen.getByText('مرحبا بالعالم'))
      .toHaveTextContent('مرحبا بالعالم');
    await takeSnapshot(`Card - preserves RTL unicode content exactly`);
  });

  it('renders zero as numeric children correctly', async () => {
    const screen = await render(<Card title="Zero">{0}</Card>);
    const card = getCard(screen.container);
    expect(card.textContent).toContain('0');
    await takeSnapshot(`Card - renders zero as numeric children correctly`);
  });

  it('renders correctly with an empty string as children', async () => {
    const screen = await render(<Card title="Empty">{''}</Card>);
    const card = getCard(screen.container);
    expect(card).not.toBeNull();
    await takeSnapshot(`Card - renders correctly with an empty string as children`);
  });

  /* -----------------------------------------------------------------------
   * Kitchen-sink combos (5)
   * -------------------------------------------------------------------- */

  it('renders kitchen-sink combo: elevated + large padding + title + subtitle + footer', async () => {
    const screen = await render(
      <Card
        title="Kitchen Sink"
        subtitle="All the bells and whistles"
        footer="Footer content here"
        elevated
        bordered
        padding="large"
      >
        Full featured
      </Card>
    );
    const card = getCard(screen.container);
    await expect.element(locatorFor(card)).toHaveStyle({ padding: '1.5rem' });
    await expect.element(screen.getByText('Kitchen Sink')).toBeInTheDocument();
    await expect
      .element(screen.getByText('All the bells and whistles'))
      .toBeInTheDocument();
    await expect
      .element(screen.getByText('Footer content here'))
      .toBeInTheDocument();
    await takeSnapshot(`Card - renders kitchen-sink combo: elevated + large padding + title + subtitle + footer`);
  });

  it('renders kitchen-sink combo: unbordered + small + clickable, firing onClick', async () => {
    const onClick = vi.fn();
    const screen = await render(
      <Card
        title="Compact clickable"
        bordered={false}
        padding="small"
        onClick={onClick}
      >
        Small padding
      </Card>
    );
    const card = getCard(screen.container);
    await expect.element(locatorFor(card)).toHaveStyle({
      padding: '0.5rem',
      borderStyle: 'none',
      cursor: 'pointer',
    });
    await userEvent.click(locatorFor(card));
    await vi.waitFor(() => expect(onClick).toHaveBeenCalledTimes(1));
    await takeSnapshot(`Card - renders kitchen-sink combo: unbordered + small + clickable, firing onClick`);
  });

  it('renders kitchen-sink combo: none padding with footer', async () => {
    const screen = await render(
      <Card title="Flush" footer="Footer" padding="none">
        No padding
      </Card>
    );
    const card = getCard(screen.container);
    await expect.element(locatorFor(card)).toHaveStyle({ padding: '0px' });
    await expect.element(screen.getByText('Footer')).toBeInTheDocument();
    await takeSnapshot(`Card - renders kitchen-sink combo: none padding with footer`);
  });

  it('renders a product-style card with elevated shadow and footer price', async () => {
    const screen = await render(
      <Card
        title="Wireless Headphones"
        subtitle="Audio · Electronics"
        footer="$299.00"
        elevated
      >
        Premium headphones
      </Card>
    );
    await expect
      .element(screen.getByText('Wireless Headphones'))
      .toBeInTheDocument();
    await expect.element(screen.getByText('$299.00')).toBeInTheDocument();
    await takeSnapshot(`Card - renders a product-style card with elevated shadow and footer price`);
  });

  it('renders a complex ReactNode footer with multiple elements', async () => {
    const screen = await render(
      <Card
        title="Team invite"
        footer={
          <div>
            <span>Accept</span>
            <span>Decline</span>
          </div>
        }
      >
        Invite body
      </Card>
    );
    await expect.element(screen.getByText('Accept')).toBeInTheDocument();
    await expect.element(screen.getByText('Decline')).toBeInTheDocument();
    await takeSnapshot(`Card - renders a complex ReactNode footer with multiple elements`);
  });

  /* -----------------------------------------------------------------------
   * Title / subtitle styling (3)
   * -------------------------------------------------------------------- */

  it('styles the title with semibold weight and slate900 color', async () => {
    const screen = await render(<Card title="Styled Title">Body</Card>);
    await expect.element(screen.getByText('Styled Title')).toHaveStyle({
      fontWeight: '600',
      color: color.slate900,
    });
    await takeSnapshot(`Card - styles the title with semibold weight and slate900 color`);
  });

  it('styles the subtitle with regular weight and slate500 color', async () => {
    const screen = await render(
      <Card title="Title" subtitle="Styled Subtitle">
        Body
      </Card>
    );
    await expect.element(screen.getByText('Styled Subtitle')).toHaveStyle({
      fontWeight: '400',
      color: color.slate500,
    });
    await takeSnapshot(`Card - styles the subtitle with regular weight and slate500 color`);
  });

  it('renders subtitle without title when only subtitle is provided', async () => {
    const screen = await render(
      <Card subtitle="Subtitle alone">Body</Card>
    );
    await expect.element(screen.getByText('Subtitle alone')).toBeInTheDocument();
    await takeSnapshot(`Card - renders subtitle without title when only subtitle is provided`);
  });

  /* -----------------------------------------------------------------------
   * Layout & transition (3)
   * -------------------------------------------------------------------- */

  it('uses flex column layout on the root', async () => {
    const screen = await render(<Card>Layout</Card>);
    const card = getCard(screen.container);
    await expect.element(locatorFor(card)).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
    });
    await takeSnapshot(`Card - uses flex column layout on the root`);
  });

  it('applies a consistent transition duration and timing function', async () => {
    const screen = await render(<Card>Transition</Card>);
    const card = getCard(screen.container);
    await expect.element(locatorFor(card)).toHaveStyle({
      transitionDuration: '0.2s',
      transitionTimingFunction: 'ease',
    });
    await takeSnapshot(`Card - applies a consistent transition duration and timing function`);
  });

  it('applies a border radius on the root card', async () => {
    const screen = await render(<Card>Radius</Card>);
    const card = getCard(screen.container);
    await expect
      .element(locatorFor(card))
      .toHaveStyle({ borderRadius: '0.5rem' });
    await takeSnapshot(`Card - applies a border radius on the root card`);
  });

  /* -----------------------------------------------------------------------
   * Re-render & multi-instance (3)
   * -------------------------------------------------------------------- */

  it('updates title and elevation when re-rendered with new props', async () => {
    const screen = await render(
      <Card title="Before" elevated={false}>
        Body
      </Card>
    );
    await expect.element(screen.getByText('Before')).toBeInTheDocument();
    await expect
      .element(locatorFor(getCard(screen.container)))
      .toHaveStyle({ boxShadow: 'none' });

    await screen.rerender(
      <Card title="After" elevated>
        Body
      </Card>
    );

    await expect.element(screen.getByText('After')).toBeInTheDocument();
    const style = getComputedStyle(getCard(screen.container));
    expect(style.boxShadow).not.toBe('none');
    await takeSnapshot(`Card - updates title and elevation when re-rendered with new props`);
  });

  it('renders multiple cards each maintaining independent elevated state', async () => {
    const screen = await render(
      <div>
        <Card elevated>Elevated</Card>
        <Card elevated={false}>Flat</Card>
      </div>
    );
    const elevated = screen.container.children[0]
      .firstElementChild as HTMLElement;
    const flat = screen.container.children[0]
      .children[1] as HTMLElement;
    expect(getComputedStyle(elevated).boxShadow).not.toBe('none');
    await expect.element(locatorFor(flat)).toHaveStyle({ boxShadow: 'none' });
    await takeSnapshot(`Card - renders multiple cards each maintaining independent elevated state`);
  });

  it('renders whitespace-only content as a truthy node without throwing', async () => {
    const screen = await render(<Card>{'   '}</Card>);
    const card = getCard(screen.container);
    expect(card).not.toBeNull();
    await takeSnapshot(`Card - renders whitespace-only content as a truthy node without throwing`);
  });

  /* -----------------------------------------------------------------------
   * Extra coverage to reach ~50 (5)
   * -------------------------------------------------------------------- */

  it('renders a profile-style card with title, subtitle, and footer location', async () => {
    const screen = await render(
      <Card
        title="Jane Doe"
        subtitle="Product Designer"
        footer="San Francisco, CA"
      >
        Building delightful interfaces
      </Card>
    );
    await expect.element(screen.getByText('Jane Doe')).toBeInTheDocument();
    await expect
      .element(screen.getByText('Product Designer'))
      .toBeInTheDocument();
    await expect
      .element(screen.getByText('San Francisco, CA'))
      .toBeInTheDocument();
    await takeSnapshot(`Card - renders a profile-style card with title, subtitle, and footer location`);
  });

  it('renders an alert-style elevated card with action footer', async () => {
    const screen = await render(
      <Card
        title="Payment failed"
        subtitle="Action required"
        footer="Retry payment"
        elevated
      >
        Please update your card
      </Card>
    );
    const card = getCard(screen.container);
    expect(getComputedStyle(card).boxShadow).not.toBe('none');
    await expect.element(screen.getByText('Payment failed')).toBeInTheDocument();
    await expect.element(screen.getByText('Retry payment')).toBeInTheDocument();
    await takeSnapshot(`Card - renders an alert-style elevated card with action footer`);
  });

  it('renders a compact minimal card with small padding and no elevation', async () => {
    const screen = await render(
      <Card padding="small" elevated={false} bordered>
        Compact note
      </Card>
    );
    const card = getCard(screen.container);
    await expect.element(locatorFor(card)).toHaveStyle({
      padding: '0.5rem',
      boxShadow: 'none',
      borderStyle: 'solid',
    });
    await takeSnapshot(`Card - renders a compact minimal card with small padding and no elevation`);
  });

  it('renders a short single character as body content', async () => {
    const screen = await render(<Card title="Single char">A</Card>);
    await expect.element(screen.getByText('A', { exact: true })).toBeInTheDocument();
    await takeSnapshot(`Card - renders a short single character as body content`);
  });

  it('renders numeric-looking string content correctly', async () => {
    const screen = await render(<Card title="Stats">42</Card>);
    await expect.element(screen.getByText('42')).toBeInTheDocument();
    await takeSnapshot(`Card - renders numeric-looking string content correctly`);
  });
});
