import { Badge } from "@/components/ui/badge";
import { getTechIcon } from "@/lib/techIcons";
import { cn } from "@/lib/utils";

export function TechBadge({ tech, variant = "outline", className }) {
  const entry = getTechIcon(tech);
  if (!entry) {
    return (
      <Badge variant={variant} className={className}>
        {tech}
      </Badge>
    );
  }
  const { Icon, color } = entry;
  return (
    <Badge variant={variant} className={cn("gap-1.5", className)}>
      <Icon aria-hidden="true" className="shrink-0" style={{ color }} />
      <span>{tech}</span>
    </Badge>
  );
}