import type { Meta, StoryObj } from '@storybook/react';
import Meter from './Meter';

const meta: Meta<typeof Meter> = {
  title: 'Components/Meter',
  component: Meter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    min: {
      control: 'number',
      description: 'The minimum value of the meter',
    },
    max: {
      control: 'number',
      description: 'The maximum value of the meter',
    },
    value: {
      control: 'number',
      description: 'The current value of the meter',
    },
    children: {
      control: 'text',
      description: 'Custom label content to render',
    },
    optimum: {
      control: 'number',
      description: 'The optimum value for the meter',
    },
    low: {
      control: 'number',
      description: 'Low threshold value',
    },
    high: {
      control: 'number',
      description: 'High threshold value',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default meter with 50% value.
 */
export const Default: Story = {
  args: {
    value: 50,
    min: 0,
    max: 100,
    children: 'Usage',
  },
};

/**
 * Meter with custom min, max, and value.
 */
export const CustomRange: Story = {
  args: {
    value: 150,
    min: 0,
    max: 200,
    children: 'Storage Usage',
  },
};

/**
 * Meter with custom children content.
 */
export const CustomChildren: Story = {
  args: {
    value: 75,
    min: 0,
    max: 100,
    children: 'Server Load',
  },
};

/**
 * Low value meter (shows in green when optimum is low).
 */
export const LowValue: Story = {
  args: {
    value: 25,
    min: 0,
    max: 100,
    optimum: 20,
    low: 30,
    high: 70,
    children: 'Temperature',
  },
};

/**
 * Medium value meter (shows in amber).
 */
export const MediumValue: Story = {
  args: {
    value: 50,
    min: 0,
    max: 100,
    optimum: 100,
    low: 33,
    high: 66,
    children: 'Battery Level',
  },
};

/**
 * High value meter (shows in green when optimum is high).
 */
export const HighValue: Story = {
  args: {
    value: 85,
    min: 0,
    max: 100,
    optimum: 100,
    low: 33,
    high: 66,
    children: 'Download Speed',
  },
};

/**
 * Critical value meter (shows in red).
 */
export const CriticalValue: Story = {
  args: {
    value: 95,
    min: 0,
    max: 100,
    optimum: 20,
    low: 30,
    high: 70,
    children: 'CPU Temperature',
  },
};

/**
 * Disk usage example.
 */
export const DiskUsage: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '400px',
      }}
    >
      <Meter
        value={45}
        min={0}
        max={100}
        optimum={0}
        low={50}
        high={80}
        children="C: Drive"
      />
      <Meter
        value={72}
        min={0}
        max={100}
        optimum={0}
        low={50}
        high={80}
        children="D: Drive"
      />
      <Meter
        value={88}
        min={0}
        max={100}
        optimum={0}
        low={50}
        high={80}
        children="E: Drive"
      />
    </div>
  ),
};

/**
 * Battery levels for multiple devices.
 */
export const BatteryLevels: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '400px',
      }}
    >
      <Meter
        value={95}
        min={0}
        max={100}
        optimum={100}
        low={20}
        high={50}
        children="Phone"
      />
      <Meter
        value={68}
        min={0}
        max={100}
        optimum={100}
        low={20}
        high={50}
        children="Laptop"
      />
      <Meter
        value={42}
        min={0}
        max={100}
        optimum={100}
        low={20}
        high={50}
        children="Tablet"
      />
      <Meter
        value={15}
        min={0}
        max={100}
        optimum={100}
        low={20}
        high={50}
        children="Watch"
      />
    </div>
  ),
};

/**
 * Network bandwidth usage.
 */
export const NetworkUsage: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '400px',
      }}
    >
      <Meter
        value={320}
        min={0}
        max={1000}
        optimum={1000}
        children="Download Speed (Mbps)"
      />
      <Meter
        value={89}
        min={0}
        max={100}
        optimum={1000}
        children="Upload Speed (Mbps)"
      />
      <Meter
        value={45}
        min={0}
        max={100}
        optimum={0}
        low={40}
        high={75}
        children="Network Load %"
      />
    </div>
  ),
};

