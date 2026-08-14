import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, within, userEvent, expect } from 'storybook/test';
import { useState } from 'react';
import RadioGroup, { type RadioOption } from './RadioGroup';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onValueChange: {
      description: 'Event handler called when the selected value changes',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio group is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the radio group is required',
    },
    name: {
      control: 'text',
      description: 'The name attribute for form submission',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: "The radio group's orientation",
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the radio group is read-only',
    },
    children: {
      control: 'text',
      description: 'Label content to be rendered for the radio group',
    },
    value: {
      control: 'text',
      description: 'The controlled value of the radio group',
    },
    defaultValue: {
      control: 'text',
      description: 'The default value when uncontrolled',
    },
    options: {
      control: 'object',
      description: 'Array of radio options',
    },
  },
  args: {
    onValueChange: fn(),
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;
type RenderStory = Omit<Story, 'args'> & { args?: Partial<Story['args']> };

const frameworks: RadioOption[] = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
];

const sizes: RadioOption[] = [
  { label: 'Small', value: 's' },
  { label: 'Medium', value: 'm' },
  { label: 'Large', value: 'l' },
  { label: 'Extra Large', value: 'xl' },
];

const colors: RadioOption[] = [
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
  { label: 'Yellow', value: 'yellow' },
];

/**
 * Default radio group with vertical layout
 */
export const Default: Story = {
  args: {
    options: frameworks,
  },
};

/**
 * Radio group with a label
 */
export const WithLabel: Story = {
  args: {
    options: frameworks,
    children: 'Select a framework',
  },
};

/**
 * Disabled radio group
 */
export const Disabled: Story = {
  args: {
    options: frameworks,
    disabled: true,
    defaultValue: 'react',
    children: 'Disabled radio group',
  },
};

/**
 * Read-only radio group
 */
export const ReadOnly: Story = {
  args: {
    options: frameworks,
    readOnly: true,
    defaultValue: 'vue',
    children: 'Read-only selection',
  },
};

/**
 * Required radio group
 */
export const Required: Story = {
  args: {
    options: frameworks,
    required: true,
    children: 'Required selection',
  },
};

/**
 * Radio group with name attribute
 */
export const WithName: Story = {
  args: {
    options: frameworks,
    name: 'framework',
    children: 'Framework preference',
  },
};

/**
 * Horizontal orientation
 */
export const Horizontal: Story = {
  args: {
    options: sizes,
    orientation: 'horizontal',
    children: 'Select size',
  },
};

/**
 * Vertical orientation (default)
 */
export const Vertical: Story = {
  args: {
    options: frameworks,
    orientation: 'vertical',
    children: 'Select framework',
  },
};

/**
 * Radio group with disabled items
 */
export const WithDisabledItems: Story = {
  args: {
    options: [
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue' },
      { label: 'Angular', value: 'angular', disabled: true },
      { label: 'Svelte', value: 'svelte' },
      { label: 'Solid', value: 'solid', disabled: true },
    ],
    children: 'Select framework',
  },
};

/**
 * Radio group with pre-selected value
 */
export const WithDefaultValue: Story = {
  args: {
    options: frameworks,
    defaultValue: 'react',
    children: 'Framework preference',
  },
};

/**
 * Radio group with many options
 */
export const ManyOptions: Story = {
  args: {
    options: [
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
    ],
    children: 'Select framework',
  },
};

/**
 * Radio group with change handler
 */
