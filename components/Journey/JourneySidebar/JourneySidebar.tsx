import { JourneyMetadata, JourneyPhase } from '@/types/journey';
import { FC } from 'react';
import { Badge } from '../../ui/badge';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Brain, Bell, Zap, Award, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface JourneySidebarProps {
  metadata: JourneyMetadata;
  phases?: JourneyPhase[];
  currentPhase?: number;
  onPhaseClick?: (index: number) => void;
  onOpenZynoModal: () => void;
  onNotifyClick: () => void;
  mfaiBalance: string;
}

const JourneySidebar: FC<JourneySidebarProps> = ({
  metadata,
  phases = [],
  currentPhase = 0,
  onPhaseClick,
  onOpenZynoModal,
  onNotifyClick,
  mfaiBalance,
}) => {
  return (
    <div className="space-y-6">
      {/* Journey Info Card */}
      <Card className="bg-black/50 border-[#14F195]/20 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#9945FF] to-[#14F195] flex items-center justify-center text-3xl shadow-lg">
              {metadata.icon}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">{metadata.title}</h3>
              <p className="text-sm text-gray-400">{metadata.subtitle}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge className="bg-blue-900/20 text-blue-400 border-0">{metadata.profileType}</Badge>
            <Badge className="bg-purple-900/20 text-purple-400 border-0">{metadata.target}</Badge>
            {metadata.missionType && (
              <Badge className="bg-green-900/20 text-green-400 border-0">{metadata.missionType}</Badge>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-300 mb-6 leading-relaxed">{metadata.description}</p>

          {/* MFAI Balance */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[#9945FF]/10 to-[#14F195]/10 border border-[#14F195]/20 mb-6">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#14F195]" />
              <span className="text-sm text-gray-300">$MFAI Balance</span>
            </div>
            <span className="font-semibold text-[#14F195] text-lg">{mfaiBalance}</span>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={onOpenZynoModal}
              className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] text-black font-semibold hover:shadow-lg hover:shadow-[#14F195]/20 transition-all duration-300"
            >
              <Brain className="w-4 h-4 mr-2" />
              Engage Zyno AI Co-Founder™
            </Button>
            
            <Button
              onClick={onNotifyClick}
              variant="outline"
              className="w-full border-[#14F195]/30 text-[#14F195] hover:bg-[#14F195]/10"
            >
              <Bell className="w-4 h-4 mr-2" />
              Protocol Notifications
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Cognitive Activation Timeline */}
      {phases.length > 0 && (
        <Card className="bg-black/50 border-[#14F195]/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-[#14F195]" />
              Cognitive Activation Protocol™
            </h3>
            
            <div className="space-y-3">
              {phases.map((phase, index) => {
                const isCompleted = index < currentPhase;
                const isCurrent = index === currentPhase;
                const isLocked = index > currentPhase;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                      isCurrent
                        ? 'bg-gradient-to-r from-[#9945FF]/20 to-[#14F195]/20 border border-[#14F195]/30'
                        : isCompleted
                        ? 'bg-green-900/20 border border-green-500/30 hover:bg-green-900/30'
                        : isLocked
                        ? 'bg-gray-800/30 border border-gray-700/30 opacity-60'
                        : 'bg-gray-800/50 border border-gray-700/50 hover:bg-gray-800/70'
                    }`}
                    onClick={() => !isLocked && onPhaseClick?.(index)}
                  >
                    {/* Phase Indicator */}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                        isCurrent
                          ? 'bg-gradient-to-br from-[#9945FF] to-[#14F195] text-black shadow-lg'
                          : isCompleted
                          ? 'bg-green-500 text-white'
                          : isLocked
                          ? 'bg-gray-600 text-gray-400'
                          : 'bg-gray-700 text-gray-300'
                      }`}
                    >
                      {isCompleted ? '✓' : phase.icon || (index + 1)}
                    </div>

                    {/* Phase Info */}
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium text-sm ${
                        isCurrent ? 'text-white' : isCompleted ? 'text-green-300' : 'text-gray-300'
                      }`}>
                        {phase.title}
                      </div>
                      <div className="text-xs text-gray-400 truncate">
                        {phase.name}
                      </div>
                      
                      {/* XP Reward */}
                      <div className="flex items-center gap-1 mt-1">
                        <Award className="w-3 h-3 text-yellow-400" />
                        <span className="text-xs text-yellow-400">+{phase.xpReward} XP</span>
                        {phase.duration && (
                          <>
                            <Clock className="w-3 h-3 text-gray-400 ml-2" />
                            <span className="text-xs text-gray-400">{phase.duration}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Arrow for current phase */}
                    {isCurrent && (
                      <ChevronRight className="w-4 h-4 text-[#14F195]" />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Progress Summary */}
            <div className="mt-6 p-4 rounded-xl bg-gray-800/50 border border-gray-700/50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Phase Progress</span>
                <span className="text-white font-medium">
                  {currentPhase + 1} of {phases.length}
                </span>
              </div>
              <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#9945FF] to-[#14F195] transition-all duration-500"
                  style={{ width: `${((currentPhase + 1) / phases.length) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Protocol Features */}
      <Card className="bg-black/50 border-[#14F195]/20 backdrop-blur-sm">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Protocol Features</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50">
              <div className="w-8 h-8 rounded-lg bg-[#14F195]/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-[#14F195]" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">Skillchain Mining™</div>
                <div className="text-xs text-gray-400">Extract cognitive value</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Award className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">Proof-of-Skill™ NFTs</div>
                <div className="text-xs text-gray-400">On-chain credentials</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50">
              <div className="w-8 h-8 rounded-lg bg-[#9945FF]/20 flex items-center justify-center">
                <Brain className="w-4 h-4 text-[#9945FF]" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">Neuro-Dividends™</div>
                <div className="text-xs text-gray-400">Passive rewards</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JourneySidebar;