import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent, page } from 'vitest/browser';
import { useState } from 'react';
import Checkbox from './Checkbox';
import { color } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

/**
 * Small stateful fixture mirroring the "controlled checkbox" usage pattern
 * from the stories, used to exercise real external state updates (as
 * opposed to just spy call counts).
 */
const ControlledToggleFixture = ({
  initialChecked = false,
}: {
  initialChecked?: boolean;
}) => {
  const [checked, setChecked] = useState(initialChecked);

  return (
    <>
      <Checkbox
        checked={checked}
        onCheckedChange={(details) => {
          const next =
            typeof details.checked === 'boolean'
              ? details.checked
              : details.checked === 'on';
          setChecked(next);
        }}
      >
        Controlled fixture
      </Checkbox>
      <button onClick={() => setChecked((current) => !current)}>
        Toggle from outside
      </button>
    </>
  );
};

/**
 * Small stateful fixture mirroring a "select all" pattern, used to exercise
 * a controlled checkbox whose checked value is derived from other state.
 */
const SelectAllFixture = ({
  allInitiallySelected,
}: {
  allInitiallySelected: boolean;
}) => {
  const [items, setItems] = useState({
    a: allInitiallySelected,
    b: allInitiallySelected,
  });
  const allChecked = Object.values(items).every(Boolean);

  return (
    <Checkbox
      checked={allChecked}
      onCheckedChange={(details) => {
        const next =
          typeof details.checked === 'boolean'
            ? details.checked
            : details.checked === 'on';
        setItems({ a: next, b: next });
      }}
    >
      Select all
    </Checkbox>
  );
};

/** Wraps a raw HTMLElement into a Locator so jest-dom matchers can be used. */
const locatorFor = (element: HTMLElement) => page.elementLocator(element);

/** The visible checkbox box is the only <div> rendered by the component. */
const getControl = (container: HTMLElement) =>
  container.querySelector('div') as HTMLElement;

/** The root is a <label> wrapping the control, optional label text, and the hidden input. */
const getRoot = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement;

