"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-400 border-primary-500/50",
  outline:
    "bg-transparent text-surface-50 border-surface-300/50 hover:bg-surface-400/30 hover:border-surface-200/50",
  ghost:
    "bg-transparent text-surface-50 border-transparent hover:bg-surface-400/20",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
};

const MotionLink = motion.create(Link);

export function Button({
  variant = "primary",
  size = "md",
  href,
  external = false,
  children,
  className,
  onClick,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg border font-medium transition-colors duration-200 cursor-pointer",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring" as const, stiffness: 400, damping: 17 },
  };

  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...motionProps}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <MotionLink href={href} className={classes} {...motionProps}>
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button className={classes} onClick={onClick} {...motionProps}>
      {children}
    </motion.button>
  );
}
