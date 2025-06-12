import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Brain, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

interface PhaseNavigatorProps {
  currentPhase: number;
  totalPhases: number;
  phaseName: string;
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
  progress?: number; // Pourcentage de progression (optionnel)
}

export default function PhaseNavigator({
  currentPhase,
  totalPhases,
  phaseName,
  onPrevious,
  onNext,
  className = '',
  progress = Math.round(((currentPhase + 1) / totalPhases) * 100)
}: PhaseNavigatorProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {/* Barre de progression */}
      <div className="w-full bg-gray-700/50 h-2 rounded-full mb-4 overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          style={{ width: `${progress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <Button
          onClick={() => {
            console.log('PhaseNavigator: Previous button clicked');
            onPrevious();
          }}
          disabled={currentPhase === 0}
          variant="outline"
          className="px-3 py-2 flex items-center gap-1 hover:bg-gray-700/70 hover:border-blue-500/50 transition-colors duration-200 focus:ring-2 focus:ring-blue-500/50 focus:outline-none disabled:opacity-50"
          aria-label="Previous phase"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        <motion.div 
          key={currentPhase}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-2 flex flex-col sm:flex-row items-center gap-2"
        >
          <div className="flex items-center gap-1.5">
            <Brain className="h-4 w-4 text-blue-400" />
            <span className="text-xs font-semibold text-blue-300 bg-blue-900/30 px-2 py-0.5 rounded-full">
              Phase {currentPhase + 1}/{totalPhases}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-purple-400" />
            <span className="font-medium text-white text-sm">
              {phaseName}
            </span>
          </div>
          <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-0.5 rounded-full">
            {progress}% complete
          </span>
        </motion.div>

        <Button
          onClick={() => {
            console.log('PhaseNavigator: Next button clicked');
            onNext();
          }}
          disabled={currentPhase === totalPhases - 1}
          variant={currentPhase === totalPhases - 1 ? "secondary" : "outline"}
          className={`px-3 py-2 flex items-center gap-1 transition-colors duration-200 focus:ring-2 focus:ring-blue-500/50 focus:outline-none disabled:opacity-50 ${currentPhase === totalPhases - 1 ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700' : 'hover:bg-gray-700/70 hover:border-blue-500/50'}`}
          aria-label="Next phase"
        >
          <span className="hidden sm:inline">{currentPhase === totalPhases - 1 ? 'Complete' : 'Next'}</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
