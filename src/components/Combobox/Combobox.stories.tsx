import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, within, userEvent, expect, waitFor, screen } from 'storybook/test';
import { useState } from 'react';
import Combobox from './Combobox';

const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Type of combobox - single or multiple selection',
    },
    value: {
      control: 'object',
      description: 'The controlled value of the combobox',
    },
    onValueChange: {
      description: 'Callback invoked when the value changes',
    },
    open: {
      control: 'boolean',
      description: 'The controlled open state of the combobox',
    },
    onOpenChange: {
      description: 'Callback invoked when the open state changes',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the combobox is disabled',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    name: {
      control: 'text',
      description: 'Name attribute for form submission',
    },
    required: {
      control: 'boolean',
      description: 'Whether the combobox is required',
    },
    items: {
      control: 'object',
      description: 'Array of items for the combobox',
    },
    label: {
      control: 'text',
      description: 'Label for the combobox',
    },
  },
  args: {
    onValueChange: fn(),
    onOpenChange: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default combobox with basic items
 */
export const Default: Story = {
  args: {
    label: 'Select a framework',
    placeholder: 'Choose a framework...',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid'],
  },
};

/**
 * Combobox with many items
 */
export const WithManyItems: Story = {
  args: {
    label: 'Select a country',
    placeholder: 'Search countries...',
    items: [
      'United States',
      'United Kingdom',
      'Canada',
      'Australia',
      'Germany',
      'France',
      'Italy',
      'Spain',
      'Netherlands',
      'Belgium',
      'Switzerland',
      'Sweden',
      'Norway',
      'Denmark',
      'Finland',
      'Poland',
      'Portugal',
      'Austria',
      'Ireland',
      'Greece',
    ],
  },
};

/**
 * Combobox in open state
 */
export const Open: Story = {
  args: {
    label: 'Select a framework',
    placeholder: 'Choose a framework...',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid'],
    open: true,
  },
};

/**
 * Disabled combobox
 */
export const Disabled: Story = {
  args: {
    label: 'Select a framework',
    placeholder: 'This combobox is disabled',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid'],
    disabled: true,
  },
};

/**
 * Required combobox
 */
export const Required: Story = {
  args: {
    label: 'Select a framework (required)',
    placeholder: 'Choose a framework...',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid'],
    required: true,
    name: 'framework',
  },
};

/**
 * Combobox with name attribute for form submission
 */
export const WithFormName: Story = {
  args: {
    label: 'Favorite programming language',
    placeholder: 'Select...',
    items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'Go', 'Rust'],
    name: 'programming-language',
  },
};

/**
 * Multiple selection combobox
 */
export const Multiple: Story = {
  args: {
    label: 'Select frameworks (multiple)',
    placeholder: 'Choose frameworks...',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid', 'Preact', 'Lit'],
    type: 'multiple',
  },
};

/**
 * Combobox without label
 */
export const WithoutLabel: Story = {
  args: {
    placeholder: 'Search...',
    items: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
  },
};

/**
 * Combobox with onValueChange handler
 */
export const WithChangeHandler: Story = {
  render: () => {
    const ComboboxWithHandler = () => {
      const [message, setMessage] = useState('');
      const items = ['React', 'Vue', 'Svelte', 'Angular', 'Solid'];

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Combobox
            label="Select a framework"
            placeholder="Choose a framework..."
            items={items}
            onValueChange={(details) => {
              setMessage(
                `Selected: ${details.value.length > 0 ? details.value.join(', ') : 'None'}`
              );
            }}
          />
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

    return <ComboboxWithHandler />;
  },
};

/**
 * Combobox with onOpenChange handler
 */
export const WithOpenChangeHandler: Story = {
  render: () => {
    const ComboboxWithOpenHandler = () => {
      const [isOpen, setIsOpen] = useState(false);
      const items = ['React', 'Vue', 'Svelte', 'Angular', 'Solid'];

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Combobox
            label="Select a framework"
            placeholder="Choose a framework..."
            items={items}
            open={isOpen}
            onOpenChange={(details) => setIsOpen(details.open)}
          />
          <div
            style={{
              padding: '12px',
              backgroundColor: '#f3f4f6',
              borderRadius: '6px',
              fontSize: '14px',
            }}
          >
            <strong>Dropdown state:</strong> {isOpen ? 'Open' : 'Closed'}
          </div>
        </div>
      );
    };

    return <ComboboxWithOpenHandler />;
  },
};

