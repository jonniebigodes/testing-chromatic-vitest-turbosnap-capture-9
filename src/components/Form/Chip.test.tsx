import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent, page } from 'vitest/browser';
import { useState } from 'react';
import Chip from './Chip';
import { color, spacing } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

/**
 * Small stateful fixture mirroring the "removable list" usage pattern, used
 * to exercise real DOM removal behavior (as opposed to just spy call counts).
 */
const RemovableListFixture = ({ initial }: { initial: string[] }) => {
  const [items, setItems] = useState(initial);

  return (
    <div>
      {items.map((item) => (
        <Chip
          key={item}
          removable
          onRemove={() =>
            setItems((current) => current.filter((i) => i !== item))
          }
        >
          {item}
        </Chip>
      ))}
    </div>
  );
};

/** Wraps a raw HTMLElement into a Locator so jest-dom matchers can be used. */
const locatorFor = (element: HTMLElement) => page.elementLocator(element);

describe('Chip', () => {
  /* -----------------------------------------------------------------------
   * Status variants (5)
   * -------------------------------------------------------------------- */

  it('renders the default status with slate-based colors', async () => {
    const screen = await render(<Chip status="default">Default</Chip>);
    const root = screen.container.firstElementChild as HTMLElement;
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ backgroundColor: color.slate200, color: color.slate700 });
    await takeSnapshot(`Chip - renders the default status with slate-based colors`);
  });

  it('renders the info status with blue colors', async () => {
    const screen = await render(<Chip status="info">Info</Chip>);
    const root = screen.container.firstElementChild as HTMLElement;
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ backgroundColor: color.blue500, color: color.white });
    await takeSnapshot(`Chip - renders the info status with blue colors`);
  });

  it('renders the success status with green colors', async () => {
    const screen = await render(<Chip status="success">Success</Chip>);
    const root = screen.container.firstElementChild as HTMLElement;
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ backgroundColor: color.green500, color: color.white });
    await takeSnapshot(`Chip - renders the success status with green colors`);
  });

  it('renders the warning status with yellow colors', async () => {
    const screen = await render(<Chip status="warning">Warning</Chip>);
    const root = screen.container.firstElementChild as HTMLElement;
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ backgroundColor: color.yellow500, color: color.white });
    await takeSnapshot(`Chip - renders the warning status with yellow colors`);
  });

  it('renders the error status with pink colors', async () => {
    const screen = await render(<Chip status="error">Error</Chip>);
    const root = screen.container.firstElementChild as HTMLElement;
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ backgroundColor: color.pink500, color: color.white });
    await takeSnapshot(`Chip - renders the error status with pink colors`);
  });

  /* -----------------------------------------------------------------------
   * Size variants (3)
   * -------------------------------------------------------------------- */

  it('renders the small size with small padding and height', async () => {
    const screen = await render(<Chip size="small">Small</Chip>);
    const root = screen.container.firstElementChild as HTMLElement;
    await expect.element(locatorFor(root)).toHaveStyle({ height: spacing[5] });
    await takeSnapshot(`Chip - renders the small size with small padding and height`);
  });

  it('renders the medium size with medium padding and height', async () => {
    const screen = await render(<Chip size="medium">Medium</Chip>);
    const root = screen.container.firstElementChild as HTMLElement;
    await expect.element(locatorFor(root)).toHaveStyle({ height: spacing[6] });
    await takeSnapshot(`Chip - renders the medium size with medium padding and height`);
  });

  it('renders the large size with large padding and height', async () => {
    const screen = await render(<Chip size="large">Large</Chip>);
    const root = screen.container.firstElementChild as HTMLElement;
    await expect.element(locatorFor(root)).toHaveStyle({ height: spacing[8] });
    await takeSnapshot(`Chip - renders the large size with large padding and height`);
  });

  /* -----------------------------------------------------------------------
   * Removable (3)
   * -------------------------------------------------------------------- */

  it('gives the remove button an aria-label derived from the chip text', async () => {
    const screen = await render(<Chip removable>Invoice</Chip>);
    const removeButton = screen.getByRole('button', { name: 'Remove Invoice' });
    await expect.element(removeButton).toBeInTheDocument();
    await takeSnapshot(`Chip - gives the remove button an aria-label derived from the chip text`);
  });

  it('calls onRemove exactly once when the remove button is clicked', async () => {
    const onRemove = vi.fn();
    const screen = await render(
      <Chip removable onRemove={onRemove}>
        Removable chip
      </Chip>
    );
    const removeButton = screen.getByRole('button', {
      name: 'Remove Removable chip',
    });
    await userEvent.click(removeButton);
    await vi.waitFor(() => expect(onRemove).toHaveBeenCalledTimes(1));
    await takeSnapshot(`Chip - calls onRemove exactly once when the remove button is clicked`);
  });

  it('does not render a remove button when removable is false', async () => {
    const screen = await render(<Chip>Not removable</Chip>);
    const removeButtons = screen.getByRole('button').elements();
    expect(removeButtons.length).toBe(0);
    await takeSnapshot(`Chip - does not render a remove button when removable is false`);
  });

  /* -----------------------------------------------------------------------
   * Selected toggle (2)
   * -------------------------------------------------------------------- */

  it('exposes aria-pressed="true" when selected is true', async () => {
    const screen = await render(
      <Chip selected onClick={() => {}}>
        Selected
      </Chip>
    );
    const chip = screen.getByRole('button', { name: 'Selected' });
    await expect.element(chip).toHaveAttribute('aria-pressed', 'true');
    await takeSnapshot(`Chip - exposes aria-pressed="true" when selected is true`);
  });

  it('exposes aria-pressed="false" when selected is false', async () => {
    const screen = await render(
      <Chip selected={false} onClick={() => {}}>
        Not selected
      </Chip>
    );
    const chip = screen.getByRole('button', { name: 'Not selected' });
    await expect.element(chip).toHaveAttribute('aria-pressed', 'false');
    await takeSnapshot(`Chip - exposes aria-pressed="false" when selected is false`);
  });

  /* -----------------------------------------------------------------------
   * Disabled (3)
   * -------------------------------------------------------------------- */

  it('does not call onClick when a disabled chip is clicked', async () => {
    const onClick = vi.fn();
    const screen = await render(
      <Chip disabled onClick={onClick}>
        Disabled chip
      </Chip>
    );
    const chip = screen.container.firstElementChild as HTMLElement;
    await userEvent.click(locatorFor(chip), { force: true });
    await vi.waitFor(() => expect(onClick).not.toHaveBeenCalled());
    await takeSnapshot(`Chip - does not call onClick when a disabled chip is clicked`);
  });

  it('disables the remove button when disabled is true', async () => {
    const screen = await render(
      <Chip disabled removable>
        Disabled removable
      </Chip>
    );
    const removeButton = screen.getByRole('button', {
      name: 'Remove Disabled removable',
    });
    await expect.element(removeButton).toBeDisabled();
    await takeSnapshot(`Chip - disables the remove button when disabled is true`);
  });

  it('keeps a selected+disabled chip non-interactive', async () => {
    const onClick = vi.fn();
    const screen = await render(
      <Chip disabled selected onClick={onClick}>
        Disabled selected
      </Chip>
    );
    const chip = screen.container.firstElementChild as HTMLElement;
    await userEvent.click(locatorFor(chip), { force: true });
    await vi.waitFor(() => expect(onClick).not.toHaveBeenCalled());
    await takeSnapshot(`Chip - keeps a selected+disabled chip non-interactive`);
  });

  /* -----------------------------------------------------------------------
   * Icon slot (3)
   * -------------------------------------------------------------------- */

  it('renders the icon before the text content at small size', async () => {
    const screen = await render(
      <Chip size="small" icon={<span data-icon="tag">icon</span>}>
        Small icon chip
      </Chip>
    );
    const root = screen.container.firstElementChild as HTMLElement;
    const children = Array.from(root.children);
    const iconIndex = children.findIndex((child) =>
      child.querySelector('[data-icon="tag"]')
    );
    const textIndex = children.findIndex((child) =>
      child.textContent?.includes('Small icon chip')
    );
    expect(iconIndex).toBeGreaterThanOrEqual(0);
    expect(iconIndex).toBeLessThan(textIndex);
    await takeSnapshot(`Chip - renders the icon before the text content at small size`);
  });

  it('renders the icon before the text content at medium size', async () => {
    const screen = await render(
      <Chip size="medium" icon={<span data-icon="tag">icon</span>}>
        Medium icon chip
      </Chip>
    );
    const root = screen.container.firstElementChild as HTMLElement;
    const children = Array.from(root.children);
    const iconIndex = children.findIndex((child) =>
      child.querySelector('[data-icon="tag"]')
    );
    const textIndex = children.findIndex((child) =>
      child.textContent?.includes('Medium icon chip')
    );
    expect(iconIndex).toBeGreaterThanOrEqual(0);
    expect(iconIndex).toBeLessThan(textIndex);
    await takeSnapshot(`Chip - renders the icon before the text content at medium size`);
  });

  it('renders the icon before the text content at large size', async () => {
    const screen = await render(
      <Chip size="large" icon={<span data-icon="tag">icon</span>}>
        Large icon chip
      </Chip>
    );
    const root = screen.container.firstElementChild as HTMLElement;
    const children = Array.from(root.children);
    const iconIndex = children.findIndex((child) =>
      child.querySelector('[data-icon="tag"]')
    );
    const textIndex = children.findIndex((child) =>
      child.textContent?.includes('Large icon chip')
    );
    expect(iconIndex).toBeGreaterThanOrEqual(0);
    expect(iconIndex).toBeLessThan(textIndex);
    await takeSnapshot(`Chip - renders the icon before the text content at large size`);
  });

  /* -----------------------------------------------------------------------
   * Avatar-style icon (1)
   * -------------------------------------------------------------------- */

  it('renders an avatar-style icon alongside the chip text', async () => {
    const screen = await render(
      <Chip
        icon={
          <div data-avatar style={{ borderRadius: '50%' }}>
            JD
          </div>
        }
      >
        Jane Doe
      </Chip>
    );
    const root = screen.container.firstElementChild as HTMLElement;
    expect(root.querySelector('[data-avatar]')).toBeTruthy();
    await expect.element(screen.getByText('Jane Doe')).toBeInTheDocument();
    await takeSnapshot(`Chip - renders an avatar-style icon alongside the chip text`);
  });

  /* -----------------------------------------------------------------------
   * Inverted crossed with status (5)
   * -------------------------------------------------------------------- */

  it('renders inverted default status with white background and slate text', async () => {
    const screen = await render(
      <Chip status="default" inverted>
        Inverted default
      </Chip>
    );
    const root = screen.container.firstElementChild as HTMLElement;
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ backgroundColor: color.white, color: color.slate700 });
    await takeSnapshot(`Chip - renders inverted default status with white background and slate text`);
  });

  it('renders inverted info status with white background and blue text', async () => {
    const screen = await render(
      <Chip status="info" inverted>
        Inverted info
      </Chip>
    );
    const root = screen.container.firstElementChild as HTMLElement;
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ backgroundColor: color.white, color: color.blue500 });
    await takeSnapshot(`Chip - renders inverted info status with white background and blue text`);
  });

  it('renders inverted success status with white background and green text', async () => {
    const screen = await render(
      <Chip status="success" inverted>
        Inverted success
      </Chip>
    );
    const root = screen.container.firstElementChild as HTMLElement;
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ backgroundColor: color.white, color: color.green500 });
    await takeSnapshot(`Chip - renders inverted success status with white background and green text`);
  });

  it('renders inverted warning status with white background and yellow text', async () => {
    const screen = await render(
      <Chip status="warning" inverted>
        Inverted warning
      </Chip>
    );
    const root = screen.container.firstElementChild as HTMLElement;
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ backgroundColor: color.white, color: color.yellow500 });
    await takeSnapshot(`Chip - renders inverted warning status with white background and yellow text`);
  });

  it('renders inverted error status with white background and pink text', async () => {
    const screen = await render(
      <Chip status="error" inverted>
        Inverted error
      </Chip>
    );
    const root = screen.container.firstElementChild as HTMLElement;
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ backgroundColor: color.white, color: color.pink500 });
    await takeSnapshot(`Chip - renders inverted error status with white background and pink text`);
  });

  /* -----------------------------------------------------------------------
   * onClick isolation (1)
   * -------------------------------------------------------------------- */

  it('fires onClick exactly once per click on the chip body', async () => {
    const onClick = vi.fn();
    const screen = await render(<Chip onClick={onClick}>Clickable</Chip>);
    const chip = screen.getByRole('button', { name: 'Clickable' });
    await userEvent.click(chip);
    await userEvent.click(chip);
    await vi.waitFor(() => expect(onClick).toHaveBeenCalledTimes(2));
    await takeSnapshot(`Chip - fires onClick exactly once per click on the chip body`);
  });

  /* -----------------------------------------------------------------------
   * onRemove isolation (1) — critical stopPropagation behavior
   * -------------------------------------------------------------------- */

  it('calls onRemove without triggering the outer onClick when the dismiss button is clicked', async () => {
    const onClick = vi.fn();
    const onRemove = vi.fn();
    const screen = await render(
      <Chip onClick={onClick} removable onRemove={onRemove}>
        Dismissible
      </Chip>
    );
    const removeButton = screen.getByRole('button', {
      name: 'Remove Dismissible',
      exact: true,
    });
    await userEvent.click(removeButton);
    await vi.waitFor(() => expect(onRemove).toHaveBeenCalledTimes(1));
    await vi.waitFor(() => expect(onClick).not.toHaveBeenCalled());
    await takeSnapshot(`Chip - calls onRemove without triggering the outer onClick when the dismiss button is clicked`);
  });

  /* -----------------------------------------------------------------------
   * List composition (2)
   * -------------------------------------------------------------------- */

  it('removes one chip from a rendered list and keeps the remaining ones', async () => {
    const screen = await render(
      <RemovableListFixture initial={['Alpha', 'Beta', 'Gamma']} />
    );
    const removeBeta = screen.getByRole('button', { name: 'Remove Beta' });
    await userEvent.click(removeBeta);

    await expect.element(screen.getByText('Alpha')).toBeInTheDocument();
    await expect.element(screen.getByText('Gamma')).toBeInTheDocument();
    expect(screen.getByText('Beta').elements().length).toBe(0);
    await takeSnapshot(`Chip - removes one chip from a rendered list and keeps the remaining ones`);
  });

  it('empties the list when every chip is removed one by one', async () => {
    const screen = await render(
      <RemovableListFixture initial={['One', 'Two']} />
    );

    await userEvent.click(screen.getByRole('button', { name: 'Remove One' }));
    await userEvent.click(screen.getByRole('button', { name: 'Remove Two' }));

    await vi.waitFor(() => expect(screen.getByRole('button').elements().length).toBe(0));
    await takeSnapshot(`Chip - empties the list when every chip is removed one by one`);
  });

  /* -----------------------------------------------------------------------
   * Truncation (1)
   * -------------------------------------------------------------------- */

  it('keeps long text in the DOM even when a max-width constrains the chip', async () => {
    const longText =
      'This is an intentionally long chip label used to verify truncation';
    const screen = await render(
      <div style={{ width: '150px' }}>
        <Chip>{longText}</Chip>
      </div>
    );
    await expect.element(screen.getByText(longText)).toBeInTheDocument();
    await expect
      .element(screen.getByText(longText))
      .toHaveTextContent(longText);
    await takeSnapshot(`Chip - keeps long text in the DOM even when a max-width constrains the chip`);
  });

  /* -----------------------------------------------------------------------
   * Wrapping without max-width (1)
   * -------------------------------------------------------------------- */

  it('grows to fit long text instead of clipping it when unconstrained', async () => {
    const shortScreen = await render(<Chip>Hi</Chip>);
    const longScreen = await render(
      <Chip>
        This is a much longer piece of chip content that should not be
        clipped
      </Chip>
    );

    const shortRoot = shortScreen.container.firstElementChild as HTMLElement;
    const longRoot = longScreen.container.firstElementChild as HTMLElement;

    const shortWidth = shortRoot.getBoundingClientRect().width;
    const longWidth = longRoot.getBoundingClientRect().width;

    expect(longWidth).toBeGreaterThan(shortWidth);
    await takeSnapshot(`Chip - grows to fit long text instead of clipping it when unconstrained`);
  });

  /* -----------------------------------------------------------------------
   * Icon + removable coexistence (1)
   * -------------------------------------------------------------------- */

  it('renders both the icon and the remove button at the same time', async () => {
    const screen = await render(
      <Chip icon={<span data-icon="tag">icon</span>} removable>
        Tagged
      </Chip>
    );
    const root = screen.container.firstElementChild as HTMLElement;
    expect(root.querySelector('[data-icon="tag"]')).toBeTruthy();
    await expect
      .element(screen.getByRole('button', { name: 'Remove Tagged' }))
      .toBeInTheDocument();
    await takeSnapshot(`Chip - renders both the icon and the remove button at the same time`);
  });

  /* -----------------------------------------------------------------------
   * Selected crossed with status (2)
   * -------------------------------------------------------------------- */

  it('combines selected state with info status without conflicting styles', async () => {
    const screen = await render(
      <Chip status="info" selected onClick={() => {}}>
        Selected info
      </Chip>
    );
    const chip = screen.getByRole('button', { name: 'Selected info' });
    await expect.element(chip).toHaveAttribute('aria-pressed', 'true');
    await expect
      .element(chip)
      .toHaveStyle({ backgroundColor: color.blue500, color: color.white });
    await takeSnapshot(`Chip - combines selected state with info status without conflicting styles`);
  });

  it('combines selected state with warning status without conflicting styles', async () => {
    const screen = await render(
      <Chip status="warning" selected onClick={() => {}}>
        Selected warning
      </Chip>
    );
    const chip = screen.getByRole('button', { name: 'Selected warning' });
    await expect.element(chip).toHaveAttribute('aria-pressed', 'true');
    await expect
      .element(chip)
      .toHaveStyle({ backgroundColor: color.yellow500, color: color.white });
    await takeSnapshot(`Chip - combines selected state with warning status without conflicting styles`);
  });

  /* -----------------------------------------------------------------------
   * Size crossed with removable (2)
   * -------------------------------------------------------------------- */

  it('scales the remove button down for small removable chips', async () => {
    const screen = await render(
      <Chip size="small" removable>
        Small removable
      </Chip>
    );
    const removeButton = screen.getByRole('button', {
      name: 'Remove Small removable',
    });
    const rect = removeButton.element().getBoundingClientRect();
    expect(rect.width).toBeLessThanOrEqual(20);
    await takeSnapshot(`Chip - scales the remove button down for small removable chips`);
  });

  it('scales the remove button up for large removable chips', async () => {
    const screen = await render(
      <Chip size="large" removable>
        Large removable
      </Chip>
    );
    const removeButton = screen.getByRole('button', {
      name: 'Remove Large removable',
    });
    const rect = removeButton.element().getBoundingClientRect();
    expect(rect.width).toBeGreaterThanOrEqual(20);
    await takeSnapshot(`Chip - scales the remove button up for large removable chips`);
  });

  /* -----------------------------------------------------------------------
   * Size crossed with selected (2)
   * -------------------------------------------------------------------- */

  it('renders a small selected chip with correct height and aria-pressed', async () => {
    const screen = await render(
      <Chip size="small" selected onClick={() => {}}>
        Small selected
      </Chip>
    );
    const chip = screen.getByRole('button', { name: 'Small selected' });
    await expect.element(chip).toHaveAttribute('aria-pressed', 'true');
    await expect.element(chip).toHaveStyle({ height: spacing[5] });
    await takeSnapshot(`Chip - renders a small selected chip with correct height and aria-pressed`);
  });

  it('renders a large selected chip with correct height and aria-pressed', async () => {
    const screen = await render(
      <Chip size="large" selected onClick={() => {}}>
        Large selected
      </Chip>
    );
    const chip = screen.getByRole('button', { name: 'Large selected' });
    await expect.element(chip).toHaveAttribute('aria-pressed', 'true');
    await expect.element(chip).toHaveStyle({ height: spacing[8] });
    await takeSnapshot(`Chip - renders a large selected chip with correct height and aria-pressed`);
  });

  /* -----------------------------------------------------------------------
   * RTL/unicode (2)
   * -------------------------------------------------------------------- */

  it('preserves RTL unicode content exactly', async () => {
    const screen = await render(<Chip>مرحبا بالعالم</Chip>);
    await expect
      .element(screen.getByText('مرحبا بالعالم'))
      .toHaveTextContent('مرحبا بالعالم');
    await takeSnapshot(`Chip - preserves RTL unicode content exactly`);
  });

  it('preserves emoji content exactly', async () => {
    const screen = await render(<Chip>🔥 Trending</Chip>);
    await expect
      .element(screen.getByText('🔥 Trending'))
      .toHaveTextContent('🔥 Trending');
    await takeSnapshot(`Chip - preserves emoji content exactly`);
  });

  /* -----------------------------------------------------------------------
   * Empty children with icon-only (1)
   * -------------------------------------------------------------------- */

  it('renders an icon-only chip with empty children without throwing', async () => {
    const screen = await render(
      <Chip icon={<span data-icon="tag">icon</span>}>{''}</Chip>
    );
    const root = screen.container.firstElementChild as HTMLElement;
    expect(root.querySelector('[data-icon="tag"]')).toBeTruthy();
    await takeSnapshot(`Chip - renders an icon-only chip with empty children without throwing`);
  });

  /* -----------------------------------------------------------------------
   * Keyboard access (2)
   * -------------------------------------------------------------------- */

  it('reaches the remove button via Tab', async () => {
    const screen = await render(<Chip removable>Keyboard chip</Chip>);
    const removeButton = screen.getByRole('button', {
      name: 'Remove Keyboard chip',
    });

    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    await vi.waitFor(() => expect(document.activeElement).toBe(removeButton.element()));
    await takeSnapshot(`Chip - reaches the remove button via Tab`);
  });

  it('triggers onRemove when Enter is pressed on the focused remove button', async () => {
    const onRemove = vi.fn();
    const screen = await render(
      <Chip removable onRemove={onRemove}>
        Keyboard chip
      </Chip>
    );
    const removeButton = screen.getByRole('button', {
      name: 'Remove Keyboard chip',
    });

    removeButton.element().focus();
    await userEvent.keyboard('{Enter}');
    await vi.waitFor(() => expect(onRemove).toHaveBeenCalledTimes(1));
    await takeSnapshot(`Chip - triggers onRemove when Enter is pressed on the focused remove button`);
  });

  /* -----------------------------------------------------------------------
   * Accessibility (2)
   * -------------------------------------------------------------------- */

  it('matches the exact boolean value of aria-pressed', async () => {
    const screen = await render(
      <Chip selected onClick={() => {}}>
        Pressed chip
      </Chip>
    );
    const chip = screen.getByRole('button', { name: 'Pressed chip' });
    await expect.element(chip).toHaveAttribute('aria-pressed', 'true');
    await takeSnapshot(`Chip - matches the exact boolean value of aria-pressed`);
  });

  it('includes the chip text content in the remove button aria-label', async () => {
    const screen = await render(<Chip removable>Quarterly Report</Chip>);
    const removeButton = screen.getByRole('button', {
      name: 'Remove Quarterly Report',
    });
    await expect
      .element(removeButton)
      .toHaveAttribute('aria-label', 'Remove Quarterly Report');
    await takeSnapshot(`Chip - includes the chip text content in the remove button aria-label`);
  });

  /* -----------------------------------------------------------------------
   * Multi-instance independence (1)
   * -------------------------------------------------------------------- */

  it('does not leak styling or click state between two chip instances', async () => {
    const onClickFirst = vi.fn();
    const onClickSecond = vi.fn();
    const screen = await render(
      <div>
        <Chip status="info" onClick={onClickFirst}>
          First
        </Chip>
        <Chip status="error" onClick={onClickSecond}>
          Second
        </Chip>
      </div>
    );

    const first = screen.getByRole('button', { name: 'First' });
    const second = screen.getByRole('button', { name: 'Second' });

    await expect
      .element(first)
      .toHaveStyle({ backgroundColor: color.blue500 });
    await expect
      .element(second)
      .toHaveStyle({ backgroundColor: color.pink500 });

    await userEvent.click(first);
    await vi.waitFor(() => expect(onClickFirst).toHaveBeenCalledTimes(1));
    await vi.waitFor(() => expect(onClickSecond).not.toHaveBeenCalled());
    await takeSnapshot(`Chip - does not leak styling or click state between two chip instances`);
  });

  /* -----------------------------------------------------------------------
   * Read-only tag (1)
   * -------------------------------------------------------------------- */

  it('renders a fully static chip with no button role when neither onClick nor removable is set', async () => {
    const screen = await render(<Chip>Static tag</Chip>);
    const root = screen.container.firstElementChild as HTMLElement;
    expect(root.getAttribute('role')).toBeNull();
    expect(root.getAttribute('tabindex')).toBeNull();
    await takeSnapshot(`Chip - renders a fully static chip with no button role when neither onClick nor removable is set`);
  });

  /* -----------------------------------------------------------------------
   * Kitchen-sink (1)
   * -------------------------------------------------------------------- */

  it('renders a kitchen-sink chip with icon, removable, selected, status and size together', async () => {
    const onClick = vi.fn();
    const screen = await render(
      <Chip
        icon={<span data-icon="tag">icon</span>}
        removable
        selected
        status="warning"
        size="large"
        onClick={onClick}
      >
        Kitchen sink
      </Chip>
    );

    const root = screen.container.firstElementChild as HTMLElement;
    const chip = locatorFor(root);
    await expect.element(chip).toHaveAttribute('aria-pressed', 'true');
    await expect
      .element(chip)
      .toHaveStyle({ backgroundColor: color.yellow500, height: spacing[8] });
    await expect
      .element(
        screen.getByRole('button', { name: 'Remove Kitchen sink', exact: true })
      )
      .toBeInTheDocument();
    await takeSnapshot(`Chip - renders a kitchen-sink chip with icon, removable, selected, status and size together`);
  });

  /* -----------------------------------------------------------------------
   * onClick-absent semantics (1)
   * -------------------------------------------------------------------- */

  it('does not expose a button role or tab order when onClick is not provided, even if removable', async () => {
    const screen = await render(<Chip removable>No click handler</Chip>);
    const root = screen.container.firstElementChild as HTMLElement;
    expect(root.getAttribute('role')).toBeNull();
    expect(root.getAttribute('tabindex')).toBeNull();
    await takeSnapshot(`Chip - does not expose a button role or tab order when onClick is not provided, even if removable`);
  });

  /* -----------------------------------------------------------------------
   * Default prop sanity (1)
   * -------------------------------------------------------------------- */

  it('defaults status to "default" and size to "medium" when omitted', async () => {
    const screen = await render(<Chip>Defaults</Chip>);
    const root = screen.container.firstElementChild as HTMLElement;
    await expect.element(locatorFor(root)).toHaveStyle({
      backgroundColor: color.slate200,
      color: color.slate700,
      height: spacing[6],
    });
    await takeSnapshot(`Chip - defaults status to "default" and size to "medium" when omitted`);
  });
});
