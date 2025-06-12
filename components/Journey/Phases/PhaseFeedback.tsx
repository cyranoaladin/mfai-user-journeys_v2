import React, { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../../components/ui/button';
import { ThumbsUp, ThumbsDown, Check, HelpCircle } from 'lucide-react';

interface PhaseFeedbackProps {
  phaseIndex?: number;
  phaseName?: string;
  phaseId?: string; // Pour compatibilité avec l'ancienne interface
  className?: string; // Pour compatibilité avec l'ancienne interface
  onFeedbackSubmit?: (feedback: PhaseFeedbackData) => void;
}

export interface PhaseFeedbackData {
  phaseIndex: number;
  phaseName: string;
  rating: 'positive' | 'negative' | 'understood' | 'need-more';
  comment: string;
  timestamp: number;
}

/**
 * PhaseFeedback Component - Collects user feedback at the end of each phase
 */
const PhaseFeedback: FC<PhaseFeedbackProps> = ({ 
  phaseIndex = 0, 
  phaseName = '', 
  phaseId, 
  className, 
  onFeedbackSubmit 
}) => {
  const [selectedRating, setSelectedRating] = useState<PhaseFeedbackData['rating'] | null>(null);
  const [comment, setComment] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Utiliser phaseId comme phaseName si phaseName n'est pas fourni
  const effectivePhaseName = phaseName || phaseId || '';
  
  const handleRatingSelect = (rating: PhaseFeedbackData['rating']) => {
    setSelectedRating(rating);
    setIsExpanded(true);
  };
  
  const handleSubmit = () => {
    if (selectedRating && onFeedbackSubmit) {
      const feedbackData: PhaseFeedbackData = {
        phaseIndex,
        phaseName: effectivePhaseName,
        rating: selectedRating,
        comment,
        timestamp: Date.now()
      };
      
      onFeedbackSubmit(feedbackData);
      setIsSubmitted(true);
      
      // Reset after animation completes
      setTimeout(() => {
        setSelectedRating(null);
        setComment('');
        setIsExpanded(false);
      }, 3000);
    }
  };
  
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="bg-green-900/20 border border-green-700/30 rounded-lg p-4 my-4 text-center"
      >
        <Check className="h-6 w-6 text-green-400 mx-auto mb-2" />
        <p className="text-green-300 text-sm">Thank you for your feedback!</p>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-gray-800/50 backdrop-blur-md rounded-lg border border-gray-700/50 p-4 my-4"
    >
      <h4 className="text-sm font-medium mb-3 text-gray-300">How was this phase for you?</h4>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant={selectedRating === 'positive' ? 'default' : 'outline'}

          className={`flex items-center gap-1 ${
            selectedRating === 'positive' ? 'bg-green-600 hover:bg-green-700' : ''
          }`}
          onClick={() => handleRatingSelect('positive')}
          aria-label="Thumbs up - I liked this phase"
        >
          <ThumbsUp className="h-4 w-4" />
          <span>Liked it</span>
        </Button>
        
        <Button
          variant={selectedRating === 'negative' ? 'default' : 'outline'}

          className={`flex items-center gap-1 ${
            selectedRating === 'negative' ? 'bg-red-600 hover:bg-red-700' : ''
          }`}
          onClick={() => handleRatingSelect('negative')}
          aria-label="Thumbs down - I didn't like this phase"
        >
          <ThumbsDown className="h-4 w-4" />
          <span>Needs work</span>
        </Button>
        
        <Button
          variant={selectedRating === 'understood' ? 'default' : 'outline'}

          className={`flex items-center gap-1 ${
            selectedRating === 'understood' ? 'bg-blue-600 hover:bg-blue-700' : ''
          }`}
          onClick={() => handleRatingSelect('understood')}
          aria-label="I understand this content"
        >
          <Check className="h-4 w-4" />
          <span>I understand</span>
        </Button>
        
        <Button
          variant={selectedRating === 'need-more' ? 'default' : 'outline'}

          className={`flex items-center gap-1 ${
            selectedRating === 'need-more' ? 'bg-purple-600 hover:bg-purple-700' : ''
          }`}
          onClick={() => handleRatingSelect('need-more')}
          aria-label="I need more information"
        >
          <HelpCircle className="h-4 w-4" />
          <span>I want more</span>
        </Button>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <textarea
              placeholder="Any additional thoughts? (optional)"
              value={comment}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
              className="mb-3 bg-gray-900/50 border-gray-700 w-full p-2 rounded-md text-white"
              rows={3}
            />
            
            <div className="flex justify-end">
              <Button 
                onClick={handleSubmit}
      
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Submit Feedback
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PhaseFeedback;
