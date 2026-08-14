import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect, userEvent } from "storybook/test";
import TreeView from "./TreeView";
import type { TreeViewNode } from "./TreeView";
import { color } from "../../tokens/tokens";

const fileTree: TreeViewNode[] = [
  {
    id: "src",
    name: "src",
    children: [
      { id: "src/app.tsx", name: "app.tsx" },
      { id: "src/index.ts", name: "index.ts" },
      {
        id: "src/components",
        name: "components",
        children: [
          { id: "src/components/Button.tsx", name: "Button.tsx" },
          { id: "src/components/Input.tsx", name: "Input.tsx" },
        ],
      },
    ],
  },
  { id: "package.json", name: "package.json" },
  { id: "readme.md", name: "README.md" },
];

const shallowTree: TreeViewNode[] = [
  { id: "a", name: "Alpha" },
  { id: "b", name: "Beta" },
  { id: "c", name: "Gamma" },
];

const nestedTree: TreeViewNode[] = [
  {
    id: "root-folder",
    name: "Project",
    children: [
      {
        id: "docs",
        name: "docs",
        children: [
          { id: "docs/intro.md", name: "intro.md" },
          { id: "docs/api.md", name: "api.md" },
        ],
      },
      {
        id: "lib",
        name: "lib",
        children: [{ id: "lib/utils.ts", name: "utils.ts" }],
      },
    ],
  },
];

const deepTree: TreeViewNode[] = [
  {
    id: "l1",
    name: "Level 1",
    children: [
      {
        id: "l2",
        name: "Level 2",
        children: [
          {
            id: "l3",
            name: "Level 3",
            children: [{ id: "l4", name: "leaf.txt" }],
          },
        ],
      },
    ],
  },
];

const meta = {
  title: "Components/TreeView",
  component: TreeView,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    selectionMode: {
      control: "select",
      options: ["single", "multiple"],
    },
    label: { control: "text" },
    data: { control: "object" },
  },
  args: {
    data: fileTree,
    selectionMode: "single",
    label: "Files",
  },
} satisfies Meta<typeof TreeView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { data: fileTree },
};

export const WithLabel: Story = {
  args: { data: fileTree, label: "Project files" },
};

export const WithoutLabel: Story = {
  args: { data: fileTree, label: undefined },
};

export const ShallowLeaves: Story = {
  args: { data: shallowTree, label: "Items" },
};

export const NestedFolders: Story = {
  args: { data: nestedTree, label: "Nested" },
};

export const DeepNesting: Story = {
  args: { data: deepTree, label: "Deep" },
};

export const DefaultExpanded: Story = {
  args: {
    data: fileTree,
    defaultExpandedValue: ["src"],
    label: "Expanded src",
  },
};

export const DefaultExpandedNested: Story = {
  args: {
    data: nestedTree,
    defaultExpandedValue: ["root-folder", "docs"],
  },
};

export const ControlledExpanded: Story = {
  args: {
    data: fileTree,
    expandedValue: ["src", "src/components"],
  },
};

export const SingleSelection: Story = {
  args: { data: fileTree, selectionMode: "single" },
};

export const MultipleSelection: Story = {
  args: { data: fileTree, selectionMode: "multiple" },
};

export const SingleFile: Story = {
  args: { data: [{ id: "only", name: "only.txt" }], label: "One file" },
};

export const SingleFolder: Story = {
  args: {
    data: [
      {
        id: "folder",
        name: "folder",
        children: [{ id: "folder/a.txt", name: "a.txt" }],
      },
    ],
  },
};

export const EmptyData: Story = {
  args: { data: [], label: "Empty" },
};

export const ManyRoots: Story = {
  args: {
    data: Array.from({ length: 8 }, (_, i) => ({
      id: `root-${i}`,
      name: `Item ${i + 1}`,
    })),
    label: "Many items",
  },
};

export const LongNames: Story = {
  args: {
    data: [
      {
        id: "long",
        name: "very-long-directory-name-that-should-still-render",
        children: [
          {
            id: "long/file",
            name: "extremely-long-file-name-with-many-segments.tsx",
          },
        ],
      },
    ],
  },
};

export const EmojiNames: Story = {
  args: {
    data: [
      {
        id: "emoji",
        name: "📁 docs",
        children: [{ id: "emoji/readme", name: "📄 README.md" }],
      },
    ],
    label: "Emoji tree",
  },
};

