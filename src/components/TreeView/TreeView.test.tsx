import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import TreeView from './TreeView';
import type { TreeViewNode } from './TreeView';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  /* delay: 1000 + Math.floor(Math.random() * 14001), */
});

const locatorFor = (element: HTMLElement) => page.elementLocator(element);

const fileTree: TreeViewNode[] = [
  {
    id: 'src',
    name: 'src',
    children: [
      { id: 'src/app.tsx', name: 'app.tsx' },
      { id: 'src/index.ts', name: 'index.ts' },
      {
        id: 'src/components',
        name: 'components',
        children: [
          { id: 'src/components/Button.tsx', name: 'Button.tsx' },
          { id: 'src/components/Input.tsx', name: 'Input.tsx' },
        ],
      },
    ],
  },
  { id: 'package.json', name: 'package.json' },
  { id: 'readme.md', name: 'README.md' },
];

const shallowTree: TreeViewNode[] = [
  { id: 'a', name: 'Alpha' },
  { id: 'b', name: 'Beta' },
  { id: 'c', name: 'Gamma' },
];

const nestedTree: TreeViewNode[] = [
  {
    id: 'root-folder',
    name: 'Project',
    children: [
      {
        id: 'docs',
        name: 'docs',
        children: [
          { id: 'docs/intro.md', name: 'intro.md' },
          { id: 'docs/api.md', name: 'api.md' },
        ],
      },
      {
        id: 'lib',
        name: 'lib',
        children: [{ id: 'lib/utils.ts', name: 'utils.ts' }],
      },
    ],
  },
];

const getRoot = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement;

