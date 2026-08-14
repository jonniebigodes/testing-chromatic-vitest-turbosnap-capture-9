import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent, page } from 'vitest/browser';
import { useState } from 'react';
import { CalendarDate } from '@internationalized/date';
import Calendar, { type DateValue } from './Calendar';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

/** Wraps a raw HTMLElement into a Locator so jest-dom matchers can be used. */
const locatorFor = (element: HTMLElement) => page.elementLocator(element);

/** Query a day cell trigger in the day view grid by its ISO date string (e.g. "2024-01-15"). */
const getDayCell = (container: HTMLElement, iso: string) =>
  container.querySelector(
    `[data-view="day"][data-value="${iso}"]`
  ) as HTMLElement;

/** Query a month cell trigger in the month view grid by its 1-12 month number. */
const getMonthCell = (container: HTMLElement, month: number) =>
  container.querySelector(
    `[data-view="month"][data-value="${month}"]`
  ) as HTMLElement;

/** Query a year cell trigger in the year view grid by its 4-digit year. */
const getYearCell = (container: HTMLElement, year: number) =>
  container.querySelector(
    `[data-view="year"][data-value="${year}"]`
  ) as HTMLElement;

/** The currently-visible grid (day, month, or year), identified via its data-view attribute. */
const getVisibleGrid = (container: HTMLElement) => {
  const grids = Array.from(
    container.querySelectorAll('[role="grid"]')
  ) as HTMLElement[];
  return grids.find((grid) => !grid.closest('[hidden]')) as HTMLElement;
};

/** The view-scoped header trigger that shows "Month Year" and toggles to the next view up. */
const getViewTrigger = (container: HTMLElement, view: 'day' | 'month' | 'year') =>
  container.querySelector(`button[data-view="${view}"]`) as HTMLElement;

/** The prev/next navigation buttons, identified by their aria-label text. */
const getNavTrigger = (container: HTMLElement, label: string) =>
  container.querySelector(`button[aria-label="${label}"]`) as HTMLElement;

/**
 * Controlled multiple-selection fixture mirroring the maxDays-controlled
 * story pattern, used to verify the cap is actually enforced end-to-end
 * (maxDays only works when the parent's state ignores updates beyond it).
 */
const ControlledMaxDaysFixture = ({ maxDays }: { maxDays: number }) => {
  const [value, setValue] = useState<DateValue[]>([]);
  return (
    <Calendar
      type="multiple"
      maxDays={maxDays}
      value={value}
      onValueChange={(details) => setValue(details.value)}
      placeholder={new CalendarDate(2024, 1, 1)}
    >
      Capped fixture
    </Calendar>
  );
};

