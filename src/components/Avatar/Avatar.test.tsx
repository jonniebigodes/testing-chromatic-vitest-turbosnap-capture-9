import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import { Avatar } from './Avatar';
import { color, spacing } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

/**
 * A tiny (1x1) transparent PNG encoded as a data: URI. A real browser (this
 * project's "chromatic" Vitest project runs on real Playwright Chromium, not
 * jsdom) can decode this synchronously without any network round trip, which
 * keeps the "loaded" transition deterministic and fast. An external network
 * image was intentionally avoided here: it would make the "loaded" tests
 * flaky/slow depending on network conditions and CI egress, which is exactly
 * the failure mode this suite needs to avoid.
 */
const VALID_IMAGE_SRC =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';

/**
 * A malformed data: URI. The browser always fails to decode this as an
 * image, so it deterministically drives the Ark UI avatar status machine
 * into the "error" state - a reliable stand-in for a broken/404 image URL
 * that doesn't depend on any network request actually failing.
 */
const BROKEN_IMAGE_SRC = 'data:image/png;base64,not-a-real-image-payload';

/** Wraps a raw HTMLElement into a Locator so jest-dom matchers can be used. */
const locatorFor = (element: HTMLElement) => page.elementLocator(element);

/** The root is the outermost <div> rendered by ArkAvatar.Root. */
const getRoot = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement;

/** The fallback is the <span> rendered by ArkAvatar.Fallback. */
const getFallback = (container: HTMLElement) =>
  container.querySelector('span') as HTMLElement;

/** The image is the <img> rendered by ArkAvatar.Image. */
const getImage = (container: HTMLElement) =>
  container.querySelector('img') as HTMLImageElement;

