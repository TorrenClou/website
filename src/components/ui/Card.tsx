import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-surface-300/30 bg-surface-tonal-500 p-6",
        className
      )}
    >
      {children}
    </div>
  );
}
