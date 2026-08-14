import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent, page } from 'vitest/browser';
import Header from './Header';
import { color } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

// Local data: URI instead of a remote fetch to avoid real-network flakiness in browser-mode tests.
const LOGO_SRC =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';
// Same-origin, guaranteed-404 path — no DNS lookup, fails fast and deterministically.
const BROKEN_LOGO_SRC = '/__fixtures__/does-not-exist.png';

/** Wraps a raw HTMLElement into a Locator so jest-dom style matchers can be used. */
const locatorFor = (element: HTMLElement) => page.elementLocator(element);

/** The outer <header> element rendered by the component. */
const getHeaderEl = (container: HTMLElement) =>
  container.querySelector('header') as HTMLElement;

/** The direct container <div> inside the header (holds brand + nav). */
const getContainerEl = (container: HTMLElement) =>
  container.querySelector('header > div') as HTMLElement;

/** The brand <div> wrapping the logo and title. */
const getBrandEl = (container: HTMLElement) =>
  container.querySelector('header > div > div') as HTMLElement;

/** The <h1> title element. */
const getTitleEl = (container: HTMLElement) =>
  container.querySelector('h1') as HTMLElement;

const fourLinks = [
  { label: 'Home', href: '#' },
  { label: 'Features', href: '#' },
  { label: 'Pricing', href: '#' },
  { label: 'About', href: '#' },
];

