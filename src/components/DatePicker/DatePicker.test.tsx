import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent, page } from 'vitest/browser';
import { useState } from 'react';
import { CalendarDate } from '@internationalized/date';
import DatePicker, { type DateValue, type DatePickerProps } from './DatePicker';
import { color } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

/** Wraps a raw HTMLElement into a Locator so jest-dom matchers can be used. */
const locatorFor = (element: HTMLElement) => page.elementLocator(element);

/** The visible text input inside the DatePicker's Control (not portalled). */
const getInput = (container: HTMLElement) =>
  container.querySelector('input') as HTMLInputElement;

/** The calendar trigger button (📅); identified by its stable aria-haspopup. */
const getTriggerButton = (container: HTMLElement) =>
  container.querySelector('button[aria-haspopup="grid"]') as HTMLButtonElement;

/** The clear trigger button; identified by its stable aria-label. */
const getClearButton = (container: HTMLElement) =>
  container.querySelector(
    'button[aria-label="Clear selected dates"]'
  ) as HTMLButtonElement;

/**
 * The popover content is rendered through a Portal into `document.body`.
 * Ark toggles a native `hidden` attribute rather than unmounting it, and
 * role-based queries exclude hidden elements, so it must be queried
 * directly instead (mirrors the DropDownMenu test suite's approach).
 */
const getContent = () =>
  document.querySelector('[role="application"]') as HTMLElement;

/** A specific day-view grid cell trigger, identified by its ISO date value. */
const getDayCell = (isoDate: string) =>
  document.querySelector(
    `[role="button"][data-view="day"][data-value="${isoDate}"]`
  ) as HTMLElement;

/** All day-view grid tables currently rendered. */
const getDayTables = () =>
  Array.from(document.querySelectorAll('table[data-view="day"]')) as HTMLElement[];

const getMonthSelect = () =>
  document.querySelector(
    'select[aria-label="Select month"]'
  ) as HTMLSelectElement;

const getYearSelect = () =>
  document.querySelector('select[aria-label="Select year"]') as HTMLSelectElement;

const getNextTrigger = () =>
  document.querySelector(
    'button[aria-label="Switch to next month"]'
  ) as HTMLButtonElement;

/** The day-view "view trigger" button that displays the visible month/year text. */
const getRangeText = () =>
  document.querySelector('button[data-view="day"]') as HTMLElement;

/** Opens the calendar via the trigger and waits for the content to become visible. */
const openCalendar = async (container: HTMLElement) => {
  await userEvent.click(locatorFor(getTriggerButton(container)));
  await expect.element(locatorFor(getContent())).toBeVisible();
};

const JUNE_1_2024 = new CalendarDate(2024, 6, 1);
const JUNE_15_2024 = new CalendarDate(2024, 6, 15);

/**
 * Generic controlled fixture mirroring the "Controlled" story pattern: both
 * `value` and `open` are pushed back down from the callbacks, so real
 * interaction round-trips (selecting a date, opening/closing) are reflected
 * in the rendered DOM rather than staying locked to an initial prop.
 */
type ControlledFixtureProps = Omit<
  DatePickerProps,
  'value' | 'onValueChange' | 'open' | 'onOpenChange' | 'children'
> & {
  initialValue?: DateValue[];
  initialOpen?: boolean;
  onValueChangeSpy?: DatePickerProps['onValueChange'];
  label?: string;
};

const ControlledFixture = ({
  initialValue = [],
  initialOpen = false,
  onValueChangeSpy,
  label = 'Controlled fixture',
  ...rest
}: ControlledFixtureProps) => {
  const [value, setValue] = useState<DateValue[]>(initialValue);
  const [open, setOpen] = useState(initialOpen);

  return (
    <DatePicker
      {...rest}
      value={value}
      onValueChange={(details) => {
        setValue(details.value);
        onValueChangeSpy?.(details);
      }}
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
    >
      {label}
    </DatePicker>
  );
};

/** Controlled value fixture with an external button, for "push from outside" tests. */
const ControlledValueExternalButtonFixture = () => {
  const [value, setValue] = useState<DateValue[]>([JUNE_15_2024]);

  return (
    <>
      <DatePicker
        value={value}
        onValueChange={(details) => setValue(details.value)}
        placeholder={JUNE_1_2024}
      >
        Controlled fixture
      </DatePicker>
      <button onClick={() => setValue([new CalendarDate(2024, 6, 20)])}>
        Set externally
      </button>
    </>
  );
};

