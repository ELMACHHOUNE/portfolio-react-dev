import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { identity } from "@/data/social";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/education", label: "Education" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-300",
        scrolled
          ? "border-stone-900/10 bg-[#f5f0e6]/90 dark:border-white/10 dark:bg-[#05070b]/90"
          : "border-transparent bg-[#f5f0e6]/70 dark:bg-[#05070b]/70",
      )}>
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="group flex items-center gap-2 text-sm font-semibold tracking-tight text-stone-900 dark:text-stone-100">
          <span className="flex size-7 items-center justify-center rounded-md bg-stone-900 font-mono text-xs text-stone-50 dark:bg-stone-100 dark:text-stone-900">
            M
          </span>
          <span className="hidden sm:inline">
            {identity.firstName}
            <span className="text-stone-500 dark:text-stone-400"> · </span>
            <span className="font-mono text-stone-500 dark:text-stone-400">
              {identity.lastName}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "relative rounded-md px-3 py-1.5 text-sm text-stone-600 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100",
                  isActive &&
                    "bg-stone-900/[0.06] font-medium text-stone-900 after:absolute after:-bottom-[9px] after:left-3 after:right-3 after:h-px after:bg-amber-600 dark:bg-white/[0.07] dark:text-stone-50 dark:after:bg-amber-200/80",
                )
              }>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <div className="md:hidden">
            <MobileNavigation />
          </div>
        </div>
      </div>
    </header>
  );
}