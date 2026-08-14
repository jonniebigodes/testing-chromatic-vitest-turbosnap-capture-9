import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import Meter from './Meter';
import { color } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

/** Wraps a raw HTMLElement into a Locator so jest-dom matchers can be used. */
const locatorFor = (element: HTMLElement) => page.elementLocator(element);

/** The colored bar reflecting the current value / computed meter color. */
const getRange = (container: HTMLElement, index = 0) =>
  container.querySelectorAll('[data-part="range"]')[index] as HTMLElement;

/** The track element exposing the progressbar role and aria-value* attrs. */
const getTrack = (container: HTMLElement, index = 0) =>
  container.querySelectorAll('[data-part="track"]')[index] as HTMLElement;

/** The value-text span rendering the formatted percentage (e.g. "50%"). */
const getValueText = (container: HTMLElement, index = 0) =>
  container.querySelectorAll('[data-part="value-text"]')[index] as HTMLElement;

/** The label span rendering the children content, if provided. */
const getLabel = (container: HTMLElement, index = 0): HTMLElement | null =>
  container.querySelectorAll('[data-part="label"]')[index] as
    | HTMLElement
    | undefined ?? null;

describe('Meter', () => {
  /* -----------------------------------------------------------------------
   * Rendering defaults (3)
   * -------------------------------------------------------------------- */

  it('renders with default min(0), max(100), and value(0) when no props are given', async () => {
    const screen = await render(<Meter />);
    const track = getTrack(screen.container);
    await expect.element(locatorFor(track)).toHaveAttribute('aria-valuemin', '0');
    await expect.element(locatorFor(track)).toHaveAttribute('aria-valuemax', '100');
    await expect.element(locatorFor(track)).toHaveAttribute('aria-valuenow', '0');
    await takeSnapshot(`Meter - renders with default min(0), max(100), and value(0) when no props are given`);
  });

  it('renders provided children as the label text', async () => {
    const screen = await render(<Meter value={50}>Disk Usage</Meter>);
    await expect.element(screen.getByText('Disk Usage')).toBeInTheDocument();
    await takeSnapshot(`Meter - renders provided children as the label text`);
  });

  it('does not render a label element when no children are provided', async () => {
    const screen = await render(<Meter value={10} />);
    expect(getLabel(screen.container)).toBeNull();
    await takeSnapshot(`Meter - does not render a label element when no children are provided`);
  });

  /* -----------------------------------------------------------------------
   * Percentage / range width clamping (6)
   * -------------------------------------------------------------------- */

  it('renders the range at 0% width when value equals min', async () => {
    const screen = await render(<Meter value={0} min={0} max={100} />);
    const range = getRange(screen.container);
    await expect.element(locatorFor(range)).toHaveStyle({ width: '0%' });
    await takeSnapshot(`Meter - renders the range at 0% width when value equals min`);
  });

  it('renders the range at 100% width when value equals max', async () => {
    const screen = await render(<Meter value={100} min={0} max={100} />);
    const range = getRange(screen.container);
    await expect.element(locatorFor(range)).toHaveStyle({ width: '100%' });
    await takeSnapshot(`Meter - renders the range at 100% width when value equals max`);
  });

  it('renders the range at 50% width for a value at the midpoint of min/max', async () => {
    const screen = await render(<Meter value={50} min={0} max={100} />);
    const range = getRange(screen.container);
    await expect.element(locatorFor(range)).toHaveStyle({ width: '50%' });
    await takeSnapshot(`Meter - renders the range at 50% width for a value at the midpoint of min/max`);
  });

  it('renders the range at exactly 0% width at the min boundary of a non-zero-based range', async () => {
    const screen = await render(<Meter value={20} min={20} max={80} />);
    const range = getRange(screen.container);
    await expect.element(locatorFor(range)).toHaveStyle({ width: '0%' });
    await takeSnapshot(`Meter - renders the range at exactly 0% width at the min boundary of a non-zero-based range`);
  });

  it('renders the range at exactly 100% width at the max boundary of a non-zero-based range', async () => {
    const screen = await render(<Meter value={80} min={20} max={80} />);
    const range = getRange(screen.container);
    await expect.element(locatorFor(range)).toHaveStyle({ width: '100%' });
    await takeSnapshot(`Meter - renders the range at exactly 100% width at the max boundary of a non-zero-based range`);
  });

  it('computes the correct width percentage for a custom non-zero min/max range', async () => {
    const screen = await render(<Meter value={100} min={50} max={150} />);
    const range = getRange(screen.container);
    await expect.element(locatorFor(range)).toHaveStyle({ width: '50%' });
    await takeSnapshot(`Meter - computes the correct width percentage for a custom non-zero min/max range`);
  });

  /* -----------------------------------------------------------------------
   * Color logic - optimum-high branch boundaries (5)
   * low=30, high=70, optimum=90
   * -------------------------------------------------------------------- */

  it('renders red when the value is below the low threshold with a high optimum', async () => {
    const screen = await render(
      <Meter value={25} min={0} max={100} optimum={90} low={30} high={70} />
    );
    const range = getRange(screen.container);
    await expect
      .element(locatorFor(range))
      .toHaveStyle({ backgroundColor: color.pink600 });
    await takeSnapshot(`Meter - renders red when the value is below the low threshold with a high optimum`);
  });

  it('renders amber exactly at the low threshold with a high optimum', async () => {
    const screen = await render(
      <Meter value={30} min={0} max={100} optimum={90} low={30} high={70} />
    );
    const range = getRange(screen.container);
    await expect
      .element(locatorFor(range))
      .toHaveStyle({ backgroundColor: color.yellow500 });
    await takeSnapshot(`Meter - renders amber exactly at the low threshold with a high optimum`);
  });

  it('renders amber between the low and high thresholds with a high optimum', async () => {
    const screen = await render(
      <Meter value={50} min={0} max={100} optimum={90} low={30} high={70} />
    );
    const range = getRange(screen.container);
    await expect
      .element(locatorFor(range))
      .toHaveStyle({ backgroundColor: color.yellow500 });
    await takeSnapshot(`Meter - renders amber between the low and high thresholds with a high optimum`);
  });

  it('renders amber (not green) exactly at the high threshold with a high optimum', async () => {
    const screen = await render(
      <Meter value={70} min={0} max={100} optimum={90} low={30} high={70} />
    );
    const range = getRange(screen.container);
    await expect
      .element(locatorFor(range))
      .toHaveStyle({ backgroundColor: color.yellow500 });
    await takeSnapshot(`Meter - renders amber (not green) exactly at the high threshold with a high optimum`);
  });

  it('renders green just above the high threshold with a high optimum', async () => {
    const screen = await render(
      <Meter value={75} min={0} max={100} optimum={90} low={30} high={70} />
    );
    const range = getRange(screen.container);
    await expect
      .element(locatorFor(range))
      .toHaveStyle({ backgroundColor: color.green500 });
    await takeSnapshot(`Meter - renders green just above the high threshold with a high optimum`);
  });

  /* -----------------------------------------------------------------------
   * Color logic - optimum-low branch boundaries (5)
   * low=30, high=70, optimum=10
   * -------------------------------------------------------------------- */

  it('renders green below the low threshold with a low optimum', async () => {
    const screen = await render(
      <Meter value={25} min={0} max={100} optimum={10} low={30} high={70} />
    );
    const range = getRange(screen.container);
    await expect
      .element(locatorFor(range))
      .toHaveStyle({ backgroundColor: color.green500 });
    await takeSnapshot(`Meter - renders green below the low threshold with a low optimum`);
  });

  it('renders amber exactly at the low threshold with a low optimum', async () => {
    const screen = await render(
      <Meter value={30} min={0} max={100} optimum={10} low={30} high={70} />
    );
    const range = getRange(screen.container);
    await expect
      .element(locatorFor(range))
      .toHaveStyle({ backgroundColor: color.yellow500 });
    await takeSnapshot(`Meter - renders amber exactly at the low threshold with a low optimum`);
  });

  it('renders amber between the low and high thresholds with a low optimum', async () => {
    const screen = await render(
      <Meter value={50} min={0} max={100} optimum={10} low={30} high={70} />
    );
    const range = getRange(screen.container);
    await expect
      .element(locatorFor(range))
      .toHaveStyle({ backgroundColor: color.yellow500 });
    await takeSnapshot(`Meter - renders amber between the low and high thresholds with a low optimum`);
  });

  it('renders amber (not red) exactly at the high threshold with a low optimum', async () => {
    const screen = await render(
      <Meter value={70} min={0} max={100} optimum={10} low={30} high={70} />
    );
    const range = getRange(screen.container);
    await expect
      .element(locatorFor(range))
      .toHaveStyle({ backgroundColor: color.yellow500 });
    await takeSnapshot(`Meter - renders amber (not red) exactly at the high threshold with a low optimum`);
  });

  it('renders red just above the high threshold with a low optimum', async () => {
    const screen = await render(
      <Meter value={75} min={0} max={100} optimum={10} low={30} high={70} />
    );
    const range = getRange(screen.container);
    await expect
      .element(locatorFor(range))
      .toHaveStyle({ backgroundColor: color.pink600 });
    await takeSnapshot(`Meter - renders red just above the high threshold with a low optimum`);
  });

  /* -----------------------------------------------------------------------
   * Color logic - optimum-middle branch boundaries (5)
   * low=30, high=70, optimum=50
   * -------------------------------------------------------------------- */

  it('renders amber below the low threshold with a middle optimum', async () => {
    const screen = await render(
      <Meter value={25} min={0} max={100} optimum={50} low={30} high={70} />
    );
    const range = getRange(screen.container);
    await expect
      .element(locatorFor(range))
      .toHaveStyle({ backgroundColor: color.yellow500 });
    await takeSnapshot(`Meter - renders amber below the low threshold with a middle optimum`);
  });

  it('renders green exactly at the low threshold with a middle optimum', async () => {
    const screen = await render(
      <Meter value={30} min={0} max={100} optimum={50} low={30} high={70} />
    );
    const range = getRange(screen.container);
    await expect
      .element(locatorFor(range))
      .toHaveStyle({ backgroundColor: color.green500 });
    await takeSnapshot(`Meter - renders green exactly at the low threshold with a middle optimum`);
  });

  it('renders green between the low and high thresholds with a middle optimum', async () => {
    const screen = await render(
      <Meter value={50} min={0} max={100} optimum={50} low={30} high={70} />
    );
    const range = getRange(screen.container);
    await expect
      .element(locatorFor(range))
      .toHaveStyle({ backgroundColor: color.green500 });
    await takeSnapshot(`Meter - renders green between the low and high thresholds with a middle optimum`);
  });

  it('renders green exactly at the high threshold with a middle optimum', async () => {
    const screen = await render(
      <Meter value={70} min={0} max={100} optimum={50} low={30} high={70} />
    );
    const range = getRange(screen.container);
    await expect
      .element(locatorFor(range))
      .toHaveStyle({ backgroundColor: color.green500 });
    await takeSnapshot(`Meter - renders green exactly at the high threshold with a middle optimum`);
  });

  it('renders amber just above the high threshold with a middle optimum', async () => {
    const screen = await render(
      <Meter value={75} min={0} max={100} optimum={50} low={30} high={70} />
    );
    const range = getRange(screen.container);
    await expect
      .element(locatorFor(range))
      .toHaveStyle({ backgroundColor: color.yellow500 });
    await takeSnapshot(`Meter - renders amber just above the high threshold with a middle optimum`);
  });

  /* -----------------------------------------------------------------------
   * Color logic - optimum exactly at a threshold edge (2)
   * -------------------------------------------------------------------- */

  it('treats an optimum equal to the low threshold as the middle branch (in-range value is green)', async () => {
    const screen = await render(
      <Meter value={50} min={0} max={100} optimum={30} low={30} high={70} />
    );
    const range = getRange(screen.container);
    await expect
      .element(locatorFor(range))
      .toHaveStyle({ backgroundColor: color.green500 });
    await takeSnapshot(`Meter - treats an optimum equal to the low threshold as the middle branch (in-range value is green)`);
  });

  it('treats an optimum equal to the high threshold as the middle branch (in-range value is green)', async () => {
    const screen = await render(
      <Meter value={50} min={0} max={100} optimum={70} low={30} high={70} />
    );
    const range = getRange(screen.container);
    await expect
      .element(locatorFor(range))
      .toHaveStyle({ backgroundColor: color.green500 });
    await takeSnapshot(`Meter - treats an optimum equal to the high threshold as the middle branch (in-range value is green)`);
  });

  /* -----------------------------------------------------------------------
   * Color logic - default thresholds when low/high/optimum are omitted (3)
   * min=0, max=100 => low=33, high=66, optimum defaults to max (100)
   * -------------------------------------------------------------------- */

  it('renders red below the default low third when no thresholds are configured', async () => {
    const screen = await render(<Meter value={20} min={0} max={100} />);
    const range = getRange(screen.container);
    await expect
      .element(locatorFor(range))
      .toHaveStyle({ backgroundColor: color.pink600 });
    await takeSnapshot(`Meter - renders red below the default low third when no thresholds are configured`);
  });

  it('renders amber in the default middle third when no thresholds are configured', async () => {
    const screen = await render(<Meter value={50} min={0} max={100} />);
    const range = getRange(screen.container);
    await expect
      .element(locatorFor(range))
      .toHaveStyle({ backgroundColor: color.yellow500 });
    await takeSnapshot(`Meter - renders amber in the default middle third when no thresholds are configured`);
  });

  it('renders green above the default high third when no thresholds are configured', async () => {
    const screen = await render(<Meter value={80} min={0} max={100} />);
    const range = getRange(screen.container);
    await expect
      .element(locatorFor(range))
      .toHaveStyle({ backgroundColor: color.green500 });
    await takeSnapshot(`Meter - renders green above the default high third when no thresholds are configured`);
  });

  /* -----------------------------------------------------------------------
   * Min/max range variations (5)
   * -------------------------------------------------------------------- */

  it('supports a negative min value and computes the correct width', async () => {
    const screen = await render(<Meter value={30} min={-50} max={50} />);
    const range = getRange(screen.container);
    await expect.element(locatorFor(range)).toHaveStyle({ width: '80%' });
    await takeSnapshot(`Meter - supports a negative min value and computes the correct width`);
  });

  it('supports a non-zero min and max range', async () => {
    const screen = await render(<Meter value={50} min={20} max={80} />);
    const range = getRange(screen.container);
    await expect.element(locatorFor(range)).toHaveStyle({ width: '50%' });
    await takeSnapshot(`Meter - supports a non-zero min and max range`);
  });

  it('supports fractional/decimal values', async () => {
    const screen = await render(<Meter value={2.5} min={0} max={10} />);
    const range = getRange(screen.container);
    await expect.element(locatorFor(range)).toHaveStyle({ width: '25%' });
    await takeSnapshot(`Meter - supports fractional/decimal values`);
  });

  it('supports a very large numeric range', async () => {
    const screen = await render(
      <Meter value={250000} min={0} max={1000000} />
    );
    const range = getRange(screen.container);
    await expect.element(locatorFor(range)).toHaveStyle({ width: '25%' });
    await takeSnapshot(`Meter - supports a very large numeric range`);
  });

  it('does not throw when min equals max (zero-width range)', async () => {
    await expect(
      render(<Meter value={50} min={50} max={50} />)
    ).resolves.not.toThrow();
    await takeSnapshot(`Meter - does not throw when min equals max (zero-width range)`);
  });

  /* -----------------------------------------------------------------------
   * Color computation exactly at the min/max range boundaries (2)
   * -------------------------------------------------------------------- */

  it('computes a threshold-based color at the min boundary (optimum-low branch)', async () => {
    const screen = await render(
      <Meter value={0} min={0} max={100} optimum={10} low={30} high={70} />
    );
    const range = getRange(screen.container);
    await expect
      .element(locatorFor(range))
      .toHaveStyle({ backgroundColor: color.green500 });
    await takeSnapshot(`Meter - computes a threshold-based color at the min boundary (optimum-low branch)`);
  });

  it('computes a threshold-based color at the max boundary (optimum-high branch)', async () => {
    const screen = await render(
      <Meter value={100} min={0} max={100} optimum={90} low={30} high={70} />
    );
    const range = getRange(screen.container);
    await expect
      .element(locatorFor(range))
      .toHaveStyle({ backgroundColor: color.green500 });
    await takeSnapshot(`Meter - computes a threshold-based color at the max boundary (optimum-high branch)`);
  });

  /* -----------------------------------------------------------------------
   * Label rendering (4)
   * -------------------------------------------------------------------- */

  it('renders long label text in full without truncating the DOM text content', async () => {
    const longText =
      'Primary database cluster replication lag as a percentage of the configured maximum acceptable threshold';
    const screen = await render(<Meter value={55}>{longText}</Meter>);
    await expect.element(screen.getByText(longText)).toHaveTextContent(longText);
    await takeSnapshot(`Meter - renders long label text in full without truncating the DOM text content`);
  });

  it('renders unicode and emoji label content exactly', async () => {
    const screen = await render(<Meter value={42}>🔋 Battery Status ⚡</Meter>);
    await expect
      .element(screen.getByText('🔋 Battery Status ⚡'))
      .toHaveTextContent('🔋 Battery Status ⚡');
    await takeSnapshot(`Meter - renders unicode and emoji label content exactly`);
  });

  it('does not render a label element for an empty-string children value', async () => {
    const screen = await render(<Meter value={10}>{''}</Meter>);
    expect(getLabel(screen.container)).toBeNull();
    await takeSnapshot(`Meter - does not render a label element for an empty-string children value`);
  });

  it('renders a whitespace-only label as a truthy label element', async () => {
    const screen = await render(<Meter value={10}>{'   '}</Meter>);
    expect(getLabel(screen.container)).not.toBeNull();
    await takeSnapshot(`Meter - renders a whitespace-only label as a truthy label element`);
  });

  /* -----------------------------------------------------------------------
   * Value-text content (4)
   * -------------------------------------------------------------------- */

  it('renders the formatted percentage in the value text for a mid-range value', async () => {
    const screen = await render(<Meter value={42} min={0} max={100} />);
    const valueText = getValueText(screen.container);
    await expect.element(locatorFor(valueText)).toHaveTextContent('42%');
    await takeSnapshot(`Meter - renders the formatted percentage in the value text for a mid-range value`);
  });

  it('renders 0% in the value text at the minimum value', async () => {
    const screen = await render(<Meter value={0} min={0} max={100} />);
    const valueText = getValueText(screen.container);
    await expect.element(locatorFor(valueText)).toHaveTextContent('0%');
    await takeSnapshot(`Meter - renders 0% in the value text at the minimum value`);
  });

  it('renders 100% in the value text at the maximum value', async () => {
    const screen = await render(<Meter value={100} min={0} max={100} />);
    const valueText = getValueText(screen.container);
    await expect.element(locatorFor(valueText)).toHaveTextContent('100%');
    await takeSnapshot(`Meter - renders 100% in the value text at the maximum value`);
  });

  it('rounds the formatted percentage in the value text when the exact percentage is not a whole number', async () => {
    const screen = await render(<Meter value={1} min={0} max={3} />);
    const valueText = getValueText(screen.container);
    await expect.element(locatorFor(valueText)).toHaveTextContent('33%');
    await takeSnapshot(`Meter - rounds the formatted percentage in the value text when the exact percentage is not a whole number`);
  });

  /* -----------------------------------------------------------------------
   * Accessibility / ARIA attributes (3)
   * -------------------------------------------------------------------- */

  it('exposes the progressbar role with the correct aria-valuemin/aria-valuemax', async () => {
    const screen = await render(<Meter value={40} min={10} max={90} />);
    const track = getTrack(screen.container);
    await expect.element(locatorFor(track)).toHaveAttribute('role', 'progressbar');
    await expect.element(locatorFor(track)).toHaveAttribute('aria-valuemin', '10');
    await expect.element(locatorFor(track)).toHaveAttribute('aria-valuemax', '90');
    await takeSnapshot(`Meter - exposes the progressbar role with the correct aria-valuemin/aria-valuemax`);
  });

  it('updates aria-valuenow to reflect the current value', async () => {
    const screen = await render(<Meter value={63} min={0} max={100} />);
    const track = getTrack(screen.container);
    await expect.element(locatorFor(track)).toHaveAttribute('aria-valuenow', '63');
    await takeSnapshot(`Meter - updates aria-valuenow to reflect the current value`);
  });

  it('exposes aria-live="polite" on the value text for screen reader announcements', async () => {
    const screen = await render(<Meter value={10} min={0} max={100} />);
    const valueText = getValueText(screen.container);
    await expect
      .element(locatorFor(valueText))
      .toHaveAttribute('aria-live', 'polite');
    await takeSnapshot(`Meter - exposes aria-live="polite" on the value text for screen reader announcements`);
  });

  /* -----------------------------------------------------------------------
   * Kitchen-sink combinations (3)
   * -------------------------------------------------------------------- */

  it('renders a kitchen-sink combo (custom min/max/value/optimum/low/high/label) that resolves to green', async () => {
    const screen = await render(
      <Meter
        value={85}
        min={0}
        max={100}
        optimum={100}
        low={60}
        high={80}
        children="Score"
      />
    );
    const range = getRange(screen.container);
    const valueText = getValueText(screen.container);
    await expect
      .element(locatorFor(range))
      .toHaveStyle({ backgroundColor: color.green500 });
    await expect.element(locatorFor(valueText)).toHaveTextContent('85%');
    await expect.element(screen.getByText('Score')).toBeInTheDocument();
    await takeSnapshot(`Meter - renders a kitchen-sink combo (custom min/max/value/optimum/low/high/label) that resolves to green`);
  });

  it('renders a kitchen-sink combo (custom min/max/value/optimum/low/high/label) that resolves to red', async () => {
    const screen = await render(
      <Meter
        value={95}
        min={0}
        max={100}
        optimum={20}
        low={30}
        high={70}
        children="CPU Temperature"
      />
    );
    const range = getRange(screen.container);
    await expect
      .element(locatorFor(range))
      .toHaveStyle({ backgroundColor: color.pink600 });
    await expect
      .element(screen.getByText('CPU Temperature'))
      .toBeInTheDocument();
    await takeSnapshot(`Meter - renders a kitchen-sink combo (custom min/max/value/optimum/low/high/label) that resolves to red`);
  });

  it('renders multiple independent meters without shared state or color bleed between instances', async () => {
    const screen = await render(
      <div>
        <Meter value={90} min={0} max={100} optimum={90} low={30} high={70}>
          First
        </Meter>
        <Meter value={20} min={0} max={100} optimum={90} low={30} high={70}>
          Second
        </Meter>
      </div>
    );
    const firstRange = getRange(screen.container, 0);
    const secondRange = getRange(screen.container, 1);
    await expect
      .element(locatorFor(firstRange))
      .toHaveStyle({ backgroundColor: color.green500 });
    await expect
      .element(locatorFor(secondRange))
      .toHaveStyle({ backgroundColor: color.pink600 });
    await takeSnapshot(`Meter - renders multiple independent meters without shared state or color bleed between instances`);
  });
});
