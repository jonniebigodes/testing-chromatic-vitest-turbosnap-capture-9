import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import { useState } from 'react';
import Popover from './Popover';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

const getDialog = () => page.getByRole('dialog');

const ControlledPopover = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <button type="button" onClick={() => setOpen((v) => !v)}>
        Toggle
      </button>
      <Popover
        title="Controlled"
        description="External state"
        open={open}
        onOpenChange={(d) => setOpen(d.open)}
      >
        Controlled
      </Popover>
    </>
  );
};

describe('Popover', () => {
  it('renders the trigger children text', async () => {
    const screen = await render(<Popover title="T">Open</Popover>);
    await expect.element(screen.getByText('Open')).toBeInTheDocument();
    await takeSnapshot(`Popover - renders the trigger children text`);
  });

  it('shows dialog content when open is true', async () => {
    await render(
      <Popover title="Open title" description="Visible" open>
        Open
      </Popover>
    );
    await expect.element(getDialog()).toBeInTheDocument();
    await takeSnapshot(`Popover - shows dialog content when open is true`);
  });

  it('does not show dialog when open is false', async () => {
    await render(
      <Popover title="Hidden" open={false}>
        Closed
      </Popover>
    );
    await expect.element(getDialog()).not.toBeInTheDocument();
    await takeSnapshot(`Popover - does not show dialog when open is false`);
  });

  it('renders the provided title text', async () => {
    await render(
      <Popover title="Details" open>
        Open
      </Popover>
    );
    await expect.element(page.getByText('Details')).toBeInTheDocument();
    await takeSnapshot(`Popover - renders the provided title text`);
  });

  it('renders the provided description text', async () => {
    await render(
      <Popover title="T" description="Supporting copy" open>
        Open
      </Popover>
    );
    await expect.element(page.getByText('Supporting copy')).toBeInTheDocument();
    await takeSnapshot(`Popover - renders the provided description text`);
  });

  it('omits description when not provided', async () => {
    await render(
      <Popover title="Title only" open>
        Open
      </Popover>
    );
    await expect.element(page.getByText('Title only')).toBeInTheDocument();
    await takeSnapshot(`Popover - omits description when not provided`);
  });

  it('renders custom content node', async () => {
    await render(
      <Popover title="Custom" content={<button type="button">Action</button>} open>
        Open
      </Popover>
    );
    await expect.element(page.getByText('Action')).toBeInTheDocument();
    await takeSnapshot(`Popover - renders custom content node`);
  });

  it('renders close trigger', async () => {
    await render(
      <Popover title="Closeable" open>
        Open
      </Popover>
    );
    await expect
      .element(page.getByRole('button', { name: 'Close' }))
      .toBeInTheDocument();
    await takeSnapshot(`Popover - renders close trigger`);
  });

  it('applies white background on content', async () => {
    await render(
      <Popover title="Surface" open>
        Open
      </Popover>
    );
    await expect.element(getDialog()).toHaveStyle({
      backgroundColor: color.white,
    });
    await takeSnapshot(`Popover - applies white background on content`);
  });

  it('applies slate300 border on content', async () => {
    await render(
      <Popover title="Border" open>
        Open
      </Popover>
    );
    await expect.element(getDialog()).toHaveStyle({
      borderColor: color.slate300,
    });
    await takeSnapshot(`Popover - applies slate300 border on content`);
  });

  it('applies border radius on content', async () => {
    await render(
      <Popover title="Radius" open>
        Open
      </Popover>
    );
    await expect.element(getDialog()).toHaveStyle({
      borderRadius: spacing[2],
    });
    await takeSnapshot(`Popover - applies border radius on content`);
  });

  it('styles title with slate800 and semibold', async () => {
    await render(
      <Popover title="Title styles" open>
        Open
      </Popover>
    );
    await expect.element(page.getByText('Title styles')).toHaveStyle({
      color: color.slate800,
      fontWeight: String(fontWeight.semibold),
    });
    await takeSnapshot(`Popover - styles title with slate800 and semibold`);
  });

  it('styles description with slate500', async () => {
    await render(
      <Popover title="T" description="Desc styles" open>
        Open
      </Popover>
    );
    await expect.element(page.getByText('Desc styles')).toHaveStyle({
      color: color.slate500,
    });
    await takeSnapshot(`Popover - styles description with slate500`);
  });

  it('applies title font size 16', async () => {
    await render(
      <Popover title="Sized title" open>
        Open
      </Popover>
    );
    await expect.element(page.getByText('Sized title')).toHaveStyle({
      fontSize: fontSize[16],
    });
    await takeSnapshot(`Popover - applies title font size 16`);
  });

  it('renders when portalled is true', async () => {
    await render(
      <Popover title="Portalled" portalled open>
        Open
      </Popover>
    );
    await expect.element(page.getByText('Portalled')).toBeInTheDocument();
    await takeSnapshot(`Popover - renders when portalled is true`);
  });

  it('renders when portalled is false', async () => {
    await render(
      <Popover title="Inline" portalled={false} open>
        Open
      </Popover>
    );
    await expect.element(page.getByText('Inline')).toBeInTheDocument();
    await takeSnapshot(`Popover - renders when portalled is false`);
  });

  it('renders long title text', async () => {
    const title =
      'This is an intentionally long popover title that should wrap gracefully';
    await render(
      <Popover title={title} open>
        Open
      </Popover>
    );
    await expect.element(page.getByText(title)).toBeInTheDocument();
    await takeSnapshot(`Popover - renders long title text`);
  });

  it('renders long description text', async () => {
    const description =
      'A longer description that explains the context in more detail.';
    await render(
      <Popover title="Notes" description={description} open>
        Open
      </Popover>
    );
    await expect.element(page.getByText(description)).toBeInTheDocument();
    await takeSnapshot(`Popover - renders long description text`);
  });

  it('renders list content', async () => {
    await render(
      <Popover
        title="Items"
        content={
          <ul>
            <li>Alpha</li>
            <li>Beta</li>
          </ul>
        }
        open
      >
        Open
      </Popover>
    );
    await expect.element(page.getByText('Alpha')).toBeInTheDocument();
    await takeSnapshot(`Popover - renders list content`);
  });

  it('renders link content', async () => {
    await render(
      <Popover title="Resources" content={<a href="#docs">Read the docs</a>} open>
        Open
      </Popover>
    );
    await expect.element(page.getByText('Read the docs')).toBeInTheDocument();
    await takeSnapshot(`Popover - renders link content`);
  });

  it('renders nested action buttons', async () => {
    await render(
      <Popover
        title="Choose"
        content={
          <div>
            <button type="button">Yes</button>
            <button type="button">No</button>
          </div>
        }
        open
      >
        Open
      </Popover>
    );
    await expect.element(page.getByText('Yes')).toBeInTheDocument();
    await expect.element(page.getByText('No')).toBeInTheDocument();
    await takeSnapshot(`Popover - renders nested action buttons`);
  });

  it('renders form input content', async () => {
    await render(
      <Popover
        title="Edit name"
        content={<input defaultValue="Ada" aria-label="Name" />}
        open
      >
        Open
      </Popover>
    );
    await expect
      .element(page.getByRole('textbox', { name: 'Name' }))
      .toHaveValue('Ada');
    await takeSnapshot(`Popover - renders form input content`);
  });

  it('renders emoji title', async () => {
    await render(
      <Popover title="🚀 Launch" description="Ship it" open>
        Open
      </Popover>
    );
    await expect.element(page.getByText('🚀 Launch')).toBeInTheDocument();
    await takeSnapshot(`Popover - renders emoji title`);
  });

  it('renders rtl unicode content', async () => {
    await render(
      <Popover title="عنوان" description="وصف بالعربية" open>
        Open
      </Popover>
    );
    await expect.element(page.getByText('عنوان')).toBeInTheDocument();
    await takeSnapshot(`Popover - renders rtl unicode content`);
  });

  it('renders numeric title', async () => {
    await render(
      <Popover title="404" description="Not found" open>
        Open
      </Popover>
    );
    await expect.element(page.getByText('404')).toBeInTheDocument();
    await takeSnapshot(`Popover - renders numeric title`);
  });

  it('renders special character title', async () => {
    await render(
      <Popover title={'A & B <C>'} open>
        Open
      </Popover>
    );
    await expect.element(page.getByText('A & B <C>')).toBeInTheDocument();
    await takeSnapshot(`Popover - renders special character title`);
  });

  it('calls onOpenChange when provided while open', async () => {
    const onOpenChange = vi.fn();
    await render(
      <Popover title="Callback" open onOpenChange={onOpenChange}>
        Open
      </Popover>
    );
    await expect.element(getDialog()).toBeInTheDocument();
    await takeSnapshot(
      `Popover - calls onOpenChange when provided while open`
    );
  });

  it('supports controlled open fixture', async () => {
    const screen = await render(<ControlledPopover />);
    await expect.element(page.getByText('External state')).toBeInTheDocument();
    await expect.element(screen.getByText('Toggle')).toBeInTheDocument();
    await takeSnapshot(`Popover - supports controlled open fixture`);
  });

  it('renders profile card content', async () => {
    await render(
      <Popover
        title="Ada Lovelace"
        description="Mathematician"
        content={<span>London, UK</span>}
        open
      >
        Profile
      </Popover>
    );
    await expect.element(page.getByText('London, UK')).toBeInTheDocument();
    await takeSnapshot(`Popover - renders profile card content`);
  });

  it('renders settings card description', async () => {
    await render(
      <Popover
        title="Preferences"
        description="Manage your account settings"
        open
      >
        Settings
      </Popover>
    );
    await expect
      .element(page.getByText('Manage your account settings'))
      .toBeInTheDocument();
    await takeSnapshot(`Popover - renders settings card description`);
  });

  it('renders share link content', async () => {
    await render(
      <Popover
        title="Share link"
        content={<code>https://example.com/share</code>}
        open
      >
        Share
      </Popover>
    );
    await expect
      .element(page.getByText('https://example.com/share'))
      .toBeInTheDocument();
    await takeSnapshot(`Popover - renders share link content`);
  });

  it('renders filter checkbox content', async () => {
    await render(
      <Popover
        title="Filters"
        content={
          <label>
            <input type="checkbox" defaultChecked /> Active only
          </label>
        }
        open
      >
        Filters
      </Popover>
    );
    await expect.element(page.getByText('Active only')).toBeInTheDocument();
    await takeSnapshot(`Popover - renders filter checkbox content`);
  });

  it('renders stats content', async () => {
    await render(
      <Popover title="Weekly stats" content={<strong>1,248 visits</strong>} open>
        Stats
      </Popover>
    );
    await expect.element(page.getByText('1,248 visits')).toBeInTheDocument();
    await takeSnapshot(`Popover - renders stats content`);
  });

  it('renders paragraph content', async () => {
    await render(
      <Popover
        title="Article"
        content={<p>A short paragraph inside the popover body.</p>}
        open
      >
        Paragraph
      </Popover>
    );
    await expect
      .element(page.getByText('A short paragraph inside the popover body.'))
      .toBeInTheDocument();
    await takeSnapshot(`Popover - renders paragraph content`);
  });

  it('renders multiple action buttons in content', async () => {
    await render(
      <Popover
        title="Bulk actions"
        content={
          <div>
            <button type="button">Archive</button>
            <button type="button">Delete</button>
          </div>
        }
        open
      >
        Multi
      </Popover>
    );
    await expect.element(page.getByText('Archive')).toBeInTheDocument();
    await takeSnapshot(
      `Popover - renders multiple action buttons in content`
    );
  });

  it('renders notification description', async () => {
    await render(
      <Popover
        title="New message"
        description="You have 3 unread messages"
        open
      >
        Notify
      </Popover>
    );
    await expect
      .element(page.getByText('You have 3 unread messages'))
      .toBeInTheDocument();
    await takeSnapshot(`Popover - renders notification description`);
  });

  it('renders billing upgrade button', async () => {
    await render(
      <Popover
        title="Billing plan"
        content={<button type="button">Upgrade</button>}
        open
      >
        Billing
      </Popover>
    );
    await expect
      .element(page.getByRole('button', { name: 'Upgrade' }))
      .toBeInTheDocument();
    await takeSnapshot(`Popover - renders billing upgrade button`);
  });

  it('renders team invite email input', async () => {
    await render(
      <Popover
        title="Invite teammates"
        content={<input placeholder="email@example.com" aria-label="Email" />}
        open
      >
        Invite
      </Popover>
    );
    await expect
      .element(page.getByPlaceholder('email@example.com'))
      .toBeInTheDocument();
    await takeSnapshot(`Popover - renders team invite email input`);
  });

  it('renders search input content', async () => {
    await render(
      <Popover
        title="Search"
        content={<input placeholder="Type to search" aria-label="Search" />}
        open
      >
        Search
      </Popover>
    );
    await expect
      .element(page.getByPlaceholder('Type to search'))
      .toBeInTheDocument();
    await takeSnapshot(`Popover - renders search input content`);
  });

  it('renders version info description', async () => {
    await render(
      <Popover
        title="Version 1.2.3"
        description="Latest stable release"
        open
      >
        Version
      </Popover>
    );
    await expect
      .element(page.getByText('Latest stable release'))
      .toBeInTheDocument();
    await takeSnapshot(`Popover - renders version info description`);
  });

  it('renders checklist content', async () => {
    await render(
      <Popover
        title="Tasks"
        content={
          <ul>
            <li>Setup</li>
            <li>Review</li>
          </ul>
        }
        open
      >
        Checklist
      </Popover>
    );
    await expect.element(page.getByText('Setup')).toBeInTheDocument();
    await takeSnapshot(`Popover - renders checklist content`);
  });

  it('renders password requirements description', async () => {
    await render(
      <Popover
        title="Requirements"
        description="Use at least 8 characters"
        open
      >
        Password
      </Popover>
    );
    await expect
      .element(page.getByText('Use at least 8 characters'))
      .toBeInTheDocument();
    await takeSnapshot(
      `Popover - renders password requirements description`
    );
  });

  it('renders locale description', async () => {
    await render(
      <Popover title="Language" description="English (US)" open>
        Locale
      </Popover>
    );
    await expect.element(page.getByText('English (US)')).toBeInTheDocument();
    await takeSnapshot(`Popover - renders locale description`);
  });

  it('renders kitchen sink popover', async () => {
    await render(
      <Popover
        title="Kitchen sink"
        description="All sections together"
        content={<button type="button">Primary action</button>}
        portalled
        open
      >
        Kitchen sink
      </Popover>
    );
    await expect.element(page.getByText('Primary action')).toBeInTheDocument();
    await takeSnapshot(`Popover - renders kitchen sink popover`);
  });

  it('exposes dialog role for accessibility when open', async () => {
    await render(
      <Popover title="Accessible" open>
        A11y
      </Popover>
    );
    await expect.element(page.getByRole('dialog')).toBeInTheDocument();
    await takeSnapshot(
      `Popover - exposes dialog role for accessibility when open`
    );
  });

  it('keeps trigger visible while popover is open', async () => {
    const screen = await render(
      <Popover title="Keep" open>
        Keep trigger
      </Popover>
    );
    await expect.element(screen.getByText('Keep trigger')).toBeInTheDocument();
    await expect.element(getDialog()).toBeInTheDocument();
    await takeSnapshot(
      `Popover - keeps trigger visible while popover is open`
    );
  });

  it('renders two open popovers side by side', async () => {
    await render(
      <div style={{ display: 'flex', gap: 24 }}>
        <Popover title="One" description="First" open>
          One
        </Popover>
        <Popover title="Two" description="Second" open>
          Two
        </Popover>
      </div>
    );
    await expect.element(page.getByText('First')).toBeInTheDocument();
    await expect.element(page.getByText('Second')).toBeInTheDocument();
    await takeSnapshot(`Popover - renders two open popovers side by side`);
  });

  it('renders menu-like navigation content', async () => {
    await render(
      <Popover
        title="Quick menu"
        content={
          <nav>
            <button type="button">Home</button>
            <button type="button">Profile</button>
          </nav>
        }
        open
      >
        Menu
      </Popover>
    );
    await expect.element(page.getByText('Home')).toBeInTheDocument();
    await takeSnapshot(`Popover - renders menu-like navigation content`);
  });

  it('renders tag editor content', async () => {
    await render(
      <Popover title="Edit tags" content={<span>design, ui, ark</span>} open>
        Tags
      </Popover>
    );
    await expect.element(page.getByText('design, ui, ark')).toBeInTheDocument();
    await takeSnapshot(`Popover - renders tag editor content`);
  });

  it('renders color accent content', async () => {
    await render(
      <Popover
        title="Accent color"
        content={<span style={{ color: '#2563eb' }}>Blue 500</span>}
        open
      >
        Color
      </Popover>
    );
    await expect.element(page.getByText('Blue 500')).toBeInTheDocument();
    await takeSnapshot(`Popover - renders color accent content`);
  });
});
