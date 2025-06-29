import { Journey } from '@/utils/journeyData';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Target, Users, Award, Zap } from 'lucide-react';
import { useStore } from '../../utils/store';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';

interface EnhancedJourneyCardProps {
  journey: Journey;
  onSelect: (slug: string) => void;
}

export default function EnhancedJourneyCard({ journey, onSelect }: EnhancedJourneyCardProps) {
  const { totalXP, selectedPersona } = useStore();
  const isSelected = selectedPersona === journey.persona;
  
  // Calculate progress based on completed phases
  const completedPhases = journey.phases.filter(phase => !phase.locked).length;
  const progress = (completedPhases / journey.phases.length) * 100;

  // Get persona color scheme
  const getPersonaColors = (persona: string) => {
    const colorMap: Record<string, { gradient: string; accent: string; bg: string }> = {
      'web2-hustler': { 
        gradient: 'from-[#9945FF] to-[#14F195]', 
        accent: 'text-[#14F195]', 
        bg: 'bg-[#9945FF]/10' 
      },
      'community-voice': { 
        gradient: 'from-[#14F195] to-[#9945FF]', 
        accent: 'text-[#9945FF]', 
        bg: 'bg-[#14F195]/10' 
      },
      'content-maker': { 
        gradient: 'from-purple-600 to-pink-600', 
        accent: 'text-purple-400', 
        bg: 'bg-purple-600/10' 
      },
      'data-miner': { 
        gradient: 'from-blue-600 to-cyan-600', 
        accent: 'text-blue-400', 
        bg: 'bg-blue-600/10' 
      },
      'project-manager': { 
        gradient: 'from-orange-600 to-red-600', 
        accent: 'text-orange-400', 
        bg: 'bg-orange-600/10' 
      },
      'idea-carrier': { 
        gradient: 'from-green-600 to-emerald-600', 
        accent: 'text-green-400', 
        bg: 'bg-green-600/10' 
      },
      'silent-watcher': { 
        gradient: 'from-indigo-600 to-purple-600', 
        accent: 'text-indigo-400', 
        bg: 'bg-indigo-600/10' 
      }
    };
    return colorMap[persona] || colorMap['web2-hustler'];
  };

  const colors = getPersonaColors(journey.persona);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`group relative cursor-pointer ${isSelected ? 'ring-2 ring-[#14F195]' : ''}`}
      onClick={() => onSelect(journey.slug)}
    >
      {/* Glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} rounded-xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-300`} />
      
      {/* Main card */}
      <div className="relative p-6 rounded-xl bg-black/80 border border-gray-800 backdrop-blur-sm hover:border-gray-700 transition-all duration-300">
        
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-2xl shadow-lg`}>
              {journey.icon}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white group-hover:text-[#14F195] transition-colors">
                {journey.label}
              </h3>
              <p className="text-sm text-gray-400">{journey.tagline}</p>
            </div>
          </div>
          
          {/* Required Pass Badge */}
          <Badge className={`${colors.bg} ${colors.accent} border-0`}>
            {journey.requiredPass} Pass
          </Badge>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
          {journey.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className="bg-blue-900/20 text-blue-400 border-0">
            {journey.profileType}
          </Badge>
          <Badge className="bg-purple-900/20 text-purple-400 border-0">
            {journey.missionType}
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-400" />
            <div>
              <div className="text-xs text-gray-400">Profile</div>
              <div className="text-sm text-white font-medium">{journey.profileType}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-purple-400" />
            <div>
              <div className="text-xs text-gray-400">Mission</div>
              <div className="text-sm text-white font-medium">{journey.missionType}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-green-400" />
            <div>
              <div className="text-xs text-gray-400">Phases</div>
              <div className="text-sm text-white font-medium">{journey.phases.length}</div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Progress</span>
            <span className="text-white font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Phases Preview */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#14F195]" />
            Cognitive Activation Protocol™
          </h4>
          <div className="space-y-2">
            {journey.phases.slice(0, 3).map((phase, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="text-lg">{phase.icon}</div>
                  <span className="text-sm text-white">{phase.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-3 h-3 text-yellow-400" />
                  <span className="text-xs text-gray-400">+{phase.xpReward} XP</span>
                </div>
              </div>
            ))}
            {journey.phases.length > 3 && (
              <div className="text-xs text-gray-400 text-center py-1">
                +{journey.phases.length - 3} more phases...
              </div>
            )}
          </div>
        </div>

        {/* Zyno Quote */}
        <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-[#9945FF]/10 to-[#14F195]/10 border border-[#14F195]/20">
          <div className="flex items-start gap-2">
            <div className="text-sm">🤖</div>
            <div>
              <div className="text-xs text-[#14F195] font-medium mb-1">Zyno AI Co-Founder™ says:</div>
              <p className="text-xs text-gray-300 italic">"{journey.zynoSays}"</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          className={`w-full bg-gradient-to-r ${colors.gradient} hover:opacity-90 text-black font-semibold transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#14F195]/20`}
        >
          <span>{isSelected ? 'Continue Journey' : 'Start Cognitive Activation™'}</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>

        {/* Final Role Preview */}
        <div className="mt-3 text-center">
          <span className="text-xs text-gray-400">Final Role: </span>
          <span className={`text-xs font-medium ${colors.accent}`}>{journey.finalRole}</span>
        </div>
      </div>
    </motion.div>
  );
}