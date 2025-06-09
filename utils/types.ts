// Import types from journeyData.ts
import { Journey as JourneyBase, JourneyPhase as JourneyPhaseBase } from '../utils/journeyData';

// Re-export with type keyword for TypeScript
export type Journey = JourneyBase;
export type JourneyPhase = JourneyPhaseBase;

// Additional types for the application
export interface JourneyWithLock extends JourneyBase {
  phases: (JourneyPhaseBase & { locked?: boolean })[];
}
