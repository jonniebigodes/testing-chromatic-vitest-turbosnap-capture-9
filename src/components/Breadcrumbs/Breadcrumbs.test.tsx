import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import Breadcrumbs from './Breadcrumbs';
import type { BreadcrumbItem } from './Breadcrumbs';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

const locatorFor = (element: HTMLElement) => page.elementLocator(element);

const getNav = (container: HTMLElement) =>
  container.querySelector('nav') as HTMLElement;

const getList = (container: HTMLElement) =>
  container.querySelector('ol') as HTMLElement;

const getItems = (container: HTMLElement) =>
  Array.from(getList(container).querySelectorAll(':scope > li'));

const basicItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Shoes', current: true },
];

const deepItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Catalog', href: '/catalog' },
  { label: 'Men', href: '/catalog/men' },
  { label: 'Footwear', href: '/catalog/men/footwear' },
  { label: 'Running', current: true },
];

describe('Breadcrumbs', () => {
  it('renders a nav landmark with breadcrumb label', async () => {
    const screen = await render(<Breadcrumbs items={basicItems} />);
    await expect
      .element(screen.getByLabelText('Breadcrumb'))
      .toBeInTheDocument();
    await takeSnapshot(`Breadcrumbs - renders a nav landmark with breadcrumb label`);
  });

  it('renders an ordered list inside the nav', async () => {
    const screen = await render(<Breadcrumbs items={basicItems} />);
    expect(getList(screen.container).tagName).toBe('OL');
    await takeSnapshot(`Breadcrumbs - renders an ordered list inside the nav`);
  });

  it('renders each provided item label', async () => {
    const screen = await render(<Breadcrumbs items={basicItems} />);
    await expect.element(screen.getByText('Home')).toBeInTheDocument();
    await expect.element(screen.getByText('Products')).toBeInTheDocument();
    await expect.element(screen.getByText('Shoes')).toBeInTheDocument();
    await takeSnapshot(`Breadcrumbs - renders each provided item label`);
  });

  it('defaults to medium size font size', async () => {
    const screen = await render(<Breadcrumbs items={basicItems} />);
    await expect.element(screen.getByText('Shoes')).toHaveStyle({
      fontSize: fontSize[14],
    });
    await takeSnapshot(`Breadcrumbs - defaults to medium size font size`);
  });

  it('applies small size font size', async () => {
    const screen = await render(
      <Breadcrumbs items={basicItems} size="small" />,
    );
    await expect.element(screen.getByText('Shoes')).toHaveStyle({
      fontSize: fontSize[12],
    });
    await takeSnapshot(`Breadcrumbs - applies small size font size`);
  });

  it('applies medium size font size', async () => {
    const screen = await render(
      <Breadcrumbs items={basicItems} size="medium" />,
    );
    await expect.element(screen.getByText('Shoes')).toHaveStyle({
      fontSize: fontSize[14],
    });
    await takeSnapshot(`Breadcrumbs - applies medium size font size`);
  });

  it('applies large size font size', async () => {
    const screen = await render(
      <Breadcrumbs items={basicItems} size="large" />,
    );
    await expect.element(screen.getByText('Shoes')).toHaveStyle({
      fontSize: fontSize[16],
    });
    await takeSnapshot(`Breadcrumbs - applies large size font size`);
  });

  it('marks the current item with aria-current page', async () => {
    const screen = await render(<Breadcrumbs items={basicItems} />);
    await expect
      .element(screen.getByText('Shoes'))
      .toHaveAttribute('aria-current', 'page');
    await takeSnapshot(
      `Breadcrumbs - marks the current item with aria-current page`,
    );
  });

  it('does not render the current item as a link', async () => {
    const screen = await render(<Breadcrumbs items={basicItems} />);
    const current = screen.container.querySelector('[aria-current="page"]');
    expect(current?.tagName).toBe('SPAN');
    await takeSnapshot(
      `Breadcrumbs - does not render the current item as a link`,
    );
  });

  it('renders prior items as anchors when href is provided', async () => {
    const screen = await render(<Breadcrumbs items={basicItems} />);
    await expect
      .element(screen.getByRole('link', { name: 'Home' }))
      .toHaveAttribute('href', '/');
    await takeSnapshot(
      `Breadcrumbs - renders prior items as anchors when href is provided`,
    );
  });

  it('renders the default slash separator', async () => {
    const screen = await render(<Breadcrumbs items={basicItems} />);
    const separators = Array.from(
      screen.container.querySelectorAll('[aria-hidden="true"]'),
    );
    expect(separators.length).toBe(2);
    expect(separators[0].textContent).toBe('/');
    await takeSnapshot(`Breadcrumbs - renders the default slash separator`);
  });

  it('renders a custom chevron separator', async () => {
    const screen = await render(
      <Breadcrumbs items={basicItems} separator=">" />,
    );
    const separators = Array.from(
      screen.container.querySelectorAll('[aria-hidden="true"]'),
    );
    expect(separators[0].textContent).toBe('>');
    await takeSnapshot(`Breadcrumbs - renders a custom chevron separator`);
  });

  it('renders a custom arrow separator', async () => {
    const screen = await render(
      <Breadcrumbs items={basicItems} separator="→" />,
    );
    const separators = Array.from(
      screen.container.querySelectorAll('[aria-hidden="true"]'),
    );
    expect(separators[0].textContent).toBe('→');
    await takeSnapshot(`Breadcrumbs - renders a custom arrow separator`);
  });

  it('does not render a separator after the last item', async () => {
    const screen = await render(<Breadcrumbs items={basicItems} />);
    const items = getItems(screen.container);
    const last = items[items.length - 1];
    expect(last.querySelector('[aria-hidden="true"]')).toBeNull();
    await takeSnapshot(
      `Breadcrumbs - does not render a separator after the last item`,
    );
  });

  it('renders the correct number of list items', async () => {
    const screen = await render(<Breadcrumbs items={basicItems} />);
    expect(getItems(screen.container)).toHaveLength(3);
    await takeSnapshot(`Breadcrumbs - renders the correct number of list items`);
  });

  it('renders a deep trail with five items', async () => {
    const screen = await render(<Breadcrumbs items={deepItems} />);
    expect(getItems(screen.container)).toHaveLength(5);
    await expect.element(screen.getByText('Running')).toBeInTheDocument();
    await takeSnapshot(`Breadcrumbs - renders a deep trail with five items`);
  });

  it('renders a single current item without separators', async () => {
    const screen = await render(
      <Breadcrumbs items={[{ label: 'Dashboard', current: true }]} />,
    );
    expect(getItems(screen.container)).toHaveLength(1);
    expect(screen.container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(0);
    await takeSnapshot(
      `Breadcrumbs - renders a single current item without separators`,
    );
  });

  it('treats the last item as current when current is omitted', async () => {
    const screen = await render(
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Docs' },
        ]}
      />,
    );
    await expect
      .element(screen.getByText('Docs'))
      .toHaveAttribute('aria-current', 'page');
    await takeSnapshot(
      `Breadcrumbs - treats the last item as current when current is omitted`,
    );
  });

  it('styles the current item with semibold weight', async () => {
    const screen = await render(<Breadcrumbs items={basicItems} />);
    await expect.element(screen.getByText('Shoes')).toHaveStyle({
      fontWeight: String(fontWeight.semibold),
    });
    await takeSnapshot(
      `Breadcrumbs - styles the current item with semibold weight`,
    );
  });

  it('styles the current item with slate800 color', async () => {
    const screen = await render(<Breadcrumbs items={basicItems} />);
    await expect.element(screen.getByText('Shoes')).toHaveStyle({
      color: color.slate800,
    });
    await takeSnapshot(
      `Breadcrumbs - styles the current item with slate800 color`,
    );
  });

  it('styles links with blue600 color', async () => {
    const screen = await render(<Breadcrumbs items={basicItems} />);
    await expect
      .element(screen.getByRole('link', { name: 'Home' }))
      .toHaveStyle({ color: color.blue600 });
    await takeSnapshot(`Breadcrumbs - styles links with blue600 color`);
  });

  it('uses flex layout on the ordered list', async () => {
    const screen = await render(<Breadcrumbs items={basicItems} />);
    await expect.element(locatorFor(getList(screen.container))).toHaveStyle({
      display: 'flex',
    });
    await takeSnapshot(`Breadcrumbs - uses flex layout on the ordered list`);
  });

  it('preserves emoji content in labels', async () => {
    const screen = await render(
      <Breadcrumbs
        items={[
          { label: '🏠 Home', href: '/' },
          { label: '✨ Details', current: true },
        ]}
      />,
    );
    await expect.element(screen.getByText('🏠 Home')).toBeInTheDocument();
    await takeSnapshot(`Breadcrumbs - preserves emoji content in labels`);
  });

  it('preserves RTL unicode content', async () => {
    const screen = await render(
      <Breadcrumbs
        items={[
          { label: 'الرئيسية', href: '/' },
          { label: 'التفاصيل', current: true },
        ]}
      />,
    );
    await expect.element(screen.getByText('التفاصيل')).toBeInTheDocument();
    await takeSnapshot(`Breadcrumbs - preserves RTL unicode content`);
  });

  it('renders long labels in full', async () => {
    const long = 'Organization Settings Console Workspace';
    const screen = await render(
      <Breadcrumbs
        items={[
          { label: long, href: '/' },
          { label: 'Current', current: true },
        ]}
      />,
    );
    await expect.element(screen.getByText(long)).toBeInTheDocument();
    await takeSnapshot(`Breadcrumbs - renders long labels in full`);
  });

  it('renders empty items without throwing', async () => {
    const screen = await render(<Breadcrumbs items={[]} />);
    expect(getItems(screen.container)).toHaveLength(0);
    await takeSnapshot(`Breadcrumbs - renders empty items without throwing`);
  });

  it('renders items without href as spans', async () => {
    const screen = await render(
      <Breadcrumbs
        items={[
          { label: 'Section' },
          { label: 'Current', current: true },
        ]}
      />,
    );
    expect(screen.container.querySelectorAll('a')).toHaveLength(0);
    await takeSnapshot(`Breadcrumbs - renders items without href as spans`);
  });

  it('renders a pipe separator when provided', async () => {
    const screen = await render(
      <Breadcrumbs items={basicItems} separator="|" />,
    );
    const separators = Array.from(
      screen.container.querySelectorAll('[aria-hidden="true"]'),
    );
    expect(separators[0].textContent).toBe('|');
    await takeSnapshot(`Breadcrumbs - renders a pipe separator when provided`);
  });

  it('renders a dot separator when provided', async () => {
    const screen = await render(
      <Breadcrumbs items={basicItems} separator="·" />,
    );
    const separators = Array.from(
      screen.container.querySelectorAll('[aria-hidden="true"]'),
    );
    expect(separators[0].textContent).toBe('·');
    await takeSnapshot(`Breadcrumbs - renders a dot separator when provided`);
  });

  it('renders a custom ReactNode separator', async () => {
    const screen = await render(
      <Breadcrumbs
        items={basicItems}
        separator={<span data-testid="sep">»</span>}
      />,
    );
    expect(screen.container.querySelectorAll('[data-testid="sep"]').length).toBeGreaterThan(0);
    await takeSnapshot(`Breadcrumbs - renders a custom ReactNode separator`);
  });

  it('applies small gap spacing between items', async () => {
    const screen = await render(
      <Breadcrumbs items={basicItems} size="small" />,
    );
    await expect.element(locatorFor(getList(screen.container))).toHaveStyle({
      gap: spacing[1],
    });
    await takeSnapshot(`Breadcrumbs - applies small gap spacing between items`);
  });

  it('applies medium gap spacing between items', async () => {
    const screen = await render(
      <Breadcrumbs items={basicItems} size="medium" />,
    );
    await expect.element(locatorFor(getList(screen.container))).toHaveStyle({
      gap: spacing[2],
    });
    await takeSnapshot(`Breadcrumbs - applies medium gap spacing between items`);
  });

  it('applies large gap spacing between items', async () => {
    const screen = await render(
      <Breadcrumbs items={basicItems} size="large" />,
    );
    await expect.element(locatorFor(getList(screen.container))).toHaveStyle({
      gap: spacing[3],
    });
    await takeSnapshot(`Breadcrumbs - applies large gap spacing between items`);
  });

  it('keeps two independent trails from sharing content', async () => {
    const screen = await render(
      <>
        <Breadcrumbs items={basicItems} />
        <Breadcrumbs
          items={[
            { label: 'Account', href: '/account' },
            { label: 'Security', current: true },
          ]}
        />
      </>,
    );
    await expect.element(screen.getByText('Shoes')).toBeInTheDocument();
    await expect.element(screen.getByText('Security')).toBeInTheDocument();
    await takeSnapshot(
      `Breadcrumbs - keeps two independent trails from sharing content`,
    );
  });

  it('updates labels when re-rendered with new items', async () => {
    const screen = await render(<Breadcrumbs items={basicItems} />);
    await screen.rerender(
      <Breadcrumbs
        items={[
          { label: 'App', href: '/' },
          { label: 'Nav', current: true },
        ]}
      />,
    );
    await expect.element(screen.getByText('Nav')).toBeInTheDocument();
    await takeSnapshot(
      `Breadcrumbs - updates labels when re-rendered with new items`,
    );
  });

  it('updates size styles when re-rendered', async () => {
    const screen = await render(
      <Breadcrumbs items={basicItems} size="small" />,
    );
    await screen.rerender(<Breadcrumbs items={basicItems} size="large" />);
    await expect.element(screen.getByText('Shoes')).toHaveStyle({
      fontSize: fontSize[16],
    });
    await takeSnapshot(`Breadcrumbs - updates size styles when re-rendered`);
  });

  it('updates separator when re-rendered', async () => {
    const screen = await render(
      <Breadcrumbs items={basicItems} separator="/" />,
    );
    await screen.rerender(
      <Breadcrumbs items={basicItems} separator=">" />,
    );
    const separators = Array.from(
      screen.container.querySelectorAll('[aria-hidden="true"]'),
    );
    expect(separators[0].textContent).toBe('>');
    await takeSnapshot(`Breadcrumbs - updates separator when re-rendered`);
  });

  it('renders numeric labels correctly', async () => {
    const screen = await render(
      <Breadcrumbs
        items={[
          { label: '2024', href: '/2024' },
          { label: '42', current: true },
        ]}
      />,
    );
    await expect.element(screen.getByText('42')).toBeInTheDocument();
    await takeSnapshot(`Breadcrumbs - renders numeric labels correctly`);
  });

  it('renders short punchy labels correctly', async () => {
    const screen = await render(
      <Breadcrumbs
        items={[
          { label: 'App', href: '/' },
          { label: 'UI', href: '/ui' },
          { label: 'Nav', current: true },
        ]}
      />,
    );
    await expect.element(screen.getByText('Nav')).toBeInTheDocument();
    await takeSnapshot(`Breadcrumbs - renders short punchy labels correctly`);
  });

  it('renders six items with five separators', async () => {
    const items = Array.from({ length: 6 }, (_, i) => ({
      label: `L${i + 1}`,
      href: i < 5 ? `/${i + 1}` : undefined,
      current: i === 5,
    }));
    const screen = await render(<Breadcrumbs items={items} />);
    expect(getItems(screen.container)).toHaveLength(6);
    expect(screen.container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(5);
    await takeSnapshot(
      `Breadcrumbs - renders six items with five separators`,
    );
  });

  it('honors explicit current on a middle item', async () => {
    const screen = await render(
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Archive', href: '/archive', current: true },
          { label: 'Ignored', href: '/ignored' },
        ]}
      />,
    );
    await expect
      .element(screen.getByText('Archive'))
      .toHaveAttribute('aria-current', 'page');
    await takeSnapshot(
      `Breadcrumbs - honors explicit current on a middle item`,
    );
  });

  it('applies list-style none on the ordered list', async () => {
    const screen = await render(<Breadcrumbs items={basicItems} />);
    await expect.element(locatorFor(getList(screen.container))).toHaveStyle({
      listStyle: 'none',
    });
    await takeSnapshot(
      `Breadcrumbs - applies list-style none on the ordered list`,
    );
  });

  it('renders Products link with products href', async () => {
    const screen = await render(<Breadcrumbs items={basicItems} />);
    await expect
      .element(screen.getByRole('link', { name: 'Products' }))
      .toHaveAttribute('href', '/products');
    await takeSnapshot(
      `Breadcrumbs - renders Products link with products href`,
    );
  });

  it('styles separators with slate400 color', async () => {
    const screen = await render(<Breadcrumbs items={basicItems} />);
    const sep = screen.container.querySelector(
      '[aria-hidden="true"]',
    ) as HTMLElement;
    await expect.element(locatorFor(sep)).toHaveStyle({
      color: color.slate400,
    });
    await takeSnapshot(`Breadcrumbs - styles separators with slate400 color`);
  });

  it('renders kitchen-sink large deep chevron trail', async () => {
    const screen = await render(
      <Breadcrumbs items={deepItems} size="large" separator=">" />,
    );
    await expect.element(screen.getByText('Running')).toBeInTheDocument();
    await expect.element(screen.getByText('Running')).toHaveStyle({
      fontSize: fontSize[16],
    });
    await takeSnapshot(
      `Breadcrumbs - renders kitchen-sink large deep chevron trail`,
    );
  });

  it('renders kitchen-sink small two-item pipe trail', async () => {
    const screen = await render(
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Settings', current: true },
        ]}
        size="small"
        separator="|"
      />,
    );
    await expect.element(screen.getByText('Settings')).toHaveStyle({
      fontSize: fontSize[12],
    });
    await takeSnapshot(
      `Breadcrumbs - renders kitchen-sink small two-item pipe trail`,
    );
  });

  it('uses flex align-items center on each list item', async () => {
    const screen = await render(<Breadcrumbs items={basicItems} />);
    const [first] = getItems(screen.container);
    await expect.element(locatorFor(first as HTMLElement)).toHaveStyle({
      display: 'flex',
      alignItems: 'center',
    });
    await takeSnapshot(
      `Breadcrumbs - uses flex align-items center on each list item`,
    );
  });

  it('renders nav as the root element', async () => {
    const screen = await render(<Breadcrumbs items={basicItems} />);
    expect(getNav(screen.container).tagName).toBe('NAV');
    await takeSnapshot(`Breadcrumbs - renders nav as the root element`);
  });

  it('renders mixed href presence without crashing', async () => {
    const screen = await render(
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Section' },
          { label: 'Page', href: '/page' },
          { label: 'Here', current: true },
        ]}
      />,
    );
    expect(getItems(screen.container)).toHaveLength(4);
    expect(screen.container.querySelectorAll('a')).toHaveLength(2);
    await takeSnapshot(
      `Breadcrumbs - renders mixed href presence without crashing`,
    );
  });

  it('renders four items with three separators', async () => {
    const screen = await render(
      <Breadcrumbs
        items={[
          { label: 'A', href: '/a' },
          { label: 'B', href: '/b' },
          { label: 'C', href: '/c' },
          { label: 'D', current: true },
        ]}
      />,
    );
    expect(getItems(screen.container)).toHaveLength(4);
    expect(screen.container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(3);
    await takeSnapshot(
      `Breadcrumbs - renders four items with three separators`,
    );
  });
});
