import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import ValidationMessage from './ValidationMessage';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

describe('ValidationMessage', () => {
  // -------------------------------------------------------------------------
  // Status rendering (4)
  // -------------------------------------------------------------------------

  it('renders the correct text content for status="error"', async () => {
    const screen = await render(<ValidationMessage status="error" message="Required field" />);
    await expect.element(screen.getByText('Required field')).toBeVisible();
    await takeSnapshot(`ValidationMessage - renders the correct text content for status="error"`);
  });

  it('renders the correct text content for status="warning"', async () => {
    const screen = await render(
      <ValidationMessage status="warning" message="This looks unusual" />
    );
    await expect.element(screen.getByText('This looks unusual')).toBeVisible();
    await takeSnapshot(`ValidationMessage - renders the correct text content for status="warning"`);
  });

  it('renders the correct text content for status="success"', async () => {
    const screen = await render(<ValidationMessage status="success" message="Looks good!" />);
    await expect.element(screen.getByText('Looks good!')).toBeVisible();
    await takeSnapshot(`ValidationMessage - renders the correct text content for status="success"`);
  });

  it('renders the correct text content for status="info"', async () => {
    const screen = await render(<ValidationMessage status="info" message="Additional info" />);
    await expect.element(screen.getByText('Additional info')).toBeVisible();
    await takeSnapshot(`ValidationMessage - renders the correct text content for status="info"`);
  });

  // -------------------------------------------------------------------------
  // ARIA role semantics (4)
  // -------------------------------------------------------------------------

  it('renders role="alert" for status="error"', async () => {
    const screen = await render(<ValidationMessage status="error" message="Required field" />);
    await expect.element(screen.getByRole('alert')).toBeVisible();
    await takeSnapshot(`ValidationMessage - renders role="alert" for status="error"`);
  });

  it('renders role="status" for status="warning"', async () => {
    const screen = await render(
      <ValidationMessage status="warning" message="This looks unusual" />
    );
    await expect.element(screen.getByRole('status')).toBeVisible();
    await takeSnapshot(`ValidationMessage - renders role="status" for status="warning"`);
  });

  it('renders role="status" for status="success"', async () => {
    const screen = await render(<ValidationMessage status="success" message="Looks good!" />);
    await expect.element(screen.getByRole('status')).toBeVisible();
    await takeSnapshot(`ValidationMessage - renders role="status" for status="success"`);
  });

  it('renders role="status" for status="info"', async () => {
    const screen = await render(<ValidationMessage status="info" message="Additional info" />);
    await expect.element(screen.getByRole('status')).toBeVisible();
    await takeSnapshot(`ValidationMessage - renders role="status" for status="info"`);
  });

  // -------------------------------------------------------------------------
  // Icon presence/absence (8)
  // -------------------------------------------------------------------------

  it('shows the icon by default for status="error"', async () => {
    const screen = await render(<ValidationMessage status="error" message="Required field" />);
    await expect.element(screen.getByTestId('validation-message-icon')).toBeVisible();
    await takeSnapshot(`ValidationMessage - shows the icon by default for status="error"`);
  });

  it('shows the icon by default for status="warning"', async () => {
    const screen = await render(
      <ValidationMessage status="warning" message="This looks unusual" />
    );
    await expect.element(screen.getByTestId('validation-message-icon')).toBeVisible();
    await takeSnapshot(`ValidationMessage - shows the icon by default for status="warning"`);
  });

  it('shows the icon by default for status="success"', async () => {
    const screen = await render(<ValidationMessage status="success" message="Looks good!" />);
    await expect.element(screen.getByTestId('validation-message-icon')).toBeVisible();
    await takeSnapshot(`ValidationMessage - shows the icon by default for status="success"`);
  });

  it('shows the icon by default for status="info"', async () => {
    const screen = await render(<ValidationMessage status="info" message="Additional info" />);
    await expect.element(screen.getByTestId('validation-message-icon')).toBeVisible();
    await takeSnapshot(`ValidationMessage - shows the icon by default for status="info"`);
  });

  it('hides the icon when showIcon is false for status="error"', async () => {
    const screen = await render(
      <ValidationMessage status="error" message="Required field" showIcon={false} />
    );
    expect(screen.container.querySelector('[data-testid="validation-message-icon"]')).toBeNull();
    await takeSnapshot(`ValidationMessage - hides the icon when showIcon is false for status="error"`);
  });

  it('hides the icon when showIcon is false for status="warning"', async () => {
    const screen = await render(
      <ValidationMessage status="warning" message="This looks unusual" showIcon={false} />
    );
    expect(screen.container.querySelector('[data-testid="validation-message-icon"]')).toBeNull();
    await takeSnapshot(`ValidationMessage - hides the icon when showIcon is false for status="warning"`);
  });

  it('hides the icon when showIcon is false for status="success"', async () => {
    const screen = await render(
      <ValidationMessage status="success" message="Looks good!" showIcon={false} />
    );
    expect(screen.container.querySelector('[data-testid="validation-message-icon"]')).toBeNull();
    await takeSnapshot(`ValidationMessage - hides the icon when showIcon is false for status="success"`);
  });

  it('hides the icon when showIcon is false for status="info"', async () => {
    const screen = await render(
      <ValidationMessage status="info" message="Additional info" showIcon={false} />
    );
    expect(screen.container.querySelector('[data-testid="validation-message-icon"]')).toBeNull();
    await takeSnapshot(`ValidationMessage - hides the icon when showIcon is false for status="info"`);
  });

  // -------------------------------------------------------------------------
  // Inverted color styling (4)
  // -------------------------------------------------------------------------

  it('applies a distinct inverted color for status="error"', async () => {
    const normal = await render(<ValidationMessage status="error" message="Required field" />);
    const inverted = await render(
      <ValidationMessage status="error" message="Required field" inverted />
    );

    const normalEl = normal.container.querySelector('[role="alert"]') as HTMLElement;
    const invertedEl = inverted.container.querySelector('[role="alert"]') as HTMLElement;
    const normalColor = getComputedStyle(normalEl).color;
    const invertedColor = getComputedStyle(invertedEl).color;

    expect(invertedColor).not.toBe(normalColor);
    await takeSnapshot(`ValidationMessage - applies a distinct inverted color for status="error"`);
  });

  it('applies a distinct inverted color for status="warning"', async () => {
    const normal = await render(
      <ValidationMessage status="warning" message="This looks unusual" />
    );
    const inverted = await render(
      <ValidationMessage status="warning" message="This looks unusual" inverted />
    );

    const normalEl = normal.container.querySelector('[role="status"]') as HTMLElement;
    const invertedEl = inverted.container.querySelector('[role="status"]') as HTMLElement;
    const normalColor = getComputedStyle(normalEl).color;
    const invertedColor = getComputedStyle(invertedEl).color;

    expect(invertedColor).not.toBe(normalColor);
    await takeSnapshot(`ValidationMessage - applies a distinct inverted color for status="warning"`);
  });

  it('applies a distinct inverted color for status="success"', async () => {
    const normal = await render(<ValidationMessage status="success" message="Looks good!" />);
    const inverted = await render(
      <ValidationMessage status="success" message="Looks good!" inverted />
    );

    const normalEl = normal.container.querySelector('[role="status"]') as HTMLElement;
    const invertedEl = inverted.container.querySelector('[role="status"]') as HTMLElement;
    const normalColor = getComputedStyle(normalEl).color;
    const invertedColor = getComputedStyle(invertedEl).color;

    expect(invertedColor).not.toBe(normalColor);
    await takeSnapshot(`ValidationMessage - applies a distinct inverted color for status="success"`);
  });

  it('applies a distinct inverted color for status="info"', async () => {
    const normal = await render(<ValidationMessage status="info" message="Additional info" />);
    const inverted = await render(
      <ValidationMessage status="info" message="Additional info" inverted />
    );

    const normalEl = normal.container.querySelector('[role="status"]') as HTMLElement;
    const invertedEl = inverted.container.querySelector('[role="status"]') as HTMLElement;
    const normalColor = getComputedStyle(normalEl).color;
    const invertedColor = getComputedStyle(invertedEl).color;

    expect(invertedColor).not.toBe(normalColor);
    await takeSnapshot(`ValidationMessage - applies a distinct inverted color for status="info"`);
  });

  // -------------------------------------------------------------------------
  // Small-size styling (4)
  // -------------------------------------------------------------------------

  it('applies a smaller fontSize when size="small" for status="error"', async () => {
    const medium = await render(<ValidationMessage status="error" message="Required field" />);
    const small = await render(
      <ValidationMessage status="error" message="Required field" size="small" />
    );

    const mediumEl = medium.container.querySelector('[role="alert"]') as HTMLElement;
    const smallEl = small.container.querySelector('[role="alert"]') as HTMLElement;
    const mediumFontSize = parseFloat(getComputedStyle(mediumEl).fontSize);
    const smallFontSize = parseFloat(getComputedStyle(smallEl).fontSize);

    expect(smallFontSize).toBeLessThan(mediumFontSize);
    await takeSnapshot(`ValidationMessage - applies a smaller fontSize when size="small" for status="error"`);
  });

  it('applies a smaller fontSize when size="small" for status="warning"', async () => {
    const medium = await render(
      <ValidationMessage status="warning" message="This looks unusual" />
    );
    const small = await render(
      <ValidationMessage status="warning" message="This looks unusual" size="small" />
    );

    const mediumEl = medium.container.querySelector('[role="status"]') as HTMLElement;
    const smallEl = small.container.querySelector('[role="status"]') as HTMLElement;
    const mediumFontSize = parseFloat(getComputedStyle(mediumEl).fontSize);
    const smallFontSize = parseFloat(getComputedStyle(smallEl).fontSize);

    expect(smallFontSize).toBeLessThan(mediumFontSize);
    await takeSnapshot(`ValidationMessage - applies a smaller fontSize when size="small" for status="warning"`);
  });

  it('applies a smaller fontSize when size="small" for status="success"', async () => {
    const medium = await render(<ValidationMessage status="success" message="Looks good!" />);
    const small = await render(
      <ValidationMessage status="success" message="Looks good!" size="small" />
    );

    const mediumEl = medium.container.querySelector('[role="status"]') as HTMLElement;
    const smallEl = small.container.querySelector('[role="status"]') as HTMLElement;
    const mediumFontSize = parseFloat(getComputedStyle(mediumEl).fontSize);
    const smallFontSize = parseFloat(getComputedStyle(smallEl).fontSize);

    expect(smallFontSize).toBeLessThan(mediumFontSize);
    await takeSnapshot(`ValidationMessage - applies a smaller fontSize when size="small" for status="success"`);
  });

  it('applies a smaller fontSize when size="small" for status="info"', async () => {
    const medium = await render(<ValidationMessage status="info" message="Additional info" />);
    const small = await render(
      <ValidationMessage status="info" message="Additional info" size="small" />
    );

    const mediumEl = medium.container.querySelector('[role="status"]') as HTMLElement;
    const smallEl = small.container.querySelector('[role="status"]') as HTMLElement;
    const mediumFontSize = parseFloat(getComputedStyle(mediumEl).fontSize);
    const smallFontSize = parseFloat(getComputedStyle(smallEl).fontSize);

    expect(smallFontSize).toBeLessThan(mediumFontSize);
    await takeSnapshot(`ValidationMessage - applies a smaller fontSize when size="small" for status="info"`);
  });

  // -------------------------------------------------------------------------
  // Content-source equivalence (3)
  // -------------------------------------------------------------------------

  it('renders the message prop when only message is given', async () => {
    const screen = await render(<ValidationMessage status="info" message="From message prop" />);
    await expect.element(screen.getByText('From message prop')).toBeVisible();
    await takeSnapshot(`ValidationMessage - renders the message prop when only message is given`);
  });

  it('renders children when only children is given', async () => {
    const screen = await render(
      <ValidationMessage status="info">From children</ValidationMessage>
    );
    await expect.element(screen.getByText('From children')).toBeVisible();
    await takeSnapshot(`ValidationMessage - renders children when only children is given`);
  });

  it('children wins over message when both are given', async () => {
    const screen = await render(
      <ValidationMessage status="info" message="From message prop">
        From children
      </ValidationMessage>
    );
    await expect.element(screen.getByText('From children')).toBeVisible();
    expect(screen.container.textContent).not.toContain('From message prop');
    await takeSnapshot(`ValidationMessage - children wins over message when both are given`);
  });

  // -------------------------------------------------------------------------
  // Empty/whitespace edge cases (3)
  // -------------------------------------------------------------------------

  it('renders role and icon without throwing for an empty string message', async () => {
    const screen = await render(<ValidationMessage status="error" message="" />);
    await expect.element(screen.getByRole('alert')).toBeVisible();
    await expect.element(screen.getByTestId('validation-message-icon')).toBeVisible();
    await takeSnapshot(`ValidationMessage - renders role and icon without throwing for an empty string message`);
  });

  it('renders whitespace-only message without throwing', async () => {
    const screen = await render(<ValidationMessage status="warning" message="   " />);
    await expect.element(screen.getByRole('status')).toBeVisible();
    expect(screen.getByTestId('validation-message-text').element().textContent).toBe('   ');
    await takeSnapshot(`ValidationMessage - renders whitespace-only message without throwing`);
  });

  it('renders icon-only without throwing when no message or children are given', async () => {
    const screen = await render(<ValidationMessage status="info" />);
    await expect.element(screen.getByRole('status')).toBeVisible();
    await expect.element(screen.getByTestId('validation-message-icon')).toBeVisible();
    await takeSnapshot(`ValidationMessage - renders icon-only without throwing when no message or children are given`);
  });

  // -------------------------------------------------------------------------
  // Long text wrapping (2)
  // -------------------------------------------------------------------------

  it('renders the full long text for status="error" without truncation', async () => {
    const longText =
      'This is a much longer validation message intended to demonstrate how the text wraps across multiple lines when the container is narrow.';
    const screen = await render(<ValidationMessage status="error" message={longText} />);
    await expect.element(screen.getByText(longText)).toBeInTheDocument();
    await takeSnapshot(`ValidationMessage - renders the full long text for status="error" without truncation`);
  });

  it('renders the full long text for status="warning" without truncation', async () => {
    const longText =
      'This is a much longer validation message intended to demonstrate how the text wraps across multiple lines when the container is narrow.';
    const screen = await render(<ValidationMessage status="warning" message={longText} />);
    await expect.element(screen.getByText(longText)).toBeInTheDocument();
    await takeSnapshot(`ValidationMessage - renders the full long text for status="warning" without truncation`);
  });

  it('renders the full long text for status="success" without truncation', async () => {
    const longText =
      'This is a much longer validation message intended to demonstrate how the text wraps across multiple lines when the container is narrow.';
    const screen = await render(<ValidationMessage status="success" message={longText} />);
    await expect.element(screen.getByText(longText)).toBeInTheDocument();
    await takeSnapshot(`ValidationMessage - renders the full long text for status="success" without truncation`);
  });

  // -------------------------------------------------------------------------
  // Rich content passthrough (3)
  // -------------------------------------------------------------------------

  it('renders a link as a real anchor element, not stringified', async () => {
    const screen = await render(
      <ValidationMessage status="error">
        Required. <a href="#more">Learn more</a>
      </ValidationMessage>
    );
    const link = screen.getByRole('link', { name: 'Learn more' });
    await expect.element(link).toBeVisible();
    expect(link.element().tagName).toBe('A');
    await takeSnapshot(`ValidationMessage - renders a link as a real anchor element, not stringified`);
  });

  it('renders bold text as a real strong element', async () => {
    const screen = await render(
      <ValidationMessage status="warning">
        <strong>Warning:</strong> be careful
      </ValidationMessage>
    );
    const strongEl = screen.container.querySelector('strong');
    expect(strongEl).not.toBeNull();
    expect(strongEl?.textContent).toBe('Warning:');
    await takeSnapshot(`ValidationMessage - renders bold text as a real strong element`);
  });

  it('renders inline code as a real code element', async () => {
    const screen = await render(
      <ValidationMessage status="info">
        Must match <code>^[a-z]+$</code>
      </ValidationMessage>
    );
    const codeEl = screen.container.querySelector('code');
    expect(codeEl).not.toBeNull();
    expect(codeEl?.textContent).toBe('^[a-z]+$');
    await takeSnapshot(`ValidationMessage - renders inline code as a real code element`);
  });

  // -------------------------------------------------------------------------
  // id wiring (4)
  // -------------------------------------------------------------------------

  it('sets the id attribute correctly for status="error"', async () => {
    const screen = await render(
      <ValidationMessage status="error" message="Required field" id="error-id" />
    );
    expect(screen.getByRole('alert').element().id).toBe('error-id');
    await takeSnapshot(`ValidationMessage - sets the id attribute correctly for status="error"`);
  });

  it('sets the id attribute correctly for status="warning"', async () => {
    const screen = await render(
      <ValidationMessage status="warning" message="This looks unusual" id="warning-id" />
    );
    expect(screen.getByRole('status').element().id).toBe('warning-id');
    await takeSnapshot(`ValidationMessage - sets the id attribute correctly for status="warning"`);
  });

  it('sets the id attribute correctly for status="success"', async () => {
    const screen = await render(
      <ValidationMessage status="success" message="Looks good!" id="success-id" />
    );
    expect(screen.getByRole('status').element().id).toBe('success-id');
    await takeSnapshot(`ValidationMessage - sets the id attribute correctly for status="success"`);
  });

  it('sets the id attribute correctly for status="info"', async () => {
    const screen = await render(
      <ValidationMessage status="info" message="Additional info" id="info-id" />
    );
    expect(screen.getByRole('status').element().id).toBe('info-id');
    await takeSnapshot(`ValidationMessage - sets the id attribute correctly for status="info"`);
  });

  // -------------------------------------------------------------------------
  // Multiple messages composition (2)
  // -------------------------------------------------------------------------

  it('renders two ValidationMessage instances together without colliding', async () => {
    const screen = await render(
      <div>
        <ValidationMessage status="error" message="Email is invalid" />
        <ValidationMessage status="success" message="Password is valid" />
      </div>
    );

    await expect.element(screen.getByText('Email is invalid')).toBeVisible();
    await expect.element(screen.getByText('Password is valid')).toBeVisible();
    expect(screen.getByRole('alert').elements()).toHaveLength(1);
    expect(screen.getByRole('status').elements()).toHaveLength(1);
    await takeSnapshot(`ValidationMessage - renders two ValidationMessage instances together without colliding`);
  });

  it('renders multiple stacked messages with independent content and no shared state leaking', async () => {
    const screen = await render(
      <div>
        <ValidationMessage status="warning" message="First warning" />
        <ValidationMessage status="warning" message="Second warning" />
      </div>
    );

    await expect.element(screen.getByText('First warning')).toBeVisible();
    await expect.element(screen.getByText('Second warning')).toBeVisible();
    expect(screen.getByRole('status').elements()).toHaveLength(2);
    await takeSnapshot(`ValidationMessage - renders multiple stacked messages with independent content and no shared state leaking`);
  });

  // -------------------------------------------------------------------------
  // RTL/unicode (2)
  // -------------------------------------------------------------------------

  it('preserves unicode and emoji characters exactly', async () => {
    const unicodeMessage = '✅ Saved successfully — 保存しました 🎉 café';
    const screen = await render(<ValidationMessage status="success" message={unicodeMessage} />);
    expect(screen.getByTestId('validation-message-text').element().textContent).toBe(
      unicodeMessage
    );
    await takeSnapshot(`ValidationMessage - preserves unicode and emoji characters exactly`);
  });

  it('renders correctly inside an RTL ancestor without breaking', async () => {
    const screen = await render(
      <div dir="rtl">
        <ValidationMessage status="error" message="هذا الحقل مطلوب" />
      </div>
    );
    await expect.element(screen.getByRole('alert')).toBeVisible();
    await expect.element(screen.getByText('هذا الحقل مطلوب')).toBeVisible();
    await takeSnapshot(`ValidationMessage - renders correctly inside an RTL ancestor without breaking`);
  });

  // -------------------------------------------------------------------------
  // XSS-safety (1)
  // -------------------------------------------------------------------------

  it('renders a literal script string as text content, not as an executed element', async () => {
    const raw = '<script>alert(1)</script>';
    const screen = await render(<ValidationMessage status="error" message={raw} />);

    await expect.element(screen.getByText(raw)).toBeInTheDocument();
    expect(screen.container.querySelector('script')).toBeNull();
    await takeSnapshot(`ValidationMessage - renders a literal script string as text content, not as an executed element`);
  });

  // -------------------------------------------------------------------------
  // Dynamic status transition (1)
  // -------------------------------------------------------------------------

  it('updates role and visible content when status is changed via rerender', async () => {
    const screen = await render(<ValidationMessage status="error" message="Has an error" />);
    await expect.element(screen.getByRole('alert')).toBeVisible();
    await expect.element(screen.getByText('Has an error')).toBeVisible();

    await screen.rerender(<ValidationMessage status="success" message="Now valid" />);

    await expect.element(screen.getByRole('status')).toBeVisible();
    await expect.element(screen.getByText('Now valid')).toBeVisible();
    expect(screen.container.querySelector('[role="alert"]')).toBeNull();
    await takeSnapshot(`ValidationMessage - updates role and visible content when status is changed via rerender`);
  });

  // -------------------------------------------------------------------------
  // Default prop values (1)
  // -------------------------------------------------------------------------

  it('defaults to showing the icon and medium size when props are omitted', async () => {
    const withDefaults = await render(
      <ValidationMessage status="info" message="Default props" />
    );
    const explicitMedium = await render(
      <ValidationMessage status="info" message="Default props" size="medium" />
    );

    expect(
      withDefaults.container.querySelector('[data-testid="validation-message-icon"]')
    ).not.toBeNull();

    const withDefaultsEl = withDefaults.container.querySelector('[role="status"]') as HTMLElement;
    const explicitMediumEl = explicitMedium.container.querySelector(
      '[role="status"]'
    ) as HTMLElement;
    const defaultFontSize = getComputedStyle(withDefaultsEl).fontSize;
    const explicitMediumFontSize = getComputedStyle(explicitMediumEl).fontSize;

    expect(defaultFontSize).toBe(explicitMediumFontSize);
    await takeSnapshot(`ValidationMessage - defaults to showing the icon and medium size when props are omitted`);
  });

  // -------------------------------------------------------------------------
  // Combined-prop robustness (2 extra)
  // -------------------------------------------------------------------------

  it('hides the icon even when inverted and showIcon is false together', async () => {
    const screen = await render(
      <ValidationMessage status="error" message="Required field" inverted showIcon={false} />
    );
    expect(screen.container.querySelector('[data-testid="validation-message-icon"]')).toBeNull();
    expect(screen.getByRole('alert').element()).not.toBeNull();
    await takeSnapshot(`ValidationMessage - hides the icon even when inverted and showIcon is false together`);
  });

  it('applies the small fontSize even when combined with inverted', async () => {
    const mediumInverted = await render(
      <ValidationMessage status="info" message="Additional info" inverted />
    );
    const smallInverted = await render(
      <ValidationMessage status="info" message="Additional info" inverted size="small" />
    );

    const mediumInvertedEl = mediumInverted.container.querySelector(
      '[role="status"]'
    ) as HTMLElement;
    const smallInvertedEl = smallInverted.container.querySelector(
      '[role="status"]'
    ) as HTMLElement;
    const mediumFontSize = parseFloat(getComputedStyle(mediumInvertedEl).fontSize);
    const smallFontSize = parseFloat(getComputedStyle(smallInvertedEl).fontSize);

    expect(smallFontSize).toBeLessThan(mediumFontSize);
    await takeSnapshot(`ValidationMessage - applies the small fontSize even when combined with inverted`);
  });

  // -------------------------------------------------------------------------
  // Multiple-instance id uniqueness (1)
  // -------------------------------------------------------------------------

  it('keeps distinct explicit ids across two rendered instances', async () => {
    const screen = await render(
      <div>
        <ValidationMessage status="error" message="First" id="first-id" />
        <ValidationMessage status="warning" message="Second" id="second-id" />
      </div>
    );

    const firstEl = screen.container.querySelector('#first-id');
    const secondEl = screen.container.querySelector('#second-id');

    expect(firstEl).not.toBeNull();
    expect(secondEl).not.toBeNull();
    expect(firstEl).not.toBe(secondEl);
    await takeSnapshot(`ValidationMessage - keeps distinct explicit ids across two rendered instances`);
  });
});
