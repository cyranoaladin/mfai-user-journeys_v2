// Fichier index principal pour faciliter les imports des composants Journey
// Réexporter les composants depuis les sous-dossiers
export * from './Phases';
export * from './Intro';
export * from './Rewards';
export * from './Zyno';

// Exporter les composants à la racine
export { default as SkillchainMap } from './SkillchainMap';
export { default as XPTracker } from './XPTracker';

// Réexporter les composants des dossiers existants
export { default as JourneyHeader } from './JourneyHeader/JourneyHeader';
export { default as JourneySidebar } from './JourneySidebar/JourneySidebar';
export { default as FinalRoleSection } from './FinalRoleSection/FinalRoleSection';
export { default as WhyItMatters } from './WhyItMatters/WhyItMatters';
