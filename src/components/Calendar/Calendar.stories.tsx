import type { Meta, StoryObj } from '@storybook/react';
import { fn, within, userEvent, expect } from 'storybook/test';
import Calendar, { type DateValue } from './Calendar';
import { useState } from 'react';
import { CalendarDate } from '@internationalized/date';

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

/** The view-scoped header trigger that shows "Month Year" and toggles to the next view up. */
const getViewTrigger = (container: HTMLElement, view: 'day' | 'month' | 'year') =>
  container.querySelector(`button[data-view="${view}"]`) as HTMLElement;

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onValueChange: fn(),
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'The selection mode of the calendar',
    },
    value: {
      control: 'object',
      description: 'The controlled selected date(s)',
    },
    onValueChange: {
      action: 'valueChanged',
      description: 'Function called when the value changes',
    },
    placeholder: {
      control: 'object',
      description: 'The placeholder date',
    },
    weekStartsOn: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6],
      description: 'The first day of the week',
    },
    weekdayFormat: {
      control: 'select',
      options: ['narrow', 'short', 'long'],
      description: 'The format of the week days',
    },
    calendarLabel: {
      control: 'text',
      description: 'The accessible label for the calendar',
    },
    fixedWeeks: {
      control: 'boolean',
      description: 'Whether to show fixed 6 weeks',
    },
    minValue: {
      control: 'object',
      description: 'Minimum selectable date',
    },
    maxValue: {
      control: 'object',
      description: 'Maximum selectable date',
    },
    locale: {
      control: 'text',
      description: 'Locale for date formatting',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the calendar is disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the calendar is read-only',
    },
    disableDaysOutsideMonth: {
      control: 'boolean',
      description: 'Disable days outside the current month',
    },
    maxDays: {
      control: 'number',
      description: 'Maximum number of selectable days (multiple mode)',
    },
    monthFormat: {
      control: 'select',
      options: ['long', 'short'],
      description: 'Format of month display',
    },
    yearFormat: {
      control: 'select',
      options: ['numeric', '2-digit'],
      description: 'Format of year display',
    },
    children: {
      control: 'text',
      description: 'Custom content above calendar',
    },
    name: {
      control: 'text',
      description: 'Name attribute for form submission',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default calendar with basic configuration.
 */
export const Default: Story = {
  args: {
    children: 'Select a date',
  },
};

/**
 * Calendar with custom min, max, and value.
 */
export const WithMinMaxValue: Story = {
  args: {
    children: 'Choose a date in range',
    value: [new CalendarDate(2024, 6, 15)],
    minValue: new CalendarDate(2024, 6, 1),
    maxValue: new CalendarDate(2024, 6, 30),
  },
};

/**
 * Calendar with custom children content.
 */
export const CustomChildren: Story = {
  args: {
    children: 'Book an Appointment',
  },
};

/**
 * Calendar with multiple date selection.
 */
export const MultipleSelection: Story = {
  args: {
    children: 'Select multiple dates',
    type: 'multiple',
    value: [
      new CalendarDate(2024, 1, 15),
      new CalendarDate(2024, 1, 20),
      new CalendarDate(2024, 1, 25),
    ],
  },
};

/**
 * Disabled calendar.
 */
export const Disabled: Story = {
  args: {
    children: 'Disabled Calendar',
    disabled: true,
    value: [new CalendarDate(2024, 1, 15)],
  },
};

/**
 * Read-only calendar.
 */
export const ReadOnly: Story = {
  args: {
    children: 'Read-only Calendar',
    readOnly: true,
    value: [new CalendarDate(2024, 1, 15)],
  },
};

/**
 * Calendar with week starting on Monday.
 */
export const WeekStartsMonday: Story = {
  args: {
    children: 'Week starts on Monday',
    weekStartsOn: 1,
  },
};

/**
 * Calendar with fixed 6 weeks.
 */
export const FixedWeeks: Story = {
  args: {
    children: 'Fixed 6 Weeks',
    fixedWeeks: true,
  },
};

/**
 * Calendar with narrow weekday format.
 */
export const NarrowWeekdays: Story = {
  args: {
    children: 'Narrow Weekday Format',
    weekdayFormat: 'narrow',
  },
};

/**
 * Calendar with long weekday format.
 */
export const LongWeekdays: Story = {
  args: {
    children: 'Long Weekday Format',
    weekdayFormat: 'long',
  },
};

/**
 * Calendar with disabled days outside month.
 */
export const DisableDaysOutsideMonth: Story = {
  args: {
    children: 'Days Outside Month Disabled',
    disableDaysOutsideMonth: true,
  },
};

/**
 * Calendar with maximum days limit (multiple mode).
 */
export const MaxDaysLimit: Story = {
  args: {
    children: 'Max 3 Days Selection',
    type: 'multiple',
    maxDays: 3,
  },
};

/**
 * Calendar with custom date disabling logic.
 */
export const CustomDisabledDates: Story = {
  args: {
    children: 'Weekends Disabled',
    isDateDisabled: (date: DateValue) => {
      // Disable weekends (Saturday and Sunday)
      const d = new Date(date.year, date.month - 1, date.day);
      return d.getDay() === 0 || d.getDay() === 6;
    },
  },
};

/**
 * Controlled calendar with state management.
 */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<DateValue[]>([
      new CalendarDate(2024, 1, 15),
    ]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Calendar
          value={value}
          onValueChange={(details) => setValue(details.value)}
          children="Select a date"
        />
        <div
          style={{
            fontSize: '14px',
            color: '#6b7280',
            padding: '12px',
            backgroundColor: '#f3f4f6',
            borderRadius: '8px',
          }}
        >
          Selected:{' '}
          {value.length > 0
            ? `${value[0].year}-${value[0].month.toString().padStart(2, '0')}-${value[0].day.toString().padStart(2, '0')}`
            : 'None'}
        </div>
        <button
          onClick={() => setValue([new CalendarDate(2024, 1, 1)])}
          style={{
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Set to January 1, 2024
        </button>
      </div>
    );
  },
};

/**
 * Multiple dates controlled calendar.
 */
export const MultipleControlled: Story = {
  render: () => {
    const [value, setValue] = useState<DateValue[]>([]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Calendar
          type="multiple"
          value={value}
          onValueChange={(details) => setValue(details.value)}
          children="Select multiple dates"
        />
        <div
          style={{
            fontSize: '14px',
            color: '#6b7280',
            padding: '12px',
            backgroundColor: '#f3f4f6',
            borderRadius: '8px',
          }}
        >
          Selected dates ({value.length}):
          {value.length > 0 ? (
            <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
              {value.map((date, idx) => (
                <li key={idx}>
                  {date.year}-{date.month.toString().padStart(2, '0')}-
                  {date.day.toString().padStart(2, '0')}
                </li>
              ))}
            </ul>
          ) : (
            ' None'
          )}
        </div>
      </div>
    );
  },
};

/**
 * Booking calendar example.
 */
export const BookingCalendar: Story = {
  render: () => {
    const [value, setValue] = useState<DateValue[]>([]);
    const [unavailableDates] = useState<DateValue[]>([
      new CalendarDate(2024, 1, 10),
      new CalendarDate(2024, 1, 11),
      new CalendarDate(2024, 1, 24),
    ]);

    const isDateUnavailable = (date: DateValue) => {
      return unavailableDates.some(
        (d) =>
          d.year === date.year && d.month === date.month && d.day === date.day
      );
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '24px',
          backgroundColor: '#f9fafb',
          borderRadius: '12px',
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: 600,
              color: '#111827',
            }}
          >
            Book Your Appointment
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#6b7280' }}>
            Select an available date
          </p>
        </div>

        <Calendar
          value={value}
          onValueChange={(details) => setValue(details.value)}
          isDateUnavailable={isDateUnavailable}
          minValue={new CalendarDate(2024, 1, 1)}
          maxValue={new CalendarDate(2024, 1, 31)}
        />

        {value.length > 0 && (
          <div
            style={{
              padding: '12px',
              backgroundColor: '#d1fae5',
              color: '#065f46',
              borderRadius: '8px',
              fontSize: '14px',
            }}
          >
            ✓ Appointment booked for: {value[0].year}-
            {value[0].month.toString().padStart(2, '0')}-
            {value[0].day.toString().padStart(2, '0')}
          </div>
        )}
      </div>
    );
  },
};

