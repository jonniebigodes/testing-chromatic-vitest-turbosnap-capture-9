import { ark } from '@ark-ui/react/factory';
import { CSSProperties } from 'react';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';

export interface HeaderLink {
  label: string;
  href: string;
}

export interface HeaderProps {
  /** Title text displayed in the header */
  title?: string;
  /** Navigation links */
  links?: HeaderLink[];
  /** Sticky header pinned to top */
  isSticky?: boolean;
  /** Inverted (dark) styling */
  inverted?: boolean;
  /** Logo image url */
  logo?: string;
  /** Full width header when true */
  fullWidth?: boolean;
  /** Optional link click handler */
  onLinkClick?: (link: HeaderLink) => void;
}

const Header = ({
  title = 'Application',
  links = [],
  isSticky = false,
  inverted = false,
  logo,
  fullWidth = false,
  onLinkClick,
}: HeaderProps) => {
  const bg = inverted ? color.slate900 : color.white;
  const fg = inverted ? color.white : color.slate900;
  const border = inverted ? color.slate800 : color.slate200;
  const linkColor = inverted ? color.blue200 : color.blue600;
  const linkHover = inverted ? color.blue100 : color.blue600;

  const headerStyles: CSSProperties = {
    position: isSticky ? 'sticky' : 'relative',
    top: isSticky ? 0 : undefined,
    zIndex: 100,
    width: '100%',
    backgroundColor: bg,
    borderBottom: `1px solid ${border}`,
  };

  const containerStyles: CSSProperties = {
    margin: fullWidth ? 0 : '0 auto',
    maxWidth: fullWidth ? '100%' : '1200px',
    padding: `${spacing[3]} ${spacing[4]}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing[4],
  };

  const brandStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
    color: fg,
  };

  const titleStyles: CSSProperties = {
    margin: 0,
    fontSize: fontSize[18],
    fontWeight: fontWeight.semibold,
    color: fg,
  };

  const navStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[4],
  };

  const linkStyles: CSSProperties = {
    color: linkColor,
    textDecoration: 'none',
    fontSize: fontSize[14],
    transition: 'color 0.2s ease',
  };

  return (
    <ark.header style={headerStyles}>
      <ark.div style={containerStyles}>
        <ark.div style={brandStyles}>
          {logo && (
            <ark.img
              src={logo}
              alt="Logo"
              style={{
                width: spacing[6],
                height: spacing[6],
                borderRadius: spacing[2],
              }}
            />
          )}
          <ark.h1 style={titleStyles}>{title}</ark.h1>
        </ark.div>
        {links && links.length > 0 && (
          <ark.nav style={navStyles}>
            {links.map((l, i) => (
              <ark.a
                key={`${l.label}-${i}`}
                href={l.href}
                style={linkStyles}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    linkHover;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    linkColor;
                }}
                onClick={(e) => {
                  // Allow external navigation but expose callback
                  onLinkClick?.(l);
                }}
              >
                {l.label}
              </ark.a>
            ))}
          </ark.nav>
        )}
      </ark.div>
    </ark.header>
  );
};

export default Header;
