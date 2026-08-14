import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent, page } from 'vitest/browser';
import { useState } from 'react';
import Accordion from './Accordion';
import { color } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

const twoItems = [
  { title: 'First', content: 'First content' },
  { title: 'Second', content: 'Second content' },
];

const threeItems = [
  { title: 'First', content: 'First content' },
  { title: 'Second', content: 'Second content' },
  { title: 'Third', content: 'Third content' },
];

const manyItems = Array.from({ length: 8 }, (_, index) => ({
  title: `Section ${index + 1}`,
  content: `Content for section ${index + 1}`,
}));

/**
 * Small stateful fixture mirroring the "controlled accordion" usage pattern
 * from the stories, used to exercise real external state updates (as
 * opposed to just spy call counts).
 */
const ControlledToggleFixture = ({
  initialValue = ['item-0'],
}: {
  initialValue?: string[];
}) => {
  const [value, setValue] = useState<string[]>(initialValue);

  return (
    <>
      <Accordion
        items={threeItems}
        value={value}
        onValueChange={(details) => setValue(details.value)}
      />
      <button onClick={() => setValue(['item-0', 'item-1', 'item-2'])}>
        Open all
      </button>
      <button onClick={() => setValue([])}>Close all</button>
    </>
  );
};

/** Wraps a raw HTMLElement into a Locator so jest-dom matchers can be used. */
const locatorFor = (element: HTMLElement) => page.elementLocator(element);

/** The Ark UI root element, identified by its anatomy data-part attribute. */
const getRoot = (container: HTMLElement) =>
  container.querySelector('[data-part="root"]') as HTMLElement;

/** All item wrappers, identified by their anatomy data-part attribute. */
const getItems = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('[data-part="item"]')) as HTMLElement[];

/** All item triggers, identified by their anatomy data-part attribute. */
const getTriggers = (container: HTMLElement) =>
  Array.from(
    container.querySelectorAll('[data-part="item-trigger"]')
  ) as HTMLElement[];

/** All item content regions, identified by their anatomy data-part attribute. */
const getContents = (container: HTMLElement) =>
  Array.from(
    container.querySelectorAll('[data-part="item-content"]')
  ) as HTMLElement[];

/** All item indicators, identified by their anatomy data-part attribute. */
const getIndicators = (container: HTMLElement) =>
  Array.from(
    container.querySelectorAll('[data-part="item-indicator"]')
  ) as HTMLElement[];

