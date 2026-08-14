import type { Meta, StoryObj } from '@storybook/react';
import TimeField from './TimeField';
import ValidationMessage from './ValidationMessage';
import { useState } from 'react';

const meta: Meta<typeof TimeField> = {
  title: 'Components/Form/TimeField',
  component: TimeField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'The controlled value of the time field',
    },
    onValueChange: {
      action: 'valueChanged',
      description: 'Function called when the value changes',
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder text',
    },
    required: {
      control: 'boolean',
      description: 'Whether the time field is required',
    },
    onInvalid: {
      action: 'invalid',
      description: 'Function called when invalid',
    },
    errorMessageId: {
      control: 'text',
      description: 'ID of error message element',
    },
    hourCycle: {
      control: 'select',
      options: [12, 24],
      description: 'Hour cycle format',
    },
    hideTimeZone: {
      control: 'boolean',
      description: 'Whether to hide the time zone',
    },
    minValue: {
      control: 'text',
      description: 'Minimum time value',
    },
    maxValue: {
      control: 'text',
      description: 'Maximum time value',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the time field is disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the time field is read-only',
    },
    children: {
      control: 'text',
      description: 'Custom label content',
    },
    name: {
      control: 'text',
      description: 'Name attribute for form submission',
    },
    allowSeconds: {
      control: 'boolean',
      description: 'Whether to show seconds',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default time field with basic configuration.
 */
export const Default: Story = {
  args: {
    children: 'Select Time',
    placeholder: 'Enter time',
  },
};

/**
 * Time field with custom min, max, and value.
 */
export const WithMinMaxValue: Story = {
  args: {
    children: 'Meeting Time',
    value: '14:30',
    minValue: '09:00',
    maxValue: '18:00',
  },
};

/**
 * Time field with custom children content.
 */
export const CustomChildren: Story = {
  args: {
    children: 'Appointment Start Time',
    placeholder: 'Select your preferred time',
  },
};

/**
 * Required time field.
 */
export const Required: Story = {
  args: {
    children: 'Required Time',
    required: true,
  },
};

/**
 * Disabled time field.
 */
export const Disabled: Story = {
  args: {
    children: 'Disabled Time',
    value: '10:30',
    disabled: true,
  },
};

/**
 * Read-only time field.
 */
export const ReadOnly: Story = {
  args: {
    children: 'Read-only Time',
    value: '15:45',
    readOnly: true,
  },
};

/**
 * Time field with 12-hour format.
 */
export const TwelveHourFormat: Story = {
  args: {
    children: '12-Hour Format',
    hourCycle: 12,
    value: '14:30',
  },
};

/**
 * Time field with 24-hour format.
 */
export const TwentyFourHourFormat: Story = {
  args: {
    children: '24-Hour Format',
    hourCycle: 24,
    value: '14:30',
  },
};

/**
 * Time field with seconds enabled.
 */
export const WithSeconds: Story = {
  args: {
    children: 'Time with Seconds',
    allowSeconds: true,
    value: '10:30:45',
  },
};

/**
 * Time field with name attribute for form submission.
 */
export const WithName: Story = {
  args: {
    children: 'Meeting Time',
    name: 'meeting-time',
  },
};

/**
 * Controlled time field with state management.
 */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('09:00');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          minWidth: '300px',
        }}
      >
        <TimeField
          value={value}
          onValueChange={(details) => setValue(details.value)}
          children="Select Time"
        />
        <div style={{ fontSize: '14px', color: '#6b7280' }}>
          Current time: {value || '(empty)'}
        </div>
        <button
          onClick={() => setValue('12:00')}
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
          Set to 12:00
        </button>
      </div>
    );
  },
};

/**
 * Time field with validation.
 */
export const WithValidation: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    const handleChange = (details: {
      value: string;
      valueAsTime: { hour: number; minute: number; second?: number };
    }) => {
      setValue(details.value);

      // Validate: time must be between 9 AM and 5 PM
      if (details.valueAsTime.hour < 9 || details.valueAsTime.hour >= 17) {
        setError('Time must be between 9:00 AM and 5:00 PM');
      } else {
        setError('');
      }
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          minWidth: '300px',
        }}
      >
        <TimeField
          value={value}
          onValueChange={handleChange}
          minValue="09:00"
          maxValue="17:00"
          children="Business Hours"
          required
          errorMessageId="time-error"
        />
        {error && (
          <div
            id="time-error"
            style={{
              padding: '8px 12px',
              backgroundColor: '#fee2e2',
              color: '#991b1b',
              borderRadius: '6px',
              fontSize: '13px',
            }}
          >
            {error}
          </div>
        )}
      </div>
    );
  },
};

