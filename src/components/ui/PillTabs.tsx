"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface PillTabItem<T extends string> {
  id: T;
  label: string;
}

interface PillTabsProps<T extends string> {
  items: readonly PillTabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  layoutId: string;
  ariaLabel: string;
  className?: string;
  buttonClassName?: string;
}

export function PillTabs<T extends string>({
  items,
  value,
  onChange,
  layoutId,
  ariaLabel,
  className,
  buttonClassName,
}: PillTabsProps<T>) {
  return (
    <div
      className={cn(
        "inline-flex flex-wrap items-center justify-center gap-1 rounded-lg border border-surface-300/30 bg-surface-tonal-500 p-1",
        className
      )}
      role="group"
      aria-label={ariaLabel}
    >
      {items.map((item) => {
        const active = item.id === value;
        return (
          <button
            key={item.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(item.id)}
            className={cn(
              "relative cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium select-none transition-colors duration-150 active:scale-[0.97]",
              active
                ? "text-primary-300"
                : "text-surface-100 hover:text-white",
              buttonClassName
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                transition={{
                  type: "spring",
                  duration: 0.28,
                  bounce: 0,
                }}
                className="absolute inset-0 rounded-md border border-primary-500/35 bg-primary-500/15"
              />
            )}
            <span className="relative z-10">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
