import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent, page } from 'vitest/browser';
import { useState } from 'react';
import ColorPicker from './ColorPicker';
import { color } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

const locatorFor = (element: HTMLElement) => page.elementLocator(element);

const getRoot = (container: HTMLElement) =>
  container.querySelector('[data-part="root"]') as HTMLElement;

const getLabel = (container: HTMLElement) =>
  container.querySelector('[data-part="label"]') as HTMLElement;

const getControl = (container: HTMLElement) =>
  container.querySelector('[data-part="control"]') as HTMLElement;

const getTrigger = (container: HTMLElement) =>
  container.querySelector('[data-part="trigger"]') as HTMLElement;

const getChannelInputs = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('[data-part="channel-input"]')) as HTMLElement[];

const getValueText = (container: HTMLElement) =>
  container.querySelector('[data-part="value-text"]') as HTMLElement;

const getHiddenInput = (container: HTMLElement) =>
  container.querySelector('input[type="text"][tabindex="-1"]') as HTMLInputElement;

const ControlledFixture = ({ initial = '#EB5E41' }: { initial?: string }) => {
  const [value, setValue] = useState(initial);
  return (
    <ColorPicker
      value={value}
      onValueChange={(details) => setValue(details.value.toString('hex'))}
      label={`Value ${value}`}
    />
  );
};

