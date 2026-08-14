import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import Video from './Video';
import { color } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

// Local data: URIs instead of remote fetches to avoid real-network flakiness in browser-mode tests.
// Tests only assert attributes/props here, never real decode/playback, so tiny placeholders are sufficient.
const SAMPLE_SRC =
  "data:video/mp4;base64,AAAAHGZ0eXBpc29tAAACAGlzb21pc28yYXZjMQAAAAhmcmVl";
const OTHER_SRC =
  "data:video/mp4;base64,AAAAHGZ0eXBpc29tAAACAGlzb21pc28yYXZjMgAAAAhmcmVl";
const SAMPLE_POSTER =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";

const locatorFor = (element: HTMLElement) => page.elementLocator(element);

const getVideo = (container: HTMLElement) =>
  container.querySelector('video') as HTMLVideoElement;

describe('Video', () => {
  it('renders a video element', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} />);
    expect(getVideo(screen.container)).not.toBeNull();
    await takeSnapshot(`Video - renders a video element`);
  });

  it('sets the src attribute from the src prop', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} />);
    expect(getVideo(screen.container).getAttribute('src')).toBe(SAMPLE_SRC);
    await takeSnapshot(`Video - sets the src attribute from the src prop`);
  });

  it('sets the poster attribute when provided', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} poster={SAMPLE_POSTER} />);
    expect(getVideo(screen.container).getAttribute('poster')).toBe(SAMPLE_POSTER);
    await takeSnapshot(`Video - sets the poster attribute when provided`);
  });

  it('does not set poster when omitted', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} />);
    expect(getVideo(screen.container).hasAttribute('poster')).toBe(false);
    await takeSnapshot(`Video - does not set poster when omitted`);
  });

  it('enables controls by default', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} />);
    expect(getVideo(screen.container).controls).toBe(true);
    await takeSnapshot(`Video - enables controls by default`);
  });

  it('disables controls when controls is false', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} controls={false} />);
    expect(getVideo(screen.container).controls).toBe(false);
    await takeSnapshot(`Video - disables controls when controls is false`);
  });

  it('does not autoplay by default', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} />);
    expect(getVideo(screen.container).autoplay).toBe(false);
    await takeSnapshot(`Video - does not autoplay by default`);
  });

  it('enables autoplay when autoPlay is true', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} autoPlay muted />);
    expect(getVideo(screen.container).autoplay).toBe(true);
    await takeSnapshot(`Video - enables autoplay when autoPlay is true`);
  });

  it('is not muted by default', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} />);
    expect(getVideo(screen.container).muted).toBe(false);
    await takeSnapshot(`Video - is not muted by default`);
  });

  it('mutes the video when muted is true', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} muted />);
    expect(getVideo(screen.container).muted).toBe(true);
    await takeSnapshot(`Video - mutes the video when muted is true`);
  });

  it('does not loop by default', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} />);
    expect(getVideo(screen.container).loop).toBe(false);
    await takeSnapshot(`Video - does not loop by default`);
  });

  it('loops when loop is true', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} loop />);
    expect(getVideo(screen.container).loop).toBe(true);
    await takeSnapshot(`Video - loops when loop is true`);
  });

  it('defaults width to 480px', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} />);
    await expect.element(locatorFor(getVideo(screen.container))).toHaveStyle({ width: '480px' });
    await takeSnapshot(`Video - defaults width to 480px`);
  });

  it('defaults height to 270px', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} />);
    await expect.element(locatorFor(getVideo(screen.container))).toHaveStyle({ height: '270px' });
    await takeSnapshot(`Video - defaults height to 270px`);
  });

  it('applies numeric width and height', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} width={640} height={360} />);
    const v = getVideo(screen.container);
    await expect.element(locatorFor(v)).toHaveStyle({ width: '640px', height: '360px' });
    await takeSnapshot(`Video - applies numeric width and height`);
  });

  it('applies string width as-is', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} width="100%" height={200} />);
    expect(getVideo(screen.container).style.width).toBe('100%');
    await takeSnapshot(`Video - applies string width as-is`);
  });

  it('applies string height as-is', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} height="225px" />);
    expect(getVideo(screen.container).style.height).toBe('225px');
    await takeSnapshot(`Video - applies string height as-is`);
  });

  it('has no border-radius by default', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} />);
    expect(getVideo(screen.container).style.borderRadius).toBe('0px');
    await takeSnapshot(`Video - has no border-radius by default`);
  });

  it('applies rounded corners when rounded is true', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} rounded />);
    expect(getVideo(screen.container).style.borderRadius).toBe('0.75rem');
    await takeSnapshot(`Video - applies rounded corners when rounded is true`);
  });

  it('uses block display', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} />);
    await expect.element(locatorFor(getVideo(screen.container))).toHaveStyle({ display: 'block' });
    await takeSnapshot(`Video - uses block display`);
  });

  it('uses object-fit cover', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} />);
    await expect.element(locatorFor(getVideo(screen.container))).toHaveStyle({ objectFit: 'cover' });
    await takeSnapshot(`Video - uses object-fit cover`);
  });

  it('uses slate900 background color', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} />);
    await expect.element(locatorFor(getVideo(screen.container))).toHaveStyle({ backgroundColor: color.slate900 });
    await takeSnapshot(`Video - uses slate900 background color`);
  });

  it('sets playsInline on the video element', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} />);
    expect(getVideo(screen.container).hasAttribute('playsinline') || getVideo(screen.container).playsInline).toBe(true);
    await takeSnapshot(`Video - sets playsInline on the video element`);
  });

  it('allows empty src with poster placeholder', async () => {
    const screen = await render(<Video src="" poster={SAMPLE_POSTER} />);
    const v = getVideo(screen.container);
    expect(v.getAttribute('poster')).toBe(SAMPLE_POSTER);
    await takeSnapshot(`Video - allows empty src with poster placeholder`);
  });

  it('omits src attribute when src is empty', async () => {
    const screen = await render(<Video src="" />);
    expect(getVideo(screen.container).getAttribute('src')).toBeNull();
    await takeSnapshot(`Video - omits src attribute when src is empty`);
  });

  it('kitchen-sink: all flags combination', async () => {
    const screen = await render(
      <Video
        src={SAMPLE_SRC}
        poster={SAMPLE_POSTER}
        controls
        muted
        loop
        rounded
        width={480}
        height={270}
      />
    );
    const v = getVideo(screen.container);
    expect(v.controls).toBe(true);
    expect(v.muted).toBe(true);
    expect(v.loop).toBe(true);
    expect(v.style.borderRadius).toBe('0.75rem');
    await takeSnapshot(`Video - kitchen-sink: all flags combination`);
  });

  it('kitchen-sink: autoplay muted loop rounded', async () => {
    const screen = await render(
      <Video src={SAMPLE_SRC} autoPlay muted loop rounded width={400} height={225} />
    );
    const v = getVideo(screen.container);
    expect(v.autoplay).toBe(true);
    expect(v.muted).toBe(true);
    expect(v.loop).toBe(true);
    await takeSnapshot(`Video - kitchen-sink: autoplay muted loop rounded`);
  });

  it('updates src when re-rendered', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} />);
    await screen.rerender(<Video src={OTHER_SRC} />);
    expect(getVideo(screen.container).getAttribute('src')).toBe(OTHER_SRC);
    await takeSnapshot(`Video - updates src when re-rendered`);
  });

  it('updates rounded when re-rendered', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} rounded={false} />);
    expect(getVideo(screen.container).style.borderRadius).toBe('0px');
    await screen.rerender(<Video src={SAMPLE_SRC} rounded />);
    expect(getVideo(screen.container).style.borderRadius).toBe('0.75rem');
    await takeSnapshot(`Video - updates rounded when re-rendered`);
  });

  it('updates muted when re-rendered', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} muted={false} />);
    expect(getVideo(screen.container).muted).toBe(false);
    await screen.rerender(<Video src={SAMPLE_SRC} muted />);
    expect(getVideo(screen.container).muted).toBe(true);
    await takeSnapshot(`Video - updates muted when re-rendered`);
  });

  it('updates controls when re-rendered', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} controls />);
    expect(getVideo(screen.container).controls).toBe(true);
    await screen.rerender(<Video src={SAMPLE_SRC} controls={false} />);
    expect(getVideo(screen.container).controls).toBe(false);
    await takeSnapshot(`Video - updates controls when re-rendered`);
  });

  it('updates dimensions when re-rendered', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} width={200} height={100} />);
    let v = getVideo(screen.container);
    await expect.element(locatorFor(v)).toHaveStyle({ width: '200px', height: '100px' });
    await screen.rerender(<Video src={SAMPLE_SRC} width={400} height={200} />);
    v = getVideo(screen.container);
    await expect.element(locatorFor(v)).toHaveStyle({ width: '400px', height: '200px' });
    await takeSnapshot(`Video - updates dimensions when re-rendered`);
  });

  it('renders multiple independent video elements', async () => {
    const screen = await render(
      <div>
        <Video src={SAMPLE_SRC} width={200} height={112} />
        <Video src={SAMPLE_SRC} width={200} height={112} muted />
      </div>
    );
    expect(screen.container.querySelectorAll('video').length).toBe(2);
    await takeSnapshot(`Video - renders multiple independent video elements`);
  });

  it('narrow dimensions apply correctly', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} width={240} height={135} />);
    await expect.element(locatorFor(getVideo(screen.container))).toHaveStyle({ width: '240px', height: '135px' });
    await takeSnapshot(`Video - narrow dimensions apply correctly`);
  });

  it('square dimensions apply correctly', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} width={320} height={320} />);
    await expect.element(locatorFor(getVideo(screen.container))).toHaveStyle({ width: '320px', height: '320px' });
    await takeSnapshot(`Video - square dimensions apply correctly`);
  });

  it('tall portrait dimensions apply correctly', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} width={270} height={480} />);
    await expect.element(locatorFor(getVideo(screen.container))).toHaveStyle({ width: '270px', height: '480px' });
    await takeSnapshot(`Video - tall portrait dimensions apply correctly`);
  });

  it('max-width is 100 percent', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} />);
    expect(getVideo(screen.container).style.maxWidth).toBe('100%');
    await takeSnapshot(`Video - max-width is 100 percent`);
  });

  it('outline is none', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} />);
    expect(getVideo(screen.container).style.outline).toBe('none');
    await takeSnapshot(`Video - outline is none`);
  });

  it('loop with muted and no controls', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} loop muted controls={false} />);
    const v = getVideo(screen.container);
    expect(v.loop).toBe(true);
    expect(v.muted).toBe(true);
    expect(v.controls).toBe(false);
    await takeSnapshot(`Video - loop with muted and no controls`);
  });

  it('rounded with poster combination', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} poster={SAMPLE_POSTER} rounded />);
    const v = getVideo(screen.container);
    expect(v.getAttribute('poster')).toBe(SAMPLE_POSTER);
    expect(v.style.borderRadius).toBe('0.75rem');
    await takeSnapshot(`Video - rounded with poster combination`);
  });

  it('compact player dimensions', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} width={160} height={90} />);
    await expect.element(locatorFor(getVideo(screen.container))).toHaveStyle({ width: '160px', height: '90px' });
    await takeSnapshot(`Video - compact player dimensions`);
  });

  it('cinema wide dimensions', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} width={800} height={300} />);
    await expect.element(locatorFor(getVideo(screen.container))).toHaveStyle({ width: '800px', height: '300px' });
    await takeSnapshot(`Video - cinema wide dimensions`);
  });

  it('both string dimensions apply', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} width="50%" height="200px" />);
    const v = getVideo(screen.container);
    expect(v.style.width).toBe('50%');
    expect(v.style.height).toBe('200px');
    await takeSnapshot(`Video - both string dimensions apply`);
  });

  it('minimal attrs leaves defaults for falsy flags', async () => {
    const screen = await render(
      <Video src={SAMPLE_SRC} controls={false} autoPlay={false} muted={false} loop={false} rounded={false} />
    );
    const v = getVideo(screen.container);
    expect(v.controls).toBe(false);
    expect(v.autoplay).toBe(false);
    expect(v.muted).toBe(false);
    expect(v.loop).toBe(false);
    expect(v.style.borderRadius).toBe('0px');
    await takeSnapshot(`Video - minimal attrs leaves defaults for falsy flags`);
  });

  it('max flags on enables autoplay muted loop rounded controls', async () => {
    const screen = await render(
      <Video src={SAMPLE_SRC} controls autoPlay muted loop rounded />
    );
    const v = getVideo(screen.container);
    expect(v.controls).toBe(true);
    expect(v.autoplay).toBe(true);
    expect(v.muted).toBe(true);
    expect(v.loop).toBe(true);
    expect(v.style.borderRadius).toBe('0.75rem');
    await takeSnapshot(`Video - max flags on enables autoplay muted loop rounded controls`);
  });

  it('tiny thumb dimensions with rounded', async () => {
    const screen = await render(
      <Video src={SAMPLE_SRC} width={120} height={68} controls={false} muted rounded />
    );
    const v = getVideo(screen.container);
    await expect.element(locatorFor(v)).toHaveStyle({ width: '120px', height: '68px' });
    expect(v.style.borderRadius).toBe('0.75rem');
    await takeSnapshot(`Video - tiny thumb dimensions with rounded`);
  });

  it('renders without throwing with only required src', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} />);
    expect(getVideo(screen.container)).not.toBeNull();
    await takeSnapshot(`Video - renders without throwing with only required src`);
  });

  it('tag name is video', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} />);
    expect(getVideo(screen.container).tagName.toLowerCase()).toBe('video');
    await takeSnapshot(`Video - tag name is video`);
  });

  it('wide 640x360 player renders', async () => {
    const screen = await render(<Video src={SAMPLE_SRC} width={640} height={360} />);
    expect(getVideo(screen.container)).not.toBeNull();
    await takeSnapshot(`Video - wide 640x360 player renders`);
  });

  it('poster only empty src still renders video element', async () => {
    const screen = await render(<Video src="" poster={SAMPLE_POSTER} width={480} height={270} />);
    expect(getVideo(screen.container).tagName.toLowerCase()).toBe('video');
    await takeSnapshot(`Video - poster only empty src still renders video element`);
  });
});