/**
 * Event calendar with multiple dates.
 */
export const EventCalendar: Story = {
  render: () => {
    const [value, setValue] = useState<DateValue[]>([
      new CalendarDate(2024, 1, 5),
      new CalendarDate(2024, 1, 12),
      new CalendarDate(2024, 1, 19),
      new CalendarDate(2024, 1, 26),
    ]);

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '24px',
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: 600,
              color: '#111827',
            }}
          >
            Team Meeting Days
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#6b7280' }}>
            Every Friday in January
          </p>
        </div>

        <Calendar
          type="multiple"
          value={value}
          onValueChange={(details) => setValue(details.value)}
          maxDays={5}
          placeholder={new CalendarDate(2024, 1, 1)}
        />

        <div style={{ fontSize: '13px', color: '#6b7280' }}>
          {value.length} meeting{value.length !== 1 ? 's' : ''} scheduled
        </div>
      </div>
    );
  },
};

/**
 * Calendar with different locales.
 */
export const DifferentLocales: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <Calendar children="English (US)" locale="en-US" />
      <Calendar children="Español" locale="es-ES" />
      <Calendar children="Français" locale="fr-FR" />
      <Calendar children="Deutsch" locale="de-DE" />
    </div>
  ),
};

/**
 * Calendar with short month format.
 */
