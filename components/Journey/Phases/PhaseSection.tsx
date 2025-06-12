import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NFTBadge from '../Rewards/RewardBadge';
import ZynoBox from '../Zyno/ZynoBox';
import { ChevronLeft, ChevronRight, GraduationCap, Hammer, Award, Rocket, TrendingUp, Zap, Check, Brain, Sparkles } from 'lucide-react';
import { useStore } from '../../../utils/store';

interface PhaseSectionProps {
  phase: "Cognitive" | "Synaptic" | "Neural" | "Activation" | "Amplification";
  description: string;
  mission: string;
  nftReward?: string;
  xpReward?: number;
  locked?: boolean;
  onNextPhase?: () => void;
  onPrevPhase?: () => void;
  isFirstPhase?: boolean;
  isLastPhase?: boolean;
  currentMfaiBalance?: number;
}

/**
 * PhaseSection - Displays detailed content for each Activation Phase with missions, CTA, XP and Proof-of-Skill™ NFT
 * 
 * Features:
 * - Actionable CTA with conditional states
 * - XP bar segment for Skillchain Mining™
 * - Proof-of-Skill™ NFT visual if earned
 * - Zyno AI Co-Founder™ support
 * - Next/Previous navigation buttons
 * - NFT Pass enhancement tooltips
 */
