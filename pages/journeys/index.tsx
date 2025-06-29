import { useState, FC, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { getAllJourneys, Journey } from '@/utils/journeyData';
import EnhancedJourneyCard from '@/components/Journey/EnhancedJourneyCard';
import JourneyFilters, { FilterOption } from '@/components/Journey/JourneyFilters';
import { useStore } from '@/utils/store';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Brain, Sparkles, Zap, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface JourneysPageProps {
  journeyData: Journey[];
}

const JourneysPage: FC<JourneysPageProps> = ({ journeyData }) => {
  const router = useRouter();
  const { walletConnected, walletAddress, selectPersona } = useStore();
  const [filteredJourneys, setFilteredJourneys] = useState<Journey[]>(journeyData);
  const [selectedProfileType, setSelectedProfileType] = useState<string | null>(null);
  const [selectedMissionType, setSelectedMissionType] = useState<string | null>(null);

  // Define available profile and mission types based on actual data
  const profileTypes: FilterOption[] = [
    { id: 'Entrepreneur', label: 'Entrepreneur', icon: '🚀' },
    { id: 'Strategist', label: 'Strategist', icon: '🧠' },
    { id: 'Creator', label: 'Creator', icon: '🎨' },
    { id: 'Researcher', label: 'Researcher', icon: '🔍' },
    { id: 'Operator', label: 'Operator', icon: '⚙️' },
    { id: 'Builder', label: 'Builder', icon: '🛠️' },
    { id: 'Investor', label: 'Investor', icon: '💰' },
  ];

  const missionTypes: FilterOption[] = [
    { id: 'Transform', label: 'Transform', icon: '🔄' },
    { id: 'Coordinate', label: 'Coordinate', icon: '🤝' },
    { id: 'Create', label: 'Create', icon: '✨' },
    { id: 'Analyze', label: 'Analyze', icon: '📊' },
    { id: 'Orchestrate', label: 'Orchestrate', icon: '🎭' },
    { id: 'Engineer', label: 'Engineer', icon: '⚡' },
    { id: 'Back', label: 'Back', icon: '💎' },
  ];

  // Filter journeys based on selected filters
  const filterJourneys = useCallback(() => {
    let filtered = [...journeyData];

    if (selectedProfileType) {
      filtered = filtered.filter(journey =>
        journey.profileType === selectedProfileType
      );
    }

    if (selectedMissionType) {
      filtered = filtered.filter(journey =>
        journey.missionType === selectedMissionType
      );
    }

    setFilteredJourneys(filtered);
  }, [journeyData, selectedProfileType, selectedMissionType]);

  // Update filtered journeys when filters change
  useEffect(() => {
    filterJourneys();
  }, [filterJourneys]);

  // Handle filter changes
  const handleProfileTypeChange = (profileType: string | null) => {
    setSelectedProfileType(profileType);
  };

  const handleMissionTypeChange = (missionType: string | null) => {
    setSelectedMissionType(missionType);
  };

  const handleClearFilters = () => {
    setSelectedProfileType(null);
    setSelectedMissionType(null);
  };

  // Handle journey selection
  const handleJourneySelect = (slug: string) => {
    const journey = journeyData.find(j => j.slug === slug);
    if (journey) {
      selectPersona(journey.persona);
      router.push(`/journey/${slug}`);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#9945FF]/20 to-[#14F195]/20 blur-3xl" />
        <div className="relative container mx-auto px-6 py-16">
          <motion.div
            className="text-center mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="inline-flex items-center gap-2 mb-6"
              variants={itemVariants}
            >
              <Brain className="w-8 h-8 text-[#14F195]" />
              <span className="text-[#14F195] font-medium">Cognitive Activation Protocol™</span>
            </motion.div>
            
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#9945FF] to-[#14F195]"
              variants={itemVariants}
            >
              Choose Your Journey
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
              variants={itemVariants}
            >
              Discover your path through our AI-augmented entrepreneurship protocols. Each journey represents a unique way to engage with our platform and earn Protocol Proofs™.
            </motion.p>

            {/* Protocol Features */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8"
              variants={containerVariants}
            >
              <motion.div 
                className="flex items-center gap-3 p-4 rounded-xl bg-black/30 border border-[#14F195]/20"
                variants={itemVariants}
              >
                <Sparkles className="w-6 h-6 text-[#14F195]" />
                <div className="text-left">
                  <div className="font-semibold">Skillchain Mining™</div>
                  <div className="text-sm text-gray-400">Extract cognitive value</div>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-3 p-4 rounded-xl bg-black/30 border border-[#9945FF]/20"
                variants={itemVariants}
              >
                <Zap className="w-6 h-6 text-[#9945FF]" />
                <div className="text-left">
                  <div className="font-semibold">Proof-of-Skill™ NFTs</div>
                  <div className="text-sm text-gray-400">On-chain credentials</div>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-3 p-4 rounded-xl bg-black/30 border border-[#14F195]/20"
                variants={itemVariants}
              >
                <BookOpen className="w-6 h-6 text-[#14F195]" />
                <div className="text-left">
                  <div className="font-semibold">Zyno AI Co-Founder™</div>
                  <div className="text-sm text-gray-400">Your strategic guide</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Wallet Status */}
            <motion.div className="mb-8" variants={itemVariants}>
              <div
                className={`inline-flex items-center px-6 py-3 rounded-full text-sm font-medium ${
                  walletConnected 
                    ? 'bg-green-900/30 text-green-300 border border-green-500/30' 
                    : 'bg-gray-800/50 text-gray-300 border border-gray-700'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full mr-3 ${
                    walletConnected ? 'bg-green-400' : 'bg-gray-500'
                  }`}
                />
                {walletConnected
                  ? `Connected: ${walletAddress?.substring(0, 6)}...${walletAddress?.substring(walletAddress?.length - 4)}`
                  : 'Wallet Not Connected - Full Preview Mode'}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-16">
        {/* Journey Filters */}
        <motion.div
          className="mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <JourneyFilters
            profileTypes={profileTypes}
            missionTypes={missionTypes}
            selectedProfileType={selectedProfileType}
            selectedMissionType={selectedMissionType}
            onProfileTypeChange={handleProfileTypeChange}
            onMissionTypeChange={handleMissionTypeChange}
            onClearFilters={handleClearFilters}
          />
        </motion.div>

        {/* Filtered Results Count */}
        {(selectedProfileType || selectedMissionType) && (
          <motion.div
            className="mb-6 text-gray-300 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Showing {filteredJourneys.length}{' '}
            {filteredJourneys.length === 1 ? 'journey' : 'journeys'}
            {selectedProfileType && ` for ${selectedProfileType} profiles`}
            {selectedMissionType && selectedProfileType && ' and'}
            {selectedMissionType && ` with ${selectedMissionType} missions`}
          </motion.div>
        )}

        {/* Empty State */}
        {filteredJourneys.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-white mb-4">No journeys match your filters</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search criteria or explore all available journeys.</p>
            <Button
              onClick={handleClearFilters}
              className="bg-gradient-to-r from-[#9945FF] to-[#14F195] text-black font-semibold"
            >
              Clear All Filters
            </Button>
          </motion.div>
        )}

        {/* Journey Grid */}
        {filteredJourneys.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredJourneys.map((journey, index) => (
              <motion.div 
                key={journey.persona} 
                variants={itemVariants}
                custom={index}
              >
                <EnhancedJourneyCard
                  journey={journey}
                  onSelect={handleJourneySelect}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="p-8 rounded-2xl bg-gradient-to-r from-[#9945FF]/10 to-[#14F195]/10 border border-[#14F195]/20">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Begin Your Cognitive Activation?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Each journey is designed to transform your skills into verifiable on-chain assets. 
              Start with any persona and evolve through the 5-phase Cognitive Activation Protocol™.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push('/journey/from-web2-hustler-to-web3-sovereign')}
                className="bg-gradient-to-r from-[#9945FF] to-[#14F195] text-black font-semibold px-8 py-3"
              >
                Start with Web2 Hustler
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push('/zyno-preview')}
                className="border-[#14F195]/30 text-[#14F195] hover:bg-[#14F195]/10 px-8 py-3"
              >
                Preview Zyno AI
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const journeyData = getAllJourneys();

    return {
      props: {
        journeyData,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching journey data:', error);
    return {
      props: {
        journeyData: [],
      },
      revalidate: 60,
    };
  }
};

export default JourneysPage;