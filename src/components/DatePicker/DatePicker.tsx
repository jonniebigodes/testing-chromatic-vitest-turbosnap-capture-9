import { DatePicker as ArkDatePicker } from '@ark-ui/react/date-picker';
import { Portal } from '@ark-ui/react/portal';
import { ReactNode } from 'react';
import type { DateValue } from '@internationalized/date';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';

// Re-export DateValue for convenience
export type { DateValue };

/**
 * Props for the DatePicker component
 */
export interface DatePickerProps {
  /**
   * The selection mode of the date picker.
   * @default 'single'
   */
  type?: 'single' | 'multiple';

  /**
   * The controlled selected date(s).
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
   * Whether the date picker is open.
   */
  open?: boolean;

  /**
   * Function called when the open state changes.
   */
  onOpenChange?: (details: { open: boolean }) => void;

  /**
   * The placeholder date when no value exists.
   */
  placeholder?: DateValue;

  /**
   * Function that determines if a date should be unavailable.
   */
  isDateUnavailable?: (date: DateValue, locale: string) => boolean;

  /**
   * Function that determines if a date should be disabled.
   */
  isDateDisabled?: (date: DateValue) => boolean;

  /**
   * Whether the date picker is required.
   * @default false
   */
  required?: boolean;

  /**
   * Function called when the date picker becomes invalid.
   */
  onInvalid?: (details: { reason: string }) => void;

  /**
   * The id of the error message element for accessibility.
   */
  errorMessageId?: string;

  /**
   * Whether to disable days that are outside the current month.
   * @default false
   */
  disableDaysOutsideMonth?: boolean;

  /**
   * Whether the date picker should close when a date is selected.
   * @default false
   */
  closeOnDateSelect?: boolean;

  /**
   * Whether to prevent deselecting a date when clicking on an already selected date.
   * @default false
   */
  preventDeselect?: boolean;

  /**
   * The first day of the week (0 for Sunday, 1 for Monday, etc.).
   * @default 0
   */
  weekStartsOn?: number;

  /**
   * The format of the week days.
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
   * The number of months to display in the calendar.
   * @default 1
   */
  numberOfMonths?: number;

  /**
   * Whether the date picker is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the date picker is read-only.
   * @default false
   */
  readOnly?: boolean;

  /**
   * Whether to hide the time zone segment.
   * @default false
   */
  hideTimeZone?: boolean;

  /**
   * The format of the month display.
   * @default 'long'
   */
  monthFormat?:
    | 'short'
    | 'long'
    | 'narrow'
    | 'numeric'
    | '2-digit'
    | ((month: number) => string);

  /**
   * The format of the year display.
   * @default 'numeric'
   */
  yearFormat?: 'numeric' | '2-digit' | ((year: number) => string);

  /**
   * Custom content to render as a label above the date picker.
   */
  children?: ReactNode;

  /**
   * The name attribute for form submission.
   */
  name?: string;
}

/**
 * DatePicker component that enables users to select dates using an input field and calendar interface.
 * Built using the @ark-ui/react library.
 *
 * @example
 * ```tsx
 * <DatePicker value={[new CalendarDate(2024, 1, 15)]} onValueChange={(details) => console.log(details.value)} />
 * ```
 */