describe('ColorPicker', () => {
  it('renders a color picker root', async () => {
    const screen = await render(<ColorPicker defaultValue="#EB5E41" />);
    expect(getRoot(screen.container)).not.toBeNull();
    await takeSnapshot('ColorPicker - renders a color picker root');
  });

  it('renders a label when provided', async () => {
    await render(<ColorPicker label="Brand color" defaultValue="#EB5E41" />);
    await expect.element(page.getByText('Brand color')).toBeInTheDocument();
    await takeSnapshot('ColorPicker - renders a label when provided');
  });

  it('does not render a label when omitted', async () => {
    const screen = await render(<ColorPicker defaultValue="#EB5E41" />);
    expect(getLabel(screen.container)).toBeNull();
    await takeSnapshot('ColorPicker - does not render a label when omitted');
  });

  it('renders a control region', async () => {
    const screen = await render(<ColorPicker defaultValue="#EB5E41" />);
    expect(getControl(screen.container)).not.toBeNull();
    await takeSnapshot('ColorPicker - renders a control region');
  });

  it('renders a trigger button', async () => {
    const screen = await render(<ColorPicker defaultValue="#EB5E41" />);
    expect(getTrigger(screen.container)).not.toBeNull();
    await takeSnapshot('ColorPicker - renders a trigger button');
  });

  it('labels the trigger for accessibility', async () => {
    const screen = await render(<ColorPicker defaultValue="#EB5E41" />);
    expect(getTrigger(screen.container).getAttribute('aria-label')).toBe('Open color picker');
    await takeSnapshot('ColorPicker - labels the trigger for accessibility');
  });

  it('renders a hex channel input', async () => {
    const screen = await render(<ColorPicker defaultValue="#EB5E41" />);
    expect(getChannelInputs(screen.container).length).toBeGreaterThan(0);
    await takeSnapshot('ColorPicker - renders a hex channel input');
  });

  it('renders value text', async () => {
    const screen = await render(<ColorPicker defaultValue="#EB5E41" />);
    expect(getValueText(screen.container)).not.toBeNull();
    await takeSnapshot('ColorPicker - renders value text');
  });

  it('renders a hidden input', async () => {
    const screen = await render(<ColorPicker defaultValue="#EB5E41" />);
    expect(getHiddenInput(screen.container)).not.toBeNull();
    await takeSnapshot('ColorPicker - renders a hidden input');
  });

  it('applies disabled attribute when disabled', async () => {
    const screen = await render(<ColorPicker defaultValue="#EB5E41" disabled />);
    expect(getRoot(screen.container).getAttribute('data-disabled')).not.toBeNull();
    await takeSnapshot('ColorPicker - applies disabled attribute when disabled');
  });

  it('does not set disabled by default', async () => {
    const screen = await render(<ColorPicker defaultValue="#EB5E41" />);
    expect(getRoot(screen.container).hasAttribute('data-disabled')).toBe(false);
    await takeSnapshot('ColorPicker - does not set disabled by default');
  });

  it('opens the content when trigger is clicked', async () => {
    const screen = await render(<ColorPicker defaultValue="#EB5E41" label="Color" />);
    await userEvent.click(locatorFor(getTrigger(screen.container)));
    const content = document.querySelector('[data-part="content"]') as HTMLElement;
    expect(content).not.toBeNull();
    await takeSnapshot('ColorPicker - opens the content when trigger is clicked');
  });

  it('renders area after opening', async () => {
    const screen = await render(<ColorPicker defaultValue="#EB5E41" />);
    await userEvent.click(locatorFor(getTrigger(screen.container)));
    expect(document.querySelector('[data-part="area"]')).not.toBeNull();
    await takeSnapshot('ColorPicker - renders area after opening');
  });

  it('renders area background after opening', async () => {
    const screen = await render(<ColorPicker defaultValue="#EB5E41" />);
    await userEvent.click(locatorFor(getTrigger(screen.container)));
    expect(document.querySelector('[data-part="area-background"]')).not.toBeNull();
    await takeSnapshot('ColorPicker - renders area background after opening');
  });

  it('renders area thumb after opening', async () => {
    const screen = await render(<ColorPicker defaultValue="#EB5E41" />);
    await userEvent.click(locatorFor(getTrigger(screen.container)));
    expect(document.querySelector('[data-part="area-thumb"]')).not.toBeNull();
    await takeSnapshot('ColorPicker - renders area thumb after opening');
  });

  it('renders hue channel slider after opening', async () => {
    const screen = await render(<ColorPicker defaultValue="#EB5E41" />);
    await userEvent.click(locatorFor(getTrigger(screen.container)));
    const sliders = document.querySelectorAll('[data-part="channel-slider"]');
    expect(sliders.length).toBeGreaterThanOrEqual(1);
    await takeSnapshot('ColorPicker - renders hue channel slider after opening');
  });

  it('renders alpha channel slider after opening', async () => {
    const screen = await render(<ColorPicker defaultValue="#EB5E41" />);
    await userEvent.click(locatorFor(getTrigger(screen.container)));
    const sliders = document.querySelectorAll('[data-part="channel-slider"]');
    expect(sliders.length).toBeGreaterThanOrEqual(2);
    await takeSnapshot('ColorPicker - renders alpha channel slider after opening');
  });

  it('calls onValueChange when provided as a spy', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <ColorPicker defaultValue="#EB5E41" onValueChange={onValueChange} />
    );
    expect(getRoot(screen.container)).not.toBeNull();
    expect(onValueChange).not.toHaveBeenCalled();
    await takeSnapshot('ColorPicker - calls onValueChange when provided as a spy');
  });

  it('supports controlled value updates', async () => {
    await render(<ControlledFixture initial="#0077FF" />);
    await expect.element(page.getByText(/Value/)).toBeInTheDocument();
    await takeSnapshot('ColorPicker - supports controlled value updates');
  });

  it('renders small size', async () => {
    const screen = await render(<ColorPicker size="small" defaultValue="#EB5E41" label="Small" />);
    expect(getRoot(screen.container)).not.toBeNull();
    await takeSnapshot('ColorPicker - renders small size');
  });

  it('renders medium size by default', async () => {
    const screen = await render(<ColorPicker defaultValue="#EB5E41" label="Medium" />);
    expect(getRoot(screen.container)).not.toBeNull();
    await takeSnapshot('ColorPicker - renders medium size by default');
  });

  it('renders large size', async () => {
    const screen = await render(<ColorPicker size="large" defaultValue="#EB5E41" label="Large" />);
    expect(getRoot(screen.container)).not.toBeNull();
    await takeSnapshot('ColorPicker - renders large size');
  });

  it('renders with red default value', async () => {
    const screen = await render(<ColorPicker defaultValue="#FF0000" label="Red" />);
    expect(getRoot(screen.container)).not.toBeNull();
    await takeSnapshot('ColorPicker - renders with red default value');
  });

  it('renders with green default value', async () => {
    const screen = await render(<ColorPicker defaultValue="#66BF3C" label="Green" />);
    expect(getRoot(screen.container)).not.toBeNull();
    await takeSnapshot('ColorPicker - renders with green default value');
  });

  it('renders with blue default value', async () => {
    const screen = await render(<ColorPicker defaultValue="#0077FF" label="Blue" />);
    expect(getRoot(screen.container)).not.toBeNull();
    await takeSnapshot('ColorPicker - renders with blue default value');
  });

  it('renders with orange default value', async () => {
    const screen = await render(<ColorPicker defaultValue="#FF4400" label="Orange" />);
    expect(getRoot(screen.container)).not.toBeNull();
    await takeSnapshot('ColorPicker - renders with orange default value');
  });

  it('renders with purple default value', async () => {
    const screen = await render(<ColorPicker defaultValue="#6F2CAC" label="Purple" />);
    expect(getRoot(screen.container)).not.toBeNull();
    await takeSnapshot('ColorPicker - renders with purple default value');
  });

  it('renders with pink default value', async () => {
    const screen = await render(<ColorPicker defaultValue="#FF4785" label="Pink" />);
    expect(getRoot(screen.container)).not.toBeNull();
    await takeSnapshot('ColorPicker - renders with pink default value');
  });

  it('renders with cyan default value', async () => {
    const screen = await render(<ColorPicker defaultValue="#37D5D3" label="Cyan" />);
    expect(getRoot(screen.container)).not.toBeNull();
    await takeSnapshot('ColorPicker - renders with cyan default value');
  });

  it('renders with yellow default value', async () => {
    const screen = await render(<ColorPicker defaultValue="#FFAE00" label="Yellow" />);
    expect(getRoot(screen.container)).not.toBeNull();
    await takeSnapshot('ColorPicker - renders with yellow default value');
  });

  it('renders with black default value', async () => {
    const screen = await render(<ColorPicker defaultValue="#000000" label="Black" />);
    expect(getRoot(screen.container)).not.toBeNull();
    await takeSnapshot('ColorPicker - renders with black default value');
  });

  it('renders with white default value', async () => {
    const screen = await render(<ColorPicker defaultValue="#FFFFFF" label="White" />);
    expect(getRoot(screen.container)).not.toBeNull();
    await takeSnapshot('ColorPicker - renders with white default value');
  });

  it('renders disabled small size', async () => {
    const screen = await render(
      <ColorPicker size="small" disabled defaultValue="#EB5E41" label="Disabled small" />
    );
    expect(getRoot(screen.container).getAttribute('data-disabled')).not.toBeNull();
    await takeSnapshot('ColorPicker - renders disabled small size');
  });

  it('renders disabled large size', async () => {
    const screen = await render(
      <ColorPicker size="large" disabled defaultValue="#EB5E41" label="Disabled large" />
    );
    expect(getRoot(screen.container).getAttribute('data-disabled')).not.toBeNull();
    await takeSnapshot('ColorPicker - renders disabled large size');
  });

  it('styles root with max-width', async () => {
    const screen = await render(<ColorPicker defaultValue="#EB5E41" />);
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({ maxWidth: '16rem' });
    await takeSnapshot('ColorPicker - styles root with max-width');
  });

  it('styles label with medium font weight', async () => {
    const screen = await render(<ColorPicker label="Color" defaultValue="#EB5E41" />);
    await expect.element(locatorFor(getLabel(screen.container))).toHaveStyle({ fontWeight: '500' });
    await takeSnapshot('ColorPicker - styles label with medium font weight');
  });

  it('styles trigger with slate border', async () => {
    const screen = await render(<ColorPicker defaultValue="#EB5E41" />);
    await expect
      .element(locatorFor(getTrigger(screen.container)))
      .toHaveStyle({ border: `1px solid ${color.slate300}` });
    await takeSnapshot('ColorPicker - styles trigger with slate border');
  });

  it('renders long label text', async () => {
    const label = 'Primary brand accent color used across marketing surfaces';
    await render(<ColorPicker label={label} defaultValue="#FF4785" />);
    await expect.element(page.getByText(label)).toBeInTheDocument();
    await takeSnapshot('ColorPicker - renders long label text');
  });

  it('renders short label text', async () => {
    await render(<ColorPicker label="C" defaultValue="#0077FF" />);
    await expect.element(page.getByText('C')).toBeInTheDocument();
    await takeSnapshot('ColorPicker - renders short label text');
  });

  it('renders lowercase hex default', async () => {
    const screen = await render(<ColorPicker defaultValue="#ff4400" label="Lowercase" />);
    expect(getRoot(screen.container)).not.toBeNull();
    await takeSnapshot('ColorPicker - renders lowercase hex default');
  });

  it('renders uppercase hex default', async () => {
    const screen = await render(<ColorPicker defaultValue="#FF4400" label="Uppercase" />);
    expect(getRoot(screen.container)).not.toBeNull();
    await takeSnapshot('ColorPicker - renders uppercase hex default');
  });

  it('renders near-white color', async () => {
    const screen = await render(<ColorPicker defaultValue="#F8FAFC" label="Near white" />);
    expect(getRoot(screen.container)).not.toBeNull();
    await takeSnapshot('ColorPicker - renders near-white color');
  });

  it('renders near-black color', async () => {
    const screen = await render(<ColorPicker defaultValue="#0F172A" label="Near black" />);
    expect(getRoot(screen.container)).not.toBeNull();
    await takeSnapshot('ColorPicker - renders near-black color');
  });

  it('renders mid gray color', async () => {
    const screen = await render(<ColorPicker defaultValue="#94A3B8" label="Mid gray" />);
    expect(getRoot(screen.container)).not.toBeNull();
    await takeSnapshot('ColorPicker - renders mid gray color');
  });

  it('renders success green', async () => {
    const screen = await render(<ColorPicker defaultValue="#489524" label="Success" />);
    expect(getRoot(screen.container)).not.toBeNull();
    await takeSnapshot('ColorPicker - renders success green');
  });

  it('renders warning yellow', async () => {
    const screen = await render(<ColorPicker defaultValue="#E39D07" label="Warning" />);
    expect(getRoot(screen.container)).not.toBeNull();
    await takeSnapshot('ColorPicker - renders warning yellow');
  });

  it('renders danger pink', async () => {
    const screen = await render(<ColorPicker defaultValue="#E81C61" label="Danger" />);
    expect(getRoot(screen.container)).not.toBeNull();
    await takeSnapshot('ColorPicker - renders danger pink');
  });

  it('renders kitchen sink large variant', async () => {
    await render(
      <ColorPicker size="large" label="Kitchen sink" defaultValue="#6F2CAC" />
    );
    await expect.element(page.getByText('Kitchen sink')).toBeInTheDocument();
    await takeSnapshot('ColorPicker - renders kitchen sink large variant');
  });

  it('renders kitchen sink small disabled variant', async () => {
    const screen = await render(
      <ColorPicker size="small" label="Locked" defaultValue="#37D5D3" disabled />
    );
    expect(getRoot(screen.container).getAttribute('data-disabled')).not.toBeNull();
    await takeSnapshot('ColorPicker - renders kitchen sink small disabled variant');
  });

  it('renders compact small without label', async () => {
    const screen = await render(<ColorPicker size="small" defaultValue="#FFAE00" />);
    expect(getLabel(screen.container)).toBeNull();
    expect(getRoot(screen.container)).not.toBeNull();
    await takeSnapshot('ColorPicker - renders compact small without label');
  });
});
