import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent, page } from 'vitest/browser';
import { useState } from 'react';
import PinInput from './PinInput';
import { color } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

/** Wraps a raw HTMLElement into a Locator so jest-dom matchers can auto-retry. */
const locatorFor = (element: HTMLElement) => page.elementLocator(element);

/** The visible pin fields, in order (excludes the visually-hidden form input). */
const getPinInputs = (container: HTMLElement): HTMLInputElement[] =>
  Array.from(container.querySelectorAll<HTMLInputElement>('input[data-part="input"]'));

/** The visually-hidden native input used for form submission. */
const getHiddenInput = (container: HTMLElement): HTMLInputElement =>
  container.querySelector('input[aria-hidden="true"]') as HTMLInputElement;

/**
 * Dispatches a real ClipboardEvent 'paste' carrying the given plain-text
 * payload, mirroring how @zag-js/pin-input reads `event.clipboardData` in
 * its onPaste handler. Avoids depending on real OS clipboard permissions.
 */
const dispatchPaste = (input: HTMLInputElement, text: string) => {
  const clipboardData = new DataTransfer();
  clipboardData.setData('text/plain', text);
  const event = new ClipboardEvent('paste', {
    clipboardData,
    bubbles: true,
    cancelable: true,
  });
  input.dispatchEvent(event);
};

/**
 * Stateful fixture mirroring the "controlled pin input" usage pattern from
 * the stories, used to exercise real external state updates.
 */
const ControlledPinFixture = ({
  initialValue,
}: {
  initialValue: string[];
}) => {
  const [value, setValue] = useState<string[]>(initialValue);

  return (
    <>
      <PinInput
        value={value}
        onValueChange={(details) => setValue(details.value)}
        maxLength={4}
      />
      <button onClick={() => setValue(['9', '9', '9', '9'])}>
        Fill from outside
      </button>
    </>
  );
};

