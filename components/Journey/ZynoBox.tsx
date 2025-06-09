import { FC } from 'react';
import { motion } from 'framer-motion';

interface ZynoBoxProps {
  context: string;
  compact?: boolean;
}

/**
 * ZynoBox - Zyno AI Co-Founder™ assistant displayed with static tips
 * 
 * Features:
 * - Static tips based on current phase
 * - Animated eye/glow for presence
 * - Visual assistant for the journey
 * - Non-interactive in simulation mode
 */
const ZynoBox: FC<ZynoBoxProps> = ({ context, compact = false }) => {
  // Static tips based on the current phase context
  const getZynoTip = () => {
    if (context.includes('Learn')) {
      return "Welcome to the Learn Activation Phase! Start by exploring the educational content and complete the knowledge check to earn your first XP and $MFAI tokens.";
    } else if (context.includes('Build')) {
      return "In the Build Activation Phase, you'll create your first Web3 project using our templates. Follow the step-by-step guide to earn your Builder Proof-of-Skill™ NFT.";
    } else if (context.includes('Prove')) {
      return "The Prove Activation Phase is where you demonstrate your skills. Complete the challenge to validate your knowledge and earn certification.";
    } else if (context.includes('Activate')) {
      return "In the Activate Phase, you'll join the MFAI community and start participating in governance. Your voice matters in shaping our future!";
    } else if (context.includes('Scale')) {
      return "The Scale Activation Phase is about growing your impact. Invite others to join your journey and earn Neuro-Dividends™ through the network effect.";
    } else {
      return "I'm Zyno, your AI Co-Founder™. I'll guide you through each phase of your Money Factory AI journey.";
    }
  };

  return (
    <div className={`zyno-container ${compact ? 'compact' : 'full-size'}`}>
      <div className="zyno-box bg-[#0F172A] rounded-lg p-4 shadow-lg border border-[#22D3EE]/30">
        <div className="flex items-start">
          <motion.div 
            className="zyno-avatar w-10 h-10 rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] flex items-center justify-center mr-3"
            animate={{ 
              boxShadow: ['0 0 0px #22D3EE', '0 0 15px #22D3EE', '0 0 0px #22D3EE'],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: 'easeInOut' 
            }}
          >
            <span className="text-white font-bold text-xl">Z</span>
          </motion.div>
          
          <div className="zyno-content">
            <h3 className="text-[#22D3EE] font-medium mb-1">Zyno AI Co-Founder™</h3>
            <p className="text-white text-sm">{getZynoTip()}</p>
            
            {!compact && (
              <div className="mt-3 text-xs text-[#C084FC]">
                <p>This is a simulation mode. In the full version, Zyno would provide interactive assistance.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZynoBox;
