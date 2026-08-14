import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent, page } from 'vitest/browser';
import { useState } from 'react';
import RatingGroup from './RatingGroup';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

/**
 * Small stateful fixture mirroring the "controlled rating" usage pattern from
 * the stories, used to exercise real external state updates (as opposed to
 * just spy call counts).
 */
const ControlledRatingFixture = ({
  initialValue = 0,
}: {
  initialValue?: number;
}) => {
  const [value, setValue] = useState(initialValue);

  return (
    <>
      <RatingGroup value={value} onValueChange={(details) => setValue(details.value)}>
        Controlled fixture
      </RatingGroup>
      <button onClick={() => setValue(0)}>Clear</button>
      <button onClick={() => setValue(5)}>Set to 5</button>
    </>
  );
};

/** Wraps a raw HTMLElement into a Locator so jest-dom matchers can be used. */
const locatorFor = (element: HTMLElement) => page.elementLocator(element);

/** The `<div role="radiogroup">` rendered by ArkRatingGroup.Control. */
const getControl = (container: HTMLElement) =>
  container.querySelector('[role="radiogroup"]') as HTMLElement;

/** All `<span role="radio">` star items, in positional order. */
const getItems = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('[role="radio"]')) as HTMLElement[];

/** The single item at 1-based position `position`. */
const getItem = (container: HTMLElement, position: number) =>
  getItems(container)[position - 1];

/** The hidden `<input>` rendered by ArkRatingGroup.HiddenInput. */
const getHiddenInput = (container: HTMLElement) =>
  container.querySelector('input') as HTMLInputElement;

/** The <svg> star icon rendered inside a given item. */
const getIcon = (item: HTMLElement) => item.querySelector('svg') as SVGSVGElement;

/** Whether a given item's star icon is rendered in its "filled" state. */
const isFilled = (item: HTMLElement) => getIcon(item).getAttribute('fill') === 'currentColor';

