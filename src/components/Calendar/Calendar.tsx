import { DatePicker } from '@ark-ui/react/date-picker';
import { ReactNode } from 'react';
import type { DateValue } from '@internationalized/date';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';

// Re-export DateValue for convenience
export type { DateValue };

/**
 * Props for the Calendar component
 */
export interface CalendarProps {
  /**
   * The selection mode of the calendar.
   * @default 'single'
   */
  type?: 'single' | 'multiple';

  /**
   * The controlled selected date(s).
   * For 'single': DateValue, For 'multiple': DateValue[]
   */
  value?: DateValue[];

  /**
   * Function called when the value changes.
   */
  onValueChange?: (details: {
    value: DateValue[];
    valueAsString: string[];
  }) => void;

  /**
   * The placeholder date when no value exists.
   */
  placeholder?: DateValue;

  /**
   * The first day of the week (0 for Sunday, 1 for Monday, etc.).
   * @default 0
   */
  weekStartsOn?: number;

  /**
   * The format of the week days ('narrow', 'short', 'long').
   * @default 'short'
   */
  weekdayFormat?: 'narrow' | 'short' | 'long';

  /**
   * The accessible label for the calendar.
   */
  calendarLabel?: string;

  /**
   * Whether the calendar should have a fixed number of weeks (6 weeks).
   * @default false
   */
  fixedWeeks?: boolean;

  /**
   * Function that determines if a date should be disabled.
   */
  isDateDisabled?: (date: DateValue) => boolean;

  /**
   * Function that determines if a date should be unavailable.
   */
  isDateUnavailable?: (date: DateValue, locale: string) => boolean;

  /**
   * The minimum date that can be selected.
   */
  minValue?: DateValue;

  /**
   * The maximum date that can be selected.
   */
  maxValue?: DateValue;

  /**
   * The locale (BCP 47 language tag) to use for date formatting.
   * @default 'en-US'
   */
  locale?: string;

  /**
   * Whether the calendar is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the calendar is read-only.
   * @default false
   */
  readOnly?: boolean;

  /**
   * Whether day outside the visible range can be selected.
   * @default false
   */
  disableDaysOutsideMonth?: boolean;

  /**
   * The maximum number of days that can be selected (only for 'multiple' mode).
   */
  maxDays?: number;

  /**
   * The format of the month display.
   * @default 'long'
   */
  monthFormat?: 'short' | 'long';

  /**
   * The format of the year display.
   * @default 'numeric'
   */
  yearFormat?: 'numeric' | '2-digit';

  /**
   * Custom content to render above the calendar.
   */
  children?: ReactNode;

  /**
   * The name attribute for form submission.
   */
  name?: string;
}

/**
 * Calendar component that displays dates and days of the week, facilitating date-related interactions.
 * Built using the @ark-ui/react library.
 *
 * @example
 * ```tsx
 * <Calendar value={[{ year: 2024, month: 1, day: 15 }]} onValueChange={(details) => console.log(details.value)} />
 * ```
 */