/**
 * System resources monitoring.
 */
export const SystemResources: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '500px',
        padding: '24px',
        backgroundColor: '#f9fafb',
        borderRadius: '12px',
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
        System Monitor
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Meter
          value={65}
          min={0}
          max={100}
          optimum={0}
          low={50}
          high={80}
          children="CPU Usage"
        />
        <Meter
          value={78}
          min={0}
          max={100}
          optimum={0}
          low={60}
          high={85}
          children="Memory Usage"
        />
        <Meter
          value={42}
          min={0}
          max={100}
          optimum={0}
          low={70}
          high={90}
          children="Disk I/O"
        />
        <Meter
          value={28}
          min={0}
          max={100}
          optimum={50}
          low={30}
          high={70}
          children="Temperature"
        />
      </div>
    </div>
  ),
};

/**
 * Temperature ranges with different optimum values.
 */
export const TemperatureRanges: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '400px',
      }}
    >
      <Meter
        value={18}
        min={0}
        max={50}
        optimum={20}
        low={15}
        high={30}
        children="Refrigerator (°C)"
      />
      <Meter
        value={22}
        min={0}
        max={40}
        optimum={22}
        low={18}
        high={26}
        children="Room Temp (°C)"
      />
      <Meter
        value={65}
        min={0}
        max={100}
        optimum={70}
        low={60}
        high={80}
        children="Water Heater (°C)"
      />
      <Meter
        value={180}
        min={0}
        max={250}
        optimum={180}
        low={150}
        high={200}
        children="Oven (°C)"
      />
    </div>
  ),
};

/**
 * Memory usage by application.
 */
export const MemoryUsage: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '450px',
        padding: '20px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
      }}
    >
      <h4
        style={{
          margin: 0,
          fontSize: '16px',
          fontWeight: 600,
          color: '#111827',
        }}
      >
        Application Memory Usage
      </h4>
      <Meter
        value={2.4}
        min={0}
        max={8}
        optimum={0}
        low={4}
        high={6}
        children="Chrome (GB)"
      />
      <Meter
        value={1.8}
        min={0}
        max={8}
        optimum={0}
        low={4}
        high={6}
        children="VS Code (GB)"
      />
      <Meter
        value={0.5}
        min={0}
        max={8}
        optimum={0}
        low={4}
        high={6}
        children="Terminal (GB)"
      />
      <Meter
        value={0.3}
        min={0}
        max={8}
        optimum={0}
        low={4}
        high={6}
        children="Spotify (GB)"
      />
      <div
        style={{
          marginTop: '8px',
          padding: '12px',
          backgroundColor: '#f3f4f6',
          borderRadius: '6px',
        }}
      >
        <strong>Total: 5.0 GB / 8 GB</strong>
      </div>
    </div>
  ),
};

/**
 * Score meters with percentage display.
 */
export const ScoreMeters: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '400px',
      }}
    >
      <Meter
        value={92}
        min={0}
        max={100}
        optimum={100}
        low={60}
        high={80}
        children="Performance Score"
      />
      <Meter
        value={78}
        min={0}
        max={100}
        optimum={100}
        low={60}
        high={80}
        children="Accessibility Score"
      />
      <Meter
        value={85}
        min={0}
        max={100}
        optimum={100}
        low={60}
        high={80}
        children="Best Practices Score"
      />
      <Meter
        value={95}
        min={0}
        max={100}
        optimum={100}
        low={60}
        high={80}
        children="SEO Score"
      />
    </div>
  ),
};

/**
 * Minimal meter without label.
 */
export const MinimalNoLabel: Story = {
  args: {
    value: 60,
    min: 0,
    max: 100,
  },
};

/**
 * Full range meter at 100%.
 */
