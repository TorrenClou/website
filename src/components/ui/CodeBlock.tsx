"use client";

import { cn } from "@/lib/utils";
import { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({ code, filename, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  return (
    <div
      className={cn(
        "group relative rounded-lg border border-surface-300/30 bg-surface-500 overflow-hidden",
        className
      )}
    >
      {filename && (
        <div className="flex items-center justify-between border-b border-surface-300/20 px-4 py-2">
          <span className="text-xs text-surface-100 font-mono">{filename}</span>
        </div>
      )}
      <div className="relative">
        <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
          <code className="font-mono text-surface-50">{code}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 rounded-md border border-surface-300/30 bg-surface-400/50 p-1.5 text-surface-100 opacity-0 transition-opacity hover:bg-surface-300/50 hover:text-white group-hover:opacity-100 cursor-pointer"
          aria-label="Copy code"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
    </div>
  );
}
