import React from 'react';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-gray-700 bg-gray-900/80 shadow-sm ${className || ''}`}
    >
      {children}
    </div>
  );
}

export function CardContent({ className, children }: CardProps) {
  return <div className={`p-6 ${className || ''}`}>{children}</div>;
}
