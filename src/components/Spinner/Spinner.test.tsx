import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import Spinner from './Spinner';
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

const getSpinner = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement;

describe('Spinner', () => {
  it('renders with role="status"', async () => {
    const screen = await render(<Spinner />);
    await expect.element(screen.getByRole('status')).toBeInTheDocument();
    await takeSnapshot(`Spinner - renders with role="status"`);
  });

  it('uses default aria-label Loading', async () => {
    const screen = await render(<Spinner />);
    await expect.element(screen.getByLabelText('Loading')).toBeInTheDocument();
    await takeSnapshot(`Spinner - uses default aria-label Loading`);
  });

  it('applies a custom aria-label from the label prop', async () => {
    const screen = await render(<Spinner label="Please wait" />);
    await expect.element(screen.getByLabelText('Please wait')).toBeInTheDocument();
    await takeSnapshot(`Spinner - applies a custom aria-label from the label prop`);
  });

  it('defaults to medium size of 32px', async () => {
    const screen = await render(<Spinner />);
    const el = getSpinner(screen.container);
    await expect.element(locatorFor(el)).toHaveStyle({ width: '32px', height: '32px' });
    await takeSnapshot(`Spinner - defaults to medium size of 32px`);
  });

  it('applies small size of 16px', async () => {
    const screen = await render(<Spinner size="small" />);
    const el = getSpinner(screen.container);
    await expect.element(locatorFor(el)).toHaveStyle({ width: '16px', height: '16px' });
    await takeSnapshot(`Spinner - applies small size of 16px`);
  });

  it('applies large size of 48px', async () => {
    const screen = await render(<Spinner size="large" />);
    const el = getSpinner(screen.container);
    await expect.element(locatorFor(el)).toHaveStyle({ width: '48px', height: '48px' });
    await takeSnapshot(`Spinner - applies large size of 48px`);
  });

  it('accepts a numeric size of 24px', async () => {
    const screen = await render(<Spinner size={24} />);
    const el = getSpinner(screen.container);
    await expect.element(locatorFor(el)).toHaveStyle({ width: '24px', height: '24px' });
    await takeSnapshot(`Spinner - accepts a numeric size of 24px`);
  });

  it('accepts a numeric size of 64px', async () => {
    const screen = await render(<Spinner size={64} />);
    const el = getSpinner(screen.container);
    await expect.element(locatorFor(el)).toHaveStyle({ width: '64px', height: '64px' });
    await takeSnapshot(`Spinner - accepts a numeric size of 64px`);
  });

  it('accepts a tiny numeric size of 8px', async () => {
    const screen = await render(<Spinner size={8} />);
    const el = getSpinner(screen.container);
    await expect.element(locatorFor(el)).toHaveStyle({ width: '8px', height: '8px' });
    await takeSnapshot(`Spinner - accepts a tiny numeric size of 8px`);
  });

  it('defaults the accent color to blue500', async () => {
    const screen = await render(<Spinner />);
    const el = getSpinner(screen.container);
    expect(el.style.borderTopColor).toBe(computedColor(color.blue500));
    await takeSnapshot(`Spinner - defaults the accent color to blue500`);
  });

  it('applies a green accent color', async () => {
    const screen = await render(<Spinner color={color.green500} />);
    const el = getSpinner(screen.container);
    expect(el.style.borderTopColor).toBe(computedColor(color.green500));
    await takeSnapshot(`Spinner - applies a green accent color`);
  });

  it('applies an orange accent color', async () => {
    const screen = await render(<Spinner color={color.orange500} />);
    const el = getSpinner(screen.container);
    expect(el.style.borderTopColor).toBe(computedColor(color.orange500));
    await takeSnapshot(`Spinner - applies an orange accent color`);
  });

  it('applies a pink accent color', async () => {
    const screen = await render(<Spinner color={color.pink500} />);
    const el = getSpinner(screen.container);
    expect(el.style.borderTopColor).toBe(computedColor(color.pink500));
    await takeSnapshot(`Spinner - applies a pink accent color`);
  });

  it('applies a purple accent color', async () => {
    const screen = await render(<Spinner color={color.purple500} />);
    const el = getSpinner(screen.container);
    expect(el.style.borderTopColor).toBe(computedColor(color.purple500));
    await takeSnapshot(`Spinner - applies a purple accent color`);
  });

  it('applies a custom hex accent color', async () => {
    const screen = await render(<Spinner color="#FF00AA" />);
    const el = getSpinner(screen.container);
    expect(el.style.borderTopColor).toBe('rgb(255, 0, 170)');
    await takeSnapshot(`Spinner - applies a custom hex accent color`);
  });

  it('defaults thickness to 3px', async () => {
    const screen = await render(<Spinner />);
    const el = getSpinner(screen.container);
    expect(el.style.borderWidth).toBe('3px');
    await takeSnapshot(`Spinner - defaults thickness to 3px`);
  });

  it('applies a thin 1px border', async () => {
    const screen = await render(<Spinner thickness={1} />);
    const el = getSpinner(screen.container);
    expect(el.style.borderWidth).toBe('1px');
    await takeSnapshot(`Spinner - applies a thin 1px border`);
  });

  it('applies a thick 6px border', async () => {
    const screen = await render(<Spinner thickness={6} />);
    const el = getSpinner(screen.container);
    expect(el.style.borderWidth).toBe('6px');
    await takeSnapshot(`Spinner - applies a thick 6px border`);
  });

  it('applies an extra thick 10px border', async () => {
    const screen = await render(<Spinner thickness={10} size={64} />);
    const el = getSpinner(screen.container);
    expect(el.style.borderWidth).toBe('10px');
    await takeSnapshot(`Spinner - applies an extra thick 10px border`);
  });

  it('uses a circular border-radius of 50%', async () => {
    const screen = await render(<Spinner />);
    const el = getSpinner(screen.container);
    await expect.element(locatorFor(el)).toHaveStyle({ borderRadius: '50%' });
    await takeSnapshot(`Spinner - uses a circular border-radius of 50%`);
  });

  it('uses inline-block display', async () => {
    const screen = await render(<Spinner />);
    const el = getSpinner(screen.container);
    await expect.element(locatorFor(el)).toHaveStyle({ display: 'inline-block' });
    await takeSnapshot(`Spinner - uses inline-block display`);
  });

  it('applies the spin animation name', async () => {
    const screen = await render(<Spinner />);
    const el = getSpinner(screen.container);
    expect(el.style.animation).toContain('ark-spinner-spin');
    await takeSnapshot(`Spinner - applies the spin animation name`);
  });

  it('injects the keyframes style tag into the document head', async () => {
    await render(<Spinner />);
    expect(document.getElementById('ark-spinner-keyframes')).not.toBeNull();
    await takeSnapshot(`Spinner - injects the keyframes style tag into the document head`);
  });

  it('does not duplicate the keyframes style tag on remount', async () => {
    await render(<Spinner />);
    await render(<Spinner size="large" />);
    const tags = document.querySelectorAll('#ark-spinner-keyframes');
    expect(tags.length).toBe(1);
    await takeSnapshot(`Spinner - does not duplicate the keyframes style tag on remount`);
  });

  it('renders as a single root div element', async () => {
    const screen = await render(<Spinner />);
    const el = getSpinner(screen.container);
    expect(el.tagName.toLowerCase()).toBe('div');
    expect(el.children.length).toBe(0);
    await takeSnapshot(`Spinner - renders as a single root div element`);
  });

  it('renders kitchen-sink combo: large + purple + thick', async () => {
    const screen = await render(
      <Spinner size="large" color={color.purple500} thickness={6} label="Almost done" />
    );
    const el = getSpinner(screen.container);
    await expect.element(locatorFor(el)).toHaveStyle({ width: '48px', height: '48px' });
    expect(el.style.borderTopColor).toBe(computedColor(color.purple500));
    expect(el.style.borderWidth).toBe('6px');
    await expect.element(screen.getByLabelText('Almost done')).toBeInTheDocument();
    await takeSnapshot(`Spinner - renders kitchen-sink combo: large + purple + thick`);
  });

  it('renders kitchen-sink combo: tiny blue spinner', async () => {
    const screen = await render(
      <Spinner size={12} color={color.blue500} thickness={2} label="Tiny loader" />
    );
    const el = getSpinner(screen.container);
    await expect.element(locatorFor(el)).toHaveStyle({ width: '12px', height: '12px' });
    await takeSnapshot(`Spinner - renders kitchen-sink combo: tiny blue spinner`);
  });

  it('renders kitchen-sink combo: huge cyan spinner', async () => {
    const screen = await render(
      <Spinner size={80} color={color.cyan500} thickness={8} />
    );
    const el = getSpinner(screen.container);
    await expect.element(locatorFor(el)).toHaveStyle({ width: '80px', height: '80px' });
    expect(el.style.borderTopColor).toBe(computedColor(color.cyan500));
    await takeSnapshot(`Spinner - renders kitchen-sink combo: huge cyan spinner`);
  });

  it('supports an empty string label', async () => {
    const screen = await render(<Spinner label="" />);
    const el = getSpinner(screen.container);
    expect(el.getAttribute('aria-label')).toBe('');
    await takeSnapshot(`Spinner - supports an empty string label`);
  });

  it('supports a long aria-label', async () => {
    const label = 'Loading your personalized dashboard, please wait a moment';
    const screen = await render(<Spinner label={label} />);
    await expect.element(screen.getByLabelText(label)).toBeInTheDocument();
    await takeSnapshot(`Spinner - supports a long aria-label`);
  });

  it('supports an RTL aria-label', async () => {
    const screen = await render(<Spinner label="جاري التحميل" />);
    await expect.element(screen.getByLabelText('جاري التحميل')).toBeInTheDocument();
    await takeSnapshot(`Spinner - supports an RTL aria-label`);
  });

  it('supports an emoji aria-label', async () => {
    const screen = await render(<Spinner label="⏳ Loading" />);
    await expect.element(screen.getByLabelText('⏳ Loading')).toBeInTheDocument();
    await takeSnapshot(`Spinner - supports an emoji aria-label`);
  });

  it('renders multiple independent spinners side by side', async () => {
    const screen = await render(
      <div>
        <Spinner size="small" color={color.green500} />
        <Spinner size="large" color={color.orange500} />
      </div>
    );
    const statuses = screen.container.querySelectorAll('[role="status"]');
    expect(statuses.length).toBe(2);
    await takeSnapshot(`Spinner - renders multiple independent spinners side by side`);
  });

  it('keeps equal width and height for medium size', async () => {
    const screen = await render(<Spinner size="medium" />);
    const el = getSpinner(screen.container);
    expect(el.style.width).toBe(el.style.height);
    await takeSnapshot(`Spinner - keeps equal width and height for medium size`);
  });

  it('keeps equal width and height for numeric size', async () => {
    const screen = await render(<Spinner size={40} />);
    const el = getSpinner(screen.container);
    expect(el.style.width).toBe('40px');
    expect(el.style.height).toBe('40px');
    await takeSnapshot(`Spinner - keeps equal width and height for numeric size`);
  });

  it('uses slate200 for the inactive border color', async () => {
    const screen = await render(<Spinner />);
    const el = getSpinner(screen.container);
    expect(el.style.borderBottomColor).toBe(computedColor(color.slate200));
    await takeSnapshot(`Spinner - uses slate200 for the inactive border color`);
  });

  it('sets box-sizing to border-box', async () => {
    const screen = await render(<Spinner />);
    const el = getSpinner(screen.container);
    await expect.element(locatorFor(el)).toHaveStyle({ boxSizing: 'border-box' });
    await takeSnapshot(`Spinner - sets box-sizing to border-box`);
  });

  it('sets flex-shrink to 0', async () => {
    const screen = await render(<Spinner />);
    const el = getSpinner(screen.container);
    await expect.element(locatorFor(el)).toHaveStyle({ flexShrink: '0' });
    await takeSnapshot(`Spinner - sets flex-shrink to 0`);
  });

  it('updates size when re-rendered with a new size prop', async () => {
    const screen = await render(<Spinner size="small" />);
    let el = getSpinner(screen.container);
    await expect.element(locatorFor(el)).toHaveStyle({ width: '16px' });
    await screen.rerender(<Spinner size="large" />);
    el = getSpinner(screen.container);
    await expect.element(locatorFor(el)).toHaveStyle({ width: '48px' });
    await takeSnapshot(`Spinner - updates size when re-rendered with a new size prop`);
  });

  it('updates color when re-rendered with a new color prop', async () => {
    const screen = await render(<Spinner color={color.blue500} />);
    let el = getSpinner(screen.container);
    expect(el.style.borderTopColor).toBe(computedColor(color.blue500));
    await screen.rerender(<Spinner color={color.green500} />);
    el = getSpinner(screen.container);
    expect(el.style.borderTopColor).toBe(computedColor(color.green500));
    await takeSnapshot(`Spinner - updates color when re-rendered with a new color prop`);
  });

  it('updates thickness when re-rendered with a new thickness prop', async () => {
    const screen = await render(<Spinner thickness={2} />);
    let el = getSpinner(screen.container);
    expect(el.style.borderWidth).toBe('2px');
    await screen.rerender(<Spinner thickness={5} />);
    el = getSpinner(screen.container);
    expect(el.style.borderWidth).toBe('5px');
    await takeSnapshot(`Spinner - updates thickness when re-rendered with a new thickness prop`);
  });

  it('updates label when re-rendered with a new label prop', async () => {
    const screen = await render(<Spinner label="Loading" />);
    await expect.element(screen.getByLabelText('Loading')).toBeInTheDocument();
    await screen.rerender(<Spinner label="Saving" />);
    await expect.element(screen.getByLabelText('Saving')).toBeInTheDocument();
    await takeSnapshot(`Spinner - updates label when re-rendered with a new label prop`);
  });

  it('applies yellow accent with medium size', async () => {
    const screen = await render(<Spinner color={color.yellow500} size="medium" />);
    const el = getSpinner(screen.container);
    expect(el.style.borderTopColor).toBe(computedColor(color.yellow500));
    await takeSnapshot(`Spinner - applies yellow accent with medium size`);
  });

  it('applies cyan accent with large size', async () => {
    const screen = await render(<Spinner color={color.cyan500} size="large" />);
    const el = getSpinner(screen.container);
    expect(el.style.borderTopColor).toBe(computedColor(color.cyan500));
    await expect.element(locatorFor(el)).toHaveStyle({ width: '48px' });
    await takeSnapshot(`Spinner - applies cyan accent with large size`);
  });

  it('applies slate accent with small size', async () => {
    const screen = await render(<Spinner color={color.slate600} size="small" />);
    const el = getSpinner(screen.container);
    expect(el.style.borderTopColor).toBe(computedColor(color.slate600));
    await takeSnapshot(`Spinner - applies slate accent with small size`);
  });

  it('combines numeric size with custom thickness and color', async () => {
    const screen = await render(
      <Spinner size={56} thickness={4} color={color.cyan500} />
    );
    const el = getSpinner(screen.container);
    await expect.element(locatorFor(el)).toHaveStyle({ width: '56px', height: '56px' });
    expect(el.style.borderWidth).toBe('4px');
    expect(el.style.borderTopColor).toBe(computedColor(color.cyan500));
    await takeSnapshot(`Spinner - combines numeric size with custom thickness and color`);
  });

  it('animation duration is 0.8s linear infinite', async () => {
    const screen = await render(<Spinner />);
    const el = getSpinner(screen.container);
    expect(el.style.animation).toContain('ark-spinner-spin');
    expect(el.style.animation).toContain('0.8s');
    expect(el.style.animation).toContain('linear');
    expect(el.style.animation).toContain('infinite');
    await takeSnapshot(`Spinner - animation duration is 0.8s linear infinite`);
  });

  it('exposes status role with accessible name for fetching label', async () => {
    const screen = await render(<Spinner label="Fetching data" />);
    await expect.element(screen.getByRole('status', { name: 'Fetching data' })).toBeInTheDocument();
    await takeSnapshot(`Spinner - exposes status role with accessible name for fetching label`);
  });

  it('renders without throwing when all props are omitted', async () => {
    const screen = await render(<Spinner />);
    expect(getSpinner(screen.container)).not.toBeNull();
    await takeSnapshot(`Spinner - renders without throwing when all props are omitted`);
  });

  it('renders white accent for dark backgrounds', async () => {
    const screen = await render(<Spinner color={color.white} />);
    const el = getSpinner(screen.container);
    expect(el.style.borderTopColor).toBe(computedColor(color.white));
    await takeSnapshot(`Spinner - renders white accent for dark backgrounds`);
  });
});
