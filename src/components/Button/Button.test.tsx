import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import Button from './Button';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

/** The button is the only <button> element rendered by the component. */
const getButton = (container: HTMLElement) =>
  container.querySelector('button') as HTMLElement;

describe('Button', () => {
  /* -----------------------------------------------------------------------
   * Rendering defaults (3)
   * -------------------------------------------------------------------- */

  it('renders the provided label text as button content', async () => {
    const screen = await render(<Button label="Click me" onClick={vi.fn()} />);
    await expect.element(screen.getByText('Click me')).toBeInTheDocument();
    await takeSnapshot(`Button - renders the provided label text as button content`);
  });

  it('applies the default medium size styles when size is not provided', async () => {
    const screen = await render(<Button label="Default size" onClick={vi.fn()} />);
    const button = screen.getByRole('button');
    await expect.element(button).toHaveStyle({
      padding: `${spacing[2]} ${spacing[4]}`,
      fontSize: fontSize[14],
      height: spacing[8],
    });
    await takeSnapshot(`Button - applies the default medium size styles when size is not provided`);
  });

  it('applies the default blue background color when backgroundColor is not provided', async () => {
    const screen = await render(<Button label="Default color" onClick={vi.fn()} />);
    const button = screen.getByRole('button');
    await expect.element(button).toHaveStyle({ backgroundColor: color.blue500 });
    await takeSnapshot(`Button - applies the default blue background color when backgroundColor is not provided`);
  });

  /* -----------------------------------------------------------------------
   * Size style mapping (3)
   * -------------------------------------------------------------------- */

  it('applies the small size padding, font-size, and height', async () => {
    const screen = await render(
      <Button label="Small" size="small" onClick={vi.fn()} />
    );
    const button = screen.getByRole('button');
    await expect.element(button).toHaveStyle({
      padding: `${spacing[1]} ${spacing[3]}`,
      fontSize: fontSize[12],
      height: spacing[6],
    });
    await takeSnapshot(`Button - applies the small size padding, font-size, and height`);
  });

  it('applies the medium size padding, font-size, and height', async () => {
    const screen = await render(
      <Button label="Medium" size="medium" onClick={vi.fn()} />
    );
    const button = screen.getByRole('button');
    await expect.element(button).toHaveStyle({
      padding: `${spacing[2]} ${spacing[4]}`,
      fontSize: fontSize[14],
      height: spacing[8],
    });
    await takeSnapshot(`Button - applies the medium size padding, font-size, and height`);
  });

  it('applies the large size padding, font-size, and height', async () => {
    const screen = await render(
      <Button label="Large" size="large" onClick={vi.fn()} />
    );
    const button = screen.getByRole('button');
    await expect.element(button).toHaveStyle({
      padding: `${spacing[3]} ${spacing[5]}`,
      fontSize: fontSize[16],
      height: spacing[10],
    });
    await takeSnapshot(`Button - applies the large size padding, font-size, and height`);
  });

  /* -----------------------------------------------------------------------
   * Custom backgroundColor (3)
   * -------------------------------------------------------------------- */

  it('applies a custom backgroundColor when provided', async () => {
    const screen = await render(
      <Button label="Red" backgroundColor="#ef4444" onClick={vi.fn()} />
    );
    const button = screen.getByRole('button');
    await expect.element(button).toHaveStyle({ backgroundColor: '#ef4444' });
    await takeSnapshot(`Button - applies a custom backgroundColor when provided`);
  });

  it('applies a different custom backgroundColor correctly', async () => {
    const screen = await render(
      <Button label="Blue" backgroundColor="#3b82f6" onClick={vi.fn()} />
    );
    const button = screen.getByRole('button');
    await expect.element(button).toHaveStyle({ backgroundColor: '#3b82f6' });
    await takeSnapshot(`Button - applies a different custom backgroundColor correctly`);
  });

  it('overrides the default background color entirely when a custom color is given', async () => {
    const screen = await render(
      <Button label="Purple" backgroundColor="#6F2CAC" onClick={vi.fn()} />
    );
    const button = screen.getByRole('button');
    await expect.element(button).not.toHaveStyle({ backgroundColor: color.blue500 });
    await expect.element(button).toHaveStyle({ backgroundColor: '#6F2CAC' });
    await takeSnapshot(`Button - overrides the default background color entirely when a custom color is given`);
  });

  /* -----------------------------------------------------------------------
   * onClick callback (4)
   * -------------------------------------------------------------------- */

  it('calls onClick exactly once per click', async () => {
    const onClick = vi.fn();
    const screen = await render(<Button label="Click" onClick={onClick} />);
    await userEvent.click(screen.getByRole('button'));
    await vi.waitFor(() => expect(onClick).toHaveBeenCalledTimes(1));
    await takeSnapshot(`Button - calls onClick exactly once per click`);
  });

  it('calls onClick twice for two separate clicks', async () => {
    const onClick = vi.fn();
    const screen = await render(<Button label="Click twice" onClick={onClick} />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    await userEvent.click(button);
    await vi.waitFor(() => expect(onClick).toHaveBeenCalledTimes(2));
    await takeSnapshot(`Button - calls onClick twice for two separate clicks`);
  });

  it('does not throw when clicked without an onClick handler', async () => {
    const screen = await render(<Button label="No handler" />);
    await expect(
      userEvent.click(screen.getByRole('button'))
    ).resolves.not.toThrow();
    await takeSnapshot(`Button - does not throw when clicked without an onClick handler`);
  });

  it('does not call onClick when the button merely renders without being clicked', async () => {
    const onClick = vi.fn();
    await render(<Button label="Untouched" onClick={onClick} />);
    expect(onClick).not.toHaveBeenCalled();
    await takeSnapshot(`Button - does not call onClick when the button merely renders without being clicked`);
  });

  /* -----------------------------------------------------------------------
   * Label text content rendering (6)
   * -------------------------------------------------------------------- */

  it('renders long label text in full without truncating the DOM text content', async () => {
    const longLabel =
      'This is a very long button label that tests text overflow behavior across a wide range of container widths';
    const screen = await render(<Button label={longLabel} onClick={vi.fn()} />);
    await expect.element(screen.getByText(longLabel)).toHaveTextContent(longLabel);
    await takeSnapshot(`Button - renders long label text in full without truncating the DOM text content`);
  });

  it('renders emoji label content exactly', async () => {
    const screen = await render(<Button label="🚀 Launch" onClick={vi.fn()} />);
    await expect
      .element(screen.getByText('🚀 Launch'))
      .toHaveTextContent('🚀 Launch');
    await takeSnapshot(`Button - renders emoji label content exactly`);
  });

  it('renders RTL unicode label content exactly', async () => {
    const screen = await render(<Button label="انقر هنا" onClick={vi.fn()} />);
    await expect
      .element(screen.getByText('انقر هنا'))
      .toHaveTextContent('انقر هنا');
    await takeSnapshot(`Button - renders RTL unicode label content exactly`);
  });

  it('renders a single-character label', async () => {
    const screen = await render(<Button label="X" onClick={vi.fn()} />);
    await expect.element(screen.getByRole('button')).toHaveTextContent('X');
    await takeSnapshot(`Button - renders a single-character label`);
  });

  it('renders numeric label content exactly', async () => {
    const screen = await render(<Button label="12345" onClick={vi.fn()} />);
    await expect.element(screen.getByText('12345')).toHaveTextContent('12345');
    await takeSnapshot(`Button - renders numeric label content exactly`);
  });

  it('renders special-character label content exactly', async () => {
    const screen = await render(
      <Button label="!@#$%^&*()_+-=" onClick={vi.fn()} />
    );
    await expect
      .element(screen.getByText('!@#$%^&*()_+-='))
      .toHaveTextContent('!@#$%^&*()_+-=');
    await takeSnapshot(`Button - renders special-character label content exactly`);
  });

  /* -----------------------------------------------------------------------
   * Empty/whitespace label edge cases (2)
   * -------------------------------------------------------------------- */

  it('renders without crashing when the label is an empty string', async () => {
    const screen = await render(<Button label="" onClick={vi.fn()} />);
    await expect.element(screen.getByRole('button')).toBeInTheDocument();
    await takeSnapshot(`Button - renders without crashing when the label is an empty string`);
  });

  it('renders a whitespace-only label as visible button text content', async () => {
    const screen = await render(<Button label="   " onClick={vi.fn()} />);
    const button = getButton(screen.container);
    expect(button.textContent).toBe('   ');
    await takeSnapshot(`Button - renders a whitespace-only label as visible button text content`);
  });

  /* -----------------------------------------------------------------------
   * Keyboard interaction (4)
   * -------------------------------------------------------------------- */

  it('moves focus to the button via Tab', async () => {
    const screen = await render(<Button label="Tab target" onClick={vi.fn()} />);
    const button = screen.getByRole('button');
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    await vi.waitFor(() => expect(document.activeElement).toBe(button.element()));
    await takeSnapshot(`Button - moves focus to the button via Tab`);
  });

  it('calls onClick when Enter is pressed on a focused button', async () => {
    const onClick = vi.fn();
    const screen = await render(<Button label="Enter to click" onClick={onClick} />);
    const button = screen.getByRole('button');
    button.element().focus();
    await userEvent.keyboard('{Enter}');
    await vi.waitFor(() => expect(onClick).toHaveBeenCalledTimes(1));
    await takeSnapshot(`Button - calls onClick when Enter is pressed on a focused button`);
  });

  it('calls onClick when Space is pressed on a focused button', async () => {
    const onClick = vi.fn();
    const screen = await render(<Button label="Space to click" onClick={onClick} />);
    const button = screen.getByRole('button');
    button.element().focus();
    await userEvent.keyboard(' ');
    await vi.waitFor(() => expect(onClick).toHaveBeenCalledTimes(1));
    await takeSnapshot(`Button - calls onClick when Space is pressed on a focused button`);
  });

  it('does not call onClick when an unrelated key is pressed on a focused button', async () => {
    const onClick = vi.fn();
    const screen = await render(<Button label="Ignore this key" onClick={onClick} />);
    const button = screen.getByRole('button');
    button.element().focus();
    await userEvent.keyboard('a');
    await vi.waitFor(() => expect(onClick).not.toHaveBeenCalled());
    await takeSnapshot(`Button - does not call onClick when an unrelated key is pressed on a focused button`);
  });

  /* -----------------------------------------------------------------------
   * Rendered element / accessibility (4)
   * -------------------------------------------------------------------- */

  it('renders as a real <button> element', async () => {
    const screen = await render(<Button label="Real button" onClick={vi.fn()} />);
    const button = screen.getByRole('button');
    expect(button.element().tagName).toBe('BUTTON');
    await takeSnapshot(`Button - renders as a real <button> element`);
  });

  it('exposes an implicit button role', async () => {
    const screen = await render(<Button label="Role check" onClick={vi.fn()} />);
    await expect.element(screen.getByRole('button')).toBeInTheDocument();
    await takeSnapshot(`Button - exposes an implicit button role`);
  });

  it('exposes an accessible name matching the label text', async () => {
    const screen = await render(<Button label="Accessible name" onClick={vi.fn()} />);
    await expect
      .element(screen.getByRole('button', { name: 'Accessible name' }))
      .toBeInTheDocument();
    await takeSnapshot(`Button - exposes an accessible name matching the label text`);
  });

  it('renders enabled by default since Button has no disabled prop', async () => {
    const screen = await render(<Button label="Enabled" onClick={vi.fn()} />);
    await expect.element(screen.getByRole('button')).toBeEnabled();
    await takeSnapshot(`Button - renders enabled by default since Button has no disabled prop`);
  });

  /* -----------------------------------------------------------------------
   * Size + color kitchen-sink combos (5)
   * -------------------------------------------------------------------- */

  it('renders correctly with small size and a custom purple background', async () => {
    const screen = await render(
      <Button label="Small Purple" size="small" backgroundColor="#6F2CAC" onClick={vi.fn()} />
    );
    const button = screen.getByRole('button');
    await expect.element(button).toHaveStyle({
      backgroundColor: '#6F2CAC',
      fontSize: fontSize[12],
      height: spacing[6],
    });
    await expect.element(button).toHaveTextContent('Small Purple');
    await takeSnapshot(`Button - renders correctly with small size and a custom purple background`);
  });

  it('renders correctly with medium size and a custom orange background', async () => {
    const screen = await render(
      <Button label="Medium Orange" size="medium" backgroundColor="#FF4400" onClick={vi.fn()} />
    );
    const button = screen.getByRole('button');
    await expect.element(button).toHaveStyle({
      backgroundColor: '#FF4400',
      fontSize: fontSize[14],
      height: spacing[8],
    });
    await expect.element(button).toHaveTextContent('Medium Orange');
    await takeSnapshot(`Button - renders correctly with medium size and a custom orange background`);
  });

  it('renders correctly with large size and a custom pink background', async () => {
    const screen = await render(
      <Button label="Large Pink" size="large" backgroundColor="#FF4785" onClick={vi.fn()} />
    );
    const button = screen.getByRole('button');
    await expect.element(button).toHaveStyle({
      backgroundColor: '#FF4785',
      fontSize: fontSize[16],
      height: spacing[10],
    });
    await expect.element(button).toHaveTextContent('Large Pink');
    await takeSnapshot(`Button - renders correctly with large size and a custom pink background`);
  });

  it('renders correctly with a long label, custom color, and small size together', async () => {
    const longLabel = 'Kitchen sink: small, purple, and a fairly long label text';
    const screen = await render(
      <Button label={longLabel} size="small" backgroundColor="#6F2CAC" onClick={vi.fn()} />
    );
    const button = screen.getByRole('button');
    await expect.element(button).toHaveStyle({ backgroundColor: '#6F2CAC', fontSize: fontSize[12] });
    await expect.element(button).toHaveTextContent(longLabel);
    await takeSnapshot(`Button - renders correctly with a long label, custom color, and small size together`);
  });

  it('renders correctly with an emoji label, custom color, and large size together', async () => {
    const screen = await render(
      <Button label="🔥 Kitchen sink large" size="large" backgroundColor="#FF4400" onClick={vi.fn()} />
    );
    const button = screen.getByRole('button');
    await expect.element(button).toHaveStyle({ backgroundColor: '#FF4400', fontSize: fontSize[16] });
    await expect.element(button).toHaveTextContent('🔥 Kitchen sink large');
    await takeSnapshot(`Button - renders correctly with an emoji label, custom color, and large size together`);
  });

  /* -----------------------------------------------------------------------
   * Shared style properties across all sizes (3)
   * -------------------------------------------------------------------- */

  it('always applies inline-flex display regardless of size', async () => {
    const screen = await render(<Button label="Flex" size="large" onClick={vi.fn()} />);
    const button = screen.getByRole('button');
    await expect.element(button).toHaveStyle({ display: 'inline-flex' });
    await takeSnapshot(`Button - always applies inline-flex display regardless of size`);
  });

  it('always applies the configured medium font weight regardless of size', async () => {
    const screen = await render(<Button label="Weight" size="small" onClick={vi.fn()} />);
    const button = screen.getByRole('button');
    await expect.element(button).toHaveStyle({ fontWeight: String(fontWeight.medium) });
    await takeSnapshot(`Button - always applies the configured medium font weight regardless of size`);
  });

  it('always applies a pointer cursor regardless of size', async () => {
    const screen = await render(<Button label="Cursor" size="medium" onClick={vi.fn()} />);
    const button = screen.getByRole('button');
    await expect.element(button).toHaveStyle({ cursor: 'pointer' });
    await takeSnapshot(`Button - always applies a pointer cursor regardless of size`);
  });

  /* -----------------------------------------------------------------------
   * Multiple independent buttons (3)
   * -------------------------------------------------------------------- */

  it('does not share click state between two independently rendered buttons', async () => {
    const onFirstClick = vi.fn();
    const onSecondClick = vi.fn();
    const screen = await render(
      <div>
        <Button label="First" onClick={onFirstClick} />
        <Button label="Second" onClick={onSecondClick} />
      </div>
    );
    const first = screen.getByRole('button', { name: 'First' });
    await userEvent.click(first);
    await vi.waitFor(() => expect(onFirstClick).toHaveBeenCalledTimes(1));
    await vi.waitFor(() => expect(onSecondClick).toHaveBeenCalledTimes(0));
    await takeSnapshot(`Button - does not share click state between two independently rendered buttons`);
  });

  it('only invokes the clicked button onClick handler, not the other button', async () => {
    const onFirstClick = vi.fn();
    const onSecondClick = vi.fn();
    const screen = await render(
      <div>
        <Button label="Alpha" onClick={onFirstClick} />
        <Button label="Beta" onClick={onSecondClick} />
      </div>
    );
    const second = screen.getByRole('button', { name: 'Beta' });
    await userEvent.click(second);
    await vi.waitFor(() => expect(onSecondClick).toHaveBeenCalledTimes(1));
    await vi.waitFor(() => expect(onFirstClick).not.toHaveBeenCalled());
    await takeSnapshot(`Button - only invokes the clicked button onClick handler, not the other button`);
  });

  it('renders two buttons with distinct labels correctly side-by-side', async () => {
    const screen = await render(
      <div>
        <Button label="Cancel" onClick={vi.fn()} />
        <Button label="Save" onClick={vi.fn()} />
      </div>
    );
    const buttons = screen.container.querySelectorAll('button');
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toBe('Cancel');
    expect(buttons[1].textContent).toBe('Save');
    await takeSnapshot(`Button - renders two buttons with distinct labels correctly side-by-side`);
  });

  /* -----------------------------------------------------------------------
   * Default prop values (2)
   * -------------------------------------------------------------------- */

  it('defaults to medium size when no size prop is passed', async () => {
    const screen = await render(<Button label="Implicit medium" onClick={vi.fn()} />);
    const button = screen.getByRole('button');
    await expect.element(button).toHaveStyle({ fontSize: fontSize[14], height: spacing[8] });
    await takeSnapshot(`Button - defaults to medium size when no size prop is passed`);
  });

  it('renders without throwing when mounted with no onClick handler by default', async () => {
    await expect(
      render(<Button label="No handler by default" />)
    ).resolves.not.toThrow();
    await takeSnapshot(`Button - renders without throwing when mounted with no onClick handler by default`);
  });

  /* -----------------------------------------------------------------------
   * Rapid interaction (2)
   * -------------------------------------------------------------------- */

  it('accumulates the correct call count after three rapid clicks', async () => {
    const onClick = vi.fn();
    const screen = await render(<Button label="Click three times" onClick={onClick} />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    await userEvent.click(button);
    await userEvent.click(button);
    await vi.waitFor(() => expect(onClick).toHaveBeenCalledTimes(3));
    await takeSnapshot(`Button - accumulates the correct call count after three rapid clicks`);
  });

  it('accumulates the correct call count after five rapid clicks', async () => {
    const onClick = vi.fn();
    const screen = await render(<Button label="Click five times" onClick={onClick} />);
    const button = screen.getByRole('button');
    for (let i = 0; i < 5; i += 1) {
      await userEvent.click(button);
    }
    await vi.waitFor(() => expect(onClick).toHaveBeenCalledTimes(5));
    await takeSnapshot(`Button - accumulates the correct call count after five rapid clicks`);
  });

  /* -----------------------------------------------------------------------
   * Border / border-radius styling (2)
   * -------------------------------------------------------------------- */

  it('removes the native button border', async () => {
    const screen = await render(<Button label="No border" onClick={vi.fn()} />);
    const button = screen.getByRole('button');
    await expect.element(button).toHaveStyle({ borderStyle: 'none' });
    await takeSnapshot(`Button - removes the native button border`);
  });

  it('applies the configured border radius', async () => {
    const screen = await render(<Button label="Rounded" onClick={vi.fn()} />);
    const button = screen.getByRole('button');
    await expect.element(button).toHaveStyle({ borderRadius: spacing[2] });
    await takeSnapshot(`Button - applies the configured border radius`);
  });

  /* -----------------------------------------------------------------------
   * Transition styling (1)
   * -------------------------------------------------------------------- */

  it('applies a transition style intended for hover/focus effects', async () => {
    const screen = await render(<Button label="Transition" onClick={vi.fn()} />);
    const button = screen.getByRole('button');
    await expect.element(button).toHaveStyle({ transition: 'all 0.2s ease' });
    await takeSnapshot(`Button - applies a transition style intended for hover/focus effects`);
  });

  /* -----------------------------------------------------------------------
   * Long label in constrained container (1)
   * -------------------------------------------------------------------- */

  it('renders long label text inside a narrow container without throwing', async () => {
    const longLabel =
      'This extremely long button label is intended to exercise text wrapping and overflow handling inside a constrained width container';
    await expect(
      render(
        <div style={{ maxWidth: '160px' }}>
          <Button label={longLabel} onClick={vi.fn()} />
        </div>
      )
    ).resolves.not.toThrow();
    await takeSnapshot(`Button - renders long label text inside a narrow container without throwing`);
  });

  /* -----------------------------------------------------------------------
   * Additional custom color variations (2)
   * -------------------------------------------------------------------- */

  it('applies a green custom background color correctly', async () => {
    const screen = await render(
      <Button label="Green" backgroundColor="#10b981" onClick={vi.fn()} />
    );
    const button = screen.getByRole('button');
    await expect.element(button).toHaveStyle({ backgroundColor: '#10b981' });
    await takeSnapshot(`Button - applies a green custom background color correctly`);
  });

  it('applies a transparent background color when explicitly set', async () => {
    const screen = await render(
      <Button label="Transparent" backgroundColor="transparent" onClick={vi.fn()} />
    );
    const button = screen.getByRole('button');
    await expect.element(button).toHaveStyle({ backgroundColor: 'transparent' });
    await takeSnapshot(`Button - applies a transparent background color when explicitly set`);
  });
});
