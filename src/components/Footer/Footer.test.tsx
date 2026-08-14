import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent, page } from 'vitest/browser';
import { useState } from 'react';
import Footer from './Footer';
import { color } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

/**
 * Stateful fixture that tracks the most recently clicked link, mirroring the
 * "click tracker" usage pattern from the stories, used to exercise real
 * external state updates driven by `onLinkClick` (as opposed to just spy
 * call counts).
 */
const ClickTrackerFixture = () => {
  const [lastClicked, setLastClicked] = useState<string | null>(null);

  return (
    <div>
      <Footer
        children={['Home', 'About', 'Contact']}
        onLinkClick={(link) => setLastClicked(link)}
      />
      <p>{lastClicked ? `Last clicked: ${lastClicked}` : 'Nothing clicked yet'}</p>
    </div>
  );
};

/** Wraps a raw HTMLElement into a Locator so jest-dom matchers can be used. */
const locatorFor = (element: HTMLElement) => page.elementLocator(element);

/** The root <footer> element is always the first child rendered by the component. */
const getFooter = (container: HTMLElement) =>
  container.querySelector('footer') as HTMLElement;

/** The <nav> wrapping the links row, present only when there is at least one link. */
const getNav = (container: HTMLElement) =>
  container.querySelector('nav') as HTMLElement | null;

/** The <p> element rendering the label text. */
const getLabel = (container: HTMLElement) =>
  container.querySelector('p') as HTMLElement;