export const WithChangeHandler: RenderStory = {
  render: () => {
    const RadioWithHandler = () => {
      const [message, setMessage] = useState('');

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <RadioGroup
            options={frameworks}
            onValueChange={(details) => {
              if (details.value) {
                setMessage(`You selected: ${details.value}`);
              }
            }}
          >
            Select a framework
          </RadioGroup>
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

    return <RadioWithHandler />;
  },
};

/**
 * Radio group in a form
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
      <RadioGroup options={frameworks} name="framework" required>
        Preferred Framework (required)
      </RadioGroup>
      <RadioGroup options={sizes} name="size" required>
        T-Shirt Size (required)
      </RadioGroup>
      <RadioGroup options={colors} name="color">
        Favorite Color (optional)
      </RadioGroup>
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
 * Multiple radio groups
 */
export const MultipleGroups: RenderStory = {
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
      <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Configuration</h3>
      <RadioGroup options={frameworks} defaultValue="react">
        Framework
      </RadioGroup>
      <RadioGroup options={sizes} defaultValue="m">
        Size
      </RadioGroup>
      <RadioGroup options={colors} defaultValue="blue">
        Color
      </RadioGroup>
    </div>
  ),
};

/**
 * Horizontal radio groups
 */
export const HorizontalGroups: RenderStory = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '20px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        minWidth: '500px',
      }}
    >
      <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Quick Selection</h3>
      <RadioGroup options={sizes} orientation="horizontal">
        Size
      </RadioGroup>
      <RadioGroup
        options={[
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
          { label: 'Maybe', value: 'maybe' },
        ]}
        orientation="horizontal"
      >
        Subscribe to newsletter?
      </RadioGroup>
    </div>
  ),
};

/**
 * Survey example
 */
export const Survey: RenderStory = {
  render: () => {
    const SurveyForm = () => {
      const [answers, setAnswers] = useState<Record<string, string>>({});

      const questions = [
        {
          id: 'satisfaction',
          label: 'How satisfied are you with our product?',
          options: [
            { label: 'Very Satisfied', value: '5' },
            { label: 'Satisfied', value: '4' },
            { label: 'Neutral', value: '3' },
            { label: 'Dissatisfied', value: '2' },
            { label: 'Very Dissatisfied', value: '1' },
          ],
        },
        {
          id: 'recommend',
          label: 'Would you recommend us to a friend?',
          options: [
            { label: 'Definitely', value: 'definitely' },
            { label: 'Probably', value: 'probably' },
            { label: 'Not Sure', value: 'not-sure' },
            { label: 'Probably Not', value: 'probably-not' },
            { label: 'Definitely Not', value: 'definitely-not' },
          ],
        },
      ];

      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            padding: '20px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            minWidth: '500px',
          }}
        >
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>
            Customer Survey
          </h3>
          {questions.map((question) => (
            <RadioGroup
              key={question.id}
              options={question.options}
              value={answers[question.id]}
              onValueChange={(details) => {
                if (details.value) {
                  setAnswers({ ...answers, [question.id]: details.value });
                }
              }}
            >
              {question.label}
            </RadioGroup>
          ))}
          <div
            style={{
              padding: '12px',
              backgroundColor: '#f3f4f6',
              borderRadius: '6px',
              fontSize: '14px',
            }}
          >
            <strong>Answers:</strong>
            <pre style={{ margin: '8px 0 0 0', fontSize: '12px' }}>
              {JSON.stringify(answers, null, 2)}
            </pre>
          </div>
        </div>
      );
    };

    return <SurveyForm />;
  },
};

/* -------------------------------------------------------------------------
 * Controlled vs uncontrolled interaction (3)
 * ---------------------------------------------------------------------- */

/**
 * Controlled radio group whose `value` prop is fixed by the parent; clicking
 * still notifies the parent via onValueChange, but the parent in this demo
 * chooses not to update its own state, so the prop stays locked to "react"
 */
export const ControlledLockedValue: RenderStory = {
  render: (args) => <RadioGroup {...args} value="react" options={frameworks} />,
  args: {
    children: 'Locked to React',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const vueOption = canvas.getByText('Vue');
    await userEvent.click(vueOption);
    await expect(args.onValueChange).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'vue' })
    );
    const reactRadio = canvas.getByRole('radio', { name: 'React' });
    await expect(reactRadio).toBeChecked();
  },
};

/**
 * Uncontrolled radio group: clicking an option freely selects it
 */
