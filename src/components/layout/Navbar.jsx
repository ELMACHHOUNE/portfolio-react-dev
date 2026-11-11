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
          ? "border-border/70 bg-background/75 supports-backdrop-filter:bg-background/60"
          : "border-transparent bg-background/40",
      )}>
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="group flex items-center gap-2 text-sm font-semibold tracking-tight">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary font-mono text-xs text-primary-foreground">
            M
          </span>
          <span className="hidden sm:inline">
            {identity.firstName}
            <span className="text-muted-foreground"> · </span>
            <span className="font-mono text-muted-foreground">
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
                  "relative rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
                  isActive &&
                    "bg-muted/70 font-medium text-foreground after:absolute after:-bottom-[9px] after:left-3 after:right-3 after:h-px after:bg-accent",
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