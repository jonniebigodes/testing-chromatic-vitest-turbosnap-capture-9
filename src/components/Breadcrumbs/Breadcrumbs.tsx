import { ark } from '@ark-ui/react/factory';
import type { CSSProperties, ReactNode } from 'react';
import {
  color,
  fontSize,
  fontWeight,
  lineHeight,
  spacing,
} from '../../tokens/tokens';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbsProps {
  /**
   * Breadcrumb trail items
   */
  items: BreadcrumbItem[];

  /**
   * Separator between items
   * @default "/"
   */
  separator?: ReactNode;

  /**
   * Size of the breadcrumbs: 'small', 'medium', or 'large'
   */
  size?: 'small' | 'medium' | 'large';
}

const getSizeStyles = (size: 'small' | 'medium' | 'large') => {
  const sizeMap = {
    small: {
      fontSize: fontSize[12],
      lineHeight: lineHeight[20],
      gap: spacing[1],
      separatorPadding: spacing[1],
    },
    medium: {
      fontSize: fontSize[14],
      lineHeight: lineHeight[24],
      gap: spacing[2],
      separatorPadding: spacing[2],
    },
    large: {
      fontSize: fontSize[16],
      lineHeight: lineHeight[28],
      gap: spacing[3],
      separatorPadding: spacing[3],
    },
  };

  return sizeMap[size];
};

const Breadcrumbs = ({
  items,
  separator = '/',
  size = 'medium',
}: BreadcrumbsProps) => {
  const sizeStyles = getSizeStyles(size);

  const navStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'inherit',
  };

  const listStyle: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    gap: sizeStyles.gap,
  };

  const itemStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: sizeStyles.gap,
    fontSize: sizeStyles.fontSize,
    lineHeight: sizeStyles.lineHeight,
  };

  const linkStyle: CSSProperties = {
    color: color.blue600,
    textDecoration: 'none',
    fontWeight: fontWeight.medium,
    fontSize: sizeStyles.fontSize,
    lineHeight: sizeStyles.lineHeight,
  };

  const currentStyle: CSSProperties = {
    color: color.slate800,
    fontWeight: fontWeight.semibold,
    fontSize: sizeStyles.fontSize,
    lineHeight: sizeStyles.lineHeight,
  };

  const separatorStyle: CSSProperties = {
    color: color.slate400,
    fontWeight: fontWeight.regular,
    paddingInline: sizeStyles.separatorPadding,
    fontSize: sizeStyles.fontSize,
    lineHeight: sizeStyles.lineHeight,
    userSelect: 'none',
  };

  return (
    <ark.nav aria-label="Breadcrumb" style={navStyle}>
      <ark.ol style={listStyle}>
        {items.map((item, index) => {
          const hasExplicitCurrent = items.some((entry) => entry.current === true);
          const isCurrent =
            item.current === true ||
            (!hasExplicitCurrent && index === items.length - 1);
          const isLast = index === items.length - 1;

          return (
            <ark.li key={`${item.label}-${index}`} style={itemStyle}>
              {isCurrent || !item.href ? (
                <ark.span
                  style={isCurrent ? currentStyle : linkStyle}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  {item.label}
                </ark.span>
              ) : (
                <ark.a href={item.href} style={linkStyle}>
                  {item.label}
                </ark.a>
              )}
              {!isLast ? (
                <ark.span aria-hidden="true" style={separatorStyle}>
                  {separator}
                </ark.span>
              ) : null}
            </ark.li>
          );
        })}
      </ark.ol>
    </ark.nav>
  );
};

export default Breadcrumbs;
