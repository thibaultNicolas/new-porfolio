import { cn } from "@/lib/utils";

interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export default function MenuButton({
  isOpen,
  onClick,
  className,
}: MenuButtonProps) {
  return (
    <button
      className={cn(
        "show-on-mobile hide-on-desktop hamburger-button menu-button",
        "relative w-12 h-12 flex items-center justify-center",
        "bg-transparent border-2 border-[#F0EBD8] rounded-lg cursor-pointer",
        "focus:outline-none focus:ring-2 focus:ring-[#F0EBD8] focus:ring-offset-2",
        "transition-all duration-300 hover:bg-[#F0EBD8]/10",
        className
      )}
      onClick={onClick}
      aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
      aria-expanded={isOpen}
      role="button"
      tabIndex={0}
    >
      <div className="menu-block relative w-[39px] h-[29px] flex items-center justify-center">
        <svg
          className="menu-icon w-full h-full"
          viewBox="0 0 39 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 1.53516H30.5185"
            stroke="#F0EBD8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M2 14.5H37"
            stroke="#F0EBD8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M2 27.4609H30.5185"
            stroke="#F0EBD8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </button>
  );
}
