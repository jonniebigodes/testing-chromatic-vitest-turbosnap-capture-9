import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent, page } from 'vitest/browser';
import { useState } from 'react';
import Input from './Input';
import { color, fontSize, spacing } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

/**
 * Small stateful fixture mirroring a typical controlled-input usage pattern,
 * used to exercise real onChange -> setState -> value round-tripping (as
 * opposed to just spy call counts).
 */
const ControlledInputFixture = ({ initial }: { initial: string }) => {
  const [value, setValue] = useState(initial);

  return (
    <Input value={value} onChange={(e) => setValue(e.target.value)} />
  );
};

/** Wraps a raw HTMLElement into a Locator so jest-dom matchers can be used. */
const locatorFor = (element: HTMLElement) => page.elementLocator(element);

/** Grabs the rendered native <input> element out of a render() result. */
const getInput = (screen: { container: HTMLElement }) =>
  screen.container.querySelector('input') as HTMLInputElement;

describe('Input', () => {
  /* -----------------------------------------------------------------------
   * Default vs inverted base colors (4)
   * -------------------------------------------------------------------- */

  it('renders default (normal) background and text colors', async () => {
    const screen = await render(<Input />);
    const input = getInput(screen);
    await expect
      .element(locatorFor(input))
      .toHaveStyle({ backgroundColor: color.white, color: color.slate800 });
    await takeSnapshot(`Input - renders default (normal) background and text colors`);
  });

  it('renders default (normal) border color', async () => {
    const screen = await render(<Input />);
    const input = getInput(screen);
    await expect
      .element(locatorFor(input))
      .toHaveStyle({ borderColor: color.slate300 });
    await takeSnapshot(`Input - renders default (normal) border color`);
  });

  it('renders inverted background and text colors', async () => {
    const screen = await render(<Input inverted />);
    const input = getInput(screen);
    await expect
      .element(locatorFor(input))
      .toHaveStyle({ backgroundColor: color.slate800, color: color.white });
    await takeSnapshot(`Input - renders inverted background and text colors`);
  });

  it('renders inverted border color', async () => {
    const screen = await render(<Input inverted />);
    const input = getInput(screen);
    await expect
      .element(locatorFor(input))
      .toHaveStyle({ borderColor: color.slate700 });
    await takeSnapshot(`Input - renders inverted border color`);
  });

  /* -----------------------------------------------------------------------
   * Fixed layout styles (3)
   * -------------------------------------------------------------------- */

  it('renders at full width', async () => {
    const screen = await render(<Input />);
    const input = getInput(screen);
    await expect.element(locatorFor(input)).toHaveStyle({ width: '100%' });
    await takeSnapshot(`Input - renders at full width`);
  });

  it('applies the token-based padding', async () => {
    const screen = await render(<Input />);
    const input = getInput(screen);
    expect(input.style.padding).toBe(`${spacing[2]} ${spacing[3]}`);
    await takeSnapshot(`Input - applies the token-based padding`);
  });

  it('applies the token-based border radius and font size', async () => {
    const screen = await render(<Input />);
    const input = getInput(screen);
    await expect
      .element(locatorFor(input))
      .toHaveStyle({ borderRadius: spacing[2], fontSize: fontSize[14] });
    await takeSnapshot(`Input - applies the token-based border radius and font size`);
  });

  /* -----------------------------------------------------------------------
   * Placeholder (2)
   * -------------------------------------------------------------------- */

  it('renders the given placeholder text', async () => {
    const screen = await render(<Input placeholder="Enter your name" />);
    const input = getInput(screen);
    await expect
      .element(locatorFor(input))
      .toHaveAttribute('placeholder', 'Enter your name');
    await takeSnapshot(`Input - renders the given placeholder text`);
  });

  it('defaults the placeholder to an empty string when omitted', async () => {
    const screen = await render(<Input />);
    const input = getInput(screen);
    await expect.element(locatorFor(input)).toHaveAttribute('placeholder', '');
    await takeSnapshot(`Input - defaults the placeholder to an empty string when omitted`);
  });

  /* -----------------------------------------------------------------------
   * type attribute for every supported type (9)
   * -------------------------------------------------------------------- */

  it('renders type="text"', async () => {
    const screen = await render(<Input type="text" />);
    await expect
      .element(locatorFor(getInput(screen)))
      .toHaveAttribute('type', 'text');
    await takeSnapshot(`Input - renders type="text"`);
  });

  it('renders type="email"', async () => {
    const screen = await render(<Input type="email" />);
    await expect
      .element(locatorFor(getInput(screen)))
      .toHaveAttribute('type', 'email');
    await takeSnapshot(`Input - renders type="email"`);
  });

  it('renders type="password"', async () => {
    const screen = await render(<Input type="password" />);
    await expect
      .element(locatorFor(getInput(screen)))
      .toHaveAttribute('type', 'password');
    await takeSnapshot(`Input - renders type="password"`);
  });

  it('renders type="number"', async () => {
    const screen = await render(<Input type="number" />);
    await expect
      .element(locatorFor(getInput(screen)))
      .toHaveAttribute('type', 'number');
    await takeSnapshot(`Input - renders type="number"`);
  });

  it('renders type="tel"', async () => {
    const screen = await render(<Input type="tel" />);
    await expect
      .element(locatorFor(getInput(screen)))
      .toHaveAttribute('type', 'tel');
    await takeSnapshot(`Input - renders type="tel"`);
  });

  it('renders type="url"', async () => {
    const screen = await render(<Input type="url" />);
    await expect
      .element(locatorFor(getInput(screen)))
      .toHaveAttribute('type', 'url');
    await takeSnapshot(`Input - renders type="url"`);
  });

  it('renders type="search"', async () => {
    const screen = await render(<Input type="search" />);
    await expect
      .element(locatorFor(getInput(screen)))
      .toHaveAttribute('type', 'search');
    await takeSnapshot(`Input - renders type="search"`);
  });

  it('renders type="date"', async () => {
    const screen = await render(<Input type="date" />);
    await expect
      .element(locatorFor(getInput(screen)))
      .toHaveAttribute('type', 'date');
    await takeSnapshot(`Input - renders type="date"`);
  });

  it('renders type="time"', async () => {
    const screen = await render(<Input type="time" />);
    await expect
      .element(locatorFor(getInput(screen)))
      .toHaveAttribute('type', 'time');
    await takeSnapshot(`Input - renders type="time"`);
  });

  /* -----------------------------------------------------------------------
   * type default (1)
   * -------------------------------------------------------------------- */

  it('defaults type to "text" when omitted', async () => {
    const screen = await render(<Input />);
    await expect
      .element(locatorFor(getInput(screen)))
      .toHaveAttribute('type', 'text');
    await takeSnapshot(`Input - defaults type to "text" when omitted`);
  });

  /* -----------------------------------------------------------------------
   * Disabled (2)
   * -------------------------------------------------------------------- */

  it('renders the disabled attribute when disabled is true', async () => {
    const screen = await render(<Input disabled />);
    await expect.element(locatorFor(getInput(screen))).toBeDisabled();
    await takeSnapshot(`Input - renders the disabled attribute when disabled is true`);
  });

  it('does not render the disabled attribute by default', async () => {
    const screen = await render(<Input />);
    await expect.element(locatorFor(getInput(screen))).not.toBeDisabled();
    await takeSnapshot(`Input - does not render the disabled attribute by default`);
  });

  /* -----------------------------------------------------------------------
   * Required (1)
   * -------------------------------------------------------------------- */

  it('renders the required attribute when required is true', async () => {
    const screen = await render(<Input required />);
    await expect
      .element(locatorFor(getInput(screen)))
      .toHaveAttribute('required');
    await takeSnapshot(`Input - renders the required attribute when required is true`);
  });

  /* -----------------------------------------------------------------------
   * ReadOnly (2)
   * -------------------------------------------------------------------- */

  it('renders the readOnly attribute when readOnly is true', async () => {
    const screen = await render(<Input readOnly defaultValue="fixed" />);
    const input = getInput(screen);
    await expect.element(locatorFor(input)).toHaveAttribute('readonly');
    await expect.element(locatorFor(input)).toHaveValue('fixed');
    await takeSnapshot(`Input - renders the readOnly attribute when readOnly is true`);
  });

  it('keeps its initial value when readOnly is true', async () => {
    const screen = await render(<Input readOnly defaultValue="unchanged" />);
    const input = getInput(screen);
    expect(input.value).toBe('unchanged');
    await takeSnapshot(`Input - keeps its initial value when readOnly is true`);
  });

  /* -----------------------------------------------------------------------
   * Controlled value + onChange (3)
   * -------------------------------------------------------------------- */

  it('reflects typed characters back into a controlled value', async () => {
    const screen = await render(<ControlledInputFixture initial="" />);
    const input = getInput(screen);
    await userEvent.type(locatorFor(input), 'hello');
    await expect.element(locatorFor(input)).toHaveValue('hello');
    await takeSnapshot(`Input - reflects typed characters back into a controlled value`);
  });

  it('fires onChange with the latest value for each keystroke', async () => {
    const onChange = vi.fn();
    const screen = await render(<Input value="" onChange={onChange} />);
    const input = getInput(screen);
    await userEvent.type(locatorFor(input), 'ab');
    await vi.waitFor(() => expect(onChange).toHaveBeenCalledTimes(2));
    await takeSnapshot(`Input - fires onChange with the latest value for each keystroke`);
  });

  it('replaces the entire value when using userEvent.fill', async () => {
    const screen = await render(<ControlledInputFixture initial="old value" />);
    const input = getInput(screen);
    await userEvent.fill(locatorFor(input), 'new value');
    await expect.element(locatorFor(input)).toHaveValue('new value');
    await takeSnapshot(`Input - replaces the entire value when using userEvent.fill`);
  });

  /* -----------------------------------------------------------------------
   * Focus border-color + boxShadow (2)
   * -------------------------------------------------------------------- */

  it('changes to the normal focus border color and box shadow on focus', async () => {
    const screen = await render(<Input />);
    const input = getInput(screen);
    await userEvent.click(locatorFor(input));
    await expect.element(locatorFor(input)).toHaveStyle({
      borderColor: color.blue500,
      boxShadow: `0 0 0 3px ${color.blueTr10}`,
    });
    await takeSnapshot(`Input - changes to the normal focus border color and box shadow on focus`);
  });

  it('changes to the inverted focus border color and box shadow on focus', async () => {
    const screen = await render(<Input inverted />);
    const input = getInput(screen);
    await userEvent.click(locatorFor(input));
    await expect.element(locatorFor(input)).toHaveStyle({
      borderColor: color.blue400,
      boxShadow: `0 0 0 3px ${color.blueTr50}`,
    });
    await takeSnapshot(`Input - changes to the inverted focus border color and box shadow on focus`);
  });

  /* -----------------------------------------------------------------------
   * Blur reverting styles (2)
   * -------------------------------------------------------------------- */

  it('reverts to the normal border color and removes the box shadow on blur', async () => {
    const screen = await render(
      <div>
        <Input />
        <button>Blur target</button>
      </div>
    );
    const input = getInput(screen);
    const button = screen.getByRole('button', { name: 'Blur target' });
    await userEvent.click(locatorFor(input));
    await userEvent.click(button);
    await expect
      .element(locatorFor(input))
      .toHaveStyle({ borderColor: color.slate300, boxShadow: 'none' });
    await takeSnapshot(`Input - reverts to the normal border color and removes the box shadow on blur`);
  });

  it('reverts to the inverted border color and removes the box shadow on blur', async () => {
    const screen = await render(
      <div>
        <Input inverted />
        <button>Blur target</button>
      </div>
    );
    const input = getInput(screen);
    const button = screen.getByRole('button', { name: 'Blur target' });
    await userEvent.click(locatorFor(input));
    await userEvent.click(button);
    await expect
      .element(locatorFor(input))
      .toHaveStyle({ borderColor: color.slate700, boxShadow: 'none' });
    await takeSnapshot(`Input - reverts to the inverted border color and removes the box shadow on blur`);
  });

  /* -----------------------------------------------------------------------
   * Native attribute passthrough (4)
   * -------------------------------------------------------------------- */

  it('passes through the maxLength attribute', async () => {
    const screen = await render(<Input maxLength={10} />);
    await expect
      .element(locatorFor(getInput(screen)))
      .toHaveAttribute('maxlength', '10');
    await takeSnapshot(`Input - passes through the maxLength attribute`);
  });

  it('passes through the autoComplete attribute', async () => {
    const screen = await render(<Input autoComplete="email" />);
    await expect
      .element(locatorFor(getInput(screen)))
      .toHaveAttribute('autocomplete', 'email');
    await takeSnapshot(`Input - passes through the autoComplete attribute`);
  });

  it('passes through the name attribute', async () => {
    const screen = await render(<Input name="username" />);
    await expect
      .element(locatorFor(getInput(screen)))
      .toHaveAttribute('name', 'username');
    await takeSnapshot(`Input - passes through the name attribute`);
  });

  it('passes through the id attribute', async () => {
    const screen = await render(<Input id="email-field" />);
    await expect
      .element(locatorFor(getInput(screen)))
      .toHaveAttribute('id', 'email-field');
    await takeSnapshot(`Input - passes through the id attribute`);
  });

  /* -----------------------------------------------------------------------
   * Keyboard interaction (2)
   * -------------------------------------------------------------------- */

  it('receives focus via Tab', async () => {
    const screen = await render(<Input placeholder="Tab target" />);
    const input = getInput(screen);
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    await vi.waitFor(() => expect(document.activeElement).toBe(input));
    await takeSnapshot(`Input - receives focus via Tab`);
  });

  it('updates its value as the user types via the keyboard', async () => {
    const screen = await render(<ControlledInputFixture initial="" />);
    const input = getInput(screen);
    await userEvent.click(locatorFor(input));
    await userEvent.keyboard('Storybook');
    await expect.element(locatorFor(input)).toHaveValue('Storybook');
    await takeSnapshot(`Input - updates its value as the user types via the keyboard`);
  });

  /* -----------------------------------------------------------------------
   * RTL / unicode (2)
   * -------------------------------------------------------------------- */

  it('preserves RTL unicode default value exactly', async () => {
    const screen = await render(<Input defaultValue="مرحبا بالعالم" />);
    const input = getInput(screen);
    expect(input.value).toBe('مرحبا بالعالم');
    await takeSnapshot(`Input - preserves RTL unicode default value exactly`);
  });

  it('preserves emoji default value exactly', async () => {
    const screen = await render(<Input defaultValue="🔥 Trending 🚀" />);
    const input = getInput(screen);
    expect(input.value).toBe('🔥 Trending 🚀');
    await takeSnapshot(`Input - preserves emoji default value exactly`);
  });

  /* -----------------------------------------------------------------------
   * Multi-instance independence (1)
   * -------------------------------------------------------------------- */

  it('does not leak value or styling state between two input instances', async () => {
    const screen = await render(
      <div>
        <Input defaultValue="first" />
        <Input inverted defaultValue="second" />
      </div>
    );
    const inputs = screen.container.querySelectorAll('input');
    const first = inputs[0] as HTMLInputElement;
    const second = inputs[1] as HTMLInputElement;

    expect(first.value).toBe('first');
    expect(second.value).toBe('second');
    await expect
      .element(locatorFor(first))
      .toHaveStyle({ backgroundColor: color.white });
    await expect
      .element(locatorFor(second))
      .toHaveStyle({ backgroundColor: color.slate800 });
    await takeSnapshot(`Input - does not leak value or styling state between two input instances`);
  });

  /* -----------------------------------------------------------------------
   * Default prop values when omitted (1)
   * -------------------------------------------------------------------- */

  it('defaults inverted to false, placeholder to empty and type to text together', async () => {
    const screen = await render(<Input />);
    const input = getInput(screen);
    await expect.element(locatorFor(input)).toHaveAttribute('type', 'text');
    await expect.element(locatorFor(input)).toHaveAttribute('placeholder', '');
    await expect
      .element(locatorFor(input))
      .toHaveStyle({ backgroundColor: color.white, color: color.slate800 });
    await takeSnapshot(`Input - defaults inverted to false, placeholder to empty and type to text together`);
  });

  /* -----------------------------------------------------------------------
   * Consumer-supplied onFocus/onBlur override (1)
   * -------------------------------------------------------------------- */

  it('lets a consumer-supplied onFocus handler fire alongside focus', async () => {
    const onFocus = vi.fn();
    const screen = await render(<Input onFocus={onFocus} />);
    const input = getInput(screen);
    await userEvent.click(locatorFor(input));
    await vi.waitFor(() => expect(onFocus).toHaveBeenCalledTimes(1));
    await takeSnapshot(`Input - lets a consumer-supplied onFocus handler fire alongside focus`);
  });

  /* -----------------------------------------------------------------------
   * Long value overflow (1)
   * -------------------------------------------------------------------- */

  it('keeps a long value fully intact even inside a narrow container', async () => {
    const longValue =
      'This is an intentionally long value used to verify overflow handling in a narrow input';
    const screen = await render(
      <div style={{ width: '150px' }}>
        <Input defaultValue={longValue} />
      </div>
    );
    const input = getInput(screen);
    expect(input.value).toBe(longValue);
    await takeSnapshot(`Input - keeps a long value fully intact even inside a narrow container`);
  });

  /* -----------------------------------------------------------------------
   * Kitchen-sink combos (3)
   * -------------------------------------------------------------------- */

  it('renders a normal kitchen-sink email input with multiple attributes at once', async () => {
    const screen = await render(
      <Input
        type="email"
        placeholder="you@example.com"
        required
        maxLength={60}
        autoComplete="email"
        name="kitchen-sink-email"
      />
    );
    const input = getInput(screen);
    await expect.element(locatorFor(input)).toHaveAttribute('type', 'email');
    await expect
      .element(locatorFor(input))
      .toHaveAttribute('placeholder', 'you@example.com');
    await expect.element(locatorFor(input)).toHaveAttribute('required');
    await expect
      .element(locatorFor(input))
      .toHaveAttribute('maxlength', '60');
    await expect
      .element(locatorFor(input))
      .toHaveAttribute('autocomplete', 'email');
    await expect
      .element(locatorFor(input))
      .toHaveAttribute('name', 'kitchen-sink-email');
    await takeSnapshot(`Input - renders a normal kitchen-sink email input with multiple attributes at once`);
  });

  it('renders an inverted kitchen-sink password input with multiple attributes and styling', async () => {
    const screen = await render(
      <Input
        type="password"
        placeholder="••••••••"
        inverted
        required
        maxLength={128}
        autoComplete="new-password"
        name="kitchen-sink-password"
      />
    );
    const input = getInput(screen);
    await expect.element(locatorFor(input)).toHaveAttribute('type', 'password');
    await expect.element(locatorFor(input)).toHaveAttribute('required');
    await expect
      .element(locatorFor(input))
      .toHaveAttribute('autocomplete', 'new-password');
    await expect
      .element(locatorFor(input))
      .toHaveStyle({ backgroundColor: color.slate800, color: color.white });
    await takeSnapshot(`Input - renders an inverted kitchen-sink password input with multiple attributes and styling`);
  });

  it('renders a disabled inverted kitchen-sink input with placeholder and default value', async () => {
    const screen = await render(
      <Input
        inverted
        disabled
        placeholder="Disabled inverted"
        defaultValue="locked value"
        name="kitchen-sink-disabled"
      />
    );
    const input = getInput(screen);
    await expect.element(locatorFor(input)).toBeDisabled();
    await expect
      .element(locatorFor(input))
      .toHaveAttribute('placeholder', 'Disabled inverted');
    await expect
      .element(locatorFor(input))
      .toHaveStyle({ backgroundColor: color.slate800 });
    expect(input.value).toBe('locked value');
    await takeSnapshot(`Input - renders a disabled inverted kitchen-sink input with placeholder and default value`);
  });

  /* -----------------------------------------------------------------------
   * Number type with default value (1)
   * -------------------------------------------------------------------- */

  it('renders a number input with a numeric default value', async () => {
    const screen = await render(<Input type="number" defaultValue={42} />);
    const input = getInput(screen);
    await expect.element(locatorFor(input)).toHaveAttribute('type', 'number');
    expect(input.value).toBe('42');
    await takeSnapshot(`Input - renders a number input with a numeric default value`);
  });

  /* -----------------------------------------------------------------------
   * Disabled + required attribute coexistence (1)
   * -------------------------------------------------------------------- */

  it('renders both disabled and required attributes together without conflict', async () => {
    const screen = await render(<Input disabled required />);
    const input = getInput(screen);
    await expect.element(locatorFor(input)).toBeDisabled();
    await expect.element(locatorFor(input)).toHaveAttribute('required');
    await takeSnapshot(`Input - renders both disabled and required attributes together without conflict`);
  });

  /* -----------------------------------------------------------------------
   * Focus on a controlled inverted input (1)
   * -------------------------------------------------------------------- */

  it('keeps controlled typing working while showing the inverted focus ring', async () => {
    const Fixture = () => {
      const [value, setValue] = useState('');
      return (
        <Input
          inverted
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      );
    };
    const screen = await render(<Fixture />);
    const input = getInput(screen);
    await userEvent.type(locatorFor(input), 'dark');
    await expect.element(locatorFor(input)).toHaveValue('dark');
    await expect
      .element(locatorFor(input))
      .toHaveStyle({ borderColor: color.blue400 });
    await takeSnapshot(`Input - keeps controlled typing working while showing the inverted focus ring`);
  });

  /* -----------------------------------------------------------------------
   * aria-label passthrough (1)
   * -------------------------------------------------------------------- */

  it('passes through an aria-label attribute for accessible naming', async () => {
    const screen = await render(<Input aria-label="Site search" />);
    await expect
      .element(locatorFor(getInput(screen)))
      .toHaveAttribute('aria-label', 'Site search');
    await takeSnapshot(`Input - passes through an aria-label attribute for accessible naming`);
  });
});
