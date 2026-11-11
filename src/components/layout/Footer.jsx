import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { IconBrandGithub, IconBrandLinkedin, IconBrandFacebook, IconBrandWhatsapp, IconBrandInstagram } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { identity, socialLinks } from "@/data/social";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/education", label: "Education" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

const socials = [
  { label: "LinkedIn", href: socialLinks.linkedin, Icon: IconBrandLinkedin },
  { label: "Facebook", href: socialLinks.facebook, Icon: IconBrandFacebook },
  { label: "GitHub", href: socialLinks.github, Icon: IconBrandGithub },
  { label: "WhatsApp", href: socialLinks.whatsapp, Icon: IconBrandWhatsapp },
  { label: "Instagram", href: socialLinks.instagram, Icon: IconBrandInstagram },
  {
    label: "Email",
    href: socialLinks.email ? `mailto:${socialLinks.email}` : "",
    Icon: Mail,
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        <div>
          <p className="font-semibold tracking-tight">{identity.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {identity.roles.slice(0, 2).join(" · ")}
          </p>
        </div>

        <nav
          className="flex flex-col gap-2 text-sm"
          aria-label="Footer navigation">
          <p className="mb-1 font-medium text-muted-foreground">Navigation</p>
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="w-fit text-muted-foreground transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>

        <div>
          <p className="mb-3 font-medium text-muted-foreground">Social</p>
          <div className="flex gap-2">
            {socials.map(({ label, href, Icon }) =>
              href ? (
                <Button
                  key={label}
                  variant="outline"
                  size="icon-sm"
                  nativeButton={false}
                  render={<a href={href} target="_blank" rel="noreferrer" />}
                  aria-label={label}
                  title={label}>
                  <Icon />
                </Button>
              ) : null,
            )}
          </div>
        </div>
      </div>

      <div className="border-t py-5 text-center text-xs text-muted-foreground">
        © {year} {identity.name}
      </div>
    </footer>
  );
}