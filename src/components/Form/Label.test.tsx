import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent, page } from 'vitest/browser';
import Label from './Label';
import Input from './Input';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

/** Wraps a raw HTMLElement into a Locator so jest-dom matchers can be used. */
const locatorFor = (element: HTMLElement) => page.elementLocator(element);

describe('Label', () => {
  /* -----------------------------------------------------------------------
   * Fixed base styles (4)
   * -------------------------------------------------------------------- */

  it('renders with display: inline-block', async () => {
    const screen = await render(<Label>Email Address</Label>);
    const label = screen.getByText('Email Address');
    await expect
      .element(locatorFor(label.element() as HTMLElement))
      .toHaveStyle({ display: 'inline-block' });
    await takeSnapshot(`Label - renders with display: inline-block`);
  });

  it('renders with the fixed fontSize[14] token', async () => {
    const screen = await render(<Label>Email Address</Label>);
    const label = screen.getByText('Email Address');
    await expect
      .element(locatorFor(label.element() as HTMLElement))
      .toHaveStyle({ fontSize: fontSize[14] });
    await takeSnapshot(`Label - renders with the fixed fontSize[14] token`);
  });

  it('renders with fontWeight.medium regardless of other props', async () => {
    const screen = await render(
      <Label inverted htmlFor="fw-input">
        Username
      </Label>
    );
    const label = screen.getByText('Username');
    await expect
      .element(locatorFor(label.element() as HTMLElement))
      .toHaveStyle({ fontWeight: `${fontWeight.medium}` });
    await takeSnapshot(`Label - renders with fontWeight.medium regardless of other props`);
  });

  it('renders with the fixed marginBottom spacing[2] token', async () => {
    const screen = await render(<Label>Email Address</Label>);
    const label = screen.getByText('Email Address');
    await expect
      .element(locatorFor(label.element() as HTMLElement))
      .toHaveStyle({ 'margin-bottom': spacing[2] });
    await takeSnapshot(`Label - renders with the fixed marginBottom spacing[2] token`);
  });

  /* -----------------------------------------------------------------------
   * Non-inverted color/background (2)
   * -------------------------------------------------------------------- */

  it('renders slate700 text color when inverted is false', async () => {
    const screen = await render(<Label inverted={false}>Standard</Label>);
    const label = screen.getByText('Standard');
    await expect
      .element(locatorFor(label.element() as HTMLElement))
      .toHaveStyle({ color: color.slate700 });
    await takeSnapshot(`Label - renders slate700 text color when inverted is false`);
  });

  it('renders a transparent background when inverted is false', async () => {
    const screen = await render(<Label inverted={false}>Standard</Label>);
    const label = screen.getByText('Standard');
    await expect
      .element(locatorFor(label.element() as HTMLElement))
      .toHaveStyle({ backgroundColor: 'transparent' });
    await takeSnapshot(`Label - renders a transparent background when inverted is false`);
  });

  /* -----------------------------------------------------------------------
   * Non-inverted has no padding/border-radius (2)
   * -------------------------------------------------------------------- */

  it('applies no padding when inverted is false', async () => {
    const screen = await render(<Label>Standard</Label>);
    const label = screen.getByText('Standard');
    await expect
      .element(locatorFor(label.element() as HTMLElement))
      .toHaveStyle({ padding: '0px' });
    await takeSnapshot(`Label - applies no padding when inverted is false`);
  });

  it('applies no border radius when inverted is false', async () => {
    const screen = await render(<Label>Standard</Label>);
    const label = screen.getByText('Standard');
    await expect
      .element(locatorFor(label.element() as HTMLElement))
      .toHaveStyle({ borderRadius: '0px' });
    await takeSnapshot(`Label - applies no border radius when inverted is false`);
  });

  /* -----------------------------------------------------------------------
   * Inverted color/background (2)
   * -------------------------------------------------------------------- */

  it('renders white text color when inverted is true', async () => {
    const screen = await render(<Label inverted>Username</Label>);
    const label = screen.getByText('Username');
    await expect
      .element(locatorFor(label.element() as HTMLElement))
      .toHaveStyle({ color: color.white });
    await takeSnapshot(`Label - renders white text color when inverted is true`);
  });

  it('renders a slate800 background when inverted is true', async () => {
    const screen = await render(<Label inverted>Username</Label>);
    const label = screen.getByText('Username');
    await expect
      .element(locatorFor(label.element() as HTMLElement))
      .toHaveStyle({ backgroundColor: color.slate800 });
    await takeSnapshot(`Label - renders a slate800 background when inverted is true`);
  });

  /* -----------------------------------------------------------------------
   * Inverted padding/border-radius present (2)
   * -------------------------------------------------------------------- */

  it('applies the expected padding using spacing tokens when inverted is true', async () => {
    const screen = await render(<Label inverted>Username</Label>);
    const label = screen.getByText('Username');
    await expect
      .element(locatorFor(label.element() as HTMLElement))
      .toHaveStyle({ padding: `${spacing[1]} ${spacing[2]}` });
    await takeSnapshot(`Label - applies the expected padding using spacing tokens when inverted is true`);
  });

  it('applies the spacing[1] border radius when inverted is true', async () => {
    const screen = await render(<Label inverted>Username</Label>);
    const label = screen.getByText('Username');
    await expect
      .element(locatorFor(label.element() as HTMLElement))
      .toHaveStyle({ borderRadius: spacing[1] });
    await takeSnapshot(`Label - applies the spacing[1] border radius when inverted is true`);
  });

  /* -----------------------------------------------------------------------
   * htmlFor attribute rendering (2)
   * -------------------------------------------------------------------- */

  it('renders a "for" attribute matching htmlFor when provided', async () => {
    const screen = await render(
      <Label htmlFor="email-input">Email Address</Label>
    );
    const label = screen.getByText('Email Address');
    await expect.element(label).toHaveAttribute('for', 'email-input');
    await takeSnapshot(`Label - renders a "for" attribute matching htmlFor when provided`);
  });

  it('does not render a "for" attribute when htmlFor is omitted', async () => {
    const screen = await render(<Label>Email Address</Label>);
    const label = screen.getByText('Email Address');
    expect(label.element().getAttribute('for')).toBeNull();
    await takeSnapshot(`Label - does not render a "for" attribute when htmlFor is omitted`);
  });

  /* -----------------------------------------------------------------------
   * Cursor style depending on htmlFor (2)
   * -------------------------------------------------------------------- */

  it('applies a pointer cursor when htmlFor is provided', async () => {
    const screen = await render(
      <Label htmlFor="cursor-input">Email Address</Label>
    );
    const label = screen.getByText('Email Address');
    await expect
      .element(locatorFor(label.element() as HTMLElement))
      .toHaveStyle({ cursor: 'pointer' });
    await takeSnapshot(`Label - applies a pointer cursor when htmlFor is provided`);
  });

  it('applies a default cursor when htmlFor is omitted', async () => {
    const screen = await render(<Label>Email Address</Label>);
    const label = screen.getByText('Email Address');
    await expect
      .element(locatorFor(label.element() as HTMLElement))
      .toHaveStyle({ cursor: 'default' });
    await takeSnapshot(`Label - applies a default cursor when htmlFor is omitted`);
  });

  /* -----------------------------------------------------------------------
   * Click-to-focus association with a real form control (4)
   * -------------------------------------------------------------------- */

  it('moves focus to a native input when the associated label is clicked', async () => {
    const screen = await render(
      <div>
        <Label htmlFor="focus-input">Full Name</Label>
        <input id="focus-input" type="text" />
      </div>
    );
    const label = screen.getByText('Full Name');
    const input = screen.getByRole('textbox');
    await userEvent.click(label);
    await expect.element(input).toHaveFocus();
    await takeSnapshot(`Label - moves focus to a native input when the associated label is clicked`);
  });

  it('moves focus to the real Input component when the associated label is clicked', async () => {
    const screen = await render(
      <div>
        <Label htmlFor="real-input-focus">Display Name</Label>
        <Input id="real-input-focus" placeholder="Jane Doe" />
      </div>
    );
    const label = screen.getByText('Display Name');
    const input = screen.getByRole('textbox');
    await userEvent.click(label);
    await expect.element(input).toHaveFocus();
    await takeSnapshot(`Label - moves focus to the real Input component when the associated label is clicked`);
  });

  it('moves focus to its paired input even when the label is inverted', async () => {
    const screen = await render(
      <div>
        <Label htmlFor="inverted-focus-input" inverted>
          Username
        </Label>
        <input id="inverted-focus-input" type="text" />
      </div>
    );
    const label = screen.getByText('Username');
    const input = screen.getByRole('textbox');
    await userEvent.click(label);
    await expect.element(input).toHaveFocus();
    await takeSnapshot(`Label - moves focus to its paired input even when the label is inverted`);
  });

  it('moves focus to a paired checkbox input when clicked', async () => {
    const screen = await render(
      <div>
        <Label htmlFor="focus-checkbox">Accept terms</Label>
        <input id="focus-checkbox" type="checkbox" />
      </div>
    );
    const label = screen.getByText('Accept terms');
    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(label);
    await expect.element(checkbox).toHaveFocus();
    await takeSnapshot(`Label - moves focus to a paired checkbox input when clicked`);
  });

  /* -----------------------------------------------------------------------
   * Textarea/select association (2)
   * -------------------------------------------------------------------- */

  it('moves focus to a paired textarea when the label is clicked', async () => {
    const screen = await render(
      <div>
        <Label htmlFor="focus-textarea">Comments</Label>
        <textarea id="focus-textarea" />
      </div>
    );
    const label = screen.getByText('Comments');
    const textarea = screen.getByRole('textbox');
    await userEvent.click(label);
    await expect.element(textarea).toHaveFocus();
    await takeSnapshot(`Label - moves focus to a paired textarea when the label is clicked`);
  });

  it('moves focus to a paired select element when the label is clicked', async () => {
    const screen = await render(
      <div>
        <Label htmlFor="focus-select">Country</Label>
        <select id="focus-select">
          <option value="us">United States</option>
          <option value="ca">Canada</option>
        </select>
      </div>
    );
    const label = screen.getByText('Country');
    const select = screen.getByRole('combobox');
    await userEvent.click(label);
    await expect.element(select).toHaveFocus();
    await takeSnapshot(`Label - moves focus to a paired select element when the label is clicked`);
  });

  /* -----------------------------------------------------------------------
   * RTL/unicode/emoji content (4)
   * -------------------------------------------------------------------- */

  it('renders right-to-left Arabic content exactly', async () => {
    const screen = await render(<Label>الاسم الكامل</Label>);
    await expect
      .element(screen.getByText('الاسم الكامل'))
      .toHaveTextContent('الاسم الكامل');
    await takeSnapshot(`Label - renders right-to-left Arabic content exactly`);
  });

  it('renders without throwing inside a right-to-left ancestor', async () => {
    const screen = await render(
      <div dir="rtl">
        <Label htmlFor="rtl-input">الاسم الكامل</Label>
      </div>
    );
    await expect.element(screen.getByText('الاسم الكامل')).toBeInTheDocument();
    await takeSnapshot(`Label - renders without throwing inside a right-to-left ancestor`);
  });

  it('renders mixed unicode/accented content exactly', async () => {
    const unicodeText = '名前 🎌 ünïcödé Ñame';
    const screen = await render(<Label>{unicodeText}</Label>);
    await expect
      .element(screen.getByText(unicodeText))
      .toHaveTextContent(unicodeText);
    await takeSnapshot(`Label - renders mixed unicode/accented content exactly`);
  });

  it('renders emoji-only content exactly', async () => {
    const screen = await render(<Label>🔥 Trending Now 🚀</Label>);
    await expect
      .element(screen.getByText('🔥 Trending Now 🚀'))
      .toHaveTextContent('🔥 Trending Now 🚀');
    await takeSnapshot(`Label - renders emoji-only content exactly`);
  });

  /* -----------------------------------------------------------------------
   * Empty-ish content (2)
   * -------------------------------------------------------------------- */

  it('renders without throwing when children is an empty string', async () => {
    const screen = await render(<Label htmlFor="empty-input">{''}</Label>);
    const label = screen.container.querySelector('label');
    expect(label).not.toBeNull();
    expect(label?.getAttribute('for')).toBe('empty-input');
    await takeSnapshot(`Label - renders without throwing when children is an empty string`);
  });

  it('renders whitespace-only children without collapsing the element', async () => {
    const screen = await render(<Label>{'   '}</Label>);
    const label = screen.container.querySelector('label');
    expect(label).not.toBeNull();
    expect(label?.tagName).toBe('LABEL');
    await takeSnapshot(`Label - renders whitespace-only children without collapsing the element`);
  });

  /* -----------------------------------------------------------------------
   * Nested element children (3)
   * -------------------------------------------------------------------- */

  it('renders a nested <strong> element inside the label content', async () => {
    const screen = await render(
      <Label>
        This field is <strong>mandatory</strong>
      </Label>
    );
    const strongEl = screen.container.querySelector('strong');
    expect(strongEl).not.toBeNull();
    expect(strongEl?.textContent).toBe('mandatory');
    await takeSnapshot(`Label - renders a nested <strong> element inside the label content`);
  });

  it('renders a nested <span> element inside the label content', async () => {
    const screen = await render(
      <Label>
        Shipping <span data-testid="nested-span">Address</span>
      </Label>
    );
    await expect
      .element(screen.getByTestId('nested-span'))
      .toHaveTextContent('Address');
    await takeSnapshot(`Label - renders a nested <span> element inside the label content`);
  });

  it('renders mixed plain text and nested elements together', async () => {
    const screen = await render(
      <Label>
        <span data-testid="mixed-prefix">Billing</span> <strong>Address</strong>{' '}
        (optional)
      </Label>
    );
    await expect
      .element(screen.getByTestId('mixed-prefix'))
      .toHaveTextContent('Billing');
    const strongEl = screen.container.querySelector('strong');
    expect(strongEl?.textContent).toBe('Address');
    await expect.element(screen.getByText(/optional/)).toBeInTheDocument();
    await takeSnapshot(`Label - renders mixed plain text and nested elements together`);
  });

  /* -----------------------------------------------------------------------
   * Various children types (2)
   * -------------------------------------------------------------------- */

  it('renders a plain string child correctly', async () => {
    const screen = await render(<Label>Plain string label</Label>);
    await expect
      .element(screen.getByText('Plain string label'))
      .toHaveTextContent('Plain string label');
    await takeSnapshot(`Label - renders a plain string child correctly`);
  });

  it('renders a numeric-looking string child correctly', async () => {
    const screen = await render(<Label>{'42'}</Label>);
    await expect.element(screen.getByText('42')).toHaveTextContent('42');
    await takeSnapshot(`Label - renders a numeric-looking string child correctly`);
  });

  /* -----------------------------------------------------------------------
   * Multi-instance independence (2)
   * -------------------------------------------------------------------- */

  it('does not leak inverted styling between two label instances', async () => {
    const screen = await render(
      <div>
        <Label inverted>First</Label>
        <Label inverted={false}>Second</Label>
      </div>
    );
    const first = screen.getByText('First');
    const second = screen.getByText('Second');
    await expect
      .element(locatorFor(first.element() as HTMLElement))
      .toHaveStyle({ color: color.white, backgroundColor: color.slate800 });
    await expect
      .element(locatorFor(second.element() as HTMLElement))
      .toHaveStyle({ color: color.slate700, backgroundColor: 'transparent' });
    await takeSnapshot(`Label - does not leak inverted styling between two label instances`);
  });

  it('moves focus independently to each label\'s own paired input in a multi-label form', async () => {
    const screen = await render(
      <div>
        <Label htmlFor="multi-1">First</Label>
        <input id="multi-1" type="text" />
        <Label htmlFor="multi-2">Second</Label>
        <input id="multi-2" type="text" />
      </div>
    );
    const firstLabel = screen.getByText('First');
    const secondLabel = screen.getByText('Second');
    const inputs = screen.getByRole('textbox').elements();
    const firstInput = inputs[0] as HTMLInputElement;
    const secondInput = inputs[1] as HTMLInputElement;

    await userEvent.click(firstLabel);
    await vi.waitFor(() => expect(document.activeElement).toBe(firstInput));

    await userEvent.click(secondLabel);
    await vi.waitFor(() => expect(document.activeElement).toBe(secondInput));
    await takeSnapshot(`Label - moves focus independently to each label\'s own paired input in a multi-label form`);
  });

  /* -----------------------------------------------------------------------
   * Default prop values when omitted (2)
   * -------------------------------------------------------------------- */

  it('defaults inverted to false when omitted (slate700 text, transparent background)', async () => {
    const screen = await render(<Label>Defaults</Label>);
    const label = screen.getByText('Defaults');
    await expect
      .element(locatorFor(label.element() as HTMLElement))
      .toHaveStyle({ color: color.slate700, backgroundColor: 'transparent' });
    await takeSnapshot(`Label - defaults inverted to false when omitted (slate700 text, transparent background)`);
  });

  it('defaults to no padding/border-radius and a default cursor when props are omitted', async () => {
    const screen = await render(<Label>Defaults</Label>);
    const label = screen.getByText('Defaults');
    await expect.element(locatorFor(label.element() as HTMLElement)).toHaveStyle({
      padding: '0px',
      borderRadius: '0px',
      cursor: 'default',
    });
    await takeSnapshot(`Label - defaults to no padding/border-radius and a default cursor when props are omitted`);
  });

  /* -----------------------------------------------------------------------
   * Long text wrapping (2)
   * -------------------------------------------------------------------- */

  it('renders long text in full without truncating it', async () => {
    const longText =
      'This is an intentionally long label used to verify that the text wraps correctly across multiple lines instead of overflowing its container';
    const screen = await render(<Label>{longText}</Label>);
    await expect
      .element(screen.getByText(longText))
      .toHaveTextContent(longText);
    await takeSnapshot(`Label - renders long text in full without truncating it`);
  });

  it('renders a very long unbroken token without breaking the DOM', async () => {
    const longToken =
      'Supercalifragilisticexpialidocious-identifier-field-name-with-no-breaks-1234567890';
    const screen = await render(<Label>{longToken}</Label>);
    await expect.element(screen.getByText(longToken)).toBeInTheDocument();
    await takeSnapshot(`Label - renders a very long unbroken token without breaking the DOM`);
  });

  /* -----------------------------------------------------------------------
   * Kitchen-sink combos (3)
   * -------------------------------------------------------------------- */

  it('renders a kitchen-sink label combining inverted, htmlFor and long text', async () => {
    const longText =
      'A fairly long inverted label demonstrating wrapping alongside a linked input field';
    const screen = await render(
      <div>
        <Label htmlFor="kitchen-sink-input" inverted>
          {longText}
        </Label>
        <input id="kitchen-sink-input" type="text" />
      </div>
    );
    const label = screen.getByText(longText);
    await expect.element(label).toHaveAttribute('for', 'kitchen-sink-input');
    await expect
      .element(locatorFor(label.element() as HTMLElement))
      .toHaveStyle({
        color: color.white,
        backgroundColor: color.slate800,
        padding: `${spacing[1]} ${spacing[2]}`,
        cursor: 'pointer',
      });
    await takeSnapshot(`Label - renders a kitchen-sink label combining inverted, htmlFor and long text`);
  });

  it('renders a kitchen-sink label with a required-style asterisk child while inverted', async () => {
    const screen = await render(
      <Label htmlFor="kitchen-sink-required" inverted>
        Email Address <span data-testid="required-marker">*</span>
      </Label>
    );
    await expect
      .element(screen.getByTestId('required-marker'))
      .toBeInTheDocument();
    const label = screen.container.querySelector('label') as HTMLElement;
    await expect
      .element(locatorFor(label))
      .toHaveStyle({ color: color.white, backgroundColor: color.slate800 });
    await takeSnapshot(`Label - renders a kitchen-sink label with a required-style asterisk child while inverted`);
  });

  it('combines inverted, htmlFor and click-to-focus with the real Input component', async () => {
    const screen = await render(
      <div>
        <Label htmlFor="kitchen-sink-real-input" inverted>
          Display Name
        </Label>
        <Input id="kitchen-sink-real-input" inverted placeholder="Jane Doe" />
      </div>
    );
    const label = screen.getByText('Display Name');
    const input = screen.getByRole('textbox');
    await expect.element(label).toHaveAttribute('for', 'kitchen-sink-real-input');
    await userEvent.click(label);
    await expect.element(input).toHaveFocus();
    await takeSnapshot(`Label - combines inverted, htmlFor and click-to-focus with the real Input component`);
  });

  /* -----------------------------------------------------------------------
   * Dangling htmlFor (1)
   * -------------------------------------------------------------------- */

  it('still renders the "for" attribute and pointer cursor even when no matching element exists', async () => {
    const screen = await render(
      <Label htmlFor="no-such-element">Dangling association</Label>
    );
    const label = screen.getByText('Dangling association');
    await expect.element(label).toHaveAttribute('for', 'no-such-element');
    await expect
      .element(locatorFor(label.element() as HTMLElement))
      .toHaveStyle({ cursor: 'pointer' });
    await takeSnapshot(`Label - still renders the "for" attribute and pointer cursor even when no matching element exists`);
  });

  /* -----------------------------------------------------------------------
   * Native semantics (1)
   * -------------------------------------------------------------------- */

  it('renders an actual <label> element, not a generic div/span', async () => {
    const screen = await render(<Label>Field</Label>);
    const label = screen.getByText('Field');
    expect(label.element().tagName).toBe('LABEL');
    await takeSnapshot(`Label - renders an actual <label> element, not a generic div/span`);
  });

  /* -----------------------------------------------------------------------
   * Keyboard tab order (1)
   * -------------------------------------------------------------------- */

  it('is not independently reachable via Tab, but its paired input is', async () => {
    const screen = await render(
      <div>
        <button type="button">Before</button>
        <Label htmlFor="tab-order-input">Tabbed Label</Label>
        <input id="tab-order-input" type="text" />
      </div>
    );
    const before = screen.getByText('Before').element() as HTMLElement;
    const input = screen.getByRole('textbox');

    before.focus();
    expect(document.activeElement).toBe(before);

    await userEvent.tab();
    await expect.element(input).toHaveFocus();
    await takeSnapshot(`Label - is not independently reachable via Tab, but its paired input is`);
  });

  /* -----------------------------------------------------------------------
   * Transition style (1)
   * -------------------------------------------------------------------- */

  it('applies the documented color transition regardless of inverted state', async () => {
    const screen = await render(<Label inverted>Username</Label>);
    const label = screen.getByText('Username');
    await expect
      .element(locatorFor(label.element() as HTMLElement))
      .toHaveStyle({ transition: 'color 0.2s ease' });
    await takeSnapshot(`Label - applies the documented color transition regardless of inverted state`);
  });

  /* -----------------------------------------------------------------------
   * Click does not throw when no click handler side effects exist (1)
   * -------------------------------------------------------------------- */

  it('does not log any console errors when clicked without any paired form control', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const screen = await render(<Label>Standalone</Label>);
    const label = screen.getByText('Standalone');
    await userEvent.click(label);
    await expect.element(label).toBeInTheDocument();
    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    await takeSnapshot(`Label - does not log any console errors when clicked without any paired form control`);
  });

  /* -----------------------------------------------------------------------
   * Rich anchor child (1)
   * -------------------------------------------------------------------- */

  it('renders a clickable anchor nested inside the label content', async () => {
    const screen = await render(
      <Label htmlFor="terms-checkbox">
        <span>
          I agree to the{' '}
          <a href="#terms" data-testid="terms-link">
            Terms and Conditions
          </a>
        </span>
      </Label>
    );
    const link = screen.getByTestId('terms-link');
    await expect.element(link).toBeInTheDocument();
    expect(link.element().tagName).toBe('A');
    expect(link.element().getAttribute('href')).toBe('#terms');
    await takeSnapshot(`Label - renders a clickable anchor nested inside the label content`);
  });

  /* -----------------------------------------------------------------------
   * Inverted + RTL combined (1)
   * -------------------------------------------------------------------- */

  it('renders inverted styling correctly alongside right-to-left content', async () => {
    const screen = await render(
      <div dir="rtl">
        <Label inverted>مرحبا بالعالم</Label>
      </div>
    );
    const label = screen.getByText('مرحبا بالعالم');
    await expect
      .element(locatorFor(label.element() as HTMLElement))
      .toHaveStyle({ color: color.white, backgroundColor: color.slate800 });
    await takeSnapshot(`Label - renders inverted styling correctly alongside right-to-left content`);
  });

  /* -----------------------------------------------------------------------
   * Multiple labels in a form layout (1)
   * -------------------------------------------------------------------- */

  it('renders three independent labels each linked to their own field in a form', async () => {
    const screen = await render(
      <form>
        <div>
          <Label htmlFor="form-name">Full Name</Label>
          <input id="form-name" type="text" />
        </div>
        <div>
          <Label htmlFor="form-email">Email Address</Label>
          <input id="form-email" type="email" />
        </div>
        <div>
          <Label htmlFor="form-password">Password</Label>
          <input id="form-password" type="password" />
        </div>
      </form>
    );

    await expect
      .element(screen.getByText('Full Name'))
      .toHaveAttribute('for', 'form-name');
    await expect
      .element(screen.getByText('Email Address'))
      .toHaveAttribute('for', 'form-email');
    await expect
      .element(screen.getByText('Password'))
      .toHaveAttribute('for', 'form-password');
    await takeSnapshot(`Label - renders three independent labels each linked to their own field in a form`);
  });
});
