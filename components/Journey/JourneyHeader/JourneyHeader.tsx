import React, { FC } from 'react';
import { JourneyMetadata } from '../../../utils/markdownParser';

interface JourneyHeaderProps {
  metadata: JourneyMetadata;
}

/**
 * JourneyHeader Component - Displays the title, subtitle, and types for a Cognitive Activation Protocol™
 */
const JourneyHeader: FC<JourneyHeaderProps> = ({ metadata }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-gradient-to-r from-gray-900/50 to-gray-800/30 p-6 rounded-xl border border-gray-700/30 backdrop-blur-sm">
      <div className="animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          🧠 {metadata.title}
        </h1>
        <p className="text-gray-300 mt-2 italic">{metadata.subtitle}</p>
      </div>
      
      <div className="mt-6 md:mt-0 flex flex-col md:items-end space-y-3">
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 bg-blue-900/40 text-blue-200 rounded-full border border-blue-700/50 shadow-sm">
            Sovereign Identity: {metadata.profileType}
          </span>
          <span className="text-xs font-semibold px-3 py-1.5 bg-purple-900/40 text-purple-200 rounded-full border border-purple-700/50 shadow-sm">
            Synaptic Governance™: {metadata.target}
          </span>
          {metadata.missionType && (
            <span className="text-xs font-semibold px-3 py-1.5 bg-green-900/40 text-green-200 rounded-full border border-green-700/50 shadow-sm">
              Neuro-Dividend™: {metadata.missionType}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-400">{metadata.tagline}</p>
      </div>
    </div>
  );
};

export default JourneyHeader;
