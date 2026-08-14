import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent, page } from 'vitest/browser';
import { useState } from 'react';
import Progress from './Progress';
import { color } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

/**
 * Small stateful fixture mirroring the "controlled progress" usage pattern
 * from the stories, used to exercise real external value updates driven by
 * user interaction (as opposed to just re-rendering with new props).
 */
const ControlledValueFixture = ({
  initialValue = 0,
}: {
  initialValue?: number;
}) => {
  const [value, setValue] = useState(initialValue);

  return (
    <>
      <Progress value={value}>Controlled fixture</Progress>
      <button onClick={() => setValue(100)}>Jump to 100</button>
    </>
  );
};

/** Wraps a raw HTMLElement into a Locator so jest-dom matchers can be used. */
const locatorFor = (element: HTMLElement) => page.elementLocator(element);

/** The outermost element is the Ark `Progress.Root` div. */
const getRoot = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement;

/** The plain wrapper div holding the label and value-text side by side. */
const getLabelRow = (container: HTMLElement) =>
  getRoot(container).firstElementChild as HTMLElement;

/** The `Progress.Label` span. */
const getLabel = (container: HTMLElement) =>
  getLabelRow(container).children[0] as HTMLElement;

/** The `Progress.ValueText` span. */
const getValueText = (container: HTMLElement) =>
  getLabelRow(container).children[1] as HTMLElement;

/** The `Progress.Track` div, which carries `role="progressbar"`. */
const getTrack = (container: HTMLElement) =>
  container.querySelector('[role="progressbar"]') as HTMLElement;

/** The `Progress.Range` div nested inside the track. */
const getRange = (container: HTMLElement) =>
  getTrack(container).firstElementChild as HTMLElement;