export const FullRange: Story = {
  args: {
    value: 100,
    min: 0,
    max: 100,
    children: 'Complete',
  },
};

/**
 * Empty meter at 0%.
 */
export const EmptyRange: Story = {
  args: {
    value: 0,
    min: 0,
    max: 100,
    children: 'Not Started',
  },
};

/* -------------------------------------------------------------------------
 * Optimum-high branch: threshold boundaries (5)
 * low=30, high=70, optimum=90 (above high, so higher values are "good")
 * ---------------------------------------------------------------------- */

/**
 * Value just below the low threshold with a high optimum (renders red/critical).
 */
export const OptimumHighBelowLow: Story = {
  args: {
    value: 25,
    min: 0,
    max: 100,
    optimum: 90,
    low: 30,
    high: 70,
    children: 'Below low threshold',
  },
};

/**
 * Value exactly at the low threshold with a high optimum (renders amber, not green).
 */
export const OptimumHighAtLow: Story = {
  args: {
    value: 30,
    min: 0,
    max: 100,
    optimum: 90,
    low: 30,
    high: 70,
    children: 'At low threshold',
  },
};

/**
 * Value between the low and high thresholds with a high optimum (renders amber).
 */
export const OptimumHighBetweenLowAndHigh: Story = {
  args: {
    value: 50,
    min: 0,
    max: 100,
    optimum: 90,
    low: 30,
    high: 70,
    children: 'Between thresholds',
  },
};

/**
 * Value exactly at the high threshold with a high optimum (still amber, not green).
 */
export const OptimumHighAtHigh: Story = {
  args: {
    value: 70,
    min: 0,
    max: 100,
    optimum: 90,
    low: 30,
    high: 70,
    children: 'At high threshold',
  },
};

/**
 * Value just above the high threshold with a high optimum (renders green).
 */
export const OptimumHighAboveHigh: Story = {
  args: {
    value: 75,
    min: 0,
    max: 100,
    optimum: 90,
    low: 30,
    high: 70,
    children: 'Above high threshold',
  },
};

/* -------------------------------------------------------------------------
 * Optimum-low branch: threshold boundaries (5)
 * low=30, high=70, optimum=10 (below low, so lower values are "good")
 * ---------------------------------------------------------------------- */

/**
 * Value below the low threshold with a low optimum (renders green).
 */
export const OptimumLowBelowLow: Story = {
  args: {
    value: 25,
    min: 0,
    max: 100,
    optimum: 10,
    low: 30,
    high: 70,
    children: 'Below low threshold',
  },
};

/**
 * Value exactly at the low threshold with a low optimum (renders amber).
 */
export const OptimumLowAtLow: Story = {
  args: {
    value: 30,
    min: 0,
    max: 100,
    optimum: 10,
    low: 30,
    high: 70,
    children: 'At low threshold',
  },
};

/**
 * Value between the low and high thresholds with a low optimum (renders amber).
 */
export const OptimumLowBetweenLowAndHigh: Story = {
  args: {
    value: 50,
    min: 0,
    max: 100,
    optimum: 10,
    low: 30,
    high: 70,
    children: 'Between thresholds',
  },
};

/**
 * Value exactly at the high threshold with a low optimum (still amber, not red).
 */
export const OptimumLowAtHigh: Story = {
  args: {
    value: 70,
    min: 0,
    max: 100,
    optimum: 10,
    low: 30,
    high: 70,
    children: 'At high threshold',
  },
};

/**
 * Value just above the high threshold with a low optimum (renders red/critical).
 */
export const OptimumLowAboveHigh: Story = {
  args: {
    value: 75,
    min: 0,
    max: 100,
    optimum: 10,
    low: 30,
    high: 70,
    children: 'Above high threshold',
  },
};

/* -------------------------------------------------------------------------
 * Optimum-middle branch: threshold boundaries (5)
 * low=30, high=70, optimum=50 (between low and high, so the middle is "good")
 * ---------------------------------------------------------------------- */

