import React from 'react';

interface BadgeProps {
  className?: string;
  children: React.ReactNode;
}

export function Badge({ className, children }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold bg-blue-900/50 text-blue-300 ${className || ''}`}>
      {children}
    </span>
  );
}
