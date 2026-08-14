import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent, page } from 'vitest/browser';
import { useState } from 'react';
import Toggle from './Toggle';
import { color } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

/**
 * Small stateful fixture mirroring the "controlled toggle" usage pattern
 * from the stories, used to exercise real external state updates (as
 * opposed to just spy call counts).
 */
const ControlledToggleFixture = ({
  initialPressed = false,
}: {
  initialPressed?: boolean;
}) => {
  const [pressed, setPressed] = useState(initialPressed);

  return (
    <>
      <Toggle pressed={pressed} onPressedChange={setPressed}>
        Controlled fixture
      </Toggle>
      <button onClick={() => setPressed((current) => !current)}>
        Toggle from outside
      </button>
    </>
  );
};

/** Wraps a raw HTMLElement into a Locator so jest-dom matchers can be used. */
const locatorFor = (element: HTMLElement) => page.elementLocator(element);

/** The toggle root is rendered as a native <button>. */
const getButton = (container: HTMLElement) =>
  container.querySelector('button') as HTMLElement;

/** The knob is the innermost absolutely-positioned circle. */
const getKnob = (container: HTMLElement) =>
  container.querySelector('button > div > div') as HTMLElement;

describe('Toggle', () => {
  /* -----------------------------------------------------------------------
   * Default/uncontrolled rendering & ARIA role (4)
   * -------------------------------------------------------------------- */

  it('exposes an implicit button role', async () => {
    const screen = await render(<Toggle>Unpressed</Toggle>);
    const toggle = screen.getByRole('button');
    await expect.element(toggle).toBeInTheDocument();
    await takeSnapshot(`Toggle - exposes an implicit button role`);
  });

  it('defaults to aria-pressed="false" when no pressed prop is provided', async () => {
    const screen = await render(<Toggle>Unpressed</Toggle>);
    const toggle = screen.getByRole('button');
    await expect.element(toggle).toHaveAttribute('aria-pressed', 'false');
    await takeSnapshot(`Toggle - defaults to aria-pressed="false" when no pressed prop is provided`);
  });

  it('defaults to data-state="off" when unpressed', async () => {
    const screen = await render(<Toggle>Unpressed</Toggle>);
    const toggle = screen.getByRole('button');
    await expect.element(toggle).toHaveAttribute('data-state', 'off');
    await takeSnapshot(`Toggle - defaults to data-state="off" when unpressed`);
  });

  it('does not set the data-pressed attribute when unpressed', async () => {
    const screen = await render(<Toggle>Unpressed</Toggle>);
    const toggle = getButton(screen.container);
    expect(toggle.hasAttribute('data-pressed')).toBe(false);
    await takeSnapshot(`Toggle - does not set the data-pressed attribute when unpressed`);
  });

  /* -----------------------------------------------------------------------
   * Pressed state rendering (3)
   * -------------------------------------------------------------------- */

  it('sets aria-pressed="true" and data-state="on" when pressed is true', async () => {
    const screen = await render(<Toggle pressed>Pressed</Toggle>);
    const toggle = screen.getByRole('button');
    await expect.element(toggle).toHaveAttribute('aria-pressed', 'true');
    await expect.element(toggle).toHaveAttribute('data-state', 'on');
    await takeSnapshot(`Toggle - sets aria-pressed="true" and data-state="on" when pressed is true`);
  });

  it('sets the data-pressed attribute when pressed is true', async () => {
    const screen = await render(<Toggle pressed>Pressed</Toggle>);
    const toggle = getButton(screen.container);
    expect(toggle.hasAttribute('data-pressed')).toBe(true);
    await takeSnapshot(`Toggle - sets the data-pressed attribute when pressed is true`);
  });

  it('applies a blue background to the root when pressed', async () => {
    const screen = await render(<Toggle pressed>Pressed</Toggle>);
    const toggle = getButton(screen.container);
    await expect
      .element(locatorFor(toggle))
      .toHaveStyle({ backgroundColor: color.blue500 });
    await takeSnapshot(`Toggle - applies a blue background to the root when pressed`);
  });

  /* -----------------------------------------------------------------------
   * Unpressed state styling (2)
   * -------------------------------------------------------------------- */

  it('applies a slate background to the root when explicitly unpressed', async () => {
    const screen = await render(<Toggle pressed={false}>Unpressed</Toggle>);
    const toggle = getButton(screen.container);
    await expect
      .element(locatorFor(toggle))
      .toHaveStyle({ backgroundColor: color.slate300 });
    await takeSnapshot(`Toggle - applies a slate background to the root when explicitly unpressed`);
  });

  it('renders the knob near the left edge with the slate spacing offset when unpressed', async () => {
    const screen = await render(<Toggle pressed={false}>Unpressed</Toggle>);
    const knob = getKnob(screen.container);
    await expect
      .element(locatorFor(knob))
      .toHaveStyle({ left: '0.125rem' });
    await takeSnapshot(`Toggle - renders the knob near the left edge with the slate spacing offset when unpressed`);
  });

  /* -----------------------------------------------------------------------
   * Visual indicator position shift (2)
   * -------------------------------------------------------------------- */

  it('positions the knob near the right edge (22px) when pressed', async () => {
    const screen = await render(<Toggle pressed>Pressed</Toggle>);
    const knob = getKnob(screen.container);
    await expect.element(locatorFor(knob)).toHaveStyle({ left: '22px' });
    await takeSnapshot(`Toggle - positions the knob near the right edge (22px) when pressed`);
  });

  it('shifts the knob position after a click toggles the toggle on', async () => {
    const screen = await render(<Toggle>Unpressed</Toggle>);
    const knob = getKnob(screen.container);
    await expect.element(locatorFor(knob)).toHaveStyle({ left: '0.125rem' });
    await userEvent.click(locatorFor(getButton(screen.container)));
    await expect.element(locatorFor(knob)).toHaveStyle({ left: '22px' });
    await takeSnapshot(`Toggle - shifts the knob position after a click toggles the toggle on`);
  });

  /* -----------------------------------------------------------------------
   * Controlled pressed prop (3)
   * -------------------------------------------------------------------- */

  it('reflects an external state update pushed down through the pressed prop', async () => {
    const screen = await render(<ControlledToggleFixture />);
    const toggle = getButton(screen.container);
    await expect
      .element(locatorFor(toggle))
      .toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(
      screen.getByRole('button', { name: 'Toggle from outside' })
    );

    await expect
      .element(locatorFor(toggle))
      .toHaveAttribute('aria-pressed', 'true');
    await takeSnapshot(`Toggle - reflects an external state update pushed down through the pressed prop`);
  });

  it('starts pressed when the pressed prop is true on initial render', async () => {
    const screen = await render(<Toggle pressed>Pre-pressed</Toggle>);
    const toggle = screen.getByRole('button');
    await expect.element(toggle).toHaveAttribute('aria-pressed', 'true');
    await takeSnapshot(`Toggle - starts pressed when the pressed prop is true on initial render`);
  });

  it('calls onPressedChange after a click even when the parent keeps the pressed prop fixed', async () => {
    const onPressedChange = vi.fn();
    const screen = await render(
      <Toggle pressed onPressedChange={onPressedChange}>
        Locked pressed
      </Toggle>
    );
    const toggle = getButton(screen.container);
    await userEvent.click(locatorFor(toggle));
    await vi.waitFor(() => expect(onPressedChange).toHaveBeenCalledTimes(1));
    await takeSnapshot(`Toggle - calls onPressedChange after a click even when the parent keeps the pressed prop fixed`);
  });

  /* -----------------------------------------------------------------------
   * onPressedChange callback (4)
   * -------------------------------------------------------------------- */

  it('calls onPressedChange exactly once per click', async () => {
    const onPressedChange = vi.fn();
    const screen = await render(
      <Toggle onPressedChange={onPressedChange}>Click me</Toggle>
    );
    const toggle = getButton(screen.container);
    await userEvent.click(locatorFor(toggle));
    await vi.waitFor(() => expect(onPressedChange).toHaveBeenCalledTimes(1));
    await takeSnapshot(`Toggle - calls onPressedChange exactly once per click`);
  });

  it('calls onPressedChange with true when toggling from unpressed', async () => {
    const onPressedChange = vi.fn();
    const screen = await render(
      <Toggle onPressedChange={onPressedChange}>Toggle on</Toggle>
    );
    const toggle = getButton(screen.container);
    await userEvent.click(locatorFor(toggle));
    await vi.waitFor(() => expect(onPressedChange).toHaveBeenCalledWith(true));
    await takeSnapshot(`Toggle - calls onPressedChange with true when toggling from unpressed`);
  });

  it('calls onPressedChange with false when clicking a toggle whose pressed prop is fixed to true', async () => {
    const onPressedChange = vi.fn();
    const screen = await render(
      <Toggle pressed onPressedChange={onPressedChange}>
        Fixed pressed
      </Toggle>
    );
    const toggle = getButton(screen.container);
    await userEvent.click(locatorFor(toggle));
    await vi.waitFor(() => expect(onPressedChange).toHaveBeenCalledWith(false));
    await takeSnapshot(`Toggle - calls onPressedChange with false when clicking a toggle whose pressed prop is fixed to true`);
  });

  it('does not throw when clicked without an onPressedChange handler', async () => {
    const screen = await render(<Toggle>No handler</Toggle>);
    const toggle = getButton(screen.container);
    await expect(userEvent.click(locatorFor(toggle))).resolves.not.toThrow();
    await takeSnapshot(`Toggle - does not throw when clicked without an onPressedChange handler`);
  });

  /* -----------------------------------------------------------------------
   * Disabled (4)
   * -------------------------------------------------------------------- */

  it('does not call onPressedChange when a disabled toggle is clicked', async () => {
    const onPressedChange = vi.fn();
    const screen = await render(
      <Toggle disabled onPressedChange={onPressedChange}>
        Disabled
      </Toggle>
    );
    const toggle = getButton(screen.container);
    await userEvent.click(locatorFor(toggle), { force: true });
    await vi.waitFor(() => expect(onPressedChange).not.toHaveBeenCalled());
    await takeSnapshot(`Toggle - does not call onPressedChange when a disabled toggle is clicked`);
  });

  it('marks the button as disabled', async () => {
    const screen = await render(<Toggle disabled>Disabled</Toggle>);
    const toggle = screen.getByRole('button');
    await expect.element(toggle).toBeDisabled();
    await takeSnapshot(`Toggle - marks the button as disabled`);
  });

  it('applies reduced opacity on the root when disabled', async () => {
    const screen = await render(<Toggle disabled>Disabled</Toggle>);
    const toggle = getButton(screen.container);
    await expect.element(locatorFor(toggle)).toHaveStyle({ opacity: '0.5' });
    await takeSnapshot(`Toggle - applies reduced opacity on the root when disabled`);
  });

  it('applies a not-allowed cursor on the root when disabled', async () => {
    const screen = await render(<Toggle disabled>Disabled</Toggle>);
    const toggle = getButton(screen.container);
    await expect
      .element(locatorFor(toggle))
      .toHaveStyle({ cursor: 'not-allowed' });
    await takeSnapshot(`Toggle - applies a not-allowed cursor on the root when disabled`);
  });

  /* -----------------------------------------------------------------------
   * Disabled crossed with pressed (2)
   * -------------------------------------------------------------------- */

  it('renders disabled and pressed with blue background but reduced opacity', async () => {
    const screen = await render(
      <Toggle disabled pressed>
        Disabled pressed
      </Toggle>
    );
    const toggle = getButton(screen.container);
    await expect.element(locatorFor(toggle)).toHaveStyle({ opacity: '0.5' });
    await expect
      .element(locatorFor(toggle))
      .toHaveStyle({ backgroundColor: color.blue500 });
    await takeSnapshot(`Toggle - renders disabled and pressed with blue background but reduced opacity`);
  });

  it('renders disabled and unpressed with slate background and reduced opacity', async () => {
    const screen = await render(<Toggle disabled>Disabled unpressed</Toggle>);
    const toggle = getButton(screen.container);
    await expect.element(locatorFor(toggle)).toHaveStyle({ opacity: '0.5' });
    await expect
      .element(locatorFor(toggle))
      .toHaveStyle({ backgroundColor: color.slate300 });
    await takeSnapshot(`Toggle - renders disabled and unpressed with slate background and reduced opacity`);
  });

  /* -----------------------------------------------------------------------
   * Required prop (documents current non-forwarding behavior) (2)
   * -------------------------------------------------------------------- */

  it('does not add a required attribute to the button since required is not forwarded to Ark', async () => {
    const screen = await render(<Toggle required>Required</Toggle>);
    const toggle = screen.getByRole('button');
    await expect.element(toggle).not.toHaveAttribute('required');
    await takeSnapshot(`Toggle - does not add a required attribute to the button since required is not forwarded to Ark`);
  });

  it('still toggles correctly on click when required is passed', async () => {
    const onPressedChange = vi.fn();
    const screen = await render(
      <Toggle required onPressedChange={onPressedChange}>
        Required
      </Toggle>
    );
    const toggle = getButton(screen.container);
    await userEvent.click(locatorFor(toggle));
    await vi.waitFor(() => expect(onPressedChange).toHaveBeenCalledWith(true));
    await takeSnapshot(`Toggle - still toggles correctly on click when required is passed`);
  });

  /* -----------------------------------------------------------------------
   * Name attribute (3)
   * -------------------------------------------------------------------- */

  it('exposes the provided name attribute on the button', async () => {
    const screen = await render(<Toggle name="notifications">Notify</Toggle>);
    const toggle = screen.getByRole('button');
    await expect.element(toggle).toHaveAttribute('name', 'notifications');
    await takeSnapshot(`Toggle - exposes the provided name attribute on the button`);
  });

  it('omits the name attribute when name is not provided', async () => {
    const screen = await render(<Toggle>No name</Toggle>);
    const toggle = screen.getByRole('button');
    await expect.element(toggle).not.toHaveAttribute('name');
    await takeSnapshot(`Toggle - omits the name attribute when name is not provided`);
  });

  it('keeps independent name attributes across multiple toggle instances', async () => {
    const screen = await render(
      <div>
        <Toggle name="first">First</Toggle>
        <Toggle name="second">Second</Toggle>
      </div>
    );
    const buttons = screen.container.querySelectorAll('button');
    expect(buttons[0]).toHaveAttribute('name', 'first');
    expect(buttons[1]).toHaveAttribute('name', 'second');
    await takeSnapshot(`Toggle - keeps independent name attributes across multiple toggle instances`);
  });

  /* -----------------------------------------------------------------------
   * Label/children content (5)
   * -------------------------------------------------------------------- */

  it('renders the provided label text next to the toggle', async () => {
    const screen = await render(<Toggle>Enable notifications</Toggle>);
    await expect
      .element(screen.getByText('Enable notifications'))
      .toBeInTheDocument();
    await takeSnapshot(`Toggle - renders the provided label text next to the toggle`);
  });

  it('does not render a label element when no children are provided', async () => {
    const screen = await render(<Toggle />);
    expect(screen.container.querySelector('span')).toBeNull();
    await takeSnapshot(`Toggle - does not render a label element when no children are provided`);
  });

  it('renders long label text in full without truncating the DOM text content', async () => {
    const longText =
      'Enable automatic synchronization of data across all your devices and services';
    const screen = await render(<Toggle>{longText}</Toggle>);
    await expect
      .element(screen.getByText(longText))
      .toHaveTextContent(longText);
    await takeSnapshot(`Toggle - renders long label text in full without truncating the DOM text content`);
  });

  it('preserves RTL unicode label content exactly', async () => {
    const screen = await render(<Toggle>تفعيل الوضع الليلي</Toggle>);
    await expect
      .element(screen.getByText('تفعيل الوضع الليلي'))
      .toHaveTextContent('تفعيل الوضع الليلي');
    await takeSnapshot(`Toggle - preserves RTL unicode label content exactly`);
  });

  it('preserves emoji label content exactly', async () => {
    const screen = await render(<Toggle>✅ Activé 🎉</Toggle>);
    await expect
      .element(screen.getByText('✅ Activé 🎉'))
      .toHaveTextContent('✅ Activé 🎉');
    await takeSnapshot(`Toggle - preserves emoji label content exactly`);
  });

  /* -----------------------------------------------------------------------
   * Keyboard interaction (4)
   * -------------------------------------------------------------------- */

  it('moves focus to the toggle via Tab', async () => {
    const screen = await render(<Toggle>Keyboard toggle</Toggle>);
    const toggle = screen.getByRole('button');
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    await vi.waitFor(() => expect(document.activeElement).toBe(toggle.element()));
    await takeSnapshot(`Toggle - moves focus to the toggle via Tab`);
  });

  it('calls onPressedChange when Space is pressed on a focused toggle', async () => {
    const onPressedChange = vi.fn();
    const screen = await render(
      <Toggle onPressedChange={onPressedChange}>Space to toggle</Toggle>
    );
    const toggle = screen.getByRole('button');
    toggle.element().focus();
    await userEvent.keyboard(' ');
    await vi.waitFor(() => expect(onPressedChange).toHaveBeenCalledTimes(1));
    await takeSnapshot(`Toggle - calls onPressedChange when Space is pressed on a focused toggle`);
  });

  it('calls onPressedChange when Enter is pressed on a focused toggle', async () => {
    const onPressedChange = vi.fn();
    const screen = await render(
      <Toggle onPressedChange={onPressedChange}>Enter to toggle</Toggle>
    );
    const toggle = screen.getByRole('button');
    toggle.element().focus();
    await userEvent.keyboard('{Enter}');
    await vi.waitFor(() => expect(onPressedChange).toHaveBeenCalledTimes(1));
    await takeSnapshot(`Toggle - calls onPressedChange when Enter is pressed on a focused toggle`);
  });

  it('skips a disabled toggle when tabbing, landing on the next focusable element', async () => {
    const screen = await render(
      <div>
        <Toggle disabled>Disabled</Toggle>
        <button>After</button>
      </div>
    );
    const afterButton = screen.getByRole('button', { name: 'After' });
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    await vi.waitFor(() => expect(document.activeElement).toBe(afterButton.element()));
    await takeSnapshot(`Toggle - skips a disabled toggle when tabbing, landing on the next focusable element`);
  });

  /* -----------------------------------------------------------------------
   * Focus styling (2)
   * -------------------------------------------------------------------- */

  it('applies a focus box-shadow when the toggle receives focus', async () => {
    const screen = await render(<Toggle>Focus me</Toggle>);
    const toggle = getButton(screen.container);
    toggle.focus();
    await expect
      .element(locatorFor(toggle))
      .toHaveStyle({ boxShadow: `0 0 0 3px ${color.blueTr10}` });
    await takeSnapshot(`Toggle - applies a focus box-shadow when the toggle receives focus`);
  });

  it('removes the focus box-shadow when the toggle loses focus', async () => {
    const screen = await render(
      <div>
        <Toggle>Focus me</Toggle>
        <button>Other</button>
      </div>
    );
    const toggle = screen.container.querySelector('button') as HTMLElement;
    const other = screen.getByRole('button', { name: 'Other' });
    toggle.focus();
    await expect
      .element(locatorFor(toggle))
      .toHaveStyle({ boxShadow: `0 0 0 3px ${color.blueTr10}` });
    await userEvent.click(other);
    await expect.element(locatorFor(toggle)).toHaveStyle({ boxShadow: 'none' });
    await takeSnapshot(`Toggle - removes the focus box-shadow when the toggle loses focus`);
  });

  /* -----------------------------------------------------------------------
   * Multi-instance independence (2)
   * -------------------------------------------------------------------- */

  it('does not share pressed state between two independently controlled toggles', async () => {
    const IndependentPair = () => {
      const [first, setFirst] = useState(false);
      const [second, setSecond] = useState(true);
      return (
        <div>
          <Toggle pressed={first} onPressedChange={setFirst}>
            First
          </Toggle>
          <Toggle pressed={second} onPressedChange={setSecond}>
            Second
          </Toggle>
        </div>
      );
    };
    const screen = await render(<IndependentPair />);
    const buttons = screen.container.querySelectorAll('button');
    expect(buttons[0]).toHaveAttribute('aria-pressed', 'false');
    expect(buttons[1]).toHaveAttribute('aria-pressed', 'true');
    await takeSnapshot(`Toggle - does not share pressed state between two independently controlled toggles`);
  });

  it("does not invoke the other instance's onPressedChange when only one toggle is clicked", async () => {
    const onFirstChange = vi.fn();
    const onSecondChange = vi.fn();
    const screen = await render(
      <div>
        <Toggle onPressedChange={onFirstChange}>First</Toggle>
        <Toggle onPressedChange={onSecondChange}>Second</Toggle>
      </div>
    );
    const firstButton = screen.container.querySelectorAll('button')[0];
    await userEvent.click(locatorFor(firstButton));
    await vi.waitFor(() => expect(onFirstChange).toHaveBeenCalledTimes(1));
    await vi.waitFor(() => expect(onSecondChange).not.toHaveBeenCalled());
    await takeSnapshot(`Toggle - does not invoke the other instance's onPressedChange when only one toggle is clicked`);
  });

  /* -----------------------------------------------------------------------
   * Default prop values (2)
   * -------------------------------------------------------------------- */

  it('defaults to unpressed, enabled, with no name attribute', async () => {
    const screen = await render(<Toggle>Defaults</Toggle>);
    const toggle = screen.getByRole('button');
    await expect.element(toggle).toHaveAttribute('aria-pressed', 'false');
    await expect.element(toggle).not.toBeDisabled();
    await expect.element(toggle).not.toHaveAttribute('name');
    await takeSnapshot(`Toggle - defaults to unpressed, enabled, with no name attribute`);
  });

  it('renders an enabled button by default when disabled is not provided', async () => {
    const screen = await render(<Toggle>Enabled by default</Toggle>);
    const toggle = screen.getByRole('button');
    await expect.element(toggle).toBeEnabled();
    await takeSnapshot(`Toggle - renders an enabled button by default when disabled is not provided`);
  });

  /* -----------------------------------------------------------------------
   * Rapid interaction (2)
   * -------------------------------------------------------------------- */

  it('ends in the pressed state after an odd number of clicks', async () => {
    const onPressedChange = vi.fn();
    const screen = await render(
      <Toggle onPressedChange={onPressedChange}>Click me three times</Toggle>
    );
    const toggle = getButton(screen.container);
    await userEvent.click(locatorFor(toggle));
    await userEvent.click(locatorFor(toggle));
    await userEvent.click(locatorFor(toggle));
    await expect
      .element(locatorFor(toggle))
      .toHaveAttribute('aria-pressed', 'true');
    expect(onPressedChange).toHaveBeenCalledTimes(3);
    await takeSnapshot(`Toggle - ends in the pressed state after an odd number of clicks`);
  });

  it('returns to the original unpressed state after clicking twice', async () => {
    const screen = await render(<Toggle>Click me twice</Toggle>);
    const toggle = getButton(screen.container);
    await userEvent.click(locatorFor(toggle));
    await userEvent.click(locatorFor(toggle));
    await expect
      .element(locatorFor(toggle))
      .toHaveAttribute('aria-pressed', 'false');
    await takeSnapshot(`Toggle - returns to the original unpressed state after clicking twice`);
  });

  /* -----------------------------------------------------------------------
   * Kitchen-sink combos (4)
   * -------------------------------------------------------------------- */

  it('renders pressed + disabled + name + label together correctly', async () => {
    const screen = await render(
      <Toggle pressed disabled name="kitchenSink">
        Kitchen sink pressed
      </Toggle>
    );
    const toggle = screen.getByRole('button');
    await expect.element(toggle).toHaveAttribute('aria-pressed', 'true');
    await expect.element(toggle).toBeDisabled();
    await expect.element(toggle).toHaveAttribute('name', 'kitchenSink');
    await expect
      .element(screen.getByText('Kitchen sink pressed'))
      .toBeInTheDocument();
    await takeSnapshot(`Toggle - renders pressed + disabled + name + label together correctly`);
  });

  it('renders unpressed + disabled + name with no label', async () => {
    const screen = await render(<Toggle disabled name="mandatory" />);
    const toggle = screen.getByRole('button');
    await expect.element(toggle).toHaveAttribute('aria-pressed', 'false');
    await expect.element(toggle).toBeDisabled();
    await expect.element(toggle).toHaveAttribute('name', 'mandatory');
    expect(screen.container.querySelector('span')).toBeNull();
    await takeSnapshot(`Toggle - renders unpressed + disabled + name with no label`);
  });

  it('calls onPressedChange with the correct payload when toggling a controlled kitchen-sink instance', async () => {
    const screen = await render(<ControlledToggleFixture initialPressed />);
    const toggle = getButton(screen.container);
    await expect
      .element(locatorFor(toggle))
      .toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(locatorFor(toggle));
    await expect
      .element(locatorFor(toggle))
      .toHaveAttribute('aria-pressed', 'false');
    await takeSnapshot(`Toggle - calls onPressedChange with the correct payload when toggling a controlled kitchen-sink instance`);
  });

  it('renders a required + named + pressed toggle without crashing and responds to clicks', async () => {
    const onPressedChange = vi.fn();
    const screen = await render(
      <Toggle required pressed name="newsletter" onPressedChange={onPressedChange}>
        Kitchen sink required
      </Toggle>
    );
    const toggle = getButton(screen.container);
    await userEvent.click(locatorFor(toggle));
    await vi.waitFor(() => expect(onPressedChange).toHaveBeenCalledWith(false));
    await takeSnapshot(`Toggle - renders a required + named + pressed toggle without crashing and responds to clicks`);
  });
});
