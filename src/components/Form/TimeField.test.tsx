import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent, page } from 'vitest/browser';
import { useState } from 'react';
import TimeField from './TimeField';
import { color, fontSize, fontWeight } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

/**
 * Controlled fixture mirroring the "clear button resolves state" usage
 * pattern - a parent that actually updates state from `onValueChange`, so
 * the native input's DOM value stays in sync with the `value` prop.
 */
const ControlledClearFixture = () => {
  const [value, setValue] = useState('09:00');
  return (
    <TimeField
      value={value}
      onValueChange={(details) => setValue(details.value)}
    />
  );
};

/** Wraps a raw HTMLElement into a Locator so jest-dom matchers can be used. */
const locatorFor = (element: HTMLElement) => page.elementLocator(element);

/** Retrieves the native `<input type="time">` element from a rendered screen. */
const getTimeInput = (container: HTMLElement) =>
  container.querySelector('input[type="time"]') as HTMLInputElement;

describe('TimeField', () => {
  /* -----------------------------------------------------------------------
   * Label rendering (5)
   * -------------------------------------------------------------------- */

  it('renders the label text with the expected typography when children is provided', async () => {
    const screen = await render(<TimeField>Select Time</TimeField>);
    const label = screen.container.querySelector('label') as HTMLElement;
    expect(label).toBeTruthy();
    expect(label.textContent).toBe('Select Time');
    await expect
      .element(locatorFor(label))
      .toHaveStyle({ fontSize: fontSize[14], fontWeight: fontWeight.medium });
    await takeSnapshot(`TimeField - renders the label text with the expected typography when children is provided`);
  });

  it('renders no label element when children is omitted', async () => {
    const screen = await render(<TimeField />);
    expect(screen.container.querySelector('label')).toBeNull();
    await takeSnapshot(`TimeField - renders no label element when children is omitted`);
  });

  it('shows a pink600 colored asterisk next to the label when required is true', async () => {
    const screen = await render(<TimeField required>Required Time</TimeField>);
    const label = screen.container.querySelector('label') as HTMLElement;
    const asterisk = label.querySelector('span') as HTMLElement;
    expect(asterisk).toBeTruthy();
    expect(asterisk.textContent).toBe('*');
    await expect
      .element(locatorFor(asterisk))
      .toHaveStyle({ color: color.pink600 });
    await takeSnapshot(`TimeField - shows a pink600 colored asterisk next to the label when required is true`);
  });

  it('does not render an asterisk when required is false', async () => {
    const screen = await render(<TimeField required={false}>Optional Time</TimeField>);
    const label = screen.container.querySelector('label') as HTMLElement;
    expect(label.querySelector('span')).toBeNull();
    await takeSnapshot(`TimeField - does not render an asterisk when required is false`);
  });

  it('does not render a label or asterisk when required is true but children is omitted', async () => {
    const screen = await render(<TimeField required />);
    expect(screen.container.querySelector('label')).toBeNull();
    await takeSnapshot(`TimeField - does not render a label or asterisk when required is true but children is omitted`);
  });

  /* -----------------------------------------------------------------------
   * Disabled styling (5)
   * -------------------------------------------------------------------- */

  it('applies a slate100 background color to the field container when disabled', async () => {
    const screen = await render(<TimeField disabled value="10:00" />);
    const input = getTimeInput(screen.container);
    const fieldRow = input.parentElement as HTMLElement;
    await expect
      .element(locatorFor(fieldRow))
      .toHaveStyle({ backgroundColor: color.slate100 });
    await takeSnapshot(`TimeField - applies a slate100 background color to the field container when disabled`);
  });

  it('applies slate400 text color to the input when disabled', async () => {
    const screen = await render(<TimeField disabled value="10:00" />);
    const input = getTimeInput(screen.container);
    await expect.element(locatorFor(input)).toHaveStyle({ color: color.slate400 });
    await takeSnapshot(`TimeField - applies slate400 text color to the input when disabled`);
  });

  it('applies a not-allowed cursor to the input when disabled', async () => {
    const screen = await render(<TimeField disabled value="10:00" />);
    const input = getTimeInput(screen.container);
    await expect.element(locatorFor(input)).toHaveStyle({ cursor: 'not-allowed' });
    await takeSnapshot(`TimeField - applies a not-allowed cursor to the input when disabled`);
  });

  it('sets the disabled attribute on the native input when disabled is true', async () => {
    const screen = await render(<TimeField disabled />);
    const input = getTimeInput(screen.container);
    await expect.element(locatorFor(input)).toBeDisabled();
    await takeSnapshot(`TimeField - sets the disabled attribute on the native input when disabled is true`);
  });

  it('leaves the field enabled with a white background by default', async () => {
    const screen = await render(<TimeField value="10:00" />);
    const input = getTimeInput(screen.container);
    const fieldRow = input.parentElement as HTMLElement;
    await expect.element(locatorFor(input)).not.toBeDisabled();
    await expect
      .element(locatorFor(fieldRow))
      .toHaveStyle({ backgroundColor: color.white });
    await takeSnapshot(`TimeField - leaves the field enabled with a white background by default`);
  });

  /* -----------------------------------------------------------------------
   * ReadOnly (2)
   * -------------------------------------------------------------------- */

  it('sets the readOnly attribute on the native input when readOnly is true', async () => {
    const screen = await render(<TimeField readOnly value="15:45" />);
    const input = getTimeInput(screen.container);
    expect(input.readOnly).toBe(true);
    await takeSnapshot(`TimeField - sets the readOnly attribute on the native input when readOnly is true`);
  });

  it('does not set the readOnly attribute when readOnly is false (default)', async () => {
    const screen = await render(<TimeField value="15:45" />);
    const input = getTimeInput(screen.container);
    expect(input.readOnly).toBe(false);
    await takeSnapshot(`TimeField - does not set the readOnly attribute when readOnly is false (default)`);
  });

  /* -----------------------------------------------------------------------
   * Controlled value & onValueChange (5)
   * -------------------------------------------------------------------- */

  it('renders the initial controlled value on the native input', async () => {
    const screen = await render(<TimeField value="09:15" />);
    const input = getTimeInput(screen.container);
    await expect.element(locatorFor(input)).toHaveValue('09:15');
    await takeSnapshot(`TimeField - renders the initial controlled value on the native input`);
  });

  it('calls onValueChange with the correct value and valueAsTime shape when the user changes the input', async () => {
    const onValueChange = vi.fn();
    const screen = await render(<TimeField onValueChange={onValueChange} />);
    const input = getTimeInput(screen.container);
    await userEvent.fill(locatorFor(input), '14:45');
    await expect.element(locatorFor(input)).toHaveValue('14:45');
    expect(onValueChange).toHaveBeenCalledWith({
      value: '14:45',
      valueAsTime: { hour: 14, minute: 45 },
    });
    await takeSnapshot(`TimeField - calls onValueChange with the correct value and valueAsTime shape when the user changes the input`);
  });

  it('calls onValueChange with a parsed second value when allowSeconds is true', async () => {
    const onValueChange = vi.fn();
    const screen = await render(<TimeField allowSeconds onValueChange={onValueChange} />);
    const input = getTimeInput(screen.container);
    await userEvent.fill(locatorFor(input), '09:05:30');
    await expect.element(locatorFor(input)).toHaveValue('09:05:30');
    expect(onValueChange).toHaveBeenCalledWith({
      value: '09:05:30',
      valueAsTime: { hour: 9, minute: 5, second: 30 },
    });
    await takeSnapshot(`TimeField - calls onValueChange with a parsed second value when allowSeconds is true`);
  });

  it('leaves the DOM value diverged from the value prop when clear is clicked without the parent updating state', async () => {
    const screen = await render(<TimeField value="10:30" />);
    const input = getTimeInput(screen.container);
    await expect.element(locatorFor(input)).toHaveValue('10:30');

    const clearButton = screen.getByRole('button', { name: 'Clear time' });
    await userEvent.click(clearButton);

    // The `value` prop never changed (no state update happened), yet the
    // native input's DOM value is now empty - a real divergence caused by
    // the imperative ref mutation in handleClear.
    await expect.element(locatorFor(input)).toHaveValue('');
    await takeSnapshot(`TimeField - leaves the DOM value diverged from the value prop when clear is clicked without the parent updating state`);
  });

  it('keeps the DOM value in sync with the value prop when the parent updates state from onValueChange', async () => {
    const screen = await render(<ControlledClearFixture />);
    const input = getTimeInput(screen.container);
    await expect.element(locatorFor(input)).toHaveValue('09:00');

    const clearButton = screen.getByRole('button', { name: 'Clear time' });
    await userEvent.click(clearButton);

    await expect.element(locatorFor(input)).toHaveValue('');
    expect(screen.getByRole('button', { name: 'Clear time' }).query()).toBeNull();
    await takeSnapshot(`TimeField - keeps the DOM value in sync with the value prop when the parent updates state from onValueChange`);
  });

  /* -----------------------------------------------------------------------
   * min/max passthrough (3)
   * -------------------------------------------------------------------- */

  it("passes minValue to the native input's min attribute", async () => {
    const screen = await render(<TimeField minValue="09:00" />);
    const input = getTimeInput(screen.container);
    await expect.element(locatorFor(input)).toHaveAttribute('min', '09:00');
    await takeSnapshot(`TimeField - passes minValue to the native input's min attribute`);
  });

  it("passes maxValue to the native input's max attribute", async () => {
    const screen = await render(<TimeField maxValue="18:00" />);
    const input = getTimeInput(screen.container);
    await expect.element(locatorFor(input)).toHaveAttribute('max', '18:00');
    await takeSnapshot(`TimeField - passes maxValue to the native input's max attribute`);
  });

  it('omits min/max attributes when minValue/maxValue are not provided', async () => {
    const screen = await render(<TimeField />);
    const input = getTimeInput(screen.container);
    expect(input.hasAttribute('min')).toBe(false);
    expect(input.hasAttribute('max')).toBe(false);
    await takeSnapshot(`TimeField - omits min/max attributes when minValue/maxValue are not provided`);
  });

  /* -----------------------------------------------------------------------
   * allowSeconds / step attribute (2)
   * -------------------------------------------------------------------- */

  it('sets step="1" on the native input when allowSeconds is true', async () => {
    const screen = await render(<TimeField allowSeconds />);
    const input = getTimeInput(screen.container);
    await expect.element(locatorFor(input)).toHaveAttribute('step', '1');
    await takeSnapshot(`TimeField - sets step="1" on the native input when allowSeconds is true`);
  });

  it('does not set a step attribute when allowSeconds is false (default)', async () => {
    const screen = await render(<TimeField />);
    const input = getTimeInput(screen.container);
    expect(input.hasAttribute('step')).toBe(false);
    await takeSnapshot(`TimeField - does not set a step attribute when allowSeconds is false (default)`);
  });

  /* -----------------------------------------------------------------------
   * placeholder (1)
   * -------------------------------------------------------------------- */

  it('passes the placeholder prop to the native input', async () => {
    const screen = await render(<TimeField placeholder="Enter time" />);
    const input = getTimeInput(screen.container);
    await expect.element(locatorFor(input)).toHaveAttribute('placeholder', 'Enter time');
    await takeSnapshot(`TimeField - passes the placeholder prop to the native input`);
  });

  /* -----------------------------------------------------------------------
   * aria-describedby / errorMessageId (2)
   * -------------------------------------------------------------------- */

  it("wires errorMessageId to the native input's aria-describedby attribute", async () => {
    const screen = await render(<TimeField errorMessageId="time-error" />);
    const input = getTimeInput(screen.container);
    await expect.element(locatorFor(input)).toHaveAttribute('aria-describedby', 'time-error');
    await takeSnapshot(`TimeField - wires errorMessageId to the native input's aria-describedby attribute`);
  });

  it('does not set aria-describedby when errorMessageId is omitted', async () => {
    const screen = await render(<TimeField />);
    const input = getTimeInput(screen.container);
    expect(input.hasAttribute('aria-describedby')).toBe(false);
    await takeSnapshot(`TimeField - does not set aria-describedby when errorMessageId is omitted`);
  });

  /* -----------------------------------------------------------------------
   * onInvalid (3)
   * -------------------------------------------------------------------- */

  it("fires onInvalid when a required, empty field's validity is checked", async () => {
    const onInvalid = vi.fn();
    const screen = await render(<TimeField required onInvalid={onInvalid} />);
    const input = getTimeInput(screen.container);
    input.checkValidity();
    expect(onInvalid).toHaveBeenCalledTimes(1);
    await takeSnapshot(`TimeField - fires onInvalid when a required, empty field's validity is checked`);
  });

  it('fires onInvalid when a value outside the min/max range is checked for validity', async () => {
    const onInvalid = vi.fn();
    const screen = await render(
      <TimeField value="05:00" minValue="09:00" maxValue="17:00" onInvalid={onInvalid} />
    );
    const input = getTimeInput(screen.container);
    input.checkValidity();
    expect(onInvalid).toHaveBeenCalledTimes(1);
    await takeSnapshot(`TimeField - fires onInvalid when a value outside the min/max range is checked for validity`);
  });

  it('does not fire onInvalid when the value is valid and within range', async () => {
    const onInvalid = vi.fn();
    const screen = await render(
      <TimeField value="12:00" minValue="09:00" maxValue="17:00" onInvalid={onInvalid} />
    );
    const input = getTimeInput(screen.container);
    input.checkValidity();
    expect(onInvalid).not.toHaveBeenCalled();
    await takeSnapshot(`TimeField - does not fire onInvalid when the value is valid and within range`);
  });

  /* -----------------------------------------------------------------------
   * Clear button visibility (4)
   * -------------------------------------------------------------------- */

  it('renders the clear button when value is truthy, enabled and not read-only', async () => {
    const screen = await render(<TimeField value="12:15" />);
    await expect
      .element(screen.getByRole('button', { name: 'Clear time' }))
      .toBeInTheDocument();
    await takeSnapshot(`TimeField - renders the clear button when value is truthy, enabled and not read-only`);
  });

  it('does not render the clear button when value is empty', async () => {
    const screen = await render(<TimeField />);
    expect(screen.getByRole('button', { name: 'Clear time' }).query()).toBeNull();
    await takeSnapshot(`TimeField - does not render the clear button when value is empty`);
  });

  it('does not render the clear button when disabled is true, even with a value', async () => {
    const screen = await render(<TimeField disabled value="12:15" />);
    expect(screen.getByRole('button', { name: 'Clear time' }).query()).toBeNull();
    await takeSnapshot(`TimeField - does not render the clear button when disabled is true, even with a value`);
  });

  it('does not render the clear button when readOnly is true, even with a value', async () => {
    const screen = await render(<TimeField readOnly value="12:15" />);
    expect(screen.getByRole('button', { name: 'Clear time' }).query()).toBeNull();
    await takeSnapshot(`TimeField - does not render the clear button when readOnly is true, even with a value`);
  });

  /* -----------------------------------------------------------------------
   * Clear button behavior (2)
   * -------------------------------------------------------------------- */

  it("calls onValueChange with value '' and valueAsTime {hour:0, minute:0} when the clear button is clicked", async () => {
    const onValueChange = vi.fn();
    const screen = await render(<TimeField value="09:30" onValueChange={onValueChange} />);
    const clearButton = screen.getByRole('button', { name: 'Clear time' });
    await userEvent.click(clearButton);
    await vi.waitFor(() => expect(onValueChange).toHaveBeenCalledWith({
      value: '',
      valueAsTime: { hour: 0, minute: 0 },
    }));
    await takeSnapshot(`TimeField - calls onValueChange with value '' and valueAsTime {hour:0, minute:0} when the clear button is clicked`);
  });

  it("resets the native input's DOM value to empty when the clear button is clicked", async () => {
    const screen = await render(<TimeField value="09:30" onValueChange={() => {}} />);
    const input = getTimeInput(screen.container);
    const clearButton = screen.getByRole('button', { name: 'Clear time' });
    await userEvent.click(clearButton);
    await expect.element(locatorFor(input)).toHaveValue('');
    await takeSnapshot(`TimeField - resets the native input's DOM value to empty when the clear button is clicked`);
  });

  /* -----------------------------------------------------------------------
   * name attribute (2)
   * -------------------------------------------------------------------- */

  it('sets the name attribute on the native input', async () => {
    const screen = await render(<TimeField name="meeting-time" />);
    const input = getTimeInput(screen.container);
    await expect.element(locatorFor(input)).toHaveAttribute('name', 'meeting-time');
    await takeSnapshot(`TimeField - sets the name attribute on the native input`);
  });

  it('does not set a name attribute when name is omitted', async () => {
    const screen = await render(<TimeField />);
    const input = getTimeInput(screen.container);
    expect(input.hasAttribute('name')).toBe(false);
    await takeSnapshot(`TimeField - does not set a name attribute when name is omitted`);
  });

  /* -----------------------------------------------------------------------
   * Keyboard focus (1)
   * -------------------------------------------------------------------- */

  it('moves keyboard focus into the native input via Tab', async () => {
    const screen = await render(<TimeField />);
    const input = getTimeInput(screen.container);

    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    await vi.waitFor(() => expect(document.activeElement).toBe(input));
    await takeSnapshot(`TimeField - moves keyboard focus into the native input via Tab`);
  });

  /* -----------------------------------------------------------------------
   * Multi-instance independence (1)
   * -------------------------------------------------------------------- */

  it('keeps two TimeField instances independent of each other', async () => {
    const onChangeA = vi.fn();
    const onChangeB = vi.fn();
    const screen = await render(
      <div>
        <TimeField value="08:00" onValueChange={onChangeA} name="field-a" />
        <TimeField value="17:00" onValueChange={onChangeB} name="field-b" />
      </div>
    );
    const inputs = Array.from(
      screen.container.querySelectorAll('input[type="time"]')
    ) as HTMLInputElement[];
    expect(inputs.length).toBe(2);
    const [inputA, inputB] = inputs;

    await expect.element(locatorFor(inputA)).toHaveValue('08:00');
    await expect.element(locatorFor(inputB)).toHaveValue('17:00');

    await userEvent.fill(locatorFor(inputA), '09:15');
    await vi.waitFor(() => expect(onChangeA).toHaveBeenCalled());
    await vi.waitFor(() => expect(onChangeB).not.toHaveBeenCalled());
    await takeSnapshot(`TimeField - keeps two TimeField instances independent of each other`);
  });

  /* -----------------------------------------------------------------------
   * Default prop values (2)
   * -------------------------------------------------------------------- */

  it('defaults required and disabled to false when omitted', async () => {
    const screen = await render(<TimeField />);
    const input = getTimeInput(screen.container);
    expect(input.hasAttribute('required')).toBe(false);
    expect(input.hasAttribute('disabled')).toBe(false);
    await takeSnapshot(`TimeField - defaults required and disabled to false when omitted`);
  });

  it('stores the value in 24-hour HH:MM form regardless of hourCycle, since hourCycle is display-only', async () => {
    const screen12 = await render(<TimeField value="14:30" hourCycle={12} />);
    const screen24 = await render(<TimeField value="14:30" hourCycle={24} />);
    const input12 = getTimeInput(screen12.container);
    const input24 = getTimeInput(screen24.container);
    await expect.element(locatorFor(input12)).toHaveValue('14:30');
    await expect.element(locatorFor(input24)).toHaveValue('14:30');
    await takeSnapshot(`TimeField - stores the value in 24-hour HH:MM form regardless of hourCycle, since hourCycle is display-only`);
  });

  /* -----------------------------------------------------------------------
   * RTL/unicode label (2)
   * -------------------------------------------------------------------- */

  it('preserves right-to-left script label content exactly', async () => {
    const screen = await render(<TimeField>وقت الموعد</TimeField>);
    const label = screen.container.querySelector('label') as HTMLElement;
    expect(label.textContent).toBe('وقت الموعد');
    await takeSnapshot(`TimeField - preserves right-to-left script label content exactly`);
  });

  it('preserves emoji label content exactly', async () => {
    const screen = await render(<TimeField>⏰ Alarm Time 🔔</TimeField>);
    const label = screen.container.querySelector('label') as HTMLElement;
    expect(label.textContent).toBe('⏰ Alarm Time 🔔');
    await takeSnapshot(`TimeField - preserves emoji label content exactly`);
  });

  /* -----------------------------------------------------------------------
   * Long label (1)
   * -------------------------------------------------------------------- */

  it('renders a very long label in full without truncation in the DOM', async () => {
    const longLabel =
      'Please select the exact time you would like your scheduled appointment reminder notification to be delivered';
    const screen = await render(<TimeField>{longLabel}</TimeField>);
    const label = screen.container.querySelector('label') as HTMLElement;
    expect(label.textContent).toBe(longLabel);
    await takeSnapshot(`TimeField - renders a very long label in full without truncation in the DOM`);
  });

  /* -----------------------------------------------------------------------
   * hideTimeZone prop accepted (1)
   * -------------------------------------------------------------------- */

  it('accepts the hideTimeZone prop without affecting the rendered input value', async () => {
    const screen = await render(<TimeField value="11:11" hideTimeZone={false} />);
    const input = getTimeInput(screen.container);
    await expect.element(locatorFor(input)).toHaveValue('11:11');
    await takeSnapshot(`TimeField - accepts the hideTimeZone prop without affecting the rendered input value`);
  });

  /* -----------------------------------------------------------------------
   * Kitchen-sink combos (2)
   * -------------------------------------------------------------------- */

  it('combines required, disabled and a value together consistently', async () => {
    const screen = await render(
      <TimeField required disabled value="10:00">
        Locked Time
      </TimeField>
    );
    const input = getTimeInput(screen.container);
    await expect.element(locatorFor(input)).toBeDisabled();
    await expect.element(locatorFor(input)).toHaveValue('10:00');

    const label = screen.container.querySelector('label') as HTMLElement;
    expect(label.textContent).toContain('*');
    expect(screen.getByRole('button', { name: 'Clear time' }).query()).toBeNull();
    await takeSnapshot(`TimeField - combines required, disabled and a value together consistently`);
  });

  it('combines allowSeconds, minValue, maxValue, name and errorMessageId together correctly', async () => {
    const screen = await render(
      <TimeField
        allowSeconds
        minValue="06:00:00"
        maxValue="22:00:00"
        name="full-combo"
        errorMessageId="full-combo-error"
        value="12:30:45"
      />
    );
    const input = getTimeInput(screen.container);
    await expect.element(locatorFor(input)).toHaveValue('12:30:45');
    await expect.element(locatorFor(input)).toHaveAttribute('step', '1');
    await expect.element(locatorFor(input)).toHaveAttribute('min', '06:00:00');
    await expect.element(locatorFor(input)).toHaveAttribute('max', '22:00:00');
    await expect.element(locatorFor(input)).toHaveAttribute('name', 'full-combo');
    await expect
      .element(locatorFor(input))
      .toHaveAttribute('aria-describedby', 'full-combo-error');
    await takeSnapshot(`TimeField - combines allowSeconds, minValue, maxValue, name and errorMessageId together correctly`);
  });

  /* -----------------------------------------------------------------------
   * allowSeconds=false change shape (1)
   * -------------------------------------------------------------------- */

  it('produces a valueAsTime with no second key when allowSeconds is false and the user changes the input', async () => {
    const onValueChange = vi.fn();
    const screen = await render(<TimeField onValueChange={onValueChange} />);
    const input = getTimeInput(screen.container);
    await userEvent.fill(locatorFor(input), '08:20');
    await vi.waitFor(() => expect(onValueChange).toHaveBeenCalledWith({
      value: '08:20',
      valueAsTime: { hour: 8, minute: 20 },
    }));
    const call = onValueChange.mock.calls[0][0];
    await vi.waitFor(() => expect(call.valueAsTime.second).toBeUndefined());
    await takeSnapshot(`TimeField - produces a valueAsTime with no second key when allowSeconds is false and the user changes the input`);
  });

  /* -----------------------------------------------------------------------
   * Smoke default render (1)
   * -------------------------------------------------------------------- */

  it('renders without crashing when every optional prop is omitted', async () => {
    const screen = await render(<TimeField />);
    const input = getTimeInput(screen.container);
    expect(input).toBeTruthy();
    await takeSnapshot(`TimeField - renders without crashing when every optional prop is omitted`);
  });

  /* -----------------------------------------------------------------------
   * Empty string value (1)
   * -------------------------------------------------------------------- */

  it('does not render the clear button when value is an empty string', async () => {
    const screen = await render(<TimeField value="" />);
    expect(screen.getByRole('button', { name: 'Clear time' }).query()).toBeNull();
    await takeSnapshot(`TimeField - does not render the clear button when value is an empty string`);
  });

  /* -----------------------------------------------------------------------
   * Focus on click (1)
   * -------------------------------------------------------------------- */

  it('focuses the native input when clicked', async () => {
    const screen = await render(<TimeField />);
    const input = getTimeInput(screen.container);
    await userEvent.click(locatorFor(input));
    await expect.element(locatorFor(input)).toHaveFocus();
    await takeSnapshot(`TimeField - focuses the native input when clicked`);
  });
});