export const ShortMonthFormat: Story = {
  args: {
    children: 'Short Month Format',
    monthFormat: 'short',
  },
};

/**
 * Calendar with long month format.
 */
export const LongMonthFormat: Story = {
  args: {
    children: 'Long Month Format',
    monthFormat: 'long',
  },
};

/**
 * Birthday calendar example.
 */
export const BirthdayCalendar: Story = {
  render: () => {
    const [value, setValue] = useState<DateValue[]>([]);
    const currentYear = new Date().getFullYear();

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '24px',
          backgroundColor: '#fef3c7',
          borderRadius: '12px',
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: 600,
              color: '#92400e',
            }}
          >
            🎂 Select Your Birthday
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#78350f' }}>
            We'll send you a special gift!
          </p>
        </div>

        <Calendar
          value={value}
          onValueChange={(details) => setValue(details.value)}
          maxValue={new CalendarDate(currentYear - 13, 12, 31)}
          placeholder={new CalendarDate(currentYear - 25, 1, 1)}
        />

        {value.length > 0 && (
          <div
            style={{
              padding: '12px',
              backgroundColor: '#fef9c3',
              color: '#713f12',
              borderRadius: '8px',
              fontSize: '14px',
              border: '1px solid #fde047',
            }}
          >
            Birthday: {value[0].year}-
            {value[0].month.toString().padStart(2, '0')}-
            {value[0].day.toString().padStart(2, '0')}
          </div>
        )}
      </div>
    );
  },
};

/**
 * Calendar variations showcase.
 */
export const Variations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <Calendar children="Default" />
      <Calendar children="Fixed Weeks" fixedWeeks />
      <Calendar children="Week Starts Monday" weekStartsOn={1} />
      <Calendar children="Multiple Selection" type="multiple" maxDays={5} />
      <Calendar children="Narrow Weekdays" weekdayFormat="narrow" />
    </div>
  ),
};

