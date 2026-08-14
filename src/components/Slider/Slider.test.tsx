import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent, page } from 'vitest/browser';
import { useState } from 'react';
import Slider from './Slider';
import { color } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

/**
 * Small stateful fixture mirroring the "controlled slider" usage pattern from
 * the stories, used to exercise real external state updates driven by
 * onValueChange (as opposed to just spy call counts).
 */
const ControlledSliderFixture = ({
  initialValue = [50],
  min = 0,
  max = 100,
  step = 1,
  orientation = 'horizontal' as 'horizontal' | 'vertical',
  disabled = false,
  onValueChange,
}: {
  initialValue?: number[];
  min?: number;
  max?: number;
  step?: number;
  orientation?: 'horizontal' | 'vertical';
  disabled?: boolean;
  onValueChange?: (details: { value: number[] }) => void;
}) => {
  const [value, setValue] = useState(initialValue);

  return (
    <>
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        orientation={orientation}
        disabled={disabled}
        onValueChange={(details) => {
          setValue(details.value);
          onValueChange?.(details);
        }}
      >
        Controlled fixture
      </Slider>
      <button onClick={() => setValue([min])}>Reset from outside</button>
    </>
  );
};

/** Wraps a raw HTMLElement into a Locator so jest-dom matchers can be used. */
const locatorFor = (element: HTMLElement) => page.elementLocator(element);

/** The root is the outermost element rendered by the component. */
const getRoot = (container: HTMLElement) =>
  container.querySelector('[data-part="root"]') as HTMLElement;

/** The filled portion of the track. */
const getRange = (container: HTMLElement) =>
  container.querySelector('[data-part="range"]') as HTMLElement;

/** The value-text element showing the current numeric value. */
const getValueText = (container: HTMLElement) =>
  container.querySelector('[data-part="value-text"]') as HTMLElement;

