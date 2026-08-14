import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import List from './List';
import type { ListItem } from './List';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

/** Wraps a raw HTMLElement into a Locator so jest-dom matchers can be used. */
const locatorFor = (element: HTMLElement) => page.elementLocator(element);

const basicItems: ListItem[] = [
  { id: '1', label: 'First item' },
  { id: '2', label: 'Second item' },
  { id: '3', label: 'Third item' },
];

const itemsWithDescriptions: ListItem[] = [
  { id: '1', label: 'Inbox', description: 'Messages waiting for a reply' },
  { id: '2', label: 'Drafts', description: 'Unsent messages you started' },
  { id: '3', label: 'Archive', description: 'Older messages you kept' },
];

const getList = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement;

const getItems = (container: HTMLElement) =>
  Array.from(getList(container).querySelectorAll('li'));
describe('List', () => {
  /* -----------------------------------------------------------------------
   * Rendering defaults (4)
   * -------------------------------------------------------------------- */

  it('renders an unordered list by default', async () => {
    const screen = await render(<List items={basicItems} />);
    const list = getList(screen.container);
    expect(list.tagName).toBe('UL');
    await takeSnapshot(`List - renders an unordered list by default`);
  });

  it('renders an ordered list when ordered is true', async () => {
    const screen = await render(<List items={basicItems} ordered />);
    const list = getList(screen.container);
    expect(list.tagName).toBe('OL');
    await takeSnapshot(`List - renders an ordered list when ordered is true`);
  });

  it('renders each provided item label', async () => {
    const screen = await render(<List items={basicItems} />);
    await expect.element(screen.getByText('First item')).toBeInTheDocument();
    await expect.element(screen.getByText('Second item')).toBeInTheDocument();
    await expect.element(screen.getByText('Third item')).toBeInTheDocument();
    await takeSnapshot(`List - renders each provided item label`);
  });

  it('defaults to medium size font styles', async () => {
    const screen = await render(<List items={basicItems} />);
    const [first] = getItems(screen.container);
    await expect
      .element(screen.getByText('First item'))
      .toHaveStyle({ fontSize: fontSize[14] });
    expect(first).not.toBeNull();
    await takeSnapshot(`List - defaults to medium size font styles`);
  });

  /* -----------------------------------------------------------------------
   * Size styles (3)
   * -------------------------------------------------------------------- */

  it('applies small size font size to list items', async () => {
    const screen = await render(<List items={basicItems} size="small" />);
    const [first] = getItems(screen.container);
    await expect.element(locatorFor(first)).toHaveStyle({
      fontSize: fontSize[12],
    });
    await takeSnapshot(`List - applies small size font size to list items`);
  });

  it('applies medium size font size to list items', async () => {
    const screen = await render(<List items={basicItems} size="medium" />);
    const [first] = getItems(screen.container);
    await expect.element(locatorFor(first)).toHaveStyle({
      fontSize: fontSize[14],
    });
    await takeSnapshot(`List - applies medium size font size to list items`);
  });

  it('applies large size font size to list items', async () => {
    const screen = await render(<List items={basicItems} size="large" />);
    const [first] = getItems(screen.container);
    await expect.element(locatorFor(first)).toHaveStyle({
      fontSize: fontSize[16],
    });
    await takeSnapshot(`List - applies large size font size to list items`);
  });

  /* -----------------------------------------------------------------------
   * Descriptions (4)
   * -------------------------------------------------------------------- */

  it('renders item descriptions when provided', async () => {
    const screen = await render(<List items={itemsWithDescriptions} />);
    await expect
      .element(screen.getByText('Messages waiting for a reply'))
      .toBeInTheDocument();
    await takeSnapshot(`List - renders item descriptions when provided`);
  });

  it('does not render a description element when description is omitted', async () => {
    const screen = await render(
      <List items={[{ id: '1', label: 'No description' }]} />
    );
    const item = getItems(screen.container)[0];
    expect(item.querySelectorAll('span')).toHaveLength(1);
    await takeSnapshot(
      `List - does not render a description element when description is omitted`
    );
  });

  it('styles descriptions with slate500 color', async () => {
    const screen = await render(<List items={itemsWithDescriptions} />);
    await expect
      .element(screen.getByText('Messages waiting for a reply'))
      .toHaveStyle({ color: color.slate500 });
    await takeSnapshot(`List - styles descriptions with slate500 color`);
  });

  it('styles labels with medium font weight', async () => {
    const screen = await render(<List items={basicItems} />);
    await expect.element(screen.getByText('First item')).toHaveStyle({
      fontWeight: String(fontWeight.medium),
    });
    await takeSnapshot(`List - styles labels with medium font weight`);
  });

  /* -----------------------------------------------------------------------
   * Divided styles (3)
   * -------------------------------------------------------------------- */

  it('applies a bottom border on non-last items when divided', async () => {
    const screen = await render(<List items={basicItems} divided />);
    const items = getItems(screen.container);
    await expect
      .element(locatorFor(items[0]))
      .toHaveStyle({ borderBottomStyle: 'solid' });
    await takeSnapshot(
      `List - applies a bottom border on non-last items when divided`
    );
  });

  it('does not apply a bottom border on the last item when divided', async () => {
    const screen = await render(<List items={basicItems} divided />);
    const items = getItems(screen.container);
    await expect
      .element(locatorFor(items[items.length - 1]))
      .toHaveStyle({ borderBottomStyle: 'none' });
    await takeSnapshot(
      `List - does not apply a bottom border on the last item when divided`
    );
  });

  it('does not apply dividers when divided is false', async () => {
    const screen = await render(<List items={basicItems} divided={false} />);
    const items = getItems(screen.container);
    for (const item of items) {
      await expect
        .element(locatorFor(item))
        .toHaveStyle({ borderBottomStyle: 'none' });
    }
    await takeSnapshot(`List - does not apply dividers when divided is false`);
  });

  /* -----------------------------------------------------------------------
   * Marker color (4)
   * -------------------------------------------------------------------- */

  it('defaults marker color to slate500 on the list root', async () => {
    const screen = await render(<List items={basicItems} />);
    const list = getList(screen.container);
    await expect
      .element(locatorFor(list))
      .toHaveStyle({ color: color.slate500 });
    await takeSnapshot(
      `List - defaults marker color to slate500 on the list root`
    );
  });

  it('applies a custom blue marker color', async () => {
    const screen = await render(
      <List items={basicItems} markerColor={color.blue500} />
    );
    const list = getList(screen.container);
    await expect
      .element(locatorFor(list))
      .toHaveStyle({ color: color.blue500 });
    await takeSnapshot(`List - applies a custom blue marker color`);
  });

  it('applies a custom green marker color', async () => {
    const screen = await render(
      <List items={basicItems} markerColor={color.green500} />
    );
    const list = getList(screen.container);
    await expect
      .element(locatorFor(list))
      .toHaveStyle({ color: color.green500 });
    await takeSnapshot(`List - applies a custom green marker color`);
  });

  it('applies a custom pink marker color', async () => {
    const screen = await render(
      <List items={basicItems} markerColor={color.pink500} />
    );
    const list = getList(screen.container);
    await expect
      .element(locatorFor(list))
      .toHaveStyle({ color: color.pink500 });
    await takeSnapshot(`List - applies a custom pink marker color`);
  });

  /* -----------------------------------------------------------------------
   * Item counts & edge cases (6)
   * -------------------------------------------------------------------- */

  it('renders the correct number of list items', async () => {
    const screen = await render(<List items={basicItems} />);
    expect(getItems(screen.container)).toHaveLength(3);
    await takeSnapshot(`List - renders the correct number of list items`);
  });

  it('renders a single item list correctly', async () => {
    const screen = await render(
      <List items={[{ id: 'only', label: 'Only item' }]} />
    );
    expect(getItems(screen.container)).toHaveLength(1);
    await expect.element(screen.getByText('Only item')).toBeInTheDocument();
    await takeSnapshot(`List - renders a single item list correctly`);
  });

  it('renders an empty list without throwing', async () => {
    const screen = await render(<List items={[]} />);
    const list = getList(screen.container);
    expect(list.tagName).toBe('UL');
    expect(getItems(screen.container)).toHaveLength(0);
    await takeSnapshot(`List - renders an empty list without throwing`);
  });

  it('preserves emoji content in labels', async () => {
    const screen = await render(
      <List items={[{ id: '1', label: '🎉 Launch' }]} />
    );
    await expect
      .element(screen.getByText('🎉 Launch'))
      .toHaveTextContent('🎉 Launch');
    await takeSnapshot(`List - preserves emoji content in labels`);
  });

  it('preserves RTL unicode content in labels', async () => {
    const screen = await render(
      <List items={[{ id: '1', label: 'مرحبا' }]} />
    );
    await expect.element(screen.getByText('مرحبا')).toHaveTextContent('مرحبا');
    await takeSnapshot(`List - preserves RTL unicode content in labels`);
  });

  it('renders long label text in full', async () => {
    const longLabel =
      'This is a very long list item label that should still render correctly without truncating the DOM text content';
    const screen = await render(
      <List items={[{ id: '1', label: longLabel }]} />
    );
    await expect.element(screen.getByText(longLabel)).toHaveTextContent(longLabel);
    await takeSnapshot(`List - renders long label text in full`);
  });

  /* -----------------------------------------------------------------------
   * DOM structure (4)
   * -------------------------------------------------------------------- */

  it('renders each item as an li element', async () => {
    const screen = await render(<List items={basicItems} />);
    const items = getItems(screen.container);
    expect(items.every((el) => el.tagName === 'LI')).toBe(true);
    await takeSnapshot(`List - renders each item as an li element`);
  });

  it('applies padding-inline-start on the list root', async () => {
    const screen = await render(<List items={basicItems} />);
    const list = getList(screen.container);
    await expect.element(locatorFor(list)).toHaveStyle({
      paddingInlineStart: spacing[5],
    });
    await takeSnapshot(`List - applies padding-inline-start on the list root`);
  });

  it('uses flex column layout on the list root', async () => {
    const screen = await render(<List items={basicItems} />);
    const list = getList(screen.container);
    await expect.element(locatorFor(list)).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
    });
    await takeSnapshot(`List - uses flex column layout on the list root`);
  });

  it('styles item labels with slate800 color', async () => {
    const screen = await render(<List items={basicItems} />);
    await expect.element(screen.getByText('First item')).toHaveStyle({
      color: color.slate800,
    });
    await takeSnapshot(`List - styles item labels with slate800 color`);
  });

  /* -----------------------------------------------------------------------
   * Combinations (6)
   * -------------------------------------------------------------------- */

  it('renders kitchen-sink combo: large ordered divided with descriptions', async () => {
    const screen = await render(
      <List
        items={itemsWithDescriptions}
        size="large"
        ordered
        divided
        markerColor={color.green500}
      />
    );
    const list = getList(screen.container);
    expect(list.tagName).toBe('OL');
    await expect
      .element(locatorFor(list))
      .toHaveStyle({ color: color.green500 });
    await expect.element(screen.getByText('Inbox')).toBeInTheDocument();
    await takeSnapshot(
      `List - renders kitchen-sink combo: large ordered divided with descriptions`
    );
  });

  it('renders kitchen-sink combo: small unordered undivided pink markers', async () => {
    const screen = await render(
      <List
        items={basicItems}
        size="small"
        ordered={false}
        divided={false}
        markerColor={color.pink500}
      />
    );
    const list = getList(screen.container);
    expect(list.tagName).toBe('UL');
    await expect
      .element(locatorFor(list))
      .toHaveStyle({ color: color.pink500 });
    await takeSnapshot(
      `List - renders kitchen-sink combo: small unordered undivided pink markers`
    );
  });

  it('renders ordered list with descriptions', async () => {
    const screen = await render(
      <List items={itemsWithDescriptions} ordered />
    );
    expect(getList(screen.container).tagName).toBe('OL');
    await expect.element(screen.getByText('Drafts')).toBeInTheDocument();
    await expect
      .element(screen.getByText('Unsent messages you started'))
      .toBeInTheDocument();
    await takeSnapshot(`List - renders ordered list with descriptions`);
  });

  it('renders divided small list with blue markers', async () => {
    const screen = await render(
      <List
        items={basicItems}
        size="small"
        divided
        markerColor={color.blue500}
      />
    );
    const items = getItems(screen.container);
    await expect
      .element(locatorFor(items[0]))
      .toHaveStyle({ borderBottomStyle: 'solid', fontSize: fontSize[12] });
    await takeSnapshot(
      `List - renders divided small list with blue markers`
    );
  });

  it('renders mixed description presence across items', async () => {
    const screen = await render(
      <List
        items={[
          { id: '1', label: 'Has description', description: 'Yes' },
          { id: '2', label: 'No description' },
        ]}
      />
    );
    await expect.element(screen.getByText('Yes')).toBeInTheDocument();
    await expect.element(screen.getByText('No description')).toBeInTheDocument();
    await takeSnapshot(
      `List - renders mixed description presence across items`
    );
  });

  it('renders numeric-looking labels correctly', async () => {
    const screen = await render(
      <List items={[{ id: '1', label: '42' }, { id: '2', label: '100' }]} />
    );
    await expect.element(screen.getByText('42')).toBeInTheDocument();
    await expect.element(screen.getByText('100')).toBeInTheDocument();
    await takeSnapshot(`List - renders numeric-looking labels correctly`);
  });

  /* -----------------------------------------------------------------------
   * Multi-instance & re-render (5)
   * -------------------------------------------------------------------- */

  it('keeps two independent lists from sharing items', async () => {
    const screen = await render(
      <div>
        <List items={[{ id: 'a', label: 'List A' }]} />
        <List items={[{ id: 'b', label: 'List B' }]} />
      </div>
    );
    await expect.element(screen.getByText('List A')).toBeInTheDocument();
    await expect.element(screen.getByText('List B')).toBeInTheDocument();
    await takeSnapshot(
      `List - keeps two independent lists from sharing items`
    );
  });

  it('updates from unordered to ordered when re-rendered', async () => {
    const screen = await render(<List items={basicItems} ordered={false} />);
    expect(getList(screen.container).tagName).toBe('UL');
    await screen.rerender(<List items={basicItems} ordered />);
    expect(getList(screen.container).tagName).toBe('OL');
    await takeSnapshot(
      `List - updates from unordered to ordered when re-rendered`
    );
  });

  it('updates item content when re-rendered with new items', async () => {
    const screen = await render(
      <List items={[{ id: '1', label: 'Before' }]} />
    );
    await expect.element(screen.getByText('Before')).toBeInTheDocument();
    await screen.rerender(<List items={[{ id: '1', label: 'After' }]} />);
    await expect.element(screen.getByText('After')).toBeInTheDocument();
    await takeSnapshot(
      `List - updates item content when re-rendered with new items`
    );
  });

  it('updates size styles when re-rendered with a new size', async () => {
    const screen = await render(<List items={basicItems} size="small" />);
    let [first] = getItems(screen.container);
    await expect
      .element(locatorFor(first))
      .toHaveStyle({ fontSize: fontSize[12] });
    await screen.rerender(<List items={basicItems} size="large" />);
    [first] = getItems(screen.container);
    await expect
      .element(locatorFor(first))
      .toHaveStyle({ fontSize: fontSize[16] });
    await takeSnapshot(
      `List - updates size styles when re-rendered with a new size`
    );
  });

  it('toggles dividers when re-rendered', async () => {
    const screen = await render(<List items={basicItems} divided={false} />);
    let [first] = getItems(screen.container);
    await expect
      .element(locatorFor(first))
      .toHaveStyle({ borderBottomStyle: 'none' });
    await screen.rerender(<List items={basicItems} divided />);
    [first] = getItems(screen.container);
    await expect
      .element(locatorFor(first))
      .toHaveStyle({ borderBottomStyle: 'solid' });
    await takeSnapshot(`List - toggles dividers when re-rendered`);
  });

  /* -----------------------------------------------------------------------
   * Description size variants (3)
   * -------------------------------------------------------------------- */

  it('uses smaller description font for small size', async () => {
    const screen = await render(
      <List items={itemsWithDescriptions} size="small" />
    );
    await expect
      .element(screen.getByText('Messages waiting for a reply'))
      .toHaveStyle({ fontSize: fontSize[11] });
    await takeSnapshot(
      `List - uses smaller description font for small size`
    );
  });

  it('uses medium description font for medium size', async () => {
    const screen = await render(
      <List items={itemsWithDescriptions} size="medium" />
    );
    await expect
      .element(screen.getByText('Messages waiting for a reply'))
      .toHaveStyle({ fontSize: fontSize[12] });
    await takeSnapshot(
      `List - uses medium description font for medium size`
    );
  });

  it('uses larger description font for large size', async () => {
    const screen = await render(
      <List items={itemsWithDescriptions} size="large" />
    );
    await expect
      .element(screen.getByText('Messages waiting for a reply'))
      .toHaveStyle({ fontSize: fontSize[14] });
    await takeSnapshot(
      `List - uses larger description font for large size`
    );
  });

  /* -----------------------------------------------------------------------
   * Many items (2)
   * -------------------------------------------------------------------- */

  it('renders many items without truncating the count', async () => {
    const many = Array.from({ length: 8 }, (_, i) => ({
      id: String(i + 1),
      label: `Item ${i + 1}`,
    }));
    const screen = await render(<List items={many} />);
    expect(getItems(screen.container)).toHaveLength(8);
    await takeSnapshot(
      `List - renders many items without truncating the count`
    );
  });

  it('renders many divided items with borders on all but the last', async () => {
    const many = Array.from({ length: 5 }, (_, i) => ({
      id: String(i + 1),
      label: `Item ${i + 1}`,
    }));
    const screen = await render(<List items={many} divided />);
    const items = getItems(screen.container);
    for (let i = 0; i < items.length - 1; i++) {
      await expect
        .element(locatorFor(items[i]))
        .toHaveStyle({ borderBottomStyle: 'solid' });
    }
    await expect
      .element(locatorFor(items[items.length - 1]))
      .toHaveStyle({ borderBottomStyle: 'none' });
    await takeSnapshot(
      `List - renders many divided items with borders on all but the last`
    );
  });

  /* -----------------------------------------------------------------------
   * Explicit ordered false (1)
   * -------------------------------------------------------------------- */

  it('renders as UL when ordered is explicitly false', async () => {
    const screen = await render(<List items={basicItems} ordered={false} />);
    expect(getList(screen.container).tagName).toBe('UL');
    await takeSnapshot(
      `List - renders as UL when ordered is explicitly false`
    );
  });

  /* -----------------------------------------------------------------------
   * Purple marker combo (1)
   * -------------------------------------------------------------------- */

  it('applies purple marker color with large size', async () => {
    const screen = await render(
      <List
        items={itemsWithDescriptions}
        size="large"
        markerColor={color.purple500}
      />
    );
    const list = getList(screen.container);
    await expect
      .element(locatorFor(list))
      .toHaveStyle({ color: color.purple500 });
    await takeSnapshot(
      `List - applies purple marker color with large size`
    );
  });

  /* -----------------------------------------------------------------------
   * Additional coverage (4)
   * -------------------------------------------------------------------- */

  it('applies cyan marker color when provided', async () => {
    const screen = await render(
      <List items={basicItems} markerColor={color.cyan500} />
    );
    await expect
      .element(locatorFor(getList(screen.container)))
      .toHaveStyle({ color: color.cyan500 });
    await takeSnapshot(`List - applies cyan marker color when provided`);
  });

  it('applies yellow marker color when provided', async () => {
    const screen = await render(
      <List items={basicItems} markerColor={color.yellow500} />
    );
    await expect
      .element(locatorFor(getList(screen.container)))
      .toHaveStyle({ color: color.yellow500 });
    await takeSnapshot(`List - applies yellow marker color when provided`);
  });

  it('renders a two-item ordered list with correct count and tag', async () => {
    const screen = await render(
      <List
        items={[
          { id: 'a', label: 'Step one' },
          { id: 'b', label: 'Step two' },
        ]}
        ordered
      />
    );
    expect(getList(screen.container).tagName).toBe('OL');
    expect(getItems(screen.container)).toHaveLength(2);
    await expect.element(screen.getByText('Step one')).toBeInTheDocument();
    await takeSnapshot(
      `List - renders a two-item ordered list with correct count and tag`
    );
  });

  it('renders four divided items and exposes all labels', async () => {
    const screen = await render(
      <List
        items={[
          { id: '1', label: 'Alpha' },
          { id: '2', label: 'Beta' },
          { id: '3', label: 'Gamma' },
          { id: '4', label: 'Delta' },
        ]}
        divided
      />
    );
    expect(getItems(screen.container)).toHaveLength(4);
    await expect.element(screen.getByText('Alpha')).toBeInTheDocument();
    await expect.element(screen.getByText('Delta')).toBeInTheDocument();
    await takeSnapshot(
      `List - renders four divided items and exposes all labels`
    );
  });
});
