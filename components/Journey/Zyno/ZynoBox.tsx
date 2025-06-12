import React from 'react';
import ZynoActions from './ZynoActions';

// Composant adaptateur pour maintenir la compatibilité avec les anciens imports
interface ZynoBoxProps {
  context: string;
  compact?: boolean;
  journeySlug?: string;
}

/**
 * ZynoBox - Adaptateur pour ZynoActions pour maintenir la compatibilité
 * avec les composants qui utilisent l'ancienne interface ZynoBox
 */
const ZynoBox = ({ context, compact = false, journeySlug = '' }: ZynoBoxProps) => {
  // Fonction factice pour la compatibilité
  const handleOpenZynoModal = () => {
    console.log('Opening Zyno modal with context:', context);
  };

  const handleNotifyClick = () => {
    console.log('Notify clicked with context:', context);
  };

  return (
    <div className={`zyno-box ${compact ? 'compact' : ''}`}>
      <ZynoActions 
        onOpenZynoModal={handleOpenZynoModal}
        onNotifyClick={handleNotifyClick}
        journeySlug={journeySlug}
      />
      {!compact && (
        <div className="zyno-tip mt-3 text-sm text-purple-300">
          <p>Zyno AI: {getZynoTip(context)}</p>
        </div>
      )}
    </div>
  );
};

// Fonction pour générer des conseils basés sur le contexte
const getZynoTip = (context: string): string => {
  if (context.includes('Learn')) {
    return "Je peux t'aider à comprendre les concepts clés de ce parcours.";
  } else if (context.includes('Build')) {
    return "Je peux te guider dans la création de ton projet.";
  } else if (context.includes('Prove')) {
    return "Je peux t'aider à valider tes acquis et obtenir ta récompense.";
  } else if (context.includes('Activate')) {
    return "Je peux t'aider à activer tes compétences dans l'écosystème.";
  } else {
    return "Je suis là pour t'accompagner dans ton parcours.";
  }
};

export default ZynoBox;
