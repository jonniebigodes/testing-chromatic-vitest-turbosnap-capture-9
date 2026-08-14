import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, within, userEvent, expect } from 'storybook/test';
import { useState } from 'react';
import RatingGroup from './RatingGroup';

const meta = {
  title: 'Components/RatingGroup',
  component: RatingGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onValueChange: {
      description: 'Event handler called when the rating value changes',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the rating group is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the rating group is required',
    },
    name: {
      control: 'text',
      description: 'The name attribute for form submission',
    },
    min: {
      control: 'number',
      description: 'The minimum value of the rating',
    },
    max: {
      control: 'number',
      description: 'The maximum value of the rating',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the rating group is read-only',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: "The rating group's orientation",
    },
    children: {
      control: 'text',
      description: 'Label content to be rendered for the rating group',
    },
    value: {
      control: 'number',
      description: 'The controlled value of the rating',
    },
    defaultValue: {
      control: 'number',
      description: 'The default value when uncontrolled',
    },
  },
  args: {
    onValueChange: fn(),
  },
} satisfies Meta<typeof RatingGroup>;

export default meta;
type Story = StoryObj<typeof meta>;
type RenderStory = Omit<Story, 'args'> & { args?: Partial<Story['args']> };

/**
 * Default rating group with 5 stars
 */
export const Default: Story = {
  args: {
    defaultValue: 0,
  },
};

/**
 * Rating group with a label
 */
export const WithLabel: Story = {
  args: {
    defaultValue: 3,
    children: 'Rate this product',
  },
};

/**
 * Disabled rating group
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 3,
    children: 'Disabled rating',
  },
};

/**
 * Read-only rating group
 */
export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultValue: 4,
    children: 'Read-only rating',
  },
};

/**
 * Required rating group
 */
export const Required: Story = {
  args: {
    required: true,
    children: 'Required rating',
  },
};

/**
 * Rating group with name attribute
 */
export const WithName: Story = {
  args: {
    name: 'product-rating',
    defaultValue: 3,
    children: 'Product rating',
  },
};

/**
 * Rating group with custom max value
 */
export const CustomMax: Story = {
  args: {
    max: 10,
    defaultValue: 7,
    children: 'Rate out of 10',
  },
};

/**
 * Rating group with custom min and max
 */
export const CustomRange: Story = {
  args: {
    min: 1,
    max: 3,
    defaultValue: 2,
    children: 'Rate from 1 to 3',
  },
};

/**
 * Vertical orientation
 */
export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    defaultValue: 3,
    children: 'Vertical rating',
  },
};

/**
 * Rating starting at 5 stars
 */
export const FullRating: Story = {
  args: {
    defaultValue: 5,
    children: '5-star rating',
  },
};

/**
 * Rating starting at 0 stars
 */
export const EmptyRating: Story = {
  args: {
    defaultValue: 0,
    children: 'Not yet rated',
  },
};

/**
 * Controlled rating with state management
 */
export const Controlled: RenderStory = {
  render: () => {
    const ControlledRating = () => {
      const [value, setValue] = useState(3);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <RatingGroup
            value={value}
            onValueChange={(details) => setValue(details.value)}
          >
            Controlled rating
          </RatingGroup>
          <div
            style={{
              padding: '12px',
              backgroundColor: '#f3f4f6',
              borderRadius: '6px',
              fontSize: '14px',
            }}
          >
            <strong>Current rating:</strong> {value} / 5
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setValue(0)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              Clear
            </button>
            <button
              onClick={() => setValue(5)}
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
              Set to 5
            </button>
          </div>
        </div>
      );
    };

    return <ControlledRating />;
  },
};

/**
 * Rating with change handler
 */
export const WithChangeHandler: RenderStory = {
  render: () => {
    const RatingWithHandler = () => {
      const [message, setMessage] = useState('');

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <RatingGroup
            onValueChange={(details) => {
              setMessage(
                `You rated: ${details.value} star${details.value !== 1 ? 's' : ''}`
              );
            }}
          >
            Rate this item
          </RatingGroup>
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

    return <RatingWithHandler />;
  },
};

/**
 * Rating in a form
 */
export const InForm: RenderStory = {
  render: () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        alert(JSON.stringify(data, null, 2));
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '20px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        minWidth: '400px',
      }}
    >
      <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Product Review</h3>
      <RatingGroup name="quality" required>
        Quality (required)
      </RatingGroup>
      <RatingGroup name="value" required>
        Value for money (required)
      </RatingGroup>
      <RatingGroup name="design">Design (optional)</RatingGroup>
      <button
        type="submit"
        style={{
          padding: '10px 16px',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
        }}
      >
        Submit Review
      </button>
    </form>
  ),
};

