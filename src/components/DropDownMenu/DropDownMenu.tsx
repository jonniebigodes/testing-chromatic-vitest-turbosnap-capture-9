import { Menu } from '@ark-ui/react/menu';
import { ark } from '@ark-ui/react/factory';
import type { CSSProperties } from 'react';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';

export interface DropDownMenuProps {
  /**
   * Color of the dropdown menu button
   */
  color?: string;

  /**
   * Label text displayed on the dropdown button
   */
  label: string;

  /**
   * Array of strings to populate the dropdown options
   */
  children: string[];

  /**
   * Renders the dropdown menu in inverted colors
   */
  inverted?: boolean;

  /**
   * Callback when an option is selected
   */
  onSelect?: (item: string) => void;
}

const DropDownMenu = ({
  color: customColor = color.blue500,
  label,
  children,
  inverted = false,
  onSelect,
}: DropDownMenuProps) => {
  const buttonColor = inverted ? color.slate800 : customColor;
  const buttonTextColor = inverted ? color.white : color.white;
  const menuBg = inverted ? color.slate700 : color.white;
  const menuTextColor = inverted ? color.white : color.slate800;
  const menuBorder = inverted ? color.slate600 : color.slate300;
  const hoverBg = inverted ? color.slate600 : color.slate100;

  const buttonStyles: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: buttonColor,
    color: buttonTextColor,
    border: 'none',
    borderRadius: spacing[2],
    padding: `${spacing[2]} ${spacing[4]}`,
    fontSize: fontSize[14],
    fontWeight: fontWeight.medium,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minWidth: '150px',
  };

  const menuContentStyles: CSSProperties = {
    backgroundColor: menuBg,
    border: `1px solid ${menuBorder}`,
    borderRadius: spacing[2],
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    padding: `${spacing[2]} 0`,
    minWidth: '150px',
    maxHeight: '300px',
    overflowY: 'auto',
    overflowX: 'hidden',
    zIndex: 50,
  };

  const itemStyles: CSSProperties = {
    padding: `${spacing[2]} ${spacing[4]}`,
    cursor: 'pointer',
    color: menuTextColor,
    backgroundColor: 'transparent',
    border: 'none',
    display: 'block',
    width: '100%',
    textAlign: 'left',
    transition: 'background-color 0.15s',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  return (
    <Menu.Root positioning={{ placement: 'bottom-start' }}>
      <Menu.Trigger
        style={buttonStyles}
        onMouseEnter={(e) => {
          const target = e.currentTarget as HTMLButtonElement;
          target.style.opacity = '0.9';
        }}
        onMouseLeave={(e) => {
          const target = e.currentTarget as HTMLButtonElement;
          target.style.opacity = '1';
        }}
      >
        {label}
        <ark.span style={{ marginLeft: spacing[2], fontSize: fontSize[12] }}>
          ▼
        </ark.span>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content style={menuContentStyles}>
          {children.map((item, index) => (
            <Menu.Item
              key={index}
              value={item}
              onClick={() => onSelect?.(item)}
              style={itemStyles}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.backgroundColor = hoverBg;
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.backgroundColor = 'transparent';
              }}
            >
              <Menu.ItemText>{item}</Menu.ItemText>
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};

export default DropDownMenu;
