"use client";

import { useState } from "react";
import Link from "next/link";

import { Button, Logo, MenuButton } from "@/components/ui";
import { NavItem } from "@/types";

import MobileNav from "./MobileNav";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { href: "#portfolio", label: "Portfolio", hasDropdown: false },
    { href: "#about", label: "À propos", hasDropdown: false },
    { href: "#services", label: "Services", hasDropdown: false },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="navbar absolute top-0 left-0 right-0 z-100 w-full">
      <nav className="navbar-menu w-layout-blockcontainer main-container container mx-auto px-6 md:px-12 lg:px-16 flex h-20 items-center justify-between relative">
        {/* Logo à gauche - visible sur mobile et desktop */}
        <div className="navbar-brand-block flex items-center shrink-0">
          <Logo
            mainText="THIBAULT"
            subText="DEV"
            subTextColor="text-[#748CAB]"
            onClick={handleLinkClick}
            className="text-[#F0EBD8]"
          />
        </div>

        {/* Menu au centre - desktop seulement */}
        <div className="navbar-menu-item navbar-menu-center hide-on-mobile show-on-desktop items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="navbar-link-block text-[#F0EBD8] font-light hover:text-[#F0EBD8] transition-colors relative"
              onClick={handleLinkClick}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Bouton Contactez-moi à droite - desktop seulement */}
        <div className="navbar-menu-item hide-on-mobile show-on-desktop items-center ml-auto shrink-0">
          <Button
            variant="cta"
            onClick={() => {}}
            className="header-cta-button"
          >
            Contactez-moi
          </Button>
        </div>

        {/* Menu hamburger à droite - mobile seulement */}
        <div className="show-on-mobile hide-on-desktop shrink-0">
          <MenuButton isOpen={isMenuOpen} onClick={handleMenuToggle} />
        </div>
      </nav>

      {/* Menu mobile - centré sur la page */}
      <MobileNav
        items={navItems}
        isOpen={isMenuOpen}
        onLinkClick={handleLinkClick}
      />
    </header>
  );
}
