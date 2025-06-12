import React from 'react';

interface ProgressProps {
  className?: string;
  value: number;
  animated?: boolean;
}

export function Progress({ className, value, animated = false }: ProgressProps) {
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-gray-800 ${className || ''}`}>
      <div 
        className={`h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 ease-out ${animated ? 'relative' : ''}`}
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      >
        {animated && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 opacity-30 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer" 
                 style={{ 
                   backgroundSize: '200% 100%',
                   animation: 'shimmer 2s infinite linear'
                 }} />
          </div>
        )}
      </div>
    </div>
  );
}
