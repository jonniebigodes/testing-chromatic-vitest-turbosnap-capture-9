import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent, page } from 'vitest/browser';
import { useState } from 'react';
import Collapsible from './Collapsible';
import { color } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

/**
 * Small stateful fixture mirroring the "controlled collapsible" usage
 * pattern from the stories, used to exercise real external state updates (as
 * opposed to just spy call counts).
 */
const ControlledToggleFixture = ({
  initialOpen = false,
}: {
  initialOpen?: boolean;
}) => {
  const [open, setOpen] = useState(initialOpen);

  return (
    <>
      <Collapsible
        open={open}
        onOpenChange={(details) => setOpen(details.open)}
        label="Controlled fixture"
      >
        Controlled fixture content
      </Collapsible>
      <button onClick={() => setOpen((current) => !current)}>
        Toggle from outside
      </button>
    </>
  );
};

/** Wraps a raw HTMLElement into a Locator so jest-dom matchers can be used. */
const locatorFor = (element: HTMLElement) => page.elementLocator(element);

/** The Ark UI root <div>, identified by its anatomy data-part attribute. */
const getRoot = (container: HTMLElement) =>
  container.querySelector('[data-part="root"]') as HTMLElement;

/** The Ark UI trigger <button>, identified by its anatomy data-part attribute. */
const getTrigger = (container: HTMLElement) =>
  container.querySelector('[data-part="trigger"]') as HTMLElement;

/** The Ark UI content <div>, identified by its anatomy data-part attribute. */
const getContent = (container: HTMLElement) =>
  container.querySelector('[data-part="content"]') as HTMLElement;