describe('TreeView', () => {
  it('renders root node names', async () => {
    const screen = await render(<TreeView data={fileTree} />);
    await expect.element(screen.getByText('src')).toBeInTheDocument();
    await expect.element(screen.getByText('package.json')).toBeInTheDocument();
    await takeSnapshot(`TreeView - renders root node names`);
  });

  it('renders an optional label', async () => {
    const screen = await render(<TreeView data={fileTree} label="Files" />);
    await expect.element(screen.getByText('Files')).toBeInTheDocument();
    await takeSnapshot(`TreeView - renders an optional label`);
  });

  it('does not render a label when omitted', async () => {
    const screen = await render(<TreeView data={shallowTree} />);
    expect(screen.container.textContent).toBe('AlphaBetaGamma');
    await takeSnapshot(`TreeView - does not render a label when omitted`);
  });

  it('uses flex column layout on the root', async () => {
    const screen = await render(<TreeView data={fileTree} />);
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
    });
    await takeSnapshot(`TreeView - uses flex column layout on the root`);
  });

  it('applies max width on the root', async () => {
    const screen = await render(<TreeView data={fileTree} />);
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      maxWidth: '320px',
    });
    await takeSnapshot(`TreeView - applies max width on the root`);
  });

  it('styles the label with medium font weight', async () => {
    const screen = await render(<TreeView data={fileTree} label="Files" />);
    await expect.element(screen.getByText('Files')).toHaveStyle({
      fontWeight: String(fontWeight.medium),
      fontSize: fontSize[14],
    });
    await takeSnapshot(`TreeView - styles the label with medium font weight`);
  });

  it('renders shallow leaf nodes', async () => {
    const screen = await render(<TreeView data={shallowTree} />);
    await expect.element(screen.getByText('Alpha')).toBeInTheDocument();
    await expect.element(screen.getByText('Beta')).toBeInTheDocument();
    await expect.element(screen.getByText('Gamma')).toBeInTheDocument();
    await takeSnapshot(`TreeView - renders shallow leaf nodes`);
  });

  it('expands a branch when defaultExpandedValue is set', async () => {
    const screen = await render(
      <TreeView data={fileTree} defaultExpandedValue={['src']} />,
    );
    await expect.element(screen.getByText('app.tsx')).toBeInTheDocument();
    await takeSnapshot(
      `TreeView - expands a branch when defaultExpandedValue is set`,
    );
  });

  it('expands nested branches when provided', async () => {
    const screen = await render(
      <TreeView
        data={nestedTree}
        defaultExpandedValue={['root-folder', 'docs']}
      />,
    );
    await expect.element(screen.getByText('intro.md')).toBeInTheDocument();
    await takeSnapshot(`TreeView - expands nested branches when provided`);
  });

  it('honors controlled expandedValue', async () => {
    const screen = await render(
      <TreeView data={fileTree} expandedValue={['src']} />,
    );
    await expect.element(screen.getByText('index.ts')).toBeInTheDocument();
    await takeSnapshot(`TreeView - honors controlled expandedValue`);
  });

  it('calls onExpandedChange when a branch is toggled', async () => {
    const onExpandedChange = vi.fn();
    const screen = await render(
      <TreeView data={fileTree} onExpandedChange={onExpandedChange} />,
    );
    await screen.getByText('src').click();
    await vi.waitFor(() => expect(onExpandedChange).toHaveBeenCalled());
    await takeSnapshot(
      `TreeView - calls onExpandedChange when a branch is toggled`,
    );
  });

  it('renders with single selection mode', async () => {
    const screen = await render(
      <TreeView data={fileTree} selectionMode="single" />,
    );
    await expect.element(screen.getByText('src')).toBeInTheDocument();
    await takeSnapshot(`TreeView - renders with single selection mode`);
  });

  it('renders with multiple selection mode', async () => {
    const screen = await render(
      <TreeView data={fileTree} selectionMode="multiple" />,
    );
    await expect.element(screen.getByText('src')).toBeInTheDocument();
    await takeSnapshot(`TreeView - renders with multiple selection mode`);
  });

  it('renders a single file node', async () => {
    const screen = await render(
      <TreeView data={[{ id: 'only', name: 'only.txt' }]} />,
    );
    await expect.element(screen.getByText('only.txt')).toBeInTheDocument();
    await takeSnapshot(`TreeView - renders a single file node`);
  });

  it('renders empty data without throwing', async () => {
    const screen = await render(<TreeView data={[]} label="Empty" />);
    await expect.element(screen.getByText('Empty')).toBeInTheDocument();
    await takeSnapshot(`TreeView - renders empty data without throwing`);
  });

  it('preserves emoji content in names', async () => {
    const screen = await render(
      <TreeView
        data={[
          {
            id: 'emoji',
            name: '📁 docs',
            children: [{ id: 'emoji/readme', name: '📄 README.md' }],
          },
        ]}
        defaultExpandedValue={['emoji']}
      />,
    );
    await expect.element(screen.getByText('📁 docs')).toBeInTheDocument();
    await expect.element(screen.getByText('📄 README.md')).toBeInTheDocument();
    await takeSnapshot(`TreeView - preserves emoji content in names`);
  });

  it('preserves RTL unicode content', async () => {
    const screen = await render(
      <TreeView
        data={[
          {
            id: 'rtl',
            name: 'المستندات',
            children: [{ id: 'rtl/file', name: 'ملف.txt' }],
          },
        ]}
        defaultExpandedValue={['rtl']}
      />,
    );
    await expect.element(screen.getByText('المستندات')).toBeInTheDocument();
    await expect.element(screen.getByText('ملف.txt')).toBeInTheDocument();
    await takeSnapshot(`TreeView - preserves RTL unicode content`);
  });

  it('renders long names in full', async () => {
    const long = 'very-long-directory-name-that-should-still-render';
    const screen = await render(
      <TreeView
        data={[
          {
            id: 'long',
            name: long,
            children: [{ id: 'long/file', name: 'file.tsx' }],
          },
        ]}
      />,
    );
    await expect.element(screen.getByText(long)).toBeInTheDocument();
    await takeSnapshot(`TreeView - renders long names in full`);
  });

  it('renders numeric names correctly', async () => {
    const screen = await render(
      <TreeView
        data={[
          {
            id: '2024',
            name: '2024',
            children: [{ id: '2024/01', name: '01' }],
          },
        ]}
        defaultExpandedValue={['2024']}
      />,
    );
    await expect.element(screen.getByText('2024')).toBeInTheDocument();
    await expect.element(screen.getByText('01')).toBeInTheDocument();
    await takeSnapshot(`TreeView - renders numeric names correctly`);
  });

  it('styles the tree panel with a slate200 border', async () => {
    const screen = await render(<TreeView data={shallowTree} />);
    const tree = screen.container.querySelector('[role="tree"]') as HTMLElement;
    await expect.element(locatorFor(tree)).toHaveStyle({
      border: `1px solid ${color.slate200}`,
    });
    await takeSnapshot(`TreeView - styles the tree panel with a slate200 border`);
  });

  it('applies border radius from spacing tokens on the tree', async () => {
    const screen = await render(<TreeView data={shallowTree} />);
    const tree = screen.container.querySelector('[role="tree"]') as HTMLElement;
    await expect.element(locatorFor(tree)).toHaveStyle({
      borderRadius: spacing[2],
    });
    await takeSnapshot(
      `TreeView - applies border radius from spacing tokens on the tree`,
    );
  });

  it('keeps two independent trees from sharing content', async () => {
    const screen = await render(
      <>
        <TreeView data={shallowTree} label="A" />
        <TreeView data={fileTree} label="B" />
      </>,
    );
    await expect.element(screen.getByText('Alpha')).toBeInTheDocument();
    await expect.element(screen.getByText('src')).toBeInTheDocument();
    await takeSnapshot(
      `TreeView - keeps two independent trees from sharing content`,
    );
  });

  it('updates when re-rendered with new data', async () => {
    const screen = await render(<TreeView data={shallowTree} />);
    await screen.rerender(
      <TreeView data={[{ id: 'z', name: 'Zeta' }]} />,
    );
    await expect.element(screen.getByText('Zeta')).toBeInTheDocument();
    await takeSnapshot(`TreeView - updates when re-rendered with new data`);
  });

  it('updates label when re-rendered', async () => {
    const screen = await render(<TreeView data={shallowTree} label="Old" />);
    await screen.rerender(<TreeView data={shallowTree} label="New" />);
    await expect.element(screen.getByText('New')).toBeInTheDocument();
    await takeSnapshot(`TreeView - updates label when re-rendered`);
  });

  it('renders many root items', async () => {
    const data = Array.from({ length: 8 }, (_, i) => ({
      id: `root-${i}`,
      name: `Item ${i + 1}`,
    }));
    const screen = await render(<TreeView data={data} />);
    await expect.element(screen.getByText('Item 8')).toBeInTheDocument();
    await takeSnapshot(`TreeView - renders many root items`);
  });

  it('renders kitchen-sink expanded nested tree', async () => {
    const screen = await render(
      <TreeView
        data={nestedTree}
        defaultExpandedValue={['root-folder', 'docs', 'lib']}
        selectionMode="multiple"
        label="Kitchen sink"
      />,
    );
    await expect.element(screen.getByText('Kitchen sink')).toBeInTheDocument();
    await expect.element(screen.getByText('utils.ts')).toBeInTheDocument();
    await takeSnapshot(`TreeView - renders kitchen-sink expanded nested tree`);
  });

  it('renders deep nesting when expanded', async () => {
    const deep: TreeViewNode[] = [
      {
        id: 'l1',
        name: 'Level 1',
        children: [
          {
            id: 'l2',
            name: 'Level 2',
            children: [
              {
                id: 'l3',
                name: 'Level 3',
                children: [{ id: 'l4', name: 'leaf.txt' }],
              },
            ],
          },
        ],
      },
    ];
    const screen = await render(
      <TreeView data={deep} defaultExpandedValue={['l1', 'l2', 'l3']} />,
    );
    await expect.element(screen.getByText('leaf.txt')).toBeInTheDocument();
    await takeSnapshot(`TreeView - renders deep nesting when expanded`);
  });

  it('renders config file leaves', async () => {
    const screen = await render(
      <TreeView
        data={[
          { id: 'tsconfig', name: 'tsconfig.json' },
          { id: 'vite', name: 'vite.config.ts' },
        ]}
      />,
    );
    await expect.element(screen.getByText('tsconfig.json')).toBeInTheDocument();
    await takeSnapshot(`TreeView - renders config file leaves`);
  });

  it('renders media assets when expanded', async () => {
    const screen = await render(
      <TreeView
        data={[
          {
            id: 'assets',
            name: 'assets',
            children: [
              { id: 'assets/logo.svg', name: 'logo.svg' },
              { id: 'assets/hero.png', name: 'hero.png' },
            ],
          },
        ]}
        defaultExpandedValue={['assets']}
      />,
    );
    await expect.element(screen.getByText('logo.svg')).toBeInTheDocument();
    await takeSnapshot(`TreeView - renders media assets when expanded`);
  });

  it('renders monorepo packages structure', async () => {
    const screen = await render(
      <TreeView
        data={[
          {
            id: 'packages',
            name: 'packages',
            children: [
              {
                id: 'packages/ui',
                name: 'ui',
                children: [{ id: 'packages/ui/index.ts', name: 'index.ts' }],
              },
            ],
          },
        ]}
        defaultExpandedValue={['packages', 'packages/ui']}
        label="Monorepo"
      />,
    );
    await expect.element(screen.getByText('ui')).toBeInTheDocument();
    await expect.element(screen.getByText('index.ts')).toBeInTheDocument();
    await takeSnapshot(`TreeView - renders monorepo packages structure`);
  });

  it('renders mixed leaves and branches', async () => {
    const screen = await render(
      <TreeView
        data={[
          { id: 'readme', name: 'README.md' },
          {
            id: 'src2',
            name: 'src',
            children: [{ id: 'src2/main.ts', name: 'main.ts' }],
          },
          { id: 'license', name: 'LICENSE' },
        ]}
      />,
    );
    await expect.element(screen.getByText('README.md')).toBeInTheDocument();
    await expect.element(screen.getByText('LICENSE')).toBeInTheDocument();
    await takeSnapshot(`TreeView - renders mixed leaves and branches`);
  });

  it('renders short punchy names', async () => {
    const screen = await render(
      <TreeView
        data={[
          {
            id: 'app',
            name: 'app',
            children: [
              { id: 'app/a', name: 'a' },
              { id: 'app/b', name: 'b' },
            ],
          },
        ]}
        defaultExpandedValue={['app']}
      />,
    );
    await expect.element(screen.getByText('a', { exact: true })).toBeInTheDocument();
    await takeSnapshot(`TreeView - renders short punchy names`);
  });

  it('renders dotfiles', async () => {
    const screen = await render(
      <TreeView
        data={[
          { id: 'gitignore', name: '.gitignore' },
          { id: 'env', name: '.env' },
        ]}
        label="Dotfiles"
      />,
    );
    await expect.element(screen.getByText('.gitignore')).toBeInTheDocument();
    await takeSnapshot(`TreeView - renders dotfiles`);
  });

  it('renders tests folder contents when expanded', async () => {
    const screen = await render(
      <TreeView
        data={[
          {
            id: 'tests',
            name: 'tests',
            children: [
              { id: 'tests/a.test.ts', name: 'a.test.ts' },
              { id: 'tests/b.test.ts', name: 'b.test.ts' },
            ],
          },
        ]}
        defaultExpandedValue={['tests']}
      />,
    );
    await expect.element(screen.getByText('a.test.ts')).toBeInTheDocument();
    await takeSnapshot(
      `TreeView - renders tests folder contents when expanded`,
    );
  });

  it('renders locale files when expanded', async () => {
    const screen = await render(
      <TreeView
        data={[
          {
            id: 'i18n',
            name: 'i18n',
            children: [
              { id: 'i18n/en.json', name: 'en.json' },
              { id: 'i18n/pt.json', name: 'pt.json' },
            ],
          },
        ]}
        defaultExpandedValue={['i18n']}
        label="Locales"
      />,
    );
    await expect.element(screen.getByText('en.json')).toBeInTheDocument();
    await takeSnapshot(`TreeView - renders locale files when expanded`);
  });

  it('renders controlled collapsed tree without children visible', async () => {
    const screen = await render(
      <TreeView data={fileTree} expandedValue={[]} />,
    );
    await expect.element(screen.getByText('src')).toBeInTheDocument();
    const openBranches = screen.container.querySelectorAll(
      '[data-part="branch-content"][data-state="open"]',
    );
    expect(openBranches.length).toBe(0);
    await takeSnapshot(
      `TreeView - renders controlled collapsed tree without children visible`,
    );
  });

  it('styles root with slate800 color', async () => {
    const screen = await render(<TreeView data={shallowTree} />);
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      color: color.slate800,
    });
    await takeSnapshot(`TreeView - styles root with slate800 color`);
  });

  it('applies gap spacing on the root', async () => {
    const screen = await render(<TreeView data={fileTree} label="Files" />);
    await expect.element(locatorFor(getRoot(screen.container))).toHaveStyle({
      gap: spacing[2],
    });
    await takeSnapshot(`TreeView - applies gap spacing on the root`);
  });

  it('updates expandedValue when re-rendered controlled', async () => {
    const screen = await render(
      <TreeView data={fileTree} expandedValue={[]} />,
    );
    await screen.rerender(
      <TreeView data={fileTree} expandedValue={['src']} />,
    );
    await expect.element(screen.getByText('app.tsx')).toBeInTheDocument();
    await takeSnapshot(
      `TreeView - updates expandedValue when re-rendered controlled`,
    );
  });

  it('renders README leaf at the root', async () => {
    const screen = await render(<TreeView data={fileTree} />);
    await expect.element(screen.getByText('README.md')).toBeInTheDocument();
    await takeSnapshot(`TreeView - renders README leaf at the root`);
  });

  it('renders three-level docs path when expanded', async () => {
    const screen = await render(
      <TreeView
        data={[
          {
            id: 'guide',
            name: 'guide',
            children: [
              {
                id: 'guide/getting-started',
                name: 'getting-started',
                children: [
                  {
                    id: 'guide/getting-started/install.md',
                    name: 'install.md',
                  },
                ],
              },
            ],
          },
        ]}
        defaultExpandedValue={['guide', 'guide/getting-started']}
      />,
    );
    await expect.element(screen.getByText('install.md')).toBeInTheDocument();
    await takeSnapshot(
      `TreeView - renders three-level docs path when expanded`,
    );
  });

  it('renders wide sibling roots expanded', async () => {
    const screen = await render(
      <TreeView
        data={[
          {
            id: 'left',
            name: 'left',
            children: [{ id: 'left/a', name: 'a.txt' }],
          },
          {
            id: 'right',
            name: 'right',
            children: [{ id: 'right/b', name: 'b.txt' }],
          },
        ]}
        defaultExpandedValue={['left', 'right']}
      />,
    );
    await expect.element(screen.getByText('a.txt')).toBeInTheDocument();
    await expect.element(screen.getByText('b.txt')).toBeInTheDocument();
    await takeSnapshot(`TreeView - renders wide sibling roots expanded`);
  });

  it('renders stories folder contents', async () => {
    const screen = await render(
      <TreeView
        data={[
          {
            id: 'stories',
            name: 'stories',
            children: [
              {
                id: 'stories/Button.stories.tsx',
                name: 'Button.stories.tsx',
              },
            ],
          },
        ]}
        defaultExpandedValue={['stories']}
      />,
    );
    await expect
      .element(screen.getByText('Button.stories.tsx'))
      .toBeInTheDocument();
    await takeSnapshot(`TreeView - renders stories folder contents`);
  });

  it('defaults selectionMode to single without error', async () => {
    const screen = await render(<TreeView data={fileTree} />);
    await expect.element(screen.getByText('src')).toBeInTheDocument();
    await takeSnapshot(
      `TreeView - defaults selectionMode to single without error`,
    );
  });

  it('renders nested Project folder name', async () => {
    const screen = await render(<TreeView data={nestedTree} />);
    await expect.element(screen.getByText('Project')).toBeInTheDocument();
    await takeSnapshot(`TreeView - renders nested Project folder name`);
  });

  it('renders components tree names', async () => {
    const screen = await render(
      <TreeView
        data={[
          {
            id: 'components',
            name: 'components',
            children: [
              { id: 'components/Breadcrumbs', name: 'Breadcrumbs' },
              { id: 'components/Pagination', name: 'Pagination' },
            ],
          },
        ]}
        defaultExpandedValue={['components']}
        label="Components"
      />,
    );
    await expect.element(screen.getByText('Breadcrumbs')).toBeInTheDocument();
    await takeSnapshot(`TreeView - renders components tree names`);
  });

  it('renders hooks folder contents', async () => {
    const screen = await render(
      <TreeView
        data={[
          {
            id: 'hooks',
            name: 'hooks',
            children: [
              { id: 'hooks/useAuth.ts', name: 'useAuth.ts' },
              { id: 'hooks/useTheme.ts', name: 'useTheme.ts' },
            ],
          },
        ]}
        defaultExpandedValue={['hooks']}
      />,
    );
    await expect.element(screen.getByText('useAuth.ts')).toBeInTheDocument();
    await takeSnapshot(`TreeView - renders hooks folder contents`);
  });

  it('renders public assets when expanded', async () => {
    const screen = await render(
      <TreeView
        data={[
          {
            id: 'public',
            name: 'public',
            children: [
              { id: 'public/favicon.ico', name: 'favicon.ico' },
              { id: 'public/robots.txt', name: 'robots.txt' },
            ],
          },
        ]}
        defaultExpandedValue={['public']}
        label="Public"
      />,
    );
    await expect.element(screen.getByText('favicon.ico')).toBeInTheDocument();
    await takeSnapshot(`TreeView - renders public assets when expanded`);
  });

  it('renders selection single with expanded src', async () => {
    const screen = await render(
      <TreeView
        data={fileTree}
        selectionMode="single"
        defaultExpandedValue={['src']}
        label="Select files"
      />,
    );
    await expect.element(screen.getByText('Select files')).toBeInTheDocument();
    await expect.element(screen.getByText('app.tsx')).toBeInTheDocument();
    await takeSnapshot(
      `TreeView - renders selection single with expanded src`,
    );
  });

  it('renders collapsed nested without children', async () => {
    const screen = await render(
      <TreeView data={nestedTree} defaultExpandedValue={[]} label="Collapsed" />,
    );
    await expect.element(screen.getByText('Project')).toBeInTheDocument();
    const openBranches = screen.container.querySelectorAll(
      '[data-part="branch-content"][data-state="open"]',
    );
    expect(openBranches.length).toBe(0);
    await takeSnapshot(
      `TreeView - renders collapsed nested without children`,
    );
  });
});