describe('Avatar', () => {
  /* -----------------------------------------------------------------------
   * Initial rendering / fallback visibility with no src (4)
   * -------------------------------------------------------------------- */

  it('renders the fallback text when no src is provided', async () => {
    const screen = await render(<Avatar alt="No image" fallback="NI" />);
    await expect.element(screen.getByText('NI')).toBeInTheDocument();
    await takeSnapshot(`Avatar - renders the fallback text when no src is provided`);
  });

  it('shows the fallback element (not hidden) when no src is provided', async () => {
    const screen = await render(<Avatar alt="No image" fallback="NI" />);
    await expect.element(locatorFor(getFallback(screen.container))).toBeVisible();
    await takeSnapshot(`Avatar - shows the fallback element (not hidden) when no src is provided`);
  });

  it('keeps the image element hidden when no src is provided', async () => {
    const screen = await render(<Avatar alt="No image" fallback="NI" />);
    await vi.waitFor(() => {
      expect(getImage(screen.container).hasAttribute('hidden')).toBe(true);
    });
    await takeSnapshot(`Avatar - keeps the image element hidden when no src is provided`);
  });

  it('renders exactly one root element containing a fallback and an image node', async () => {
    const screen = await render(<Avatar alt="Structure check" fallback="SC" />);
    expect(screen.container.children.length).toBe(1);
    expect(getFallback(screen.container)).not.toBeNull();
    expect(getImage(screen.container)).not.toBeNull();
    await takeSnapshot(`Avatar - renders exactly one root element containing a fallback and an image node`);
  });

  /* -----------------------------------------------------------------------
   * Successful image load (valid src) (5)
   * -------------------------------------------------------------------- */

  it('reveals the image once a valid src finishes loading', async () => {
    const screen = await render(
      <Avatar src={VALID_IMAGE_SRC} alt="Loaded avatar" fallback="LD" />
    );
    await expect.element(locatorFor(getImage(screen.container))).toBeVisible();
    await takeSnapshot(`Avatar - reveals the image once a valid src finishes loading`);
  });

  it('hides the fallback once a valid src finishes loading', async () => {
    const screen = await render(
      <Avatar src={VALID_IMAGE_SRC} alt="Loaded avatar" fallback="LD" />
    );
    await vi.waitFor(() => {
      expect(getFallback(screen.container).hasAttribute('hidden')).toBe(true);
    });
    await takeSnapshot(`Avatar - hides the fallback once a valid src finishes loading`);
  });

  it('sets data-state="visible" on the image once loaded', async () => {
    const screen = await render(
      <Avatar src={VALID_IMAGE_SRC} alt="Loaded avatar" fallback="LD" />
    );
    await vi.waitFor(() => {
      expect(getImage(screen.container).getAttribute('data-state')).toBe(
        'visible'
      );
    });
    await takeSnapshot(`Avatar - sets data-state="visible" on the image once loaded`);
  });

  it('sets data-state="hidden" on the fallback once the image has loaded', async () => {
    const screen = await render(
      <Avatar src={VALID_IMAGE_SRC} alt="Loaded avatar" fallback="LD" />
    );
    await vi.waitFor(() => {
      expect(getFallback(screen.container).getAttribute('data-state')).toBe(
        'hidden'
      );
    });
    await takeSnapshot(`Avatar - sets data-state="hidden" on the fallback once the image has loaded`);
  });

  it('applies the src attribute to the underlying img element', async () => {
    const screen = await render(
      <Avatar src={VALID_IMAGE_SRC} alt="Loaded avatar" fallback="LD" />
    );
    await expect
      .element(locatorFor(getImage(screen.container)))
      .toHaveAttribute('src', VALID_IMAGE_SRC);
    await takeSnapshot(`Avatar - applies the src attribute to the underlying img element`);
  });

  /* -----------------------------------------------------------------------
   * Broken / failing image load (error state) (5)
   * -------------------------------------------------------------------- */

  it('keeps the fallback visible when the image src fails to decode', async () => {
    const screen = await render(
      <Avatar src={BROKEN_IMAGE_SRC} alt="Broken avatar" fallback="BR" />
    );
    await expect.element(locatorFor(getFallback(screen.container))).toBeVisible();
    await takeSnapshot(`Avatar - keeps the fallback visible when the image src fails to decode`);
  });

  it('keeps the image hidden when the image src fails to decode', async () => {
    const screen = await render(
      <Avatar src={BROKEN_IMAGE_SRC} alt="Broken avatar" fallback="BR" />
    );
    await vi.waitFor(() => {
      expect(getImage(screen.container).hasAttribute('hidden')).toBe(true);
    });
    await takeSnapshot(`Avatar - keeps the image hidden when the image src fails to decode`);
  });

  it('keeps showing the fallback text after a failed image load', async () => {
    const screen = await render(
      <Avatar src={BROKEN_IMAGE_SRC} alt="Broken avatar" fallback="BR" />
    );
    await expect.element(screen.getByText('BR')).toBeVisible();
    await takeSnapshot(`Avatar - keeps showing the fallback text after a failed image load`);
  });

  it('treats an empty string src the same as a failing image (fallback stays visible)', async () => {
    const screen = await render(
      <Avatar src="" alt="Empty src avatar" fallback="ES" />
    );
    await expect.element(locatorFor(getFallback(screen.container))).toBeVisible();
    await takeSnapshot(`Avatar - treats an empty string src the same as a failing image (fallback stays visible)`);
  });

  it('treats a non-existent path src as a failure and keeps the fallback visible', async () => {
    const screen = await render(
      <Avatar
        src="/this-image-does-not-exist-404.png"
        alt="404 avatar"
        fallback="404"
      />
    );
    await expect.element(locatorFor(getFallback(screen.container))).toBeVisible();
    await takeSnapshot(`Avatar - treats a non-existent path src as a failure and keeps the fallback visible`);
  });

  /* -----------------------------------------------------------------------
   * onStatusChange callback (6)
   * -------------------------------------------------------------------- */

  it('calls onStatusChange with status "loaded" for a valid image', async () => {
    const onStatusChange = vi.fn();
    await render(
      <Avatar
        src={VALID_IMAGE_SRC}
        alt="Loaded avatar"
        fallback="LD"
        onStatusChange={onStatusChange}
      />
    );
    await vi.waitFor(() => {
      expect(onStatusChange).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'loaded' })
      );
    });
    await takeSnapshot(`Avatar - calls onStatusChange with status "loaded" for a valid image`);
  });

  it('calls onStatusChange with status "error" for a broken image', async () => {
    const onStatusChange = vi.fn();
    await render(
      <Avatar
        src={BROKEN_IMAGE_SRC}
        alt="Broken avatar"
        fallback="BR"
        onStatusChange={onStatusChange}
      />
    );
    await vi.waitFor(() => {
      expect(onStatusChange).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'error' })
      );
    });
    await takeSnapshot(`Avatar - calls onStatusChange with status "error" for a broken image`);
  });

  it('never calls onStatusChange with status "loaded" for a broken image', async () => {
    const onStatusChange = vi.fn();
    await render(
      <Avatar
        src={BROKEN_IMAGE_SRC}
        alt="Broken avatar"
        fallback="BR"
        onStatusChange={onStatusChange}
      />
    );
    await vi.waitFor(() => {
      expect(onStatusChange).toHaveBeenCalled();
    });
    expect(onStatusChange).not.toHaveBeenCalledWith(
      expect.objectContaining({ status: 'loaded' })
    );
    await takeSnapshot(`Avatar - never calls onStatusChange with status "loaded" for a broken image`);
  });

  it('does not throw when onStatusChange is not provided', async () => {
    await expect(
      render(<Avatar src={VALID_IMAGE_SRC} alt="No handler" fallback="NH" />)
    ).resolves.not.toThrow();
    await takeSnapshot(`Avatar - does not throw when onStatusChange is not provided`);
  });

  it('eventually settles on a final status (loaded or error) for a missing src', async () => {
    const onStatusChange = vi.fn();
    await render(
      <Avatar alt="No src avatar" fallback="NS" onStatusChange={onStatusChange} />
    );
    await vi.waitFor(() => {
      expect(onStatusChange).toHaveBeenCalled();
    });
    const [details] = onStatusChange.mock.calls[0];
    expect(['loaded', 'error']).toContain(details.status);
    await takeSnapshot(`Avatar - eventually settles on a final status (loaded or error) for a missing src`);
  });

  it('re-fires onStatusChange when the src prop changes from broken to valid', async () => {
    const onStatusChange = vi.fn();
    const screen = await render(
      <Avatar
        src={BROKEN_IMAGE_SRC}
        alt="Changing avatar"
        fallback="CH"
        onStatusChange={onStatusChange}
      />
    );
    await vi.waitFor(() => {
      expect(onStatusChange).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'error' })
      );
    });
    onStatusChange.mockClear();
    await screen.rerender(
      <Avatar
        src={VALID_IMAGE_SRC}
        alt="Changing avatar"
        fallback="CH"
        onStatusChange={onStatusChange}
      />
    );
    await vi.waitFor(() => {
      expect(onStatusChange).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'loaded' })
      );
    });
    await takeSnapshot(`Avatar - re-fires onStatusChange when the src prop changes from broken to valid`);
  });

  /* -----------------------------------------------------------------------
   * Custom ids (4)
   * -------------------------------------------------------------------- */

  it('applies a custom id to the root element', async () => {
    const screen = await render(
      <Avatar alt="Custom root id" fallback="CR" ids={{ root: 'custom-root' }} />
    );
    expect(getRoot(screen.container).id).toBe('custom-root');
    await takeSnapshot(`Avatar - applies a custom id to the root element`);
  });

  it('applies a custom id to the image element', async () => {
    const screen = await render(
      <Avatar
        alt="Custom image id"
        fallback="CI"
        ids={{ image: 'custom-image' }}
      />
    );
    expect(getImage(screen.container).id).toBe('custom-image');
    await takeSnapshot(`Avatar - applies a custom id to the image element`);
  });

  it('applies a custom id to the fallback element', async () => {
    const screen = await render(
      <Avatar
        alt="Custom fallback id"
        fallback="CF"
        ids={{ fallback: 'custom-fallback' }}
      />
    );
    expect(getFallback(screen.container).id).toBe('custom-fallback');
    await takeSnapshot(`Avatar - applies a custom id to the fallback element`);
  });

  it('keeps custom ids independent across two sibling avatar instances', async () => {
    const screen = await render(
      <div>
        <Avatar alt="First" fallback="F1" ids={{ root: 'root-one' }} />
        <Avatar alt="Second" fallback="F2" ids={{ root: 'root-two' }} />
      </div>
    );
    const [firstRoot, secondRoot] = Array.from(
      screen.container.querySelectorAll('[id^="root-"]')
    ) as HTMLElement[];
    expect(firstRoot.id).toBe('root-one');
    expect(secondRoot.id).toBe('root-two');
    await takeSnapshot(`Avatar - keeps custom ids independent across two sibling avatar instances`);
  });

  /* -----------------------------------------------------------------------
   * rootProps spreading onto the root (4)
   * -------------------------------------------------------------------- */

  it('applies the default circular styling to the root when no rootProps are given', async () => {
    const screen = await render(<Avatar alt="Default styling" fallback="DS" />);
    await expect
      .element(locatorFor(getRoot(screen.container)))
      .toHaveStyle({ borderRadius: '50%', backgroundColor: color.slate500 });
    await takeSnapshot(`Avatar - applies the default circular styling to the root when no rootProps are given`);
  });

  it('merges custom rootProps.style on top of the default styles', async () => {
    const screen = await render(
      <Avatar
        alt="Custom style"
        fallback="CS"
        rootProps={{ style: { border: '3px solid rgb(79, 70, 229)' } }}
      />
    );
    await expect
      .element(locatorFor(getRoot(screen.container)))
      .toHaveStyle({
        border: '3px solid rgb(79, 70, 229)',
        borderRadius: '50%',
      });
    await takeSnapshot(`Avatar - merges custom rootProps.style on top of the default styles`);
  });

  it('allows rootProps.style to override a default style value (size)', async () => {
    const screen = await render(
      <Avatar
        alt="Overridden size"
        fallback="OS"
        rootProps={{ style: { width: '150px', height: '150px' } }}
      />
    );
    await expect
      .element(locatorFor(getRoot(screen.container)))
      .toHaveStyle({ width: '150px', height: '150px' });
    await takeSnapshot(`Avatar - allows rootProps.style to override a default style value (size)`);
  });

  it('spreads non-style rootProps (e.g. data attributes / className) onto the root element', async () => {
    const screen = await render(
      <Avatar
        alt="Extra attrs"
        fallback="EA"
        rootProps={{ className: 'custom-avatar-class', 'data-testid': 'avatar-root' } as never}
      />
    );
    const root = getRoot(screen.container);
    expect(root.className).toContain('custom-avatar-class');
    expect(root.getAttribute('data-testid')).toBe('avatar-root');
    await takeSnapshot(`Avatar - spreads non-style rootProps (e.g. data attributes / className) onto the root element`);
  });

  /* -----------------------------------------------------------------------
   * Partial custom ids (2)
   * -------------------------------------------------------------------- */

  it('leaves the image and fallback with auto-generated ids when only a root id is customized', async () => {
    const screen = await render(
      <Avatar alt="Partial ids" fallback="PI" ids={{ root: 'partial-root' }} />
    );
    expect(getRoot(screen.container).id).toBe('partial-root');
    expect(getImage(screen.container).id).not.toBe('');
    expect(getImage(screen.container).id).not.toBe('partial-root');
    await takeSnapshot(`Avatar - leaves the image and fallback with auto-generated ids when only a root id is customized`);
  });

  it('leaves the root with an auto-generated id when only the image id is customized', async () => {
    const screen = await render(
      <Avatar alt="Partial image id" fallback="PM" ids={{ image: 'partial-image' }} />
    );
    expect(getImage(screen.container).id).toBe('partial-image');
    expect(getRoot(screen.container).id).not.toBe('');
    expect(getRoot(screen.container).id).not.toBe('partial-image');
    await takeSnapshot(`Avatar - leaves the root with an auto-generated id when only the image id is customized`);
  });

  /* -----------------------------------------------------------------------
   * Default root layout (2)
   * -------------------------------------------------------------------- */

  it('applies inline-flex display and centered content alignment to the root by default', async () => {
    const screen = await render(<Avatar alt="Layout defaults" fallback="LO" />);
    await expect
      .element(locatorFor(getRoot(screen.container)))
      .toHaveStyle({
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      });
    await takeSnapshot(`Avatar - applies inline-flex display and centered content alignment to the root by default`);
  });

  it('applies overflow hidden and white text color to the root by default', async () => {
    const screen = await render(<Avatar alt="Overflow defaults" fallback="OD" />);
    await expect
      .element(locatorFor(getRoot(screen.container)))
      .toHaveStyle({ overflow: 'hidden', color: color.white });
    await takeSnapshot(`Avatar - applies overflow hidden and white text color to the root by default`);
  });

  /* -----------------------------------------------------------------------
   * Alt text / accessibility (3)
   * -------------------------------------------------------------------- */

  it('sets the provided alt text on the image element', async () => {
    const screen = await render(
      <Avatar src={VALID_IMAGE_SRC} alt="Jane Doe profile photo" fallback="JD" />
    );
    await expect
      .element(locatorFor(getImage(screen.container)))
      .toHaveAttribute('alt', 'Jane Doe profile photo');
    await takeSnapshot(`Avatar - sets the provided alt text on the image element`);
  });

  it('is queryable by its accessible alt text even while hidden (before/without load)', async () => {
    const screen = await render(<Avatar alt="Findable by alt" fallback="FA" />);
    const image = getImage(screen.container);
    expect(image.getAttribute('alt')).toBe('Findable by alt');
    await takeSnapshot(`Avatar - is queryable by its accessible alt text even while hidden (before/without load)`);
  });

  it('preserves unicode/emoji alt text exactly', async () => {
    const screen = await render(
      <Avatar
        src={VALID_IMAGE_SRC}
        alt="Célèbre utilisateur 🎉"
        fallback="CU"
      />
    );
    await expect
      .element(locatorFor(getImage(screen.container)))
      .toHaveAttribute('alt', 'Célèbre utilisateur 🎉');
    await takeSnapshot(`Avatar - preserves unicode/emoji alt text exactly`);
  });

  /* -----------------------------------------------------------------------
   * Fallback text content variations (4)
   * -------------------------------------------------------------------- */

  it('renders single-letter fallback content', async () => {
    const screen = await render(<Avatar alt="Single letter" fallback="A" />);
    await expect.element(screen.getByText('A')).toBeInTheDocument();
    await takeSnapshot(`Avatar - renders single-letter fallback content`);
  });

  it('renders multi-letter initials fallback content', async () => {
    const screen = await render(<Avatar alt="Three letters" fallback="BAB" />);
    await expect.element(screen.getByText('BAB')).toBeInTheDocument();
    await takeSnapshot(`Avatar - renders multi-letter initials fallback content`);
  });

  it('renders emoji fallback content exactly', async () => {
    const screen = await render(<Avatar alt="Emoji fallback" fallback="🦊" />);
    await expect.element(screen.getByText('🦊')).toBeInTheDocument();
    await takeSnapshot(`Avatar - renders emoji fallback content exactly`);
  });

  it('renders long fallback text content without throwing', async () => {
    const screen = await render(
      <Avatar alt="Long fallback" fallback="TOOLONG" />
    );
    await expect.element(screen.getByText('TOOLONG')).toBeInTheDocument();
    await takeSnapshot(`Avatar - renders long fallback text content without throwing`);
  });

  /* -----------------------------------------------------------------------
   * Multiple / group avatar independence (3)
   * -------------------------------------------------------------------- */

  it('renders independent fallback text for each avatar in a group', async () => {
    const screen = await render(
      <div>
        <Avatar alt="Member 1" fallback="M1" />
        <Avatar alt="Member 2" fallback="M2" />
        <Avatar alt="Member 3" fallback="M3" />
      </div>
    );
    await expect.element(screen.getByText('M1')).toBeInTheDocument();
    await expect.element(screen.getByText('M2')).toBeInTheDocument();
    await expect.element(screen.getByText('M3')).toBeInTheDocument();
    await takeSnapshot(`Avatar - renders independent fallback text for each avatar in a group`);
  });

  it('lets one avatar in a group load successfully while a sibling fails', async () => {
    const screen = await render(
      <div>
        <Avatar src={VALID_IMAGE_SRC} alt="Loaded member" fallback="LD" />
        <Avatar src={BROKEN_IMAGE_SRC} alt="Broken member" fallback="BR" />
      </div>
    );
    const [loadedImg, brokenImg] = Array.from(
      screen.container.querySelectorAll('img')
    ) as HTMLImageElement[];
    await vi.waitFor(() => {
      expect(loadedImg.hasAttribute('hidden')).toBe(false);
      expect(brokenImg.hasAttribute('hidden')).toBe(true);
    });
    await takeSnapshot(`Avatar - lets one avatar in a group load successfully while a sibling fails`);
  });

  it('invokes each avatar instance onStatusChange independently', async () => {
    const onFirstStatusChange = vi.fn();
    const onSecondStatusChange = vi.fn();
    await render(
      <div>
        <Avatar
          src={VALID_IMAGE_SRC}
          alt="First"
          fallback="F1"
          onStatusChange={onFirstStatusChange}
        />
        <Avatar
          src={BROKEN_IMAGE_SRC}
          alt="Second"
          fallback="F2"
          onStatusChange={onSecondStatusChange}
        />
      </div>
    );
    await vi.waitFor(() => {
      expect(onFirstStatusChange).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'loaded' })
      );
      expect(onSecondStatusChange).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'error' })
      );
    });
    await takeSnapshot(`Avatar - invokes each avatar instance onStatusChange independently`);
  });

  /* -----------------------------------------------------------------------
   * Edge cases (4)
   * -------------------------------------------------------------------- */

  it('does not throw when rendered with only the required props', async () => {
    await expect(
      render(<Avatar alt="Minimal props" fallback="MP" />)
    ).resolves.not.toThrow();
    await takeSnapshot(`Avatar - does not throw when rendered with only the required props`);
  });

  it('transitions from error back to loaded when src changes from broken to valid', async () => {
    const screen = await render(
      <Avatar src={BROKEN_IMAGE_SRC} alt="Recovering avatar" fallback="RC" />
    );
    await vi.waitFor(() => {
      expect(getFallback(screen.container).hasAttribute('hidden')).toBe(false);
    });
    await screen.rerender(
      <Avatar src={VALID_IMAGE_SRC} alt="Recovering avatar" fallback="RC" />
    );
    await expect.element(locatorFor(getImage(screen.container))).toBeVisible();
    await takeSnapshot(`Avatar - transitions from error back to loaded when src changes from broken to valid`);
  });

  it('keeps the root element as a single direct child of the render container', async () => {
    const screen = await render(<Avatar alt="Single root" fallback="SR" />);
    expect(screen.container.childElementCount).toBe(1);
    await takeSnapshot(`Avatar - keeps the root element as a single direct child of the render container`);
  });

  it('applies the default fixed width/height token to the root element', async () => {
    const screen = await render(<Avatar alt="Default size" fallback="DS" />);
    await expect
      .element(locatorFor(getRoot(screen.container)))
      .toHaveStyle({ width: spacing[12], height: spacing[12] });
    await takeSnapshot(`Avatar - applies the default fixed width/height token to the root element`);
  });

  /* -----------------------------------------------------------------------
   * Kitchen-sink combinations (4)
   * -------------------------------------------------------------------- */

  it('handles a valid image with custom ids, custom styling, and a status callback together', async () => {
    const onStatusChange = vi.fn();
    const screen = await render(
      <Avatar
        src={VALID_IMAGE_SRC}
        alt="Kitchen sink loaded"
        fallback="KS"
        ids={{ root: 'ks-root', image: 'ks-image', fallback: 'ks-fallback' }}
        rootProps={{ style: { width: '90px', height: '90px' } }}
        onStatusChange={onStatusChange}
      />
    );
    expect(getRoot(screen.container).id).toBe('ks-root');
    expect(getImage(screen.container).id).toBe('ks-image');
    expect(getFallback(screen.container).id).toBe('ks-fallback');
    await expect
      .element(locatorFor(getRoot(screen.container)))
      .toHaveStyle({ width: '90px', height: '90px' });
    await vi.waitFor(() => {
      expect(onStatusChange).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'loaded' })
      );
    });
    await takeSnapshot(`Avatar - handles a valid image with custom ids, custom styling, and a status callback together`);
  });

  it('handles a broken image with custom ids and custom fallback styling together', async () => {
    const onStatusChange = vi.fn();
    const screen = await render(
      <Avatar
        src={BROKEN_IMAGE_SRC}
        alt="Kitchen sink broken"
        fallback="!!"
        ids={{ root: 'ks-broken-root' }}
        rootProps={{ style: { backgroundColor: 'rgb(232, 28, 97)' } }}
        onStatusChange={onStatusChange}
      />
    );
    expect(getRoot(screen.container).id).toBe('ks-broken-root');
    await expect
      .element(locatorFor(getRoot(screen.container)))
      .toHaveStyle({ backgroundColor: 'rgb(232, 28, 97)' });
    await vi.waitFor(() => {
      expect(onStatusChange).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'error' })
      );
    });
    await expect.element(locatorFor(getFallback(screen.container))).toBeVisible();
    await takeSnapshot(`Avatar - handles a broken image with custom ids and custom fallback styling together`);
  });

  it('renders a mixed group (loaded, broken, no-src) with independently correct visibility', async () => {
    const screen = await render(
      <div>
        <Avatar src={VALID_IMAGE_SRC} alt="Loaded" fallback="LD" />
        <Avatar src={BROKEN_IMAGE_SRC} alt="Broken" fallback="BR" />
        <Avatar alt="No src" fallback="NS" />
      </div>
    );
    const images = Array.from(
      screen.container.querySelectorAll('img')
    ) as HTMLImageElement[];
    const fallbacks = Array.from(
      screen.container.querySelectorAll('span')
    ) as HTMLElement[];
    await vi.waitFor(() => {
      expect(images[0].hasAttribute('hidden')).toBe(false);
      expect(images[1].hasAttribute('hidden')).toBe(true);
      expect(images[2].hasAttribute('hidden')).toBe(true);
      expect(fallbacks[0].hasAttribute('hidden')).toBe(true);
      expect(fallbacks[1].hasAttribute('hidden')).toBe(false);
      expect(fallbacks[2].hasAttribute('hidden')).toBe(false);
    });
    await takeSnapshot(`Avatar - renders a mixed group (loaded, broken, no-src) with independently correct visibility`);
  });

  it('combines every prop at once: image, alt, fallback, ids, rootProps, and onStatusChange', async () => {
    const onStatusChange = vi.fn();
    const screen = await render(
      <Avatar
        src={VALID_IMAGE_SRC}
        alt="Every prop combined for Priya Natarajan"
        fallback="PN"
        ids={{
          root: 'all-props-root',
          image: 'all-props-image',
          fallback: 'all-props-fallback',
        }}
        rootProps={{
          style: {
            width: '64px',
            height: '64px',
            border: '2px solid rgb(72, 149, 36)',
          },
        }}
        onStatusChange={onStatusChange}
      />
    );
    await expect
      .element(locatorFor(getImage(screen.container)))
      .toHaveAttribute('alt', 'Every prop combined for Priya Natarajan');
    expect(getRoot(screen.container).id).toBe('all-props-root');
    expect(getImage(screen.container).id).toBe('all-props-image');
    expect(getFallback(screen.container).id).toBe('all-props-fallback');
    await expect
      .element(locatorFor(getRoot(screen.container)))
      .toHaveStyle({ width: '64px', height: '64px' });
    await vi.waitFor(() => {
      expect(onStatusChange).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'loaded' })
      );
    });
    await takeSnapshot(`Avatar - combines every prop at once: image, alt, fallback, ids, rootProps, and onStatusChange`);
  });
});
