import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent, page } from 'vitest/browser';
import { useState } from 'react';
import Select, { type SelectItem } from './Select';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

const frameworks: SelectItem[] = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Solid', value: 'solid' },
];

const disabledFrameworks: SelectItem[] = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue', disabled: true },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
];

const manyItems: SelectItem[] = Array.from({ length: 20 }, (_, i) => ({
  label: `Item ${i + 1}`,
  value: `item-${i + 1}`,
}));

/** Wraps a raw HTMLElement into a Locator so jest-dom-style matchers can be used. */
const locatorFor = (element: HTMLElement) => page.elementLocator(element);

/** The hidden native <select> rendered for form submission is the only <select> in the DOM. */
const getHiddenSelect = (container: HTMLElement) =>
  container.querySelector('select') as HTMLSelectElement;

/** The dropdown is teleported into a Portal (document.body), so query the whole page for it. */
const getListbox = () => page.getByRole('listbox');
const getOption = (name: string) => page.getByRole('option', { name });

/**
 * Small stateful fixture mirroring the "controlled select" usage pattern
 * from the stories, used to exercise real external state updates.
 */
const ControlledValueFixture = ({
  initialValue = [],
}: {
  initialValue?: string[];
}) => {
  const [value, setValue] = useState<string[]>(initialValue);

  return (
    <>
      <Select
        items={frameworks}
        value={value}
        onValueChange={(details) => setValue(details.value)}
      >
        Framework
      </Select>
      <button onClick={() => setValue(['angular'])}>Set to Angular</button>
    </>
  );
};

/** Fixture exercising a fully controlled `open` prop driven by outside state. */
const ControlledOpenFixture = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Select
        items={frameworks}
        open={open}
        onOpenChange={(details) => setOpen(details.open)}
      >
        Framework
      </Select>
      <button onClick={() => setOpen((current) => !current)}>
        Toggle open
      </button>
    </>
  );
};

