import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent, page } from 'vitest/browser';
import { useState } from 'react';
import RadioGroup from './RadioGroup';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

/**
 * Small stateful fixture mirroring the "controlled radio group" usage
 * pattern from the stories, used to exercise real external state updates (as
 * opposed to just spy call counts).
 */
const ControlledToggleFixture = ({
  initialValue = 'a',
}: {
  initialValue?: string;
}) => {
  const [value, setValue] = useState(initialValue);

  return (
    <>
      <RadioGroup
        value={value}
        onValueChange={(details) => {
          if (details.value) setValue(details.value);
        }}
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
      >
        Controlled fixture
      </RadioGroup>
      <button onClick={() => setValue('b')}>Set to B externally</button>
    </>
  );
};

/** Wraps a raw HTMLElement into a Locator so jest-dom matchers can be used. */
const locatorFor = (element: HTMLElement) => page.elementLocator(element);

/** The root is the outer div with role="radiogroup". */
const getRoot = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement;

/** All the <label> elements wrapping each radio item, in option order. */
const getItemLabels = (container: HTMLElement) =>
  container.querySelectorAll('label[data-part="item"]');

/** All the raw <input type="radio"> elements, in option order. */
const getRadioInputs = (container: HTMLElement) =>
  container.querySelectorAll('input[type="radio"]');

