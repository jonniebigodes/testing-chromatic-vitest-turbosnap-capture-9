import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, within, userEvent, expect } from 'storybook/test';
import { useState } from 'react';
import Slider from './Slider';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'object',
      description: 'The current value of the slider as an array',
    },
    onValueChange: {
      description: 'Event handler called when the slider value changes',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the slider is disabled',
    },
    min: {
      control: 'number',
      description: 'The minimum value of the slider',
    },
    max: {
      control: 'number',
      description: 'The maximum value of the slider',
    },
    step: {
      control: 'number',
      description: 'The increment step of the slider',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: "The slider's orientation",
    },
    children: {
      control: 'text',
      description: 'Label content to be rendered for the slider',
    },
  },
  args: {
    onValueChange: fn(),
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default slider with standard range (0-100)
 */
export const Default: Story = {
  args: {
    value: [50],
  },
};

/**
 * Slider with a label
 */
export const WithLabel: Story = {
  args: {
    value: [50],
    children: 'Volume',
  },
};

/**
 * Disabled slider
 */
export const Disabled: Story = {
  args: {
    value: [50],
    disabled: true,
    children: 'Disabled slider',
  },
};

/**
 * Slider with custom min and max values
 */
export const CustomRange: Story = {
  args: {
    value: [0],
    min: -50,
    max: 50,
    children: 'Temperature (°C)',
  },
};

/**
 * Slider with custom step value
 */
export const CustomStep: Story = {
  args: {
    value: [0],
    min: 0,
    max: 100,
    step: 10,
    children: 'Brightness (10% increments)',
  },
};

/**
 * Horizontal slider (default orientation)
 */
export const Horizontal: Story = {
  args: {
    value: [50],
    orientation: 'horizontal',
    children: 'Horizontal slider',
  },
};

/**
 * Vertical slider
 */
export const Vertical: Story = {
  args: {
    value: [50],
    orientation: 'vertical',
    children: 'Volume',
  },
};

/**
 * Slider starting at minimum value
 */
export const MinValue: Story = {
  args: {
    value: [0],
    min: 0,
    max: 100,
    children: 'Progress',
  },
};

/**
 * Slider starting at maximum value
 */
export const MaxValue: Story = {
  args: {
    value: [100],
    min: 0,
    max: 100,
    children: 'Completion',
  },
};

/**
 * Controlled slider with state management
 */
export const Controlled: Story = {
  render: () => {
    const ControlledSlider = () => {
      const [value, setValue] = useState([50]);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Slider
            value={value}
            onValueChange={(details) => setValue(details.value)}
          >
            Controlled slider
          </Slider>
          <div
            style={{
              padding: '12px',
              backgroundColor: '#f3f4f6',
              borderRadius: '6px',
              fontSize: '14px',
            }}
          >
            <strong>Current value:</strong> {value[0]}
          </div>
          <button
            onClick={() => setValue([0])}
            style={{
              padding: '8px 16px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            Reset to 0
          </button>
        </div>
      );
    };

    return <ControlledSlider />;
  },
};

/**
 * Slider with change handler
 */
export const WithChangeHandler: Story = {
  render: () => {
    const SliderWithHandler = () => {
      const [message, setMessage] = useState('');

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Slider
            value={[50]}
            onValueChange={(details) => {
              setMessage(`Value changed to: ${details.value[0]}`);
            }}
          >
            Adjust volume
          </Slider>
          {message && (
            <div
              style={{
                padding: '12px',
                backgroundColor: '#e0f2fe',
                color: '#0c4a6e',
                borderRadius: '4px',
                fontSize: '14px',
              }}
            >
              {message}
            </div>
          )}
        </div>
      );
    };

    return <SliderWithHandler />;
  },
};

/**
 * Multiple sliders for different settings
 */
export const MultipleSliders: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '20px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        minWidth: '400px',
      }}
    >
      <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Audio Settings</h3>
      <Slider value={[70]} min={0} max={100}>
        Master Volume
      </Slider>
      <Slider value={[50]} min={0} max={100}>
        Music
      </Slider>
      <Slider value={[80]} min={0} max={100}>
        Sound Effects
      </Slider>
      <Slider value={[30]} min={0} max={100} disabled>
        Voice (unavailable)
      </Slider>
    </div>
  ),
};

/**
 * Slider with small range
 */
export const SmallRange: Story = {
  args: {
    value: [5],
    min: 0,
    max: 10,
    step: 1,
    children: 'Rating (0-10)',
  },
};

/**
 * Slider with decimal steps
 */
export const DecimalStep: Story = {
  args: {
    value: [2.5],
    min: 0,
    max: 5,
    step: 0.5,
    children: 'Price multiplier',
  },
};

/**
 * Vertical sliders side by side
 */
