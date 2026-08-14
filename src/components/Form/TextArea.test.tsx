import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { useState } from 'react';
import TextArea from './TextArea';
import Form from './Form';
import { color, spacing } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

/**
 * Small stateful fixture mirroring the "controlled textarea" usage pattern,
 * used to exercise real value/onValueChange wiring (as opposed to just spy
 * call counts).
 */
const ControlledFixture = ({ initial }: { initial: string }) => {
  const [value, setValue] = useState(initial);
  return (
    <TextArea
      id="controlled-fixture"
      label="Controlled fixture"
      value={value}
      onValueChange={setValue}
    />
  );
};

/**
 * Fixture mirroring the "live typing preview" usage pattern, pairing a
 * controlled textarea with a derived character count.
 */
const LiveTypingFixture = () => {
  const [value, setValue] = useState('');
  return (
    <div>
      <TextArea
        id="live-typing-fixture"
        label="Type here"
        value={value}
        onValueChange={setValue}
        placeholder="Start typing..."
      />
      <span>{value.length} characters</span>
    </div>
  );
};

describe('TextArea', () => {
  /* -----------------------------------------------------------------------
   * Label rendering (2)
   * -------------------------------------------------------------------- */

  it('renders the label content when label is provided', async () => {
    const screen = await render(<TextArea id="with-label" label="Comments" />);
    await expect.element(screen.getByText('Comments')).toBeInTheDocument();
    await takeSnapshot(`TextArea - renders the label content when label is provided`);
  });

  it('does not render a label element when label is omitted', async () => {
    const screen = await render(<TextArea placeholder="No label here" />);
    expect(screen.container.querySelector('label')).toBeNull();
    await takeSnapshot(`TextArea - does not render a label element when label is omitted`);
  });

  /* -----------------------------------------------------------------------
   * Validation status (4)
   * -------------------------------------------------------------------- */

  it('renders validationStatus="error" with role="alert" and the message text', async () => {
    const screen = await render(
      <TextArea id="status-error" validationStatus="error" validationMessage="Required" />
    );
    await expect.element(screen.getByRole('alert')).toBeVisible();
    await expect.element(screen.getByText('Required')).toBeVisible();
    await takeSnapshot(`TextArea - renders validationStatus="error" with role="alert" and the message text`);
  });

  it('renders validationStatus="warning" with role="status"', async () => {
    const screen = await render(
      <TextArea id="status-warning" validationStatus="warning" validationMessage="A bit short" />
    );
    await expect.element(screen.getByRole('status')).toBeVisible();
    await expect.element(screen.getByText('A bit short')).toBeVisible();
    await takeSnapshot(`TextArea - renders validationStatus="warning" with role="status"`);
  });

  it('renders validationStatus="success" with role="status"', async () => {
    const screen = await render(
      <TextArea id="status-success" validationStatus="success" validationMessage="Looks great!" />
    );
    await expect.element(screen.getByRole('status')).toBeVisible();
    await expect.element(screen.getByText('Looks great!')).toBeVisible();
    await takeSnapshot(`TextArea - renders validationStatus="success" with role="status"`);
  });

  it('renders validationStatus="info" with role="status"', async () => {
    const screen = await render(
      <TextArea id="status-info" validationStatus="info" validationMessage="Visible to team only" />
    );
    await expect.element(screen.getByRole('status')).toBeVisible();
    await expect.element(screen.getByText('Visible to team only')).toBeVisible();
    await takeSnapshot(`TextArea - renders validationStatus="info" with role="status"`);
  });

  /* -----------------------------------------------------------------------
   * Invalid semantics (2)
   * -------------------------------------------------------------------- */

  it('renders no validation message container when invalid is true but no message is given', async () => {
    const screen = await render(<TextArea id="invalid-no-message" invalid />);
    expect(screen.container.querySelector('[role="alert"]')).toBeNull();
    expect(screen.container.querySelector('[role="status"]')).toBeNull();
    await takeSnapshot(`TextArea - renders no validation message container when invalid is true but no message is given`);
  });

  it('exposes aria-invalid="true" only when invalid is true', async () => {
    const invalidScreen = await render(<TextArea id="aria-invalid-true" invalid />);
    const validScreen = await render(<TextArea id="aria-invalid-false" invalid={false} />);

    const invalidTextarea = invalidScreen.container.querySelector(
      'textarea'
    ) as HTMLTextAreaElement;
    const validTextarea = validScreen.container.querySelector('textarea') as HTMLTextAreaElement;

    expect(invalidTextarea.getAttribute('aria-invalid')).toBe('true');
    expect(validTextarea.hasAttribute('aria-invalid')).toBe(false);
    await takeSnapshot(`TextArea - exposes aria-invalid="true" only when invalid is true`);
  });

  /* -----------------------------------------------------------------------
   * Disabled (2)
   * -------------------------------------------------------------------- */

  it('disables the native textarea when disabled is true', async () => {
    const screen = await render(<TextArea id="disabled-textarea" disabled defaultValue="x" />);
    await expect.element(screen.getByRole('textbox')).toBeDisabled();
    await takeSnapshot(`TextArea - disables the native textarea when disabled is true`);
  });

  it('applies the disabled background and not-allowed cursor', async () => {
    const screen = await render(<TextArea id="disabled-style" disabled />);
    const textarea = screen.getByRole('textbox');
    await expect
      .element(textarea)
      .toHaveStyle({ backgroundColor: color.slate100, cursor: 'not-allowed' });
    await takeSnapshot(`TextArea - applies the disabled background and not-allowed cursor`);
  });

  /* -----------------------------------------------------------------------
   * ReadOnly (1)
   * -------------------------------------------------------------------- */

  it('keeps the value unchanged when readOnly and typed into', async () => {
    const screen = await render(
      <TextArea id="readonly-textarea" readOnly defaultValue="Cannot edit" />
    );
    const textarea = screen.getByRole('textbox');
    await expect.element(textarea).toHaveValue('Cannot edit');
    await userEvent.click(textarea);
    await userEvent.keyboard('more text');
    await expect.element(textarea).toHaveValue('Cannot edit');
    await takeSnapshot(`TextArea - keeps the value unchanged when readOnly and typed into`);
  });

  /* -----------------------------------------------------------------------
   * Required (2)
   * -------------------------------------------------------------------- */

  it('marks the native textarea as required when required is true', async () => {
    const screen = await render(<TextArea id="required-textarea" required />);
    expect(screen.getByRole('textbox').element<HTMLTextAreaElement>().required).toBe(true);
    await takeSnapshot(`TextArea - marks the native textarea as required when required is true`);
  });

  it('renders the required indicator on the label when required and label are both set', async () => {
    const screen = await render(<TextArea id="required-with-label" label="Bio" required />);
    await expect.element(screen.getByText('*')).toBeInTheDocument();
    await takeSnapshot(`TextArea - renders the required indicator on the label when required and label are both set`);
  });

  /* -----------------------------------------------------------------------
   * Autoresize (2)
   * -------------------------------------------------------------------- */

  it('sets an inline resize:none style when autoresize is true', async () => {
    const screen = await render(<TextArea id="autoresize-on" autoresize defaultValue="line one" />);
    const textarea = screen.getByRole('textbox').element<HTMLTextAreaElement>();
    expect(textarea.style.resize).toBe('none');
    await takeSnapshot(`TextArea - sets an inline resize:none style when autoresize is true`);
  });

  it('does not set an inline resize style when autoresize is false', async () => {
    const screen = await render(
      <TextArea id="autoresize-off" autoresize={false} defaultValue="line one" />
    );
    const textarea = screen.getByRole('textbox').element<HTMLTextAreaElement>();
    expect(textarea.style.resize).toBe('');
    await takeSnapshot(`TextArea - does not set an inline resize style when autoresize is false`);
  });

  /* -----------------------------------------------------------------------
   * Controlled / uncontrolled (2)
   * -------------------------------------------------------------------- */

  it('updates the controlled value via onValueChange as the user types', async () => {
    const screen = await render(<ControlledFixture initial="Start" />);
    const textarea = screen.getByLabelText('Controlled fixture');
    await expect.element(textarea).toHaveValue('Start');
    await userEvent.click(textarea);
    await userEvent.keyboard('{End}');
    await userEvent.type(textarea, '!');
    await expect.element(textarea).toHaveValue('Start!');
    await takeSnapshot(`TextArea - updates the controlled value via onValueChange as the user types`);
  });

  it('allows free typing on an uncontrolled textarea seeded with defaultValue', async () => {
    const screen = await render(
      <TextArea id="uncontrolled-textarea" defaultValue="Initial content" />
    );
    const textarea = screen.getByRole('textbox');
    await expect.element(textarea).toHaveValue('Initial content');
    await userEvent.click(textarea);
    await userEvent.keyboard('{End}');
    await userEvent.type(textarea, '!');
    await expect.element(textarea).toHaveValue('Initial content!');
    await takeSnapshot(`TextArea - allows free typing on an uncontrolled textarea seeded with defaultValue`);
  });

  /* -----------------------------------------------------------------------
   * Size variants (3)
   * -------------------------------------------------------------------- */

  it('applies the small minHeight for size="small"', async () => {
    const screen = await render(<TextArea id="size-small" size="small" />);
    await expect.element(screen.getByRole('textbox')).toHaveStyle({ 'min-height': spacing[16] });
    await takeSnapshot(`TextArea - applies the small minHeight for size="small"`);
  });

  it('applies the medium minHeight by default', async () => {
    const screen = await render(<TextArea id="size-medium" />);
    await expect.element(screen.getByRole('textbox')).toHaveStyle({ 'min-height': spacing[24] });
    await takeSnapshot(`TextArea - applies the medium minHeight by default`);
  });

  it('applies the large minHeight for size="large"', async () => {
    const screen = await render(<TextArea id="size-large" size="large" />);
    await expect.element(screen.getByRole('textbox')).toHaveStyle({ 'min-height': spacing[32] });
    await takeSnapshot(`TextArea - applies the large minHeight for size="large"`);
  });

  /* -----------------------------------------------------------------------
   * Placeholder (1)
   * -------------------------------------------------------------------- */

  it('renders the given placeholder text', async () => {
    const screen = await render(<TextArea id="placeholder-only" placeholder="Nothing typed yet" />);
    await expect.element(screen.getByPlaceholder('Nothing typed yet')).toBeInTheDocument();
    await takeSnapshot(`TextArea - renders the given placeholder text`);
  });

  /* -----------------------------------------------------------------------
   * Long content / rows override (2)
   * -------------------------------------------------------------------- */

  it('sets the rows attribute to a small explicit value', async () => {
    const screen = await render(<TextArea id="rows-three" rows={3} />);
    expect(screen.getByRole('textbox').element<HTMLTextAreaElement>().rows).toBe(3);
    await takeSnapshot(`TextArea - sets the rows attribute to a small explicit value`);
  });

  it('preserves the full long defaultValue when rows is set to a large value', async () => {
    const longParagraph = Array.from(
      { length: 8 },
      (_, i) => `Paragraph ${i + 1}: long line of pre-filled content.`
    ).join('\n');
    const screen = await render(
      <TextArea id="rows-many" rows={12} defaultValue={longParagraph} />
    );
    const textarea = screen.getByRole('textbox').element<HTMLTextAreaElement>();
    expect(textarea.rows).toBe(12);
    expect(textarea.value).toBe(longParagraph);
    await takeSnapshot(`TextArea - preserves the full long defaultValue when rows is set to a large value`);
  });

  /* -----------------------------------------------------------------------
   * maxLength (2)
   * -------------------------------------------------------------------- */

  it('reflects the maxLength prop on the native textarea', async () => {
    const screen = await render(<TextArea id="maxlength-prop" maxLength={20} />);
    expect(screen.getByRole('textbox').element<HTMLTextAreaElement>().maxLength).toBe(20);
    await takeSnapshot(`TextArea - reflects the maxLength prop on the native textarea`);
  });

  it('prevents typing beyond the maxLength limit', async () => {
    const screen = await render(<TextArea id="maxlength-enforced" maxLength={5} />);
    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, 'abcdefghij');
    await expect.element(textarea).toHaveValue('abcde');
    await takeSnapshot(`TextArea - prevents typing beyond the maxLength limit`);
  });

  /* -----------------------------------------------------------------------
   * Form composition (1)
   * -------------------------------------------------------------------- */

  it('renders correctly nested inside a Form, preserving label and placeholder', async () => {
    const screen = await render(
      <Form>
        <TextArea id="form-message" label="Message" placeholder="Write your message" />
      </Form>
    );
    expect(screen.container.querySelector('form')).not.toBeNull();
    await expect.element(screen.getByText('Message')).toBeInTheDocument();
    await expect
      .element(screen.getByPlaceholder('Write your message'))
      .toBeInTheDocument();
    await takeSnapshot(`TextArea - renders correctly nested inside a Form, preserving label and placeholder`);
  });

  /* -----------------------------------------------------------------------
   * Overflow (1)
   * -------------------------------------------------------------------- */

  it('keeps a long unbroken word fully in the value and applies word-break styling', async () => {
    const longWord =
      'Supercalifragilisticexpialidocioussupercalifragilisticexpialidocious';
    const screen = await render(<TextArea id="long-unbroken-word" defaultValue={longWord} />);
    const textarea = screen.getByRole('textbox');
    await expect.element(textarea).toHaveValue(longWord);
    await expect.element(textarea).toHaveStyle({ wordBreak: 'break-word' });
    await takeSnapshot(`TextArea - keeps a long unbroken word fully in the value and applies word-break styling`);
  });

  /* -----------------------------------------------------------------------
   * RTL / unicode (2)
   * -------------------------------------------------------------------- */

  it('passes the dir="rtl" attribute through to the native textarea', async () => {
    const screen = await render(
      <TextArea
        id="rtl-content"
        dir="rtl"
        defaultValue="هذا نص تجريبي باللغة العربية"
      />
    );
    await expect.element(screen.getByRole('textbox')).toHaveAttribute('dir', 'rtl');
    await takeSnapshot(`TextArea - passes the dir="rtl" attribute through to the native textarea`);
  });

  it('preserves unicode and emoji content exactly', async () => {
    const unicodeValue = '🎉 Héllo Wörld 日本語 中文 Ñandú 😀💬✨';
    const screen = await render(<TextArea id="unicode-emoji" defaultValue={unicodeValue} />);
    expect(screen.getByRole('textbox').element<HTMLTextAreaElement>().value).toBe(unicodeValue);
    await takeSnapshot(`TextArea - preserves unicode and emoji content exactly`);
  });

  /* -----------------------------------------------------------------------
   * Empty / whitespace value (2)
   * -------------------------------------------------------------------- */

  it('renders an empty value without throwing', async () => {
    const screen = await render(<TextArea id="empty-value" defaultValue="" />);
    await expect.element(screen.getByRole('textbox')).toHaveValue('');
    await takeSnapshot(`TextArea - renders an empty value without throwing`);
  });

  it('preserves a whitespace-only value exactly, without trimming', async () => {
    const screen = await render(<TextArea id="whitespace-only" defaultValue="   " />);
    expect(screen.getByRole('textbox').element<HTMLTextAreaElement>().value).toBe('   ');
    await takeSnapshot(`TextArea - preserves a whitespace-only value exactly, without trimming`);
  });

  /* -----------------------------------------------------------------------
   * Focus / blur (1)
   * -------------------------------------------------------------------- */

  it('changes the border color on focus and reverts the box-shadow on blur', async () => {
    const screen = await render(<TextArea id="focus-blur-demo" placeholder="Focus me" />);
    const textarea = screen.getByRole('textbox');
    const element = textarea.element<HTMLTextAreaElement>();

    await userEvent.click(textarea);
    await vi.waitFor(() => expect(element.style.borderColor).not.toBe(''));

    await userEvent.tab();
    await vi.waitFor(() => expect(element.style.boxShadow).toBe('none'));
    await takeSnapshot(`TextArea - changes the border color on focus and reverts the box-shadow on blur`);
  });

  /* -----------------------------------------------------------------------
   * aria-describedby wiring (1)
   * -------------------------------------------------------------------- */

  it('wires aria-describedby to the derived validation message id', async () => {
    const screen = await render(
      <TextArea
        id="aria-describedby-demo"
        label="Aria wiring"
        invalid
        validationMessage="This value is invalid"
      />
    );
    const textarea = screen.getByLabelText('Aria wiring');
    const describedBy = textarea.element<HTMLTextAreaElement>().getAttribute('aria-describedby');
    expect(describedBy).toBe('aria-describedby-demo-validation');
    expect(screen.container.querySelector(`#${describedBy}`)).not.toBeNull();
    await takeSnapshot(`TextArea - wires aria-describedby to the derived validation message id`);
  });

  /* -----------------------------------------------------------------------
   * Size crossed with status (2)
   * -------------------------------------------------------------------- */

  it('combines size="small" with an error status', async () => {
    const screen = await render(
      <TextArea id="small-error" size="small" invalid validationMessage="Required" />
    );
    await expect.element(screen.getByRole('alert')).toBeVisible();
    await expect.element(screen.getByRole('textbox')).toHaveStyle({ 'min-height': spacing[16] });
    await takeSnapshot(`TextArea - combines size="small" with an error status`);
  });

  it('combines size="large" with a success status', async () => {
    const screen = await render(
      <TextArea
        id="large-success"
        size="large"
        validationStatus="success"
        validationMessage="Looks good!"
      />
    );
    await expect.element(screen.getByRole('status')).toBeVisible();
    await expect.element(screen.getByRole('textbox')).toHaveStyle({ 'min-height': spacing[32] });
    await takeSnapshot(`TextArea - combines size="large" with a success status`);
  });

  /* -----------------------------------------------------------------------
   * labelProps passthrough (1)
   * -------------------------------------------------------------------- */

  it('forwards labelProps to FieldLabel, overriding just the label size', async () => {
    const screen = await render(
      <TextArea id="custom-label-props" label="Small label" labelProps={{ size: 'small' }} />
    );
    const defaultScreen = await render(<TextArea id="default-label-props" label="Default label" />);

    const customFontSize = parseFloat(
      getComputedStyle(screen.getByText('Small label').element()).fontSize
    );
    const defaultFontSize = parseFloat(
      getComputedStyle(defaultScreen.getByText('Default label').element()).fontSize
    );

    expect(customFontSize).toBeLessThan(defaultFontSize);
    await takeSnapshot(`TextArea - forwards labelProps to FieldLabel, overriding just the label size`);
  });

  /* -----------------------------------------------------------------------
   * Long label wrapping (1)
   * -------------------------------------------------------------------- */

  it('renders a long label in full without truncation', async () => {
    const longLabel =
      'This is a deliberately long label that should wrap across multiple lines without breaking the layout';
    const screen = await render(<TextArea id="long-label-text" label={longLabel} />);
    await expect.element(screen.getByText(longLabel)).toHaveTextContent(longLabel);
    await takeSnapshot(`TextArea - renders a long label in full without truncation`);
  });

  /* -----------------------------------------------------------------------
   * Live typing (1)
   * -------------------------------------------------------------------- */

  it('updates a derived character count as the user types', async () => {
    const screen = await render(<LiveTypingFixture />);
    const textarea = screen.getByPlaceholder('Start typing...');
    await userEvent.type(textarea, 'Hello!');
    await expect.element(textarea).toHaveValue('Hello!');
    await expect.element(screen.getByText('6 characters')).toBeInTheDocument();
    await takeSnapshot(`TextArea - updates a derived character count as the user types`);
  });

  /* -----------------------------------------------------------------------
   * Kitchen-sink (1)
   * -------------------------------------------------------------------- */

  it('renders a kitchen-sink combination of required, size, autoresize, maxLength and validation together', async () => {
    const screen = await render(
      <TextArea
        id="kitchen-sink"
        label="Detailed feedback"
        required
        size="large"
        autoresize
        maxLength={240}
        validationStatus="warning"
        validationMessage="You're approaching the character limit"
        defaultValue="Some pre-filled feedback content."
        placeholder="Share as much detail as you can"
      />
    );

    await expect.element(screen.getByText('*')).toBeInTheDocument();
    const textarea = screen.getByLabelText('Detailed feedback').element<HTMLTextAreaElement>();
    expect(textarea.required).toBe(true);
    expect(textarea.maxLength).toBe(240);
    expect(textarea.style.resize).toBe('none');
    await expect.element(screen.getByRole('textbox')).toHaveStyle({ 'min-height': spacing[32] });
    await expect.element(screen.getByRole('status')).toBeVisible();
    await expect
      .element(screen.getByText("You're approaching the character limit"))
      .toBeVisible();
    await takeSnapshot(`TextArea - renders a kitchen-sink combination of required, size, autoresize, maxLength and validation together`);
  });

  /* -----------------------------------------------------------------------
   * Size crossed with disabled (2)
   * -------------------------------------------------------------------- */

  it('disables a small textarea and keeps the small minHeight', async () => {
    const screen = await render(<TextArea id="small-disabled" size="small" disabled />);
    const textarea = screen.getByRole('textbox');
    await expect.element(textarea).toBeDisabled();
    await expect.element(textarea).toHaveStyle({ 'min-height': spacing[16] });
    await takeSnapshot(`TextArea - disables a small textarea and keeps the small minHeight`);
  });

  it('disables a large textarea and keeps the large minHeight', async () => {
    const screen = await render(<TextArea id="large-disabled" size="large" disabled />);
    const textarea = screen.getByRole('textbox');
    await expect.element(textarea).toBeDisabled();
    await expect.element(textarea).toHaveStyle({ 'min-height': spacing[32] });
    await takeSnapshot(`TextArea - disables a large textarea and keeps the large minHeight`);
  });

  /* -----------------------------------------------------------------------
   * Size crossed with inverted (2)
   * -------------------------------------------------------------------- */

  it('combines size="small" with inverted colors', async () => {
    const screen = await render(<TextArea id="small-inverted" size="small" inverted />);
    const textarea = screen.getByRole('textbox');
    await expect
      .element(textarea)
      .toHaveStyle({ backgroundColor: color.slate800, 'min-height': spacing[16] });
    await takeSnapshot(`TextArea - combines size="small" with inverted colors`);
  });

  it('combines size="large" with inverted colors', async () => {
    const screen = await render(<TextArea id="large-inverted" size="large" inverted />);
    const textarea = screen.getByRole('textbox');
    await expect
      .element(textarea)
      .toHaveStyle({ backgroundColor: color.slate800, 'min-height': spacing[32] });
    await takeSnapshot(`TextArea - combines size="large" with inverted colors`);
  });

  /* -----------------------------------------------------------------------
   * Autoresize + maxLength combined (1)
   * -------------------------------------------------------------------- */

  it('applies both the autoresize style and the maxLength cap at the same time', async () => {
    const screen = await render(
      <TextArea
        id="autoresize-maxlength"
        autoresize
        maxLength={80}
        defaultValue="This textarea grows as you type, but stops once it hits the character cap."
      />
    );
    const textarea = screen.getByRole('textbox').element<HTMLTextAreaElement>();
    expect(textarea.style.resize).toBe('none');
    expect(textarea.maxLength).toBe(80);
    await takeSnapshot(`TextArea - applies both the autoresize style and the maxLength cap at the same time`);
  });

  /* -----------------------------------------------------------------------
   * Disabled cascade to FieldLabel (1)
   * -------------------------------------------------------------------- */

  it('dims the associated FieldLabel when disabled is true', async () => {
    const screen = await render(
      <TextArea id="disabled-cascade" label="Disabled field" disabled defaultValue="x" />
    );
    const label = screen.getByText('Disabled field');
    await expect.element(label).toHaveStyle({ opacity: '0.5', cursor: 'not-allowed' });
    await takeSnapshot(`TextArea - dims the associated FieldLabel when disabled is true`);
  });

  /* -----------------------------------------------------------------------
   * Default-status inference (2)
   * -------------------------------------------------------------------- */

  it('defaults validationStatus to "error" (role="alert") when invalid is true and no status is given', async () => {
    const screen = await render(
      <TextArea id="default-status-error" invalid validationMessage="Something is wrong" />
    );
    await expect.element(screen.getByRole('alert')).toBeVisible();
    await takeSnapshot(`TextArea - defaults validationStatus to "error" (role="alert") when invalid is true and no status is given`);
  });

  it('honors an explicit validationStatus instead of defaulting to error when invalid is true', async () => {
    const screen = await render(
      <TextArea
        id="explicit-status-override"
        invalid
        validationStatus="warning"
        validationMessage="Still needs review"
      />
    );
    await expect.element(screen.getByRole('status')).toBeVisible();
    expect(screen.container.querySelector('[role="alert"]')).toBeNull();
    await takeSnapshot(`TextArea - honors an explicit validationStatus instead of defaulting to error when invalid is true`);
  });

  /* -----------------------------------------------------------------------
   * Multi-instance independence (1)
   * -------------------------------------------------------------------- */

  it('keeps two TextArea instances independent when typing into one', async () => {
    const screen = await render(
      <div>
        <TextArea id="multi-first" label="First" defaultValue="" />
        <TextArea id="multi-second" label="Second" defaultValue="" invalid validationMessage="Bad" />
      </div>
    );

    const first = screen.getByLabelText('First');
    const second = screen.getByLabelText('Second');

    await userEvent.type(first, 'only in first');

    await expect.element(first).toHaveValue('only in first');
    await expect.element(second).toHaveValue('');
    await expect.element(screen.getByRole('alert')).toBeVisible();
    await takeSnapshot(`TextArea - keeps two TextArea instances independent when typing into one`);
  });

  /* -----------------------------------------------------------------------
   * Keyboard tab order (1)
   * -------------------------------------------------------------------- */

  it('reaches the textarea via Tab from a preceding focusable element', async () => {
    const screen = await render(
      <div>
        <button type="button">Before</button>
        <TextArea id="tab-order-textarea" label="Tabbed field" />
      </div>
    );
    const before = screen.getByText('Before').element<HTMLButtonElement>();
    const textarea = screen.getByLabelText('Tabbed field');

    before.focus();
    expect(document.activeElement).toBe(before);

    await userEvent.tab();
    await expect.element(textarea).toHaveFocus();
    await takeSnapshot(`TextArea - reaches the textarea via Tab from a preceding focusable element`);
  });

  /* -----------------------------------------------------------------------
   * Programmatic rerender (1)
   * -------------------------------------------------------------------- */

  it('updates the displayed value when the controlled value prop changes via rerender', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <TextArea id="rerender-controlled" value="Initial" onValueChange={onValueChange} />
    );
    await expect.element(screen.getByRole('textbox')).toHaveValue('Initial');

    await screen.rerender(
      <TextArea id="rerender-controlled" value="Updated" onValueChange={onValueChange} />
    );

    await expect.element(screen.getByRole('textbox')).toHaveValue('Updated');
    await takeSnapshot(`TextArea - updates the displayed value when the controlled value prop changes via rerender`);
  });
});
