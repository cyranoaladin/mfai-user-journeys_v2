/**
 * Types centralisés pour les journeys
 * Ce fichier contient toutes les définitions de types liées aux journeys
 * pour assurer la cohérence dans toute l'application
 */

// Types de base pour les journeys
// Compatible avec markdownParser.ts et [slug].tsx
export interface JourneyMetadata {
  title: string;
  subtitle: string;
  tagline: string;
  target: string;
  profileType: string;
  missionType: string;
  icon: string;
  slug: string;
  description: string;
}

// Type pour les phases compatible avec journeyData.ts, markdownParser.ts et [slug].tsx
export interface JourneyPhase {
  name: string;
  title: string;
  content: string;
  icon: string;
  description: string;
  mission: string;
  xpReward: number;
  nftReward?: string;
  locked?: boolean;
  duration?: string;
}

// Type pour les récompenses
export interface JourneyReward {
  milestone: string;
  proof: string;
  utility: string;
}

// Type principal pour le contenu d'un journey
// Compatible avec markdownParser.ts
export interface JourneyContent {
  metadata: JourneyMetadata;
  phases: JourneyPhase[];
  callToAction: string[];
  rewards: JourneyReward[];
  whyItMatters: string;
  finalRole: string;
}

// Types pour la gestion du feedback
export interface PhaseFeedbackData {
  phaseIndex: number;
  rating: number;
  comment: string;
  timestamp: number;
}

export interface JourneyFeedback {
  [journeySlug: string]: {
    [phaseIndex: number]: PhaseFeedbackData;
  };
}

// Types pour les props des composants
export interface JourneyDetailPageProps {
  journey: JourneyContent | null;
}

// Types pour les réponses API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