describe('Slider', () => {
  /* -----------------------------------------------------------------------
   * Default rendering (2)
   * -------------------------------------------------------------------- */

  it('renders a slider thumb with role="slider"', async () => {
    const screen = await render(<Slider value={[50]}>Volume</Slider>);
    await expect.element(screen.getByRole('slider')).toBeInTheDocument();
    await takeSnapshot(`Slider - renders a slider thumb with role="slider"`);
  });

  it('defaults to min (0) when no value or min/max is provided', async () => {
    const screen = await render(<Slider>Uncontrolled</Slider>);
    const slider = screen.getByRole('slider');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '0');
    await takeSnapshot(`Slider - defaults to min (0) when no value or min/max is provided`);
  });

  /* -----------------------------------------------------------------------
   * ARIA attributes (4)
   * -------------------------------------------------------------------- */

  it('exposes aria-valuenow matching the current value', async () => {
    const screen = await render(<Slider value={[42]}>Level</Slider>);
    const slider = screen.getByRole('slider');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '42');
    await takeSnapshot(`Slider - exposes aria-valuenow matching the current value`);
  });

  it('exposes aria-valuemin matching the min prop', async () => {
    const screen = await render(
      <Slider value={[20]} min={10} max={90}>
        Level
      </Slider>
    );
    const slider = screen.getByRole('slider');
    await expect.element(slider).toHaveAttribute('aria-valuemin', '10');
    await takeSnapshot(`Slider - exposes aria-valuemin matching the min prop`);
  });

  it('exposes aria-valuemax matching the max prop', async () => {
    const screen = await render(
      <Slider value={[20]} min={10} max={90}>
        Level
      </Slider>
    );
    const slider = screen.getByRole('slider');
    await expect.element(slider).toHaveAttribute('aria-valuemax', '90');
    await takeSnapshot(`Slider - exposes aria-valuemax matching the max prop`);
  });

  it('associates the thumb with its label via aria-labelledby', async () => {
    const screen = await render(<Slider value={[50]}>Volume</Slider>);
    const slider = screen.getByRole('slider');
    await expect.element(slider).toHaveAttribute('aria-labelledby');
    await takeSnapshot(`Slider - associates the thumb with its label via aria-labelledby`);
  });

  /* -----------------------------------------------------------------------
   * Keyboard interaction: horizontal arrow keys (4)
   * -------------------------------------------------------------------- */

  it('increments the value by one step when ArrowRight is pressed', async () => {
    const screen = await render(
      <Slider min={0} max={100} step={1}>
        Level
      </Slider>
    );
    const slider = screen.getByRole('slider');
    slider.element().focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '1');
    await takeSnapshot(`Slider - increments the value by one step when ArrowRight is pressed`);
  });

  it('decrements the value by one step when ArrowLeft is pressed', async () => {
    const screen = await render(
      <Slider min={0} max={100} step={1}>
        Level
      </Slider>
    );
    const slider = screen.getByRole('slider');
    slider.element().focus();
    await userEvent.keyboard('{ArrowRight}{ArrowRight}');
    await userEvent.keyboard('{ArrowLeft}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '1');
    await takeSnapshot(`Slider - decrements the value by one step when ArrowLeft is pressed`);
  });

  it('increments by the configured step size, not by 1, when step is set', async () => {
    const screen = await render(
      <Slider min={0} max={100} step={10}>
        Level
      </Slider>
    );
    const slider = screen.getByRole('slider');
    slider.element().focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '10');
    await takeSnapshot(`Slider - increments by the configured step size, not by 1, when step is set`);
  });

  it('does not change the value when ArrowUp/ArrowDown are pressed on a horizontal slider', async () => {
    const screen = await render(
      <Slider min={0} max={100} step={1}>
        Level
      </Slider>
    );
    const slider = screen.getByRole('slider');
    slider.element().focus();
    await userEvent.keyboard('{ArrowDown}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '0');
    await userEvent.keyboard('{ArrowUp}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '0');
    await takeSnapshot(`Slider - does not change the value when ArrowUp/ArrowDown are pressed on a horizontal slider`);
  });

  /* -----------------------------------------------------------------------
   * Keyboard interaction: vertical arrow keys (3)
   * -------------------------------------------------------------------- */

  it('increments the value when ArrowUp is pressed on a vertical slider', async () => {
    const screen = await render(
      <Slider min={0} max={100} step={1} orientation="vertical">
        Level
      </Slider>
    );
    const slider = screen.getByRole('slider');
    slider.element().focus();
    await userEvent.keyboard('{ArrowUp}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '1');
    await takeSnapshot(`Slider - increments the value when ArrowUp is pressed on a vertical slider`);
  });

  it('decrements the value when ArrowDown is pressed on a vertical slider', async () => {
    const screen = await render(
      <Slider min={0} max={100} step={1} orientation="vertical">
        Level
      </Slider>
    );
    const slider = screen.getByRole('slider');
    slider.element().focus();
    await userEvent.keyboard('{ArrowUp}{ArrowUp}');
    await userEvent.keyboard('{ArrowDown}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '1');
    await takeSnapshot(`Slider - decrements the value when ArrowDown is pressed on a vertical slider`);
  });

  it('does not change the value when ArrowLeft/ArrowRight are pressed on a vertical slider', async () => {
    const screen = await render(
      <Slider min={0} max={100} step={1} orientation="vertical">
        Level
      </Slider>
    );
    const slider = screen.getByRole('slider');
    slider.element().focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '0');
    await userEvent.keyboard('{ArrowLeft}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '0');
    await takeSnapshot(`Slider - does not change the value when ArrowLeft/ArrowRight are pressed on a vertical slider`);
  });

  /* -----------------------------------------------------------------------
   * Keyboard interaction: Home/End (3)
   * -------------------------------------------------------------------- */

  it('jumps to the minimum value when Home is pressed', async () => {
    const screen = await render(
      <Slider min={10} max={90} step={1}>
        Level
      </Slider>
    );
    const slider = screen.getByRole('slider');
    slider.element().focus();
    await userEvent.keyboard('{ArrowRight}{ArrowRight}');
    await userEvent.keyboard('{Home}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '10');
    await takeSnapshot(`Slider - jumps to the minimum value when Home is pressed`);
  });

  it('jumps to the maximum value when End is pressed', async () => {
    const screen = await render(
      <Slider min={10} max={90} step={1}>
        Level
      </Slider>
    );
    const slider = screen.getByRole('slider');
    slider.element().focus();
    await userEvent.keyboard('{End}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '90');
    await takeSnapshot(`Slider - jumps to the maximum value when End is pressed`);
  });

  it('jumps to the maximum then back to the minimum across End then Home', async () => {
    const screen = await render(
      <Slider min={0} max={50} step={1}>
        Level
      </Slider>
    );
    const slider = screen.getByRole('slider');
    slider.element().focus();
    await userEvent.keyboard('{End}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '50');
    await userEvent.keyboard('{Home}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '0');
    await takeSnapshot(`Slider - jumps to the maximum then back to the minimum across End then Home`);
  });

  /* -----------------------------------------------------------------------
   * Min/max/step clamping (4)
   * -------------------------------------------------------------------- */

  it('clamps at the maximum and does not exceed it when incrementing past the boundary', async () => {
    const screen = await render(
      <Slider min={0} max={5} step={1}>
        Level
      </Slider>
    );
    const slider = screen.getByRole('slider');
    slider.element().focus();
    await userEvent.keyboard('{End}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '5');
    await userEvent.keyboard('{ArrowRight}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '5');
    await takeSnapshot(`Slider - clamps at the maximum and does not exceed it when incrementing past the boundary`);
  });

  it('clamps at the minimum and does not go below it when decrementing past the boundary', async () => {
    const screen = await render(
      <Slider min={0} max={5} step={1}>
        Level
      </Slider>
    );
    const slider = screen.getByRole('slider');
    slider.element().focus();
    await userEvent.keyboard('{ArrowLeft}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '0');
    await takeSnapshot(`Slider - clamps at the minimum and does not go below it when decrementing past the boundary`);
  });

  it('supports decimal step values', async () => {
    const screen = await render(
      <Slider value={[2.5]} min={0} max={5} step={0.5}>
        Multiplier
      </Slider>
    );
    const slider = screen.getByRole('slider');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '2.5');
    await takeSnapshot(`Slider - supports decimal step values`);
  });

  it('supports a negative min boundary', async () => {
    const screen = await render(
      <Slider value={[-25]} min={-50} max={50}>
        Temperature
      </Slider>
    );
    const slider = screen.getByRole('slider');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '-25');
    await takeSnapshot(`Slider - supports a negative min boundary`);
  });

  /* -----------------------------------------------------------------------
   * onValueChange callback (4)
   * -------------------------------------------------------------------- */

  it('calls onValueChange when the value is changed via the keyboard', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <Slider min={0} max={100} step={1} onValueChange={onValueChange}>
        Level
      </Slider>
    );
    const slider = screen.getByRole('slider');
    slider.element().focus();
    await userEvent.keyboard('{ArrowRight}');
    await vi.waitFor(() => expect(onValueChange).toHaveBeenCalledTimes(1));
    await takeSnapshot(`Slider - calls onValueChange when the value is changed via the keyboard`);
  });

  it('calls onValueChange with the incremented value in the details object', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <Slider min={0} max={100} step={1} onValueChange={onValueChange}>
        Level
      </Slider>
    );
    const slider = screen.getByRole('slider');
    slider.element().focus();
    await userEvent.keyboard('{ArrowRight}');
    await vi.waitFor(() => expect(onValueChange).toHaveBeenCalledWith(
      expect.objectContaining({ value: [1] })
    ));
    await takeSnapshot(`Slider - calls onValueChange with the incremented value in the details object`);
  });

  it('still calls onValueChange even when the parent keeps the value prop fixed (locked/controlled)', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <Slider value={[50]} onValueChange={onValueChange}>
        Locked value
      </Slider>
    );
    const slider = screen.getByRole('slider');
    slider.element().focus();
    await userEvent.keyboard('{ArrowRight}');
    await vi.waitFor(() => expect(onValueChange).toHaveBeenCalledTimes(1));
    await expect.element(slider).toHaveAttribute('aria-valuenow', '50');
    await takeSnapshot(`Slider - still calls onValueChange even when the parent keeps the value prop fixed (locked/controlled)`);
  });

  it('does not throw when the keyboard is used without an onValueChange handler', async () => {
    const screen = await render(
      <Slider min={0} max={100} step={1}>
        No handler
      </Slider>
    );
    const slider = screen.getByRole('slider');
    slider.element().focus();
    await expect(userEvent.keyboard('{ArrowRight}')).resolves.not.toThrow();
    await takeSnapshot(`Slider - does not throw when the keyboard is used without an onValueChange handler`);
  });

  /* -----------------------------------------------------------------------
   * Controlled value updates (4)
   * -------------------------------------------------------------------- */

  it('reflects a real value update pushed down through the controlled value prop', async () => {
    const screen = await render(<ControlledSliderFixture initialValue={[0]} />);
    const slider = screen.getByRole('slider');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '0');
    slider.element().focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '1');
    await takeSnapshot(`Slider - reflects a real value update pushed down through the controlled value prop`);
  });

  it('reflects an external state update triggered by a sibling control', async () => {
    const screen = await render(<ControlledSliderFixture initialValue={[75]} min={0} />);
    const slider = screen.getByRole('slider');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '75');
    await userEvent.click(screen.getByRole('button', { name: 'Reset from outside' }));
    await expect.element(slider).toHaveAttribute('aria-valuenow', '0');
    await takeSnapshot(`Slider - reflects an external state update triggered by a sibling control`);
  });

  it('updates the value-text content as the controlled value changes', async () => {
    const screen = await render(<ControlledSliderFixture initialValue={[3]} step={1} />);
    const slider = screen.getByRole('slider');
    slider.element().focus();
    await userEvent.keyboard('{ArrowRight}');
    const valueText = getValueText(screen.container);
    await vi.waitFor(() => expect(valueText.textContent).toBe('4'));
    await takeSnapshot(`Slider - updates the value-text content as the controlled value changes`);
  });

  it('invokes the provided onValueChange alongside internal state updates in a controlled fixture', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <ControlledSliderFixture initialValue={[10]} onValueChange={onValueChange} />
    );
    const slider = screen.getByRole('slider');
    slider.element().focus();
    await userEvent.keyboard('{ArrowRight}');
    await vi.waitFor(() => expect(onValueChange).toHaveBeenCalledWith(
      expect.objectContaining({ value: [11] })
    ));
    await takeSnapshot(`Slider - invokes the provided onValueChange alongside internal state updates in a controlled fixture`);
  });

  /* -----------------------------------------------------------------------
   * Disabled (5)
   * -------------------------------------------------------------------- */

  it('removes the tabindex attribute from the thumb when disabled', async () => {
    const screen = await render(
      <Slider value={[50]} disabled>
        Disabled
      </Slider>
    );
    const slider = screen.getByRole('slider');
    await expect.element(slider).not.toHaveAttribute('tabindex');
    await takeSnapshot(`Slider - removes the tabindex attribute from the thumb when disabled`);
  });

  it('marks the thumb as aria-disabled when disabled', async () => {
    const screen = await render(
      <Slider value={[50]} disabled>
        Disabled
      </Slider>
    );
    const slider = screen.getByRole('slider');
    await expect.element(slider).toHaveAttribute('aria-disabled', 'true');
    await takeSnapshot(`Slider - marks the thumb as aria-disabled when disabled`);
  });

  it('cannot be focused via Tab when disabled', async () => {
    const screen = await render(
      <div>
        <Slider value={[50]} disabled>
          Disabled
        </Slider>
        <button>After</button>
      </div>
    );
    const afterButton = screen.getByRole('button', { name: 'After' });
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    await vi.waitFor(() => expect(document.activeElement).toBe(afterButton.element()));
    await takeSnapshot(`Slider - cannot be focused via Tab when disabled`);
  });

  it('does not change the value when arrow keys are pressed while disabled', async () => {
    const screen = await render(
      <Slider value={[50]} disabled min={0} max={100} step={1}>
        Disabled
      </Slider>
    );
    const slider = screen.getByRole('slider');
    slider.element().focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '50');
    await takeSnapshot(`Slider - does not change the value when arrow keys are pressed while disabled`);
  });

  it('applies reduced opacity on the root when disabled', async () => {
    const screen = await render(
      <Slider value={[50]} disabled>
        Disabled
      </Slider>
    );
    const root = getRoot(screen.container);
    await expect.element(locatorFor(root)).toHaveStyle({ opacity: '0.5' });
    await takeSnapshot(`Slider - applies reduced opacity on the root when disabled`);
  });

  /* -----------------------------------------------------------------------
   * Orientation: horizontal vs vertical layout (4)
   * -------------------------------------------------------------------- */

  it('defaults to horizontal orientation on the root', async () => {
    const screen = await render(<Slider value={[50]}>Level</Slider>);
    const root = getRoot(screen.container);
    await expect
      .element(locatorFor(root))
      .toHaveAttribute('data-orientation', 'horizontal');
    await takeSnapshot(`Slider - defaults to horizontal orientation on the root`);
  });

  it('sets data-orientation to vertical on the root when orientation is vertical', async () => {
    const screen = await render(
      <Slider value={[50]} orientation="vertical">
        Level
      </Slider>
    );
    const root = getRoot(screen.container);
    await expect
      .element(locatorFor(root))
      .toHaveAttribute('data-orientation', 'vertical');
    await takeSnapshot(`Slider - sets data-orientation to vertical on the root when orientation is vertical`);
  });

  it('renders a fixed-width, auto-height layout for horizontal sliders', async () => {
    const screen = await render(<Slider value={[50]}>Level</Slider>);
    const root = getRoot(screen.container);
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ width: '300px', height: 'auto' });
    await takeSnapshot(`Slider - renders a fixed-width, auto-height layout for horizontal sliders`);
  });

  it('renders an auto-width, fixed-height layout for vertical sliders', async () => {
    const screen = await render(
      <Slider value={[50]} orientation="vertical">
        Level
      </Slider>
    );
    const root = getRoot(screen.container);
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ width: 'auto', height: '300px' });
    await takeSnapshot(`Slider - renders an auto-width, fixed-height layout for vertical sliders`);
  });

  /* -----------------------------------------------------------------------
   * Track/range styling (1)
   * -------------------------------------------------------------------- */

  it('renders the filled range in a muted color when disabled', async () => {
    const screen = await render(
      <Slider value={[50]} disabled>
        Level
      </Slider>
    );
    const range = getRange(screen.container);
    await expect
      .element(locatorFor(range))
      .toHaveStyle({ backgroundColor: color.slate400 });
    await takeSnapshot(`Slider - renders the filled range in a muted color when disabled`);
  });

  /* -----------------------------------------------------------------------
   * Label rendering (2)
   * -------------------------------------------------------------------- */

  it('renders the provided label content as children', async () => {
    const screen = await render(<Slider value={[50]}>Master Volume</Slider>);
    await expect.element(screen.getByText('Master Volume')).toBeInTheDocument();
    await takeSnapshot(`Slider - renders the provided label content as children`);
  });

  it('preserves emoji and unicode label content exactly', async () => {
    const screen = await render(<Slider value={[50]}>🔊 Volume 🎚️</Slider>);
    await expect
      .element(screen.getByText('🔊 Volume 🎚️'))
      .toHaveTextContent('🔊 Volume 🎚️');
    await takeSnapshot(`Slider - preserves emoji and unicode label content exactly`);
  });

  /* -----------------------------------------------------------------------
   * ValueText rendering (1)
   * -------------------------------------------------------------------- */

  it('updates the value-text content to reflect a new value prop', async () => {
    const screen = await render(<ControlledSliderFixture initialValue={[5]} />);
    const valueText = getValueText(screen.container);
    expect(valueText.textContent).toBe('5');
    const slider = screen.getByRole('slider');
    slider.element().focus();
    await userEvent.keyboard('{End}');
    await vi.waitFor(() => expect(getValueText(screen.container).textContent).toBe('100'));
    await takeSnapshot(`Slider - updates the value-text content to reflect a new value prop`);
  });

  /* -----------------------------------------------------------------------
   * Focus behavior (2)
   * -------------------------------------------------------------------- */

  it('moves focus to the thumb via Tab', async () => {
    const screen = await render(<Slider value={[50]}>Level</Slider>);
    const slider = screen.getByRole('slider');
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    await vi.waitFor(() => expect(document.activeElement).toBe(slider.element()));
    await takeSnapshot(`Slider - moves focus to the thumb via Tab`);
  });

  it('applies a focus box-shadow style to the thumb when focused', async () => {
    const screen = await render(<Slider value={[50]}>Level</Slider>);
    const slider = screen.getByRole('slider');
    slider.element().focus();
    await expect
      .element(locatorFor(slider.element() as HTMLElement))
      .toHaveStyle({ boxShadow: `0 0 0 3px ${color.blueTr10}, 0 1px 3px rgba(0, 0, 0, 0.1)` });
    await takeSnapshot(`Slider - applies a focus box-shadow style to the thumb when focused`);
  });

  /* -----------------------------------------------------------------------
   * Multi-instance independence (1)
   * -------------------------------------------------------------------- */

  it('does not invoke the other instance onValueChange when only one slider is adjusted', async () => {
    const onFirstChange = vi.fn();
    const onSecondChange = vi.fn();
    const screen = await render(
      <div>
        <Slider min={0} max={100} onValueChange={onFirstChange}>
          First
        </Slider>
        <Slider min={0} max={100} onValueChange={onSecondChange}>
          Second
        </Slider>
      </div>
    );
    const firstSlider = screen.getByRole('slider', { name: 'First' });
    firstSlider.element().focus();
    await userEvent.keyboard('{ArrowRight}');
    await vi.waitFor(() => expect(onFirstChange).toHaveBeenCalledTimes(1));
    await vi.waitFor(() => expect(onSecondChange).not.toHaveBeenCalled());
    await takeSnapshot(`Slider - does not invoke the other instance onValueChange when only one slider is adjusted`);
  });

  /* -----------------------------------------------------------------------
   * Default prop values (2)
   * -------------------------------------------------------------------- */

  it('defaults min to 0, max to 100, and step to 1 when uncontrolled', async () => {
    const screen = await render(<Slider>Defaults</Slider>);
    const slider = screen.getByRole('slider');
    await expect.element(slider).toHaveAttribute('aria-valuemin', '0');
    await expect.element(slider).toHaveAttribute('aria-valuemax', '100');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '0');
    await takeSnapshot(`Slider - defaults min to 0, max to 100, and step to 1 when uncontrolled`);
  });

  it('defaults to enabled (not disabled) and horizontal orientation', async () => {
    const screen = await render(<Slider value={[50]}>Defaults</Slider>);
    const slider = screen.getByRole('slider');
    await expect.element(slider).not.toHaveAttribute('aria-disabled', 'true');
    await expect.element(slider).toHaveAttribute('aria-orientation', 'horizontal');
    await takeSnapshot(`Slider - defaults to enabled (not disabled) and horizontal orientation`);
  });

  /* -----------------------------------------------------------------------
   * Kitchen-sink combos (4)
   * -------------------------------------------------------------------- */

  it('renders correctly with a custom range, step, orientation, and label combined', async () => {
    const screen = await render(
      <Slider value={[15]} min={-10} max={30} step={5} orientation="vertical">
        Kitchen sink
      </Slider>
    );
    const slider = screen.getByRole('slider');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '15');
    await expect.element(slider).toHaveAttribute('aria-valuemin', '-10');
    await expect.element(slider).toHaveAttribute('aria-valuemax', '30');
    await expect.element(slider).toHaveAttribute('aria-orientation', 'vertical');
    await takeSnapshot(`Slider - renders correctly with a custom range, step, orientation, and label combined`);
  });

  it('renders a disabled, vertical slider with a custom range without allowing keyboard changes', async () => {
    const screen = await render(
      <Slider value={[15]} disabled orientation="vertical" min={-10} max={30} step={5}>
        Kitchen sink disabled
      </Slider>
    );
    const slider = screen.getByRole('slider');
    slider.element().focus();
    await userEvent.keyboard('{ArrowUp}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '15');
    await takeSnapshot(`Slider - renders a disabled, vertical slider with a custom range without allowing keyboard changes`);
  });

  it('supports a controlled kitchen-sink slider with a custom step and dynamic label', async () => {
    const KitchenSinkControlled = () => {
      const [value, setValue] = useState([40]);
      return (
        <Slider
          value={value}
          onValueChange={(details) => setValue(details.value)}
          min={0}
          max={200}
          step={20}
        >
          Value is {value[0]}
        </Slider>
      );
    };
    const screen = await render(<KitchenSinkControlled />);
    await expect.element(screen.getByText('Value is 40')).toBeInTheDocument();
    const slider = screen.getByRole('slider');
    slider.element().focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect.element(screen.getByText('Value is 60')).toBeInTheDocument();
    await takeSnapshot(`Slider - supports a controlled kitchen-sink slider with a custom step and dynamic label`);
  });

  it('renders all props combined (custom range/step, explicit horizontal orientation, label) consistently', async () => {
    const screen = await render(
      <Slider
        value={[55]}
        min={10}
        max={90}
        step={5}
        disabled={false}
        orientation="horizontal"
      >
        Kitchen sink: all props combined
      </Slider>
    );
    const slider = screen.getByRole('slider');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '55');
    await expect.element(slider).toHaveAttribute('aria-valuemin', '10');
    await expect.element(slider).toHaveAttribute('aria-valuemax', '90');
    await expect
      .element(screen.getByText('Kitchen sink: all props combined'))
      .toBeInTheDocument();
    await takeSnapshot(`Slider - renders all props combined (custom range/step, explicit horizontal orientation, label) consistently`);
  });
});
