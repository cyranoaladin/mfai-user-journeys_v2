import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Target, Award, ChevronRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { JourneyContent } from '../../utils/markdownParser';

interface JourneyIntroProps {
  /**
   * Journey content data
   */
  journey: JourneyContent;
  /**
   * Current phase index (0-based)
   */
  currentPhase?: number;
}

/**
 * JourneyIntro component
 * 
 * Displays an introduction section for a journey with:
 * - Header with icon, title, and subtitle
 * - Phase tracker showing progress
 * - Rewards preview
 * - Call to action button
 */
const JourneyIntro: FC<JourneyIntroProps> = ({ 
  journey,
  currentPhase = 0
}) => {
  // Extract properties from journey object according to JourneyContent interface
  const {
    metadata,
    phases,
    rewards,
    callToAction
  } = journey;
  
  // Extract metadata properties
  const {
    title,
    subtitle,
    tagline,
    target,
    profileType,
    missionType,
    icon
  } = metadata;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="journey-intro bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden mb-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header section */}
      <motion.div 
        className="p-6 md:p-8 border-b border-gray-700"
        variants={itemVariants}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          {/* Icon */}
          <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 backdrop-blur-sm">
            <span className="text-4xl" role="img" aria-label="Journey icon">{icon}</span>
          </div>
          
          {/* Title and subtitle */}
          <div className="flex-grow">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h1>
            <p className="text-gray-300">{subtitle}</p>
            <p className="text-gray-400 italic mt-2">"{tagline}"</p>
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mt-6">
          <span className="text-sm font-medium px-3 py-1 rounded-full bg-gray-700 text-gray-300 flex items-center gap-1">
            <Users size={14} />
            {target}
          </span>
          <span className="text-sm font-medium px-3 py-1 rounded-full bg-purple-900/50 text-purple-300 flex items-center gap-1">
            <Target size={14} />
            {profileType}
          </span>
          <span className="text-sm font-medium px-3 py-1 rounded-full bg-blue-900/50 text-blue-300 flex items-center gap-1">
            <Award size={14} />
            {missionType}
          </span>
        </div>
      </motion.div>
      
      {/* Phase tracker */}
      <motion.div 
        className="p-6 border-b border-gray-700 bg-gray-800/30"
        variants={itemVariants}
      >
        <h3 className="text-sm uppercase text-gray-400 font-medium mb-4 flex items-center gap-2">
          <Zap size={16} className="text-yellow-400" />
          Journey Progress
        </h3>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {phases.map((phase, index) => (
            <div 
              key={index}
              className={`flex items-center ${index !== phases.length - 1 ? 'mr-2' : ''}`}
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index < currentPhase 
                    ? 'bg-green-600 text-white' 
                    : index === currentPhase 
                      ? 'bg-blue-600 text-white ring-2 ring-blue-400 ring-offset-2 ring-offset-gray-800' 
                      : 'bg-gray-700 text-gray-400'
                }`}
              >
                {index + 1}
              </div>
              {index !== phases.length - 1 && (
                <div className="w-8 h-0.5 bg-gray-700">
                  <div 
                    className={`h-full ${index < currentPhase ? 'bg-green-600' : 'bg-transparent'}`} 
                    style={{ width: index < currentPhase ? '100%' : '0%' }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <p className="mt-3 text-sm text-gray-300">
          {currentPhase === 0 
            ? 'Ready to start your journey?' 
            : currentPhase === phases.length 
              ? 'Journey completed!' 
              : `Phase ${currentPhase} of ${phases.length}: ${phases[currentPhase - 1]?.title || ''}`}
        </p>
      </motion.div>
      
      {/* Rewards preview and CTA */}
      <motion.div 
        className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        variants={itemVariants}
      >
        {/* Rewards */}
        <div>
          <h3 className="text-sm uppercase text-gray-400 font-medium mb-3">Rewards</h3>
          <div className="flex gap-3">
            {rewards.map((reward, index) => (
              <div 
                key={index}
                className="w-12 h-12 rounded-full bg-gray-800 p-1 flex items-center justify-center"
                title={reward.milestone}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-700 to-purple-700 flex items-center justify-center text-sm shadow-lg shadow-blue-900/30">
                  {index === 0 ? '🏆' : index === 1 ? '🔍' : '🧠'}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        {callToAction && callToAction.length > 0 && (
          <Link 
            href="#"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all shadow-lg shadow-blue-900/30 font-medium"
          >
            {callToAction[0] || 'Start Journey'}
            <ChevronRight size={18} />
          </Link>
        )}
      </motion.div>
      
      {/* Style for hiding scrollbar but allowing scroll */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.div>
  );
};

export default JourneyIntro;