/**
 * Form submission example with time field.
 */
export const FormSubmission: Story = {
  render: () => {
    const [submittedTime, setSubmittedTime] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const time = formData.get('appointment-time') as string;
      setSubmittedTime(time);
    };

    return (
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          minWidth: '350px',
        }}
      >
        <TimeField
          name="appointment-time"
          required
          children="Appointment Time"
          minValue="08:00"
          maxValue="20:00"
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
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
        {submittedTime && (
          <div
            style={{
              padding: '12px',
              backgroundColor: '#f3f4f6',
              borderRadius: '6px',
              fontSize: '14px',
            }}
          >
            Submitted time: <strong>{submittedTime}</strong>
          </div>
        )}
      </form>
    );
  },
};

/**
 * Multiple time fields for scheduling.
 */
export const ScheduleForm: Story = {
  render: () => {
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('17:00');

    const calculateDuration = () => {
      const [startHour, startMin] = startTime.split(':').map(Number);
      const [endHour, endMin] = endTime.split(':').map(Number);
      const hours = Math.abs(endHour - startHour);
      const minutes = Math.abs(endMin - startMin);
      return { hours, minutes };
    };

    const duration = calculateDuration();

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '24px',
          backgroundColor: '#f9fafb',
          borderRadius: '12px',
          minWidth: '400px',
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: 600,
            color: '#111827',
          }}
        >
          Schedule Your Day
        </h3>

        <TimeField
          value={startTime}
          onValueChange={(details) => setStartTime(details.value)}
          children="Start Time"
          minValue="00:00"
          maxValue="23:59"
        />

        <TimeField
          value={endTime}
          onValueChange={(details) => setEndTime(details.value)}
          children="End Time"
          minValue="00:00"
          maxValue="23:59"
        />

        <div
          style={{
            padding: '12px',
            backgroundColor: '#dbeafe',
            color: '#1e40af',
            borderRadius: '8px',
            fontSize: '14px',
          }}
        >
          Duration: {duration.hours} hours {duration.minutes} minutes
        </div>
      </div>
    );
  },
};

/**
 * Time fields with different configurations.
 */
export const Variations: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        minWidth: '350px',
      }}
    >
      <TimeField children="Default" />
      <TimeField children="With Seconds" allowSeconds />
      <TimeField children="12-Hour Format" hourCycle={12} />
      <TimeField children="Required" required />
      <TimeField children="Disabled" disabled value="10:30" />
      <TimeField children="Read-only" readOnly value="15:45" />
    </div>
  ),
};

/**
 * Business hours time picker.
 */
export const BusinessHours: Story = {
  render: () => {
    const [openTime, setOpenTime] = useState('09:00');
    const [closeTime, setCloseTime] = useState('17:30');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '32px',
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          minWidth: '400px',
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: '20px',
              fontWeight: 600,
              color: '#111827',
            }}
          >
            Business Hours
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#6b7280' }}>
            Set your operating hours
          </p>
        </div>

        <TimeField
          value={openTime}
          onValueChange={(details) => setOpenTime(details.value)}
          children="Opening Time"
          minValue="06:00"
          maxValue="12:00"
        />

        <TimeField
          value={closeTime}
          onValueChange={(details) => setCloseTime(details.value)}
          children="Closing Time"
          minValue="12:00"
          maxValue="23:59"
        />

        <div
          style={{
            padding: '16px',
            backgroundColor: '#f0fdf4',
            border: '1px solid #86efac',
            borderRadius: '8px',
          }}
        >
          <div
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#166534',
              marginBottom: '4px',
            }}
          >
            Summary
          </div>
          <div style={{ fontSize: '13px', color: '#15803d' }}>
            Open: {openTime}
            <br />
            Close: {closeTime}
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Time field rendered without a `children` label - no label element is
 * rendered at all in this case.
 */
