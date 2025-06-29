import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { JourneyPhase } from '@/utils/journeyData';
import { useStore } from '@/utils/store';
import { motion } from 'framer-motion';
import { Award, Lock, Star, Trophy, Clock, Zap, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PhaseSectionProps {
  phase: JourneyPhase;
  currentPhase: number;
  totalPhases: number;
}

export default function PhaseSection({ phase, currentPhase, totalPhases }: PhaseSectionProps) {
  const { totalXP, addXP } = useStore();
  const progress = Math.min((totalXP / 1000) * 100, 100);

  const handleCompletePhase = () => {
    addXP(phase.xpReward);
    // Additional completion logic here
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="relative p-8 rounded-2xl bg-black/50 border border-[#14F195]/20 backdrop-blur-sm"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#9945FF]/5 to-[#14F195]/5 rounded-2xl" />

      <div className="relative z-10">
        {/* Phase Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#9945FF] to-[#14F195] flex items-center justify-center text-3xl shadow-lg">
              {phase.icon}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{phase.title}</h2>
              <p className="text-[#14F195] font-medium text-lg">{phase.name}</p>
              <p className="text-gray-400 mt-1">{phase.description}</p>
            </div>
          </div>
          
          <div className="text-right">
            <Badge className="bg-[#14F195]/10 text-[#14F195] mb-2">
              Phase {currentPhase + 1} of {totalPhases}
            </Badge>
            <div className="text-2xl font-bold text-[#14F195]">+{phase.xpReward} XP</div>
            <div className="text-sm text-gray-400">Reward</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Mission & Content */}
          <div className="space-y-6">
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 hover:border-[#14F195]/30 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-400" />
                Mission Objective
              </h3>
              <p className="text-gray-300 mb-4 text-lg">{phase.mission}</p>
              
              {phase.requirements && phase.requirements.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Requirements:</h4>
                  <ul className="space-y-2">
                    {phase.requirements.map((req, index) => (
                      <li key={index} className="text-sm text-gray-300 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#14F195]" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button 
                onClick={handleCompletePhase}
                className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] text-black font-semibold hover:shadow-lg hover:shadow-[#14F195]/20 transition-all duration-300"
              >
                Complete Mission
              </Button>
            </motion.div>

            {/* Content Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
            >
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Brain className="w-6 h-6 text-[#9945FF]" />
                Phase Details
              </h3>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed">{phase.content}</p>
              </div>
              
              {phase.duration && (
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  Estimated Duration: {phase.duration}
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column - Rewards & Progress */}
          <div className="space-y-6">
            {/* Rewards Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
            >
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-400" />
                Rewards & Recognition
              </h3>
              
              <div className="space-y-4">
                {/* XP Reward */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-[#14F195]/10 border border-[#14F195]/20">
                  <div className="flex items-center gap-3">
                    <Zap className="w-6 h-6 text-[#14F195]" />
                    <div>
                      <div className="font-semibold text-white">Experience Points</div>
                      <div className="text-sm text-gray-400">Cognitive capital earned</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-[#14F195]">+{phase.xpReward}</div>
                </div>

                {/* NFT Reward */}
                {phase.nftReward && (
                  <div className="flex items-center justify-between p-4 rounded-lg bg-purple-900/20 border border-purple-500/30">
                    <div className="flex items-center gap-3">
                      <Award className="w-6 h-6 text-purple-400" />
                      <div>
                        <div className="font-semibold text-white">Proof-of-Skill™ NFT</div>
                        <div className="text-sm text-gray-400">On-chain certification</div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-purple-400">{phase.nftReward}</div>
                  </div>
                )}

                {/* Locked Phase */}
                {phase.locked && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-700/30 border border-gray-600/30">
                    <Lock className="w-6 h-6 text-gray-400" />
                    <div>
                      <div className="font-semibold text-gray-400">Phase Locked</div>
                      <div className="text-sm text-gray-500">Complete previous phases to unlock</div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Zyno Tip */}
            {phase.zynoTip && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-[#9945FF]/10 to-[#14F195]/10 rounded-xl p-6 border border-[#14F195]/20"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🤖</div>
                  <div>
                    <div className="text-sm text-[#14F195] font-medium mb-2">Zyno AI Co-Founder™ suggests:</div>
                    <p className="text-gray-300 italic">"{phase.zynoTip}"</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Progress Tracker */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
            >
              <h4 className="text-lg font-semibold text-white mb-4">Your Progress</h4>
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-[#14F195]" />
                <div className="flex-grow">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Overall Journey</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>
              </div>
              
              <div className="text-sm text-gray-400">
                Total XP: <span className="text-[#14F195] font-semibold">{totalXP}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}