/* -------------------------------------------------------------------------
 * Additional week-start / disabled combos (2)
 * ---------------------------------------------------------------------- */

/**
 * Calendar with the week starting on Saturday.
 */
export const WeekStartsSaturday: Story = {
  args: {
    children: 'Week starts on Saturday',
    weekStartsOn: 6,
  },
};

/**
 * Disabled and read-only applied together.
 */
export const DisabledAndReadOnly: Story = {
  args: {
    children: 'Disabled and read-only together',
    disabled: true,
    readOnly: true,
    value: [new CalendarDate(2024, 1, 15)],
  },
};

/* -------------------------------------------------------------------------
 * Partial min/max range configurations (2)
 * ---------------------------------------------------------------------- */

/**
 * Only a minimum date is set; there is no upper bound.
 */
export const MinValueOnlyNoMax: Story = {
  args: {
    children: 'Only a minimum date is set',
    minValue: new CalendarDate(2024, 1, 10),
    placeholder: new CalendarDate(2024, 1, 1),
  },
};

/**
 * Only a maximum date is set; there is no lower bound.
 */
export const MaxValueOnlyNoMin: Story = {
  args: {
    children: 'Only a maximum date is set',
    maxValue: new CalendarDate(2024, 1, 20),
    placeholder: new CalendarDate(2024, 1, 1),
  },
};

/* -------------------------------------------------------------------------
 * Multiple-selection edge cases (1)
 * ---------------------------------------------------------------------- */

/**
 * Multiple-selection mode explicitly initialized with zero selected dates.
 */
export const EmptyValueMultiple: Story = {
  args: {
    children: 'Multiple mode with nothing selected yet',
    type: 'multiple',
    value: [],
  },
};

/* -------------------------------------------------------------------------
 * Form submission attributes (1)
 * ---------------------------------------------------------------------- */

/**
 * Calendar with a name attribute for form submission; verifies the hidden
 * input carries the name through to the DOM.
 */
export const NamedFormField: Story = {
  args: {
    children: 'Appointment date (check the hidden input name)',
    name: 'appointment-date',
    value: [new CalendarDate(2024, 1, 15)],
  },
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector(
      'input[name="appointment-date"]'
    );
    expect(input).not.toBeNull();
  },
};

/* -------------------------------------------------------------------------
 * Format prop smoke tests (2)
 * ---------------------------------------------------------------------- */

/**
 * yearFormat is accepted without error. Note: as implemented, this prop is
 * not currently wired into any rendered output (the year grid always shows
 * full 4-digit years and the header always shows a long-month/numeric-year
 * range text) - this story only guards against the prop causing a crash.
 */
export const YearFormatTwoDigitNoOp: Story = {
  args: {
    children: 'yearFormat="2-digit" passed (currently a no-op)',
    yearFormat: '2-digit',
  },
};

/**
 * Side-by-side comparison of the three weekdayFormat options.
 */
export const WeekdayFormatComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <Calendar children="Narrow" weekdayFormat="narrow" />
      <Calendar children="Short" weekdayFormat="short" />
      <Calendar children="Long" weekdayFormat="long" />
    </div>
  ),
};

/* -------------------------------------------------------------------------
 * Locale variations (2)
 * ---------------------------------------------------------------------- */

/**
 * Calendar formatted for the Japanese locale.
 */
export const LocaleJapanese: Story = {
  args: {
    children: '日本語カレンダー',
    locale: 'ja-JP',
  },
};

/**
 * Calendar formatted for an Arabic locale, rendered inside an RTL container.
 */
export const LocaleArabicRTL: Story = {
  render: () => (
    <div dir="rtl">
      <Calendar locale="ar-EG">التقويم</Calendar>
    </div>
  ),
};

/* -------------------------------------------------------------------------
 * Kitchen-sink combinations (2)
 * ---------------------------------------------------------------------- */

