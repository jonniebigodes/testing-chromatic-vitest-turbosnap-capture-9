import {
  TreeView as ArkTreeView,
  createTreeCollection,
} from '@ark-ui/react/tree-view';
import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import {
  color,
  fontSize,
  fontWeight,
  lineHeight,
  spacing,
} from '../../tokens/tokens';

export interface TreeViewNode {
  id: string;
  name: string;
  children?: TreeViewNode[];
}

export interface TreeViewProps {
  /**
   * Tree node data (top-level children)
   */
  data: TreeViewNode[];

  /**
   * Controlled expanded node ids
   */
  expandedValue?: string[];

  /**
   * Initial expanded node ids (uncontrolled)
   */
  defaultExpandedValue?: string[];

  /**
   * Called when expanded nodes change
   */
  onExpandedChange?: (details: {
    expandedValue: string[];
  }) => void;

  /**
   * Selection mode for nodes
   * @default "single"
   */
  selectionMode?: 'single' | 'multiple';

  /**
   * Optional label above the tree
   */
  label?: string;
}

const ChevronIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M9 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FolderIcon = ({ open }: { open?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
    {open ? (
      <path
        d="M3 8h6l2 2h10v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill={color.blue50}
      />
    ) : (
      <path
        d="M3 7a2 2 0 012-2h5l2 2h9a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    )}
  </svg>
);

const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V9l-5-6z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path d="M14 3v6h6" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

type NodeProviderProps = {
  node: TreeViewNode;
  indexPath: number[];
};

const TreeNode = ({ node, indexPath }: NodeProviderProps) => {
  const branchControlStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
    borderRadius: spacing[1],
    userSelect: 'none',
    cursor: 'pointer',
    width: '100%',
    border: 'none',
    background: 'transparent',
    font: 'inherit',
    color: color.slate800,
    textAlign: 'start',
    paddingBlock: spacing[1],
    paddingInlineEnd: spacing[3],
    paddingInlineStart: `calc(${spacing[3]} + (var(--depth, 1) - 1) * ${spacing[4]})`,
    boxSizing: 'border-box',
  };

  const itemStyle: CSSProperties = {
    ...branchControlStyle,
  };

  const textStyle: CSSProperties = {
    flex: 1,
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[2],
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: fontSize[14],
    lineHeight: lineHeight[20],
    fontWeight: fontWeight.regular,
  };

  const indicatorStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: color.slate500,
    flexShrink: 0,
  };

  return (
    <ArkTreeView.NodeProvider node={node} indexPath={indexPath}>
      <ArkTreeView.NodeContext>
        {(nodeState) =>
          node.children ? (
            <ArkTreeView.Branch>
              <ArkTreeView.BranchControl style={branchControlStyle}>
                <ArkTreeView.BranchIndicator
                  style={{
                    ...indicatorStyle,
                    transform: nodeState.expanded ? 'rotate(90deg)' : 'none',
                    transition: 'transform 150ms ease',
                  }}
                >
                  <ChevronIcon />
                </ArkTreeView.BranchIndicator>
                <ArkTreeView.BranchText style={textStyle}>
                  <FolderIcon open={nodeState.expanded} />
                  {node.name}
                </ArkTreeView.BranchText>
              </ArkTreeView.BranchControl>
              <ArkTreeView.BranchContent
                style={{ position: 'relative' }}
              >
                <ArkTreeView.BranchIndentGuide
                  style={{
                    position: 'absolute',
                    height: '100%',
                    width: '1px',
                    backgroundColor: color.slate200,
                    insetInlineStart: `calc(${spacing[3]} + (var(--depth, 1) - 1) * ${spacing[4]} + ${spacing[2]})`,
                  }}
                />
                {node.children.map((child, index) => (
                  <TreeNode
                    key={child.id}
                    node={child}
                    indexPath={[...indexPath, index]}
                  />
                ))}
              </ArkTreeView.BranchContent>
            </ArkTreeView.Branch>
          ) : (
            <ArkTreeView.Item style={itemStyle}>
              <ArkTreeView.ItemText style={textStyle}>
                <FileIcon />
                {node.name}
              </ArkTreeView.ItemText>
            </ArkTreeView.Item>
          )
        }
      </ArkTreeView.NodeContext>
    </ArkTreeView.NodeProvider>
  );
};

const TreeView = ({
  data,
  expandedValue,
  defaultExpandedValue,
  onExpandedChange,
  selectionMode = 'single',
  label,
}: TreeViewProps) => {
  const collection = useMemo(
    () =>
      createTreeCollection<TreeViewNode>({
        nodeToValue: (node) => node.id,
        nodeToString: (node) => node.name,
        rootNode: {
          id: 'ROOT',
          name: '',
          children: data,
        },
      }),
    [data],
  );

  const rootStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[2],
    width: '100%',
    maxWidth: '320px',
    fontFamily: 'inherit',
    color: color.slate800,
  };

  const labelStyle: CSSProperties = {
    fontSize: fontSize[14],
    lineHeight: lineHeight[20],
    fontWeight: fontWeight.medium,
    color: color.slate800,
    userSelect: 'none',
  };

  const treeStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    fontSize: fontSize[14],
    lineHeight: lineHeight[20],
    border: `1px solid ${color.slate200}`,
    borderRadius: spacing[2],
    backgroundColor: color.white,
    padding: spacing[1],
  };

  return (
    <ArkTreeView.Root
      collection={collection}
      expandedValue={expandedValue}
      defaultExpandedValue={
        expandedValue === undefined ? defaultExpandedValue : undefined
      }
      onExpandedChange={onExpandedChange}
      selectionMode={selectionMode}
      style={rootStyle}
    >
      {label ? (
        <ArkTreeView.Label style={labelStyle}>{label}</ArkTreeView.Label>
      ) : null}
      <ArkTreeView.Tree style={treeStyle}>
        {collection.rootNode.children?.map((node, index) => (
          <TreeNode key={node.id} node={node} indexPath={[index]} />
        ))}
      </ArkTreeView.Tree>
    </ArkTreeView.Root>
  );
};

export default TreeView;