/**
 * Multiple comboboxes in a form
 */
export const InForm: Story = {
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
      }}
    >
      <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>
        Developer Survey
      </h3>
      <Combobox
        label="Primary Framework"
        placeholder="Select framework..."
        items={['React', 'Vue', 'Svelte', 'Angular', 'Solid']}
        name="framework"
        required
      />
      <Combobox
        label="Experience Level"
        placeholder="Select level..."
        items={['Beginner', 'Intermediate', 'Advanced', 'Expert']}
        name="experience"
        required
      />
      <Combobox
        label="Favorite Tool"
        placeholder="Select tool..."
        items={['VSCode', 'WebStorm', 'Sublime', 'Vim', 'Emacs']}
        name="tool"
      />
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
        Submit Survey
      </button>
    </form>
  ),
};

/**
 * Combobox with custom styling via wrapper
 */
export const CustomWidth: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <Combobox
        label="Select a framework"
        placeholder="Choose a framework..."
        items={['React', 'Vue', 'Svelte', 'Angular', 'Solid']}
      />
    </div>
  ),
};

/**
 * Small combobox
 */
export const SmallWidth: Story = {
  render: () => (
    <div style={{ width: '200px' }}>
      <Combobox
        label="Size"
        placeholder="Select..."
        items={['XS', 'S', 'M', 'L', 'XL', 'XXL']}
      />
    </div>
  ),
};

/**
 * Categories combobox
 */
export const Categories: Story = {
  args: {
    label: 'Select a category',
    placeholder: 'Choose a category...',
    items: [
      'Technology',
      'Science',
      'Health',
      'Business',
      'Entertainment',
      'Sports',
      'Politics',
      'Education',
      'Travel',
      'Food',
    ],
  },
};

/**
 * Programming languages combobox
 */
export const ProgrammingLanguages: Story = {
  args: {
    label: 'Favorite programming language',
    placeholder: 'Select a language...',
    items: [
      'JavaScript',
      'TypeScript',
      'Python',
      'Java',
      'C#',
      'C++',
      'Go',
      'Rust',
      'Ruby',
      'PHP',
      'Swift',
      'Kotlin',
    ],
  },
};

/* -------------------------------------------------------------------------
 * Filtering / autocomplete interaction (5)
 * ---------------------------------------------------------------------- */

/**
 * Typing into the input filters the option list down to matching items
 */
export const FilterAsYouType: Story = {
  args: {
    label: 'Select a framework',
    placeholder: 'Choose a framework...',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid'],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    await userEvent.type(input, 'rea');
    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'React' })).toBeInTheDocument();
    });
    expect(screen.queryByRole('option', { name: 'Vue' })).not.toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Svelte' })).not.toBeInTheDocument();
  },
};

/**
 * Typing text that matches nothing shows the "No results found" empty state
 */
export const FilterNoMatches: Story = {
  args: {
    label: 'Select a framework',
    placeholder: 'Choose a framework...',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid'],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    await userEvent.type(input, 'zzz-not-found');
    await waitFor(() => {
      expect(screen.getByText('No results found')).toBeInTheDocument();
    });
    expect(screen.queryAllByRole('option')).toHaveLength(0);
  },
};

/**
 * Filtering matches regardless of the letter casing typed
 */
export const FilterCaseInsensitive: Story = {
  args: {
    label: 'Select a framework',
    placeholder: 'Choose a framework...',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid'],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    await userEvent.type(input, 'REACT');
    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'React' })).toBeInTheDocument();
    });
  },
};

/**
 * Clearing the typed filter text restores the full item list
 */
export const ClearingInputRestoresFullList: Story = {
  args: {
    label: 'Select a framework',
    placeholder: 'Choose a framework...',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid'],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    await userEvent.type(input, 'rea');
    await waitFor(() => {
      expect(screen.queryAllByRole('option')).toHaveLength(1);
    });
    await userEvent.clear(input);
    await waitFor(() => {
      expect(screen.queryAllByRole('option')).toHaveLength(5);
    });
  },
};