export const RTLContent: Story = {
  args: {
    data: [
      {
        id: "rtl",
        name: "المستندات",
        children: [{ id: "rtl/file", name: "ملف.txt" }],
      },
    ],
    label: "شجرة",
  },
};

export const NumericNames: Story = {
  args: {
    data: [
      {
        id: "2024",
        name: "2024",
        children: [
          { id: "2024/01", name: "01" },
          { id: "2024/02", name: "02" },
        ],
      },
    ],
  },
};

export const OnDarkBackground: Story = {
  args: { data: fileTree },
  render: (args) => (
    <div style={{ background: color.slate900, padding: 24, borderRadius: 8 }}>
      <TreeView {...args} />
    </div>
  ),
};

export const NarrowContainer: Story = {
  args: { data: fileTree, defaultExpandedValue: ["src"] },
  render: (args) => (
    <div style={{ width: 200 }}>
      <TreeView {...args} />
    </div>
  ),
};

export const WideContainer: Story = {
  args: { data: nestedTree, defaultExpandedValue: ["root-folder"] },
  render: (args) => (
    <div style={{ width: 480 }}>
      <TreeView {...args} />
    </div>
  ),
};

export const LabelVisible: Story = {
  args: { data: shallowTree, label: "Visible label" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Visible label")).toBeInTheDocument();
  },
};

export const RootNamesVisible: Story = {
  args: { data: fileTree },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("src")).toBeInTheDocument();
    await expect(canvas.getByText("package.json")).toBeInTheDocument();
  },
};

export const CanExpandBranch: Story = {
  args: { data: fileTree },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("src"));
  },
};

export const KitchenSinkExpandedNested: Story = {
  args: {
    data: nestedTree,
    defaultExpandedValue: ["root-folder", "docs", "lib"],
    selectionMode: "multiple",
    label: "Kitchen sink",
  },
};

export const KitchenSinkDeepSingle: Story = {
  args: {
    data: deepTree,
    defaultExpandedValue: ["l1", "l2", "l3"],
    selectionMode: "single",
    label: "Deep expanded",
  },
};

export const TwoIndependentTrees: Story = {
  args: { data: fileTree },
  render: () => (
    <div style={{ display: "flex", gap: 24 }}>
      <TreeView data={shallowTree} label="Shallow" />
      <TreeView data={fileTree} label="Files" defaultExpandedValue={["src"]} />
    </div>
  ),
};

export const ConfigFiles: Story = {
  args: {
    data: [
      { id: "tsconfig", name: "tsconfig.json" },
      { id: "vite", name: "vite.config.ts" },
      { id: "package", name: "package.json" },
    ],
    label: "Config",
  },
};

export const MediaAssets: Story = {
  args: {
    data: [
      {
        id: "assets",
        name: "assets",
        children: [
          { id: "assets/logo.svg", name: "logo.svg" },
          { id: "assets/hero.png", name: "hero.png" },
        ],
      },
    ],
    defaultExpandedValue: ["assets"],
  },
};

export const Monorepo: Story = {
  args: {
    data: [
      {
        id: "packages",
        name: "packages",
        children: [
          {
            id: "packages/ui",
            name: "ui",
            children: [{ id: "packages/ui/index.ts", name: "index.ts" }],
          },
          {
            id: "packages/utils",
            name: "utils",
            children: [{ id: "packages/utils/index.ts", name: "index.ts" }],
          },
        ],
      },
    ],
    defaultExpandedValue: ["packages"],
    label: "Monorepo",
  },
};

export const MixedLeavesAndBranches: Story = {
  args: {
    data: [
      { id: "readme", name: "README.md" },
      {
        id: "src2",
        name: "src",
        children: [{ id: "src2/main.ts", name: "main.ts" }],
      },
      { id: "license", name: "LICENSE" },
    ],
  },
};

export const ExpandedAllBranches: Story = {
  args: {
    data: fileTree,
    defaultExpandedValue: ["src", "src/components"],
    label: "All open",
  },
};

export const SelectionMultipleExpanded: Story = {
  args: {
    data: nestedTree,
    selectionMode: "multiple",
    defaultExpandedValue: ["root-folder"],
  },
};

