import React from 'react';

interface JourneyHeaderProps {
  journey: {
    title: string;
    description: string;
  };
}

/**
 * JourneyHeader Component - Displays the title, subtitle, and types for a Cognitive Activation Protocol™
 */
export const JourneyHeader: React.FC<JourneyHeaderProps> = ({ journey }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2">{journey.title}</h1>
        <p className="text-lg opacity-90">{journey.description}</p>
      </div>
    </header>
  );
};

export default JourneyHeader;
