import React, { FC } from 'react';
import { motion } from 'framer-motion';

interface ProofBadgeProps {
  title?: string;
  description?: string;
  icon?: string;
  index?: number;
  proof?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ProofBadge: FC<ProofBadgeProps> = ({ title, description, icon, index = 0, proof, size = 'md' }) => {
  // If proof is provided, extract title from it
  const badgeTitle = proof || title || '';
  const badgeDescription = description || '';
  
  // Animation variants
  const badgeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        delay: index * 0.1
      }
    }
  };

  // Get badge color based on title
  const getBadgeColor = () => {
    // Only proceed if we have a valid badge title
    if (!badgeTitle) {
      return {
        bg: 'bg-gradient-to-br from-gray-900/30 to-blue-900/30',
        border: 'border-gray-500/30',
        text: 'text-gray-300'
      };
    }
    
    const colors: Record<string, { bg: string, border: string, text: string }> = {
      'Proof-of-Vision™': {
        bg: 'bg-gradient-to-br from-purple-900/30 to-blue-900/30',
        border: 'border-purple-500/30',
        text: 'text-purple-300'
      },
      'Proof-of-Skill™': {
        bg: 'bg-gradient-to-br from-blue-900/30 to-cyan-900/30',
        border: 'border-blue-500/30',
        text: 'text-blue-300'
      },
      'Proof-of-Alignment™': {
        bg: 'bg-gradient-to-br from-indigo-900/30 to-violet-900/30',
        border: 'border-indigo-500/30',
        text: 'text-indigo-300'
      },
      'Proof-of-Activation™': {
        bg: 'bg-gradient-to-br from-green-900/30 to-emerald-900/30',
        border: 'border-green-500/30',
        text: 'text-green-300'
      },
      'Impact Trail™': {
        bg: 'bg-gradient-to-br from-amber-900/30 to-orange-900/30',
        border: 'border-amber-500/30',
        text: 'text-amber-300'
      },
      'Skillchain Token™': {
        bg: 'bg-gradient-to-br from-cyan-900/30 to-teal-900/30',
        border: 'border-cyan-500/30',
        text: 'text-cyan-300'
      },
      'Neuro-Dividends™': {
        bg: 'bg-gradient-to-br from-pink-900/30 to-rose-900/30',
        border: 'border-pink-500/30',
        text: 'text-pink-300'
      },
      'Strategic Circle Status™': {
        bg: 'bg-gradient-to-br from-violet-900/30 to-fuchsia-900/30',
        border: 'border-violet-500/30',
        text: 'text-violet-300'
      }
    };
    
    // Find a partial match if exact match not found
    const exactMatch = colors[badgeTitle];
    if (exactMatch) return exactMatch;
    
    // Look for partial matches
    for (const key in colors) {
      if (badgeTitle && badgeTitle.includes(key.replace('™', ''))) {
        return colors[key];
      }
    }
    
    // Default color
    return colors[badgeTitle] || {
      bg: 'bg-gradient-to-br from-gray-900/30 to-blue-900/30',
      border: 'border-gray-500/30',
      text: 'text-gray-300'
    };
  };
  
  // Get size classes
  const getSizeClasses = () => {
    const sizes: Record<string, { container: string, icon: string, title: string }> = {
      'sm': {
        container: 'w-10 h-10',
        icon: 'text-lg',
        title: 'text-xs'
      },
      'md': {
        container: 'w-14 h-14',
        icon: 'text-xl',
        title: 'text-sm'
      },
      'lg': {
        container: 'w-20 h-20',
        icon: 'text-2xl',
        title: 'text-base'
      }
    };
    
    return sizes[size] || sizes['md'];
  };
  
  const sizeClasses = getSizeClasses();
  
  return (
    <motion.div
      className={`proof-badge ${getBadgeColor().bg} rounded-lg p-3 border ${getBadgeColor().border} flex flex-col items-center justify-center text-center ${sizeClasses.container}`}
      variants={badgeVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={`${sizeClasses.icon} mb-1`}>{icon || '🏆'}</div>
      {badgeTitle && <h4 className={`font-bold ${getBadgeColor().text} ${sizeClasses.title}`}>{badgeTitle}</h4>}
      {badgeDescription && <p className="text-xs text-gray-400">{badgeDescription}</p>}
    </motion.div>
  );
};

export default ProofBadge;
