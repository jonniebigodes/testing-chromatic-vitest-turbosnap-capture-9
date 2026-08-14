import type { Meta, StoryObj } from '@storybook/react';
import { fn, within, userEvent, expect } from 'storybook/test';
import DatePicker, { type DateValue } from './DatePicker';
import { useState } from 'react';
import { CalendarDate } from '@internationalized/date';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'The selection mode of the date picker',
    },
    value: {
      control: 'object',
      description: 'The controlled selected date(s)',
    },
    onValueChange: {
      action: 'valueChanged',
      description: 'Function called when the value changes',
    },
    open: {
      control: 'boolean',
      description: 'Whether the date picker is open',
    },
    onOpenChange: {
      action: 'openChanged',
      description: 'Function called when the open state changes',
    },
    placeholder: {
      control: 'object',
      description: 'The placeholder date',
    },
    isDateUnavailable: {
      description: 'Function that determines if a date should be unavailable',
    },
    isDateDisabled: {
      description: 'Function that determines if a date should be disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the date picker is required',
    },
    onInvalid: {
      action: 'invalid',
      description: 'Function called when the date picker becomes invalid',
    },
    errorMessageId: {
      control: 'text',
      description: 'The id of the error message element for accessibility',
    },
    disableDaysOutsideMonth: {
      control: 'boolean',
      description: 'Disable days outside the current month',
    },
    closeOnDateSelect: {
      control: 'boolean',
      description: 'Close the date picker when a date is selected',
    },
    preventDeselect: {
      control: 'boolean',
      description: 'Prevent deselecting a date',
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
    numberOfMonths: {
      control: 'number',
      description: 'Number of months to display',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the date picker is disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the date picker is read-only',
    },
    hideTimeZone: {
      control: 'boolean',
      description: 'Hide the time zone segment',
    },
    monthFormat: {
      control: 'select',
      options: ['short', 'long', 'narrow', 'numeric', '2-digit'],
      description: 'Format of month display',
    },
    yearFormat: {
      control: 'select',
      options: ['numeric', '2-digit'],
      description: 'Format of year display',
    },
    children: {
      control: 'text',
      description: 'Custom label content',
    },
    name: {
      control: 'text',
      description: 'Name attribute for form submission',
    },
  },
  args: {
    onValueChange: fn(),
    onOpenChange: fn(),
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default date picker with basic configuration.
 */
export const Default: Story = {
  args: {
    children: 'Select a date',
  },
};

/**
 * Date picker with custom min, max, and value.
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
 * Date picker with custom children content.
 */
export const CustomChildren: Story = {
  args: {
    children: 'Book an Appointment',
  },
};

/**
 * Date picker with multiple date selection.
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
 * Date picker that closes on date selection.
 */
export const CloseOnSelect: Story = {
  args: {
    children: 'Close on select',
    closeOnDateSelect: true,
  },
};

/**
 * Required date picker.
 */
export const Required: Story = {
  args: {
    children: 'Required Date *',
    required: true,
  },
};

/**
 * Disabled date picker.
 */
export const Disabled: Story = {
  args: {
    children: 'Disabled Date Picker',
    disabled: true,
    value: [new CalendarDate(2024, 1, 15)],
  },
};

/**
 * Read-only date picker.
 */
export const ReadOnly: Story = {
  args: {
    children: 'Read-only Date Picker',
    readOnly: true,
    value: [new CalendarDate(2024, 1, 15)],
  },
};

/**
 * Date picker with week starting on Monday.
 */
export const WeekStartsMonday: Story = {
  args: {
    children: 'Week starts on Monday',
    weekStartsOn: 1,
  },
};

/**
 * Date picker with fixed 6 weeks.
 */
export const FixedWeeks: Story = {
  args: {
    children: 'Fixed 6 Weeks',
    fixedWeeks: true,
  },
};

/**
 * Date picker with narrow weekday format.
 */
export const NarrowWeekdays: Story = {
  args: {
    children: 'Narrow Weekday Format',
    weekdayFormat: 'narrow',
  },
};

/**
 * Date picker with long weekday format.
 */
export const LongWeekdays: Story = {
  args: {
    children: 'Long Weekday Format',
    weekdayFormat: 'long',
  },
};

/**
 * Date picker with disabled days outside month.
 */
export const DisableDaysOutsideMonth: Story = {
  args: {
    children: 'Days Outside Month Disabled',
    disableDaysOutsideMonth: true,
  },
};

/**
 * Date picker with multiple months displayed.
 */
export const MultipleMonths: Story = {
  args: {
    children: 'Multiple Months',
    numberOfMonths: 2,
  },
};

/**
 * Date picker with custom date disabling logic.
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
 * Date picker that prevents deselecting dates.
 */
export const PreventDeselect: Story = {
  args: {
    children: 'Prevent Deselect',
    preventDeselect: true,
    value: [new CalendarDate(2024, 1, 15)],
  },
};

/**
 * Controlled date picker with state management.
 */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<DateValue[]>([
      new CalendarDate(2024, 1, 15),
    ]);
    const [open, setOpen] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <DatePicker
          value={value}
          onValueChange={(details) => setValue(details.value)}
          open={open}
          onOpenChange={(details) => setOpen(details.open)}
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
          <br />
          Open: {open ? 'Yes' : 'No'}
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
 * Multiple dates controlled date picker.
 */
export const MultipleControlled: Story = {
  render: () => {
    const [value, setValue] = useState<DateValue[]>([]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <DatePicker
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
 * Booking date picker example.
 */
export const BookingDatePicker: Story = {
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
          maxWidth: '400px',
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

        <DatePicker
          value={value}
          onValueChange={(details) => setValue(details.value)}
          isDateUnavailable={isDateUnavailable}
          minValue={new CalendarDate(2024, 1, 1)}
          maxValue={new CalendarDate(2024, 1, 31)}
          closeOnDateSelect
          children="Appointment Date"
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
 * Form integration example with validation.
 */
export const FormIntegration: Story = {
  render: () => {
    const [value, setValue] = useState<DateValue[]>([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (value.length === 0) {
        setErrorMessage('Please select a date');
      } else {
        setErrorMessage('');

        console.log(
          `Form submitted with date: ${value[0].year}-${value[0].month}-${value[0].day}`
        );
      }
    };

    return (
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '24px',
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          maxWidth: '400px',
        }}
      >
        <DatePicker
          value={value}
          onValueChange={(details) => {
            setValue(details.value);
            if (details.value.length > 0) {
              setErrorMessage('');
            }
          }}
          required
          name="appointmentDate"
          errorMessageId={errorMessage ? 'date-error' : undefined}
          children="Select Date *"
        />

        {errorMessage && (
          <div
            id="date-error"
            style={{
              padding: '8px 12px',
              backgroundColor: '#fef2f2',
              color: '#dc2626',
              borderRadius: '6px',
              fontSize: '14px',
              border: '1px solid #fecaca',
            }}
          >
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          style={{
            padding: '10px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Submit
        </button>
      </form>
    );
  },
};

/**
 * Date picker with different locales.
 */
export const DifferentLocales: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <DatePicker children="English (US)" locale="en-US" />
      <DatePicker children="Español" locale="es-ES" />
      <DatePicker children="Français" locale="fr-FR" />
      <DatePicker children="Deutsch" locale="de-DE" />
    </div>
  ),
};

/**
 * Date picker variations showcase.
 */
export const Variations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <DatePicker children="Default" />
      <DatePicker children="Fixed Weeks" fixedWeeks />
      <DatePicker children="Week Starts Monday" weekStartsOn={1} />
      <DatePicker children="Multiple Selection" type="multiple" />
      <DatePicker children="Close on Select" closeOnDateSelect />
      <DatePicker children="Narrow Weekdays" weekdayFormat="narrow" />
    </div>
  ),
};

/** Finds the popover content rendered through the DatePicker's Portal. */
const getContentEl = (canvasElement: HTMLElement) =>
  canvasElement.ownerDocument.querySelector(
    '[role="application"]'
  ) as HTMLElement;

/* -------------------------------------------------------------------------
 * Kitchen-sink combinations (3)
 * ---------------------------------------------------------------------- */

/**
 * Kitchen sink: required, two visible months, and a value constrained by
 * min/max bounds.
 */
export const KitchenSinkRequiredMultipleMonths: Story = {
  args: {
    children: 'Kitchen sink: required + multiple months',
    required: true,
    numberOfMonths: 2,
    value: [new CalendarDate(2024, 6, 10)],
    minValue: new CalendarDate(2024, 5, 1),
    maxValue: new CalendarDate(2024, 7, 31),
  },
};

/**
 * Kitchen sink: disabled with multiple pre-selected dates.
 */
export const KitchenSinkDisabledMultipleWithValue: Story = {
  args: {
    children: 'Kitchen sink: disabled + multiple values',
    type: 'multiple',
    disabled: true,
    value: [
      new CalendarDate(2024, 1, 5),
      new CalendarDate(2024, 1, 12),
      new CalendarDate(2024, 1, 19),
    ],
  },
};

/**
 * Kitchen sink: read-only with a narrow min/max range and a value.
 */
export const KitchenSinkReadOnlyMinMax: Story = {
  args: {
    children: 'Kitchen sink: read-only + narrow range',
    readOnly: true,
    value: [new CalendarDate(2024, 3, 15)],
    minValue: new CalendarDate(2024, 3, 10),
    maxValue: new CalendarDate(2024, 3, 20),
  },
};

/* -------------------------------------------------------------------------
 * Controlled open state (1)
 * ---------------------------------------------------------------------- */

/**
 * Controlled open state only; the value stays uncontrolled while an
 * external button toggles visibility of the calendar.
 */
export const ControlledOpenOnly: Story = {
  render: () => {
    const ControlledOpenFixture = () => {
      const [open, setOpen] = useState(false);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <DatePicker
            open={open}
            onOpenChange={(details) => setOpen(details.open)}
            children="Externally controlled open state"
          />
          <button
            onClick={() => setOpen((current) => !current)}
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
            {open ? 'Close from outside' : 'Open from outside'}
          </button>
        </div>
      );
    };

    return <ControlledOpenFixture />;
  },
};

/* -------------------------------------------------------------------------
 * Multiple months variations (2)
 * ---------------------------------------------------------------------- */

/**
 * Three months displayed side by side.
 */
export const ThreeMonths: Story = {
  args: {
    children: 'Three Months',
    numberOfMonths: 3,
  },
};

/**
 * Two months displayed with a pre-selected value.
 */
export const TwoMonthsWithValue: Story = {
  args: {
    children: 'Two Months with a Selected Date',
    numberOfMonths: 2,
    value: [new CalendarDate(2024, 6, 15)],
  },
};

/* -------------------------------------------------------------------------
 * Min/max edge cases (3)
 * ---------------------------------------------------------------------- */

/**
 * Only a minimum date is configured; earlier dates are unavailable.
 */
export const MinValueOnly: Story = {
  args: {
    children: 'Minimum Date Only',
    minValue: new CalendarDate(2024, 6, 15),
  },
};

/**
 * Only a maximum date is configured; later dates are unavailable.
 */
export const MaxValueOnly: Story = {
  args: {
    children: 'Maximum Date Only',
    maxValue: new CalendarDate(2024, 6, 15),
  },
};

/**
 * A very narrow min/max range, leaving only a handful of selectable days.
 */
export const NarrowMinMaxRange: Story = {
  args: {
    children: 'Narrow Selectable Range',
    minValue: new CalendarDate(2024, 6, 10),
    maxValue: new CalendarDate(2024, 6, 13),
  },
};

/* -------------------------------------------------------------------------
 * Month/year format variations (3)
 * ---------------------------------------------------------------------- */

/**
 * Short month format in the month view.
 */
export const ShortMonthFormat: Story = {
  args: {
    children: 'Short Month Format',
    monthFormat: 'short',
  },
};

/**
 * Numeric month format in the month view.
 */
export const NumericMonthFormat: Story = {
  args: {
    children: 'Numeric Month Format',
    monthFormat: 'numeric',
  },
};

/**
 * Two-digit year format in the year view.
 */
export const TwoDigitYearFormat: Story = {
  args: {
    children: 'Two-digit Year Format',
    yearFormat: '2-digit',
  },
};

/* -------------------------------------------------------------------------
 * Custom formatter functions (1)
 * ---------------------------------------------------------------------- */

/**
 * Custom formatting functions for both the month and year views.
 */
export const CustomFormatFunctions: Story = {
  args: {
    children: 'Custom Month/Year Formatters',
    monthFormat: (month: number) => `M${month}`,
    yearFormat: (year: number) => `'${year.toString().slice(-2)}`,
  },
};

/* -------------------------------------------------------------------------
 * Custom initial focused month (1)
 * ---------------------------------------------------------------------- */

/**
 * Uses the `placeholder` prop to open the calendar focused on a specific
 * month/year even though no value has been selected yet.
 */
export const CustomPlaceholder: Story = {
  args: {
    children: 'Opens Focused on December 2025',
    placeholder: new CalendarDate(2025, 12, 1),
  },
};

/* -------------------------------------------------------------------------
 * Weekday/week-start combinations (2)
 * ---------------------------------------------------------------------- */

/**
 * Week starts on Saturday.
 */
export const WeekStartsSaturday: Story = {
  args: {
    children: 'Week Starts on Saturday',
    weekStartsOn: 6,
  },
};

/**
 * Week starts on Monday combined with long weekday names.
 */
export const LongWeekdaysMondayStart: Story = {
  args: {
    children: 'Monday Start with Long Weekdays',
    weekStartsOn: 1,
    weekdayFormat: 'long',
  },
};

/* -------------------------------------------------------------------------
 * Disabled/read-only crossed with a value (2)
 * ---------------------------------------------------------------------- */

/**
 * Disabled multiple-selection date picker with several selected dates.
 */
export const DisabledMultipleSelectionWithValues: Story = {
  args: {
    children: 'Disabled Multiple Selection',
    type: 'multiple',
    disabled: true,
    value: [new CalendarDate(2024, 2, 1), new CalendarDate(2024, 2, 14)],
  },
};

/**
 * Read-only date picker with no value selected yet.
 */
export const ReadOnlyWithoutValue: Story = {
  args: {
    children: 'Read-only, Nothing Selected',
    readOnly: true,
  },
};

/* -------------------------------------------------------------------------
 * Named form context (1)
 * ---------------------------------------------------------------------- */

/**
 * Submits a form and displays the captured FormData inline.
 */
export const NamedDatePickerFormCapture: Story = {
  render: () => {
    const CapturingForm = () => {
      const [result, setResult] = useState<string | null>(null);

      return (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            setResult(JSON.stringify(Object.fromEntries(formData), null, 2));
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxWidth: '320px',
          }}
        >
          <DatePicker
            name="eventDate"
            value={[new CalendarDate(2024, 4, 1)]}
            children="Event Date"
          />
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Submit
          </button>
          {result && (
            <pre
              style={{
                margin: 0,
                padding: '8px',
                backgroundColor: '#f1f5f9',
                borderRadius: '4px',
                fontSize: '12px',
                whiteSpace: 'pre-wrap',
              }}
            >
              {result}
            </pre>
          )}
        </form>
      );
    };

    return <CapturingForm />;
  },
};

/* -------------------------------------------------------------------------
 * Locale-specific instances (2)
 * ---------------------------------------------------------------------- */

/**
 * Japanese locale formatting.
 */
export const JapaneseLocale: Story = {
  args: {
    children: '日本語',
    locale: 'ja-JP',
    value: [new CalendarDate(2024, 6, 15)],
  },
};

/**
 * Arabic locale rendered in a right-to-left container.
 */
export const ArabicLocaleRTL: Story = {
  args: {
    children: 'العربية',
    locale: 'ar-SA',
  },
  decorators: [
    (Story) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
};

/* -------------------------------------------------------------------------
 * Error message display (1)
 * ---------------------------------------------------------------------- */

/**
 * Static example of a required date picker paired with a visible error
 * message element referenced via `errorMessageId`.
 */
export const WithErrorMessage: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <DatePicker required errorMessageId="date-picker-error" children="Select Date *" />
      <span id="date-picker-error" style={{ color: '#dc2626', fontSize: '14px' }}>
        Please select a date to continue.
      </span>
    </div>
  ),
};