/**
 * Multiple rating groups
 */
export const MultipleRatings: RenderStory = {
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
      <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>
        Rate Your Experience
      </h3>
      <RatingGroup defaultValue={4}>Overall Experience</RatingGroup>
      <RatingGroup defaultValue={5}>Customer Service</RatingGroup>
      <RatingGroup defaultValue={3}>Product Quality</RatingGroup>
      <RatingGroup defaultValue={4}>Delivery Speed</RatingGroup>
    </div>
  ),
};

/**
 * Product ratings showcase
 */
export const ProductShowcase: RenderStory = {
  render: () => {
    const products = [
      { name: 'Wireless Headphones', rating: 5 },
      { name: 'Laptop Stand', rating: 4 },
      { name: 'USB-C Hub', rating: 3 },
      { name: 'Mechanical Keyboard', rating: 5 },
    ];

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '20px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          minWidth: '400px',
        }}
      >
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>
          Product Ratings
        </h3>
        {products.map((product) => (
          <div
            key={product.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '12px',
              backgroundColor: '#f9fafb',
              borderRadius: '6px',
            }}
          >
            <span
              style={{
                flex: 1,
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
              }}
            >
              {product.name}
            </span>
            <RatingGroup defaultValue={product.rating} readOnly />
          </div>
        ))}
      </div>
    );
  },
};

/**
 * Vertical ratings side by side
 */
export const VerticalComparison: RenderStory = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '32px',
        padding: '20px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
      }}
    >
      <RatingGroup orientation="vertical" defaultValue={4}>
        Product A
      </RatingGroup>
      <RatingGroup orientation="vertical" defaultValue={3}>
        Product B
      </RatingGroup>
      <RatingGroup orientation="vertical" defaultValue={5}>
        Product C
      </RatingGroup>
    </div>
  ),
};

/* -------------------------------------------------------------------------
 * Required crossed with value/disabled/readOnly (3)
 * ---------------------------------------------------------------------- */

/**
 * Required rating group that is already pre-rated
 */
export const RequiredWithValue: Story = {
  args: {
    required: true,
    defaultValue: 4,
    children: 'Required rating (pre-rated)',
  },
};

/**
 * Required rating group that is also disabled
 */
export const RequiredDisabled: Story = {
  args: {
    required: true,
    disabled: true,
    children: 'This required rating is disabled',
  },
};

/**
 * Required rating group that is also read-only
 */
export const RequiredReadOnly: Story = {
  args: {
    required: true,
    readOnly: true,
    defaultValue: 3,
    children: 'Required and read-only rating',
  },
};

/* -------------------------------------------------------------------------
 * Disabled/read-only combinations (3)
 * ---------------------------------------------------------------------- */

/**
 * Disabled and read-only together
 */
export const DisabledReadOnly: Story = {
  args: {
    disabled: true,
    readOnly: true,
    defaultValue: 3,
    children: 'Disabled and read-only',
  },
};

/**
 * Disabled rating group that has no rating yet
 */
export const DisabledZeroValue: Story = {
  args: {
    disabled: true,
    defaultValue: 0,
    children: 'Disabled, not yet rated',
  },
};

/**
 * Read-only rating group that has no rating yet
 */
export const ReadOnlyZeroValue: Story = {
  args: {
    readOnly: true,
    defaultValue: 0,
    children: 'Read-only, not yet rated',
  },
};

/* -------------------------------------------------------------------------
 * Min/max -> count derivation variations (6)
 * ---------------------------------------------------------------------- */

/**
 * A single-star rating group (min equals max)
 */
export const SingleStarRating: Story = {
  args: {
    min: 1,
    max: 1,
    defaultValue: 1,
    children: 'Thumbs up (single star)',
  },
};