describe('Accordion', () => {
  /* -----------------------------------------------------------------------
   * Default rendering & first-item-open fallback (4)
   * -------------------------------------------------------------------- */

  it("shows the first item's content visible by default", async () => {
    const screen = await render(<Accordion items={twoItems} />);
    const contents = getContents(screen.container);
    expect(contents[0].hidden).toBe(false);
    await takeSnapshot(`Accordion - shows the first item's content visible by default`);
  });

  it("hides subsequent items' content by default", async () => {
    const screen = await render(<Accordion items={twoItems} />);
    const contents = getContents(screen.container);
    expect(contents[1].hidden).toBe(true);
    await takeSnapshot(`Accordion - hides subsequent items' content by default`);
  });

  it('sets aria-expanded="true" on the first trigger by default', async () => {
    const screen = await render(<Accordion items={twoItems} />);
    const triggers = getTriggers(screen.container);
    await expect
      .element(locatorFor(triggers[0]))
      .toHaveAttribute('aria-expanded', 'true');
    await takeSnapshot(`Accordion - sets aria-expanded="true" on the first trigger by default`);
  });

  it('sets data-state="closed" on items other than the first by default', async () => {
    const screen = await render(<Accordion items={threeItems} />);
    const items = getItems(screen.container);
    expect(items[1].getAttribute('data-state')).toBe('closed');
    expect(items[2].getAttribute('data-state')).toBe('closed');
    await takeSnapshot(`Accordion - sets data-state="closed" on items other than the first by default`);
  });

  /* -----------------------------------------------------------------------
   * Empty items / single item edge cases (3)
   * -------------------------------------------------------------------- */

  it('renders no trigger elements when items is an empty array', async () => {
    const screen = await render(<Accordion items={[]} />);
    const triggers = getTriggers(screen.container);
    expect(triggers).toHaveLength(0);
    await takeSnapshot(`Accordion - renders no trigger elements when items is an empty array`);
  });

  it('renders a single item open by default without crashing', async () => {
    const screen = await render(<Accordion items={[twoItems[0]]} />);
    const triggers = getTriggers(screen.container);
    expect(triggers).toHaveLength(1);
    await expect
      .element(locatorFor(triggers[0]))
      .toHaveAttribute('aria-expanded', 'true');
    await takeSnapshot(`Accordion - renders a single item open by default without crashing`);
  });

  it('allows collapsing a single open item down to zero open items', async () => {
    const screen = await render(<Accordion items={[twoItems[0]]} />);
    const triggers = getTriggers(screen.container);
    await userEvent.click(locatorFor(triggers[0]));
    await expect
      .element(locatorFor(triggers[0]))
      .toHaveAttribute('aria-expanded', 'false');
    await takeSnapshot(`Accordion - allows collapsing a single open item down to zero open items`);
  });

  /* -----------------------------------------------------------------------
   * Controlled `value` prop (5)
   * -------------------------------------------------------------------- */

  it('opens exactly the item specified by a controlled value array', async () => {
    const screen = await render(
      <Accordion items={threeItems} value={['item-1']} />
    );
    const triggers = getTriggers(screen.container);
    await expect
      .element(locatorFor(triggers[0]))
      .toHaveAttribute('aria-expanded', 'false');
    await expect
      .element(locatorFor(triggers[1]))
      .toHaveAttribute('aria-expanded', 'true');
    await expect
      .element(locatorFor(triggers[2]))
      .toHaveAttribute('aria-expanded', 'false');
    await takeSnapshot(`Accordion - opens exactly the item specified by a controlled value array`);
  });

  it('opens no items when value is an empty array', async () => {
    const screen = await render(<Accordion items={twoItems} value={[]} />);
    const triggers = getTriggers(screen.container);
    await expect
      .element(locatorFor(triggers[0]))
      .toHaveAttribute('aria-expanded', 'false');
    await expect
      .element(locatorFor(triggers[1]))
      .toHaveAttribute('aria-expanded', 'false');
    await takeSnapshot(`Accordion - opens no items when value is an empty array`);
  });

  it('opens multiple items simultaneously when value contains multiple entries', async () => {
    const screen = await render(
      <Accordion items={threeItems} value={['item-0', 'item-2']} />
    );
    const triggers = getTriggers(screen.container);
    await expect
      .element(locatorFor(triggers[0]))
      .toHaveAttribute('aria-expanded', 'true');
    await expect
      .element(locatorFor(triggers[1]))
      .toHaveAttribute('aria-expanded', 'false');
    await expect
      .element(locatorFor(triggers[2]))
      .toHaveAttribute('aria-expanded', 'true');
    await takeSnapshot(`Accordion - opens multiple items simultaneously when value contains multiple entries`);
  });

  it('reflects an external state update pushed down through the value prop', async () => {
    const screen = await render(
      <ControlledToggleFixture initialValue={['item-0']} />
    );
    const triggers = getTriggers(screen.container);
    await expect
      .element(locatorFor(triggers[1]))
      .toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(
      screen.getByRole('button', { name: 'Open all' })
    );

    await expect
      .element(locatorFor(triggers[1]))
      .toHaveAttribute('aria-expanded', 'true');
    await expect
      .element(locatorFor(triggers[2]))
      .toHaveAttribute('aria-expanded', 'true');
    await takeSnapshot(`Accordion - reflects an external state update pushed down through the value prop`);
  });

  it('calls onValueChange after a trigger click even when the parent keeps the value prop fixed', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <Accordion
        items={twoItems}
        value={['item-0']}
        onValueChange={onValueChange}
      />
    );
    const triggers = getTriggers(screen.container);
    await userEvent.click(locatorFor(triggers[1]));
    await vi.waitFor(() => expect(onValueChange).toHaveBeenCalledTimes(1));
    await expect
      .element(locatorFor(triggers[1]))
      .toHaveAttribute('aria-expanded', 'false');
    await takeSnapshot(`Accordion - calls onValueChange after a trigger click even when the parent keeps the value prop fixed`);
  });

  /* -----------------------------------------------------------------------
   * Uncontrolled `defaultValue` prop (4)
   * -------------------------------------------------------------------- */

  it('starts with the specified single item open via defaultValue', async () => {
    const screen = await render(
      <Accordion items={threeItems} defaultValue={['item-2']} />
    );
    const triggers = getTriggers(screen.container);
    await expect
      .element(locatorFor(triggers[0]))
      .toHaveAttribute('aria-expanded', 'false');
    await expect
      .element(locatorFor(triggers[2]))
      .toHaveAttribute('aria-expanded', 'true');
    await takeSnapshot(`Accordion - starts with the specified single item open via defaultValue`);
  });

  it('starts with multiple items open via defaultValue', async () => {
    const screen = await render(
      <Accordion items={threeItems} defaultValue={['item-0', 'item-1']} />
    );
    const triggers = getTriggers(screen.container);
    await expect
      .element(locatorFor(triggers[0]))
      .toHaveAttribute('aria-expanded', 'true');
    await expect
      .element(locatorFor(triggers[1]))
      .toHaveAttribute('aria-expanded', 'true');
    await expect
      .element(locatorFor(triggers[2]))
      .toHaveAttribute('aria-expanded', 'false');
    await takeSnapshot(`Accordion - starts with multiple items open via defaultValue`);
  });

  it('starts with no items open when defaultValue is an empty array', async () => {
    const screen = await render(
      <Accordion items={twoItems} defaultValue={[]} />
    );
    const triggers = getTriggers(screen.container);
    await expect
      .element(locatorFor(triggers[0]))
      .toHaveAttribute('aria-expanded', 'false');
    await expect
      .element(locatorFor(triggers[1]))
      .toHaveAttribute('aria-expanded', 'false');
    await takeSnapshot(`Accordion - starts with no items open when defaultValue is an empty array`);
  });

  it('still allows opening additional items via click after an initial defaultValue', async () => {
    const screen = await render(
      <Accordion items={threeItems} defaultValue={['item-0']} />
    );
    const triggers = getTriggers(screen.container);
    await userEvent.click(locatorFor(triggers[2]));
    await expect
      .element(locatorFor(triggers[0]))
      .toHaveAttribute('aria-expanded', 'true');
    await expect
      .element(locatorFor(triggers[2]))
      .toHaveAttribute('aria-expanded', 'true');
    await takeSnapshot(`Accordion - still allows opening additional items via click after an initial defaultValue`);
  });

  /* -----------------------------------------------------------------------
   * onValueChange callback (4)
   * -------------------------------------------------------------------- */

  it('calls onValueChange exactly once when a trigger is clicked', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <Accordion items={twoItems} onValueChange={onValueChange} />
    );
    const triggers = getTriggers(screen.container);
    await userEvent.click(locatorFor(triggers[1]));
    await vi.waitFor(() => expect(onValueChange).toHaveBeenCalledTimes(1));
    await takeSnapshot(`Accordion - calls onValueChange exactly once when a trigger is clicked`);
  });

  it('calls onValueChange with the updated value array including the newly opened item', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <Accordion items={twoItems} onValueChange={onValueChange} />
    );
    const triggers = getTriggers(screen.container);
    await userEvent.click(locatorFor(triggers[1]));
    await vi.waitFor(() => expect(onValueChange).toHaveBeenCalledWith(
      expect.objectContaining({
        value: expect.arrayContaining(['item-0', 'item-1']),
      })
    ));
    await takeSnapshot(`Accordion - calls onValueChange with the updated value array including the newly opened item`);
  });

  it('calls onValueChange with an empty value array when closing the only open item', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <Accordion items={[twoItems[0]]} onValueChange={onValueChange} />
    );
    const triggers = getTriggers(screen.container);
    await userEvent.click(locatorFor(triggers[0]));
    await vi.waitFor(() => expect(onValueChange).toHaveBeenCalledWith({ value: [] }));
    await takeSnapshot(`Accordion - calls onValueChange with an empty value array when closing the only open item`);
  });

  it('does not call onValueChange merely from rendering', async () => {
    const onValueChange = vi.fn();
    await render(<Accordion items={twoItems} onValueChange={onValueChange} />);
    expect(onValueChange).not.toHaveBeenCalled();
    await takeSnapshot(`Accordion - does not call onValueChange merely from rendering`);
  });

  /* -----------------------------------------------------------------------
   * Expand/collapse click interaction, including multiple items open (5)
   * -------------------------------------------------------------------- */

  it('keeps the first item open after opening a second item by click', async () => {
    const screen = await render(<Accordion items={threeItems} />);
    const triggers = getTriggers(screen.container);
    await userEvent.click(locatorFor(triggers[1]));
    await expect
      .element(locatorFor(triggers[0]))
      .toHaveAttribute('aria-expanded', 'true');
    await expect
      .element(locatorFor(triggers[1]))
      .toHaveAttribute('aria-expanded', 'true');
    await takeSnapshot(`Accordion - keeps the first item open after opening a second item by click`);
  });

  it('collapses the first item when its trigger is clicked', async () => {
    const screen = await render(<Accordion items={threeItems} />);
    const triggers = getTriggers(screen.container);
    await userEvent.click(locatorFor(triggers[0]));
    await expect
      .element(locatorFor(triggers[0]))
      .toHaveAttribute('aria-expanded', 'false');
    await takeSnapshot(`Accordion - collapses the first item when its trigger is clicked`);
  });

  it('supports opening all items in a three-item accordion via sequential clicks', async () => {
    const screen = await render(<Accordion items={threeItems} />);
    const triggers = getTriggers(screen.container);
    await userEvent.click(locatorFor(triggers[1]));
    await userEvent.click(locatorFor(triggers[2]));
    await expect
      .element(locatorFor(triggers[0]))
      .toHaveAttribute('aria-expanded', 'true');
    await expect
      .element(locatorFor(triggers[1]))
      .toHaveAttribute('aria-expanded', 'true');
    await expect
      .element(locatorFor(triggers[2]))
      .toHaveAttribute('aria-expanded', 'true');
    await takeSnapshot(`Accordion - supports opening all items in a three-item accordion via sequential clicks`);
  });

  it('supports collapsing all items back down via sequential clicks', async () => {
    const screen = await render(
      <Accordion
        items={threeItems}
        defaultValue={['item-0', 'item-1', 'item-2']}
      />
    );
    const triggers = getTriggers(screen.container);
    await userEvent.click(locatorFor(triggers[0]));
    await userEvent.click(locatorFor(triggers[1]));
    await userEvent.click(locatorFor(triggers[2]));
    await expect
      .element(locatorFor(triggers[0]))
      .toHaveAttribute('aria-expanded', 'false');
    await expect
      .element(locatorFor(triggers[1]))
      .toHaveAttribute('aria-expanded', 'false');
    await expect
      .element(locatorFor(triggers[2]))
      .toHaveAttribute('aria-expanded', 'false');
    await takeSnapshot(`Accordion - supports collapsing all items back down via sequential clicks`);
  });

  it('toggles a single item open and closed across two clicks', async () => {
    const screen = await render(
      <Accordion items={twoItems} defaultValue={[]} />
    );
    const triggers = getTriggers(screen.container);
    await userEvent.click(locatorFor(triggers[0]));
    await expect
      .element(locatorFor(triggers[0]))
      .toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(locatorFor(triggers[0]));
    await expect
      .element(locatorFor(triggers[0]))
      .toHaveAttribute('aria-expanded', 'false');
    await takeSnapshot(`Accordion - toggles a single item open and closed across two clicks`);
  });

  /* -----------------------------------------------------------------------
   * Keyboard navigation: arrows / Home / End (5)
   * -------------------------------------------------------------------- */

  it('moves focus to the next trigger on ArrowDown', async () => {
    const screen = await render(<Accordion items={threeItems} />);
    const triggers = getTriggers(screen.container);
    triggers[0].focus();
    await userEvent.keyboard('{ArrowDown}');
    await vi.waitFor(() => expect(document.activeElement).toBe(triggers[1]));
    await takeSnapshot(`Accordion - moves focus to the next trigger on ArrowDown`);
  });

  it('moves focus to the previous trigger on ArrowUp', async () => {
    const screen = await render(<Accordion items={threeItems} />);
    const triggers = getTriggers(screen.container);
    triggers[1].focus();
    await userEvent.keyboard('{ArrowUp}');
    await vi.waitFor(() => expect(document.activeElement).toBe(triggers[0]));
    await takeSnapshot(`Accordion - moves focus to the previous trigger on ArrowUp`);
  });

  it('wraps focus from the last trigger back to the first on ArrowDown', async () => {
    const screen = await render(<Accordion items={threeItems} />);
    const triggers = getTriggers(screen.container);
    triggers[2].focus();
    await userEvent.keyboard('{ArrowDown}');
    await vi.waitFor(() => expect(document.activeElement).toBe(triggers[0]));
    await takeSnapshot(`Accordion - wraps focus from the last trigger back to the first on ArrowDown`);
  });

  it('moves focus to the first trigger on Home regardless of current focus', async () => {
    const screen = await render(<Accordion items={threeItems} />);
    const triggers = getTriggers(screen.container);
    triggers[2].focus();
    await userEvent.keyboard('{Home}');
    await vi.waitFor(() => expect(document.activeElement).toBe(triggers[0]));
    await takeSnapshot(`Accordion - moves focus to the first trigger on Home regardless of current focus`);
  });

  it('moves focus to the last trigger on End regardless of current focus', async () => {
    const screen = await render(<Accordion items={threeItems} />);
    const triggers = getTriggers(screen.container);
    triggers[0].focus();
    await userEvent.keyboard('{End}');
    await vi.waitFor(() => expect(document.activeElement).toBe(triggers[2]));
    await takeSnapshot(`Accordion - moves focus to the last trigger on End regardless of current focus`);
  });

  /* -----------------------------------------------------------------------
   * Keyboard interaction: Enter / Space toggle (3)
   * -------------------------------------------------------------------- */

  it('opens a focused, closed item when Enter is pressed', async () => {
    const screen = await render(<Accordion items={threeItems} />);
    const triggers = getTriggers(screen.container);
    triggers[1].focus();
    await userEvent.keyboard('{Enter}');
    await expect
      .element(locatorFor(triggers[1]))
      .toHaveAttribute('aria-expanded', 'true');
    await takeSnapshot(`Accordion - opens a focused, closed item when Enter is pressed`);
  });

  it('opens a focused, closed item when Space is pressed', async () => {
    const screen = await render(<Accordion items={threeItems} />);
    const triggers = getTriggers(screen.container);
    triggers[2].focus();
    await userEvent.keyboard(' ');
    await expect
      .element(locatorFor(triggers[2]))
      .toHaveAttribute('aria-expanded', 'true');
    await takeSnapshot(`Accordion - opens a focused, closed item when Space is pressed`);
  });

  it('closes a focused, open item when Enter is pressed', async () => {
    const screen = await render(<Accordion items={threeItems} />);
    const triggers = getTriggers(screen.container);
    triggers[0].focus();
    await userEvent.keyboard('{Enter}');
    await expect
      .element(locatorFor(triggers[0]))
      .toHaveAttribute('aria-expanded', 'false');
    await takeSnapshot(`Accordion - closes a focused, open item when Enter is pressed`);
  });

  /* -----------------------------------------------------------------------
   * Indicator data-state / rotation signal (3)
   * -------------------------------------------------------------------- */

  it('sets data-state="open" on the indicator of an open item', async () => {
    const screen = await render(<Accordion items={twoItems} />);
    const indicators = getIndicators(screen.container);
    expect(indicators[0].getAttribute('data-state')).toBe('open');
    await takeSnapshot(`Accordion - sets data-state="open" on the indicator of an open item`);
  });

  it('sets data-state="closed" on the indicator of a closed item', async () => {
    const screen = await render(<Accordion items={twoItems} />);
    const indicators = getIndicators(screen.container);
    expect(indicators[1].getAttribute('data-state')).toBe('closed');
    await takeSnapshot(`Accordion - sets data-state="closed" on the indicator of a closed item`);
  });

  it('flips indicator data-state from closed to open after a click', async () => {
    const screen = await render(<Accordion items={twoItems} />);
    const triggers = getTriggers(screen.container);
    const indicators = getIndicators(screen.container);
    expect(indicators[1].getAttribute('data-state')).toBe('closed');
    await userEvent.click(locatorFor(triggers[1]));
    await vi.waitFor(() => expect(indicators[1].getAttribute('data-state')).toBe('open'));
    await takeSnapshot(`Accordion - flips indicator data-state from closed to open after a click`);
  });

  /* -----------------------------------------------------------------------
   * Inverted styling (3)
   * -------------------------------------------------------------------- */

  it('applies a slate900 background and white text color on the root when inverted', async () => {
    const screen = await render(<Accordion items={twoItems} inverted />);
    const root = getRoot(screen.container);
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ backgroundColor: color.slate900, color: color.white });
    await takeSnapshot(`Accordion - applies a slate900 background and white text color on the root when inverted`);
  });

  it('applies a slate700 border color on the root when inverted', async () => {
    const screen = await render(<Accordion items={twoItems} inverted />);
    const root = getRoot(screen.container);
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ borderColor: color.slate700 });
    await takeSnapshot(`Accordion - applies a slate700 border color on the root when inverted`);
  });

  it('keeps the default white background and slate900 text color when not inverted', async () => {
    const screen = await render(<Accordion items={twoItems} />);
    const root = getRoot(screen.container);
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ backgroundColor: color.white, color: color.slate900 });
    await takeSnapshot(`Accordion - keeps the default white background and slate900 text color when not inverted`);
  });

  /* -----------------------------------------------------------------------
   * Content edge cases: short / long / RTL / emoji (4)
   * -------------------------------------------------------------------- */

  it('preserves RTL unicode title and content exactly', async () => {
    const screen = await render(
      <Accordion
        items={[
          { title: 'ما هو رياكت؟', content: 'رياكت هي مكتبة جافا سكريبت.' },
        ]}
      />
    );
    await expect
      .element(screen.getByText('ما هو رياكت؟'))
      .toBeInTheDocument();
    await expect
      .element(screen.getByText('رياكت هي مكتبة جافا سكريبت.'))
      .toBeInTheDocument();
    await takeSnapshot(`Accordion - preserves RTL unicode title and content exactly`);
  });

  it('preserves emoji title and content exactly', async () => {
    const screen = await render(
      <Accordion
        items={[
          {
            title: '🎉 New features',
            content: '✅ Bug fixes and 🚀 improvements.',
          },
        ]}
      />
    );
    await expect.element(screen.getByText('🎉 New features')).toBeInTheDocument();
    await expect
      .element(screen.getByText('✅ Bug fixes and 🚀 improvements.'))
      .toBeInTheDocument();
    await takeSnapshot(`Accordion - preserves emoji title and content exactly`);
  });

  it('renders very long content text in full without truncating', async () => {
    const longContent = 'A'.repeat(500) + ' end-marker';
    const screen = await render(
      <Accordion items={[{ title: 'Long', content: longContent }]} />
    );
    await expect
      .element(screen.getByText(longContent))
      .toHaveTextContent(longContent);
    await takeSnapshot(`Accordion - renders very long content text in full without truncating`);
  });

  it('renders minimal short title and content correctly', async () => {
    const screen = await render(
      <Accordion items={[{ title: 'FAQ', content: 'Yes.' }]} />
    );
    await expect.element(screen.getByText('FAQ')).toBeInTheDocument();
    await expect.element(screen.getByText('Yes.')).toBeInTheDocument();
    await takeSnapshot(`Accordion - renders minimal short title and content correctly`);
  });

  /* -----------------------------------------------------------------------
   * Kitchen-sink combinations (4)
   * -------------------------------------------------------------------- */

  it('combines inverted styling with a controlled value opening multiple items', async () => {
    const screen = await render(
      <Accordion items={threeItems} inverted value={['item-0', 'item-2']} />
    );
    const root = getRoot(screen.container);
    const triggers = getTriggers(screen.container);
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ backgroundColor: color.slate900 });
    await expect
      .element(locatorFor(triggers[0]))
      .toHaveAttribute('aria-expanded', 'true');
    await expect
      .element(locatorFor(triggers[1]))
      .toHaveAttribute('aria-expanded', 'false');
    await expect
      .element(locatorFor(triggers[2]))
      .toHaveAttribute('aria-expanded', 'true');
    await takeSnapshot(`Accordion - combines inverted styling with a controlled value opening multiple items`);
  });

  it('combines a defaultValue subset with a longer list of items', async () => {
    const screen = await render(
      <Accordion items={manyItems} defaultValue={['item-2', 'item-5']} />
    );
    const triggers = getTriggers(screen.container);
    await expect
      .element(locatorFor(triggers[0]))
      .toHaveAttribute('aria-expanded', 'false');
    await expect
      .element(locatorFor(triggers[2]))
      .toHaveAttribute('aria-expanded', 'true');
    await expect
      .element(locatorFor(triggers[5]))
      .toHaveAttribute('aria-expanded', 'true');
    await takeSnapshot(`Accordion - combines a defaultValue subset with a longer list of items`);
  });

  it('renders correctly with an empty items array and inverted colors together', async () => {
    const screen = await render(<Accordion items={[]} inverted />);
    const root = getRoot(screen.container);
    const triggers = getTriggers(screen.container);
    expect(triggers).toHaveLength(0);
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ backgroundColor: color.slate900 });
    await takeSnapshot(`Accordion - renders correctly with an empty items array and inverted colors together`);
  });

  it('combines RTL/emoji content with a controlled value across three items', async () => {
    const screen = await render(
      <Accordion
        items={[
          { title: '🎉 ما الجديد؟', content: 'تحسينات 🚀 وإصلاح الأخطاء ✅.' },
          { title: '💡 Astuce', content: 'Utilisez les raccourcis clavier.' },
          { title: '中文标题 🀄', content: '这是中文内容示例。' },
        ]}
        value={['item-0', 'item-2']}
      />
    );
    const triggers = getTriggers(screen.container);
    await expect
      .element(locatorFor(triggers[0]))
      .toHaveAttribute('aria-expanded', 'true');
    await expect
      .element(locatorFor(triggers[2]))
      .toHaveAttribute('aria-expanded', 'true');
    await expect.element(screen.getByText('💡 Astuce')).toBeInTheDocument();
    await takeSnapshot(`Accordion - combines RTL/emoji content with a controlled value across three items`);
  });

  /* -----------------------------------------------------------------------
   * Multi-instance independence (3)
   * -------------------------------------------------------------------- */

  it('does not share open state between two independent accordion instances', async () => {
    const screen = await render(
      <div>
        <Accordion items={twoItems} defaultValue={['item-0']} />
        <Accordion items={twoItems} defaultValue={['item-1']} />
      </div>
    );
    const triggers = getTriggers(screen.container);
    await expect
      .element(locatorFor(triggers[0]))
      .toHaveAttribute('aria-expanded', 'true');
    await expect
      .element(locatorFor(triggers[1]))
      .toHaveAttribute('aria-expanded', 'false');
    await expect
      .element(locatorFor(triggers[2]))
      .toHaveAttribute('aria-expanded', 'false');
    await expect
      .element(locatorFor(triggers[3]))
      .toHaveAttribute('aria-expanded', 'true');
    await takeSnapshot(`Accordion - does not share open state between two independent accordion instances`);
  });

  it("clicking a trigger in one instance does not change the sibling instance's indicators", async () => {
    const screen = await render(
      <div>
        <Accordion items={twoItems} />
        <Accordion items={twoItems} />
      </div>
    );
    const triggers = getTriggers(screen.container);
    const indicators = getIndicators(screen.container);
    await userEvent.click(locatorFor(triggers[1]));
    await vi.waitFor(() => expect(indicators[1].getAttribute('data-state')).toBe('open'));
    await vi.waitFor(() => expect(indicators[2].getAttribute('data-state')).toBe('open'));
    await vi.waitFor(() => expect(indicators[3].getAttribute('data-state')).toBe('closed'));
    await takeSnapshot(`Accordion - clicking a trigger in one instance does not change the sibling instance's indicators`);
  });

  it("invokes only the clicked instance's onValueChange, leaving the other instance's callback uncalled", async () => {
    const onFirstChange = vi.fn();
    const onSecondChange = vi.fn();
    const screen = await render(
      <div>
        <Accordion items={twoItems} onValueChange={onFirstChange} />
        <Accordion items={twoItems} onValueChange={onSecondChange} />
      </div>
    );
    const triggers = getTriggers(screen.container);
    await userEvent.click(locatorFor(triggers[1]));
    await vi.waitFor(() => expect(onFirstChange).toHaveBeenCalledTimes(1));
    await vi.waitFor(() => expect(onSecondChange).not.toHaveBeenCalled());
    await takeSnapshot(`Accordion - invokes only the clicked instance's onValueChange, leaving the other instance's callback uncalled`);
  });
});