export const NoLabelChildren: Story = {
  args: {
    placeholder: 'No label rendered',
  },
};

/**
 * `required` with no `children` label. Since the required asterisk is
 * rendered inside the label element, and no label is rendered without
 * children, the asterisk does not appear here - a notable edge case.
 */
export const RequiredWithoutLabel: Story = {
  args: {
    required: true,
  },
};

/**
 * Required field that already has a value set.
 */
export const RequiredWithValueSet: Story = {
  args: {
    children: 'Required With Value',
    required: true,
    value: '13:00',
  },
};

/**
 * Required combined with disabled - the asterisk still shows next to the
 * label even though the field cannot be edited.
 */
export const RequiredDisabledCombo: Story = {
  args: {
    children: 'Required and Disabled',
    required: true,
    disabled: true,
    value: '09:30',
  },
};

/**
 * Required combined with read-only.
 */
export const RequiredReadOnlyCombo: Story = {
  args: {
    children: 'Required and Read-only',
    required: true,
    readOnly: true,
    value: '09:30',
  },
};

/**
 * Disabled field with a value present - the clear button must stay hidden
 * even though `value` is truthy, since disabled takes precedence.
 */
export const DisabledWithValueHidesClear: Story = {
  args: {
    children: 'Disabled (clear button hidden despite value)',
    disabled: true,
    value: '12:15',
  },
};

/**
 * Read-only field with a value present - the clear button must stay hidden.
 */
export const ReadOnlyWithValueHidesClear: Story = {
  args: {
    children: 'Read-only (clear button hidden despite value)',
    readOnly: true,
    value: '12:15',
  },
};

/**
 * Enabled field with a value present - the clear button is visible.
 */
export const EnabledWithValueShowsClear: Story = {
  args: {
    children: 'Enabled With Value (clear button visible)',
    value: '12:15',
  },
};

/**
 * Enabled field with no value - the clear button is hidden because there is
 * nothing to clear.
 */
export const EmptyValueNoClearButton: Story = {
  args: {
    children: 'Empty (clear button hidden)',
  },
};

/**
 * Clicking the clear (x) button on a properly controlled field resets the
 * parent's state, so the field and the "current value" readout both update.
 */
export const ClearButtonClickResets: Story = {
  render: () => {
    const [value, setValue] = useState('08:45');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          minWidth: '300px',
        }}
      >
        <TimeField
          value={value}
          onValueChange={(details) => setValue(details.value)}
          children="Click the × to clear"
        />
        <div style={{ fontSize: '13px', color: '#6b7280' }}>
          Current value: {value || '(empty)'}
        </div>
      </div>
    );
  },
};

/**
 * Demonstrates a known quirk: the clear button mutates the input's DOM value
 * imperatively via ref, bypassing the controlled `value` prop. This story
 * intentionally does NOT update state from `onValueChange`, so after
 * clicking clear, the native input's DOM value becomes empty while the
 * `value` prop passed to the component remains unchanged - a real
 * divergence between the rendered DOM and the controlled prop.
 */
export const ClearButtonQuirkUncontrolledDrift: Story = {
  render: () => {
    const fixedValue = '10:30';

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          minWidth: '340px',
        }}
      >
        <TimeField value={fixedValue} children="Ignores onValueChange (quirk demo)" />
        <div style={{ fontSize: '13px', color: '#991b1b' }}>
          The `value` prop stays "{fixedValue}" because this story does not
          call setState in `onValueChange`. Click the clear (×) button: the
          native input's DOM value resets to empty, but the prop is still "
          {fixedValue}" - the DOM and the controlled prop have diverged.
        </div>
      </div>
    );
  },
};

/**
 * Placeholder text shown with no value set.
 */
export const PlaceholderWithoutValue: Story = {
  args: {
    children: 'Preferred Time',
    placeholder: '--:--',
  },
};

/**
 * Placeholder passed alongside a value - native time inputs generally do not
 * display a placeholder once a value is present, illustrated here.
 */
export const PlaceholderIgnoredWhenValueSet: Story = {
  args: {
    children: 'Preferred Time',
    placeholder: '--:--',
    value: '15:00',
  },
};

