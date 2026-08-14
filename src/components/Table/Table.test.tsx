import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import Table from './Table';
import { color } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

const locatorFor = (element: HTMLElement) => page.elementLocator(element);

/**
 * Resolves a token color (hex/hsl string) to the canonical computed `rgb(...)`
 * string the browser reports via CSSOM / getComputedStyle.
 */
function computedColor(tokenColor: string): string {
  const probe = document.createElement('span');
  probe.style.color = tokenColor;
  document.body.appendChild(probe);
  const value = getComputedStyle(probe).color;
  document.body.removeChild(probe);
  return value;
}

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'role', header: 'Role' },
  { key: 'status', header: 'Status' },
];

const data = [
  { name: 'Alice', role: 'Engineer', status: 'Active' },
  { name: 'Bob', role: 'Designer', status: 'Away' },
  { name: 'Carol', role: 'PM', status: 'Active' },
];

const getTable = (container: HTMLElement) =>
  container.querySelector('table') as HTMLTableElement;

describe('Table', () => {
  it('renders a table element', async () => {
    const screen = await render(<Table columns={columns} data={data} />);
    expect(getTable(screen.container)).not.toBeNull();
    await takeSnapshot(`Table - renders a table element`);
  });

  it('renders column headers from columns prop', async () => {
    const screen = await render(<Table columns={columns} data={data} />);
    await expect.element(screen.getByText('Name')).toBeInTheDocument();
    await expect.element(screen.getByText('Role')).toBeInTheDocument();
    await expect.element(screen.getByText('Status')).toBeInTheDocument();
    await takeSnapshot(`Table - renders column headers from columns prop`);
  });

  it('renders cell values from data rows', async () => {
    const screen = await render(<Table columns={columns} data={data} />);
    await expect.element(screen.getByText('Alice')).toBeInTheDocument();
    await expect.element(screen.getByText('Designer')).toBeInTheDocument();
    await takeSnapshot(`Table - renders cell values from data rows`);
  });

  it('renders thead and tbody sections', async () => {
    const screen = await render(<Table columns={columns} data={data} />);
    const table = getTable(screen.container);
    expect(table.querySelector('thead')).not.toBeNull();
    expect(table.querySelector('tbody')).not.toBeNull();
    await takeSnapshot(`Table - renders thead and tbody sections`);
  });

  it('renders one header row', async () => {
    const screen = await render(<Table columns={columns} data={data} />);
    const theadRows = getTable(screen.container).querySelectorAll('thead tr');
    expect(theadRows.length).toBe(1);
    await takeSnapshot(`Table - renders one header row`);
  });

  it('renders one body row per data item', async () => {
    const screen = await render(<Table columns={columns} data={data} />);
    const bodyRows = getTable(screen.container).querySelectorAll('tbody tr');
    expect(bodyRows.length).toBe(3);
    await takeSnapshot(`Table - renders one body row per data item`);
  });

  it('renders the correct number of th cells', async () => {
    const screen = await render(<Table columns={columns} data={data} />);
    expect(getTable(screen.container).querySelectorAll('th').length).toBe(3);
    await takeSnapshot(`Table - renders the correct number of th cells`);
  });

  it('renders the correct number of td cells', async () => {
    const screen = await render(<Table columns={columns} data={data} />);
    expect(getTable(screen.container).querySelectorAll('td').length).toBe(9);
    await takeSnapshot(`Table - renders the correct number of td cells`);
  });

  it('renders a caption when provided', async () => {
    const screen = await render(
      <Table columns={columns} data={data} caption="Team roster" />
    );
    await expect.element(screen.getByText('Team roster')).toBeInTheDocument();
    expect(getTable(screen.container).querySelector('caption')).not.toBeNull();
    await takeSnapshot(`Table - renders a caption when provided`);
  });

  it('does not render a caption when omitted', async () => {
    const screen = await render(<Table columns={columns} data={data} />);
    expect(getTable(screen.container).querySelector('caption')).toBeNull();
    await takeSnapshot(`Table - does not render a caption when omitted`);
  });

  it('applies striped background on odd rows', async () => {
    const screen = await render(<Table columns={columns} data={data} striped />);
    const rows = getTable(screen.container).querySelectorAll('tbody tr');
    const oddTd = rows[1].querySelector('td') as HTMLElement;
    expect(oddTd.style.backgroundColor).toBe(computedColor(color.slate50));
    await takeSnapshot(`Table - applies striped background on odd rows`);
  });

  it('keeps even rows white when striped', async () => {
    const screen = await render(<Table columns={columns} data={data} striped />);
    const rows = getTable(screen.container).querySelectorAll('tbody tr');
    const evenTd = rows[0].querySelector('td') as HTMLElement;
    expect(evenTd.style.backgroundColor).toBe(computedColor(color.white));
    await takeSnapshot(`Table - keeps even rows white when striped`);
  });

  it('does not stripe when striped is false', async () => {
    const screen = await render(<Table columns={columns} data={data} striped={false} />);
    const rows = getTable(screen.container).querySelectorAll('tbody tr');
    const oddTd = rows[1].querySelector('td') as HTMLElement;
    expect(oddTd.style.backgroundColor).toBe(computedColor(color.white));
    await takeSnapshot(`Table - does not stripe when striped is false`);
  });

  it('applies bordered styles on the table', async () => {
    const screen = await render(<Table columns={columns} data={data} bordered />);
    const table = getTable(screen.container);
    expect(table.style.border).toContain('1px');
    await takeSnapshot(`Table - applies bordered styles on the table`);
  });

  it('has no outer border when bordered is false', async () => {
    const screen = await render(<Table columns={columns} data={data} bordered={false} />);
    expect(['', 'none']).toContain(getTable(screen.container).style.border);
    await takeSnapshot(`Table - has no outer border when bordered is false`);
  });

  it('uses compact font size when compact is true', async () => {
    const screen = await render(<Table columns={columns} data={data} compact />);
    await expect.element(locatorFor(getTable(screen.container))).toHaveStyle({ fontSize: '0.75rem' });
    await takeSnapshot(`Table - uses compact font size when compact is true`);
  });

  it('uses default font size when compact is false', async () => {
    const screen = await render(<Table columns={columns} data={data} />);
    await expect.element(locatorFor(getTable(screen.container))).toHaveStyle({ fontSize: '0.875rem' });
    await takeSnapshot(`Table - uses default font size when compact is false`);
  });

  it('uses compact cell padding when compact is true', async () => {
    const screen = await render(<Table columns={columns} data={data} compact />);
    const td = getTable(screen.container).querySelector('td') as HTMLElement;
    expect(td.style.padding).toBe('0.25rem 0.5rem');
    await takeSnapshot(`Table - uses compact cell padding when compact is true`);
  });

  it('uses default cell padding when compact is false', async () => {
    const screen = await render(<Table columns={columns} data={data} />);
    const td = getTable(screen.container).querySelector('td') as HTMLElement;
    expect(td.style.padding).toBe('0.75rem 1rem');
    await takeSnapshot(`Table - uses default cell padding when compact is false`);
  });

  it('applies column width to th elements', async () => {
    const cols = [
      { key: 'id', header: 'ID', width: '60px' },
      { key: 'name', header: 'Name' },
    ];
    const screen = await render(
      <Table columns={cols} data={[{ id: '1', name: 'Ada' }]} />
    );
    const th = getTable(screen.container).querySelector('th') as HTMLElement;
    expect(th.style.width).toBe('60px');
    await takeSnapshot(`Table - applies column width to th elements`);
  });

  it('renders empty tbody when data is empty', async () => {
    const screen = await render(<Table columns={columns} data={[]} />);
    expect(getTable(screen.container).querySelectorAll('tbody tr').length).toBe(0);
    await takeSnapshot(`Table - renders empty tbody when data is empty`);
  });

  it('still renders headers when data is empty', async () => {
    const screen = await render(<Table columns={columns} data={[]} />);
    await expect.element(screen.getByText('Name')).toBeInTheDocument();
    await takeSnapshot(`Table - still renders headers when data is empty`);
  });

  it('renders a single row table', async () => {
    const screen = await render(
      <Table columns={columns} data={[{ name: 'Solo', role: 'Founder', status: 'Active' }]} />
    );
    expect(getTable(screen.container).querySelectorAll('tbody tr').length).toBe(1);
    await takeSnapshot(`Table - renders a single row table`);
  });

  it('renders missing cell keys as empty', async () => {
    const screen = await render(<Table columns={columns} data={[{ name: 'Partial' }]} />);
    const tds = getTable(screen.container).querySelectorAll('tbody td');
    expect(tds.length).toBe(3);
    expect(tds[0].textContent).toBe('Partial');
    expect(tds[1].textContent).toBe('');
    await takeSnapshot(`Table - renders missing cell keys as empty`);
  });

  it('renders ReactNode cell content', async () => {
    const screen = await render(
      <Table
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'badge', header: 'Badge' },
        ]}
        data={[
          {
            name: 'Alice',
            badge: <span data-testid="badge">OK</span>,
          },
        ]}
      />
    );
    await expect.element(screen.getByText('OK')).toBeInTheDocument();
    await takeSnapshot(`Table - renders ReactNode cell content`);
  });

  it('renders numeric cell values', async () => {
    const screen = await render(
      <Table
        columns={[
          { key: 'metric', header: 'Metric' },
          { key: 'value', header: 'Value' },
        ]}
        data={[{ metric: 'Users', value: 1280 }]}
      />
    );
    await expect.element(screen.getByText('1280')).toBeInTheDocument();
    await takeSnapshot(`Table - renders numeric cell values`);
  });

  it('renders zero as a cell value', async () => {
    const screen = await render(
      <Table
        columns={[
          { key: 'label', header: 'Label' },
          { key: 'count', header: 'Count' },
        ]}
        data={[{ label: 'Errors', count: 0 }]}
      />
    );
    await expect.element(screen.getByText('0')).toBeInTheDocument();
    await takeSnapshot(`Table - renders zero as a cell value`);
  });

  it('renders emoji cell content', async () => {
    const screen = await render(
      <Table
        columns={[
          { key: 'item', header: 'Item' },
          { key: 'mood', header: 'Mood' },
        ]}
        data={[{ item: 'Launch', mood: '🚀' }]}
      />
    );
    await expect.element(screen.getByText('🚀')).toBeInTheDocument();
    await takeSnapshot(`Table - renders emoji cell content`);
  });

  it('renders RTL cell content', async () => {
    const screen = await render(
      <Table
        columns={[
          { key: 'name', header: 'الاسم' },
          { key: 'city', header: 'المدينة' },
        ]}
        data={[{ name: 'أحمد', city: 'القاهرة' }]}
      />
    );
    await expect.element(screen.getByText('أحمد')).toBeInTheDocument();
    await takeSnapshot(`Table - renders RTL cell content`);
  });

  it('kitchen-sink: striped bordered compact with caption', async () => {
    const screen = await render(
      <Table
        columns={columns}
        data={data}
        striped
        bordered
        compact
        caption="Kitchen sink"
      />
    );
    await expect.element(screen.getByText('Kitchen sink')).toBeInTheDocument();
    await expect.element(locatorFor(getTable(screen.container))).toHaveStyle({ fontSize: '0.75rem' });
    await takeSnapshot(`Table - kitchen-sink: striped bordered compact with caption`);
  });

  it('updates striped when re-rendered', async () => {
    const screen = await render(<Table columns={columns} data={data} striped={false} />);
    let oddTd = getTable(screen.container).querySelectorAll('tbody tr')[1].querySelector('td') as HTMLElement;
    expect(oddTd.style.backgroundColor).toBe(computedColor(color.white));
    await screen.rerender(<Table columns={columns} data={data} striped />);
    oddTd = getTable(screen.container).querySelectorAll('tbody tr')[1].querySelector('td') as HTMLElement;
    expect(oddTd.style.backgroundColor).toBe(computedColor(color.slate50));
    await takeSnapshot(`Table - updates striped when re-rendered`);
  });

  it('updates compact when re-rendered', async () => {
    const screen = await render(<Table columns={columns} data={data} compact={false} />);
    await expect.element(locatorFor(getTable(screen.container))).toHaveStyle({ fontSize: '0.875rem' });
    await screen.rerender(<Table columns={columns} data={data} compact />);
    await expect.element(locatorFor(getTable(screen.container))).toHaveStyle({ fontSize: '0.75rem' });
    await takeSnapshot(`Table - updates compact when re-rendered`);
  });

  it('updates caption when re-rendered', async () => {
    const screen = await render(<Table columns={columns} data={data} caption="One" />);
    await expect.element(screen.getByText('One')).toBeInTheDocument();
    await screen.rerender(<Table columns={columns} data={data} caption="Two" />);
    await expect.element(screen.getByText('Two')).toBeInTheDocument();
    await takeSnapshot(`Table - updates caption when re-rendered`);
  });

  it('table width is 100%', async () => {
    const screen = await render(<Table columns={columns} data={data} />);
    expect(getTable(screen.container).style.width).toBe('100%');
    await takeSnapshot(`Table - table width is 100%`);
  });

  it('uses border-collapse collapse', async () => {
    const screen = await render(<Table columns={columns} data={data} />);
    expect(getTable(screen.container).style.borderCollapse).toBe('collapse');
    await takeSnapshot(`Table - uses border-collapse collapse`);
  });

  it('header cells use semibold font weight', async () => {
    const screen = await render(<Table columns={columns} data={data} />);
    const th = getTable(screen.container).querySelector('th') as HTMLElement;
    expect(th.style.fontWeight).toBe('600');
    await takeSnapshot(`Table - header cells use semibold font weight`);
  });

  it('header cells use slate100 background', async () => {
    const screen = await render(<Table columns={columns} data={data} />);
    const th = getTable(screen.container).querySelector('th') as HTMLElement;
    expect(th.style.backgroundColor).toBe(computedColor(color.slate100));
    await takeSnapshot(`Table - header cells use slate100 background`);
  });

  it('caption uses top caption-side', async () => {
    const screen = await render(
      <Table columns={columns} data={data} caption="Cap" />
    );
    const caption = getTable(screen.container).querySelector('caption') as HTMLElement;
    expect(caption.style.captionSide).toBe('top');
    await takeSnapshot(`Table - caption uses top caption-side`);
  });

  it('renders two independent tables', async () => {
    const screen = await render(
      <div>
        <Table columns={columns} data={data} caption="First" />
        <Table columns={columns} data={data} caption="Second" />
      </div>
    );
    expect(screen.container.querySelectorAll('table').length).toBe(2);
    await takeSnapshot(`Table - renders two independent tables`);
  });

  it('single column table renders correctly', async () => {
    const screen = await render(
      <Table
        columns={[{ key: 'item', header: 'Items' }]}
        data={[{ item: 'One' }, { item: 'Two' }]}
      />
    );
    expect(getTable(screen.container).querySelectorAll('th').length).toBe(1);
    expect(getTable(screen.container).querySelectorAll('tbody tr').length).toBe(2);
    await takeSnapshot(`Table - single column table renders correctly`);
  });

  it('many columns render five headers', async () => {
    const cols = ['a', 'b', 'c', 'd', 'e'].map((k) => ({ key: k, header: k.toUpperCase() }));
    const screen = await render(
      <Table columns={cols} data={[{ a: '1', b: '2', c: '3', d: '4', e: '5' }]} />
    );
    expect(getTable(screen.container).querySelectorAll('th').length).toBe(5);
    await takeSnapshot(`Table - many columns render five headers`);
  });

  it('many rows render twelve body rows', async () => {
    const rows = Array.from({ length: 12 }, (_, i) => ({
      name: `User ${i + 1}`,
      role: 'Engineer',
      status: 'Active',
    }));
    const screen = await render(<Table columns={columns} data={rows} />);
    expect(getTable(screen.container).querySelectorAll('tbody tr').length).toBe(12);
    await takeSnapshot(`Table - many rows render twelve body rows`);
  });

  it('long cell content is preserved in the DOM', async () => {
    const long =
      'This is a very long description that exercises wrapping and layout of wide cell content inside the table body.';
    const screen = await render(
      <Table
        columns={[
          { key: 'title', header: 'Title' },
          { key: 'description', header: 'Description' },
        ]}
        data={[{ title: 'Long row', description: long }]}
      />
    );
    await expect.element(screen.getByText(long)).toBeInTheDocument();
    await takeSnapshot(`Table - long cell content is preserved in the DOM`);
  });

  it('empty string caption still renders a caption element', async () => {
    const screen = await render(<Table columns={columns} data={data} caption="" />);
    expect(getTable(screen.container).querySelector('caption')).not.toBeNull();
    await takeSnapshot(`Table - empty string caption still renders a caption element`);
  });

  it('bordered and striped together still stripe odd rows', async () => {
    const screen = await render(
      <Table columns={columns} data={data} bordered striped />
    );
    const oddTd = getTable(screen.container).querySelectorAll('tbody tr')[1].querySelector('td') as HTMLElement;
    expect(oddTd.style.backgroundColor).toBe(computedColor(color.slate50));
    await takeSnapshot(`Table - bordered and striped together still stripe odd rows`);
  });

  it('text color is slate800', async () => {
    const screen = await render(<Table columns={columns} data={data} />);
    await expect.element(locatorFor(getTable(screen.container))).toHaveStyle({ color: color.slate800 });
    await takeSnapshot(`Table - text color is slate800`);
  });

  it('background color is white', async () => {
    const screen = await render(<Table columns={columns} data={data} />);
    await expect.element(locatorFor(getTable(screen.container))).toHaveStyle({ backgroundColor: color.white });
    await takeSnapshot(`Table - background color is white`);
  });

  it('th text aligns left', async () => {
    const screen = await render(<Table columns={columns} data={data} />);
    const th = getTable(screen.container).querySelector('th') as HTMLElement;
    expect(th.style.textAlign).toBe('left');
    await takeSnapshot(`Table - th text aligns left`);
  });

  it('renders without throwing with minimal props', async () => {
    const screen = await render(<Table columns={columns} data={data} />);
    expect(getTable(screen.container)).not.toBeNull();
    await takeSnapshot(`Table - renders without throwing with minimal props`);
  });

  it('updates bordered when re-rendered', async () => {
    const screen = await render(<Table columns={columns} data={data} bordered={false} />);
    expect(['', 'none']).toContain(getTable(screen.container).style.border);
    await screen.rerender(<Table columns={columns} data={data} bordered />);
    expect(getTable(screen.container).style.border).toContain('1px');
    await takeSnapshot(`Table - updates bordered when re-rendered`);
  });

});
