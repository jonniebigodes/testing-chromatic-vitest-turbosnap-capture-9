import type { Meta, StoryObj } from '@storybook/react';
import Progress from './Progress';
import { useState } from 'react';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    min: {
      control: 'number',
      description: 'The minimum value of the progress bar',
    },
    max: {
      control: 'number',
      description: 'The maximum value of the progress bar',
    },
    value: {
      control: 'number',
      description: 'The current value of the progress bar',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the progress bar is disabled',
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the progress bar is read-only',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the progress bar',
    },
    children: {
      control: 'text',
      description: 'Custom content to render',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default progress bar with 50% completion.
 */
export const Default: Story = {
  args: {
    value: 50,
    min: 0,
    max: 100,
  },
};

/**
 * Progress bar with custom range (0-200) at 75 value.
 */
export const CustomRange: Story = {
  args: {
    value: 75,
    min: 0,
    max: 200,
    children: 'Custom Range Progress',
  },
};

/**
 * Progress bar in disabled state.
 */
export const Disabled: Story = {
  args: {
    value: 60,
    disabled: true,
    children: 'Disabled Progress',
  },
};

/**
 * Progress bar in read-only state with different color.
 */
export const ReadOnly: Story = {
  args: {
    value: 75,
    readonly: true,
    children: 'Read-only Progress',
  },
};

/**
 * Progress bar with vertical orientation.
 */
export const Vertical: Story = {
  args: {
    value: 65,
    orientation: 'vertical',
    children: 'Vertical Progress',
  },
};

/**
 * Progress bar showing 0% completion.
 */
export const ZeroProgress: Story = {
  args: {
    value: 0,
    children: 'Not Started',
  },
};

/**
 * Progress bar showing 100% completion.
 */
export const Complete: Story = {
  args: {
    value: 100,
    children: 'Complete!',
  },
};

/**
 * Progress bar with custom children content.
 */
export const CustomChildren: Story = {
  args: {
    value: 45,
    children: 'Uploading files...',
  },
};

/**
 * Controlled progress bar with dynamic value.
 */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(0);

    const startProgress = () => {
      setValue(0);
      const interval = setInterval(() => {
        setValue((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 200);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Progress value={value} children="Loading..." />
        <button
          onClick={startProgress}
          style={{
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Start Progress
        </button>
      </div>
    );
  },
};

/**
 * Multiple progress bars with different values.
 */
export const MultipleProgress: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '400px',
      }}
    >
      <Progress value={25} children="Task 1" />
      <Progress value={50} children="Task 2" />
      <Progress value={75} children="Task 3" />
      <Progress value={100} children="Task 4" />
    </div>
  ),
};

/**
 * Vertical progress bars in a group.
 */
export const VerticalGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
      <Progress value={30} orientation="vertical" children="CPU" />
      <Progress value={60} orientation="vertical" children="Memory" />
      <Progress value={85} orientation="vertical" children="Disk" />
      <Progress value={45} orientation="vertical" children="Network" />
    </div>
  ),
};

/**
 * Download progress with percentage display.
 */
export const Download: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false);

    const startDownload = () => {
      setIsDownloading(true);
      setProgress(0);

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsDownloading(false);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '14px', fontWeight: 500 }}>
            {isDownloading
              ? 'Downloading...'
              : progress === 100
                ? 'Download complete!'
                : 'Ready to download'}
          </span>
        </div>
        <Progress value={progress} children="" />
        <button
          onClick={startDownload}
          disabled={isDownloading}
          style={{
            padding: '8px 16px',
            backgroundColor: isDownloading ? '#9ca3af' : '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: isDownloading ? 'not-allowed' : 'pointer',
          }}
        >
          {isDownloading
            ? `Downloading... ${Math.round(progress)}%`
            : 'Start Download'}
        </button>
      </div>
    );
  },
};

/**
 * Progress with different states in a dashboard.
 */
export const Dashboard: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '500px',
        padding: '24px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
      }}
    >
      <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>
        Project Progress
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <Progress value={100} children="Requirements Gathering" />
        </div>
        <div>
          <Progress value={100} children="Design Phase" />
        </div>
        <div>
          <Progress value={65} children="Development" />
        </div>
        <div>
          <Progress value={30} children="Testing" />
        </div>
        <div>
          <Progress value={0} children="Deployment" />
        </div>
      </div>
    </div>
  ),
};

/**
 * Progress with min value other than 0.
 */
export const CustomMinMax: Story = {
  args: {
    value: 150,
    min: 100,
    max: 200,
    children: 'Custom Min/Max (100-200)',
  },
};

/* -------------------------------------------------------------------------
 * Value/range edge cases (8)
 * ---------------------------------------------------------------------- */

/**
 * Value just above the minimum boundary.
 */
export const ValueJustAboveMin: Story = {
  args: {
    value: 1,
    min: 0,
    max: 100,
    children: 'Value just above min',
  },
};

