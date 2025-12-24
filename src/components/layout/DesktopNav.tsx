import NavLink from "@/components/ui/NavLink";

import { NavItem } from "@/types";

interface DesktopNavProps {
  items: NavItem[];
  activeItem?: string;
}

export default function DesktopNav({ items, activeItem }: DesktopNavProps) {
  return (
    <nav className="hidden md:flex">
      <div
        className="backdrop-blur-sm rounded-3xl px-4 py-1.5 flex items-center gap-1"
        style={{ backgroundColor: "#F0EBD81A" }}
      >
        {items.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            variant="desktop"
            isActive={activeItem === item.href}
            hasDropdown={item.hasDropdown}
          />
        ))}
      </div>
    </nav>
  );
}