/**
 * Value below the low threshold with a middle optimum (renders amber).
 */
export const OptimumMiddleBelowLow: Story = {
  args: {
    value: 25,
    min: 0,
    max: 100,
    optimum: 50,
    low: 30,
    high: 70,
    children: 'Below low threshold',
  },
};

/**
 * Value exactly at the low threshold with a middle optimum (renders green).
 */
export const OptimumMiddleAtLow: Story = {
  args: {
    value: 30,
    min: 0,
    max: 100,
    optimum: 50,
    low: 30,
    high: 70,
    children: 'At low threshold',
  },
};

/**
 * Value between the low and high thresholds with a middle optimum (renders green).
 */
export const OptimumMiddleBetweenLowAndHigh: Story = {
  args: {
    value: 50,
    min: 0,
    max: 100,
    optimum: 50,
    low: 30,
    high: 70,
    children: 'Between thresholds',
  },
};

/**
 * Value exactly at the high threshold with a middle optimum (renders green).
 */
export const OptimumMiddleAtHigh: Story = {
  args: {
    value: 70,
    min: 0,
    max: 100,
    optimum: 50,
    low: 30,
    high: 70,
    children: 'At high threshold',
  },
};

/**
 * Value just above the high threshold with a middle optimum (renders amber).
 */
export const OptimumMiddleAboveHigh: Story = {
  args: {
    value: 75,
    min: 0,
    max: 100,
    optimum: 50,
    low: 30,
    high: 70,
    children: 'Above high threshold',
  },
};

/* -------------------------------------------------------------------------
 * Optimum exactly at a threshold edge (2)
 * ---------------------------------------------------------------------- */

/**
 * Optimum equal to the low threshold falls into the "middle" branch, so an
 * in-range value renders green.
 */
export const OptimumEqualsLowThreshold: Story = {
  args: {
    value: 50,
    min: 0,
    max: 100,
    optimum: 30,
    low: 30,
    high: 70,
    children: 'Optimum equals low threshold',
  },
};

/**
 * Optimum equal to the high threshold falls into the "middle" branch, so an
 * in-range value renders green.
 */
export const OptimumEqualsHighThreshold: Story = {
  args: {
    value: 50,
    min: 0,
    max: 100,
    optimum: 70,
    low: 30,
    high: 70,
    children: 'Optimum equals high threshold',
  },
};

/* -------------------------------------------------------------------------
 * Default thresholds (no low/high/optimum provided) (3)
 * With min=0/max=100, defaults are low=33, high=66, optimum=max=100.
 * ---------------------------------------------------------------------- */

/**
 * Value below the default low third with no thresholds configured (renders red).
 */
export const DefaultThresholdsLowRegion: Story = {
  args: {
    value: 20,
    min: 0,
    max: 100,
    children: 'Default thresholds - low region',
  },
};

/**
 * Value in the default middle third with no thresholds configured (renders amber).
 */
export const DefaultThresholdsMidRegion: Story = {
  args: {
    value: 50,
    min: 0,
    max: 100,
    children: 'Default thresholds - mid region',
  },
};

/**
 * Value above the default high third with no thresholds configured (renders green).
 */
export const DefaultThresholdsHighRegion: Story = {
  args: {
    value: 80,
    min: 0,
    max: 100,
    children: 'Default thresholds - high region',
  },
};

/* -------------------------------------------------------------------------
 * Min/max range variations (6)
 * ---------------------------------------------------------------------- */

/**
 * A meter with a negative minimum value.
 */
export const NegativeMinRange: Story = {
  args: {
    value: 0,
    min: -50,
    max: 50,
    children: 'Negative min range',
  },
};

/**
 * A meter with a non-zero min and max (neither bound is 0).
 */
export const NonZeroMinMaxRange: Story = {
  args: {
    value: 50,
    min: 20,
    max: 80,
    children: 'Non-zero min/max range',
  },
};

