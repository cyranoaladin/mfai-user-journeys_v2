import React, { FC } from 'react';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { JourneyMetadata, JourneyContent } from '../../../utils/markdownParser';
import ZynoActions from '../Zyno/ZynoActions';
import JourneyTimeline from './JourneyTimeline';

interface JourneySidebarProps {
  metadata: JourneyMetadata;
  phases?: JourneyContent['phases'];
  currentPhase?: number;
  onPhaseClick?: (index: number) => void;
  onOpenZynoModal: () => void;
  onNotifyClick: () => void;
}

/**
 * JourneySidebar Component - Displays metadata, timeline and actions in the right column
 */
const JourneySidebar: FC<JourneySidebarProps> = ({ 
  metadata, 
  phases,
  currentPhase = 0,
  onPhaseClick,
  onOpenZynoModal, 
  onNotifyClick 
}) => {
  return (
    <div className="space-y-6">
      {/* Journey Details */}
      <Card className="bg-gray-800/50 backdrop-blur-md border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase text-gray-500">Sovereign Identity</p>
              <Badge className="mt-1 bg-purple-600 hover:bg-purple-700 transition-colors">{metadata.profileType}</Badge>
            </div>
            
            <div>
              <p className="text-xs uppercase text-gray-500">Neuro-Dividend™ Type</p>
              <Badge className="mt-1 bg-blue-600 hover:bg-blue-700 transition-colors">{metadata.missionType || 'Cognitive Enhancement'}</Badge>
            </div>
            
            <div>
              <p className="text-xs uppercase text-gray-500">Synaptic Governance™</p>
              <p className="text-sm text-gray-300">{metadata.target}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Mini-Timeline pour navigation rapide */}
      {phases && phases.length > 0 && onPhaseClick && (
        <Card className="bg-gray-800/50 backdrop-blur-md border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
          <CardContent className="pt-6">
            <JourneyTimeline 
              phases={phases}
              currentPhase={currentPhase}
              onPhaseClick={onPhaseClick}
            />
          </CardContent>
        </Card>
      )}
      
      {/* AI Co-Founder™ (Zyno) Actions */}
      <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-4 border border-gray-700/50">
        <h3 className="text-xl font-semibold mb-4">AI Co-Founder™ (Zyno)</h3>
        <p className="text-sm text-gray-300 mb-4">Your personal AI assistant to guide you through this journey.</p>
        <ZynoActions 
          onOpenZynoModal={onOpenZynoModal}
          onNotifyClick={onNotifyClick}
          journeySlug={metadata.slug}
        />
      </div>
    </div>
  );
};

export default JourneySidebar;