/**
 * A two-star rating group
 */
export const TwoStarRating: Story = {
  args: {
    min: 1,
    max: 2,
    defaultValue: 1,
    children: 'Rate from 1 to 2',
  },
};

/**
 * A ten-star rating group
 */
export const TenStarRating: Story = {
  args: {
    max: 10,
    defaultValue: 6,
    children: 'Rate out of 10',
  },
};

/**
 * An offset range from 3 to 7 (count derives to 5)
 */
export const OffsetRangeThreeToSeven: Story = {
  args: {
    min: 3,
    max: 7,
    defaultValue: 2,
    children: 'Rate from 3 to 7 (5 items rendered)',
  },
};

/**
 * An offset range starting at 2
 */
export const OffsetRangeStartAtTwo: Story = {
  args: {
    min: 2,
    max: 6,
    defaultValue: 3,
    children: 'Rate from 2 to 6 (5 items rendered)',
  },
};

/**
 * A large 20-item rating range
 */
export const LargeRangeTwenty: Story = {
  args: {
    max: 20,
    defaultValue: 12,
    children: 'Rate out of 20',
  },
};

/* -------------------------------------------------------------------------
 * Controlled vs uncontrolled interactive click-to-rate (4)
 * ---------------------------------------------------------------------- */

/**
 * Uncontrolled rating group: clicking a star commits the value directly
 */
export const ClickToRateUncontrolled: Story = {
  args: {
    defaultValue: 0,
    children: 'Click a star to rate',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const fourthStar = canvas.getByRole('radio', { name: '4 stars' });
    await userEvent.click(fourthStar);
    await expect(fourthStar).toHaveAttribute('aria-checked', 'true');
    await expect(args.onValueChange).toHaveBeenCalledWith(
      expect.objectContaining({ value: 4 })
    );
  },
};

/**
 * Controlled rating group backed by external state: clicking a star updates
 * the parent's state, which flows back down through the `value` prop
 */
export const ClickToRateControlledFixture: RenderStory = {
  render: () => {
    const ControlledClickFixture = () => {
      const [value, setValue] = useState(1);

      return (
        <RatingGroup
          value={value}
          onValueChange={(details) => setValue(details.value)}
        >
          Controlled click-to-rate ({value} / 5)
        </RatingGroup>
      );
    };

    return <ControlledClickFixture />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const fifthStar = canvas.getByRole('radio', { name: '5 stars' });
    await userEvent.click(fifthStar);
    await expect(fifthStar).toHaveAttribute('aria-checked', 'true');
  },
};

/**
 * A controlled rating group whose `value` prop is fixed by the parent;
 * clicking still notifies onValueChange, but the rendered value stays locked
 */
export const ControlledValueLockedIgnoresClick: Story = {
  args: {
    value: 2,
    children: 'Locked at 2 stars (parent never updates)',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const secondStar = canvas.getByRole('radio', { name: '2 stars' });
    await expect(secondStar).toHaveAttribute('aria-checked', 'true');
    const fifthStar = canvas.getByRole('radio', { name: '5 stars' });
    await userEvent.click(fifthStar);
    await expect(args.onValueChange).toHaveBeenCalledTimes(1);
    await expect(secondStar).toHaveAttribute('aria-checked', 'true');
  },
};

/**
 * A stateful fixture with an external "reset" button that pushes a new
 * value down through the controlled `value` prop
 */
export const ResetValueExternallyFixture: RenderStory = {
  render: () => {
    const ResetFixture = () => {
      const [value, setValue] = useState(4);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <RatingGroup value={value} onValueChange={(d) => setValue(d.value)}>
            Reset fixture ({value} / 5)
          </RatingGroup>
          <button onClick={() => setValue(0)}>Reset to 0</button>
        </div>
      );
    };

    return <ResetFixture />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const resetButton = canvas.getByRole('button', { name: 'Reset to 0' });
    await userEvent.click(resetButton);
    const firstStar = canvas.getByRole('radio', { name: '1 stars' });
    await expect(firstStar).toHaveAttribute('aria-checked', 'true');
  },
};

/* -------------------------------------------------------------------------
 * Keyboard interaction (4)
 * ---------------------------------------------------------------------- */