/**
 * A meter driven by fractional/decimal values.
 */
export const DecimalValueRange: Story = {
  args: {
    value: 2.5,
    min: 0,
    max: 10,
    low: 4,
    high: 8,
    children: 'Decimal value range',
  },
};

/**
 * A meter spanning a very large numeric range.
 */
export const LargeNumericRange: Story = {
  args: {
    value: 750000,
    min: 0,
    max: 1000000,
    optimum: 1000000,
    low: 330000,
    high: 660000,
    children: 'Large numeric range',
  },
};

/**
 * Edge case: min and max are equal, producing a zero-width range.
 */
export const MinEqualsMaxRange: Story = {
  args: {
    value: 50,
    min: 50,
    max: 50,
    children: 'Min equals max (zero-width range)',
  },
};

/**
 * A meter over a single-unit range (min=0, max=1).
 */
export const SingleUnitRange: Story = {
  args: {
    value: 1,
    min: 0,
    max: 1,
    children: 'Single-unit range',
  },
};

/* -------------------------------------------------------------------------
 * Value exactly at the min/max boundary of a non-zero-based range (2)
 * Note: Ark's underlying Progress primitive validates `value` against
 * `min`/`max` and throws for genuinely out-of-range values, so these
 * stories exercise the boundary itself rather than out-of-range clamping.
 * ---------------------------------------------------------------------- */

/**
 * Value pinned to the configured minimum; the visual bar renders at 0%.
 */
export const ValueAtMinBoundary: Story = {
  args: {
    value: 20,
    min: 20,
    max: 80,
    children: 'At minimum boundary',
  },
};

/**
 * Value pinned to the configured maximum; the visual bar renders at 100%.
 */
export const ValueAtMaxBoundary: Story = {
  args: {
    value: 80,
    min: 20,
    max: 80,
    children: 'At maximum boundary',
  },
};

/* -------------------------------------------------------------------------
 * Default prop values (2)
 * ---------------------------------------------------------------------- */

/**
 * No props at all; relies entirely on the component's defaults.
 */
export const NoPropsAtAll: Story = {
  args: {},
};

/**
 * Only the value is provided; min/max fall back to their defaults.
 */
export const OnlyValueProvided: Story = {
  args: {
    value: 42,
  },
};

/* -------------------------------------------------------------------------
 * Label / value-text content variations (2)
 * ---------------------------------------------------------------------- */

/**
 * A long, descriptive label string.
 */
export const LongLabelText: Story = {
  args: {
    value: 55,
    min: 0,
    max: 100,
    children:
      'Primary database cluster replication lag as a percentage of the configured maximum acceptable threshold',
  },
};

/**
 * A label containing unicode and emoji characters.
 */
export const UnicodeEmojiLabelMeter: Story = {
  args: {
    value: 42,
    min: 0,
    max: 100,
    children: '🔋 Battery Status ⚡',
  },
};

/* -------------------------------------------------------------------------
 * Kitchen-sink combination (1)
 * ---------------------------------------------------------------------- */

/**
 * Kitchen sink: a dashboard combining custom min/max, decimals, negative
 * ranges, and every threshold branch in one view.
 */
export const KitchenSinkDashboard: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '400px',
      }}
    >
      <Meter
        value={92}
        min={0}
        max={100}
        optimum={100}
        low={60}
        high={80}
        children="Uptime % (optimum-high, green)"
      />
      <Meter
        value={95}
        min={0}
        max={100}
        optimum={20}
        low={30}
        high={70}
        children="CPU Temp (optimum-low, red)"
      />
      <Meter
        value={-10}
        min={-50}
        max={50}
        optimum={0}
        low={-20}
        high={20}
        children="Sensor delta (negative range, optimum-middle)"
      />
      <Meter
        value={6.5}
        min={0}
        max={10}
        low={4}
        high={8}
        optimum={10}
        children="Decimal reading"
      />
    </div>
  ),
};
