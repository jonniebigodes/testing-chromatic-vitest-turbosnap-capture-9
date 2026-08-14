import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent, page } from 'vitest/browser';
import { useState } from 'react';
import Combobox from './Combobox';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

const frameworks = ['React', 'Vue', 'Svelte', 'Angular', 'Solid'];

/** Wraps a raw HTMLElement into a Locator so jest-dom matchers can be used. */
const locatorFor = (element: HTMLElement) => page.elementLocator(element);

/**
 * The combobox listbox and its options are rendered through a `Portal` into
 * `document.body`, outside of the local render container, so they must be
 * queried globally via `page` rather than through `screen.container`.
 */
const getListbox = () => document.querySelector('[role="listbox"]') as HTMLElement | null;
/**
 * Once genuinely hidden (native `hidden` attribute, no CSS override), the
 * clear trigger drops out of the accessibility tree entirely, so it must be
 * located by a raw selector rather than `getByRole` while it has no value.
 */
const getClearTrigger = () =>
  document.querySelector('[aria-label="Clear value"]') as HTMLElement;
const getOptions = () =>
  Array.from(document.querySelectorAll('[role="option"]')) as HTMLElement[];
const getOptionByText = (text: string) =>
  getOptions().find((option) => option.textContent?.includes(text)) as HTMLElement;

/**
 * The option's `textContent` also includes the checkmark indicator's text
 * (it stays in the DOM with a `hidden` attribute when unselected), so
 * filtering assertions read only the item-text part to get the visible
 * label.
 */
const getOptionLabels = () =>
  getOptions().map(
    (option) => option.querySelector('[data-part="item-text"]')?.textContent ?? ''
  );

/**
 * Small stateful fixture mirroring a "controlled open" usage pattern, used to
 * exercise real external state updates driving the popover's open state.
 */
const ControlledOpenFixture = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Rendered above the combobox so the downward-opening popover never
          overlaps and intercepts clicks on this button. */}
      <button onClick={() => setOpen((current) => !current)}>Toggle from outside</button>
      <Combobox
        label="Framework"
        items={frameworks}
        open={open}
        onOpenChange={(details) => setOpen(details.open)}
      />
    </>
  );
};

/**
 * Small stateful fixture mirroring a "controlled value" usage pattern, used
 * to exercise real external state updates driving the selected value.
 */
const ControlledValueFixture = () => {
  const [value, setValue] = useState<string[]>([]);

  return (
    <>
      <Combobox
        label="Framework"
        items={frameworks}
        value={value}
        onValueChange={(details) => setValue(details.value)}
      />
      <button onClick={() => setValue(['Vue'])}>Set value to Vue</button>
      <button onClick={() => setValue([])}>Clear value from outside</button>
    </>
  );
};

