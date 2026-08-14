import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import Stepper from './Stepper';
import type { StepperStep } from './Stepper';
import { color, fontSize, spacing } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

const locatorFor = (element: HTMLElement) => page.elementLocator(element);

const threeSteps: StepperStep[] = [
  { title: 'Contact', description: 'Your details' },
  { title: 'Shipping', description: 'Delivery address' },
  { title: 'Payment', description: 'Billing info' },
];

const fourSteps: StepperStep[] = [
  { title: 'Account', description: 'Create account' },
  { title: 'Profile', description: 'Tell us about you' },
  { title: 'Preferences', description: 'Customize' },
  { title: 'Confirm', description: 'Review and finish' },
];

const getRoot = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement;

const getTriggerTitle = (container: HTMLElement, title: string) => {
  const list = container.querySelector('[data-part="list"]') as HTMLElement;
  const matches = Array.from(list.querySelectorAll('span')).filter(
    (el) =>
      el.childNodes.length === 1 &&
      el.childNodes[0].nodeType === Node.TEXT_NODE &&
      el.textContent === title,
  );
  return matches[0] as HTMLElement;
};

describe('Stepper', () => {
  it('renders each step title', async () => {
    const screen = await render(<Stepper steps={threeSteps} />);
    await expect.element(screen.getByText('Contact', { exact: true })).toBeInTheDocument();
    await expect.element(screen.getByText('Shipping', { exact: true })).toBeInTheDocument();
    await expect.element(screen.getByText('Payment', { exact: true })).toBeInTheDocument();
    await takeSnapshot(`Stepper - renders each step title`);
  });

  it('renders step descriptions', async () => {
    const screen = await render(<Stepper steps={threeSteps} />);
    await expect.element(screen.getByText('Your details', { exact: true })).toBeInTheDocument();
    await takeSnapshot(`Stepper - renders step descriptions`);
  });

  it('renders back and next triggers', async () => {
    const screen = await render(<Stepper steps={threeSteps} />);
    await expect.element(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
    await expect.element(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
    await takeSnapshot(`Stepper - renders back and next triggers`);
  });

  it('defaults to horizontal orientation', async () => {
    const screen = await render(<Stepper steps={threeSteps} />);
    expect(getRoot(screen.container).getAttribute('data-orientation')).toBe('horizontal');
    await takeSnapshot(`Stepper - defaults to horizontal orientation`);
  });

  it('applies vertical orientation layout', async () => {
    const screen = await render(
      <Stepper steps={threeSteps} orientation="vertical" />,
    );
    expect(getRoot(screen.container).getAttribute('data-orientation')).toBe('vertical');
    await takeSnapshot(`Stepper - applies vertical orientation layout`);
  });

  it('applies small size title font size', async () => {
    const screen = await render(<Stepper steps={threeSteps} size="small" />);
    await expect.element(screen.getByText('Contact', { exact: true })).toHaveStyle({
      fontSize: fontSize[12],
    });
    await takeSnapshot(`Stepper - applies small size title font size`);
  });

  it('applies medium size title font size', async () => {
    const screen = await render(<Stepper steps={threeSteps} size="medium" />);
    await expect.element(screen.getByText('Contact', { exact: true })).toHaveStyle({
      fontSize: fontSize[14],
    });
    await takeSnapshot(`Stepper - applies medium size title font size`);
  });

  it('applies large size title font size', async () => {
    const screen = await render(<Stepper steps={threeSteps} size="large" />);
    await expect.element(screen.getByText('Contact', { exact: true })).toHaveStyle({
      fontSize: fontSize[16],
    });
    await takeSnapshot(`Stepper - applies large size title font size`);
  });

  it('defaults to medium size title font size', async () => {
    const screen = await render(<Stepper steps={threeSteps} />);
    await expect.element(screen.getByText('Contact', { exact: true })).toHaveStyle({
      fontSize: fontSize[14],
    });
    await takeSnapshot(`Stepper - defaults to medium size title font size`);
  });

  it('shows step content for the active step', async () => {
    const screen = await render(<Stepper steps={threeSteps} defaultStep={0} />);
    await expect
      .element(screen.getByText('Contact — Your details'))
      .toBeInTheDocument();
    await takeSnapshot(`Stepper - shows step content for the active step`);
  });

  it('honors defaultStep', async () => {
    const screen = await render(<Stepper steps={threeSteps} defaultStep={1} />);
    await expect
      .element(screen.getByText('Shipping — Delivery address'))
      .toBeInTheDocument();
    await takeSnapshot(`Stepper - honors defaultStep`);
  });

  it('honors controlled step prop', async () => {
    const screen = await render(<Stepper steps={threeSteps} step={2} />);
    await expect
      .element(screen.getByText('Payment — Billing info'))
      .toBeInTheDocument();
    await takeSnapshot(`Stepper - honors controlled step prop`);
  });

  it('calls onStepChange when next is clicked', async () => {
    const onStepChange = vi.fn();
    const screen = await render(
      <Stepper steps={threeSteps} defaultStep={0} onStepChange={onStepChange} />,
    );
    await screen.getByRole('button', { name: /next/i }).click();
    await vi.waitFor(() => expect(onStepChange).toHaveBeenCalled());
    await takeSnapshot(`Stepper - calls onStepChange when next is clicked`);
  });

  it('renders four steps', async () => {
    const screen = await render(<Stepper steps={fourSteps} />);
    await expect.element(screen.getByText('Account', { exact: true })).toBeInTheDocument();
    await expect.element(screen.getByText('Confirm', { exact: true })).toBeInTheDocument();
    await takeSnapshot(`Stepper - renders four steps`);
  });

  it('renders two steps', async () => {
    const screen = await render(
      <Stepper
        steps={[
          { title: 'Start', description: 'Begin here' },
          { title: 'Finish', description: 'All done' },
        ]}
      />,
    );
    await expect.element(screen.getByText('Start', { exact: true })).toBeInTheDocument();
    await expect.element(screen.getByText('Finish', { exact: true })).toBeInTheDocument();
    await takeSnapshot(`Stepper - renders two steps`);
  });

  it('renders titles without descriptions', async () => {
    const screen = await render(
      <Stepper steps={[{ title: 'One' }, { title: 'Two' }, { title: 'Three' }]} />,
    );
    expect(getTriggerTitle(screen.container, 'One')).toBeTruthy();
    expect(screen.container.textContent).not.toContain('Your details');
    await takeSnapshot(`Stepper - renders titles without descriptions`);
  });

  it('renders a single step', async () => {
    const screen = await render(
      <Stepper steps={[{ title: 'Only', description: 'One step' }]} />,
    );
    await expect.element(screen.getByText('Only', { exact: true })).toBeInTheDocument();
    await takeSnapshot(`Stepper - renders a single step`);
  });

  it('preserves emoji content in titles', async () => {
    const screen = await render(
      <Stepper
        steps={[
          { title: '📝 Details', description: 'Fill in' },
          { title: '💳 Pay', description: 'Checkout' },
        ]}
      />,
    );
    await expect.element(screen.getByText('📝 Details', { exact: true })).toBeInTheDocument();
    await takeSnapshot(`Stepper - preserves emoji content in titles`);
  });

  it('preserves RTL unicode content', async () => {
    const screen = await render(
      <Stepper
        steps={[
          { title: 'التواصل', description: 'بياناتك' },
          { title: 'الدفع', description: 'الفوترة' },
        ]}
      />,
    );
    await expect.element(screen.getByText('التواصل', { exact: true })).toBeInTheDocument();
    await takeSnapshot(`Stepper - preserves RTL unicode content`);
  });

  it('renders long titles in full', async () => {
    const title = 'Provide contact information';
    const screen = await render(
      <Stepper
        steps={[
          { title, description: 'Email' },
          { title: 'Next', description: 'More' },
        ]}
      />,
    );
    expect(getTriggerTitle(screen.container, title)).toBeTruthy();
    await takeSnapshot(`Stepper - renders long titles in full`);
  });

  it('uses flex display on the root', async () => {
    const screen = await render(<Stepper steps={threeSteps} />);
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      display: 'flex',
    });
    await takeSnapshot(`Stepper - uses flex display on the root`);
  });

  it('applies max width for horizontal layout', async () => {
    const screen = await render(
      <Stepper steps={threeSteps} orientation="horizontal" />,
    );
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      maxWidth: '640px',
    });
    await takeSnapshot(`Stepper - applies max width for horizontal layout`);
  });

  it('applies max width for vertical layout', async () => {
    const screen = await render(
      <Stepper steps={threeSteps} orientation="vertical" />,
    );
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      maxWidth: '480px',
    });
    await takeSnapshot(`Stepper - applies max width for vertical layout`);
  });

  it('keeps two independent steppers from sharing content', async () => {
    const screen = await render(
      <>
        <Stepper steps={threeSteps} />
        <Stepper
          steps={[
            { title: 'Alpha', description: 'A' },
            { title: 'Beta', description: 'B' },
          ]}
        />
      </>,
    );
    await expect.element(screen.getByText('Contact', { exact: true })).toBeInTheDocument();
    await expect.element(screen.getByText('Alpha', { exact: true })).toBeInTheDocument();
    await takeSnapshot(
      `Stepper - keeps two independent steppers from sharing content`,
    );
  });

  it('updates when re-rendered with a new default step content', async () => {
    const screen = await render(<Stepper steps={threeSteps} step={0} />);
    await screen.rerender(<Stepper steps={threeSteps} step={1} />);
    await expect
      .element(screen.getByText('Shipping — Delivery address'))
      .toBeInTheDocument();
    await takeSnapshot(
      `Stepper - updates when re-rendered with a new default step content`,
    );
  });

  it('updates size when re-rendered', async () => {
    const screen = await render(<Stepper steps={threeSteps} size="small" />);
    await screen.rerender(<Stepper steps={threeSteps} size="large" />);
    await expect.element(screen.getByText('Contact', { exact: true })).toHaveStyle({
      fontSize: fontSize[16],
    });
    await takeSnapshot(`Stepper - updates size when re-rendered`);
  });

  it('updates orientation when re-rendered', async () => {
    const screen = await render(
      <Stepper steps={threeSteps} orientation="horizontal" />,
    );
    await screen.rerender(
      <Stepper steps={threeSteps} orientation="vertical" />,
    );
    expect(getRoot(screen.container).getAttribute('data-orientation')).toBe('vertical');
    await takeSnapshot(`Stepper - updates orientation when re-rendered`);
  });

  it('renders completed content region in the tree', async () => {
    const screen = await render(<Stepper steps={threeSteps} />);
    expect(screen.container.textContent).toContain('All steps complete');
    await takeSnapshot(`Stepper - renders completed content region in the tree`);
  });

  it('renders numeric titles correctly', async () => {
    const screen = await render(
      <Stepper
        steps={[
          { title: '01', description: 'Start' },
          { title: '02', description: 'End' },
        ]}
      />,
    );
    await expect.element(screen.getByText('01', { exact: true })).toBeInTheDocument();
    await takeSnapshot(`Stepper - renders numeric titles correctly`);
  });

  it('renders short punchy titles correctly', async () => {
    const screen = await render(
      <Stepper
        steps={[
          { title: 'Go', description: 'Begin' },
          { title: 'Done', description: 'Finish' },
        ]}
      />,
    );
    await expect.element(screen.getByText('Go', { exact: true })).toBeInTheDocument();
    await takeSnapshot(`Stepper - renders short punchy titles correctly`);
  });

  it('renders kitchen-sink vertical large stepper', async () => {
    const screen = await render(
      <Stepper
        steps={fourSteps}
        orientation="vertical"
        size="large"
        defaultStep={1}
      />,
    );
    await expect.element(screen.getByText('Profile', { exact: true })).toHaveStyle({
      fontSize: fontSize[16],
    });
    await takeSnapshot(`Stepper - renders kitchen-sink vertical large stepper`);
  });

  it('renders kitchen-sink horizontal small stepper', async () => {
    const screen = await render(
      <Stepper
        steps={[
          { title: 'Start', description: 'Begin here' },
          { title: 'Finish', description: 'All done' },
        ]}
        orientation="horizontal"
        size="small"
      />,
    );
    await expect.element(screen.getByText('Start', { exact: true })).toHaveStyle({
      fontSize: fontSize[12],
    });
    await takeSnapshot(
      `Stepper - renders kitchen-sink horizontal small stepper`,
    );
  });

  it('renders five steps', async () => {
    const steps = ['A', 'B', 'C', 'D', 'E'].map((title) => ({
      title,
      description: title,
    }));
    const screen = await render(<Stepper steps={steps} />);
    expect(getTriggerTitle(screen.container, 'E')).toBeTruthy();
    await takeSnapshot(`Stepper - renders five steps`);
  });

  it('styles descriptions with slate500', async () => {
    const screen = await render(<Stepper steps={threeSteps} />);
    await expect.element(screen.getByText('Your details', { exact: true })).toHaveStyle({
      color: color.slate500,
    });
    await takeSnapshot(`Stepper - styles descriptions with slate500`);
  });

  it('styles titles with slate800', async () => {
    const screen = await render(<Stepper steps={threeSteps} />);
    await expect.element(screen.getByText('Contact', { exact: true })).toHaveStyle({
      color: color.slate800,
    });
    await takeSnapshot(`Stepper - styles titles with slate800`);
  });

  it('renders mixed description presence', async () => {
    const screen = await render(
      <Stepper
        steps={[
          { title: 'With', description: 'Has text' },
          { title: 'Without' },
          { title: 'Also with', description: 'More text' },
        ]}
      />,
    );
    await expect.element(screen.getByText('Has text', { exact: true })).toBeInTheDocument();
    expect(getTriggerTitle(screen.container, 'Without')).toBeTruthy();
    await takeSnapshot(`Stepper - renders mixed description presence`);
  });

  it('renders checkout flow titles', async () => {
    const screen = await render(
      <Stepper
        steps={[
          { title: 'Cart', description: 'Review items' },
          { title: 'Address', description: 'Ship to' },
          { title: 'Pay', description: 'Checkout' },
          { title: 'Done', description: 'Confirmation' },
        ]}
      />,
    );
    await expect.element(screen.getByText('Cart', { exact: true })).toBeInTheDocument();
    await expect.element(screen.getByText('Done', { exact: true })).toBeInTheDocument();
    await takeSnapshot(`Stepper - renders checkout flow titles`);
  });

  it('renders onboarding flow at large size', async () => {
    const screen = await render(
      <Stepper
        steps={[
          { title: 'Welcome', description: 'Say hello' },
          { title: 'Setup', description: 'Configure' },
          { title: 'Invite', description: 'Add teammates' },
        ]}
        size="large"
      />,
    );
    await expect.element(screen.getByText('Welcome', { exact: true })).toHaveStyle({
      fontSize: fontSize[16],
    });
    await takeSnapshot(`Stepper - renders onboarding flow at large size`);
  });

  it('applies medium gap on horizontal root', async () => {
    const screen = await render(<Stepper steps={threeSteps} size="medium" />);
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      gap: spacing[3],
    });
    await takeSnapshot(`Stepper - applies medium gap on horizontal root`);
  });

  it('applies large gap on root', async () => {
    const screen = await render(<Stepper steps={threeSteps} size="large" />);
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      gap: spacing[4],
    });
    await takeSnapshot(`Stepper - applies large gap on root`);
  });

  it('applies small gap on root', async () => {
    const screen = await render(<Stepper steps={threeSteps} size="small" />);
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      gap: spacing[2],
    });
    await takeSnapshot(`Stepper - applies small gap on root`);
  });

  it('shows indicator number for incomplete steps', async () => {
    const screen = await render(<Stepper steps={threeSteps} defaultStep={0} />);
    await expect.element(screen.getByText('1', { exact: true })).toBeInTheDocument();
    await takeSnapshot(`Stepper - shows indicator number for incomplete steps`);
  });

  it('advances content when next is clicked', async () => {
    const screen = await render(<Stepper steps={threeSteps} defaultStep={0} />);
    await screen.getByRole('button', { name: /next/i }).click();
    await expect
      .element(screen.getByText('Shipping — Delivery address'))
      .toBeInTheDocument();
    await takeSnapshot(`Stepper - advances content when next is clicked`);
  });

  it('renders vertical min height', async () => {
    const screen = await render(
      <Stepper steps={threeSteps} orientation="vertical" />,
    );
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      minHeight: '320px',
    });
    await takeSnapshot(`Stepper - renders vertical min height`);
  });

  it('renders Back label on prev trigger', async () => {
    const screen = await render(<Stepper steps={threeSteps} />);
    await expect.element(screen.getByText('Back', { exact: true })).toBeInTheDocument();
    await takeSnapshot(`Stepper - renders Back label on prev trigger`);
  });

  it('renders Next label on next trigger', async () => {
    const screen = await render(<Stepper steps={threeSteps} />);
    await expect.element(screen.getByText('Next', { exact: true })).toBeInTheDocument();
    await takeSnapshot(`Stepper - renders Next label on next trigger`);
  });

  it('styles next trigger with blue500 background', async () => {
    const screen = await render(<Stepper steps={threeSteps} />);
    await expect.element(screen.getByRole('button', { name: /next/i })).toHaveStyle({
      backgroundColor: color.blue500,
    });
    await takeSnapshot(`Stepper - styles next trigger with blue500 background`);
  });
  it('renders at step two near completion', async () => {
    const screen = await render(<Stepper steps={threeSteps} defaultStep={2} />);
    await expect
      .element(screen.getByText('Payment — Billing info'))
      .toBeInTheDocument();
    await takeSnapshot(`Stepper - renders at step two near completion`);
  });

  it('renders vertical controlled step', async () => {
    const screen = await render(
      <Stepper steps={fourSteps} orientation="vertical" step={1} />,
    );
    await expect
      .element(screen.getByText('Profile — Tell us about you'))
      .toBeInTheDocument();
    await takeSnapshot(`Stepper - renders vertical controlled step`);
  });

  it('renders small titles-only stepper', async () => {
    const screen = await render(
      <Stepper
        steps={[{ title: 'One' }, { title: 'Two' }, { title: 'Three' }]}
        size="small"
      />,
    );
    expect(getTriggerTitle(screen.container, 'One').style.fontSize).toBe(
      fontSize[12],
    );
    await takeSnapshot(`Stepper - renders small titles-only stepper`);
  });
});
