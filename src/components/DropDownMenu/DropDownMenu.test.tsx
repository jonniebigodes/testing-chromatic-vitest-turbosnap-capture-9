import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent, page } from 'vitest/browser';
import DropDownMenu from './DropDownMenu';
import { color } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

/** Wraps a raw HTMLElement into a Locator so jest-dom matchers can be used. */
const locatorFor = (element: HTMLElement) => page.elementLocator(element);

/** The trigger is the only <button> Ark renders for a single DropDownMenu. */
const getTrigger = (container: HTMLElement) =>
  container.querySelector('button') as HTMLElement;

/**
 * The menu content is always mounted in the DOM; Ark toggles a native
 * `hidden` attribute rather than unmounting/remounting it, so it must be
 * queried directly instead of through role-based queries which exclude
 * hidden elements.
 */
const getMenuContent = (container: HTMLElement) =>
  container.querySelector('[role="menu"]') as HTMLElement;

/** All menu item elements currently rendered, in document order. */
const getMenuItems = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('[role="menuitem"]')) as HTMLElement[];

/** Finds a menu item element by its exact visible text. */
const getMenuItemByText = (container: HTMLElement, text: string) =>
  getMenuItems(container).find((item) => item.textContent === text) as HTMLElement;

const basicItems = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

describe('DropDownMenu', () => {
  /* -----------------------------------------------------------------------
   * Rendering & structure (4)
   * -------------------------------------------------------------------- */

  it('renders the trigger button with the provided label text', async () => {
    const screen = await render(<DropDownMenu label="Options">{basicItems}</DropDownMenu>);
    await expect.element(screen.getByRole('button')).toHaveTextContent('Options');
    await takeSnapshot(`DropDownMenu - renders the trigger button with the provided label text`);
  });

  it('renders the menu content element in the DOM before any interaction', async () => {
    const screen = await render(<DropDownMenu label="Options">{basicItems}</DropDownMenu>);
    const content = getMenuContent(screen.container);
    expect(content).not.toBeNull();
    await takeSnapshot(`DropDownMenu - renders the menu content element in the DOM before any interaction`);
  });

  it('keeps the menu content hidden before the trigger is clicked', async () => {
    const screen = await render(<DropDownMenu label="Options">{basicItems}</DropDownMenu>);
    const content = getMenuContent(screen.container);
    await expect.element(locatorFor(content)).not.toBeVisible();
    await takeSnapshot(`DropDownMenu - keeps the menu content hidden before the trigger is clicked`);
  });

  it('renders one menu item per string in the children array', async () => {
    const screen = await render(<DropDownMenu label="Options">{basicItems}</DropDownMenu>);
    await userEvent.click(locatorFor(getTrigger(screen.container)));
    await expect.element(locatorFor(getMenuContent(screen.container))).toBeVisible();
    expect(getMenuItems(screen.container)).toHaveLength(basicItems.length);
    await takeSnapshot(`DropDownMenu - renders one menu item per string in the children array`);
  });

  /* -----------------------------------------------------------------------
   * Trigger ARIA attributes (3)
   * -------------------------------------------------------------------- */

  it('sets aria-haspopup="menu" on the trigger', async () => {
    const screen = await render(<DropDownMenu label="Options">{basicItems}</DropDownMenu>);
    await expect.element(screen.getByRole('button')).toHaveAttribute('aria-haspopup', 'menu');
    await takeSnapshot(`DropDownMenu - sets aria-haspopup="menu" on the trigger`);
  });

  it('sets aria-expanded="false" on the trigger while closed', async () => {
    const screen = await render(<DropDownMenu label="Options">{basicItems}</DropDownMenu>);
    await expect.element(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
    await takeSnapshot(`DropDownMenu - sets aria-expanded="false" on the trigger while closed`);
  });

  it("sets aria-controls on the trigger referencing the content element's id", async () => {
    const screen = await render(<DropDownMenu label="Options">{basicItems}</DropDownMenu>);
    const trigger = getTrigger(screen.container);
    const content = getMenuContent(screen.container);
    expect(trigger.getAttribute('aria-controls')).toBe(content.id);
    await takeSnapshot(`DropDownMenu - sets aria-controls on the trigger referencing the content element's id`);
  });

  /* -----------------------------------------------------------------------
   * Opening the menu (4)
   * -------------------------------------------------------------------- */

  it('opens the menu content when the trigger is clicked', async () => {
    const screen = await render(<DropDownMenu label="Options">{basicItems}</DropDownMenu>);
    await userEvent.click(locatorFor(getTrigger(screen.container)));
    await expect.element(locatorFor(getMenuContent(screen.container))).toBeVisible();
    await takeSnapshot(`DropDownMenu - opens the menu content when the trigger is clicked`);
  });

  it('sets aria-expanded="true" on the trigger once open', async () => {
    const screen = await render(<DropDownMenu label="Options">{basicItems}</DropDownMenu>);
    const trigger = getTrigger(screen.container);
    await userEvent.click(locatorFor(trigger));
    await expect.element(locatorFor(trigger)).toHaveAttribute('aria-expanded', 'true');
    await takeSnapshot(`DropDownMenu - sets aria-expanded="true" on the trigger once open`);
  });

  it('sets data-state="open" on the trigger once open', async () => {
    const screen = await render(<DropDownMenu label="Options">{basicItems}</DropDownMenu>);
    const trigger = getTrigger(screen.container);
    await userEvent.click(locatorFor(trigger));
    await expect.element(locatorFor(trigger)).toHaveAttribute('data-state', 'open');
    await takeSnapshot(`DropDownMenu - sets data-state="open" on the trigger once open`);
  });

  it('moves DOM focus onto the menu content shortly after opening', async () => {
    const screen = await render(<DropDownMenu label="Options">{basicItems}</DropDownMenu>);
    await userEvent.click(locatorFor(getTrigger(screen.container)));
    const content = getMenuContent(screen.container);
    await expect.element(locatorFor(content)).toHaveFocus();
    await takeSnapshot(`DropDownMenu - moves DOM focus onto the menu content shortly after opening`);
  });

  /* -----------------------------------------------------------------------
   * Closing the menu (4)
   * -------------------------------------------------------------------- */

  it('closes the menu when the trigger is clicked a second time', async () => {
    const screen = await render(<DropDownMenu label="Options">{basicItems}</DropDownMenu>);
    const trigger = getTrigger(screen.container);
    const content = getMenuContent(screen.container);
    await userEvent.click(locatorFor(trigger));
    await expect.element(locatorFor(content)).toBeVisible();
    await userEvent.click(locatorFor(trigger));
    await expect.element(locatorFor(content)).not.toBeVisible();
    await takeSnapshot(`DropDownMenu - closes the menu when the trigger is clicked a second time`);
  });

  it('closes the menu when Escape is pressed while open', async () => {
    const screen = await render(<DropDownMenu label="Options">{basicItems}</DropDownMenu>);
    const trigger = getTrigger(screen.container);
    const content = getMenuContent(screen.container);
    await userEvent.click(locatorFor(trigger));
    await expect.element(locatorFor(content)).toBeVisible();
    await userEvent.keyboard('{Escape}');
    await expect.element(locatorFor(content)).not.toBeVisible();
    await takeSnapshot(`DropDownMenu - closes the menu when Escape is pressed while open`);
  });

  it('closes the menu when clicking outside of it', async () => {
    const screen = await render(
      <div>
        <DropDownMenu label="Options">{basicItems}</DropDownMenu>
        <button>Outside</button>
      </div>
    );
    const trigger = getTrigger(screen.container);
    const content = getMenuContent(screen.container);
    await userEvent.click(locatorFor(trigger));
    await expect.element(locatorFor(content)).toBeVisible();
    await userEvent.click(screen.getByRole('button', { name: 'Outside' }));
    await expect.element(locatorFor(content)).not.toBeVisible();
    await takeSnapshot(`DropDownMenu - closes the menu when clicking outside of it`);
  });

  it('closes the menu after an item is selected', async () => {
    const screen = await render(<DropDownMenu label="Options">{basicItems}</DropDownMenu>);
    const trigger = getTrigger(screen.container);
    const content = getMenuContent(screen.container);
    await userEvent.click(locatorFor(trigger));
    await expect.element(locatorFor(content)).toBeVisible();
    await userEvent.click(locatorFor(getMenuItemByText(screen.container, 'Option 1')));
    await expect.element(locatorFor(content)).not.toBeVisible();
    await takeSnapshot(`DropDownMenu - closes the menu after an item is selected`);
  });

  /* -----------------------------------------------------------------------
   * Keyboard navigation (6)
   * -------------------------------------------------------------------- */

  it('opens the menu and highlights the first item when ArrowDown is pressed on the focused trigger', async () => {
    const screen = await render(<DropDownMenu label="Options">{basicItems}</DropDownMenu>);
    const trigger = getTrigger(screen.container);
    trigger.focus();
    await userEvent.keyboard('{ArrowDown}');
    const content = getMenuContent(screen.container);
    await expect.element(locatorFor(content)).toBeVisible();
    const items = getMenuItems(screen.container);
    await expect.element(locatorFor(items[0])).toHaveAttribute('data-highlighted');
    await takeSnapshot(`DropDownMenu - opens the menu and highlights the first item when ArrowDown is pressed on the focused trigger`);
  });

  it('opens the menu and highlights the last item when ArrowUp is pressed on the focused trigger', async () => {
    const screen = await render(<DropDownMenu label="Options">{basicItems}</DropDownMenu>);
    const trigger = getTrigger(screen.container);
    trigger.focus();
    await userEvent.keyboard('{ArrowUp}');
    const content = getMenuContent(screen.container);
    await expect.element(locatorFor(content)).toBeVisible();
    const items = getMenuItems(screen.container);
    await expect.element(locatorFor(items[items.length - 1])).toHaveAttribute('data-highlighted');
    await takeSnapshot(`DropDownMenu - opens the menu and highlights the last item when ArrowUp is pressed on the focused trigger`);
  });

  it('highlights the second item after pressing ArrowDown twice while open', async () => {
    const screen = await render(<DropDownMenu label="Options">{basicItems}</DropDownMenu>);
    const trigger = getTrigger(screen.container);
    trigger.focus();
    await userEvent.keyboard('{ArrowDown}');
    await expect.element(locatorFor(getMenuContent(screen.container))).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    const items = getMenuItems(screen.container);
    await expect.element(locatorFor(items[1])).toHaveAttribute('data-highlighted');
    await takeSnapshot(`DropDownMenu - highlights the second item after pressing ArrowDown twice while open`);
  });

  it('moves the highlight back to the previous item when ArrowUp is pressed after ArrowDown', async () => {
    const screen = await render(<DropDownMenu label="Options">{basicItems}</DropDownMenu>);
    const trigger = getTrigger(screen.container);
    trigger.focus();
    await userEvent.keyboard('{ArrowDown}');
    await expect.element(locatorFor(getMenuContent(screen.container))).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowUp}');
    const items = getMenuItems(screen.container);
    await expect.element(locatorFor(items[0])).toHaveAttribute('data-highlighted');
    await takeSnapshot(`DropDownMenu - moves the highlight back to the previous item when ArrowUp is pressed after ArrowDown`);
  });

  it('selects the currently highlighted item when Enter is pressed', async () => {
    const onSelect = vi.fn();
    const screen = await render(
      <DropDownMenu label="Options" onSelect={onSelect}>
        {basicItems}
      </DropDownMenu>
    );
    const trigger = getTrigger(screen.container);
    trigger.focus();
    await userEvent.keyboard('{ArrowDown}');
    await expect.element(locatorFor(getMenuContent(screen.container))).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await vi.waitFor(() => expect(onSelect).toHaveBeenCalledWith('Option 1'));
    await takeSnapshot(`DropDownMenu - selects the currently highlighted item when Enter is pressed`);
  });

  it('highlights the first item on Home and the last item on End', async () => {
    const screen = await render(<DropDownMenu label="Options">{basicItems}</DropDownMenu>);
    const trigger = getTrigger(screen.container);
    trigger.focus();
    await userEvent.keyboard('{ArrowDown}');
    await expect.element(locatorFor(getMenuContent(screen.container))).toHaveFocus();
    const items = getMenuItems(screen.container);
    await userEvent.keyboard('{End}');
    await expect.element(locatorFor(items[items.length - 1])).toHaveAttribute('data-highlighted');
    await userEvent.keyboard('{Home}');
    await expect.element(locatorFor(items[0])).toHaveAttribute('data-highlighted');
    await takeSnapshot(`DropDownMenu - highlights the first item on Home and the last item on End`);
  });

  /* -----------------------------------------------------------------------
   * onSelect callback correctness (5)
   * -------------------------------------------------------------------- */

  it('calls onSelect with the correct value when the first item is clicked', async () => {
    const onSelect = vi.fn();
    const screen = await render(
      <DropDownMenu label="Options" onSelect={onSelect}>
        {basicItems}
      </DropDownMenu>
    );
    await userEvent.click(locatorFor(getTrigger(screen.container)));
    await expect.element(locatorFor(getMenuContent(screen.container))).toBeVisible();
    await userEvent.click(locatorFor(getMenuItemByText(screen.container, 'Option 1')));
    await vi.waitFor(() => expect(onSelect).toHaveBeenCalledWith('Option 1'));
    await takeSnapshot(`DropDownMenu - calls onSelect with the correct value when the first item is clicked`);
  });

  it('calls onSelect with the correct value when a middle item is clicked', async () => {
    const onSelect = vi.fn();
    const screen = await render(
      <DropDownMenu label="Options" onSelect={onSelect}>
        {basicItems}
      </DropDownMenu>
    );
    await userEvent.click(locatorFor(getTrigger(screen.container)));
    await expect.element(locatorFor(getMenuContent(screen.container))).toBeVisible();
    await userEvent.click(locatorFor(getMenuItemByText(screen.container, 'Option 2')));
    await vi.waitFor(() => expect(onSelect).toHaveBeenCalledWith('Option 2'));
    await takeSnapshot(`DropDownMenu - calls onSelect with the correct value when a middle item is clicked`);
  });

  it('calls onSelect with the correct value when the last item is clicked', async () => {
    const onSelect = vi.fn();
    const screen = await render(
      <DropDownMenu label="Options" onSelect={onSelect}>
        {basicItems}
      </DropDownMenu>
    );
    await userEvent.click(locatorFor(getTrigger(screen.container)));
    await expect.element(locatorFor(getMenuContent(screen.container))).toBeVisible();
    await userEvent.click(locatorFor(getMenuItemByText(screen.container, 'Option 4')));
    await vi.waitFor(() => expect(onSelect).toHaveBeenCalledWith('Option 4'));
    await takeSnapshot(`DropDownMenu - calls onSelect with the correct value when the last item is clicked`);
  });

  it('calls onSelect exactly once per item selection', async () => {
    const onSelect = vi.fn();
    const screen = await render(
      <DropDownMenu label="Options" onSelect={onSelect}>
        {basicItems}
      </DropDownMenu>
    );
    await userEvent.click(locatorFor(getTrigger(screen.container)));
    await expect.element(locatorFor(getMenuContent(screen.container))).toBeVisible();
    await userEvent.click(locatorFor(getMenuItemByText(screen.container, 'Option 3')));
    await vi.waitFor(() => expect(onSelect).toHaveBeenCalledTimes(1));
    await takeSnapshot(`DropDownMenu - calls onSelect exactly once per item selection`);
  });

  it('does not call onSelect when the menu is only opened and closed without selecting an item', async () => {
    const onSelect = vi.fn();
    const screen = await render(
      <DropDownMenu label="Options" onSelect={onSelect}>
        {basicItems}
      </DropDownMenu>
    );
    const trigger = getTrigger(screen.container);
    const content = getMenuContent(screen.container);
    await userEvent.click(locatorFor(trigger));
    await expect.element(locatorFor(content)).toBeVisible();
    await userEvent.keyboard('{Escape}');
    await expect.element(locatorFor(content)).not.toBeVisible();
    expect(onSelect).not.toHaveBeenCalled();
    await takeSnapshot(`DropDownMenu - does not call onSelect when the menu is only opened and closed without selecting an item`);
  });

  /* -----------------------------------------------------------------------
   * Focus management (3)
   * -------------------------------------------------------------------- */

  it('returns focus to the trigger after Escape closes the menu', async () => {
    const screen = await render(<DropDownMenu label="Options">{basicItems}</DropDownMenu>);
    const trigger = getTrigger(screen.container);
    await userEvent.click(locatorFor(trigger));
    await expect.element(locatorFor(getMenuContent(screen.container))).toBeVisible();
    await userEvent.keyboard('{Escape}');
    await expect.element(locatorFor(trigger)).toHaveFocus();
    await takeSnapshot(`DropDownMenu - returns focus to the trigger after Escape closes the menu`);
  });

  it('returns focus to the trigger after selecting an item via keyboard closes the menu', async () => {
    // Selecting via keyboard (rather than a real mouse hover+click) avoids a
    // known ITEM_POINTERMOVE/focusMenu race in the underlying Ark/zag-js menu
    // machine, giving a deterministic assertion of the documented
    // "focus returns to trigger on close" contract.
    const screen = await render(<DropDownMenu label="Options">{basicItems}</DropDownMenu>);
    const trigger = getTrigger(screen.container);
    trigger.focus();
    await userEvent.keyboard('{ArrowDown}');
    await expect.element(locatorFor(getMenuContent(screen.container))).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect
      .element(locatorFor(trigger), { timeout: 10000 })
      .toHaveFocus();
    await takeSnapshot(`DropDownMenu - returns focus to the trigger after selecting an item via keyboard closes the menu`);
  });

  it('is reachable via Tab', async () => {
    const screen = await render(<DropDownMenu label="Options">{basicItems}</DropDownMenu>);
    const trigger = getTrigger(screen.container);
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    await vi.waitFor(() => expect(document.activeElement).toBe(trigger));
    await takeSnapshot(`DropDownMenu - is reachable via Tab`);
  });

  /* -----------------------------------------------------------------------
   * Color & inverted styling (4)
   * -------------------------------------------------------------------- */

  it("applies the provided color prop as the trigger's background color", async () => {
    const screen = await render(
      <DropDownMenu label="Options" color="#ef4444">
        {basicItems}
      </DropDownMenu>
    );
    await expect
      .element(locatorFor(getTrigger(screen.container)))
      .toHaveStyle({ backgroundColor: '#ef4444' });
    await takeSnapshot(`DropDownMenu - applies the provided color prop as the trigger's background color`);
  });

  it('defaults to the blue500 token color when no color prop is given', async () => {
    const screen = await render(<DropDownMenu label="Options">{basicItems}</DropDownMenu>);
    await expect
      .element(locatorFor(getTrigger(screen.container)))
      .toHaveStyle({ backgroundColor: color.blue500 });
    await takeSnapshot(`DropDownMenu - defaults to the blue500 token color when no color prop is given`);
  });

  it('applies inverted slate colors to the trigger when inverted is true', async () => {
    const screen = await render(
      <DropDownMenu label="Options" inverted>
        {basicItems}
      </DropDownMenu>
    );
    await expect
      .element(locatorFor(getTrigger(screen.container)))
      .toHaveStyle({ backgroundColor: color.slate800 });
    await takeSnapshot(`DropDownMenu - applies inverted slate colors to the trigger when inverted is true`);
  });

  it('applies inverted background colors to the menu content when inverted is true', async () => {
    const screen = await render(
      <DropDownMenu label="Options" inverted>
        {basicItems}
      </DropDownMenu>
    );
    await expect
      .element(locatorFor(getMenuContent(screen.container)))
      .toHaveStyle({ backgroundColor: color.slate700 });
    await takeSnapshot(`DropDownMenu - applies inverted background colors to the menu content when inverted is true`);
  });

  /* -----------------------------------------------------------------------
   * Item content edge cases (5)
   * -------------------------------------------------------------------- */

  it('supports a menu with many items and allows selecting one from the middle', async () => {
    const many = Array.from({ length: 15 }, (_, i) => `Item ${i + 1}`);
    const onSelect = vi.fn();
    const screen = await render(
      <DropDownMenu label="Many" onSelect={onSelect}>
        {many}
      </DropDownMenu>
    );
    await userEvent.click(locatorFor(getTrigger(screen.container)));
    await expect.element(locatorFor(getMenuContent(screen.container))).toBeVisible();
    expect(getMenuItems(screen.container)).toHaveLength(15);
    await userEvent.click(locatorFor(getMenuItemByText(screen.container, 'Item 8')));
    await vi.waitFor(() => expect(onSelect).toHaveBeenCalledWith('Item 8'));
    await takeSnapshot(`DropDownMenu - supports a menu with many items and allows selecting one from the middle`);
  });

  it('supports a menu with a single item', async () => {
    const onSelect = vi.fn();
    const screen = await render(
      <DropDownMenu label="Single" onSelect={onSelect}>
        {['Only Option']}
      </DropDownMenu>
    );
    await userEvent.click(locatorFor(getTrigger(screen.container)));
    await expect.element(locatorFor(getMenuContent(screen.container))).toBeVisible();
    expect(getMenuItems(screen.container)).toHaveLength(1);
    await userEvent.click(locatorFor(getMenuItemByText(screen.container, 'Only Option')));
    await vi.waitFor(() => expect(onSelect).toHaveBeenCalledWith('Only Option'));
    await takeSnapshot(`DropDownMenu - supports a menu with a single item`);
  });

  it('preserves long item text exactly when rendered and selected', async () => {
    const longText =
      'This is a very long menu item label that exercises the ellipsis overflow styling applied to each item';
    const onSelect = vi.fn();
    const screen = await render(
      <DropDownMenu label="Long" onSelect={onSelect}>
        {[longText, 'Short']}
      </DropDownMenu>
    );
    await userEvent.click(locatorFor(getTrigger(screen.container)));
    await expect.element(locatorFor(getMenuContent(screen.container))).toBeVisible();
    const item = getMenuItemByText(screen.container, longText);
    await expect.element(locatorFor(item)).toHaveTextContent(longText);
    await userEvent.click(locatorFor(item));
    await vi.waitFor(() => expect(onSelect).toHaveBeenCalledWith(longText));
    await takeSnapshot(`DropDownMenu - preserves long item text exactly when rendered and selected`);
  });

  it('preserves RTL/unicode item text exactly when rendered and selected', async () => {
    const rtlText = 'أوافق على الشروط';
    const onSelect = vi.fn();
    const screen = await render(
      <DropDownMenu label="RTL" onSelect={onSelect}>
        {[rtlText, 'Other']}
      </DropDownMenu>
    );
    await userEvent.click(locatorFor(getTrigger(screen.container)));
    await expect.element(locatorFor(getMenuContent(screen.container))).toBeVisible();
    const item = getMenuItemByText(screen.container, rtlText);
    await userEvent.click(locatorFor(item));
    await vi.waitFor(() => expect(onSelect).toHaveBeenCalledWith(rtlText));
    await takeSnapshot(`DropDownMenu - preserves RTL/unicode item text exactly when rendered and selected`);
  });

  it('preserves emoji item text exactly when rendered and selected', async () => {
    const emojiText = '✅ Confirmed 🎉';
    const onSelect = vi.fn();
    const screen = await render(
      <DropDownMenu label="Emoji" onSelect={onSelect}>
        {[emojiText, 'Other']}
      </DropDownMenu>
    );
    await userEvent.click(locatorFor(getTrigger(screen.container)));
    await expect.element(locatorFor(getMenuContent(screen.container))).toBeVisible();
    const item = getMenuItemByText(screen.container, emojiText);
    await userEvent.click(locatorFor(item));
    await vi.waitFor(() => expect(onSelect).toHaveBeenCalledWith(emojiText));
    await takeSnapshot(`DropDownMenu - preserves emoji item text exactly when rendered and selected`);
  });

  /* -----------------------------------------------------------------------
   * Label edge cases (2)
   * -------------------------------------------------------------------- */

  it('renders correctly with a very long label on the trigger', async () => {
    const longLabel =
      'A very long dropdown trigger label used to check wrapping/overflow behavior';
    const screen = await render(<DropDownMenu label={longLabel}>{basicItems}</DropDownMenu>);
    await expect.element(screen.getByRole('button')).toHaveTextContent(longLabel);
    await takeSnapshot(`DropDownMenu - renders correctly with a very long label on the trigger`);
  });

  it('renders correctly with an empty string label', async () => {
    const screen = await render(<DropDownMenu label="">{basicItems}</DropDownMenu>);
    const trigger = getTrigger(screen.container);
    expect(trigger).not.toBeNull();
    await userEvent.click(locatorFor(trigger));
    await expect.element(locatorFor(getMenuContent(screen.container))).toBeVisible();
    await takeSnapshot(`DropDownMenu - renders correctly with an empty string label`);
  });

  /* -----------------------------------------------------------------------
   * Multiple independent instances (3)
   * -------------------------------------------------------------------- */

  it('does not share open state between two independently rendered menus', async () => {
    const screen = await render(
      <div>
        <DropDownMenu label="First">{['A', 'B']}</DropDownMenu>
        <DropDownMenu label="Second">{['C', 'D']}</DropDownMenu>
      </div>
    );
    const triggers = Array.from(screen.container.querySelectorAll('button')) as HTMLElement[];
    const contents = Array.from(
      screen.container.querySelectorAll('[role="menu"]')
    ) as HTMLElement[];
    await userEvent.click(locatorFor(triggers[0]));
    await expect.element(locatorFor(contents[0])).toBeVisible();
    await expect.element(locatorFor(contents[1])).not.toBeVisible();
    await takeSnapshot(`DropDownMenu - does not share open state between two independently rendered menus`);
  });

  it("does not invoke the other instance's onSelect when only one menu's item is clicked", async () => {
    const onSelectFirst = vi.fn();
    const onSelectSecond = vi.fn();
    const screen = await render(
      <div>
        <DropDownMenu label="First" onSelect={onSelectFirst}>
          {['A', 'B']}
        </DropDownMenu>
        <DropDownMenu label="Second" onSelect={onSelectSecond}>
          {['C', 'D']}
        </DropDownMenu>
      </div>
    );
    const triggers = Array.from(screen.container.querySelectorAll('button')) as HTMLElement[];
    await userEvent.click(locatorFor(triggers[0]));
    const firstContent = screen.container.querySelectorAll('[role="menu"]')[0] as HTMLElement;
    await expect.element(locatorFor(firstContent)).toBeVisible();
    await userEvent.click(locatorFor(getMenuItemByText(screen.container, 'A')));
    await vi.waitFor(() => expect(onSelectFirst).toHaveBeenCalledWith('A'));
    await vi.waitFor(() => expect(onSelectSecond).not.toHaveBeenCalled());
    await takeSnapshot(`DropDownMenu - does not invoke the other instance's onSelect when only one menu's item is clicked`);
  });

  it('supports two menus with different color props rendered side by side', async () => {
    const screen = await render(
      <div>
        <DropDownMenu label="Blue" color="#3b82f6">
          {['X']}
        </DropDownMenu>
        <DropDownMenu label="Red" color="#ef4444">
          {['Y']}
        </DropDownMenu>
      </div>
    );
    const triggers = Array.from(screen.container.querySelectorAll('button')) as HTMLElement[];
    await expect.element(locatorFor(triggers[0])).toHaveStyle({ backgroundColor: '#3b82f6' });
    await expect.element(locatorFor(triggers[1])).toHaveStyle({ backgroundColor: '#ef4444' });
    await takeSnapshot(`DropDownMenu - supports two menus with different color props rendered side by side`);
  });

  /* -----------------------------------------------------------------------
   * Default/uncontrolled behavior (2)
   * -------------------------------------------------------------------- */

  it('renders closed by default without needing any additional props', async () => {
    const screen = await render(<DropDownMenu label="Default">{basicItems}</DropDownMenu>);
    const content = getMenuContent(screen.container);
    await expect.element(locatorFor(content)).not.toBeVisible();
    await expect.element(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
    await takeSnapshot(`DropDownMenu - renders closed by default without needing any additional props`);
  });

  it('does not throw when onSelect is not provided and an item is clicked', async () => {
    const screen = await render(<DropDownMenu label="NoHandler">{basicItems}</DropDownMenu>);
    await userEvent.click(locatorFor(getTrigger(screen.container)));
    await expect.element(locatorFor(getMenuContent(screen.container))).toBeVisible();
    await expect(
      userEvent.click(locatorFor(getMenuItemByText(screen.container, 'Option 1')))
    ).resolves.not.toThrow();
    await takeSnapshot(`DropDownMenu - does not throw when onSelect is not provided and an item is clicked`);
  });

  /* -----------------------------------------------------------------------
   * Kitchen-sink combinations (5)
   * -------------------------------------------------------------------- */

  it('supports inverted, many items, and custom color together with keyboard Enter selection', async () => {
    const many = Array.from({ length: 12 }, (_, i) => `Choice ${i + 1}`);
    const onSelect = vi.fn();
    const screen = await render(
      <DropDownMenu label="Kitchen Sink" color="#6f2cac" inverted onSelect={onSelect}>
        {many}
      </DropDownMenu>
    );
    const trigger = getTrigger(screen.container);
    trigger.focus();
    await userEvent.keyboard('{ArrowDown}');
    await expect.element(locatorFor(getMenuContent(screen.container))).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Enter}');
    await vi.waitFor(() => expect(onSelect).toHaveBeenCalledWith('Choice 2'));
    await takeSnapshot(`DropDownMenu - supports inverted, many items, and custom color together with keyboard Enter selection`);
  });

  it('fires onSelect with the correct value for combined long, RTL, and emoji item text', async () => {
    const items = [
      'Short',
      'أوافق على الشروط والأحكام الطويلة جدا',
      '✅ Confirmed and done 🎉',
    ];
    const onSelect = vi.fn();
    const screen = await render(
      <DropDownMenu label="Mixed" onSelect={onSelect}>
        {items}
      </DropDownMenu>
    );
    await userEvent.click(locatorFor(getTrigger(screen.container)));
    await expect.element(locatorFor(getMenuContent(screen.container))).toBeVisible();
    await userEvent.click(locatorFor(getMenuItemByText(screen.container, items[2])));
    await vi.waitFor(() => expect(onSelect).toHaveBeenCalledWith(items[2]));
    await takeSnapshot(`DropDownMenu - fires onSelect with the correct value for combined long, RTL, and emoji item text`);
  });

  it('closes an inverted menu and returns focus to the trigger after keyboard selection', async () => {
    const screen = await render(
      <DropDownMenu label="Inverted Keyboard" inverted>
        {basicItems}
      </DropDownMenu>
    );
    const trigger = getTrigger(screen.container);
    trigger.focus();
    await userEvent.keyboard('{ArrowDown}');
    await expect.element(locatorFor(getMenuContent(screen.container))).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect.element(locatorFor(getMenuContent(screen.container))).not.toBeVisible();
    await expect.element(locatorFor(trigger)).toHaveFocus();
    await takeSnapshot(`DropDownMenu - closes an inverted menu and returns focus to the trigger after keyboard selection`);
  });

  it('closes an inverted menu with many items on outside click without calling onSelect', async () => {
    const many = Array.from({ length: 10 }, (_, i) => `Row ${i + 1}`);
    const onSelect = vi.fn();
    const screen = await render(
      <div>
        <DropDownMenu label="Inverted Many" inverted onSelect={onSelect}>
          {many}
        </DropDownMenu>
        <button>Away</button>
      </div>
    );
    await userEvent.click(locatorFor(getTrigger(screen.container)));
    await expect.element(locatorFor(getMenuContent(screen.container))).toBeVisible();
    await userEvent.click(screen.getByRole('button', { name: 'Away' }));
    await expect.element(locatorFor(getMenuContent(screen.container))).not.toBeVisible();
    expect(onSelect).not.toHaveBeenCalled();
    await takeSnapshot(`DropDownMenu - closes an inverted menu with many items on outside click without calling onSelect`);
  });

  it("fires each independently-colored, independently-inverted menu's onSelect with its own correct value", async () => {
    const onSelectA = vi.fn();
    const onSelectB = vi.fn();
    const screen = await render(
      <div>
        <DropDownMenu label="Normal" color="#10b981" onSelect={onSelectA}>
          {['Alpha', 'Beta']}
        </DropDownMenu>
        <DropDownMenu label="Inverted" inverted onSelect={onSelectB}>
          {['Gamma', 'Delta']}
        </DropDownMenu>
      </div>
    );
    const triggers = Array.from(screen.container.querySelectorAll('button')) as HTMLElement[];
    await userEvent.click(locatorFor(triggers[0]));
    await userEvent.click(locatorFor(getMenuItemByText(screen.container, 'Beta')));
    await vi.waitFor(() => expect(onSelectA).toHaveBeenCalledWith('Beta'));
    await userEvent.click(locatorFor(triggers[1]));
    await userEvent.click(locatorFor(getMenuItemByText(screen.container, 'Gamma')));
    await vi.waitFor(() => expect(onSelectB).toHaveBeenCalledWith('Gamma'));
    await vi.waitFor(() => expect(onSelectA).toHaveBeenCalledTimes(1));
    await takeSnapshot(`DropDownMenu - fires each independently-colored, independently-inverted menu's onSelect with its own correct value`);
  });
});