/**
 * Selecting a filtered result replaces the input text with the chosen item
 */
export const FilterThenSelectUpdatesInput: Story = {
  args: {
    label: 'Select a framework',
    placeholder: 'Choose a framework...',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid'],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    await userEvent.type(input, 'sve');
    const option = await waitFor(() => screen.getByRole('option', { name: 'Svelte' }));
    await userEvent.click(option);
    await waitFor(() => {
      expect(input).toHaveValue('Svelte');
    });
  },
};

/* -------------------------------------------------------------------------
 * Clear trigger (3)
 * ---------------------------------------------------------------------- */

/**
 * The clear trigger stays hidden while no value has been selected
 */
export const ClearTriggerHiddenWhenNoValue: Story = {
  args: {
    label: 'Select a framework',
    placeholder: 'Choose a framework...',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid'],
  },
  play: async ({ canvasElement }) => {
    const clearButton = canvasElement.querySelector('[aria-label="Clear value"]');
    expect(clearButton).toHaveAttribute('hidden');
  },
};

/**
 * The clear trigger becomes visible once an item has been selected
 */
export const ClearTriggerVisibleAfterSelection: Story = {
  args: {
    label: 'Select a framework',
    placeholder: 'Choose a framework...',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid'],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Toggle suggestions' }));
    const option = await waitFor(() => screen.getByRole('option', { name: 'React' }));
    await userEvent.click(option);
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: 'Clear value' })).toBeVisible();
    });
  },
};

/**
 * Clicking the clear trigger removes the selected value and resets the input
 */
export const ClearTriggerRemovesSelectedValue: Story = {
  args: {
    label: 'Select a framework',
    placeholder: 'Choose a framework...',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid'],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    await userEvent.click(canvas.getByRole('button', { name: 'Toggle suggestions' }));
    const option = await waitFor(() => screen.getByRole('option', { name: 'React' }));
    await userEvent.click(option);
    await waitFor(() => expect(input).toHaveValue('React'));
    const clearButton = await waitFor(() =>
      canvas.getByRole('button', { name: 'Clear value' })
    );
    await userEvent.click(clearButton);
    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  },
};

/* -------------------------------------------------------------------------
 * Trigger button open/close (3)
 * ---------------------------------------------------------------------- */

/**
 * Clicking the trigger button opens the listbox
 */
export const OpenViaTriggerClick: Story = {
  args: {
    label: 'Select a framework',
    placeholder: 'Choose a framework...',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid'],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Toggle suggestions' }));
    await waitFor(() => {
      expect(canvas.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
    });
  },
};

/**
 * Clicking the trigger button a second time closes the listbox again
 */
export const CloseViaTriggerClickWhenOpen: Story = {
  args: {
    label: 'Select a framework',
    placeholder: 'Choose a framework...',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid'],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Toggle suggestions' });
    await userEvent.click(trigger);
    await waitFor(() => {
      expect(canvas.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
    });
    await userEvent.click(trigger);
    await waitFor(() => {
      expect(canvas.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
    });
  },
};

/**
 * Pressing Escape while the listbox is open closes it
 */
export const CloseViaEscapeKey: Story = {
  args: {
    label: 'Select a framework',
    placeholder: 'Choose a framework...',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid'],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Toggle suggestions' }));
    await waitFor(() => {
      expect(canvas.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
    });
    await userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(canvas.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
    });
  },
};

/* -------------------------------------------------------------------------
 * Keyboard navigation (5)
 * ---------------------------------------------------------------------- */

/**
 * ArrowDown on the focused input opens the listbox and highlights the first item
 */
export const ArrowDownOpensAndHighlightsFirstItem: Story = {
  args: {
    label: 'Select a framework',
    placeholder: 'Choose a framework...',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid'],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    input.focus();
    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'React' })).toHaveAttribute(
        'data-highlighted'
      );
    });
  },
};

/**
 * A second ArrowDown press moves the highlight to the next item
 */