/**
 * Focusing the currently-rated star and pressing ArrowRight increases the
 * rating by one
 */
export const KeyboardArrowRightIncreases: Story = {
  args: {
    defaultValue: 2,
    children: 'Focus then press ArrowRight',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const secondStar = canvas.getByRole('radio', { name: '2 stars' });
    secondStar.focus();
    await userEvent.keyboard('{ArrowRight}');
    const thirdStar = canvas.getByRole('radio', { name: '3 stars' });
    await expect(thirdStar).toHaveAttribute('aria-checked', 'true');
  },
};

/**
 * Focusing the currently-rated star and pressing ArrowLeft decreases the
 * rating by one
 */
export const KeyboardArrowLeftDecreases: Story = {
  args: {
    defaultValue: 3,
    children: 'Focus then press ArrowLeft',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const thirdStar = canvas.getByRole('radio', { name: '3 stars' });
    thirdStar.focus();
    await userEvent.keyboard('{ArrowLeft}');
    const secondStar = canvas.getByRole('radio', { name: '2 stars' });
    await expect(secondStar).toHaveAttribute('aria-checked', 'true');
  },
};

/**
 * Pressing Home jumps the rating straight to the minimum item
 */
export const KeyboardHomeSetsMinimum: Story = {
  args: {
    defaultValue: 4,
    children: 'Focus then press Home',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const fourthStar = canvas.getByRole('radio', { name: '4 stars' });
    fourthStar.focus();
    await userEvent.keyboard('{Home}');
    const firstStar = canvas.getByRole('radio', { name: '1 stars' });
    await expect(firstStar).toHaveAttribute('aria-checked', 'true');
  },
};

/**
 * Pressing End jumps the rating straight to the maximum item
 */
export const KeyboardEndSetsMaximum: Story = {
  args: {
    defaultValue: 2,
    children: 'Focus then press End',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const secondStar = canvas.getByRole('radio', { name: '2 stars' });
    secondStar.focus();
    await userEvent.keyboard('{End}');
    const fifthStar = canvas.getByRole('radio', { name: '5 stars' });
    await expect(fifthStar).toHaveAttribute('aria-checked', 'true');
  },
};

/* -------------------------------------------------------------------------
 * Hover-preview highlighting (2)
 * ---------------------------------------------------------------------- */

/**
 * Hovering over a star previews the rating by highlighting every star up to
 * and including it, without committing the value
 */
export const HoverPreviewHighlightsStars: Story = {
  args: {
    defaultValue: 0,
    children: 'Hover to preview a rating',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const firstStar = canvas.getByRole('radio', { name: '1 stars' });
    const thirdStar = canvas.getByRole('radio', { name: '3 stars' });
    // Warm up the hover state before landing on the real target item.
    await userEvent.hover(firstStar);
    await userEvent.hover(thirdStar);
    await expect(thirdStar).toHaveAttribute('data-highlighted');
    await expect(args.onValueChange).not.toHaveBeenCalled();
  },
};

/**
 * Hovering to preview a rating and then clicking commits the previewed value
 */
export const HoverThenClickCommitsValue: Story = {
  args: {
    defaultValue: 0,
    children: 'Hover then click to commit',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const firstStar = canvas.getByRole('radio', { name: '1 stars' });
    const fourthStar = canvas.getByRole('radio', { name: '4 stars' });
    await userEvent.hover(firstStar);
    await userEvent.hover(fourthStar);
    await userEvent.click(fourthStar);
    await expect(fourthStar).toHaveAttribute('aria-checked', 'true');
    await expect(args.onValueChange).toHaveBeenCalledWith(
      expect.objectContaining({ value: 4 })
    );
  },
};

/* -------------------------------------------------------------------------
 * Orientation combinations (2)
 * ---------------------------------------------------------------------- */

/**
 * Vertical orientation combined with a label and a pre-set value
 */
export const VerticalWithLabelAndValue: Story = {
  args: {
    orientation: 'vertical',
    defaultValue: 4,
    children: 'Vertical rating with a label',
  },
};

/**
 * Horizontal orientation explicitly set together with a custom min/max range
 */
export const HorizontalCustomRangeExplicit: Story = {
  args: {
    orientation: 'horizontal',
    min: 1,
    max: 7,
    defaultValue: 5,
    children: 'Horizontal, rate out of 7',
  },
};

