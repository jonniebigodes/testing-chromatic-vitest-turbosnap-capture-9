import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, within, userEvent, expect, screen, waitFor } from 'storybook/test';
import { useState } from 'react';
import Select, { type SelectItem } from './Select';

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'The type of select - single or multiple selection',
    },
    value: {
      control: 'object',
      description: 'The current value of the select as an array',
    },
    onValueChange: {
      description: 'Event handler called when the select value changes',
    },
    open: {
      control: 'boolean',
      description: 'Whether the select dropdown is open',
    },
    onOpenChange: {
      description: 'Event handler called when the open state changes',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no value is selected',
    },
    name: {
      control: 'text',
      description: 'The name attribute for form submission',
    },
    required: {
      control: 'boolean',
      description: 'Whether the select is required',
    },
    items: {
      control: 'object',
      description: 'Array of items to display in the select',
    },
    children: {
      control: 'text',
      description: 'Label content to be rendered for the select',
    },
  },
  args: {
    onValueChange: fn(),
    onOpenChange: fn(),
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;
type RenderStory = Omit<Story, 'args'> & { args?: Partial<Story['args']> };

const frameworks: SelectItem[] = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Solid', value: 'solid' },
];

const countries: SelectItem[] = [
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' },
  { label: 'Australia', value: 'au' },
];

/**
 * Default select with a list of frameworks
 */
export const Default: Story = {
  args: {
    items: frameworks,
    children: 'Framework',
  },
};

/**
 * Select with open state
 */
export const Open: Story = {
  args: {
    items: frameworks,
    open: true,
    children: 'Framework',
  },
};

/**
 * Disabled select
 */
export const Disabled: Story = {
  args: {
    items: frameworks,
    disabled: true,
    children: 'Framework (disabled)',
  },
};

/**
 * Select with custom placeholder
 */
export const CustomPlaceholder: Story = {
  args: {
    items: frameworks,
    placeholder: 'Choose your framework...',
    children: 'Framework',
  },
};

/**
 * Select without label
 */
export const WithoutLabel: Story = {
  args: {
    items: frameworks,
    placeholder: 'Select a framework',
  },
};

/**
 * Select with required attribute
 */
export const Required: Story = {
  args: {
    items: frameworks,
    required: true,
    children: 'Framework (required)',
  },
};

/**
 * Select with name attribute for form submission
 */
export const WithName: Story = {
  args: {
    items: frameworks,
    name: 'framework',
    children: 'Framework',
  },
};

/**
 * Multiple selection mode
 */
export const Multiple: Story = {
  args: {
    items: frameworks,
    type: 'multiple',
    children: 'Select frameworks',
    placeholder: 'Select one or more frameworks',
  },
};

/**
 * Select with many items
 */
export const ManyItems: Story = {
  args: {
    items: [
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue' },
      { label: 'Angular', value: 'angular' },
      { label: 'Svelte', value: 'svelte' },
      { label: 'Solid', value: 'solid' },
      { label: 'Ember', value: 'ember' },
      { label: 'Preact', value: 'preact' },
      { label: 'Alpine', value: 'alpine' },
      { label: 'Lit', value: 'lit' },
      { label: 'Qwik', value: 'qwik' },
      { label: 'Astro', value: 'astro' },
      { label: 'Next.js', value: 'nextjs' },
      { label: 'Nuxt', value: 'nuxt' },
      { label: 'Remix', value: 'remix' },
      { label: 'SvelteKit', value: 'sveltekit' },
    ],
    children: 'Framework',
    placeholder: 'Select a framework',
  },
};

/**
 * Select with disabled items
 */
export const WithDisabledItems: Story = {
  args: {
    items: [
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue' },
      { label: 'Angular', value: 'angular', disabled: true },
      { label: 'Svelte', value: 'svelte' },
      { label: 'Solid', value: 'solid', disabled: true },
    ],
    children: 'Framework',
  },
};

/**
 * Controlled select with state management
 */
