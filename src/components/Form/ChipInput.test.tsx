import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent, page } from 'vitest/browser';
import { useState, type ReactNode } from 'react';
import ChipInput from './ChipInput';
import { color, fontSize, spacing } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

/** Wraps a raw HTMLElement into a Locator so jest-dom matchers can be used. */
const locatorFor = (element: HTMLElement) => page.elementLocator(element);

/** Finds the first Ark UI TagsInput anatomy part (e.g. "control", "item") inside a root. */
const getPart = (root: HTMLElement, part: string) =>
  root.querySelector(`[data-part="${part}"]`) as HTMLElement | null;

/** Finds every Ark UI TagsInput anatomy part of a given kind inside a root. */
const getAllParts = (root: HTMLElement, part: string) =>
  Array.from(root.querySelectorAll(`[data-part="${part}"]`)) as HTMLElement[];

/**
 * Controlled usage fixture - mirrors the "value + onValueChange externally
 * owned" pattern used by real consumers, so tests exercise real state
 * updates rather than just spy call counts.
 */
const ControlledChipInputFixture = ({
  initial,
  onValueChange,
}: {
  initial: string[];
  onValueChange?: (value: string[]) => void;
}) => {
  const [value, setValue] = useState<string[]>(initial);

  return (
    <ChipInput
      label="Controlled tags"
      value={value}
      onValueChange={(details) => {
        setValue(details.value);
        onValueChange?.(details.value);
      }}
    />
  );
};

/**
 * Small fixture that submits a native form and surfaces the submitted
 * FormData as text, so tests can verify the hidden input participates in
 * real form submission rather than just asserting on its attributes.
 */
const FormSubmitFixture = ({ children }: { children: ReactNode }) => {
  const [submitted, setSubmitted] = useState<string | null>(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        setSubmitted(String(formData.get('tags') ?? ''));
      }}
    >
      {children}
      <button type="submit">Submit</button>
      {submitted !== null && <span data-testid="submitted-value">{submitted}</span>}
    </form>
  );
};