export const ArrowDownMovesHighlightThroughItems: Story = {
  args: {
    label: 'Select a framework',
    placeholder: 'Choose a framework...',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid'],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    input.focus();
    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'React' })).toHaveAttribute(
        'data-highlighted'
      );
    });
    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Vue' })).toHaveAttribute(
        'data-highlighted'
      );
    });
  },
};

/**
 * Pressing Enter selects the currently highlighted item and closes the listbox
 */
export const EnterSelectsHighlightedItem: Story = {
  args: {
    label: 'Select a framework',
    placeholder: 'Choose a framework...',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid'],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    input.focus();
    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'React' })).toHaveAttribute(
        'data-highlighted'
      );
    });
    await userEvent.keyboard('{Enter}');
    await waitFor(() => {
      expect(input).toHaveValue('React');
      expect(input).toHaveAttribute('aria-expanded', 'false');
    });
  },
};

/**
 * Pressing Escape closes the listbox without selecting anything
 */
export const EscapeClosesWithoutSelecting: Story = {
  args: {
    label: 'Select a framework',
    placeholder: 'Choose a framework...',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid'],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    input.focus();
    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() => {
      expect(input).toHaveAttribute('aria-expanded', 'true');
    });
    await userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(input).toHaveAttribute('aria-expanded', 'false');
      expect(input).toHaveValue('');
    });
  },
};

/**
 * Tracks the highlighted option via aria-activedescendant on the input
 */
export const ActiveDescendantTracksHighlight: Story = {
  args: {
    label: 'Select a framework',
    placeholder: 'Choose a framework...',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid'],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    input.focus();
    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() => {
      const option = screen.getByRole('option', { name: 'React' });
      expect(input).toHaveAttribute('aria-activedescendant', option.id);
    });
  },
};

/* -------------------------------------------------------------------------
 * Multiple selection (4)
 * ---------------------------------------------------------------------- */

/**
 * Selecting an option in multiple mode keeps the listbox open
 */
export const MultipleSelectionKeepsDropdownOpen: Story = {
  args: {
    label: 'Select frameworks (multiple)',
    placeholder: 'Choose frameworks...',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid'],
    type: 'multiple',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    await userEvent.click(canvas.getByRole('button', { name: 'Toggle suggestions' }));
    const option = await waitFor(() => screen.getByRole('option', { name: 'React' }));
    await userEvent.click(option);
    await waitFor(() => {
      expect(input).toHaveAttribute('aria-expanded', 'true');
    });
  },
};

/**
 * Selecting two options in multiple mode accumulates both into the value
 */
export const MultipleSelectTwoItems: Story = {
  args: {
    label: 'Select frameworks (multiple)',
    placeholder: 'Choose frameworks...',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid'],
    type: 'multiple',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Toggle suggestions' }));
    const first = await waitFor(() => screen.getByRole('option', { name: 'React' }));
    await userEvent.click(first);
    const second = await waitFor(() => screen.getByRole('option', { name: 'Svelte' }));
    await userEvent.click(second);
    await waitFor(() => {
      expect(args.onValueChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ value: ['React', 'Svelte'] })
      );
    });
  },
};

/**
 * Clicking an already-selected option again deselects it in multiple mode
 */
export const MultipleDeselectByClickingAgain: Story = {
  args: {
    label: 'Select frameworks (multiple)',
    placeholder: 'Choose frameworks...',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid'],
    type: 'multiple',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Toggle suggestions' }));
    const option = await waitFor(() => screen.getByRole('option', { name: 'React' }));
    await userEvent.click(option);
    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'React' })).toHaveAttribute(
        'aria-selected',
        'true'
      );
    });
    await userEvent.click(screen.getByRole('option', { name: 'React' }));
    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'React' })).not.toHaveAttribute(
        'aria-selected'
      );
    });
  },
};

/**
 * Multiple combobox rendered with two values already pre-selected
 */
export const MultipleWithPreselectedValues: Story = {
  args: {
    label: 'Select frameworks (multiple)',
    placeholder: 'Choose frameworks...',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid'],
    type: 'multiple',
    value: ['React', 'Vue'],
    open: true,
  },
};

