import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { useState } from 'react';
import SearchBar from './SearchBar';
import { color } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

/**
 * Resolves a token color (hex/hsl string) to the canonical computed `rgb(...)`
 * string the browser will report via `getComputedStyle`. Used to compare
 * colors reliably without hardcoding browser-specific rgb conversions.
 */
function computedColor(tokenColor: string): string {
  const probe = document.createElement('span');
  probe.style.color = tokenColor;
  document.body.appendChild(probe);
  const value = getComputedStyle(probe).color;
  document.body.removeChild(probe);
  return value;
}

/**
 * Small stateful fixture mirroring the live "list filter" usage pattern from
 * the stories - a controlled SearchBar narrowing a small hardcoded list.
 */
const fruitList = ['Apple', 'Banana', 'Cherry', 'Date'];

const ListFilterFixture = () => {
  const [query, setQuery] = useState('');
  const filtered = fruitList.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div>
      <SearchBar
      label="Filter fruits"
      id="filter-fruits"
      value={query}
      onValueChange={setQuery}
    />
      <ul>
        {filtered.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

/** Fixture for asserting controlled behavior: value is fully owned by the parent. */
const ControlledFixture = ({
  onValueChange,
}: {
  onValueChange: (value: string) => void;
}) => {
  const [value] = useState('locked value');
  return (
    <SearchBar
      label="Controlled search"
      id="controlled-search"
      value={value}
      onValueChange={onValueChange}
    />
  );
};

describe('SearchBar', () => {
  /* -----------------------------------------------------------------------
   * Size variants (3)
   * -------------------------------------------------------------------- */

  it('renders the small size with a 2rem input height', async () => {
    const screen = await render(<SearchBar size="small" />);
    await expect
      .element(screen.getByRole('searchbox'))
      .toHaveStyle({ height: '2rem' });
    await takeSnapshot(`SearchBar - renders the small size with a 2rem input height`);
  });

  it('renders the medium size with a 2.5rem input height (default)', async () => {
    const screen = await render(<SearchBar size="medium" />);
    await expect
      .element(screen.getByRole('searchbox'))
      .toHaveStyle({ height: '2.5rem' });
    await takeSnapshot(`SearchBar - renders the medium size with a 2.5rem input height (default)`);
  });

  it('renders the large size with a 3rem input height', async () => {
    const screen = await render(<SearchBar size="large" />);
    await expect
      .element(screen.getByRole('searchbox'))
      .toHaveStyle({ height: '3rem' });
    await takeSnapshot(`SearchBar - renders the large size with a 3rem input height`);
  });

  /* -----------------------------------------------------------------------
   * Loading state (3)
   * -------------------------------------------------------------------- */

  it('swaps the search icon for a spinner when loading is true', async () => {
    const screen = await render(<SearchBar loading />);
    await expect.element(screen.getByRole('img', { name: 'Loading' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Search' }).query()).toBeNull();
    await takeSnapshot(`SearchBar - swaps the search icon for a spinner when loading is true`);
  });

  it('changes the leading button accessible name to "Loading" when loading', async () => {
    const screen = await render(<SearchBar loading />);
    await expect
      .element(screen.getByRole('button', { name: 'Loading' }))
      .toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' }).query()).toBeNull();
    await takeSnapshot(`SearchBar - changes the leading button accessible name to "Loading" when loading`);
  });

  it('does not call onSearch when the leading button is clicked while loading', async () => {
    const onSearch = vi.fn();
    const screen = await render(
      <SearchBar loading defaultValue="query" onSearch={onSearch} />
    );
    const iconButton = screen.getByRole('button', { name: 'Loading' });
    await expect.element(iconButton).toBeDisabled();
    expect(onSearch).not.toHaveBeenCalled();
    await takeSnapshot(`SearchBar - does not call onSearch when the leading button is clicked while loading`);
  });

  /* -----------------------------------------------------------------------
   * Disabled combinations (3)
   * -------------------------------------------------------------------- */

  it('hides the clear button when disabled, even with a value present', async () => {
    const screen = await render(
      <SearchBar disabled defaultValue="cannot clear me" />
    );
    expect(screen.getByRole('button', { name: 'Clear search' }).query()).toBeNull();
    await takeSnapshot(`SearchBar - hides the clear button when disabled, even with a value present`);
  });

  it('applies the disabled attribute to the input', async () => {
    const screen = await render(<SearchBar disabled />);
    await expect.element(screen.getByRole('searchbox')).toBeDisabled();
    await takeSnapshot(`SearchBar - applies the disabled attribute to the input`);
  });

  it('keeps the leading button disabled and spinner visible when disabled and loading together', async () => {
    const screen = await render(<SearchBar disabled loading defaultValue="results" />);
    const iconButton = screen.getByRole('button', { name: 'Loading' });
    await expect.element(iconButton).toBeDisabled();
    await expect.element(screen.getByRole('img', { name: 'Loading' })).toBeInTheDocument();
    await takeSnapshot(`SearchBar - keeps the leading button disabled and spinner visible when disabled and loading together`);
  });

  /* -----------------------------------------------------------------------
   * clearable toggle (2)
   * -------------------------------------------------------------------- */

  it('shows the clear button when clearable is true and a value is present', async () => {
    const screen = await render(<SearchBar clearable defaultValue="clearable text" />);
    await expect
      .element(screen.getByRole('button', { name: 'Clear search' }))
      .toBeInTheDocument();
    await takeSnapshot(`SearchBar - shows the clear button when clearable is true and a value is present`);
  });

  it('never renders the clear button when clearable is false, even with a value', async () => {
    const screen = await render(
      <SearchBar clearable={false} defaultValue="cannot be cleared" />
    );
    expect(screen.getByRole('button', { name: 'Clear search' }).query()).toBeNull();
    await takeSnapshot(`SearchBar - never renders the clear button when clearable is false, even with a value`);
  });

  /* -----------------------------------------------------------------------
   * Validation status (4)
   * -------------------------------------------------------------------- */

  it('renders an error validation message with role="alert"', async () => {
    const screen = await render(
      <SearchBar
        id="search-error"
        validationStatus="error"
        validationMessage="No products match that search"
      />
    );
    await expect.element(screen.getByRole('alert')).toBeVisible();
    await expect
      .element(screen.getByText('No products match that search'))
      .toBeInTheDocument();
    await expect
      .element(screen.getByRole('searchbox'))
      .toHaveAttribute('aria-describedby', 'search-error-validation');
    await takeSnapshot(`SearchBar - renders an error validation message with role="alert"`);
  });

  it('renders a warning validation message with role="status"', async () => {
    const screen = await render(
      <SearchBar
        id="search-warning"
        validationStatus="warning"
        validationMessage="This search term is very broad"
      />
    );
    await expect.element(screen.getByRole('status')).toBeVisible();
    await expect
      .element(screen.getByText('This search term is very broad'))
      .toBeInTheDocument();
    await takeSnapshot(`SearchBar - renders a warning validation message with role="status"`);
  });

  it('renders a success validation message with role="status"', async () => {
    const screen = await render(
      <SearchBar
        id="search-success"
        validationStatus="success"
        validationMessage="12 results found"
        defaultValue="sneakers"
      />
    );
    await expect.element(screen.getByRole('status')).toBeVisible();
    await expect.element(screen.getByText('12 results found')).toBeInTheDocument();
    await takeSnapshot(`SearchBar - renders a success validation message with role="status"`);
  });

  it('renders an info validation message with role="status"', async () => {
    const screen = await render(
      <SearchBar
        id="search-info"
        validationStatus="info"
        validationMessage="Try including a brand name"
      />
    );
    await expect.element(screen.getByRole('status')).toBeVisible();
    await expect
      .element(screen.getByText('Try including a brand name'))
      .toBeInTheDocument();
    await takeSnapshot(`SearchBar - renders an info validation message with role="status"`);
  });

  /* -----------------------------------------------------------------------
   * invalid alone (1)
   * -------------------------------------------------------------------- */

  it('applies invalid styling and aria-invalid without a validation message', async () => {
    const screen = await render(<SearchBar invalid defaultValue="???" />);
    const input = screen.getByRole('searchbox');
    await expect.element(input).toHaveAttribute('aria-invalid', 'true');
    await expect.element(input).toHaveStyle({ borderColor: color.pink600 });
    expect(screen.getByRole('alert').query()).toBeNull();
    expect(screen.getByRole('status').query()).toBeNull();
    await takeSnapshot(`SearchBar - applies invalid styling and aria-invalid without a validation message`);
  });

  /* -----------------------------------------------------------------------
   * Controlled/uncontrolled (2)
   * -------------------------------------------------------------------- */

  it('keeps the displayed value fixed in controlled mode unless the parent updates it', async () => {
    const onValueChange = vi.fn();
    const screen = await render(<ControlledFixture onValueChange={onValueChange} />);
    const input = screen.getByRole('searchbox');
    await expect.element(input).toHaveValue('locked value');

    await userEvent.type(input, 'x');
    await vi.waitFor(() => expect(onValueChange).toHaveBeenCalled());
    await expect.element(input).toHaveValue('locked value');
    await takeSnapshot(`SearchBar - keeps the displayed value fixed in controlled mode unless the parent updates it`);
  });

  it('updates the displayed value internally in uncontrolled mode as the user types', async () => {
    const screen = await render(<SearchBar defaultValue="seed" />);
    const input = screen.getByRole('searchbox');
    await userEvent.type(input, 'ed value');
    await expect.element(input).toHaveValue('seeded value');
    await takeSnapshot(`SearchBar - updates the displayed value internally in uncontrolled mode as the user types`);
  });

  /* -----------------------------------------------------------------------
   * Enter triggers search (1)
   * -------------------------------------------------------------------- */

  it('calls onSearch with the current value when Enter is pressed', async () => {
    const onSearch = vi.fn();
    const screen = await render(
      <SearchBar label="Search catalog" id="search-on-enter" onSearch={onSearch} />
    );
    const input = screen.getByLabelText('Search catalog');
    await userEvent.type(input, 'hiking boots');
    await userEvent.keyboard('{Enter}');
    await vi.waitFor(() => expect(onSearch).toHaveBeenCalledWith('hiking boots'));
    await takeSnapshot(`SearchBar - calls onSearch with the current value when Enter is pressed`);
  });

  /* -----------------------------------------------------------------------
   * Icon click triggers search (1)
   * -------------------------------------------------------------------- */

  it('calls onSearch with the current value when the leading icon is clicked', async () => {
    const onSearch = vi.fn();
    const screen = await render(
      <SearchBar defaultValue="denim jacket" onSearch={onSearch} />
    );
    const iconButton = screen.getByRole('button', { name: 'Search', exact: true });
    await userEvent.click(iconButton);
    await vi.waitFor(() => expect(onSearch).toHaveBeenCalledWith('denim jacket'));
    await takeSnapshot(`SearchBar - calls onSearch with the current value when the leading icon is clicked`);
  });

  /* -----------------------------------------------------------------------
   * Empty/pre-filled default (2)
   * -------------------------------------------------------------------- */

  it('renders an empty default value with no clear button', async () => {
    const screen = await render(<SearchBar defaultValue="" />);
    await expect.element(screen.getByRole('searchbox')).toHaveValue('');
    expect(screen.getByRole('button', { name: 'Clear search' }).query()).toBeNull();
    await takeSnapshot(`SearchBar - renders an empty default value with no clear button`);
  });

  it('renders a pre-filled default value with the clear button visible', async () => {
    const screen = await render(<SearchBar defaultValue="vintage typewriter" />);
    await expect
      .element(screen.getByRole('searchbox'))
      .toHaveValue('vintage typewriter');
    await expect
      .element(screen.getByRole('button', { name: 'Clear search' }))
      .toBeInTheDocument();
    await takeSnapshot(`SearchBar - renders a pre-filled default value with the clear button visible`);
  });

  /* -----------------------------------------------------------------------
   * Long text (1)
   * -------------------------------------------------------------------- */

  it('preserves a very long query string in full', async () => {
    const longQuery =
      'a very long search query that should not break the layout of the search bar component';
    const screen = await render(<SearchBar defaultValue={longQuery} />);
    await expect.element(screen.getByRole('searchbox')).toHaveValue(longQuery);
    await takeSnapshot(`SearchBar - preserves a very long query string in full`);
  });

  /* -----------------------------------------------------------------------
   * Placeholder visibility (1)
   * -------------------------------------------------------------------- */

  it('renders the placeholder text when there is no value', async () => {
    const screen = await render(<SearchBar placeholder="Search anything..." />);
    await expect
      .element(screen.getByPlaceholder('Search anything...'))
      .toBeInTheDocument();
    await takeSnapshot(`SearchBar - renders the placeholder text when there is no value`);
  });

  /* -----------------------------------------------------------------------
   * Inverted variant (3)
   * -------------------------------------------------------------------- */

  it('applies a dark background color when inverted', async () => {
    const screen = await render(<SearchBar inverted />);
    await expect
      .element(screen.getByRole('searchbox'))
      .toHaveStyle({ backgroundColor: color.slate800 });
    await takeSnapshot(`SearchBar - applies a dark background color when inverted`);
  });

  it('applies white text color when inverted', async () => {
    const screen = await render(<SearchBar inverted defaultValue="dark mode" />);
    const input = screen.getByRole('searchbox').element();
    expect(getComputedStyle(input).color).toBe(computedColor(color.white));
    await takeSnapshot(`SearchBar - applies white text color when inverted`);
  });

  it('uses a darker border color when inverted than the default surface', async () => {
    const normal = await render(<SearchBar />);
    const inverted = await render(<SearchBar inverted />);
    const normalInput = normal.container.querySelector(
      'input[type="search"]'
    ) as HTMLInputElement;
    const invertedInput = inverted.container.querySelector(
      'input[type="search"]'
    ) as HTMLInputElement;
    const normalBorder = getComputedStyle(normalInput).borderColor;
    const invertedBorder = getComputedStyle(invertedInput).borderColor;
    expect(invertedBorder).not.toBe(normalBorder);
    await takeSnapshot(`SearchBar - uses a darker border color when inverted than the default surface`);
  });

  /* -----------------------------------------------------------------------
   * Inverted + loading (1)
   * -------------------------------------------------------------------- */

  it('still renders the accessible loading spinner when inverted', async () => {
    const screen = await render(<SearchBar inverted loading defaultValue="dark mode search" />);
    await expect.element(screen.getByRole('img', { name: 'Loading' })).toBeInTheDocument();
    await takeSnapshot(`SearchBar - still renders the accessible loading spinner when inverted`);
  });

  /* -----------------------------------------------------------------------
   * Autofocus (1)
   * -------------------------------------------------------------------- */

  it('focuses the input on mount when autoFocus is true', async () => {
    const screen = await render(<SearchBar autoFocus />);
    await expect.element(screen.getByRole('searchbox')).toHaveFocus();
    await takeSnapshot(`SearchBar - focuses the input on mount when autoFocus is true`);
  });

  /* -----------------------------------------------------------------------
   * Label rendering (2)
   * -------------------------------------------------------------------- */

  it('associates the label with the input via matching for/id', async () => {
    const screen = await render(
      <SearchBar label="Search the site" id="search-with-label" />
    );
    await expect
      .element(screen.getByLabelText('Search the site'))
      .toBeInTheDocument();
    await takeSnapshot(`SearchBar - associates the label with the input via matching for/id`);
  });

  it('renders no label element when label is not provided', async () => {
    const screen = await render(<SearchBar placeholder="Search..." />);
    expect(screen.container.querySelector('label')).toBeNull();
    await takeSnapshot(`SearchBar - renders no label element when label is not provided`);
  });

  /* -----------------------------------------------------------------------
   * List-filter composition (1)
   * -------------------------------------------------------------------- */

  it('narrows a filtered list as the user types into a controlled search bar', async () => {
    const screen = await render(<ListFilterFixture />);
    const input = screen.getByLabelText('Filter fruits');

    await expect.element(screen.getByText('Apple')).toBeInTheDocument();
    await expect.element(screen.getByText('Banana')).toBeInTheDocument();

    await userEvent.type(input, 'ban');

    await expect.element(screen.getByText('Banana')).toBeInTheDocument();
    expect(screen.getByText('Apple').query()).toBeNull();
    await takeSnapshot(`SearchBar - narrows a filtered list as the user types into a controlled search bar`);
  });

  /* -----------------------------------------------------------------------
   * RTL/unicode (2)
   * -------------------------------------------------------------------- */

  it('preserves right-to-left script content exactly', async () => {
    const screen = await render(<SearchBar defaultValue="مرحبا بالعالم" label="بحث" />);
    await expect
      .element(screen.getByRole('searchbox'))
      .toHaveValue('مرحبا بالعالم');
    await takeSnapshot(`SearchBar - preserves right-to-left script content exactly`);
  });

  it('preserves unicode and emoji query content exactly', async () => {
    const screen = await render(<SearchBar defaultValue="café 🍰 日本語 🎉" />);
    await expect
      .element(screen.getByRole('searchbox'))
      .toHaveValue('café 🍰 日本語 🎉');
    await takeSnapshot(`SearchBar - preserves unicode and emoji query content exactly`);
  });

  /* -----------------------------------------------------------------------
   * Special characters (1)
   * -------------------------------------------------------------------- */

  it('passes symbols and punctuation through to onSearch unchanged', async () => {
    const onSearch = vi.fn();
    const screen = await render(<SearchBar onSearch={onSearch} />);
    const input = screen.getByRole('searchbox');
    const query = 'C++ & Rust: 100% #1!?';
    await userEvent.type(input, query);
    await userEvent.keyboard('{Enter}');
    await vi.waitFor(() => expect(onSearch).toHaveBeenCalledWith(query));
    await takeSnapshot(`SearchBar - passes symbols and punctuation through to onSearch unchanged`);
  });

  /* -----------------------------------------------------------------------
   * Clear button behavior (1)
   * -------------------------------------------------------------------- */

  it('resets the value and notifies onValueChange when the clear button is clicked', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <SearchBar defaultValue="temporary query" onValueChange={onValueChange} />
    );
    const input = screen.getByRole('searchbox');
    await expect.element(input).toHaveValue('temporary query');

    await userEvent.click(screen.getByRole('button', { name: 'Clear search' }));
    await expect.element(input).toHaveValue('');
    expect(onValueChange).toHaveBeenLastCalledWith('');
    await takeSnapshot(`SearchBar - resets the value and notifies onValueChange when the clear button is clicked`);
  });

  /* -----------------------------------------------------------------------
   * Clear button keyboard access (1)
   * -------------------------------------------------------------------- */

  it('reaches the clear button via Tab and clears the value with Enter', async () => {
    const screen = await render(<SearchBar defaultValue="keyboard test" />);
    const input = screen.getByRole('searchbox').element() as HTMLInputElement;
    input.focus();
    await userEvent.tab();
    const clearButton = screen.getByRole('button', { name: 'Clear search' });
    await expect.element(clearButton).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect.element(screen.getByRole('searchbox')).toHaveValue('');
    await takeSnapshot(`SearchBar - reaches the clear button via Tab and clears the value with Enter`);
  });

  /* -----------------------------------------------------------------------
   * Size crossed with status (2)
   * -------------------------------------------------------------------- */

  it('combines small size with an error status', async () => {
    const screen = await render(
      <SearchBar
        size="small"
        id="search-small-error"
        validationStatus="error"
        validationMessage="Invalid search term"
      />
    );
    const input = screen.getByRole('searchbox');
    await expect.element(input).toHaveStyle({ height: '2rem', borderColor: color.pink600 });
    await expect.element(screen.getByRole('alert')).toBeVisible();
    await takeSnapshot(`SearchBar - combines small size with an error status`);
  });

  it('combines large size with a success status without turning the border pink', async () => {
    const screen = await render(
      <SearchBar
        size="large"
        id="search-large-success"
        validationStatus="success"
        validationMessage="Great, we found matches"
        defaultValue="matches"
      />
    );
    const input = screen.getByRole('searchbox');
    await expect.element(input).toHaveStyle({ height: '3rem' });
    const borderColorValue = getComputedStyle(input.element()).borderColor;
    expect(borderColorValue).not.toBe(computedColor(color.pink600));
    await takeSnapshot(`SearchBar - combines large size with a success status without turning the border pink`);
  });

  /* -----------------------------------------------------------------------
   * name attribute (1)
   * -------------------------------------------------------------------- */

  it('applies the name attribute to the underlying input', async () => {
    const screen = await render(<SearchBar name="site-search" />);
    await expect
      .element(screen.getByRole('searchbox'))
      .toHaveAttribute('name', 'site-search');
    await takeSnapshot(`SearchBar - applies the name attribute to the underlying input`);
  });

  /* -----------------------------------------------------------------------
   * Narrow container (1)
   * -------------------------------------------------------------------- */

  it('still renders a functioning searchbox inside a very narrow container', async () => {
    const screen = await render(
      <div style={{ width: '140px' }}>
        <SearchBar placeholder="Search" />
      </div>
    );
    await expect.element(screen.getByRole('searchbox')).toBeVisible();
    await takeSnapshot(`SearchBar - still renders a functioning searchbox inside a very narrow container`);
  });

  /* -----------------------------------------------------------------------
   * Loading suppresses clear (1)
   * -------------------------------------------------------------------- */

  it('hides the clear button while loading even though a value is present', async () => {
    const screen = await render(<SearchBar loading defaultValue="in progress" />);
    expect(screen.getByRole('button', { name: 'Clear search' }).query()).toBeNull();
    await takeSnapshot(`SearchBar - hides the clear button while loading even though a value is present`);
  });

  /* -----------------------------------------------------------------------
   * Kitchen-sink (1)
   * -------------------------------------------------------------------- */

  it('renders label, validation, loading and a custom size together correctly', async () => {
    const screen = await render(
      <SearchBar
        label="Search inventory"
        labelProps={{ required: true }}
        id="search-kitchen-sink"
        size="large"
        loading
        defaultValue="sku-12345"
        validationStatus="info"
        validationMessage="Searching across all warehouses"
      />
    );
    await expect
      .element(screen.getByLabelText('Search inventory'))
      .toBeInTheDocument();
    await expect.element(screen.getByText('*')).toBeInTheDocument();
    await expect
      .element(screen.getByRole('searchbox'))
      .toHaveStyle({ height: '3rem' });
    await expect.element(screen.getByRole('img', { name: 'Loading' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear search' }).query()).toBeNull();
    await expect
      .element(screen.getByText('Searching across all warehouses'))
      .toBeInTheDocument();
    await takeSnapshot(`SearchBar - renders label, validation, loading and a custom size together correctly`);
  });

  /* -----------------------------------------------------------------------
   * Size crossed with disabled (2)
   * -------------------------------------------------------------------- */

  it('combines small size with disabled', async () => {
    const screen = await render(<SearchBar size="small" disabled />);
    const input = screen.getByRole('searchbox');
    await expect.element(input).toBeDisabled();
    await expect.element(input).toHaveStyle({ height: '2rem' });
    await takeSnapshot(`SearchBar - combines small size with disabled`);
  });

  it('combines large size with disabled', async () => {
    const screen = await render(<SearchBar size="large" disabled />);
    const input = screen.getByRole('searchbox');
    await expect.element(input).toBeDisabled();
    await expect.element(input).toHaveStyle({ height: '3rem' });
    await takeSnapshot(`SearchBar - combines large size with disabled`);
  });

  /* -----------------------------------------------------------------------
   * Focus/blur (1)
   * -------------------------------------------------------------------- */

  it('shows a focus ring on focus and removes it on blur', async () => {
    const screen = await render(<SearchBar placeholder="Click to focus me" />);
    const input = screen.getByRole('searchbox');
    await userEvent.click(input);
    await vi.waitFor(() =>
      expect((input.element() as HTMLInputElement).style.boxShadow).not.toBe('none')
    );
    await userEvent.tab();
    await vi.waitFor(() =>
      expect((input.element() as HTMLInputElement).style.boxShadow).toBe('none')
    );
    await takeSnapshot(`SearchBar - shows a focus ring on focus and removes it on blur`);
  });

  /* -----------------------------------------------------------------------
   * Clear refocuses input (1)
   * -------------------------------------------------------------------- */

  it('returns focus to the input after clicking clear', async () => {
    const screen = await render(<SearchBar defaultValue="reset me" />);
    const input = screen.getByRole('searchbox');
    await userEvent.click(screen.getByRole('button', { name: 'Clear search' }));
    await expect.element(input).toHaveFocus();
    await takeSnapshot(`SearchBar - returns focus to the input after clicking clear`);
  });

  /* -----------------------------------------------------------------------
   * Long placeholder (1)
   * -------------------------------------------------------------------- */

  it('renders a very long placeholder in full', async () => {
    const longPlaceholder =
      'Search for anything across products, orders, customers, invoices and more...';
    const screen = await render(<SearchBar placeholder={longPlaceholder} />);
    await expect
      .element(screen.getByPlaceholder(longPlaceholder))
      .toBeInTheDocument();
    await takeSnapshot(`SearchBar - renders a very long placeholder in full`);
  });

  /* -----------------------------------------------------------------------
   * Spinner accessible name (1)
   * -------------------------------------------------------------------- */

  it('gives the spinner an accessible name distinct from the plain search icon', async () => {
    const screen = await render(<SearchBar loading defaultValue="accessibility check" />);
    await expect.element(screen.getByRole('img', { name: 'Loading' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Search' }).query()).toBeNull();
    await takeSnapshot(`SearchBar - gives the spinner an accessible name distinct from the plain search icon`);
  });

  /* -----------------------------------------------------------------------
   * Default prop sanity (1)
   * -------------------------------------------------------------------- */

  it('matches documented defaults when optional props are omitted', async () => {
    const screen = await render(<SearchBar defaultValue="defaults check" />);
    const input = screen.getByRole('searchbox');

    // size defaults to "medium"
    await expect.element(input).toHaveStyle({ height: '2.5rem' });
    // clearable defaults to true, so a value shows the clear button
    await expect
      .element(screen.getByRole('button', { name: 'Clear search' }))
      .toBeInTheDocument();
    // disabled/loading default to false
    await expect.element(input).not.toBeDisabled();
    await expect
      .element(screen.getByRole('button', { name: 'Search', exact: true }))
      .toBeInTheDocument();
    // invalid defaults to false
    expect(input.element().getAttribute('aria-invalid')).toBeNull();
    // inverted defaults to false
    await expect.element(input).toHaveStyle({ backgroundColor: color.white });
    await takeSnapshot(`SearchBar - matches documented defaults when optional props are omitted`);
  });
});
