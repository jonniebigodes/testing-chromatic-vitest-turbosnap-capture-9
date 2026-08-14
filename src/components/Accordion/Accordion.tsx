import { Accordion, ark } from '@ark-ui/react';
import type { CSSProperties } from 'react';
import {
  color,
  fontSize,
  fontWeight,
  spacing,
  lineHeight,
} from '../../tokens/tokens';

export interface AccordionItem {
  title: string;
  content: string;
}

export interface AccordionProps {
  inverted?: boolean;
  items: AccordionItem[];
  /**
   * The controlled value(s) of the accordion items that are open
   */
  value?: string[];
  /**
   * The initial value(s) of the accordion items that are open (uncontrolled)
   */
  defaultValue?: string[];
  /**
   * The callback invoked when the open items change
   */
  onValueChange?: (details: { value: string[] }) => void;
}

export default function AccordionComponent({
  inverted = false,
  items,
  value,
  defaultValue,
  onValueChange,
}: AccordionProps) {
  const backgroundColor = inverted ? color.slate900 : color.white;
  const textColor = inverted ? color.white : color.slate900;
  const borderColor = inverted ? color.slate700 : color.slate200;
  const hoverBackgroundColor = inverted ? color.slate800 : color.slate50;

  const rootStyle: CSSProperties = {
    width: '100%',
    backgroundColor,
    color: textColor,
    borderRadius: spacing[2],
    overflow: 'hidden',
    border: `1px solid ${borderColor}`,
  };

  const itemStyle: CSSProperties = {
    borderBottom: `1px solid ${borderColor}`,
  };

  const triggerStyle: CSSProperties = {
    width: '100%',
    padding: `${spacing[4]} ${spacing[5]}`,
    backgroundColor,
    color: textColor,
    border: 'none',
    textAlign: 'left',
    fontSize: fontSize[16],
    fontWeight: fontWeight.medium,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'background-color 0.2s ease',
  };

  const triggerHoverStyle: CSSProperties = {
    backgroundColor: hoverBackgroundColor,
  };

  const contentStyle: CSSProperties = {
    padding: `${spacing[4]} ${spacing[5]}`,
    fontSize: fontSize[14],
    lineHeight: lineHeight[24],
    backgroundColor,
    color: textColor,
  };

  const indicatorStyle: CSSProperties = {
    transition: 'transform 0.2s ease',
    fontSize: fontSize[12],
  };

  return (
    <Accordion.Root
      value={value}
      defaultValue={
        value === undefined
          ? (defaultValue ?? (items.length > 0 ? ['item-0'] : []))
          : undefined
      }
      onValueChange={onValueChange}
      collapsible
      multiple
      style={rootStyle}
    >
      {items.map((item, index) => (
        <Accordion.Item key={index} value={`item-${index}`} style={itemStyle}>
          <Accordion.ItemTrigger asChild>
            <ark.button
              style={triggerStyle}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, triggerHoverStyle);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = backgroundColor;
              }}
            >
              <span>{item.title}</span>
              <Accordion.ItemIndicator style={indicatorStyle}>
                ▼
              </Accordion.ItemIndicator>
            </ark.button>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent style={contentStyle}>
            {item.content}
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
