import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
  as,
}) {
  const reduceMotion = useReducedMotion();
  const Tag = as ?? motion.div;

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Tag
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}>
      {children}
    </Tag>
  );
}