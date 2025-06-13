import { cn } from '@/lib/utils';
import { Proof } from '@/types/journey';
import { CheckCircle, Lock } from 'lucide-react';
import { FC } from 'react';

interface ProofSectionProps {
  proofs: Proof[];
  unlockedProofs: number[];
  onProofClick: (index: number) => void;
}

/**
 * ProofSection Component - Displays Proof-of-Skill Tokens™ and Neuro-Dividends™ for journey completion
 */
const ProofSection: FC<ProofSectionProps> = ({ proofs, unlockedProofs, onProofClick }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Preuves de compétence</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {proofs.map((proof, index) => {
          const isUnlocked = unlockedProofs.includes(index);
          return (
            <button
              key={index}
              onClick={() => onProofClick(index)}
              className={cn(
                'p-4 rounded-lg border transition-all duration-200',
                isUnlocked
                  ? 'bg-green-900/20 border-green-500'
                  : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    'p-2 rounded-full',
                    isUnlocked ? 'bg-green-500/20' : 'bg-gray-700/50'
                  )}
                >
                  {isUnlocked ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Lock className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-medium text-white">{proof.title}</h4>
                  <p className="text-sm text-gray-400 mt-1">{proof.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProofSection;
