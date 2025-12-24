import NavLink from "@/components/ui/NavLink";

import { cn } from "@/lib/utils";
import { NavItem } from "@/types";

interface MobileNavProps {
  items: NavItem[];
  isOpen: boolean;
  onLinkClick: () => void;
}

export default function MobileNav({
  items,
  isOpen,
  onLinkClick,
}: MobileNavProps) {
  return (
    <div
      className={cn(
        "show-on-mobile hide-on-desktop mobile-nav-overlay",
        "fixed inset-x-0 flex justify-center",
        "transition-all duration-[400ms] z-50",
        "overflow-visible",
        isOpen
          ? "opacity-100 visible translate-y-0"
          : "opacity-0 invisible -translate-y-4 pointer-events-none"
      )}
      style={{
        top: isOpen ? "100px" : "0",
      }}
    >
      <nav className="navbar-menu-mobile">
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={item.href}
              className="mobile-nav-item"
              style={{
                animationDelay: isOpen ? `${index * 100}ms` : "0ms",
              }}
            >
              <NavLink
                href={item.href}
                label={item.label}
                variant="mobile"
                onClick={onLinkClick}
              />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