/* -------------------------------------------------------------------------
 * Interaction: open/close via the trigger (1)
 * ---------------------------------------------------------------------- */

/**
 * Clicking the trigger opens the calendar; clicking it again closes it.
 */
export const OpenCloseViaTriggerPlay: Story = {
  args: {
    children: 'Click the trigger to open/close',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Open calendar' });

    await userEvent.click(trigger);
    await expect(getContentEl(canvasElement)).toBeVisible();

    await userEvent.click(canvas.getByRole('button', { name: 'Close calendar' }));
    await expect(getContentEl(canvasElement)).not.toBeVisible();
  },
};

/* -------------------------------------------------------------------------
 * Interaction: clearing a selected date (1)
 * ---------------------------------------------------------------------- */

/**
 * Clicking the clear trigger removes the selected date and hides itself.
 */
export const ClearSelectedDatePlay: Story = {
  args: {
    children: 'Clear the pre-selected date',
    value: [new CalendarDate(2024, 6, 15)],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const clearButton = canvas.getByRole('button', { name: 'Clear selected dates' });
    await expect(clearButton).toBeVisible();

    await userEvent.click(clearButton);
    await expect(clearButton).not.toBeVisible();
  },
};

/* -------------------------------------------------------------------------
 * Interaction: Escape closes the calendar (1)
 * ---------------------------------------------------------------------- */

