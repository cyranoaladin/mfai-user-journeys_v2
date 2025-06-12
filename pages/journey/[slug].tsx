import React, { FC, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { ArrowRight } from 'lucide-react';

// Layout and core components
import MainLayout from '../../components/Layout/MainLayout';
import JourneyIntro from '../../components/Journey/JourneyIntro';
import SkillchainMap from '../../components/Journey/SkillchainMap';
import ZynoSimulator from '../../components/Journey/ZynoSimulator';
import PhaseNavigator from '../../components/Journey/PhaseNavigator';
import PhaseSection from '../../components/Journey/Phases/PhaseSection';
import WalletConnect from '../../components/WalletConnect';

// Nouveaux composants modulaires
import JourneyHeader from '../../components/Journey/JourneyHeader';
import ZynoActions from '../../components/Journey/Zyno/ZynoActions';
import ProofSection from '../../components/Journey/Rewards/ProofSection';
import JourneySidebar from '../../components/Journey/JourneySidebar';
import WhyItMatters from '../../components/Journey/WhyItMatters';
import FinalRoleSection from '../../components/Journey/FinalRoleSection';
import VerticalTimeline from '../../components/Journey/Timeline/VerticalTimeline';
import PhaseFeedback, { PhaseFeedbackData } from '../../components/Journey/Phases/PhaseFeedback';

// Fonction pour obtenir le nom de phase MFAI à partir de l'index
const getPhaseNameByIndex = (index: number): "Cognitive" | "Synaptic" | "Neural" | "Activation" | "Amplification" => {
  const phaseNames: Array<"Cognitive" | "Synaptic" | "Neural" | "Activation" | "Amplification"> = [
    "Cognitive", "Synaptic", "Neural", "Activation", "Amplification"
  ];
  return phaseNames[index] || "Cognitive";
};

// Hooks personnalisés
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import usePhaseFeedback from '../../hooks/usePhaseFeedback';

// UI components
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { useToast } from '../../components/ui/toast';

// Data and utilities
import { getAllJourneys } from '../../utils/journeyData';
import { getJourneyBySlug } from '../../utils/markdownParser';
import { useStore } from '../../utils/store';

// Importer les types centralisés depuis types/journey.ts
import type { 
  JourneyContent, 
  JourneyDetailPageProps, 
  JourneyMetadata, 
  JourneyPhase, 
  JourneyReward,
  PhaseFeedbackData as PhaseFeedbackDataType
} from '../../types/journey';

// Les interfaces sont maintenant importées depuis types/journey.ts

const JourneyDetailPage: FC<JourneyDetailPageProps> = ({ journey }) => {
  const router = useRouter();
  const { currentPhase: storedPhase, setCurrentPhase, walletConnected, totalXP, addXP } = useStore();
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState<number>(storedPhase || 0);
  const [forceUpdate, setForceUpdate] = useState<number>(0);
  const [showZynoModal, setShowZynoModal] = useState(false);
  const { toast } = useToast();
  
  // Effet pour surveiller les changements de journey (pour débogage en développement uniquement)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && !journey?.phases?.length) {
      console.log('Notice: Using default phases as journey phases are empty');
    }
  }, [journey]);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Créer des versions sécurisées des données pour éviter les erreurs TypeScript
  const metadata: JourneyMetadata = journey?.metadata || {
    title: 'Journey',
    subtitle: '',
    tagline: 'Explore this journey',
    target: '',
    profileType: '',
    missionType: '',
    icon: 'graduation-cap',
    slug: '',
    description: ''
  };
  
  // Rendre phases réactif avec useMemo et ajouter des phases par défaut si vide
  const phases = useMemo<JourneyPhase[]>(() => {
    const journeyPhases = journey?.phases || [];
    
    // Si le tableau est vide, ajouter des phases par défaut du parcours MFAI
    if (journeyPhases.length === 0) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Notice: Using default phases as journey phases are empty');
      }
      
      return [
        {
          name: 'Cognitive',
          title: 'Cognitive Activation Protocol™',
          content: 'Bienvenue dans la phase Cognitive du parcours MFAI. Cette phase vous permet de développer votre compréhension des concepts fondamentaux de Money Factory AI.',
          description: 'Développez votre compréhension des concepts fondamentaux de Money Factory AI',
          mission: 'Complétez le quiz de compréhension cognitive',
          xpReward: 50,
          icon: 'brain',
          nftReward: 'cognitive-badge'
        },
        {
          name: 'Synaptic',
          title: 'Synaptic Connection Protocol™',
          content: 'La phase Synaptique vous permet de connecter les concepts entre eux et de comprendre comment ils interagissent dans l’écosystème Money Factory.',
          description: 'Connectez les concepts entre eux dans l’écosystème Money Factory',
          mission: 'Participez à une session communautaire',
          xpReward: 75,
          icon: 'zap',
          nftReward: 'synaptic-badge'
        },
        {
          name: 'Neural',
          title: 'Neural Network Protocol™',
          content: 'La phase Neurale vous permet de construire votre réseau de connaissances et de compétences au sein de Money Factory.',
          description: 'Construisez votre réseau de connaissances et de compétences',
          mission: 'Complétez un module de formation avancé',
          xpReward: 100,
          icon: 'activity',
          nftReward: 'neural-badge'
        },
        {
          name: 'Activation',
          title: 'Activation Mechanism Protocol™',
          content: 'La phase d’Activation vous permet de mettre en pratique vos connaissances et de commencer à générer de la valeur dans l’écosystème.',
          description: 'Mettez en pratique vos connaissances et générez de la valeur',
          mission: 'Contribuez à un projet communautaire',
          xpReward: 125,
          icon: 'power',
          nftReward: 'activation-badge'
        },
        {
          name: 'Amplification',
          title: 'Amplification Catalyst Protocol™',
          content: 'La phase d’Amplification vous permet de maximiser votre impact et d’accélérer votre progression dans l’écosystème Money Factory.',
          description: 'Maximisez votre impact et accélérez votre progression',
          mission: 'Lancez votre propre initiative dans l’écosystème',
          xpReward: 150,
          icon: 'trending-up',
          nftReward: 'amplification-badge'
        }
      ];
    }
    
    return journeyPhases;
  }, [journey]);
  
  // Utiliser la valeur stockée ou 0, mais s'assurer qu'elle ne dépasse pas le nombre de phases
  const safePhaseIndex = Math.min(storedPhase || 0, phases.length - 1 >= 0 ? phases.length - 1 : 0);
  
  // Mettre à jour currentPhaseIndex si nécessaire
  useEffect(() => {
    if (currentPhaseIndex !== safePhaseIndex) {
      setCurrentPhaseIndex(safePhaseIndex);
    }
  }, [safePhaseIndex]);
  
  useEffect(() => {
    console.log('useEffect: storedPhase changed', storedPhase, 'currentPhaseIndex:', currentPhaseIndex);
    if (storedPhase !== undefined && storedPhase !== currentPhaseIndex) {
      console.log('Updating currentPhaseIndex to match storedPhase:', storedPhase);
      setCurrentPhaseIndex(storedPhase);
      // Force re-render
      setForceUpdate(prev => prev + 1);
    }
  }, [storedPhase]);
  
  // Track unlocked proofs (for demo purposes)
  const [unlockedProofs, setUnlockedProofs] = useState<number[]>([]);
  
  // Calculate progress percentage with animation
  const [progressPercentage, setProgressPercentage] = useState(0);
  
  // Phase feedback system
  const { saveFeedback, hasFeedbackForPhase } = usePhaseFeedback(journey?.metadata?.slug || '');
  
  // Sync local state with global store
  useEffect(() => {
    setCurrentPhase(currentPhaseIndex);
  }, [currentPhaseIndex, setCurrentPhase]);
  
  // Progress animation effect
  useEffect(() => {
    if (phases.length > 0) {
      const targetPercentage = (currentPhaseIndex / (phases.length - 1)) * 100;
      
      // Animate progress bar
      let start = 0;
      const animateProgress = () => {
        start += 1;
        setProgressPercentage(Math.min(start, targetPercentage));
        if (start < targetPercentage) {
          requestAnimationFrame(animateProgress);
        }
      };
      
      requestAnimationFrame(animateProgress);
    }
  }, [currentPhaseIndex, phases.length]);
  
  // Auto-scroll to content when phase changes
  useEffect(() => {
    if (contentRef.current) {
      // Smooth scroll to the content
      contentRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
      });
    }
  }, [currentPhaseIndex]);
  
  // Si la page est en cours de chargement ou si journey est null
  if (router.isFallback || !journey) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <h2 className="text-xl font-bold">Loading journey...</h2>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Animation variants for content
  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } }
  };

  // Fonction pour passer à la phase suivante
  const goToNextPhase = useCallback(() => {
    if (currentPhaseIndex < phases.length - 1) {
      // Calculer le nouvel index
      const nextPhaseIndex = currentPhaseIndex + 1;
      
      // Mettre à jour l'index de phase local
      setCurrentPhaseIndex(nextPhaseIndex);
      
      // Mettre à jour le store global
      setCurrentPhase(nextPhaseIndex);
      
      // Forcer un re-render
      setForceUpdate(prev => prev + 1);
      
      // Faire défiler vers le haut
      if (contentRef.current) {
        contentRef.current.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
      
      if (walletConnected) {
        addXP(25); // Award 25 XP for advancing
        toast("Earned 25 XP for advancing to Cognitive Activation Protocol Phase " + (nextPhaseIndex + 1), "success");
      }
    } else {
      console.log('Cannot advance: already at last phase');
    }
  }, [currentPhaseIndex, phases.length, setCurrentPhase, contentRef, forceUpdate]);

  const goToPrevPhase = useCallback(() => {
    if (currentPhaseIndex > 0) {
      // Calculer le nouvel index
      const prevPhaseIndex = currentPhaseIndex - 1;
      
      // Mettre à jour l'index de phase local
      setCurrentPhaseIndex(prevPhaseIndex);
      
      // Mettre à jour le store global
      setCurrentPhase(prevPhaseIndex);
      
      // Forcer un re-render
      setForceUpdate(prev => prev + 1);
      
      // Faire défiler vers le haut
      if (contentRef.current) {
        contentRef.current.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
      
      if (walletConnected) {
        addXP(25); // Award 25 XP for going back
        toast("Earned 25 XP for going back to Cognitive Activation Protocol Phase " + (prevPhaseIndex + 1), "success");
      }
    }
  }, [currentPhaseIndex, phases.length, setCurrentPhase, contentRef, forceUpdate]);

  // Setup keyboard navigation
  useKeyboardNavigation({
    onNext: goToNextPhase,
    onPrevious: goToPrevPhase,
    enabled: true
  });
  
  // Refs pour le scroll automatique
  const exploreProtocolRef = useRef<HTMLDivElement>(null);

  

  // Handle explore protocol action - scroll vers la section au lieu de rediriger
  const handleExploreProtocol = () => {
    toast("Navigating to Cognitive Activation Protocol™", "info");
    if (exploreProtocolRef.current) {
      exploreProtocolRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Handle Zyno modal
  const handleZynoClick = () => {
    setShowZynoModal(true);
  };
  
  // Handle proof badge click
  const handleProofClick = (proofIndex: number) => {
    if (walletConnected) {
      if (!unlockedProofs.includes(proofIndex)) {
        setUnlockedProofs([...unlockedProofs, proofIndex]);
        addXP(100); // Award 100 XP for unlocking a proof
        toast("Proof unlocked! +100 XP", "success");
      }
    } else {
      toast("Connect your wallet to unlock proofs", "warning");
    }
  };
  
  // Handle feedback submission
  const handleFeedbackSubmit = (data: PhaseFeedbackData) => {
    // Add phase index to the feedback data
    const feedbackWithPhase = {
      ...data,
      phaseIndex: currentPhaseIndex
    };
    saveFeedback(feedbackWithPhase);
    toast("Feedback submitted. Thank you!", "success");
    
    // Add XP for submitting feedback
    if (walletConnected) {
      addXP(10);
      toast("Earned 10 XP for feedback!", "success");
    }
  };
  
  // Get current phase data - utiliser useMemo pour rendre réactif
  const currentPhase = useMemo(() => {
    const phase = phases[currentPhaseIndex] || { 
      name: 'Introduction', 
      content: 'Welcome to this journey.' 
    };
    return phase;
  }, [phases, currentPhaseIndex]);
  
  // Log de débogage pour suivre les changements de phase
  useEffect(() => {
    console.log("Phase changed", currentPhaseIndex, currentPhase);
  }, [currentPhaseIndex, currentPhase]);
  
  // Related journeys (mock data with profileType added)
  const relatedJourneys = [
    { title: "Staking Basics", slug: "staking-basics", profileType: "Investor" },
    { title: "DeFi Fundamentals", slug: "defi-fundamentals", profileType: "Student" }
  ];

  // Cette vérification est maintenant faite plus haut dans le code

  return (
    <MainLayout>
      <Head>
        <title>{`${metadata.title || 'Journey'} | Money Factory AI`}</title>
        <meta name="description" content={metadata.description || 'Journey details'} />
      </Head>
      
      <div className="container mx-auto px-4 py-8">
        {/* Journey Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start gap-6">
          <JourneyHeader metadata={metadata} />
          <WalletConnect />
        </div>
        
        {/* Journey Intro Component */}
        <JourneyIntro 
          journey={journey} 
          currentPhase={currentPhaseIndex} 
        />
        
        {/* Main Content Area - Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          {/* Left Column - Timeline (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-1">
            <VerticalTimeline 
              phases={phases}
              currentPhaseIndex={currentPhaseIndex}
              onPhaseClick={setCurrentPhaseIndex}
            />
          </div>
          
          {/* Middle Column - Main Content */}
          <div className="lg:col-span-8" ref={contentRef}>
            {/* Progress Bar */}
            <div className="mb-6 bg-gray-800/50 backdrop-blur-md rounded-xl p-4 border border-gray-700/50">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1 w-full">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{Math.round(progressPercentage)}%</span>
                  </div>
                  <Progress value={progressPercentage} />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-300">
                      Phase {currentPhaseIndex + 1} of {phases.length}: <strong>{currentPhase.name || ''}</strong>
                    </p>
                    {walletConnected && (
                      <div className="flex items-center gap-2 bg-blue-900/30 px-3 py-1 rounded-full">
                        <span className="text-xs font-semibold text-blue-300">XP: {totalXP}</span>
                      </div>
                    )}
                  </div>
                </div>
                <PhaseNavigator
                  currentPhase={currentPhaseIndex}
                  totalPhases={phases.length}
                  phaseName={currentPhase.name || ''}
                  onPrevious={goToPrevPhase}
                  onNext={goToNextPhase}
                  aria-label="Navigate between phases"
                />
              </div>
            </div>
            
            {/* Phase Content */}
            <div className="mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`phase-${currentPhaseIndex}-${forceUpdate}`}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={contentVariants}
                  className="prose prose-invert max-w-none"
                >
                  <PhaseSection 
                    phase={getPhaseNameByIndex(currentPhaseIndex)}
                    description={currentPhase.description || currentPhase.content || 'Content loading...'}
                    mission={currentPhase.mission || 'Complete this phase to earn rewards'}
                    nftReward={currentPhase.nftReward || `${getPhaseNameByIndex(currentPhaseIndex)} Proof-of-Skill™`}
                    xpReward={currentPhase.xpReward || 50}
                    locked={false}
                    onNextPhase={goToNextPhase}
                    onPrevPhase={goToPrevPhase}
                    isFirstPhase={currentPhaseIndex === 0}
                    isLastPhase={currentPhaseIndex === phases.length - 1}
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Phase Feedback System */}
              {!hasFeedbackForPhase(currentPhaseIndex) && (
                <PhaseFeedback 
                  phaseIndex={currentPhaseIndex}
                  phaseName={currentPhase.name}
                  onFeedbackSubmit={handleFeedbackSubmit}
                />
              )}
              
              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                {journey?.callToAction && journey.callToAction.length > 0 && (
                  <Button 
                    variant="secondary" 
                    className="flex-1 py-6 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                    onClick={handleExploreProtocol}
                    aria-label="Explore Cognitive Activation Protocol"
                  >
                    <span>🚀 Explore Cognitive Activation Protocol™</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  className="flex-1 py-6 flex items-center justify-center gap-2 border-blue-500/50 hover:bg-blue-900/20 transition-all duration-300"
                  onClick={handleZynoClick}
                  aria-label="Simulate with AI Co-Founder"
                >
                  <span>🤖 Simulate with AI Co-Founder™</span>
                </Button>
              </div>
            </div>
            
            {/* Proof-of-Skill Tokens™ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 shadow-lg"
            >
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">
                  Proof-of-Skill Tokens™
                </span>
              </h3>
              <p className="text-gray-300 text-sm mb-6">🔓 Complete phases to unlock your Neuro-Dividends™ and Cognitive Lock™ rewards</p>
              <ProofSection 
                rewards={journey?.rewards || []} 
                unlockedProofs={unlockedProofs} 
                onProofClick={handleProofClick} 
              />
            </motion.div>
            
            {/* Phase Navigator (Mobile Only) */}
            <div className="lg:hidden mt-8">
              <PhaseNavigator
                currentPhase={currentPhaseIndex}
                totalPhases={phases.length}
                phaseName={currentPhase.name || ''}
                onPrevious={goToPrevPhase}
                onNext={goToNextPhase}
                className="bg-gray-800/50 backdrop-blur-md rounded-xl p-4 border border-gray-700/50"
              />
            </div>
            
            {/* Cognitive Activation Protocol™ (Skillchain Map) */}
            <div ref={exploreProtocolRef}>
              <h2 className="text-2xl font-bold mb-4 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Cognitive Activation Protocol™
              </h2>
              <SkillchainMap relatedJourneys={relatedJourneys} />
            </div>
          </div>
          
          {/* Right Column - Sidebar */}
          <div className="lg:col-span-3">
            {/* Journey Sidebar with metadata, timeline and actions */}
            <JourneySidebar 
              metadata={metadata}
              phases={phases}
              currentPhase={currentPhaseIndex}
              onPhaseClick={(index) => {
                setCurrentPhaseIndex(index);
                setCurrentPhase(index);
                if (contentRef.current) {
                  contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              onOpenZynoModal={handleZynoClick}
              onNotifyClick={() => toast("Cognitive Notifications Enabled", "info")}
            />
            
            {/* Espace réservé pour d'autres widgets ou informations */}
            {/* <div className="mt-6 bg-gray-800/50 backdrop-blur-md rounded-xl p-4 border border-gray-700/50">
              <h3 className="text-xl font-semibold mb-4">Widget supplémentaire</h3>
              <p className="text-sm text-gray-300 mb-4">Contenu supplémentaire à venir</p>
            </div> */}
          </div>
        </div>
      </div>
      
      {/* Zyno Modal */}
      {showZynoModal && (
        <ZynoSimulator 
          isOpen={showZynoModal} 
          onClose={() => setShowZynoModal(false)}
          journeySlug={metadata.slug || ''}
        />
      )}
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const journeys = await getAllJourneys();
  
  // Récupérer les slugs à partir des journeys
  // Comme le type Journey n'a pas de propriété slug directe, nous utilisons
  // une approche plus sûre en utilisant le persona ou label comme fallback
  const paths = journeys.map((journey: any) => ({
    params: { 
      slug: journey.persona || journey.label?.toLowerCase().replace(/ /g, '-') || ''
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<JourneyDetailPageProps> = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    if (!slug) {
      console.error("No slug provided");
      return { notFound: true };
    }
    
    let journey = null;
    
    try {
      journey = await getJourneyBySlug(slug);
    } catch (fetchError) {
      console.error(`Error fetching journey data: ${fetchError}`);
    }
    
    if (!journey) {
      console.warn(`Journey not found for slug: ${slug}, using fallback data`);
      // Fournir des données de fallback pour éviter les erreurs
      journey = {
        metadata: {
          title: `Journey ${slug}`,
          subtitle: 'Journey details',
          tagline: 'Explore this journey',
          target: 'Beginners',
          profileType: 'Default',
          missionType: 'Learning',
          icon: 'graduation-cap',
          slug: slug,
          description: 'This journey is currently being loaded...'
        },
        phases: [{
          name: 'Introduction',
          title: 'Getting Started',
          content: 'This journey content is being loaded...',
          description: 'Introduction to the journey',
          mission: 'Learn the basics',
          xpReward: 100,
          icon: 'book-open'
        }],
        callToAction: ['Start your journey'],
        rewards: [{
          milestone: 'Completion',
          proof: 'Certificate',
          utility: 'Knowledge'
        }],
        whyItMatters: 'Learning is important',
        finalRole: 'Knowledgeable user'
      };
    }
    
    // Vérifier et normaliser la structure du journey pour éviter les erreurs
    // Utiliser une assertion de type pour contourner les problèmes de compatibilité
    const safeJourney = {
      metadata: {
        title: journey.metadata?.title || `Journey ${slug}`,
        subtitle: journey.metadata?.subtitle || 'Journey details',
        tagline: journey.metadata?.tagline || 'Explore this journey',
        target: journey.metadata?.target || 'Beginners',
        profileType: journey.metadata?.profileType || 'Default',
        missionType: journey.metadata?.missionType || 'Learning',
        icon: journey.metadata?.icon || 'graduation-cap',
        slug: journey.metadata?.slug || slug,
        description: journey.metadata?.description || 'Journey description'
      },
      phases: Array.isArray(journey.phases) ? journey.phases.map(phase => {
        // Création d'un objet JourneyPhase explicite avec toutes les propriétés requises
        const safePhase: JourneyPhase = {
          name: phase.name || 'Unnamed Phase',
          title: phase.title || 'Untitled',
          content: phase.content || 'No content available',
          icon: phase.icon || 'book-open',
          description: phase.description || 'No description available',
          mission: phase.mission || 'Complete this phase',
          xpReward: phase.xpReward || 0,
        };
        
        // Ajout des propriétés optionnelles si elles existent
        if (phase.nftReward) safePhase.nftReward = phase.nftReward;
        if (phase.locked !== undefined) safePhase.locked = phase.locked;
        if (phase.duration) safePhase.duration = phase.duration;
        
        return safePhase;
      }) : [],
      callToAction: journey.callToAction || ['Start your journey'],
      rewards: journey.rewards || [{
        milestone: 'Completion',
        proof: 'Certificate',
        utility: 'Knowledge'
      }],
      whyItMatters: journey.whyItMatters || 'This journey helps you grow',
      finalRole: journey.finalRole || 'Expert'
    } as JourneyContent;
    
    return {
      props: {
        journey: safeJourney,
      },
      // Re-generate at most once per hour
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    // Retourner des données minimales pour éviter les erreurs de rendu
    return { 
      props: { 
        journey: null 
      },
      revalidate: 60 // Réessayer plus rapidement en cas d'erreur
    };
  }
};

export default JourneyDetailPage;