/* -------------------------------------------------------------------------
 * Form name/required scenarios (2)
 * ---------------------------------------------------------------------- */

/**
 * Name and required combined, verified against the hidden input in the DOM
 */
export const FormNameAndRequiredCombo: Story = {
  args: {
    name: 'service-rating',
    required: true,
    defaultValue: 0,
    children: 'Service rating (required, check the DOM for name)',
  },
  play: async ({ canvasElement }) => {
    const hiddenInput = canvasElement.querySelector('input');
    await expect(hiddenInput).toHaveAttribute('name', 'service-rating');
    await expect(hiddenInput).toHaveAttribute('required');
  },
};

/**
 * No name provided: the hidden input falls back to Ark UI's default "rating"
 * form field name
 */
export const NoNameProvidedDefaultsToRating: Story = {
  args: {
    defaultValue: 0,
    children: 'No name provided (check the DOM for the default name)',
  },
  play: async ({ canvasElement }) => {
    const hiddenInput = canvasElement.querySelector('input');
    await expect(hiddenInput).toHaveAttribute('name', 'rating');
  },
};

/* -------------------------------------------------------------------------
 * Value edge cases (2)
 * ---------------------------------------------------------------------- */

/**
 * A mid-range value on an odd-sized custom count
 */
export const OddCountMidValue: Story = {
  args: {
    max: 7,
    defaultValue: 4,
    children: 'Rate out of 7 (mid value)',
  },
};

/**
 * A fully-rated value on a custom offset range
 */
export const FullRatingAtCustomRange: Story = {
  args: {
    min: 2,
    max: 8,
    defaultValue: 7,
    children: 'Full rating on a 2-8 range (7 items rendered)',
  },
};

/* -------------------------------------------------------------------------
 * Kitchen-sink combinations (3)
 * ---------------------------------------------------------------------- */

/**
 * Kitchen sink: disabled, required, named, with a pre-set value
 */
export const KitchenSinkDisabledRequiredNamed: Story = {
  args: {
    disabled: true,
    required: true,
    name: 'kitchenSinkRating',
    defaultValue: 3,
    children: 'Kitchen sink: disabled + required + named',
  },
};

/**
 * Kitchen sink: read-only, vertical orientation, and a custom min/max range
 */
export const KitchenSinkReadOnlyVerticalCustomRange: Story = {
  args: {
    readOnly: true,
    orientation: 'vertical',
    min: 1,
    max: 8,
    defaultValue: 6,
    children: 'Kitchen sink: read-only + vertical + custom range',
  },
};

/**
 * Kitchen sink: controlled value, required, named, and vertical orientation
 * combined in a single interactive fixture
 */
export const KitchenSinkControlledRequiredNamedVertical: RenderStory = {
  render: () => {
    const KitchenSinkFixture = () => {
      const [value, setValue] = useState(2);

      return (
        <RatingGroup
          value={value}
          onValueChange={(details) => setValue(details.value)}
          required
          name="kitchenSinkControlled"
          orientation="vertical"
        >
          Kitchen sink controlled ({value} / 5)
        </RatingGroup>
      );
    };

    return <KitchenSinkFixture />;
  },
};

/* -------------------------------------------------------------------------
 * Accessibility / background context (2)
 * ---------------------------------------------------------------------- */

/**
 * Confirms each star item exposes an accessible, positional aria-label for
 * assistive technology
 */
export const AccessibleValueText: Story = {
  args: {
    defaultValue: 3,
    children: 'Accessible rating',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const thirdStar = canvas.getByRole('radio', { name: '3 stars' });
    await expect(thirdStar).toHaveAttribute('aria-checked', 'true');
    await expect(thirdStar).toHaveAttribute('aria-posinset', '3');
  },
};

/**
 * Rating group rendered on a dark background
 */
export const OnDarkBackground: RenderStory = {
  render: (args) => (
    <div
      style={{
        backgroundColor: '#0f172a',
        padding: '24px',
        borderRadius: '8px',
      }}
    >
      <RatingGroup {...args} />
    </div>
  ),
  args: {
    defaultValue: 4,
    children: 'Works on dark backgrounds too',
  },
};
