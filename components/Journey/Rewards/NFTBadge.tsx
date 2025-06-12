import React from 'react';
import RewardBadge from './RewardBadge';

// Composant adaptateur pour maintenir la compatibilité avec les anciens imports
interface NFTBadgeProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  className?: string;
  claimed?: boolean;
  onClaim?: () => void;
}

/**
 * NFTBadge - Adaptateur pour RewardBadge pour maintenir la compatibilité
 * avec les composants qui utilisent l'ancienne interface NFTBadge
 */
const NFTBadge = ({ title, description, imageUrl, className, claimed, onClaim }: NFTBadgeProps) => {
  return (
    <RewardBadge
      title={title || "Récompense"}
      description={description || "Complétez ce parcours pour obtenir cette récompense"}
      imageUrl={imageUrl || "/images/default-badge.png"}
      className={className}
      claimed={claimed}
      onClaim={onClaim}
    />
  );
};

export default NFTBadge;
