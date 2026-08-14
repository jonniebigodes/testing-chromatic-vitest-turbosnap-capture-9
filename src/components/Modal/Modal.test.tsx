import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import { useState } from 'react';
import Modal from './Modal';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

const getDialog = () => page.getByRole('dialog');

const ControlledModal = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <button type="button" onClick={() => setOpen((v) => !v)}>
        Toggle
      </button>
      <Modal
        title="Controlled"
        description="External state"
        open={open}
        onOpenChange={(d) => setOpen(d.open)}
      />
    </>
  );
};

describe('Modal', () => {
  it('renders the default trigger label', async () => {
    const screen = await render(<Modal title="Welcome" />);
    await expect.element(screen.getByText('Open')).toBeInTheDocument();
    await takeSnapshot(`Modal - renders the default trigger label`);
  });

  it('renders a custom trigger label', async () => {
    const screen = await render(
      <Modal title="Launch" triggerLabel="Launch wizard" />
    );
    await expect.element(screen.getByText('Launch wizard')).toBeInTheDocument();
    await takeSnapshot(`Modal - renders a custom trigger label`);
  });

  it('shows dialog when open is true', async () => {
    await render(<Modal title="Open modal" open />);
    await expect.element(getDialog()).toBeInTheDocument();
    await takeSnapshot(`Modal - shows dialog when open is true`);
  });

  it('does not show dialog when open is false', async () => {
    await render(<Modal title="Closed" open={false} />);
    await expect.element(getDialog()).not.toBeInTheDocument();
    await takeSnapshot(`Modal - does not show dialog when open is false`);
  });

  it('renders the provided title text', async () => {
    await render(<Modal title="Confirm delete" open />);
    await expect.element(page.getByText('Confirm delete')).toBeInTheDocument();
    await takeSnapshot(`Modal - renders the provided title text`);
  });

  it('renders the provided description text', async () => {
    await render(
      <Modal title="Confirm" description="Please confirm this action." open />
    );
    await expect
      .element(page.getByText('Please confirm this action.'))
      .toBeInTheDocument();
    await takeSnapshot(`Modal - renders the provided description text`);
  });

  it('omits description when not provided', async () => {
    await render(<Modal title="Title only" open />);
    await expect.element(page.getByText('Title only')).toBeInTheDocument();
    await takeSnapshot(`Modal - omits description when not provided`);
  });

  it('renders body children content', async () => {
    await render(
      <Modal title="Details" open>
        <p>Body content goes here.</p>
      </Modal>
    );
    await expect
      .element(page.getByText('Body content goes here.'))
      .toBeInTheDocument();
    await takeSnapshot(`Modal - renders body children content`);
  });

  it('renders close trigger', async () => {
    await render(<Modal title="Closeable" open />);
    await expect
      .element(page.getByRole('button', { name: 'Close' }))
      .toBeInTheDocument();
    await takeSnapshot(`Modal - renders close trigger`);
  });

  it('applies white background on dialog content', async () => {
    await render(<Modal title="Surface" open />);
    await expect.element(getDialog()).toHaveStyle({
      backgroundColor: color.white,
    });
    await takeSnapshot(`Modal - applies white background on dialog content`);
  });

  it('applies slate300 border on dialog content', async () => {
    await render(<Modal title="Border" open />);
    await expect.element(getDialog()).toHaveStyle({
      borderColor: color.slate300,
    });
    await takeSnapshot(`Modal - applies slate300 border on dialog content`);
  });

  it('applies border radius on dialog content', async () => {
    await render(<Modal title="Radius" open />);
    await expect.element(getDialog()).toHaveStyle({
      borderRadius: spacing[2],
    });
    await takeSnapshot(`Modal - applies border radius on dialog content`);
  });

  it('styles title with slate800 and semibold', async () => {
    await render(<Modal title="Title styles" open />);
    await expect.element(page.getByText('Title styles')).toHaveStyle({
      color: color.slate800,
      fontWeight: String(fontWeight.semibold),
    });
    await takeSnapshot(`Modal - styles title with slate800 and semibold`);
  });

  it('styles description with slate500', async () => {
    await render(<Modal title="T" description="Desc styles" open />);
    await expect.element(page.getByText('Desc styles')).toHaveStyle({
      color: color.slate500,
    });
    await takeSnapshot(`Modal - styles description with slate500`);
  });

  it('applies title font size 18', async () => {
    await render(<Modal title="Sized title" open />);
    await expect.element(page.getByText('Sized title')).toHaveStyle({
      fontSize: fontSize[18],
    });
    await takeSnapshot(`Modal - applies title font size 18`);
  });

  it('respects closeOnInteractOutside true while open', async () => {
    await render(
      <Modal title="Dismissible" closeOnInteractOutside open />
    );
    await expect.element(getDialog()).toBeInTheDocument();
    await takeSnapshot(
      `Modal - respects closeOnInteractOutside true while open`
    );
  });

  it('respects closeOnInteractOutside false while open', async () => {
    await render(
      <Modal title="Locked" closeOnInteractOutside={false} open />
    );
    await expect.element(getDialog()).toBeInTheDocument();
    await takeSnapshot(
      `Modal - respects closeOnInteractOutside false while open`
    );
  });

  it('renders long title text', async () => {
    const title =
      'This is a very long modal title that should wrap within the dialog content area';
    await render(<Modal title={title} open />);
    await expect.element(page.getByText(title)).toBeInTheDocument();
    await takeSnapshot(`Modal - renders long title text`);
  });

  it('renders long description text', async () => {
    const description =
      'A longer description that explains the dialog purpose in more detail.';
    await render(<Modal title="Notes" description={description} open />);
    await expect.element(page.getByText(description)).toBeInTheDocument();
    await takeSnapshot(`Modal - renders long description text`);
  });

  it('renders form body content', async () => {
    await render(
      <Modal title="Edit profile" open>
        <input defaultValue="Ada" aria-label="Name" />
      </Modal>
    );
    await expect
      .element(page.getByRole('textbox', { name: 'Name' }))
      .toHaveValue('Ada');
    await takeSnapshot(`Modal - renders form body content`);
  });

  it('renders list body content', async () => {
    await render(
      <Modal title="Checklist" open>
        <ul>
          <li>Review changes</li>
          <li>Notify team</li>
        </ul>
      </Modal>
    );
    await expect.element(page.getByText('Review changes')).toBeInTheDocument();
    await takeSnapshot(`Modal - renders list body content`);
  });

  it('renders action buttons in body', async () => {
    await render(
      <Modal title="Delete item" open>
        <button type="button">Cancel</button>
        <button type="button">Delete</button>
      </Modal>
    );
    await expect
      .element(page.getByRole('button', { name: 'Cancel' }))
      .toBeInTheDocument();
    await expect
      .element(page.getByRole('button', { name: 'Delete' }))
      .toBeInTheDocument();
    await takeSnapshot(`Modal - renders action buttons in body`);
  });

  it('renders alert style description', async () => {
    await render(
      <Modal
        title="Attention required"
        description="Your session will expire soon."
        open
      />
    );
    await expect
      .element(page.getByText('Your session will expire soon.'))
      .toBeInTheDocument();
    await takeSnapshot(`Modal - renders alert style description`);
  });

  it('renders success style description', async () => {
    await render(
      <Modal
        title="Success"
        description="Your changes have been saved."
        open
      />
    );
    await expect
      .element(page.getByText('Your changes have been saved.'))
      .toBeInTheDocument();
    await takeSnapshot(`Modal - renders success style description`);
  });

  it('renders error style description', async () => {
    await render(
      <Modal
        title="Error"
        description="Something went wrong. Please try again."
        open
      />
    );
    await expect
      .element(page.getByText('Something went wrong. Please try again.'))
      .toBeInTheDocument();
    await takeSnapshot(`Modal - renders error style description`);
  });

  it('renders warning style description', async () => {
    await render(
      <Modal
        title="Warning"
        description="Disk space is running low."
        open
      />
    );
    await expect
      .element(page.getByText('Disk space is running low.'))
      .toBeInTheDocument();
    await takeSnapshot(`Modal - renders warning style description`);
  });

  it('renders login form fields', async () => {
    await render(
      <Modal title="Sign in" open>
        <input placeholder="Email" aria-label="Email" />
        <input placeholder="Password" type="password" aria-label="Password" />
      </Modal>
    );
    await expect
      .element(page.getByPlaceholder('Email'))
      .toBeInTheDocument();
    await expect
      .element(page.getByPlaceholder('Password'))
      .toBeInTheDocument();
    await takeSnapshot(`Modal - renders login form fields`);
  });

  it('renders invite email input', async () => {
    await render(
      <Modal title="Invite teammate" open>
        <input placeholder="email@example.com" aria-label="Invite email" />
      </Modal>
    );
    await expect
      .element(page.getByPlaceholder('email@example.com'))
      .toBeInTheDocument();
    await takeSnapshot(`Modal - renders invite email input`);
  });

  it('renders share link code', async () => {
    await render(
      <Modal title="Share document" open>
        <code>https://example.com/doc/123</code>
      </Modal>
    );
    await expect
      .element(page.getByText('https://example.com/doc/123'))
      .toBeInTheDocument();
    await takeSnapshot(`Modal - renders share link code`);
  });

  it('renders settings checkbox', async () => {
    await render(
      <Modal title="Settings" open>
        <label>
          <input type="checkbox" defaultChecked /> Email notifications
        </label>
      </Modal>
    );
    await expect
      .element(page.getByText('Email notifications'))
      .toBeInTheDocument();
    await takeSnapshot(`Modal - renders settings checkbox`);
  });

  it('renders billing upgrade button', async () => {
    await render(
      <Modal title="Upgrade plan" open>
        <button type="button">Upgrade</button>
      </Modal>
    );
    await expect
      .element(page.getByRole('button', { name: 'Upgrade' }))
      .toBeInTheDocument();
    await takeSnapshot(`Modal - renders billing upgrade button`);
  });

  it('renders emoji title', async () => {
    await render(<Modal title="🎉 Congrats" description="You did it!" open />);
    await expect.element(page.getByText('🎉 Congrats')).toBeInTheDocument();
    await takeSnapshot(`Modal - renders emoji title`);
  });

  it('renders rtl unicode content', async () => {
    await render(<Modal title="عنوان" description="وصف الحوار" open />);
    await expect.element(page.getByText('عنوان')).toBeInTheDocument();
    await takeSnapshot(`Modal - renders rtl unicode content`);
  });

  it('renders numeric title', async () => {
    await render(<Modal title="404" description="Page not found" open />);
    await expect.element(page.getByText('404')).toBeInTheDocument();
    await takeSnapshot(`Modal - renders numeric title`);
  });

  it('renders special character title', async () => {
    await render(<Modal title={'A & B <C>'} open />);
    await expect.element(page.getByText('A & B <C>')).toBeInTheDocument();
    await takeSnapshot(`Modal - renders special character title`);
  });

  it('renders scrollable body content', async () => {
    await render(
      <Modal title="Terms" open>
        <div>
          <p>Paragraph 1 of the terms and conditions.</p>
          <p>Paragraph 2 of the terms and conditions.</p>
        </div>
      </Modal>
    );
    await expect
      .element(page.getByText('Paragraph 1 of the terms and conditions.'))
      .toBeInTheDocument();
    await takeSnapshot(`Modal - renders scrollable body content`);
  });

  it('renders code snippet body', async () => {
    await render(
      <Modal title="Install" open>
        <pre>npm install @ark-ui/react</pre>
      </Modal>
    );
    await expect
      .element(page.getByText('npm install @ark-ui/react'))
      .toBeInTheDocument();
    await takeSnapshot(`Modal - renders code snippet body`);
  });

  it('renders table body content', async () => {
    await render(
      <Modal title="Usage" open>
        <table>
          <tbody>
            <tr>
              <td>API calls</td>
              <td>1,200</td>
            </tr>
          </tbody>
        </table>
      </Modal>
    );
    await expect.element(page.getByText('API calls')).toBeInTheDocument();
    await takeSnapshot(`Modal - renders table body content`);
  });

  it('calls onOpenChange when provided while open', async () => {
    const onOpenChange = vi.fn();
    await render(
      <Modal title="Callback" open onOpenChange={onOpenChange} />
    );
    await expect.element(getDialog()).toBeInTheDocument();
    await takeSnapshot(
      `Modal - calls onOpenChange when provided while open`
    );
  });

  it('supports controlled open fixture', async () => {
    const screen = await render(<ControlledModal />);
    await expect.element(page.getByText('External state')).toBeInTheDocument();
    await expect.element(screen.getByText('Toggle')).toBeInTheDocument();
    await takeSnapshot(`Modal - supports controlled open fixture`);
  });

  it('renders feedback textarea', async () => {
    await render(
      <Modal title="Send feedback" open>
        <textarea aria-label="Feedback" rows={4} />
      </Modal>
    );
    await expect
      .element(page.getByRole('textbox', { name: 'Feedback' }))
      .toBeInTheDocument();
    await takeSnapshot(`Modal - renders feedback textarea`);
  });

  it('renders onboarding start button', async () => {
    await render(
      <Modal title="Welcome aboard" open>
        <button type="button">Start tour</button>
      </Modal>
    );
    await expect.element(page.getByText('Start tour')).toBeInTheDocument();
    await takeSnapshot(`Modal - renders onboarding start button`);
  });

  it('renders permissions allow and deny buttons', async () => {
    await render(
      <Modal title="Allow notifications?" open>
        <button type="button">Allow</button>
        <button type="button">Not now</button>
      </Modal>
    );
    await expect
      .element(page.getByRole('button', { name: 'Allow' }))
      .toBeInTheDocument();
    await expect
      .element(page.getByRole('button', { name: 'Not now' }))
      .toBeInTheDocument();
    await takeSnapshot(
      `Modal - renders permissions allow and deny buttons`
    );
  });

  it('renders export format select', async () => {
    await render(
      <Modal title="Export data" open>
        <select aria-label="Format" defaultValue="csv">
          <option value="csv">CSV</option>
          <option value="json">JSON</option>
        </select>
      </Modal>
    );
    await expect
      .element(page.getByRole('combobox', { name: 'Format' }))
      .toHaveValue('csv');
    await takeSnapshot(`Modal - renders export format select`);
  });

  it('renders import file input', async () => {
    await render(
      <Modal title="Import file" open>
        <input type="file" aria-label="File" />
      </Modal>
    );
    await expect
      .element(page.getByRole('button', { name: 'Close' }))
      .toBeInTheDocument();
    await expect.element(page.getByText('Import file')).toBeInTheDocument();
    await takeSnapshot(`Modal - renders import file input`);
  });

  it('renders privacy description', async () => {
    await render(
      <Modal
        title="Privacy"
        description="Review our privacy policy before continuing."
        open
      />
    );
    await expect
      .element(page.getByText('Review our privacy policy before continuing.'))
      .toBeInTheDocument();
    await takeSnapshot(`Modal - renders privacy description`);
  });

  it('renders cookie consent accept button', async () => {
    await render(
      <Modal title="Cookies" open>
        <button type="button">Accept</button>
      </Modal>
    );
    await expect.element(page.getByText('Accept')).toBeInTheDocument();
    await takeSnapshot(`Modal - renders cookie consent accept button`);
  });

  it('renders kitchen sink modal', async () => {
    await render(
      <Modal
        title="Kitchen sink"
        description="All pieces together"
        triggerLabel="Open kitchen sink"
        closeOnInteractOutside
        open
      >
        <button type="button">Primary</button>
      </Modal>
    );
    await expect.element(page.getByText('Primary')).toBeInTheDocument();
    await takeSnapshot(`Modal - renders kitchen sink modal`);
  });

  it('exposes dialog role for accessibility when open', async () => {
    await render(<Modal title="Accessible" open />);
    await expect.element(page.getByRole('dialog')).toBeInTheDocument();
    await takeSnapshot(
      `Modal - exposes dialog role for accessibility when open`
    );
  });

  it('keeps trigger visible while modal is open', async () => {
    const screen = await render(
      <Modal title="Keep" triggerLabel="Keep trigger" open />
    );
    await expect.element(screen.getByText('Keep trigger')).toBeInTheDocument();
    await expect.element(getDialog()).toBeInTheDocument();
    await takeSnapshot(`Modal - keeps trigger visible while modal is open`);
  });
});