/**
 * `allowSeconds` enabled - the native input gets `step={1}` and accepts an
 * HH:MM:SS value.
 */
export const AllowSecondsStepAttribute: Story = {
  args: {
    children: 'Precise Time (HH:MM:SS)',
    allowSeconds: true,
    value: '10:15:30',
  },
};

/**
 * `allowSeconds` disabled (default) - the native input has no `step`
 * attribute and works with an HH:MM value.
 */
export const NoSecondsStandardFormat: Story = {
  args: {
    children: 'Standard Time (HH:MM)',
    allowSeconds: false,
    value: '10:15',
  },
};

/**
 * Only a minimum time constraint is set.
 */
export const MinValueOnly: Story = {
  args: {
    children: 'Earliest 09:00',
    minValue: '09:00',
  },
};

/**
 * Only a maximum time constraint is set.
 */
export const MaxValueOnly: Story = {
  args: {
    children: 'Latest 18:00',
    maxValue: '18:00',
  },
};

/**
 * A narrow min/max window with a valid value inside the range.
 */
export const MinMaxNarrowRange: Story = {
  args: {
    children: 'Lunch Window',
    minValue: '12:00',
    maxValue: '13:00',
    value: '12:30',
  },
};

/**
 * `errorMessageId` wired to `aria-describedby`, paired with a visible
 * `ValidationMessage` element sharing the same id.
 */
export const ErrorMessagePairing: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        minWidth: '320px',
      }}
    >
      <TimeField
        children="Delivery Time"
        errorMessageId="delivery-time-error"
        minValue="08:00"
        maxValue="20:00"
        value="23:00"
      />
      <ValidationMessage
        id="delivery-time-error"
        status="error"
        message="Delivery time must be between 8:00 AM and 8:00 PM"
      />
    </div>
  ),
};

/**
 * `onInvalid` firing when a required field is submitted while still empty.
 */
export const OnInvalidRequiredEmpty: Story = {
  render: () => {
    const [invalidFired, setInvalidFired] = useState(false);

    return (
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          minWidth: '300px',
        }}
      >
        <TimeField
          required
          children="Required Time (submit while empty)"
          onInvalid={() => setInvalidFired(true)}
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
            fontSize: '14px',
          }}
        >
          Submit
        </button>
        {invalidFired && (
          <div style={{ color: '#991b1b', fontSize: '13px' }}>
            onInvalid fired: this field is required and currently empty.
          </div>
        )}
      </form>
    );
  },
};

/**
 * `onInvalid` firing when a value outside the min/max range is submitted.
 */
export const OnInvalidOutOfRangeValue: Story = {
  render: () => {
    const [invalidFired, setInvalidFired] = useState(false);

    return (
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          minWidth: '300px',
        }}
      >
        <TimeField
          children="Business Hours Only (submit to validate)"
          minValue="09:00"
          maxValue="17:00"
          value="05:00"
          onInvalid={() => setInvalidFired(true)}
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
            fontSize: '14px',
          }}
        >
          Submit
        </button>
        {invalidFired && (
          <div style={{ color: '#991b1b', fontSize: '13px' }}>
            onInvalid fired: 05:00 is outside the 09:00-17:00 range.
          </div>
        )}
      </form>
    );
  },
};

/**
 * `hourCycle={12}` combined with seconds enabled. Note `hourCycle` is
 * display-only and does not change native input behavior.
 */
export const HourCycle12WithSecondsCombo: Story = {
  args: {
    children: '12-Hour With Seconds',
    hourCycle: 12,
    allowSeconds: true,
    value: '09:15:30',
  },
};

/**
 * `hourCycle={24}` combined with a min/max range.
 */
export const HourCycle24WithMinMax: Story = {
  args: {
    children: '24-Hour With Range',
    hourCycle: 24,
    minValue: '06:00',
    maxValue: '22:00',
    value: '13:45',
  },
};

/**
 * `name` attribute set on a field with a default value, for form submission
 * via `FormData`.
 */
export const NamedFieldWithDefaultValue: Story = {
  args: {
    children: 'Reminder Time',
    name: 'reminder-time',
    value: '07:00',
  },
};

/**
 * Kitchen sink: required, seconds, name, min/max, placeholder, error message
 * wiring and a non-default hour cycle all combined.
 */
