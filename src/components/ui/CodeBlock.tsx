"use client";

import { cn } from "@/lib/utils";
import { useCopyToClipboard } from "@/lib/use-copy-to-clipboard";
import { Copy, Check, Terminal } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({ code, filename, className }: CodeBlockProps) {
  const { copied, copy } = useCopyToClipboard(1800);
  const shouldReduceMotion = useReducedMotion();

  const handleCopy = () => {
    void copy(code);
  };

  return (
    <div
      className={cn(
        "group relative rounded-xl border border-surface-300/35 bg-surface-500 overflow-hidden text-left",
        className
      )}
    >
      {filename && (
        <div className="flex items-center justify-between border-b border-surface-300/20 bg-surface-tonal-500/70 px-4 py-2">
          <span className="inline-flex items-center gap-2 text-xs text-surface-100 font-mono">
            <Terminal size={13} aria-hidden="true" className="text-primary-400" />
            {filename}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-mono cursor-pointer select-none",
              "transition-[background-color,border-color,color,transform] duration-150 ease-[cubic-bezier(0.165,0.84,0.44,1)] active:scale-[0.97]",
              copied
                ? "border-success/40 bg-success/15 text-success-light"
                : "border-surface-300/35 bg-surface-400/50 text-surface-100 hover:border-surface-200/50 hover:bg-surface-300/40 hover:text-white"
            )}
            aria-label={copied ? "Copied to clipboard" : "Copy command"}
          >
            <span className="relative flex h-3.5 w-3.5 items-center justify-center">
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="check"
                    initial={
                      shouldReduceMotion
                        ? { opacity: 1 }
                        : { opacity: 0, scale: 0.6, filter: "blur(2px)" }
                    }
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, scale: 0.6, filter: "blur(2px)" }
                    }
                    transition={{ duration: 0.14, ease: [0.165, 0.84, 0.44, 1] }}
                    className="inline-flex items-center justify-center text-success-medium"
                  >
                    <Check size={13} strokeWidth={2.5} aria-hidden="true" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={
                      shouldReduceMotion
                        ? { opacity: 1 }
                        : { opacity: 0, scale: 0.6, filter: "blur(2px)" }
                    }
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, scale: 0.6, filter: "blur(2px)" }
                    }
                    transition={{ duration: 0.14, ease: [0.165, 0.84, 0.44, 1] }}
                    className="inline-flex items-center justify-center"
                  >
                    <Copy size={13} aria-hidden="true" />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      )}
      <div className="relative">
        <pre className="overflow-x-auto p-4 text-xs sm:text-sm leading-relaxed">
          <code className="font-mono text-surface-50">{code}</code>
        </pre>
        {!filename && (
          <button
            type="button"
            onClick={handleCopy}
            className="absolute top-3 right-3 rounded-md border border-surface-300/35 bg-surface-400/60 p-1.5 text-surface-100 transition-colors hover:bg-surface-300/50 hover:text-white active:scale-[0.97] cursor-pointer"
            aria-label="Copy code"
          >
            {copied ? <Check size={14} aria-hidden="true" className="text-success-medium" /> : <Copy size={14} aria-hidden="true" />}
          </button>
        )}
      </div>
    </div>
  );
}
