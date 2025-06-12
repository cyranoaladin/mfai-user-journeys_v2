import React, { FC } from 'react';
import { motion } from 'framer-motion';

interface Phase {
  name: string;
  title?: string;
  icon?: string;
}

interface VerticalTimelineProps {
  phases: Phase[];
  currentPhaseIndex: number;
  onPhaseClick: (index: number) => void;
}

/**
 * VerticalTimeline Component - Displays a vertical timeline for journey phases
 * with animated highlighting for the current phase
 */
const VerticalTimeline: FC<VerticalTimelineProps> = ({ 
  phases, 
  currentPhaseIndex, 
  onPhaseClick 
}) => {
  return (
    <div className="fixed left-6 top-1/2 transform -translate-y-1/2 h-auto max-h-[70vh] overflow-y-auto py-4 hidden lg:block">
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700 z-0"></div>
        
        {/* Timeline points */}
        <div className="relative z-10 space-y-8">
          {phases.map((phase, index) => {
            const isActive = index === currentPhaseIndex;
            const isPast = index < currentPhaseIndex;
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center cursor-pointer group"
                onClick={() => onPhaseClick(index)}
              >
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? 'bg-blue-600 shadow-lg shadow-blue-500/30' 
                      : isPast 
                        ? 'bg-green-600' 
                        : 'bg-gray-800 group-hover:bg-gray-700'
                  }`}
                >
                  {isPast ? (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-xs">{phase.icon || (index + 1)}</span>
                  )}
                </div>
                
                <div 
                  className={`ml-3 transition-all duration-300 ${
                    isActive 
                      ? 'text-white font-medium' 
                      : 'text-gray-400 group-hover:text-gray-300'
                  }`}
                >
                  <div className="text-sm whitespace-nowrap max-w-[150px] truncate">
                    {phase.title || phase.name}
                  </div>
                  {isActive && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      className="h-0.5 bg-blue-500 mt-1"
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VerticalTimeline;
