import { Pagination as ArkPagination } from '@ark-ui/react/pagination';
import type { CSSProperties } from 'react';
import {
  color,
  fontSize,
  fontWeight,
  spacing,
} from '../../tokens/tokens';

export interface PaginationProps {
  /**
   * Total number of data items
   */
  count: number;

  /**
   * Number of data items per page
   * @default 10
   */
  pageSize?: number;

  /**
   * Controlled active page
   */
  page?: number;

  /**
   * Initial active page (uncontrolled)
   * @default 1
   */
  defaultPage?: number;

  /**
   * Called when the page number changes
   */
  onPageChange?: (details: { page: number; pageSize: number }) => void;

  /**
   * Number of pages to show beside the active page
   * @default 1
   */
  siblingCount?: number;

  /**
   * Size of the pagination controls: 'small', 'medium', or 'large'
   */
  size?: 'small' | 'medium' | 'large';
}

const getSizeStyles = (size: 'small' | 'medium' | 'large') => {
  const sizeMap = {
    small: {
      fontSize: fontSize[12],
      minWidth: spacing[6],
      height: spacing[6],
      paddingInline: spacing[1],
      gap: spacing[0.5],
    },
    medium: {
      fontSize: fontSize[14],
      minWidth: spacing[8],
      height: spacing[8],
      paddingInline: spacing[2],
      gap: spacing[1],
    },
    large: {
      fontSize: fontSize[16],
      minWidth: spacing[10],
      height: spacing[10],
      paddingInline: spacing[3],
      gap: spacing[2],
    },
  };

  return sizeMap[size];
};

const Pagination = ({
  count,
  pageSize = 10,
  page,
  defaultPage = 1,
  onPageChange,
  siblingCount = 1,
  size = 'medium',
}: PaginationProps) => {
  const sizeStyles = getSizeStyles(size);

  const rootStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: sizeStyles.gap,
    fontFamily: 'inherit',
  };

  const buttonStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: sizeStyles.minWidth,
    height: sizeStyles.height,
    paddingInline: sizeStyles.paddingInline,
    fontSize: sizeStyles.fontSize,
    fontWeight: fontWeight.medium,
    fontFamily: 'inherit',
    borderRadius: spacing[1],
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: color.slate300,
    backgroundColor: color.white,
    color: color.slate800,
    cursor: 'pointer',
    userSelect: 'none',
    boxSizing: 'border-box',
  };

  const ellipsisStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: sizeStyles.minWidth,
    height: sizeStyles.height,
    fontSize: sizeStyles.fontSize,
    color: color.slate500,
    userSelect: 'none',
  };

  return (
    <ArkPagination.Root
      count={count}
      pageSize={pageSize}
      page={page}
      defaultPage={page === undefined ? defaultPage : undefined}
      onPageChange={onPageChange}
      siblingCount={siblingCount}
      style={rootStyle}
    >
      <ArkPagination.PrevTrigger style={buttonStyle}>
        Prev
      </ArkPagination.PrevTrigger>

      <ArkPagination.Context>
        {(pagination) =>
          pagination.pages.map((pageItem, index) =>
            pageItem.type === 'page' ? (
              <ArkPagination.Item
                key={index}
                {...pageItem}
                style={{
                  ...buttonStyle,
                  ...(pagination.page === pageItem.value
                    ? {
                        backgroundColor: color.blue500,
                        borderColor: color.blue500,
                        color: color.white,
                      }
                    : null),
                }}
              >
                {pageItem.value}
              </ArkPagination.Item>
            ) : (
              <ArkPagination.Ellipsis
                key={index}
                index={index}
                style={ellipsisStyle}
              >
                &#8230;
              </ArkPagination.Ellipsis>
            ),
          )
        }
      </ArkPagination.Context>

      <ArkPagination.NextTrigger style={buttonStyle}>
        Next
      </ArkPagination.NextTrigger>
    </ArkPagination.Root>
  );
};

export default Pagination;