describe('Checkbox', () => {
  /* -----------------------------------------------------------------------
   * Unchecked default rendering & styling (3)
   * -------------------------------------------------------------------- */

  it('renders unchecked by default with a slate border and white background', async () => {
    const screen = await render(<Checkbox>Unchecked</Checkbox>);
    const control = getControl(screen.container);
    await expect
      .element(locatorFor(control))
      .toHaveStyle({ borderColor: color.slate300, backgroundColor: color.white });
    await takeSnapshot(`Checkbox - renders unchecked by default with a slate border and white background`);
  });

  it('keeps the check indicator hidden when unchecked', async () => {
    const screen = await render(<Checkbox>Unchecked</Checkbox>);
    const indicator = screen.container.querySelector('svg')
      ?.parentElement as HTMLElement;
    expect(indicator.hasAttribute('hidden')).toBe(true);
    await takeSnapshot(`Checkbox - keeps the check indicator hidden when unchecked`);
  });

  it('applies a pointer cursor and full opacity on the root when enabled', async () => {
    const screen = await render(<Checkbox>Unchecked</Checkbox>);
    const root = getRoot(screen.container);
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ cursor: 'pointer', opacity: '1' });
    await takeSnapshot(`Checkbox - applies a pointer cursor and full opacity on the root when enabled`);
  });

  /* -----------------------------------------------------------------------
   * Checked rendering & styling (3)
   * -------------------------------------------------------------------- */

  it('renders with a blue border and blue background when checked is true', async () => {
    const screen = await render(<Checkbox checked>Checked</Checkbox>);
    const control = getControl(screen.container);
    await expect
      .element(locatorFor(control))
      .toHaveStyle({ borderColor: color.blue500, backgroundColor: color.blue500 });
    await takeSnapshot(`Checkbox - renders with a blue border and blue background when checked is true`);
  });

  it('shows the check indicator when checked is true', async () => {
    const screen = await render(<Checkbox checked>Checked</Checkbox>);
    const indicator = screen.container.querySelector('svg')
      ?.parentElement as HTMLElement;
    expect(indicator.hasAttribute('hidden')).toBe(false);
    await takeSnapshot(`Checkbox - shows the check indicator when checked is true`);
  });

  it('renders unchecked styling when checked is explicitly set to false', async () => {
    const screen = await render(
      <Checkbox checked={false}>Explicitly unchecked</Checkbox>
    );
    const control = getControl(screen.container);
    await expect
      .element(locatorFor(control))
      .toHaveStyle({ borderColor: color.slate300, backgroundColor: color.white });
    await takeSnapshot(`Checkbox - renders unchecked styling when checked is explicitly set to false`);
  });

  /* -----------------------------------------------------------------------
   * Controlled checked prop (3)
   * -------------------------------------------------------------------- */

  it('reflects an external state update pushed down through the checked prop', async () => {
    const screen = await render(<ControlledToggleFixture />);
    const control = getControl(screen.container);
    await expect
      .element(locatorFor(control))
      .toHaveStyle({ backgroundColor: color.white });

    await userEvent.click(screen.getByRole('button', { name: 'Toggle from outside' }));

    await expect
      .element(locatorFor(control))
      .toHaveStyle({ backgroundColor: color.blue500 });
    await takeSnapshot(`Checkbox - reflects an external state update pushed down through the checked prop`);
  });

  it('starts checked when the checked prop is true on initial render', async () => {
    const screen = await render(<Checkbox checked>Pre-checked</Checkbox>);
    const checkbox = screen.getByRole('checkbox');
    await expect.element(checkbox).toBeChecked();
    await takeSnapshot(`Checkbox - starts checked when the checked prop is true on initial render`);
  });

  it('calls onCheckedChange after a click even when the parent keeps the checked prop fixed', async () => {
    const onCheckedChange = vi.fn();
    const screen = await render(
      <Checkbox checked onCheckedChange={onCheckedChange}>
        Locked checked
      </Checkbox>
    );
    const root = getRoot(screen.container);
    await userEvent.click(locatorFor(root));
    await vi.waitFor(() => expect(onCheckedChange).toHaveBeenCalledTimes(1));
    await takeSnapshot(`Checkbox - calls onCheckedChange after a click even when the parent keeps the checked prop fixed`);
  });

  /* -----------------------------------------------------------------------
   * onCheckedChange callback (4)
   * -------------------------------------------------------------------- */

  it('calls onCheckedChange exactly once per click', async () => {
    const onCheckedChange = vi.fn();
    const screen = await render(
      <Checkbox onCheckedChange={onCheckedChange}>Click me</Checkbox>
    );
    const root = getRoot(screen.container);
    await userEvent.click(locatorFor(root));
    await vi.waitFor(() => expect(onCheckedChange).toHaveBeenCalledTimes(1));
    await takeSnapshot(`Checkbox - calls onCheckedChange exactly once per click`);
  });

  it('calls onCheckedChange with checked:true when toggling from unchecked', async () => {
    const onCheckedChange = vi.fn();
    const screen = await render(
      <Checkbox onCheckedChange={onCheckedChange}>Toggle on</Checkbox>
    );
    const root = getRoot(screen.container);
    await userEvent.click(locatorFor(root));
    await vi.waitFor(() => expect(onCheckedChange).toHaveBeenCalledWith(
      expect.objectContaining({ checked: true })
    ));
    await takeSnapshot(`Checkbox - calls onCheckedChange with checked:true when toggling from unchecked`);
  });

  it('calls onCheckedChange with checked:false when clicking a checkbox whose checked prop is fixed to true', async () => {
    const onCheckedChange = vi.fn();
    const screen = await render(
      <Checkbox checked onCheckedChange={onCheckedChange}>
        Fixed checked
      </Checkbox>
    );
    const root = getRoot(screen.container);
    await userEvent.click(locatorFor(root));
    await vi.waitFor(() => expect(onCheckedChange).toHaveBeenCalledWith(
      expect.objectContaining({ checked: false })
    ));
    await takeSnapshot(`Checkbox - calls onCheckedChange with checked:false when clicking a checkbox whose checked prop is fixed to true`);
  });

  it('does not throw when clicked without an onCheckedChange handler', async () => {
    const screen = await render(<Checkbox>No handler</Checkbox>);
    const root = getRoot(screen.container);
    await expect(userEvent.click(locatorFor(root))).resolves.not.toThrow();
    await takeSnapshot(`Checkbox - does not throw when clicked without an onCheckedChange handler`);
  });

  /* -----------------------------------------------------------------------
   * Disabled (4)
   * -------------------------------------------------------------------- */

  it('does not call onCheckedChange when a disabled checkbox is clicked', async () => {
    const onCheckedChange = vi.fn();
    const screen = await render(
      <Checkbox disabled onCheckedChange={onCheckedChange}>
        Disabled
      </Checkbox>
    );
    const root = getRoot(screen.container);
    await userEvent.click(locatorFor(root), { force: true });
    await vi.waitFor(() => expect(onCheckedChange).not.toHaveBeenCalled());
    await takeSnapshot(`Checkbox - does not call onCheckedChange when a disabled checkbox is clicked`);
  });

  it('applies reduced opacity on the root when disabled', async () => {
    const screen = await render(<Checkbox disabled>Disabled</Checkbox>);
    const root = getRoot(screen.container);
    await expect.element(locatorFor(root)).toHaveStyle({ opacity: '0.5' });
    await takeSnapshot(`Checkbox - applies reduced opacity on the root when disabled`);
  });

  it('applies a not-allowed cursor on the root when disabled', async () => {
    const screen = await render(<Checkbox disabled>Disabled</Checkbox>);
    const root = getRoot(screen.container);
    await expect.element(locatorFor(root)).toHaveStyle({ cursor: 'not-allowed' });
    await takeSnapshot(`Checkbox - applies a not-allowed cursor on the root when disabled`);
  });

  it('marks the hidden input as disabled', async () => {
    const screen = await render(<Checkbox disabled>Disabled</Checkbox>);
    const checkbox = screen.getByRole('checkbox');
    await expect.element(checkbox).toBeDisabled();
    await takeSnapshot(`Checkbox - marks the hidden input as disabled`);
  });

  /* -----------------------------------------------------------------------
   * Disabled crossed with checked (2)
   * -------------------------------------------------------------------- */

  it('renders disabled and checked with blue control styling but reduced opacity', async () => {
    const screen = await render(
      <Checkbox disabled checked>
        Disabled checked
      </Checkbox>
    );
    const root = getRoot(screen.container);
    const control = getControl(screen.container);
    await expect.element(locatorFor(root)).toHaveStyle({ opacity: '0.5' });
    await expect
      .element(locatorFor(control))
      .toHaveStyle({ backgroundColor: color.blue500 });
    await takeSnapshot(`Checkbox - renders disabled and checked with blue control styling but reduced opacity`);
  });

  it('renders disabled and unchecked with slate control styling and reduced opacity', async () => {
    const screen = await render(<Checkbox disabled>Disabled unchecked</Checkbox>);
    const root = getRoot(screen.container);
    const control = getControl(screen.container);
    await expect.element(locatorFor(root)).toHaveStyle({ opacity: '0.5' });
    await expect
      .element(locatorFor(control))
      .toHaveStyle({ backgroundColor: color.white });
    await takeSnapshot(`Checkbox - renders disabled and unchecked with slate control styling and reduced opacity`);
  });

  /* -----------------------------------------------------------------------
   * Required (2)
   * -------------------------------------------------------------------- */

  it('marks the hidden input as required when required is true', async () => {
    const screen = await render(<Checkbox required>Required</Checkbox>);
    const checkbox = screen.getByRole('checkbox');
    await expect.element(checkbox).toHaveAttribute('required');
    await takeSnapshot(`Checkbox - marks the hidden input as required when required is true`);
  });

  it('does not mark the hidden input as required by default', async () => {
    const screen = await render(<Checkbox>Not required</Checkbox>);
    const checkbox = screen.getByRole('checkbox');
    await expect.element(checkbox).not.toHaveAttribute('required');
    await takeSnapshot(`Checkbox - does not mark the hidden input as required by default`);
  });

  /* -----------------------------------------------------------------------
   * ReadOnly (3)
   * -------------------------------------------------------------------- */

  it('does not call onCheckedChange when a read-only checkbox is clicked', async () => {
    const onCheckedChange = vi.fn();
    const screen = await render(
      <Checkbox readOnly onCheckedChange={onCheckedChange}>
        Read-only
      </Checkbox>
    );
    const root = getRoot(screen.container);
    await userEvent.click(locatorFor(root));
    await vi.waitFor(() => expect(onCheckedChange).not.toHaveBeenCalled());
    await takeSnapshot(`Checkbox - does not call onCheckedChange when a read-only checkbox is clicked`);
  });

  it('keeps a read-only checked checkbox checked after being clicked', async () => {
    const screen = await render(<Checkbox readOnly checked>Read-only checked</Checkbox>);
    const checkbox = screen.getByRole('checkbox');
    const root = getRoot(screen.container);
    await userEvent.click(locatorFor(root));
    await expect.element(checkbox).toBeChecked();
    await takeSnapshot(`Checkbox - keeps a read-only checked checkbox checked after being clicked`);
  });

  it('keeps a read-only unchecked checkbox unchecked after being clicked', async () => {
    const screen = await render(<Checkbox readOnly>Read-only unchecked</Checkbox>);
    const checkbox = screen.getByRole('checkbox');
    const root = getRoot(screen.container);
    await userEvent.click(locatorFor(root));
    await expect.element(checkbox).not.toBeChecked();
    await takeSnapshot(`Checkbox - keeps a read-only unchecked checkbox unchecked after being clicked`);
  });

  /* -----------------------------------------------------------------------
   * Name/value form-submission attributes (4)
   * -------------------------------------------------------------------- */

  it('exposes the provided name attribute on the hidden input', async () => {
    const screen = await render(<Checkbox name="terms">Terms</Checkbox>);
    const checkbox = screen.getByRole('checkbox');
    await expect.element(checkbox).toHaveAttribute('name', 'terms');
    await takeSnapshot(`Checkbox - exposes the provided name attribute on the hidden input`);
  });

  it('exposes the provided value attribute on the hidden input', async () => {
    const screen = await render(
      <Checkbox name="terms" value="accepted">
        Terms
      </Checkbox>
    );
    const checkbox = screen.getByRole('checkbox');
    await expect.element(checkbox).toHaveAttribute('value', 'accepted');
    await takeSnapshot(`Checkbox - exposes the provided value attribute on the hidden input`);
  });

  it('defaults the value attribute to "on" when value is not provided', async () => {
    const screen = await render(<Checkbox name="newsletter">Newsletter</Checkbox>);
    const checkbox = screen.getByRole('checkbox');
    await expect.element(checkbox).toHaveAttribute('value', 'on');
    await takeSnapshot(`Checkbox - defaults the value attribute to "on" when value is not provided`);
  });

  it('omits the name attribute when name is not provided', async () => {
    const screen = await render(<Checkbox>No name</Checkbox>);
    const checkbox = screen.getByRole('checkbox');
    await expect.element(checkbox).not.toHaveAttribute('name');
    await takeSnapshot(`Checkbox - omits the name attribute when name is not provided`);
  });

  /* -----------------------------------------------------------------------
   * Label rendering (5)
   * -------------------------------------------------------------------- */

  it('renders the provided label text as children', async () => {
    const screen = await render(<Checkbox>Accept terms and conditions</Checkbox>);
    await expect
      .element(screen.getByText('Accept terms and conditions'))
      .toBeInTheDocument();
    await takeSnapshot(`Checkbox - renders the provided label text as children`);
  });

  it('does not render a label element when no children are provided', async () => {
    const screen = await render(<Checkbox />);
    expect(screen.container.querySelector('span')).toBeNull();
    await takeSnapshot(`Checkbox - does not render a label element when no children are provided`);
  });

  it('renders long label text in full without truncating the DOM text content', async () => {
    const longText =
      'I agree to receive marketing communications, promotional offers, and newsletters from the company, and I understand I can unsubscribe at any time.';
    const screen = await render(<Checkbox>{longText}</Checkbox>);
    await expect
      .element(screen.getByText(longText))
      .toHaveTextContent(longText);
    await takeSnapshot(`Checkbox - renders long label text in full without truncating the DOM text content`);
  });

  it('preserves RTL unicode label content exactly', async () => {
    const screen = await render(<Checkbox>أوافق على الشروط</Checkbox>);
    await expect
      .element(screen.getByText('أوافق على الشروط'))
      .toHaveTextContent('أوافق على الشروط');
    await takeSnapshot(`Checkbox - preserves RTL unicode label content exactly`);
  });

  it('preserves emoji label content exactly', async () => {
    const screen = await render(<Checkbox>✅ Confirmed 🎉</Checkbox>);
    await expect
      .element(screen.getByText('✅ Confirmed 🎉'))
      .toHaveTextContent('✅ Confirmed 🎉');
    await takeSnapshot(`Checkbox - preserves emoji label content exactly`);
  });

  /* -----------------------------------------------------------------------
   * Keyboard interaction (3)
   * -------------------------------------------------------------------- */

  it('moves focus to the checkbox via Tab', async () => {
    const screen = await render(<Checkbox>Keyboard checkbox</Checkbox>);
    const checkbox = screen.getByRole('checkbox');
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    await vi.waitFor(() => expect(document.activeElement).toBe(checkbox.element()));
    await takeSnapshot(`Checkbox - moves focus to the checkbox via Tab`);
  });

  it('calls onCheckedChange when Space is pressed on a focused checkbox', async () => {
    const onCheckedChange = vi.fn();
    const screen = await render(
      <Checkbox onCheckedChange={onCheckedChange}>Space to toggle</Checkbox>
    );
    const checkbox = screen.getByRole('checkbox');
    checkbox.element().focus();
    await userEvent.keyboard(' ');
    await vi.waitFor(() => expect(onCheckedChange).toHaveBeenCalledTimes(1));
    await takeSnapshot(`Checkbox - calls onCheckedChange when Space is pressed on a focused checkbox`);
  });

  it('skips a disabled checkbox when tabbing, landing on the next focusable element', async () => {
    const screen = await render(
      <div>
        <Checkbox disabled>Disabled</Checkbox>
        <button>After</button>
      </div>
    );
    const afterButton = screen.getByRole('button', { name: 'After' });
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    await vi.waitFor(() => expect(document.activeElement).toBe(afterButton.element()));
    await takeSnapshot(`Checkbox - skips a disabled checkbox when tabbing, landing on the next focusable element`);
  });

  /* -----------------------------------------------------------------------
   * Multi-instance independence (2)
   * -------------------------------------------------------------------- */

  it('does not share checked state between two independently controlled checkboxes', async () => {
    const IndependentPair = () => {
      const [first, setFirst] = useState(false);
      const [second, setSecond] = useState(true);
      return (
        <div>
          <Checkbox
            checked={first}
            onCheckedChange={(d) =>
              setFirst(typeof d.checked === 'boolean' ? d.checked : d.checked === 'on')
            }
          >
            First
          </Checkbox>
          <Checkbox
            checked={second}
            onCheckedChange={(d) =>
              setSecond(typeof d.checked === 'boolean' ? d.checked : d.checked === 'on')
            }
          >
            Second
          </Checkbox>
        </div>
      );
    };
    const screen = await render(<IndependentPair />);
    const firstCheckbox = screen.getByRole('checkbox', { name: 'First' });
    const secondCheckbox = screen.getByRole('checkbox', { name: 'Second' });
    await expect.element(firstCheckbox).not.toBeChecked();
    await expect.element(secondCheckbox).toBeChecked();
    await takeSnapshot(`Checkbox - does not share checked state between two independently controlled checkboxes`);
  });

  it('does not invoke the other instance onCheckedChange when only one checkbox is clicked', async () => {
    const onFirstChange = vi.fn();
    const onSecondChange = vi.fn();
    const screen = await render(
      <div>
        <Checkbox onCheckedChange={onFirstChange}>First</Checkbox>
        <Checkbox onCheckedChange={onSecondChange}>Second</Checkbox>
      </div>
    );
    const firstRoot = screen.container.children[0]
      .firstElementChild as HTMLElement;
    await userEvent.click(locatorFor(firstRoot));
    await vi.waitFor(() => expect(onFirstChange).toHaveBeenCalledTimes(1));
    await vi.waitFor(() => expect(onSecondChange).not.toHaveBeenCalled());
    await takeSnapshot(`Checkbox - does not invoke the other instance onCheckedChange when only one checkbox is clicked`);
  });

  /* -----------------------------------------------------------------------
   * Default prop values (2)
   * -------------------------------------------------------------------- */

  it('defaults to unchecked, not required, not disabled, and value="on"', async () => {
    const screen = await render(<Checkbox name="defaults">Defaults</Checkbox>);
    const checkbox = screen.getByRole('checkbox');
    await expect.element(checkbox).not.toBeChecked();
    await expect.element(checkbox).not.toHaveAttribute('required');
    await expect.element(checkbox).not.toBeDisabled();
    await expect.element(checkbox).toHaveAttribute('value', 'on');
    await takeSnapshot(`Checkbox - defaults to unchecked, not required, not disabled, and value="on"`);
  });

  it('renders an enabled hidden input by default when disabled is not provided', async () => {
    const screen = await render(<Checkbox>Enabled by default</Checkbox>);
    const checkbox = screen.getByRole('checkbox');
    await expect.element(checkbox).toBeEnabled();
    await takeSnapshot(`Checkbox - renders an enabled hidden input by default when disabled is not provided`);
  });

  /* -----------------------------------------------------------------------
   * Kitchen-sink combos (4)
   * -------------------------------------------------------------------- */

  it('renders correctly with checked, required, disabled, and a custom name/value together', async () => {
    const screen = await render(
      <Checkbox checked required disabled name="kitchenSink" value="sink">
        Kitchen sink checked
      </Checkbox>
    );
    const checkbox = screen.getByRole('checkbox');
    await expect.element(checkbox).toBeChecked();
    await expect.element(checkbox).toBeDisabled();
    await expect.element(checkbox).toHaveAttribute('required');
    await expect.element(checkbox).toHaveAttribute('name', 'kitchenSink');
    await expect.element(checkbox).toHaveAttribute('value', 'sink');
    await takeSnapshot(`Checkbox - renders correctly with checked, required, disabled, and a custom name/value together`);
  });

  it('prevents onCheckedChange when readOnly, checked, and required are combined and clicked', async () => {
    const onCheckedChange = vi.fn();
    const screen = await render(
      <Checkbox readOnly checked required onCheckedChange={onCheckedChange}>
        Kitchen sink read-only
      </Checkbox>
    );
    const root = getRoot(screen.container);
    await userEvent.click(locatorFor(root));
    await vi.waitFor(() => expect(onCheckedChange).not.toHaveBeenCalled());
    const checkbox = screen.getByRole('checkbox');
    await expect.element(checkbox).toBeChecked();
    await takeSnapshot(`Checkbox - prevents onCheckedChange when readOnly, checked, and required are combined and clicked`);
  });

  it('renders an unchecked, disabled, required checkbox with a name/value and no label', async () => {
    const screen = await render(
      <Checkbox disabled required name="mandatory" value="yes" />
    );
    const checkbox = screen.getByRole('checkbox');
    await expect.element(checkbox).not.toBeChecked();
    await expect.element(checkbox).toBeDisabled();
    await expect.element(checkbox).toHaveAttribute('required');
    expect(screen.container.querySelector('span')).toBeNull();
    await takeSnapshot(`Checkbox - renders an unchecked, disabled, required checkbox with a name/value and no label`);
  });

  it('renders a checked, read-only checkbox with an RTL/emoji label and custom name/value', async () => {
    const screen = await render(
      <Checkbox readOnly checked name="rtlKitchenSink" value="oui">
        ✅ أوافق 🎉
      </Checkbox>
    );
    const checkbox = screen.getByRole('checkbox');
    await expect.element(checkbox).toBeChecked();
    await expect.element(checkbox).toHaveAttribute('name', 'rtlKitchenSink');
    await expect
      .element(screen.getByText('✅ أوافق 🎉'))
      .toHaveTextContent('✅ أوافق 🎉');
    await takeSnapshot(`Checkbox - renders a checked, read-only checkbox with an RTL/emoji label and custom name/value`);
  });

  /* -----------------------------------------------------------------------
   * Multiple checkboxes in a group (2)
   * -------------------------------------------------------------------- */

  it('renders a group of checkboxes with mixed checked and disabled states correctly', async () => {
    const screen = await render(
      <div>
        <Checkbox name="a" value="yes">
          Option A
        </Checkbox>
        <Checkbox name="b" value="yes" checked>
          Option B
        </Checkbox>
        <Checkbox name="c" value="yes" disabled>
          Option C
        </Checkbox>
      </div>
    );
    const a = screen.getByRole('checkbox', { name: 'Option A' });
    const b = screen.getByRole('checkbox', { name: 'Option B' });
    const c = screen.getByRole('checkbox', { name: 'Option C' });
    await expect.element(a).not.toBeChecked();
    await expect.element(b).toBeChecked();
    await expect.element(c).toBeDisabled();
    await takeSnapshot(`Checkbox - renders a group of checkboxes with mixed checked and disabled states correctly`);
  });

  it('renders three checkboxes with distinct name/value pairs suitable for independent form fields', async () => {
    const screen = await render(
      <div>
        <Checkbox name="newsletter" value="yes">
          Newsletter
        </Checkbox>
        <Checkbox name="marketing" value="opt-in">
          Marketing
        </Checkbox>
        <Checkbox name="updates" value="subscribed">
          Updates
        </Checkbox>
      </div>
    );
    const newsletter = screen.getByRole('checkbox', { name: 'Newsletter' });
    const marketing = screen.getByRole('checkbox', { name: 'Marketing' });
    const updates = screen.getByRole('checkbox', { name: 'Updates' });
    await expect.element(newsletter).toHaveAttribute('value', 'yes');
    await expect.element(marketing).toHaveAttribute('value', 'opt-in');
    await expect.element(updates).toHaveAttribute('value', 'subscribed');
    await takeSnapshot(`Checkbox - renders three checkboxes with distinct name/value pairs suitable for independent form fields`);
  });

  /* -----------------------------------------------------------------------
   * Indeterminate-like controlled group state (2)
   * -------------------------------------------------------------------- */

  it('shows an unchecked "select all" checkbox when no child items are selected', async () => {
    const screen = await render(<SelectAllFixture allInitiallySelected={false} />);
    const checkbox = screen.getByRole('checkbox');
    await expect.element(checkbox).not.toBeChecked();
    await takeSnapshot(`Checkbox - shows an unchecked "select all" checkbox when no child items are selected`);
  });

  it('shows a checked "select all" checkbox when all child items are already selected', async () => {
    const screen = await render(<SelectAllFixture allInitiallySelected={true} />);
    const checkbox = screen.getByRole('checkbox');
    await expect.element(checkbox).toBeChecked();
    await takeSnapshot(`Checkbox - shows a checked "select all" checkbox when all child items are already selected`);
  });

  /* -----------------------------------------------------------------------
   * Edge cases (2)
   * -------------------------------------------------------------------- */

  it('renders an empty string label without throwing and without a label element', async () => {
    const screen = await render(<Checkbox>{''}</Checkbox>);
    expect(screen.container.querySelector('span')).toBeNull();
    await takeSnapshot(`Checkbox - renders an empty string label without throwing and without a label element`);
  });

  it('renders a whitespace-only label as a truthy label element', async () => {
    const screen = await render(<Checkbox>{'   '}</Checkbox>);
    const label = screen.container.querySelector('span');
    expect(label).not.toBeNull();
    await takeSnapshot(`Checkbox - renders a whitespace-only label as a truthy label element`);
  });
});
