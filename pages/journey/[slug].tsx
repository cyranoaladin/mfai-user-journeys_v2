import { useWallet } from '@solana/wallet-adapter-react';
import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

// Layout and core components
import PhaseSection from '@/components/Journey/Phases/PhaseSection';
import ZynoSimulator from '@/components/Journey/Zyno/ZynoSimulator';
import MainLayout from '@/components/Layout/MainLayout';
import WalletConnect from '@/components/WalletConnect';

// New modular components
import FinalRoleSection from '@/components/Journey/FinalRoleSection';
import JourneyHeader from '@/components/Journey/JourneyHeader';
import JourneySidebar from '@/components/Journey/JourneySidebar';
import PhaseFeedback from '@/components/Journey/Phases/PhaseFeedback';
import WhyItMatters from '@/components/Journey/WhyItMatters';

// Hooks personnalisés
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { usePhaseBadges } from '@/hooks/usePhaseBadges';
import { usePhaseBalance } from '@/hooks/usePhaseBalance';
import { usePhaseForceUpdate } from '@/hooks/usePhaseForceUpdate';
import { usePhaseProgress } from '@/hooks/usePhaseProgress';
import { usePhaseSystem } from '@/hooks/usePhaseSystem';

// UI components
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { AchievementNotification } from '../../components/Journey/AchievementNotification/AchievementNotification';

// Data and utilities
import { getJourneyByPersona, getAllJourneys, Journey } from '@/utils/journeyData';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Brain, Award, Zap } from 'lucide-react';

interface JourneyPageProps {
  journey: Journey | null;
}