export const UncontrolledInteractive: Story = {
  args: {
    options: frameworks,
    children: 'Uncontrolled - click any option',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const svelteOption = canvas.getByText('Svelte');
    await userEvent.click(svelteOption);
    const svelteRadio = canvas.getByRole('radio', { name: 'Svelte' });
    await expect(svelteRadio).toBeChecked();
    await expect(args.onValueChange).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'svelte' })
    );
  },
};

/**
 * Controlled radio group synced with a stateful parent; clicking updates the
 * parent's state which flows back down through the value prop
 */
export const ControlledInteractive: RenderStory = {
  render: () => {
    const ControlledRadioGroup = () => {
      const [value, setValue] = useState('react');
      return (
        <RadioGroup
          options={frameworks}
          value={value}
          onValueChange={(details) => {
            if (details.value) setValue(details.value);
          }}
        >
          Framework (currently: {value})
        </RadioGroup>
      );
    };
    return <ControlledRadioGroup />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const angularOption = canvas.getByText(/Angular/);
    await userEvent.click(angularOption);
    const angularRadio = canvas.getByRole('radio', { name: 'Angular' });
    await expect(angularRadio).toBeChecked();
  },
};

/* -------------------------------------------------------------------------
 * Keyboard interaction (5)
 * ---------------------------------------------------------------------- */

/**
 * Verifies the first radio is reachable via Tab
 */
export const KeyboardFocusable: Story = {
  args: {
    options: frameworks,
    children: 'Tab to focus the first option',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const reactRadio = canvas.getByRole('radio', { name: 'React' });
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    await expect(reactRadio).toHaveFocus();
  },
};

/**
 * Verifies ArrowDown moves both focus and the selected value to the next item
 */
export const KeyboardArrowDownMovesSelection: Story = {
  args: {
    options: frameworks,
    defaultValue: 'react',
    children: 'Press ArrowDown after focusing',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const reactRadio = canvas.getByRole('radio', { name: 'React' });
    const vueRadio = canvas.getByRole('radio', { name: 'Vue' });
    (reactRadio as unknown as HTMLInputElement).focus();
    await userEvent.keyboard('{ArrowDown}');
    await expect(vueRadio).toHaveFocus();
    await expect(vueRadio).toBeChecked();
  },
};

/**
 * Verifies ArrowUp moves focus and selection to the previous item, wrapping
 * from the first item to the last
 */
export const KeyboardArrowUpMovesSelection: Story = {
  args: {
    options: frameworks,
    defaultValue: 'react',
    children: 'Press ArrowUp after focusing the first option',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const reactRadio = canvas.getByRole('radio', { name: 'React' });
    const svelteRadio = canvas.getByRole('radio', { name: 'Svelte' });
    (reactRadio as unknown as HTMLInputElement).focus();
    await userEvent.keyboard('{ArrowUp}');
    await expect(svelteRadio).toHaveFocus();
    await expect(svelteRadio).toBeChecked();
  },
};

/**
 * Verifies the Space key checks the currently focused, unselected option
 */
export const KeyboardSpaceSelectsFocusedItem: Story = {
  args: {
    options: frameworks,
    children: 'Focus Vue then press Space',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const vueRadio = canvas.getByRole('radio', { name: 'Vue' });
    (vueRadio as unknown as HTMLInputElement).focus();
    await userEvent.keyboard(' ');
    await expect(vueRadio).toBeChecked();
  },
};

/**
 * Verifies arrow key navigation skips a disabled option and lands on the
 * next enabled one
 */
export const KeyboardSkipsDisabledItemOnArrowNav: Story = {
  args: {
    options: [
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue', disabled: true },
      { label: 'Angular', value: 'angular' },
    ],
    defaultValue: 'react',
    children: 'ArrowDown skips the disabled Vue option',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const reactRadio = canvas.getByRole('radio', { name: 'React' });
    const angularRadio = canvas.getByRole('radio', { name: 'Angular' });
    (reactRadio as unknown as HTMLInputElement).focus();
    await userEvent.keyboard('{ArrowDown}');
    await expect(angularRadio).toHaveFocus();
    await expect(angularRadio).toBeChecked();
  },
};

