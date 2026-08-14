import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent, page } from 'vitest/browser';
import Form from './Form';
import Input from './Input';
import Label from './Label';
import Checkbox from './Checkbox';
import { color, spacing } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

/** Wraps a raw HTMLElement into a Locator so jest-dom matchers can be used. */
const locatorFor = (element: HTMLElement) => page.elementLocator(element);

describe('Form', () => {
  /* -----------------------------------------------------------------------
   * Default vs inverted background/border styling (3)
   * -------------------------------------------------------------------- */

  it('defaults to a white background and slate200 border when inverted is omitted', async () => {
    const screen = await render(<Form>Content</Form>);
    const root = screen.container.firstElementChild as HTMLElement;
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ backgroundColor: color.white, borderColor: color.slate200 });
    await takeSnapshot(`Form - defaults to a white background and slate200 border when inverted is omitted`);
  });

  it('renders a white background and slate200 border when inverted is explicitly false', async () => {
    const screen = await render(<Form inverted={false}>Content</Form>);
    const root = screen.container.firstElementChild as HTMLElement;
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ backgroundColor: color.white, borderColor: color.slate200 });
    await takeSnapshot(`Form - renders a white background and slate200 border when inverted is explicitly false`);
  });

  it('renders a slate800 background and slate700 border when inverted is true', async () => {
    const screen = await render(<Form inverted>Content</Form>);
    const root = screen.container.firstElementChild as HTMLElement;
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ backgroundColor: color.slate800, borderColor: color.slate700 });
    await takeSnapshot(`Form - renders a slate800 background and slate700 border when inverted is true`);
  });

  /* -----------------------------------------------------------------------
   * Gap: numeric vs string values (6)
   * -------------------------------------------------------------------- */

  it('applies a string gap value as-is to the inline style', async () => {
    const screen = await render(<Form gap="10px">Content</Form>);
    const root = screen.container.firstElementChild as HTMLElement;
    await expect.element(locatorFor(root)).toHaveStyle({ gap: '10px' });
    await takeSnapshot(`Form - applies a string gap value as-is to the inline style`);
  });

  it("appends 'px' to a numeric gap value", async () => {
    const screen = await render(<Form gap={24}>Content</Form>);
    const root = screen.container.firstElementChild as HTMLElement;
    await expect.element(locatorFor(root)).toHaveStyle({ gap: '24px' });
    await takeSnapshot(`Form - appends 'px' to a numeric gap value`);
  });

  it("applies a numeric gap of 0 as '0px'", async () => {
    const screen = await render(<Form gap={0}>Content</Form>);
    const root = screen.container.firstElementChild as HTMLElement;
    expect(root.style.gap).toBe('0px');
    await takeSnapshot(`Form - applies a numeric gap of 0 as '0px'`);
  });

  it('applies a large numeric gap value correctly', async () => {
    const screen = await render(<Form gap={64}>Content</Form>);
    const root = screen.container.firstElementChild as HTMLElement;
    await expect.element(locatorFor(root)).toHaveStyle({ gap: '64px' });
    await takeSnapshot(`Form - applies a large numeric gap value correctly`);
  });

  it('applies a non-px string unit (rem) as-is without modification', async () => {
    const screen = await render(<Form gap="2rem">Content</Form>);
    const root = screen.container.firstElementChild as HTMLElement;
    await expect.element(locatorFor(root)).toHaveStyle({ gap: '2rem' });
    await takeSnapshot(`Form - applies a non-px string unit (rem) as-is without modification`);
  });

  it('defaults gap to spacing[4] when the gap prop is omitted', async () => {
    const screen = await render(<Form>Content</Form>);
    const root = screen.container.firstElementChild as HTMLElement;
    await expect.element(locatorFor(root)).toHaveStyle({ gap: spacing[4] });
    await takeSnapshot(`Form - defaults gap to spacing[4] when the gap prop is omitted`);
  });

  /* -----------------------------------------------------------------------
   * Layout style assertions: padding / border-radius / minWidth (3)
   * -------------------------------------------------------------------- */

  it('applies spacing[6] padding regardless of inverted state', async () => {
    const screen = await render(<Form inverted>Content</Form>);
    const root = screen.container.firstElementChild as HTMLElement;
    await expect.element(locatorFor(root)).toHaveStyle({ padding: spacing[6] });
    await takeSnapshot(`Form - applies spacing[6] padding regardless of inverted state`);
  });

  it('applies spacing[2] border-radius regardless of the gap value', async () => {
    const screen = await render(<Form gap={40}>Content</Form>);
    const root = screen.container.firstElementChild as HTMLElement;
    await expect.element(locatorFor(root)).toHaveStyle({ borderRadius: spacing[2] });
    await takeSnapshot(`Form - applies spacing[2] border-radius regardless of the gap value`);
  });

  it('applies a 300px minWidth by default', async () => {
    const screen = await render(<Form>Content</Form>);
    const root = screen.container.firstElementChild as HTMLElement;
    await expect.element(locatorFor(root)).toHaveStyle({ minWidth: '300px' });
    await takeSnapshot(`Form - applies a 300px minWidth by default`);
  });

  /* -----------------------------------------------------------------------
   * Base flex layout (2)
   * -------------------------------------------------------------------- */

  it('renders as a flex column', async () => {
    const screen = await render(<Form>Content</Form>);
    const root = screen.container.firstElementChild as HTMLElement;
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ display: 'flex', flexDirection: 'column' });
    await takeSnapshot(`Form - renders as a flex column`);
  });

  it('keeps display flex and flexDirection column when inverted is true', async () => {
    const screen = await render(<Form inverted>Content</Form>);
    const root = screen.container.firstElementChild as HTMLElement;
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ display: 'flex', flexDirection: 'column' });
    await takeSnapshot(`Form - keeps display flex and flexDirection column when inverted is true`);
  });

  /* -----------------------------------------------------------------------
   * Rendering arbitrary children (3)
   * -------------------------------------------------------------------- */

  it('renders plain text children', async () => {
    const screen = await render(<Form>Just some text</Form>);
    await expect.element(screen.getByText('Just some text')).toBeInTheDocument();
    await takeSnapshot(`Form - renders plain text children`);
  });

  it('renders multiple sibling element children', async () => {
    const screen = await render(
      <Form>
        <div>First child</div>
        <div>Second child</div>
        <div>Third child</div>
      </Form>
    );
    await expect.element(screen.getByText('First child')).toBeInTheDocument();
    await expect.element(screen.getByText('Second child')).toBeInTheDocument();
    await expect.element(screen.getByText('Third child')).toBeInTheDocument();
    await takeSnapshot(`Form - renders multiple sibling element children`);
  });

  it('renders deeply nested children structures', async () => {
    const screen = await render(
      <Form>
        <div>
          <section>
            <span>Deeply nested content</span>
          </section>
        </div>
      </Form>
    );
    await expect
      .element(screen.getByText('Deeply nested content'))
      .toBeInTheDocument();
    await takeSnapshot(`Form - renders deeply nested children structures`);
  });

  /* -----------------------------------------------------------------------
   * Native attribute passthrough via rest props (7)
   * -------------------------------------------------------------------- */

  it('passes an id attribute through to the underlying form element', async () => {
    const screen = await render(<Form id="checkout-form">Content</Form>);
    const root = screen.container.firstElementChild as HTMLElement;
    await expect.element(locatorFor(root)).toHaveAttribute('id', 'checkout-form');
    await takeSnapshot(`Form - passes an id attribute through to the underlying form element`);
  });

  it('passes a name attribute through to the underlying form element', async () => {
    const screen = await render(<Form name="checkout">Content</Form>);
    const root = screen.container.firstElementChild as HTMLElement;
    await expect.element(locatorFor(root)).toHaveAttribute('name', 'checkout');
    await takeSnapshot(`Form - passes a name attribute through to the underlying form element`);
  });

  it('leaves noValidate unset (native default) when the prop is omitted', async () => {
    const screen = await render(<Form>Content</Form>);
    const root = screen.container.firstElementChild as HTMLFormElement;
    expect(root.noValidate).toBe(false);
    await takeSnapshot(`Form - leaves noValidate unset (native default) when the prop is omitted`);
  });

  it('passes noValidate through to the underlying form element when true', async () => {
    const screen = await render(<Form noValidate>Content</Form>);
    const root = screen.container.firstElementChild as HTMLFormElement;
    expect(root.noValidate).toBe(true);
    await takeSnapshot(`Form - passes noValidate through to the underlying form element when true`);
  });

  it('passes autoComplete="on" through to the underlying form element', async () => {
    const screen = await render(<Form autoComplete="on">Content</Form>);
    const root = screen.container.firstElementChild as HTMLElement;
    await expect.element(locatorFor(root)).toHaveAttribute('autocomplete', 'on');
    await takeSnapshot(`Form - passes autoComplete="on" through to the underlying form element`);
  });

  it('passes autoComplete="off" through to the underlying form element', async () => {
    const screen = await render(<Form autoComplete="off">Content</Form>);
    const root = screen.container.firstElementChild as HTMLElement;
    await expect.element(locatorFor(root)).toHaveAttribute('autocomplete', 'off');
    await takeSnapshot(`Form - passes autoComplete="off" through to the underlying form element`);
  });

  it('passes arbitrary data-* attributes through via rest props', async () => {
    const screen = await render(<Form data-testid="my-form">Content</Form>);
    const root = screen.container.firstElementChild as HTMLElement;
    await expect.element(locatorFor(root)).toHaveAttribute('data-testid', 'my-form');
    await takeSnapshot(`Form - passes arbitrary data-* attributes through via rest props`);
  });

  /* -----------------------------------------------------------------------
   * onSubmit passthrough (3)
   * -------------------------------------------------------------------- */

  it('fires the onSubmit handler exactly once when the submit button is clicked', async () => {
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
    const screen = await render(
      <Form onSubmit={onSubmit}>
        <button type="submit">Submit</button>
      </Form>
    );
    const submit = screen.getByRole('button', { name: 'Submit' });
    await userEvent.click(submit);
    await vi.waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    await takeSnapshot(`Form - fires the onSubmit handler exactly once when the submit button is clicked`);
  });

  it('does not fire onSubmit when clicking a plain, non-submit button', async () => {
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
    const screen = await render(
      <Form onSubmit={onSubmit}>
        <button type="button">Not a submit</button>
      </Form>
    );
    const button = screen.getByRole('button', { name: 'Not a submit' });
    await userEvent.click(button);
    await vi.waitFor(() => expect(onSubmit).not.toHaveBeenCalled());
    await takeSnapshot(`Form - does not fire onSubmit when clicking a plain, non-submit button`);
  });

  it('receives the native submit event and can call preventDefault without throwing', async () => {
    const onSubmit = vi.fn((e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    });
    const screen = await render(
      <Form onSubmit={onSubmit}>
        <button type="submit">Go</button>
      </Form>
    );
    const submit = screen.getByRole('button', { name: 'Go' });
    await userEvent.click(submit);
    await vi.waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    const event = onSubmit.mock.calls[0][0];
    await vi.waitFor(() => expect(typeof event.preventDefault).toBe('function'));
    await takeSnapshot(`Form - receives the native submit event and can call preventDefault without throwing`);
  });

  /* -----------------------------------------------------------------------
   * Nesting sibling Form-directory components (4)
   * -------------------------------------------------------------------- */

  it('renders a nested Input and Label as children', async () => {
    const screen = await render(
      <Form>
        <Label htmlFor="nested-name">Name</Label>
        <Input id="nested-name" placeholder="Name" />
      </Form>
    );
    await expect.element(screen.getByLabelText('Name')).toBeInTheDocument();
    await takeSnapshot(`Form - renders a nested Input and Label as children`);
  });

  it('renders a nested Checkbox and reflects its checked state on click', async () => {
    const onCheckedChange = vi.fn();
    const screen = await render(
      <Form>
        <Checkbox onCheckedChange={onCheckedChange}>Accept terms</Checkbox>
      </Form>
    );
    const label = screen.getByText('Accept terms');
    await userEvent.click(label);
    await vi.waitFor(() => expect(onCheckedChange).toHaveBeenCalledWith({ checked: true }));
    await takeSnapshot(`Form - renders a nested Checkbox and reflects its checked state on click`);
  });

  it('allows typing into a nested Input rendered as a Form child', async () => {
    const screen = await render(
      <Form>
        <Label htmlFor="typed-field">Email</Label>
        <Input id="typed-field" type="email" />
      </Form>
    );
    const input = screen.getByLabelText('Email') as ReturnType<typeof screen.getByLabelText>;
    await userEvent.type(input, 'person@example.com');
    await expect.element(input).toHaveValue('person@example.com');
    await takeSnapshot(`Form - allows typing into a nested Input rendered as a Form child`);
  });

  it('renders multiple nested Input/Label pairs together', async () => {
    const screen = await render(
      <Form>
        <Label htmlFor="multi-first">First Name</Label>
        <Input id="multi-first" />
        <Label htmlFor="multi-last">Last Name</Label>
        <Input id="multi-last" />
      </Form>
    );
    await expect.element(screen.getByLabelText('First Name')).toBeInTheDocument();
    await expect.element(screen.getByLabelText('Last Name')).toBeInTheDocument();
    await takeSnapshot(`Form - renders multiple nested Input/Label pairs together`);
  });

  /* -----------------------------------------------------------------------
   * Multiple independent Form instances (2)
   * -------------------------------------------------------------------- */

  it('does not leak background color between two Form instances with different inverted props', async () => {
    const screen = await render(
      <div>
        <Form inverted={false} data-testid="light-form">
          Light
        </Form>
        <Form inverted data-testid="dark-form">
          Dark
        </Form>
      </div>
    );
    const light = screen.getByTestId('light-form');
    const dark = screen.getByTestId('dark-form');
    await expect.element(light).toHaveStyle({ backgroundColor: color.white });
    await expect.element(dark).toHaveStyle({ backgroundColor: color.slate800 });
    await takeSnapshot(`Form - does not leak background color between two Form instances with different inverted props`);
  });

  it('does not leak onSubmit handlers between two independent Form instances', async () => {
    const onSubmitFirst = vi.fn((e: React.FormEvent) => e.preventDefault());
    const onSubmitSecond = vi.fn((e: React.FormEvent) => e.preventDefault());
    const screen = await render(
      <div>
        <Form onSubmit={onSubmitFirst}>
          <button type="submit">First submit</button>
        </Form>
        <Form onSubmit={onSubmitSecond}>
          <button type="submit">Second submit</button>
        </Form>
      </div>
    );
    const firstSubmit = screen.getByRole('button', { name: 'First submit' });
    await userEvent.click(firstSubmit);
    await vi.waitFor(() => expect(onSubmitFirst).toHaveBeenCalledTimes(1));
    await vi.waitFor(() => expect(onSubmitSecond).not.toHaveBeenCalled());
    await takeSnapshot(`Form - does not leak onSubmit handlers between two independent Form instances`);
  });

  /* -----------------------------------------------------------------------
   * RTL / unicode content (3)
   * -------------------------------------------------------------------- */

  it('preserves RTL Arabic text content exactly', async () => {
    const screen = await render(<Form>مرحبا بالعالم</Form>);
    await expect
      .element(screen.getByText('مرحبا بالعالم'))
      .toHaveTextContent('مرحبا بالعالم');
    await takeSnapshot(`Form - preserves RTL Arabic text content exactly`);
  });

  it('preserves emoji content exactly', async () => {
    const screen = await render(<Form>🚀 Launch form</Form>);
    await expect
      .element(screen.getByText('🚀 Launch form'))
      .toHaveTextContent('🚀 Launch form');
    await takeSnapshot(`Form - preserves emoji content exactly`);
  });

  it('preserves mixed unicode and Latin content in a nested label', async () => {
    const screen = await render(
      <Form>
        <Label htmlFor="unicode-field">Nombre / 名前 / اسم</Label>
        <Input id="unicode-field" />
      </Form>
    );
    await expect
      .element(screen.getByText('Nombre / 名前 / اسم'))
      .toBeInTheDocument();
    await takeSnapshot(`Form - preserves mixed unicode and Latin content in a nested label`);
  });

  /* -----------------------------------------------------------------------
   * Kitchen-sink combos (3)
   * -------------------------------------------------------------------- */

  it('renders a kitchen-sink form combining inverted, custom gap and native attributes', async () => {
    const screen = await render(
      <Form inverted gap={20} id="kitchen-sink" noValidate autoComplete="off">
        <Label htmlFor="kitchen-sink-name" inverted>
          Name
        </Label>
        <Input id="kitchen-sink-name" inverted />
      </Form>
    );
    const root = screen.container.firstElementChild as HTMLFormElement;
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ backgroundColor: color.slate800, gap: '20px' });
    expect(root.id).toBe('kitchen-sink');
    expect(root.noValidate).toBe(true);
    expect(root.getAttribute('autocomplete')).toBe('off');
    await takeSnapshot(`Form - renders a kitchen-sink form combining inverted, custom gap and native attributes`);
  });

  it('fires onSubmit exactly once in a kitchen-sink form with nested Input and Checkbox children', async () => {
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
    const screen = await render(
      <Form inverted gap={12} onSubmit={onSubmit}>
        <Label htmlFor="ks-email" inverted>
          Email
        </Label>
        <Input id="ks-email" type="email" inverted />
        <Checkbox>Subscribe</Checkbox>
        <button type="submit">Submit</button>
      </Form>
    );
    const submit = screen.getByRole('button', { name: 'Submit' });
    await userEvent.click(submit);
    await vi.waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    await takeSnapshot(`Form - fires onSubmit exactly once in a kitchen-sink form with nested Input and Checkbox children`);
  });

  it('keeps inverted styling correct alongside passthrough of noValidate and autoComplete', async () => {
    const screen = await render(
      <Form inverted noValidate autoComplete="on">
        Content
      </Form>
    );
    const root = screen.container.firstElementChild as HTMLFormElement;
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ backgroundColor: color.slate800, borderColor: color.slate700 });
    expect(root.noValidate).toBe(true);
    expect(root.getAttribute('autocomplete')).toBe('on');
    await takeSnapshot(`Form - keeps inverted styling correct alongside passthrough of noValidate and autoComplete`);
  });

  /* -----------------------------------------------------------------------
   * Default prop values when omitted (2)
   * -------------------------------------------------------------------- */

  it('defaults inverted to false, producing light-mode colors', async () => {
    const screen = await render(<Form>Content</Form>);
    const root = screen.container.firstElementChild as HTMLElement;
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ backgroundColor: color.white, borderColor: color.slate200 });
    await takeSnapshot(`Form - defaults inverted to false, producing light-mode colors`);
  });

  it('defaults gap to spacing[4], producing that inline gap style', async () => {
    const screen = await render(<Form>Content</Form>);
    const root = screen.container.firstElementChild as HTMLElement;
    expect(root.style.gap).toBe(spacing[4]);
    await takeSnapshot(`Form - defaults gap to spacing[4], producing that inline gap style`);
  });

  /* -----------------------------------------------------------------------
   * style prop passthrough / override behavior via rest props (2)
   * -------------------------------------------------------------------- */

  it('entirely replaces the computed default style object when a consumer style prop is passed through rest', async () => {
    const screen = await render(<Form style={{ minWidth: '600px' }}>Content</Form>);
    const root = screen.container.firstElementChild as HTMLElement;
    expect(root.style.minWidth).toBe('600px');
    expect(root.style.backgroundColor).toBe('');
    await takeSnapshot(`Form - entirely replaces the computed default style object when a consumer style prop is passed through rest`);
  });

  it('still renders a valid form element when a partial style override is supplied', async () => {
    const screen = await render(<Form style={{ minWidth: '500px' }}>Content</Form>);
    const root = screen.container.firstElementChild as HTMLElement;
    expect(root.tagName).toBe('FORM');
    await takeSnapshot(`Form - still renders a valid form element when a partial style override is supplied`);
  });

  /* -----------------------------------------------------------------------
   * Additional edge cases (7)
   * -------------------------------------------------------------------- */

  it('renders successfully with an empty string as children', async () => {
    const screen = await render(<Form>{''}</Form>);
    const root = screen.container.firstElementChild as HTMLElement;
    expect(root).toBeTruthy();
    await takeSnapshot(`Form - renders successfully with an empty string as children`);
  });

  it('renders correctly when gap is given as a CSS calc() expression string', async () => {
    const screen = await render(<Form gap="calc(1rem + 4px)">Content</Form>);
    const root = screen.container.firstElementChild as HTMLElement;
    // The browser may reorder the calc() operands, so assert on the
    // normalized pieces rather than the exact original string.
    expect(root.style.gap).toContain('calc(');
    expect(root.style.gap).toContain('1rem');
    expect(root.style.gap).toContain('4px');
    await takeSnapshot(`Form - renders correctly when gap is given as a CSS calc() expression string`);
  });

  it("appends 'px' to a fractional numeric gap value", async () => {
    const screen = await render(<Form gap={12.5}>Content</Form>);
    const root = screen.container.firstElementChild as HTMLElement;
    expect(root.style.gap).toBe('12.5px');
    await takeSnapshot(`Form - appends 'px' to a fractional numeric gap value`);
  });

  it('keeps a 300px minWidth even when inverted is true', async () => {
    const screen = await render(<Form inverted>Content</Form>);
    const root = screen.container.firstElementChild as HTMLElement;
    await expect.element(locatorFor(root)).toHaveStyle({ minWidth: '300px' });
    await takeSnapshot(`Form - keeps a 300px minWidth even when inverted is true`);
  });

  it('keeps border-radius and padding consistent when combined with a large numeric gap', async () => {
    const screen = await render(<Form gap={48}>Content</Form>);
    const root = screen.container.firstElementChild as HTMLElement;
    await expect
      .element(locatorFor(root))
      .toHaveStyle({ borderRadius: spacing[2], padding: spacing[6], gap: '48px' });
    await takeSnapshot(`Form - keeps border-radius and padding consistent when combined with a large numeric gap`);
  });

  it('does not append a unit to an already-unitful string gap that resembles a number', async () => {
    const screen = await render(<Form gap="16px">Content</Form>);
    const root = screen.container.firstElementChild as HTMLElement;
    expect(root.style.gap).toBe('16px');
    await takeSnapshot(`Form - does not append a unit to an already-unitful string gap that resembles a number`);
  });

  it('renders the underlying element as a semantic <form> tag', async () => {
    const screen = await render(<Form>Content</Form>);
    const root = screen.container.firstElementChild as HTMLElement;
    expect(root.tagName).toBe('FORM');
    await takeSnapshot(`Form - renders the underlying element as a semantic <form> tag`);
  });
});
