import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import EmptyState from './EmptyState';
import Button from '../Button/Button';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

/** Wraps a raw HTMLElement into a Locator so jest-dom matchers can be used. */
const locatorFor = (element: HTMLElement) => page.elementLocator(element);

const getRoot = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement;

const InboxIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M4 6h16v12H4V6zm0 0l8 6 8-6"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

describe('EmptyState', () => {
  /* -----------------------------------------------------------------------
   * Rendering defaults (5)
   * -------------------------------------------------------------------- */

  it('renders the provided title text', async () => {
    const screen = await render(<EmptyState title="No results found" />);
    await expect
      .element(screen.getByText('No results found'))
      .toBeInTheDocument();
    await takeSnapshot(`EmptyState - renders the provided title text`);
  });

  it('renders the provided description text', async () => {
    const screen = await render(
      <EmptyState title="Empty" description="Try again later" />
    );
    await expect
      .element(screen.getByText('Try again later'))
      .toBeInTheDocument();
    await takeSnapshot(`EmptyState - renders the provided description text`);
  });

  it('does not render a description element when description is omitted', async () => {
    const screen = await render(<EmptyState title="Title only" />);
    const root = getRoot(screen.container);
    expect(root.textContent).toBe('Title only');
    await takeSnapshot(
      `EmptyState - does not render a description element when description is omitted`
    );
  });

  it('defaults to medium size title font size', async () => {
    const screen = await render(<EmptyState title="Defaults" />);
    await expect.element(screen.getByText('Defaults')).toHaveStyle({
      fontSize: fontSize[18],
    });
    await takeSnapshot(`EmptyState - defaults to medium size title font size`);
  });

  it('applies a centered flex column layout on the root', async () => {
    const screen = await render(<EmptyState title="Layout" />);
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    });
    await takeSnapshot(
      `EmptyState - applies a centered flex column layout on the root`
    );
  });

  /* -----------------------------------------------------------------------
   * Size styles (3)
   * -------------------------------------------------------------------- */

  it('applies small size title font size', async () => {
    const screen = await render(<EmptyState title="Small" size="small" />);
    await expect.element(screen.getByText('Small')).toHaveStyle({
      fontSize: fontSize[14],
    });
    await takeSnapshot(`EmptyState - applies small size title font size`);
  });

  it('applies medium size title font size', async () => {
    const screen = await render(<EmptyState title="Medium" size="medium" />);
    await expect.element(screen.getByText('Medium')).toHaveStyle({
      fontSize: fontSize[18],
    });
    await takeSnapshot(`EmptyState - applies medium size title font size`);
  });

  it('applies large size title font size', async () => {
    const screen = await render(<EmptyState title="Large" size="large" />);
    await expect.element(screen.getByText('Large')).toHaveStyle({
      fontSize: fontSize[24],
    });
    await takeSnapshot(`EmptyState - applies large size title font size`);
  });

  /* -----------------------------------------------------------------------
   * Colors & surfaces (5)
   * -------------------------------------------------------------------- */

  it('uses a slate50 background on the root', async () => {
    const screen = await render(<EmptyState title="Surface" />);
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      backgroundColor: color.slate50,
    });
    await takeSnapshot(`EmptyState - uses a slate50 background on the root`);
  });

  it('uses a slate200 border on the root', async () => {
    const screen = await render(<EmptyState title="Border" />);
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      borderStyle: 'solid',
      borderColor: color.slate200,
    });
    await takeSnapshot(`EmptyState - uses a slate200 border on the root`);
  });

  it('styles the title with slate800 and semibold weight', async () => {
    const screen = await render(<EmptyState title="Title styles" />);
    await expect.element(screen.getByText('Title styles')).toHaveStyle({
      color: color.slate800,
      fontWeight: String(fontWeight.semibold),
    });
    await takeSnapshot(
      `EmptyState - styles the title with slate800 and semibold weight`
    );
  });

  it('styles the description with slate500', async () => {
    const screen = await render(
      <EmptyState title="Title" description="Description styles" />
    );
    await expect.element(screen.getByText('Description styles')).toHaveStyle({
      color: color.slate500,
    });
    await takeSnapshot(`EmptyState - styles the description with slate500`);
  });

  it('applies border radius from spacing tokens', async () => {
    const screen = await render(<EmptyState title="Radius" />);
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      borderRadius: spacing[3],
    });
    await takeSnapshot(
      `EmptyState - applies border radius from spacing tokens`
    );
  });

  /* -----------------------------------------------------------------------
   * Icon & action slots (6)
   * -------------------------------------------------------------------- */

  it('renders an icon when provided', async () => {
    const screen = await render(
      <EmptyState title="With icon" icon={<InboxIcon />} />
    );
    const svg = getRoot(screen.container).querySelector('svg');
    expect(svg).not.toBeNull();
    await takeSnapshot(`EmptyState - renders an icon when provided`);
  });

  it('does not render an icon container when icon is omitted', async () => {
    const screen = await render(<EmptyState title="No icon" />);
    const svg = getRoot(screen.container).querySelector('svg');
    expect(svg).toBeNull();
    await takeSnapshot(
      `EmptyState - does not render an icon container when icon is omitted`
    );
  });

  it('renders an action when provided', async () => {
    const screen = await render(
      <EmptyState
        title="With action"
        action={<Button label="Create" size="small" />}
      />
    );
    await expect.element(screen.getByText('Create')).toBeInTheDocument();
    await takeSnapshot(`EmptyState - renders an action when provided`);
  });

  it('does not render action content when action is omitted', async () => {
    const screen = await render(<EmptyState title="No action" />);
    expect(screen.container.querySelector('button')).toBeNull();
    await takeSnapshot(
      `EmptyState - does not render action content when action is omitted`
    );
  });

  it('renders icon and action together', async () => {
    const screen = await render(
      <EmptyState
        title="Full"
        description="All slots"
        icon={<InboxIcon />}
        action={<Button label="Go" size="small" />}
      />
    );
    expect(getRoot(screen.container).querySelector('svg')).not.toBeNull();
    await expect.element(screen.getByText('Go')).toBeInTheDocument();
    await takeSnapshot(`EmptyState - renders icon and action together`);
  });

  it('renders a custom non-button action node', async () => {
    const screen = await render(
      <EmptyState
        title="Custom action"
        action={<span>View docs</span>}
      />
    );
    await expect.element(screen.getByText('View docs')).toBeInTheDocument();
    await takeSnapshot(
      `EmptyState - renders a custom non-button action node`
    );
  });

  /* -----------------------------------------------------------------------
   * Description size variants (3)
   * -------------------------------------------------------------------- */

  it('uses small description font size for small size', async () => {
    const screen = await render(
      <EmptyState title="T" description="Desc" size="small" />
    );
    await expect.element(screen.getByText('Desc')).toHaveStyle({
      fontSize: fontSize[12],
    });
    await takeSnapshot(
      `EmptyState - uses small description font size for small size`
    );
  });

  it('uses medium description font size for medium size', async () => {
    const screen = await render(
      <EmptyState title="T" description="Desc" size="medium" />
    );
    await expect.element(screen.getByText('Desc')).toHaveStyle({
      fontSize: fontSize[14],
    });
    await takeSnapshot(
      `EmptyState - uses medium description font size for medium size`
    );
  });

  it('uses large description font size for large size', async () => {
    const screen = await render(
      <EmptyState title="T" description="Desc" size="large" />
    );
    await expect.element(screen.getByText('Desc')).toHaveStyle({
      fontSize: fontSize[16],
    });
    await takeSnapshot(
      `EmptyState - uses large description font size for large size`
    );
  });

  /* -----------------------------------------------------------------------
   * Content edge cases (6)
   * -------------------------------------------------------------------- */

  it('preserves emoji content in the title', async () => {
    const screen = await render(<EmptyState title="🎉 All done" />);
    await expect
      .element(screen.getByText('🎉 All done'))
      .toHaveTextContent('🎉 All done');
    await takeSnapshot(`EmptyState - preserves emoji content in the title`);
  });

  it('preserves RTL unicode content', async () => {
    const screen = await render(
      <EmptyState title="لا توجد نتائج" description="حاول تعديل البحث" />
    );
    await expect
      .element(screen.getByText('لا توجد نتائج'))
      .toHaveTextContent('لا توجد نتائج');
    await takeSnapshot(`EmptyState - preserves RTL unicode content`);
  });

  it('renders a long title in full', async () => {
    const longTitle =
      'We could not find any matching results for the filters you selected across this workspace';
    const screen = await render(<EmptyState title={longTitle} />);
    await expect.element(screen.getByText(longTitle)).toHaveTextContent(longTitle);
    await takeSnapshot(`EmptyState - renders a long title in full`);
  });

  it('renders a long description in full', async () => {
    const longDescription =
      'There has been no recent activity in this space. Once teammates start collaborating, updates will appear here automatically.';
    const screen = await render(
      <EmptyState title="No activity" description={longDescription} />
    );
    await expect
      .element(screen.getByText(longDescription))
      .toHaveTextContent(longDescription);
    await takeSnapshot(`EmptyState - renders a long description in full`);
  });

  it('renders numeric title content', async () => {
    const screen = await render(
      <EmptyState title="0" description="Items remaining" />
    );
    await expect.element(screen.getByText('0')).toBeInTheDocument();
    await takeSnapshot(`EmptyState - renders numeric title content`);
  });

  it('renders an emoji icon node', async () => {
    const screen = await render(
      <EmptyState
        title="No favorites"
        icon={<span>⭐</span>}
      />
    );
    await expect.element(screen.getByText('⭐')).toBeInTheDocument();
    await takeSnapshot(`EmptyState - renders an emoji icon node`);
  });

  /* -----------------------------------------------------------------------
   * Combinations (6)
   * -------------------------------------------------------------------- */

  it('renders kitchen-sink combo: large with icon description and action', async () => {
    const screen = await render(
      <EmptyState
        title="Nothing to display"
        description="Create content or adjust your filters."
        size="large"
        icon={<InboxIcon />}
        action={<Button label="Create" size="medium" />}
      />
    );
    await expect
      .element(screen.getByText('Nothing to display'))
      .toHaveStyle({ fontSize: fontSize[24] });
    await expect
      .element(screen.getByRole('button', { name: 'Create' }))
      .toBeInTheDocument();
    expect(getRoot(screen.container).querySelector('svg')).not.toBeNull();
    await takeSnapshot(
      `EmptyState - renders kitchen-sink combo: large with icon description and action`
    );
  });

  it('renders kitchen-sink combo: small with icon and description', async () => {
    const screen = await render(
      <EmptyState
        title="Quiet here"
        description="No updates yet."
        size="small"
        icon={<InboxIcon />}
      />
    );
    await expect.element(screen.getByText('Quiet here')).toHaveStyle({
      fontSize: fontSize[14],
    });
    await takeSnapshot(
      `EmptyState - renders kitchen-sink combo: small with icon and description`
    );
  });

  it('renders title and action without description', async () => {
    const screen = await render(
      <EmptyState
        title="Ready when you are"
        action={<Button label="Continue" size="small" />}
      />
    );
    await expect
      .element(screen.getByText('Ready when you are'))
      .toBeInTheDocument();
    await expect.element(screen.getByText('Continue')).toBeInTheDocument();
    await takeSnapshot(
      `EmptyState - renders title and action without description`
    );
  });

  it('renders icon and title without description or action', async () => {
    const screen = await render(
      <EmptyState title="Coming soon" icon={<InboxIcon />} />
    );
    await expect.element(screen.getByText('Coming soon')).toBeInTheDocument();
    expect(getRoot(screen.container).querySelector('svg')).not.toBeNull();
    await takeSnapshot(
      `EmptyState - renders icon and title without description or action`
    );
  });

  it('renders multiple action buttons in the action slot', async () => {
    const screen = await render(
      <EmptyState
        title="Get started"
        action={
          <div>
            <Button label="Import" size="small" />
            <Button label="Create" size="small" />
          </div>
        }
      />
    );
    await expect.element(screen.getByText('Import')).toBeInTheDocument();
    await expect.element(screen.getByText('Create')).toBeInTheDocument();
    await takeSnapshot(
      `EmptyState - renders multiple action buttons in the action slot`
    );
  });

  it('renders a green action button without altering empty state surface', async () => {
    const screen = await render(
      <EmptyState
        title="Ready to ship"
        action={
          <Button label="Deploy" size="small" backgroundColor={color.green500} />
        }
      />
    );
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      backgroundColor: color.slate50,
    });
    await expect.element(screen.getByText('Deploy')).toBeInTheDocument();
    await takeSnapshot(
      `EmptyState - renders a green action button without altering empty state surface`
    );
  });

  /* -----------------------------------------------------------------------
   * Size padding (3)
   * -------------------------------------------------------------------- */

  it('applies small padding on the root', async () => {
    const screen = await render(<EmptyState title="Pad" size="small" />);
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      padding: spacing[4],
    });
    await takeSnapshot(`EmptyState - applies small padding on the root`);
  });

  it('applies medium padding on the root', async () => {
    const screen = await render(<EmptyState title="Pad" size="medium" />);
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      padding: spacing[6],
    });
    await takeSnapshot(`EmptyState - applies medium padding on the root`);
  });

  it('applies large padding on the root', async () => {
    const screen = await render(<EmptyState title="Pad" size="large" />);
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      padding: spacing[8],
    });
    await takeSnapshot(`EmptyState - applies large padding on the root`);
  });

  /* -----------------------------------------------------------------------
   * Multi-instance & re-render (5)
   * -------------------------------------------------------------------- */

  it('keeps two independent empty states from sharing content', async () => {
    const screen = await render(
      <div>
        <EmptyState title="No files" />
        <EmptyState title="No folders" />
      </div>
    );
    await expect.element(screen.getByText('No files')).toBeInTheDocument();
    await expect.element(screen.getByText('No folders')).toBeInTheDocument();
    await takeSnapshot(
      `EmptyState - keeps two independent empty states from sharing content`
    );
  });

  it('updates the title when re-rendered with new props', async () => {
    const screen = await render(<EmptyState title="Before" />);
    await expect.element(screen.getByText('Before')).toBeInTheDocument();
    await screen.rerender(<EmptyState title="After" />);
    await expect.element(screen.getByText('After')).toBeInTheDocument();
    await takeSnapshot(
      `EmptyState - updates the title when re-rendered with new props`
    );
  });

  it('updates size styles when re-rendered with a new size', async () => {
    const screen = await render(<EmptyState title="Sized" size="small" />);
    await expect.element(screen.getByText('Sized')).toHaveStyle({
      fontSize: fontSize[14],
    });
    await screen.rerender(<EmptyState title="Sized" size="large" />);
    await expect.element(screen.getByText('Sized')).toHaveStyle({
      fontSize: fontSize[24],
    });
    await takeSnapshot(
      `EmptyState - updates size styles when re-rendered with a new size`
    );
  });

  it('adds a description when re-rendered with one', async () => {
    const screen = await render(<EmptyState title="Title" />);
    await screen.rerender(
      <EmptyState title="Title" description="Now present" />
    );
    await expect.element(screen.getByText('Now present')).toBeInTheDocument();
    await takeSnapshot(
      `EmptyState - adds a description when re-rendered with one`
    );
  });

  it('adds an action when re-rendered with one', async () => {
    const screen = await render(<EmptyState title="Title" />);
    await screen.rerender(
      <EmptyState
        title="Title"
        action={<Button label="Appeared" size="small" />}
      />
    );
    await expect.element(screen.getByText('Appeared')).toBeInTheDocument();
    await takeSnapshot(`EmptyState - adds an action when re-rendered with one`);
  });

  /* -----------------------------------------------------------------------
   * Max width per size (3)
   * -------------------------------------------------------------------- */

  it('applies small max width', async () => {
    const screen = await render(<EmptyState title="W" size="small" />);
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      maxWidth: '240px',
    });
    await takeSnapshot(`EmptyState - applies small max width`);
  });

  it('applies medium max width', async () => {
    const screen = await render(<EmptyState title="W" size="medium" />);
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      maxWidth: '360px',
    });
    await takeSnapshot(`EmptyState - applies medium max width`);
  });

  it('applies large max width', async () => {
    const screen = await render(<EmptyState title="W" size="large" />);
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      maxWidth: '480px',
    });
    await takeSnapshot(`EmptyState - applies large max width`);
  });

  /* -----------------------------------------------------------------------
   * Short title (1)
   * -------------------------------------------------------------------- */

  it('renders a short punchy title correctly', async () => {
    const screen = await render(
      <EmptyState title="Empty" description="Add content." />
    );
    await expect.element(screen.getByText('Empty')).toBeInTheDocument();
    await expect.element(screen.getByText('Add content.')).toBeInTheDocument();
    await takeSnapshot(
      `EmptyState - renders a short punchy title correctly`
    );
  });

  /* -----------------------------------------------------------------------
   * Empty string description (1)
   * -------------------------------------------------------------------- */

  it('treats an empty string description as falsy and hides it', async () => {
    const screen = await render(
      <EmptyState title="Title present" description="" />
    );
    expect(getRoot(screen.container).textContent).toBe('Title present');
    await takeSnapshot(
      `EmptyState - treats an empty string description as falsy and hides it`
    );
  });

  /* -----------------------------------------------------------------------
   * Additional coverage (3)
   * -------------------------------------------------------------------- */

  it('renders small title-only without description or action', async () => {
    const screen = await render(
      <EmptyState title="Empty" size="small" />
    );
    await expect.element(screen.getByText('Empty')).toHaveStyle({
      fontSize: fontSize[14],
    });
    expect(screen.container.querySelector('button')).toBeNull();
    await takeSnapshot(
      `EmptyState - renders small title-only without description or action`
    );
  });

  it('renders large title-only without description or action', async () => {
    const screen = await render(
      <EmptyState title="Empty" size="large" />
    );
    await expect.element(screen.getByText('Empty')).toHaveStyle({
      fontSize: fontSize[24],
    });
    await takeSnapshot(
      `EmptyState - renders large title-only without description or action`
    );
  });

  it('renders a warning-colored action button label', async () => {
    const screen = await render(
      <EmptyState
        title="Attention needed"
        action={
          <Button
            label="Review"
            size="small"
            backgroundColor={color.yellow500}
          />
        }
      />
    );
    await expect.element(screen.getByText('Review')).toBeInTheDocument();
    await takeSnapshot(
      `EmptyState - renders a warning-colored action button label`
    );
  });
});