const PhaseSection: FC<PhaseSectionProps> = ({
  phase,
  description,
  mission,
  nftReward,
  xpReward = 50,
  locked = false,
  onNextPhase,
  onPrevPhase,
  isFirstPhase = false,
  isLastPhase = false,
  currentMfaiBalance = 0
}) => {
  // Accéder directement au store Zustand
  const { currentPhase: storedPhase, setCurrentPhase } = useStore();
  
  // State local pour forcer le rendu
  const [localForceUpdate, setLocalForceUpdate] = useState<number>(0);

  // Phase-specific content and styling
  const getPhaseColor = () => {
    switch (phase) {
      case 'Cognitive':
        return 'from-blue-500 to-blue-700';
      case 'Synaptic':
        return 'from-purple-500 to-purple-700';
      case 'Neural':
        return 'from-yellow-500 to-yellow-700';
      case 'Activation':
        return 'from-green-500 to-green-700';
      case 'Amplification':
        return 'from-red-500 to-red-700';
      default:
        return 'from-indigo-500 to-indigo-700';
    }
  };

  const getPhaseIcon = () => {
    switch (phase) {
      case 'Cognitive':
        return <Brain className="w-6 h-6" />;
      case 'Synaptic':
        return <Hammer className="w-6 h-6" />;
      case 'Neural':
        return <Award className="w-6 h-6" />;
      case 'Activation':
        return <Rocket className="w-6 h-6" />;
      case 'Amplification':
        return <Sparkles className="w-6 h-6" />;
      default:
        return <Zap className="w-6 h-6" />;
    }
  };

  // Helper function to map new phase names to existing image filenames
  const getPhaseImageUrl = (phase: string): string => {
    const phaseImageMap: Record<string, string> = {
      'Cognitive': '/nfts/learn-badge.svg',
      'Synaptic': '/nfts/build-badge.svg',
      'Neural': '/nfts/prove-badge.svg',
      'Activation': '/nfts/activate-badge.svg',
      'Amplification': '/nfts/scale-badge.svg'
    };
    
    return phaseImageMap[phase] || `/nfts/default-badge.svg`;
  };

  // Access the store for XP and MFAI simulation
  const { addXP, addMfai, mfaiBalance } = useStore();
  
  // Local state for mission completion and NFT claiming
  const [missionCompleted, setMissionCompleted] = useState(false);
  const [nftClaimed, setNftClaimed] = useState(false);
  const [showRewardNotification, setShowRewardNotification] = useState(false);
  const [rewardMessage, setRewardMessage] = useState('');
  
  // Handle mission completion
  const handleStartMission = () => {
    // Simulate mission completion after 2 seconds
    setTimeout(() => {
      // Add XP and MFAI rewards
      addXP(xpReward);
      addMfai(Math.floor(xpReward/10));
      setMissionCompleted(true);
      
      // Show reward notification
      setRewardMessage(`+${xpReward} XP | +${Math.floor(xpReward/10)} $MFAI`);
      setShowRewardNotification(true);
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setShowRewardNotification(false);
      }, 3000);
    }, 2000);
  };

  return (
    <div className={`phase-section p-6 rounded-xl bg-[#0F172A] border border-[#22D3EE]/20 ${locked ? 'opacity-60' : ''}`}>
      {locked && (
        <div className="locked-overlay absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center z-10">
          <div className="text-center p-6">
            <i className="fas fa-lock text-4xl text-red-500 mb-4"></i>
            <h3 className="text-xl font-bold text-white mb-2">Cognitive Lock™ Active</h3>
            <p className="text-gray-300">Complete previous Neural Protocols™ or obtain required Sovereign Pass™ to unlock</p>
          </div>
        </div>
      )}

      {/* Neural Reward Notification */}
      {showRewardNotification && (
        <motion.div 
          className="reward-notification absolute top-4 right-4 bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white px-4 py-2 rounded-md shadow-lg z-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="flex items-center">
            <Brain className="w-4 h-4 mr-2" />
            <span className="font-medium">{rewardMessage}</span>
          </div>
        </motion.div>
      )}
      
      <div className="phase-content rounded-lg shadow-lg">
        <div className="flex items-center mb-4">
          <div className={`phase-icon w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-gradient-to-r ${getPhaseColor()}`}>
            {getPhaseIcon()}
          </div>
          <h3 className="text-xl font-bold">{phase} <span className="text-[#22D3EE]">Cognitive Protocol™</span></h3>
        </div>
        
        <p className="text-gray-300 mb-4">{description}</p>
        
        <div className="mission-box border border-[#9945FF]/30 rounded-md p-4 mb-6 bg-gray-900">
          <h4 className="text-sm uppercase text-gray-400 mb-2">Cognitive Mission™</h4>
          <p className="text-white">{mission}</p>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-xs text-gray-400 mr-2">Neural Rewards™:</span>
              <span className="text-xs font-medium text-[#14F195]">{xpReward} Synaptic XP™</span>
              <span className="mx-2 text-gray-600">|</span>
              <span className="text-xs font-medium text-[#9945FF]">{Math.floor(xpReward/10)} $MFAI</span>
            </div>
            <div className="text-xs text-gray-400">
              <span className="text-[#14F195]">Neuro-Balance™: {mfaiBalance} $MFAI</span>
            </div>
          </div>
        </div>

        {/* Sovereign Pass™ Enhancement Tooltip */}
        <div className="mb-4 p-3 border border-dashed border-[#9945FF]/40 rounded-md bg-[#9945FF]/10 text-xs">
          <div className="flex items-center">
            <div className="mr-2 text-[#9945FF]"><Sparkles className="h-4 w-4" /></div>
            <div>
              <span className="font-medium text-[#C084FC]">Sovereign Pass™ Enhancement:</span>
              <span className="ml-2 text-gray-300">
                {phase === 'Cognitive' && 'Neural Boost XP for Sovereign Pass holders'}
                {phase === 'Synaptic' && 'Unlock Synaptic Templates with Platinum Pass'}
                {phase === 'Neural' && 'Fast-track Neural Certification with Diamond Pass'}
                {phase === 'Activation' && 'Synaptic Governance™ role booster (Platinum and above)'}
                {phase === 'Amplification' && 'Eligible for Neuro-Dividends™ with any Pass'}
              </span>
            </div>
          </div>
        </div>

        {nftReward && (
          <div className="mb-6">
            <h4 className="text-sm uppercase text-gray-400 mb-2">Proof-of-Skill™ NFT</h4>
            <NFTBadge 
              title={nftReward}
              imageUrl={getPhaseImageUrl(phase)}
              claimed={nftClaimed}
              onClaim={() => {
                // Simulate NFT claiming
                setNftClaimed(true);
                // Add bonus XP for claiming NFT
                addXP(25);
                
                // Show reward notification
                setRewardMessage(`+25 Synaptic XP™ | Proof-of-Skill™ Claimed!`);
                setShowRewardNotification(true);
                
                // Hide notification after 3 seconds
                setTimeout(() => {
                  setShowRewardNotification(false);
                }, 3000);
              }}
            />
          </div>
        )}
        
        <div className="flex justify-between items-center mt-6">
          <div className="flex space-x-3">
            <button 
              onClick={onPrevPhase}
              disabled={isFirstPhase}
              className={`px-4 py-2 rounded-md font-medium flex items-center ${isFirstPhase ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-[#0F172A] border border-[#22D3EE] text-[#22D3EE] hover:bg-[#22D3EE]/10'}`}
            >
              <Brain className="w-4 h-4 mr-1" /> Previous Protocol
            </button>
            
            <button 
              onClick={() => {
                // Mettre à jour directement le store Zustand
                if (!isLastPhase) {
                  const nextPhase = storedPhase + 1;
                  setCurrentPhase(nextPhase);
                }
                
                // Utiliser également le callback pour maintenir la compatibilité
                if (onNextPhase) {
                  onNextPhase();
                }
                
                // Forcer un re-render local
                setLocalForceUpdate(prev => prev + 1);
              }}
              disabled={isLastPhase}
              className={`px-4 py-2 rounded-md font-medium flex items-center ${isLastPhase ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-[#0F172A] border border-[#22D3EE] text-[#22D3EE] hover:bg-[#22D3EE]/10'}`}
            >
              Next Protocol <Sparkles className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <button 
            onClick={handleStartMission}
            disabled={missionCompleted}
            className={`px-6 py-2 rounded-md font-medium flex items-center ${missionCompleted ? 'bg-[#14F195] text-white' : 'bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white hover:opacity-90'}`}
          >
            {missionCompleted ? (
              <>
                <Check className="w-4 h-4 mr-1" /> Neural Protocol™ Completed
              </>
            ) : (
              'Activate Neural Protocol™'
            )}
          </button>
        </div>
        
        {/* AI Co-Founder™ (Zyno) Support Section */}
        <div className="mt-6 border-t border-gray-700 pt-4">
          <ZynoBox
            context={`User is exploring the ${phase} Cognitive Protocol™ with Neural Mission™: ${mission}`}
            compact={false}
          />
        </div>
      </div>
    </div>
  );
};

export default PhaseSection;
