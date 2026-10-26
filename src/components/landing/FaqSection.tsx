"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/types";
import { FAQ_ITEMS } from "@/lib/faq";

function FaqAccordionItem({
  item,
  index,
  shouldReduceMotion,
}: {
  item: FaqItem;
  index: number;
  shouldReduceMotion: boolean;
}) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="border-b border-surface-300/20">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="group flex w-full items-center justify-between gap-4 py-5 text-left cursor-pointer select-none"
      >
        <span className="flex items-baseline gap-3 text-sm font-medium text-white transition-colors duration-150 group-hover:text-primary-300 sm:text-base">
          <span className="font-mono text-xs text-surface-100 tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>{item.question}</span>
        </span>
        <ChevronDown
          size={18}
          className={cn(
            "shrink-0 text-surface-100 transition-transform duration-200 ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:text-white",
            open && "rotate-180 text-primary-400"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }
            }
            animate={{ height: "auto", opacity: 1 }}
            exit={
              shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }
            }
            transition={{
              duration: shouldReduceMotion ? 0.01 : 0.22,
              ease: [0.165, 0.84, 0.44, 1],
            }}
            className="overflow-hidden"
          >
            <p className="pb-5 pl-7 text-sm leading-relaxed text-surface-50">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqSection() {
  const shouldReduceMotion = Boolean(useReducedMotion());

  return (
    <section className="py-20">
      <div className="mx-auto max-w-2xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">FAQ</h2>
          <p className="mt-3 text-surface-50">Common questions, answered.</p>
        </div>

        <div>
          {FAQ_ITEMS.map((item, index) => (
            <FaqAccordionItem
              key={item.question}
              item={item}
              index={index}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