export default function Calendar({
  type = 'single',
  value,
  onValueChange,
  placeholder,
  weekStartsOn = 0,
  weekdayFormat = 'short',
  calendarLabel,
  fixedWeeks = false,
  isDateDisabled,
  isDateUnavailable,
  minValue,
  maxValue,
  locale = 'en-US',
  disabled = false,
  readOnly = false,
  disableDaysOutsideMonth = false,
  maxDays,
  monthFormat = 'long',
  yearFormat = 'numeric',
  children,
  name,
}: CalendarProps) {
  // Handle maxDays constraint for multiple selection
  const handleValueChange = (details: {
    value: DateValue[];
    valueAsString: string[];
  }) => {
    if (type === 'multiple' && maxDays && details.value.length > maxDays) {
      return; // Don't allow selection beyond maxDays
    }
    onValueChange?.(details);
  };

  return (
    <DatePicker.Root
      inline
      selectionMode={type}
      value={value}
      onValueChange={handleValueChange}
      focusedValue={placeholder}
      startOfWeek={weekStartsOn}
      fixedWeeks={fixedWeeks}
      isDateUnavailable={isDateUnavailable}
      min={minValue}
      max={maxValue}
      locale={locale}
      disabled={disabled}
      readOnly={readOnly}
      outsideDaySelectable={!disableDaysOutsideMonth}
      name={name}
      style={{
        display: 'inline-block',
        padding: spacing[4],
        border: `1px solid ${color.slate200}`,
        borderRadius: spacing[3],
        backgroundColor: color.white,
      }}
    >
      {children && (
        <div
          style={{
            marginBottom: spacing[3],
            fontSize: fontSize[16],
            fontWeight: fontWeight.semibold,
            color: color.slate900,
          }}
        >
          {children}
        </div>
      )}

      <DatePicker.View view="day">
        <DatePicker.Context>
          {(datePicker) => (
            <>
              <DatePicker.ViewControl
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: spacing[4],
                  gap: spacing[2],
                }}
              >
                <DatePicker.PrevTrigger
                  style={{
                    padding: spacing[2],
                    border: 'none',
                    background: 'transparent',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    fontSize: fontSize[16],
                    color: disabled ? color.slate400 : color.blue500,
                    borderRadius: spacing[2],
                    transition: 'background-color 0.2s',
                  }}
                  disabled={disabled}
                >
                  ←
                </DatePicker.PrevTrigger>

                <DatePicker.ViewTrigger
                  style={{
                    flex: 1,
                    padding: `${spacing[2]} ${spacing[3]}`,
                    border: 'none',
                    background: 'transparent',
                    cursor: disabled || readOnly ? 'default' : 'pointer',
                    fontSize: fontSize[14],
                    fontWeight: fontWeight.semibold,
                    color: color.slate900,
                    borderRadius: spacing[2],
                    transition: 'background-color 0.2s',
                  }}
                  disabled={disabled || readOnly}
                >
                  <DatePicker.RangeText />
                </DatePicker.ViewTrigger>

                <DatePicker.NextTrigger
                  style={{
                    padding: spacing[2],
                    border: 'none',
                    background: 'transparent',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    fontSize: fontSize[16],
                    color: disabled ? color.slate400 : color.blue500,
                    borderRadius: spacing[2],
                    transition: 'background-color 0.2s',
                  }}
                  disabled={disabled}
                >
                  →
                </DatePicker.NextTrigger>
              </DatePicker.ViewControl>

              <DatePicker.Table
                style={{
                  width: '100%',
                  borderCollapse: 'separate',
                  borderSpacing: spacing[1],
                }}
              >
                <DatePicker.TableHead>
                  <DatePicker.TableRow>
                    {datePicker.weekDays.map((weekDay, id) => (
                      <DatePicker.TableHeader
                        key={id}
                        style={{
                          padding: spacing[2],
                          fontSize: fontSize[12],
                          fontWeight: fontWeight.semibold,
                          color: color.slate500,
                          textAlign: 'center',
                          textTransform: 'uppercase',
                        }}
                      >
                        {weekdayFormat === 'narrow'
                          ? weekDay.narrow
                          : weekdayFormat === 'long'
                            ? weekDay.long
                            : weekDay.short}
                      </DatePicker.TableHeader>
                    ))}
                  </DatePicker.TableRow>
                </DatePicker.TableHead>

                <DatePicker.TableBody>
                  {datePicker.weeks.map((week, weekId) => (
                    <DatePicker.TableRow key={weekId}>
                      {week.map((day, dayId) => {
                        const isDisabled = isDateDisabled
                          ? isDateDisabled(day)
                          : false;

                        return (
                          <DatePicker.TableCell
                            key={dayId}
                            value={day}
                            disabled={isDisabled}
                            style={{
                              padding: 0,
                            }}
                          >
                            <DatePicker.TableCellTrigger
                              style={{
                                width: spacing[10],
                                height: spacing[10],
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: 'none',
                                background: 'transparent',
                                borderRadius: spacing[2],
                                fontSize: fontSize[14],
                                fontWeight: fontWeight.medium,
                                cursor:
                                  disabled || readOnly || isDisabled
                                    ? 'not-allowed'
                                    : 'pointer',
                                transition: 'all 0.2s',
                                color: isDisabled
                                  ? color.slate300
                                  : color.slate700,
                              }}
                            >
                              {day.day}
                            </DatePicker.TableCellTrigger>
                          </DatePicker.TableCell>
                        );
                      })}
                    </DatePicker.TableRow>
                  ))}
                </DatePicker.TableBody>
              </DatePicker.Table>
            </>
          )}
        </DatePicker.Context>
      </DatePicker.View>

      {/* Month View */}
      <DatePicker.View view="month">
        <DatePicker.Context>
          {(datePicker) => (
            <>
              <DatePicker.ViewControl
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: spacing[4],
                  gap: spacing[2],
                }}
              >
                <DatePicker.PrevTrigger
                  style={{
                    padding: spacing[2],
                    border: 'none',
                    background: 'transparent',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    fontSize: fontSize[16],
                    color: disabled ? color.slate400 : color.blue500,
                    borderRadius: spacing[2],
                  }}
                  disabled={disabled}
                >
                  ←
                </DatePicker.PrevTrigger>

                <DatePicker.ViewTrigger
                  style={{
                    flex: 1,
                    padding: `${spacing[2]} ${spacing[3]}`,
                    border: 'none',
                    background: 'transparent',
                    cursor: disabled || readOnly ? 'default' : 'pointer',
                    fontSize: fontSize[14],
                    fontWeight: fontWeight.semibold,
                    color: color.slate900,
                    borderRadius: spacing[2],
                  }}
                  disabled={disabled || readOnly}
                >
                  <DatePicker.RangeText />
                </DatePicker.ViewTrigger>

                <DatePicker.NextTrigger
                  style={{
                    padding: spacing[2],
                    border: 'none',
                    background: 'transparent',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    fontSize: fontSize[16],
                    color: disabled ? color.slate400 : color.blue500,
                    borderRadius: spacing[2],
                  }}
                  disabled={disabled}
                >
                  →
                </DatePicker.NextTrigger>
              </DatePicker.ViewControl>

              <DatePicker.Table
                style={{
                  width: '100%',
                  borderCollapse: 'separate',
                  borderSpacing: spacing[1],
                }}
              >
                <DatePicker.TableBody>
                  {datePicker
                    .getMonthsGrid({ columns: 3, format: monthFormat })
                    .map((months, id) => (
                      <DatePicker.TableRow key={id}>
                        {months.map((month, monthId) => (
                          <DatePicker.TableCell
                            key={monthId}
                            value={month.value}
                            style={{
                              padding: 0,
                            }}
                          >
                            <DatePicker.TableCellTrigger
                              style={{
                                width: '100%',
                                padding: spacing[3],
                                border: 'none',
                                background: 'transparent',
                                borderRadius: spacing[2],
                                fontSize: fontSize[14],
                                fontWeight: fontWeight.medium,
                                cursor:
                                  disabled || readOnly
                                    ? 'not-allowed'
                                    : 'pointer',
                                transition: 'all 0.2s',
                                color: color.slate700,
                              }}
                            >
                              {month.label}
                            </DatePicker.TableCellTrigger>
                          </DatePicker.TableCell>
                        ))}
                      </DatePicker.TableRow>
                    ))}
                </DatePicker.TableBody>
              </DatePicker.Table>
            </>
          )}
        </DatePicker.Context>
      </DatePicker.View>

      {/* Year View */}
      <DatePicker.View view="year">
        <DatePicker.Context>
          {(datePicker) => (
            <>
              <DatePicker.ViewControl
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: spacing[4],
                  gap: spacing[2],
                }}
              >
                <DatePicker.PrevTrigger
                  style={{
                    padding: spacing[2],
                    border: 'none',
                    background: 'transparent',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    fontSize: fontSize[16],
                    color: disabled ? color.slate400 : color.blue500,
                    borderRadius: spacing[2],
                  }}
                  disabled={disabled}
                >
                  ←
                </DatePicker.PrevTrigger>

                <DatePicker.ViewTrigger
                  style={{
                    flex: 1,
                    padding: `${spacing[2]} ${spacing[3]}`,
                    border: 'none',
                    background: 'transparent',
                    cursor: 'default',
                    fontSize: fontSize[14],
                    fontWeight: fontWeight.semibold,
                    color: color.slate900,
                    borderRadius: spacing[2],
                  }}
                  disabled
                >
                  <DatePicker.RangeText />
                </DatePicker.ViewTrigger>

                <DatePicker.NextTrigger
                  style={{
                    padding: spacing[2],
                    border: 'none',
                    background: 'transparent',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    fontSize: fontSize[16],
                    color: disabled ? color.slate400 : color.blue500,
                    borderRadius: spacing[2],
                  }}
                  disabled={disabled}
                >
                  →
                </DatePicker.NextTrigger>
              </DatePicker.ViewControl>

              <DatePicker.Table
                style={{
                  width: '100%',
                  borderCollapse: 'separate',
                  borderSpacing: spacing[1],
                }}
              >
                <DatePicker.TableBody>
                  {datePicker.getYearsGrid({ columns: 4 }).map((years, id) => (
                    <DatePicker.TableRow key={id}>
                      {years.map((year, yearId) => (
                        <DatePicker.TableCell
                          key={yearId}
                          value={year.value}
                          style={{
                            padding: 0,
                          }}
                        >
                          <DatePicker.TableCellTrigger
                            style={{
                              width: '100%',
                              padding: spacing[3],
                              border: 'none',
                              background: 'transparent',
                              borderRadius: spacing[2],
                              fontSize: fontSize[14],
                              fontWeight: fontWeight.medium,
                              cursor:
                                disabled || readOnly
                                  ? 'not-allowed'
                                  : 'pointer',
                              transition: 'all 0.2s',
                              color: color.slate700,
                            }}
                          >
                            {year.label}
                          </DatePicker.TableCellTrigger>
                        </DatePicker.TableCell>
                      ))}
                    </DatePicker.TableRow>
                  ))}
                </DatePicker.TableBody>
              </DatePicker.Table>
            </>
          )}
        </DatePicker.Context>
      </DatePicker.View>

      {/* Hidden input for form submission */}
      <DatePicker.Input style={{ display: 'none' }} />
    </DatePicker.Root>
  );
}
