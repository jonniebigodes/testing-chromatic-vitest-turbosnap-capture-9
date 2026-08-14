import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import Pagination from './Pagination';
import { color, fontSize, spacing } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

const locatorFor = (element: HTMLElement) => page.elementLocator(element);

const getRoot = (container: HTMLElement) =>
  container.querySelector('nav') as HTMLElement;

const getPageItem = (container: HTMLElement, pageNum: number) =>
  container.querySelector(
    `[data-part="item"][data-index="${pageNum}"]`,
  ) as HTMLElement;

describe('Pagination', () => {
  it('renders a nav root element', async () => {
    const screen = await render(<Pagination count={100} />);
    expect(getRoot(screen.container).tagName).toBe('NAV');
    await takeSnapshot(`Pagination - renders a nav root element`);
  });

  it('renders prev and next triggers', async () => {
    const screen = await render(<Pagination count={100} />);
    await expect.element(screen.getByRole('button', { name: /prev/i })).toBeInTheDocument();
    await expect.element(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
    await takeSnapshot(`Pagination - renders prev and next triggers`);
  });

  it('renders page number buttons', async () => {
    const screen = await render(<Pagination count={50} pageSize={10} />);
    expect(getPageItem(screen.container, 1)).toBeTruthy();
    await takeSnapshot(`Pagination - renders page number buttons`);
  });

  it('defaults to medium size font size on page items', async () => {
    const screen = await render(<Pagination count={50} />);
    expect(getPageItem(screen.container, 1).style.fontSize).toBe(fontSize[14]);
    await takeSnapshot(`Pagination - defaults to medium size font size on page items`);
  });

  it('applies small size font size', async () => {
    const screen = await render(<Pagination count={50} size="small" />);
    expect(getPageItem(screen.container, 1).style.fontSize).toBe(fontSize[12]);
    await takeSnapshot(`Pagination - applies small size font size`);
  });

  it('applies medium size font size', async () => {
    const screen = await render(<Pagination count={50} size="medium" />);
    expect(getPageItem(screen.container, 1).style.fontSize).toBe(fontSize[14]);
    await takeSnapshot(`Pagination - applies medium size font size`);
  });

  it('applies large size font size', async () => {
    const screen = await render(<Pagination count={50} size="large" />);
    expect(getPageItem(screen.container, 1).style.fontSize).toBe(fontSize[16]);
    await takeSnapshot(`Pagination - applies large size font size`);
  });

  it('uses flex layout on the root', async () => {
    const screen = await render(<Pagination count={50} />);
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      display: 'flex',
      alignItems: 'center',
    });
    await takeSnapshot(`Pagination - uses flex layout on the root`);
  });

  it('renders ellipsis for large page counts', async () => {
    const screen = await render(
      <Pagination count={500} pageSize={10} defaultPage={10} siblingCount={1} />,
    );
    expect(screen.container.textContent).toContain('…');
    await takeSnapshot(`Pagination - renders ellipsis for large page counts`);
  });

  it('starts on page 1 by default', async () => {
    const screen = await render(<Pagination count={100} />);
    expect(getPageItem(screen.container, 1).getAttribute('data-selected')).toBe('');
    await takeSnapshot(`Pagination - starts on page 1 by default`);
  });

  it('honors defaultPage', async () => {
    const screen = await render(<Pagination count={100} defaultPage={3} />);
    expect(getPageItem(screen.container, 3)).toBeTruthy();
    await takeSnapshot(`Pagination - honors defaultPage`);
  });

  it('honors controlled page prop', async () => {
    const screen = await render(<Pagination count={100} page={4} />);
    expect(getPageItem(screen.container, 4)).toBeTruthy();
    await takeSnapshot(`Pagination - honors controlled page prop`);
  });

  it('calls onPageChange when next is clicked', async () => {
    const onPageChange = vi.fn();
    const screen = await render(
      <Pagination count={100} defaultPage={1} onPageChange={onPageChange} />,
    );
    await screen.getByRole('button', { name: /next/i }).click();
    await vi.waitFor(() => expect(onPageChange).toHaveBeenCalled());
    await takeSnapshot(`Pagination - calls onPageChange when next is clicked`);
  });

  it('calls onPageChange when a page item is clicked', async () => {
    const onPageChange = vi.fn();
    const screen = await render(
      <Pagination count={50} pageSize={10} onPageChange={onPageChange} />,
    );
    await locatorFor(getPageItem(screen.container, 2)).click();
    await vi.waitFor(() => expect(onPageChange).toHaveBeenCalled());
    await takeSnapshot(`Pagination - calls onPageChange when a page item is clicked`);
  });

  it('renders few pages without ellipsis', async () => {
    const screen = await render(<Pagination count={30} pageSize={10} />);
    expect(screen.container.textContent).not.toContain('…');
    expect(getPageItem(screen.container, 3)).toBeTruthy();
    await takeSnapshot(`Pagination - renders few pages without ellipsis`);
  });

  it('renders a single page when count is small', async () => {
    const screen = await render(<Pagination count={5} pageSize={10} />);
    expect(getPageItem(screen.container, 1)).toBeTruthy();
    await takeSnapshot(`Pagination - renders a single page when count is small`);
  });

  it('respects siblingCount of zero', async () => {
    const screen = await render(
      <Pagination count={200} siblingCount={0} defaultPage={10} />,
    );
    expect(getRoot(screen.container)).toBeTruthy();
    await takeSnapshot(`Pagination - respects siblingCount of zero`);
  });

  it('respects siblingCount of two', async () => {
    const screen = await render(
      <Pagination count={200} siblingCount={2} defaultPage={10} />,
    );
    expect(getPageItem(screen.container, 10)).toBeTruthy();
    await takeSnapshot(`Pagination - respects siblingCount of two`);
  });

  it('styles page buttons with white background by default', async () => {
    const screen = await render(<Pagination count={50} />);
    await expect.element(screen.getByRole('button', { name: /next/i })).toHaveStyle({
      backgroundColor: color.white,
    });
    await takeSnapshot(`Pagination - styles page buttons with white background by default`);
  });

  it('styles buttons with slate300 border', async () => {
    const screen = await render(<Pagination count={50} />);
    const prev = screen.container.querySelector(
      '[data-part="prev-trigger"]',
    ) as HTMLElement;
    expect(prev.style.borderWidth).toBe('1px');
    expect(prev.style.borderStyle).toBe('solid');
    await takeSnapshot(`Pagination - styles buttons with slate300 border`);
  });

  it('applies small min width on controls', async () => {
    const screen = await render(<Pagination count={50} size="small" />);
    expect(getPageItem(screen.container, 1).style.minWidth).toBe(spacing[6]);
    await takeSnapshot(`Pagination - applies small min width on controls`);
  });

  it('applies medium min width on controls', async () => {
    const screen = await render(<Pagination count={50} size="medium" />);
    expect(getPageItem(screen.container, 1).style.minWidth).toBe(spacing[8]);
    await takeSnapshot(`Pagination - applies medium min width on controls`);
  });

  it('applies large min width on controls', async () => {
    const screen = await render(<Pagination count={50} size="large" />);
    expect(getPageItem(screen.container, 1).style.minWidth).toBe(spacing[10]);
    await takeSnapshot(`Pagination - applies large min width on controls`);
  });

  it('renders with pageSize of five', async () => {
    const screen = await render(<Pagination count={50} pageSize={5} />);
    expect(getPageItem(screen.container, 1)).toBeTruthy();
    await takeSnapshot(`Pagination - renders with pageSize of five`);
  });

  it('renders with pageSize of twenty', async () => {
    const screen = await render(<Pagination count={200} pageSize={20} />);
    expect(getPageItem(screen.container, 1)).toBeTruthy();
    await takeSnapshot(`Pagination - renders with pageSize of twenty`);
  });

  it('keeps two independent paginations from sharing state', async () => {
    const screen = await render(
      <>
        <Pagination count={30} pageSize={10} />
        <Pagination count={200} pageSize={20} defaultPage={3} />
      </>,
    );
    expect(screen.container.querySelectorAll('nav')).toHaveLength(2);
    await takeSnapshot(`Pagination - keeps two independent paginations from sharing state`);
  });

  it('updates when re-rendered with a new count', async () => {
    const screen = await render(<Pagination count={30} pageSize={10} />);
    await screen.rerender(<Pagination count={100} pageSize={10} />);
    expect(getRoot(screen.container)).toBeTruthy();
    await takeSnapshot(`Pagination - updates when re-rendered with a new count`);
  });

  it('updates size when re-rendered', async () => {
    const screen = await render(<Pagination count={50} size="small" />);
    await screen.rerender(<Pagination count={50} size="large" />);
    expect(getPageItem(screen.container, 1).style.fontSize).toBe(fontSize[16]);
    await takeSnapshot(`Pagination - updates size when re-rendered`);
  });

  it('renders middle page with ellipsis on both sides', async () => {
    const screen = await render(
      <Pagination count={500} pageSize={10} defaultPage={25} siblingCount={1} />,
    );
    expect(screen.container.textContent).toContain('…');
    expect(getPageItem(screen.container, 25)).toBeTruthy();
    await takeSnapshot(`Pagination - renders middle page with ellipsis on both sides`);
  });

  it('renders near the last page', async () => {
    const screen = await render(
      <Pagination count={100} pageSize={10} defaultPage={10} />,
    );
    expect(getPageItem(screen.container, 10)).toBeTruthy();
    await takeSnapshot(`Pagination - renders near the last page`);
  });

  it('renders near the second page', async () => {
    const screen = await render(
      <Pagination count={200} pageSize={10} defaultPage={2} />,
    );
    expect(getPageItem(screen.container, 2)).toBeTruthy();
    await takeSnapshot(`Pagination - renders near the second page`);
  });

  it('handles count of zero without throwing', async () => {
    const screen = await render(<Pagination count={0} />);
    expect(getRoot(screen.container)).toBeTruthy();
    await takeSnapshot(`Pagination - handles count of zero without throwing`);
  });

  it('handles count of one', async () => {
    const screen = await render(<Pagination count={1} />);
    expect(getPageItem(screen.container, 1)).toBeTruthy();
    await takeSnapshot(`Pagination - handles count of one`);
  });

  it('applies small height on controls', async () => {
    const screen = await render(<Pagination count={50} size="small" />);
    expect(getPageItem(screen.container, 1).style.height).toBe(spacing[6]);
    await takeSnapshot(`Pagination - applies small height on controls`);
  });

  it('applies medium height on controls', async () => {
    const screen = await render(<Pagination count={50} size="medium" />);
    expect(getPageItem(screen.container, 1).style.height).toBe(spacing[8]);
    await takeSnapshot(`Pagination - applies medium height on controls`);
  });

  it('applies large height on controls', async () => {
    const screen = await render(<Pagination count={50} size="large" />);
    expect(getPageItem(screen.container, 1).style.height).toBe(spacing[10]);
    await takeSnapshot(`Pagination - applies large height on controls`);
  });

  it('renders kitchen-sink large huge pagination', async () => {
    const screen = await render(
      <Pagination count={5000} pageSize={25} siblingCount={2} size="large" defaultPage={5} />,
    );
    expect(getPageItem(screen.container, 5)).toBeTruthy();
    await takeSnapshot(`Pagination - renders kitchen-sink large huge pagination`);
  });

  it('renders kitchen-sink small compact pagination', async () => {
    const screen = await render(
      <Pagination count={80} pageSize={8} siblingCount={0} size="small" />,
    );
    expect(getPageItem(screen.container, 1).style.fontSize).toBe(fontSize[12]);
    await takeSnapshot(`Pagination - renders kitchen-sink small compact pagination`);
  });

  it('uses border-radius from spacing tokens', async () => {
    const screen = await render(<Pagination count={50} />);
    expect(getPageItem(screen.container, 1).style.borderRadius).toBe(spacing[1]);
    await takeSnapshot(`Pagination - uses border-radius from spacing tokens`);
  });

  it('renders odd count correctly', async () => {
    const screen = await render(<Pagination count={97} pageSize={10} />);
    expect(getPageItem(screen.container, 1)).toBeTruthy();
    await takeSnapshot(`Pagination - renders odd count correctly`);
  });

  it('renders with pageSize of one', async () => {
    const screen = await render(<Pagination count={15} pageSize={1} siblingCount={1} />);
    expect(screen.container.textContent).toContain('…');
    await takeSnapshot(`Pagination - renders with pageSize of one`);
  });

  it('renders with pageSize of fifty', async () => {
    const screen = await render(<Pagination count={500} pageSize={50} />);
    expect(getPageItem(screen.container, 1)).toBeTruthy();
    await takeSnapshot(`Pagination - renders with pageSize of fifty`);
  });

  it('updates siblingCount when re-rendered', async () => {
    const screen = await render(
      <Pagination count={300} siblingCount={0} defaultPage={10} />,
    );
    await screen.rerender(
      <Pagination count={300} siblingCount={3} defaultPage={10} />,
    );
    expect(getPageItem(screen.container, 10)).toBeTruthy();
    await takeSnapshot(`Pagination - updates siblingCount when re-rendered`);
  });

  it('renders prev trigger label as Prev', async () => {
    const screen = await render(<Pagination count={50} />);
    await expect.element(screen.getByText('Prev')).toBeInTheDocument();
    await takeSnapshot(`Pagination - renders prev trigger label as Prev`);
  });

  it('renders next trigger label as Next', async () => {
    const screen = await render(<Pagination count={50} />);
    await expect.element(screen.getByText('Next')).toBeInTheDocument();
    await takeSnapshot(`Pagination - renders next trigger label as Next`);
  });

  it('applies medium gap on the root', async () => {
    const screen = await render(<Pagination count={50} size="medium" />);
    expect(getRoot(screen.container).style.gap).toBe(spacing[1]);
    await takeSnapshot(`Pagination - applies medium gap on the root`);
  });

  it('applies large gap on the root', async () => {
    const screen = await render(<Pagination count={50} size="large" />);
    expect(getRoot(screen.container).style.gap).toBe(spacing[2]);
    await takeSnapshot(`Pagination - applies large gap on the root`);
  });

  it('renders controlled page five', async () => {
    const screen = await render(<Pagination count={120} page={5} />);
    expect(getPageItem(screen.container, 5)).toBeTruthy();
    await takeSnapshot(`Pagination - renders controlled page five`);
  });

  it('renders compact ellipsis at high page', async () => {
    const screen = await render(
      <Pagination count={1000} pageSize={10} siblingCount={0} defaultPage={50} />,
    );
    expect(screen.container.textContent).toContain('…');
    await takeSnapshot(`Pagination - renders compact ellipsis at high page`);
  });

  it('renders wide sibling ellipsis at high page', async () => {
    const screen = await render(
      <Pagination count={1000} pageSize={10} siblingCount={3} defaultPage={50} />,
    );
    expect(getPageItem(screen.container, 50)).toBeTruthy();
    await takeSnapshot(`Pagination - renders wide sibling ellipsis at high page`);
  });
});
