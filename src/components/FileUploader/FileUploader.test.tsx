import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import FileUploader from './FileUploader';
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

const getDropzone = (container: HTMLElement) =>
  container.querySelector('[data-part="dropzone"]') as HTMLElement;

const getTrigger = (container: HTMLElement) =>
  container.querySelector('[data-part="trigger"]') as HTMLElement;

const getItemGroup = (container: HTMLElement) =>
  container.querySelector('[data-part="item-group"]') as HTMLElement;

const getHiddenInput = (container: HTMLElement) =>
  container.querySelector('input[type="file"]') as HTMLInputElement;

describe('FileUploader', () => {
  it('renders a file upload root', async () => {
    const screen = await render(<FileUploader />);
    expect(getRoot(screen.container)).not.toBeNull();
    await takeSnapshot('FileUploader - renders a file upload root');
  });

  it('renders a label when provided', async () => {
    await render(<FileUploader label="Documents" />);
    await expect.element(page.getByText('Documents')).toBeInTheDocument();
    await takeSnapshot('FileUploader - renders a label when provided');
  });

  it('does not render a label when omitted', async () => {
    const screen = await render(<FileUploader />);
    expect(getLabel(screen.container)).toBeNull();
    await takeSnapshot('FileUploader - does not render a label when omitted');
  });

  it('renders a dropzone', async () => {
    const screen = await render(<FileUploader />);
    expect(getDropzone(screen.container)).not.toBeNull();
    await takeSnapshot('FileUploader - renders a dropzone');
  });

  it('renders dropzone title text', async () => {
    await render(<FileUploader />);
    await expect.element(page.getByText('Drag and drop files here')).toBeInTheDocument();
    await takeSnapshot('FileUploader - renders dropzone title text');
  });

  it('renders dropzone description text', async () => {
    await render(<FileUploader />);
    await expect.element(page.getByText('or click to browse')).toBeInTheDocument();
    await takeSnapshot('FileUploader - renders dropzone description text');
  });

  it('renders a choose file trigger', async () => {
    const screen = await render(<FileUploader />);
    expect(getTrigger(screen.container)).not.toBeNull();
    await takeSnapshot('FileUploader - renders a choose file trigger');
  });

  it('shows singular choose file when single', async () => {
    await render(<FileUploader multiple={false} />);
    await expect.element(page.getByText('Choose file')).toBeInTheDocument();
    await takeSnapshot('FileUploader - shows singular choose file when single');
  });

  it('shows plural choose files when multiple', async () => {
    await render(<FileUploader multiple />);
    await expect.element(page.getByText('Choose files')).toBeInTheDocument();
    await takeSnapshot('FileUploader - shows plural choose files when multiple');
  });

  it('renders an item group', async () => {
    const screen = await render(<FileUploader />);
    expect(getItemGroup(screen.container)).not.toBeNull();
    await takeSnapshot('FileUploader - renders an item group');
  });

  it('renders a hidden input', async () => {
    const screen = await render(<FileUploader />);
    expect(getHiddenInput(screen.container)).not.toBeNull();
    await takeSnapshot('FileUploader - renders a hidden input');
  });

  it('styles dropzone with dashed slate300 border', async () => {
    const screen = await render(<FileUploader />);
    await expect
      .element(locatorFor(getDropzone(screen.container)))
      .toHaveStyle({ border: `2px dashed ${color.slate300}` });
    await takeSnapshot('FileUploader - styles dropzone with dashed slate300 border');
  });

  it('applies disabled state when disabled', async () => {
    const screen = await render(<FileUploader disabled label="Disabled" />);
    expect(getRoot(screen.container).getAttribute('data-disabled')).not.toBeNull();
    await takeSnapshot('FileUploader - applies disabled state when disabled');
  });

  it('is not disabled by default', async () => {
    const screen = await render(<FileUploader />);
    expect(getRoot(screen.container).hasAttribute('data-disabled')).toBe(false);
    await takeSnapshot('FileUploader - is not disabled by default');
  });

  it('sets accept attribute for images', async () => {
    const screen = await render(<FileUploader accept="image/*" />);
    expect(getHiddenInput(screen.container).getAttribute('accept')).toContain('image');
    await takeSnapshot('FileUploader - sets accept attribute for images');
  });

  it('sets accept attribute for pdf', async () => {
    const screen = await render(<FileUploader accept="application/pdf" />);
    expect(getHiddenInput(screen.container).getAttribute('accept')).toContain('pdf');
    await takeSnapshot('FileUploader - sets accept attribute for pdf');
  });

  it('sets accept for text plain', async () => {
    const screen = await render(<FileUploader accept="text/plain" />);
    expect(getHiddenInput(screen.container).getAttribute('accept')).toContain('text');
    await takeSnapshot('FileUploader - sets accept for text plain');
  });

  it('sets accept for csv', async () => {
    const screen = await render(<FileUploader accept="text/csv" />);
    expect(getHiddenInput(screen.container).getAttribute('accept')).toContain('csv');
    await takeSnapshot('FileUploader - sets accept for csv');
  });

  it('sets accept for json', async () => {
    const screen = await render(<FileUploader accept="application/json" />);
    expect(getHiddenInput(screen.container).getAttribute('accept')).toContain('json');
    await takeSnapshot('FileUploader - sets accept for json');
  });

  it('sets accept for video', async () => {
    const screen = await render(<FileUploader accept="video/*" />);
    expect(getHiddenInput(screen.container).getAttribute('accept')).toContain('video');
    await takeSnapshot('FileUploader - sets accept for video');
  });

  it('sets accept for audio', async () => {
    const screen = await render(<FileUploader accept="audio/*" />);
    expect(getHiddenInput(screen.container).getAttribute('accept')).toContain('audio');
    await takeSnapshot('FileUploader - sets accept for audio');
  });

  it('defaults to single file selection', async () => {
    const screen = await render(<FileUploader />);
    expect(getHiddenInput(screen.container).hasAttribute('multiple')).toBe(false);
    await takeSnapshot('FileUploader - defaults to single file selection');
  });

  it('enables multiple when multiple is true', async () => {
    const screen = await render(<FileUploader multiple />);
    expect(getHiddenInput(screen.container).hasAttribute('multiple')).toBe(true);
    await takeSnapshot('FileUploader - enables multiple when multiple is true');
  });

  it('enables multiple when maxFiles is greater than one', async () => {
    const screen = await render(<FileUploader maxFiles={3} />);
    expect(getHiddenInput(screen.container).hasAttribute('multiple')).toBe(true);
    await takeSnapshot('FileUploader - enables multiple when maxFiles is greater than one');
  });

  it('renders with maxFiles of two', async () => {
    await render(<FileUploader maxFiles={2} label="Max 2" />);
    await expect.element(page.getByText('Max 2')).toBeInTheDocument();
    await takeSnapshot('FileUploader - renders with maxFiles of two');
  });

  it('renders with maxFiles of five', async () => {
    await render(<FileUploader maxFiles={5} label="Max 5" />);
    await expect.element(page.getByText('Max 5')).toBeInTheDocument();
    await takeSnapshot('FileUploader - renders with maxFiles of five');
  });

  it('renders with maxFiles of ten', async () => {
    await render(<FileUploader maxFiles={10} label="Max 10" />);
    await expect.element(page.getByText('Max 10')).toBeInTheDocument();
    await takeSnapshot('FileUploader - renders with maxFiles of ten');
  });

  it('renders with small maxFileSize', async () => {
    await render(<FileUploader maxFileSize={1024} label="Max 1KB" />);
    await expect.element(page.getByText('Max 1KB')).toBeInTheDocument();
    await takeSnapshot('FileUploader - renders with small maxFileSize');
  });

  it('renders with one megabyte maxFileSize', async () => {
    await render(
      <FileUploader maxFileSize={1024 * 1024} label="Max 1MB" />
    );
    await expect.element(page.getByText('Max 1MB')).toBeInTheDocument();
    await takeSnapshot('FileUploader - renders with one megabyte maxFileSize');
  });

  it('renders with five megabyte maxFileSize', async () => {
    await render(
      <FileUploader maxFileSize={5 * 1024 * 1024} label="Max 5MB" />
    );
    await expect.element(page.getByText('Max 5MB')).toBeInTheDocument();
    await takeSnapshot('FileUploader - renders with five megabyte maxFileSize');
  });

  it('accepts onFileChange callback without crashing', async () => {
    const onFileChange = vi.fn();
    const screen = await render(<FileUploader onFileChange={onFileChange} />);
    expect(getRoot(screen.container)).not.toBeNull();
    expect(onFileChange).not.toHaveBeenCalled();
    await takeSnapshot('FileUploader - accepts onFileChange callback without crashing');
  });

  it('renders avatar upload configuration', async () => {
    await render(
      <FileUploader accept="image/*" maxFiles={1} label="Profile photo" />
    );
    await expect.element(page.getByText('Profile photo')).toBeInTheDocument();
    await takeSnapshot('FileUploader - renders avatar upload configuration');
  });

  it('renders gallery upload configuration', async () => {
    await render(
      <FileUploader accept="image/*" maxFiles={8} multiple label="Gallery" />
    );
    await expect.element(page.getByText('Gallery')).toBeInTheDocument();
    await takeSnapshot('FileUploader - renders gallery upload configuration');
  });

  it('renders resume upload configuration', async () => {
    await render(
      <FileUploader accept="application/pdf" maxFiles={1} label="Resume" />
    );
    await expect.element(page.getByText('Resume')).toBeInTheDocument();
    await takeSnapshot('FileUploader - renders resume upload configuration');
  });

  it('renders attachments configuration', async () => {
    await render(
      <FileUploader multiple maxFiles={5} label="Attachments" />
    );
    await expect.element(page.getByText('Attachments')).toBeInTheDocument();
    await takeSnapshot('FileUploader - renders attachments configuration');
  });

  it('renders long label text', async () => {
    const label = 'Upload supporting documents for your application review';
    await render(<FileUploader label={label} />);
    await expect.element(page.getByText(label)).toBeInTheDocument();
    await takeSnapshot('FileUploader - renders long label text');
  });

  it('renders short label text', async () => {
    const screen = await render(<FileUploader label="Docs" />);
    await expect.element(locatorFor(getLabel(screen.container))).toHaveTextContent('Docs');
    await takeSnapshot('FileUploader - renders short label text');
  });

  it('renders disabled multiple configuration', async () => {
    const screen = await render(
      <FileUploader disabled multiple label="Disabled multiple" />
    );
    expect(getRoot(screen.container).getAttribute('data-disabled')).not.toBeNull();
    await takeSnapshot('FileUploader - renders disabled multiple configuration');
  });

  it('renders disabled images configuration', async () => {
    const screen = await render(
      <FileUploader disabled accept="image/*" label="Disabled images" />
    );
    expect(getRoot(screen.container).getAttribute('data-disabled')).not.toBeNull();
    await takeSnapshot('FileUploader - renders disabled images configuration');
  });

  it('styles trigger with slate border', async () => {
    const screen = await render(<FileUploader />);
    await expect
      .element(locatorFor(getTrigger(screen.container)))
      .toHaveStyle({ border: `1px solid ${color.slate300}` });
    await takeSnapshot('FileUploader - styles trigger with slate border');
  });

  it('styles root with max-width', async () => {
    const screen = await render(<FileUploader />);
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({ maxWidth: '24rem' });
    await takeSnapshot('FileUploader - styles root with max-width');
  });

  it('styles label with medium font weight', async () => {
    const screen = await render(<FileUploader label="Upload" />);
    await expect.element(locatorFor(getLabel(screen.container))).toHaveStyle({ fontWeight: '500' });
    await takeSnapshot('FileUploader - styles label with medium font weight');
  });

  it('renders kitchen sink open configuration', async () => {
    await render(
      <FileUploader
        label="Kitchen sink"
        multiple
        maxFiles={5}
        accept="image/*"
        maxFileSize={5 * 1024 * 1024}
      />
    );
    await expect.element(page.getByText('Kitchen sink')).toBeInTheDocument();
    await takeSnapshot('FileUploader - renders kitchen sink open configuration');
  });

  it('renders kitchen sink locked configuration', async () => {
    const screen = await render(
      <FileUploader
        label="Kitchen sink locked"
        multiple
        maxFiles={5}
        accept="image/*"
        disabled
      />
    );
    expect(getRoot(screen.container).getAttribute('data-disabled')).not.toBeNull();
    await takeSnapshot('FileUploader - renders kitchen sink locked configuration');
  });

  it('renders evidence upload configuration', async () => {
    await render(
      <FileUploader
        label="Evidence files"
        accept="image/*,application/pdf"
        maxFiles={6}
        multiple
      />
    );
    await expect.element(page.getByText('Evidence files')).toBeInTheDocument();
    await takeSnapshot('FileUploader - renders evidence upload configuration');
  });

  it('renders invoice upload configuration', async () => {
    await render(
      <FileUploader label="Invoice" accept="application/pdf" maxFiles={1} />
    );
    await expect.element(page.getByText('Invoice')).toBeInTheDocument();
    await takeSnapshot('FileUploader - renders invoice upload configuration');
  });

  it('renders screenshot upload configuration', async () => {
    await render(
      <FileUploader
        label="Screenshots"
        accept="image/png,image/jpeg"
        multiple
        maxFiles={4}
      />
    );
    await expect.element(page.getByText('Screenshots')).toBeInTheDocument();
    await takeSnapshot('FileUploader - renders screenshot upload configuration');
  });

  it('renders dataset upload configuration', async () => {
    await render(
      <FileUploader
        label="Dataset"
        accept="text/csv,application/json"
        maxFiles={2}
        multiple
      />
    );
    await expect.element(page.getByText('Dataset')).toBeInTheDocument();
    await takeSnapshot('FileUploader - renders dataset upload configuration');
  });

  it('renders many-files configuration', async () => {
    const screen = await render(
      <FileUploader multiple maxFiles={20} label="Many files" />
    );
    await expect.element(page.getByText('Many files')).toBeInTheDocument();
    expect(getHiddenInput(screen.container).hasAttribute('multiple')).toBe(true);
    await takeSnapshot('FileUploader - renders many-files configuration');
  });

  it('renders media bundle configuration', async () => {
    await render(
      <FileUploader
        accept="image/*,video/*,audio/*"
        maxFiles={10}
        multiple
        label="Media bundle"
      />
    );
    await expect.element(page.getByText('Media bundle')).toBeInTheDocument();
    await takeSnapshot('FileUploader - renders media bundle configuration');
  });
});
