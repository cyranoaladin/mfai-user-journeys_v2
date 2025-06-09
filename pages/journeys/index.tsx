import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import JourneyCard from '../../components/Journey/JourneyCard';
import ZynoBox from '../../components/Journey/ZynoBox';
import { journeys } from '../../utils/journeyData';
import { useStore } from '../../utils/store';


/**
 * Journeys Page - Entry point showing all available user journeys
 * 
 * Features:
 * - Displays all persona journey cards
 * - Animated entrance with Framer Motion
 * - Zyno welcome message
 * - Wallet connection status
 */
const JourneysPage: FC = () => {
  const router = useRouter();
  const { walletConnected, walletAddress, selectPersona } = useStore();
  const [showZynoWelcome] = useState(true);
  
  // Handle journey selection
  const handleJourneySelect = (persona: string) => {
    selectPersona(persona);
    router.push(`/journeys/${persona}`);
  };
  
  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  // Item animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <div className="journeys-page bg-gray-900 min-h-screen text-white p-6 md:p-10">
      {/* Header */}
      <header className="mb-12">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Choose Your Cognitive Activation Journey™
          </h1>
          <p className="text-gray-300 max-w-2xl">
            Select the journey that best matches your goals and expertise. Each path is tailored to a specific persona and includes 5 phases: Learn → Build → Prove → Activate → Scale.
          </p>
          
          {/* Wallet Status */}
          <div className="mt-6 flex items-center">
            <div className={`wallet-status px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${
              walletConnected ? 'bg-green-900 text-green-300' : 'bg-gray-800 text-gray-300'
            }`}>
              <div className={`w-3 h-3 rounded-full ${walletConnected ? 'bg-green-400' : 'bg-gray-500'}`}></div>
              {walletConnected ? 
                `Connected: ${walletAddress?.substring(0, 6)}...${walletAddress?.substring(walletAddress.length - 4)}` : 
                'Wallet Not Connected'
              }
            </div>
            {!walletConnected && (
              <button className="ml-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </header>
      
      {/* Journey Cards Grid */}
      <div className="container mx-auto">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {journeys.map((journey) => (
            <motion.div key={journey.persona} variants={itemVariants}>
              <JourneyCard
                persona={journey.persona}
                icon={<span className="text-4xl">{journey.icon}</span>}
                tagline={journey.tagline}
                cta={`Start ${journey.label} Journey`}
                progress={0} // Would be dynamic based on user progress
                onClick={() => handleJourneySelect(journey.persona)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Zyno Welcome Bubble */}
      {showZynoWelcome && (
        <motion.div 
          className="fixed bottom-6 right-6 max-w-sm"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <ZynoBox
            context="journey selection"
          />
        </motion.div>
      )}
    </div>
  );
};

export default JourneysPage;
