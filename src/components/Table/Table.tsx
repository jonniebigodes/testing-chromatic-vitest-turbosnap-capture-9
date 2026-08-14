import { ark } from '@ark-ui/react/factory';
import type { CSSProperties, ReactNode } from 'react';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';

export interface TableColumn {
  key: string;
  header: string;
  width?: string;
}

export interface TableProps {
  /**
   * Column definitions
   */
  columns: TableColumn[];

  /**
   * Row data keyed by column key
   */
  data: Record<string, ReactNode>[];

  /**
   * Alternating row background colors
   * @default false
   */
  striped?: boolean;

  /**
   * Show borders around cells
   * @default false
   */
  bordered?: boolean;

  /**
   * Reduced cell padding
   * @default false
   */
  compact?: boolean;

  /**
   * Optional caption text above the table
   */
  caption?: string;
}

const Table = ({
  columns,
  data,
  striped = false,
  bordered = false,
  compact = false,
  caption,
}: TableProps) => {
  const cellPadding = compact ? `${spacing[1]} ${spacing[2]}` : `${spacing[3]} ${spacing[4]}`;
  const borderStyle = bordered ? `1px solid ${color.slate300}` : 'none';

  const tableStyle: CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: compact ? fontSize[12] : fontSize[14],
    color: color.slate800,
    backgroundColor: color.white,
    border: bordered ? `1px solid ${color.slate300}` : 'none',
  };

  const thStyle: CSSProperties = {
    textAlign: 'left',
    padding: cellPadding,
    fontWeight: fontWeight.semibold,
    backgroundColor: color.slate100,
    borderBottom: `2px solid ${color.slate300}`,
    border: bordered ? borderStyle : undefined,
    borderBottomWidth: bordered ? 2 : undefined,
  };

  const captionStyle: CSSProperties = {
    captionSide: 'top',
    textAlign: 'left',
    paddingBottom: spacing[3],
    fontWeight: fontWeight.semibold,
    fontSize: fontSize[16],
    color: color.slate900,
  };

  return (
    <ark.table style={tableStyle}>
      {caption !== undefined ? <ark.caption style={captionStyle}>{caption}</ark.caption> : null}
      <ark.thead>
        <ark.tr>
          {columns.map((col) => (
            <ark.th key={col.key} style={{ ...thStyle, width: col.width }}>
              {col.header}
            </ark.th>
          ))}
        </ark.tr>
      </ark.thead>
      <ark.tbody>
        {data.map((row, rowIndex) => {
          const rowBg =
            striped && rowIndex % 2 === 1 ? color.slate50 : color.white;
          const tdStyle: CSSProperties = {
            padding: cellPadding,
            backgroundColor: rowBg,
            borderBottom: `1px solid ${color.slate200}`,
            border: bordered ? borderStyle : undefined,
          };
          return (
            <ark.tr key={rowIndex}>
              {columns.map((col) => (
                <ark.td key={col.key} style={tdStyle}>
                  {row[col.key]}
                </ark.td>
              ))}
            </ark.tr>
          );
        })}
      </ark.tbody>
    </ark.table>
  );
};

export default Table;
