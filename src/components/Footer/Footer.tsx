import { ark } from '@ark-ui/react/factory';
import type { CSSProperties } from 'react';
import { color, fontSize, spacing } from '../../tokens/tokens';

export interface FooterProps {
  /**
   * Color of the footer background
   */
  color?: string;

  /**
   * Label text displayed in the footer
   */
  label?: string;

  /**
   * Array of link labels to populate the footer
   */
  children?: string[];

  /**
   * Renders the footer in inverted colors
   */
  inverted?: boolean;

  /**
   * Callback when a link is clicked
   */
  onLinkClick?: (link: string) => void;
}

const Footer = ({
  color: customColor = color.slate800,
  label = '© 2025 Company Name. All rights reserved.',
  children = [],
  inverted = false,
  onLinkClick,
}: FooterProps) => {
  const backgroundColor = inverted ? color.white : customColor;
  const textColor = inverted ? color.slate800 : color.white;
  const linkColor = inverted ? color.blue500 : color.blue200;
  const borderColor = inverted ? color.slate200 : color.slate700;

  const footerStyles: CSSProperties = {
    width: '100%',
    backgroundColor,
    borderTop: `1px solid ${borderColor}`,
    padding: `${spacing[6]} ${spacing[8]}`,
    marginTop: 'auto',
  };

  const containerStyles: CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[4],
  };

  const linksContainerStyles: CSSProperties = {
    display: 'flex',
    gap: spacing[6],
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  const linkStyles: CSSProperties = {
    color: linkColor,
    textDecoration: 'none',
    fontSize: fontSize[14],
    cursor: 'pointer',
    transition: 'color 0.2s ease',
  };

  const labelStyles: CSSProperties = {
    color: textColor,
    fontSize: fontSize[14],
    textAlign: 'center',
    margin: '0',
  };

  return (
    <ark.footer style={footerStyles}>
      <ark.div style={containerStyles}>
        {children && children.length > 0 && (
          <ark.nav style={linksContainerStyles}>
            {children.map((link, index) => (
              <ark.a
                key={index}
                style={linkStyles}
                onClick={() => onLinkClick?.(link)}
                onMouseEnter={(e) => {
                  const target = e.currentTarget as HTMLAnchorElement;
                  target.style.color = inverted ? color.blue600 : color.blue50;
                  target.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget as HTMLAnchorElement;
                  target.style.color = linkColor;
                  target.style.textDecoration = 'none';
                }}
              >
                {link}
              </ark.a>
            ))}
          </ark.nav>
        )}
        <ark.p style={labelStyles}>{label}</ark.p>
      </ark.div>
    </ark.footer>
  );
};

export default Footer;