/**
 * Kitchen sink: multiple selection constrained by min/max, a maxDays cap,
 * and a custom disabled-dates predicate, all driven by controlled state so
 * the maxDays cap is actually enforced end-to-end.
 */
export const KitchenSinkMultipleConstrained: Story = {
  render: () => {
    const KitchenSinkMultiple = () => {
      const [value, setValue] = useState<DateValue[]>([]);
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Calendar
            type="multiple"
            value={value}
            onValueChange={(details) => setValue(details.value)}
            minValue={new CalendarDate(2024, 1, 5)}
            maxValue={new CalendarDate(2024, 1, 25)}
            maxDays={3}
            placeholder={new CalendarDate(2024, 1, 1)}
            isDateDisabled={(date) => {
              const d = new Date(date.year, date.month - 1, date.day);
              return d.getDay() === 0 || d.getDay() === 6;
            }}
          >
            Weekdays only, between the 5th and 25th, up to 3 dates
          </Calendar>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>
            Selected {value.length} of 3 max
          </div>
        </div>
      );
    };
    return <KitchenSinkMultiple />;
  },
};

/**
 * Kitchen sink: single selection with fixed weeks, an alternate week start,
 * a bounded range, a non-default locale, and a short month format.
 */
export const KitchenSinkSingleConstrained: Story = {
  args: {
    children: 'Single date, constrained and localized',
    type: 'single',
    fixedWeeks: true,
    weekStartsOn: 1,
    minValue: new CalendarDate(2024, 1, 1),
    maxValue: new CalendarDate(2024, 12, 31),
    locale: 'en-GB',
    monthFormat: 'short',
    value: [new CalendarDate(2024, 6, 15)],
  },
};

/* -------------------------------------------------------------------------
 * Placeholder / focused month (1)
 * ---------------------------------------------------------------------- */

/**
 * The placeholder date determines which month is initially displayed, even
 * though no date is selected yet.
 */
export const PlaceholderFocusedMonth: Story = {
  args: {
    children: 'Opens focused on March 2025',
    placeholder: new CalendarDate(2025, 3, 1),
  },
  play: async ({ canvasElement }) => {
    const header = getViewTrigger(canvasElement, 'day');
    expect(header).toHaveTextContent('March 2025');
  },
};

/* -------------------------------------------------------------------------
 * isDateDisabled / isDateUnavailable interactive coverage (2)
 * ---------------------------------------------------------------------- */

/**
 * Weekends are disabled via isDateDisabled; clicking one is a no-op while
 * clicking a weekday selects it.
 */
export const DisabledWeekendsInteractive: Story = {
  args: {
    children: 'Weekends are disabled - try clicking one',
    placeholder: new CalendarDate(2024, 1, 1),
    isDateDisabled: (date: DateValue) => {
      const d = new Date(date.year, date.month - 1, date.day);
      return d.getDay() === 0 || d.getDay() === 6;
    },
  },
  play: async ({ canvasElement, args }) => {
    const saturday = getDayCell(canvasElement, '2024-01-06');
    await userEvent.click(saturday, { pointerEventsCheck: 0 });
    expect(args.onValueChange).not.toHaveBeenCalled();
    expect(saturday).not.toHaveAttribute('data-selected');

    const monday = getDayCell(canvasElement, '2024-01-08');
    await userEvent.click(monday);
    expect(args.onValueChange).toHaveBeenCalledTimes(1);
    expect(monday).toHaveAttribute('data-selected');
  },
};

/**
 * A set of unavailable dates blocks selection while other dates remain
 * selectable.
 */
export const UnavailableDatesInteractive: Story = {
  args: {
    children: 'January 10th is unavailable',
    placeholder: new CalendarDate(2024, 1, 1),
    isDateUnavailable: (date: DateValue) =>
      date.year === 2024 && date.month === 1 && date.day === 10,
  },
  play: async ({ canvasElement, args }) => {
    const unavailable = getDayCell(canvasElement, '2024-01-10');
    await userEvent.click(unavailable, { pointerEventsCheck: 0 });
    expect(args.onValueChange).not.toHaveBeenCalled();

    const available = getDayCell(canvasElement, '2024-01-11');
    await userEvent.click(available);
    expect(args.onValueChange).toHaveBeenCalledTimes(1);
  },
};

