import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import JourneyTimeline from '../../components/Journey/JourneyTimeline';
import PhaseSection from '../../components/Journey/PhaseSection';
import XPTracker from '../../components/Journey/XPTracker';
import { useStore, useNextRewardThreshold } from '../../utils/store';
import { getJourneyByPersona } from '../../utils/journeyData';
// Import supprimé car la vérification NFT a été désactivée
// import { isPhaseAccessible } from '../../utils/nftUtils';
import { Journey, JourneyWithLock } from '../../utils/types';
import { Trophy, Key, Diamond } from 'lucide-react';

/**
 * Persona Journey Page - Dynamic route for each user journey
 * 
 * Features:
 * - Displays the 5-phase journey timeline
 * - Shows XP progress and rewards
 * - Contextual Zyno assistance
 * - Wallet-aware phase locking
 */
const PersonaJourneyPage: FC = () => {
  const router = useRouter();
  const { persona } = router.query;
  const { 
    walletConnected, 
    walletAddress, 
    currentPhase, 
    setCurrentPhase, 
    totalXP,
    mfaiBalance
  } = useStore();
  
  const [journey, setJourney] = useState<Journey | null>(null);
  const [loading, setLoading] = useState(true);
  const [journeyWithLock, setJourneyWithLock] = useState<JourneyWithLock | null>(null);
  
  const nextRewardAt = useNextRewardThreshold();
  
  // Load journey data based on persona parameter
  useEffect(() => {
    if (persona) {
      const journeyData = getJourneyByPersona(persona as string);
      
      if (journeyData) {
        setJourney(journeyData);
        
        // Pour le prototype, toutes les phases sont accessibles sans restriction
        const processPhases = () => {
          const phases = journeyData.phases.map(phase => ({
            ...phase,
            locked: false // Toutes les phases sont déverrouillées
          }));
          
          setJourneyWithLock({
            ...journeyData,
            phases
          });
          setLoading(false);
        };
        
        processPhases();
      } else {
        // Journey not found, redirect to journeys index
        router.push('/journeys');
      }
    }
  }, [persona, walletAddress, currentPhase, router]);
  
  // Handle phase change
  const handlePhaseChange = (index: number) => {
    setCurrentPhase(index);
  };
  
  // Navigation entre les phases
  const handleNextPhase = () => {
    if (journeyWithLock && currentPhase < journeyWithLock.phases.length - 1) {
      setCurrentPhase(currentPhase + 1);
    }
  };
  
  const handlePrevPhase = () => {
    if (currentPhase > 0) {
      setCurrentPhase(currentPhase - 1);
    }
  };
  
  // If loading or no journey found
  if (loading || !journey) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="persona-journey-page bg-gray-900 min-h-screen text-white p-6 md:p-10">
      {/* Header with Back Button */}
      <header className="mb-8">
        <div className="container mx-auto">
          <button 
            onClick={() => router.push('/journeys')}
            className="text-gray-400 hover:text-white mb-4 flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Journeys
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{journey.icon}</span>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {journey.label} Journey
                </h1>
              </div>
              <p className="text-gray-300 mt-2 max-w-2xl">{journey.description}</p>
            </div>
            
            {/* XP Tracker */}
            <div className="mt-6 md:mt-0">
              <XPTracker totalXP={totalXP} nextRewardAt={nextRewardAt} />
            </div>
          </div>
        </div>
      </header>
      
      {/* Zyno Quote */}
      <div className="container mx-auto mb-8">
        <div className="bg-gray-800 border-l-4 border-blue-500 p-4 rounded-r-lg">
          <p className="text-gray-300 italic">
            <span className="text-blue-400 font-semibold">&ldquo;</span>
            {journey.zynoSays}
            <span className="text-blue-400 font-semibold">&rdquo;</span>
          </p>
          <p className="text-right text-sm text-gray-400 mt-1">— Zyno AI Co-Founder™</p>
        </div>
      </div>
      
      {/* Journey Timeline */}
      <div className="container mx-auto mb-8">
        <JourneyTimeline
          currentPhase={currentPhase}
          onPhaseChange={handlePhaseChange}
          journeyData={journeyWithLock?.phases || []}
        />
      </div>
      
      {/* Current Phase Content */}
      <div className="container mx-auto mb-12">
        {journeyWithLock && journeyWithLock.phases[currentPhase] && (
          <PhaseSection
            phase={journeyWithLock.phases[currentPhase].title as "Learn" | "Build" | "Prove" | "Activate" | "Scale"}
            description={journeyWithLock.phases[currentPhase].description}
            mission={journeyWithLock.phases[currentPhase].mission || "Complete this phase to progress in your journey"}
            nftReward={journeyWithLock.phases[currentPhase].nftReward}
            xpReward={journeyWithLock.phases[currentPhase].xpReward}
            locked={journeyWithLock.phases[currentPhase].locked}
            onNextPhase={handleNextPhase}
            onPrevPhase={handlePrevPhase}
            isFirstPhase={currentPhase === 0}
            isLastPhase={currentPhase === journeyWithLock.phases.length - 1}
            currentMfaiBalance={mfaiBalance}
          />
        )}
      </div>
      
      {/* Rewards Section */}
      <div className="container mx-auto mb-12">
        <h2 className="text-xl font-bold mb-4 text-white">Journey Rewards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {journey.rewards.map((reward, index) => (
            <div 
              key={index}
              className="bg-gray-800 p-4 rounded-lg border border-gray-700"
            >
              <div className="flex items-center gap-3">
                <div className="reward-icon w-10 h-10 bg-[#0F172A] border border-[#22D3EE]/30 rounded-full flex items-center justify-center text-lg">
                  {index === 0 ? <Trophy className="w-5 h-5 text-[#14F195]" /> : 
                   index === 1 ? <Key className="w-5 h-5 text-[#9945FF]" /> : 
                   <Diamond className="w-5 h-5 text-[#22D3EE]" />}
                </div>
                <span className="text-white">{reward}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Zyno Assistant - Removed from here as it's now included in PhaseSection */}
      
      {/* Pass Requirement Notice */}
      {journey.requiredPass !== 'Free' && !walletConnected && (
        <motion.div 
          className="fixed bottom-6 left-6 max-w-sm bg-yellow-900 p-4 rounded-lg border border-yellow-700"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          <h3 className="text-yellow-300 font-bold mb-1">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            {journey.requiredPass} Pass Required
          </h3>
          <p className="text-yellow-100 text-sm">
            This journey requires a {journey.requiredPass} Pass NFT to access all phases. Connect your wallet to check eligibility.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default PersonaJourneyPage;