describe('RadioGroup', () => {
  /* -----------------------------------------------------------------------
   * Default rendering & structure (4)
   * -------------------------------------------------------------------- */

  it('renders a root with role radiogroup and vertical orientation by default', async () => {
    const screen = await render(
      <RadioGroup
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
      />
    );
    const group = screen.getByRole('radiogroup');
    await expect.element(group).toHaveAttribute('aria-orientation', 'vertical');
    await takeSnapshot(`RadioGroup - renders a root with role radiogroup and vertical orientation by default`);
  });

  it('renders one radio input per option with matching accessible names', async () => {
    const screen = await render(
      <RadioGroup
        options={[
          { label: 'React', value: 'react' },
          { label: 'Vue', value: 'vue' },
          { label: 'Angular', value: 'angular' },
        ]}
      />
    );
    await expect
      .element(screen.getByRole('radio', { name: 'React' }))
      .toBeInTheDocument();
    await expect
      .element(screen.getByRole('radio', { name: 'Vue' }))
      .toBeInTheDocument();
    await expect
      .element(screen.getByRole('radio', { name: 'Angular' }))
      .toBeInTheDocument();
    expect(getRadioInputs(screen.container).length).toBe(3);
    await takeSnapshot(`RadioGroup - renders one radio input per option with matching accessible names`);
  });

  it('does not render a group label element when no children are provided', async () => {
    const screen = await render(
      <RadioGroup options={[{ label: 'A', value: 'a' }]} />
    );
    expect(
      screen.container.querySelector('[data-part="label"]')
    ).toBeNull();
    await takeSnapshot(`RadioGroup - does not render a group label element when no children are provided`);
  });

  it('renders the group label text and a trailing asterisk when required and children are provided', async () => {
    const screen = await render(
      <RadioGroup options={[{ label: 'A', value: 'a' }]} required>
        Pick an option
      </RadioGroup>
    );
    await expect
      .element(screen.getByText('Pick an option'))
      .toBeInTheDocument();
    await expect.element(screen.getByText('*')).toBeInTheDocument();
    await takeSnapshot(`RadioGroup - renders the group label text and a trailing asterisk when required and children are provided`);
  });

  /* -----------------------------------------------------------------------
   * Selected state / defaultValue / value (4)
   * -------------------------------------------------------------------- */

  it('marks the option matching defaultValue as checked', async () => {
    const screen = await render(
      <RadioGroup
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
        defaultValue="b"
      />
    );
    await expect
      .element(screen.getByRole('radio', { name: 'A' }))
      .not.toBeChecked();
    await expect
      .element(screen.getByRole('radio', { name: 'B' }))
      .toBeChecked();
    await takeSnapshot(`RadioGroup - marks the option matching defaultValue as checked`);
  });

  it('leaves every option unchecked when neither value nor defaultValue is provided', async () => {
    const screen = await render(
      <RadioGroup
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
      />
    );
    const radios = getRadioInputs(screen.container);
    radios.forEach((radio) => {
      expect((radio as HTMLInputElement).checked).toBe(false);
    });
    await takeSnapshot(`RadioGroup - leaves every option unchecked when neither value nor defaultValue is provided`);
  });

  it('marks the option matching a controlled value prop as checked', async () => {
    const screen = await render(
      <RadioGroup
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
        value="a"
      />
    );
    await expect
      .element(screen.getByRole('radio', { name: 'A' }))
      .toBeChecked();
    await takeSnapshot(`RadioGroup - marks the option matching a controlled value prop as checked`);
  });

  it('leaves every option visually unchecked when value matches no option', async () => {
    const screen = await render(
      <RadioGroup
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
        value="does-not-exist"
      />
    );
    const labels = getItemLabels(screen.container);
    labels.forEach((label) => {
      expect(label.getAttribute('data-state')).toBe('unchecked');
    });
    await takeSnapshot(`RadioGroup - leaves every option visually unchecked when value matches no option`);
  });

  /* -----------------------------------------------------------------------
   * Controlled vs uncontrolled interaction (4)
   * -------------------------------------------------------------------- */

  it('uncontrolled: clicking an option checks it and calls onValueChange', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <RadioGroup
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
        onValueChange={onValueChange}
      />
    );
    await userEvent.click(screen.getByText('B'));
    await expect
      .element(screen.getByRole('radio', { name: 'B' }))
      .toBeChecked();
    expect(onValueChange).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'b' })
    );
    await takeSnapshot(`RadioGroup - uncontrolled: clicking an option checks it and calls onValueChange`);
  });

  it('uncontrolled: clicking a different option switches the checked item', async () => {
    const screen = await render(
      <RadioGroup
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
        defaultValue="a"
      />
    );
    await userEvent.click(screen.getByText('B'));
    await expect
      .element(screen.getByRole('radio', { name: 'A' }))
      .not.toBeChecked();
    await expect
      .element(screen.getByRole('radio', { name: 'B' }))
      .toBeChecked();
    await takeSnapshot(`RadioGroup - uncontrolled: clicking a different option switches the checked item`);
  });

  it('controlled: an external state update flips the checked option', async () => {
    const screen = await render(<ControlledToggleFixture />);
    await expect
      .element(screen.getByRole('radio', { name: 'A' }))
      .toBeChecked();

    await userEvent.click(
      screen.getByRole('button', { name: 'Set to B externally' })
    );

    await expect
      .element(screen.getByRole('radio', { name: 'B' }))
      .toBeChecked();
    await takeSnapshot(`RadioGroup - controlled: an external state update flips the checked option`);
  });

  it('controlled: clicking an option calls onValueChange but the visual selection stays locked to the value prop when the parent does not update state', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <RadioGroup
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
        value="a"
        onValueChange={onValueChange}
      />
    );
    await userEvent.click(screen.getByText('B'));
    await vi.waitFor(() => expect(onValueChange).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'b' })
    ));
    const labels = getItemLabels(screen.container);
    await vi.waitFor(() => expect(labels[0].getAttribute('data-state')).toBe('checked'));
    await vi.waitFor(() => expect(labels[1].getAttribute('data-state')).toBe('unchecked'));
    await takeSnapshot(`RadioGroup - controlled: clicking an option calls onValueChange but the visual selection stays locked to the value prop when the parent does not update state`);
  });

  /* -----------------------------------------------------------------------
   * onValueChange callback (3)
   * -------------------------------------------------------------------- */

  it('calls onValueChange with the clicked option value', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <RadioGroup
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
        onValueChange={onValueChange}
      />
    );
    await userEvent.click(screen.getByText('A'));
    await vi.waitFor(() => expect(onValueChange).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'a' })
    ));
    await takeSnapshot(`RadioGroup - calls onValueChange with the clicked option value`);
  });

  it('calls onValueChange exactly once per click', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <RadioGroup
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
        onValueChange={onValueChange}
      />
    );
    await userEvent.click(screen.getByText('A'));
    await vi.waitFor(() => expect(onValueChange).toHaveBeenCalledTimes(1));
    await takeSnapshot(`RadioGroup - calls onValueChange exactly once per click`);
  });

  it('does not throw when clicked without an onValueChange handler', async () => {
    const screen = await render(
      <RadioGroup
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
      />
    );
    await expect(
      userEvent.click(screen.getByText('A'))
    ).resolves.not.toThrow();
    await takeSnapshot(`RadioGroup - does not throw when clicked without an onValueChange handler`);
  });

  /* -----------------------------------------------------------------------
   * Disabled group (4)
   * -------------------------------------------------------------------- */

  it('disables every hidden radio input when the group is disabled', async () => {
    const screen = await render(
      <RadioGroup
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
        disabled
      />
    );
    const radios = getRadioInputs(screen.container);
    radios.forEach((radio) => {
      expect((radio as HTMLInputElement).disabled).toBe(true);
    });
    await takeSnapshot(`RadioGroup - disables every hidden radio input when the group is disabled`);
  });

  it('does not call onValueChange when a disabled group is clicked', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <RadioGroup
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
        disabled
        onValueChange={onValueChange}
      />
    );
    await userEvent.click(screen.getByText('A'), { force: true });
    await vi.waitFor(() => expect(onValueChange).not.toHaveBeenCalled());
    await takeSnapshot(`RadioGroup - does not call onValueChange when a disabled group is clicked`);
  });

  it('applies reduced opacity to a disabled item root', async () => {
    const screen = await render(
      <RadioGroup options={[{ label: 'A', value: 'a' }]} disabled />
    );
    const item = getItemLabels(screen.container)[0] as HTMLElement;
    await expect.element(locatorFor(item)).toHaveStyle({ opacity: '0.5' });
    await takeSnapshot(`RadioGroup - applies reduced opacity to a disabled item root`);
  });

  it('applies a not-allowed cursor to a disabled item root', async () => {
    const screen = await render(
      <RadioGroup options={[{ label: 'A', value: 'a' }]} disabled />
    );
    const item = getItemLabels(screen.container)[0] as HTMLElement;
    await expect
      .element(locatorFor(item))
      .toHaveStyle({ cursor: 'not-allowed' });
    await takeSnapshot(`RadioGroup - applies a not-allowed cursor to a disabled item root`);
  });

  /* -----------------------------------------------------------------------
   * Disabled individual items (3)
   * -------------------------------------------------------------------- */

  it('disables only the specific option whose disabled flag is true', async () => {
    const screen = await render(
      <RadioGroup
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b', disabled: true },
        ]}
      />
    );
    await expect
      .element(screen.getByRole('radio', { name: 'A' }))
      .toBeEnabled();
    await expect
      .element(screen.getByRole('radio', { name: 'B' }))
      .toBeDisabled();
    await takeSnapshot(`RadioGroup - disables only the specific option whose disabled flag is true`);
  });

  it('does not call onValueChange when a disabled individual item is clicked', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <RadioGroup
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b', disabled: true },
        ]}
        onValueChange={onValueChange}
      />
    );
    await userEvent.click(screen.getByText('B'), { force: true });
    await vi.waitFor(() => expect(onValueChange).not.toHaveBeenCalled());
    await takeSnapshot(`RadioGroup - does not call onValueChange when a disabled individual item is clicked`);
  });

  it('still allows selecting a different, non-disabled option when one item is disabled', async () => {
    const screen = await render(
      <RadioGroup
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b', disabled: true },
          { label: 'C', value: 'c' },
        ]}
      />
    );
    await userEvent.click(screen.getByText('C'));
    await expect
      .element(screen.getByRole('radio', { name: 'C' }))
      .toBeChecked();
    await takeSnapshot(`RadioGroup - still allows selecting a different, non-disabled option when one item is disabled`);
  });

  /* -----------------------------------------------------------------------
   * ReadOnly (4)
   * -------------------------------------------------------------------- */

  it('marks every hidden input as disabled when readOnly is true', async () => {
    const screen = await render(
      <RadioGroup
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
        readOnly
      />
    );
    const radios = getRadioInputs(screen.container);
    radios.forEach((radio) => {
      expect((radio as HTMLInputElement).disabled).toBe(true);
    });
    await takeSnapshot(`RadioGroup - marks every hidden input as disabled when readOnly is true`);
  });

  it('does not call onValueChange when a read-only group is clicked', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <RadioGroup
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
        defaultValue="a"
        readOnly
        onValueChange={onValueChange}
      />
    );
    await userEvent.click(screen.getByText('B'), { force: true });
    await vi.waitFor(() => expect(onValueChange).not.toHaveBeenCalled());
    await takeSnapshot(`RadioGroup - does not call onValueChange when a read-only group is clicked`);
  });

  it('keeps the pre-selected defaultValue checked after a read-only group is clicked', async () => {
    const screen = await render(
      <RadioGroup
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
        defaultValue="a"
        readOnly
      />
    );
    await userEvent.click(screen.getByText('B'), { force: true });
    await expect
      .element(screen.getByRole('radio', { name: 'A' }))
      .toBeChecked();
    await expect
      .element(screen.getByRole('radio', { name: 'B' }))
      .not.toBeChecked();
    await takeSnapshot(`RadioGroup - keeps the pre-selected defaultValue checked after a read-only group is clicked`);
  });

  it('exposes aria-readonly on the root when readOnly is true', async () => {
    const screen = await render(
      <RadioGroup options={[{ label: 'A', value: 'a' }]} readOnly />
    );
    const group = screen.getByRole('radiogroup');
    await expect.element(group).toHaveAttribute('aria-readonly', 'true');
    await takeSnapshot(`RadioGroup - exposes aria-readonly on the root when readOnly is true`);
  });

  /* -----------------------------------------------------------------------
   * Required (3)
   * -------------------------------------------------------------------- */

  it('marks every hidden input as required when required is true', async () => {
    const screen = await render(
      <RadioGroup
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
        required
      />
    );
    await expect
      .element(screen.getByRole('radio', { name: 'A' }))
      .toHaveAttribute('required');
    await expect
      .element(screen.getByRole('radio', { name: 'B' }))
      .toHaveAttribute('required');
    await takeSnapshot(`RadioGroup - marks every hidden input as required when required is true`);
  });

  it('does not mark inputs as required by default', async () => {
    const screen = await render(
      <RadioGroup options={[{ label: 'A', value: 'a' }]} />
    );
    await expect
      .element(screen.getByRole('radio', { name: 'A' }))
      .not.toHaveAttribute('required');
    await takeSnapshot(`RadioGroup - does not mark inputs as required by default`);
  });

  it('exposes aria-required on the root when required is true', async () => {
    const screen = await render(
      <RadioGroup options={[{ label: 'A', value: 'a' }]} required />
    );
    const group = screen.getByRole('radiogroup');
    await expect.element(group).toHaveAttribute('aria-required', 'true');
    await takeSnapshot(`RadioGroup - exposes aria-required on the root when required is true`);
  });

  /* -----------------------------------------------------------------------
   * Name attribute / form submission (4)
   * -------------------------------------------------------------------- */

  it('exposes the provided name attribute on every hidden input in the group', async () => {
    const screen = await render(
      <RadioGroup
        name="framework"
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
      />
    );
    await expect
      .element(screen.getByRole('radio', { name: 'A' }))
      .toHaveAttribute('name', 'framework');
    await expect
      .element(screen.getByRole('radio', { name: 'B' }))
      .toHaveAttribute('name', 'framework');
    await takeSnapshot(`RadioGroup - exposes the provided name attribute on every hidden input in the group`);
  });

  it('submits the selected option value under the given name via FormData', async () => {
    const screen = await render(
      <form>
        <RadioGroup
          name="framework"
          options={[
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
          ]}
          defaultValue="b"
        />
      </form>
    );
    const form = screen.container.querySelector('form') as HTMLFormElement;
    const formData = new FormData(form);
    expect(formData.get('framework')).toBe('b');
    await takeSnapshot(`RadioGroup - submits the selected option value under the given name via FormData`);
  });

  it('does not submit any value for the group when nothing is selected', async () => {
    const screen = await render(
      <form>
        <RadioGroup
          name="framework"
          options={[
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
          ]}
        />
      </form>
    );
    const form = screen.container.querySelector('form') as HTMLFormElement;
    const formData = new FormData(form);
    expect(formData.get('framework')).toBeNull();
    await takeSnapshot(`RadioGroup - does not submit any value for the group when nothing is selected`);
  });

  it('falls back to a shared generated name across inputs when name is not provided', async () => {
    const screen = await render(
      <RadioGroup
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
      />
    );
    const radios = getRadioInputs(screen.container);
    const nameA = (radios[0] as HTMLInputElement).name;
    const nameB = (radios[1] as HTMLInputElement).name;
    expect(nameA).toBeTruthy();
    expect(nameA).toBe(nameB);
    await takeSnapshot(`RadioGroup - falls back to a shared generated name across inputs when name is not provided`);
  });

  /* -----------------------------------------------------------------------
   * Orientation (3)
   * -------------------------------------------------------------------- */

  it('defaults to a vertical data-orientation attribute on the root', async () => {
    const screen = await render(
      <RadioGroup options={[{ label: 'A', value: 'a' }]} />
    );
    const root = getRoot(screen.container);
    expect(root.getAttribute('data-orientation')).toBe('vertical');
    await takeSnapshot(`RadioGroup - defaults to a vertical data-orientation attribute on the root`);
  });

  it('applies a horizontal data-orientation attribute when orientation is horizontal', async () => {
    const screen = await render(
      <RadioGroup
        options={[{ label: 'A', value: 'a' }]}
        orientation="horizontal"
      />
    );
    const root = getRoot(screen.container);
    expect(root.getAttribute('data-orientation')).toBe('horizontal');
    await takeSnapshot(`RadioGroup - applies a horizontal data-orientation attribute when orientation is horizontal`);
  });

  it('shares the same orientation attribute across the root and every item', async () => {
    const screen = await render(
      <RadioGroup
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
        orientation="horizontal"
      />
    );
    const root = getRoot(screen.container);
    const labels = getItemLabels(screen.container);
    expect(root.getAttribute('data-orientation')).toBe('horizontal');
    labels.forEach((label) => {
      expect(label.getAttribute('data-orientation')).toBe('horizontal');
    });
    await takeSnapshot(`RadioGroup - shares the same orientation attribute across the root and every item`);
  });

  /* -----------------------------------------------------------------------
   * Keyboard interaction (5)
   * -------------------------------------------------------------------- */

  it('moves focus to the first radio via Tab', async () => {
    const screen = await render(
      <RadioGroup
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
      />
    );
    const radioA = screen.getByRole('radio', { name: 'A' });
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    await expect.element(radioA).toHaveFocus();
    await takeSnapshot(`RadioGroup - moves focus to the first radio via Tab`);
  });

  it('ArrowDown moves focus and selection to the next option', async () => {
    const screen = await render(
      <RadioGroup
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
        defaultValue="a"
      />
    );
    const radios = getRadioInputs(screen.container);
    (radios[0] as HTMLInputElement).focus();
    await userEvent.keyboard('{ArrowDown}');
    const radioB = screen.getByRole('radio', { name: 'B' });
    await expect.element(radioB).toHaveFocus();
    await expect.element(radioB).toBeChecked();
    await takeSnapshot(`RadioGroup - ArrowDown moves focus and selection to the next option`);
  });

  it('ArrowUp moves focus and selection to the previous option, wrapping from the first to the last', async () => {
    const screen = await render(
      <RadioGroup
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
          { label: 'C', value: 'c' },
        ]}
        defaultValue="a"
      />
    );
    const radios = getRadioInputs(screen.container);
    (radios[0] as HTMLInputElement).focus();
    await userEvent.keyboard('{ArrowUp}');
    const radioC = screen.getByRole('radio', { name: 'C' });
    await expect.element(radioC).toHaveFocus();
    await expect.element(radioC).toBeChecked();
    await takeSnapshot(`RadioGroup - ArrowUp moves focus and selection to the previous option, wrapping from the first to the last`);
  });

  it('Space checks the currently focused, unselected option', async () => {
    const screen = await render(
      <RadioGroup
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
      />
    );
    const radioB = screen.getByRole('radio', { name: 'B' });
    (radioB.element() as HTMLInputElement).focus();
    await userEvent.keyboard(' ');
    await expect.element(radioB).toBeChecked();
    await takeSnapshot(`RadioGroup - Space checks the currently focused, unselected option`);
  });

  it('arrow key navigation skips a disabled option and lands on the next enabled one', async () => {
    const screen = await render(
      <RadioGroup
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b', disabled: true },
          { label: 'C', value: 'c' },
        ]}
        defaultValue="a"
      />
    );
    const radios = getRadioInputs(screen.container);
    (radios[0] as HTMLInputElement).focus();
    await userEvent.keyboard('{ArrowDown}');
    const radioC = screen.getByRole('radio', { name: 'C' });
    await expect.element(radioC).toHaveFocus();
    await expect.element(radioC).toBeChecked();
    await takeSnapshot(`RadioGroup - arrow key navigation skips a disabled option and lands on the next enabled one`);
  });

  /* -----------------------------------------------------------------------
   * Multiple independent groups (2)
   * -------------------------------------------------------------------- */

  it('does not share the selected value between two independently rendered RadioGroup instances', async () => {
    const screen = await render(
      <div>
        <RadioGroup
          name="first"
          options={[
            { label: 'One-A', value: 'a' },
            { label: 'One-B', value: 'b' },
          ]}
          defaultValue="a"
        />
        <RadioGroup
          name="second"
          options={[
            { label: 'Two-A', value: 'a' },
            { label: 'Two-B', value: 'b' },
          ]}
          defaultValue="b"
        />
      </div>
    );
    await expect
      .element(screen.getByRole('radio', { name: 'One-A' }))
      .toBeChecked();
    await expect
      .element(screen.getByRole('radio', { name: 'Two-B' }))
      .toBeChecked();
    await expect
      .element(screen.getByRole('radio', { name: 'One-B' }))
      .not.toBeChecked();
    await expect
      .element(screen.getByRole('radio', { name: 'Two-A' }))
      .not.toBeChecked();
    await takeSnapshot(`RadioGroup - does not share the selected value between two independently rendered RadioGroup instances`);
  });

  it('does not invoke the other group onValueChange when only one group item is clicked', async () => {
    const onFirstChange = vi.fn();
    const onSecondChange = vi.fn();
    const screen = await render(
      <div>
        <RadioGroup
          options={[{ label: 'First option', value: 'a' }]}
          onValueChange={onFirstChange}
        />
        <RadioGroup
          options={[{ label: 'Second option', value: 'a' }]}
          onValueChange={onSecondChange}
        />
      </div>
    );
    await userEvent.click(screen.getByText('First option'));
    await vi.waitFor(() => expect(onFirstChange).toHaveBeenCalledTimes(1));
    await vi.waitFor(() => expect(onSecondChange).not.toHaveBeenCalled());
    await takeSnapshot(`RadioGroup - does not invoke the other group onValueChange when only one group item is clicked`);
  });

  /* -----------------------------------------------------------------------
   * Options-array edge cases (3)
   * -------------------------------------------------------------------- */

  it('renders zero radio inputs when options is an empty array', async () => {
    const screen = await render(<RadioGroup options={[]} />);
    expect(getRadioInputs(screen.container).length).toBe(0);
    await takeSnapshot(`RadioGroup - renders zero radio inputs when options is an empty array`);
  });

  it('renders exactly one radio input when only a single option is provided', async () => {
    const screen = await render(
      <RadioGroup options={[{ label: 'Only choice', value: 'only' }]} />
    );
    expect(getRadioInputs(screen.container).length).toBe(1);
    await expect
      .element(screen.getByRole('radio', { name: 'Only choice' }))
      .toBeInTheDocument();
    await takeSnapshot(`RadioGroup - renders exactly one radio input when only a single option is provided`);
  });

  it('preserves RTL and emoji option label text exactly', async () => {
    const screen = await render(
      <RadioGroup
        options={[
          { label: 'نعم', value: 'yes' },
          { label: '✅ Confirmé 🎉', value: 'confirmed' },
        ]}
      />
    );
    await expect.element(screen.getByText('نعم')).toHaveTextContent('نعم');
    await expect
      .element(screen.getByText('✅ Confirmé 🎉'))
      .toHaveTextContent('✅ Confirmé 🎉');
    await takeSnapshot(`RadioGroup - preserves RTL and emoji option label text exactly`);
  });

  /* -----------------------------------------------------------------------
   * Kitchen-sink combinations (3)
   * -------------------------------------------------------------------- */

  it('renders correctly combining required, name, horizontal orientation, and a disabled item together', async () => {
    const screen = await render(
      <RadioGroup
        options={[
          { label: 'Small', value: 's' },
          { label: 'Medium', value: 'm', disabled: true },
          { label: 'Large', value: 'l' },
        ]}
        required
        name="size"
        orientation="horizontal"
      />
    );
    await expect
      .element(screen.getByRole('radio', { name: 'Small' }))
      .toHaveAttribute('required');
    await expect
      .element(screen.getByRole('radio', { name: 'Small' }))
      .toHaveAttribute('name', 'size');
    await expect
      .element(screen.getByRole('radio', { name: 'Medium' }))
      .toBeDisabled();
    const root = getRoot(screen.container);
    expect(root.getAttribute('data-orientation')).toBe('horizontal');
    await takeSnapshot(`RadioGroup - renders correctly combining required, name, horizontal orientation, and a disabled item together`);
  });

  it('prevents onValueChange when readOnly, required, and a defaultValue are combined and clicked', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <RadioGroup
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
        readOnly
        required
        defaultValue="a"
        onValueChange={onValueChange}
      />
    );
    await userEvent.click(screen.getByText('B'), { force: true });
    await vi.waitFor(() => expect(onValueChange).not.toHaveBeenCalled());
    await expect
      .element(screen.getByRole('radio', { name: 'A' }))
      .toBeChecked();
    await takeSnapshot(`RadioGroup - prevents onValueChange when readOnly, required, and a defaultValue are combined and clicked`);
  });

  it('keeps a disabled group pre-selected defaultValue checked and inert to clicks and keyboard input', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <RadioGroup
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
        disabled
        defaultValue="a"
        onValueChange={onValueChange}
      />
    );
    await userEvent.click(screen.getByText('B'), { force: true });
    await vi.waitFor(() => expect(onValueChange).not.toHaveBeenCalled());
    await expect
      .element(screen.getByRole('radio', { name: 'A' }))
      .toBeChecked();
    await expect
      .element(screen.getByRole('radio', { name: 'B' }))
      .not.toBeChecked();
    await takeSnapshot(`RadioGroup - keeps a disabled group pre-selected defaultValue checked and inert to clicks and keyboard input`);
  });

  /* -----------------------------------------------------------------------
   * Accessibility (1)
   * -------------------------------------------------------------------- */

  it('exposes data-focus-visible on the focused item label after tabbing', async () => {
    const screen = await render(
      <RadioGroup
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
      />
    );
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    const labels = getItemLabels(screen.container);
    await vi.waitFor(() => expect(labels[0].hasAttribute('data-focus-visible')).toBe(true));
    await takeSnapshot(`RadioGroup - exposes data-focus-visible on the focused item label after tabbing`);
  });
});