/** Controlled open fixture, for verifying the `open` prop renders open immediately. */
const ControlledOpenFixture = ({ initialOpen }: { initialOpen: boolean }) => {
  const [open, setOpen] = useState(initialOpen);

  return (
    <DatePicker
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
      placeholder={JUNE_1_2024}
    >
      Controlled open fixture
    </DatePicker>
  );
};

describe('DatePicker', () => {
  /* -----------------------------------------------------------------------
   * Rendering & structure (4)
   * -------------------------------------------------------------------- */

  it('renders a text input, a calendar trigger, and a clear trigger', async () => {
    const screen = await render(<DatePicker>Select a date</DatePicker>);
    expect(getInput(screen.container)).not.toBeNull();
    expect(getTriggerButton(screen.container)).not.toBeNull();
    expect(getClearButton(screen.container)).not.toBeNull();
    await takeSnapshot(`DatePicker - renders a text input, a calendar trigger, and a clear trigger`);
  });

  it('renders the provided children as a label for the input', async () => {
    const screen = await render(<DatePicker>Select a date</DatePicker>);
    await expect.element(screen.getByText('Select a date')).toBeInTheDocument();
    const label = screen.container.querySelector('label');
    expect(label).not.toBeNull();
    await takeSnapshot(`DatePicker - renders the provided children as a label for the input`);
  });

  it('does not render a label element when no children are provided', async () => {
    const screen = await render(<DatePicker />);
    expect(screen.container.querySelector('label')).toBeNull();
    await takeSnapshot(`DatePicker - does not render a label element when no children are provided`);
  });

  it('renders the popover content element in the DOM before any interaction, but hidden', async () => {
    await render(<DatePicker>Select a date</DatePicker>);
    const content = getContent();
    expect(content).not.toBeNull();
    await expect.element(locatorFor(content)).not.toBeVisible();
    await takeSnapshot(`DatePicker - renders the popover content element in the DOM before any interaction, but hidden`);
  });

  /* -----------------------------------------------------------------------
   * Trigger ARIA & open/close via click (4)
   * -------------------------------------------------------------------- */

  it('sets aria-haspopup="grid" and an "Open calendar" label before interaction', async () => {
    const screen = await render(<DatePicker>Select a date</DatePicker>);
    const trigger = getTriggerButton(screen.container);
    expect(trigger.getAttribute('aria-haspopup')).toBe('grid');
    expect(trigger.getAttribute('aria-label')).toBe('Open calendar');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    await takeSnapshot(`DatePicker - sets aria-haspopup="grid" and an "Open calendar" label before interaction`);
  });

  it('clicking the trigger opens the popover content and sets aria-expanded to "true"', async () => {
    const screen = await render(<DatePicker>Select a date</DatePicker>);
    await openCalendar(screen.container);
    const trigger = getTriggerButton(screen.container);
    await vi.waitFor(() => {
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
      expect(trigger.getAttribute('aria-label')).toBe('Close calendar');
    });
    await takeSnapshot(`DatePicker - clicking the trigger opens the popover content and sets aria-expanded to "true"`);
  });

  it('clicking the trigger a second time closes the popover content and resets aria-expanded to "false"', async () => {
    const screen = await render(<DatePicker>Select a date</DatePicker>);
    await openCalendar(screen.container);
    await userEvent.click(locatorFor(getTriggerButton(screen.container)));
    await expect.element(locatorFor(getContent())).not.toBeVisible();
    const trigger = getTriggerButton(screen.container);
    await vi.waitFor(() => {
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
      expect(trigger.getAttribute('aria-label')).toBe('Open calendar');
    });
    await takeSnapshot(`DatePicker - clicking the trigger a second time closes the popover content and resets aria-expanded to "false"`);
  });

  it('moves DOM focus onto a focused day cell shortly after opening', async () => {
    const screen = await render(
      <DatePicker placeholder={JUNE_1_2024}>Select a date</DatePicker>
    );
    await openCalendar(screen.container);
    await vi.waitFor(() => {
      expect(document.activeElement?.getAttribute('role')).toBe('button');
      expect(document.activeElement?.getAttribute('data-view')).toBe('day');
    });
    await takeSnapshot(`DatePicker - moves DOM focus onto a focused day cell shortly after opening`);
  });

  /* -----------------------------------------------------------------------
   * Escape closes the calendar (1)
   * -------------------------------------------------------------------- */

  it('closes the popover content when Escape is pressed while open', async () => {
    const screen = await render(<DatePicker>Select a date</DatePicker>);
    await openCalendar(screen.container);
    await userEvent.keyboard('{Escape}');
    await expect.element(locatorFor(getContent())).not.toBeVisible();
    await takeSnapshot(`DatePicker - closes the popover content when Escape is pressed while open`);
  });

  /* -----------------------------------------------------------------------
   * Input value, placeholder & typed parsing (3)
   * -------------------------------------------------------------------- */

  it("reflects an initial controlled value as the input's displayed text", async () => {
    const screen = await render(<DatePicker value={[JUNE_15_2024]}>Select a date</DatePicker>);
    const input = getInput(screen.container);
    await vi.waitFor(() => {
      expect(input.value).toBe('06/15/2024');
    });
    await takeSnapshot(`DatePicker - reflects an initial controlled value as the input's displayed text`);
  });

  it('shows a locale-based placeholder attribute when no value is present', async () => {
    const screen = await render(<DatePicker>Select a date</DatePicker>);
    const input = getInput(screen.container);
    expect(input.getAttribute('placeholder')).toBe('mm/dd/yyyy');
    await takeSnapshot(`DatePicker - shows a locale-based placeholder attribute when no value is present`);
  });

  it('typing a valid date string and pressing Enter selects that date', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <DatePicker onValueChange={onValueChange}>Type a date</DatePicker>
    );
    const input = getInput(screen.container);
    await userEvent.click(locatorFor(input));
    await userEvent.type(locatorFor(input), '06/15/2024');
    await userEvent.keyboard('{Enter}');

    await vi.waitFor(() => {
      expect(onValueChange).toHaveBeenCalled();
    });
    const lastCall = onValueChange.mock.calls.at(-1)![0] as {
      value: DateValue[];
    };
    expect(lastCall.value[0]?.toString()).toBe('2024-06-15');
    await takeSnapshot(`DatePicker - typing a valid date string and pressing Enter selects that date`);
  });

  /* -----------------------------------------------------------------------
   * Date selection - single mode (3)
   * -------------------------------------------------------------------- */

  it('clicking a day cell selects that date and calls onValueChange', async () => {
    const onValueChangeSpy = vi.fn();
    const screen = await render(
      <ControlledFixture placeholder={JUNE_1_2024} onValueChangeSpy={onValueChangeSpy} />
    );
    await openCalendar(screen.container);
    await userEvent.click(locatorFor(getDayCell('2024-06-10')));

    await vi.waitFor(() => {
      expect(onValueChangeSpy).toHaveBeenCalled();
    });
    const lastCall = onValueChangeSpy.mock.calls.at(-1)![0] as {
      value: DateValue[];
    };
    expect(lastCall.value[0]?.toString()).toBe('2024-06-10');
    await vi.waitFor(() => {
      expect(getDayCell('2024-06-10').getAttribute('data-selected')).toBe('');
    });
    await takeSnapshot(`DatePicker - clicking a day cell selects that date and calls onValueChange`);
  });

  it('clicking a different day cell replaces the previous single selection', async () => {
    const screen = await render(
      <ControlledFixture placeholder={JUNE_1_2024} initialValue={[JUNE_15_2024]} />
    );
    await openCalendar(screen.container);
    await userEvent.click(locatorFor(getDayCell('2024-06-20')));

    await vi.waitFor(() => {
      expect(getDayCell('2024-06-20').getAttribute('data-selected')).toBe('');
      expect(getDayCell('2024-06-15').hasAttribute('data-selected')).toBe(false);
    });
    const input = getInput(screen.container);
    await vi.waitFor(() => {
      expect(input.value).toBe('06/20/2024');
    });
    await takeSnapshot(`DatePicker - clicking a different day cell replaces the previous single selection`);
  });

  it('clicking the already-selected date again leaves the value unchanged', async () => {
    const onValueChangeSpy = vi.fn();
    const screen = await render(
      <ControlledFixture
        placeholder={JUNE_1_2024}
        initialValue={[JUNE_15_2024]}
        onValueChangeSpy={onValueChangeSpy}
      />
    );
    await openCalendar(screen.container);
    await userEvent.click(locatorFor(getDayCell('2024-06-15')));

    // Re-selecting the same date produces a structurally equal value array,
    // so the underlying state machine's equality check skips onValueChange
    // entirely (no deselection occurs in single mode either way).
    expect(onValueChangeSpy).not.toHaveBeenCalled();
    await vi.waitFor(() => {
      expect(getDayCell('2024-06-15').getAttribute('data-selected')).toBe('');
    });
    await takeSnapshot(`DatePicker - clicking the already-selected date again leaves the value unchanged`);
  });

  /* -----------------------------------------------------------------------
   * Date selection - multiple mode (2)
   * -------------------------------------------------------------------- */

  it('accumulates multiple distinct dates into the value array', async () => {
    const onValueChangeSpy = vi.fn();
    const screen = await render(
      <ControlledFixture
        type="multiple"
        placeholder={JUNE_1_2024}
        onValueChangeSpy={onValueChangeSpy}
      />
    );
    await openCalendar(screen.container);
    await userEvent.click(locatorFor(getDayCell('2024-06-05')));
    await userEvent.click(locatorFor(getDayCell('2024-06-12')));

    await vi.waitFor(() => {
      const lastCall = onValueChangeSpy.mock.calls.at(-1)![0] as {
        value: DateValue[];
      };
      expect(lastCall.value.map((d) => d.toString())).toEqual([
        '2024-06-05',
        '2024-06-12',
      ]);
    });
    await takeSnapshot(`DatePicker - accumulates multiple distinct dates into the value array`);
  });

  it('clicking an already-selected date in multiple mode removes it from the value array', async () => {
    const onValueChangeSpy = vi.fn();
    const screen = await render(
      <ControlledFixture
        type="multiple"
        placeholder={JUNE_1_2024}
        initialValue={[new CalendarDate(2024, 6, 5), new CalendarDate(2024, 6, 12)]}
        onValueChangeSpy={onValueChangeSpy}
      />
    );
    await openCalendar(screen.container);
    await userEvent.click(locatorFor(getDayCell('2024-06-05')));

    await vi.waitFor(() => {
      const lastCall = onValueChangeSpy.mock.calls.at(-1)![0] as {
        value: DateValue[];
      };
      expect(lastCall.value.map((d) => d.toString())).toEqual(['2024-06-12']);
    });
    await takeSnapshot(`DatePicker - clicking an already-selected date in multiple mode removes it from the value array`);
  });

  /* -----------------------------------------------------------------------
   * closeOnDateSelect behavior (2)
   * -------------------------------------------------------------------- */

  it('closes the calendar automatically after selecting a date when closeOnDateSelect is true', async () => {
    const screen = await render(
      <ControlledFixture placeholder={JUNE_1_2024} closeOnDateSelect />
    );
    await openCalendar(screen.container);
    await userEvent.click(locatorFor(getDayCell('2024-06-10')));
    await expect.element(locatorFor(getContent())).not.toBeVisible();
    await takeSnapshot(`DatePicker - closes the calendar automatically after selecting a date when closeOnDateSelect is true`);
  });

  it('keeps the calendar open after selecting a date by default', async () => {
    const screen = await render(<ControlledFixture placeholder={JUNE_1_2024} />);
    await openCalendar(screen.container);
    await userEvent.click(locatorFor(getDayCell('2024-06-10')));
    await expect.element(locatorFor(getContent())).toBeVisible();
    await takeSnapshot(`DatePicker - keeps the calendar open after selecting a date by default`);
  });

  /* -----------------------------------------------------------------------
   * Clear trigger (3)
   * -------------------------------------------------------------------- */

  it('hides the clear trigger when there is no selected value', async () => {
    const screen = await render(<DatePicker>Select a date</DatePicker>);
    await expect
      .element(locatorFor(getClearButton(screen.container)))
      .not.toBeVisible();
    await takeSnapshot(`DatePicker - hides the clear trigger when there is no selected value`);
  });

  it('clears the value and hides itself when the clear trigger is clicked', async () => {
    const screen = await render(<ControlledValueExternalButtonFixture />);
    const clearButton = getClearButton(screen.container);
    await expect.element(locatorFor(clearButton)).toBeVisible();

    await userEvent.click(locatorFor(clearButton));

    await expect.element(locatorFor(getClearButton(screen.container))).not.toBeVisible();
    const input = getInput(screen.container);
    await vi.waitFor(() => {
      expect(input.value).toBe('');
    });
    await takeSnapshot(`DatePicker - clears the value and hides itself when the clear trigger is clicked`);
  });

  it('does not clear the value when the date picker is disabled', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <DatePicker disabled value={[JUNE_15_2024]} onValueChange={onValueChange}>
        Disabled with value
      </DatePicker>
    );
    const clearButton = getClearButton(screen.container);
    await userEvent.click(locatorFor(clearButton));
    await vi.waitFor(() => expect(onValueChange).not.toHaveBeenCalled());
    await expect.element(locatorFor(clearButton)).toBeVisible();
    await takeSnapshot(`DatePicker - does not clear the value when the date picker is disabled`);
  });

  /* -----------------------------------------------------------------------
   * Disabled state (3)
   * -------------------------------------------------------------------- */

  it('marks the trigger and input as disabled', async () => {
    const screen = await render(<DatePicker disabled>Disabled</DatePicker>);
    expect(getTriggerButton(screen.container).disabled).toBe(true);
    expect(getInput(screen.container).disabled).toBe(true);
    await takeSnapshot(`DatePicker - marks the trigger and input as disabled`);
  });

  it('does not open the calendar when the trigger is clicked while disabled', async () => {
    const screen = await render(<DatePicker disabled>Disabled</DatePicker>);
    await userEvent.click(locatorFor(getTriggerButton(screen.container)), {
      force: true,
    });
    await expect.element(locatorFor(getContent())).not.toBeVisible();
    await takeSnapshot(`DatePicker - does not open the calendar when the trigger is clicked while disabled`);
  });

  it('applies the disabled background color to the input', async () => {
    const screen = await render(<DatePicker disabled>Disabled</DatePicker>);
    await expect
      .element(locatorFor(getInput(screen.container)))
      .toHaveStyle({ backgroundColor: color.slate100 });
    await takeSnapshot(`DatePicker - applies the disabled background color to the input`);
  });

  /* -----------------------------------------------------------------------
   * ReadOnly state (2)
   * -------------------------------------------------------------------- */

  it('marks the input read-only without disabling the trigger', async () => {
    const screen = await render(<DatePicker readOnly>Read-only</DatePicker>);
    expect(getInput(screen.container).readOnly).toBe(true);
    expect(getTriggerButton(screen.container).disabled).toBe(false);
    await takeSnapshot(`DatePicker - marks the input read-only without disabling the trigger`);
  });

  it('does not open the calendar when the trigger is clicked while read-only', async () => {
    const screen = await render(<DatePicker readOnly>Read-only</DatePicker>);
    await userEvent.click(locatorFor(getTriggerButton(screen.container)));
    await expect.element(locatorFor(getContent())).not.toBeVisible();
    await takeSnapshot(`DatePicker - does not open the calendar when the trigger is clicked while read-only`);
  });

  /* -----------------------------------------------------------------------
   * Required & native validation (2)
   * -------------------------------------------------------------------- */

  it('marks the input required only when the required prop is true', async () => {
    const requiredScreen = await render(<DatePicker required>Required</DatePicker>);
    expect(getInput(requiredScreen.container).required).toBe(true);

    const defaultScreen = await render(<DatePicker>Not required</DatePicker>);
    expect(getInput(defaultScreen.container).required).toBe(false);
    await takeSnapshot(`DatePicker - marks the input required only when the required prop is true`);
  });

  it('reports native valueMissing validity for an empty required input and clears it once a value exists', async () => {
    const emptyScreen = await render(<DatePicker required>Required</DatePicker>);
    expect(getInput(emptyScreen.container).validity.valueMissing).toBe(true);

    const filledScreen = await render(
      <DatePicker required value={[JUNE_15_2024]}>
        Required with value
      </DatePicker>
    );
    expect(getInput(filledScreen.container).validity.valueMissing).toBe(false);
    await takeSnapshot(`DatePicker - reports native valueMissing validity for an empty required input and clears it once a value exists`);
  });

  /* -----------------------------------------------------------------------
   * Min/Max constraints (3)
   * -------------------------------------------------------------------- */

  it('marks a day before minValue as unavailable and ignores clicks on it', async () => {
    const onValueChangeSpy = vi.fn();
    const screen = await render(
      <ControlledFixture
        placeholder={JUNE_15_2024}
        minValue={new CalendarDate(2024, 6, 10)}
        onValueChangeSpy={onValueChangeSpy}
      />
    );
    await openCalendar(screen.container);
    const beforeMin = getDayCell('2024-06-05');
    expect(beforeMin.getAttribute('aria-disabled')).toBe('true');

    await userEvent.click(locatorFor(beforeMin), { force: true });
    await vi.waitFor(() => expect(onValueChangeSpy).not.toHaveBeenCalled());
    await takeSnapshot(`DatePicker - marks a day before minValue as unavailable and ignores clicks on it`);
  });

  it('marks a day after maxValue as unavailable and ignores clicks on it', async () => {
    const onValueChangeSpy = vi.fn();
    const screen = await render(
      <ControlledFixture
        placeholder={JUNE_15_2024}
        maxValue={new CalendarDate(2024, 6, 20)}
        onValueChangeSpy={onValueChangeSpy}
      />
    );
    await openCalendar(screen.container);
    const afterMax = getDayCell('2024-06-25');
    expect(afterMax.getAttribute('aria-disabled')).toBe('true');

    await userEvent.click(locatorFor(afterMax), { force: true });
    await vi.waitFor(() => expect(onValueChangeSpy).not.toHaveBeenCalled());
    await takeSnapshot(`DatePicker - marks a day after maxValue as unavailable and ignores clicks on it`);
  });

  it('disables the next-month trigger once the visible month reaches maxValue', async () => {
    const screen = await render(
      <DatePicker placeholder={JUNE_15_2024} maxValue={new CalendarDate(2024, 6, 20)}>
        Bounded
      </DatePicker>
    );
    await openCalendar(screen.container);
    expect(getNextTrigger().disabled).toBe(true);
    await takeSnapshot(`DatePicker - disables the next-month trigger once the visible month reaches maxValue`);
  });

  /* -----------------------------------------------------------------------
   * isDateDisabled / isDateUnavailable (2)
   * -------------------------------------------------------------------- */

  it('isDateDisabled marks the matching day unavailable and blocks its selection', async () => {
    const onValueChangeSpy = vi.fn();
    const screen = await render(
      <ControlledFixture
        placeholder={JUNE_1_2024}
        isDateDisabled={(date) => date.day === 10}
        onValueChangeSpy={onValueChangeSpy}
      />
    );
    await openCalendar(screen.container);
    const disabledCell = getDayCell('2024-06-10');
    expect(disabledCell.getAttribute('aria-disabled')).toBe('true');

    await userEvent.click(locatorFor(disabledCell), { force: true });
    await vi.waitFor(() => expect(onValueChangeSpy).not.toHaveBeenCalled());
    await takeSnapshot(`DatePicker - isDateDisabled marks the matching day unavailable and blocks its selection`);
  });

  it('isDateUnavailable marks the matching day unavailable and blocks its selection', async () => {
    const onValueChangeSpy = vi.fn();
    const screen = await render(
      <ControlledFixture
        placeholder={JUNE_1_2024}
        isDateUnavailable={(date) => date.day === 10}
        onValueChangeSpy={onValueChangeSpy}
      />
    );
    await openCalendar(screen.container);
    const unavailableCell = getDayCell('2024-06-10');
    expect(unavailableCell.getAttribute('aria-disabled')).toBe('true');

    await userEvent.click(locatorFor(unavailableCell), { force: true });
    await vi.waitFor(() => expect(onValueChangeSpy).not.toHaveBeenCalled());
    await takeSnapshot(`DatePicker - isDateUnavailable marks the matching day unavailable and blocks its selection`);
  });

  /* -----------------------------------------------------------------------
   * Multiple months layout (2)
   * -------------------------------------------------------------------- */

  it('always renders exactly one day-view grid table, regardless of numberOfMonths', async () => {
    await render(<DatePicker numberOfMonths={3}>Three months</DatePicker>);
    expect(getDayTables()).toHaveLength(1);
    await takeSnapshot(`DatePicker - always renders exactly one day-view grid table, regardless of numberOfMonths`);
  });

  it("increases the popover content's minWidth style based on numberOfMonths", async () => {
    await render(<DatePicker numberOfMonths={2}>Two months</DatePicker>);
    await expect
      .element(locatorFor(getContent()))
      .toHaveStyle({ minWidth: '560px' });
    await takeSnapshot(`DatePicker - increases the popover content's minWidth style based on numberOfMonths`);
  });

  /* -----------------------------------------------------------------------
   * Month/Year select dropdowns (3)
   * -------------------------------------------------------------------- */

  it('lists all 12 month names as options in the month select', async () => {
    const screen = await render(<DatePicker placeholder={JUNE_1_2024}>Select</DatePicker>);
    await openCalendar(screen.container);
    const options = Array.from(getMonthSelect().options).map((o) => o.textContent);
    expect(options).toHaveLength(12);
    expect(options[0]).toBe('January');
    expect(options[11]).toBe('December');
    await takeSnapshot(`DatePicker - lists all 12 month names as options in the month select`);
  });

  it('choosing a different month updates the visible month/year text', async () => {
    const screen = await render(<DatePicker placeholder={JUNE_1_2024}>Select</DatePicker>);
    await openCalendar(screen.container);
    await vi.waitFor(() => {
      expect(getRangeText().textContent).toBe('June 2024');
    });

    await userEvent.selectOptions(locatorFor(getMonthSelect()), '8');

    await vi.waitFor(() => {
      expect(getRangeText().textContent).toBe('August 2024');
    });
    await takeSnapshot(`DatePicker - choosing a different month updates the visible month/year text`);
  });

  it('choosing a different year updates the visible month/year text', async () => {
    const screen = await render(<DatePicker placeholder={JUNE_1_2024}>Select</DatePicker>);
    await openCalendar(screen.container);
    await vi.waitFor(() => {
      expect(getRangeText().textContent).toBe('June 2024');
    });

    await userEvent.selectOptions(locatorFor(getYearSelect()), '2025');

    await vi.waitFor(() => {
      expect(getRangeText().textContent).toBe('June 2025');
    });
    await takeSnapshot(`DatePicker - choosing a different year updates the visible month/year text`);
  });

  /* -----------------------------------------------------------------------
   * Weekday format & week start (1)
   * -------------------------------------------------------------------- */

  it('reorders the weekday header to the configured start day using full weekday names', async () => {
    const screen = await render(
      <DatePicker weekStartsOn={1} weekdayFormat="long">
        Monday start
      </DatePicker>
    );
    await openCalendar(screen.container);
    const firstHeader = document.querySelector('table[data-view="day"] thead th');
    expect(firstHeader?.textContent).toBe('Monday');
    await takeSnapshot(`DatePicker - reorders the weekday header to the configured start day using full weekday names`);
  });

  /* -----------------------------------------------------------------------
   * Keyboard navigation within the grid (2)
   * -------------------------------------------------------------------- */

  it('ArrowRight moves focus to the next day', async () => {
    const screen = await render(
      <DatePicker value={[JUNE_15_2024]}>Keyboard nav</DatePicker>
    );
    await openCalendar(screen.container);
    await vi.waitFor(() => {
      expect(document.activeElement?.getAttribute('data-value')).toBe('2024-06-15');
    });

    await userEvent.keyboard('{ArrowRight}');

    await vi.waitFor(() => {
      expect(document.activeElement?.getAttribute('data-value')).toBe('2024-06-16');
    });
    await takeSnapshot(`DatePicker - ArrowRight moves focus to the next day`);
  });

  it('ArrowDown moves focus one week ahead', async () => {
    const screen = await render(
      <DatePicker value={[JUNE_15_2024]}>Keyboard nav</DatePicker>
    );
    await openCalendar(screen.container);
    await vi.waitFor(() => {
      expect(document.activeElement?.getAttribute('data-value')).toBe('2024-06-15');
    });

    await userEvent.keyboard('{ArrowDown}');

    await vi.waitFor(() => {
      expect(document.activeElement?.getAttribute('data-value')).toBe('2024-06-22');
    });
    await takeSnapshot(`DatePicker - ArrowDown moves focus one week ahead`);
  });

  /* -----------------------------------------------------------------------
   * Controlled value + open fixtures (3)
   * -------------------------------------------------------------------- */

  it('reflects an externally-updated value pushed down through a controlled fixture', async () => {
    const screen = await render(<ControlledValueExternalButtonFixture />);
    const input = getInput(screen.container);
    await vi.waitFor(() => {
      expect(input.value).toBe('06/15/2024');
    });

    await userEvent.click(screen.getByRole('button', { name: 'Set externally' }));

    await vi.waitFor(() => {
      expect(input.value).toBe('06/20/2024');
    });
    await takeSnapshot(`DatePicker - reflects an externally-updated value pushed down through a controlled fixture`);
  });

  it('selecting a date inside the calendar updates external state via onValueChange', async () => {
    const screen = await render(<ControlledFixture placeholder={JUNE_1_2024} />);
    await openCalendar(screen.container);
    await userEvent.click(locatorFor(getDayCell('2024-06-10')));

    const input = getInput(screen.container);
    await vi.waitFor(() => {
      expect(input.value).toBe('06/10/2024');
    });
    await takeSnapshot(`DatePicker - selecting a date inside the calendar updates external state via onValueChange`);
  });

  it('renders open immediately when the open prop is externally controlled to true', async () => {
    await render(<ControlledOpenFixture initialOpen />);
    await expect.element(locatorFor(getContent())).toBeVisible();
    await takeSnapshot(`DatePicker - renders open immediately when the open prop is externally controlled to true`);
  });

  /* -----------------------------------------------------------------------
   * Name attribute (2)
   * -------------------------------------------------------------------- */

  it('exposes the provided name attribute on the input', async () => {
    const screen = await render(<DatePicker name="appointmentDate">Named</DatePicker>);
    expect(getInput(screen.container).getAttribute('name')).toBe('appointmentDate');
    await takeSnapshot(`DatePicker - exposes the provided name attribute on the input`);
  });

  it('omits the name attribute when not provided', async () => {
    const screen = await render(<DatePicker>No name</DatePicker>);
    expect(getInput(screen.container).hasAttribute('name')).toBe(false);
    await takeSnapshot(`DatePicker - omits the name attribute when not provided`);
  });

  /* -----------------------------------------------------------------------
   * Dead/inert prop documentation (3)
   *
   * These props are accepted by the component's TypeScript interface but are
   * never wired into the underlying Ark UI / zag-js primitives, so they have
   * no observable effect. The tests below document the actual, verified
   * behavior rather than the behavior the prop names might suggest.
   * -------------------------------------------------------------------- */

  it('accepts an onInvalid handler without ever invoking it during normal interaction', async () => {
    const onInvalid = vi.fn();
    const screen = await render(
      <DatePicker required onInvalid={onInvalid}>
        Required
      </DatePicker>
    );
    await openCalendar(screen.container);
    await userEvent.click(locatorFor(getTriggerButton(screen.container)));
    await vi.waitFor(() => expect(onInvalid).not.toHaveBeenCalled());
    await takeSnapshot(`DatePicker - accepts an onInvalid handler without ever invoking it during normal interaction`);
  });

  it("accepts a calendarLabel prop without throwing and without changing the popover's accessible name", async () => {
    const screen = await render(
      <DatePicker calendarLabel="My custom calendar label">Labelled</DatePicker>
    );
    await openCalendar(screen.container);
    expect(getContent().getAttribute('aria-label')).toBe('calendar');
    await takeSnapshot(`DatePicker - accepts a calendarLabel prop without throwing and without changing the popover's accessible name`);
  });

  it('still deselects an already-selected date in multiple mode even when preventDeselect is true', async () => {
    const onValueChangeSpy = vi.fn();
    const screen = await render(
      <ControlledFixture
        type="multiple"
        preventDeselect
        placeholder={JUNE_1_2024}
        initialValue={[new CalendarDate(2024, 6, 10)]}
        onValueChangeSpy={onValueChangeSpy}
      />
    );
    await openCalendar(screen.container);
    await userEvent.click(locatorFor(getDayCell('2024-06-10')));

    await vi.waitFor(() => {
      const lastCall = onValueChangeSpy.mock.calls.at(-1)![0] as {
        value: DateValue[];
      };
      expect(lastCall.value).toHaveLength(0);
    });
    await takeSnapshot(`DatePicker - still deselects an already-selected date in multiple mode even when preventDeselect is true`);
  });
});
