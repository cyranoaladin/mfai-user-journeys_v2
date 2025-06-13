import { useState, FC, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { getAllJourneys } from '@/utils/markdownParser';
import EnhancedJourneyCard from '@/components/Journey/EnhancedJourneyCard';
import JourneyFilters, { FilterOption } from '@/components/Journey/JourneyFilters';
import { useStore } from '@/utils/store';
import { JourneyContent } from '@/utils/markdownParser';
import { GetStaticProps } from 'next';

/**
 * Journeys Page - Entry point showing all available user journeys
 *
 * Features:
 * - Displays all persona journey cards in a responsive grid
 * - Dynamic filtering by profile type and mission type
 * - Animated entrance with Framer Motion
 * - Zyno welcome message
 * - Wallet connection status
 */
interface JourneysPageProps {
  journeyData: JourneyContent[];
}

const JourneysPage: FC<JourneysPageProps> = ({ journeyData }) => {
  const { walletConnected, walletAddress } = useStore();
  const [filteredJourneys, setFilteredJourneys] = useState<JourneyContent[]>(journeyData);
  const [selectedProfileType, setSelectedProfileType] = useState<string | null>(null);
  const [selectedMissionType, setSelectedMissionType] = useState<string | null>(null);

  // Define available profile and mission types
  const profileTypes: FilterOption[] = [
    { id: 'creator', label: 'Creator', icon: '🎨' },
    { id: 'investor', label: 'Investor', icon: '💰' },
    { id: 'builder', label: 'Builder', icon: '🛠️' },
    { id: 'analyst', label: 'Analyst', icon: '📊' },
  ];

  const missionTypes: FilterOption[] = [
    { id: 'learn', label: 'Learn' },
    { id: 'earn', label: 'Earn' },
    { id: 'build', label: 'Build' },
    { id: 'connect', label: 'Connect' },
  ];

  // Filter journeys based on selected filters
  const filterJourneys = useCallback(() => {
    let filtered = [...journeyData];

    if (selectedProfileType) {
      filtered = filtered.filter(journey =>
        journey.metadata.profileType.toLowerCase().includes(selectedProfileType.toLowerCase())
      );
    }

    if (selectedMissionType) {
      filtered = filtered.filter(
        journey =>
          journey.metadata.missionType?.toLowerCase().includes(selectedMissionType.toLowerCase()) ??
          false
      );
    }

    setFilteredJourneys(filtered);
  }, [journeyData, selectedProfileType, selectedMissionType]);

  // Update filtered journeys when filters change
  useEffect(() => {
    filterJourneys();
  }, [filterJourneys]);

  // Handle filter changes
  const handleProfileTypeChange = (profileType: string) => {
    setSelectedProfileType(prevType => {
      const newType = prevType === profileType ? null : profileType;
      return newType;
    });
  };

  const handleMissionTypeChange = (missionType: string) => {
    setSelectedMissionType(prevType => {
      const newType = prevType === missionType ? null : missionType;
      return newType;
    });
  };

  const handleClearFilters = () => {
    setSelectedProfileType(null);
    setSelectedMissionType(null);
    setFilteredJourneys(journeyData);
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
    <div className="journeys-page bg-gray-900 min-h-screen text-white p-6 md:p-10">
      <div className="container mx-auto">
        <motion.header
          className="mb-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4"
            variants={itemVariants}
          >
            Money Factory AI Journeys
          </motion.h1>
          <motion.p className="text-gray-300 max-w-2xl" variants={itemVariants}>
            Discover your path through our AI-augmented entrepreneurship protocols. Each journey
            represents a unique way to engage with our platform and earn Protocol Proofs™.
          </motion.p>

          {/* Wallet Status */}
          <motion.div className="mt-6" variants={itemVariants}>
            <div
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm ${walletConnected ? 'bg-green-900 text-green-300' : 'bg-gray-800 text-gray-300'}`}
            >
              <div
                className={`w-2 h-2 rounded-full mr-2 ${walletConnected ? 'bg-green-400' : 'bg-gray-500'}`}
              ></div>
              {walletConnected
                ? `Connected: ${walletAddress?.substring(0, 6)}...${walletAddress?.substring(walletAddress?.length - 4)}`
                : 'Wallet Not Connected'}
            </div>
          </motion.div>
        </motion.header>

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
            onProfileTypeChange={type => handleProfileTypeChange(type || '')}
            onMissionTypeChange={type => handleMissionTypeChange(type || '')}
            onClearFilters={handleClearFilters}
          />
        </motion.div>

        {/* Filtered Results Count */}
        {(selectedProfileType || selectedMissionType) && (
          <motion.div
            className="mb-6 text-gray-300"
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
            className="col-span-full text-center py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-gray-400 mb-4">No journeys match your selected filters.</p>
            <button
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-white transition-colors"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Journey Grid */}
        {filteredJourneys.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredJourneys.map(journey => (
              <motion.div key={journey.metadata.title} variants={itemVariants}>
                <EnhancedJourneyCard
                  journey={journey}
                  onSelect={slug => {
                    // Handle journey selection
                    console.log('Selected journey:', slug);
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const journeyData = await getAllJourneys();

    // Validate journey data
    const validatedJourneyData = journeyData.filter(
      journey =>
        journey &&
        journey.metadata &&
        journey.metadata.title &&
        journey.metadata.profileType &&
        journey.metadata.missionType
    );

    if (validatedJourneyData.length === 0) {
      console.warn('No valid journey data found');
      return {
        props: {
          journeyData: [],
        },
        revalidate: 60,
      };
    }

    return {
      props: {
        journeyData: validatedJourneyData,
      },
      revalidate: 60,
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
