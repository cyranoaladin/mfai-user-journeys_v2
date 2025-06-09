import React, { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface JourneyCardProps {
  persona: string;
  icon: ReactNode;
  tagline: string;
  cta: string;
  progress?: number; // % of journey completed
  onClick?: () => void; // Add onClick handler for card interaction
}

/**
 * JourneyCard - Displays a visual summary of each user journey (persona) with entry CTA
 * 
 * Features:
 * - Responsive hover animation
 * - Progress bar if journey started
 * - Dynamic CTA: "Start", "Resume", "Restart"
 * - Color theme varies by persona
 */
const JourneyCard: FC<JourneyCardProps> = ({ persona, icon, tagline, cta, progress = 0, onClick }) => {
  // Determine CTA text based on progress
  const ctaText = progress === 0 ? 'Start' : progress === 100 ? 'Restart' : 'Resume';
  
  // Determine color theme based on persona
  const getPersonaColor = () => {
    switch (persona) {
      case 'student':
        return 'from-blue-500 to-blue-700';
      case 'entrepreneur':
        return 'from-purple-500 to-purple-700';
      case 'investor':
        return 'from-green-500 to-green-700';
      case 'builder':
        return 'from-orange-500 to-orange-700';
      case 'mentor':
        return 'from-yellow-500 to-yellow-700';
      case 'visionary':
        return 'from-red-500 to-red-700';
      default:
        return 'from-indigo-500 to-indigo-700';
    }
  };

  return (
    <motion.div
      className="journey-card bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800 hover:border-blue-500 transition-all cursor-pointer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <div className="icon-container mb-4 text-4xl">{icon}</div>
      
      <h3 className={`text-xl font-bold mb-2 bg-gradient-to-r ${getPersonaColor()} bg-clip-text text-transparent`}>
        {persona.charAt(0).toUpperCase() + persona.slice(1)}
      </h3>
      
      <p className="text-gray-300 mb-4">{tagline}</p>
      
      {progress > 0 && (
        <div className="progress-container w-full h-2 bg-gray-700 rounded-full mb-4">
          <div 
            className={`h-full rounded-full bg-gradient-to-r ${getPersonaColor()}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      
      <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
        {cta || `${ctaText} Journey`}
      </button>
    </motion.div>
  );
};

export default JourneyCard;
