import React, { FC, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface EnhancedJourneyCardProps {
  title: string;
  subtitle: string;
  tagline: string;
  target: string;
  profileType: string;
  missionType: string;
  icon: string;
  proofs: string[];
  slug: string;
}

const EnhancedJourneyCard: FC<EnhancedJourneyCardProps> = ({ title, subtitle, tagline, target, profileType, missionType, icon, proofs, slug }) => {
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
  
  // Navigate to journey detail page
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
    >
      {/* Glow effect on hover */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-purple-500 rounded-full blur-3xl -z-10"
        variants={glowVariants}
      />
      
      <div className="p-6 h-full flex flex-col">
        {/* Card header */}
        <motion.div variants={contentVariants} className="mb-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{icon}</span>
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
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-800 text-gray-300">
              {target}
            </span>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-900/50 text-purple-300">
              {profileType}
            </span>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-900/50 text-blue-300">
              {missionType}
            </span>
          </div>
        </motion.div>
        
        {/* Preview badges on hover */}
        <motion.div variants={badgeVariants} className="mt-4">
          <p className="text-xs text-gray-400 mb-2">Unlock these Protocol Proofs:</p>
          <div className="flex gap-2 justify-center">
            {proofs.map((proof: string, index: number) => (
              <div 
                key={index} 
                className="w-12 h-12 rounded-full bg-gray-800 p-1 flex items-center justify-center"
              >
                <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-sm">
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
            className="block w-full text-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Explore this journey
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EnhancedJourneyCard;