describe('RatingGroup', () => {
  /* -----------------------------------------------------------------------
   * Rendering & structure (5)
   * -------------------------------------------------------------------- */

  it('renders a radiogroup control with the default 5 star items', async () => {
    const screen = await render(<RatingGroup defaultValue={0} />);
    const control = getControl(screen.container);
    expect(control).not.toBeNull();
    expect(getItems(screen.container)).toHaveLength(5);
    await takeSnapshot(`RatingGroup - renders a radiogroup control with the default 5 star items`);
  });

  it('renders the provided label text associated with the hidden input', async () => {
    const screen = await render(<RatingGroup defaultValue={0}>Rate this product</RatingGroup>);
    await expect.element(screen.getByText('Rate this product')).toBeInTheDocument();
    await takeSnapshot(`RatingGroup - renders the provided label text associated with the hidden input`);
  });

  it('does not render a label element when no children are provided', async () => {
    const screen = await render(<RatingGroup defaultValue={0} />);
    expect(screen.container.querySelector('label')).toBeNull();
    await takeSnapshot(`RatingGroup - does not render a label element when no children are provided`);
  });

  it('renders zero filled stars when defaultValue is 0', async () => {
    const screen = await render(<RatingGroup defaultValue={0} />);
    const items = getItems(screen.container);
    expect(items.every((item) => !isFilled(item))).toBe(true);
    await takeSnapshot(`RatingGroup - renders zero filled stars when defaultValue is 0`);
  });

  it('renders each item with role="radio" and a positional aria-label', async () => {
    const screen = await render(<RatingGroup defaultValue={0} />);
    const items = getItems(screen.container);
    items.forEach((item, index) => {
      expect(item.getAttribute('role')).toBe('radio');
      expect(item.getAttribute('aria-label')).toBe(`${index + 1} stars`);
    });
    await takeSnapshot(`RatingGroup - renders each item with role="radio" and a positional aria-label`);
  });

  /* -----------------------------------------------------------------------
   * Count derivation from min/max (5)
   * -------------------------------------------------------------------- */

  it('derives a count of 5 items from the default min=1/max=5', async () => {
    const screen = await render(<RatingGroup defaultValue={0} />);
    expect(getItems(screen.container)).toHaveLength(5);
    await takeSnapshot(`RatingGroup - derives a count of 5 items from the default min=1/max=5`);
  });

  it('derives a count of 10 items when max=10', async () => {
    const screen = await render(<RatingGroup max={10} defaultValue={0} />);
    expect(getItems(screen.container)).toHaveLength(10);
    await takeSnapshot(`RatingGroup - derives a count of 10 items when max=10`);
  });

  it('derives a count of 5 items from min=3/max=7 (max-min+1)', async () => {
    const screen = await render(<RatingGroup min={3} max={7} defaultValue={0} />);
    expect(getItems(screen.container)).toHaveLength(5);
    await takeSnapshot(`RatingGroup - derives a count of 5 items from min=3/max=7 (max-min+1)`);
  });

  it('derives a single item when min and max are equal', async () => {
    const screen = await render(<RatingGroup min={4} max={4} defaultValue={0} />);
    expect(getItems(screen.container)).toHaveLength(1);
    await takeSnapshot(`RatingGroup - derives a single item when min and max are equal`);
  });

  it('derives item aria-labels positionally regardless of the min prop value', async () => {
    const screen = await render(<RatingGroup min={3} max={7} defaultValue={0} />);
    const items = getItems(screen.container);
    expect(items[0].getAttribute('aria-label')).toBe('1 stars');
    expect(items[4].getAttribute('aria-label')).toBe('5 stars');
    await takeSnapshot(`RatingGroup - derives item aria-labels positionally regardless of the min prop value`);
  });

  /* -----------------------------------------------------------------------
   * Uncontrolled defaultValue (3)
   * -------------------------------------------------------------------- */

  it('fills exactly the first N stars for a given defaultValue', async () => {
    const screen = await render(<RatingGroup defaultValue={3} />);
    const items = getItems(screen.container);
    expect(items.slice(0, 3).every(isFilled)).toBe(true);
    expect(items.slice(3).every((item) => !isFilled(item))).toBe(true);
    await takeSnapshot(`RatingGroup - fills exactly the first N stars for a given defaultValue`);
  });

  it('starts fully unfilled when defaultValue is 0', async () => {
    const screen = await render(<RatingGroup defaultValue={0} />);
    expect(getItems(screen.container).every((item) => !isFilled(item))).toBe(true);
    await takeSnapshot(`RatingGroup - starts fully unfilled when defaultValue is 0`);
  });

  it('sets the hidden input value to match defaultValue on mount', async () => {
    const screen = await render(<RatingGroup defaultValue={4} />);
    const hiddenInput = getHiddenInput(screen.container);
    await expect.element(locatorFor(hiddenInput)).toHaveValue('4');
    await takeSnapshot(`RatingGroup - sets the hidden input value to match defaultValue on mount`);
  });

  /* -----------------------------------------------------------------------
   * Controlled value (4)
   * -------------------------------------------------------------------- */

  it('keeps the rendered value pinned to the value prop even after a click, while still calling onValueChange', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <RatingGroup value={2} onValueChange={onValueChange}>
        Locked
      </RatingGroup>
    );
    await userEvent.click(locatorFor(getItem(screen.container, 4)));
    await vi.waitFor(() => expect(onValueChange).toHaveBeenCalledTimes(1));
    const hiddenInput = getHiddenInput(screen.container);
    await expect.element(locatorFor(hiddenInput)).toHaveValue('2');
    await takeSnapshot(`RatingGroup - keeps the rendered value pinned to the value prop even after a click, while still calling onValueChange`);
  });

  it('updates the rendered stars when the controlled value is changed externally', async () => {
    const screen = await render(<ControlledRatingFixture initialValue={0} />);
    const items = getItems(screen.container);
    expect(items.every((item) => !isFilled(item))).toBe(true);

    await userEvent.click(screen.getByRole('button', { name: 'Set to 5' }));

    await expect.element(locatorFor(getHiddenInput(screen.container))).toHaveValue('5');
    expect(getItems(screen.container).every(isFilled)).toBe(true);
    await takeSnapshot(`RatingGroup - updates the rendered stars when the controlled value is changed externally`);
  });

  it('calls onValueChange with the clicked star index', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <RatingGroup defaultValue={0} onValueChange={onValueChange}>
        Rate
      </RatingGroup>
    );
    await userEvent.click(locatorFor(getItem(screen.container, 3)));
    await vi.waitFor(() => expect(onValueChange).toHaveBeenCalledWith(expect.objectContaining({ value: 3 })));
    await takeSnapshot(`RatingGroup - calls onValueChange with the clicked star index`);
  });

  it('does not share value state between two independent controlled instances', async () => {
    const IndependentPair = () => {
      const [first, setFirst] = useState(1);
      const [second, setSecond] = useState(4);
      return (
        <div>
          <RatingGroup value={first} onValueChange={(d) => setFirst(d.value)}>
            First
          </RatingGroup>
          <RatingGroup value={second} onValueChange={(d) => setSecond(d.value)}>
            Second
          </RatingGroup>
        </div>
      );
    };
    const screen = await render(<IndependentPair />);
    const [firstControl, secondControl] = Array.from(
      screen.container.querySelectorAll('[role="radiogroup"]')
    ) as HTMLElement[];

    await userEvent.click(locatorFor(getItem(firstControl, 5)));

    const firstInput = firstControl.parentElement!.querySelector('input') as HTMLInputElement;
    const secondInput = secondControl.parentElement!.querySelector('input') as HTMLInputElement;
    await expect.element(locatorFor(firstInput)).toHaveValue('5');
    await expect.element(locatorFor(secondInput)).toHaveValue('4');
    await takeSnapshot(`RatingGroup - does not share value state between two independent controlled instances`);
  });

  /* -----------------------------------------------------------------------
   * Click-to-rate interaction (4)
   * -------------------------------------------------------------------- */

  it('clicking the Nth star sets the value to N', async () => {
    const screen = await render(<RatingGroup defaultValue={0} />);
    await userEvent.click(locatorFor(getItem(screen.container, 4)));
    await expect.element(locatorFor(getHiddenInput(screen.container))).toHaveValue('4');
    await takeSnapshot(`RatingGroup - clicking the Nth star sets the value to N`);
  });

  it('clicking the first star sets the value to 1', async () => {
    const screen = await render(<RatingGroup defaultValue={0} />);
    await userEvent.click(locatorFor(getItem(screen.container, 1)));
    await expect.element(locatorFor(getHiddenInput(screen.container))).toHaveValue('1');
    await takeSnapshot(`RatingGroup - clicking the first star sets the value to 1`);
  });

  it('clicking the last star sets the value to the max count', async () => {
    const screen = await render(<RatingGroup defaultValue={0} />);
    await userEvent.click(locatorFor(getItem(screen.container, 5)));
    await expect.element(locatorFor(getHiddenInput(screen.container))).toHaveValue('5');
    await takeSnapshot(`RatingGroup - clicking the last star sets the value to the max count`);
  });

  it('clicking the currently active star leaves the value unchanged', async () => {
    const screen = await render(<RatingGroup defaultValue={3} />);
    await userEvent.click(locatorFor(getItem(screen.container, 3)));
    await expect.element(locatorFor(getHiddenInput(screen.container))).toHaveValue('3');
    await takeSnapshot(`RatingGroup - clicking the currently active star leaves the value unchanged`);
  });

  /* -----------------------------------------------------------------------
   * Keyboard interaction (6)
   * -------------------------------------------------------------------- */

  it('moves focus to the checked star via Tab', async () => {
    const screen = await render(<RatingGroup defaultValue={2} />);
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    await vi.waitFor(() => expect(document.activeElement).toBe(getItem(screen.container, 2)));
    await takeSnapshot(`RatingGroup - moves focus to the checked star via Tab`);
  });

  it('ArrowRight increases the rating by one from a focused star', async () => {
    const screen = await render(<RatingGroup defaultValue={2} />);
    getItem(screen.container, 2).focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect.element(locatorFor(getHiddenInput(screen.container))).toHaveValue('3');
    await takeSnapshot(`RatingGroup - ArrowRight increases the rating by one from a focused star`);
  });

  it('ArrowLeft decreases the rating by one from a focused star', async () => {
    const screen = await render(<RatingGroup defaultValue={3} />);
    getItem(screen.container, 3).focus();
    await userEvent.keyboard('{ArrowLeft}');
    await expect.element(locatorFor(getHiddenInput(screen.container))).toHaveValue('2');
    await takeSnapshot(`RatingGroup - ArrowLeft decreases the rating by one from a focused star`);
  });

  it('ArrowDown increases the rating like ArrowRight', async () => {
    const screen = await render(<RatingGroup defaultValue={2} />);
    getItem(screen.container, 2).focus();
    await userEvent.keyboard('{ArrowDown}');
    await expect.element(locatorFor(getHiddenInput(screen.container))).toHaveValue('3');
    await takeSnapshot(`RatingGroup - ArrowDown increases the rating like ArrowRight`);
  });

  it('Home sets the rating to the minimum item', async () => {
    const screen = await render(<RatingGroup defaultValue={4} />);
    getItem(screen.container, 4).focus();
    await userEvent.keyboard('{Home}');
    await expect.element(locatorFor(getHiddenInput(screen.container))).toHaveValue('1');
    await takeSnapshot(`RatingGroup - Home sets the rating to the minimum item`);
  });

  it('End sets the rating to the maximum item', async () => {
    const screen = await render(<RatingGroup defaultValue={2} />);
    getItem(screen.container, 2).focus();
    await userEvent.keyboard('{End}');
    await expect.element(locatorFor(getHiddenInput(screen.container))).toHaveValue('5');
    await takeSnapshot(`RatingGroup - End sets the rating to the maximum item`);
  });

  /* -----------------------------------------------------------------------
   * Hover-preview highlighting (3)
   * -------------------------------------------------------------------- */

  it('hovering over the Nth star highlights the first N stars without committing the value', async () => {
    const screen = await render(<RatingGroup defaultValue={0} />);
    const items = getItems(screen.container);
    // Warm up the group's "hover" state first: the very first pointer move
    // into the control only transitions idle -> hover, it does not yet set
    // a hovered value. A subsequent move while already hovering does.
    await userEvent.hover(locatorFor(items[0]));
    await userEvent.hover(locatorFor(items[2]));
    await vi.waitFor(() => expect(items.slice(0, 3).every(isFilled)).toBe(true));
    await vi.waitFor(() => expect(items.slice(3).every((item) => !isFilled(item))).toBe(true));
    await expect.element(locatorFor(getHiddenInput(screen.container))).toHaveValue('0');
    await takeSnapshot(`RatingGroup - hovering over the Nth star highlights the first N stars without committing the value`);
  });

  it('unhovering restores highlighting to reflect the committed value', async () => {
    const screen = await render(<RatingGroup defaultValue={2} />);
    const items = getItems(screen.container);
    await userEvent.hover(locatorFor(items[0]));
    await userEvent.hover(locatorFor(items[4]));
    await vi.waitFor(() => expect(items.every(isFilled)).toBe(true));

    await userEvent.unhover(locatorFor(items[4]));
    await vi.waitFor(() => expect(items.slice(0, 2).every(isFilled)).toBe(true));
    await vi.waitFor(() => expect(items.slice(2).every((item) => !isFilled(item))).toBe(true));
    await takeSnapshot(`RatingGroup - unhovering restores highlighting to reflect the committed value`);
  });

  it('clicking after hovering commits the hovered value', async () => {
    const screen = await render(<RatingGroup defaultValue={0} />);
    const items = getItems(screen.container);
    await userEvent.hover(locatorFor(items[0]));
    await userEvent.hover(locatorFor(items[3]));
    await userEvent.click(locatorFor(items[3]));
    await expect.element(locatorFor(getHiddenInput(screen.container))).toHaveValue('4');
    await takeSnapshot(`RatingGroup - clicking after hovering commits the hovered value`);
  });

  /* -----------------------------------------------------------------------
   * Disabled state (4)
   * -------------------------------------------------------------------- */

  it('does not change the value when a disabled rating group is clicked', async () => {
    const screen = await render(<RatingGroup disabled defaultValue={2} />);
    await userEvent.click(locatorFor(getItem(screen.container, 5)), { force: true });
    await expect.element(locatorFor(getHiddenInput(screen.container))).toHaveValue('2');
    await takeSnapshot(`RatingGroup - does not change the value when a disabled rating group is clicked`);
  });

  it('does not respond to keyboard arrow keys when disabled', async () => {
    const screen = await render(<RatingGroup disabled defaultValue={2} />);
    getItem(screen.container, 2).focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect.element(locatorFor(getHiddenInput(screen.container))).toHaveValue('2');
    await takeSnapshot(`RatingGroup - does not respond to keyboard arrow keys when disabled`);
  });

  it('marks the control with data-disabled', async () => {
    const screen = await render(<RatingGroup disabled defaultValue={0} />);
    const control = getControl(screen.container);
    expect(control.hasAttribute('data-disabled')).toBe(true);
    await takeSnapshot(`RatingGroup - marks the control with data-disabled`);
  });

  it('marks the hidden input as disabled', async () => {
    const screen = await render(<RatingGroup disabled defaultValue={0} />);
    await expect.element(locatorFor(getHiddenInput(screen.container))).toBeDisabled();
    await takeSnapshot(`RatingGroup - marks the hidden input as disabled`);
  });

  /* -----------------------------------------------------------------------
   * ReadOnly state (4)
   * -------------------------------------------------------------------- */

  it('does not change the value when a read-only rating group is clicked', async () => {
    const screen = await render(<RatingGroup readOnly defaultValue={2} />);
    await userEvent.click(locatorFor(getItem(screen.container, 5)));
    await expect.element(locatorFor(getHiddenInput(screen.container))).toHaveValue('2');
    await takeSnapshot(`RatingGroup - does not change the value when a read-only rating group is clicked`);
  });

  it('marks the hidden input as readOnly', async () => {
    const screen = await render(<RatingGroup readOnly defaultValue={0} />);
    await expect.element(locatorFor(getHiddenInput(screen.container))).toHaveAttribute('readonly');
    await takeSnapshot(`RatingGroup - marks the hidden input as readOnly`);
  });

  it('preserves its value after an attempted interaction while read-only', async () => {
    const screen = await render(<RatingGroup readOnly defaultValue={4} />);
    const items = getItems(screen.container);
    expect(items.slice(0, 4).every(isFilled)).toBe(true);
    await userEvent.click(locatorFor(items[0]));
    await vi.waitFor(() => expect(getItems(screen.container).slice(0, 4).every(isFilled)).toBe(true));
    await takeSnapshot(`RatingGroup - preserves its value after an attempted interaction while read-only`);
  });

  it('marks the control as aria-readonly', async () => {
    const screen = await render(<RatingGroup readOnly defaultValue={0} />);
    const control = getControl(screen.container);
    expect(control.getAttribute('aria-readonly')).toBe('true');
    await takeSnapshot(`RatingGroup - marks the control as aria-readonly`);
  });

  /* -----------------------------------------------------------------------
   * Required & form name (4)
   * -------------------------------------------------------------------- */

  it('marks the hidden input as required when required is true', async () => {
    const screen = await render(<RatingGroup required defaultValue={0} />);
    await expect.element(locatorFor(getHiddenInput(screen.container))).toHaveAttribute('required');
    await takeSnapshot(`RatingGroup - marks the hidden input as required when required is true`);
  });

  it('does not mark the hidden input as required by default', async () => {
    const screen = await render(<RatingGroup defaultValue={0} />);
    await expect
      .element(locatorFor(getHiddenInput(screen.container)))
      .not.toHaveAttribute('required');
    await takeSnapshot(`RatingGroup - does not mark the hidden input as required by default`);
  });

  it('exposes the provided name attribute on the hidden input', async () => {
    const screen = await render(<RatingGroup name="product-rating" defaultValue={0} />);
    await expect
      .element(locatorFor(getHiddenInput(screen.container)))
      .toHaveAttribute('name', 'product-rating');
    await takeSnapshot(`RatingGroup - exposes the provided name attribute on the hidden input`);
  });

  it('defaults the name attribute to "rating" when name is not provided', async () => {
    const screen = await render(<RatingGroup defaultValue={0} />);
    await expect
      .element(locatorFor(getHiddenInput(screen.container)))
      .toHaveAttribute('name', 'rating');
    await takeSnapshot(`RatingGroup - defaults the name attribute to "rating" when name is not provided`);
  });

  /* -----------------------------------------------------------------------
   * Orientation (2)
   * -------------------------------------------------------------------- */

  it('lays out the control in a row for the default horizontal orientation', async () => {
    const screen = await render(<RatingGroup defaultValue={0} />);
    const control = getControl(screen.container);
    await expect.element(locatorFor(control)).toHaveStyle({ flexDirection: 'row' });
    await takeSnapshot(`RatingGroup - lays out the control in a row for the default horizontal orientation`);
  });

  it('lays out the control in a column for vertical orientation', async () => {
    const screen = await render(<RatingGroup orientation="vertical" defaultValue={0} />);
    const control = getControl(screen.container);
    await expect.element(locatorFor(control)).toHaveStyle({ flexDirection: 'column' });
    await takeSnapshot(`RatingGroup - lays out the control in a column for vertical orientation`);
  });

  /* -----------------------------------------------------------------------
   * Star fill state per item (3)
   * -------------------------------------------------------------------- */

  it('fills exactly the first 3 of 5 stars for a value of 3', async () => {
    const screen = await render(<RatingGroup defaultValue={3} />);
    const items = getItems(screen.container);
    expect(items.map(isFilled)).toEqual([true, true, true, false, false]);
    await takeSnapshot(`RatingGroup - fills exactly the first 3 of 5 stars for a value of 3`);
  });

  it('leaves all stars unfilled for a value of 0', async () => {
    const screen = await render(<RatingGroup defaultValue={0} />);
    const items = getItems(screen.container);
    expect(items.map(isFilled)).toEqual([false, false, false, false, false]);
    await takeSnapshot(`RatingGroup - leaves all stars unfilled for a value of 0`);
  });

  it('fills all stars when value equals the max count', async () => {
    const screen = await render(<RatingGroup defaultValue={5} />);
    const items = getItems(screen.container);
    expect(items.every(isFilled)).toBe(true);
    await takeSnapshot(`RatingGroup - fills all stars when value equals the max count`);
  });

  /* -----------------------------------------------------------------------
   * Kitchen-sink combinations (3)
   * -------------------------------------------------------------------- */

  it('blocks interaction and renders correctly with disabled + readOnly + defaultValue combined', async () => {
    const screen = await render(<RatingGroup disabled readOnly defaultValue={3} />);
    const items = getItems(screen.container);
    expect(items.slice(0, 3).every(isFilled)).toBe(true);
    await userEvent.click(locatorFor(items[4]), { force: true });
    await expect.element(locatorFor(getHiddenInput(screen.container))).toHaveValue('3');
    await expect.element(locatorFor(getHiddenInput(screen.container))).toBeDisabled();
    await takeSnapshot(`RatingGroup - blocks interaction and renders correctly with disabled + readOnly + defaultValue combined`);
  });

  it('combines required + custom name + custom min/max + controlled value correctly', async () => {
    const screen = await render(
      <RatingGroup required name="quality" min={1} max={7} value={4} onValueChange={vi.fn()}>
        Quality
      </RatingGroup>
    );
    expect(getItems(screen.container)).toHaveLength(7);
    const hiddenInput = getHiddenInput(screen.container);
    await expect.element(locatorFor(hiddenInput)).toHaveAttribute('required');
    await expect.element(locatorFor(hiddenInput)).toHaveAttribute('name', 'quality');
    await expect.element(locatorFor(hiddenInput)).toHaveValue('4');
    await takeSnapshot(`RatingGroup - combines required + custom name + custom min/max + controlled value correctly`);
  });

  it('combines vertical orientation + disabled + custom count correctly', async () => {
    const screen = await render(
      <RatingGroup orientation="vertical" disabled max={3} defaultValue={2}>
        Vertical disabled
      </RatingGroup>
    );
    const control = getControl(screen.container);
    expect(getItems(screen.container)).toHaveLength(3);
    await expect.element(locatorFor(control)).toHaveStyle({ flexDirection: 'column' });
    expect(control.hasAttribute('data-disabled')).toBe(true);
    await expect.element(locatorFor(getHiddenInput(screen.container))).toBeDisabled();
    await takeSnapshot(`RatingGroup - combines vertical orientation + disabled + custom count correctly`);
  });
});