/* -------------------------------------------------------------------------
 * min/max boundary interaction (1)
 * ---------------------------------------------------------------------- */

/**
 * The minValue boundary date itself is selectable, while a date before it
 * is blocked from selection.
 */
export const MinMaxBoundaryInteractive: Story = {
  args: {
    children: 'Bounded between the 10th and the 20th',
    minValue: new CalendarDate(2024, 1, 10),
    maxValue: new CalendarDate(2024, 1, 20),
    placeholder: new CalendarDate(2024, 1, 15),
  },
  play: async ({ canvasElement, args }) => {
    const beforeMin = getDayCell(canvasElement, '2024-01-05');
    await userEvent.click(beforeMin, { pointerEventsCheck: 0 });
    expect(args.onValueChange).not.toHaveBeenCalled();

    const atMin = getDayCell(canvasElement, '2024-01-10');
    await userEvent.click(atMin);
    expect(args.onValueChange).toHaveBeenCalledTimes(1);
    expect(atMin).toHaveAttribute('data-selected');
  },
};

/* -------------------------------------------------------------------------
 * View switching interactions (2)
 * ---------------------------------------------------------------------- */

/**
 * Clicking the header trigger switches from the day grid to the month grid;
 * clicking a specific month cell drills back down to the day grid (the
 * header trigger itself only ever advances one view level up - day to
 * month to year - it never goes back down).
 */
export const MonthViewNavigationInteractive: Story = {
  args: {
    children: 'Switch to month view and back',
    placeholder: new CalendarDate(2024, 1, 1),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dayHeader = getViewTrigger(canvasElement, 'day');
    await userEvent.click(dayHeader);
    expect(canvas.getByRole('grid')).toHaveAttribute(
      'data-view',
      'month'
    );

    const monthCell = getMonthCell(canvasElement, 3);
    await userEvent.click(monthCell);
    expect(canvas.getByRole('grid')).toHaveAttribute(
      'data-view',
      'day'
    );
  },
};

/**
 * Drilling from the year grid down through the month grid lands back on the
 * day grid for the chosen month/year. Uses `value` rather than `placeholder`
 * to seed the initial focused month, since `placeholder` maps to a fully
 * controlled focusedValue that snaps back on every render, discarding the
 * year/month navigated to via CELL.CLICK.
 */
export const YearViewNavigationInteractive: Story = {
  args: {
    children: 'Drill from year, to month, to day',
    value: [new CalendarDate(2024, 1, 1)],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(getViewTrigger(canvasElement, 'day'));
    expect(canvas.getByRole('grid')).toHaveAttribute(
      'data-view',
      'month'
    );

    await userEvent.click(getViewTrigger(canvasElement, 'month'));
    expect(canvas.getByRole('grid')).toHaveAttribute(
      'data-view',
      'year'
    );

    const yearCell = getYearCell(canvasElement, 2025);
    await userEvent.click(yearCell);
    expect(canvas.getByRole('grid')).toHaveAttribute(
      'data-view',
      'month'
    );

    const monthCell = getMonthCell(canvasElement, 6);
    await userEvent.click(monthCell);
    expect(canvas.getByRole('grid')).toHaveAttribute(
      'data-view',
      'day'
    );

    expect(getViewTrigger(canvasElement, 'day'))
      .toHaveTextContent('June 2025');
  },
};

/* -------------------------------------------------------------------------
 * Keyboard interaction within the day grid (3)
 * ---------------------------------------------------------------------- */

