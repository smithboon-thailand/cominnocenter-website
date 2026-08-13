"use client";

import { type ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export default function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div
      className={`group relative rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md shadow-sm hover:shadow-xl hover:border-pink-200/80 transition-all duration-500 hover:-translate-y-1 overflow-hidden ${className}`}
    >
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-pink-400/20 via-transparent to-blue-600/20" />
      <div className="relative">{children}</div>
    </div>
  );
}