export const Controlled: RenderStory = {
  render: () => {
    const ControlledSelect = () => {
      const [value, setValue] = useState<string[]>([]);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Select
            items={frameworks}
            value={value}
            onValueChange={(details) => setValue(details.value)}
          >
            Framework
          </Select>
          <div
            style={{
              padding: '12px',
              backgroundColor: '#f3f4f6',
              borderRadius: '6px',
              fontSize: '14px',
            }}
          >
            <strong>Selected value:</strong>{' '}
            {value.length > 0 ? value.join(', ') : 'None'}
          </div>
          <button
            onClick={() => setValue(['react'])}
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
            Select React
          </button>
        </div>
      );
    };

    return <ControlledSelect />;
  },
};

/**
 * Select with change handler
 */
export const WithChangeHandler: RenderStory = {
  render: () => {
    const SelectWithHandler = () => {
      const [message, setMessage] = useState('');

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Select
            items={frameworks}
            onValueChange={(details) => {
              const selected =
                details.value.length > 0 ? details.value.join(', ') : 'None';
              setMessage(`Selected: ${selected}`);
            }}
          >
            Framework
          </Select>
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

    return <SelectWithHandler />;
  },
};

/**
 * Select with open state handler
 */
export const WithOpenChangeHandler: RenderStory = {
  render: () => {
    const SelectWithOpenHandler = () => {
      const [message, setMessage] = useState('');

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Select
            items={frameworks}
            onOpenChange={(details) => {
              setMessage(details.open ? 'Dropdown opened' : 'Dropdown closed');
            }}
          >
            Framework
          </Select>
          {message && (
            <div
              style={{
                padding: '12px',
                backgroundColor: '#fef3c7',
                color: '#92400e',
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

    return <SelectWithOpenHandler />;
  },
};

/**
 * Select in a form
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
      <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>
        User Preferences
      </h3>
      <Select items={frameworks} name="framework" required>
        Preferred Framework
      </Select>
      <Select items={countries} name="country" required>
        Country
      </Select>
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
        Submit
      </button>
    </form>
  ),
};

/**
 * Multiple selects with different values
 */
export const MultipleSelects: RenderStory = {
  render: () => {
    const MultipleSelectsComponent = () => {
      const [framework, setFramework] = useState<string[]>([]);
      const [country, setCountry] = useState<string[]>([]);

      return (
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
            Multiple Independent Selects
          </h3>
          <Select
            items={frameworks}
            value={framework}
            onValueChange={(details) => setFramework(details.value)}
          >
            Framework
          </Select>
          <Select
            items={countries}
            value={country}
            onValueChange={(details) => setCountry(details.value)}
          >
            Country
          </Select>
          <div
            style={{
              padding: '12px',
              backgroundColor: '#f3f4f6',
              borderRadius: '6px',
              fontSize: '14px',
            }}
          >
            <div>
              <strong>Framework:</strong>{' '}
              {framework.length > 0 ? framework.join(', ') : 'None'}
            </div>
            <div>
              <strong>Country:</strong>{' '}
              {country.length > 0 ? country.join(', ') : 'None'}
            </div>
          </div>
        </div>
      );
    };

    return <MultipleSelectsComponent />;
  },
};

const rtlItems: SelectItem[] = [
  { label: 'العربية', value: 'ar' },
  { label: 'فرنسي', value: 'fr' },
  { label: 'إنجليزي', value: 'en' },
];

const emojiItems: SelectItem[] = [
  { label: '🍎 Apple', value: 'apple' },
  { label: '🍌 Banana', value: 'banana' },
  { label: '🍇 Grape', value: 'grape' },
];

const singleItemList: SelectItem[] = [{ label: 'Only Option', value: 'only' }];

const twoItemList: SelectItem[] = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];

const disabledFrameworks: SelectItem[] = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue', disabled: true },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
];

const allDisabledItems: SelectItem[] = [
  { label: 'Option A', value: 'a', disabled: true },
  { label: 'Option B', value: 'b', disabled: true },
  { label: 'Option C', value: 'c', disabled: true },
];

/**
 * Opens the select via the trigger and waits for the listbox to both mount
 * and receive focus (it auto-focuses itself asynchronously on open) before
 * returning, so that a subsequent keyboard interaction is guaranteed to
 * target the listbox rather than a not-yet-blurred trigger button.
 */
const openAndAwaitListboxFocus = async (trigger: HTMLElement) => {
  await userEvent.click(trigger);
  const listbox = await screen.findByRole('listbox');
  await waitFor(() => expect(document.activeElement).toBe(listbox));
  return listbox;
};

/* -------------------------------------------------------------------------
 * Required crossed with open/disabled (2)
 * ---------------------------------------------------------------------- */

/**
 * Required select that starts open
 */
export const RequiredOpen: Story = {
  args: {
    items: frameworks,
    required: true,
    open: true,
    children: 'Framework (required, open)',
  },
};

/**
 * Required select that is also disabled
 */
export const RequiredDisabled: Story = {
  args: {
    items: frameworks,
    required: true,
    disabled: true,
    children: 'Framework (required, disabled)',
  },
};

/* -------------------------------------------------------------------------
 * Disabled item combinations (2)
 * ---------------------------------------------------------------------- */

/**
 * Disabled item collection where one item is already selected as the value
 */
export const DisabledItemWithPreselectedValue: Story = {
  args: {
    items: disabledFrameworks,
    value: ['react'],
    children: 'Framework',
  },
};

/**
 * Every item in the collection is disabled
 */
export const AllItemsDisabled: Story = {
  args: {
    items: allDisabledItems,
    children: 'All options disabled',
  },
};

/* -------------------------------------------------------------------------
 * Item count edge cases (2)
 * ---------------------------------------------------------------------- */

/**
 * A collection containing only a single selectable item
 */
export const SingleItemCollection: Story = {
  args: {
    items: singleItemList,
    children: 'Single item',
  },
};

/**
 * A minimal two-item collection, useful for exercising boundary keyboard nav
 */
export const TwoItemCollection: Story = {
  args: {
    items: twoItemList,
    children: 'Two items',
  },
};

/* -------------------------------------------------------------------------
 * Long/narrow label content (2)
 * ---------------------------------------------------------------------- */

/**
 * Item labels long enough to test wrapping/truncation inside a narrow content panel
 */
export const LongItemLabelsNarrowContainer: Story = {
  args: {
    items: [
      { label: 'A very long option label that describes a lot of detail', value: 'long1' },
      { label: 'Another extensively descriptive option label for testing', value: 'long2' },
      { label: 'Short', value: 'short' },
    ],
    children: 'Framework',
  },
  decorators: [
    (StoryFn) => (
      <div style={{ maxWidth: '220px' }}>
        <StoryFn />
      </div>
    ),
  ],
};

/**
 * The select's own label content is a long sentence
 */
export const LongSelectLabelText: Story = {
  args: {
    items: frameworks,
    children:
      'Please choose your preferred JavaScript framework from the list of options below',
  },
};

/* -------------------------------------------------------------------------
 * RTL/unicode/emoji item content (2)
 * ---------------------------------------------------------------------- */

/**
 * Select rendered right-to-left with Arabic item labels
 */
export const RTLItemsAndLabel: Story = {
  args: {
    items: rtlItems,
    children: 'اللغة',
  },
  decorators: [
    (StoryFn) => (
      <div dir="rtl">
        <StoryFn />
      </div>
    ),
  ],
};

/**
 * Item labels containing emoji alongside text
 */
export const UnicodeEmojiItems: Story = {
  args: {
    items: emojiItems,
    children: 'Favorite fruit',
  },
};

/* -------------------------------------------------------------------------
 * Name/value form-submission scenarios (2)
 * ---------------------------------------------------------------------- */

/**
 * Multiple-selection type combined with a name attribute for form submission
 */
export const MultipleTypeWithName: Story = {
  args: {
    items: frameworks,
    type: 'multiple',
    name: 'frameworks',
    children: 'Frameworks (multiple)',
  },
};

/**
 * Select with no name attribute provided at all
 */
export const NoNameProvided: Story = {
  args: {
    items: frameworks,
    children: 'Framework (no name attribute)',
  },
};

/* -------------------------------------------------------------------------
 * Controlled open state (2)
 * ---------------------------------------------------------------------- */

/**
 * Open state fully controlled by the parent via a toggle button
 */
export const ControlledOpenState: RenderStory = {
  render: () => {
    const ControlledOpenSelect = () => {
      const [open, setOpen] = useState(false);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Select
            items={frameworks}
            open={open}
            onOpenChange={(details) => setOpen(details.open)}
          >
            Framework
          </Select>
          <button
            onClick={() => setOpen((current) => !current)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Toggle open from outside
          </button>
        </div>
      );
    };

    return <ControlledOpenSelect />;
  },
};

/**
 * Both open state and value are controlled by the parent simultaneously
 */
export const ControlledOpenAndValue: RenderStory = {
  render: () => {
    const FullyControlledSelect = () => {
      const [open, setOpen] = useState(false);
      const [value, setValue] = useState<string[]>(['vue']);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Select
            items={frameworks}
            open={open}
            onOpenChange={(details) => setOpen(details.open)}
            value={value}
            onValueChange={(details) => setValue(details.value)}
          >
            Framework
          </Select>
          <div style={{ fontSize: '14px' }}>
            Value: {value.join(', ') || 'None'} | Open: {open ? 'yes' : 'no'}
          </div>
        </div>
      );
    };

    return <FullyControlledSelect />;
  },
};

/* -------------------------------------------------------------------------
 * Background/container context (1)
 * ---------------------------------------------------------------------- */

/**
 * Select rendered on a dark background
 */
export const OnDarkBackground: Story = {
  args: {
    items: frameworks,
    children: 'Works on dark backgrounds too',
  },
  decorators: [
    (StoryFn) => (
      <div style={{ backgroundColor: '#0f172a', padding: '24px', borderRadius: '8px' }}>
        <StoryFn />
      </div>
    ),
  ],
};

/* -------------------------------------------------------------------------
 * Kitchen-sink combinations (2)
 * ---------------------------------------------------------------------- */

/**
 * Kitchen sink: required, named, multiple selection, with a preset value
 */
export const KitchenSinkRequiredMultipleNamed: Story = {
  args: {
    items: frameworks,
    type: 'multiple',
    required: true,
    name: 'kitchenSinkFrameworks',
    value: ['react', 'vue'],
    children: 'Kitchen sink: required + multiple + named',
  },
};

/**
 * Kitchen sink: disabled select with a preselected value and disabled items in the list
 */
export const KitchenSinkDisabledPreselected: Story = {
  args: {
    items: disabledFrameworks,
    disabled: true,
    value: ['react'],
    required: true,
    name: 'kitchenSinkDisabled',
    children: 'Kitchen sink: disabled + preselected',
  },
};

/* -------------------------------------------------------------------------
 * Open/close interaction (4)
 * ---------------------------------------------------------------------- */

/**
 * Clicking the trigger opens the listbox
 */
export const OpensOnTriggerClick: Story = {
  args: {
    items: frameworks,
    children: 'Framework',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    await userEvent.click(trigger);
    const listbox = await screen.findByRole('listbox');
    await expect(listbox).toBeInTheDocument();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  },
};

/**
 * Clicking the trigger a second time closes the listbox
 */
export const ClosesOnTriggerClickToggle: Story = {
  args: {
    items: frameworks,
    children: 'Framework',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    await openAndAwaitListboxFocus(trigger);
    await userEvent.click(trigger);
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
  },
};

/**
 * Pressing Escape while open closes the listbox
 */
export const ClosesOnEscapeKey: Story = {
  args: {
    items: frameworks,
    children: 'Framework',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    await openAndAwaitListboxFocus(trigger);
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
  },
};

/**
 * Clicking outside of the open listbox closes it
 */
export const ClosesOnOutsideClick: RenderStory = {
  render: (args) => (
    <div>
      <Select {...args} />
      <button
        type="button"
        style={{ position: 'fixed', top: 0, left: 0 }}
      >
        Outside
      </button>
    </div>
  ),
  args: {
    items: frameworks,
    children: 'Framework',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    await openAndAwaitListboxFocus(trigger);
    await userEvent.click(canvas.getByRole('button', { name: 'Outside' }));
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
  },
};

/* -------------------------------------------------------------------------
 * Selecting items (3)
 * ---------------------------------------------------------------------- */

/**
 * Clicking an item in single-selection mode selects it and closes the listbox
 */
export const SelectsItemOnClickSingle: Story = {
  args: {
    items: frameworks,
    children: 'Framework',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    await userEvent.click(trigger);
    const option = await screen.findByRole('option', { name: 'Vue' });
    await userEvent.click(option);
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
    await expect(trigger).toHaveTextContent('Vue');
    await expect(args.onValueChange).toHaveBeenCalledWith(
      expect.objectContaining({ value: ['vue'] })
    );
  },
};

/**
 * Multiple selection accumulates checkmarks and keeps the listbox open
 */
export const MultipleSelectionAccumulatesCheckmarks: Story = {
  args: {
    items: frameworks,
    type: 'multiple',
    children: 'Frameworks',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    await userEvent.click(trigger);
    const reactOption = await screen.findByRole('option', { name: 'React' });
    await userEvent.click(reactOption);
    const vueOption = await screen.findByRole('option', { name: 'Vue' });
    await userEvent.click(vueOption);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(reactOption).toHaveAttribute('aria-selected', 'true');
    await expect(vueOption).toHaveAttribute('aria-selected', 'true');
  },
};

/**
 * Clicking a disabled item has no effect on the value or open state
 */
export const ClickingDisabledItemIsNoop: Story = {
  args: {
    items: disabledFrameworks,
    children: 'Framework',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    await userEvent.click(trigger);
    const disabledOption = await screen.findByRole('option', { name: 'Vue' });
    await userEvent.click(disabledOption, { pointerEventsCheck: 0 });
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(args.onValueChange).not.toHaveBeenCalled();
  },
};

/* -------------------------------------------------------------------------
 * Keyboard navigation (6)
 * ---------------------------------------------------------------------- */

/**
 * Pressing ArrowDown after opening highlights the first item
 */
export const ArrowDownHighlightsFirstItem: Story = {
  args: {
    items: frameworks,
    children: 'Framework',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    await openAndAwaitListboxFocus(trigger);
    await userEvent.keyboard('{ArrowDown}');
    const firstOption = await screen.findByRole('option', { name: 'React' });
    await waitFor(() => expect(firstOption).toHaveAttribute('data-highlighted'));
  },
};

/**
 * Pressing ArrowDown repeatedly moves the highlight forward through the list
 */
export const ArrowDownThenArrowDownMovesHighlight: Story = {
  args: {
    items: frameworks,
    children: 'Framework',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    await openAndAwaitListboxFocus(trigger);
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowDown}');
    const secondOption = await screen.findByRole('option', { name: 'Vue' });
    await waitFor(() => expect(secondOption).toHaveAttribute('data-highlighted'));
  },
};

/**
 * Pressing ArrowUp while the trigger is focused (but closed) opens the
 * listbox with the last item highlighted
 */
export const ArrowUpFromClosedHighlightsLastItem: Story = {
  args: {
    items: frameworks,
    children: 'Framework',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    trigger.focus();
    await userEvent.keyboard('{ArrowUp}');
    const lastOption = await screen.findByRole('option', { name: 'Solid' });
    await waitFor(() => expect(lastOption).toHaveAttribute('data-highlighted'));
  },
};

/**
 * The Home key jumps the highlight to the first item
 */
export const HomeKeyHighlightsFirstItem: Story = {
  args: {
    items: frameworks,
    children: 'Framework',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    await openAndAwaitListboxFocus(trigger);
    await userEvent.keyboard('{End}');
    await userEvent.keyboard('{Home}');
    const firstOption = await screen.findByRole('option', { name: 'React' });
    await waitFor(() => expect(firstOption).toHaveAttribute('data-highlighted'));
  },
};

/**
 * The End key jumps the highlight to the last item
 */
export const EndKeyHighlightsLastItem: Story = {
  args: {
    items: frameworks,
    children: 'Framework',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    await openAndAwaitListboxFocus(trigger);
    await userEvent.keyboard('{End}');
    const lastOption = await screen.findByRole('option', { name: 'Solid' });
    await waitFor(() => expect(lastOption).toHaveAttribute('data-highlighted'));
  },
};

/**
 * Disabled items are skipped over when navigating with the arrow keys
 */
export const DisabledItemsSkippedDuringArrowNav: Story = {
  args: {
    items: disabledFrameworks,
    children: 'Framework',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    await openAndAwaitListboxFocus(trigger);
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowDown}');
    const angularOption = await screen.findByRole('option', { name: 'Angular' });
    await waitFor(() => expect(angularOption).toHaveAttribute('data-highlighted'));
    const vueOption = screen.getByRole('option', { name: 'Vue' });
    await expect(vueOption).not.toHaveAttribute('data-highlighted');
  },
};

/* -------------------------------------------------------------------------
 * Selection via keyboard + typeahead (3)
 * ---------------------------------------------------------------------- */

/**
 * Pressing Enter selects the currently highlighted item and closes the listbox
 */
export const EnterKeySelectsHighlightedItem: Story = {
  args: {
    items: frameworks,
    children: 'Framework',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    await openAndAwaitListboxFocus(trigger);
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
    await expect(args.onValueChange).toHaveBeenCalledWith(
      expect.objectContaining({ value: ['react'] })
    );
  },
};

/**
 * Pressing Space selects the highlighted item; in multiple mode the listbox
 * stays open afterwards
 */
export const SpaceKeySelectsHighlightedItem: Story = {
  args: {
    items: frameworks,
    type: 'multiple',
    children: 'Frameworks',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    await openAndAwaitListboxFocus(trigger);
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard(' ');
    await expect(args.onValueChange).toHaveBeenCalledWith(
      expect.objectContaining({ value: ['react'] })
    );
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  },
};

/**
 * Typing a letter jumps the highlight to the first matching item (typeahead)
 */
export const TypeaheadJumpsToMatchingItem: Story = {
  args: {
    items: frameworks,
    children: 'Framework',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    await openAndAwaitListboxFocus(trigger);
    await userEvent.keyboard('a');
    const angularOption = await screen.findByRole('option', { name: 'Angular' });
    await waitFor(() => expect(angularOption).toHaveAttribute('data-highlighted'));
  },
};

/* -------------------------------------------------------------------------
 * Focus / form submission (2)
 * ---------------------------------------------------------------------- */

/**
 * The trigger is reachable via Tab
 */
export const TabFocusesTrigger: Story = {
  args: {
    items: frameworks,
    children: 'Framework',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    await expect(trigger).toHaveFocus();
  },
};

/**
 * Submits a form and displays the captured FormData inline, exercising the
 * hidden native select used for form submission
 */
export const FormSubmissionCapturesSelectedValues: RenderStory = {
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
          <Select items={frameworks} name="framework">
            Framework
          </Select>
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    await userEvent.click(trigger);
    const option = await screen.findByRole('option', { name: 'Angular' });
    await userEvent.click(option);
    await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));
    await expect(canvas.getByText(/"framework": ?"angular"/)).toBeInTheDocument();
  },
};