/* -------------------------------------------------------------------------
 * Disabled group vs disabled individual items (3)
 * ---------------------------------------------------------------------- */

/**
 * A disabled group ignores clicks on any option
 */
export const DisabledGroupIgnoresClicks: Story = {
  args: {
    options: frameworks,
    disabled: true,
    children: 'Disabled group - clicks are ignored',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const vueOption = canvas.getByText('Vue');
    await userEvent.click(vueOption);
    await expect(args.onValueChange).not.toHaveBeenCalled();
  },
};

/**
 * Only a single disabled option is unselectable while the rest of the group
 * remains fully interactive
 */
export const SingleDisabledItemNotSelectable: Story = {
  args: {
    options: [
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue', disabled: true },
      { label: 'Angular', value: 'angular' },
    ],
    children: 'Vue is disabled, others are not',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const vueOption = canvas.getByText('Vue');
    await userEvent.click(vueOption);
    await expect(args.onValueChange).not.toHaveBeenCalled();
    const angularOption = canvas.getByText('Angular');
    await userEvent.click(angularOption);
    const angularRadio = canvas.getByRole('radio', { name: 'Angular' });
    await expect(angularRadio).toBeChecked();
  },
};

/**
 * Every individual option is marked disabled even though the group itself
 * is not
 */
export const AllItemsDisabledIndividually: Story = {
  args: {
    options: [
      { label: 'React', value: 'react', disabled: true },
      { label: 'Vue', value: 'vue', disabled: true },
      { label: 'Angular', value: 'angular', disabled: true },
    ],
    children: 'All options individually disabled',
  },
};

/**
 * The pre-selected defaultValue happens to match an option that is itself
 * disabled: it renders checked, but cannot be toggled away from by clicking
 * it again
 */
export const PreselectedDisabledOption: Story = {
  args: {
    options: [
      { label: 'React', value: 'react', disabled: true },
      { label: 'Vue', value: 'vue' },
      { label: 'Angular', value: 'angular' },
    ],
    defaultValue: 'react',
    children: 'Pre-selected option is also disabled',
  },
};

/* -------------------------------------------------------------------------
 * ReadOnly (2)
 * ---------------------------------------------------------------------- */

/**
 * A read-only group ignores clicks and keeps its pre-selected value
 */
export const ReadOnlyIgnoresClick: Story = {
  args: {
    options: frameworks,
    readOnly: true,
    defaultValue: 'react',
    children: 'Read-only - clicks are ignored',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const vueOption = canvas.getByText('Vue');
    await userEvent.click(vueOption);
    await expect(args.onValueChange).not.toHaveBeenCalled();
    const reactRadio = canvas.getByRole('radio', { name: 'React' });
    await expect(reactRadio).toBeChecked();
  },
};

/**
 * A read-only group with no default value starts and stays fully unselected
 */
export const ReadOnlyWithNoDefaultValue: Story = {
  args: {
    options: frameworks,
    readOnly: true,
    children: 'Read-only with nothing selected',
  },
};

/* -------------------------------------------------------------------------
 * Required + form validation (2)
 * ---------------------------------------------------------------------- */

/**
 * A required radio group left unselected shows the browser's native
 * validation message when the form is submitted
 */
export const RequiredWithoutSelectionShowsValidation: RenderStory = {
  render: () => {
    const ValidatedForm = () => {
      const [invalidMessage, setInvalidMessage] = useState<string | null>(null);
      const [submittedOk, setSubmittedOk] = useState(false);

      return (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmittedOk(true);
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxWidth: '320px',
          }}
        >
          <RadioGroup
            name="framework"
            options={frameworks}
            required
            onValueChange={() => {
              setInvalidMessage(null);
              setSubmittedOk(false);
            }}
          >
            Preferred framework (required)
          </RadioGroup>
          <button
            type="submit"
            onInvalidCapture={(e) => {
              e.preventDefault();
              setInvalidMessage('Please select an option before submitting.');
            }}
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
          {invalidMessage && (
            <span style={{ color: '#e81c61', fontSize: '14px' }}>
              {invalidMessage}
            </span>
          )}
          {submittedOk && (
            <span style={{ color: '#489524', fontSize: '14px' }}>
              Form submitted successfully.
            </span>
          )}
        </form>
      );
    };

    return <ValidatedForm />;
  },
};