describe('Header', () => {
  /* -----------------------------------------------------------------------
   * Title rendering (5)
   * -------------------------------------------------------------------- */

  it('renders the default title "Application" when no title prop is provided', async () => {
    const screen = await render(<Header />);
    await expect.element(screen.getByText('Application')).toBeInTheDocument();
    await takeSnapshot(`Header - renders the default title "Application" when no title prop is provided`);
  });

  it('renders a custom title provided via props', async () => {
    const screen = await render(<Header title="Acme Dashboard" />);
    await expect
      .element(screen.getByText('Acme Dashboard'))
      .toBeInTheDocument();
    await takeSnapshot(`Header - renders a custom title provided via props`);
  });

  it('renders long title text in full without truncating the DOM text content', async () => {
    const longTitle =
      'The Complete Enterprise Resource Planning and Customer Relationship Management Platform';
    const screen = await render(<Header title={longTitle} />);
    await expect
      .element(screen.getByText(longTitle))
      .toHaveTextContent(longTitle);
    await takeSnapshot(`Header - renders long title text in full without truncating the DOM text content`);
  });

  it('preserves RTL unicode title content exactly', async () => {
    const screen = await render(<Header title="لوحة التحكم" />);
    await expect
      .element(screen.getByText('لوحة التحكم'))
      .toHaveTextContent('لوحة التحكم');
    await takeSnapshot(`Header - preserves RTL unicode title content exactly`);
  });

  it('preserves emoji title content exactly', async () => {
    const screen = await render(<Header title="🚀 Launchpad" />);
    await expect
      .element(screen.getByText('🚀 Launchpad'))
      .toHaveTextContent('🚀 Launchpad');
    await takeSnapshot(`Header - preserves emoji title content exactly`);
  });

  /* -----------------------------------------------------------------------
   * Logo rendering (3)
   * -------------------------------------------------------------------- */

  it('does not render an img element when logo is not provided', async () => {
    const screen = await render(<Header title="No Logo" />);
    expect(screen.container.querySelector('img')).toBeNull();
    await takeSnapshot(`Header - does not render an img element when logo is not provided`);
  });

  it('renders an img element with the given src and alt="Logo" when logo is provided', async () => {
    const screen = await render(
      <Header title="Branded" logo={LOGO_SRC} />
    );
    const img = screen.container.querySelector('img') as HTMLImageElement;
    expect(img).not.toBeNull();
    expect(img.getAttribute('src')).toBe(LOGO_SRC);
    expect(img.getAttribute('alt')).toBe('Logo');
    await takeSnapshot(`Header - renders an img element with the given src and alt="Logo" when logo is provided`);
  });

  it('still renders the img element when the logo url is invalid/unreachable', async () => {
    const screen = await render(
      <Header title="Broken Logo" logo={BROKEN_LOGO_SRC} />
    );
    const img = screen.container.querySelector('img') as HTMLImageElement;
    expect(img).not.toBeNull();
    expect(img.getAttribute('src')).toBe(BROKEN_LOGO_SRC);
    await takeSnapshot(`Header - still renders the img element when the logo url is invalid/unreachable`);
  });

  /* -----------------------------------------------------------------------
   * Links / nav rendering (6)
   * -------------------------------------------------------------------- */

  it('renders no nav element when links defaults to an empty array', async () => {
    const screen = await render(<Header title="No Links" />);
    expect(screen.container.querySelector('nav')).toBeNull();
    await takeSnapshot(`Header - renders no nav element when links defaults to an empty array`);
  });

  it('renders no nav element when links is explicitly an empty array', async () => {
    const screen = await render(<Header title="No Links" links={[]} />);
    expect(screen.container.querySelector('nav')).toBeNull();
    await takeSnapshot(`Header - renders no nav element when links is explicitly an empty array`);
  });

  it('renders a nav element when at least one link is provided', async () => {
    const screen = await render(
      <Header title="With Links" links={[{ label: 'Home', href: '#' }]} />
    );
    expect(screen.container.querySelector('nav')).not.toBeNull();
    await takeSnapshot(`Header - renders a nav element when at least one link is provided`);
  });

  it('renders the correct number of link elements for the provided links array', async () => {
    const screen = await render(<Header title="Many" links={fourLinks} />);
    const links = screen.container.querySelectorAll('nav a');
    expect(links.length).toBe(4);
    await takeSnapshot(`Header - renders the correct number of link elements for the provided links array`);
  });

  it('renders each link with the correct label text', async () => {
    const screen = await render(<Header title="Labels" links={fourLinks} />);
    for (const link of fourLinks) {
      await expect.element(screen.getByText(link.label)).toBeInTheDocument();
    }
    await takeSnapshot(`Header - renders each link with the correct label text`);
  });

  it('renders each link with the correct href attribute', async () => {
    const screen = await render(
      <Header
        title="Hrefs"
        links={[
          { label: 'Storybook', href: 'https://storybook.js.org' },
          { label: 'Chromatic', href: 'https://www.chromatic.com' },
        ]}
      />
    );
    const storybookLink = screen.getByRole('link', { name: 'Storybook' });
    const chromaticLink = screen.getByRole('link', { name: 'Chromatic' });
    await expect
      .element(storybookLink)
      .toHaveAttribute('href', 'https://storybook.js.org');
    await expect
      .element(chromaticLink)
      .toHaveAttribute('href', 'https://www.chromatic.com');
    await takeSnapshot(`Header - renders each link with the correct href attribute`);
  });

  /* -----------------------------------------------------------------------
   * onLinkClick callback (5)
   * -------------------------------------------------------------------- */

  it('calls onLinkClick when a link is clicked', async () => {
    const onLinkClick = vi.fn();
    const screen = await render(
      <Header
        title="Click"
        links={[{ label: 'Home', href: '#' }]}
        onLinkClick={onLinkClick}
      />
    );
    await userEvent.click(screen.getByRole('link', { name: 'Home' }));
    expect(onLinkClick).toHaveBeenCalledTimes(1);
    await takeSnapshot(`Header - calls onLinkClick when a link is clicked`);
  });

  it('calls onLinkClick with the exact link object matching the clicked link', async () => {
    const onLinkClick = vi.fn();
    const screen = await render(
      <Header
        title="Click"
        links={[{ label: 'Home', href: '#' }]}
        onLinkClick={onLinkClick}
      />
    );
    await userEvent.click(screen.getByRole('link', { name: 'Home' }));
    expect(onLinkClick).toHaveBeenCalledWith({ label: 'Home', href: '#' });
    await takeSnapshot(`Header - calls onLinkClick with the exact link object matching the clicked link`);
  });

  it('calls onLinkClick with the correct link when the second of several links is clicked', async () => {
    const onLinkClick = vi.fn();
    const screen = await render(
      <Header title="Click" links={fourLinks} onLinkClick={onLinkClick} />
    );
    await userEvent.click(screen.getByRole('link', { name: 'Features' }));
    expect(onLinkClick).toHaveBeenCalledWith({ label: 'Features', href: '#' });
    await takeSnapshot(`Header - calls onLinkClick with the correct link when the second of several links is clicked`);
  });

  it('calls onLinkClick exactly once per single click', async () => {
    const onLinkClick = vi.fn();
    const screen = await render(
      <Header
        title="Click"
        links={[{ label: 'Home', href: '#' }]}
        onLinkClick={onLinkClick}
      />
    );
    await userEvent.click(screen.getByRole('link', { name: 'Home' }));
    expect(onLinkClick).toHaveBeenCalledTimes(1);
    await takeSnapshot(`Header - calls onLinkClick exactly once per single click`);
  });

  it('does not throw when a link is clicked and no onLinkClick handler was provided', async () => {
    const screen = await render(
      <Header title="No Handler" links={[{ label: 'Home', href: '#' }]} />
    );
    await expect(
      userEvent.click(screen.getByRole('link', { name: 'Home' }))
    ).resolves.not.toThrow();
    await takeSnapshot(`Header - does not throw when a link is clicked and no onLinkClick handler was provided`);
  });

  /* -----------------------------------------------------------------------
   * isSticky styles (3)
   * -------------------------------------------------------------------- */

  it('applies sticky position and a top offset of 0 to the header when isSticky is true', async () => {
    const screen = await render(<Header title="Sticky" isSticky />);
    const header = getHeaderEl(screen.container);
    await expect
      .element(locatorFor(header))
      .toHaveStyle({ position: 'sticky', top: '0px' });
    await takeSnapshot(`Header - applies sticky position and a top offset of 0 to the header when isSticky is true`);
  });

  it('applies relative position to the header when isSticky is false (default)', async () => {
    const screen = await render(<Header title="Static" />);
    const header = getHeaderEl(screen.container);
    await expect.element(locatorFor(header)).toHaveStyle({ position: 'relative' });
    await takeSnapshot(`Header - applies relative position to the header when isSticky is false (default)`);
  });

  it('does not set an inline top style when isSticky is false', async () => {
    const screen = await render(<Header title="Static" />);
    const header = getHeaderEl(screen.container);
    expect(header.style.top).toBe('');
    await takeSnapshot(`Header - does not set an inline top style when isSticky is false`);
  });

  /* -----------------------------------------------------------------------
   * inverted styles (5)
   * -------------------------------------------------------------------- */

  it('applies a dark slate background to the header when inverted is true', async () => {
    const screen = await render(<Header title="Dark" inverted />);
    const header = getHeaderEl(screen.container);
    await expect
      .element(locatorFor(header))
      .toHaveStyle({ backgroundColor: color.slate900 });
    await takeSnapshot(`Header - applies a dark slate background to the header when inverted is true`);
  });

  it('applies a white background to the header when inverted is false (default)', async () => {
    const screen = await render(<Header title="Light" />);
    const header = getHeaderEl(screen.container);
    await expect
      .element(locatorFor(header))
      .toHaveStyle({ backgroundColor: color.white });
    await takeSnapshot(`Header - applies a white background to the header when inverted is false (default)`);
  });

  it('applies white text color to the title when inverted is true', async () => {
    const screen = await render(<Header title="Dark" inverted />);
    const titleEl = getTitleEl(screen.container);
    await expect
      .element(locatorFor(titleEl))
      .toHaveStyle({ color: color.white });
    await takeSnapshot(`Header - applies white text color to the title when inverted is true`);
  });

  it('applies dark slate text color to the title when inverted is false (default)', async () => {
    const screen = await render(<Header title="Light" />);
    const titleEl = getTitleEl(screen.container);
    await expect
      .element(locatorFor(titleEl))
      .toHaveStyle({ color: color.slate900 });
    await takeSnapshot(`Header - applies dark slate text color to the title when inverted is false (default)`);
  });

  it('applies a lighter blue link color when inverted vs the standard blue when not inverted', async () => {
    const invertedScreen = await render(
      <Header title="Dark" inverted links={[{ label: 'Home', href: '#' }]} />
    );
    const normalScreen = await render(
      <Header title="Light" links={[{ label: 'Home', href: '#' }]} />
    );
    const invertedLink = invertedScreen.container.querySelector('a') as HTMLElement;
    const normalLink = normalScreen.container.querySelector('a') as HTMLElement;
    await expect
      .element(locatorFor(invertedLink))
      .toHaveStyle({ color: color.blue200 });
    await expect
      .element(locatorFor(normalLink))
      .toHaveStyle({ color: color.blue600 });
    await takeSnapshot(`Header - applies a lighter blue link color when inverted vs the standard blue when not inverted`);
  });

  /* -----------------------------------------------------------------------
   * fullWidth styles (3)
   * -------------------------------------------------------------------- */

  it('applies a 100% max width to the container when fullWidth is true', async () => {
    const screen = await render(<Header title="Full" fullWidth />);
    const containerEl = getContainerEl(screen.container);
    await expect
      .element(locatorFor(containerEl))
      .toHaveStyle({ maxWidth: '100%' });
    await takeSnapshot(`Header - applies a 100% max width to the container when fullWidth is true`);
  });

  it('applies a 1200px max width to the container when fullWidth is false (default)', async () => {
    const screen = await render(<Header title="Constrained" />);
    const containerEl = getContainerEl(screen.container);
    await expect
      .element(locatorFor(containerEl))
      .toHaveStyle({ maxWidth: '1200px' });
    await takeSnapshot(`Header - applies a 1200px max width to the container when fullWidth is false (default)`);
  });

  it('applies the 100% max width correctly even when combined with inverted and isSticky', async () => {
    const screen = await render(
      <Header title="Combo" fullWidth inverted isSticky />
    );
    const containerEl = getContainerEl(screen.container);
    await expect
      .element(locatorFor(containerEl))
      .toHaveStyle({ maxWidth: '100%' });
    await takeSnapshot(`Header - applies the 100% max width correctly even when combined with inverted and isSticky`);
  });

  /* -----------------------------------------------------------------------
   * Default prop values (3)
   * -------------------------------------------------------------------- */

  it('uses "Application" as the default title when rendered with no props', async () => {
    const screen = await render(<Header />);
    const titleEl = getTitleEl(screen.container);
    await expect.element(locatorFor(titleEl)).toHaveTextContent('Application');
    await takeSnapshot(`Header - uses "Application" as the default title when rendered with no props`);
  });

  it('defaults isSticky, inverted, and fullWidth to false', async () => {
    const screen = await render(<Header />);
    const header = getHeaderEl(screen.container);
    const containerEl = getContainerEl(screen.container);
    await expect.element(locatorFor(header)).toHaveStyle({
      position: 'relative',
      backgroundColor: color.white,
    });
    await expect
      .element(locatorFor(containerEl))
      .toHaveStyle({ maxWidth: '1200px' });
    await takeSnapshot(`Header - defaults isSticky, inverted, and fullWidth to false`);
  });

  it('renders with no links and no logo by default', async () => {
    const screen = await render(<Header />);
    expect(screen.container.querySelector('nav')).toBeNull();
    expect(screen.container.querySelector('img')).toBeNull();
    await takeSnapshot(`Header - renders with no links and no logo by default`);
  });

  /* -----------------------------------------------------------------------
   * Kitchen-sink combinations (3)
   * -------------------------------------------------------------------- */

  it('renders correctly with every boolean flag enabled, a logo, and multiple links', async () => {
    const screen = await render(
      <Header
        title="🚀 Global Enterprise Platform"
        logo={LOGO_SRC}
        links={fourLinks}
        isSticky
        inverted
        fullWidth
      />
    );
    const header = getHeaderEl(screen.container);
    await expect
      .element(locatorFor(header))
      .toHaveStyle({ position: 'sticky', backgroundColor: color.slate900 });
    expect(screen.container.querySelector('img')).not.toBeNull();
    expect(screen.container.querySelectorAll('nav a').length).toBe(4);
    await takeSnapshot(`Header - renders correctly with every boolean flag enabled, a logo, and multiple links`);
  });

  it('renders correctly with every boolean flag disabled and no logo/links', async () => {
    const screen = await render(
      <Header
        title="Minimal"
        isSticky={false}
        inverted={false}
        fullWidth={false}
      />
    );
    const header = getHeaderEl(screen.container);
    await expect
      .element(locatorFor(header))
      .toHaveStyle({ position: 'relative', backgroundColor: color.white });
    expect(screen.container.querySelector('nav')).toBeNull();
    expect(screen.container.querySelector('img')).toBeNull();
    await takeSnapshot(`Header - renders correctly with every boolean flag disabled and no logo/links`);
  });

  it('correctly fires onLinkClick even when isSticky, inverted, and fullWidth are all enabled together', async () => {
    const onLinkClick = vi.fn();
    const screen = await render(
      <Header
        title="Combo"
        links={[{ label: 'Home', href: '#' }]}
        isSticky
        inverted
        fullWidth
        onLinkClick={onLinkClick}
      />
    );
    await userEvent.click(screen.getByRole('link', { name: 'Home' }));
    expect(onLinkClick).toHaveBeenCalledWith({ label: 'Home', href: '#' });
    await takeSnapshot(`Header - correctly fires onLinkClick even when isSticky, inverted, and fullWidth are all enabled together`);
  });

  /* -----------------------------------------------------------------------
   * Edge cases (6)
   * -------------------------------------------------------------------- */

  it('renders an empty string title without crashing', async () => {
    const screen = await render(<Header title="" />);
    const titleEl = getTitleEl(screen.container);
    expect(titleEl).not.toBeNull();
    expect(titleEl.textContent).toBe('');
    await takeSnapshot(`Header - renders an empty string title without crashing`);
  });

  it('renders a whitespace-only title', async () => {
    const screen = await render(<Header title="   " />);
    const titleEl = getTitleEl(screen.container);
    expect(titleEl.textContent).toBe('   ');
    await takeSnapshot(`Header - renders a whitespace-only title`);
  });

  it('renders links with special characters in their labels correctly', async () => {
    const screen = await render(
      <Header
        title="Special"
        links={[
          { label: 'Q&A', href: '#' },
          { label: '50% Off!', href: '#' },
        ]}
      />
    );
    await expect.element(screen.getByText('Q&A')).toBeInTheDocument();
    await expect.element(screen.getByText('50% Off!')).toBeInTheDocument();
    await takeSnapshot(`Header - renders links with special characters in their labels correctly`);
  });

  it('handles duplicate link labels with different hrefs, calling onLinkClick with the correct href for each', async () => {
    const onLinkClick = vi.fn();
    const screen = await render(
      <Header
        title="Duplicates"
        links={[
          { label: 'Docs', href: '#v1' },
          { label: 'Docs', href: '#v2' },
        ]}
        onLinkClick={onLinkClick}
      />
    );
    const links = screen.container.querySelectorAll('nav a');
    expect(links.length).toBe(2);
    await userEvent.click(links[0] as HTMLElement);
    expect(onLinkClick).toHaveBeenNthCalledWith(1, { label: 'Docs', href: '#v1' });
    await userEvent.click(links[1] as HTMLElement);
    expect(onLinkClick).toHaveBeenNthCalledWith(2, { label: 'Docs', href: '#v2' });
    await takeSnapshot(`Header - handles duplicate link labels with different hrefs, calling onLinkClick with the correct href for each`);
  });

  it('renders a large number of links without error', async () => {
    const manyLinks = Array.from({ length: 10 }, (_, i) => ({
      label: `Link ${i + 1}`,
      href: '#',
    }));
    const screen = await render(<Header title="Many" links={manyLinks} />);
    expect(screen.container.querySelectorAll('nav a').length).toBe(10);
    await takeSnapshot(`Header - renders a large number of links without error`);
  });

  it('renders external (non-hash) hrefs correctly', async () => {
    const screen = await render(
      <Header
        title="External"
        links={[{ label: 'Storybook', href: 'https://storybook.js.org' }]}
      />
    );
    const link = screen.getByRole('link', { name: 'Storybook' });
    await expect
      .element(link)
      .toHaveAttribute('href', 'https://storybook.js.org');
    await takeSnapshot(`Header - renders external (non-hash) hrefs correctly`);
  });

  /* -----------------------------------------------------------------------
   * Multi-instance independence (2)
   * -------------------------------------------------------------------- */

  it('renders two Header instances with different titles independently', async () => {
    const screen = await render(
      <div>
        <Header title="First App" />
        <Header title="Second App" />
      </div>
    );
    await expect.element(screen.getByText('First App')).toBeInTheDocument();
    await expect.element(screen.getByText('Second App')).toBeInTheDocument();
    await takeSnapshot(`Header - renders two Header instances with different titles independently`);
  });

  it('does not call the other instance onLinkClick handler when only one Header link is clicked', async () => {
    const onFirstClick = vi.fn();
    const onSecondClick = vi.fn();
    const screen = await render(
      <div>
        <Header
          title="First"
          links={[{ label: 'Home', href: '#' }]}
          onLinkClick={onFirstClick}
        />
        <Header
          title="Second"
          links={[{ label: 'Home', href: '#' }]}
          onLinkClick={onSecondClick}
        />
      </div>
    );
    const firstLink = screen.container.querySelectorAll('a')[0] as HTMLElement;
    await userEvent.click(firstLink);
    expect(onFirstClick).toHaveBeenCalledTimes(1);
    expect(onSecondClick).not.toHaveBeenCalled();
    await takeSnapshot(`Header - does not call the other instance onLinkClick handler when only one Header link is clicked`);
  });

  /* -----------------------------------------------------------------------
   * Accessibility (2)
   * -------------------------------------------------------------------- */

  it('exposes the header element with an accessible banner landmark role', async () => {
    const screen = await render(<Header title="Landmark" />);
    await expect.element(screen.getByRole('banner')).toBeInTheDocument();
    await takeSnapshot(`Header - exposes the header element with an accessible banner landmark role`);
  });

  it('exposes a navigation landmark and accessible link names matching their labels', async () => {
    const screen = await render(<Header title="Nav" links={fourLinks} />);
    await expect.element(screen.getByRole('navigation')).toBeInTheDocument();
    for (const link of fourLinks) {
      await expect
        .element(screen.getByRole('link', { name: link.label }))
        .toBeInTheDocument();
    }
    await takeSnapshot(`Header - exposes a navigation landmark and accessible link names matching their labels`);
  });

  /* -----------------------------------------------------------------------
   * Hover interaction (1)
   * -------------------------------------------------------------------- */

  it('changes the computed link color on hover for an inverted-theme header', async () => {
    const screen = await render(
      <Header
        title="Hover"
        inverted
        links={[{ label: 'Hover me', href: '#' }]}
      />
    );
    const link = screen.container.querySelector('a') as HTMLElement;
    const before = getComputedStyle(link).color;
    await userEvent.hover(locatorFor(link));
    const after = getComputedStyle(link).color;
    expect(after).not.toBe(before);
    await takeSnapshot(`Header - changes the computed link color on hover for an inverted-theme header`);
  });

  /* -----------------------------------------------------------------------
   * Logo + title interplay (2)
   * -------------------------------------------------------------------- */

  it('renders both the logo image and the title text together side by side', async () => {
    const screen = await render(
      <Header title="Brand" logo={LOGO_SRC} />
    );
    const brandEl = getBrandEl(screen.container);
    expect(brandEl.querySelector('img')).not.toBeNull();
    expect(brandEl.querySelector('h1')).not.toBeNull();
    await takeSnapshot(`Header - renders both the logo image and the title text together side by side`);
  });

  it('renders the logo even when the title is an empty string', async () => {
    const screen = await render(
      <Header title="" logo={LOGO_SRC} />
    );
    expect(screen.container.querySelector('img')).not.toBeNull();
    const titleEl = getTitleEl(screen.container);
    expect(titleEl.textContent).toBe('');
    await takeSnapshot(`Header - renders the logo even when the title is an empty string`);
  });

  /* -----------------------------------------------------------------------
   * Link order rendering (1)
   * -------------------------------------------------------------------- */

  it('renders links in the exact order they were provided', async () => {
    const screen = await render(<Header title="Order" links={fourLinks} />);
    const labels = Array.from(
      screen.container.querySelectorAll('nav a')
    ).map((el) => el.textContent);
    expect(labels).toEqual(['Home', 'Features', 'Pricing', 'About']);
    await takeSnapshot(`Header - renders links in the exact order they were provided`);
  });
});
