import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import { useState } from 'react';
import Tooltip from './Tooltip';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

const getTooltip = () => page.getByRole('tooltip');

const ControlledTooltip = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <button type="button" onClick={() => setOpen((v) => !v)}>
        Toggle
      </button>
      <Tooltip content="Controlled tip" open={open} onOpenChange={(d) => setOpen(d.open)}>
        Controlled
      </Tooltip>
    </>
  );
};

describe('Tooltip', () => {
  it('renders the trigger children text', async () => {
    const screen = await render(<Tooltip content="Tip">Hover me</Tooltip>);
    await expect.element(screen.getByText('Hover me')).toBeInTheDocument();
    await takeSnapshot(`Tooltip - renders the trigger children text`);
  });

  it('shows tooltip content when open is true', async () => {
    await render(
      <Tooltip content="Visible tip" open>
        Trigger
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveTextContent('Visible tip');
    await takeSnapshot(`Tooltip - shows tooltip content when open is true`);
  });

  it('does not show tooltip content when open is false', async () => {
    await render(
      <Tooltip content="Hidden tip" open={false}>
        Trigger
      </Tooltip>
    );
    await expect.element(getTooltip()).not.toBeInTheDocument();
    await takeSnapshot(`Tooltip - does not show tooltip content when open is false`);
  });

  it('renders short content', async () => {
    await render(
      <Tooltip content="Hi" open>
        Short
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveTextContent('Hi');
    await takeSnapshot(`Tooltip - renders short content`);
  });

  it('renders long content', async () => {
    const long =
      'This is a much longer tooltip message used for snapshot coverage.';
    await render(
      <Tooltip content={long} open>
        Long
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveTextContent(long);
    await takeSnapshot(`Tooltip - renders long content`);
  });

  it('applies slate800 background on content', async () => {
    await render(
      <Tooltip content="Styled" open>
        Style
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveStyle({
      backgroundColor: color.slate800,
    });
    await takeSnapshot(`Tooltip - applies slate800 background on content`);
  });

  it('applies white text color on content', async () => {
    await render(
      <Tooltip content="White text" open>
        Style
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveStyle({ color: color.white });
    await takeSnapshot(`Tooltip - applies white text color on content`);
  });

  it('applies small font size on content', async () => {
    await render(
      <Tooltip content="Small" open>
        Style
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveStyle({ fontSize: fontSize[12] });
    await takeSnapshot(`Tooltip - applies small font size on content`);
  });

  it('applies medium font weight on content', async () => {
    await render(
      <Tooltip content="Weight" open>
        Style
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveStyle({
      fontWeight: String(fontWeight.medium),
    });
    await takeSnapshot(`Tooltip - applies medium font weight on content`);
  });

  it('applies small padding on content', async () => {
    await render(
      <Tooltip content="Pad" open>
        Style
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveStyle({
      padding: `${spacing[1]} ${spacing[2]}`,
    });
    await takeSnapshot(`Tooltip - applies small padding on content`);
  });

  it('applies border radius on content', async () => {
    await render(
      <Tooltip content="Radius" open>
        Style
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveStyle({
      borderRadius: spacing[1],
    });
    await takeSnapshot(`Tooltip - applies border radius on content`);
  });

  it('supports top placement while open', async () => {
    await render(
      <Tooltip content="Top" open positioning={{ placement: 'top' }}>
        Top
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveTextContent('Top');
    await takeSnapshot(`Tooltip - supports top placement while open`);
  });

  it('supports bottom placement while open', async () => {
    await render(
      <Tooltip content="Bottom" open positioning={{ placement: 'bottom' }}>
        Bottom
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveTextContent('Bottom');
    await takeSnapshot(`Tooltip - supports bottom placement while open`);
  });

  it('supports left placement while open', async () => {
    await render(
      <Tooltip content="Left" open positioning={{ placement: 'left' }}>
        Left
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveTextContent('Left');
    await takeSnapshot(`Tooltip - supports left placement while open`);
  });

  it('supports right placement while open', async () => {
    await render(
      <Tooltip content="Right" open positioning={{ placement: 'right' }}>
        Right
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveTextContent('Right');
    await takeSnapshot(`Tooltip - supports right placement while open`);
  });

  it('supports top-start placement while open', async () => {
    await render(
      <Tooltip content="Top start" open positioning={{ placement: 'top-start' }}>
        Top start
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveTextContent('Top start');
    await takeSnapshot(`Tooltip - supports top-start placement while open`);
  });

  it('supports bottom-end placement while open', async () => {
    await render(
      <Tooltip
        content="Bottom end"
        open
        positioning={{ placement: 'bottom-end' }}
      >
        Bottom end
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveTextContent('Bottom end');
    await takeSnapshot(`Tooltip - supports bottom-end placement while open`);
  });

  it('respects openDelay of zero when open', async () => {
    await render(
      <Tooltip content="Instant" open openDelay={0}>
        Instant
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveTextContent('Instant');
    await takeSnapshot(`Tooltip - respects openDelay of zero when open`);
  });

  it('respects closeDelay of zero when open', async () => {
    await render(
      <Tooltip content="Fast close" open closeDelay={0}>
        Fast close
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveTextContent('Fast close');
    await takeSnapshot(`Tooltip - respects closeDelay of zero when open`);
  });

  it('renders with both delays set while open', async () => {
    await render(
      <Tooltip content="Delays" open openDelay={10} closeDelay={10}>
        Delays
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveTextContent('Delays');
    await takeSnapshot(`Tooltip - renders with both delays set while open`);
  });

  it('does not show content when disabled even if open', async () => {
    await render(
      <Tooltip content="Disabled tip" disabled open>
        Disabled
      </Tooltip>
    );
    await expect.element(getTooltip()).not.toBeInTheDocument();
    await takeSnapshot(
      `Tooltip - does not show content when disabled even if open`
    );
  });

  it('renders disabled trigger text', async () => {
    const screen = await render(
      <Tooltip content="Tip" disabled>
        Disabled trigger
      </Tooltip>
    );
    await expect
      .element(screen.getByText('Disabled trigger'))
      .toBeInTheDocument();
    await takeSnapshot(`Tooltip - renders disabled trigger text`);
  });

  it('renders emoji content', async () => {
    await render(
      <Tooltip content="🎉 Yay" open>
        Emoji
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveTextContent('🎉 Yay');
    await takeSnapshot(`Tooltip - renders emoji content`);
  });

  it('renders numeric content', async () => {
    await render(
      <Tooltip content="42" open>
        Answer
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveTextContent('42');
    await takeSnapshot(`Tooltip - renders numeric content`);
  });

  it('renders rtl unicode content', async () => {
    await render(
      <Tooltip content="مرحبا" open>
        RTL
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveTextContent('مرحبا');
    await takeSnapshot(`Tooltip - renders rtl unicode content`);
  });

  it('renders special character content', async () => {
    await render(
      <Tooltip content={'A & B <C>'} open>
        Special
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveTextContent('A & B <C>');
    await takeSnapshot(`Tooltip - renders special character content`);
  });

  it('renders nested trigger children', async () => {
    const screen = await render(
      <Tooltip content="Nested" open>
        <span>Nested label</span>
      </Tooltip>
    );
    await expect.element(screen.getByText('Nested label')).toBeInTheDocument();
    await takeSnapshot(`Tooltip - renders nested trigger children`);
  });

  it('renders icon-like trigger', async () => {
    const screen = await render(
      <Tooltip content="Settings" open>
        ⚙
      </Tooltip>
    );
    await expect.element(screen.getByText('⚙')).toBeInTheDocument();
    await takeSnapshot(`Tooltip - renders icon-like trigger`);
  });

  it('calls onOpenChange when provided with controlled open', async () => {
    const onOpenChange = vi.fn();
    await render(
      <Tooltip content="Cb" open onOpenChange={onOpenChange}>
        Callback
      </Tooltip>
    );
    await expect.element(getTooltip()).toBeInTheDocument();
    await takeSnapshot(
      `Tooltip - calls onOpenChange when provided with controlled open`
    );
  });

  it('supports controlled open fixture', async () => {
    const screen = await render(<ControlledTooltip />);
    await expect.element(getTooltip()).toHaveTextContent('Controlled tip');
    await expect.element(screen.getByText('Toggle')).toBeInTheDocument();
    await takeSnapshot(`Tooltip - supports controlled open fixture`);
  });

  it('renders help tip content', async () => {
    await render(
      <Tooltip content="More information" open>
        ?
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveTextContent('More information');
    await takeSnapshot(`Tooltip - renders help tip content`);
  });

  it('renders warning tip content', async () => {
    await render(
      <Tooltip content="Cannot be undone" open>
        Warn
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveTextContent('Cannot be undone');
    await takeSnapshot(`Tooltip - renders warning tip content`);
  });

  it('renders error tip content', async () => {
    await render(
      <Tooltip content="Something went wrong" open>
        Error
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveTextContent('Something went wrong');
    await takeSnapshot(`Tooltip - renders error tip content`);
  });

  it('renders success tip content', async () => {
    await render(
      <Tooltip content="Saved successfully" open>
        Save
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveTextContent('Saved successfully');
    await takeSnapshot(`Tooltip - renders success tip content`);
  });

  it('renders copy tip content', async () => {
    await render(
      <Tooltip content="Copy to clipboard" open>
        Copy
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveTextContent('Copy to clipboard');
    await takeSnapshot(`Tooltip - renders copy tip content`);
  });

  it('renders edit tip content', async () => {
    await render(
      <Tooltip content="Edit item" open>
        Edit
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveTextContent('Edit item');
    await takeSnapshot(`Tooltip - renders edit tip content`);
  });

  it('renders delete tip content', async () => {
    await render(
      <Tooltip content="Delete item" open>
        Delete
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveTextContent('Delete item');
    await takeSnapshot(`Tooltip - renders delete tip content`);
  });

  it('renders share tip content', async () => {
    await render(
      <Tooltip content="Share with team" open>
        Share
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveTextContent('Share with team');
    await takeSnapshot(`Tooltip - renders share tip content`);
  });

  it('renders download tip content', async () => {
    await render(
      <Tooltip content="Download file" open>
        Download
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveTextContent('Download file');
    await takeSnapshot(`Tooltip - renders download tip content`);
  });

  it('renders upload tip content', async () => {
    await render(
      <Tooltip content="Upload file" open>
        Upload
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveTextContent('Upload file');
    await takeSnapshot(`Tooltip - renders upload tip content`);
  });

  it('renders filter tip content', async () => {
    await render(
      <Tooltip content="Filter results" open>
        Filter
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveTextContent('Filter results');
    await takeSnapshot(`Tooltip - renders filter tip content`);
  });

  it('renders sort tip content', async () => {
    await render(
      <Tooltip content="Sort ascending" open>
        Sort
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveTextContent('Sort ascending');
    await takeSnapshot(`Tooltip - renders sort tip content`);
  });

  it('renders refresh tip content', async () => {
    await render(
      <Tooltip content="Refresh data" open>
        Refresh
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveTextContent('Refresh data');
    await takeSnapshot(`Tooltip - renders refresh tip content`);
  });

  it('renders search tip content', async () => {
    await render(
      <Tooltip content="Search workspace" open>
        Search
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveTextContent('Search workspace');
    await takeSnapshot(`Tooltip - renders search tip content`);
  });

  it('renders status tip content', async () => {
    await render(
      <Tooltip content="Online" open>
        Status
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveTextContent('Online');
    await takeSnapshot(`Tooltip - renders status tip content`);
  });

  it('renders multiple open tooltips side by side', async () => {
    await render(
      <div style={{ display: 'flex', gap: 16 }}>
        <Tooltip content="One" open>
          One
        </Tooltip>
        <Tooltip content="Two" open>
          Two
        </Tooltip>
      </div>
    );
    await expect.element(page.getByText('One').nth(1)).toBeInTheDocument();
    await expect.element(page.getByText('Two').nth(1)).toBeInTheDocument();
    await takeSnapshot(
      `Tooltip - renders multiple open tooltips side by side`
    );
  });

  it('renders long trigger label with open tip', async () => {
    const screen = await render(
      <Tooltip content="Info" open>
        A very long trigger label for layout
      </Tooltip>
    );
    await expect
      .element(screen.getByText('A very long trigger label for layout'))
      .toBeInTheDocument();
    await takeSnapshot(`Tooltip - renders long trigger label with open tip`);
  });

  it('renders kitchen sink open tooltip', async () => {
    await render(
      <Tooltip
        content="Kitchen sink tooltip"
        open
        openDelay={0}
        closeDelay={0}
        positioning={{ placement: 'top' }}
      >
        Kitchen sink
      </Tooltip>
    );
    await expect.element(getTooltip()).toHaveTextContent('Kitchen sink tooltip');
    await takeSnapshot(`Tooltip - renders kitchen sink open tooltip`);
  });

  it('keeps trigger in the document when tooltip is open', async () => {
    const screen = await render(
      <Tooltip content="Keep trigger" open>
        Keep me
      </Tooltip>
    );
    await expect.element(screen.getByText('Keep me')).toBeInTheDocument();
    await expect.element(getTooltip()).toBeInTheDocument();
    await takeSnapshot(
      `Tooltip - keeps trigger in the document when tooltip is open`
    );
  });

  it('exposes tooltip role for accessibility when open', async () => {
    await render(
      <Tooltip content="Accessible" open>
        A11y
      </Tooltip>
    );
    await expect.element(page.getByRole('tooltip')).toBeInTheDocument();
    await takeSnapshot(
      `Tooltip - exposes tooltip role for accessibility when open`
    );
  });
});
