import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import Loading from './Loading';
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

const getStatus = (container: HTMLElement) =>
  container.querySelector('[role="status"]') as HTMLElement;

describe('Loading', () => {
  it('renders with role="status"', async () => {
    const screen = await render(<Loading />);
    await expect.element(screen.getByRole('status')).toBeInTheDocument();
    await takeSnapshot(`Loading - renders with role="status"`);
  });

  it('shows the default label Loading...', async () => {
    const screen = await render(<Loading />);
    await expect.element(screen.getByText('Loading...')).toBeInTheDocument();
    await takeSnapshot(`Loading - shows the default label Loading...`);
  });

  it('shows a custom label', async () => {
    const screen = await render(<Loading label="Please wait…" />);
    await expect.element(screen.getByText('Please wait…')).toBeInTheDocument();
    await takeSnapshot(`Loading - shows a custom label`);
  });

  it('uses the label as aria-label on the status element', async () => {
    const screen = await render(<Loading label="Fetching data" />);
    await expect.element(screen.getByRole('status', { name: 'Fetching data' })).toBeInTheDocument();
    await takeSnapshot(`Loading - uses the label as aria-label on the status element`);
  });

  it('defaults to the spinner variant', async () => {
    const screen = await render(<Loading />);
    const status = getStatus(screen.container);
    expect(status.querySelector('[aria-hidden="true"]')).not.toBeNull();
    await takeSnapshot(`Loading - defaults to the spinner variant`);
  });

  it('renders the dots variant with three dots', async () => {
    const screen = await render(<Loading variant="dots" />);
    const status = getStatus(screen.container);
    const dotsWrap = status.querySelector('[aria-hidden="true"]') as HTMLElement;
    expect(dotsWrap.children.length).toBe(3);
    await takeSnapshot(`Loading - renders the dots variant with three dots`);
  });

  it('renders the bar variant with a track and animated fill', async () => {
    const screen = await render(<Loading variant="bar" />);
    const status = getStatus(screen.container);
    const track = status.querySelector('[aria-hidden="true"]') as HTMLElement;
    expect(track).not.toBeNull();
    expect(track.children.length).toBe(1);
    await takeSnapshot(`Loading - renders the bar variant with a track and animated fill`);
  });

  it('applies small size label font', async () => {
    const screen = await render(<Loading size="small" label="Small" />);
    const label = screen.getByText('Small');
    await expect.element(label).toHaveStyle({ fontSize: '0.75rem' });
    await takeSnapshot(`Loading - applies small size label font`);
  });

  it('applies medium size label font by default', async () => {
    const screen = await render(<Loading label="Medium" />);
    await expect.element(screen.getByText('Medium')).toHaveStyle({ fontSize: '0.875rem' });
    await takeSnapshot(`Loading - applies medium size label font by default`);
  });

  it('applies large size label font', async () => {
    const screen = await render(<Loading size="large" label="Large" />);
    await expect.element(screen.getByText('Large')).toHaveStyle({ fontSize: '1rem' });
    await takeSnapshot(`Loading - applies large size label font`);
  });

  it('applies a green accent color on the spinner', async () => {
    const screen = await render(<Loading color={color.green500} variant="spinner" />);
    const indicator = getStatus(screen.container).querySelector('[aria-hidden="true"]') as HTMLElement;
    expect(indicator.style.borderTopColor).toBe(computedColor(color.green500));
    await takeSnapshot(`Loading - applies a green accent color on the spinner`);
  });

  it('applies an orange accent color on dots', async () => {
    const screen = await render(<Loading color={color.orange500} variant="dots" />);
    const dots = getStatus(screen.container).querySelector('[aria-hidden="true"]') as HTMLElement;
    expect((dots.children[0] as HTMLElement).style.backgroundColor).toBe(computedColor(color.orange500));
    await takeSnapshot(`Loading - applies an orange accent color on dots`);
  });

  it('applies a pink accent color on the bar fill', async () => {
    const screen = await render(<Loading color={color.pink500} variant="bar" />);
    const track = getStatus(screen.container).querySelector('[aria-hidden="true"]') as HTMLElement;
    const fill = track.firstElementChild as HTMLElement;
    expect(fill.style.backgroundColor).toBe(computedColor(color.pink500));
    await takeSnapshot(`Loading - applies a pink accent color on the bar fill`);
  });

  it('defaults accent color to blue500 on spinner', async () => {
    const screen = await render(<Loading variant="spinner" />);
    const indicator = getStatus(screen.container).querySelector('[aria-hidden="true"]') as HTMLElement;
    expect(indicator.style.borderTopColor).toBe(computedColor(color.blue500));
    await takeSnapshot(`Loading - defaults accent color to blue500 on spinner`);
  });

  it('renders fullPage overlay as a fixed container', async () => {
    const screen = await render(<Loading fullPage label="Page load" />);
    const overlay = screen.container.firstElementChild as HTMLElement;
    await expect.element(locatorFor(overlay)).toHaveStyle({ position: 'fixed' });
    await takeSnapshot(`Loading - renders fullPage overlay as a fixed container`);
  });

  it('fullPage overlay contains the status element', async () => {
    const screen = await render(<Loading fullPage label="Overlay" />);
    await expect.element(screen.getByRole('status', { name: 'Overlay' })).toBeInTheDocument();
    await takeSnapshot(`Loading - fullPage overlay contains the status element`);
  });

  it('non-fullPage root is the status element itself', async () => {
    const screen = await render(<Loading />);
    const root = screen.container.firstElementChild as HTMLElement;
    expect(root.getAttribute('role')).toBe('status');
    await takeSnapshot(`Loading - non-fullPage root is the status element itself`);
  });

  it('injects loading keyframes into the document head', async () => {
    await render(<Loading />);
    expect(document.getElementById('ark-loading-keyframes')).not.toBeNull();
    await takeSnapshot(`Loading - injects loading keyframes into the document head`);
  });

  it('does not duplicate loading keyframes on remount', async () => {
    await render(<Loading />);
    await render(<Loading variant="dots" />);
    expect(document.querySelectorAll('#ark-loading-keyframes').length).toBe(1);
    await takeSnapshot(`Loading - does not duplicate loading keyframes on remount`);
  });

  it('spinner indicator uses ark-loading-spin animation', async () => {
    const screen = await render(<Loading variant="spinner" />);
    const indicator = getStatus(screen.container).querySelector('[aria-hidden="true"]') as HTMLElement;
    expect(indicator.style.animation).toContain('ark-loading-spin');
    await takeSnapshot(`Loading - spinner indicator uses ark-loading-spin animation`);
  });

  it('dots use ark-loading-bounce animation', async () => {
    const screen = await render(<Loading variant="dots" />);
    const dots = getStatus(screen.container).querySelector('[aria-hidden="true"]') as HTMLElement;
    expect((dots.children[0] as HTMLElement).style.animation).toContain('ark-loading-bounce');
    await takeSnapshot(`Loading - dots use ark-loading-bounce animation`);
  });

  it('bar fill uses ark-loading-bar animation', async () => {
    const screen = await render(<Loading variant="bar" />);
    const track = getStatus(screen.container).querySelector('[aria-hidden="true"]') as HTMLElement;
    const fill = track.firstElementChild as HTMLElement;
    expect(fill.style.animation).toContain('ark-loading-bar');
    await takeSnapshot(`Loading - bar fill uses ark-loading-bar animation`);
  });

  it('staggers bounce delays across the three dots', async () => {
    const screen = await render(<Loading variant="dots" />);
    const dots = getStatus(screen.container).querySelector('[aria-hidden="true"]') as HTMLElement;
    const delays = Array.from(dots.children).map((c) => (c as HTMLElement).style.animation);
    expect(delays[0]).toContain('0s');
    expect(delays[1]).toContain('0.16s');
    expect(delays[2]).toContain('0.32s');
    await takeSnapshot(`Loading - staggers bounce delays across the three dots`);
  });

  it('supports an empty string label', async () => {
    const screen = await render(<Loading label="" />);
    const status = getStatus(screen.container);
    expect(status.getAttribute('aria-label')).toBe('');
    await takeSnapshot(`Loading - supports an empty string label`);
  });

  it('supports a long label', async () => {
    const label = 'Loading your personalized dashboard content, please wait';
    const screen = await render(<Loading label={label} />);
    await expect.element(screen.getByText(label)).toBeInTheDocument();
    await takeSnapshot(`Loading - supports a long label`);
  });

  it('supports an RTL label', async () => {
    const screen = await render(<Loading label="جاري التحميل" />);
    await expect.element(screen.getByText('جاري التحميل')).toBeInTheDocument();
    await takeSnapshot(`Loading - supports an RTL label`);
  });

  it('supports an emoji label', async () => {
    const screen = await render(<Loading label="⏳ Almost done" />);
    await expect.element(screen.getByText('⏳ Almost done')).toBeInTheDocument();
    await takeSnapshot(`Loading - supports an emoji label`);
  });

  it('kitchen-sink: large dots pink', async () => {
    const screen = await render(
      <Loading size="large" variant="dots" color={color.pink500} label="Processing request" />
    );
    await expect.element(screen.getByText('Processing request')).toBeInTheDocument();
    const dots = getStatus(screen.container).querySelector('[aria-hidden="true"]') as HTMLElement;
    expect(dots.children.length).toBe(3);
    await takeSnapshot(`Loading - kitchen-sink: large dots pink`);
  });

  it('kitchen-sink: small bar cyan', async () => {
    const screen = await render(
      <Loading size="small" variant="bar" color={color.cyan500} label="Syncing" />
    );
    await expect.element(screen.getByText('Syncing')).toBeInTheDocument();
    await takeSnapshot(`Loading - kitchen-sink: small bar cyan`);
  });

  it('kitchen-sink: medium spinner orange', async () => {
    const screen = await render(
      <Loading size="medium" variant="spinner" color={color.orange500} label="Working…" />
    );
    const indicator = getStatus(screen.container).querySelector('[aria-hidden="true"]') as HTMLElement;
    expect(indicator.style.borderTopColor).toBe(computedColor(color.orange500));
    await takeSnapshot(`Loading - kitchen-sink: medium spinner orange`);
  });

  it('updates variant when re-rendered', async () => {
    const screen = await render(<Loading variant="spinner" />);
    await screen.rerender(<Loading variant="dots" />);
    const dots = getStatus(screen.container).querySelector('[aria-hidden="true"]') as HTMLElement;
    expect(dots.children.length).toBe(3);
    await takeSnapshot(`Loading - updates variant when re-rendered`);
  });

  it('updates label when re-rendered', async () => {
    const screen = await render(<Loading label="One" />);
    await expect.element(screen.getByText('One')).toBeInTheDocument();
    await screen.rerender(<Loading label="Two" />);
    await expect.element(screen.getByText('Two')).toBeInTheDocument();
    await takeSnapshot(`Loading - updates label when re-rendered`);
  });

  it('updates size when re-rendered', async () => {
    const screen = await render(<Loading size="small" label="Sz" />);
    await expect.element(screen.getByText('Sz')).toHaveStyle({ fontSize: '0.75rem' });
    await screen.rerender(<Loading size="large" label="Sz" />);
    await expect.element(screen.getByText('Sz')).toHaveStyle({ fontSize: '1rem' });
    await takeSnapshot(`Loading - updates size when re-rendered`);
  });

  it('updates color when re-rendered on spinner', async () => {
    const screen = await render(<Loading color={color.blue500} />);
    let ind = getStatus(screen.container).querySelector('[aria-hidden="true"]') as HTMLElement;
    expect(ind.style.borderTopColor).toBe(computedColor(color.blue500));
    await screen.rerender(<Loading color={color.green500} />);
    ind = getStatus(screen.container).querySelector('[aria-hidden="true"]') as HTMLElement;
    expect(ind.style.borderTopColor).toBe(computedColor(color.green500));
    await takeSnapshot(`Loading - updates color when re-rendered on spinner`);
  });

  it('toggles fullPage when re-rendered', async () => {
    const screen = await render(<Loading fullPage={false} />);
    expect((screen.container.firstElementChild as HTMLElement).getAttribute('role')).toBe('status');
    await screen.rerender(<Loading fullPage />);
    const overlay = screen.container.firstElementChild as HTMLElement;
    await expect.element(locatorFor(overlay)).toHaveStyle({ position: 'fixed' });
    await takeSnapshot(`Loading - toggles fullPage when re-rendered`);
  });

  it('renders multiple independent loaders', async () => {
    const screen = await render(
      <div>
        <Loading variant="spinner" label="A" />
        <Loading variant="dots" label="B" />
      </div>
    );
    expect(screen.container.querySelectorAll('[role="status"]').length).toBe(2);
    await takeSnapshot(`Loading - renders multiple independent loaders`);
  });

  it('label uses medium font-weight', async () => {
    const screen = await render(<Loading label="Weight" />);
    await expect.element(screen.getByText('Weight')).toHaveStyle({ fontWeight: '500' });
    await takeSnapshot(`Loading - label uses medium font-weight`);
  });

  it('label uses slate700 color', async () => {
    const screen = await render(<Loading label="ColorCheck" />);
    await expect.element(screen.getByText('ColorCheck')).toHaveStyle({ color: color.slate700 });
    await takeSnapshot(`Loading - label uses slate700 color`);
  });

  it('content is laid out as a column flex', async () => {
    const screen = await render(<Loading />);
    const status = getStatus(screen.container);
    await expect.element(locatorFor(status)).toHaveStyle({ flexDirection: 'column' });
    await takeSnapshot(`Loading - content is laid out as a column flex`);
  });

  it('fullPage overlay has high z-index', async () => {
    const screen = await render(<Loading fullPage />);
    const overlay = screen.container.firstElementChild as HTMLElement;
    expect(Number(overlay.style.zIndex)).toBeGreaterThanOrEqual(9999);
    await takeSnapshot(`Loading - fullPage overlay has high z-index`);
  });

  it('purple dots large combination renders three dots', async () => {
    const screen = await render(
      <Loading variant="dots" color={color.purple500} size="large" label="P" />
    );
    const dots = getStatus(screen.container).querySelector('[aria-hidden="true"]') as HTMLElement;
    expect(dots.children.length).toBe(3);
    expect((dots.children[0] as HTMLElement).style.backgroundColor).toBe(computedColor(color.purple500));
    await takeSnapshot(`Loading - purple dots large combination renders three dots`);
  });

  it('cyan bar medium combination renders fill', async () => {
    const screen = await render(
      <Loading variant="bar" color={color.cyan500} size="medium" label="C" />
    );
    const track = getStatus(screen.container).querySelector('[aria-hidden="true"]') as HTMLElement;
    expect((track.firstElementChild as HTMLElement).style.backgroundColor).toBe(computedColor(color.cyan500));
    await takeSnapshot(`Loading - cyan bar medium combination renders fill`);
  });

  it('yellow spinner renders with yellow accent', async () => {
    const screen = await render(<Loading color={color.yellow500} />);
    const ind = getStatus(screen.container).querySelector('[aria-hidden="true"]') as HTMLElement;
    expect(ind.style.borderTopColor).toBe(computedColor(color.yellow500));
    await takeSnapshot(`Loading - yellow spinner renders with yellow accent`);
  });

  it('numeric-looking label 42% is preserved', async () => {
    const screen = await render(<Loading label="42%" />);
    await expect.element(screen.getByText('42%')).toBeInTheDocument();
    await takeSnapshot(`Loading - numeric-looking label 42% is preserved`);
  });

  it('indicator is marked aria-hidden so only label is announced', async () => {
    const screen = await render(<Loading />);
    const ind = getStatus(screen.container).querySelector('[aria-hidden="true"]');
    expect(ind).not.toBeNull();
    await takeSnapshot(`Loading - indicator is marked aria-hidden so only label is announced`);
  });

  it('renders without throwing when all props are omitted', async () => {
    const screen = await render(<Loading />);
    expect(getStatus(screen.container)).not.toBeNull();
    await takeSnapshot(`Loading - renders without throwing when all props are omitted`);
  });

  it('saving label is visible in the document', async () => {
    const screen = await render(<Loading label="Saving…" />);
    await expect.element(screen.getByText('Saving…')).toBeInTheDocument();
    await takeSnapshot(`Loading - saving label is visible in the document`);
  });

  it('uploading label is visible in the document', async () => {
    const screen = await render(<Loading label="Uploading files" />);
    await expect.element(screen.getByText('Uploading files')).toBeInTheDocument();
    await takeSnapshot(`Loading - uploading label is visible in the document`);
  });

  it('fullPage dots variant still shows three dots', async () => {
    const screen = await render(<Loading fullPage variant="dots" label="Almost there" />);
    const dots = getStatus(screen.container).querySelector('[aria-hidden="true"]') as HTMLElement;
    expect(dots.children.length).toBe(3);
    await takeSnapshot(`Loading - fullPage dots variant still shows three dots`);
  });

  it('fullPage bar variant still shows animated fill', async () => {
    const screen = await render(<Loading fullPage variant="bar" label="Preparing…" />);
    const track = getStatus(screen.container).querySelector('[aria-hidden="true"]') as HTMLElement;
    expect(track.children.length).toBe(1);
    await takeSnapshot(`Loading - fullPage bar variant still shows animated fill`);
  });

});