/**
 * Value just below the maximum boundary.
 */
export const ValueJustBelowMax: Story = {
  args: {
    value: 99,
    min: 0,
    max: 100,
    children: 'Value just below max',
  },
};

/**
 * Negative-to-positive custom range with the value sitting at the midpoint.
 */
export const NegativeMinRange: Story = {
  args: {
    value: 0,
    min: -50,
    max: 50,
    children: 'Negative min range (-50 to 50)',
  },
};

/**
 * Entirely negative min/max range.
 */
export const FullNegativeRange: Story = {
  args: {
    value: -75,
    min: -100,
    max: -50,
    children: 'Fully negative range (-100 to -50)',
  },
};

/**
 * Fractional (non-integer) value.
 */
export const FractionalValue: Story = {
  args: {
    value: 33.33,
    children: 'Fractional value (33.33)',
  },
};

/**
 * Large custom max value.
 */
export const LargeCustomMax: Story = {
  args: {
    value: 250,
    min: 0,
    max: 1000,
    children: 'Large custom max (0-1000)',
  },
};

/**
 * Degenerate range where min equals max, exercising the division-by-zero
 * percentage edge case.
 */
export const MinEqualsMaxEdgeCase: Story = {
  args: {
    value: 50,
    min: 50,
    max: 50,
    children: 'Min equals max (degenerate range)',
  },
};

/**
 * Value explicitly set to the minimum (as opposed to omitted).
 */
export const ValueEqualsMinExactly: Story = {
  args: {
    value: 10,
    min: 10,
    max: 90,
    children: 'Value explicitly equals min',
  },
};

/* -------------------------------------------------------------------------
 * Orientation combinations (6)
 * ---------------------------------------------------------------------- */

/**
 * Vertical progress bar at 0%.
 */
export const VerticalZero: Story = {
  args: {
    value: 0,
    orientation: 'vertical',
    children: 'Vertical - not started',
  },
};

/**
 * Vertical progress bar at 100%.
 */
export const VerticalComplete: Story = {
  args: {
    value: 100,
    orientation: 'vertical',
    children: 'Vertical - complete',
  },
};

/**
 * Vertical progress bar in a disabled state.
 */
export const VerticalDisabled: Story = {
  args: {
    value: 40,
    orientation: 'vertical',
    disabled: true,
    children: 'Vertical - disabled',
  },
};

/**
 * Vertical progress bar in a read-only state.
 */
export const VerticalReadOnly: Story = {
  args: {
    value: 70,
    orientation: 'vertical',
    readonly: true,
    children: 'Vertical - read-only',
  },
};

/**
 * Vertical progress bar with a custom min/max range.
 */
export const VerticalCustomRange: Story = {
  args: {
    value: 120,
    min: 0,
    max: 200,
    orientation: 'vertical',
    children: 'Vertical - custom range',
  },
};

/**
 * Vertical progress bar with a fractional value.
 */
export const VerticalFractional: Story = {
  args: {
    value: 12.5,
    orientation: 'vertical',
    children: 'Vertical - fractional value',
  },
};

/* -------------------------------------------------------------------------
 * Disabled combinations (3)
 * ---------------------------------------------------------------------- */

/**
 * Disabled progress bar at 0%.
 */
export const DisabledZero: Story = {
  args: {
    value: 0,
    disabled: true,
    children: 'Disabled - not started',
  },
};

/**
 * Disabled progress bar at 100%.
 */
export const DisabledComplete: Story = {
  args: {
    value: 100,
    disabled: true,
    children: 'Disabled - complete',
  },
};

/**
 * Disabled progress bar with a custom min/max range.
 */
export const DisabledCustomRange: Story = {
  args: {
    value: 175,
    min: 0,
    max: 250,
    disabled: true,
    children: 'Disabled - custom range',
  },
};

/* -------------------------------------------------------------------------
 * Read-only combinations (3)
 * ---------------------------------------------------------------------- */

/**
 * Read-only progress bar at 0%.
 */
export const ReadOnlyZero: Story = {
  args: {
    value: 0,
    readonly: true,
    children: 'Read-only - not started',
  },
};

/**
 * Read-only progress bar at 100%.
 */
export const ReadOnlyComplete: Story = {
  args: {
    value: 100,
    readonly: true,
    children: 'Read-only - complete',
  },
};

/**
 * Read-only progress bar with a custom min/max range.
 */
export const ReadOnlyCustomRange: Story = {
  args: {
    value: 30,
    min: 10,
    max: 60,
    readonly: true,
    children: 'Read-only - custom range',
  },
};

/* -------------------------------------------------------------------------
 * Indeterminate state (2)
 *
 * The underlying Ark/zag progress machine supports a `null` value to
 * represent an indeterminate state (no known completion amount), even
 * though this component's public `ProgressProps.value` is typed as
 * `number`. The cast below intentionally exercises that underlying
 * capability for documentation/QA purposes.
 * ---------------------------------------------------------------------- */