describe('Select', () => {
  /* -----------------------------------------------------------------------
   * Default rendering (3)
   * -------------------------------------------------------------------- */

  it('renders the provided label text', async () => {
    const screen = await render(<Select items={frameworks}>Framework</Select>);
    await expect.element(screen.getByText('Framework')).toBeInTheDocument();
    await takeSnapshot(`Select - renders the provided label text`);
  });

  it('shows the default placeholder text when no value is selected', async () => {
    const screen = await render(<Select items={frameworks}>Framework</Select>);
    await expect
      .element(screen.getByText('Select an option'))
      .toBeInTheDocument();
    await takeSnapshot(`Select - shows the default placeholder text when no value is selected`);
  });

  it('does not render an open listbox by default', async () => {
    await render(<Select items={frameworks}>Framework</Select>);
    await expect.element(getListbox()).not.toBeInTheDocument();
    await takeSnapshot(`Select - does not render an open listbox by default`);
  });

  /* -----------------------------------------------------------------------
   * `open` prop initial state (2)
   * -------------------------------------------------------------------- */

  it('renders the listbox open when the open prop starts as true', async () => {
    await render(
      <Select items={frameworks} open>
        Framework
      </Select>
    );
    await expect.element(getListbox()).toBeInTheDocument();
    await takeSnapshot(`Select - renders the listbox open when the open prop starts as true`);
  });

  it('marks the trigger as expanded when open is initially true', async () => {
    const screen = await render(
      <Select items={frameworks} open>
        Framework
      </Select>
    );
    const trigger = screen.getByRole('combobox');
    await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');
    await takeSnapshot(`Select - marks the trigger as expanded when open is initially true`);
  });

  /* -----------------------------------------------------------------------
   * Disabled select (3)
   * -------------------------------------------------------------------- */

  it('marks the trigger button as disabled', async () => {
    const screen = await render(
      <Select items={frameworks} disabled>
        Framework
      </Select>
    );
    const trigger = screen.getByRole('combobox');
    await expect.element(trigger).toBeDisabled();
    await takeSnapshot(`Select - marks the trigger button as disabled`);
  });

  it('marks the hidden select as disabled', async () => {
    const screen = await render(
      <Select items={frameworks} disabled>
        Framework
      </Select>
    );
    await expect
      .element(locatorFor(getHiddenSelect(screen.container)))
      .toBeDisabled();
    await takeSnapshot(`Select - marks the hidden select as disabled`);
  });

  it('does not open the listbox when a disabled trigger is clicked', async () => {
    const screen = await render(
      <Select items={frameworks} disabled>
        Framework
      </Select>
    );
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger, { force: true });
    await expect.element(getListbox()).not.toBeInTheDocument();
    await takeSnapshot(`Select - does not open the listbox when a disabled trigger is clicked`);
  });

  /* -----------------------------------------------------------------------
   * Disabled items rendering (2)
   * -------------------------------------------------------------------- */

  it('marks a disabled item with aria-disabled inside the listbox', async () => {
    await render(
      <Select items={disabledFrameworks} open>
        Framework
      </Select>
    );
    await expect
      .element(getOption('Vue'))
      .toHaveAttribute('aria-disabled', 'true');
    await takeSnapshot(`Select - marks a disabled item with aria-disabled inside the listbox`);
  });

  it('renders the corresponding disabled option in the hidden select', async () => {
    const screen = await render(
      <Select items={disabledFrameworks}>Framework</Select>
    );
    const hiddenOption = getHiddenSelect(screen.container).querySelector(
      'option[value="vue"]'
    ) as HTMLOptionElement;
    expect(hiddenOption.disabled).toBe(true);
    await takeSnapshot(`Select - renders the corresponding disabled option in the hidden select`);
  });

  /* -----------------------------------------------------------------------
   * Required (2)
   * -------------------------------------------------------------------- */

  it('marks the hidden select as required when required is true', async () => {
    const screen = await render(
      <Select items={frameworks} required>
        Framework
      </Select>
    );
    await expect
      .element(locatorFor(getHiddenSelect(screen.container)))
      .toHaveAttribute('required');
    await takeSnapshot(`Select - marks the hidden select as required when required is true`);
  });

  it('does not mark the hidden select as required by default', async () => {
    const screen = await render(<Select items={frameworks}>Framework</Select>);
    await expect
      .element(locatorFor(getHiddenSelect(screen.container)))
      .not.toHaveAttribute('required');
    await takeSnapshot(`Select - does not mark the hidden select as required by default`);
  });

  /* -----------------------------------------------------------------------
   * Name / hidden select mirrors value (3)
   * -------------------------------------------------------------------- */

  it('exposes the provided name attribute on the hidden select', async () => {
    const screen = await render(
      <Select items={frameworks} name="framework">
        Framework
      </Select>
    );
    await expect
      .element(locatorFor(getHiddenSelect(screen.container)))
      .toHaveAttribute('name', 'framework');
    await takeSnapshot(`Select - exposes the provided name attribute on the hidden select`);
  });

  it('mirrors the selected item value onto the hidden select after clicking an option', async () => {
    const screen = await render(<Select items={frameworks} open>Framework</Select>);
    await userEvent.click(getOption('Angular'));
    const hiddenSelect = getHiddenSelect(screen.container);
    await vi.waitFor(() => expect(hiddenSelect.value).toBe('angular'));
    await takeSnapshot(`Select - mirrors the selected item value onto the hidden select after clicking an option`);
  });

  it('renders one hidden <option> per item, in the same order as the items array', async () => {
    const screen = await render(<Select items={frameworks}>Framework</Select>);
    const options = Array.from(
      getHiddenSelect(screen.container).querySelectorAll('option')
    ).filter((o) => o.value !== '');
    expect(options.map((o) => o.value)).toEqual(
      frameworks.map((item) => item.value)
    );
    await takeSnapshot(`Select - renders one hidden <option> per item, in the same order as the items array`);
  });

  /* -----------------------------------------------------------------------
   * Multiple selection type (3)
   * -------------------------------------------------------------------- */

  it('marks the hidden select as multiple when type is "multiple"', async () => {
    const screen = await render(
      <Select items={frameworks} type="multiple">
        Frameworks
      </Select>
    );
    const hiddenSelect = getHiddenSelect(screen.container);
    expect(hiddenSelect.multiple).toBe(true);
    await takeSnapshot(`Select - marks the hidden select as multiple when type is "multiple"`);
  });

  it('marks the listbox as aria-multiselectable when type is "multiple"', async () => {
    await render(
      <Select items={frameworks} type="multiple" open>
        Frameworks
      </Select>
    );
    await expect
      .element(getListbox())
      .toHaveAttribute('aria-multiselectable', 'true');
    await takeSnapshot(`Select - marks the listbox as aria-multiselectable when type is "multiple"`);
  });

  it('keeps both items selected after clicking two options in multiple mode', async () => {
    await render(
      <Select items={frameworks} type="multiple" open>
        Frameworks
      </Select>
    );
    await userEvent.click(getOption('React'));
    await userEvent.click(getOption('Vue'));
    await expect.element(getOption('React')).toHaveAttribute('aria-selected', 'true');
    await expect.element(getOption('Vue')).toHaveAttribute('aria-selected', 'true');
    await takeSnapshot(`Select - keeps both items selected after clicking two options in multiple mode`);
  });

  /* -----------------------------------------------------------------------
   * Controlled value (2)
   * -------------------------------------------------------------------- */

  it('reflects an external value update pushed down through the value prop', async () => {
    const screen = await render(<ControlledValueFixture />);
    const trigger = screen.getByRole('combobox');
    await expect.element(trigger).toHaveTextContent('Select an option');
    await userEvent.click(screen.getByRole('button', { name: 'Set to Angular' }));
    await expect.element(trigger).toHaveTextContent('Angular');
    await takeSnapshot(`Select - reflects an external value update pushed down through the value prop`);
  });

  it('calls onValueChange when an item is clicked even if the parent keeps value fixed', async () => {
    const onValueChange = vi.fn();
    await render(
      <Select items={frameworks} value={[]} onValueChange={onValueChange} open>
        Framework
      </Select>
    );
    await userEvent.click(getOption('Svelte'));
    await vi.waitFor(() => expect(onValueChange).toHaveBeenCalledWith(
      expect.objectContaining({ value: ['svelte'] })
    ));
    await takeSnapshot(`Select - calls onValueChange when an item is clicked even if the parent keeps value fixed`);
  });

  /* -----------------------------------------------------------------------
   * Controlled open (2)
   * -------------------------------------------------------------------- */

  it('opens the listbox in response to an externally driven open prop change', async () => {
    const screen = await render(<ControlledOpenFixture />);
    await expect.element(getListbox()).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Toggle open' }));
    await expect.element(getListbox()).toBeInTheDocument();
    await takeSnapshot(`Select - opens the listbox in response to an externally driven open prop change`);
  });

  it('calls onOpenChange when the trigger is clicked while open is externally controlled', async () => {
    const onOpenChange = vi.fn();
    const screen = await render(
      <Select items={frameworks} open={false} onOpenChange={onOpenChange}>
        Framework
      </Select>
    );
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);
    await vi.waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(
      expect.objectContaining({ open: true })
    ));
    await takeSnapshot(`Select - calls onOpenChange when the trigger is clicked while open is externally controlled`);
  });

  /* -----------------------------------------------------------------------
   * Open/close interactions (4)
   * -------------------------------------------------------------------- */

  it('opens the listbox when the trigger is clicked', async () => {
    const screen = await render(<Select items={frameworks}>Framework</Select>);
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);
    await expect.element(getListbox()).toBeInTheDocument();
    await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');
    await takeSnapshot(`Select - opens the listbox when the trigger is clicked`);
  });

  it('closes the listbox when the trigger is clicked again', async () => {
    const screen = await render(<Select items={frameworks}>Framework</Select>);
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);
    await expect.element(getListbox()).toBeInTheDocument();
    await userEvent.click(trigger);
    await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');
    await takeSnapshot(`Select - closes the listbox when the trigger is clicked again`);
  });

  it('closes the listbox when Escape is pressed', async () => {
    const screen = await render(<Select items={frameworks}>Framework</Select>);
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);
    await expect.element(getListbox()).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');
    await takeSnapshot(`Select - closes the listbox when Escape is pressed`);
  });

  it('closes the listbox when clicking outside of it', async () => {
    const screen = await render(
      <div>
        <Select items={frameworks}>Framework</Select>
        <button style={{ position: 'fixed', top: 0, left: 0 }}>Outside</button>
      </div>
    );
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);
    await expect.element(getListbox()).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Outside' }));
    await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');
    await takeSnapshot(`Select - closes the listbox when clicking outside of it`);
  });

  /* -----------------------------------------------------------------------
   * Selecting items (3)
   * -------------------------------------------------------------------- */

  it('selects an item on click and closes the listbox in single-selection mode', async () => {
    const screen = await render(<Select items={frameworks}>Framework</Select>);
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);
    await userEvent.click(getOption('Vue'));
    await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect.element(trigger).toHaveTextContent('Vue');
    await takeSnapshot(`Select - selects an item on click and closes the listbox in single-selection mode`);
  });

  it('keeps the listbox open after selecting an item in multiple-selection mode', async () => {
    const screen = await render(
      <Select items={frameworks} type="multiple" open>
        Frameworks
      </Select>
    );
    const trigger = screen.getByRole('combobox');
    await userEvent.click(getOption('React'));
    await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');
    await takeSnapshot(`Select - keeps the listbox open after selecting an item in multiple-selection mode`);
  });

  it('does not change the value when a disabled item is clicked', async () => {
    const onValueChange = vi.fn();
    await render(
      <Select items={disabledFrameworks} onValueChange={onValueChange} open>
        Framework
      </Select>
    );
    await userEvent.click(getOption('Vue'), { force: true });
    await vi.waitFor(() => expect(onValueChange).not.toHaveBeenCalled());
    await takeSnapshot(`Select - does not change the value when a disabled item is clicked`);
  });

  /* -----------------------------------------------------------------------
   * Keyboard navigation (6)
   * -------------------------------------------------------------------- */

  it('highlights the first item after pressing ArrowDown once the listbox is open', async () => {
    const screen = await render(<Select items={frameworks}>Framework</Select>);
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.keyboard('{ArrowDown}');
    await expect.element(getOption('React')).toHaveAttribute('data-highlighted');
    await takeSnapshot(`Select - highlights the first item after pressing ArrowDown once the listbox is open`);
  });

  it('moves the highlight to the next item on a second ArrowDown press', async () => {
    const screen = await render(<Select items={frameworks}>Framework</Select>);
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowDown}');
    await expect.element(getOption('Vue')).toHaveAttribute('data-highlighted');
    await takeSnapshot(`Select - moves the highlight to the next item on a second ArrowDown press`);
  });

  it('opens the listbox with the last item highlighted when ArrowUp is pressed while closed', async () => {
    const screen = await render(<Select items={frameworks}>Framework</Select>);
    const trigger = screen.getByRole('combobox');
    trigger.element().focus();
    await userEvent.keyboard('{ArrowUp}');
    await expect.element(getOption('Solid')).toHaveAttribute('data-highlighted');
    await takeSnapshot(`Select - opens the listbox with the last item highlighted when ArrowUp is pressed while closed`);
  });

  it('jumps the highlight to the first item when Home is pressed', async () => {
    const screen = await render(<Select items={frameworks}>Framework</Select>);
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.keyboard('{End}');
    await userEvent.keyboard('{Home}');
    await expect.element(getOption('React')).toHaveAttribute('data-highlighted');
    await takeSnapshot(`Select - jumps the highlight to the first item when Home is pressed`);
  });

  it('jumps the highlight to the last item when End is pressed', async () => {
    const screen = await render(<Select items={frameworks}>Framework</Select>);
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.keyboard('{End}');
    await expect.element(getOption('Solid')).toHaveAttribute('data-highlighted');
    await takeSnapshot(`Select - jumps the highlight to the last item when End is pressed`);
  });

  it('skips disabled items while navigating with ArrowDown', async () => {
    await render(<Select items={disabledFrameworks}>Framework</Select>);
    await userEvent.click(page.getByRole('combobox'));
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowDown}');
    await expect.element(getOption('Angular')).toHaveAttribute('data-highlighted');
    await expect.element(getOption('Vue')).not.toHaveAttribute('data-highlighted');
    await takeSnapshot(`Select - skips disabled items while navigating with ArrowDown`);
  });

  /* -----------------------------------------------------------------------
   * Keyboard selection + typeahead (3)
   * -------------------------------------------------------------------- */

  it('selects the highlighted item and closes the listbox when Enter is pressed', async () => {
    const screen = await render(<Select items={frameworks}>Framework</Select>);
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Enter}');
    await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect.element(trigger).toHaveTextContent('React');
    await takeSnapshot(`Select - selects the highlighted item and closes the listbox when Enter is pressed`);
  });

  it('selects the highlighted item with Space and keeps the listbox open in multiple mode', async () => {
    const screen = await render(
      <Select items={frameworks} type="multiple">
        Frameworks
      </Select>
    );
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard(' ');
    await expect.element(getOption('React')).toHaveAttribute('aria-selected', 'true');
    await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');
    await takeSnapshot(`Select - selects the highlighted item with Space and keeps the listbox open in multiple mode`);
  });

  it('jumps the highlight to the item matching a typed letter (typeahead)', async () => {
    const screen = await render(<Select items={frameworks}>Framework</Select>);
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.keyboard('a');
    await expect.element(getOption('Angular')).toHaveAttribute('data-highlighted');
    await takeSnapshot(`Select - jumps the highlight to the item matching a typed letter (typeahead)`);
  });

  /* -----------------------------------------------------------------------
   * Portal rendering (1)
   * -------------------------------------------------------------------- */

  it('renders the listbox outside of the component subtree via a Portal', async () => {
    const screen = await render(<Select items={frameworks} open>Framework</Select>);
    const listboxInContainer = screen.container.querySelector('[role="listbox"]');
    expect(listboxInContainer).toBeNull();
    await expect.element(getListbox()).toBeInTheDocument();
    await takeSnapshot(`Select - renders the listbox outside of the component subtree via a Portal`);
  });

  /* -----------------------------------------------------------------------
   * Item checkmark indicator (2)
   * -------------------------------------------------------------------- */

  it('hides the item indicator checkmark for an unselected item', async () => {
    await render(<Select items={frameworks} open>Framework</Select>);
    const indicator = getOption('React').element().querySelector(
      '[data-part="item-indicator"]'
    ) as HTMLElement;
    expect(indicator.hasAttribute('hidden')).toBe(true);
    await takeSnapshot(`Select - hides the item indicator checkmark for an unselected item`);
  });

  it('shows the item indicator checkmark once an item is selected', async () => {
    await render(
      <Select items={frameworks} value={['react']} open>
        Framework
      </Select>
    );
    const indicator = getOption('React').element().querySelector(
      '[data-part="item-indicator"]'
    ) as HTMLElement;
    expect(indicator.hasAttribute('hidden')).toBe(false);
    await takeSnapshot(`Select - shows the item indicator checkmark once an item is selected`);
  });

  /* -----------------------------------------------------------------------
   * Placeholder / value text display (2)
   * -------------------------------------------------------------------- */

  it('displays a custom placeholder when provided and no value is selected', async () => {
    const screen = await render(
      <Select items={frameworks} placeholder="Choose one...">
        Framework
      </Select>
    );
    await expect.element(screen.getByText('Choose one...')).toBeInTheDocument();
    await takeSnapshot(`Select - displays a custom placeholder when provided and no value is selected`);
  });

  it('displays the selected item label instead of the placeholder after selection', async () => {
    const screen = await render(<Select items={frameworks} value={['angular']}>Framework</Select>);
    const trigger = screen.getByRole('combobox');
    await expect.element(trigger).toHaveTextContent('Angular');
    await expect.element(trigger).not.toHaveTextContent('Select an option');
    await takeSnapshot(`Select - displays the selected item label instead of the placeholder after selection`);
  });

  /* -----------------------------------------------------------------------
   * Kitchen-sink combos (2)
   * -------------------------------------------------------------------- */

  it('renders correctly with required, multiple, named, and a preset value together', async () => {
    const screen = await render(
      <Select
        items={frameworks}
        type="multiple"
        required
        name="kitchenSink"
        value={['react', 'vue']}
      >
        Frameworks
      </Select>
    );
    const hiddenSelect = getHiddenSelect(screen.container);
    expect(hiddenSelect.multiple).toBe(true);
    await expect.element(locatorFor(hiddenSelect)).toHaveAttribute('required');
    await expect.element(locatorFor(hiddenSelect)).toHaveAttribute('name', 'kitchenSink');
    await expect.element(screen.getByRole('combobox')).toHaveTextContent('React, Vue');
    await takeSnapshot(`Select - renders correctly with required, multiple, named, and a preset value together`);
  });

  it('renders correctly with disabled, a preselected value, and disabled items combined', async () => {
    const screen = await render(
      <Select items={disabledFrameworks} disabled value={['react']} required name="kitchenSinkDisabled">
        Framework
      </Select>
    );
    const trigger = screen.getByRole('combobox');
    await expect.element(trigger).toBeDisabled();
    await expect.element(trigger).toHaveTextContent('React');
    await expect
      .element(locatorFor(getHiddenSelect(screen.container)))
      .toHaveAttribute('name', 'kitchenSinkDisabled');
    await takeSnapshot(`Select - renders correctly with disabled, a preselected value, and disabled items combined`);
  });

  /* -----------------------------------------------------------------------
   * Item count edge cases (2)
   * -------------------------------------------------------------------- */

  it('renders correctly with a single-item collection', async () => {
    await render(
      <Select items={[{ label: 'Only Option', value: 'only' }]} open>
        Single
      </Select>
    );
    await expect.element(getOption('Only Option')).toBeInTheDocument();
    await takeSnapshot(`Select - renders correctly with a single-item collection`);
  });

  it('renders every item in a large collection inside the listbox', async () => {
    await render(<Select items={manyItems} open>Many</Select>);
    await expect
      .element(page.getByRole('option', { name: 'Item 1', exact: true }))
      .toBeInTheDocument();
    await expect
      .element(page.getByRole('option', { name: 'Item 20', exact: true }))
      .toBeInTheDocument();
    await takeSnapshot(`Select - renders every item in a large collection inside the listbox`);
  });

  /* -----------------------------------------------------------------------
   * Form submission (1)
   * -------------------------------------------------------------------- */

  it('includes the selected value in FormData when the form is submitted', async () => {
    let captured: Record<string, FormDataEntryValue> = {};
    const screen = await render(
      <form
        onSubmit={(e) => {
          e.preventDefault();
          captured = Object.fromEntries(new FormData(e.currentTarget));
        }}
      >
        <Select items={frameworks} name="framework">
          Framework
        </Select>
        <button type="submit">Submit</button>
      </form>
    );
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(getOption('Svelte'));
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    await vi.waitFor(() => expect(captured.framework).toBe('svelte'));
    await takeSnapshot(`Select - includes the selected value in FormData when the form is submitted`);
  });

  /* -----------------------------------------------------------------------
   * Accessibility roles + Tab focus (2)
   * -------------------------------------------------------------------- */

  it('exposes combobox/listbox/option roles with the expected aria attributes', async () => {
    const screen = await render(<Select items={frameworks} open>Framework</Select>);
    const trigger = screen.getByRole('combobox');
    await expect.element(trigger).toHaveAttribute('aria-haspopup', 'listbox');
    await expect.element(getListbox()).toBeInTheDocument();
    await expect.element(getOption('React')).toHaveAttribute('role', 'option');
    await takeSnapshot(`Select - exposes combobox/listbox/option roles with the expected aria attributes`);
  });

  it('moves focus to the trigger via Tab', async () => {
    const screen = await render(<Select items={frameworks}>Framework</Select>);
    const trigger = screen.getByRole('combobox');
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    await vi.waitFor(() => expect(document.activeElement).toBe(trigger.element()));
    await takeSnapshot(`Select - moves focus to the trigger via Tab`);
  });
});
