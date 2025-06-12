import React, { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Award, Brain, Sparkles } from 'lucide-react';
import RewardBadge from './RewardBadge';
import { JourneyContent } from '../../../utils/markdownParser';

// Fonction utilitaire pour mapper les noms de jalons aux chemins d'images SVG
const getBadgeImageUrl = (milestone: string): string => {
  // Mapping des noms de jalons aux noms de fichiers SVG
  const badgeMapping: Record<string, string> = {
    'Cognitive Milestone': '/nfts/learn-badge.svg',
    'Synaptic Milestone': '/nfts/build-badge.svg',
    'Neural Milestone': '/nfts/prove-badge.svg',
    'Activation Milestone': '/nfts/activate-badge.svg',
    'Amplification Milestone': '/nfts/scale-badge.svg',
    // Fallbacks pour les anciens noms si nécessaire
    'Learn Milestone': '/nfts/learn-badge.svg',
    'Build Milestone': '/nfts/build-badge.svg',
    'Prove Milestone': '/nfts/prove-badge.svg',
    'Activate Milestone': '/nfts/activate-badge.svg',
    'Scale Milestone': '/nfts/scale-badge.svg',
  };
  
  return badgeMapping[milestone] || '/nfts/learn-badge.svg'; // Image par défaut si le jalon n'est pas trouvé
};

interface ProofSectionProps {
  rewards: JourneyContent['rewards'];
  unlockedProofs: number[];
  onProofClick: (index: number) => void;
}

/**
 * ProofSection Component - Displays Proof-of-Skill Tokens™ and Neuro-Dividends™ for journey completion
 */
const ProofSection: FC<ProofSectionProps> = ({ 
  rewards, 
  unlockedProofs, 
  onProofClick 
}) => {
  return (
    <div className="space-y-6">
      {/* Explication des badges */}
      <div className="flex items-center justify-between text-xs text-gray-300 mb-4">
        <div className="flex items-center gap-2">
          <Unlock className="h-4 w-4 text-green-400" />
          <span>Unlocked Tokens</span>
        </div>
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-gray-400" />
          <span>Locked Tokens</span>
        </div>
      </div>
      
      {rewards && rewards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {rewards.map((reward, index) => {
              const isUnlocked = unlockedProofs.includes(index);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative ${isUnlocked ? 'z-10' : 'grayscale-[30%] hover:grayscale-0 transition-all duration-300'}`}
                >
                  {isUnlocked && (
                    <motion.div 
                      className="absolute -top-2 -right-2 bg-green-500 text-white p-1 rounded-full z-20"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, delay: index * 0.1 + 0.3 }}
                    >
                      <Unlock className="h-4 w-4" />
                    </motion.div>
                  )}
                  <RewardBadge 
                    title={`${reward.milestone} ${isUnlocked ? '(Unlocked)' : '(Locked)'}`}
                    description={reward.proof}
                    imageUrl={getBadgeImageUrl(reward.milestone)}
                    claimed={isUnlocked}
                    onClaim={() => onProofClick(index)}
                  />
                  {isUnlocked && (
                    <div className="mt-2 text-xs text-green-400 flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      <span>Cognitive Lock™ unlocked - Neuro-Dividend™ earned</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      ) : (
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-center">
          <Brain className="h-12 w-12 mx-auto text-gray-500 mb-3" />
          <p className="text-gray-400">No Proof-of-Skill Tokens™ available for this journey yet.</p>
        </div>
      )}
    </div>
  );
};

export default ProofSection;
