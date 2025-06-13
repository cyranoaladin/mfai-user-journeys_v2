import { useCallback } from 'react';
import { useStore } from '../utils/store';

const TOTAL_PHASES = 5; // Cognitive, Synaptic, Neural, Activation, Amplification

export const usePhaseProgress = () => {
  const { currentPhase } = useStore();

  const updateProgress = useCallback(() => {
    // La progression est gérée automatiquement par le store
    // Cette fonction peut être utilisée pour des mises à jour supplémentaires si nécessaire
  }, []);

  const getProgress = useCallback(() => {
    if (currentPhase === undefined) return 0;
    return (currentPhase / TOTAL_PHASES) * 100;
  }, [currentPhase]);

  return {
    updateProgress,
    getProgress,
  };
};