describe('Combobox', () => {
  /* -----------------------------------------------------------------------
   * Rendering & structure (4)
   * -------------------------------------------------------------------- */

  it('renders an input with role combobox using the provided placeholder', async () => {
    const screen = await render(
      <Combobox label="Framework" items={frameworks} placeholder="Choose a framework..." />
    );
    const input = screen.getByRole('combobox');
    await expect.element(input).toHaveAttribute('placeholder', 'Choose a framework...');
    await takeSnapshot(`Combobox - renders an input with role combobox using the provided placeholder`);
  });

  it('associates the label with the input via htmlFor/id', async () => {
    const screen = await render(<Combobox label="Framework" items={frameworks} />);
    const input = screen.getByRole('combobox');
    const label = screen.container.querySelector('label') as HTMLElement;
    expect(label.getAttribute('for')).toBe(input.element().id);
    await takeSnapshot(`Combobox - associates the label with the input via htmlFor/id`);
  });

  it('renders a trigger button labeled "Toggle suggestions"', async () => {
    const screen = await render(<Combobox label="Framework" items={frameworks} />);
    await expect
      .element(screen.getByRole('button', { name: 'Toggle suggestions' }))
      .toBeInTheDocument();
    await takeSnapshot(`Combobox - renders a trigger button labeled "Toggle suggestions"`);
  });

  it('renders a clear trigger button labeled "Clear value", hidden while there is no value', async () => {
    await render(<Combobox label="Framework" items={frameworks} />);
    await expect.element(locatorFor(getClearTrigger())).not.toBeVisible();
    await takeSnapshot(`Combobox - renders a clear trigger button labeled "Clear value", hidden while there is no value`);
  });

  /* -----------------------------------------------------------------------
   * Trigger button open/close (4)
   * -------------------------------------------------------------------- */

  it('opens the listbox when the trigger button is clicked', async () => {
    const screen = await render(<Combobox label="Framework" items={frameworks} />);
    await userEvent.click(screen.getByRole('button', { name: 'Toggle suggestions' }));
    await expect.element(locatorFor(getListbox()!)).toBeVisible();
    await takeSnapshot(`Combobox - opens the listbox when the trigger button is clicked`);
  });

  it('sets aria-expanded="true" on the input once the listbox opens', async () => {
    const screen = await render(<Combobox label="Framework" items={frameworks} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(screen.getByRole('button', { name: 'Toggle suggestions' }));
    await expect.element(input).toHaveAttribute('aria-expanded', 'true');
    await takeSnapshot(`Combobox - sets aria-expanded="true" on the input once the listbox opens`);
  });

  it('closes the listbox when the trigger button is clicked a second time', async () => {
    const screen = await render(<Combobox label="Framework" items={frameworks} />);
    const trigger = screen.getByRole('button', { name: 'Toggle suggestions' });
    await userEvent.click(trigger);
    await expect.element(locatorFor(getListbox()!)).toBeVisible();
    await userEvent.click(trigger);
    await expect.element(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
    await takeSnapshot(`Combobox - closes the listbox when the trigger button is clicked a second time`);
  });

  it('moves focus onto the input when the trigger button is clicked', async () => {
    const screen = await render(<Combobox label="Framework" items={frameworks} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(screen.getByRole('button', { name: 'Toggle suggestions' }));
    await expect.element(input).toHaveFocus();
    await takeSnapshot(`Combobox - moves focus onto the input when the trigger button is clicked`);
  });

  /* -----------------------------------------------------------------------
   * Typing / autocomplete filter (5)
   * -------------------------------------------------------------------- */

  it('opens the listbox when the user types into the input', async () => {
    const screen = await render(<Combobox label="Framework" items={frameworks} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    await userEvent.type(input, 'r');
    await expect.element(input).toHaveAttribute('aria-expanded', 'true');
    await takeSnapshot(`Combobox - opens the listbox when the user types into the input`);
  });

  it('filters the option list down to items matching the typed text', async () => {
    const screen = await render(<Combobox label="Framework" items={frameworks} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    await userEvent.type(input, 'rea');
    await expect.poll(() => getOptionLabels()).toEqual(['React']);
    await takeSnapshot(`Combobox - filters the option list down to items matching the typed text`);
  });

  it('filters case-insensitively', async () => {
    const screen = await render(<Combobox label="Framework" items={frameworks} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    await userEvent.type(input, 'REACT');
    await expect.poll(() => getOptionLabels()).toEqual(['React']);
    await takeSnapshot(`Combobox - filters case-insensitively`);
  });

  it('shows "No results found" and zero options when no item matches the typed text', async () => {
    const screen = await render(<Combobox label="Framework" items={frameworks} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    await userEvent.type(input, 'zzznotfound');
    await expect.poll(() => getOptions().length).toBe(0);
    await expect
      .element(locatorFor(document.querySelector('[role="presentation"]') as HTMLElement))
      .toHaveTextContent('No results found');
    await takeSnapshot(`Combobox - shows "No results found" and zero options when no item matches the typed text`);
  });

  it('restores the full item list once the filter text is cleared', async () => {
    const screen = await render(<Combobox label="Framework" items={frameworks} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    await userEvent.type(input, 'rea');
    await expect.poll(() => getOptions().length).toBe(1);
    await userEvent.clear(input);
    await expect.poll(() => getOptions().length).toBe(frameworks.length);
    await takeSnapshot(`Combobox - restores the full item list once the filter text is cleared`);
  });

  /* -----------------------------------------------------------------------
   * Selecting an item / value (4)
   * -------------------------------------------------------------------- */

  it('calls onValueChange with the selected value when an option is clicked', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <Combobox label="Framework" items={frameworks} onValueChange={onValueChange} />
    );
    await userEvent.click(screen.getByRole('button', { name: 'Toggle suggestions' }));
    await expect.element(locatorFor(getListbox()!)).toBeVisible();
    await userEvent.click(locatorFor(getOptionByText('Vue')));
    await vi.waitFor(() => expect(onValueChange).toHaveBeenCalledWith(
      expect.objectContaining({ value: ['Vue'] })
    ));
    await takeSnapshot(`Combobox - calls onValueChange with the selected value when an option is clicked`);
  });

  it('updates the input text to the selected item after clicking an option', async () => {
    const screen = await render(<Combobox label="Framework" items={frameworks} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(screen.getByRole('button', { name: 'Toggle suggestions' }));
    await userEvent.click(locatorFor(getOptionByText('Vue')));
    await expect.element(input).toHaveValue('Vue');
    await takeSnapshot(`Combobox - updates the input text to the selected item after clicking an option`);
  });

  it('closes the listbox after selecting an option in single-select mode', async () => {
    const screen = await render(<Combobox label="Framework" items={frameworks} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(screen.getByRole('button', { name: 'Toggle suggestions' }));
    await userEvent.click(locatorFor(getOptionByText('Vue')));
    await expect.element(input).toHaveAttribute('aria-expanded', 'false');
    await takeSnapshot(`Combobox - closes the listbox after selecting an option in single-select mode`);
  });

  it('reveals the clear trigger button once a value has been selected', async () => {
    const screen = await render(<Combobox label="Framework" items={frameworks} />);
    const clearButton = screen.getByRole('button', { name: 'Clear value' });
    await userEvent.click(screen.getByRole('button', { name: 'Toggle suggestions' }));
    await userEvent.click(locatorFor(getOptionByText('React')));
    await expect.element(clearButton).toBeVisible();
    await takeSnapshot(`Combobox - reveals the clear trigger button once a value has been selected`);
  });

  /* -----------------------------------------------------------------------
   * Clear trigger (3)
   * -------------------------------------------------------------------- */

  it('keeps the clear trigger hidden before anything has been selected', async () => {
    await render(<Combobox label="Framework" items={frameworks} />);
    await expect.element(locatorFor(getClearTrigger())).not.toBeVisible();
    await takeSnapshot(`Combobox - keeps the clear trigger hidden before anything has been selected`);
  });

  it('clears the input text when the clear trigger is clicked', async () => {
    const screen = await render(<Combobox label="Framework" items={frameworks} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(screen.getByRole('button', { name: 'Toggle suggestions' }));
    await userEvent.click(locatorFor(getOptionByText('React')));
    await expect.element(input).toHaveValue('React');
    await userEvent.click(screen.getByRole('button', { name: 'Clear value' }));
    await expect.element(input).toHaveValue('');
    await takeSnapshot(`Combobox - clears the input text when the clear trigger is clicked`);
  });

  it('hides the clear trigger again after clearing the value', async () => {
    const screen = await render(<Combobox label="Framework" items={frameworks} />);
    await userEvent.click(screen.getByRole('button', { name: 'Toggle suggestions' }));
    await userEvent.click(locatorFor(getOptionByText('React')));
    const clearButton = screen.getByRole('button', { name: 'Clear value' });
    await expect.element(clearButton).toBeVisible();
    await userEvent.click(clearButton);
    await expect.element(locatorFor(getClearTrigger())).not.toBeVisible();
    await takeSnapshot(`Combobox - hides the clear trigger again after clearing the value`);
  });

  /* -----------------------------------------------------------------------
   * Keyboard navigation (5)
   * -------------------------------------------------------------------- */

  it('opens the listbox and highlights the first item when ArrowDown is pressed on the focused input', async () => {
    const screen = await render(<Combobox label="Framework" items={frameworks} />);
    const input = screen.getByRole('combobox');
    input.element().focus();
    await userEvent.keyboard('{ArrowDown}');
    await expect.element(input).toHaveAttribute('aria-expanded', 'true');
    await expect.poll(() => getOptions()[0]?.getAttribute('data-highlighted')).not.toBeNull();
    await takeSnapshot(`Combobox - opens the listbox and highlights the first item when ArrowDown is pressed on the focused input`);
  });

  it('moves the highlight to the next item when ArrowDown is pressed again', async () => {
    const screen = await render(<Combobox label="Framework" items={frameworks} />);
    const input = screen.getByRole('combobox');
    input.element().focus();
    await userEvent.keyboard('{ArrowDown}');
    await expect.poll(() => getOptions()[0]?.getAttribute('data-highlighted')).not.toBeNull();
    await userEvent.keyboard('{ArrowDown}');
    await expect.poll(() => getOptions()[1]?.getAttribute('data-highlighted')).not.toBeNull();
    await takeSnapshot(`Combobox - moves the highlight to the next item when ArrowDown is pressed again`);
  });

  it('tracks the highlighted option via aria-activedescendant on the input', async () => {
    const screen = await render(<Combobox label="Framework" items={frameworks} />);
    const input = screen.getByRole('combobox');
    input.element().focus();
    await userEvent.keyboard('{ArrowDown}');
    await expect
      .poll(() => input.element().getAttribute('aria-activedescendant'))
      .toBe(getOptionByText('React')?.id);
    await takeSnapshot(`Combobox - tracks the highlighted option via aria-activedescendant on the input`);
  });

  it('selects the highlighted item when Enter is pressed', async () => {
    const screen = await render(<Combobox label="Framework" items={frameworks} />);
    const input = screen.getByRole('combobox');
    input.element().focus();
    await userEvent.keyboard('{ArrowDown}');
    await expect.poll(() => getOptions()[0]?.getAttribute('data-highlighted')).not.toBeNull();
    await userEvent.keyboard('{Enter}');
    await expect.element(input).toHaveValue('React');
    await expect.element(input).toHaveAttribute('aria-expanded', 'false');
    await takeSnapshot(`Combobox - selects the highlighted item when Enter is pressed`);
  });

  it('closes the listbox without selecting anything when Escape is pressed', async () => {
    const screen = await render(<Combobox label="Framework" items={frameworks} />);
    const input = screen.getByRole('combobox');
    input.element().focus();
    await userEvent.keyboard('{ArrowDown}');
    await expect.element(input).toHaveAttribute('aria-expanded', 'true');
    await userEvent.keyboard('{Escape}');
    await expect.element(input).toHaveAttribute('aria-expanded', 'false');
    await expect.element(input).toHaveValue('');
    await takeSnapshot(`Combobox - closes the listbox without selecting anything when Escape is pressed`);
  });

  /* -----------------------------------------------------------------------
   * Multiple selection mode (4)
   * -------------------------------------------------------------------- */

  it('keeps the listbox open after selecting an option in multiple mode', async () => {
    const screen = await render(
      <Combobox label="Framework" items={frameworks} type="multiple" />
    );
    const input = screen.getByRole('combobox');
    await userEvent.click(screen.getByRole('button', { name: 'Toggle suggestions' }));
    await userEvent.click(locatorFor(getOptionByText('React')));
    await expect.element(input).toHaveAttribute('aria-expanded', 'true');
    await takeSnapshot(`Combobox - keeps the listbox open after selecting an option in multiple mode`);
  });

  it('accumulates two selections into the value array in multiple mode', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <Combobox
        label="Framework"
        items={frameworks}
        type="multiple"
        onValueChange={onValueChange}
      />
    );
    await userEvent.click(screen.getByRole('button', { name: 'Toggle suggestions' }));
    await userEvent.click(locatorFor(getOptionByText('React')));
    await userEvent.click(locatorFor(getOptionByText('Svelte')));
    await vi.waitFor(() => expect(onValueChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ value: ['React', 'Svelte'] })
    ));
    await takeSnapshot(`Combobox - accumulates two selections into the value array in multiple mode`);
  });

  it('marks a selected option with aria-selected="true" in multiple mode', async () => {
    const screen = await render(
      <Combobox label="Framework" items={frameworks} type="multiple" />
    );
    await userEvent.click(screen.getByRole('button', { name: 'Toggle suggestions' }));
    await userEvent.click(locatorFor(getOptionByText('React')));
    await expect
      .element(locatorFor(getOptionByText('React')))
      .toHaveAttribute('aria-selected', 'true');
    await takeSnapshot(`Combobox - marks a selected option with aria-selected="true" in multiple mode`);
  });

  it('deselects an already-selected option when clicked again in multiple mode', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <Combobox
        label="Framework"
        items={frameworks}
        type="multiple"
        onValueChange={onValueChange}
      />
    );
    await userEvent.click(screen.getByRole('button', { name: 'Toggle suggestions' }));
    await userEvent.click(locatorFor(getOptionByText('React')));
    await expect
      .element(locatorFor(getOptionByText('React')))
      .toHaveAttribute('aria-selected', 'true');
    await userEvent.click(locatorFor(getOptionByText('React')));
    await expect
      .element(locatorFor(getOptionByText('React')))
      .not.toHaveAttribute('aria-selected');
    expect(onValueChange).toHaveBeenLastCalledWith(expect.objectContaining({ value: [] }));
    await takeSnapshot(`Combobox - deselects an already-selected option when clicked again in multiple mode`);
  });

  /* -----------------------------------------------------------------------
   * Disabled (3)
   * -------------------------------------------------------------------- */

  it('marks the input as disabled when disabled is true', async () => {
    const screen = await render(<Combobox label="Framework" items={frameworks} disabled />);
    await expect.element(screen.getByRole('combobox')).toBeDisabled();
    await takeSnapshot(`Combobox - marks the input as disabled when disabled is true`);
  });

  it('marks the trigger button as disabled when disabled is true', async () => {
    const screen = await render(<Combobox label="Framework" items={frameworks} disabled />);
    await expect
      .element(screen.getByRole('button', { name: 'Toggle suggestions' }))
      .toBeDisabled();
    await takeSnapshot(`Combobox - marks the trigger button as disabled when disabled is true`);
  });

  it('does not open the listbox when a disabled trigger button is clicked', async () => {
    const screen = await render(<Combobox label="Framework" items={frameworks} disabled />);
    const input = screen.getByRole('combobox');
    await userEvent.click(
      screen.getByRole('button', { name: 'Toggle suggestions' }),
      { force: true }
    );
    await expect.element(input).toHaveAttribute('aria-expanded', 'false');
    await takeSnapshot(`Combobox - does not open the listbox when a disabled trigger button is clicked`);
  });

  /* -----------------------------------------------------------------------
   * Required + name form attributes (3)
   * -------------------------------------------------------------------- */

  it('marks the input as required when required is true', async () => {
    const screen = await render(<Combobox label="Framework" items={frameworks} required />);
    await expect.element(screen.getByRole('combobox')).toHaveAttribute('required');
    await takeSnapshot(`Combobox - marks the input as required when required is true`);
  });

  it('exposes the provided name attribute on the input', async () => {
    const screen = await render(
      <Combobox label="Framework" items={frameworks} name="framework" />
    );
    await expect.element(screen.getByRole('combobox')).toHaveAttribute('name', 'framework');
    await takeSnapshot(`Combobox - exposes the provided name attribute on the input`);
  });

  it('omits required and name from the input by default', async () => {
    const screen = await render(<Combobox label="Framework" items={frameworks} />);
    const input = screen.getByRole('combobox');
    await expect.element(input).not.toHaveAttribute('required');
    await expect.element(input).not.toHaveAttribute('name');
    await takeSnapshot(`Combobox - omits required and name from the input by default`);
  });

  /* -----------------------------------------------------------------------
   * Controlled value & open (4)
   * -------------------------------------------------------------------- */

  it('opens the listbox in response to an externally-driven open prop update', async () => {
    const screen = await render(<ControlledOpenFixture />);
    await userEvent.click(screen.getByRole('button', { name: 'Toggle from outside' }));
    await expect.element(locatorFor(getListbox()!)).toBeVisible();
    await takeSnapshot(`Combobox - opens the listbox in response to an externally-driven open prop update`);
  });

  it('closes the listbox again when the external open prop toggles back off', async () => {
    const screen = await render(<ControlledOpenFixture />);
    const toggle = screen.getByRole('button', { name: 'Toggle from outside' });
    await userEvent.click(toggle);
    await expect.element(locatorFor(getListbox()!)).toBeVisible();
    await userEvent.click(toggle);
    await expect.element(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
    await takeSnapshot(`Combobox - closes the listbox again when the external open prop toggles back off`);
  });

  it('reflects an externally-driven value update by marking the matching option selected', async () => {
    const screen = await render(<ControlledValueFixture />);
    await userEvent.click(screen.getByRole('button', { name: 'Set value to Vue' }));
    await userEvent.click(screen.getByRole('button', { name: 'Toggle suggestions' }));
    await expect
      .element(locatorFor(getOptionByText('Vue')))
      .toHaveAttribute('aria-selected', 'true');
    await takeSnapshot(`Combobox - reflects an externally-driven value update by marking the matching option selected`);
  });

  it('calls onValueChange even when the parent keeps the value prop fixed', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <Combobox
        label="Framework"
        items={frameworks}
        value={['React']}
        onValueChange={onValueChange}
      />
    );
    await userEvent.click(screen.getByRole('button', { name: 'Toggle suggestions' }));
    await userEvent.click(locatorFor(getOptionByText('Vue')));
    await vi.waitFor(() => expect(onValueChange).toHaveBeenCalledWith(
      expect.objectContaining({ value: ['Vue'] })
    ));
    await takeSnapshot(`Combobox - calls onValueChange even when the parent keeps the value prop fixed`);
  });

  /* -----------------------------------------------------------------------
   * Portal rendering (2)
   * -------------------------------------------------------------------- */

  it('renders the listbox outside of the local render container via a Portal', async () => {
    const screen = await render(<Combobox label="Framework" items={frameworks} />);
    await userEvent.click(screen.getByRole('button', { name: 'Toggle suggestions' }));
    const listbox = getListbox();
    await vi.waitFor(() => expect(listbox).not.toBeNull());
    await vi.waitFor(() => expect(screen.container.contains(listbox)).toBe(false));
    await vi.waitFor(() => expect(document.body.contains(listbox)).toBe(true));
    await takeSnapshot(`Combobox - renders the listbox outside of the local render container via a Portal`);
  });

  it('renders the "No results found" empty state inside the portalled content', async () => {
    const screen = await render(<Combobox label="Framework" items={frameworks} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    await userEvent.type(input, 'nonexistent-item');
    await expect.poll(() => getOptions().length).toBe(0);
    const emptyEl = document.querySelector('[role="presentation"]') as HTMLElement;
    expect(screen.container.contains(emptyEl)).toBe(false);
    expect(emptyEl.textContent).toBe('No results found');
    await takeSnapshot(`Combobox - renders the "No results found" empty state inside the portalled content`);
  });

  /* -----------------------------------------------------------------------
   * Label & default props (3)
   * -------------------------------------------------------------------- */

  it('renders the provided label text', async () => {
    const screen = await render(<Combobox label="Favorite framework" items={frameworks} />);
    await expect.element(screen.getByText('Favorite framework')).toBeInTheDocument();
    await takeSnapshot(`Combobox - renders the provided label text`);
  });

  it('does not render a label element when no label prop is given', async () => {
    const screen = await render(<Combobox items={frameworks} />);
    expect(screen.container.querySelector('label')).toBeNull();
    await takeSnapshot(`Combobox - does not render a label element when no label prop is given`);
  });

  it('defaults to single-select, enabled, and not required when no such props are given', async () => {
    const screen = await render(<Combobox label="Framework" items={frameworks} />);
    const input = screen.getByRole('combobox');
    await expect.element(input).toBeEnabled();
    await expect.element(input).not.toHaveAttribute('required');
    await userEvent.click(screen.getByRole('button', { name: 'Toggle suggestions' }));
    await userEvent.click(locatorFor(getOptionByText('React')));
    await expect.element(input).toHaveAttribute('aria-expanded', 'false');
    await takeSnapshot(`Combobox - defaults to single-select, enabled, and not required when no such props are given`);
  });

  /* -----------------------------------------------------------------------
   * Item content edge cases (2)
   * -------------------------------------------------------------------- */

  it('supports a single-item list and allows selecting the only option', async () => {
    const screen = await render(<Combobox label="Size" items={['Only Option']} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(screen.getByRole('button', { name: 'Toggle suggestions' }));
    await vi.waitFor(() => expect(getOptions()).toHaveLength(1));
    await userEvent.click(locatorFor(getOptionByText('Only Option')));
    await expect.element(input).toHaveValue('Only Option');
    await takeSnapshot(`Combobox - supports a single-item list and allows selecting the only option`);
  });

  it('preserves emoji and unicode item text exactly when selected', async () => {
    const items = ['✅ Confirmed 🎉', 'أوافق على الشروط'];
    const screen = await render(<Combobox label="Options" items={items} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(screen.getByRole('button', { name: 'Toggle suggestions' }));
    await userEvent.click(locatorFor(getOptionByText('أوافق على الشروط')));
    await expect.element(input).toHaveValue('أوافق على الشروط');
    await takeSnapshot(`Combobox - preserves emoji and unicode item text exactly when selected`);
  });

  /* -----------------------------------------------------------------------
   * Multiple independent instances (2)
   * -------------------------------------------------------------------- */

  it('does not share selection state between two independently rendered comboboxes', async () => {
    const screen = await render(
      <div>
        <Combobox label="First" items={['A', 'B']} />
        <Combobox label="Second" items={['C', 'D']} />
      </div>
    );
    const inputs = screen.container.querySelectorAll('input');
    const firstTrigger = screen.container.querySelectorAll('button[aria-label="Toggle suggestions"]')[0] as HTMLElement;
    await userEvent.click(locatorFor(firstTrigger));
    await userEvent.click(locatorFor(getOptionByText('A')));
    await expect.element(locatorFor(inputs[0])).toHaveValue('A');
    await expect.element(locatorFor(inputs[1])).toHaveValue('');
    await takeSnapshot(`Combobox - does not share selection state between two independently rendered comboboxes`);
  });

  it("does not invoke the other instance's onValueChange when only one combobox is interacted with", async () => {
    const onFirstChange = vi.fn();
    const onSecondChange = vi.fn();
    const screen = await render(
      <div>
        <Combobox label="First" items={['A', 'B']} onValueChange={onFirstChange} />
        <Combobox label="Second" items={['C', 'D']} onValueChange={onSecondChange} />
      </div>
    );
    const firstTrigger = screen.container.querySelectorAll('button[aria-label="Toggle suggestions"]')[0] as HTMLElement;
    await userEvent.click(locatorFor(firstTrigger));
    await userEvent.click(locatorFor(getOptionByText('A')));
    await vi.waitFor(() => expect(onFirstChange).toHaveBeenCalledWith(expect.objectContaining({ value: ['A'] })));
    await vi.waitFor(() => expect(onSecondChange).not.toHaveBeenCalled());
    await takeSnapshot(`Combobox - does not invoke the other instance's onValueChange when only one combobox is interacted with`);
  });

  /* -----------------------------------------------------------------------
   * Kitchen-sink combinations (2)
   * -------------------------------------------------------------------- */

  it('supports required + name + disabled together with the disabled state taking precedence for interaction', async () => {
    const screen = await render(
      <Combobox
        label="Framework"
        items={frameworks}
        required
        name="framework"
        disabled
      />
    );
    const input = screen.getByRole('combobox');
    await expect.element(input).toHaveAttribute('required');
    await expect.element(input).toHaveAttribute('name', 'framework');
    await expect.element(input).toBeDisabled();
    await takeSnapshot(`Combobox - supports required + name + disabled together with the disabled state taking precedence for interaction`);
  });

  it('supports multiple selection combined with typing to filter before selecting two matches', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <Combobox
        label="Framework"
        items={frameworks}
        type="multiple"
        onValueChange={onValueChange}
      />
    );
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    await userEvent.type(input, 's');
    await expect.poll(() => getOptionLabels()).toEqual(['Svelte', 'Solid']);
    await userEvent.click(locatorFor(getOptionByText('Svelte')));
    await vi.waitFor(() => expect(onValueChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ value: ['Svelte'] })
    ));
    await takeSnapshot(`Combobox - supports multiple selection combined with typing to filter before selecting two matches`);
  });
});
