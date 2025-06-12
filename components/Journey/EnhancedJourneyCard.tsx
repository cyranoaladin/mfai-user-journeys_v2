import React, { FC, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Clock, Users, Target, Award } from 'lucide-react';

interface EnhancedJourneyCardProps {
  /**
   * Main title of the journey
   */
  title: string;
  /**
   * Subtitle describing the journey transformation
   */
  subtitle: string;
  /**
   * Short tagline or quote for the journey
   */
  tagline: string;
  /**
   * Target audience for this journey
   */
  target: string;
  /**
   * Type of profile this journey is designed for
   */
  profileType: string;
  /**
   * Type of mission or activity in this journey
   */
  missionType: string;
  /**
   * Emoji or icon representing the journey
   */
  icon: string;
  /**
   * Array of proof names that can be earned
   */
  proofs: string[];
  /**
   * URL slug for the journey
   */
  slug: string;
  /**
   * Estimated completion time in minutes (optional)
   */
  estimatedTime?: number;
  /**
   * Language of the journey content (optional)
   */
  language?: 'EN' | 'FR' | 'AR';
}

const EnhancedJourneyCard: FC<EnhancedJourneyCardProps> = ({ 
  title, 
  subtitle, 
  tagline, 
  target, 
  profileType, 
  missionType, 
  icon, 
  proofs, 
  slug,
  estimatedTime,
  language
 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  
  // Animation variants
  const cardVariants = {
    rest: { 
      scale: 1,
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    hover: { 
      scale: 1.02,
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)'
    }
  };
  
  const glowVariants = {
    rest: { 
      opacity: 0,
      scale: 0.8
    },
    hover: { 
      opacity: 0.15,
      scale: 1.2,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };
  
  const contentVariants = {
    rest: { y: 0 },
    hover: { y: -20 }
  };
  
  const badgeVariants = {
    rest: { opacity: 0, y: 20 },
    hover: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.1 }
    }
  };
  
  /**
   * Navigate to journey detail page
   */
  const handleClick = () => {
    // Normalize slug: convert to lowercase and replace underscores with hyphens
    const normalizedSlug = slug.toLowerCase().replace(/_/g, '-');
    router.push(`/journey/${normalizedSlug}`);
  };
  
  // Get background gradient based on profile type
  const getBackgroundGradient = () => {
    const gradients: Record<string, string> = {
      'Builder': 'from-blue-900/20 to-purple-900/20',
      'Creator': 'from-pink-900/20 to-orange-900/20',
      'Strategist': 'from-indigo-900/20 to-cyan-900/20',
      'Investor': 'from-emerald-900/20 to-yellow-900/20',
      'Researcher': 'from-violet-900/20 to-blue-900/20',
      'Operator': 'from-gray-900/20 to-blue-900/20',
      'Explorer': 'from-purple-900/20 to-pink-900/20'
    };
    
    return gradients[profileType] || 'from-blue-900/20 to-purple-900/20';
  };
  
  // Get accent color based on profile type
  const getAccentColor = () => {
    const colors: Record<string, string> = {
      'Builder': 'border-blue-500/30',
      'Creator': 'border-pink-500/30',
      'Strategist': 'border-indigo-500/30',
      'Investor': 'border-emerald-500/30',
      'Researcher': 'border-violet-500/30',
      'Operator': 'border-gray-500/30',
      'Explorer': 'border-purple-500/30'
    };
    
    return colors[profileType] || 'border-blue-500/30';
  };
  
  return (
    <motion.div
      className={`enhanced-journey-card relative overflow-hidden rounded-xl border ${getAccentColor()} bg-gradient-to-br ${getBackgroundGradient()} backdrop-blur-sm`}
      initial="rest"
      whileHover="hover"
      animate={isHovered ? "hover" : "rest"}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      variants={cardVariants}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Explore ${title} journey`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Glow effect on hover */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-purple-500 rounded-full blur-3xl -z-10"
        variants={glowVariants}
      />
      
      <div className="p-6 h-full flex flex-col">
        {/* Language badge (if specified) */}
        {language && (
          <div className="absolute top-3 right-3">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-800/80 text-gray-300">
              {language}
            </span>
          </div>
        )}
        
        {/* Card header */}
        <motion.div variants={contentVariants} className="mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-600/30 to-purple-600/30 backdrop-blur-sm">
              <span className="text-3xl" role="img" aria-label="Journey icon">{icon}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <p className="text-sm text-gray-300">{subtitle}</p>
            </div>
          </div>
          
          <div className="mt-3">
            <p className="text-gray-300 italic">"{tagline}"</p>
          </div>
        </motion.div>
        
        {/* Card content */}
        <motion.div variants={contentVariants} className="flex-grow">
          {/* Tags row */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-800 text-gray-300 flex items-center gap-1">
              <Users size={12} />
              {target}
            </span>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-900/50 text-purple-300 flex items-center gap-1">
              <Target size={12} />
              {profileType}
            </span>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-900/50 text-blue-300 flex items-center gap-1">
              <Award size={12} />
              {missionType}
            </span>
          </div>
          
          {/* Estimated time (if provided) */}
          {estimatedTime && (
            <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
              <Clock size={12} />
              <span>Est. {estimatedTime} min</span>
            </div>
          )}
        </motion.div>
        
        {/* Preview badges on hover */}
        <motion.div variants={badgeVariants} className="mt-4">
          <p className="text-xs text-gray-400 mb-2">Unlock these Protocol Proofs:</p>
          <div className="flex gap-2 justify-center">
            {proofs.map((proof: string, index: number) => (
              <div 
                key={index} 
                className="w-12 h-12 rounded-full bg-gray-800 p-1 flex items-center justify-center"
                aria-label={`Protocol Proof: ${proof}`}
                title={proof}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-700 to-purple-700 flex items-center justify-center text-sm shadow-lg shadow-blue-900/30">
                  {index === 0 ? '🏆' : index === 1 ? '🔍' : '🧠'}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* CTA */}
        <motion.div variants={badgeVariants} className="mt-4">
          <Link 
            href={`/journey/${slug.toLowerCase().replace(/_/g, '-')}`}
            className="block w-full text-center py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all shadow-lg shadow-blue-900/30 font-medium"
            aria-label={`Explore ${title} journey details`}
          >
            Explore this journey
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EnhancedJourneyCard;