/* -------------------------------------------------------------------------
 * Controlled state fixtures (4)
 * ---------------------------------------------------------------------- */

/**
 * A controlled `value` fixture: an external button drives the selected value
 */
export const ControlledValueExternalUpdate: Story = {
  render: () => {
    const ControlledValueDemo = () => {
      const [value, setValue] = useState<string[]>([]);
      const items = ['React', 'Vue', 'Svelte', 'Angular', 'Solid'];

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Combobox
            label="Framework"
            items={items}
            value={value}
            onValueChange={(details) => setValue(details.value)}
          />
          <button onClick={() => setValue(['Vue'])}>Set value to Vue</button>
          <div style={{ fontSize: '14px' }}>Current value: {value.join(', ') || 'None'}</div>
        </div>
      );
    };

    return <ControlledValueDemo />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Set value to Vue' }));
    await waitFor(() => {
      expect(canvas.getByText('Current value: Vue')).toBeInTheDocument();
    });
  },
};

/**
 * A controlled `open` fixture: an external button toggles the popover open state
 */
export const ControlledOpenExternalToggle: Story = {
  render: () => {
    const ControlledOpenDemo = () => {
      const [open, setOpen] = useState(false);
      const items = ['React', 'Vue', 'Svelte', 'Angular', 'Solid'];

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <button onClick={() => setOpen((current) => !current)}>
            Toggle from outside
          </button>
          <Combobox
            label="Framework"
            items={items}
            open={open}
            onOpenChange={(details) => setOpen(details.open)}
          />
        </div>
      );
    };

    return <ControlledOpenDemo />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Toggle from outside' }));
    await waitFor(() => {
      expect(canvas.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
    });
  },
};

/**
 * A controlled `value` fixture where an external button clears the value
 */
export const ControlledValueClearedExternally: Story = {
  render: () => {
    const ClearableDemo = () => {
      const [value, setValue] = useState<string[]>(['React']);
      const items = ['React', 'Vue', 'Svelte', 'Angular', 'Solid'];

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Combobox
            label="Framework"
            items={items}
            value={value}
            onValueChange={(details) => setValue(details.value)}
          />
          <button onClick={() => setValue([])}>Clear value from outside</button>
          <div style={{ fontSize: '14px' }}>Current value: {value.join(', ') || 'None'}</div>
        </div>
      );
    };

    return <ClearableDemo />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Clear value from outside' }));
    await waitFor(() => {
      expect(canvas.getByText('Current value: None')).toBeInTheDocument();
    });
  },
};

/**
 * A controlled fixture combining a search input with a results counter driven
 * by the combobox's own onInputValueChange-powered filtering
 */
export const ControlledSearchAndSelectFixture: Story = {
  render: () => {
    const SearchDemo = () => {
      const [value, setValue] = useState<string[]>([]);
      const items = ['React', 'Vue', 'Svelte', 'Angular', 'Solid'];

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Combobox
            label="Framework"
            items={items}
            value={value}
            onValueChange={(details) => setValue(details.value)}
          />
          <div style={{ fontSize: '14px' }}>Selected: {value.join(', ') || 'None'}</div>
        </div>
      );
    };

    return <SearchDemo />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    await userEvent.type(input, 'sve');
    const option = await waitFor(() => screen.getByRole('option', { name: 'Svelte' }));
    await userEvent.click(option);
    await waitFor(() => {
      expect(canvas.getByText('Selected: Svelte')).toBeInTheDocument();
    });
  },
};

/* -------------------------------------------------------------------------
 * Disabled edge cases (2)
 * ---------------------------------------------------------------------- */

/**
 * A disabled combobox does not open its listbox when the trigger is clicked
 */
export const DisabledPreventsOpeningViaTrigger: Story = {
  args: {
    label: 'Select a framework',
    placeholder: 'This combobox is disabled',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid'],
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole('button', { name: 'Toggle suggestions' }),
      { pointerEventsCheck: 0 }
    );
    expect(canvas.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
  },
};

/**
 * A disabled combobox pre-populated with a value
 */
export const DisabledWithPreselectedValue: Story = {
  args: {
    label: 'Select a framework',
    placeholder: 'Choose a framework...',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid'],
    value: ['React'],
    disabled: true,
  },
};