describe('Progress', () => {
  /* -----------------------------------------------------------------------
   * Default rendering & structure (4)
   * -------------------------------------------------------------------- */

  it('exposes role="progressbar" on the track element', async () => {
    const screen = await render(<Progress value={50}>Loading...</Progress>);
    const progressbar = screen.getByRole('progressbar');
    await expect.element(progressbar).toBeInTheDocument();
    await takeSnapshot(`Progress - exposes role="progressbar" on the track element`);
  });

  it('renders the expected root -> label row -> track -> range structure', async () => {
    const screen = await render(<Progress value={50}>Loading...</Progress>);
    const root = getRoot(screen.container);
    const track = getTrack(screen.container);
    const range = getRange(screen.container);
    expect(root).not.toBeNull();
    expect(track).not.toBeNull();
    expect(range).not.toBeNull();
    expect(root.contains(track)).toBe(true);
    expect(track.contains(range)).toBe(true);
    await takeSnapshot(`Progress - renders the expected root -> label row -> track -> range structure`);
  });

  it('defaults min to 0 and max to 100 when not provided', async () => {
    const screen = await render(<Progress value={25}>Defaults</Progress>);
    const track = getTrack(screen.container);
    expect(track.getAttribute('aria-valuemin')).toBe('0');
    expect(track.getAttribute('aria-valuemax')).toBe('100');
    await takeSnapshot(`Progress - defaults min to 0 and max to 100 when not provided`);
  });

  it('displays the value as a formatted percentage in the value text by default', async () => {
    const screen = await render(<Progress value={50}>Loading...</Progress>);
    const valueText = getValueText(screen.container);
    expect(valueText.textContent).toBe('50%');
    await takeSnapshot(`Progress - displays the value as a formatted percentage in the value text by default`);
  });

  /* -----------------------------------------------------------------------
   * Value/min/max ARIA attributes (5)
   * -------------------------------------------------------------------- */

  it('sets aria-valuemin and aria-valuemax to the given min/max', async () => {
    const screen = await render(
      <Progress value={30} min={10} max={60}>
        Range
      </Progress>
    );
    const track = getTrack(screen.container);
    expect(track.getAttribute('aria-valuemin')).toBe('10');
    expect(track.getAttribute('aria-valuemax')).toBe('60');
    await takeSnapshot(`Progress - sets aria-valuemin and aria-valuemax to the given min/max`);
  });

  it('sets aria-valuenow to the current value', async () => {
    const screen = await render(<Progress value={73}>Value</Progress>);
    const track = getTrack(screen.container);
    expect(track.getAttribute('aria-valuenow')).toBe('73');
    await takeSnapshot(`Progress - sets aria-valuenow to the current value`);
  });

  it('reflects a custom min/max range in aria-valuemin/aria-valuemax together', async () => {
    const screen = await render(
      <Progress value={150} min={100} max={200}>
        Custom range
      </Progress>
    );
    const track = getTrack(screen.container);
    expect(track.getAttribute('aria-valuemin')).toBe('100');
    expect(track.getAttribute('aria-valuemax')).toBe('200');
    expect(track.getAttribute('aria-valuenow')).toBe('150');
    await takeSnapshot(`Progress - reflects a custom min/max range in aria-valuemin/aria-valuemax together`);
  });

  it('sets aria-valuenow precisely for a fractional value', async () => {
    const screen = await render(<Progress value={33.33}>Fractional</Progress>);
    const track = getTrack(screen.container);
    expect(track.getAttribute('aria-valuenow')).toBe('33.33');
    await takeSnapshot(`Progress - sets aria-valuenow precisely for a fractional value`);
  });

  it('sets aria-label to the formatted percentage string', async () => {
    const screen = await render(<Progress value={40}>Loading...</Progress>);
    const track = getTrack(screen.container);
    expect(track.getAttribute('aria-label')).toBe('40%');
    await takeSnapshot(`Progress - sets aria-label to the formatted percentage string`);
  });

  /* -----------------------------------------------------------------------
   * Percentage / clamping math on the visual range (6)
   * -------------------------------------------------------------------- */

  it('renders a 0% range width when value equals min', async () => {
    const screen = await render(
      <Progress value={0} min={0} max={100}>
        Zero
      </Progress>
    );
    const range = getRange(screen.container);
    expect(range.style.width).toBe('0%');
    await takeSnapshot(`Progress - renders a 0% range width when value equals min`);
  });

  it('renders a 100% range width when value equals max', async () => {
    const screen = await render(
      <Progress value={100} min={0} max={100}>
        Complete
      </Progress>
    );
    const range = getRange(screen.container);
    expect(range.style.width).toBe('100%');
    await takeSnapshot(`Progress - renders a 100% range width when value equals max`);
  });

  it('renders a 50% range width at the midpoint of the default range', async () => {
    const screen = await render(<Progress value={50}>Half</Progress>);
    const range = getRange(screen.container);
    expect(range.style.width).toBe('50%');
    await takeSnapshot(`Progress - renders a 50% range width at the midpoint of the default range`);
  });

  it('computes range width correctly for a custom min/max range', async () => {
    const screen = await render(
      <Progress value={120} min={0} max={200}>
        Custom range
      </Progress>
    );
    const range = getRange(screen.container);
    expect(range.style.width).toBe('60%');
    await takeSnapshot(`Progress - computes range width correctly for a custom min/max range`);
  });

  it('computes range width correctly for an entirely negative range', async () => {
    const screen = await render(
      <Progress value={-75} min={-100} max={-50}>
        Negative range
      </Progress>
    );
    const range = getRange(screen.container);
    expect(range.style.width).toBe('50%');
    await takeSnapshot(`Progress - computes range width correctly for an entirely negative range`);
  });

  it('computes range width correctly for a fractional value', async () => {
    const screen = await render(<Progress value={33.33}>Fractional</Progress>);
    const range = getRange(screen.container);
    expect(range.style.width).toBe('33.33%');
    await takeSnapshot(`Progress - computes range width correctly for a fractional value`);
  });

  /* -----------------------------------------------------------------------
   * data-state: loading / complete / indeterminate (3)
   * -------------------------------------------------------------------- */

  it('marks data-state="loading" when value is between min and max', async () => {
    const screen = await render(<Progress value={50}>Loading</Progress>);
    const track = getTrack(screen.container);
    expect(track.getAttribute('data-state')).toBe('loading');
    await takeSnapshot(`Progress - marks data-state="loading" when value is between min and max`);
  });

  it('marks data-state="complete" when value equals max', async () => {
    const screen = await render(<Progress value={100}>Complete</Progress>);
    const track = getTrack(screen.container);
    expect(track.getAttribute('data-state')).toBe('complete');
    await takeSnapshot(`Progress - marks data-state="complete" when value equals max`);
  });

  it('marks data-state="indeterminate" and omits aria-valuenow when value is null', async () => {
    // The underlying Ark/zag progress machine supports a `null` value to
    // represent an indeterminate state, even though this component's public
    // `ProgressProps.value` is typed as `number`. This cast intentionally
    // exercises that underlying capability.
    const screen = await render(
      <Progress value={null as unknown as number}>Indeterminate</Progress>
    );
    const track = getTrack(screen.container);
    expect(track.getAttribute('data-state')).toBe('indeterminate');
    expect(track.hasAttribute('aria-valuenow')).toBe(false);
    expect(track.getAttribute('aria-label')).toBe('loading...');
    await takeSnapshot(`Progress - marks data-state="indeterminate" and omits aria-valuenow when value is null`);
  });

  /* -----------------------------------------------------------------------
   * Orientation (6)
   * -------------------------------------------------------------------- */

  it('defaults to horizontal orientation', async () => {
    const screen = await render(<Progress value={50}>Default orientation</Progress>);
    const track = getTrack(screen.container);
    expect(track.getAttribute('data-orientation')).toBe('horizontal');
    await takeSnapshot(`Progress - defaults to horizontal orientation`);
  });

  it('sets data-orientation="vertical" on the track and range when orientation is vertical', async () => {
    const screen = await render(
      <Progress value={50} orientation="vertical">
        Vertical
      </Progress>
    );
    const track = getTrack(screen.container);
    const range = getRange(screen.container);
    expect(track.getAttribute('data-orientation')).toBe('vertical');
    expect(range.getAttribute('data-orientation')).toBe('vertical');
    await takeSnapshot(`Progress - sets data-orientation="vertical" on the track and range when orientation is vertical`);
  });

  it('lays out the root with row flex-direction and fit-content width for vertical orientation', async () => {
    const screen = await render(
      <Progress value={50} orientation="vertical">
        Vertical
      </Progress>
    );
    const root = getRoot(screen.container);
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ flexDirection: 'row', width: 'fit-content' });
    await takeSnapshot(`Progress - lays out the root with row flex-direction and fit-content width for vertical orientation`);
  });

  it('renders the track with vertical width/height dimensions', async () => {
    const screen = await render(
      <Progress value={50} orientation="vertical">
        Vertical
      </Progress>
    );
    const track = getTrack(screen.container);
    expect(track.style.width).toBe('0.5rem');
    expect(track.style.height).toBe('200px');
    await takeSnapshot(`Progress - renders the track with vertical width/height dimensions`);
  });

  it('renders the range using height (not width) for the percentage in vertical orientation', async () => {
    const screen = await render(
      <Progress value={40} orientation="vertical">
        Vertical
      </Progress>
    );
    const range = getRange(screen.container);
    expect(range.style.height).toBe('40%');
    expect(range.style.width).toBe('100%');
    await takeSnapshot(`Progress - renders the range using height (not width) for the percentage in vertical orientation`);
  });

  it('renders the range using width (not height) for the percentage in horizontal orientation', async () => {
    const screen = await render(<Progress value={40}>Horizontal</Progress>);
    const range = getRange(screen.container);
    expect(range.style.width).toBe('40%');
    expect(range.style.height).toBe('100%');
    await takeSnapshot(`Progress - renders the range using width (not height) for the percentage in horizontal orientation`);
  });

  /* -----------------------------------------------------------------------
   * Disabled state (4)
   * -------------------------------------------------------------------- */

  it('applies 0.5 opacity to the root when disabled', async () => {
    const screen = await render(
      <Progress value={50} disabled>
        Disabled
      </Progress>
    );
    const root = getRoot(screen.container);
    await expect.element(locatorFor(root)).toHaveStyle({ opacity: '0.5' });
    await takeSnapshot(`Progress - applies 0.5 opacity to the root when disabled`);
  });

  it('sets pointer-events none on the root when disabled', async () => {
    const screen = await render(
      <Progress value={50} disabled>
        Disabled
      </Progress>
    );
    const root = getRoot(screen.container);
    await expect.element(locatorFor(root)).toHaveStyle({ pointerEvents: 'none' });
    await takeSnapshot(`Progress - sets pointer-events none on the root when disabled`);
  });

  it('renders full opacity when not disabled', async () => {
    const screen = await render(<Progress value={50}>Enabled</Progress>);
    const root = getRoot(screen.container);
    await expect.element(locatorFor(root)).toHaveStyle({ opacity: '1' });
    await takeSnapshot(`Progress - renders full opacity when not disabled`);
  });

  it('still reports the correct aria-valuenow when disabled, since disabled is a visual-only prop', async () => {
    const screen = await render(
      <Progress value={65} disabled>
        Disabled
      </Progress>
    );
    const track = getTrack(screen.container);
    expect(track.getAttribute('aria-valuenow')).toBe('65');
    await takeSnapshot(`Progress - still reports the correct aria-valuenow when disabled, since disabled is a visual-only prop`);
  });

  /* -----------------------------------------------------------------------
   * Read-only state (4)
   * -------------------------------------------------------------------- */

  it('sets pointer-events none on the root when readonly, without reducing opacity', async () => {
    const screen = await render(
      <Progress value={50} readonly>
        Read-only
      </Progress>
    );
    const root = getRoot(screen.container);
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ pointerEvents: 'none', opacity: '1' });
    await takeSnapshot(`Progress - sets pointer-events none on the root when readonly, without reducing opacity`);
  });

  it('renders the range with a muted slate color when readonly', async () => {
    const screen = await render(
      <Progress value={50} readonly>
        Read-only
      </Progress>
    );
    const range = getRange(screen.container);
    await expect
      .element(locatorFor(range))
      .toHaveStyle({ backgroundColor: color.slate400 });
    await takeSnapshot(`Progress - renders the range with a muted slate color when readonly`);
  });

  it('renders the range with the blue accent color when not readonly', async () => {
    const screen = await render(<Progress value={50}>Active</Progress>);
    const range = getRange(screen.container);
    await expect
      .element(locatorFor(range))
      .toHaveStyle({ backgroundColor: color.blue500 });
    await takeSnapshot(`Progress - renders the range with the blue accent color when not readonly`);
  });

  it('combines disabled and readonly for both reduced opacity and no pointer events', async () => {
    const screen = await render(
      <Progress value={50} disabled readonly>
        Disabled and read-only
      </Progress>
    );
    const root = getRoot(screen.container);
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ opacity: '0.5', pointerEvents: 'none' });
    await takeSnapshot(`Progress - combines disabled and readonly for both reduced opacity and no pointer events`);
  });

  /* -----------------------------------------------------------------------
   * Label / value-text content (5)
   * -------------------------------------------------------------------- */

  it('renders custom children as the label text', async () => {
    const screen = await render(<Progress value={50}>Uploading files...</Progress>);
    const label = getLabel(screen.container);
    expect(label.textContent).toBe('Uploading files...');
    await takeSnapshot(`Progress - renders custom children as the label text`);
  });

  it('falls back to "Loading..." when no children are provided', async () => {
    const screen = await render(<Progress value={50} />);
    const label = getLabel(screen.container);
    expect(label.textContent).toBe('Loading...');
    await takeSnapshot(`Progress - falls back to "Loading..." when no children are provided`);
  });

  it('falls back to "Loading..." when children is an empty string', async () => {
    const screen = await render(<Progress value={50}>{''}</Progress>);
    const label = getLabel(screen.container);
    expect(label.textContent).toBe('Loading...');
    await takeSnapshot(`Progress - falls back to "Loading..." when children is an empty string`);
  });

  it('preserves unicode/emoji label content exactly', async () => {
    const screen = await render(<Progress value={80}>🚀 Presque terminé !</Progress>);
    const label = getLabel(screen.container);
    expect(label.textContent).toBe('🚀 Presque terminé !');
    await takeSnapshot(`Progress - preserves unicode/emoji label content exactly`);
  });

  it('preserves RTL unicode label content exactly', async () => {
    const screen = await render(<Progress value={65}>جارٍ التحميل</Progress>);
    const label = getLabel(screen.container);
    expect(label.textContent).toBe('جارٍ التحميل');
    await takeSnapshot(`Progress - preserves RTL unicode label content exactly`);
  });

  /* -----------------------------------------------------------------------
   * Zero/complete edge values (4)
   * -------------------------------------------------------------------- */

  it('renders a fully empty range at 0%', async () => {
    const screen = await render(
      <Progress value={0} min={0} max={100}>
        Not started
      </Progress>
    );
    const range = getRange(screen.container);
    expect(range.style.width).toBe('0%');
    await takeSnapshot(`Progress - renders a fully empty range at 0%`);
  });

  it('renders a fully filled range at 100%', async () => {
    const screen = await render(
      <Progress value={100} min={0} max={100}>
        Complete
      </Progress>
    );
    const range = getRange(screen.container);
    expect(range.style.width).toBe('100%');
    await takeSnapshot(`Progress - renders a fully filled range at 100%`);
  });

  it('shows "0%" in the value text at the minimum value', async () => {
    const screen = await render(
      <Progress value={0} min={0} max={100}>
        Not started
      </Progress>
    );
    const valueText = getValueText(screen.container);
    expect(valueText.textContent).toBe('0%');
    await takeSnapshot(`Progress - shows "0%" in the value text at the minimum value`);
  });

  it('shows "100%" in the value text at the maximum value', async () => {
    const screen = await render(
      <Progress value={100} min={0} max={100}>
        Complete
      </Progress>
    );
    const valueText = getValueText(screen.container);
    expect(valueText.textContent).toBe('100%');
    await takeSnapshot(`Progress - shows "100%" in the value text at the maximum value`);
  });

  /* -----------------------------------------------------------------------
   * Degenerate/edge numeric ranges (3)
   * -------------------------------------------------------------------- */

  it('does not throw when min equals max', async () => {
    await expect(
      render(
        <Progress value={50} min={50} max={50}>
          Degenerate range
        </Progress>
      )
    ).resolves.not.toThrow();
    await takeSnapshot(`Progress - does not throw when min equals max`);
  });

  it('keeps aria-valuemin and aria-valuemax equal when min equals max', async () => {
    const screen = await render(
      <Progress value={50} min={50} max={50}>
        Degenerate range
      </Progress>
    );
    const track = getTrack(screen.container);
    expect(track.getAttribute('aria-valuemin')).toBe('50');
    expect(track.getAttribute('aria-valuemax')).toBe('50');
    expect(track.getAttribute('data-state')).toBe('complete');
    await takeSnapshot(`Progress - keeps aria-valuemin and aria-valuemax equal when min equals max`);
  });

  it('handles a large custom max value correctly', async () => {
    const screen = await render(
      <Progress value={250} min={0} max={1000}>
        Large max
      </Progress>
    );
    const track = getTrack(screen.container);
    const range = getRange(screen.container);
    expect(track.getAttribute('aria-valuemax')).toBe('1000');
    expect(range.style.width).toBe('25%');
    await takeSnapshot(`Progress - handles a large custom max value correctly`);
  });

  /* -----------------------------------------------------------------------
   * Controlled value updates (2)
   * -------------------------------------------------------------------- */

  it('updates aria-valuenow and the range width when the value prop changes', async () => {
    const screen = await render(<ControlledValueFixture initialValue={20} />);
    const track = getTrack(screen.container);
    expect(track.getAttribute('aria-valuenow')).toBe('20');

    await userEvent.click(screen.getByRole('button', { name: 'Jump to 100' }));

    await expect.element(locatorFor(track)).toHaveAttribute('aria-valuenow', '100');
    await expect.element(locatorFor(getRange(screen.container))).toHaveStyle({ width: '100%' });
    await takeSnapshot(`Progress - updates aria-valuenow and the range width when the value prop changes`);
  });

  it('transitions data-state from "loading" to "complete" as the controlled value reaches max', async () => {
    const screen = await render(<ControlledValueFixture initialValue={20} />);
    expect(getTrack(screen.container).getAttribute('data-state')).toBe('loading');

    await userEvent.click(screen.getByRole('button', { name: 'Jump to 100' }));

    await expect.element(locatorFor(getTrack(screen.container))).toHaveAttribute('data-state', 'complete');
    await takeSnapshot(`Progress - transitions data-state from "loading" to "complete" as the controlled value reaches max`);
  });

  /* -----------------------------------------------------------------------
   * Multiple instances (2)
   * -------------------------------------------------------------------- */

  it('renders independent progress bars without sharing value state', async () => {
    const screen = await render(
      <div>
        <Progress value={25}>First</Progress>
        <Progress value={75}>Second</Progress>
      </div>
    );
    const tracks = screen.container.querySelectorAll('[role="progressbar"]');
    expect(tracks).toHaveLength(2);
    expect(tracks[0].getAttribute('aria-valuenow')).toBe('25');
    expect(tracks[1].getAttribute('aria-valuenow')).toBe('75');
    await takeSnapshot(`Progress - renders independent progress bars without sharing value state`);
  });

  it('computes independent percentages for two progress bars with different ranges', async () => {
    const screen = await render(
      <div>
        <Progress value={50} min={0} max={100}>
          First
        </Progress>
        <Progress value={50} min={0} max={200}>
          Second
        </Progress>
      </div>
    );
    const ranges = screen.container.querySelectorAll('[data-part="range"]');
    expect((ranges[0] as HTMLElement).style.width).toBe('50%');
    expect((ranges[1] as HTMLElement).style.width).toBe('25%');
    await takeSnapshot(`Progress - computes independent percentages for two progress bars with different ranges`);
  });

  /* -----------------------------------------------------------------------
   * Kitchen-sink combinations (2)
   * -------------------------------------------------------------------- */

  it('renders vertical + disabled + custom range + custom label together correctly', async () => {
    const screen = await render(
      <Progress value={80} min={0} max={160} orientation="vertical" disabled>
        Kitchen sink: disabled vertical custom range
      </Progress>
    );
    const root = getRoot(screen.container);
    const track = getTrack(screen.container);
    const range = getRange(screen.container);
    const label = getLabel(screen.container);

    await expect.element(locatorFor(root)).toHaveStyle({ opacity: '0.5' });
    expect(track.getAttribute('data-orientation')).toBe('vertical');
    expect(track.getAttribute('aria-valuemax')).toBe('160');
    expect(range.style.height).toBe('50%');
    expect(label.textContent).toBe('Kitchen sink: disabled vertical custom range');
    await takeSnapshot(`Progress - renders vertical + disabled + custom range + custom label together correctly`);
  });

  it('renders read-only + custom range + long label together correctly', async () => {
    const longLabel =
      'Kitchen sink: read-only progress with a custom range and a fairly long descriptive label';
    const screen = await render(
      <Progress value={340} min={100} max={500} readonly>
        {longLabel}
      </Progress>
    );
    const root = getRoot(screen.container);
    const track = getTrack(screen.container);
    const range = getRange(screen.container);
    const label = getLabel(screen.container);

    await expect.element(locatorFor(root)).toHaveStyle({ pointerEvents: 'none' });
    expect(track.getAttribute('aria-valuemin')).toBe('100');
    expect(track.getAttribute('aria-valuemax')).toBe('500');
    expect(range.style.width).toBe('60%');
    await expect
      .element(locatorFor(range))
      .toHaveStyle({ backgroundColor: color.slate400 });
    expect(label.textContent).toBe(longLabel);
    await takeSnapshot(`Progress - renders read-only + custom range + long label together correctly`);
  });
});
