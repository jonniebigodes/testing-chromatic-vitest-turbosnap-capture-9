import type { Meta, StoryObj } from '@storybook/react-vite';
import Toolbar from './Toolbar';
import Button from '../Button/Button';

const meta = {
  title: 'Components/Toolbar',
  component: Toolbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the toolbar',
    },
    children: {
      control: false,
      description: 'Content to be rendered inside the toolbar',
    },
  },
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default toolbar with horizontal orientation
 */
export const Default: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <Button label="Save" />
      <Button label="Edit" />
      <Button label="Delete" backgroundColor="#ef4444" />
    </Toolbar>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Toolbar with horizontal orientation
 */
export const Horizontal: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <Button label="New" />
      <Button label="Open" />
      <Button label="Save" />
      <Button label="Save As" />
      <Button label="Close" />
    </Toolbar>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Toolbar with vertical orientation
 */
export const Vertical: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <Button label="Cut" />
      <Button label="Copy" />
      <Button label="Paste" />
      <Button label="Delete" backgroundColor="#ef4444" />
    </Toolbar>
  ),
  args: {
    orientation: 'vertical',
  },
};

/**
 * Toolbar with different button sizes
 */
export const WithDifferentSizes: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <Button label="Small" size="small" />
      <Button label="Medium" size="medium" />
      <Button label="Large" size="large" />
    </Toolbar>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Toolbar with custom styled buttons
 */
export const WithCustomButtons: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <Button label="Primary" backgroundColor="#3b82f6" />
      <Button label="Success" backgroundColor="#10b981" />
      <Button label="Warning" backgroundColor="#f59e0b" />
      <Button label="Danger" backgroundColor="#ef4444" />
    </Toolbar>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Vertical toolbar with custom buttons
 */
export const VerticalWithCustomButtons: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <Button label="Primary" backgroundColor="#3b82f6" />
      <Button label="Success" backgroundColor="#10b981" />
      <Button label="Warning" backgroundColor="#f59e0b" />
      <Button label="Danger" backgroundColor="#ef4444" />
    </Toolbar>
  ),
  args: {
    orientation: 'vertical',
  },
};

/**
 * Toolbar with many buttons
 */
export const WithManyButtons: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <Button label="File" size="small" />
      <Button label="Edit" size="small" />
      <Button label="View" size="small" />
      <Button label="Insert" size="small" />
      <Button label="Format" size="small" />
      <Button label="Tools" size="small" />
      <Button label="Table" size="small" />
      <Button label="Help" size="small" />
    </Toolbar>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Toolbar with action buttons
 */
export const ActionToolbar: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <Button label="Undo" />
      <Button label="Redo" />
      <div
        style={{ width: '1px', height: '24px', backgroundColor: '#d1d5db' }}
      />
      <Button label="Bold" />
      <Button label="Italic" />
      <Button label="Underline" />
      <div
        style={{ width: '1px', height: '24px', backgroundColor: '#d1d5db' }}
      />
      <Button label="Align Left" />
      <Button label="Align Center" />
      <Button label="Align Right" />
    </Toolbar>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Vertical toolbar with dividers
 */
export const VerticalWithDividers: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <Button label="New" size="small" />
      <Button label="Open" size="small" />
      <Button label="Save" size="small" />
      <div
        style={{ width: '100%', height: '1px', backgroundColor: '#d1d5db' }}
      />
      <Button label="Cut" size="small" />
      <Button label="Copy" size="small" />
      <Button label="Paste" size="small" />
      <div
        style={{ width: '100%', height: '1px', backgroundColor: '#d1d5db' }}
      />
      <Button label="Undo" size="small" />
      <Button label="Redo" size="small" />
    </Toolbar>
  ),
  args: {
    orientation: 'vertical',
  },
};

/**
 * Empty toolbar
 */