export const VerticalGroup: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '24px',
        padding: '20px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
      }}
    >
      <Slider value={[30]} orientation="vertical">
        Bass
      </Slider>
      <Slider value={[50]} orientation="vertical">
        Mid
      </Slider>
      <Slider value={[70]} orientation="vertical">
        Treble
      </Slider>
    </div>
  ),
};

/**
 * Temperature control example
 */
export const TemperatureControl: Story = {
  render: () => {
    const TempControl = () => {
      const [temp, setTemp] = useState([20]);

      const getTempColor = (value: number) => {
        if (value < 10) return '#3b82f6'; // Cold - Blue
        if (value < 25) return '#22c55e'; // Comfortable - Green
        return '#ef4444'; // Hot - Red
      };

      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: '24px',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            minWidth: '400px',
          }}
        >
          <h3 style={{ margin: 0, fontSize: '18px' }}>Thermostat</h3>
          <div
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              textAlign: 'center',
              color: getTempColor(temp[0]),
            }}
          >
            {temp[0]}°C
          </div>
          <Slider
            value={temp}
            onValueChange={(details) => setTemp(details.value)}
            min={10}
            max={30}
            step={0.5}
          >
            Target Temperature
          </Slider>
          <div
            style={{
              fontSize: '14px',
              color: '#6b7280',
              textAlign: 'center',
            }}
          >
            {temp[0] < 10 && 'Too cold'}
            {temp[0] >= 10 && temp[0] < 25 && 'Comfortable range'}
            {temp[0] >= 25 && 'Too hot'}
          </div>
        </div>
      );
    };

    return <TempControl />;
  },
};

/* -------------------------------------------------------------------------
 * Min/max/step boundary variations (6)
 * ---------------------------------------------------------------------- */

/**
 * Slider whose range spans negative and positive values
 */
export const NegativeMinMax: Story = {
  args: {
    value: [0],
    min: -100,
    max: 100,
    children: 'Balance (can go negative)',
  },
};

/**
 * Degenerate slider where min and max are equal
 */
export const ZeroWidthRange: Story = {
  args: {
    value: [50],
    min: 50,
    max: 50,
    children: 'Degenerate range (min equals max)',
  },
};

/**
 * Step size equal to the full range, so only min/max are reachable
 */
export const StepEqualsRange: Story = {
  args: {
    value: [0],
    min: 0,
    max: 100,
    step: 100,
    children: 'Step equals the full range',
  },
};

/**
 * Very small fractional step within a 0-1 range
 */
export const FractionalStepSmall: Story = {
  args: {
    value: [0.5],
    min: 0,
    max: 1,
    step: 0.1,
    children: 'Opacity (0.1 increments)',
  },
};

/**
 * Large numeric range for the max value
 */
export const LargeMaxValue: Story = {
  args: {
    value: [2500],
    min: 0,
    max: 10000,
    step: 100,
    children: 'Budget ($0 - $10,000)',
  },
};

/**
 * Value that lands exactly on a step boundary
 */
export const ValueAtExactStepBoundary: Story = {
  args: {
    value: [75],
    min: 0,
    max: 100,
    step: 25,
    children: 'Quarterly progress (25% increments)',
  },
};

/* -------------------------------------------------------------------------
 * Disabled edge cases (4)
 * ---------------------------------------------------------------------- */

/**
 * Disabled slider positioned at its minimum value
 */
export const DisabledAtMinValue: Story = {
  args: {
    value: [0],
    disabled: true,
    children: 'Disabled at minimum',
  },
};

/**
 * Disabled slider positioned at its maximum value
 */
export const DisabledAtMaxValue: Story = {
  args: {
    value: [100],
    disabled: true,
    children: 'Disabled at maximum',
  },
};

/**
 * Disabled slider using the vertical orientation
 */
export const DisabledVerticalOrientation: Story = {
  args: {
    value: [40],
    disabled: true,
    orientation: 'vertical',
    children: 'Disabled vertical slider',
  },
};

/**
 * Disabled slider combined with a custom step
 */
export const DisabledCustomStep: Story = {
  args: {
    value: [25],
    disabled: true,
    step: 5,
    children: 'Disabled slider with a custom step',
  },
};

/* -------------------------------------------------------------------------
 * Orientation combinations (4)
 * ---------------------------------------------------------------------- */

/**
 * Vertical slider with a custom negative-to-positive range
 */
export const VerticalWithCustomRange: Story = {
  args: {
    value: [0],
    min: -20,
    max: 20,
    orientation: 'vertical',
    children: 'Vertical, custom range',
  },
};

/**
 * Vertical slider with a decimal step
 */
export const VerticalDecimalStep: Story = {
  args: {
    value: [2.5],
    min: 0,
    max: 5,
    step: 0.25,
    orientation: 'vertical',
    children: 'Vertical, decimal step',
  },
};