/**
 * A required radio group with a pre-selected value submits without any
 * native validation error
 */
export const RequiredWithPreselectedValueSubmitsFine: RenderStory = {
  render: () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        alert(JSON.stringify(Object.fromEntries(formData), null, 2));
      }}
      style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
    >
      <RadioGroup name="framework" options={frameworks} required defaultValue="react">
        Preferred framework (required, pre-selected)
      </RadioGroup>
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
    </form>
  ),
};

/* -------------------------------------------------------------------------
 * Orientation edge cases (2)
 * ---------------------------------------------------------------------- */

/**
 * Horizontal orientation with many options wrapping onto multiple lines
 */
export const HorizontalWithManyOptionsWrapping: Story = {
  args: {
    options: [
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue' },
      { label: 'Angular', value: 'angular' },
      { label: 'Svelte', value: 'svelte' },
      { label: 'Solid', value: 'solid' },
      { label: 'Ember', value: 'ember' },
      { label: 'Preact', value: 'preact' },
      { label: 'Alpine', value: 'alpine' },
    ],
    orientation: 'horizontal',
    children: 'Select framework',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '360px' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Horizontal orientation with a disabled option mixed in
 */
export const HorizontalDisabledItems: Story = {
  args: {
    options: [
      { label: 'Small', value: 's' },
      { label: 'Medium', value: 'm', disabled: true },
      { label: 'Large', value: 'l' },
    ],
    orientation: 'horizontal',
    children: 'Select size',
  },
};

/* -------------------------------------------------------------------------
 * Option-count edge cases (2)
 * ---------------------------------------------------------------------- */

/**
 * A radio group with only a single option
 */
export const SingleOption: Story = {
  args: {
    options: [{ label: 'Only choice', value: 'only' }],
    children: 'One option only',
  },
};

/**
 * A simple binary yes/no radio group
 */
export const TwoOptionsYesNo: Story = {
  args: {
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
    orientation: 'horizontal',
    children: 'Subscribe?',
  },
};

/* -------------------------------------------------------------------------
 * Name/value & form-submission scenarios (3)
 * ---------------------------------------------------------------------- */

/**
 * No name attribute is provided; the component falls back to a generated
 * name so the inputs still behave as a native radio group
 */
export const NoNameProvided: Story = {
  args: {
    options: frameworks,
    children: 'No explicit name attribute',
  },
};

/**
 * Options with unusually long values, useful for verifying form submission
 * with long attribute values
 */
export const LongOptionValues: Story = {
  args: {
    options: [
      {
        label: 'First long option',
        value: 'a-very-long-option-value-used-to-verify-form-submission-with-long-attribute-values-first',
      },
      {
        label: 'Second long option',
        value: 'a-very-long-option-value-used-to-verify-form-submission-with-long-attribute-values-second',
      },
    ],
    name: 'a_very_long_field_name_used_for_testing_html_attribute_limits',
    children: 'Long name/value attributes',
  },
};

/**
 * Value prop that does not match any option's value; nothing appears
 * selected
 */
export const ValueNotMatchingAnyOption: Story = {
  args: {
    options: frameworks,
    value: 'does-not-exist',
    children: 'Value not present among options',
  },
};

/* -------------------------------------------------------------------------
 * Options-array edge cases (1)
 * ---------------------------------------------------------------------- */

/**
 * An empty options array still renders the root and label, but no radio
 * items
 */
export const EmptyOptionsArray: Story = {
  args: {
    options: [],
    children: 'No options available',
  },
};

/* -------------------------------------------------------------------------
 * Label/children edge cases (4)
 * ---------------------------------------------------------------------- */

/**
 * Radio group rendered without any group label content
 */
export const WithoutChildrenLabel: Story = {
  args: {
    options: frameworks,
  },
};

/**
 * Long option labels wrapped inside a narrow container
 */
export const LongLabelWrapping: Story = {
  args: {
    options: [
      {
        label:
          'I would like to receive marketing communications and promotional offers on a regular basis',
        value: 'yes',
      },
      {
        label: 'I prefer not to receive any marketing communications at this time',
        value: 'no',
      },
    ],
    children: 'Marketing preference',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '260px' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Radio group with right-to-left Arabic unicode option labels
 */
export const RTLLabelOption: Story = {
  args: {
    options: [
      { label: 'نعم', value: 'yes' },
      { label: 'لا', value: 'no' },
    ],
    children: 'هل توافق؟',
  },
  decorators: [
    (Story) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
};

/**
 * Radio group with emoji alongside unicode text in option labels
 */
export const UnicodeEmojiOptionLabels: Story = {
  args: {
    options: [
      { label: '✅ Confirmé', value: 'confirmed' },
      { label: '🎉 Terminé', value: 'done' },
    ],
    children: '✨ Statut',
  },
};

/* -------------------------------------------------------------------------
 * Kitchen-sink combinations (3)
 * ---------------------------------------------------------------------- */

/**
 * Kitchen sink: required, named, horizontal orientation, with a disabled
 * option mixed in
 */
export const KitchenSinkRequiredNamedHorizontalDisabledItem: Story = {
  args: {
    options: [
      { label: 'Small', value: 's' },
      { label: 'Medium', value: 'm', disabled: true },
      { label: 'Large', value: 'l' },
    ],
    required: true,
    name: 'size',
    orientation: 'horizontal',
    children: 'Kitchen sink: required + named + horizontal + disabled item',
  },
};

/**
 * Kitchen sink: read-only, required, and pre-selected together
 */
export const KitchenSinkReadOnlyRequiredWithDefaultValue: Story = {
  args: {
    options: frameworks,
    readOnly: true,
    required: true,
    defaultValue: 'vue',
    name: 'framework',
    children: 'Kitchen sink: read-only + required + pre-selected',
  },
};

/**
 * Kitchen sink: a controlled, disabled group with a fixed value
 */
export const KitchenSinkControlledDisabledGroup: Story = {
  args: {
    options: frameworks,
    value: 'angular',
    disabled: true,
    name: 'framework',
    children: 'Kitchen sink: controlled + disabled',
  },
};

/* -------------------------------------------------------------------------
 * Background/container context (1)
 * ---------------------------------------------------------------------- */

/**
 * Radio group rendered on a dark background
 */
export const OnDarkBackground: Story = {
  args: {
    options: frameworks,
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

/* -------------------------------------------------------------------------
 * Accessibility (2)
 * ---------------------------------------------------------------------- */

/**
 * Confirms the root exposes role="radiogroup" with the expected aria
 * attributes for orientation, required, and disabled states
 */
export const AccessibleRoleAndAttributes: Story = {
  args: {
    options: frameworks,
    required: true,
    orientation: 'horizontal',
    children: 'Accessible radio group',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole('radiogroup');
    await expect(group).toHaveAttribute('aria-orientation', 'horizontal');
    await expect(group).toHaveAttribute('aria-required', 'true');
  },
};

/**
 * Confirms a focus-visible indicator is applied to the focused item after
 * tabbing to it via the keyboard
 */
export const FocusVisibleOutlineAfterTabbing: Story = {
  args: {
    options: frameworks,
    children: 'Tab to see the focus outline',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const reactRadio = canvas.getByRole('radio', { name: 'React' });
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    await expect(reactRadio).toHaveFocus();
  },
};