describe('Footer', () => {
  /* -----------------------------------------------------------------------
   * Default rendering (4)
   * -------------------------------------------------------------------- */

  it('renders a footer element', async () => {
    const screen = await render(<Footer />);
    const footer = getFooter(screen.container);
    expect(footer).not.toBeNull();
    await takeSnapshot(`Footer - renders a footer element`);
  });

  it('renders the default label text when label is not provided', async () => {
    const screen = await render(<Footer />);
    await expect
      .element(screen.getByText('© 2025 Company Name. All rights reserved.'))
      .toBeInTheDocument();
    await takeSnapshot(`Footer - renders the default label text when label is not provided`);
  });

  it('does not render a nav element when children is not provided', async () => {
    const screen = await render(<Footer />);
    expect(getNav(screen.container)).toBeNull();
    await takeSnapshot(`Footer - does not render a nav element when children is not provided`);
  });

  it('does not render a nav element when children is an explicit empty array', async () => {
    const screen = await render(<Footer children={[]} />);
    expect(getNav(screen.container)).toBeNull();
    await takeSnapshot(`Footer - does not render a nav element when children is an explicit empty array`);
  });

  /* -----------------------------------------------------------------------
   * Default background/border/label styling (3)
   * -------------------------------------------------------------------- */

  it('applies the default slate800 background when color is not provided', async () => {
    const screen = await render(<Footer />);
    const footer = getFooter(screen.container);
    await expect
      .element(locatorFor(footer))
      .toHaveStyle({ backgroundColor: color.slate800 });
    await takeSnapshot(`Footer - applies the default slate800 background when color is not provided`);
  });

  it('applies a slate700 top border when not inverted', async () => {
    const screen = await render(<Footer />);
    const footer = getFooter(screen.container);
    await expect
      .element(locatorFor(footer))
      .toHaveStyle({ borderTop: `1px solid ${color.slate700}` });
    await takeSnapshot(`Footer - applies a slate700 top border when not inverted`);
  });

  it('renders the label text in white when not inverted', async () => {
    const screen = await render(<Footer />);
    const label = getLabel(screen.container);
    await expect.element(locatorFor(label)).toHaveStyle({ color: color.white });
    await takeSnapshot(`Footer - renders the label text in white when not inverted`);
  });

  /* -----------------------------------------------------------------------
   * Custom color prop (3)
   * -------------------------------------------------------------------- */

  it('applies a custom background color when color is provided', async () => {
    const screen = await render(<Footer color="#1e40af" />);
    const footer = getFooter(screen.container);
    await expect
      .element(locatorFor(footer))
      .toHaveStyle({ backgroundColor: '#1e40af' });
    await takeSnapshot(`Footer - applies a custom background color when color is provided`);
  });

  it('accepts an rgb() color string', async () => {
    const screen = await render(<Footer color="rgb(124, 58, 237)" />);
    const footer = getFooter(screen.container);
    await expect
      .element(locatorFor(footer))
      .toHaveStyle({ backgroundColor: 'rgb(124, 58, 237)' });
    await takeSnapshot(`Footer - accepts an rgb() color string`);
  });

  it('ignores the color prop for the background when inverted is true', async () => {
    const screen = await render(<Footer color="red" inverted />);
    const footer = getFooter(screen.container);
    await expect
      .element(locatorFor(footer))
      .toHaveStyle({ backgroundColor: color.white });
    await takeSnapshot(`Footer - ignores the color prop for the background when inverted is true`);
  });

  /* -----------------------------------------------------------------------
   * Inverted styling (4)
   * -------------------------------------------------------------------- */

  it('renders a white background when inverted is true', async () => {
    const screen = await render(<Footer inverted />);
    const footer = getFooter(screen.container);
    await expect
      .element(locatorFor(footer))
      .toHaveStyle({ backgroundColor: color.white });
    await takeSnapshot(`Footer - renders a white background when inverted is true`);
  });

  it('renders the label text in slate800 when inverted is true', async () => {
    const screen = await render(<Footer inverted />);
    const label = getLabel(screen.container);
    await expect
      .element(locatorFor(label))
      .toHaveStyle({ color: color.slate800 });
    await takeSnapshot(`Footer - renders the label text in slate800 when inverted is true`);
  });

  it('applies a slate200 top border when inverted is true', async () => {
    const screen = await render(<Footer inverted />);
    const footer = getFooter(screen.container);
    await expect
      .element(locatorFor(footer))
      .toHaveStyle({ borderTop: `1px solid ${color.slate200}` });
    await takeSnapshot(`Footer - applies a slate200 top border when inverted is true`);
  });

  it('renders the default (non-inverted) background when inverted is explicitly false', async () => {
    const screen = await render(<Footer inverted={false} />);
    const footer = getFooter(screen.container);
    await expect
      .element(locatorFor(footer))
      .toHaveStyle({ backgroundColor: color.slate800 });
    await takeSnapshot(`Footer - renders the default (non-inverted) background when inverted is explicitly false`);
  });

  /* -----------------------------------------------------------------------
   * Link rendering (4)
   * -------------------------------------------------------------------- */

  it('renders a nav element when at least one link is provided', async () => {
    const screen = await render(<Footer children={['About']} />);
    expect(getNav(screen.container)).not.toBeNull();
    await takeSnapshot(`Footer - renders a nav element when at least one link is provided`);
  });

  it('renders exactly one anchor for a single link', async () => {
    const screen = await render(<Footer children={['About']} />);
    const nav = getNav(screen.container);
    expect(nav?.querySelectorAll('a').length).toBe(1);
    await takeSnapshot(`Footer - renders exactly one anchor for a single link`);
  });

  it('renders one anchor per entry for multiple links', async () => {
    const screen = await render(
      <Footer children={['Home', 'About', 'Contact', 'Careers']} />
    );
    const nav = getNav(screen.container);
    expect(nav?.querySelectorAll('a').length).toBe(4);
    await takeSnapshot(`Footer - renders one anchor per entry for multiple links`);
  });

  it('renders a large number of links without dropping any', async () => {
    const links = Array.from({ length: 20 }, (_, i) => `Link ${i + 1}`);
    const screen = await render(<Footer children={links} />);
    const nav = getNav(screen.container);
    expect(nav?.querySelectorAll('a').length).toBe(20);
    await takeSnapshot(`Footer - renders a large number of links without dropping any`);
  });

  /* -----------------------------------------------------------------------
   * Link color styling (2)
   * -------------------------------------------------------------------- */

  it('renders links in blue200 when not inverted', async () => {
    const screen = await render(<Footer children={['About']} />);
    const link = screen.getByText('About');
    await expect.element(link).toHaveStyle({ color: color.blue200 });
    await takeSnapshot(`Footer - renders links in blue200 when not inverted`);
  });

  it('renders links in blue500 when inverted', async () => {
    const screen = await render(<Footer inverted children={['About']} />);
    const link = screen.getByText('About');
    await expect.element(link).toHaveStyle({ color: color.blue500 });
    await takeSnapshot(`Footer - renders links in blue500 when inverted`);
  });

  /* -----------------------------------------------------------------------
   * Links render as hrefless anchors (2)
   * -------------------------------------------------------------------- */

  it('renders each link as an anchor element', async () => {
    const screen = await render(<Footer children={['Docs']} />);
    const link = screen.getByText('Docs');
    expect(link.element().tagName).toBe('A');
    await takeSnapshot(`Footer - renders each link as an anchor element`);
  });

  it('does not add an href attribute to link anchors', async () => {
    const screen = await render(<Footer children={['Docs']} />);
    const link = screen.getByText('Docs');
    await expect.element(link).not.toHaveAttribute('href');
    await takeSnapshot(`Footer - does not add an href attribute to link anchors`);
  });

  /* -----------------------------------------------------------------------
   * onLinkClick callback (5)
   * -------------------------------------------------------------------- */

  it('calls onLinkClick with the clicked link label', async () => {
    const onLinkClick = vi.fn();
    const screen = await render(
      <Footer children={['About', 'Contact']} onLinkClick={onLinkClick} />
    );
    await userEvent.click(screen.getByText('About'));
    await vi.waitFor(() => expect(onLinkClick).toHaveBeenCalledWith('About'));
    await takeSnapshot(`Footer - calls onLinkClick with the clicked link label`);
  });

  it('calls onLinkClick exactly once per click', async () => {
    const onLinkClick = vi.fn();
    const screen = await render(
      <Footer children={['About']} onLinkClick={onLinkClick} />
    );
    await userEvent.click(screen.getByText('About'));
    await vi.waitFor(() => expect(onLinkClick).toHaveBeenCalledTimes(1));
    await takeSnapshot(`Footer - calls onLinkClick exactly once per click`);
  });

  it('calls onLinkClick with the correct label for each of several distinct links clicked in order', async () => {
    const onLinkClick = vi.fn();
    const screen = await render(
      <Footer children={['Home', 'Blog', 'Support']} onLinkClick={onLinkClick} />
    );
    await userEvent.click(screen.getByText('Home'));
    await userEvent.click(screen.getByText('Blog'));
    await userEvent.click(screen.getByText('Support'));
    await vi.waitFor(() => expect(onLinkClick).toHaveBeenNthCalledWith(1, 'Home'));
    await vi.waitFor(() => expect(onLinkClick).toHaveBeenNthCalledWith(2, 'Blog'));
    await vi.waitFor(() => expect(onLinkClick).toHaveBeenNthCalledWith(3, 'Support'));
    await takeSnapshot(`Footer - calls onLinkClick with the correct label for each of several distinct links clicked in order`);
  });

  it('does not call onLinkClick for a link that was not clicked', async () => {
    const onLinkClick = vi.fn();
    const screen = await render(
      <Footer children={['About', 'Contact']} onLinkClick={onLinkClick} />
    );
    await userEvent.click(screen.getByText('About'));
    await vi.waitFor(() => expect(onLinkClick).not.toHaveBeenCalledWith('Contact'));
    await takeSnapshot(`Footer - does not call onLinkClick for a link that was not clicked`);
  });

  it('does not throw when a link is clicked without an onLinkClick handler', async () => {
    const screen = await render(<Footer children={['Terms']} />);
    await expect(userEvent.click(screen.getByText('Terms'))).resolves.not.toThrow();
    await takeSnapshot(`Footer - does not throw when a link is clicked without an onLinkClick handler`);
  });

  /* -----------------------------------------------------------------------
   * onLinkClick with duplicate/independent link instances (2)
   * -------------------------------------------------------------------- */

  it('invokes onLinkClick for the specific anchor clicked among duplicate labels', async () => {
    const onLinkClick = vi.fn();
    const screen = await render(
      <Footer children={['Home', 'Home', 'Contact']} onLinkClick={onLinkClick} />
    );
    const nav = getNav(screen.container);
    const anchors = nav?.querySelectorAll('a') ?? [];
    expect(anchors.length).toBe(3);
    await userEvent.click(locatorFor(anchors[1] as HTMLElement));
    await vi.waitFor(() => expect(onLinkClick).toHaveBeenCalledWith('Home'));
    await vi.waitFor(() => expect(onLinkClick).toHaveBeenCalledTimes(1));
    await takeSnapshot(`Footer - invokes onLinkClick for the specific anchor clicked among duplicate labels`);
  });

  it('does not share click callbacks between two independently rendered footers', async () => {
    const onFirstClick = vi.fn();
    const onSecondClick = vi.fn();
    const screen = await render(
      <div>
        <Footer children={['First Link']} onLinkClick={onFirstClick} />
        <Footer children={['Second Link']} onLinkClick={onSecondClick} />
      </div>
    );
    await userEvent.click(screen.getByText('First Link'));
    await vi.waitFor(() => expect(onFirstClick).toHaveBeenCalledTimes(1));
    await vi.waitFor(() => expect(onSecondClick).not.toHaveBeenCalled());
    await takeSnapshot(`Footer - does not share click callbacks between two independently rendered footers`);
  });

  /* -----------------------------------------------------------------------
   * Stateful click-tracking fixture (2)
   * -------------------------------------------------------------------- */

  it('updates external state via onLinkClick when wired to a stateful consumer', async () => {
    const screen = await render(<ClickTrackerFixture />);
    await expect.element(screen.getByText('Nothing clicked yet')).toBeInTheDocument();
    await userEvent.click(screen.getByText('About'));
    await expect
      .element(screen.getByText('Last clicked: About'))
      .toBeInTheDocument();
    await takeSnapshot(`Footer - updates external state via onLinkClick when wired to a stateful consumer`);
  });

  it('updates the tracked link again after clicking a different link', async () => {
    const screen = await render(<ClickTrackerFixture />);
    await userEvent.click(screen.getByText('Home'));
    await expect.element(screen.getByText('Last clicked: Home')).toBeInTheDocument();
    await userEvent.click(screen.getByText('Contact'));
    await expect
      .element(screen.getByText('Last clicked: Contact'))
      .toBeInTheDocument();
    await takeSnapshot(`Footer - updates the tracked link again after clicking a different link`);
  });

  /* -----------------------------------------------------------------------
   * Label content (5)
   * -------------------------------------------------------------------- */

  it('renders custom label text', async () => {
    const screen = await render(<Footer label="Made with care by the team" />);
    await expect
      .element(screen.getByText('Made with care by the team'))
      .toBeInTheDocument();
    await takeSnapshot(`Footer - renders custom label text`);
  });

  it('renders an empty string label without throwing', async () => {
    const screen = await render(<Footer label="" />);
    const label = getLabel(screen.container);
    expect(label).not.toBeNull();
    expect(label.textContent).toBe('');
    await takeSnapshot(`Footer - renders an empty string label without throwing`);
  });

  it('renders a whitespace-only label', async () => {
    const screen = await render(<Footer label="   " />);
    const label = getLabel(screen.container);
    expect(label.textContent).toBe('   ');
    await takeSnapshot(`Footer - renders a whitespace-only label`);
  });

  it('renders very long label text in full without truncating the DOM text content', async () => {
    const longLabel =
      '© 2025 Global Enterprise Holdings International Corporation Limited. All rights reserved worldwide.';
    const screen = await render(<Footer label={longLabel} />);
    await expect.element(screen.getByText(longLabel)).toHaveTextContent(longLabel);
    await takeSnapshot(`Footer - renders very long label text in full without truncating the DOM text content`);
  });

  it('renders a very short label', async () => {
    const screen = await render(<Footer label="© 25" />);
    await expect.element(screen.getByText('© 25')).toBeInTheDocument();
    await takeSnapshot(`Footer - renders a very short label`);
  });

  /* -----------------------------------------------------------------------
   * RTL/unicode/emoji content (4)
   * -------------------------------------------------------------------- */

  it('preserves RTL unicode label content exactly', async () => {
    const screen = await render(<Footer label="© 2025 جميع الحقوق محفوظة" />);
    await expect
      .element(screen.getByText('© 2025 جميع الحقوق محفوظة'))
      .toHaveTextContent('© 2025 جميع الحقوق محفوظة');
    await takeSnapshot(`Footer - preserves RTL unicode label content exactly`);
  });

  it('preserves emoji label content exactly', async () => {
    const screen = await render(<Footer label="🎉 Merci ! 🚀" />);
    await expect
      .element(screen.getByText('🎉 Merci ! 🚀'))
      .toHaveTextContent('🎉 Merci ! 🚀');
    await takeSnapshot(`Footer - preserves emoji label content exactly`);
  });

  it('preserves RTL unicode link label content exactly', async () => {
    const screen = await render(<Footer children={['الرئيسية', 'من نحن']} />);
    await expect.element(screen.getByText('الرئيسية')).toBeInTheDocument();
    await expect.element(screen.getByText('من نحن')).toBeInTheDocument();
    await takeSnapshot(`Footer - preserves RTL unicode link label content exactly`);
  });

  it('preserves emoji link label content exactly and still fires onLinkClick with it', async () => {
    const onLinkClick = vi.fn();
    const screen = await render(
      <Footer children={['🏠 Home']} onLinkClick={onLinkClick} />
    );
    await expect.element(screen.getByText('🏠 Home')).toBeInTheDocument();
    await userEvent.click(screen.getByText('🏠 Home'));
    await vi.waitFor(() => expect(onLinkClick).toHaveBeenCalledWith('🏠 Home'));
    await takeSnapshot(`Footer - preserves emoji link label content exactly and still fires onLinkClick with it`);
  });

  /* -----------------------------------------------------------------------
   * Default prop values (3)
   * -------------------------------------------------------------------- */

  it('defaults color, label, children, and inverted when no props are provided', async () => {
    const screen = await render(<Footer />);
    const footer = getFooter(screen.container);
    await expect
      .element(locatorFor(footer))
      .toHaveStyle({ backgroundColor: color.slate800 });
    await expect
      .element(screen.getByText('© 2025 Company Name. All rights reserved.'))
      .toBeInTheDocument();
    expect(getNav(screen.container)).toBeNull();
    await takeSnapshot(`Footer - defaults color, label, children, and inverted when no props are provided`);
  });

  it('renders without an onLinkClick handler by default', async () => {
    const screen = await render(<Footer children={['About']} />);
    await expect(userEvent.click(screen.getByText('About'))).resolves.not.toThrow();
    await takeSnapshot(`Footer - renders without an onLinkClick handler by default`);
  });

  it('renders correctly when only onLinkClick is supplied and every other prop is left at its default', async () => {
    const onLinkClick = vi.fn();
    const screen = await render(<Footer onLinkClick={onLinkClick} />);
    const footer = getFooter(screen.container);
    await expect
      .element(locatorFor(footer))
      .toHaveStyle({ backgroundColor: color.slate800 });
    expect(getNav(screen.container)).toBeNull();
    await takeSnapshot(`Footer - renders correctly when only onLinkClick is supplied and every other prop is left at its default`);
  });

  /* -----------------------------------------------------------------------
   * Kitchen-sink combinations (5)
   * -------------------------------------------------------------------- */

  it('renders correctly with inverted, a custom color (ignored for background), many links, and a long label', async () => {
    const onLinkClick = vi.fn();
    const links = ['Home', 'About', 'Services', 'Products', 'Blog', 'Contact'];
    const screen = await render(
      <Footer
        inverted
        color="#7c3aed"
        label="© 2025 Kitchen Sink Global Enterprises Limited."
        children={links}
        onLinkClick={onLinkClick}
      />
    );
    const footer = getFooter(screen.container);
    await expect
      .element(locatorFor(footer))
      .toHaveStyle({ backgroundColor: color.white });
    const nav = getNav(screen.container);
    expect(nav?.querySelectorAll('a').length).toBe(links.length);
    await userEvent.click(screen.getByText('Services'));
    await vi.waitFor(() => expect(onLinkClick).toHaveBeenCalledWith('Services'));
    await takeSnapshot(`Footer - renders correctly with inverted, a custom color (ignored for background), many links, and a long label`);
  });

  it('renders correctly with a non-inverted custom color, a small number of links, and an emoji label', async () => {
    const screen = await render(
      <Footer
        color="#047857"
        children={['Home', 'About']}
        label="🎉 © 2025 Kitchen Sink Inc. 🚀"
      />
    );
    const footer = getFooter(screen.container);
    await expect
      .element(locatorFor(footer))
      .toHaveStyle({ backgroundColor: '#047857' });
    await expect
      .element(screen.getByText('🎉 © 2025 Kitchen Sink Inc. 🚀'))
      .toBeInTheDocument();
    await takeSnapshot(`Footer - renders correctly with a non-inverted custom color, a small number of links, and an emoji label`);
  });

  it('renders correctly with inverted, no links, and a custom label', async () => {
    const screen = await render(
      <Footer
        inverted
        children={[]}
        label="Kitchen sink: inverted, no links, custom label"
      />
    );
    expect(getNav(screen.container)).toBeNull();
    await expect
      .element(screen.getByText('Kitchen sink: inverted, no links, custom label'))
      .toBeInTheDocument();
    await takeSnapshot(`Footer - renders correctly with inverted, no links, and a custom label`);
  });

  it('renders correctly with RTL links, inverted styling, and a custom color together', async () => {
    const onLinkClick = vi.fn();
    const screen = await render(
      <Footer
        inverted
        color="#059669"
        label="© 2025 شركة عالمية"
        children={['الرئيسية', 'من نحن', 'اتصل بنا']}
        onLinkClick={onLinkClick}
      />
    );
    const footer = getFooter(screen.container);
    await expect
      .element(locatorFor(footer))
      .toHaveStyle({ backgroundColor: color.white });
    await userEvent.click(screen.getByText('من نحن'));
    await vi.waitFor(() => expect(onLinkClick).toHaveBeenCalledWith('من نحن'));
    await takeSnapshot(`Footer - renders correctly with RTL links, inverted styling, and a custom color together`);
  });

  it('renders correctly with every prop populated including a large link list and a very long label', async () => {
    const onLinkClick = vi.fn();
    const links = Array.from({ length: 15 }, (_, i) => `Link ${i + 1}`);
    const screen = await render(
      <Footer
        color="#1e40af"
        label="© 2025 Full Kitchen Sink Corporation. All rights reserved across every jurisdiction."
        children={links}
        inverted={false}
        onLinkClick={onLinkClick}
      />
    );
    const nav = getNav(screen.container);
    expect(nav?.querySelectorAll('a').length).toBe(15);
    await userEvent.click(screen.getByText('Link 10'));
    await vi.waitFor(() => expect(onLinkClick).toHaveBeenCalledWith('Link 10'));
    await takeSnapshot(`Footer - renders correctly with every prop populated including a large link list and a very long label`);
  });

  /* -----------------------------------------------------------------------
   * Multi-instance independence (2)
   * -------------------------------------------------------------------- */

  it('does not share link content between two independently rendered footers', async () => {
    const screen = await render(
      <div>
        <Footer children={['Alpha']} />
        <Footer children={['Beta']} />
      </div>
    );
    await expect.element(screen.getByText('Alpha')).toBeInTheDocument();
    await expect.element(screen.getByText('Beta')).toBeInTheDocument();
    await takeSnapshot(`Footer - does not share link content between two independently rendered footers`);
  });

  it('does not share inverted/background styling between two independently rendered footers', async () => {
    const screen = await render(
      <div>
        <Footer inverted />
        <Footer />
      </div>
    );
    const footers = screen.container.querySelectorAll('footer');
    expect(footers.length).toBe(2);
    await expect
      .element(locatorFor(footers[0] as HTMLElement))
      .toHaveStyle({ backgroundColor: color.white });
    await expect
      .element(locatorFor(footers[1] as HTMLElement))
      .toHaveStyle({ backgroundColor: color.slate800 });
    await takeSnapshot(`Footer - does not share inverted/background styling between two independently rendered footers`);
  });
});