/**
 * Horizontal slider with custom, non-default step boundaries
 */
export const HorizontalCustomStepBoundaries: Story = {
  args: {
    value: [45],
    min: 0,
    max: 90,
    step: 15,
    orientation: 'horizontal',
    children: 'Horizontal, 15-unit steps',
  },
};

/**
 * Vertical slider starting at its minimum value
 */
export const VerticalMinValue: Story = {
  args: {
    value: [0],
    min: 0,
    max: 100,
    orientation: 'vertical',
    children: 'Vertical slider at minimum',
  },
};

/* -------------------------------------------------------------------------
 * Label / valueText content (4)
 * ---------------------------------------------------------------------- */

/**
 * Slider rendered without any label content
 */
export const WithoutLabel: Story = {
  args: {
    value: [50],
  },
};

/**
 * Slider with a long, descriptive label
 */
export const LongLabelText: Story = {
  args: {
    value: [60],
    children:
      'This is a very long label describing exactly what this slider controls in great detail',
  },
};

/**
 * Slider label containing emoji alongside text
 */
export const UnicodeEmojiLabel: Story = {
  args: {
    value: [80],
    children: '🔊 Volume level 🎚️',
  },
};

/**
 * Slider label rendered right-to-left with Arabic unicode text
 */
export const RTLLabel: Story = {
  args: {
    value: [50],
    children: 'مستوى الصوت',
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
 * Controlled value updates (4)
 * ---------------------------------------------------------------------- */

/**
 * Controlled slider adjustable via external increment/decrement buttons
 */
export const ControlledWithIncrementDecrementButtons: Story = {
  render: () => {
    const IncrementDecrement = () => {
      const [value, setValue] = useState([50]);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Slider value={value} onValueChange={(details) => setValue(details.value)}>
            Adjustable value ({value[0]})
          </Slider>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setValue([Math.max(0, value[0] - 10)])}
              style={{ padding: '8px 16px', cursor: 'pointer' }}
            >
              -10
            </button>
            <button
              onClick={() => setValue([Math.min(100, value[0] + 10)])}
              style={{ padding: '8px 16px', cursor: 'pointer' }}
            >
              +10
            </button>
          </div>
        </div>
      );
    };

    return <IncrementDecrement />;
  },
};

/**
 * Controlled slider whose value drives a synced progress bar display
 */