/**
 * Indeterminate progress bar (no known completion amount).
 */
export const Indeterminate: Story = {
  args: {
    value: null as unknown as number,
    children: 'Indeterminate progress',
  },
};

/**
 * Indeterminate vertical progress bar.
 */
export const IndeterminateVertical: Story = {
  args: {
    value: null as unknown as number,
    orientation: 'vertical',
    children: 'Indeterminate vertical',
  },
};

/* -------------------------------------------------------------------------
 * Label/value-text content (5)
 * ---------------------------------------------------------------------- */

/**
 * No children provided - falls back to the default "Loading..." label.
 */
export const NoChildrenDefaultLabel: Story = {
  args: {
    value: 55,
  },
};

/**
 * Empty string children - falsy, so it also falls back to the default
 * "Loading..." label.
 */
export const EmptyStringChildren: Story = {
  args: {
    value: 55,
    children: '',
  },
};

/**
 * Long label text wrapped inside a narrow container.
 */
export const LongLabelWrapping: Story = {
  args: {
    value: 42,
    children:
      'Synchronizing your files across all connected devices, this may take a few minutes depending on your connection speed',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '220px' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Label containing emoji alongside unicode text.
 */
export const UnicodeEmojiLabel: Story = {
  args: {
    value: 80,
    children: '🚀 Presque terminé !',
  },
};

/**
 * Label rendered right-to-left with Arabic unicode text.
 */
export const RTLLabel: Story = {
  args: {
    value: 65,
    children: 'جارٍ التحميل',
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
 * Kitchen-sink combinations (3)
 * ---------------------------------------------------------------------- */

/**
 * Kitchen sink: disabled, vertical orientation, custom range.
 */
export const KitchenSinkDisabledCustomRangeVertical: Story = {
  args: {
    value: 80,
    min: 0,
    max: 160,
    orientation: 'vertical',
    disabled: true,
    children: 'Kitchen sink: disabled + vertical + custom range',
  },
};

/**
 * Kitchen sink: read-only, long label, custom range.
 */
export const KitchenSinkReadOnlyLongLabelCustomRange: Story = {
  args: {
    value: 340,
    min: 100,
    max: 500,
    readonly: true,
    children:
      'Kitchen sink: read-only progress with a custom range and a fairly long descriptive label',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Kitchen sink: every prop combined at once.
 */
export const KitchenSinkAllPropsCombined: Story = {
  args: {
    value: 45,
    min: -50,
    max: 100,
    orientation: 'vertical',
    disabled: false,
    readonly: true,
    children: 'Kitchen sink: all props combined',
  },
};

/* -------------------------------------------------------------------------
 * Container/background context decorators (4)
 * ---------------------------------------------------------------------- */

/**
 * Progress bar constrained to a narrow container.
 */
export const NarrowContainer: Story = {
  args: {
    value: 55,
    children: 'Narrow container',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '150px' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Progress bar stretched inside a wide container.
 */
export const WideContainer: Story = {
  args: {
    value: 55,
    children: 'Wide container',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '800px' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Progress bar rendered on a dark background.
 */
export const OnDarkBackground: Story = {
  args: {
    value: 55,
    children: 'Works on dark backgrounds too',
  },
  decorators: [
    (Story) => (
      <div
        style={{ backgroundColor: '#0f172a', padding: '24px', borderRadius: '8px' }}
      >
        <Story />
      </div>
    ),
  ],
};

/**
 * Group of vertical progress bars inside a fixed-height container.
 */
export const FixedHeightVerticalGroup: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '24px',
        alignItems: 'flex-end',
        height: '260px',
        padding: '16px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
      }}
    >
      <Progress value={20} orientation="vertical" children="Low" />
      <Progress value={50} orientation="vertical" children="Mid" />
      <Progress value={90} orientation="vertical" children="High" />
    </div>
  ),
};

/* -------------------------------------------------------------------------
 * Realistic composite scenarios (2)
 * ---------------------------------------------------------------------- */

/**
 * A multi-step wizard progress indicator.
 */
export const StepWizardProgress: Story = {
  render: () => {
    const steps = [
      { label: 'Account details', value: 100 },
      { label: 'Shipping address', value: 100 },
      { label: 'Payment method', value: 66 },
      { label: 'Review order', value: 0 },
    ];

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '360px',
        }}
      >
        {steps.map((step) => (
          <Progress key={step.label} value={step.value} children={step.label} />
        ))}
      </div>
    );
  },
};

/**
 * A queue of file uploads at various stages, including one that failed to
 * start (0%) and one still in progress.
 */
export const UploadQueueList: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '380px',
        padding: '16px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
      }}
    >
      <Progress value={100} children="report.pdf" />
      <Progress value={62} children="presentation.pptx" />
      <Progress value={8} children="archive.zip" />
      <Progress value={0} children="pending-upload.docx" />
    </div>
  ),
};