/**
 * ArrowRight moves the roving focus to the next day. Note: this story uses
 * `value` rather than `placeholder` to seed the initially focused date,
 * because `placeholder` maps to a fully controlled focusedValue and freezes
 * keyboard-driven focus movement.
 */
export const KeyboardArrowRightNavigation: Story = {
  args: {
    children: 'Focus Jan 15, then press ArrowRight',
    value: [new CalendarDate(2024, 1, 15)],
  },
  play: async ({ canvasElement }) => {
    const initial = getDayCell(canvasElement, '2024-01-15');
    initial.focus();
    await userEvent.keyboard('{ArrowRight}');
    const next = getDayCell(canvasElement, '2024-01-16');
    expect(next).toHaveAttribute('data-focus');
  },
};

/**
 * ArrowDown moves the roving focus to the same weekday one week later.
 */
export const KeyboardArrowDownNavigation: Story = {
  args: {
    children: 'Focus Jan 15, then press ArrowDown',
    value: [new CalendarDate(2024, 1, 15)],
  },
  play: async ({ canvasElement }) => {
    const initial = getDayCell(canvasElement, '2024-01-15');
    initial.focus();
    await userEvent.keyboard('{ArrowDown}');
    const next = getDayCell(canvasElement, '2024-01-22');
    expect(next).toHaveAttribute('data-focus');
  },
};

/**
 * Home and End move the roving focus to the first and last day of the
 * currently visible month (not just the current week row).
 */
export const KeyboardHomeEndNavigation: Story = {
  args: {
    children: 'Focus Jan 15, then press Home and End',
    value: [new CalendarDate(2024, 1, 15)],
  },
  play: async ({ canvasElement }) => {
    const initial = getDayCell(canvasElement, '2024-01-15');
    initial.focus();
    await userEvent.keyboard('{Home}');
    expect(getDayCell(canvasElement, '2024-01-01'))
      .toHaveAttribute('data-focus');

    getDayCell(canvasElement, '2024-01-01').focus();
    await userEvent.keyboard('{End}');
    expect(getDayCell(canvasElement, '2024-01-31'))
      .toHaveAttribute('data-focus');
  },
};

/**
 * PageDown moves the roving focus and the visible grid forward by a month.
 */
export const KeyboardPageDownMonthNavigation: Story = {
  args: {
    children: 'Focus Jan 15, then press PageDown',
    value: [new CalendarDate(2024, 1, 15)],
  },
  play: async ({ canvasElement }) => {
    const initial = getDayCell(canvasElement, '2024-01-15');
    initial.focus();
    await userEvent.keyboard('{PageDown}');
    expect(getViewTrigger(canvasElement, 'day'))
      .toHaveTextContent('February 2024');
  },
};

/* -------------------------------------------------------------------------
 * maxDays cap enforcement (controlled) (1)
 * ---------------------------------------------------------------------- */

/**
 * maxDays only caps the visible selection when the calendar is driven by
 * controlled state that ignores updates beyond the cap - this story
 * demonstrates and verifies that end-to-end.
 */
export const MaxDaysControlledCapInteractive: Story = {
  render: () => {
    const CappedMultiple = () => {
      const [value, setValue] = useState<DateValue[]>([]);
      return (
        <Calendar
          type="multiple"
          maxDays={2}
          value={value}
          onValueChange={(details) => setValue(details.value)}
          placeholder={new CalendarDate(2024, 1, 1)}
        >
          Pick up to 2 dates ({value.length}/2)
        </Calendar>
      );
    };
    return <CappedMultiple />;
  },
  play: async ({ canvasElement }) => {
    await userEvent.click(getDayCell(canvasElement, '2024-01-05'));
    await userEvent.click(getDayCell(canvasElement, '2024-01-06'));
    await userEvent.click(getDayCell(canvasElement, '2024-01-07'));
    const selected = canvasElement.querySelectorAll(
      '[data-view="day"][data-selected]'
    );
    expect(selected.length).toBe(2);
    expect(getDayCell(canvasElement, '2024-01-07'))
      .not.toHaveAttribute('data-selected');
  },
};