export const ControlledSyncedDisplay: Story = {
  render: () => {
    const SyncedDisplay = () => {
      const [value, setValue] = useState([33]);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Slider value={value} onValueChange={(details) => setValue(details.value)}>
            Completion percentage
          </Slider>
          <div
            style={{
              width: '100%',
              height: '8px',
              backgroundColor: '#e5e7eb',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${value[0]}%`,
                height: '100%',
                backgroundColor: '#22c55e',
              }}
            />
          </div>
        </div>
      );
    };

    return <SyncedDisplay />;
  },
};

/**
 * Controlled slider with a button that resets its value to the minimum
 */
export const ControlledResetToMin: Story = {
  render: () => {
    const ResetToMin = () => {
      const [value, setValue] = useState([75]);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Slider
            value={value}
            onValueChange={(details) => setValue(details.value)}
            min={0}
            max={100}
          >
            Zoom level
          </Slider>
          <button
            onClick={() => setValue([0])}
            style={{ padding: '8px 16px', cursor: 'pointer' }}
          >
            Reset to minimum
          </button>
        </div>
      );
    };

    return <ResetToMin />;
  },
};

/**
 * Two independently-controlled sliders that do not share state
 */
export const ControlledTwoIndependentSliders: Story = {
  render: () => {
    const IndependentPair = () => {
      const [first, setFirst] = useState([20]);
      const [second, setSecond] = useState([80]);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Slider value={first} onValueChange={(details) => setFirst(details.value)}>
            First ({first[0]})
          </Slider>
          <Slider value={second} onValueChange={(details) => setSecond(details.value)}>
            Second ({second[0]})
          </Slider>
        </div>
      );
    };

    return <IndependentPair />;
  },
};

/* -------------------------------------------------------------------------
 * Keyboard interaction (6)
 * ---------------------------------------------------------------------- */

/**
 * Verifies ArrowRight increments the value by one step on a horizontal slider
 */
export const KeyboardArrowRightIncrements: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    children: 'Press ArrowRight to increment',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole('slider');
    slider.focus();
    expect(slider).toHaveAttribute('aria-valuenow', '0');
    await userEvent.keyboard('{ArrowRight}');
    expect(slider).toHaveAttribute('aria-valuenow', '1');
  },
};

/**
 * Verifies ArrowLeft decrements the value by one step on a horizontal slider
 */
export const KeyboardArrowLeftDecrements: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    children: 'Press ArrowRight then ArrowLeft',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole('slider');
    slider.focus();
    await userEvent.keyboard('{ArrowRight}{ArrowRight}');
    expect(slider).toHaveAttribute('aria-valuenow', '2');
    await userEvent.keyboard('{ArrowLeft}');
    expect(slider).toHaveAttribute('aria-valuenow', '1');
  },
};

/**
 * Verifies Home jumps the value to the configured minimum
 */
export const KeyboardHomeJumpsToMin: Story = {
  args: {
    min: 10,
    max: 90,
    step: 1,
    children: 'Press Home to jump to the minimum',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole('slider');
    slider.focus();
    await userEvent.keyboard('{ArrowRight}{ArrowRight}');
    await userEvent.keyboard('{Home}');
    expect(slider).toHaveAttribute('aria-valuenow', '10');
  },
};

/**
 * Verifies End jumps the value to the configured maximum
 */
export const KeyboardEndJumpsToMax: Story = {
  args: {
    min: 10,
    max: 90,
    step: 1,
    children: 'Press End to jump to the maximum',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole('slider');
    slider.focus();
    await userEvent.keyboard('{End}');
    expect(slider).toHaveAttribute('aria-valuenow', '90');
  },
};

/**
 * Verifies ArrowUp increments the value on a vertical slider
 */
export const KeyboardArrowUpIncrementsVertical: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    orientation: 'vertical',
    children: 'Press ArrowUp to increment (vertical)',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole('slider');
    slider.focus();
    await userEvent.keyboard('{ArrowUp}');
    expect(slider).toHaveAttribute('aria-valuenow', '1');
  },
};

/**
 * Verifies ArrowDown decrements the value on a vertical slider
 */
export const KeyboardArrowDownDecrementsVertical: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    orientation: 'vertical',
    children: 'Press ArrowUp then ArrowDown (vertical)',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole('slider');
    slider.focus();
    await userEvent.keyboard('{ArrowUp}{ArrowUp}');
    expect(slider).toHaveAttribute('aria-valuenow', '2');
    await userEvent.keyboard('{ArrowDown}');
    expect(slider).toHaveAttribute('aria-valuenow', '1');
  },
};

/* -------------------------------------------------------------------------
 * Focus / accessibility (2)
 * ---------------------------------------------------------------------- */

/**
 * Verifies the slider thumb is reachable via Tab
 */
export const KeyboardFocusable: Story = {
  args: {
    value: [50],
    children: 'Tab to focus this slider',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole('slider');
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    expect(slider).toHaveFocus();
  },
};

/**
 * Confirms the thumb exposes role="slider" and the expected ARIA value attributes
 */
export const AccessibleAriaAttributes: Story = {
  args: {
    value: [30],
    min: 0,
    max: 100,
    children: 'Accessible slider with ARIA attributes',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '30');
    expect(slider).toHaveAttribute('aria-valuemin', '0');
    expect(slider).toHaveAttribute('aria-valuemax', '100');
    expect(slider).toHaveAttribute('aria-labelledby');
  },
};

/* -------------------------------------------------------------------------
 * Kitchen-sink combinations (3)
 * ---------------------------------------------------------------------- */

/**
 * Kitchen sink: disabled, vertical, with a custom range and step
 */
export const KitchenSinkDisabledVerticalCustomRange: Story = {
  args: {
    value: [15],
    disabled: true,
    orientation: 'vertical',
    min: -10,
    max: 30,
    step: 5,
    children: 'Kitchen sink: disabled, vertical, custom range/step',
  },
};

/**
 * Kitchen sink: controlled state, custom step, and a dynamic label
 */
export const KitchenSinkControlledLabelCustomStep: Story = {
  render: () => {
    const KitchenSinkControlled = () => {
      const [value, setValue] = useState([40]);

      return (
        <Slider
          value={value}
          onValueChange={(details) => setValue(details.value)}
          min={0}
          max={200}
          step={20}
        >
          Kitchen sink: controlled, custom step ({value[0]})
        </Slider>
      );
    };

    return <KitchenSinkControlled />;
  },
};

/**
 * Kitchen sink: custom min/max/step, explicit orientation, and a label, all combined
 */
export const KitchenSinkAllPropsCombined: Story = {
  args: {
    value: [55],
    min: 10,
    max: 90,
    step: 5,
    disabled: false,
    orientation: 'horizontal',
    children: 'Kitchen sink: all props combined',
  },
};

/* -------------------------------------------------------------------------
 * Background/container context (1)
 * ---------------------------------------------------------------------- */

/**
 * Slider rendered on a dark background
 */
export const OnDarkBackground: Story = {
  args: {
    value: [50],
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