describe('Calendar', () => {
  /* -----------------------------------------------------------------------
   * Single selection mode (5)
   * -------------------------------------------------------------------- */

  it('defaults to single selection mode with nothing selected', async () => {
    const screen = await render(
      <Calendar placeholder={new CalendarDate(2024, 1, 1)}>Default</Calendar>
    );
    const selected = screen.container.querySelectorAll(
      '[data-view="day"][data-selected]'
    );
    expect(selected.length).toBe(0);
    await takeSnapshot(`Calendar - defaults to single selection mode with nothing selected`);
  });

  it('selects the clicked date in single mode', async () => {
    const screen = await render(
      <Calendar placeholder={new CalendarDate(2024, 1, 1)}>Single</Calendar>
    );
    const day = getDayCell(screen.container, '2024-01-15');
    await userEvent.click(day);
    await expect.element(locatorFor(day)).toHaveAttribute('data-selected');
    await takeSnapshot(`Calendar - selects the clicked date in single mode`);
  });

  it('replaces the previous selection when a new date is clicked', async () => {
    const ControlledSingle = () => {
      const [value, setValue] = useState<DateValue[]>([
        new CalendarDate(2024, 1, 15),
      ]);
      return (
        <Calendar value={value} onValueChange={(d) => setValue(d.value)}>
          Replace
        </Calendar>
      );
    };
    const screen = await render(<ControlledSingle />);
    const previous = getDayCell(screen.container, '2024-01-15');
    const next = getDayCell(screen.container, '2024-01-20');
    await expect.element(locatorFor(previous)).toHaveAttribute('data-selected');

    await userEvent.click(next);
    await expect.element(locatorFor(next)).toHaveAttribute('data-selected');
    await expect
      .element(locatorFor(previous))
      .not.toHaveAttribute('data-selected');
    await takeSnapshot(`Calendar - replaces the previous selection when a new date is clicked`);
  });

  it('calls onValueChange exactly once per click in single mode', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <Calendar
        placeholder={new CalendarDate(2024, 1, 1)}
        onValueChange={onValueChange}
      >
        Single change
      </Calendar>
    );
    await userEvent.click(getDayCell(screen.container, '2024-01-10'));
    await vi.waitFor(() => expect(onValueChange).toHaveBeenCalledTimes(1));
    const calledWith = onValueChange.mock.calls[0][0];
    expect(calledWith.value).toHaveLength(1);
    expect(calledWith.value[0]).toMatchObject({
      year: 2024,
      month: 1,
      day: 10,
    });
    await takeSnapshot(`Calendar - calls onValueChange exactly once per click in single mode`);
  });

  it('reflects an externally supplied controlled value on initial render', async () => {
    const screen = await render(
      <Calendar value={[new CalendarDate(2024, 3, 8)]}>Controlled</Calendar>
    );
    const day = getDayCell(screen.container, '2024-03-08');
    await expect.element(locatorFor(day)).toHaveAttribute('data-selected');
    await takeSnapshot(`Calendar - reflects an externally supplied controlled value on initial render`);
  });

  /* -----------------------------------------------------------------------
   * Multiple selection mode (5)
   * -------------------------------------------------------------------- */

  it('adds multiple clicked dates to the selection', async () => {
    const screen = await render(
      <Calendar type="multiple" placeholder={new CalendarDate(2024, 1, 1)}>
        Multiple
      </Calendar>
    );
    await userEvent.click(getDayCell(screen.container, '2024-01-05'));
    await userEvent.click(getDayCell(screen.container, '2024-01-06'));
    const selected = screen.container.querySelectorAll(
      '[data-view="day"][data-selected]'
    );
    expect(selected.length).toBe(2);
    await takeSnapshot(`Calendar - adds multiple clicked dates to the selection`);
  });

  it('toggles a date off when it is clicked a second time in multiple mode', async () => {
    const screen = await render(
      <Calendar type="multiple" placeholder={new CalendarDate(2024, 1, 1)}>
        Toggle
      </Calendar>
    );
    const day = getDayCell(screen.container, '2024-01-05');
    await userEvent.click(day);
    await expect.element(locatorFor(day)).toHaveAttribute('data-selected');

    await userEvent.click(day);
    await expect.element(locatorFor(day)).not.toHaveAttribute('data-selected');
    await takeSnapshot(`Calendar - toggles a date off when it is clicked a second time in multiple mode`);
  });

  it('reflects a controlled multiple-date value with each date marked selected', async () => {
    const screen = await render(
      <Calendar
        type="multiple"
        value={[
          new CalendarDate(2024, 1, 5),
          new CalendarDate(2024, 1, 12),
          new CalendarDate(2024, 1, 19),
        ]}
      >
        Multiple controlled
      </Calendar>
    );
    await expect
      .element(locatorFor(getDayCell(screen.container, '2024-01-05')))
      .toHaveAttribute('data-selected');
    await expect
      .element(locatorFor(getDayCell(screen.container, '2024-01-12')))
      .toHaveAttribute('data-selected');
    await expect
      .element(locatorFor(getDayCell(screen.container, '2024-01-19')))
      .toHaveAttribute('data-selected');
    await takeSnapshot(`Calendar - reflects a controlled multiple-date value with each date marked selected`);
  });

  it('calls onValueChange with a growing value array as more dates are selected', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <Calendar
        type="multiple"
        placeholder={new CalendarDate(2024, 1, 1)}
        onValueChange={onValueChange}
      >
        Growing
      </Calendar>
    );
    await userEvent.click(getDayCell(screen.container, '2024-01-05'));
    await userEvent.click(getDayCell(screen.container, '2024-01-06'));
    await vi.waitFor(() => expect(onValueChange).toHaveBeenCalledTimes(2));
    await vi.waitFor(() => expect(onValueChange.mock.calls[1][0].value).toHaveLength(2));
    await takeSnapshot(`Calendar - calls onValueChange with a growing value array as more dates are selected`);
  });

  it('renders zero selected cells when value is an empty array in multiple mode', async () => {
    const screen = await render(
      <Calendar type="multiple" value={[]}>
        Empty
      </Calendar>
    );
    const selected = screen.container.querySelectorAll(
      '[data-view="day"][data-selected]'
    );
    expect(selected.length).toBe(0);
    await takeSnapshot(`Calendar - renders zero selected cells when value is an empty array in multiple mode`);
  });

  /* -----------------------------------------------------------------------
   * maxDays constraint (3)
   * -------------------------------------------------------------------- */

  it('enforces the maxDays cap end-to-end when the calendar is fully controlled', async () => {
    const screen = await render(<ControlledMaxDaysFixture maxDays={2} />);
    await userEvent.click(getDayCell(screen.container, '2024-01-05'));
    await userEvent.click(getDayCell(screen.container, '2024-01-06'));
    await userEvent.click(getDayCell(screen.container, '2024-01-07'));
    const selected = screen.container.querySelectorAll(
      '[data-view="day"][data-selected]'
    );
    expect(selected.length).toBe(2);
    await expect
      .element(locatorFor(getDayCell(screen.container, '2024-01-07')))
      .not.toHaveAttribute('data-selected');
    await takeSnapshot(`Calendar - enforces the maxDays cap end-to-end when the calendar is fully controlled`);
  });

  it('stops invoking onValueChange once the maxDays cap is reached (controlled)', async () => {
    const onValueChange = vi.fn();
    const Fixture = () => {
      const [value, setValue] = useState<DateValue[]>([]);
      return (
        <Calendar
          type="multiple"
          maxDays={2}
          value={value}
          placeholder={new CalendarDate(2024, 1, 1)}
          onValueChange={(details) => {
            onValueChange(details);
            setValue(details.value);
          }}
        >
          Capped with spy
        </Calendar>
      );
    };
    const screen = await render(<Fixture />);
    await userEvent.click(getDayCell(screen.container, '2024-01-05'));
    await userEvent.click(getDayCell(screen.container, '2024-01-06'));
    await userEvent.click(getDayCell(screen.container, '2024-01-07'));
    await vi.waitFor(() => expect(onValueChange).toHaveBeenCalledTimes(2));
    await takeSnapshot(`Calendar - stops invoking onValueChange once the maxDays cap is reached (controlled)`);
  });

  it('does not block the underlying visual selection past maxDays when uncontrolled (documents current behavior)', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <Calendar
        type="multiple"
        maxDays={2}
        placeholder={new CalendarDate(2024, 1, 1)}
        onValueChange={onValueChange}
      >
        Uncontrolled cap
      </Calendar>
    );
    await userEvent.click(getDayCell(screen.container, '2024-01-05'));
    await userEvent.click(getDayCell(screen.container, '2024-01-06'));
    await userEvent.click(getDayCell(screen.container, '2024-01-07'));
    // The onValueChange notification is suppressed past the cap...
    await vi.waitFor(() => expect(onValueChange).toHaveBeenCalledTimes(2));
    // ...but since the calendar is uncontrolled, the machine's own internal
    // state keeps selecting regardless, so the third cell still ends up
    // visually selected.
    const selected = screen.container.querySelectorAll(
      '[data-view="day"][data-selected]'
    );
    expect(selected.length).toBe(3);
    await takeSnapshot(`Calendar - does not block the underlying visual selection past maxDays when uncontrolled (documents current behavior)`);
  });

  /* -----------------------------------------------------------------------
   * min/max value constraints (5)
   * -------------------------------------------------------------------- */

  it('blocks selecting a date before minValue', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <Calendar
        minValue={new CalendarDate(2024, 1, 10)}
        placeholder={new CalendarDate(2024, 1, 15)}
        onValueChange={onValueChange}
      >
        Min
      </Calendar>
    );
    const beforeMin = getDayCell(screen.container, '2024-01-05');
    await userEvent.click(beforeMin, { force: true });
    await vi.waitFor(() => expect(onValueChange).not.toHaveBeenCalled());
    await takeSnapshot(`Calendar - blocks selecting a date before minValue`);
  });

  it('blocks selecting a date after maxValue', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <Calendar
        maxValue={new CalendarDate(2024, 1, 20)}
        placeholder={new CalendarDate(2024, 1, 15)}
        onValueChange={onValueChange}
      >
        Max
      </Calendar>
    );
    const afterMax = getDayCell(screen.container, '2024-01-25');
    await userEvent.click(afterMax, { force: true });
    await vi.waitFor(() => expect(onValueChange).not.toHaveBeenCalled());
    await takeSnapshot(`Calendar - blocks selecting a date after maxValue`);
  });

  it('allows selecting the exact minValue boundary date', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <Calendar
        minValue={new CalendarDate(2024, 1, 10)}
        maxValue={new CalendarDate(2024, 1, 20)}
        placeholder={new CalendarDate(2024, 1, 15)}
        onValueChange={onValueChange}
      >
        Min boundary
      </Calendar>
    );
    const atMin = getDayCell(screen.container, '2024-01-10');
    await userEvent.click(atMin);
    await vi.waitFor(() => expect(onValueChange).toHaveBeenCalledTimes(1));
    await expect.element(locatorFor(atMin)).toHaveAttribute('data-selected');
    await takeSnapshot(`Calendar - allows selecting the exact minValue boundary date`);
  });

  it('allows selecting the exact maxValue boundary date', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <Calendar
        minValue={new CalendarDate(2024, 1, 10)}
        maxValue={new CalendarDate(2024, 1, 20)}
        placeholder={new CalendarDate(2024, 1, 15)}
        onValueChange={onValueChange}
      >
        Max boundary
      </Calendar>
    );
    const atMax = getDayCell(screen.container, '2024-01-20');
    await userEvent.click(atMax);
    await vi.waitFor(() => expect(onValueChange).toHaveBeenCalledTimes(1));
    await expect.element(locatorFor(atMax)).toHaveAttribute('data-selected');
    await takeSnapshot(`Calendar - allows selecting the exact maxValue boundary date`);
  });

  it('marks a day cell outside min/max with data-disabled', async () => {
    const screen = await render(
      <Calendar
        minValue={new CalendarDate(2024, 1, 10)}
        maxValue={new CalendarDate(2024, 1, 20)}
        placeholder={new CalendarDate(2024, 1, 15)}
      >
        Boundary disabled marker
      </Calendar>
    );
    const outside = getDayCell(screen.container, '2024-01-25');
    await expect.element(locatorFor(outside)).toHaveAttribute('data-disabled');
    await takeSnapshot(`Calendar - marks a day cell outside min/max with data-disabled`);
  });

  /* -----------------------------------------------------------------------
   * isDateDisabled predicate (3)
   * -------------------------------------------------------------------- */

  it('blocks selection for a date the predicate marks disabled', async () => {
    const screen = await render(
      <Calendar
        placeholder={new CalendarDate(2024, 1, 1)}
        isDateDisabled={(date: DateValue) => date.day === 6}
      >
        Weekend disabled
      </Calendar>
    );
    const disabledDay = getDayCell(screen.container, '2024-01-06');
    await expect
      .element(locatorFor(disabledDay))
      .toHaveAttribute('data-disabled');
    await takeSnapshot(`Calendar - blocks selection for a date the predicate marks disabled`);
  });

  it('does not call onValueChange when a disabled date is clicked', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <Calendar
        placeholder={new CalendarDate(2024, 1, 1)}
        onValueChange={onValueChange}
        isDateDisabled={(date: DateValue) => date.day === 6}
      >
        Weekend disabled click
      </Calendar>
    );
    const disabledDay = getDayCell(screen.container, '2024-01-06');
    await userEvent.click(disabledDay, { force: true });
    await vi.waitFor(() => expect(onValueChange).not.toHaveBeenCalled());
    await takeSnapshot(`Calendar - does not call onValueChange when a disabled date is clicked`);
  });

  it('still allows selecting a date the predicate does not disable', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <Calendar
        placeholder={new CalendarDate(2024, 1, 1)}
        onValueChange={onValueChange}
        isDateDisabled={(date: DateValue) => date.day === 6}
      >
        Weekday enabled
      </Calendar>
    );
    const enabledDay = getDayCell(screen.container, '2024-01-08');
    await userEvent.click(enabledDay);
    await vi.waitFor(() => expect(onValueChange).toHaveBeenCalledTimes(1));
    await takeSnapshot(`Calendar - still allows selecting a date the predicate does not disable`);
  });

  /* -----------------------------------------------------------------------
   * isDateUnavailable predicate (2)
   * -------------------------------------------------------------------- */

  it('blocks selection for a date marked unavailable', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <Calendar
        placeholder={new CalendarDate(2024, 1, 1)}
        onValueChange={onValueChange}
        isDateUnavailable={(date: DateValue) =>
          date.year === 2024 && date.month === 1 && date.day === 10
        }
      >
        Unavailable
      </Calendar>
    );
    const unavailable = getDayCell(screen.container, '2024-01-10');
    await userEvent.click(unavailable, { force: true });
    await vi.waitFor(() => expect(onValueChange).not.toHaveBeenCalled());
    await takeSnapshot(`Calendar - blocks selection for a date marked unavailable`);
  });

  it('allows selecting a date not marked unavailable, receiving the configured locale', async () => {
    const isDateUnavailable = vi.fn().mockReturnValue(false);
    const screen = await render(
      <Calendar
        placeholder={new CalendarDate(2024, 1, 1)}
        locale="fr-FR"
        isDateUnavailable={isDateUnavailable}
      >
        Available with locale
      </Calendar>
    );
    const available = getDayCell(screen.container, '2024-01-11');
    await userEvent.click(available);
    await expect
      .element(locatorFor(available))
      .toHaveAttribute('data-selected');
    expect(isDateUnavailable).toHaveBeenCalledWith(
      expect.anything(),
      'fr-FR'
    );
    await takeSnapshot(`Calendar - allows selecting a date not marked unavailable, receiving the configured locale`);
  });

  /* -----------------------------------------------------------------------
   * disabled prop (3)
   * -------------------------------------------------------------------- */

  it('blocks all day-cell selection when disabled', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <Calendar
        disabled
        placeholder={new CalendarDate(2024, 1, 1)}
        onValueChange={onValueChange}
      >
        Disabled calendar
      </Calendar>
    );
    const day = getDayCell(screen.container, '2024-01-15');
    await userEvent.click(day, { force: true });
    await vi.waitFor(() => expect(onValueChange).not.toHaveBeenCalled());
    await takeSnapshot(`Calendar - blocks all day-cell selection when disabled`);
  });

  it('disables the prev/next navigation buttons when disabled', async () => {
    const screen = await render(
      <Calendar disabled placeholder={new CalendarDate(2024, 1, 1)}>
        Disabled nav
      </Calendar>
    );
    const prev = getNavTrigger(screen.container, 'Switch to previous month');
    const next = getNavTrigger(screen.container, 'Switch to next month');
    await expect.element(locatorFor(prev)).toBeDisabled();
    await expect.element(locatorFor(next)).toBeDisabled();
    await takeSnapshot(`Calendar - disables the prev/next navigation buttons when disabled`);
  });

  it('disables the view-trigger header button when disabled', async () => {
    const screen = await render(
      <Calendar disabled placeholder={new CalendarDate(2024, 1, 1)}>
        Disabled view trigger
      </Calendar>
    );
    const header = getViewTrigger(screen.container, 'day');
    await expect.element(locatorFor(header)).toBeDisabled();
    await takeSnapshot(`Calendar - disables the view-trigger header button when disabled`);
  });

  /* -----------------------------------------------------------------------
   * readOnly prop (2)
   * -------------------------------------------------------------------- */

  it('blocks day-cell selection when readOnly', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <Calendar
        readOnly
        placeholder={new CalendarDate(2024, 1, 1)}
        onValueChange={onValueChange}
      >
        Read-only calendar
      </Calendar>
    );
    const day = getDayCell(screen.container, '2024-01-15');
    await userEvent.click(day);
    await vi.waitFor(() => expect(onValueChange).not.toHaveBeenCalled());
    await takeSnapshot(`Calendar - blocks day-cell selection when readOnly`);
  });

  it('disables the view-trigger header button when readOnly', async () => {
    const screen = await render(
      <Calendar readOnly placeholder={new CalendarDate(2024, 1, 1)}>
        Read-only view trigger
      </Calendar>
    );
    const header = getViewTrigger(screen.container, 'day');
    await expect.element(locatorFor(header)).toBeDisabled();
    await takeSnapshot(`Calendar - disables the view-trigger header button when readOnly`);
  });

  /* -----------------------------------------------------------------------
   * Week start / weekday format (4)
   * -------------------------------------------------------------------- */

  it('renders Sunday first by default (weekStartsOn=0)', async () => {
    const screen = await render(<Calendar>Default week start</Calendar>);
    const firstHeader = screen.container.querySelector('th');
    expect(firstHeader?.textContent).toBe('Sun');
    await takeSnapshot(`Calendar - renders Sunday first by default (weekStartsOn=0)`);
  });

  it('renders Monday first when weekStartsOn=1', async () => {
    const screen = await render(
      <Calendar weekStartsOn={1}>Monday week start</Calendar>
    );
    const firstHeader = screen.container.querySelector('th');
    expect(firstHeader?.textContent).toBe('Mon');
    await takeSnapshot(`Calendar - renders Monday first when weekStartsOn=1`);
  });

  it('renders single-letter weekday headers with narrow format', async () => {
    const screen = await render(
      <Calendar weekdayFormat="narrow">Narrow weekdays</Calendar>
    );
    const firstHeader = screen.container.querySelector('th');
    expect(firstHeader?.textContent).toBe('S');
    await takeSnapshot(`Calendar - renders single-letter weekday headers with narrow format`);
  });

  it('renders full weekday names with long format', async () => {
    const screen = await render(
      <Calendar weekdayFormat="long">Long weekdays</Calendar>
    );
    const firstHeader = screen.container.querySelector('th');
    expect(firstHeader?.textContent).toBe('Sunday');
    await takeSnapshot(`Calendar - renders full weekday names with long format`);
  });

  /* -----------------------------------------------------------------------
   * fixedWeeks (2)
   * -------------------------------------------------------------------- */

  it('renders exactly 6 week rows when fixedWeeks is true for a 5-week month', async () => {
    const screen = await render(
      <Calendar fixedWeeks placeholder={new CalendarDate(2024, 2, 1)}>
        Fixed weeks
      </Calendar>
    );
    const rows = screen.container.querySelectorAll('[data-view="day"] tbody tr');
    expect(rows.length).toBe(6);
    await takeSnapshot(`Calendar - renders exactly 6 week rows when fixedWeeks is true for a 5-week month`);
  });

  it('renders fewer than 6 week rows by default for the same 5-week month', async () => {
    const screen = await render(
      <Calendar placeholder={new CalendarDate(2024, 2, 1)}>
        Default weeks
      </Calendar>
    );
    const rows = screen.container.querySelectorAll('[data-view="day"] tbody tr');
    expect(rows.length).toBe(5);
    await takeSnapshot(`Calendar - renders fewer than 6 week rows by default for the same 5-week month`);
  });

  /* -----------------------------------------------------------------------
   * disableDaysOutsideMonth (2)
   * -------------------------------------------------------------------- */

  it('leaves outside-month day cells selectable by default', async () => {
    const screen = await render(
      <Calendar placeholder={new CalendarDate(2024, 2, 1)}>
        Outside month enabled
      </Calendar>
    );
    const outside = screen.container.querySelector(
      '[data-view="day"][data-outside-range]'
    ) as HTMLElement;
    expect(outside).not.toBeNull();
    await expect.element(locatorFor(outside)).not.toHaveAttribute('data-disabled');
    await takeSnapshot(`Calendar - leaves outside-month day cells selectable by default`);
  });

  it('marks outside-month day cells as disabled when disableDaysOutsideMonth is true', async () => {
    const screen = await render(
      <Calendar
        disableDaysOutsideMonth
        placeholder={new CalendarDate(2024, 2, 1)}
      >
        Outside month disabled
      </Calendar>
    );
    const outside = screen.container.querySelector(
      '[data-view="day"][data-outside-range]'
    ) as HTMLElement;
    expect(outside).not.toBeNull();
    await expect.element(locatorFor(outside)).toHaveAttribute('data-disabled');
    await takeSnapshot(`Calendar - marks outside-month day cells as disabled when disableDaysOutsideMonth is true`);
  });

  /* -----------------------------------------------------------------------
   * Locale (2)
   * -------------------------------------------------------------------- */

  it('formats the visible month/year header using the provided locale', async () => {
    const screenDefault = await render(
      <Calendar placeholder={new CalendarDate(2024, 1, 1)}>
        Default locale
      </Calendar>
    );
    const screenFrench = await render(
      <Calendar locale="fr-FR" placeholder={new CalendarDate(2024, 1, 1)}>
        French locale
      </Calendar>
    );
    const defaultText = getViewTrigger(screenDefault.container, 'day').textContent;
    const frenchText = getViewTrigger(screenFrench.container, 'day').textContent;
    expect(defaultText).toBe('January 2024');
    expect(frenchText).not.toBe(defaultText);
    await takeSnapshot(`Calendar - formats the visible month/year header using the provided locale`);
  });

  it('passes the configured locale through to the isDateUnavailable predicate', async () => {
    const isDateUnavailable = vi.fn().mockReturnValue(false);
    await render(
      <Calendar
        placeholder={new CalendarDate(2024, 1, 1)}
        locale="de-DE"
        isDateUnavailable={isDateUnavailable}
      >
        Locale passthrough
      </Calendar>
    );
    expect(isDateUnavailable).toHaveBeenCalledWith(expect.anything(), 'de-DE');
    await takeSnapshot(`Calendar - passes the configured locale through to the isDateUnavailable predicate`);
  });

  /* -----------------------------------------------------------------------
   * View switching / navigation (4)
   * -------------------------------------------------------------------- */

  it('switches from the day grid to the month grid when the header trigger is clicked', async () => {
    const screen = await render(
      <Calendar placeholder={new CalendarDate(2024, 1, 1)}>
        Day to month
      </Calendar>
    );
    await userEvent.click(getViewTrigger(screen.container, 'day'));
    await vi.waitFor(() => expect(getVisibleGrid(screen.container).getAttribute('data-view')).toBe(
      'month'
    ));
    await takeSnapshot(`Calendar - switches from the day grid to the month grid when the header trigger is clicked`);
  });

  it('switches from the month grid to the year grid when its header trigger is clicked', async () => {
    const screen = await render(
      <Calendar placeholder={new CalendarDate(2024, 1, 1)}>
        Month to year
      </Calendar>
    );
    await userEvent.click(getViewTrigger(screen.container, 'day'));
    await userEvent.click(getViewTrigger(screen.container, 'month'));
    await vi.waitFor(() => expect(getVisibleGrid(screen.container).getAttribute('data-view')).toBe(
      'year'
    ));
    await takeSnapshot(`Calendar - switches from the month grid to the year grid when its header trigger is clicked`);
  });

  it('drills back down from a clicked year cell to the month grid', async () => {
    const screen = await render(
      <Calendar placeholder={new CalendarDate(2024, 1, 1)}>
        Year to month
      </Calendar>
    );
    await userEvent.click(getViewTrigger(screen.container, 'day'));
    await userEvent.click(getViewTrigger(screen.container, 'month'));
    await userEvent.click(getYearCell(screen.container, 2025));
    await vi.waitFor(() => expect(getVisibleGrid(screen.container).getAttribute('data-view')).toBe(
      'month'
    ));
    await takeSnapshot(`Calendar - drills back down from a clicked year cell to the month grid`);
  });

  it('drills back down from a clicked month cell to the day grid, focused on the chosen month', async () => {
    // Uses `value` rather than `placeholder` to seed the initial focused
    // month, since `placeholder` maps to a fully controlled focusedValue
    // that snaps back on every render, discarding the year/month navigated
    // to via CELL.CLICK.
    const screen = await render(
      <Calendar value={[new CalendarDate(2024, 1, 1)]}>Month to day</Calendar>
    );
    await userEvent.click(getViewTrigger(screen.container, 'day'));
    await userEvent.click(getViewTrigger(screen.container, 'month'));
    await userEvent.click(getYearCell(screen.container, 2025));
    await userEvent.click(getMonthCell(screen.container, 6));
    await vi.waitFor(() => expect(getVisibleGrid(screen.container).getAttribute('data-view')).toBe(
      'day'
    ));
    await vi.waitFor(() => expect(getViewTrigger(screen.container, 'day').textContent).toBe(
      'June 2025'
    ));
    await takeSnapshot(`Calendar - drills back down from a clicked month cell to the day grid, focused on the chosen month`);
  });

  /* -----------------------------------------------------------------------
   * Prev/next navigation (2)
   * -------------------------------------------------------------------- */

  it('advances the visible month forward when the next-month trigger is clicked', async () => {
    const screen = await render(
      <Calendar placeholder={new CalendarDate(2024, 1, 1)}>Next month</Calendar>
    );
    const next = getNavTrigger(screen.container, 'Switch to next month');
    await userEvent.click(next);
    await expect
      .element(locatorFor(getViewTrigger(screen.container, 'day')))
      .toHaveTextContent('February 2024');
    await takeSnapshot(`Calendar - advances the visible month forward when the next-month trigger is clicked`);
  });

  it('moves the visible month backward when the prev-month trigger is clicked', async () => {
    const screen = await render(
      <Calendar placeholder={new CalendarDate(2024, 1, 1)}>Prev month</Calendar>
    );
    const prev = getNavTrigger(screen.container, 'Switch to previous month');
    await userEvent.click(prev);
    await expect
      .element(locatorFor(getViewTrigger(screen.container, 'day')))
      .toHaveTextContent('December 2023');
    await takeSnapshot(`Calendar - moves the visible month backward when the prev-month trigger is clicked`);
  });

  /* -----------------------------------------------------------------------
   * Keyboard navigation within the day grid (5)
   * -------------------------------------------------------------------- */

  it('moves the roving focus to the next day on ArrowRight', async () => {
    const screen = await render(
      <Calendar value={[new CalendarDate(2024, 1, 15)]}>Arrow right</Calendar>
    );
    const initial = getDayCell(screen.container, '2024-01-15');
    initial.focus();
    await userEvent.keyboard('{ArrowRight}');
    const next = getDayCell(screen.container, '2024-01-16');
    await expect.element(locatorFor(next)).toHaveAttribute('data-focus');
    await takeSnapshot(`Calendar - moves the roving focus to the next day on ArrowRight`);
  });

  it('moves the roving focus to the previous day on ArrowLeft', async () => {
    const screen = await render(
      <Calendar value={[new CalendarDate(2024, 1, 15)]}>Arrow left</Calendar>
    );
    const initial = getDayCell(screen.container, '2024-01-15');
    initial.focus();
    await userEvent.keyboard('{ArrowLeft}');
    const previous = getDayCell(screen.container, '2024-01-14');
    await expect.element(locatorFor(previous)).toHaveAttribute('data-focus');
    await takeSnapshot(`Calendar - moves the roving focus to the previous day on ArrowLeft`);
  });

  it('moves the roving focus one week forward on ArrowDown', async () => {
    const screen = await render(
      <Calendar value={[new CalendarDate(2024, 1, 15)]}>Arrow down</Calendar>
    );
    const initial = getDayCell(screen.container, '2024-01-15');
    initial.focus();
    await userEvent.keyboard('{ArrowDown}');
    const next = getDayCell(screen.container, '2024-01-22');
    await expect.element(locatorFor(next)).toHaveAttribute('data-focus');
    await takeSnapshot(`Calendar - moves the roving focus one week forward on ArrowDown`);
  });

  it('moves the roving focus to the start of the visible month on Home and the end of the visible month on End', async () => {
    // Home/End move to the start/end of the whole visible page (month), not
    // just the current week row.
    const screen = await render(
      <Calendar value={[new CalendarDate(2024, 1, 15)]}>Home and end</Calendar>
    );
    const initial = getDayCell(screen.container, '2024-01-15');
    initial.focus();
    await userEvent.keyboard('{Home}');
    const start = getDayCell(screen.container, '2024-01-01');
    await expect.element(locatorFor(start)).toHaveAttribute('data-focus');

    start.focus();
    await userEvent.keyboard('{End}');
    const end = getDayCell(screen.container, '2024-01-31');
    await expect.element(locatorFor(end)).toHaveAttribute('data-focus');
    await takeSnapshot(`Calendar - moves the roving focus to the start of the visible month on Home and the end of the visible month on End`);
  });

  it('advances the visible month via PageDown while keyboard-focused', async () => {
    const screen = await render(
      <Calendar value={[new CalendarDate(2024, 1, 15)]}>Page down</Calendar>
    );
    const initial = getDayCell(screen.container, '2024-01-15');
    initial.focus();
    await userEvent.keyboard('{PageDown}');
    await expect
      .element(locatorFor(getViewTrigger(screen.container, 'day')))
      .toHaveTextContent('February 2024');
    await takeSnapshot(`Calendar - advances the visible month via PageDown while keyboard-focused`);
  });

  /* -----------------------------------------------------------------------
   * Form submission attribute (1)
   * -------------------------------------------------------------------- */

  it('exposes the provided name attribute on the hidden input', async () => {
    const screen = await render(
      <Calendar name="appointment-date" value={[new CalendarDate(2024, 1, 15)]}>
        Named field
      </Calendar>
    );
    const input = screen.container.querySelector('input[name="appointment-date"]');
    expect(input).not.toBeNull();
    await takeSnapshot(`Calendar - exposes the provided name attribute on the hidden input`);
  });
});
