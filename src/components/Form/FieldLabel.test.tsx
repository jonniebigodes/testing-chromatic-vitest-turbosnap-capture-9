import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import FieldLabel from './FieldLabel';
import { color } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

/**
 * Resolves a token color (hex/hsl string) to the canonical computed `rgb(...)`
 * string the browser will report via `getComputedStyle`. Used to compare
 * colors reliably without hardcoding browser-specific rgb conversions.
 */
function computedColor(tokenColor: string): string {
  const probe = document.createElement('span');
  probe.style.color = tokenColor;
  document.body.appendChild(probe);
  const value = getComputedStyle(probe).color;
  document.body.removeChild(probe);
  return value;
}

describe('FieldLabel', () => {
  /* ---------------------------------------------------------------------- */
  /* Base rendering (2)                                                      */
  /* ---------------------------------------------------------------------- */

  it('renders children text content', async () => {
    const screen = await render(<FieldLabel>Email Address</FieldLabel>);
    await expect.element(screen.getByText('Email Address')).toBeInTheDocument();
    await takeSnapshot(`FieldLabel - renders children text content`);
  });

  it('renders without htmlFor', async () => {
    const screen = await render(<FieldLabel>Standalone</FieldLabel>);
    const label = screen.getByText('Standalone');
    await expect.element(label).toBeInTheDocument();
    expect(label.element().getAttribute('for')).toBeNull();
    await takeSnapshot(`FieldLabel - renders without htmlFor`);
  });

  /* ---------------------------------------------------------------------- */
  /* htmlFor association (1)                                                 */
  /* ---------------------------------------------------------------------- */

  it('associates the label with a control via a matching for/id attribute', async () => {
    const screen = await render(
      <FieldLabel htmlFor="assoc-input">Full Name</FieldLabel>
    );
    const label = screen.getByText('Full Name');
    await expect.element(label).toHaveAttribute('for', 'assoc-input');
    await takeSnapshot(`FieldLabel - associates the label with a control via a matching for/id attribute`);
  });

  /* ---------------------------------------------------------------------- */
  /* Required indicator (4)                                                  */
  /* ---------------------------------------------------------------------- */

  it('renders the default asterisk indicator when required is true', async () => {
    const screen = await render(<FieldLabel required>Name</FieldLabel>);
    await expect.element(screen.getByText('*')).toBeInTheDocument();
    await takeSnapshot(`FieldLabel - renders the default asterisk indicator when required is true`);
  });

  it('does not render the required indicator when required is false', async () => {
    const screen = await render(<FieldLabel>Name</FieldLabel>);
    expect(screen.getByText('*').query()).toBeNull();
    await takeSnapshot(`FieldLabel - does not render the required indicator when required is false`);
  });

  it('still renders the required indicator when combined with invalid', async () => {
    const screen = await render(
      <FieldLabel required invalid>
        Name
      </FieldLabel>
    );
    await expect.element(screen.getByText('*')).toBeInTheDocument();
    await takeSnapshot(`FieldLabel - still renders the required indicator when combined with invalid`);
  });

  it('still renders the required indicator when combined with disabled', async () => {
    const screen = await render(
      <FieldLabel required disabled>
        Name
      </FieldLabel>
    );
    await expect.element(screen.getByText('*')).toBeInTheDocument();
    await takeSnapshot(`FieldLabel - still renders the required indicator when combined with disabled`);
  });

  /* ---------------------------------------------------------------------- */
  /* Invalid color (2)                                                       */
  /* ---------------------------------------------------------------------- */

  it('applies the pink600-based text color when invalid is true and not disabled', async () => {
    const screen = await render(<FieldLabel invalid>Email</FieldLabel>);
    const label = screen.getByText('Email');
    await expect
      .element(label)
      .toHaveStyle({ color: computedColor(color.pink600) });
    await takeSnapshot(`FieldLabel - applies the pink600-based text color when invalid is true and not disabled`);
  });

  it('does not apply the invalid color when invalid is false', async () => {
    const screen = await render(<FieldLabel>Email</FieldLabel>);
    const label = screen.getByText('Email');
    const actual = getComputedStyle(label.element()).color;
    expect(actual).not.toBe(computedColor(color.pink600));
    await takeSnapshot(`FieldLabel - does not apply the invalid color when invalid is false`);
  });

  /* ---------------------------------------------------------------------- */
  /* Disabled styling (2)                                                    */
  /* ---------------------------------------------------------------------- */

  it('applies dim opacity and not-allowed cursor when disabled is true', async () => {
    const screen = await render(<FieldLabel disabled>Email</FieldLabel>);
    const label = screen.getByText('Email');
    await expect
      .element(label)
      .toHaveStyle({ opacity: '0.5', cursor: 'not-allowed' });
    await takeSnapshot(`FieldLabel - applies dim opacity and not-allowed cursor when disabled is true`);
  });

  it('does not apply dim opacity or not-allowed cursor when disabled is false', async () => {
    const screen = await render(<FieldLabel>Email</FieldLabel>);
    const label = screen.getByText('Email');
    const style = getComputedStyle(label.element());
    expect(style.opacity).toBe('1');
    expect(style.cursor).not.toBe('not-allowed');
    await takeSnapshot(`FieldLabel - does not apply dim opacity or not-allowed cursor when disabled is false`);
  });

  /* ---------------------------------------------------------------------- */
  /* Full boolean-matrix precedence: required x invalid x disabled (8)       */
  /* Disabled must always visually override the invalid tint.               */
  /* ---------------------------------------------------------------------- */

  it('matrix [required=F invalid=F disabled=F]: base color, no dimming', async () => {
    const screen = await render(<FieldLabel>Field</FieldLabel>);
    const label = screen.getByText('Field');
    const style = getComputedStyle(label.element());
    expect(style.color).toBe(computedColor(color.slate700));
    expect(style.opacity).toBe('1');
    await takeSnapshot(`FieldLabel - matrix [required=F invalid=F disabled=F]: base color, no dimming`);
  });

  it('matrix [required=T invalid=F disabled=F]: base color, indicator shown', async () => {
    const screen = await render(<FieldLabel required>Field</FieldLabel>);
    const label = screen.getByText('Field');
    const style = getComputedStyle(label.element());
    expect(style.color).toBe(computedColor(color.slate700));
    await expect.element(screen.getByText('*')).toBeInTheDocument();
    await takeSnapshot(`FieldLabel - matrix [required=T invalid=F disabled=F]: base color, indicator shown`);
  });

  it('matrix [required=F invalid=T disabled=F]: invalid color applies', async () => {
    const screen = await render(<FieldLabel invalid>Field</FieldLabel>);
    const label = screen.getByText('Field');
    const style = getComputedStyle(label.element());
    expect(style.color).toBe(computedColor(color.pink600));
    await takeSnapshot(`FieldLabel - matrix [required=F invalid=T disabled=F]: invalid color applies`);
  });

  it('matrix [required=F invalid=F disabled=T]: dimmed, not-allowed cursor', async () => {
    const screen = await render(<FieldLabel disabled>Field</FieldLabel>);
    const label = screen.getByText('Field');
    const style = getComputedStyle(label.element());
    expect(style.opacity).toBe('0.5');
    expect(style.cursor).toBe('not-allowed');
    expect(style.color).toBe(computedColor(color.slate700));
    await takeSnapshot(`FieldLabel - matrix [required=F invalid=F disabled=T]: dimmed, not-allowed cursor`);
  });

  it('matrix [required=T invalid=T disabled=F]: invalid color and indicator both apply', async () => {
    const screen = await render(
      <FieldLabel required invalid>
        Field
      </FieldLabel>
    );
    const label = screen.getByText('Field');
    const style = getComputedStyle(label.element());
    expect(style.color).toBe(computedColor(color.pink600));
    await expect.element(screen.getByText('*')).toBeInTheDocument();
    await takeSnapshot(`FieldLabel - matrix [required=T invalid=T disabled=F]: invalid color and indicator both apply`);
  });

  it('matrix [required=T invalid=F disabled=T]: disabled dimming and indicator both apply', async () => {
    const screen = await render(
      <FieldLabel required disabled>
        Field
      </FieldLabel>
    );
    const label = screen.getByText('Field');
    const style = getComputedStyle(label.element());
    expect(style.opacity).toBe('0.5');
    expect(style.cursor).toBe('not-allowed');
    await expect.element(screen.getByText('*')).toBeInTheDocument();
    await takeSnapshot(`FieldLabel - matrix [required=T invalid=F disabled=T]: disabled dimming and indicator both apply`);
  });

  it('matrix [required=F invalid=T disabled=T]: disabled overrides the invalid color', async () => {
    const screen = await render(
      <FieldLabel invalid disabled>
        Field
      </FieldLabel>
    );
    const label = screen.getByText('Field');
    const style = getComputedStyle(label.element());
    expect(style.color).not.toBe(computedColor(color.pink600));
    expect(style.color).toBe(computedColor(color.slate700));
    expect(style.opacity).toBe('0.5');
    expect(style.cursor).toBe('not-allowed');
    await takeSnapshot(`FieldLabel - matrix [required=F invalid=T disabled=T]: disabled overrides the invalid color`);
  });

  it('matrix [required=T invalid=T disabled=T]: disabled overrides invalid even with required set', async () => {
    const screen = await render(
      <FieldLabel required invalid disabled>
        Field
      </FieldLabel>
    );
    const label = screen.getByText('Field');
    const style = getComputedStyle(label.element());
    expect(style.color).not.toBe(computedColor(color.pink600));
    expect(style.opacity).toBe('0.5');
    expect(style.cursor).toBe('not-allowed');
    await expect.element(screen.getByText('*')).toBeInTheDocument();
    await takeSnapshot(`FieldLabel - matrix [required=T invalid=T disabled=T]: disabled overrides invalid even with required set`);
  });

  /* ---------------------------------------------------------------------- */
  /* Inverted variant (4)                                                    */
  /* ---------------------------------------------------------------------- */

  it('renders default inverted styling (light text on a dark pill background)', async () => {
    const screen = await render(<FieldLabel inverted>Field</FieldLabel>);
    const label = screen.getByText('Field');
    const style = getComputedStyle(label.element());
    expect(style.color).toBe(computedColor(color.white));
    expect(style.backgroundColor).toBe(computedColor(color.slate800));
    await takeSnapshot(`FieldLabel - renders default inverted styling (light text on a dark pill background)`);
  });

  it('renders inverted styling combined with invalid using a lighter pink tint', async () => {
    const screen = await render(
      <FieldLabel inverted invalid>
        Field
      </FieldLabel>
    );
    const label = screen.getByText('Field');
    const style = getComputedStyle(label.element());
    expect(style.color).toBe(computedColor(color.pink300));
    await takeSnapshot(`FieldLabel - renders inverted styling combined with invalid using a lighter pink tint`);
  });

  it('renders inverted styling combined with disabled (dim opacity + not-allowed)', async () => {
    const screen = await render(
      <FieldLabel inverted disabled>
        Field
      </FieldLabel>
    );
    const label = screen.getByText('Field');
    const style = getComputedStyle(label.element());
    expect(style.opacity).toBe('0.5');
    expect(style.cursor).toBe('not-allowed');
    expect(style.backgroundColor).toBe(computedColor(color.slate800));
    await takeSnapshot(`FieldLabel - renders inverted styling combined with disabled (dim opacity + not-allowed)`);
  });

  it('renders inverted styling combined with required (indicator still shown)', async () => {
    const screen = await render(
      <FieldLabel inverted required>
        Field
      </FieldLabel>
    );
    const label = screen.getByText('Field');
    const style = getComputedStyle(label.element());
    expect(style.color).toBe(computedColor(color.white));
    await expect.element(screen.getByText('*')).toBeInTheDocument();
    await takeSnapshot(`FieldLabel - renders inverted styling combined with required (indicator still shown)`);
  });

  /* ---------------------------------------------------------------------- */
  /* Size variant (4)                                                        */
  /* ---------------------------------------------------------------------- */

  it('renders a smaller font size at size="small" than the default medium', async () => {
    const smallScreen = await render(<FieldLabel size="small">Small</FieldLabel>);
    const mediumScreen = await render(<FieldLabel size="medium">Medium</FieldLabel>);

    const smallSize = parseFloat(
      getComputedStyle(smallScreen.getByText('Small').element()).fontSize
    );
    const mediumSize = parseFloat(
      getComputedStyle(mediumScreen.getByText('Medium').element()).fontSize
    );

    expect(smallSize).toBeLessThan(mediumSize);
    await takeSnapshot(`FieldLabel - renders a smaller font size at size="small" than the default medium`);
  });

  it('applies the invalid color correctly at size="small"', async () => {
    const screen = await render(
      <FieldLabel size="small" invalid>
        Field
      </FieldLabel>
    );
    const label = screen.getByText('Field');
    const style = getComputedStyle(label.element());
    expect(style.color).toBe(computedColor(color.pink600));
    await takeSnapshot(`FieldLabel - applies the invalid color correctly at size="small"`);
  });

  it('renders the required indicator correctly at size="small"', async () => {
    const screen = await render(
      <FieldLabel size="small" required>
        Field
      </FieldLabel>
    );
    await expect.element(screen.getByText('*')).toBeInTheDocument();
    await takeSnapshot(`FieldLabel - renders the required indicator correctly at size="small"`);
  });

  it('applies disabled styling correctly at size="small"', async () => {
    const screen = await render(
      <FieldLabel size="small" disabled>
        Field
      </FieldLabel>
    );
    const label = screen.getByText('Field');
    const style = getComputedStyle(label.element());
    expect(style.opacity).toBe('0.5');
    expect(style.cursor).toBe('not-allowed');
    await takeSnapshot(`FieldLabel - applies disabled styling correctly at size="small"`);
  });

  /* ---------------------------------------------------------------------- */
  /* Custom requiredIndicator (3)                                            */
  /* ---------------------------------------------------------------------- */

  it('renders a custom string requiredIndicator instead of the default asterisk', async () => {
    const screen = await render(
      <FieldLabel required requiredIndicator="(required)">
        Field
      </FieldLabel>
    );
    await expect.element(screen.getByText('(required)')).toBeInTheDocument();
    expect(screen.getByText('*').query()).toBeNull();
    await takeSnapshot(`FieldLabel - renders a custom string requiredIndicator instead of the default asterisk`);
  });

  it('renders a custom ReactNode requiredIndicator', async () => {
    const screen = await render(
      <FieldLabel
        required
        requiredIndicator={<span data-testid="custom-indicator">!!</span>}
      >
        Field
      </FieldLabel>
    );
    await expect.element(screen.getByTestId('custom-indicator')).toBeInTheDocument();
    await expect
      .element(screen.getByTestId('custom-indicator'))
      .toHaveTextContent('!!');
    await takeSnapshot(`FieldLabel - renders a custom ReactNode requiredIndicator`);
  });

  it('does not render requiredIndicator content when required is false, even if set', async () => {
    const screen = await render(
      <FieldLabel required={false} requiredIndicator="(required)">
        Field
      </FieldLabel>
    );
    expect(screen.getByText('(required)').query()).toBeNull();
    await takeSnapshot(`FieldLabel - does not render requiredIndicator content when required is false, even if set`);
  });

  /* ---------------------------------------------------------------------- */
  /* Text wrapping/length (3)                                                */
  /* ---------------------------------------------------------------------- */

  it('renders a long sentence in full without truncation', async () => {
    const longText =
      'Please provide your complete legal name exactly as it appears on your government-issued identification document';
    const screen = await render(<FieldLabel>{longText}</FieldLabel>);
    await expect.element(screen.getByText(longText)).toHaveTextContent(longText);
    await takeSnapshot(`FieldLabel - renders a long sentence in full without truncation`);
  });

  it('renders a very long no-space token without breaking the DOM', async () => {
    const longToken =
      'Supercalifragilisticexpialidocious-identifier-field-name-with-no-breaks-1234567890';
    const screen = await render(<FieldLabel>{longToken}</FieldLabel>);
    await expect.element(screen.getByText(longToken)).toBeInTheDocument();
    await takeSnapshot(`FieldLabel - renders a very long no-space token without breaking the DOM`);
  });

  it('renders a short one-word label exactly', async () => {
    const screen = await render(<FieldLabel>Name</FieldLabel>);
    await expect.element(screen.getByText('Name')).toHaveTextContent('Name');
    await takeSnapshot(`FieldLabel - renders a short one-word label exactly`);
  });

  /* ---------------------------------------------------------------------- */
  /* Rich children (3)                                                       */
  /* ---------------------------------------------------------------------- */

  it('renders icon and text content together', async () => {
    const screen = await render(
      <FieldLabel>
        <svg data-testid="rich-icon" width="12" height="12" />
        Account Details
      </FieldLabel>
    );
    await expect.element(screen.getByTestId('rich-icon')).toBeInTheDocument();
    await expect.element(screen.getByText('Account Details')).toBeInTheDocument();
    await takeSnapshot(`FieldLabel - renders icon and text content together`);
  });

  it('preserves nested span content', async () => {
    const screen = await render(
      <FieldLabel>
        Shipping <span data-testid="nested-span">Address</span>
      </FieldLabel>
    );
    await expect.element(screen.getByTestId('nested-span')).toHaveTextContent(
      'Address'
    );
    await takeSnapshot(`FieldLabel - preserves nested span content`);
  });

  it('renders a link inside the label as a real, clickable anchor', async () => {
    const screen = await render(
      <FieldLabel>
        I agree to the{' '}
        <a href="#terms" data-testid="terms-link">
          Terms
        </a>
      </FieldLabel>
    );
    const link = screen.getByTestId('terms-link');
    await expect.element(link).toBeInTheDocument();
    expect(link.element().tagName).toBe('A');
    expect(link.element().getAttribute('href')).toBe('#terms');
    await takeSnapshot(`FieldLabel - renders a link inside the label as a real, clickable anchor`);
  });

  /* ---------------------------------------------------------------------- */
  /* RTL/unicode (2)                                                         */
  /* ---------------------------------------------------------------------- */

  it('renders unicode content exactly as provided', async () => {
    const unicodeText = '名前 🎌 ünïcödé Ñame';
    const screen = await render(<FieldLabel>{unicodeText}</FieldLabel>);
    await expect
      .element(screen.getByText(unicodeText))
      .toHaveTextContent(unicodeText);
    await takeSnapshot(`FieldLabel - renders unicode content exactly as provided`);
  });

  it('renders without throwing inside a right-to-left ancestor', async () => {
    const screen = await render(
      <div dir="rtl">
        <FieldLabel required>الاسم الكامل</FieldLabel>
      </div>
    );
    await expect.element(screen.getByText('الاسم الكامل')).toBeInTheDocument();
    await takeSnapshot(`FieldLabel - renders without throwing inside a right-to-left ancestor`);
  });

  /* ---------------------------------------------------------------------- */
  /* Composition click-to-focus (3)                                          */
  /* ---------------------------------------------------------------------- */

  it('clicking the label moves focus to a paired input via matching htmlFor/id', async () => {
    const screen = await render(
      <div>
        <FieldLabel htmlFor="composed-input">Email</FieldLabel>
        <input id="composed-input" type="text" />
      </div>
    );
    const label = screen.getByText('Email');
    const input = screen.getByRole('textbox');
    await userEvent.click(label);
    await expect.element(input).toHaveFocus();
    await takeSnapshot(`FieldLabel - clicking the label moves focus to a paired input via matching htmlFor/id`);
  });

  it('clicking the label moves focus to a paired textarea-like element', async () => {
    const screen = await render(
      <div>
        <FieldLabel htmlFor="composed-textarea">Comments</FieldLabel>
        <textarea id="composed-textarea" />
      </div>
    );
    const label = screen.getByText('Comments');
    const textarea = screen.getByRole('textbox');
    await userEvent.click(label);
    await expect.element(textarea).toHaveFocus();
    await takeSnapshot(`FieldLabel - clicking the label moves focus to a paired textarea-like element`);
  });

  it('clicking a disabled label still moves focus to its paired input (native label behavior)', async () => {
    // A `disabled` FieldLabel only applies visual styling - <label> has no
    // native `disabled` attribute, so the browser's built-in
    // label-click-to-focus behavior cannot be suppressed here.
    const screen = await render(
      <div>
        <FieldLabel htmlFor="composed-disabled-input" disabled>
          Disabled Field
        </FieldLabel>
        <input id="composed-disabled-input" type="text" />
      </div>
    );
    const label = screen.getByText('Disabled Field');
    const input = screen.getByRole('textbox');
    await userEvent.click(label);
    await expect.element(input).toHaveFocus();
    await takeSnapshot(`FieldLabel - clicking a disabled label still moves focus to its paired input (native label behavior)`);
  });

  /* ---------------------------------------------------------------------- */
  /* Empty/edge content (2)                                                  */
  /* ---------------------------------------------------------------------- */

  it('renders without throwing when children is an empty string', async () => {
    const screen = await render(
      <FieldLabel htmlFor="empty-children">{''}</FieldLabel>
    );
    const label = screen.container.querySelector('label');
    expect(label).not.toBeNull();
    expect(label?.getAttribute('for')).toBe('empty-children');
    await takeSnapshot(`FieldLabel - renders without throwing when children is an empty string`);
  });

  it('renders the documented baseline when all props are explicitly set to their defaults', async () => {
    const screen = await render(
      <FieldLabel
        htmlFor={undefined}
        required={false}
        requiredIndicator={undefined}
        disabled={false}
        invalid={false}
        inverted={false}
        size="medium"
      >
        Baseline
      </FieldLabel>
    );
    const label = screen.getByText('Baseline');
    const style = getComputedStyle(label.element());
    expect(style.color).toBe(computedColor(color.slate700));
    expect(style.opacity).toBe('1');
    expect(style.cursor).toBe('default');
    expect(screen.getByText('*').query()).toBeNull();
    await takeSnapshot(`FieldLabel - renders the documented baseline when all props are explicitly set to their defaults`);
  });

  /* ---------------------------------------------------------------------- */
  /* Default prop sanity (1)                                                 */
  /* ---------------------------------------------------------------------- */

  it('matches documented defaults when all optional props are omitted', async () => {
    const screen = await render(<FieldLabel>Field</FieldLabel>);
    const label = screen.getByText('Field');
    const style = getComputedStyle(label.element());

    // medium size
    const mediumScreen = await render(<FieldLabel size="medium">Medium</FieldLabel>);
    const mediumSize = getComputedStyle(
      mediumScreen.getByText('Medium').element()
    ).fontSize;
    expect(style.fontSize).toBe(mediumSize);

    // not required / invalid / disabled
    expect(screen.getByText('*').query()).toBeNull();
    expect(style.color).toBe(computedColor(color.slate700));
    expect(style.opacity).toBe('1');
    await takeSnapshot(`FieldLabel - matches documented defaults when all optional props are omitted`);
  });

  /* ---------------------------------------------------------------------- */
  /* Keyboard tab order (1)                                                  */
  /* ---------------------------------------------------------------------- */

  it('is not independently reachable via Tab (native labels are not focusable)', async () => {
    const screen = await render(
      <div>
        <button type="button">Before</button>
        <FieldLabel htmlFor="tab-order-input">Tabbed Label</FieldLabel>
        <input id="tab-order-input" type="text" />
      </div>
    );
    const before = screen.getByText('Before').element() as HTMLElement;
    const input = screen.getByRole('textbox');

    before.focus();
    expect(document.activeElement).toBe(before);

    await userEvent.tab();
    await expect.element(input).toHaveFocus();
    await takeSnapshot(`FieldLabel - is not independently reachable via Tab (native labels are not focusable)`);
  });

  /* ---------------------------------------------------------------------- */
  /* Native semantics (1)                                                    */
  /* ---------------------------------------------------------------------- */

  it('renders an actual <label> element, not a generic div/span', async () => {
    const screen = await render(<FieldLabel>Field</FieldLabel>);
    const label = screen.getByText('Field');
    expect(label.element().tagName).toBe('LABEL');
    await takeSnapshot(`FieldLabel - renders an actual <label> element, not a generic div/span`);
  });

  /* ---------------------------------------------------------------------- */
  /* Multi-instance uniqueness (1)                                           */
  /* ---------------------------------------------------------------------- */

  it('renders two instances independently without leaking state or colliding', async () => {
    const screen = await render(
      <div>
        <FieldLabel htmlFor="multi-1" required>
          First
        </FieldLabel>
        <input id="multi-1" type="text" />
        <FieldLabel htmlFor="multi-2" invalid>
          Second
        </FieldLabel>
        <input id="multi-2" type="text" />
      </div>
    );

    const first = screen.getByText('First');
    const second = screen.getByText('Second');

    await expect.element(first).toHaveAttribute('for', 'multi-1');
    await expect.element(second).toHaveAttribute('for', 'multi-2');

    // Only the first (required) instance renders an asterisk indicator.
    expect(screen.getByText('*').elements().length).toBe(1);

    const secondStyle = getComputedStyle(second.element());
    expect(secondStyle.color).toBe(computedColor(color.pink600));
    const firstStyle = getComputedStyle(first.element());
    expect(firstStyle.color).toBe(computedColor(color.slate700));
    await takeSnapshot(`FieldLabel - renders two instances independently without leaking state or colliding`);
  });

  /* ---------------------------------------------------------------------- */
  /* Inverted+invalid color consistency (1)                                  */
  /* ---------------------------------------------------------------------- */

  it('uses the same pink color family for invalid text in both inverted and non-inverted variants', async () => {
    const normalScreen = await render(
      <FieldLabel invalid>Normal Invalid</FieldLabel>
    );
    const invertedScreen = await render(
      <FieldLabel invalid inverted>
        Inverted Invalid
      </FieldLabel>
    );

    const normalColor = getComputedStyle(
      normalScreen.getByText('Normal Invalid').element()
    ).color;
    const invertedColor = getComputedStyle(
      invertedScreen.getByText('Inverted Invalid').element()
    ).color;

    expect(normalColor).toBe(computedColor(color.pink600));
    expect(invertedColor).toBe(computedColor(color.pink300));
    // Different steps of the same pink family, not an unrelated hue.
    expect(normalColor).not.toBe(invertedColor);
    await takeSnapshot(`FieldLabel - uses the same pink color family for invalid text in both inverted and non-inverted variants`);
  });

  /* ---------------------------------------------------------------------- */
  /* Extra: cursor semantics (2)                                             */
  /* ---------------------------------------------------------------------- */

  it('applies pointer cursor when htmlFor is provided and not disabled', async () => {
    const screen = await render(
      <FieldLabel htmlFor="cursor-input">Field</FieldLabel>
    );
    const label = screen.getByText('Field');
    await expect.element(label).toHaveStyle({ cursor: 'pointer' });
    await takeSnapshot(`FieldLabel - applies pointer cursor when htmlFor is provided and not disabled`);
  });

  it('applies default cursor when htmlFor is omitted and not disabled', async () => {
    const screen = await render(<FieldLabel>Field</FieldLabel>);
    const label = screen.getByText('Field');
    await expect.element(label).toHaveStyle({ cursor: 'default' });
    await takeSnapshot(`FieldLabel - applies default cursor when htmlFor is omitted and not disabled`);
  });
});
