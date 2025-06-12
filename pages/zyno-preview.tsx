import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import MainLayout from '../components/Layout/MainLayout';
import { BrainCircuit, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function ZynoPreviewPage() {
  const router = useRouter();
  const { journey, persona } = router.query;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    router.back();
  };

  return (
    <MainLayout title="Zyno AI Preview | Money Factory AI">
      <div className="container mx-auto px-4 py-12">
        <Button 
          variant="outline" 
          onClick={handleBack}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Journey
        </Button>
        
        <div className="bg-gray-900/80 border border-gray-700 rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-900/30 p-3 rounded-full">
              <BrainCircuit className="h-8 w-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Zyno AI Preview</h1>
              <p className="text-gray-400">
                Personalized journey for {persona ? persona.toString().replace('-', ' ') : 'your profile'}
              </p>
            </div>
          </div>
          
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-lg text-gray-300">Generating personalized content...</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 mb-6">
                <h2 className="text-xl font-semibold text-white mb-4">Your Personalized Journey</h2>
                <p className="text-gray-300 mb-4">
                  Based on your {persona} profile, Zyno AI has customized this journey to focus on the aspects most relevant to you.
                </p>
                <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-800/30">
                  <p className="text-sm text-blue-300 italic">
                    "This is a preview of Zyno AI capabilities. In the full version, this content would be dynamically generated based on your on-chain activity, learning preferences, and goals."
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                  <h3 className="text-lg font-medium text-white mb-3">Recommended Focus Areas</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>Understanding core protocol mechanics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>Building a sustainable portfolio strategy</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>Navigating governance proposals</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                  <h3 className="text-lg font-medium text-white mb-3">Skill Development Path</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Technical Analysis</span>
                      <div className="w-24 bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Protocol Knowledge</span>
                      <div className="w-24 bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Risk Management</span>
                      <div className="w-24 bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-medium text-white mb-4">Coming Soon: Full Zyno Integration</h3>
                <p className="text-gray-300 mb-4">
                  The full version of Zyno AI will provide personalized learning paths, adaptive content, and real-time feedback based on your on-chain activity and learning progress.
                </p>
                <div className="flex justify-center">
                  <Button className="px-6 py-2">
                    Join Waitlist
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
