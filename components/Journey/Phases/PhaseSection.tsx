import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { JourneyPhase } from '@/utils/markdownParser';
import { useStore } from '@/utils/store';
import { motion } from 'framer-motion';
import { Award, Lock, Star, Trophy } from 'lucide-react';

interface PhaseSectionProps {
  phase: JourneyPhase;
  currentPhase: number;
  totalPhases: number;
}

export default function PhaseSection({ phase, currentPhase, totalPhases }: PhaseSectionProps) {
  const { totalXP } = useStore();
  const progress = Math.min((totalXP / 1000) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="relative p-6 rounded-xl bg-black/50 border border-[#14F195]/20 backdrop-blur-sm"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#9945FF]/10 to-[#14F195]/10 rounded-xl blur-xl" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{phase.title}</h2>
            <p className="text-gray-400">{phase.description}</p>
          </div>
          <Badge className="bg-[#14F195]/10 text-[#14F195]">
            Phase {currentPhase + 1} sur {totalPhases}
          </Badge>
        </div>

        <div className="space-y-6">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50"
          >
            <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              Mission
            </h3>
            <p className="text-gray-300">{phase.description}</p>
          </motion.div>

          {/* Content Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50"
          >
            <h3 className="text-lg font-medium text-white mb-3">Contenu</h3>
            <div className="prose prose-invert max-w-none">{phase.title}</div>
          </motion.div>

          {/* Rewards Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50"
          >
            <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              Récompenses
            </h3>
            <div className="space-y-3">
              {phase.xpReward && phase.xpReward > 0 && (
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-300">+{phase.xpReward} XP</span>
                </div>
              )}
              {phase.nftReward && (
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">{phase.nftReward}</span>
                </div>
              )}
              {phase.locked && (
                <div className="flex items-center gap-2 text-gray-400">
                  <Lock className="w-5 h-5" />
                  <span>Phase verrouillée</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3"
          >
            <Award className="w-6 h-6 text-[#14F195]" />
            <div className="flex-grow">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Progression</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
