import { JourneyContent } from '@/types/journey';

export const journeys: JourneyContent[] = [
  {
    metadata: {
      title: 'Introduction à la Finance',
      subtitle: 'Les bases de la finance moderne',
      description:
        'Apprenez les fondamentaux de la finance et développez vos compétences en gestion financière.',
      icon: '💰',
      profileType: 'Débutant',
      target: 'Finance',
      missionType: 'Apprentissage',
      slug: 'intro-finance',
      tagline: 'Maîtrisez les bases de la finance',
    },
    phases: [
      {
        title: 'Les concepts fondamentaux',
        description: 'Découvrez les concepts clés de la finance moderne',
        xp: 100,
        reward: 'Badge de débutant en finance',
      },
      {
        title: 'La gestion du budget',
        description: 'Apprenez à gérer efficacement votre budget',
        xp: 150,
        reward: 'Certificat de gestion budgétaire',
      },
      {
        title: 'Les investissements',
        description: 'Comprenez les bases des investissements',
        xp: 200,
        reward: "Badge d'investisseur débutant",
      },
    ],
    callToAction: ['Commencez votre parcours financier'],
    rewards: [
      { milestone: 'Certificat de compétences en finance', proof: '', utility: '' },
      { milestone: 'Accès à la communauté des apprenants', proof: '', utility: '' },
      { milestone: 'Opportunités de mentorat', proof: '', utility: '' },
    ],
    whyItMatters:
      'La maîtrise des bases financières est essentielle pour prendre des décisions éclairées et construire un avenir financier solide.',
    finalRole: 'Analyste Financier Junior',
  },
  {
    metadata: {
      title: 'Intelligence Artificielle en Finance',
      subtitle: "L'IA au service de la finance",
      description:
        "Explorez l'utilisation de l'IA dans le domaine financier et ses applications pratiques.",
      icon: '🤖',
      profileType: 'Intermédiaire',
      target: 'IA',
      missionType: 'Expertise',
      slug: 'ai-finance',
      tagline: "L'avenir de la finance est intelligent",
    },
    phases: [
      {
        title: "Introduction à l'IA",
        description: "Les bases de l'intelligence artificielle",
        xp: 150,
        reward: "Badge d'initié à l'IA",
      },
      {
        title: 'Machine Learning en Finance',
        description: 'Applications du ML dans la finance',
        xp: 200,
        reward: 'Certificat de ML financier',
      },
      {
        title: 'Trading Algorithmique',
        description: 'Automatisez vos stratégies de trading',
        xp: 250,
        reward: 'Badge de trader algorithmique',
      },
    ],
    callToAction: ['Devenez un expert en IA financière'],
    rewards: [
      { milestone: "Certificat d'expert en IA financière", proof: '', utility: '' },
      { milestone: 'Accès aux outils de trading algorithmique', proof: '', utility: '' },
      { milestone: "Réseau professionnel dans l'IA", proof: '', utility: '' },
    ],
    whyItMatters:
      "L'IA transforme radicalement le secteur financier, créant de nouvelles opportunités pour les professionnels qui maîtrisent ces technologies.",
    finalRole: 'Data Scientist Financier',
  },
  {
    metadata: {
      title: 'Blockchain et Crypto',
      subtitle: 'La révolution de la finance décentralisée',
      description: "Plongez dans l'univers de la blockchain et des cryptomonnaies.",
      icon: '⛓️',
      profileType: 'Avancé',
      target: 'Blockchain',
      missionType: 'Innovation',
      slug: 'blockchain-crypto',
      tagline: "La finance de demain, aujourd'hui",
    },
    phases: [
      {
        title: 'Fondamentaux Blockchain',
        description: 'Comprendre la technologie blockchain',
        xp: 200,
        reward: 'Badge de blockchain',
      },
      {
        title: 'Cryptomonnaies',
        description: 'Les principales cryptomonnaies et leur fonctionnement',
        xp: 250,
        reward: 'Certificat de crypto-expert',
      },
      {
        title: 'DeFi',
        description: 'La finance décentralisée et ses applications',
        xp: 300,
        reward: 'Badge de DeFi Master',
      },
    ],
    callToAction: ['Rejoignez la révolution DeFi'],
    rewards: [
      { milestone: "Certificat d'expert en blockchain", proof: '', utility: '' },
      { milestone: 'Accès aux plateformes DeFi', proof: '', utility: '' },
      { milestone: "Communauté d'innovateurs", proof: '', utility: '' },
    ],
    whyItMatters:
      'La blockchain et la DeFi révolutionnent la finance traditionnelle, créant de nouvelles opportunités pour les innovateurs et les investisseurs.',
    finalRole: 'Architecte DeFi',
  },
];
