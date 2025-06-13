import { JourneyMetadata, JourneyPhase } from '@/types/journey';
import { FC } from 'react';
import { Badge } from '../../ui/badge';
import { Card, CardContent } from '../../ui/card';
import JourneyTimeline from '../JourneyTimeline';

interface JourneySidebarProps {
  metadata: JourneyMetadata;
  phases?: JourneyPhase[];
  currentPhase?: number;
  onPhaseClick?: (index: number) => void;
  onOpenZynoModal: () => void;
  onNotifyClick: () => void;
  mfaiBalance: string;
}

/**
 * JourneySidebar Component - Displays metadata, timeline and actions in the right column
 */
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
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center text-2xl">
              {metadata.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{metadata.title}</h3>
              <p className="text-sm text-gray-400">{metadata.subtitle}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className="bg-blue-900/20 text-blue-400">{metadata.profileType}</Badge>
            <Badge className="bg-purple-900/20 text-purple-400">{metadata.target}</Badge>
            {metadata.missionType && (
              <Badge className="bg-green-900/20 text-green-400">{metadata.missionType}</Badge>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-400 mb-4">{metadata.description}</p>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={onOpenZynoModal}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Open Zyno
            </button>
            <button
              onClick={onNotifyClick}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Notify
            </button>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <span className="text-xs text-gray-400">Solde MFAI :</span>
            <span className="font-semibold text-green-400">{mfaiBalance}</span>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      {phases.length > 0 && (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Journey Progress</h3>
            <JourneyTimeline
              currentPhase={currentPhase}
              onPhaseChange={onPhaseClick || (() => {})}
              journeyData={phases}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JourneySidebar;