export const KitchenSinkFull: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        minWidth: '360px',
      }}
    >
      <TimeField
        children="Full-Featured Time Field"
        required
        allowSeconds
        name="kitchen-sink-time"
        value="14:30:15"
        minValue="06:00:00"
        maxValue="22:00:00"
        placeholder="HH:MM:SS"
        errorMessageId="kitchen-sink-time-error"
        hourCycle={12}
      />
      <ValidationMessage
        id="kitchen-sink-time-error"
        status="info"
        message="Seconds are enabled for this field"
      />
    </div>
  ),
};

/**
 * Disabled, read-only and enabled fields side by side sharing the same
 * value, for visual contrast between the three states.
 */
export const KitchenSinkDisabledReadonlyContrast: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        minWidth: '320px',
      }}
    >
      <TimeField children="Disabled" disabled value="11:00" />
      <TimeField children="Read-only" readOnly value="11:00" />
      <TimeField children="Enabled" value="11:00" />
    </div>
  ),
};

/**
 * Right-to-left, Arabic-script label content.
 */
export const RTLArabicLabel: Story = {
  args: {
    children: 'وقت الموعد',
    value: '16:00',
  },
};

/**
 * Label content containing emoji.
 */
export const UnicodeEmojiLabel: Story = {
  args: {
    children: '⏰ Alarm Time 🔔',
    value: '06:30',
  },
};

/**
 * A very long label string to check wrapping/overflow behavior.
 */
export const VeryLongLabelText: Story = {
  args: {
    children:
      'Please select the exact time you would like your scheduled appointment reminder notification to be delivered to your device',
    value: '09:00',
  },
};

/**
 * Two independent TimeField instances, each with their own state, to verify
 * they do not share or leak values.
 */
export const MultipleInstancesIndependentState: Story = {
  render: () => {
    const [timeA, setTimeA] = useState('08:00');
    const [timeB, setTimeB] = useState('17:00');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          minWidth: '320px',
        }}
      >
        <TimeField
          value={timeA}
          onValueChange={(details) => setTimeA(details.value)}
          children="Instance A"
        />
        <TimeField
          value={timeB}
          onValueChange={(details) => setTimeB(details.value)}
          children="Instance B"
        />
        <div style={{ fontSize: '13px', color: '#6b7280' }}>
          A: {timeA || '(empty)'} — B: {timeB || '(empty)'}
        </div>
      </div>
    );
  },
};

/**
 * A form layout containing four TimeField instances laid out in a grid.
 */
export const FormWithMultipleTimeFieldsLayout: Story = {
  render: () => {
    const [wakeUp, setWakeUp] = useState('06:30');
    const [breakfast, setBreakfast] = useState('07:15');
    const [lunch, setLunch] = useState('12:00');
    const [dinner, setDinner] = useState('19:00');

    return (
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          padding: '20px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          minWidth: '420px',
        }}
      >
        <TimeField
          value={wakeUp}
          onValueChange={(details) => setWakeUp(details.value)}
          children="Wake Up"
        />
        <TimeField
          value={breakfast}
          onValueChange={(details) => setBreakfast(details.value)}
          children="Breakfast"
        />
        <TimeField
          value={lunch}
          onValueChange={(details) => setLunch(details.value)}
          children="Lunch"
        />
        <TimeField
          value={dinner}
          onValueChange={(details) => setDinner(details.value)}
          children="Dinner"
        />
      </form>
    );
  },
};

/**
 * `hideTimeZone` accepted as a prop, demonstrated with both values even
 * though it has no visual effect in this native-input implementation.
 */
export const HideTimeZonePropNoVisualEffect: Story = {
  args: {
    children: 'Meeting Time (hideTimeZone has no visual effect)',
    value: '10:00',
    hideTimeZone: false,
  },
};

/**
 * Disabled field with no value - the clear button stays hidden and there is
 * nothing to clear anyway.
 */
export const DisabledWithoutValueNoClear: Story = {
  args: {
    children: 'Disabled, No Value',
    disabled: true,
  },
};

/**
 * Read-only field with no value - the clear button stays hidden.
 */
export const ReadOnlyWithoutValueNoClear: Story = {
  args: {
    children: 'Read-only, No Value',
    readOnly: true,
  },
};