const DatePicker = ({
  type = 'single',
  value,
  onValueChange,
  open,
  onOpenChange,
  placeholder,
  isDateUnavailable,
  isDateDisabled,
  required = false,
  onInvalid,
  errorMessageId,
  disableDaysOutsideMonth = false,
  closeOnDateSelect = false,
  preventDeselect = false,
  weekStartsOn = 0,
  weekdayFormat = 'short',
  calendarLabel,
  fixedWeeks = false,
  minValue,
  maxValue,
  locale = 'en-US',
  numberOfMonths = 1,
  disabled = false,
  readOnly = false,
  hideTimeZone = false,
  monthFormat = 'long',
  yearFormat = 'numeric',
  children,
  name,
}: DatePickerProps) => {
  // Combine isDateDisabled and isDateUnavailable into a single function
  const combinedUnavailable = (date: DateValue, locale: string) => {
    if (isDateDisabled && isDateDisabled(date)) return true;
    if (isDateUnavailable && isDateUnavailable(date, locale)) return true;
    return false;
  };

  return (
    <ArkDatePicker.Root
      selectionMode={type}
      value={value}
      onValueChange={onValueChange}
      open={open}
      onOpenChange={onOpenChange}
      focusedValue={placeholder}
      isDateUnavailable={combinedUnavailable}
      required={required}
      closeOnSelect={closeOnDateSelect}
      startOfWeek={weekStartsOn}
      fixedWeeks={fixedWeeks}
      min={minValue}
      max={maxValue}
      locale={locale}
      numOfMonths={numberOfMonths}
      disabled={disabled}
      readOnly={readOnly}
      positioning={{ sameWidth: true }}
      name={name}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: spacing[2],
        width: '100%',
        maxWidth: '320px',
      }}
    >
      {children && (
        <ArkDatePicker.Label
          style={{
            fontSize: fontSize[14],
            fontWeight: fontWeight.medium,
            color: color.slate700,
            marginBottom: spacing[1],
          }}
        >
          {children}
        </ArkDatePicker.Label>
      )}

      <ArkDatePicker.Control
        style={{
          display: 'flex',
          gap: spacing[1],
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <ArkDatePicker.Input
          aria-describedby={errorMessageId}
          style={{
            flex: 1,
            padding: `${spacing[2]} ${spacing[3]}`,
            fontSize: fontSize[14],
            border: `1px solid ${color.slate300}`,
            borderRadius: '6px',
            outline: 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            backgroundColor: disabled ? color.slate100 : color.white,
            cursor: disabled ? 'not-allowed' : readOnly ? 'default' : 'text',
          }}
          onFocus={(e) => {
            if (!disabled && !readOnly) {
              e.currentTarget.style.borderColor = color.blue500;
              e.currentTarget.style.boxShadow =
                `0 0 0 3px ${color.blueTr10}`;
            }
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = color.slate300;
            e.currentTarget.style.boxShadow = 'none';
          }}
        />

        <ArkDatePicker.Trigger
          style={{
            padding: `${spacing[2]} ${spacing[3]}`,
            fontSize: fontSize[14],
            border: `1px solid ${color.slate300}`,
            borderRadius: '6px',
            backgroundColor: disabled ? color.slate100 : color.white,
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s, border-color 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            if (!disabled) {
              e.currentTarget.style.backgroundColor = color.slate50;
              e.currentTarget.style.borderColor = color.slate400;
            }
          }}
          onMouseLeave={(e) => {
            if (!disabled) {
              e.currentTarget.style.backgroundColor = color.white;
              e.currentTarget.style.borderColor = color.slate300;
            }
          }}
        >
          📅
        </ArkDatePicker.Trigger>

        <ArkDatePicker.ClearTrigger
          style={{
            padding: `6px 10px`,
            fontSize: fontSize[12],
            border: `1px solid ${color.slate300}`,
            borderRadius: '6px',
            backgroundColor: disabled ? color.slate100 : color.white,
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s, border-color 0.2s, color 0.2s',
            color: color.slate500,
          }}
          onMouseEnter={(e) => {
            if (!disabled) {
              e.currentTarget.style.backgroundColor = color.pink50;
              e.currentTarget.style.borderColor = color.pink600;
              e.currentTarget.style.color = color.pink600;
            }
          }}
          onMouseLeave={(e) => {
            if (!disabled) {
              e.currentTarget.style.backgroundColor = color.white;
              e.currentTarget.style.borderColor = color.slate300;
              e.currentTarget.style.color = color.slate500;
            }
          }}
        >
          Clear
        </ArkDatePicker.ClearTrigger>
      </ArkDatePicker.Control>

      <Portal>
        <ArkDatePicker.Positioner>
          <ArkDatePicker.Content
            style={{
              backgroundColor: color.white,
              border: `1px solid ${color.slate200}`,
              borderRadius: spacing[3],
              boxShadow:
                `0 10px 15px -3px ${color.blackTr10}, 0 4px 6px -2px ${color.blackTr05}`,
              padding: spacing[4],
              zIndex: 1000,
              minWidth:
                numberOfMonths > 1 ? `${numberOfMonths * 280}px` : '280px',
            }}
          >
            {/* Year and Month Selects */}
            <div style={{ display: 'flex', gap: spacing[2], marginBottom: spacing[3] }}>
              <ArkDatePicker.YearSelect
                style={{
                  flex: 1,
                  padding: `6px ${spacing[2]}`,
                  fontSize: fontSize[14],
                  border: `1px solid ${color.slate300}`,
                  borderRadius: '6px',
                  backgroundColor: color.white,
                  cursor: 'pointer',
                  outline: 'none',
                }}
              />
              <ArkDatePicker.MonthSelect
                style={{
                  flex: 1,
                  padding: `6px ${spacing[2]}`,
                  fontSize: fontSize[14],
                  border: `1px solid ${color.slate300}`,
                  borderRadius: '6px',
                  backgroundColor: color.white,
                  cursor: 'pointer',
                  outline: 'none',
                }}
              />
            </div>

            {/* Day View */}
            <ArkDatePicker.View view="day">
              <ArkDatePicker.Context>
                {(datePicker) => (
                  <>
                    <ArkDatePicker.ViewControl
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: spacing[3],
                      }}
                    >
                      <ArkDatePicker.PrevTrigger
                        style={{
                          padding: `6px ${spacing[3]}`,
                          fontSize: fontSize[14],
                          border: `1px solid ${color.slate300}`,
                          borderRadius: '6px',
                          backgroundColor: color.white,
                          cursor: 'pointer',
                          transition: 'background-color 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = color.slate100;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = color.white;
                        }}
                      >
                        ←
                      </ArkDatePicker.PrevTrigger>

                      <ArkDatePicker.ViewTrigger
                        style={{
                          padding: `6px ${spacing[3]}`,
                          fontSize: fontSize[14],
                          fontWeight: fontWeight.semibold,
                          border: 'none',
                          background: 'none',
                          cursor: 'pointer',
                          color: color.slate900,
                        }}
                      >
                        <ArkDatePicker.RangeText />
                      </ArkDatePicker.ViewTrigger>

                      <ArkDatePicker.NextTrigger
                        style={{
                          padding: `6px ${spacing[3]}`,
                          fontSize: fontSize[14],
                          border: `1px solid ${color.slate300}`,
                          borderRadius: '6px',
                          backgroundColor: color.white,
                          cursor: 'pointer',
                          transition: 'background-color 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = color.slate100;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = color.white;
                        }}
                      >
                        →
                      </ArkDatePicker.NextTrigger>
                    </ArkDatePicker.ViewControl>

                    <ArkDatePicker.Table
                      style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                      }}
                    >
                      <ArkDatePicker.TableHead>
                        <ArkDatePicker.TableRow>
                          {datePicker.weekDays.map((weekDay, id) => (
                            <ArkDatePicker.TableHeader
                              key={id}
                              style={{
                                padding: spacing[2],
                                fontSize: fontSize[12],
                                fontWeight: fontWeight.semibold,
                                color: color.slate500,
                                textAlign: 'center',
                              }}
                            >
                              {weekdayFormat === 'narrow'
                                ? weekDay.narrow
                                : weekdayFormat === 'long'
                                  ? weekDay.long
                                  : weekDay.short}
                            </ArkDatePicker.TableHeader>
                          ))}
                        </ArkDatePicker.TableRow>
                      </ArkDatePicker.TableHead>
                      <ArkDatePicker.TableBody>
                        {datePicker.weeks.map((week, id) => (
                          <ArkDatePicker.TableRow key={id}>
                            {week.map((day, id) => {
                              const isOutsideMonth =
                                day.month !== datePicker.focusedValue.month;
                              const isDisabled =
                                disableDaysOutsideMonth && isOutsideMonth;

                              return (
                                <ArkDatePicker.TableCell
                                  key={id}
                                  value={day}
                                  style={{
                                    padding: spacing[0.5],
                                  }}
                                >
                                  <ArkDatePicker.TableCellTrigger
                                    style={{
                                      width: '32px',
                                      height: '32px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontSize: fontSize[14],
                                      border: 'none',
                                      borderRadius: '6px',
                                      cursor: isDisabled
                                        ? 'not-allowed'
                                        : 'pointer',
                                      backgroundColor: 'transparent',
                                      color: isOutsideMonth
                                        ? color.slate400
                                        : color.slate700,
                                      transition:
                                        'background-color 0.2s, color 0.2s',
                                      opacity: isDisabled ? 0.4 : 1,
                                      pointerEvents: isDisabled
                                        ? 'none'
                                        : 'auto',
                                    }}
                                    onMouseEnter={(e) => {
                                      if (!isDisabled) {
                                        e.currentTarget.style.backgroundColor =
                                          color.slate100;
                                      }
                                    }}
                                    onMouseLeave={(e) => {
                                      if (!isDisabled) {
                                        e.currentTarget.style.backgroundColor =
                                          'transparent';
                                      }
                                    }}
                                  >
                                    {day.day}
                                  </ArkDatePicker.TableCellTrigger>
                                </ArkDatePicker.TableCell>
                              );
                            })}
                          </ArkDatePicker.TableRow>
                        ))}
                      </ArkDatePicker.TableBody>
                    </ArkDatePicker.Table>
                  </>
                )}
              </ArkDatePicker.Context>
            </ArkDatePicker.View>

            {/* Month View */}
            <ArkDatePicker.View view="month">
              <ArkDatePicker.Context>
                {(datePicker) => (
                  <>
                    <ArkDatePicker.ViewControl
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: spacing[3],
                      }}
                    >
                      <ArkDatePicker.PrevTrigger
                        style={{
                          padding: `6px ${spacing[3]}`,
                          fontSize: fontSize[14],
                          border: `1px solid ${color.slate300}`,
                          borderRadius: '6px',
                          backgroundColor: color.white,
                          cursor: 'pointer',
                          transition: 'background-color 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = color.slate100;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = color.white;
                        }}
                      >
                        ←
                      </ArkDatePicker.PrevTrigger>

                      <ArkDatePicker.ViewTrigger
                        style={{
                          padding: `6px ${spacing[3]}`,
                          fontSize: fontSize[14],
                          fontWeight: fontWeight.semibold,
                          border: 'none',
                          background: 'none',
                          cursor: 'pointer',
                          color: color.slate900,
                        }}
                      >
                        <ArkDatePicker.RangeText />
                      </ArkDatePicker.ViewTrigger>

                      <ArkDatePicker.NextTrigger
                        style={{
                          padding: `6px ${spacing[3]}`,
                          fontSize: fontSize[14],
                          border: `1px solid ${color.slate300}`,
                          borderRadius: '6px',
                          backgroundColor: color.white,
                          cursor: 'pointer',
                          transition: 'background-color 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = color.slate100;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = color.white;
                        }}
                      >
                        →
                      </ArkDatePicker.NextTrigger>
                    </ArkDatePicker.ViewControl>

                    <ArkDatePicker.Table
                      style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                      }}
                    >
                      <ArkDatePicker.TableBody>
                        {datePicker
                          .getMonthsGrid({
                            columns: 3,
                            format:
                              typeof monthFormat === 'function'
                                ? 'short'
                                : monthFormat === 'short' ||
                                    monthFormat === 'long'
                                  ? monthFormat
                                  : 'short',
                          })
                          .map((months, id) => (
                            <ArkDatePicker.TableRow key={id}>
                              {months.map((month, id) => (
                                <ArkDatePicker.TableCell
                                  key={id}
                                  value={month.value}
                                  style={{
                                    padding: spacing[1],
                                  }}
                                >
                                  <ArkDatePicker.TableCellTrigger
                                    style={{
                                      width: '100%',
                                      padding: spacing[3],
                                      fontSize: fontSize[14],
                                      border: 'none',
                                      borderRadius: '6px',
                                      cursor: 'pointer',
                                      backgroundColor: 'transparent',
                                      transition: 'background-color 0.2s',
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.backgroundColor =
                                        color.slate100;
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.backgroundColor =
                                        'transparent';
                                    }}
                                  >
                                    {typeof monthFormat === 'function'
                                      ? monthFormat(month.value)
                                      : month.label}
                                  </ArkDatePicker.TableCellTrigger>
                                </ArkDatePicker.TableCell>
                              ))}
                            </ArkDatePicker.TableRow>
                          ))}
                      </ArkDatePicker.TableBody>
                    </ArkDatePicker.Table>
                  </>
                )}
              </ArkDatePicker.Context>
            </ArkDatePicker.View>

            {/* Year View */}
            <ArkDatePicker.View view="year">
              <ArkDatePicker.Context>
                {(datePicker) => (
                  <>
                    <ArkDatePicker.ViewControl
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: spacing[3],
                      }}
                    >
                      <ArkDatePicker.PrevTrigger
                        style={{
                          padding: `6px ${spacing[3]}`,
                          fontSize: fontSize[14],
                          border: `1px solid ${color.slate300}`,
                          borderRadius: '6px',
                          backgroundColor: color.white,
                          cursor: 'pointer',
                          transition: 'background-color 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = color.slate100;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = color.white;
                        }}
                      >
                        ←
                      </ArkDatePicker.PrevTrigger>

                      <ArkDatePicker.ViewTrigger
                        style={{
                          padding: `6px ${spacing[3]}`,
                          fontSize: fontSize[14],
                          fontWeight: fontWeight.semibold,
                          border: 'none',
                          background: 'none',
                          cursor: 'pointer',
                          color: color.slate900,
                        }}
                      >
                        <ArkDatePicker.RangeText />
                      </ArkDatePicker.ViewTrigger>

                      <ArkDatePicker.NextTrigger
                        style={{
                          padding: `6px ${spacing[3]}`,
                          fontSize: fontSize[14],
                          border: `1px solid ${color.slate300}`,
                          borderRadius: '6px',
                          backgroundColor: color.white,
                          cursor: 'pointer',
                          transition: 'background-color 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = color.slate100;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = color.white;
                        }}
                      >
                        →
                      </ArkDatePicker.NextTrigger>
                    </ArkDatePicker.ViewControl>

                    <ArkDatePicker.Table
                      style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                      }}
                    >
                      <ArkDatePicker.TableBody>
                        {datePicker
                          .getYearsGrid({ columns: 4 })
                          .map((years, id) => (
                            <ArkDatePicker.TableRow key={id}>
                              {years.map((year, id) => (
                                <ArkDatePicker.TableCell
                                  key={id}
                                  value={year.value}
                                  style={{
                                    padding: spacing[1],
                                  }}
                                >
                                  <ArkDatePicker.TableCellTrigger
                                    style={{
                                      width: '100%',
                                      padding: spacing[3],
                                      fontSize: fontSize[14],
                                      border: 'none',
                                      borderRadius: '6px',
                                      cursor: 'pointer',
                                      backgroundColor: 'transparent',
                                      transition: 'background-color 0.2s',
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.backgroundColor =
                                        color.slate100;
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.backgroundColor =
                                        'transparent';
                                    }}
                                  >
                                    {typeof yearFormat === 'function'
                                      ? yearFormat(year.value)
                                      : year.label}
                                  </ArkDatePicker.TableCellTrigger>
                                </ArkDatePicker.TableCell>
                              ))}
                            </ArkDatePicker.TableRow>
                          ))}
                      </ArkDatePicker.TableBody>
                    </ArkDatePicker.Table>
                  </>
                )}
              </ArkDatePicker.Context>
            </ArkDatePicker.View>
          </ArkDatePicker.Content>
        </ArkDatePicker.Positioner>
      </Portal>
    </ArkDatePicker.Root>
  );
};

export default DatePicker;