/* -------------------------------------------------------------------------
 * Empty / sparse item lists (3)
 * ---------------------------------------------------------------------- */

/**
 * A combobox with no items available shows the empty state once opened
 */
export const EmptyItemsList: Story = {
  args: {
    label: 'Select an option',
    placeholder: 'No items available...',
    items: [],
    open: true,
  },
};

/**
 * A combobox with only a single selectable item
 */
export const SingleItemOnly: Story = {
  args: {
    label: 'Confirm',
    placeholder: 'Select...',
    items: ['Only Option'],
  },
};

/**
 * Items sharing a common prefix, used to exercise substring filtering
 */
export const ItemsWithSharedPrefix: Story = {
  args: {
    label: 'Select a language',
    placeholder: 'Search...',
    items: ['Java', 'JavaScript', 'Javanese'],
  },
};

/* -------------------------------------------------------------------------
 * Long / unicode content (3)
 * ---------------------------------------------------------------------- */

/**
 * Item labels long enough to wrap inside a narrow container
 */
export const LongItemLabelsWrapping: Story = {
  args: {
    label: 'Select a plan',
    placeholder: 'Choose a plan...',
    items: [
      'Enterprise plan with dedicated infrastructure and premium support',
      'Professional plan with advanced analytics and integrations',
      'Starter plan for individuals and small teams',
    ],
    open: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '220px' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Items containing unicode and emoji content
 */
export const UnicodeAndEmojiItems: Story = {
  args: {
    label: 'Select a status',
    placeholder: 'Choose a status...',
    items: ['✅ Confirmed 🎉', '⏳ Pending', '❌ Rejected', '🚀 Shipped'],
  },
};

/**
 * Items rendered right-to-left with Arabic unicode text
 */
export const RTLItemsAndLabel: Story = {
  args: {
    label: 'اختر خيارا',
    placeholder: 'ابحث...',
    items: ['أوافق على الشروط', 'أرفض الشروط', 'لست متأكدا'],
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
 * Kitchen-sink combinations (2)
 * ---------------------------------------------------------------------- */

/**
 * Kitchen sink: multiple selection, required, named, with a pre-selected value
 */
export const KitchenSinkMultipleRequiredNamedWithValue: Story = {
  args: {
    label: 'Select frameworks (multiple, required)',
    placeholder: 'Choose frameworks...',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid'],
    type: 'multiple',
    required: true,
    name: 'frameworks',
    value: ['React'],
  },
};

/**
 * Kitchen sink: controlled open state combined with typing to filter before selecting
 */
export const KitchenSinkControlledMultipleFilterInteractive: Story = {
  render: () => {
    const KitchenSinkDemo = () => {
      const [value, setValue] = useState<string[]>([]);
      const [open, setOpen] = useState(false);
      const items = ['React', 'Vue', 'Svelte', 'Angular', 'Solid', 'Preact', 'Lit'];

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Combobox
            label="Select frameworks (multiple)"
            items={items}
            type="multiple"
            value={value}
            onValueChange={(details) => setValue(details.value)}
            open={open}
            onOpenChange={(details) => setOpen(details.open)}
          />
          <div style={{ fontSize: '14px' }}>Selected: {value.join(', ') || 'None'}</div>
        </div>
      );
    };

    return <KitchenSinkDemo />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    await userEvent.type(input, 's');
    const svelte = await waitFor(() => screen.getByRole('option', { name: 'Svelte' }));
    await userEvent.click(svelte);
    await waitFor(() => {
      expect(canvas.getByText('Selected: Svelte')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(input).toHaveAttribute('aria-expanded', 'true');
    });
  },
};

/* -------------------------------------------------------------------------
 * Background/context (1)
 * ---------------------------------------------------------------------- */

/**
 * Combobox rendered on a dark background
 */
export const OnDarkBackground: Story = {
  args: {
    label: 'Select a framework',
    placeholder: 'Choose a framework...',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid'],
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#0f172a', padding: '24px', borderRadius: '8px' }}>
        <Story />
      </div>
    ),
  ],
};
