import { ark } from '@ark-ui/react/factory';
import type { CSSProperties } from 'react';
import {
  color,
  fontSize,
  fontWeight,
  lineHeight,
  spacing,
} from '../../tokens/tokens';

export interface ListItem {
  id: string;
  label: string;
  description?: string;
}

export interface ListProps {
  /**
   * Items to render in the list
   */
  items: ListItem[];

  /**
   * Whether to render an ordered (ol) list instead of unordered (ul)
   */
  ordered?: boolean;

  /**
   * Size of the list items: 'small', 'medium', or 'large'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Whether to show dividers between items
   */
  divided?: boolean;

  /**
   * Color of the list markers
   */
  markerColor?: string;
}

const getSizeStyles = (size: 'small' | 'medium' | 'large'): CSSProperties => {
  const sizeMap = {
    small: {
      fontSize: fontSize[12],
      lineHeight: lineHeight[20],
      gap: spacing[1],
      paddingBlock: spacing[1],
    },
    medium: {
      fontSize: fontSize[14],
      lineHeight: lineHeight[24],
      gap: spacing[2],
      paddingBlock: spacing[2],
    },
    large: {
      fontSize: fontSize[16],
      lineHeight: lineHeight[28],
      gap: spacing[3],
      paddingBlock: spacing[3],
    },
  };

  return sizeMap[size];
};

const List = ({
  items,
  ordered = false,
  size = 'medium',
  divided = false,
  markerColor = color.slate500,
}: ListProps) => {
  const sizeStyles = getSizeStyles(size);
  const ListRoot = ordered ? ark.ol : ark.ul;

  return (
    <ListRoot
      style={{
        margin: 0,
        padding: 0,
        paddingInlineStart: spacing[5],
        listStylePosition: 'outside',
        color: markerColor,
        display: 'flex',
        flexDirection: 'column',
        gap: divided ? 0 : sizeStyles.gap,
      }}
    >
      {items.map((item, index) => (
        <ark.li
          key={item.id}
          style={{
            fontSize: sizeStyles.fontSize,
            lineHeight: sizeStyles.lineHeight,
            paddingBlock: sizeStyles.paddingBlock,
            color: color.slate800,
            borderBottom:
              divided && index < items.length - 1
                ? `1px solid ${color.slate200}`
                : 'none',
          }}
        >
          <ark.span
            style={{
              display: 'block',
              fontWeight: fontWeight.medium,
              color: color.slate800,
            }}
          >
            {item.label}
          </ark.span>
          {item.description ? (
            <ark.span
              style={{
                display: 'block',
                marginTop: spacing[0.5],
                fontSize:
                  size === 'small'
                    ? fontSize[11]
                    : size === 'large'
                      ? fontSize[14]
                      : fontSize[12],
                lineHeight: lineHeight[20],
                fontWeight: fontWeight.regular,
                color: color.slate500,
              }}
            >
              {item.description}
            </ark.span>
          ) : null}
        </ark.li>
      ))}
    </ListRoot>
  );
};

export default List;
