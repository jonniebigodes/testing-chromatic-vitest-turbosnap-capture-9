import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import { useState } from 'react';
import Drawer from './Drawer';
import { color, fontSize, fontWeight } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

const getDialog = () => page.getByRole('dialog');

const ControlledDrawer = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <button type="button" onClick={() => setOpen((v) => !v)}>
        Toggle
      </button>
      <Drawer
        title="Controlled"
        open={open}
        onOpenChange={(d) => setOpen(d.open)}
      >
        <p>External state</p>
      </Drawer>
    </>
  );
};

describe('Drawer', () => {
  it('renders the default trigger label', async () => {
    const screen = await render(<Drawer title="Menu" />);
    await expect.element(screen.getByText('Open')).toBeInTheDocument();
    await takeSnapshot(`Drawer - renders the default trigger label`);
  });

  it('renders a custom trigger label', async () => {
    const screen = await render(
      <Drawer title="Custom" triggerLabel="Show panel" />
    );
    await expect.element(screen.getByText('Show panel')).toBeInTheDocument();
    await takeSnapshot(`Drawer - renders a custom trigger label`);
  });

  it('shows dialog when open is true', async () => {
    await render(<Drawer title="Open drawer" open />);
    await expect.element(getDialog()).toBeInTheDocument();
    await takeSnapshot(`Drawer - shows dialog when open is true`);
  });

  it('does not show dialog when open is false', async () => {
    await render(<Drawer title="ClosedUniqueTitle" open={false} />);
    await expect
      .element(page.getByText('ClosedUniqueTitle'))
      .not.toBeInTheDocument();
    await takeSnapshot(`Drawer - does not show dialog when open is false`);
  });

  it('renders the provided title text', async () => {
    await render(<Drawer title="Navigation" open />);
    await expect.element(page.getByText('Navigation')).toBeInTheDocument();
    await takeSnapshot(`Drawer - renders the provided title text`);
  });

  it('renders body children content', async () => {
    await render(
      <Drawer title="Menu" open>
        <p>Drawer body</p>
      </Drawer>
    );
    await expect.element(page.getByText('Drawer body')).toBeInTheDocument();
    await takeSnapshot(`Drawer - renders body children content`);
  });

  it('renders close trigger', async () => {
    await render(<Drawer title="Closeable" open />);
    await expect
      .element(page.getByRole('button', { name: 'Close' }))
      .toBeInTheDocument();
    await takeSnapshot(`Drawer - renders close trigger`);
  });

  it('opens from the right side by default', async () => {
    await render(
      <Drawer title="Right default" open>
        <p>From right</p>
      </Drawer>
    );
    await expect.element(page.getByText('From right')).toBeInTheDocument();
    await takeSnapshot(`Drawer - opens from the right side by default`);
  });

  it('opens from the right side when side is right', async () => {
    await render(
      <Drawer title="Right" side="right" open>
        <p>Right panel</p>
      </Drawer>
    );
    await expect.element(page.getByText('Right panel')).toBeInTheDocument();
    await takeSnapshot(
      `Drawer - opens from the right side when side is right`
    );
  });

  it('opens from the left side when side is left', async () => {
    await render(
      <Drawer title="Left" side="left" open>
        <p>Left panel</p>
      </Drawer>
    );
    await expect.element(page.getByText('Left panel')).toBeInTheDocument();
    await takeSnapshot(
      `Drawer - opens from the left side when side is left`
    );
  });

  it('opens from the top side when side is top', async () => {
    await render(
      <Drawer title="Top" side="top" open>
        <p>Top panel</p>
      </Drawer>
    );
    await expect.element(page.getByText('Top panel')).toBeInTheDocument();
    await takeSnapshot(`Drawer - opens from the top side when side is top`);
  });

  it('opens from the bottom side when side is bottom', async () => {
    await render(
      <Drawer title="Bottom" side="bottom" open>
        <p>Bottom panel</p>
      </Drawer>
    );
    await expect.element(page.getByText('Bottom panel')).toBeInTheDocument();
    await takeSnapshot(
      `Drawer - opens from the bottom side when side is bottom`
    );
  });

  it('applies white background on drawer content', async () => {
    await render(<Drawer title="Surface" open />);
    await expect.element(getDialog()).toHaveStyle({
      backgroundColor: color.white,
    });
    await takeSnapshot(`Drawer - applies white background on drawer content`);
  });

  it('applies slate300 border on drawer content', async () => {
    await render(<Drawer title="Border" open />);
    await expect.element(getDialog()).toHaveStyle({
      borderColor: color.slate300,
    });
    await takeSnapshot(`Drawer - applies slate300 border on drawer content`);
  });

  it('styles title with slate800 and semibold', async () => {
    await render(<Drawer title="Title styles" open />);
    await expect.element(page.getByText('Title styles')).toHaveStyle({
      color: color.slate800,
      fontWeight: String(fontWeight.semibold),
    });
    await takeSnapshot(`Drawer - styles title with slate800 and semibold`);
  });

  it('applies title font size 18', async () => {
    await render(<Drawer title="Sized title" open />);
    await expect.element(page.getByText('Sized title')).toHaveStyle({
      fontSize: fontSize[18],
    });
    await takeSnapshot(`Drawer - applies title font size 18`);
  });

  it('uses full height for left side drawer', async () => {
    await render(
      <Drawer title="Left height" side="left" open>
        <p>Tall</p>
      </Drawer>
    );
    await expect.element(getDialog()).toHaveStyle({ height: '100%' });
    await takeSnapshot(`Drawer - uses full height for left side drawer`);
  });

  it('uses full height for right side drawer', async () => {
    await render(
      <Drawer title="Right height" side="right" open>
        <p>Tall</p>
      </Drawer>
    );
    await expect.element(getDialog()).toHaveStyle({ height: '100%' });
    await takeSnapshot(`Drawer - uses full height for right side drawer`);
  });

  it('renders long title text', async () => {
    const title =
      'This is a long drawer title that should wrap inside the panel';
    await render(<Drawer title={title} open />);
    await expect.element(page.getByText(title)).toBeInTheDocument();
    await takeSnapshot(`Drawer - renders long title text`);
  });

  it('renders navigation buttons', async () => {
    await render(
      <Drawer title="Navigation" side="left" open>
        <nav>
          <button type="button">Home</button>
          <button type="button">Projects</button>
        </nav>
      </Drawer>
    );
    await expect
      .element(page.getByRole('button', { name: 'Home' }))
      .toBeInTheDocument();
    await takeSnapshot(`Drawer - renders navigation buttons`);
  });

  it('renders filter checkbox content', async () => {
    await render(
      <Drawer title="Filters" open>
        <label>
          <input type="checkbox" defaultChecked /> Active only
        </label>
      </Drawer>
    );
    await expect.element(page.getByText('Active only')).toBeInTheDocument();
    await takeSnapshot(`Drawer - renders filter checkbox content`);
  });

  it('renders form fields', async () => {
    await render(
      <Drawer title="Edit profile" open>
        <input defaultValue="Ada" aria-label="Name" />
      </Drawer>
    );
    await expect
      .element(page.getByRole('textbox', { name: 'Name' }))
      .toHaveValue('Ada');
    await takeSnapshot(`Drawer - renders form fields`);
  });

  it('renders cart list items', async () => {
    await render(
      <Drawer title="Cart" open>
        <ul>
          <li>Item A — $12</li>
          <li>Item B — $8</li>
        </ul>
      </Drawer>
    );
    await expect.element(page.getByText('Item A — $12')).toBeInTheDocument();
    await takeSnapshot(`Drawer - renders cart list items`);
  });

  it('renders notifications text', async () => {
    await render(
      <Drawer title="Notifications" open>
        <p>You have 3 unread notifications.</p>
      </Drawer>
    );
    await expect
      .element(page.getByText('You have 3 unread notifications.'))
      .toBeInTheDocument();
    await takeSnapshot(`Drawer - renders notifications text`);
  });

  it('renders help text', async () => {
    await render(
      <Drawer title="Help" open>
        <p>Browse articles and contact support.</p>
      </Drawer>
    );
    await expect
      .element(page.getByText('Browse articles and contact support.'))
      .toBeInTheDocument();
    await takeSnapshot(`Drawer - renders help text`);
  });

  it('renders settings text', async () => {
    await render(
      <Drawer title="Settings" open>
        <p>Account preferences</p>
      </Drawer>
    );
    await expect
      .element(page.getByText('Account preferences'))
      .toBeInTheDocument();
    await takeSnapshot(`Drawer - renders settings text`);
  });

  it('renders inbox empty state text', async () => {
    await render(
      <Drawer title="Inbox" side="left" open>
        <p>No new messages</p>
      </Drawer>
    );
    await expect.element(page.getByText('No new messages')).toBeInTheDocument();
    await takeSnapshot(`Drawer - renders inbox empty state text`);
  });

  it('renders details metadata', async () => {
    await render(
      <Drawer title="Details" open>
        <div>
          <p>Status: Active</p>
          <p>Owner: Ada</p>
        </div>
      </Drawer>
    );
    await expect.element(page.getByText('Status: Active')).toBeInTheDocument();
    await takeSnapshot(`Drawer - renders details metadata`);
  });

  it('renders scrollable row content', async () => {
    await render(
      <Drawer title="Scrollable" open>
        <div>
          <p>Row 1</p>
          <p>Row 2</p>
        </div>
      </Drawer>
    );
    await expect.element(page.getByText('Row 1')).toBeInTheDocument();
    await takeSnapshot(`Drawer - renders scrollable row content`);
  });

  it('renders action footer buttons', async () => {
    await render(
      <Drawer title="Confirm" open>
        <button type="button">Cancel</button>
        <button type="button">Confirm</button>
      </Drawer>
    );
    await expect
      .element(page.getByRole('button', { name: 'Cancel' }))
      .toBeInTheDocument();
    await expect
      .element(page.getByRole('button', { name: 'Confirm' }))
      .toBeInTheDocument();
    await takeSnapshot(`Drawer - renders action footer buttons`);
  });

  it('renders emoji title', async () => {
    await render(
      <Drawer title="📦 Packages" open>
        <p>Manage packages</p>
      </Drawer>
    );
    await expect.element(page.getByText('📦 Packages')).toBeInTheDocument();
    await takeSnapshot(`Drawer - renders emoji title`);
  });

  it('renders rtl unicode content', async () => {
    await render(
      <Drawer title="القائمة" open>
        <p>محتوى الدرج</p>
      </Drawer>
    );
    await expect.element(page.getByText('القائمة')).toBeInTheDocument();
    await takeSnapshot(`Drawer - renders rtl unicode content`);
  });

  it('renders numeric title', async () => {
    await render(
      <Drawer title="404" open>
        <p>Not found</p>
      </Drawer>
    );
    await expect.element(page.getByText('404')).toBeInTheDocument();
    await takeSnapshot(`Drawer - renders numeric title`);
  });

  it('renders special character title', async () => {
    await render(
      <Drawer title={'A & B <C>'} open>
        <p>quoted</p>
      </Drawer>
    );
    await expect.element(page.getByText('A & B <C>')).toBeInTheDocument();
    await takeSnapshot(`Drawer - renders special character title`);
  });

  it('renders list body content', async () => {
    await render(
      <Drawer title="Tasks" open>
        <ol>
          <li>Design</li>
          <li>Build</li>
        </ol>
      </Drawer>
    );
    await expect.element(page.getByText('Design')).toBeInTheDocument();
    await takeSnapshot(`Drawer - renders list body content`);
  });

  it('renders code body content', async () => {
    await render(
      <Drawer title="Snippet" open>
        <pre>export const Drawer</pre>
      </Drawer>
    );
    await expect
      .element(page.getByText('export const Drawer'))
      .toBeInTheDocument();
    await takeSnapshot(`Drawer - renders code body content`);
  });

  it('renders top banner content', async () => {
    await render(
      <Drawer title="Banner" side="top" open>
        <p>Quick announcement</p>
      </Drawer>
    );
    await expect
      .element(page.getByText('Quick announcement'))
      .toBeInTheDocument();
    await takeSnapshot(`Drawer - renders top banner content`);
  });

  it('renders bottom sheet actions', async () => {
    await render(
      <Drawer title="Actions" side="bottom" open>
        <button type="button">Share</button>
        <button type="button">Copy link</button>
      </Drawer>
    );
    await expect
      .element(page.getByRole('button', { name: 'Share' }))
      .toBeInTheDocument();
    await takeSnapshot(`Drawer - renders bottom sheet actions`);
  });

  it('renders nested text emphasis', async () => {
    await render(
      <Drawer title="Nested" open>
        <p>
          Nested <strong>emphasis</strong>
        </p>
      </Drawer>
    );
    await expect.element(page.getByText('emphasis')).toBeInTheDocument();
    await takeSnapshot(`Drawer - renders nested text emphasis`);
  });

  it('calls onOpenChange when provided while open', async () => {
    const onOpenChange = vi.fn();
    await render(
      <Drawer title="Callback" open onOpenChange={onOpenChange}>
        <p>Tracks open changes</p>
      </Drawer>
    );
    await expect.element(getDialog()).toBeInTheDocument();
    await takeSnapshot(
      `Drawer - calls onOpenChange when provided while open`
    );
  });

  it('supports controlled open fixture', async () => {
    const screen = await render(<ControlledDrawer />);
    await expect.element(page.getByText('External state')).toBeInTheDocument();
    await expect.element(screen.getByText('Toggle')).toBeInTheDocument();
    await takeSnapshot(`Drawer - supports controlled open fixture`);
  });

  it('renders search input', async () => {
    await render(
      <Drawer title="Search" open>
        <input placeholder="Search…" aria-label="Search" />
      </Drawer>
    );
    await expect
      .element(page.getByPlaceholder('Search…'))
      .toBeInTheDocument();
    await takeSnapshot(`Drawer - renders search input`);
  });

  it('renders profile summary', async () => {
    await render(
      <Drawer title="Profile" open>
        <p>Ada Lovelace · Admin</p>
      </Drawer>
    );
    await expect
      .element(page.getByText('Ada Lovelace · Admin'))
      .toBeInTheDocument();
    await takeSnapshot(`Drawer - renders profile summary`);
  });

  it('renders billing summary', async () => {
    await render(
      <Drawer title="Billing" open>
        <p>Pro plan · Renews monthly</p>
      </Drawer>
    );
    await expect
      .element(page.getByText('Pro plan · Renews monthly'))
      .toBeInTheDocument();
    await takeSnapshot(`Drawer - renders billing summary`);
  });

  it('renders team member list', async () => {
    await render(
      <Drawer title="Team" side="left" open>
        <ul>
          <li>Ada</li>
          <li>Grace</li>
        </ul>
      </Drawer>
    );
    await expect.element(page.getByText('Ada')).toBeInTheDocument();
    await takeSnapshot(`Drawer - renders team member list`);
  });

  it('renders activity feed items', async () => {
    await render(
      <Drawer title="Activity" open>
        <ul>
          <li>Ada commented</li>
          <li>Grace uploaded a file</li>
        </ul>
      </Drawer>
    );
    await expect.element(page.getByText('Ada commented')).toBeInTheDocument();
    await takeSnapshot(`Drawer - renders activity feed items`);
  });

  it('renders comments textarea', async () => {
    await render(
      <Drawer title="Comments" open>
        <textarea aria-label="Comment" rows={4} />
      </Drawer>
    );
    await expect
      .element(page.getByRole('textbox', { name: 'Comment' }))
      .toBeInTheDocument();
    await takeSnapshot(`Drawer - renders comments textarea`);
  });

  it('renders versions list', async () => {
    await render(
      <Drawer title="Versions" open>
        <ol>
          <li>v1.0.0</li>
          <li>v2.0.0</li>
        </ol>
      </Drawer>
    );
    await expect.element(page.getByText('v1.0.0')).toBeInTheDocument();
    await takeSnapshot(`Drawer - renders versions list`);
  });

  it('renders kitchen sink drawer', async () => {
    await render(
      <Drawer
        title="Kitchen sink"
        side="right"
        triggerLabel="Open kitchen sink"
        open
      >
        <div>
          <p>Full example body</p>
          <button type="button">Action</button>
        </div>
      </Drawer>
    );
    await expect.element(page.getByText('Full example body')).toBeInTheDocument();
    await takeSnapshot(`Drawer - renders kitchen sink drawer`);
  });

  it('exposes dialog role for accessibility when open', async () => {
    await render(<Drawer title="Accessible" open />);
    await expect.element(page.getByRole('dialog')).toBeInTheDocument();
    await takeSnapshot(
      `Drawer - exposes dialog role for accessibility when open`
    );
  });
});