describe('ChipInput', () => {
  /* -----------------------------------------------------------------------
   * Size variants (3)
   * -------------------------------------------------------------------- */

  it('renders the small size with tighter control padding and font size', async () => {
    const screen = await render(
      <ChipInput size="small" label="Tags" defaultValue={['React']} />
    );
    const control = getPart(screen.container, 'control') as HTMLElement;
    await expect
      .element(locatorFor(control))
      .toHaveStyle({ 'min-height': spacing[8], fontSize: fontSize[12] });
    await takeSnapshot(`ChipInput - renders the small size with tighter control padding and font size`);
  });

  it('renders the medium size with the default control padding and font size', async () => {
    const screen = await render(
      <ChipInput size="medium" label="Tags" defaultValue={['React']} />
    );
    const control = getPart(screen.container, 'control') as HTMLElement;
    await expect
      .element(locatorFor(control))
      .toHaveStyle({ 'min-height': spacing[10], fontSize: fontSize[14] });
    await takeSnapshot(`ChipInput - renders the medium size with the default control padding and font size`);
  });

  it('renders the large size with roomier control padding and font size', async () => {
    const screen = await render(
      <ChipInput size="large" label="Tags" defaultValue={['React']} />
    );
    const control = getPart(screen.container, 'control') as HTMLElement;
    await expect
      .element(locatorFor(control))
      .toHaveStyle({ 'min-height': spacing[12], fontSize: fontSize[16] });
    await takeSnapshot(`ChipInput - renders the large size with roomier control padding and font size`);
  });

  /* -----------------------------------------------------------------------
   * Validation status (4)
   * -------------------------------------------------------------------- */

  it('renders an error validation message with role="alert"', async () => {
    const screen = await render(
      <ChipInput
        label="Skills"
        defaultValue={['JavaScript']}
        invalid
        validationStatus="error"
        validationMessage="At least two skills are required"
      />
    );
    await expect.element(screen.getByRole('alert')).toBeVisible();
    await expect
      .element(screen.getByText('At least two skills are required'))
      .toBeVisible();
    await takeSnapshot(`ChipInput - renders an error validation message with role="alert"`);
  });

  it('renders a warning validation message with role="status"', async () => {
    const screen = await render(
      <ChipInput
        label="Skills"
        defaultValue={['JavaScript', 'TypeScript']}
        validationStatus="warning"
        validationMessage="Consider adding a design skill too"
      />
    );
    await expect.element(screen.getByRole('status')).toBeVisible();
    await expect
      .element(screen.getByText('Consider adding a design skill too'))
      .toBeVisible();
    await takeSnapshot(`ChipInput - renders a warning validation message with role="status"`);
  });

  it('renders a success validation message with role="status"', async () => {
    const screen = await render(
      <ChipInput
        label="Skills"
        defaultValue={['JavaScript', 'TypeScript', 'React']}
        validationStatus="success"
        validationMessage="Great, that's a well-rounded skill set"
      />
    );
    await expect.element(screen.getByRole('status')).toBeVisible();
    await expect
      .element(screen.getByText("Great, that's a well-rounded skill set"))
      .toBeVisible();
    await takeSnapshot(`ChipInput - renders a success validation message with role="status"`);
  });

  it('renders an info validation message with role="status"', async () => {
    const screen = await render(
      <ChipInput
        label="Skills"
        defaultValue={['JavaScript']}
        validationStatus="info"
        validationMessage="Press Enter or comma to add a skill"
      />
    );
    await expect.element(screen.getByRole('status')).toBeVisible();
    await expect
      .element(screen.getByText('Press Enter or comma to add a skill'))
      .toBeVisible();
    await takeSnapshot(`ChipInput - renders an info validation message with role="status"`);
  });

  /* -----------------------------------------------------------------------
   * invalid alone, without a message (1)
   * -------------------------------------------------------------------- */

  it('marks the input as aria-invalid without rendering a validation message when only invalid is set', async () => {
    const screen = await render(
      <ChipInput label="Tags" defaultValue={['broken-tag']} invalid />
    );
    await expect.element(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.container.querySelector('[role="alert"]')).toBeNull();
    expect(screen.container.querySelector('[role="status"]')).toBeNull();
    await takeSnapshot(`ChipInput - marks the input as aria-invalid without rendering a validation message when only invalid is set`);
  });

  /* -----------------------------------------------------------------------
   * Disabled (2)
   * -------------------------------------------------------------------- */

  it('disables the free-text input and delete triggers when disabled is true', async () => {
    const screen = await render(
      <ChipInput label="Tags" defaultValue={['Locked', 'Cannot edit']} disabled />
    );
    await expect.element(screen.getByRole('textbox')).toBeDisabled();
    await expect
      .element(screen.getByRole('button', { name: 'Delete tag Locked' }))
      .toBeDisabled();
    await takeSnapshot(`ChipInput - disables the free-text input and delete triggers when disabled is true`);
  });

  it('does not remove a tag when its delete trigger is clicked while disabled', async () => {
    const screen = await render(
      <ChipInput label="Tags" defaultValue={['Locked', 'Cannot edit']} disabled />
    );
    const deleteButton = screen.getByRole('button', { name: 'Delete tag Locked' });
    await deleteButton.click({ force: true });
    await expect.element(screen.getByText('Locked')).toBeInTheDocument();
    await takeSnapshot(`ChipInput - does not remove a tag when its delete trigger is clicked while disabled`);
  });

  /* -----------------------------------------------------------------------
   * ReadOnly (1)
   * -------------------------------------------------------------------- */

  it('keeps the control tabbable but blocks typing and tag removal when readOnly', async () => {
    const screen = await render(
      <ChipInput label="Tags" defaultValue={['Read-only', 'Tag']} readOnly />
    );
    const control = getPart(screen.container, 'control') as HTMLElement;
    expect(control.tabIndex).toBe(0);
    await expect.element(screen.getByRole('textbox')).toBeDisabled();

    const deleteButton = screen.getByRole('button', { name: 'Delete tag Read-only' });
    await deleteButton.click();
    await expect.element(screen.getByText('Read-only')).toBeInTheDocument();
    await takeSnapshot(`ChipInput - keeps the control tabbable but blocks typing and tag removal when readOnly`);
  });

  /* -----------------------------------------------------------------------
   * Required (1)
   * -------------------------------------------------------------------- */

  it('marks the hidden input as required when required is true', async () => {
    const screen = await render(<ChipInput label="Tags" required name="tags" />);
    const hiddenInput = screen.container.querySelector('input[name="tags"]') as HTMLInputElement;
    expect(hiddenInput.required).toBe(true);
    await takeSnapshot(`ChipInput - marks the hidden input as required when required is true`);
  });

  /* -----------------------------------------------------------------------
   * Controlled vs uncontrolled (2)
   * -------------------------------------------------------------------- */

  it('reflects added tags back through onValueChange in controlled usage', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <ControlledChipInputFixture initial={['Controlled']} onValueChange={onValueChange} />
    );
    const input = screen.getByRole('textbox');
    await input.element().focus();
    await userEvent.type(input, 'Added');
    await userEvent.keyboard('{Enter}');

    await vi.waitFor(() => expect(getAllParts(screen.container, 'item-text').map((el) => el.textContent)).toContain(
      'Added'
    ));
    await vi.waitFor(() => expect(onValueChange).toHaveBeenCalledWith(['Controlled', 'Added']));
    await takeSnapshot(`ChipInput - reflects added tags back through onValueChange in controlled usage`);
  });

  it('manages its own state internally when used uncontrolled with defaultValue', async () => {
    const screen = await render(
      <ChipInput label="Uncontrolled tags" defaultValue={['Seeded']} />
    );
    const input = screen.getByRole('textbox');
    await input.element().focus();
    await userEvent.type(input, 'Extra');
    await userEvent.keyboard('{Enter}');

    await expect.element(screen.getByText('Seeded')).toBeInTheDocument();
    expect(getAllParts(screen.container, 'item-text').map((el) => el.textContent)).toContain(
      'Extra'
    );
    expect(getAllParts(screen.container, 'item')).toHaveLength(2);
    await takeSnapshot(`ChipInput - manages its own state internally when used uncontrolled with defaultValue`);
  });

  /* -----------------------------------------------------------------------
   * Prefilled with multiple default tags (1)
   * -------------------------------------------------------------------- */

  it('renders every default tag as a distinct chip', async () => {
    const screen = await render(
      <ChipInput label="Frameworks" defaultValue={['React', 'Vue', 'Svelte', 'Solid']} />
    );
    await expect.element(screen.getByText('React')).toBeVisible();
    await expect.element(screen.getByText('Vue')).toBeVisible();
    await expect.element(screen.getByText('Svelte')).toBeVisible();
    await expect.element(screen.getByText('Solid')).toBeVisible();
    expect(getAllParts(screen.container, 'item')).toHaveLength(4);
    await takeSnapshot(`ChipInput - renders every default tag as a distinct chip`);
  });

  /* -----------------------------------------------------------------------
   * Empty state (1)
   * -------------------------------------------------------------------- */

  it('shows only the placeholder and a hidden clear trigger when there are no tags', async () => {
    const screen = await render(
      <ChipInput label="Tags" placeholder="Type and press Enter" />
    );
    await expect
      .element(screen.getByPlaceholder('Type and press Enter'))
      .toBeVisible();
    expect(getAllParts(screen.container, 'item')).toHaveLength(0);
    const clearTrigger = getPart(screen.container, 'clear-trigger') as HTMLElement;
    expect(clearTrigger.hidden).toBe(true);
    await takeSnapshot(`ChipInput - shows only the placeholder and a hidden clear trigger when there are no tags`);
  });

  /* -----------------------------------------------------------------------
   * Enter adds tag (1)
   * -------------------------------------------------------------------- */

  it('adds a new tag when text is typed and Enter is pressed', async () => {
    const screen = await render(<ChipInput label="Add via Enter" placeholder="Add a tag" />);
    const input = screen.getByPlaceholder('Add a tag');

    await userEvent.type(input, 'Storybook');
    await userEvent.keyboard('{Enter}');

    await vi.waitFor(() => expect(getAllParts(screen.container, 'item-text').map((el) => el.textContent)).toContain(
      'Storybook'
    ));
    await takeSnapshot(`ChipInput - adds a new tag when text is typed and Enter is pressed`);
  });

  /* -----------------------------------------------------------------------
   * Comma delimiter (1)
   * -------------------------------------------------------------------- */

  it('adds a tag as soon as the comma delimiter is typed', async () => {
    const screen = await render(<ChipInput label="Add via comma" placeholder="Add a tag" />);
    const input = screen.getByPlaceholder('Add a tag');

    await userEvent.type(input, 'Vitest,');

    await vi.waitFor(() => expect(getAllParts(screen.container, 'item-text').map((el) => el.textContent)).toContain(
      'Vitest'
    ));
    await takeSnapshot(`ChipInput - adds a tag as soon as the comma delimiter is typed`);
  });

  /* -----------------------------------------------------------------------
   * Custom delimiter (1)
   * -------------------------------------------------------------------- */

  it('only splits on the configured delimiter, ignoring the default comma', async () => {
    const screen = await render(
      <ChipInput label="Semicolon separated" placeholder="Add a tag, then press ;" delimiter=";" />
    );
    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'Semicolon;');
    await vi.waitFor(() => expect(getAllParts(screen.container, 'item-text').map((el) => el.textContent)).toContain(
      'Semicolon'
    ));

    await userEvent.type(input, 'NoTag,');
    await vi.waitFor(() => expect(screen.getByText('NoTag').elements().length).toBe(0));
    await takeSnapshot(`ChipInput - only splits on the configured delimiter, ignoring the default comma`);
  });

  /* -----------------------------------------------------------------------
   * Remove a specific tag (1)
   * -------------------------------------------------------------------- */

  it('removes only the targeted tag when its delete trigger is clicked', async () => {
    const screen = await render(
      <ChipInput label="Remove a tag" defaultValue={['Keep', 'Remove me', 'Also keep']} />
    );
    const deleteButton = screen.getByRole('button', { name: 'Delete tag Remove me' });
    await deleteButton.click();

    await vi.waitFor(() => expect(getAllParts(screen.container, 'item-text').map((el) => el.textContent)).not.toContain(
      'Remove me'
    ));
    await expect.element(screen.getByText('Keep', { exact: true })).toBeInTheDocument();
    await expect.element(screen.getByText('Also keep')).toBeInTheDocument();
    await takeSnapshot(`ChipInput - removes only the targeted tag when its delete trigger is clicked`);
  });

  /* -----------------------------------------------------------------------
   * Editable tag (1)
   * -------------------------------------------------------------------- */

  it('enters inline edit mode, prefilled with the tag value, on double-click', async () => {
    const screen = await render(
      <ChipInput label="Double-click a tag to edit" defaultValue={['Editable']} editable />
    );
    await userEvent.dblClick(screen.getByText('Editable'));

    const itemInput = getPart(screen.container, 'item-input') as HTMLInputElement;
    await vi.waitFor(() => expect(itemInput.hidden).toBe(false));
    await vi.waitFor(() => expect(itemInput.value).toBe('Editable'));
    await takeSnapshot(`ChipInput - enters inline edit mode, prefilled with the tag value, on double-click`);
  });

  /* -----------------------------------------------------------------------
   * editable=false (1)
   * -------------------------------------------------------------------- */

  it('does not enter edit mode on double-click when editable is false', async () => {
    const screen = await render(
      <ChipInput label="Tags cannot be edited" defaultValue={['Locked shape']} editable={false} />
    );
    await userEvent.dblClick(screen.getByText('Locked shape'));

    const itemInput = getPart(screen.container, 'item-input') as HTMLInputElement;
    await vi.waitFor(() => expect(itemInput.hidden).toBe(true));
    await expect.element(screen.getByText('Locked shape')).toBeVisible();
    await takeSnapshot(`ChipInput - does not enter edit mode on double-click when editable is false`);
  });

  /* -----------------------------------------------------------------------
   * max limit (1)
   * -------------------------------------------------------------------- */

  it('silently rejects a new tag once the max count has been reached', async () => {
    const onValueInvalid = vi.fn();
    const screen = await render(
      <ChipInput
        label="Max 2 tags"
        defaultValue={['One', 'Two']}
        max={2}
        placeholder="Try adding a 3rd tag"
        onValueInvalid={onValueInvalid}
      />
    );
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Three');
    await userEvent.keyboard('{Enter}');

    await vi.waitFor(() => expect(screen.getByText('Three').elements().length).toBe(0));
    await vi.waitFor(() => expect(getAllParts(screen.container, 'item')).toHaveLength(2));
    await vi.waitFor(() => expect(onValueInvalid).not.toHaveBeenCalled());
    await takeSnapshot(`ChipInput - silently rejects a new tag once the max count has been reached`);
  });

  /* -----------------------------------------------------------------------
   * maxLength (1)
   * -------------------------------------------------------------------- */

  it("caps a tag's text at the configured maxLength", async () => {
    const screen = await render(
      <ChipInput label="Max 10 characters" maxLength={10} placeholder="Type a long value" />
    );
    const input = screen.getByPlaceholder('Type a long value');
    await userEvent.type(input, 'This is way more than ten characters');

    await expect.element(input).toHaveValue('This is wa');
    await takeSnapshot(`ChipInput - caps a tag's text at the configured maxLength`);
  });

  /* -----------------------------------------------------------------------
   * Duplicate rejection (1)
   * -------------------------------------------------------------------- */

  it('rejects a duplicate value via a custom validate function', async () => {
    const onValueInvalid = vi.fn();
    const screen = await render(
      <ChipInput
        label="No duplicate tags"
        defaultValue={['Unique']}
        placeholder="Try adding 'Unique' again"
        validate={({ value, inputValue }) => !value.includes(inputValue)}
        onValueInvalid={onValueInvalid}
      />
    );
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Unique');
    await userEvent.keyboard('{Enter}');

    await vi.waitFor(() => expect(onValueInvalid).toHaveBeenCalledWith({ reason: 'validate' }));
    await vi.waitFor(() => expect(getAllParts(screen.container, 'item')).toHaveLength(1));
    await takeSnapshot(`ChipInput - rejects a duplicate value via a custom validate function`);
  });

  /* -----------------------------------------------------------------------
   * Custom validate (2)
   * -------------------------------------------------------------------- */

  it('rejects a value that fails the custom validate function', async () => {
    const onValueInvalid = vi.fn();
    const screen = await render(
      <ChipInput
        label="Minimum 3 characters"
        placeholder="Try a short value like 'ab'"
        validate={({ inputValue }) => inputValue.trim().length >= 3}
        onValueInvalid={onValueInvalid}
      />
    );
    const input = screen.getByPlaceholder("Try a short value like 'ab'");
    await userEvent.type(input, 'ab');
    await userEvent.keyboard('{Enter}');

    await vi.waitFor(() => expect(onValueInvalid).toHaveBeenCalledWith({ reason: 'validate' }));
    await vi.waitFor(() => expect(screen.getByText('ab').elements().length).toBe(0));
    await takeSnapshot(`ChipInput - rejects a value that fails the custom validate function`);
  });

  it('accepts a value that passes the custom validate function', async () => {
    const onValueInvalid = vi.fn();
    const screen = await render(
      <ChipInput
        label="Minimum 3 characters"
        placeholder="Try a short value like 'ab'"
        validate={({ inputValue }) => inputValue.trim().length >= 3}
        onValueInvalid={onValueInvalid}
      />
    );
    const input = screen.getByPlaceholder("Try a short value like 'ab'");
    await userEvent.type(input, 'abcd');
    await userEvent.keyboard('{Enter}');

    await vi.waitFor(() => expect(getAllParts(screen.container, 'item-text').map((el) => el.textContent)).toContain(
      'abcd'
    ));
    await vi.waitFor(() => expect(onValueInvalid).not.toHaveBeenCalled());
    await takeSnapshot(`ChipInput - accepts a value that passes the custom validate function`);
  });

  /* -----------------------------------------------------------------------
   * ClearTrigger (1)
   * -------------------------------------------------------------------- */

  it('removes every tag when the clear trigger is clicked', async () => {
    const screen = await render(
      <ChipInput label="Clear all" defaultValue={['One', 'Two', 'Three']} />
    );
    const clearButton = screen.getByRole('button', { name: 'Clear all tags' });
    await clearButton.click();

    await vi.waitFor(() => expect(getAllParts(screen.container, 'item')).toHaveLength(0));
    await vi.waitFor(() => expect(screen.getByText('One').elements().length).toBe(0));
    await vi.waitFor(() => expect(screen.getByText('Two').elements().length).toBe(0));
    await vi.waitFor(() => expect(screen.getByText('Three').elements().length).toBe(0));
    await takeSnapshot(`ChipInput - removes every tag when the clear trigger is clicked`);
  });

  /* -----------------------------------------------------------------------
   * Many tags (1)
   * -------------------------------------------------------------------- */

  it('renders a dozen tags without dropping any', async () => {
    const many = [
      'Alpha',
      'Bravo',
      'Charlie',
      'Delta',
      'Echo',
      'Foxtrot',
      'Golf',
      'Hotel',
      'India',
      'Juliett',
      'Kilo',
      'Lima',
    ];
    const screen = await render(<ChipInput label="Many tags" defaultValue={many} />);

    expect(getAllParts(screen.container, 'item')).toHaveLength(12);
    await expect.element(screen.getByText('Alpha')).toBeVisible();
    await expect.element(screen.getByText('Lima')).toBeVisible();
    await takeSnapshot(`ChipInput - renders a dozen tags without dropping any`);
  });

  /* -----------------------------------------------------------------------
   * Long single tag (1)
   * -------------------------------------------------------------------- */

  it('preserves a very long tag value in full, without truncating the text content', async () => {
    const longValue =
      'this-is-a-very-long-tag-value-that-keeps-going-and-going-to-test-wrapping-and-overflow-behavior';
    const screen = await render(<ChipInput label="Long tag value" defaultValue={[longValue]} />);

    await expect.element(screen.getByText(longValue)).toHaveTextContent(longValue);
    await takeSnapshot(`ChipInput - preserves a very long tag value in full, without truncating the text content`);
  });

  /* -----------------------------------------------------------------------
   * Inverted crossed with size (3)
   * -------------------------------------------------------------------- */

  it('renders inverted colors at the small size', async () => {
    const screen = await render(
      <ChipInput label="Inverted small" size="small" inverted defaultValue={['Dark', 'Mode']} />
    );
    const control = getPart(screen.container, 'control') as HTMLElement;
    await expect
      .element(locatorFor(control))
      .toHaveStyle({ backgroundColor: color.slate800, fontSize: fontSize[12] });
    await takeSnapshot(`ChipInput - renders inverted colors at the small size`);
  });

  it('renders inverted colors at the medium size', async () => {
    const screen = await render(
      <ChipInput label="Inverted medium" size="medium" inverted defaultValue={['Dark', 'Mode']} />
    );
    const control = getPart(screen.container, 'control') as HTMLElement;
    await expect
      .element(locatorFor(control))
      .toHaveStyle({ backgroundColor: color.slate800, fontSize: fontSize[14] });
    await takeSnapshot(`ChipInput - renders inverted colors at the medium size`);
  });

  it('renders inverted colors at the large size', async () => {
    const screen = await render(
      <ChipInput label="Inverted large" size="large" inverted defaultValue={['Dark', 'Mode']} />
    );
    const control = getPart(screen.container, 'control') as HTMLElement;
    await expect
      .element(locatorFor(control))
      .toHaveStyle({ backgroundColor: color.slate800, fontSize: fontSize[16] });
    await takeSnapshot(`ChipInput - renders inverted colors at the large size`);
  });

  /* -----------------------------------------------------------------------
   * Inverted + invalid combined (1)
   * -------------------------------------------------------------------- */

  it('uses the inverted invalid border color when both inverted and invalid are set', async () => {
    const screen = await render(
      <ChipInput
        label="Inverted invalid"
        inverted
        invalid
        defaultValue={['Broken']}
        validationStatus="error"
        validationMessage="This field has an error"
      />
    );
    const control = getPart(screen.container, 'control') as HTMLElement;
    await expect
      .element(locatorFor(control))
      .toHaveStyle({ backgroundColor: color.slate800, borderColor: color.pink300 });
    await expect.element(screen.getByRole('alert')).toBeVisible();
    await takeSnapshot(`ChipInput - uses the inverted invalid border color when both inverted and invalid are set`);
  });

  /* -----------------------------------------------------------------------
   * RTL / unicode (2)
   * -------------------------------------------------------------------- */

  it('renders RTL and unicode tag values, preserving their exact text', async () => {
    const screen = await render(
      <ChipInput label="עברית / العربية" defaultValue={['שלום', 'مرحبا', 'こんにちは']} />
    );
    await expect.element(screen.getByText('שלום')).toHaveTextContent('שלום');
    await expect.element(screen.getByText('مرحبا')).toHaveTextContent('مرحبا');
    await expect.element(screen.getByText('こんにちは')).toHaveTextContent('こんにちは');
    await takeSnapshot(`ChipInput - renders RTL and unicode tag values, preserving their exact text`);
  });

  it('renders emoji tag values, preserving multi-codepoint emoji exactly', async () => {
    const screen = await render(
      <ChipInput label="Emoji tags" defaultValue={['🚀 launch', '🎉 party', '👩‍💻 dev']} />
    );
    await expect.element(screen.getByText('🚀 launch')).toHaveTextContent('🚀 launch');
    await expect.element(screen.getByText('👩‍💻 dev')).toHaveTextContent('👩‍💻 dev');
    await takeSnapshot(`ChipInput - renders emoji tag values, preserving multi-codepoint emoji exactly`);
  });

  /* -----------------------------------------------------------------------
   * Special characters (1)
   * -------------------------------------------------------------------- */

  it('renders a tag containing symbols and markup-like text as literal text', async () => {
    const screen = await render(
      <ChipInput
        label="Special characters"
        defaultValue={['C++ & C#', '100% done!', '<script>alert()</script>']}
      />
    );
    await expect.element(screen.getByText('C++ & C#')).toBeVisible();
    await expect.element(screen.getByText('100% done!')).toBeVisible();
    await expect.element(screen.getByText('<script>alert()</script>')).toBeInTheDocument();
    expect(screen.container.querySelector('script')).toBeNull();
    await takeSnapshot(`ChipInput - renders a tag containing symbols and markup-like text as literal text`);
  });

  /* -----------------------------------------------------------------------
   * Size crossed with status (2)
   * -------------------------------------------------------------------- */

  it('combines the small size with an error status and invalid border color', async () => {
    const screen = await render(
      <ChipInput
        label="Small + error"
        size="small"
        defaultValue={['Tag']}
        invalid
        validationStatus="error"
        validationMessage="Something is wrong"
      />
    );
    const control = getPart(screen.container, 'control') as HTMLElement;
    await expect
      .element(locatorFor(control))
      .toHaveStyle({ fontSize: fontSize[12], borderColor: color.pink600 });
    await expect.element(screen.getByRole('alert')).toBeVisible();
    await takeSnapshot(`ChipInput - combines the small size with an error status and invalid border color`);
  });

  it('combines the large size with a success status and default border color', async () => {
    const screen = await render(
      <ChipInput
        label="Large + success"
        size="large"
        defaultValue={['Tag']}
        validationStatus="success"
        validationMessage="Looks good"
      />
    );
    const control = getPart(screen.container, 'control') as HTMLElement;
    await expect
      .element(locatorFor(control))
      .toHaveStyle({ fontSize: fontSize[16], borderColor: color.slate300 });
    await expect.element(screen.getByRole('status')).toBeVisible();
    await takeSnapshot(`ChipInput - combines the large size with a success status and default border color`);
  });

  /* -----------------------------------------------------------------------
   * Size crossed with disabled (2)
   * -------------------------------------------------------------------- */

  it('combines the small size with disabled', async () => {
    const screen = await render(
      <ChipInput label="Small + disabled" size="small" defaultValue={['Locked']} disabled />
    );
    const control = getPart(screen.container, 'control') as HTMLElement;
    await expect.element(locatorFor(control)).toHaveStyle({ fontSize: fontSize[12] });
    await expect.element(screen.getByRole('textbox')).toBeDisabled();
    await takeSnapshot(`ChipInput - combines the small size with disabled`);
  });

  it('combines the large size with disabled', async () => {
    const screen = await render(
      <ChipInput label="Large + disabled" size="large" defaultValue={['Locked']} disabled />
    );
    const control = getPart(screen.container, 'control') as HTMLElement;
    await expect.element(locatorFor(control)).toHaveStyle({ fontSize: fontSize[16] });
    await expect.element(screen.getByRole('textbox')).toBeDisabled();
    await takeSnapshot(`ChipInput - combines the large size with disabled`);
  });

  /* -----------------------------------------------------------------------
   * name / hidden-input wiring (1)
   * -------------------------------------------------------------------- */

  it('wires the name attribute onto a hidden input carrying the comma-joined tag values', async () => {
    const screen = await render(
      <ChipInput
        label="Tags (check the DOM hidden input)"
        name="tags"
        defaultValue={['form-ready', 'submit-me']}
      />
    );
    const hiddenInput = screen.container.querySelector('input[name="tags"]') as HTMLInputElement;
    expect(hiddenInput).not.toBeNull();
    expect(hiddenInput.value).toBe('form-ready, submit-me');
    await takeSnapshot(`ChipInput - wires the name attribute onto a hidden input carrying the comma-joined tag values`);
  });

  /* -----------------------------------------------------------------------
   * Form composition (2)
   * -------------------------------------------------------------------- */

  it('submits the comma-joined tag values as part of native FormData', async () => {
    const screen = await render(
      <FormSubmitFixture>
        <ChipInput label="Tags" name="tags" defaultValue={['Preset', 'Tags']} />
      </FormSubmitFixture>
    );
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await expect.element(screen.getByTestId('submitted-value')).toHaveTextContent('Preset, Tags');
    await takeSnapshot(`ChipInput - submits the comma-joined tag values as part of native FormData`);
  });

  it('marks the hidden input required and shows the validation message inside a form', async () => {
    const screen = await render(
      <form>
        <ChipInput
          label="Required tags"
          name="tags"
          required
          invalid
          validationStatus="error"
          validationMessage="Please add at least one tag"
        />
      </form>
    );
    const hiddenInput = screen.container.querySelector('input[name="tags"]') as HTMLInputElement;
    expect(hiddenInput.required).toBe(true);
    await expect.element(screen.getByRole('alert')).toBeVisible();
    await expect
      .element(screen.getByText('Please add at least one tag'))
      .toBeVisible();
    await takeSnapshot(`ChipInput - marks the hidden input required and shows the validation message inside a form`);
  });

  /* -----------------------------------------------------------------------
   * No label vs with label (2)
   * -------------------------------------------------------------------- */

  it('renders no label element when label is omitted', async () => {
    const screen = await render(<ChipInput placeholder="No label here" />);
    expect(screen.container.querySelector('label')).toBeNull();
    await expect.element(screen.getByRole('textbox')).toBeVisible();
    await takeSnapshot(`ChipInput - renders no label element when label is omitted`);
  });

  it('renders the label content when label is provided', async () => {
    const screen = await render(<ChipInput label="Tags" placeholder="Add a tag" />);
    await expect.element(screen.getByText('Tags')).toBeVisible();
    expect(screen.container.querySelector('label')).not.toBeNull();
    await takeSnapshot(`ChipInput - renders the label content when label is provided`);
  });

  /* -----------------------------------------------------------------------
   * Keyboard arrow navigation (1)
   * -------------------------------------------------------------------- */

  it('moves the highlighted tag with the left arrow key', async () => {
    const screen = await render(
      <ChipInput label="Use arrow keys to navigate tags" defaultValue={['First', 'Second', 'Third']} />
    );
    const input = screen.getByRole('textbox');
    await input.element().focus();

    await userEvent.keyboard('{ArrowLeft}');
    let highlighted = screen.container.querySelector('[data-highlighted]');
    await vi.waitFor(() => expect(highlighted?.textContent).toContain('Third'));

    await userEvent.keyboard('{ArrowLeft}');
    highlighted = screen.container.querySelector('[data-highlighted]');
    await vi.waitFor(() => expect(highlighted?.textContent).toContain('Second'));
    await takeSnapshot(`ChipInput - moves the highlighted tag with the left arrow key`);
  });

  /* -----------------------------------------------------------------------
   * Kitchen-sink (1)
   * -------------------------------------------------------------------- */

  it('combines a label, required indicator, custom delimiter, max and validation message', async () => {
    const screen = await render(
      <ChipInput
        label="Kitchen sink"
        labelProps={{ requiredIndicator: '(required)' }}
        required
        defaultValue={['one', 'two']}
        delimiter=";"
        max={5}
        maxLength={20}
        placeholder="Add up to 5 tags, separated by ;"
        validationStatus="info"
        validationMessage="Separate tags with a semicolon, max 5 tags"
        size="medium"
      />
    );
    await expect.element(screen.getByText('Kitchen sink')).toBeVisible();
    await expect.element(screen.getByText('(required)')).toBeVisible();
    await expect.element(screen.getByText('one')).toBeVisible();
    await expect.element(screen.getByText('two')).toBeVisible();
    await expect
      .element(screen.getByText('Separate tags with a semicolon, max 5 tags'))
      .toBeVisible();

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'three;');
    await vi.waitFor(() => expect(getAllParts(screen.container, 'item-text').map((el) => el.textContent)).toContain(
      'three'
    ));
    await takeSnapshot(`ChipInput - combines a label, required indicator, custom delimiter, max and validation message`);
  });

  /* -----------------------------------------------------------------------
   * Near-max boundary (1)
   * -------------------------------------------------------------------- */

  it('allows one more tag to reach max exactly, then rejects the next one', async () => {
    const screen = await render(
      <ChipInput label="Exactly at max (3)" defaultValue={['One', 'Two']} max={3} />
    );
    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'Three');
    await userEvent.keyboard('{Enter}');
    await vi.waitFor(() => expect(getAllParts(screen.container, 'item-text').map((el) => el.textContent)).toContain(
      'Three'
    ));
    await vi.waitFor(() => expect(getAllParts(screen.container, 'item')).toHaveLength(3));

    await userEvent.type(input, 'Four');
    await userEvent.keyboard('{Enter}');
    await vi.waitFor(() => expect(screen.getByText('Four').elements().length).toBe(0));
    await vi.waitFor(() => expect(getAllParts(screen.container, 'item')).toHaveLength(3));
    await takeSnapshot(`ChipInput - allows one more tag to reach max exactly, then rejects the next one`);
  });

  /* -----------------------------------------------------------------------
   * Tag order preservation (1)
   * -------------------------------------------------------------------- */

  it('preserves the final order of tags through add, remove, then add again', async () => {
    const screen = await render(<ControlledChipInputFixture initial={['Alpha', 'Beta', 'Gamma']} />);

    await screen.getByRole('button', { name: 'Delete tag Beta' }).click();

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Delta');
    await userEvent.keyboard('{Enter}');

    const texts = getAllParts(screen.container, 'item-text').map((el) => el.textContent);
    await vi.waitFor(() => expect(texts).toContain('Delta'));
    await vi.waitFor(() => expect(texts).toEqual(['Alpha', 'Gamma', 'Delta']));
    await takeSnapshot(`ChipInput - preserves the final order of tags through add, remove, then add again`);
  });

  /* -----------------------------------------------------------------------
   * Backspace removes last tag (1)
   * -------------------------------------------------------------------- */

  it('removes the most recently added tag after two Backspace presses on empty input', async () => {
    const screen = await render(
      <ChipInput label="Backspace to remove" defaultValue={['Keep', 'Remove via backspace']} />
    );
    const input = screen.getByRole('textbox');
    await input.element().focus();

    // The first Backspace highlights the last tag, the second deletes it.
    await userEvent.keyboard('{Backspace}');
    await userEvent.keyboard('{Backspace}');

    await vi.waitFor(() => expect(getAllParts(screen.container, 'item-text').map((el) => el.textContent)).not.toContain(
      'Remove via backspace'
    ));
    await expect.element(screen.getByText('Keep', { exact: true })).toBeInTheDocument();
    await takeSnapshot(`ChipInput - removes the most recently added tag after two Backspace presses on empty input`);
  });

  /* -----------------------------------------------------------------------
   * Placeholder hidden with tags (1)
   * -------------------------------------------------------------------- */

  it('hides the placeholder attribute once at least one tag exists', async () => {
    const withTags = await render(
      <ChipInput
        label="Placeholder visibility"
        placeholder="You will not see this once a tag exists"
        defaultValue={['Already has a tag']}
      />
    );
    const filledInput = getPart(withTags.container, 'input') as HTMLInputElement;
    expect(filledInput.getAttribute('placeholder')).toBeNull();

    const empty = await render(
      <ChipInput label="Placeholder visibility" placeholder="You will not see this once a tag exists" />
    );
    const emptyInput = getPart(empty.container, 'input') as HTMLInputElement;
    expect(emptyInput.getAttribute('placeholder')).toBe(
      'You will not see this once a tag exists'
    );
    await takeSnapshot(`ChipInput - hides the placeholder attribute once at least one tag exists`);
  });
});