export const ShortPunchyNames: Story = {
  args: {
    data: [
      {
        id: "app",
        name: "app",
        children: [
          { id: "app/a", name: "a" },
          { id: "app/b", name: "b" },
        ],
      },
    ],
  },
};

export const Dotfiles: Story = {
  args: {
    data: [
      { id: "gitignore", name: ".gitignore" },
      { id: "env", name: ".env" },
      {
        id: "github",
        name: ".github",
        children: [{ id: "github/workflows", name: "workflows" }],
      },
    ],
    label: "Dotfiles",
  },
};

export const TestsFolder: Story = {
  args: {
    data: [
      {
        id: "tests",
        name: "tests",
        children: [
          { id: "tests/a.test.ts", name: "a.test.ts" },
          { id: "tests/b.test.ts", name: "b.test.ts" },
        ],
      },
    ],
    defaultExpandedValue: ["tests"],
  },
};

export const StoriesFolder: Story = {
  args: {
    data: [
      {
        id: "stories",
        name: "stories",
        children: [
          { id: "stories/Button.stories.tsx", name: "Button.stories.tsx" },
        ],
      },
    ],
    defaultExpandedValue: ["stories"],
  },
};

export const LocaleFolders: Story = {
  args: {
    data: [
      {
        id: "i18n",
        name: "i18n",
        children: [
          { id: "i18n/en.json", name: "en.json" },
          { id: "i18n/pt.json", name: "pt.json" },
          { id: "i18n/ar.json", name: "ar.json" },
        ],
      },
    ],
    defaultExpandedValue: ["i18n"],
    label: "Locales",
  },
};

export const ControlledCollapsed: Story = {
  args: { data: fileTree, expandedValue: [] },
};

export const DefaultExpandedDeepLeafPath: Story = {
  args: {
    data: deepTree,
    defaultExpandedValue: ["l1", "l2", "l3"],
  },
};

export const LabelFiles: Story = {
  args: { data: shallowTree, label: "Files" },
};

export const LabelNavigation: Story = {
  args: { data: nestedTree, label: "Navigation" },
};

export const WideSiblingRoots: Story = {
  args: {
    data: [
      {
        id: "left",
        name: "left",
        children: [{ id: "left/a", name: "a.txt" }],
      },
      {
        id: "right",
        name: "right",
        children: [{ id: "right/b", name: "b.txt" }],
      },
    ],
    defaultExpandedValue: ["left", "right"],
  },
};

export const ThreeLevelDocs: Story = {
  args: {
    data: [
      {
        id: "guide",
        name: "guide",
        children: [
          {
            id: "guide/getting-started",
            name: "getting-started",
            children: [
              { id: "guide/getting-started/install.md", name: "install.md" },
            ],
          },
        ],
      },
    ],
    defaultExpandedValue: ["guide", "guide/getting-started"],
  },
};

export const ComponentsTree: Story = {
  args: {
    data: [
      {
        id: "components",
        name: "components",
        children: [
          { id: "components/Breadcrumbs", name: "Breadcrumbs" },
          { id: "components/Pagination", name: "Pagination" },
          { id: "components/Stepper", name: "Stepper" },
          { id: "components/TreeView", name: "TreeView" },
        ],
      },
    ],
    defaultExpandedValue: ["components"],
    label: "Components",
  },
};

export const HooksFolder: Story = {
  args: {
    data: [
      {
        id: "hooks",
        name: "hooks",
        children: [
          { id: "hooks/useAuth.ts", name: "useAuth.ts" },
          { id: "hooks/useTheme.ts", name: "useTheme.ts" },
        ],
      },
    ],
    defaultExpandedValue: ["hooks"],
  },
};

export const PublicAssets: Story = {
  args: {
    data: [
      {
        id: "public",
        name: "public",
        children: [
          { id: "public/favicon.ico", name: "favicon.ico" },
          { id: "public/robots.txt", name: "robots.txt" },
        ],
      },
    ],
    defaultExpandedValue: ["public"],
    label: "Public",
  },
};

export const SelectionSingleExpandedSrc: Story = {
  args: {
    data: fileTree,
    selectionMode: "single",
    defaultExpandedValue: ["src"],
    label: "Select files",
  },
};

export const CollapsedNested: Story = {
  args: {
    data: nestedTree,
    defaultExpandedValue: [],
    label: "Collapsed",
  },
};
