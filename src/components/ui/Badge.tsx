import { cn } from "@/lib/utils";

type BadgeVariant = "primary" | "outline" | "muted";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary:
    "bg-primary-500/15 text-primary-400 border-primary-500/30",
  outline:
    "bg-transparent text-surface-50 border-surface-300/50",
  muted:
    "bg-surface-400/50 text-surface-50 border-surface-300/30",
};

export function Badge({ variant = "primary", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
