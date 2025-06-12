import { FC, useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { Button } from '../../ui/button';
import EnhancedVerticalTimeline from './EnhancedVerticalTimeline';
import PhaseFeedback from './PhaseFeedback';
import ReactMarkdown from 'react-markdown';

interface PhaseData {
  name: string;
  title: string;
  content: string;
  icon?: string;
  badge?: {
    emoji: string;
    title: string;
  };
}

interface PhaseSystemProps {
  phases: PhaseData[];
  initialPhaseIndex?: number;
  onPhaseChange?: (index: number) => void;
  className?: string;
}

const PhaseSystem: FC<PhaseSystemProps> = ({ 
  phases, 
  initialPhaseIndex = 0,
  onPhaseChange,
  className = '' 
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialPhaseIndex);
  const contentRef = useRef<HTMLDivElement>(null);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [unlockedBadges, setUnlockedBadges] = useState<number[]>([]);
  
  // Update current phase and notify parent component
  const updateCurrentIndex = (index: number) => {
    setCurrentIndex(index);
    if (onPhaseChange) {
      onPhaseChange(index);
    }
  };

  // Navigation functions
  const goToNextPhase = () => {
    if (currentIndex < phases.length - 1) {
      updateCurrentIndex(currentIndex + 1);
    }
  };

  const goToPreviousPhase = () => {
    if (currentIndex > 0) {
      updateCurrentIndex(currentIndex - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        goToNextPhase();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        goToPreviousPhase();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  // Smooth scroll to content when phase changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentIndex]);

  // Animate progress bar
  useEffect(() => {
    const targetPercentage = phases && phases.length > 0
      ? ((currentIndex + 1) / phases.length) * 100
      : 0;
    
    // Animate progress bar
    let start = progressPercentage;
    const step = (targetPercentage - start) / 20;
    
    const animateProgress = () => {
      start += step;
      if ((step > 0 && start < targetPercentage) || (step < 0 && start > targetPercentage)) {
        setProgressPercentage(start);
        requestAnimationFrame(animateProgress);
      } else {
        setProgressPercentage(targetPercentage);
      }
    };
    
    requestAnimationFrame(animateProgress);
  }, [currentIndex, phases]);

  // Unlock badges as user progresses
  useEffect(() => {
    // Add current phase index to unlocked badges if not already there
    if (!unlockedBadges.includes(currentIndex)) {
      setUnlockedBadges(prev => [...prev, currentIndex]);
    }
  }, [currentIndex]);

  const currentPhase = phases[currentIndex];
  const isLastPhase = currentIndex === phases.length - 1;

  return (
    <div className={`${className}`} ref={contentRef}>
      {/* Progress Bar */}
      <div className="w-full bg-gray-800 h-2 rounded-full mb-6">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          style={{ width: `${progressPercentage}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column - Enhanced Vertical Timeline */}
        <div className="lg:w-1/4">
          <div className="sticky top-24">
            <h3 className="text-lg font-semibold mb-4 text-white">Journey Progress</h3>
            <EnhancedVerticalTimeline
              phases={phases}
              currentIndex={currentIndex}
              setCurrentIndex={updateCurrentIndex}
            />
          </div>
        </div>

        {/* Right Column - Phase Content */}
        <div className="lg:w-3/4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg"
            >
              {/* Phase Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center text-xl shadow-lg">
                    {currentPhase?.icon || '✨'}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{currentPhase?.title || currentPhase?.name || `Phase ${currentIndex + 1}`}</h2>
                    <p className="text-sm text-gray-400">Phase {currentIndex + 1} of {phases.length}</p>
                  </div>
                </div>

                {/* Badge if available */}
                {currentPhase?.badge && (
                  <div className="flex items-center gap-2 bg-green-900/20 border border-green-700/30 px-3 py-1 rounded-full">
                    <span className="text-lg">{currentPhase.badge.emoji}</span>
                    <span className="text-sm font-medium text-green-400">{currentPhase.badge.title}</span>
                  </div>
                )}
              </div>

              {/* Phase Content with Markdown Support */}
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown>{currentPhase?.content || 'Content not available'}</ReactMarkdown>
              </div>

              {/* Phase Feedback */}
              <PhaseFeedback phaseId={currentPhase?.name || `phase-${currentIndex}`} className="mt-8" />

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  onClick={goToPreviousPhase}
                  disabled={currentIndex === 0}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                {isLastPhase ? (
                  <Button
                    className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600"
                  >
                    <Award className="h-4 w-4" />
                    Complete Journey
                  </Button>
                ) : (
                  <Button
                    onClick={goToNextPhase}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PhaseSystem;