export const Empty: Story = {
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Toolbar with single button
 */
export const SingleButton: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <Button label="Click Me" />
    </Toolbar>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Toolbar with mixed content
 */
export const WithMixedContent: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <Button label="Action 1" />
      <span style={{ padding: '0 8px', color: '#6b7280', fontSize: '14px' }}>
        |
      </span>
      <span style={{ fontSize: '14px', color: '#374151' }}>Status: Active</span>
      <span style={{ padding: '0 8px', color: '#6b7280', fontSize: '14px' }}>
        |
      </span>
      <Button label="Action 2" />
    </Toolbar>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Responsive toolbar example
 */
export const Responsive: Story = {
  render: (args) => (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      <Toolbar {...args}>
        <Button label="File" size="small" />
        <Button label="Edit" size="small" />
        <Button label="View" size="small" />
        <Button label="Insert" size="small" />
        <Button label="Format" size="small" />
        <Button label="Tools" size="small" />
      </Toolbar>
    </div>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Toolbar as a floating panel
 */
export const FloatingToolbar: Story = {
  render: (args) => (
    <div
      style={{
        position: 'relative',
        width: '600px',
        height: '400px',
        backgroundColor: '#f3f4f6',
        borderRadius: '8px',
        padding: '20px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Toolbar {...args}>
          <Button label="B" size="small" />
          <Button label="I" size="small" />
          <Button label="U" size="small" />
          <Button label="S" size="small" />
        </Toolbar>
      </div>
      <div style={{ marginTop: '60px', fontSize: '14px', color: '#374151' }}>
        This is a floating toolbar positioned at the top of the container.
      </div>
    </div>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Side toolbar
 */
export const SideToolbar: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Toolbar {...args}>
        <Button label="Home" size="small" />
        <Button label="Search" size="small" />
        <Button label="Settings" size="small" />
        <Button label="Help" size="small" />
      </Toolbar>
      <div
        style={{
          flex: 1,
          padding: '20px',
          backgroundColor: '#f9fafb',
          borderRadius: '6px',
          border: '1px solid #e5e7eb',
        }}
      >
        <p style={{ margin: 0, fontSize: '14px', color: '#374151' }}>
          Main content area with a vertical toolbar on the side.
        </p>
      </div>
    </div>
  ),
  args: {
    orientation: 'vertical',
  },
};

/* -------------------------------------------------------------------------
 * Empty / no-children edge cases (3)
 * ---------------------------------------------------------------------- */

/**
 * Empty vertical toolbar with no children
 */
export const EmptyVertical: Story = {
  args: {
    orientation: 'vertical',
  },
};

/**
 * Toolbar with children explicitly set to undefined
 */
export const ChildrenExplicitUndefined: Story = {
  args: {
    orientation: 'horizontal',
    children: undefined,
  },
};

/**
 * Empty toolbar rendered inside a bordered container for visual context
 */
export const EmptyInBorderedContainer: Story = {
  render: (args) => (
    <div
      style={{
        padding: '16px',
        border: '1px dashed #d1d5db',
        borderRadius: '8px',
      }}
    >
      <Toolbar {...args} />
    </div>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/* -------------------------------------------------------------------------
 * Single-child variations (2)
 * ---------------------------------------------------------------------- */

/**
 * Toolbar with a single icon-only button
 */
export const SingleIconButton: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <Button label="⚙" size="small" />
    </Toolbar>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Vertical toolbar with a single button
 */
export const SingleVerticalButton: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <Button label="Only Action" />
    </Toolbar>
  ),
  args: {
    orientation: 'vertical',
  },
};

/* -------------------------------------------------------------------------
 * Non-button / text content (3)
 * ---------------------------------------------------------------------- */

/**
 * Toolbar containing only plain text spans, no interactive buttons
 */
export const TextOnlyChildren: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <span style={{ fontSize: '14px', color: '#374151' }}>Read-only</span>
      <span style={{ fontSize: '14px', color: '#374151' }}>Status: Synced</span>
    </Toolbar>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Toolbar containing only icon buttons, no text labels
 */
export const IconOnlyChildren: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <Button label="+" size="small" />
      <Button label="−" size="small" />
      <Button label="×" size="small" />
    </Toolbar>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Toolbar mixing icon buttons with plain text labels
 */
export const MixedTextAndIconChildren: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <Button label="★" size="small" />
      <span style={{ fontSize: '14px', color: '#374151' }}>Favorited</span>
      <Button label="⤴" size="small" />
    </Toolbar>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/* -------------------------------------------------------------------------
 * Divider-heavy content (2)
 * ---------------------------------------------------------------------- */

/**
 * Horizontal toolbar with several dividers breaking up button groups
 */
export const HorizontalWithMultipleDividers: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <Button label="A" size="small" />
      <div style={{ width: '1px', height: '20px', backgroundColor: '#d1d5db' }} />
      <Button label="B" size="small" />
      <div style={{ width: '1px', height: '20px', backgroundColor: '#d1d5db' }} />
      <Button label="C" size="small" />
      <div style={{ width: '1px', height: '20px', backgroundColor: '#d1d5db' }} />
      <Button label="D" size="small" />
    </Toolbar>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Vertical toolbar with a single horizontal divider between two buttons
 */
export const VerticalWithSingleDivider: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <Button label="Top" size="small" />
      <div style={{ width: '100%', height: '1px', backgroundColor: '#d1d5db' }} />
      <Button label="Bottom" size="small" />
    </Toolbar>
  ),
  args: {
    orientation: 'vertical',
  },
};

/* -------------------------------------------------------------------------
 * Nested toolbars (2)
 * ---------------------------------------------------------------------- */

/**
 * A horizontal toolbar nested inside another horizontal toolbar
 */
export const NestedToolbarsHorizontal: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <Button label="Outer 1" size="small" />
      <Toolbar orientation="horizontal">
        <Button label="Inner A" size="small" />
        <Button label="Inner B" size="small" />
      </Toolbar>
      <Button label="Outer 2" size="small" />
    </Toolbar>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * A vertical toolbar nested inside a horizontal toolbar
 */
export const NestedToolbarsVertical: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <Button label="Left" size="small" />
      <Toolbar orientation="vertical">
        <Button label="Top" size="small" />
        <Button label="Bottom" size="small" />
      </Toolbar>
    </Toolbar>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/* -------------------------------------------------------------------------
 * Dark background context (2)
 * ---------------------------------------------------------------------- */

/**
 * Horizontal toolbar rendered on a dark background
 */
export const OnDarkBackgroundHorizontal: Story = {
  render: (args) => (
    <div style={{ backgroundColor: '#0f172a', padding: '24px', borderRadius: '8px' }}>
      <Toolbar {...args}>
        <Button label="Save" />
        <Button label="Cancel" backgroundColor="#64748b" />
      </Toolbar>
    </div>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Vertical toolbar rendered on a dark background
 */
export const OnDarkBackgroundVertical: Story = {
  render: (args) => (
    <div style={{ backgroundColor: '#0f172a', padding: '24px', borderRadius: '8px' }}>
      <Toolbar {...args}>
        <Button label="Save" />
        <Button label="Cancel" backgroundColor="#64748b" />
      </Toolbar>
    </div>
  ),
  args: {
    orientation: 'vertical',
  },
};

/* -------------------------------------------------------------------------
 * Many-children stress test (2)
 * ---------------------------------------------------------------------- */

/**
 * Horizontal toolbar with twenty small buttons
 */
export const TwentyButtonsHorizontal: Story = {
  render: (args) => (
    <Toolbar {...args}>
      {Array.from({ length: 20 }, (_, i) => (
        <Button key={i} label={`${i + 1}`} size="small" />
      ))}
    </Toolbar>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Vertical toolbar with many buttons inside a height-constrained,
 * scrollable container
 */
export const ManyButtonsVerticalScrollable: Story = {
  render: (args) => (
    <div style={{ height: '200px', overflowY: 'auto' }}>
      <Toolbar {...args}>
        {Array.from({ length: 12 }, (_, i) => (
          <Button key={i} label={`Item ${i + 1}`} size="small" />
        ))}
      </Toolbar>
    </div>
  ),
  args: {
    orientation: 'vertical',
  },
};

/* -------------------------------------------------------------------------
 * Layout / decorator context (3)
 * ---------------------------------------------------------------------- */

/**
 * Toolbar placed inside a flex row alongside sibling content
 */
export const InsideFlexRowWithSiblingContent: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <span style={{ fontSize: '14px', fontWeight: 600 }}>Document.txt</span>
      <Toolbar {...args}>
        <Button label="Share" size="small" />
        <Button label="Export" size="small" />
      </Toolbar>
    </div>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Toolbar constrained inside a very narrow container
 */
export const InsideNarrowContainer: Story = {
  render: (args) => (
    <div style={{ maxWidth: '120px' }}>
      <Toolbar {...args}>
        <Button label="One" size="small" />
        <Button label="Two" size="small" />
      </Toolbar>
    </div>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Toolbar centered within a large container
 */
export const CenteredInLargeContainer: Story = {
  render: (args) => (
    <div
      style={{
        width: '600px',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
      }}
    >
      <Toolbar {...args}>
        <Button label="Play" />
        <Button label="Pause" />
        <Button label="Stop" backgroundColor="#ef4444" />
      </Toolbar>
    </div>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/* -------------------------------------------------------------------------
 * Grouped buttons / multiple toolbar instances (2)
 * ---------------------------------------------------------------------- */

/**
 * Toolbar with labeled sub-groups of buttons separated by dividers
 */
export const GroupedButtonsWithLabelSpans: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <span style={{ fontSize: '12px', color: '#6b7280' }}>Edit:</span>
      <Button label="Cut" size="small" />
      <Button label="Copy" size="small" />
      <div style={{ width: '1px', height: '20px', backgroundColor: '#d1d5db' }} />
      <span style={{ fontSize: '12px', color: '#6b7280' }}>View:</span>
      <Button label="Zoom In" size="small" />
      <Button label="Zoom Out" size="small" />
    </Toolbar>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Two independent toolbar instances rendered side by side
 */
export const MultipleToolbarsSideBySide: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Toolbar orientation="horizontal">
        <Button label="Save" size="small" />
        <Button label="Cancel" size="small" />
      </Toolbar>
      <Toolbar orientation="vertical">
        <Button label="Up" size="small" />
        <Button label="Down" size="small" />
      </Toolbar>
    </div>
  ),
};

/* -------------------------------------------------------------------------
 * SVG icon content (2)
 * ---------------------------------------------------------------------- */

/**
 * Horizontal toolbar containing raw SVG icons (not wrapped in Button)
 */
export const SvgIconButtonsHorizontal: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="#374151" strokeWidth="2" />
      </svg>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="14" stroke="#374151" strokeWidth="2" />
      </svg>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L18 18H2L10 2Z" stroke="#374151" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    </Toolbar>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Vertical toolbar containing raw SVG icons
 */
export const SvgIconButtonsVertical: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="#374151" strokeWidth="2" />
      </svg>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="14" stroke="#374151" strokeWidth="2" />
      </svg>
    </Toolbar>
  ),
  args: {
    orientation: 'vertical',
  },
};

/* -------------------------------------------------------------------------
 * Native form-element children (3)
 * ---------------------------------------------------------------------- */

/**
 * Toolbar containing a native text input alongside buttons
 */
export const WithInputElement: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <input
        type="text"
        placeholder="Search..."
        style={{
          padding: '4px 8px',
          border: '1px solid #d1d5db',
          borderRadius: '4px',
          fontSize: '14px',
        }}
      />
      <Button label="Go" size="small" />
    </Toolbar>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Toolbar containing a native anchor link alongside buttons
 */
export const WithLinkElement: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <Button label="Save" size="small" />
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        style={{ fontSize: '14px', color: '#3b82f6' }}
      >
        Learn more
      </a>
    </Toolbar>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Toolbar containing a native select element alongside a button
 */
export const WithSelectElement: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <select style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '14px' }}>
        <option>Small</option>
        <option>Medium</option>
        <option>Large</option>
      </select>
      <Button label="Apply" size="small" />
    </Toolbar>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/* -------------------------------------------------------------------------
 * Kitchen-sink combinations (2)
 * ---------------------------------------------------------------------- */

/**
 * Kitchen sink: vertical toolbar with dividers, icons, and text together
 */
export const KitchenSinkVerticalDividersIconsText: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <span style={{ fontSize: '12px', color: '#6b7280' }}>Tools</span>
      <Button label="✂" size="small" />
      <Button label="📋" size="small" />
      <div style={{ width: '100%', height: '1px', backgroundColor: '#d1d5db' }} />
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7" stroke="#374151" strokeWidth="2" />
      </svg>
      <Button label="Delete" backgroundColor="#ef4444" size="small" />
    </Toolbar>
  ),
  args: {
    orientation: 'vertical',
  },
};

/**
 * Kitchen sink: horizontal toolbar exercising every supported content type
 * at once (buttons, dividers, icons, text, and a native input)
 */
export const KitchenSinkHorizontalAllContentTypes: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <span style={{ fontSize: '12px', color: '#6b7280' }}>File:</span>
      <Button label="New" size="small" />
      <Button label="Open" size="small" />
      <div style={{ width: '1px', height: '20px', backgroundColor: '#d1d5db' }} />
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="14" height="14" stroke="#374151" strokeWidth="2" />
      </svg>
      <input
        type="text"
        placeholder="Filter..."
        style={{ padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '14px' }}
      />
      <Button label="Delete" backgroundColor="#ef4444" size="small" />
    </Toolbar>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/* -------------------------------------------------------------------------
 * Falsy / conditional children edge cases (2)
 * ---------------------------------------------------------------------- */

/**
 * Toolbar with children explicitly passed as null
 */
export const ChildrenAsExplicitNull: Story = {
  render: (args) => <Toolbar {...args}>{null}</Toolbar>,
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Toolbar with a conditional child that evaluates to false alongside a
 * real button
 */
export const ChildrenWithFalsyConditional: Story = {
  render: (args) => (
    <Toolbar {...args}>
      {false}
      <Button label="Visible Action" size="small" />
    </Toolbar>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/* -------------------------------------------------------------------------
 * Constrained-height overflow context (1)
 * ---------------------------------------------------------------------- */

/**
 * Vertical toolbar constrained to a fixed, small height, exercising
 * overflow behavior with a scrollbar
 */
export const VerticalConstrainedHeight: Story = {
  render: (args) => (
    <div style={{ height: '120px', overflowY: 'auto', border: '1px solid #e5e7eb' }}>
      <Toolbar {...args}>
        <Button label="A" size="small" />
        <Button label="B" size="small" />
        <Button label="C" size="small" />
        <Button label="D" size="small" />
        <Button label="E" size="small" />
      </Toolbar>
    </div>
  ),
  args: {
    orientation: 'vertical',
  },
};

/* -------------------------------------------------------------------------
 * RTL context (1)
 * ---------------------------------------------------------------------- */

/**
 * Toolbar rendered in a right-to-left context with Arabic labels
 */
export const RTLHorizontalToolbar: Story = {
  render: (args) => (
    <div dir="rtl">
      <Toolbar {...args}>
        <Button label="حفظ" size="small" />
        <Button label="إلغاء" size="small" />
      </Toolbar>
    </div>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/* -------------------------------------------------------------------------
 * Wrapping / long-content edge cases (3)
 * ---------------------------------------------------------------------- */

/**
 * Horizontal toolbar with many buttons inside a narrow, wrapping flex
 * container
 */
export const WrappingHorizontalToolbarNarrow: Story = {
  render: (args) => (
    <div style={{ maxWidth: '200px' }}>
      <Toolbar {...args}>
        <Button label="One" size="small" />
        <Button label="Two" size="small" />
        <Button label="Three" size="small" />
        <Button label="Four" size="small" />
      </Toolbar>
    </div>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Vertical toolbar with buttons that have unusually long labels
 */
export const VerticalWithLongButtonLabels: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <Button label="Export as PDF Document" size="small" />
      <Button label="Import from Spreadsheet" size="small" />
      <Button label="Archive Selected Items" size="small" />
    </Toolbar>
  ),
  args: {
    orientation: 'vertical',
  },
};

/**
 * Toolbar with a button that displays a notification badge
 */
export const ButtonWithNotificationBadge: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <Button label="Inbox" size="small" />
        <span
          style={{
            position: 'absolute',
            top: '-6px',
            right: '-6px',
            backgroundColor: '#ef4444',
            color: 'white',
            fontSize: '10px',
            fontWeight: 700,
            borderRadius: '9999px',
            padding: '1px 5px',
          }}
        >
          3
        </span>
      </div>
      <Button label="Settings" size="small" />
    </Toolbar>
  ),
  args: {
    orientation: 'horizontal',
  },
};