describe('PinInput', () => {
  /* -----------------------------------------------------------------------
   * Default rendering & maxLength (5)
   * -------------------------------------------------------------------- */

  it('renders the default 4 numeric input fields', async () => {
    const screen = await render(<PinInput />);
    expect(getPinInputs(screen.container)).toHaveLength(4);
    await takeSnapshot(`PinInput - renders the default 4 numeric input fields`);
  });

  it('renders a custom number of fields based on maxLength', async () => {
    const screen = await render(<PinInput maxLength={6} />);
    expect(getPinInputs(screen.container)).toHaveLength(6);
    await takeSnapshot(`PinInput - renders a custom number of fields based on maxLength`);
  });

  it('renders a single field when maxLength is 1', async () => {
    const screen = await render(<PinInput maxLength={1} />);
    expect(getPinInputs(screen.container)).toHaveLength(1);
    await takeSnapshot(`PinInput - renders a single field when maxLength is 1`);
  });

  it('renders a label element when children are provided', async () => {
    const screen = await render(<PinInput maxLength={4}>Enter PIN</PinInput>);
    const label = screen.container.querySelector('label');
    expect(label).not.toBeNull();
    expect(label?.textContent).toBe('Enter PIN');
    await takeSnapshot(`PinInput - renders a label element when children are provided`);
  });

  it('does not render a label element when no children are provided', async () => {
    const screen = await render(<PinInput maxLength={4} />);
    expect(screen.container.querySelector('label')).toBeNull();
    await takeSnapshot(`PinInput - does not render a label element when no children are provided`);
  });

  /* -----------------------------------------------------------------------
   * Input attributes / accessibility (4)
   * -------------------------------------------------------------------- */

  it('gives each field a distinct aria-label describing its position', async () => {
    const screen = await render(<PinInput maxLength={3} />);
    const inputs = getPinInputs(screen.container);
    expect(inputs[0].getAttribute('aria-label')).toBe('pin code 1 of 3');
    expect(inputs[2].getAttribute('aria-label')).toBe('pin code 3 of 3');
    await takeSnapshot(`PinInput - gives each field a distinct aria-label describing its position`);
  });

  it('sets inputMode to numeric for numeric type fields by default', async () => {
    const screen = await render(<PinInput maxLength={4} />);
    const inputs = getPinInputs(screen.container);
    expect(inputs[0].getAttribute('inputmode')).toBe('numeric');
    await takeSnapshot(`PinInput - sets inputMode to numeric for numeric type fields by default`);
  });

  it('sets the underlying input type to tel for unmasked numeric fields', async () => {
    const screen = await render(<PinInput maxLength={4} />);
    const inputs = getPinInputs(screen.container);
    expect(inputs[0].getAttribute('type')).toBe('tel');
    await takeSnapshot(`PinInput - sets the underlying input type to tel for unmasked numeric fields`);
  });

  it('labels each field with a matching data-index attribute', async () => {
    const screen = await render(<PinInput maxLength={4} />);
    const inputs = getPinInputs(screen.container);
    expect(inputs[1].getAttribute('data-index')).toBe('1');
    expect(inputs[3].getAttribute('data-index')).toBe('3');
    await takeSnapshot(`PinInput - labels each field with a matching data-index attribute`);
  });

  /* -----------------------------------------------------------------------
   * Type constraint - numeric (3)
   * -------------------------------------------------------------------- */

  it('accepts numeric characters typed into a numeric field', async () => {
    const screen = await render(<PinInput maxLength={4} type="numeric" />);
    const inputs = getPinInputs(screen.container);
    await userEvent.type(inputs[0], '5');
    expect(inputs[0].value).toBe('5');
    await takeSnapshot(`PinInput - accepts numeric characters typed into a numeric field`);
  });

  it('rejects alphabetic characters typed into a numeric field', async () => {
    const screen = await render(<PinInput maxLength={4} type="numeric" />);
    const inputs = getPinInputs(screen.container);
    await userEvent.type(inputs[0], 'a');
    expect(inputs[0].value).toBe('');
    await takeSnapshot(`PinInput - rejects alphabetic characters typed into a numeric field`);
  });

  it('rejects symbol characters typed into a numeric field', async () => {
    const screen = await render(<PinInput maxLength={4} type="numeric" />);
    const inputs = getPinInputs(screen.container);
    await userEvent.type(inputs[0], '!');
    expect(inputs[0].value).toBe('');
    await takeSnapshot(`PinInput - rejects symbol characters typed into a numeric field`);
  });

  /* -----------------------------------------------------------------------
   * Type constraint - alphabetic (2)
   * -------------------------------------------------------------------- */

  it('accepts alphabetic characters typed into an alphabetic field', async () => {
    const screen = await render(<PinInput maxLength={4} type="alphabetic" />);
    const inputs = getPinInputs(screen.container);
    await userEvent.type(inputs[0], 'x');
    expect(inputs[0].value).toBe('x');
    await takeSnapshot(`PinInput - accepts alphabetic characters typed into an alphabetic field`);
  });

  it('rejects numeric characters typed into an alphabetic field', async () => {
    const screen = await render(<PinInput maxLength={4} type="alphabetic" />);
    const inputs = getPinInputs(screen.container);
    await userEvent.type(inputs[0], '7');
    expect(inputs[0].value).toBe('');
    await takeSnapshot(`PinInput - rejects numeric characters typed into an alphabetic field`);
  });

  /* -----------------------------------------------------------------------
   * Type constraint - alphanumeric (2)
   * -------------------------------------------------------------------- */

  it('accepts alphabetic characters typed into an alphanumeric field', async () => {
    const screen = await render(<PinInput maxLength={4} type="alphanumeric" />);
    const inputs = getPinInputs(screen.container);
    await userEvent.type(inputs[0], 'q');
    expect(inputs[0].value).toBe('q');
    await takeSnapshot(`PinInput - accepts alphabetic characters typed into an alphanumeric field`);
  });

  it('accepts numeric characters typed into an alphanumeric field', async () => {
    const screen = await render(<PinInput maxLength={4} type="alphanumeric" />);
    const inputs = getPinInputs(screen.container);
    await userEvent.type(inputs[0], '3');
    expect(inputs[0].value).toBe('3');
    await takeSnapshot(`PinInput - accepts numeric characters typed into an alphanumeric field`);
  });

  /* -----------------------------------------------------------------------
   * Masked display (3)
   * -------------------------------------------------------------------- */

  it('renders fields with type password when mask is true', async () => {
    const screen = await render(<PinInput maxLength={4} mask />);
    const inputs = getPinInputs(screen.container);
    inputs.forEach((input) => expect(input.getAttribute('type')).toBe('password'));
    await takeSnapshot(`PinInput - renders fields with type password when mask is true`);
  });

  it('renders fields with type tel (unmasked) by default for numeric type', async () => {
    const screen = await render(<PinInput maxLength={4} mask={false} />);
    const inputs = getPinInputs(screen.container);
    inputs.forEach((input) => expect(input.getAttribute('type')).toBe('tel'));
    await takeSnapshot(`PinInput - renders fields with type tel (unmasked) by default for numeric type`);
  });

  it("stores the typed character as the field's value even when masked", async () => {
    const screen = await render(<PinInput maxLength={4} mask />);
    const inputs = getPinInputs(screen.container);
    await userEvent.type(inputs[0], '9');
    await expect.element(locatorFor(inputs[0])).toHaveValue('9');
    await takeSnapshot(`PinInput - stores the typed character as the field's value even when masked`);
  });

  /* -----------------------------------------------------------------------
   * Focus-advance on typing (4)
   * -------------------------------------------------------------------- */

  it('auto-advances focus to the next field after typing a character', async () => {
    const screen = await render(<PinInput maxLength={4} />);
    const inputs = getPinInputs(screen.container);
    await userEvent.type(inputs[0], '1');
    await expect.element(locatorFor(inputs[1])).toHaveFocus();
    await takeSnapshot(`PinInput - auto-advances focus to the next field after typing a character`);
  });

  it('keeps focus on the last field after it is filled (no overflow past the end)', async () => {
    const screen = await render(<PinInput maxLength={4} />);
    const inputs = getPinInputs(screen.container);
    await userEvent.type(inputs[0], '1234');
    await expect.element(locatorFor(inputs[3])).toHaveFocus();
    await takeSnapshot(`PinInput - keeps focus on the last field after it is filled (no overflow past the end)`);
  });

  it('fills each field with its corresponding typed character in order', async () => {
    const screen = await render(<PinInput maxLength={4} />);
    const inputs = getPinInputs(screen.container);
    await userEvent.type(inputs[0], '1234');
    expect(inputs.map((input) => input.value)).toEqual(['1', '2', '3', '4']);
    await takeSnapshot(`PinInput - fills each field with its corresponding typed character in order`);
  });

  it("updates the hidden input's value as fields are filled in", async () => {
    const screen = await render(<PinInput maxLength={4} />);
    const inputs = getPinInputs(screen.container);
    await userEvent.type(inputs[0], '1234');
    const hiddenInput = getHiddenInput(screen.container);
    await expect.element(locatorFor(hiddenInput)).toHaveValue('1234');
    await takeSnapshot(`PinInput - updates the hidden input's value as fields are filled in`);
  });

  /* -----------------------------------------------------------------------
   * Backspace navigation (3)
   * -------------------------------------------------------------------- */

  it('clears the current field and moves focus back on backspace when the field is filled', async () => {
    const screen = await render(<PinInput maxLength={4} />);
    const inputs = getPinInputs(screen.container);
    await userEvent.type(inputs[0], '1');
    await userEvent.keyboard('{Backspace}');
    await expect.element(locatorFor(inputs[0])).toHaveFocus();
    expect(inputs[0].value).toBe('');
    await takeSnapshot(`PinInput - clears the current field and moves focus back on backspace when the field is filled`);
  });

  it('moves focus to the previous field on backspace when the current field is empty', async () => {
    const screen = await render(<PinInput maxLength={4} />);
    const inputs = getPinInputs(screen.container);
    await userEvent.type(inputs[0], '12');
    await userEvent.keyboard('{Backspace}');
    await expect.element(locatorFor(inputs[1])).toHaveFocus();
    await takeSnapshot(`PinInput - moves focus to the previous field on backspace when the current field is empty`);
  });

  it('returns focus to the first field after repeated backspaces from the last field', async () => {
    const screen = await render(<PinInput maxLength={4} />);
    const inputs = getPinInputs(screen.container);
    await userEvent.type(inputs[0], '1234');
    await userEvent.keyboard('{Backspace}{Backspace}{Backspace}{Backspace}');
    await expect.element(locatorFor(inputs[0])).toHaveFocus();
    await takeSnapshot(`PinInput - returns focus to the first field after repeated backspaces from the last field`);
  });

  /* -----------------------------------------------------------------------
   * Paste behavior (3)
   * -------------------------------------------------------------------- */

  it('distributes a valid pasted value across fields starting at the focused index', async () => {
    const screen = await render(<PinInput maxLength={4} />);
    const inputs = getPinInputs(screen.container);
    await userEvent.click(inputs[0]);
    dispatchPaste(inputs[0], '1234');
    await expect.element(locatorFor(inputs[0])).toHaveValue('1');
    await expect.element(locatorFor(inputs[3])).toHaveValue('4');
    await takeSnapshot(`PinInput - distributes a valid pasted value across fields starting at the focused index`);
  });

  it('ignores a pasted value that fails the numeric type check', async () => {
    const screen = await render(<PinInput maxLength={4} type="numeric" />);
    const inputs = getPinInputs(screen.container);
    await userEvent.click(inputs[0]);
    dispatchPaste(inputs[0], 'abcd');
    await expect.element(locatorFor(inputs[0])).toHaveValue('');
    await takeSnapshot(`PinInput - ignores a pasted value that fails the numeric type check`);
  });

  it('truncates a pasted value longer than maxLength to fit the available fields', async () => {
    const screen = await render(<PinInput maxLength={4} />);
    const inputs = getPinInputs(screen.container);
    await userEvent.click(inputs[0]);
    dispatchPaste(inputs[0], '123456');
    await expect.element(locatorFor(inputs[0])).toHaveValue('1');
    await expect.element(locatorFor(inputs[3])).toHaveValue('4');
    await takeSnapshot(`PinInput - truncates a pasted value longer than maxLength to fit the available fields`);
  });

  /* -----------------------------------------------------------------------
   * maxLength boundaries (2)
   * -------------------------------------------------------------------- */

  it('renders exactly maxLength fields when set to 8', async () => {
    const screen = await render(<PinInput maxLength={8} />);
    expect(getPinInputs(screen.container)).toHaveLength(8);
    await takeSnapshot(`PinInput - renders exactly maxLength fields when set to 8`);
  });

  it("limits the hidden input's maxLength attribute to the configured field count", async () => {
    const screen = await render(<PinInput maxLength={8} />);
    const hiddenInput = getHiddenInput(screen.container);
    expect(hiddenInput.maxLength).toBe(8);
    await takeSnapshot(`PinInput - limits the hidden input's maxLength attribute to the configured field count`);
  });

  /* -----------------------------------------------------------------------
   * Controlled value (3)
   * -------------------------------------------------------------------- */

  it('renders pre-filled fields based on the initial value prop', async () => {
    const screen = await render(
      <ControlledPinFixture initialValue={['1', '2', '3', '4']} />
    );
    const inputs = getPinInputs(screen.container);
    expect(inputs.map((input) => input.value)).toEqual(['1', '2', '3', '4']);
    await takeSnapshot(`PinInput - renders pre-filled fields based on the initial value prop`);
  });

  it('updates displayed field values when the value prop changes externally', async () => {
    const screen = await render(
      <ControlledPinFixture initialValue={['', '', '', '']} />
    );
    const inputs = getPinInputs(screen.container);
    await userEvent.click(
      screen.getByRole('button', { name: 'Fill from outside' })
    );
    await expect.element(locatorFor(inputs[0])).toHaveValue('9');
    await expect.element(locatorFor(inputs[3])).toHaveValue('9');
    await takeSnapshot(`PinInput - updates displayed field values when the value prop changes externally`);
  });

  it('calls onValueChange when typing into an instance with onValueChange wired up', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <PinInput maxLength={4} onValueChange={onValueChange} />
    );
    const inputs = getPinInputs(screen.container);
    await userEvent.type(inputs[0], '5');
    expect(onValueChange).toHaveBeenCalled();
    await takeSnapshot(`PinInput - calls onValueChange when typing into an instance with onValueChange wired up`);
  });

  /* -----------------------------------------------------------------------
   * Disabled (4)
   * -------------------------------------------------------------------- */

  it('marks every field as disabled when disabled is true', async () => {
    const screen = await render(<PinInput maxLength={4} disabled />);
    const inputs = getPinInputs(screen.container);
    inputs.forEach((input) => expect(input.disabled).toBe(true));
    await takeSnapshot(`PinInput - marks every field as disabled when disabled is true`);
  });

  it('does not accept typed input when disabled', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <PinInput maxLength={4} disabled onValueChange={onValueChange} />
    );
    const inputs = getPinInputs(screen.container);
    await userEvent.type(inputs[0], '5');
    expect(inputs[0].value).toBe('');
    expect(onValueChange).not.toHaveBeenCalled();
    await takeSnapshot(`PinInput - does not accept typed input when disabled`);
  });

  it('marks the hidden input as disabled when disabled is true', async () => {
    const screen = await render(<PinInput maxLength={4} disabled />);
    const hiddenInput = getHiddenInput(screen.container);
    expect(hiddenInput.disabled).toBe(true);
    await takeSnapshot(`PinInput - marks the hidden input as disabled when disabled is true`);
  });

  it('applies disabled background, text, and cursor styling to the fields', async () => {
    const screen = await render(<PinInput maxLength={4} disabled />);
    const inputs = getPinInputs(screen.container);
    await expect.element(locatorFor(inputs[0])).toHaveStyle({
      backgroundColor: color.slate100,
      color: color.slate400,
      cursor: 'not-allowed',
    });
    await takeSnapshot(`PinInput - applies disabled background, text, and cursor styling to the fields`);
  });

  /* -----------------------------------------------------------------------
   * Required (2)
   * -------------------------------------------------------------------- */

  it('marks the hidden input as required when required is true', async () => {
    const screen = await render(<PinInput maxLength={4} required />);
    const hiddenInput = getHiddenInput(screen.container);
    expect(hiddenInput.required).toBe(true);
    await takeSnapshot(`PinInput - marks the hidden input as required when required is true`);
  });

  it('does not mark the hidden input as required by default', async () => {
    const screen = await render(<PinInput maxLength={4} />);
    const hiddenInput = getHiddenInput(screen.container);
    expect(hiddenInput.required).toBe(false);
    await takeSnapshot(`PinInput - does not mark the hidden input as required by default`);
  });

  /* -----------------------------------------------------------------------
   * Name / form-submission attributes (2)
   * -------------------------------------------------------------------- */

  it('exposes the provided name attribute on the hidden input', async () => {
    const screen = await render(
      <PinInput maxLength={4} name="verification-code" />
    );
    const hiddenInput = getHiddenInput(screen.container);
    expect(hiddenInput.name).toBe('verification-code');
    await takeSnapshot(`PinInput - exposes the provided name attribute on the hidden input`);
  });

  it('omits the name attribute when name is not provided', async () => {
    const screen = await render(<PinInput maxLength={4} />);
    const hiddenInput = getHiddenInput(screen.container);
    expect(hiddenInput.hasAttribute('name')).toBe(false);
    await takeSnapshot(`PinInput - omits the name attribute when name is not provided`);
  });

  /* -----------------------------------------------------------------------
   * OTP autocomplete (2)
   * -------------------------------------------------------------------- */

  it('sets autocomplete to one-time-code on fields when otp is true', async () => {
    const screen = await render(<PinInput maxLength={4} otp />);
    const inputs = getPinInputs(screen.container);
    inputs.forEach((input) =>
      expect(input.getAttribute('autocomplete')).toBe('one-time-code')
    );
    await takeSnapshot(`PinInput - sets autocomplete to one-time-code on fields when otp is true`);
  });

  it('sets autocomplete to off on fields when otp is false', async () => {
    const screen = await render(<PinInput maxLength={4} otp={false} />);
    const inputs = getPinInputs(screen.container);
    inputs.forEach((input) => expect(input.getAttribute('autocomplete')).toBe('off'));
    await takeSnapshot(`PinInput - sets autocomplete to off on fields when otp is false`);
  });

  /* -----------------------------------------------------------------------
   * Placeholder (2)
   * -------------------------------------------------------------------- */

  it('shows the custom placeholder on an unfocused empty field', async () => {
    const screen = await render(<PinInput maxLength={4} placeholder="*" />);
    const inputs = getPinInputs(screen.container);
    expect(inputs[0].getAttribute('placeholder')).toBe('*');
    await takeSnapshot(`PinInput - shows the custom placeholder on an unfocused empty field`);
  });

  it('clears the placeholder on the currently focused field', async () => {
    const screen = await render(<PinInput maxLength={4} placeholder="*" />);
    const inputs = getPinInputs(screen.container);
    await userEvent.click(inputs[0]);
    await expect.element(locatorFor(inputs[0])).toHaveAttribute('placeholder', '');
    await takeSnapshot(`PinInput - clears the placeholder on the currently focused field`);
  });

  /* -----------------------------------------------------------------------
   * Completion callback (2)
   * -------------------------------------------------------------------- */

  it('calls onValueChange with the full value once the last field is filled', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <PinInput maxLength={4} onValueChange={onValueChange} />
    );
    const inputs = getPinInputs(screen.container);
    await userEvent.type(inputs[0], '1234');
    expect(onValueChange).toHaveBeenCalledWith(
      expect.objectContaining({ valueAsString: '1234' })
    );
    await takeSnapshot(`PinInput - calls onValueChange with the full value once the last field is filled`);
  });

  it('does not report a complete value while fields remain empty', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <PinInput maxLength={4} onValueChange={onValueChange} />
    );
    const inputs = getPinInputs(screen.container);
    await userEvent.type(inputs[0], '12');
    const calls = onValueChange.mock.calls;
    const lastCall = calls[calls.length - 1][0] as { valueAsString: string };
    expect(lastCall.valueAsString).not.toBe('1234');
    expect(lastCall.valueAsString.length).toBeLessThan(4);
    await takeSnapshot(`PinInput - does not report a complete value while fields remain empty`);
  });

  /* -----------------------------------------------------------------------
   * Kitchen-sink combinations (2)
   * -------------------------------------------------------------------- */

  it('renders correctly with mask, otp, required, and a custom name together', async () => {
    const screen = await render(
      <PinInput maxLength={6} mask otp required name="secure-otp" />
    );
    const inputs = getPinInputs(screen.container);
    const hiddenInput = getHiddenInput(screen.container);
    expect(inputs).toHaveLength(6);
    inputs.forEach((input) => {
      expect(input.getAttribute('type')).toBe('password');
      expect(input.getAttribute('autocomplete')).toBe('one-time-code');
    });
    expect(hiddenInput.required).toBe(true);
    expect(hiddenInput.name).toBe('secure-otp');
    await takeSnapshot(`PinInput - renders correctly with mask, otp, required, and a custom name together`);
  });

  it('renders correctly with alphanumeric type, a custom maxLength, and disabled together', async () => {
    const screen = await render(
      <PinInput
        maxLength={5}
        type="alphanumeric"
        disabled
        value={['A', '1', 'B', '2', 'C']}
      />
    );
    const inputs = getPinInputs(screen.container);
    expect(inputs).toHaveLength(5);
    expect(inputs.map((input) => input.value)).toEqual(['A', '1', 'B', '2', 'C']);
    inputs.forEach((input) => expect(input.disabled).toBe(true));
    await takeSnapshot(`PinInput - renders correctly with alphanumeric type, a custom maxLength, and disabled together`);
  });
});