/**
 * Pressing Escape while the calendar is open closes it.
 */
export const EscapeClosesCalendarPlay: Story = {
  args: {
    children: 'Escape to close',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Open calendar' }));
    await expect(getContentEl(canvasElement)).toBeVisible();

    await userEvent.keyboard('{Escape}');
    await expect(getContentEl(canvasElement)).not.toBeVisible();
  },
};

/* -------------------------------------------------------------------------
 * Interaction: keyboard date selection (1)
 * ---------------------------------------------------------------------- */

/**
 * Opens the calendar (focused on the pre-selected date), moves focus one day
 * forward with ArrowRight, then presses Enter to select the newly focused day.
 */
export const KeyboardSelectDatePlay: Story = {
  args: {
    children: 'Open, arrow right, then press Enter to select',
    value: [new CalendarDate(2024, 6, 15)],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Open calendar' }));
    await expect(getContentEl(canvasElement)).toBeVisible();

    await userEvent.keyboard('{ArrowRight}');
    await userEvent.keyboard('{Enter}');

    const nextDayCell = canvasElement.ownerDocument.querySelector(
      '[data-value="2024-06-16"]'
    ) as HTMLElement;
    await expect(nextDayCell).toHaveAttribute('data-selected');
  },
};

/* -------------------------------------------------------------------------
 * Layout in a compact container (1)
 * ---------------------------------------------------------------------- */

/**
 * Renders inside a narrow container to verify the control row wraps and
 * shrinks gracefully.
 */
export const CompactContainer: Story = {
  args: {
    children: 'Compact Layout',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '260px' }}>
        <Story />
      </div>
    ),
  ],
};

/* -------------------------------------------------------------------------
 * Background/container context (1)
 * ---------------------------------------------------------------------- */

/**
 * Rendered on a dark background.
 */
export const OnDarkBackground: Story = {
  args: {
    children: 'Works on dark backgrounds too',
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#0f172a', padding: '24px', borderRadius: '8px' }}>
        <Story />
      </div>
    ),
  ],
};