describe('Collapsible', () => {
  /* -----------------------------------------------------------------------
   * Default rendering (closed) (3)
   * -------------------------------------------------------------------- */

  it('renders closed by default with the content hidden', async () => {
    const screen = await render(
      <Collapsible label="Default">Default content</Collapsible>
    );
    const content = getContent(screen.container);
    expect(content.hidden).toBe(true);
    await takeSnapshot(`Collapsible - renders closed by default with the content hidden`);
  });

  it('sets aria-expanded to false on the trigger when closed by default', async () => {
    const screen = await render(
      <Collapsible label="Default">Default content</Collapsible>
    );
    const trigger = getTrigger(screen.container);
    await expect
      .element(locatorFor(trigger))
      .toHaveAttribute('aria-expanded', 'false');
    await takeSnapshot(`Collapsible - sets aria-expanded to false on the trigger when closed by default`);
  });

  it('sets data-state="closed" on the root when closed by default', async () => {
    const screen = await render(
      <Collapsible label="Default">Default content</Collapsible>
    );
    const root = getRoot(screen.container);
    await expect
      .element(locatorFor(root))
      .toHaveAttribute('data-state', 'closed');
    await takeSnapshot(`Collapsible - sets data-state="closed" on the root when closed by default`);
  });

  /* -----------------------------------------------------------------------
   * Open state rendering (3)
   * -------------------------------------------------------------------- */

  it('shows the content (not hidden) when open is true', async () => {
    const screen = await render(
      <Collapsible open label="Open">
        Open content
      </Collapsible>
    );
    const content = getContent(screen.container);
    expect(content.hidden).toBe(false);
    await takeSnapshot(`Collapsible - shows the content (not hidden) when open is true`);
  });

  it('sets aria-expanded to true on the trigger when open is true', async () => {
    const screen = await render(
      <Collapsible open label="Open">
        Open content
      </Collapsible>
    );
    const trigger = getTrigger(screen.container);
    await expect
      .element(locatorFor(trigger))
      .toHaveAttribute('aria-expanded', 'true');
    await takeSnapshot(`Collapsible - sets aria-expanded to true on the trigger when open is true`);
  });

  it('sets data-state="open" on the root and trigger when open is true', async () => {
    const screen = await render(
      <Collapsible open label="Open">
        Open content
      </Collapsible>
    );
    const root = getRoot(screen.container);
    const trigger = getTrigger(screen.container);
    await expect.element(locatorFor(root)).toHaveAttribute('data-state', 'open');
    await expect
      .element(locatorFor(trigger))
      .toHaveAttribute('data-state', 'open');
    await takeSnapshot(`Collapsible - sets data-state="open" on the root and trigger when open is true`);
  });

  /* -----------------------------------------------------------------------
   * Explicit false open prop (2)
   * -------------------------------------------------------------------- */

  it('keeps the content hidden when open is explicitly false', async () => {
    const screen = await render(
      <Collapsible open={false} label="Explicitly closed">
        Content
      </Collapsible>
    );
    const content = getContent(screen.container);
    expect(content.hidden).toBe(true);
    await takeSnapshot(`Collapsible - keeps the content hidden when open is explicitly false`);
  });

  it('sets aria-expanded to false when open is explicitly false', async () => {
    const screen = await render(
      <Collapsible open={false} label="Explicitly closed">
        Content
      </Collapsible>
    );
    const trigger = getTrigger(screen.container);
    await expect
      .element(locatorFor(trigger))
      .toHaveAttribute('aria-expanded', 'false');
    await takeSnapshot(`Collapsible - sets aria-expanded to false when open is explicitly false`);
  });

  /* -----------------------------------------------------------------------
   * Controlled open prop / external state (4)
   * -------------------------------------------------------------------- */

  it('reflects an external state update pushed down through the open prop', async () => {
    const screen = await render(<ControlledToggleFixture />);
    const content = getContent(screen.container);
    expect(content.hidden).toBe(true);

    await userEvent.click(
      screen.getByRole('button', { name: 'Toggle from outside' })
    );

    expect(content.hidden).toBe(false);
    await takeSnapshot(`Collapsible - reflects an external state update pushed down through the open prop`);
  });

  it('toggles back to closed after clicking the outside toggle button twice', async () => {
    const screen = await render(<ControlledToggleFixture />);
    const content = getContent(screen.container);
    const toggleButton = screen.getByRole('button', {
      name: 'Toggle from outside',
    });

    await userEvent.click(toggleButton);
    await vi.waitFor(() => expect(content.hidden).toBe(false));

    await userEvent.click(toggleButton);
    await vi.waitFor(() => expect(content.hidden).toBe(true));
    await takeSnapshot(`Collapsible - toggles back to closed after clicking the outside toggle button twice`);
  });

  it('calls onOpenChange with open:true when clicking a trigger whose open prop stays locked at false', async () => {
    const onOpenChange = vi.fn();
    const screen = await render(
      <Collapsible open={false} onOpenChange={onOpenChange} label="Locked closed">
        Content
      </Collapsible>
    );
    const trigger = getTrigger(screen.container);
    await userEvent.click(locatorFor(trigger));
    await vi.waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(
      expect.objectContaining({ open: true })
    ));
    await expect
      .element(locatorFor(trigger))
      .toHaveAttribute('aria-expanded', 'false');
    await takeSnapshot(`Collapsible - calls onOpenChange with open:true when clicking a trigger whose open prop stays locked at false`);
  });

  it('calls onOpenChange with open:false when clicking a trigger whose open prop stays locked at true', async () => {
    const onOpenChange = vi.fn();
    const screen = await render(
      <Collapsible open onOpenChange={onOpenChange} label="Locked open">
        Content
      </Collapsible>
    );
    const trigger = getTrigger(screen.container);
    await userEvent.click(locatorFor(trigger));
    await vi.waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(
      expect.objectContaining({ open: false })
    ));
    await expect
      .element(locatorFor(trigger))
      .toHaveAttribute('aria-expanded', 'true');
    await takeSnapshot(`Collapsible - calls onOpenChange with open:false when clicking a trigger whose open prop stays locked at true`);
  });

  /* -----------------------------------------------------------------------
   * onOpenChange callback (uncontrolled) (3)
   * -------------------------------------------------------------------- */

  it('calls onOpenChange exactly once per click', async () => {
    const onOpenChange = vi.fn();
    const screen = await render(
      <Collapsible onOpenChange={onOpenChange} label="Click me">
        Content
      </Collapsible>
    );
    const trigger = getTrigger(screen.container);
    await userEvent.click(locatorFor(trigger));
    await vi.waitFor(() => expect(onOpenChange).toHaveBeenCalledTimes(1));
    await takeSnapshot(`Collapsible - calls onOpenChange exactly once per click`);
  });

  it('calls onOpenChange with open:true when toggling from closed', async () => {
    const onOpenChange = vi.fn();
    const screen = await render(
      <Collapsible onOpenChange={onOpenChange} label="Toggle on">
        Content
      </Collapsible>
    );
    const trigger = getTrigger(screen.container);
    await userEvent.click(locatorFor(trigger));
    await vi.waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(
      expect.objectContaining({ open: true })
    ));
    await takeSnapshot(`Collapsible - calls onOpenChange with open:true when toggling from closed`);
  });

  it('does not throw when clicked without an onOpenChange handler', async () => {
    const screen = await render(<Collapsible label="No handler">Content</Collapsible>);
    const trigger = getTrigger(screen.container);
    await expect(userEvent.click(locatorFor(trigger))).resolves.not.toThrow();
    await takeSnapshot(`Collapsible - does not throw when clicked without an onOpenChange handler`);
  });

  /* -----------------------------------------------------------------------
   * Click trigger toggles (uncontrolled) (3)
   * -------------------------------------------------------------------- */

  it('toggles content visibility from hidden to visible on trigger click', async () => {
    const screen = await render(<Collapsible label="Toggle">Content</Collapsible>);
    const trigger = getTrigger(screen.container);
    const content = getContent(screen.container);
    expect(content.hidden).toBe(true);
    await userEvent.click(locatorFor(trigger));
    await vi.waitFor(() => expect(content.hidden).toBe(false));
    await takeSnapshot(`Collapsible - toggles content visibility from hidden to visible on trigger click`);
  });

  it('toggles content visibility back to hidden on a second trigger click', async () => {
    const screen = await render(<Collapsible label="Toggle">Content</Collapsible>);
    const trigger = getTrigger(screen.container);
    const content = getContent(screen.container);
    await userEvent.click(locatorFor(trigger));
    await vi.waitFor(() => expect(content.hidden).toBe(false));
    await userEvent.click(locatorFor(trigger));
    await vi.waitFor(() => expect(content.hidden).toBe(true));
    await takeSnapshot(`Collapsible - toggles content visibility back to hidden on a second trigger click`);
  });

  it('toggles aria-expanded on trigger click', async () => {
    const screen = await render(<Collapsible label="Toggle">Content</Collapsible>);
    const trigger = getTrigger(screen.container);
    await expect
      .element(locatorFor(trigger))
      .toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(locatorFor(trigger));
    await expect
      .element(locatorFor(trigger))
      .toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(locatorFor(trigger));
    await expect
      .element(locatorFor(trigger))
      .toHaveAttribute('aria-expanded', 'false');
    await takeSnapshot(`Collapsible - toggles aria-expanded on trigger click`);
  });

  /* -----------------------------------------------------------------------
   * Disabled (4)
   * -------------------------------------------------------------------- */

  it('does not call onOpenChange when a disabled trigger is clicked', async () => {
    const onOpenChange = vi.fn();
    const screen = await render(
      <Collapsible disabled onOpenChange={onOpenChange} label="Disabled">
        Content
      </Collapsible>
    );
    const trigger = getTrigger(screen.container);
    await userEvent.click(locatorFor(trigger));
    await vi.waitFor(() => expect(onOpenChange).not.toHaveBeenCalled());
    await takeSnapshot(`Collapsible - does not call onOpenChange when a disabled trigger is clicked`);
  });

  it('does not toggle content visibility when a disabled trigger is clicked', async () => {
    const screen = await render(
      <Collapsible disabled label="Disabled">
        Content
      </Collapsible>
    );
    const trigger = getTrigger(screen.container);
    const content = getContent(screen.container);
    await userEvent.click(locatorFor(trigger));
    await vi.waitFor(() => expect(content.hidden).toBe(true));
    await takeSnapshot(`Collapsible - does not toggle content visibility when a disabled trigger is clicked`);
  });

  it('applies a muted trigger text color and not-allowed cursor when disabled', async () => {
    const screen = await render(
      <Collapsible disabled label="Disabled">
        Content
      </Collapsible>
    );
    const trigger = getTrigger(screen.container);
    await expect
      .element(locatorFor(trigger))
      .toHaveStyle({ color: color.slate400, cursor: 'not-allowed' });
    await takeSnapshot(`Collapsible - applies a muted trigger text color and not-allowed cursor when disabled`);
  });

  it('sets the data-disabled attribute on the trigger when disabled', async () => {
    const screen = await render(
      <Collapsible disabled label="Disabled">
        Content
      </Collapsible>
    );
    const trigger = getTrigger(screen.container);
    await expect.element(locatorFor(trigger)).toHaveAttribute('data-disabled');
    await takeSnapshot(`Collapsible - sets the data-disabled attribute on the trigger when disabled`);
  });

  /* -----------------------------------------------------------------------
   * Disabled crossed with open (2)
   * -------------------------------------------------------------------- */

  it('keeps content visible when disabled and open are both true, and a click does not close it', async () => {
    const screen = await render(
      <Collapsible disabled open label="Disabled open">
        Content
      </Collapsible>
    );
    const trigger = getTrigger(screen.container);
    const content = getContent(screen.container);
    expect(content.hidden).toBe(false);
    await userEvent.click(locatorFor(trigger));
    await vi.waitFor(() => expect(content.hidden).toBe(false));
    await takeSnapshot(`Collapsible - keeps content visible when disabled and open are both true, and a click does not close it`);
  });

  it('keeps content hidden when disabled is true and open is false, and a click does not open it', async () => {
    const screen = await render(
      <Collapsible disabled open={false} label="Disabled closed">
        Content
      </Collapsible>
    );
    const trigger = getTrigger(screen.container);
    const content = getContent(screen.container);
    expect(content.hidden).toBe(true);
    await userEvent.click(locatorFor(trigger));
    await vi.waitFor(() => expect(content.hidden).toBe(true));
    await takeSnapshot(`Collapsible - keeps content hidden when disabled is true and open is false, and a click does not open it`);
  });

  /* -----------------------------------------------------------------------
   * Keyboard interaction (4)
   * -------------------------------------------------------------------- */

  it('moves focus to the trigger via Tab', async () => {
    const screen = await render(<Collapsible label="Keyboard">Content</Collapsible>);
    const trigger = screen.getByRole('button');
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    await vi.waitFor(() => expect(document.activeElement).toBe(trigger.element()));
    await takeSnapshot(`Collapsible - moves focus to the trigger via Tab`);
  });

  it('toggles open state when Enter is pressed on a focused trigger', async () => {
    const onOpenChange = vi.fn();
    const screen = await render(
      <Collapsible onOpenChange={onOpenChange} label="Enter to toggle">
        Content
      </Collapsible>
    );
    const trigger = screen.getByRole('button');
    trigger.element().focus();
    await userEvent.keyboard('{Enter}');
    await vi.waitFor(() => expect(onOpenChange).toHaveBeenCalledTimes(1));
    await vi.waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(
      expect.objectContaining({ open: true })
    ));
    await takeSnapshot(`Collapsible - toggles open state when Enter is pressed on a focused trigger`);
  });

  it('toggles open state when Space is pressed on a focused trigger', async () => {
    const onOpenChange = vi.fn();
    const screen = await render(
      <Collapsible onOpenChange={onOpenChange} label="Space to toggle">
        Content
      </Collapsible>
    );
    const trigger = screen.getByRole('button');
    trigger.element().focus();
    await userEvent.keyboard(' ');
    await vi.waitFor(() => expect(onOpenChange).toHaveBeenCalledTimes(1));
    await vi.waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(
      expect.objectContaining({ open: true })
    ));
    await takeSnapshot(`Collapsible - toggles open state when Space is pressed on a focused trigger`);
  });

  it('does not toggle when Enter is pressed on a focused disabled trigger', async () => {
    const onOpenChange = vi.fn();
    const screen = await render(
      <Collapsible disabled onOpenChange={onOpenChange} label="Disabled keyboard">
        Content
      </Collapsible>
    );
    const trigger = screen.getByRole('button');
    trigger.element().focus();
    await userEvent.keyboard('{Enter}');
    await vi.waitFor(() => expect(onOpenChange).not.toHaveBeenCalled());
    await takeSnapshot(`Collapsible - does not toggle when Enter is pressed on a focused disabled trigger`);
  });

  /* -----------------------------------------------------------------------
   * Rapid interaction / accessibility (2)
   * -------------------------------------------------------------------- */

  it('ends open after an odd number of trigger clicks', async () => {
    const onOpenChange = vi.fn();
    const screen = await render(
      <Collapsible onOpenChange={onOpenChange} label="Click three times">
        Content
      </Collapsible>
    );
    const trigger = getTrigger(screen.container);
    await userEvent.click(locatorFor(trigger));
    await userEvent.click(locatorFor(trigger));
    await userEvent.click(locatorFor(trigger));
    await expect
      .element(locatorFor(trigger))
      .toHaveAttribute('aria-expanded', 'true');
    expect(onOpenChange).toHaveBeenCalledTimes(3);
    await takeSnapshot(`Collapsible - ends open after an odd number of trigger clicks`);
  });

  it('exposes aria-controls on the trigger pointing at the content element id', async () => {
    const screen = await render(<Collapsible label="Accessible">Content</Collapsible>);
    const trigger = getTrigger(screen.container);
    const content = getContent(screen.container);
    const controlsId = trigger.getAttribute('aria-controls');
    expect(controlsId).toBeTruthy();
    expect(content.id).toBe(controlsId);
    await takeSnapshot(`Collapsible - exposes aria-controls on the trigger pointing at the content element id`);
  });

  /* -----------------------------------------------------------------------
   * Label content (5)
   * -------------------------------------------------------------------- */

  it('renders the provided label text', async () => {
    const screen = await render(
      <Collapsible label="Click to expand">Content</Collapsible>
    );
    await expect
      .element(screen.getByText('Click to expand'))
      .toBeInTheDocument();
    await takeSnapshot(`Collapsible - renders the provided label text`);
  });

  it('renders the default "Toggle" label when no label prop is provided', async () => {
    const screen = await render(<Collapsible>Content</Collapsible>);
    await expect
      .element(screen.getByRole('button', { name: 'Toggle' }))
      .toBeInTheDocument();
    await takeSnapshot(`Collapsible - renders the default "Toggle" label when no label prop is provided`);
  });

  it('preserves RTL unicode label content exactly', async () => {
    const screen = await render(
      <Collapsible label="اضغط للتوسيع">Content</Collapsible>
    );
    await expect
      .element(screen.getByText('اضغط للتوسيع'))
      .toHaveTextContent('اضغط للتوسيع');
    await takeSnapshot(`Collapsible - preserves RTL unicode label content exactly`);
  });

  it('preserves emoji label content exactly', async () => {
    const screen = await render(
      <Collapsible label="✅ Confirmed 🎉">Content</Collapsible>
    );
    await expect
      .element(screen.getByText('✅ Confirmed 🎉'))
      .toHaveTextContent('✅ Confirmed 🎉');
    await takeSnapshot(`Collapsible - preserves emoji label content exactly`);
  });

  it('renders long label text in full without truncating the DOM text content', async () => {
    const longLabel =
      'This is an extremely long trigger label that should wrap across multiple lines when rendered inside a narrow container';
    const screen = await render(<Collapsible label={longLabel}>Content</Collapsible>);
    await expect
      .element(screen.getByText(longLabel))
      .toHaveTextContent(longLabel);
    await takeSnapshot(`Collapsible - renders long label text in full without truncating the DOM text content`);
  });

  /* -----------------------------------------------------------------------
   * Children/content rendering (4)
   * -------------------------------------------------------------------- */

  it("renders the provided children inside the content region", async () => {
    const screen = await render(
      <Collapsible open label="With content">
        This is the collapsible content.
      </Collapsible>
    );
    const content = getContent(screen.container);
    expect(content.textContent).toBe('This is the collapsible content.');
    await takeSnapshot(`Collapsible - renders the provided children inside the content region`);
  });

  it('renders no visible text content when children is undefined', async () => {
    const screen = await render(<Collapsible label="No children" />);
    const content = getContent(screen.container);
    expect(content.textContent).toBe('');
    await takeSnapshot(`Collapsible - renders no visible text content when children is undefined`);
  });

  it('renders rich/nested element children correctly', async () => {
    const screen = await render(
      <Collapsible open label="Rich content">
        <ul>
          <li>First item</li>
          <li>Second item</li>
        </ul>
      </Collapsible>
    );
    await expect.element(screen.getByText('First item')).toBeInTheDocument();
    await expect.element(screen.getByText('Second item')).toBeInTheDocument();
    await takeSnapshot(`Collapsible - renders rich/nested element children correctly`);
  });

  it('keeps children content present in the DOM (just hidden) when closed, rather than unmounting it', async () => {
    const screen = await render(
      <Collapsible label="Closed with content">
        Hidden but present content
      </Collapsible>
    );
    const content = getContent(screen.container);
    expect(content.hidden).toBe(true);
    expect(content.textContent).toBe('Hidden but present content');
    await takeSnapshot(`Collapsible - keeps children content present in the DOM (just hidden) when closed, rather than unmounting it`);
  });

  /* -----------------------------------------------------------------------
   * Multi-instance independence (2)
   * -------------------------------------------------------------------- */

  it('does not share open state between two independently controlled collapsibles', async () => {
    const IndependentPair = () => {
      const [first, setFirst] = useState(false);
      const [second, setSecond] = useState(true);
      return (
        <div>
          <Collapsible
            open={first}
            onOpenChange={(d) => setFirst(d.open)}
            label="First"
          >
            First content
          </Collapsible>
          <Collapsible
            open={second}
            onOpenChange={(d) => setSecond(d.open)}
            label="Second"
          >
            Second content
          </Collapsible>
        </div>
      );
    };
    const screen = await render(<IndependentPair />);
    const firstTrigger = screen.getByRole('button', { name: 'First' });
    const secondTrigger = screen.getByRole('button', { name: 'Second' });
    await expect
      .element(firstTrigger)
      .toHaveAttribute('aria-expanded', 'false');
    await expect
      .element(secondTrigger)
      .toHaveAttribute('aria-expanded', 'true');
    await takeSnapshot(`Collapsible - does not share open state between two independently controlled collapsibles`);
  });

  it("does not invoke the other instance's onOpenChange when only one trigger is clicked", async () => {
    const onFirstChange = vi.fn();
    const onSecondChange = vi.fn();
    const screen = await render(
      <div>
        <Collapsible onOpenChange={onFirstChange} label="First">
          First content
        </Collapsible>
        <Collapsible onOpenChange={onSecondChange} label="Second">
          Second content
        </Collapsible>
      </div>
    );
    const firstTrigger = screen.getByRole('button', { name: 'First' });
    await userEvent.click(firstTrigger);
    await vi.waitFor(() => expect(onFirstChange).toHaveBeenCalledTimes(1));
    await vi.waitFor(() => expect(onSecondChange).not.toHaveBeenCalled());
    await takeSnapshot(`Collapsible - does not invoke the other instance's onOpenChange when only one trigger is clicked`);
  });

  /* -----------------------------------------------------------------------
   * Default prop values (2)
   * -------------------------------------------------------------------- */

  it('defaults to closed and enabled when no props are provided', async () => {
    const screen = await render(<Collapsible />);
    const trigger = getTrigger(screen.container);
    const content = getContent(screen.container);
    expect(content.hidden).toBe(true);
    expect(trigger.hasAttribute('data-disabled')).toBe(false);
    await takeSnapshot(`Collapsible - defaults to closed and enabled when no props are provided`);
  });

  it('renders an enabled trigger by default when disabled is not provided', async () => {
    const screen = await render(<Collapsible label="Enabled">Content</Collapsible>);
    const trigger = getTrigger(screen.container);
    await expect.element(locatorFor(trigger)).not.toHaveAttribute('data-disabled');
    await takeSnapshot(`Collapsible - renders an enabled trigger by default when disabled is not provided`);
  });

  /* -----------------------------------------------------------------------
   * Kitchen-sink combos (4)
   * -------------------------------------------------------------------- */

  it('renders correctly with open, custom label, and children together, and still calls onOpenChange on click', async () => {
    const onOpenChange = vi.fn();
    const screen = await render(
      <Collapsible open onOpenChange={onOpenChange} label="Kitchen sink open">
        Kitchen sink content
      </Collapsible>
    );
    const trigger = getTrigger(screen.container);
    const content = getContent(screen.container);
    expect(content.hidden).toBe(false);
    await userEvent.click(locatorFor(trigger));
    await vi.waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(
      expect.objectContaining({ open: false })
    ));
    await takeSnapshot(`Collapsible - renders correctly with open, custom label, and children together, and still calls onOpenChange on click`);
  });

  it('prevents onOpenChange when disabled and open are combined and the trigger is clicked', async () => {
    const onOpenChange = vi.fn();
    const screen = await render(
      <Collapsible disabled open onOpenChange={onOpenChange} label="Kitchen sink disabled open">
        Content
      </Collapsible>
    );
    const trigger = getTrigger(screen.container);
    await userEvent.click(locatorFor(trigger));
    await vi.waitFor(() => expect(onOpenChange).not.toHaveBeenCalled());
    const content = getContent(screen.container);
    expect(content.hidden).toBe(false);
    await takeSnapshot(`Collapsible - prevents onOpenChange when disabled and open are combined and the trigger is clicked`);
  });

  it('renders correctly with RTL/emoji label content combined with an open state', async () => {
    const screen = await render(
      <Collapsible open label="✅ أوافق 🎉">
        Content
      </Collapsible>
    );
    const content = getContent(screen.container);
    expect(content.hidden).toBe(false);
    await expect
      .element(screen.getByText('✅ أوافق 🎉'))
      .toHaveTextContent('✅ أوافق 🎉');
    await takeSnapshot(`Collapsible - renders correctly with RTL/emoji label content combined with an open state`);
  });

  it('renders correctly with long label and long children content combined', async () => {
    const longLabel =
      'Terms and Conditions for the extended service agreement covering all applicable jurisdictions';
    const longChildren =
      'By expanding this section you acknowledge that you have read the complete terms in their entirety.';
    const screen = await render(
      <Collapsible open label={longLabel}>
        {longChildren}
      </Collapsible>
    );
    await expect.element(screen.getByText(longLabel)).toBeInTheDocument();
    const content = getContent(screen.container);
    expect(content.textContent).toBe(longChildren);
    await takeSnapshot(`Collapsible - renders correctly with long label and long children content combined`);
  });

  /* -----------------------------------------------------------------------
   * Nested collapsibles (3)
   * -------------------------------------------------------------------- */

  it("toggles a parent collapsible without affecting a nested child collapsible's open state", async () => {
    const ParentChild = () => {
      const [parentOpen, setParentOpen] = useState(true);
      return (
        <Collapsible
          open={parentOpen}
          onOpenChange={(d) => setParentOpen(d.open)}
          label="Parent"
        >
          <Collapsible open={false} label="Child">
            Child content
          </Collapsible>
        </Collapsible>
      );
    };
    const screen = await render(<ParentChild />);
    const parentTrigger = screen.getByRole('button', { name: 'Parent' });
    await userEvent.click(parentTrigger);
    await expect
      .element(parentTrigger)
      .toHaveAttribute('aria-expanded', 'false');
    // The child is now nested inside a hidden parent content region, so it
    // must be queried as a plain DOM node rather than through a live
    // accessibility-tree-based role locator.
    const childTrigger = Array.from(
      screen.container.querySelectorAll('[data-part="trigger"]')
    ).find((el) => el.textContent === 'Child') as HTMLElement;
    expect(childTrigger.getAttribute('aria-expanded')).toBe('false');
    await takeSnapshot(`Collapsible - toggles a parent collapsible without affecting a nested child collapsible's open state`);
  });

  it("toggles a nested child collapsible without affecting the parent collapsible's open state", async () => {
    const screen = await render(
      <Collapsible open label="Parent">
        <Collapsible label="Child">Child content</Collapsible>
      </Collapsible>
    );
    const parentTrigger = screen.getByRole('button', { name: 'Parent' });
    const childTrigger = screen.getByRole('button', { name: 'Child' });
    await userEvent.click(childTrigger);
    await expect
      .element(childTrigger)
      .toHaveAttribute('aria-expanded', 'true');
    await expect
      .element(parentTrigger)
      .toHaveAttribute('aria-expanded', 'true');
    await takeSnapshot(`Collapsible - toggles a nested child collapsible without affecting the parent collapsible's open state`);
  });

  it('keeps two sibling nested children independent of each other', async () => {
    const screen = await render(
      <Collapsible open label="Parent">
        <div>
          <Collapsible label="Sibling A">Sibling A content</Collapsible>
          <Collapsible label="Sibling B">Sibling B content</Collapsible>
        </div>
      </Collapsible>
    );
    const siblingA = screen.getByRole('button', { name: 'Sibling A' });
    const siblingB = screen.getByRole('button', { name: 'Sibling B' });
    await userEvent.click(siblingA);
    await expect.element(siblingA).toHaveAttribute('aria-expanded', 'true');
    await expect.element(siblingB).toHaveAttribute('aria-expanded', 'false');
    await takeSnapshot(`Collapsible - keeps two sibling nested children independent of each other`);
  });
});