export default function JourneyPage({ journey: initialJourney }: JourneyPageProps) {
  const router = useRouter();
  const { slug } = router.query;
  const { publicKey } = useWallet();
  const { toast } = useToast();
  const [isZynoModalOpen, setIsZynoModalOpen] = useState(false);

  // États liés aux phases
  const [journey, setJourney] = useState<Journey | null>(initialJourney);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);

  // États liés aux preuves
  const [progressPercentage, setProgressPercentage] = useState(0);

  // État pour les notifications d'accomplissements
  const [achievementNotification, setAchievementNotification] = useState<{
    title: string;
    description: string;
    isVisible: boolean;
  }>({
    title: '',
    description: '',
    isVisible: false,
  });

  // Hooks personnalisés
  const { goToPreviousPhase, canNavigate } = usePhaseSystem();
  const { updateProgress } = usePhaseProgress();
  const { checkBadges } = usePhaseBadges();
  const { updateBalance } = usePhaseBalance();
  const { triggerUpdate } = usePhaseForceUpdate();

  // Calculs mémoïsés
  const phases = useMemo(() => {
    return journey?.phases || [];
  }, [journey]);

  const safePhaseIndex = useMemo(() => {
    return Math.min(currentPhaseIndex, phases.length - 1 >= 0 ? phases.length - 1 : 0);
  }, [currentPhaseIndex, phases.length]);

  const currentPhase = useMemo(() => {
    return phases[currentPhaseIndex] || phases[0];
  }, [phases, currentPhaseIndex]);

  // Callbacks
  const handleNextPhase = useCallback(() => {
    if (!journey) return;
    if (currentPhaseIndex < journey.phases.length - 1) {
      setCurrentPhaseIndex(prev => prev + 1);
      setAchievementNotification({
        title: 'Phase Completed! 🎉',
        description: `You've unlocked ${journey.phases[currentPhaseIndex + 1]?.title}`,
        isVisible: true,
      });
      toast({
        title: 'Phase Unlocked!',
        description: `You now have access to ${journey.phases[currentPhaseIndex + 1]?.title}`,
      });
    }
  }, [currentPhaseIndex, journey, toast]);

  const handlePreviousPhase = useCallback(() => {
    if (currentPhaseIndex > 0) {
      setCurrentPhaseIndex(prev => prev - 1);
      triggerUpdate();
    }
  }, [currentPhaseIndex, triggerUpdate]);

  // Keyboard navigation
  useKeyboardNavigation({
    onNext: () => handleNextPhase(),
    onPrevious: () => handlePreviousPhase(),
    enabled: true,
  });

  // Effects
  useEffect(() => {
    if (!slug || !initialJourney) return;
    setJourney(initialJourney);
  }, [slug, initialJourney]);

  useEffect(() => {
    if (currentPhaseIndex !== undefined) {
      updateProgress();
      checkBadges(currentPhaseIndex);
    }
  }, [currentPhaseIndex, updateProgress, checkBadges]);

  useEffect(() => {
    if (publicKey) {
      updateBalance();
    }
  }, [publicKey, updateBalance]);

  useEffect(() => {
    if (currentPhaseIndex !== safePhaseIndex) {
      setCurrentPhaseIndex(safePhaseIndex);
    }
  }, [safePhaseIndex, currentPhaseIndex]);

  useEffect(() => {
    if (phases.length > 0) {
      const targetPercentage = (currentPhaseIndex / (phases.length - 1)) * 100;
      setProgressPercentage(targetPercentage);
    }
  }, [currentPhaseIndex, phases.length]);

  // Construction de l'objet metadata
  const metadata = {
    title: journey?.label || '',
    subtitle: journey?.tagline || '',
    tagline: journey?.tagline || '',
    target: journey?.profileType || '',
    profileType: journey?.profileType || '',
    missionType: journey?.missionType || '',
    icon: journey?.icon || '',
    slug: journey?.slug || '',
    description: journey?.description || '',
  };

  // Rendu conditionnel
  if (router.isFallback || !journey) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#14F195] mx-auto mb-4"></div>
            <h2 className="text-xl font-bold">Loading your Cognitive Journey...</h2>
            <p className="text-gray-400 mt-2">Zyno is preparing your personalized experience</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Animation variants for content
  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
  };

  // Handle Zyno modal
  const handleZynoClick = () => {
    setIsZynoModalOpen(true);
  };

  return (
    <MainLayout>
      <Head>
        <title>{`${metadata.title || 'Journey'} | Money Factory AI`}</title>
        <meta name="description" content={metadata.description || 'Cognitive Activation Journey'} />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white">
        {/* Hero Section */}
        <div className="relative overflow-hidden border-b border-gray-800">
          <div className="absolute inset-0 bg-gradient-to-r from-[#9945FF]/20 to-[#14F195]/20 blur-3xl" />
          <div className="relative container mx-auto px-6 py-12">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              {/* Journey Info */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#9945FF] to-[#14F195] flex items-center justify-center text-3xl shadow-lg">
                    {journey.icon}
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9945FF] to-[#14F195]">
                      {journey.label}
                    </h1>
                    <p className="text-xl text-gray-300 mt-2">{journey.tagline}</p>
                  </div>
                </div>
                
                <p className="text-gray-300 text-lg mb-6 max-w-3xl">
                  {journey.description}
                </p>

                {/* Journey Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-black/30 border border-[#14F195]/20">
                    <div className="text-2xl font-bold text-[#14F195]">{journey.phases.length}</div>
                    <div className="text-sm text-gray-400">Phases</div>
                  </div>
                  <div className="p-4 rounded-xl bg-black/30 border border-[#9945FF]/20">
                    <div className="text-2xl font-bold text-[#9945FF]">{journey.phases.reduce((sum, p) => sum + p.xpReward, 0)}</div>
                    <div className="text-sm text-gray-400">Total XP</div>
                  </div>
                  <div className="p-4 rounded-xl bg-black/30 border border-purple-500/20">
                    <div className="text-2xl font-bold text-purple-400">{journey.requiredPass}</div>
                    <div className="text-sm text-gray-400">Pass Required</div>
                  </div>
                  <div className="p-4 rounded-xl bg-black/30 border border-green-500/20">
                    <div className="text-2xl font-bold text-green-400">{Math.round(progressPercentage)}%</div>
                    <div className="text-sm text-gray-400">Progress</div>
                  </div>
                </div>
              </div>

              {/* Wallet Connection */}
              <div className="lg:w-auto">
                <WalletConnect />
              </div>
            </div>

            {/* Global Progress Bar */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-[#14F195]" />
                  Cognitive Activation Progress
                </span>
                <span className="text-sm font-medium text-white">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-4">
              <JourneySidebar
                metadata={metadata}
                phases={phases}
                currentPhase={currentPhaseIndex}
                onPhaseClick={setCurrentPhaseIndex}
                onOpenZynoModal={handleZynoClick}
                onNotifyClick={() => {
                  toast({
                    title: 'Notifications Enabled',
                    description: 'You\'ll be notified when the protocol activates',
                  });
                }}
                mfaiBalance={'1,250'}
              />
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-8">
              {/* Phase Navigation */}
              <div className="flex items-center justify-between mb-6 p-4 rounded-xl bg-black/30 border border-gray-800">
                <Button
                  onClick={handlePreviousPhase}
                  disabled={currentPhaseIndex === 0}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                <div className="text-center">
                  <div className="text-sm text-gray-400">Phase {currentPhaseIndex + 1} of {phases.length}</div>
                  <div className="font-semibold text-white">{currentPhase?.title}</div>
                </div>

                <Button
                  onClick={handleNextPhase}
                  disabled={currentPhaseIndex === phases.length - 1}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhaseIndex}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={contentVariants}
                  className="space-y-8"
                >
                  {/* Current Phase Content */}
                  <div className="relative p-8 rounded-2xl bg-black/50 border border-[#14F195]/20 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#9945FF]/5 to-[#14F195]/5 rounded-2xl" />
                    
                    <div className="relative z-10">
                      {/* Phase Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="text-3xl">{currentPhase?.icon}</div>
                            <div>
                              <h2 className="text-3xl font-bold text-white">{currentPhase?.title}</h2>
                              <p className="text-[#14F195] font-medium">{currentPhase?.name}</p>
                            </div>
                          </div>
                          <p className="text-gray-300 text-lg">{currentPhase?.description}</p>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[#14F195]">+{currentPhase?.xpReward} XP</div>
                          <div className="text-sm text-gray-400">Reward</div>
                        </div>
                      </div>

                      {/* Mission Card */}
                      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 mb-6">
                        <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                          <Award className="w-5 h-5 text-yellow-400" />
                          Mission Objective
                        </h3>
                        <p className="text-gray-300 mb-4">{currentPhase?.mission}</p>
                        
                        {currentPhase?.requirements && currentPhase.requirements.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-400 mb-2">Requirements:</h4>
                            <ul className="space-y-1">
                              {currentPhase.requirements.map((req, index) => (
                                <li key={index} className="text-sm text-gray-300 flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#14F195]" />
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <Button className="bg-gradient-to-r from-[#9945FF] to-[#14F195] text-black font-semibold">
                          Complete Mission
                        </Button>
                      </div>

                      {/* Phase Content */}
                      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 mb-6">
                        <h3 className="text-xl font-semibold text-white mb-4">Phase Details</h3>
                        <div className="prose prose-invert max-w-none">
                          <p className="text-gray-300 leading-relaxed">{currentPhase?.content}</p>
                        </div>
                        
                        {currentPhase?.duration && (
                          <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
                            <Zap className="w-4 h-4" />
                            Estimated Duration: {currentPhase.duration}
                          </div>
                        )}
                      </div>

                      {/* Zyno Tip */}
                      {currentPhase?.zynoTip && (
                        <div className="bg-gradient-to-r from-[#9945FF]/10 to-[#14F195]/10 rounded-xl p-6 border border-[#14F195]/20">
                          <div className="flex items-start gap-3">
                            <div className="text-2xl">🤖</div>
                            <div>
                              <div className="text-sm text-[#14F195] font-medium mb-2">Zyno AI Co-Founder™ suggests:</div>
                              <p className="text-gray-300 italic">"{currentPhase.zynoTip}"</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* NFT Reward */}
                      {currentPhase?.nftReward && (
                        <div className="mt-6 p-4 rounded-xl bg-purple-900/20 border border-purple-500/30">
                          <div className="flex items-center gap-3">
                            <Award className="w-6 h-6 text-purple-400" />
                            <div>
                              <div className="font-semibold text-white">Proof-of-Skill™ NFT Reward</div>
                              <div className="text-purple-400">{currentPhase.nftReward}</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Phase Feedback */}
                  <PhaseFeedback phaseId={`phase-${currentPhaseIndex}`} />

                  {/* Why It Matters Section */}
                  <WhyItMatters content={journey.whyItMatters} />

                  {/* Final Role Section */}
                  <FinalRoleSection content={`Your journey culminates in becoming a ${journey.finalRole}, with full access to the MFAI protocol's advanced features and governance rights.`} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Notification */}
      <AchievementNotification
        title={achievementNotification.title}
        description={achievementNotification.description}
        isVisible={achievementNotification.isVisible}
        onClose={() => setAchievementNotification(prev => ({ ...prev, isVisible: false }))}
      />

      {/* Zyno Modal */}
      <ZynoSimulator
        isOpen={isZynoModalOpen}
        onClose={() => setIsZynoModalOpen(false)}
        journeySlug={metadata.slug}
      />
    </MainLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const journeys = getAllJourneys();
  const paths = journeys.map(journey => ({
    params: { slug: journey.slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  
  if (!slug) {
    return {
      notFound: true,
    };
  }

  const journey = getJourneyByPersona(slug);

  if (!journey) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      journey,
    },
    revalidate: 3600,
  };
};