/* -------------------------------------------------------------------------
 * Selection mode interactions (2)
 * ---------------------------------------------------------------------- */

/**
 * In multiple mode, each click adds a new date to the selection.
 */
export const MultipleSelectionAddsDates: Story = {
  args: {
    children: 'Click several dates to add them all',
    type: 'multiple',
    placeholder: new CalendarDate(2024, 1, 1),
  },
  play: async ({ canvasElement, args }) => {
    await userEvent.click(getDayCell(canvasElement, '2024-01-05'));
    await userEvent.click(getDayCell(canvasElement, '2024-01-06'));
    expect(args.onValueChange).toHaveBeenCalledTimes(2);
    expect(getDayCell(canvasElement, '2024-01-05')).toHaveAttribute(
      'data-selected'
    );
    expect(getDayCell(canvasElement, '2024-01-06')).toHaveAttribute(
      'data-selected'
    );
  },
};

/**
 * In single mode, selecting a new date replaces the previously selected one.
 * Uses controlled state so the newly clicked date is actually reflected back
 * into `value` (a fixed, never-updated `value` prop would keep showing the
 * original selection regardless of what is clicked).
 */
export const SingleSelectionReplacesPreviousInteractive: Story = {
  render: () => {
    const ReplaceableSingle = () => {
      const [value, setValue] = useState<DateValue[]>([
        new CalendarDate(2024, 1, 15),
      ]);
      return (
        <Calendar value={value} onValueChange={(d) => setValue(d.value)}>
          Selecting a new date replaces the old one
        </Calendar>
      );
    };
    return <ReplaceableSingle />;
  },
  play: async ({ canvasElement }) => {
    const previous = getDayCell(canvasElement, '2024-01-15');
    expect(previous).toHaveAttribute('data-selected');

    const next = getDayCell(canvasElement, '2024-01-20');
    await userEvent.click(next);
    expect(next).toHaveAttribute('data-selected');
  },
};

/* -------------------------------------------------------------------------
 * Disabled/read-only interaction guards (2)
 * ---------------------------------------------------------------------- */

/**
 * No selection is possible anywhere on a fully disabled calendar.
 */
export const DisabledCalendarBlocksInteraction: Story = {
  args: {
    children: 'Disabled - clicking does nothing',
    disabled: true,
    placeholder: new CalendarDate(2024, 1, 1),
  },
  play: async ({ canvasElement, args }) => {
    const day = getDayCell(canvasElement, '2024-01-15');
    await userEvent.click(day, { pointerEventsCheck: 0 });
    expect(args.onValueChange).not.toHaveBeenCalled();
  },
};

/**
 * No selection is possible on a read-only calendar.
 */
export const ReadOnlyCalendarBlocksInteraction: Story = {
  args: {
    children: 'Read-only - clicking does nothing',
    readOnly: true,
    placeholder: new CalendarDate(2024, 1, 1),
  },
  play: async ({ canvasElement, args }) => {
    const day = getDayCell(canvasElement, '2024-01-15');
    await userEvent.click(day);
    expect(args.onValueChange).not.toHaveBeenCalled();
  },
};

/* -------------------------------------------------------------------------
 * fixedWeeks grid shape verification (1)
 * ---------------------------------------------------------------------- */

/**
 * February 2024 only needs 5 calendar rows by default; fixedWeeks forces a
 * consistent 6-row grid.
 */
export const FixedWeeksSixRowGridVerification: Story = {
  args: {
    children: 'February 2024 padded to 6 rows',
    fixedWeeks: true,
    placeholder: new CalendarDate(2024, 2, 1),
  },
  play: async ({ canvasElement }) => {
    const rows = canvasElement.querySelectorAll('[data-view="day"] tbody tr');
    expect(rows.length).toBe(6);
  },
};
