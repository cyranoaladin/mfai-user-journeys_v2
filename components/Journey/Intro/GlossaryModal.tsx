import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X, BookOpen, Brain, Sparkles, Zap, Bot, Award, Lock, Scale } from 'lucide-react';

const glossaryItems = [
  {
    term: 'Cognitive Activation Journey™',
    definition: 'Parcours d&apos;apprentissage et de validation des compétences Web3',
    icon: Brain,
  },
  {
    term: 'Zyno AI Co-Founder™',
    definition: 'Assistant IA contextuel qui vous guide dans votre parcours',
    icon: Bot,
  },
  {
    term: 'Proof-of-Skill™ NFT',
    definition: 'Certification on-chain de vos compétences validées',
    icon: Award,
  },
  {
    term: 'Skillchain Mining™',
    definition: 'Parcours d&apos;apprentissage et de validation des compétences Web3',
    icon: Sparkles,
  },
  {
    term: 'Proof-of-Visiontor™',
    definition: 'Système de validation des compétences et de la vision entrepreneuriale',
    icon: Zap,
  },
  {
    term: 'Neuro-Dividends™',
    definition: 'Revenus passifs générés par vos contributions cognitives',
    icon: Scale,
  },
  {
    term: 'Synaptic Governance™',
    definition: 'Système de gouvernance basé sur la preuve de compétence',
    icon: BookOpen,
  },
  {
    term: 'Cognitive Lock™',
    definition: 'Engagement mental et économique dans le protocole',
    icon: Lock,
  },
];

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut' as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: 'easeIn' as const,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlossaryModal({ isOpen, onClose }: GlossaryModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-black/90 border border-[#14F195]/20 rounded-2xl p-6 md:p-8"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-8">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9945FF] to-[#14F195] mb-2">
                MFAI Glossary
              </h2>
              <p className="text-gray-400">
                Découvrez les concepts clés qui définissent l'écosystème MFAI
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {glossaryItems.map((item, index) => (
                <motion.div
                  key={item.term}
                  className="group relative"
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#9945FF]/5 to-[#14F195]/5 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative p-6 rounded-xl bg-black/50 border border-[#14F195]/20 backdrop-blur-sm">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-[#14F195]/10 text-[#14F195]">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">{item.term}</h3>
                        <p className="text-gray-400 text-sm">{item.definition}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
