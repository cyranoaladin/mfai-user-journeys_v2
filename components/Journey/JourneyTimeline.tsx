import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PhaseSection from './Phases/PhaseSection';

export interface JourneyPhase {
  title: string;
  description: string;
  mission: string;
  xpReward: number;
  nftReward?: string;
  locked?: boolean;
}

interface JourneyTimelineProps {
  currentPhase: number;
  onPhaseChange: (index: number) => void;
  journeyData: JourneyPhase[];
}

/**
 * JourneyTimeline - Contains the 5 phases of the journey: Learn → Build → Prove → Activate → Scale
 * 
 * Features:
 * - Phase tabs with icons + progress
 * - Phase title + description + mission
 * - Uses Framer Motion for phase transitions
 * - Locked phase logic (based on wallet/NFT/XP)
 */
const JourneyTimeline: FC<JourneyTimelineProps> = ({ 
  currentPhase, 
  onPhaseChange, 
  journeyData 
}) => {
  const [selectedPhase, setSelectedPhase] = useState(currentPhase);

  // Phase icons mapping
  const phaseIcons = [
    <i key="learn" className="fas fa-graduation-cap" />,
    <i key="build" className="fas fa-hammer" />,
    <i key="prove" className="fas fa-certificate" />,
    <i key="activate" className="fas fa-rocket" />,
    <i key="scale" className="fas fa-chart-line" />
  ];

  // Phase names with MFAI terminology
  const phaseNames = ["Cognitive", "Synaptic", "Neural", "Activation", "Amplification"];

  const handlePhaseClick = (index: number) => {
    // Pour le prototype, toutes les phases sont accessibles sans restriction
    setSelectedPhase(index);
    onPhaseChange(index);
  };

  return (
    <div className="journey-timeline w-full">
      {/* Phase Tabs */}
      <div className="phase-tabs flex justify-between mb-8 relative">
        {/* Progress Bar */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700 -z-10 transform -translate-y-1/2" />
        <div 
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 -z-10 transform -translate-y-1/2 transition-all duration-500"
          style={{ width: `${(currentPhase / (journeyData.length - 1)) * 100}%` }}
        />
        
        {journeyData.map((phase, index) => (
          <motion.button
            key={index}
            className={`phase-tab flex flex-col items-center relative z-10 ${
              selectedPhase === index 
                ? 'text-blue-500' 
                : 'text-gray-300 hover:text-white'
            }`}
            onClick={() => handlePhaseClick(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={`phase-icon w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
              selectedPhase === index 
                ? 'bg-blue-500 text-white' 
                : 'bg-indigo-700 text-white' // Toutes les phases sont actives
            }`}>
              {phaseIcons[index]}
            </div>
            <span className="text-sm font-medium">{phaseNames[index]}</span>
          </motion.button>
        ))}
      </div>

      {/* Phase Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedPhase}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="phase-content"
        >
          <PhaseSection
            phase={phaseNames[selectedPhase] as "Cognitive" | "Synaptic" | "Neural" | "Activation" | "Amplification"}
            description={journeyData[selectedPhase].description}
            mission={journeyData[selectedPhase].mission}
            nftReward={journeyData[selectedPhase].nftReward}
            xpReward={journeyData[selectedPhase].xpReward}
            locked={journeyData[selectedPhase].locked}
            onNextPhase={() => handlePhaseClick(Math.min(selectedPhase + 1, journeyData.length - 1))}
            onPrevPhase={() => handlePhaseClick(Math.max(selectedPhase - 1, 0))}
            isFirstPhase={selectedPhase === 0}
            isLastPhase={selectedPhase === journeyData.length - 1}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default JourneyTimeline;
